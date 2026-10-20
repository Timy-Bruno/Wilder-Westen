// First walkable interior: the trading post. Server-owned coordinates and interactions.
const SPEED=150;
const ROOM={w:800,h:620,spawn:{x:400,y:535},door:{x:350,y:570,w:100,h:30},solids:[
 {x:190,y:180,w:420,h:75,kind:'counter'},
 {x:45,y:125,w:85,h:280,kind:'shelf'},{x:670,y:125,w:85,h:280,kind:'shelf'},
 {x:325,y:390,w:150,h:65,kind:'display'},
 {x:165,y:460,w:65,h:65,kind:'barrels'},{x:585,y:450,w:65,h:65,kind:'crates'}
]};
function create(){return {...ROOM.spawn,dx:0,dy:0,menu:false,facing:Math.PI*1.5};}
function stand(x,y){return x>=30&&x<=770&&y>=105&&y<=580&&(y<=565||Math.abs(x-400)<=36)&&!ROOM.solids.some(r=>x>r.x-12&&x<r.x+r.w+12&&y>r.y-12&&y<r.y+r.h+12);}
function nearCounter(r){return !!r&&r.x>=230&&r.x<=570&&r.y>=267&&r.y<=340;}
function nearDoor(r){return !!r&&Math.hypot(r.x-400,r.y-577)<=75;}
function canTrade(p){return p.inside===3&&p.interior?.menu===true&&nearCounter(p.interior)&&!p.cur&&!p.hunt&&!p.forge;}
function control(r,v){if(!r||r.menu||!v||!Number.isFinite(v.x)||!Number.isFinite(v.y))return false;const n=Math.max(1,Math.hypot(v.x,v.y));r.dx=v.x/n;r.dy=v.y/n;return true;}
function stop(r){if(r)r.dx=r.dy=0;}
function tick(r,dt){if(!r||r.menu)return;dt=Math.min(.2,Math.max(0,dt));const dx=r.dx*SPEED*dt,dy=r.dy*SPEED*dt;if(stand(r.x+dx,r.y))r.x+=dx;if(stand(r.x,r.y+dy))r.y+=dy;if(dx||dy)r.facing=Math.atan2(dy,dx);}
function snapshot(p,players){if(p.inside!==3||!p.interior)return null;return {room:ROOM,player:{...p.interior},nearCounter:nearCounter(p.interior),nearDoor:nearDoor(p.interior),others:players.filter(q=>q!==p&&q.inside===3&&q.interior&&q.sock).map(q=>({i:q.i,x:q.interior.x,y:q.interior.y,facing:q.interior.facing}))};}
module.exports={SPEED,ROOM,create,stand,nearCounter,nearDoor,canTrade,control,stop,tick,snapshot};
