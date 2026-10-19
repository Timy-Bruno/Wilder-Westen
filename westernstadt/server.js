const express=require('express'),http=require('http'),os=require('os'),QR=require('qrcode');
const {Server}=require('socket.io');
const {randomUUID}=require('crypto');
const Campaign=require('./campaign');
const {ITEM,SELL,META,STN,RICON,ROLES}=require('./data');
const app=express(),srv=http.createServer(app),io=new Server(srv);
app.get('/manifest.json',(q,r)=>{const sl=Math.max(0,Math.min(7,+q.query.slot||0));
 r.type('application/manifest+json').json({name:'Wilder Westen',short_name:'Wilder Westen',start_url:'/phone.html?slot='+sl,scope:'/',display:'fullscreen',orientation:'any',background_color:'#1a0f07',theme_color:'#120a04',
  icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icon-512.png',sizes:'512x512',type:'image/png'}]})});
app.use(express.static(__dirname+'/public'));
const PORT=process.env.PORT||3000,W=1000,H=600;
const fmt=o=>Object.entries(o).map(([k,v])=>META[k][0]+' '+v+'× '+ITEM[k]).join('  +  ');
const BUILD=ROLES.map((r,i)=>({name:r.b,ic:RICON[i],x:60+(i%4)*230,y:i<4?50:430,w:130,h:100}));
const CHURCH={name:'Kirche',x:435,y:240,w:130,h:110};
const SOLID=[...BUILD,CHURCH];
let room=null,lastBell=0;
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const near=(p,b,m=35)=>p.x>b.x-m&&p.x<b.x+b.w+m&&p.y>b.y-m&&p.y<b.y+b.h+m;
const hit=(x,y)=>SOLID.some(b=>x>b.x-12&&x<b.x+b.w+12&&y>b.y-12&&y<b.y+b.h+12);
const has=(p,r)=>Object.entries(r.i).every(([k,v])=>(p.inv[k]||0)>=v);
const isSvc=r=>Object.keys(r.i).length>0;
function lanIP(){try{for(const l of Object.values(os.networkInterfaces()))for(const a of l)if(a.family==='IPv4'&&!a.internal)return a.address;}catch{}return 'localhost'}
function lobby(){if(!room)return;io.to('screen').emit('lobby',room.slots.map(p=>({i:p.i,qr:p.qr,on:!!p.sock})))}
const say=(p,t)=>p&&p.sock&&io.to(p.sock).emit('msg',t);
io.on('connection',s=>{
 const P=()=>{const p=room&&room.slots[s.data.slot];return p&&p.sock===s.id?p:null};
 const host=()=>room&&room.hostToken===s.data.hostToken;
 s.use(([event],next)=>{if(['input','act','craft','fulfill','result','order','collect','deliver','give','bell'].includes(event)&&room&&(room.campaign.paused||(room.campaign.stage!=='prepare'&&!(event==='input'&&room.campaign.stage==='escort'))))return;next()});
 s.on('screen',token=>{if(!room||token!==room.hostToken)return;s.data.hostToken=token;s.join('screen');lobby();if(room.phase==='play')s.emit('started')});
 s.on('create',async n=>{
  if(room)return s.emit('err','Es läuft bereits eine Partie. Öffne den ursprünglichen Hauptbildschirm.');
  n=Math.max(1,Math.min(8,n|0));
  const roles=shuffle([...ROLES.keys()]).slice(0,n),h=s.handshake.headers,host=h.host||'',proto=(h['x-forwarded-proto']||'http').split(',')[0],
   base=/^(localhost|127\.)/.test(host)?'http://'+lanIP()+':'+PORT:proto+'://'+host;
  room={hostToken:randomUUID(),campaign:Campaign.createCampaign(n),phase:'lobby',stats:{food:60,ammo:60,med:60,morale:60,security:60},slots:[],npcs:[],orders:[],oid:1,bellUntil:0,bell:null};
  for(let i=0;i<n;i++){const url=base+'/phone.html?slot='+i;
   room.slots.push({i,role:roles[i],x:300+i*55,y:400,dx:0,dy:0,inside:null,cur:null,curOrder:null,jobs:[],inv:{ore:2,coal:1,herbs:2,wood:2,meat:1},
    sock:null,qr:await QR.toDataURL(url,{margin:1,width:200})});}
  for(let i=0;i<6;i++)room.npcs.push({x:200+Math.random()*600,y:200+Math.random()*200,tx:500,ty:380});
  s.data.hostToken=room.hostToken;s.emit('hostToken',room.hostToken);s.join('screen');lobby();
 });
 s.on('start',()=>{if(host()&&room.phase==='lobby'){room.phase='play';io.to('screen').emit('started')}});
 s.on('join',i=>{const p=room&&room.slots[i|0];if(!p)return s.emit('err','Kein Spiel gefunden. Erst am großen Bildschirm starten.');
  if(p.sock&&p.sock!==s.id){const old=io.sockets.sockets.get(p.sock);if(old)old.disconnect(true);}
  p.dx=p.dy=0;p.sock=s.id;s.data.slot=i|0;lobby();if(p.cur)s.emit('game',{g:p.cur.g,n:p.cur.n,h:p.cur.h})});
 s.on('input',v=>{if(!v||typeof v!=='object')return;const p=P();if(!p||room.phase!=='play'||p.inside!==null)return;
  p.dx=Math.max(-1,Math.min(1,+v.dx||0));p.dy=Math.max(-1,Math.min(1,+v.dy||0))});
 s.on('act',()=>{const p=P();if(!p||room.phase!=='play'||p.cur)return;
  if(p.inside!==null){p.inside=null;return}
  const b=BUILD.findIndex(b=>near(p,b));if(b>=0){p.inside=b;p.dx=p.dy=0}});
 s.on('craft',rid=>{const p=P();if(!p||p.inside===null||p.cur||(p.inside!==p.role&&room.slots.some(q=>q.role===p.inside)))return;
  const r=ROLES[p.inside].r.find(x=>x.id===rid);if(!r||!has(p,r))return;
  for(const k in r.i)p.inv[k]-=r.i[k];p.cur=p.inside===p.role?r:{...r,t:r.t*2};p.curOrder=null;s.emit('game',{g:r.g,n:r.n,h:r.h})});
 s.on('fulfill',oid=>{const p=P(),o=room&&room.orders.find(x=>x.id===oid);
  if(!p||!o||o.to!==p.i||o.st!=='open'||p.inside!==p.role||p.cur)return;
  const r=ROLES[p.role].r.find(x=>x.id===o.rid);o.st='work';p.cur=r;p.curOrder=o;s.emit('game',{g:r.g,n:r.n+' (Auftrag)',h:r.h})});
 s.on('result',sc=>{const p=P();if(!p||!p.cur)return;const r=p.cur,o=p.curOrder;p.cur=null;p.curOrder=null;sc=Math.max(0,Math.min(1,+sc||0));
  if(sc<.35){if(o){room.orders=room.orders.filter(x=>x!==o);say(room.slots[o.from],'❌ Dein Auftrag „'+o.n+'“ ist misslungen. Das Material ist verloren.')}
   return say(p,'❌ Misslungen! Das Material ist verloren.')}
  const out={...r.o},bonus=sc>=.8;if(bonus){const k=Object.keys(out)[0];out[k]++}
  p.jobs.push({n:r.n,d:r.t,t:Date.now()+r.t*1000,out,order:o?o.id:null});
  say(p,(bonus?'⭐ Perfekt, Bonus! ':'✔ Gelungen. ')+'Fertig in '+r.t+' Sekunden – du kannst derweil etwas anderes tun.')});
 s.on('order',rid=>{const p=P();if(!p||p.inside===null||p.inside===p.role||p.cur)return;
  const prov=room.slots.find(q=>q.role===p.inside&&q!==p),r=ROLES[p.inside].r.find(x=>x.id===rid);
  if(!prov||!r||!isSvc(r)||!has(p,r))return;
  for(const k in r.i)p.inv[k]-=r.i[k];
  room.orders.push({id:room.oid++,from:p.i,to:prov.i,bi:p.inside,rid,n:r.n,st:'open',out:null});
  say(p,'📋 Auftrag aufgegeben. Du wirst benachrichtigt, wenn er fertig ist.');
  say(prov,'📋 Neuer Auftrag von Spieler '+(p.i+1)+': '+r.n+'. Geh in dein Gebäude, um ihn zu bearbeiten.')});
 s.on('collect',oid=>{const p=P(),o=room&&room.orders.find(x=>x.id===oid);
  if(!p||!o||o.st!=='ready'||o.from!==p.i||p.inside!==o.bi)return;
  for(const k in o.out)p.inv[k]=(p.inv[k]||0)+o.out[k];room.orders=room.orders.filter(x=>x!==o);
  say(p,'📦 Abgeholt: '+Object.entries(o.out).map(([k,v])=>v+'× '+ITEM[k]).join(', '))});
 s.on('deliver',()=>{const p=P();if(!p||p.inside!==null||!near(p,CHURCH))return;const t=[],g={};
  for(const k in SELL){const n=p.inv[k]||0;if(n){const [st,v]=SELL[k];room.stats[st]=Math.min(100,room.stats[st]+n*v);g[st]=(g[st]||0)+n*v;p.inv[k]=0;t.push(n+'× '+ITEM[k])}}
  if(!t.length)return say(p,'Nichts zum Abliefern. Rohstoffe müssen erst verarbeitet werden.');
  say(p,'✔ Abgeliefert: '+t.join(', '));
  io.to('screen').emit('fx',Object.entries(g).map(([st,v],i)=>({t:'+'+v+' '+STN[st],x:CHURCH.x+65,y:CHURCH.y-10-i*22})))});
 s.on('give',(v)=>{if(!v||typeof v!=='object')return;const {to,item}=v;const p=P(),q=room&&room.slots[to|0];
  if(!p||!q||p===q||p.inside!==null||q.inside!==null||!(p.inv[item]>0)||Math.hypot(p.x-q.x,p.y-q.y)>90)return;
  p.inv[item]--;q.inv[item]=(q.inv[item]||0)+1;say(p,'Gegeben: '+ITEM[item]+' an Spieler '+(q.i+1));say(q,'Du hast '+ITEM[item]+' von Spieler '+(p.i+1)+' bekommen!')});
 s.on('bell',sig=>{const p=P();if(!p||p.inside!==null||!near(p,CHURCH)||Date.now()-lastBell<12000)return;
  sig=[1,2,3].includes(sig)?sig:1;lastBell=Date.now();
  const txt={1:'Mangel! Es fehlt etwas in der Stadt.',2:'Gefahr! Ein Angriff naht.',3:'Feuer in der Stadt!'}[sig];
  const needed=Math.min(...Object.values(room.stats))<30;
  room.stats.morale=Math.max(0,Math.min(100,room.stats.morale+(needed?4:-6)));
  room.bellUntil=Date.now()+8000;room.bell={sig,txt,by:p.i,false:!needed};
  for(const q of room.slots)if(q.sock)io.to(q.sock).emit('alert',{sig,txt})});
 s.on('donate',key=>{const p=P();if(p&&p.inside===null&&near(p,CHURCH)&&Campaign.donate(room.campaign,p,key))say(p,'Für den Treck eingelagert: '+Campaign.GOODS[key])});
 s.on('depart',()=>{if(!host()||room.phase!=='play')return;
  if(room.slots.some(p=>p.cur))return s.emit('err','Bitte beendet zuerst die laufenden Minispiele.');
  if(!Campaign.startVote(room.campaign))s.emit('err','Mindestens 1 Proviant und 1 Brett an der Kirche einlagern.');
  for(const p of room.slots)p.dx=p.dy=0;
 });
 s.on('routeVote',route=>{const p=P();if(p)Campaign.vote(room.campaign,p,route)});
 s.on('missionAction',kind=>{const p=P();if(p)Campaign.act(room.campaign,p,kind)});
 s.on('pause',()=>{if(!host()||room.phase!=='play')return;if(room.slots.some(p=>p.cur))return s.emit('err','Bitte beendet zuerst die laufenden Minispiele.');room.campaign.paused=!room.campaign.paused;for(const p of room.slots)p.dx=p.dy=0});
 s.on('retry',()=>{if(host())Campaign.retry(room.campaign)});
 s.on('disconnect',()=>{const p=P();if(p&&p.sock===s.id){p.sock=null;p.dx=p.dy=0;lobby()}});
});
let previousTick=Date.now();
setInterval(()=>{
 const now=Date.now(),wall=now-previousTick;previousTick=now;
 if(!room||room.phase!=='play')return;const dt=Math.min(.2,wall/1000);
 if(room.campaign.paused||!room.slots.some(p=>p.sock)){for(const p of room.slots)for(const j of p.jobs)j.t+=wall;return;}
 Campaign.tick(room.campaign,room.slots,dt);
 if(room.campaign.stage==='escort'){for(const p of room.slots){for(const j of p.jobs)j.t+=wall;p.x=Math.max(25,Math.min(W-25,p.x+p.dx*190*dt));p.y=Math.max(95,Math.min(H-25,p.y+p.dy*190*dt));}return;}
 if(room.campaign.stage!=='prepare'){for(const p of room.slots)for(const j of p.jobs)j.t+=wall;return;}
 for(const k in room.stats)room.stats[k]=Math.max(0,room.stats[k]-.15*dt);
 for(const p of room.slots){
  const nx=Math.max(10,Math.min(W-10,p.x+p.dx*180*dt)),ny=Math.max(55,Math.min(H-10,p.y+p.dy*180*dt));
  if(!hit(nx,p.y))p.x=nx;if(!hit(p.x,ny))p.y=ny;
  p.jobs=p.jobs.filter(j=>{if(j.t>now)return true;
   if(j.order){const o=room.orders.find(x=>x.id===j.order);
    if(o){o.st='ready';o.out=j.out;say(room.slots[o.from],'✅ Dein Auftrag „'+o.n+'“ ist fertig. Hol ihn in der '+BUILD[o.bi].name+' ab.');say(p,'✔ Auftrag erledigt, der Kunde wird benachrichtigt.')}
    return false}
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
 io.to('screen').emit('state',{campaign:Campaign.publicState(room.campaign,room.slots),stats:room.stats,npcs:room.npcs,
  slots:room.slots.map(p=>({i:p.i,x:p.x,y:p.y,hidden:p.inside!==null,on:!!p.sock})),
  occupied:room.slots.filter(p=>p.inside!==null).map(p=>p.inside),
  bell:now<room.bellUntil?room.bell:null,warn:low[1]<30?low[0]:null,builds:BUILD,church:CHURCH});
 for(const p of room.slots){if(!p.sock)continue;const r=ROLES[p.role];
  const nb=BUILD.findIndex(b=>near(p,b)),mine=p.inside!==null&&(p.inside===p.role||!room.slots.some(q=>q.role===p.inside)),inB=p.inside!==null;
  io.to(p.sock).emit('me',{campaign:Campaign.publicState(room.campaign,room.slots),myVote:room.campaign.votes[p.i]||null,position:{x:p.x,y:p.y},slot:p.i,apprentice:mine&&p.inside!==p.role,role:r.n,icon:RICON[p.role],
   inside:inB?BUILD[p.inside].name:null,mine,
   recipes:mine?ROLES[p.inside].r.map(x=>({id:x.id,n:x.n,i:fmt(x.i)||'nichts',o:fmt(x.o),t:x.t*(p.inside===p.role?1:2),ok:has(p,x)&&!p.cur})):[],
   bld:inB&&!mine?{provider:room.slots.some(q=>q.role===p.inside&&q!==p),
     svc:ROLES[p.inside].r.filter(isSvc).map(x=>({id:x.id,n:x.n,i:fmt(x.i),o:fmt(x.o),t:x.t,ok:has(p,x)})),
     pick:room.orders.filter(o=>o.from===p.i&&o.st==='ready'&&o.bi===p.inside).map(o=>({id:o.id,n:o.n}))}:null,
   orders:{inc:room.orders.filter(o=>o.to===p.i&&(o.st==='open'||o.st==='work')).map(o=>({id:o.id,n:o.n,from:o.from,st:o.st})),
     mine:room.orders.filter(o=>o.from===p.i).map(o=>({id:o.id,n:o.n,st:o.st,b:BUILD[o.bi].name}))},
   near:!inB?(near(p,CHURCH)?'Kirche':nb>=0?BUILD[nb].name:null):null,
   nearby:!inB?room.slots.filter(q=>q!==p&&q.inside===null&&Math.hypot(p.x-q.x,p.y-q.y)<=90).map(q=>q.i):[],
   inv:Object.keys(p.inv).filter(k=>p.inv[k]>0).map(k=>({k,n:p.inv[k],name:ITEM[k],icon:META[k][0],hint:META[k][1],sell:!!SELL[k]})),
   jobs:p.jobs.map(j=>({n:j.n,d:j.d,s:Math.max(0,Math.ceil((j.t-now)/1000))})),
   stats:Object.fromEntries(Object.entries(room.stats).map(([k,v])=>[k,Math.round(v)])),
   cd:Math.max(0,Math.ceil((12000-(now-lastBell))/1000))});}
},100);
srv.listen(PORT,()=>console.log('\nGroßer Bildschirm: http://localhost:'+PORT+'/screen.html\n'));

