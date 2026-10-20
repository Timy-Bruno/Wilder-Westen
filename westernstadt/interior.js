// First walkable interior: the trading post. Server-owned coordinates and interactions.
const SPEED=150;
const {rooms,casino}=require('./room-definitions');
const roomFor=(id,floor=0)=>id===4&&floor===1?casino:id===3?ROOM:rooms[id];
const ROOM={w:800,h:620,spawn:{x:400,y:535},door:{x:350,y:570,w:100,h:30},solids:[
 {x:190,y:180,w:420,h:75,kind:'counter'},
 {x:45,y:125,w:85,h:280,kind:'shelf'},{x:670,y:125,w:85,h:280,kind:'shelf'},
 {x:325,y:390,w:150,h:65,kind:'display'},
 {x:165,y:460,w:65,h:65,kind:'barrels'},{x:585,y:450,w:65,h:65,kind:'crates'}
]};
function create(id=3){return {roomId:id,floor:0,...(roomFor(id)||ROOM).spawn,dx:0,dy:0,menu:false,facing:Math.PI*1.5};}
function stand(x,y,id=3,floor=0){return x>=30&&x<=770&&y>=105&&y<=580&&(y<=565||Math.abs(x-400)<=36)&&!(roomFor(id,floor)||ROOM).solids.some(r=>x>r.x-12&&x<r.x+r.w+12&&y>r.y-12&&y<r.y+r.h+12);}
function nearCounter(r){return !!r&&r.x>=230&&r.x<=570&&r.y>=267&&r.y<=340;}
function nearDoor(r){return !!r&&Math.hypot(r.x-400,r.y-577)<=75;}
function canTrade(p){return p.inside===3&&p.interior?.menu===true&&nearCounter(p.interior)&&!p.cur&&!p.hunt&&!p.forge;}
function control(r,v){if(!r||r.menu||!v||!Number.isFinite(v.x)||!Number.isFinite(v.y))return false;const n=Math.max(1,Math.hypot(v.x,v.y));r.dx=v.x/n;r.dy=v.y/n;return true;}
function stop(r){if(r)r.dx=r.dy=0;}
function tick(r,dt){if(!r||r.menu)return;dt=Math.min(.2,Math.max(0,dt));const dx=r.dx*SPEED*dt,dy=r.dy*SPEED*dt;if(stand(r.x+dx,r.y,r.roomId,r.floor))r.x+=dx;if(stand(r.x,r.y+dy,r.roomId,r.floor))r.y+=dy;if(dx||dy)r.facing=Math.atan2(dy,dx);}
function station(r){if(!r)return null;if((r.roomId??3)===3)return nearCounter(r)?{id:'trade',label:'Theke',recipes:['wood','herb']}:null;return roomFor(r.roomId,r.floor)?.stations.find(s=>r.x>=s.reach.x&&r.x<=s.reach.x+s.reach.w&&r.y>=s.reach.y&&r.y<=s.reach.y+s.reach.h)||null;}
function stairs(p,from,to){const r=p.interior;if(p.inside!==4||!r||r.menu)return false;if(!from||!to)return false;const up=!r.floor,line=up?420:510;if(up?!(from.y>=line&&to.y<line):!(from.y<=line&&to.y>line))return false;const t=(line-from.y)/(to.y-from.y),x=from.x+(to.x-from.x)*t;if(x<665||x>770)return false;r.floor=up?1:0;r.x=715;r.y=up?465:455;stop(r);return true;}
function canWork(p,recipe){const s=station(p?.interior);return !!s&&p.interior.menu===true&&(!recipe||s.recipes.includes(recipe));}
function snapshot(p,players){if(!roomFor(p.inside)||!p.interior)return null;const at=station(p.interior);return {room:{...roomFor(p.inside,p.interior.floor),id:p.inside,name:roomFor(p.inside,p.interior.floor).name||require('./room-definitions').names[p.inside]},player:{...p.interior,character:require('./character').view(p)},station:at,nearCounter:!!at,nearDoor:!p.interior.floor&&nearDoor(p.interior),others:players.filter(q=>q!==p&&q.inside===p.inside&&q.interior&&(q.interior.floor||0)===(p.interior.floor||0)&&q.sock).map(q=>({i:q.i,character:require('./character').view(q),x:q.interior.x,y:q.interior.y,facing:q.interior.facing,dx:q.interior.dx,dy:q.interior.dy}))};}
module.exports={SPEED,ROOM,roomFor,station,stairs,canWork,create,stand,nearCounter,nearDoor,canTrade,control,stop,tick,snapshot};
