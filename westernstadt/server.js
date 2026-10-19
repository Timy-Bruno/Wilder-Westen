const express=require('express'),http=require('http'),os=require('os'),QR=require('qrcode');
const {Server}=require('socket.io');
const app=express(),srv=http.createServer(app),io=new Server(srv);
app.use(express.static(__dirname+'/public'));
const PORT=process.env.PORT||3000,W=1000,H=600;
const ITEM={ore:'Erz',coal:'Kohle',bar:'Eisenbarren',ammo:'Munition',meat:'Fleisch',hide:'Fell',herbs:'Kräuter',med:'Medizin',wood:'Holz',planks:'Bretter',fence:'Zaun',food:'Essen',whiskey:'Whiskey',guard:'Wache'};
const SELL={ammo:['ammo',6],med:['med',6],food:['food',6],whiskey:['morale',6],fence:['security',8],guard:['security',8]};
const META={ore:['⛏️','Für den Schmied'],coal:['🪨','Für den Schmied'],bar:['🔩','Für Munition (Schmied)'],ammo:['🔫','→ Stadt: Munition'],meat:['🥩','Für den Saloon-Wirt'],hide:['🦌','Noch ohne Verwendung'],herbs:['🌿','Für Doc & Saloon'],med:['💊','→ Stadt: Medizin'],wood:['🪵','Für den Baumeister'],planks:['🪚','Für den Baumeister'],fence:['🚧','→ Stadt: Sicherheit'],food:['🍲','→ Stadt: Nahrung'],whiskey:['🥃','→ Stadt: Moral'],guard:['💂','→ Stadt: Sicherheit']};
const STN={food:'Nahrung',ammo:'Munition',med:'Medizin',morale:'Moral',security:'Sicherheit'};
const RICON=['⚒️','⚕️','⭐','💰','🥃','🏹','🧨','🔨'];
const fmt=o=>Object.entries(o).map(([k,v])=>META[k][0]+' '+v+'× '+ITEM[k]).join('  +  ');
const ROLES=[
 {n:'Schmied',b:'Schmiede',r:[
  {id:'smelt',n:'Eisen schmelzen',g:'timing',h:'Stoppe im richtigen Moment!',i:{ore:2,coal:1},o:{bar:1},t:15},
  {id:'cast',n:'Munition gießen',g:'memory',h:'Merke dir die Gussform!',i:{bar:1},o:{ammo:3},t:20}]},
 {n:'Doc',b:'Arztpraxis',r:[
  {id:'brew',n:'Medizin mischen',g:'memory',h:'Merke dir das Rezept!',i:{herbs:2},o:{med:2},t:20}]},
 {n:'Sheriff',b:'Sheriff-Büro',r:[
  {id:'guard',n:'Wache einteilen',g:'memory',h:'Merke dir den Schichtplan!',i:{ammo:1},o:{guard:1},t:15}]},
 {n:'Händler',b:'Laden',r:[
  {id:'wood',n:'Holz einkaufen',g:'hotcold',h:'Finde den fairen Preis!',i:{},o:{wood:3},t:10},
  {id:'herb',n:'Kräuter einkaufen',g:'hotcold',h:'Finde den fairen Preis!',i:{},o:{herbs:2},t:10}]},
 {n:'Saloon-Wirt',b:'Saloon',r:[
  {id:'stew',n:'Eintopf kochen',g:'timing',h:'Nicht anbrennen lassen!',i:{meat:1},o:{food:3},t:15},
  {id:'whis',n:'Whiskey brennen',g:'memory',h:'Merke dir die Mischung!',i:{herbs:1},o:{whiskey:2},t:20}]},
 {n:'Jäger',b:'Jagdhütte',r:[
  {id:'hunt',n:'Jagen',g:'stealth',h:'Nur bewegen, wenn das Tier wegschaut!',i:{},o:{meat:2,hide:1},t:10},
  {id:'gather',n:'Kräuter suchen',g:'hotcold',h:'Wo wachsen die Kräuter?',i:{},o:{herbs:2},t:10}]},
 {n:'Sprengmeister',b:'Mine',r:[
  {id:'blast',n:'Erz sprengen',g:'hotcold',h:'Wo liegt die Erzader?',i:{},o:{ore:3},t:15},
  {id:'coal',n:'Kohle abbauen',g:'timing',h:'Triff die Kohleschicht!',i:{},o:{coal:2},t:10}]},
 {n:'Baumeister',b:'Zimmerei',r:[
  {id:'saw',n:'Bretter sägen',g:'timing',h:'Säge im richtigen Moment!',i:{wood:2},o:{planks:2},t:12},
  {id:'fence',n:'Zaun bauen',g:'memory',h:'Merke dir den Bauplan!',i:{planks:3},o:{fence:1},t:20}]}];
