// Chapter rules run only on the server; clients send actions, never outcomes.
const GOODS = {food:'Proviant',ammo:'Munition',med:'Medizin',planks:'Bretter'};
const ROUTES = {
  ridge:{name:'Höhenweg',seconds:90,wave:11,description:'Längerer Weg, weniger Banditen. Zeit für Reparaturen.'},
  canyon:{name:'Schlucht',seconds:60,wave:6,description:'Kürzerer Weg, häufige Hinterhalte. Munition einplanen.'}
};
function createCampaign(n) {
  return {stage:'prepare',paused:false,day:1,target:Math.max(2,Math.ceil(n/2)),supplies:{food:0,ammo:0,med:0,planks:0},
    votes:{},remaining:0,route:null,elapsed:0,progress:0,hp:100,enemies:[],shots:[],nextWave:5,serial:0,
    cooldowns:{},repairs:{},contributions:{},result:null,attempt:1};
}
function donate(c,p,key) {
  if(c.paused||c.stage!=='prepare'||!Object.hasOwn(GOODS,key)||!(p.inv[key]>0)||c.supplies[key]>=c.target)return false;
  p.inv[key]--;c.supplies[key]++;const row=c.contributions[p.i]||(c.contributions[p.i]={supplies:0,shots:0,repairs:0});row.supplies++;return true;
}
function startVote(c) {
  if(c.paused||c.stage!=='prepare'||c.supplies.food<1||c.supplies.planks<1)return false;
  c.stage='vote';c.remaining=20;c.votes={};return true;
}
const RALLY={x:500,y:385,radius:76};
function startRally(c,players,buildings){
 if(c.paused||c.stage!=='prepare'||c.supplies.food<1||c.supplies.planks<1)return false;
 c.stage='rally';c.ready={};c.votes={};
 for(const p of players){p.dx=p.dy=0;if(p.inside!==null){const b=buildings[p.inside];p.x=b.x+b.w/2;p.y=b.y+b.h+28;p.inside=null;p.interior=null;}}
 return true;
}
function rallyNear(p){return p.inside===null&&Math.hypot(p.x-RALLY.x,p.y-RALLY.y)<=RALLY.radius;}
function ready(c,p){if(c.paused||c.stage!=='rally'||!p.sock||!rallyNear(p))return false;c.ready[p.i]=true;p.dx=p.dy=0;return true;}
function cancelRally(c){if(c.paused||c.stage!=='rally')return false;c.stage='prepare';c.ready={};return true;}
function vote(c,p,route) {
  if(c.paused||c.stage!=='vote'||!Object.hasOwn(ROUTES,route))return false;
  c.votes[p.i]=route;return true;
}
function beginEscort(c,players) {
  const active=players.filter(p=>p.sock),v=active.map(p=>c.votes[p.i]);
  c.route=v.filter(x=>x==='canyon').length>v.filter(x=>x==='ridge').length?'canyon':'ridge';
  c.stage='escort';c.elapsed=0;c.progress=0;c.foodMark=0;c.hp=100;c.enemies=[];c.shots=[];c.nextWave=5;c.cooldowns={};c.repairs={};
  for(const p of players){p.town={x:p.x,y:p.y,inside:p.inside};p.inside=null;p.x=360+(p.i%4)*65;p.y=240+Math.floor(p.i/4)*125;p.dx=p.dy=0;}
}
function finish(c,players,won) {
  c.stage=won?'won':'lost';c.result=won?'Der Versorgungstreck ist angekommen. Kapitel 1 geschafft!':'Der Wagen ist verloren. Eure Stadt bleibt bestehen – bereitet einen neuen Versuch vor.';
  for(const p of players){if(p.town){Object.assign(p,p.town);delete p.town;}p.dx=p.dy=0;}
}
function act(c,p,kind) {
  if(c.paused||c.stage!=='escort'||!p.sock)return false;
  const row=c.contributions[p.i]||(c.contributions[p.i]={supplies:0,shots:0,repairs:0});
  if(kind==='repair'){
    if(Math.hypot(p.x-500,p.y-310)>110||c.hp>=100||c.supplies.planks<1||(c.repairs[p.i]||0)>c.elapsed)return false;
    c.supplies.planks--;c.hp=Math.min(100,c.hp+22);c.repairs[p.i]=c.elapsed+3;row.repairs++;return true;
  }
  if(kind!=='shoot'||(c.cooldowns[p.i]||0)>c.elapsed)return false;
  const enemy=c.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-p.x,e.y-p.y)<245).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0];
  if(!enemy)return false;
  const charged=c.supplies.ammo>0;if(charged)c.supplies.ammo--;
  enemy.hp-=charged?2:1;c.cooldowns[p.i]=c.elapsed+(charged?.55:1);row.shots++;
  c.shots.push({x:p.x,y:p.y,tx:enemy.x,ty:enemy.y,until:c.elapsed+.16});return true;
}
function tick(c,players,dt,random=Math.random) {
  if(c.paused||!players.some(p=>p.sock))return;
  if(c.stage==='rally'){
    const active=players.filter(p=>p.sock);for(const p of active)if(!rallyNear(p))delete c.ready[p.i];
    if(active.length&&active.every(p=>c.ready[p.i])){c.stage='vote';c.remaining=20;c.votes={};for(const p of players)p.dx=p.dy=0;}return;
  }
  if(c.stage==='vote'){
    c.remaining=Math.max(0,c.remaining-dt);const active=players.filter(p=>p.sock);
    if(c.remaining<=0||active.every(p=>c.votes[p.i]))beginEscort(c,players);
    return;
  }
  if(c.stage!=='escort')return;
  c.elapsed+=dt;const route=ROUTES[c.route],escorted=players.some(p=>p.sock&&Math.hypot(p.x-500,p.y-310)<190);
  if(escorted)c.progress+=dt/route.seconds*(c.supplies.food>0?1.12:1);
  const mark=Math.min(4,Math.floor(c.progress*4));if(mark>(c.foodMark||0)){c.supplies.food=Math.max(0,c.supplies.food-(mark-(c.foodMark||0)));c.foodMark=mark;}
  if(c.elapsed>=c.nextWave){
    c.nextWave+=route.wave;const count=Math.min(3,Math.max(1,Math.ceil(players.filter(p=>p.sock).length/3)));
    for(let j=0;j<count;j++){const side=random()<.5?-1:1;c.enemies.push({id:++c.serial,x:500+side*470,y:100+random()*400,hp:2});}
  }
  for(const e of c.enemies){if(e.hp<=0)continue;const d=Math.hypot(e.x-500,e.y-310);
    if(d>60){const v=36*dt;e.x+=(500-e.x)/d*v;e.y+=(310-e.y)/d*v;}
    else c.hp-=dt*3/Math.max(1,Math.sqrt(players.filter(p=>p.sock).length));
  }
  c.enemies=c.enemies.filter(e=>e.hp>0);c.shots=c.shots.filter(s=>s.until>c.elapsed);
  if(c.hp<35&&c.supplies.med>0){c.supplies.med--;c.hp=Math.min(100,c.hp+25);}
  if(c.hp<=0)finish(c,players,false);else if(c.progress>=1){c.progress=1;finish(c,players,true);}
}
function retry(c) {
  if(c.stage!=='lost'&&c.stage!=='won')return false;
  c.stage='prepare';c.day++;c.attempt++;c.result=null;c.paused=false;c.votes={};c.enemies=[];c.shots=[];c.progress=0;c.hp=100;return true;
}
function publicState(c,players) {
  return {rally:RALLY,ready:players.filter(p=>p.sock).map(p=>({i:p.i,near:rallyNear(p),ready:!!c.ready?.[p.i]})),stage:c.stage,paused:c.paused,day:c.day,target:c.target,supplies:{...c.supplies},remaining:Math.ceil(c.remaining),
    routes:ROUTES,route:c.route,progress:c.progress,hp:Math.max(0,Math.round(c.hp)),enemies:c.enemies.map(e=>({...e})),shots:c.shots.map(s=>({...s})),
    votes:Object.values(c.votes).length,voters:players.filter(p=>p.sock).length,result:c.result,attempt:c.attempt,
    escorted:players.some(p=>p.sock&&Math.hypot(p.x-500,p.y-310)<190),
    contributions:Object.entries(c.contributions).map(([i,v])=>({i:+i,...v}))};
}
module.exports={startRally,ready,cancelRally,rallyNear,GOODS,ROUTES,createCampaign,donate,startVote,vote,act,tick,retry,publicState};
