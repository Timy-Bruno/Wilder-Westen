const express=require('express'),http=require('http'),os=require('os'),QR=require('qrcode');
const {Server}=require('socket.io');
const app=express(),srv=http.createServer(app),io=new Server(srv);
app.use(express.static(__dirname+'/public'));
const PORT=3000,W=1000,H=600;
const ROLES=[
 {n:'Schmied',b:'Schmiede',s:'ammo',t:'Hämmern'},
 {n:'Doc',b:'Arztpraxis',s:'med',t:'Medizin mischen'},
 {n:'Sheriff',b:'Sheriff-Büro',s:'security',t:'Wachen einteilen'},
 {n:'Händler',b:'Laden',s:'food',t:'Waren besorgen'},
 {n:'Saloon-Wirt',b:'Saloon',s:'morale',t:'Whiskey ausschenken'},
 {n:'Jäger',b:'Jagdhütte',s:'food',t:'Fallen prüfen'},
 {n:'Sprengmeister',b:'Mine',s:'ammo',t:'Dynamit wickeln'},
 {n:'Baumeister',b:'Zimmerei',s:'security',t:'Bretter nageln'}];
const BUILD=ROLES.map((r,i)=>({name:r.b,x:60+(i%4)*230,y:i<4?50:430,w:130,h:100}));
const CHURCH={name:'Kirche',x:435,y:240,w:130,h:110};
let room=null,lastBell=0;
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const near=(p,b,m=35)=>p.x>b.x-m&&p.x<b.x+b.w+m&&p.y>b.y-m&&p.y<b.y+b.h+m;
function lanIP(){for(const l of Object.values(os.networkInterfaces()))for(const a of l)if(a.family==='IPv4'&&!a.internal)return a.address;return 'localhost'}
function lobby(){if(!room)return;io.to('screen').emit('lobby',room.slots.map(p=>({i:p.i,qr:p.qr,on:!!p.sock})))}
io.on('connection',s=>{
 const P=()=>room&&room.slots[s.data.slot];
 s.on('create',async n=>{
  n=Math.max(1,Math.min(8,n|0));
  const roles=shuffle([...ROLES.keys()]).slice(0,n),base='http://'+lanIP()+':'+PORT;
  room={phase:'lobby',stats:{food:60,ammo:60,med:60,morale:60,security:60},slots:[],npcs:[],bellUntil:0,bell:null};
  for(let i=0;i<n;i++){const url=base+'/phone.html?slot='+i;
   room.slots.push({i,role:roles[i],x:300+i*55,y:400,dx:0,dy:0,inside:null,prog:0,done:0,sock:null,
    qr:await QR.toDataURL(url,{margin:1,width:200})});}
  for(let i=0;i<6;i++)room.npcs.push({x:200+Math.random()*600,y:200+Math.random()*200,tx:500,ty:380});
  s.join('screen');lobby();
 });
 s.on('start',()=>{if(room){room.phase='play';io.to('screen').emit('started')}});
 s.on('join',i=>{const p=room&&room.slots[i|0];if(!p)return s.emit('err','Kein Spiel gefunden. Erst am großen Bildschirm starten.');
  p.sock=s.id;s.data.slot=i|0;lobby()});
 s.on('input',v=>{const p=P();if(!p||room.phase!=='play'||p.inside!==null)return;
  p.dx=Math.max(-1,Math.min(1,+v.dx||0));p.dy=Math.max(-1,Math.min(1,+v.dy||0))});
 s.on('act',()=>{const p=P();if(!p||room.phase!=='play')return;
  if(p.inside!==null){p.inside=null;p.prog=0;return}
  const b=BUILD.findIndex(b=>near(p,b));if(b>=0){p.inside=b;p.dx=p.dy=0;p.prog=0}});
 s.on('work',()=>{const p=P();if(!p||p.inside!==p.role)return;
  p.prog+=10;if(p.prog>=100){p.prog=0;p.done++;const st=ROLES[p.role].s;room.stats[st]=Math.min(100,room.stats[st]+8)}});
 s.on('bell',sig=>{const p=P();if(!p||p.inside!==null||!near(p,CHURCH)||Date.now()-lastBell<12000)return;
  sig=[1,2,3].includes(sig)?sig:1;lastBell=Date.now();
  const txt={1:'Mangel! Es fehlt etwas in der Stadt.',2:'Gefahr! Ein Angriff naht.',3:'Feuer in der Stadt!'}[sig];
  const needed=Math.min(...Object.values(room.stats))<30;
  room.stats.morale=Math.max(0,Math.min(100,room.stats.morale+(needed?4:-6)));
  room.bellUntil=Date.now()+8000;room.bell={sig,txt,by:p.i,false:!needed};
  for(const q of room.slots)if(q.sock)io.to(q.sock).emit('alert',{sig,txt});
 });
 s.on('disconnect',()=>{const p=P();if(p&&p.sock===s.id){p.sock=null;p.dx=p.dy=0;lobby()}});
});
setInterval(()=>{
 if(!room||room.phase!=='play')return;const dt=.05,now=Date.now();
 for(const k in room.stats)room.stats[k]=Math.max(0,room.stats[k]-.4*dt);
 for(const p of room.slots){p.x=Math.max(10,Math.min(W-10,p.x+p.dx*180*dt));p.y=Math.max(55,Math.min(H-10,p.y+p.dy*180*dt))}
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
  const nb=BUILD.findIndex(b=>near(p,b));
  io.to(p.sock).emit('me',{role:r.n,task:r.t,home:r.b,
   inside:p.inside!==null?BUILD[p.inside].name:null,mine:p.inside===p.role,
   near:p.inside===null?(near(p,CHURCH)?'Kirche':nb>=0?BUILD[nb].name:null):null,
   prog:p.prog,done:p.done,cd:Math.max(0,Math.ceil((12000-(now-lastBell))/1000))});}
},100);
srv.listen(PORT,()=>console.log('\nGroßer Bildschirm: http://localhost:'+PORT+'/screen.html\nHandys (gleiches WLAN) scannen die QR-Codes dort.\n'));
