// Private, server-owned hunting sessions. World coordinates are independent of phone size.
const COVER=[{x:208,y:166,w:22,h:158},{x:474,y:152,w:27,h:175},{x:114,y:289,w:56,h:20}];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function create(random=Math.random){
 return {elapsed:0,remaining:90,ammo:6,bait:1,baitUntil:0,approach:false,scoped:false,suspended:false,distance:65,
  cooldown:0,kills:0,shots:0,loot:{meat:0,hide:0},message:'Ziehe zum Zielen. Schleiche nur, wenn die Tiere grasen.',status:'active',
  animals:[{id:1,x:115,y:252,dir:1,mode:'graze',until:4,tx:245,ty:260},{id:2,x:555,y:225,dir:-1,mode:'walk',until:8,tx:405,ty:235},{id:3,x:376,y:301,dir:1,mode:'watch',until:3,tx:430,ty:285}].map(a=>({...a,alive:true,fade:0,seed:random()}))};
}
function shape(a){
 const d=a.dir,headX=a.x+d*(a.mode==='graze'?34:28),headY=a.y-(a.mode==='graze'?4:32);
 return {body:{x:a.x-23,y:a.y-12,w:46,h:23},head:{x:headX-10,y:headY-7,w:20,h:14}};
}
const contains=(r,x,y)=>x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h;
function isCovered(x,y){return COVER.some(r=>contains(r,x,y));}
function shoot(h,point){
 if(h.status!=='active'||h.suspended||h.ammo<=0||h.elapsed<h.cooldown||!point||!Number.isFinite(point.x)||!Number.isFinite(point.y)||point.x<0||point.x>640||point.y<0||point.y>400)return false;
 h.ammo--;h.shots++;h.cooldown=h.elapsed+1.15;
 const a=!isCovered(point.x,point.y)&&h.animals.filter(a=>a.alive).sort((a,b)=>b.y-a.y).find(a=>{const box=shape(a);return contains(box.body,point.x,point.y)||contains(box.head,point.x,point.y)});
 if(a){a.alive=false;a.fade=1;h.kills++;h.loot.meat+=2;h.loot.hide++;h.message='Treffer! 2 Fleisch und 1 Fell geborgen.';}
 else h.message=isCovered(point.x,point.y)?'Ein Baum oder Busch versperrt den Schuss.':'Vorbei! Die Tiere fliehen – bleib ruhig und warte.';
 for(const other of h.animals){if(!other.alive)continue;other.mode='flee';other.until=h.elapsed+5;other.dir=other.x<320?-1:1;}
 if(h.kills>=2){h.status='done';h.message='Die Jagdtasche ist voll. Bring deine Beute zurück in die Stadt.';h.approach=false;}
 else if(h.ammo===0){h.status='done';h.message='Keine Patronen mehr. Du kannst mit deiner bisherigen Beute zurückkehren.';h.approach=false;}
 return true;
}
function control(h,input){
 if(!input||typeof input!=='object')return false;
 if(input.type==='suspend'){h.suspended=input.active===true;h.approach=false;return true;}
 if(h.status!=='active'||h.suspended)return false;
 if(input.type==='approach'){h.approach=input.active===true;return true;}
 if(input.type==='scope'){h.scoped=input.active===true;return true;}
 if(input.type==='bait'&&h.bait>0){h.bait--;h.baitUntil=h.elapsed+30;h.message='Köder auf der Lichtung. Lass den Tieren Zeit, ihn zu entdecken.';return true;}
 return false;
}
function tick(h,dt,random=Math.random){
 if(h.status!=='active'||h.suspended)return;
 h.elapsed+=dt;h.remaining=Math.max(0,90-h.elapsed);
 if(h.approach){
  h.distance=Math.max(28,h.distance-dt*5);
  if(h.distance<45&&h.animals.some(a=>a.alive&&a.mode==='watch')){
   for(const a of h.animals)if(a.alive){a.mode='flee';a.until=h.elapsed+4;a.dir=a.x<320?-1:1;}
   h.message='Entdeckt! Schleiche nur, wenn die Tiere nicht aufschauen.';h.approach=false;
  }
 }
 for(const a of h.animals){
  if(!a.alive){a.fade=Math.max(0,a.fade-dt*.7);continue;}
  if(a.mode==='flee'){
   a.x+=a.dir*80*dt;
   if(h.elapsed>=a.until){a.x=a.dir<0?45:595;a.y=220+random()*85;a.dir=-a.dir;a.mode='walk';a.until=h.elapsed+6;a.tx=160+random()*320;a.ty=a.y;}
   continue;
  }
  if(h.baitUntil>h.elapsed&&a.mode!=='watch'){a.tx=290+a.seed*65;a.ty=285;a.mode='walk';}
  if(a.mode==='walk'){
   const dx=a.tx-a.x,dy=a.ty-a.y,dist=Math.hypot(dx,dy);a.dir=dx<0?-1:1;
   if(dist>3){const speed=18*dt;a.x=clamp(a.x+dx/dist*speed,40,600);a.y=clamp(a.y+dy/dist*speed,215,320);}
   else{a.mode='graze';a.until=h.elapsed+3+random()*3;}
  }
  if(h.elapsed>=a.until){
   if(a.mode==='watch'){a.mode='walk';a.tx=80+random()*480;a.ty=220+random()*90;a.until=h.elapsed+6+random()*5;}
   else{a.mode=a.mode==='graze'?'watch':'graze';a.until=h.elapsed+3+random()*4;}
  }
 }
 if(h.remaining<=0){h.status='done';h.approach=false;h.message='Die Jagd endet. Nimm deine Beute mit zurück.';}
}
function snapshot(h,paused=false){return {elapsed:h.elapsed,remaining:Math.ceil(h.remaining),ammo:h.ammo,bait:h.bait,baitActive:h.baitUntil>h.elapsed,
 distance:Math.round(h.distance),suspended:h.suspended,approach:h.approach,scoped:h.scoped,paused:paused||h.suspended,status:h.status,kills:h.kills,loot:{...h.loot},
 ready:h.elapsed>=h.cooldown,message:h.message,cover:COVER,animals:h.animals.map(a=>({id:a.id,x:a.x,y:a.y,dir:a.dir,mode:a.mode,alive:a.alive,fade:a.fade}))};}
module.exports={COVER,create,shape,isCovered,shoot,control,tick,snapshot};
