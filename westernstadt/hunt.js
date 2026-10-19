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
function create(field=createField()){return {field,elapsed:0,ammo:field.ammo??6,bait:field.bait??1,baitSpot:null,sneak:false,aiming:false,focus:0,suspended:false,
 player:{x:180,y:810,dx:0,dy:0,facing:0},targetId:null,cooldown:0,kills:0,shots:0,loot:{meat:0,hide:0},status:'active',
 message:'Folge den Wildspuren nach Nordosten. Leise bewegen, dann ein sichtbares Tier antippen.',
 animals:[{id:1,x:650,y:405,dir:1,mode:'graze',until:8,tx:705,ty:430,alive:true,fade:0}],lastShot:null};}
function visible(h,a){return a.alive&&dist(h.player,a)<=370&&lineClear(h.player,a);}
function selected(h){return h.animals.find(a=>a.id===h.targetId&&visible(h,a));}
function aimInfo(h){const a=selected(h);if(!a)return null;const distance=dist(h.player,a),moving=a.mode==='walk'||a.mode==='flee';
 const radius=(1-h.focus)*(30+distance*.09)+(moving?12:1.5),angle=h.elapsed*2.3;
 return {targetId:a.id,distance:Math.round(distance/5),inRange:distance<=(h.field.rifleLevel>=2?350:300),clear:lineClear(h.player,a),focus:h.focus,radius,
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
 if(h.status!=='active'||h.suspended||!h.aiming||!aim||!aim.inRange||h.ammo<=0||h.elapsed<h.cooldown)return false;
 h.ammo--;h.field.ammo=h.ammo;h.shots++;h.cooldown=h.elapsed+1.2;
 const hit=Math.hypot(aim.x-a.x,aim.y-a.y)<=17;
 h.lastShot={at:h.elapsed,x:aim.x,y:aim.y,fromX:h.player.x,fromY:h.player.y,hit};
 if(hit){a.alive=false;a.fade=1;h.kills++;h.loot.meat+=2;h.loot.hide++;h.message='Weidmannsheil! Beute gesichert. Du kannst weiter erkunden und Köder auslegen oder zur Stadt zurückkehren.';}
 else{a.mode='flee';a.until=h.elapsed+5;h.message='Vorbei! Das Tier flieht. Folge seiner Spur und versuche es später erneut.';}
 h.aiming=false;h.focus=0;
 if(h.ammo===0){h.message='Keine Patronen mehr. Du kannst weiter erkunden und Köder auslegen. Zur Stadt kehrst du selbst zurück.';}
 return true;
}
function tick(h,dt,random=Math.random){
 if(h.status!=='active'||h.suspended)return;dt=clamp(dt,0,.2);h.elapsed+=dt;
 const p=h.player,walking=Math.hypot(p.dx,p.dy)>.05;
 if(walking&&!h.aiming){const speed=h.sneak?48:108;move(p,p.dx*speed*dt,p.dy*speed*dt);p.facing=Math.atan2(p.dy,p.dx);h.focus=0;}
 const target=selected(h);if(h.aiming&&target){p.facing=Math.atan2(target.y-p.y,target.x-p.x);h.focus=Math.min(1,h.focus+dt/(h.field.rifleLevel>=2?1.6:2.2));}else h.focus=0;
 for(const a of h.animals){
  if(!a.alive)continue;
  const d=dist(p,a),noticed=lineClear(p,a)&&(d<48||(walking&&!h.aiming&&d<(h.sneak?65:170))||(a.mode==='watch'&&d<(h.sneak?90:125)));
  if(noticed&&a.mode!=='flee'){a.mode='flee';a.until=h.elapsed+5;h.message='Das Tier hat dich bemerkt! Geh auf Abstand und bewege dich leise.';}
  if(a.mode==='flee'){
   const dx=a.x-p.x,dy=a.y-p.y,n=Math.hypot(dx,dy)||1;move(a,dx/n*150*dt,dy/n*150*dt);a.dir=dx<0?-1:1;
   if(h.elapsed>=a.until){a.mode='watch';a.until=h.elapsed+3;}continue;
  }
  const bait=h.baitSpot&&h.baitSpot.until>h.elapsed&&dist(a,h.baitSpot)<580;
  if(bait&&a.mode!=='watch'&&dist(a,h.baitSpot)>25){a.tx=h.baitSpot.x;a.ty=h.baitSpot.y;a.mode='walk';}
  if(a.mode==='walk'){
   const dx=a.tx-a.x,dy=a.ty-a.y,n=Math.hypot(dx,dy);a.dir=dx<0?-1:1;
   if(n>5)move(a,dx/n*22*dt,dy/n*22*dt);else{a.mode='graze';a.until=h.elapsed+5;}
  }
  if(h.elapsed>=a.until){
   if(a.mode==='graze'){a.mode='watch';a.until=h.elapsed+3;}
   else if(a.mode==='watch'){a.mode='walk';const tx=clamp(a.x+(random()-.5)*140,100,1180),ty=clamp(a.y+(random()-.5)*100,100,940);if(canStand(tx,ty)){a.tx=tx;a.ty=ty;}else{a.tx=a.x;a.ty=a.y;}a.until=h.elapsed+7;}
   else{a.mode='graze';a.until=h.elapsed+6;}
  }
 }
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
function snapshot(h,paused=false){const field=fieldSnapshot(h.field),t=field.trap;return {gear:{condition:field.condition,maxCondition:3,inRepair:!!field.repairId},trap:t?{...t,near:dist(h.player,t)<=65,distance:Math.round(dist(h.player,t)/5),quiet:dist(h.player,t)>=130}:null,canPlaceTrap:field.available&&nearTrail(h.player)&&canStand(h.player.x,h.player.y),version:3,world:WORLD,trees:TREES,rocks:ROCKS,tracks:TRACKS,elapsed:h.elapsed,ammo:h.ammo,bait:h.bait,
 baitSpot:h.baitSpot&&h.baitSpot.until>h.elapsed?{x:h.baitSpot.x,y:h.baitSpot.y}:null,
 player:{...h.player},sneak:h.sneak,aiming:h.aiming,focus:h.focus,targetId:h.targetId,aim:aimInfo(h),suspended:h.suspended,paused:paused||h.suspended,
 status:h.status,kills:h.kills,loot:{...h.loot},ready:h.elapsed>=h.cooldown,message:h.message,lastShot:h.lastShot?{...h.lastShot}:null,
 animals:h.animals.filter(a=>!a.alive||visible(h,a)).map(a=>({id:a.id,x:a.x,y:a.y,dir:a.dir,mode:a.mode,alive:a.alive,fade:a.fade}))};}
module.exports={createField,nearTrail,tickField,fieldSnapshot,WORLD,TREES,ROCKS,TRACKS,create,control,tick,shoot,snapshot,lineClear,canStand,aimInfo};
