// Server-owned woodland: movement, visibility, aim and loot use world coordinates.
const WORLD={w:1280,h:1040},clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const TREES=[
 [90,140],[210,110],[350,145],[490,95],[640,120],[790,100],[950,145],[1120,110],[1200,260],
 [80,300],[220,275],[360,260],[490,225],[850,230],[1010,290],[1130,390],
 [85,470],[245,430],[355,385],[915,420],[1200,540],[1035,550],
 [90,630],[300,570],[425,520],[820,570],[940,680],[1140,710],
 [70,840],[345,745],[475,700],[645,660],[800,790],[1050,880],[1200,930],
 [120,975],[300,955],[440,900],[600,960],[720,905],[910,995]
].map(([x,y],i)=>({id:i,x,y,r:17+(i%3)*2,size:76+(i%5)*9}));
const ROCKS=[{x:400,y:650,r:22},{x:875,y:320,r:23},{x:1100,y:790,r:26},{x:560,y:870,r:20}];
const TRACKS=[{x:235,y:750},{x:290,y:703},{x:350,y:655},{x:420,y:600},{x:480,y:550},{x:540,y:500},{x:595,y:450}];
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function segmentDistance(a,b,p){const dx=b.x-a.x,dy=b.y-a.y,t=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(a.x+dx*t-p.x,a.y+dy*t-p.y)}
function lineClear(a,b){return ![...TREES,...ROCKS].some(o=>segmentDistance(a,b,o)<o.r);}
function canStand(x,y,r=11){return x>=30&&y>=30&&x<=WORLD.w-30&&y<=WORLD.h-30&&![...TREES,...ROCKS].some(o=>Math.hypot(x-o.x,y-o.y)<o.r+r);}
function move(entity,dx,dy,r=11){if(canStand(entity.x+dx,entity.y,r))entity.x+=dx;if(canStand(entity.x,entity.y+dy,r))entity.y+=dy;}
function createField(){return {trap:null,pendingNotice:false,catches:0,condition:3,repairId:null,ammo:6,bait:1,rifleLevel:1};}
function nearTrail(p){return TRACKS.some(t=>dist(p,t)<=85);}
const SPECIES={
 deer:{name:'Waldhirsch',speed:27,flee:155,hearing:1,hit:17,meat:2,hide:1},
 hare:{name:'Feldhase',speed:39,flee:190,hearing:1.08,hit:11,meat:1,hide:1},
 boar:{name:'Wildschwein',speed:23,flee:125,hearing:.85,hit:19,meat:3,hide:1},
 fox:{name:'Rotfuchs',speed:35,flee:175,hearing:1.15,hit:13,meat:1,hide:2}
};
const species=a=>SPECIES[a.kind]||SPECIES.deer;
function clearRoute(a,b,r=11){return ![...TREES,...ROCKS].some(o=>segmentDistance(a,b,o)<o.r+r);}
function randomPlace(random,accept=()=>true){
 for(let n=0;n<100;n++){const p={x:70+random()*(WORLD.w-140),y:70+random()*(WORLD.h-140)};if(canStand(p.x,p.y)&&accept(p))return p;}
 // Bounded fallback also supports deterministic random sources without infinite loops.
 const candidates=[];for(let y=85;y<WORLD.h-60;y+=85)for(let x=85;x<WORLD.w-60;x+=85)if(canStand(x,y)&&accept({x,y}))candidates.push({x,y});
 return candidates[Math.floor(random()*candidates.length)%candidates.length]||{x:650,y:405};
}
function destination(a,random,bait=null){
 if(bait&&dist(a,bait)>25&&clearRoute(a,bait))return {x:bait.x,y:bait.y};
 for(let i=0;i<24;i++){const angle=random()*Math.PI*2,length=100+random()*260,p={x:clamp(a.x+Math.cos(angle)*length,55,WORLD.w-55),y:clamp(a.y+Math.sin(angle)*length,55,WORLD.h-55)};if(dist(a,p)>55&&canStand(p.x,p.y)&&clearRoute(a,p))return p;}
 return {x:a.x,y:a.y};
}
function create(field=createField(),options={}){
 const random=options.random||Math.random,player={x:180,y:810,dx:0,dy:0,facing:0},animals=[];
 for(const [i,kind] of ['deer','deer','deer','hare','hare','boar','boar','fox'].entries()){
  const p=randomPlace(random,p=>dist(p,player)>330&&animals.every(a=>dist(a,p)>145)),goal=destination(p,random);
  animals.push({id:i+1,kind,...p,dir:random()<.5?-1:1,mode:random()<.65?'walk':'graze',until:2+random()*7,tx:goal.x,ty:goal.y,alive:true,fade:0,lastTrack:{...p}});
 }
 return {hunter:!!options.hunter,carryLimit:options.hunter?3:1,field,elapsed:0,ammo:field.ammo??6,bait:field.bait??1,baitSpot:null,sneak:false,aiming:false,focus:0,suspended:false,
 player,targetId:null,cooldown:0,kills:0,shots:0,loot:{meat:0,hide:0},status:'active',
 message:'Suche an Lichtungen und am Bach. Frische Fährten verraten, wo Tiere vorbeigezogen sind. Bewege dich leise.',animals,trails:[],lastShot:null};
}
function visible(h,a){return a.alive&&dist(h.player,a)<=370&&lineClear(h.player,a);}
function selected(h){return h.animals.find(a=>a.id===h.targetId&&visible(h,a));}
function aimInfo(h){const a=selected(h);if(!a)return null;const distance=dist(h.player,a),moving=a.mode==='walk'||a.mode==='flee';
 const radius=(1-h.focus)*(30+distance*.09)+(moving?8:1.5),angle=h.elapsed*2.3;
 return {targetId:a.id,distance:Math.round(distance/5),inRange:distance<=(h.field.weapon==='revolver'?200:h.field.rifleLevel>=2?350:300),clear:lineClear(h.player,a),focus:h.focus,radius,
 x:a.x+Math.cos(angle)*radius,y:a.y+Math.sin(angle)*radius};}