const BUILD=ROLES.map((r,i)=>({name:r.b,ic:RICON[i],x:60+(i%4)*230,y:i<4?50:430,w:130,h:100}));
const CHURCH={name:'Kirche',x:435,y:240,w:130,h:110};
const SOLID=[...BUILD,CHURCH];
let room=null,lastBell=0;
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const near=(p,b,m=35)=>p.x>b.x-m&&p.x<b.x+b.w+m&&p.y>b.y-m&&p.y<b.y+b.h+m;
const hit=(x,y)=>SOLID.some(b=>x>b.x-12&&x<b.x+b.w+12&&y>b.y-12&&y<b.y+b.h+12);
const has=(p,r)=>Object.entries(r.i).every(([k,v])=>(p.inv[k]||0)>=v);
function lanIP(){for(const l of Object.values(os.networkInterfaces()))for(const a of l)if(a.family==='IPv4'&&!a.internal)return a.address;return 'localhost'}
function lobby(){if(!room)return;io.to('screen').emit('lobby',room.slots.map(p=>({i:p.i,qr:p.qr,on:!!p.sock})))}
const say=(p,t)=>p.sock&&io.to(p.sock).emit('msg',t);
io.on('connection',s=>{
 const P=()=>room&&room.slots[s.data.slot];
 s.on('create',async n=>{
  n=Math.max(1,Math.min(8,n|0));
  const roles=shuffle([...ROLES.keys()]).slice(0,n),h=s.handshake.headers,host=h.host||'',proto=(h['x-forwarded-proto']||'http').split(',')[0],
   base=/^(localhost|127\.)/.test(host)?'http://'+lanIP()+':'+PORT:proto+'://'+host;
  room={phase:'lobby',stats:{food:60,ammo:60,med:60,morale:60,security:60},slots:[],npcs:[],bellUntil:0,bell:null};
  for(let i=0;i<n;i++){const url=base+'/phone.html?slot='+i;
   room.slots.push({i,role:roles[i],x:300+i*55,y:400,dx:0,dy:0,inside:null,cur:null,jobs:[],inv:{ore:2,coal:1,herbs:2,wood:2,meat:1},
    sock:null,qr:await QR.toDataURL(url,{margin:1,width:200})});}
  for(let i=0;i<6;i++)room.npcs.push({x:200+Math.random()*600,y:200+Math.random()*200,tx:500,ty:380});
  s.join('screen');lobby();
 });
 s.on('start',()=>{if(room){room.phase='play';io.to('screen').emit('started')}});
 s.on('join',i=>{const p=room&&room.slots[i|0];if(!p)return s.emit('err','Kein Spiel gefunden. Erst am großen Bildschirm starten.');
  p.sock=s.id;s.data.slot=i|0;lobby()});
 s.on('input',v=>{const p=P();if(!p||room.phase!=='play'||p.inside!==null)return;
  p.dx=Math.max(-1,Math.min(1,+v.dx||0));p.dy=Math.max(-1,Math.min(1,+v.dy||0))});
 s.on('act',()=>{const p=P();if(!p||room.phase!=='play'||p.cur)return;
  if(p.inside!==null){p.inside=null;return}
  const b=BUILD.findIndex(b=>near(p,b));if(b>=0){p.inside=b;p.dx=p.dy=0}});
 s.on('craft',rid=>{const p=P();if(!p||p.inside!==p.role||p.cur)return;
  const r=ROLES[p.role].r.find(x=>x.id===rid);if(!r||!has(p,r))return;
  for(const k in r.i)p.inv[k]-=r.i[k];p.cur=r;s.emit('game',{g:r.g,n:r.n,h:r.h})});
 s.on('result',sc=>{const p=P();if(!p||!p.cur)return;const r=p.cur;p.cur=null;sc=Math.max(0,Math.min(1,+sc||0));
  if(sc<.35)return say(p,'❌ Misslungen! Das Material ist verloren.');
  const out={...r.o},bonus=sc>=.8;if(bonus){const k=Object.keys(out)[0];out[k]++}
  p.jobs.push({n:r.n,d:r.t,t:Date.now()+r.t*1000,out});
  say(p,(bonus?'⭐ Perfekt, Bonus! ':'✔ Gelungen. ')+'Fertig in '+r.t+' Sekunden – du kannst derweil etwas anderes tun.')});
 s.on('deliver',()=>{const p=P();if(!p||p.inside!==null||!near(p,CHURCH))return;const t=[],g={};
  for(const k in SELL){const n=p.inv[k]||0;if(n){const [st,v]=SELL[k];room.stats[st]=Math.min(100,room.stats[st]+n*v);g[st]=(g[st]||0)+n*v;p.inv[k]=0;t.push(n+'× '+ITEM[k])}}
  if(!t.length)return say(p,'Nichts zum Abliefern. Rohstoffe müssen erst verarbeitet werden.');
  say(p,'✔ Abgeliefert: '+t.join(', '));
  io.to('screen').emit('fx',Object.entries(g).map(([st,v],i)=>({t:'+'+v+' '+STN[st],x:CHURCH.x+65,y:CHURCH.y-10-i*22})))});
 s.on('give',({to,item})=>{const p=P(),q=room&&room.slots[to|0];
  if(!p||!q||p===q||p.inside!==null||q.inside!==null||!(p.inv[item]>0)||Math.hypot(p.x-q.x,p.y-q.y)>90)return;
  p.inv[item]--;q.inv[item]=(q.inv[item]||0)+1;say(p,'Gegeben: '+ITEM[item]+' an Spieler '+(q.i+1));say(q,'Du hast '+ITEM[item]+' von Spieler '+(p.i+1)+' bekommen!')});
 s.on('bell',sig=>{const p=P();if(!p||p.inside!==null||!near(p,CHURCH)||Date.now()-lastBell<12000)return;
  sig=[1,2,3].includes(sig)?sig:1;lastBell=Date.now();
  const txt={1:'Mangel! Es fehlt etwas in der Stadt.',2:'Gefahr! Ein Angriff naht.',3:'Feuer in der Stadt!'}[sig];
  const needed=Math.min(...Object.values(room.stats))<30;
  room.stats.morale=Math.max(0,Math.min(100,room.stats.morale+(needed?4:-6)));
  room.bellUntil=Date.now()+8000;room.bell={sig,txt,by:p.i,false:!needed};
  for(const q of room.slots)if(q.sock)io.to(q.sock).emit('alert',{sig,txt})});
 s.on('disconnect',()=>{const p=P();if(p&&p.sock===s.id){p.sock=null;p.dx=p.dy=0;lobby()}});
});
setInterval(()=>{
 if(!room||room.phase!=='play')return;const dt=.05,now=Date.now();
 for(const k in room.stats)room.stats[k]=Math.max(0,room.stats[k]-.15*dt);
 for(const p of room.slots){
  const nx=Math.max(10,Math.min(W-10,p.x+p.dx*180*dt)),ny=Math.max(55,Math.min(H-10,p.y+p.dy*180*dt));
  if(!hit(nx,p.y))p.x=nx;if(!hit(p.x,ny))p.y=ny;
  p.jobs=p.jobs.filter(j=>{if(j.t>now)return true;
   for(const k in j.out)p.inv[k]=(p.inv[k]||0)+j.out[k];
   say(p,'📦 Fertig: '+Object.entries(j.out).map(([k,v])=>v+'× '+ITEM[k]).join(', '));return false})}
 const alarm=now<room.bellUntil;
 for(const n of room.npcs){
  if(alarm){n.tx=500;n.ty=300}else if(Math.random()<.01){n.tx=100+Math.random()*800;n.ty=170+Math.random()*240}
  const d=Math.hypot(n.tx-n.x,n.ty-n.y);if(d>4){const v=(alarm?90:35)*dt;n.x+=(n.tx-n.x)/d*v;n.y+=(n.ty-n.y)/d*v}}
},50);
setInterval(()=>{
 if(!room||room.phase!=='play')return;const now=Date.now();
 const low=Object.entries(room.stats).sort((a,b)=>a[1]-b[1])[0];
 io.to('screen').emit('state',{stats:room.stats,npcs:room.npcs,
  slots:room.slots.map(p=>({i:p.i,x:p.x,y:p.y,hidden:p.inside!==null,on:!!p.sock})),
  occupied:room.slots.filter(p=>p.inside!==null).map(p=>p.inside),
  bell:now<room.bellUntil?room.bell:null,warn:low[1]<30?low[0]:null,builds:BUILD,church:CHURCH});
 for(const p of room.slots){if(!p.sock)continue;const r=ROLES[p.role];
  const nb=BUILD.findIndex(b=>near(p,b)),mine=p.inside===p.role;
  io.to(p.sock).emit('me',{role:r.n,
   inside:p.inside!==null?BUILD[p.inside].name:null,mine,
   recipes:mine?r.r.map(x=>({id:x.id,n:x.n,i:fmt(x.i)||'nichts',
     o:fmt(x.o),t:x.t,ok:has(p,x)&&!p.cur})):[],
   near:p.inside===null?(near(p,CHURCH)?'Kirche':nb>=0?BUILD[nb].name:null):null,
   nearby:p.inside===null?room.slots.filter(q=>q!==p&&q.inside===null&&Math.hypot(p.x-q.x,p.y-q.y)<=90).map(q=>q.i):[],
   icon:RICON[p.role],inv:Object.keys(p.inv).filter(k=>p.inv[k]>0).map(k=>({k,n:p.inv[k],name:ITEM[k],icon:META[k][0],hint:META[k][1],sell:!!SELL[k]})),
   invKeys:Object.keys(p.inv).filter(k=>p.inv[k]>0),
   jobs:p.jobs.map(j=>({n:j.n,d:j.d,s:Math.max(0,Math.ceil((j.t-now)/1000))})),
   stats:Object.fromEntries(Object.entries(room.stats).map(([k,v])=>[k,Math.round(v)])),
   cd:Math.max(0,Math.ceil((12000-(now-lastBell))/1000))});}
},100);
srv.listen(PORT,()=>console.log('\nGroßer Bildschirm: http://localhost:'+PORT+'/screen.html\n'));