function control(h,input){
 if(!input||typeof input!=='object')return false;
 if(input.type==='suspend'){h.suspended=input.active===true;h.player.dx=h.player.dy=0;h.aiming=false;h.focus=0;return true;}
 if(h.status!=='active'||h.suspended)return false;
 if(input.type==='move'){
  if(!Number.isFinite(input.x)||!Number.isFinite(input.y))return false;
  const n=Math.max(1,Math.hypot(input.x,input.y));h.player.dx=input.x/n;h.player.dy=input.y/n;return true;
 }
 if(input.type==='sneak'){h.sneak=input.active===true;return true;}
 if(input.type==='select'){
  const a=h.animals.find(a=>a.id===input.id&&visible(h,a));if(!a)return false;
  h.targetId=a.id;h.focus=0;h.message='Zielen gedrückt halten. Schieße, wenn der helle Zielpunkt auf dem Tier liegt.';return true;
 }
 if(input.type==='aim'){
  h.aiming=input.active===true;
  if(h.aiming&&!selected(h)){const a=h.animals.filter(a=>visible(h,a)).sort((a,b)=>dist(h.player,a)-dist(h.player,b))[0];h.targetId=a?.id??null;}
  if(!h.aiming)h.focus=0;return true;
 }
 const trap=h.field.trap,near=trap&&dist(h.player,trap)<=65;
 if(input.type==='trapPlace'){
  if(trap||h.field.repairId||h.field.condition<=0||!nearTrail(h.player)||!canStand(h.player.x,h.player.y))return false;
  h.field.trap={x:h.player.x,y:h.player.y,state:'armed',baited:false,progress:0};h.message='Falle am Wildwechsel aufgestellt. Mit Köder geht es schneller. Geh auf Abstand oder erledige etwas in der Stadt.';return true;
 }
 if(input.type==='trapBait'){
  if(!near||trap.state!=='armed'||trap.baited||h.bait<1)return false;
  h.bait--;h.field.bait=h.bait;trap.baited=true;h.message='Köder in der Falle. Halte Abstand, damit sich Kleinwild herantraut.';return true;
 }
 if(input.type==='trapCollect'){
  if(!near||trap.state!=='caught')return false;
  trap.state=h.field.condition>0?'empty':'broken';trap.baited=false;trap.progress=0;h.field.pendingNotice=false;h.loot.meat++;h.loot.hide++;h.message=h.field.condition>0?'Fang geborgen: 1 Fleisch und 1 Fell. Du kannst die Falle erneut spannen oder aufnehmen.':'Fang geborgen. Die Feder ist verschlissen – nimm die Falle auf und bring sie zur Schmiede.';return true;
 }
 if(input.type==='trapArm'){
  if(!near||trap.state!=='empty'||h.field.condition<=0||h.field.repairId)return false;
  trap.state='armed';trap.progress=0;h.message='Falle wieder gespannt. Köder einlegen oder auf Abstand gehen.';return true;
 }
 if(input.type==='trapPickup'){
  if(!near||trap.state==='caught')return false;
  h.field.trap=null;h.field.pendingNotice=false;h.message=h.field.condition>0?'Falle eingepackt. Du kannst sie an einem anderen Wildwechsel aufstellen.':'Defekte Falle eingepackt. Bring sie zur Schmiede; die Reparatur braucht 1 Erz und 1 Kohle.';return true;
 }
 if(input.type==='bait'&&h.bait>0){h.bait--;h.field.bait=h.bait;h.baitSpot={x:h.player.x,y:h.player.y,until:h.elapsed+65};h.message='Köder ausgelegt. Geh leise auf Abstand und beobachte den Platz.';return true;}
 return false;
}
function shoot(h){
 const aim=aimInfo(h),a=selected(h);
 if(h.kills>=(h.carryLimit||1)){h.message='Deine Jagdbeute ist voll. Du kannst Fallen betreuen oder die Beute zur Stadt bringen.';return false;}
 if(h.status!=='active'||h.suspended||!h.aiming||!aim||!aim.inRange||h.ammo<=0||h.elapsed<h.cooldown)return false;
 h.ammo--;h.field.ammo=h.ammo;h.shots++;h.cooldown=h.elapsed+1.2;
 const hit=Math.hypot(aim.x-a.x,aim.y-a.y)<=species(a).hit;
 h.lastShot={at:h.elapsed,x:aim.x,y:aim.y,fromX:h.player.x,fromY:h.player.y,kind:a.kind||'deer',hit};
 if(hit){a.alive=false;a.fade=1;h.kills++;h.loot.meat+=species(a).meat;h.loot.hide+=species(a).hide;h.message=h.kills>=(h.carryLimit||1)?'Beute gesichert. Deine Tragkraft ist ausgeschöpft; Fallen und Köder bleiben nutzbar.':'Weidmannsheil! Beute gesichert. Du kannst noch weitere Tiere erlegen.';}
 else{a.mode='flee';a.until=h.elapsed+5;h.message='Vorbei! Das Tier flieht. Folge seiner Spur und versuche es später erneut.';}
 h.aiming=false;h.focus=0;
 if(h.ammo===0){h.message='Keine Patronen mehr. Du kannst weiter erkunden und Köder auslegen. Zur Stadt kehrst du selbst zurück.';}
 return true;
}
function tick(h,dt,random=Math.random){
 if(h.status!=='active'||h.suspended)return;dt=clamp(dt,0,.2);h.elapsed+=dt;
 const p=h.player,walking=Math.hypot(p.dx,p.dy)>.05;
 if(walking&&!h.aiming){const speed=h.sneak?48:108;move(p,p.dx*speed*dt,p.dy*speed*dt);p.facing=Math.atan2(p.dy,p.dx);h.focus=0;}
 const target=selected(h);if(h.aiming&&target){p.facing=Math.atan2(target.y-p.y,target.x-p.x);h.focus=Math.min(1,h.focus+dt/(h.field.weapon==='revolver'?2.5:h.field.rifleLevel>=2?1.6:2.2));}else h.focus=0;
 for(const a of h.animals){
  if(!a.alive)continue;
  const config=species(a),d=dist(p,a),noticed=lineClear(p,a)&&(d<(h.hunter?32:48)*config.hearing||(walking&&!h.aiming&&d<(h.sneak?65:170)*(h.hunter?.65:1)*config.hearing)||(a.mode==='watch'&&d<(h.sneak?90:125)*(h.hunter?.65:1)*config.hearing));
  if(noticed&&a.mode!=='flee'){a.mode='flee';a.until=h.elapsed+4+random()*2;h.message=config.name+' hat dich bemerkt! Halte Abstand und bewege dich leise.';}
  const before={x:a.x,y:a.y};
  if(a.mode==='flee'){
   const angle=Math.atan2(a.y-p.y,a.x-p.x),speed=config.flee*dt;
   // Turn along trunks and map edges instead of running in place against them.
   for(const turn of [0,.6,-.6,1.2,-1.2,1.9,-1.9,Math.PI]){const dx=Math.cos(angle+turn)*speed,dy=Math.sin(angle+turn)*speed;if(canStand(a.x+dx,a.y+dy)){move(a,dx,dy);break;}}
   if(h.elapsed>=a.until){a.mode='watch';a.until=h.elapsed+1.5+random()*2;}
  }else{
   const bait=h.baitSpot&&h.baitSpot.until>h.elapsed&&dist(a,h.baitSpot)<580?h.baitSpot:null;
   if(bait&&a.mode!=='watch'&&dist(a,bait)>25&&clearRoute(a,bait)){a.tx=bait.x;a.ty=bait.y;a.mode='walk';a.until=h.elapsed+12;}
   if(a.mode==='walk'){
    const dx=a.tx-a.x,dy=a.ty-a.y,n=Math.hypot(dx,dy),step=config.speed*dt;
    if(n>5){move(a,dx/n*Math.min(step,n),dy/n*Math.min(step,n));if(dist(a,before)<step*.15){const goal=destination(a,random,bait);a.tx=goal.x;a.ty=goal.y;}}
    else{a.mode='graze';a.until=h.elapsed+2+random()*4;}
   }
   if(h.elapsed>=a.until){
    if(a.mode==='graze'&&random()<.3){a.mode='watch';a.until=h.elapsed+1.5+random()*2;}
    else if(a.mode==='walk'){a.mode='graze';a.until=h.elapsed+2+random()*4;}
    else{const goal=destination(a,random,bait);a.mode='walk';a.tx=goal.x;a.ty=goal.y;a.until=h.elapsed+5+random()*7;}
   }
  }
  if(Math.abs(a.x-before.x)>.02)a.dir=a.x<before.x?-1:1;
  if(!a.lastTrack)a.lastTrack=before;
  if(dist(a,a.lastTrack)>48){h.trails=h.trails||[];h.trails.push({x:a.x,y:a.y,dir:Math.atan2(a.y-a.lastTrack.y,a.x-a.lastTrack.x),kind:a.kind||'deer',at:h.elapsed});a.lastTrack={x:a.x,y:a.y};}
 }
 h.trails=(h.trails||[]).filter(t=>h.elapsed-t.at<90).slice(-100);
 if(h.aiming&&!selected(h)){h.aiming=false;h.focus=0;}
}
// Traps use the shared game clock, independently of a particular woodland visit.
// A quiet wild trail brings small game; deer hunting remains a separate activity.
function tickField(field,dt,presence=null){
 const t=field.trap;if(!t||field.condition<=0||t.state!=='armed'||(presence&&dist(presence,t)<130))return false;
 t.progress+=clamp(dt,0,.2)/(t.baited?60:120);
 if(t.progress<1)return false;
 t.progress=1;t.state='caught';field.pendingNotice=true;field.catches++;field.condition=Math.max(0,field.condition-1);return true;
}
function fieldSnapshot(field){const t=field?.trap;return {available:!t&&!field?.repairId&&(field?.condition??3)>0,condition:field?.condition??3,maxCondition:3,repairId:field?.repairId??null,trap:t?{x:t.x,y:t.y,state:t.state,baited:t.baited,progress:Math.min(1,t.progress)}:null};}
function snapshot(h,paused=false){const field=fieldSnapshot(h.field),t=field.trap;return {carryLimit:h.carryLimit||1,hunter:!!h.hunter,appearance:h.appearance,weapon:h.field.weapon||'rifle',gear:{condition:field.condition,maxCondition:3,inRepair:!!field.repairId},trap:t?{...t,near:dist(h.player,t)<=65,distance:Math.round(dist(h.player,t)/5),quiet:dist(h.player,t)>=130}:null,canPlaceTrap:field.available&&nearTrail(h.player)&&canStand(h.player.x,h.player.y),version:4,world:WORLD,trees:TREES,rocks:ROCKS,tracks:TRACKS,elapsed:h.elapsed,ammo:h.ammo,bait:h.bait,
 baitSpot:h.baitSpot&&h.baitSpot.until>h.elapsed?{x:h.baitSpot.x,y:h.baitSpot.y}:null,
 trails:(h.trails||[]).filter(t=>dist(h.player,t)<190&&lineClear(h.player,t)).map(t=>({...t})),player:{...h.player},sneak:h.sneak,aiming:h.aiming,focus:h.focus,targetId:h.targetId,aim:aimInfo(h),suspended:h.suspended,paused:paused||h.suspended,
 status:h.status,kills:h.kills,loot:{...h.loot},ready:h.elapsed>=h.cooldown,message:h.message,lastShot:h.lastShot?{...h.lastShot}:null,
 animals:h.animals.filter(a=>!a.alive||visible(h,a)).map(a=>({id:a.id,kind:a.kind||'deer',name:species(a).name,x:a.x,y:a.y,dir:a.dir,mode:a.mode,alive:a.alive,fade:a.fade}))};}
module.exports={SPECIES,createField,nearTrail,tickField,fieldSnapshot,WORLD,TREES,ROCKS,TRACKS,create,control,tick,shoot,snapshot,lineClear,canStand,aimInfo};
