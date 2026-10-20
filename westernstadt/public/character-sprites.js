/* Illustrated profession sprites. All surfaces share this foot-anchored renderer.
   Outfit recolours are cached, alpha-preserving and bounded for mobile memory. */
window.CharacterSprites=(()=>{
 const styles=['apron','doctor','sheriff','merchant','barkeep','hunter','miner','carpenter'];
 // Match each action view to its shipped idle body height and hat width, anchored at the soles.
 const actionFit={"apron":[[0.96296,0.94828,0.97345],[0.86364,0.99138,1.0177],[0.90698,0.98276,1.00885],[0.96296,0.97414,1]],"doctor":[[0.975,0.94828,0.95652],[0.91358,1,1.0087],[0.93827,1,1.0087],[0.925,0.97414,0.99123]],"sheriff":[[0.80263,0.93103,1.01887],[0.8481,0.98276,1.07547],[0.85,0.97414,1.07619],[0.80519,0.9569,1.04717]],"merchant":[[0.8871,0.97414,0.99123],[0.84375,0.9913,1],[0.90625,0.9913,1],[0.8209,0.9913,1]],"barkeep":[[0.89286,0.93103,0.93913],[0.87719,0.99138,0.99138],[0.84746,0.97414,0.97414],[0.77778,0.96581,0.97414]],"hunter":[[1.11429,0.94828,0.99099],[1.0137,0.9913,1.00885],[1.0411,0.99138,1.02679],[1.14706,0.97414,1.00893]],"miner":[[0.84127,0.88793,0.90351],[0.875,0.93103,0.93913],[0.85938,0.91379,0.92174],[0.73611,0.93966,0.94783]],"carpenter":[[0.81579,0.87069,0.86325],[0.79487,0.9322,0.94017],[0.79487,0.92373,0.93162],[0.75949,0.95763,0.96581]]};
 function fitFor(c,d,weapon){const f=actionFit[c.style]?.[d]||actionFit.hunter[d],ratio=weapon==='rifle'?f[2]/f[1]:1;return [f[0]*ratio,weapon==='rifle'?f[2]:f[1]];}
 const images=new Map(),cache=new Map(),failures=new Set(),reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');let revision=0;
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 function hsl(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,l=(max+min)/2;let h=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));h=(max===r?((g-b)/d+6)%6:max===g?(b-r)/d+2:(r-g)/d+4)*60;}return [h,s,l];}
 function rgb(h,s,l){const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;const a=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return a.map(v=>Math.round(255*(v+m)));}
 const parse=hex=>/^#[0-9a-f]{6}$/i.test(hex||'')?hsl(...[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16))):null;
 const jobs=[...styles,...styles.map(style=>style+'-action')].map(async style=>{const image=new Image();image.src=`/assets/characters/${style}-v1.webp`;try{await image.decode();images.set(style,image);revision++;window.dispatchEvent(new CustomEvent('character-art-ready',{detail:{style}}));}catch(e){failures.add(style);console.warn('Figur konnte nicht geladen werden:',style);}});
 function variant(c,action=false){const style=styles.includes(c.style)?c.style:'hunter',asset=action?style+'-action':style,key=[asset,c.shirt,c.hat,c.skin,c.hair].join('|');if(cache.has(key)){const value=cache.get(key);cache.delete(key);cache.set(key,value);return value;}const image=images.get(asset);if(!image)return null;
  const canvas=document.createElement('canvas');const frame=action?256:128,edge=frame*4,top=frame-120;canvas.width=canvas.height=edge;const g=canvas.getContext('2d',{willReadFrequently:true});g.drawImage(image,0,0);const pixels=g.getImageData(0,0,edge,edge),d=pixels.data;
  const shirt=parse(c.shirt),hat=parse(c.hat),skin=parse(c.skin),hair=parse(c.hair),formal=['merchant','barkeep'].includes(style),hatEnd=formal?.31:.34,faceEnd=formal?.51:.59;
  for(let y=0;y<edge;y++)for(let x=0;x<edge;x++){const i=(y*edge+x)*4;if(d[i+3]<12)continue;const yy=(y%frame-top)/116,xx=Math.abs(x%frame-frame/2)/64,[h,s,l]=hsl(d[i],d[i+1],d[i+2]);let target=null,base=0,strength=1;
   // Felt only: leave the gold band, feather and lamp intact.
   if(hat&&yy<hatEnd&&h>14&&h<105&&s>.12&&s<.72&&l>.09&&l<.60){target=hat;base=.30;}
   else if(shirt&&yy>.42&&yy<.77&&((style!=='hunter'&&h>175&&h<245&&s>.09&&l>.18)||(style!=='doctor'&&yy>(formal?.49:.53)&&h>27&&h<65&&s<.85&&l>.62))){target=shirt;base=h>175?.57:.78;}
   // Head and exposed hands only; leather elsewhere keeps its painted colours.
   else if(skin&&h>9&&h<39&&s>.37&&l>.29&&l<.85&&((yy>hatEnd&&yy<faceEnd&&xx<.62)||(yy>.58&&yy<.78&&xx>.28&&(!action||l>.48&&h<30)))){target=skin;base=.65;strength=.65;}
   else if(hair&&yy>hatEnd&&yy<faceEnd&&h>10&&h<65&&s<.55&&l>.14&&l<.61){target=hair;base=.27;strength=.65;}
   if(target){const light=clamp(target[2]+(l-base)*.8,.045,.92),sat=clamp(target[1]*(.72+s*.45),.04,.85),out=rgb(target[0],sat,light);for(let k=0;k<3;k++)d[i+k]=Math.round(d[i+k]*(1-strength)+out[k]*strength);}
  }
  g.putImageData(pixels,0,0);cache.set(key,canvas);while(cache.size>24||[...cache.values()].reduce((n,a)=>n+a.width*a.height,0)>8388608)cache.delete(cache.keys().next().value);return canvas;
 }
 function line(g,ps,color,width){g.strokeStyle=color;g.lineWidth=width;g.lineCap='round';g.lineJoin='round';g.beginPath();ps.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();}
 function weapon(g,c,o){const a=Number.isFinite(o.facing)?o.facing:0,dx=Math.cos(a),dy=Math.sin(a)*.65;g.save();g.translate(Math.abs(dx)<.4?11:dx*10,-22+dy*8);g.rotate(Math.atan2(dy,dx));
  if(o.weapon==='rifle'){line(g,[[-8,1],[-2,1],[7,-1]],'#302b24',7);line(g,[[-8,1],[-2,1],[7,-1]],'#936443',4);line(g,[[4,-2],[30,-2]],'#262e2c',4);line(g,[[6,-3],[30,-3]],'#b4bdb1',1);line(g,[[11,-6],[23,-6]],'#303b38',3);line(g,[[13,-4],[13,-1],[22,-4],[22,-1]],'#777f6f',1);}
  else{line(g,[[-2,4],[1,-1],[13,-1]],'#242b29',5);line(g,[[-2,4],[1,-1]],'#946441',3);line(g,[[2,-2],[13,-2]],'#bdc0a9',1);g.fillStyle='#8d9688';g.fillRect(1,-3,5,4);}
  g.restore();
 }
 function muzzle(c={},o={}){const a=Number.isFinite(o.facing)?o.facing:0,dx=Math.cos(a),dy=Math.sin(a)*.65,scale=o.scale||1;if(images.has((styles.includes(c.style)?c.style:'hunter')+'-action')){const dir=Math.abs(dx)>.65?(dx<0?1:2):(dy<0?3:0),kick=o.recoil>.25,points=o.weapon==='rifle'?(kick?[[30,-35],[-38,-64],[38,-64],[40,-61]]:[[30,-35],[-43,-42],[43,-42],[c.style==='merchant'?-43:40,-43]]):(kick?[[0,-37],[-32,-53],[32,-53],[28,-58]]:[[0,-37],[-35,-37],[35,-37],[28,-42]]),p=points[dir],fit=fitFor(c,dir,o.weapon);return {x:p[0]*scale*fit[0],y:p[1]*scale*fit[1]};}const angle=Math.atan2(dy,dx),len=o.weapon==='rifle'?30:13;return {x:((Math.abs(dx)<.4?11:dx*10)+Math.cos(angle)*len)*scale,y:(-22+dy*8+Math.sin(angle)*len)*scale};}
 function draw(g,x,y,c={},o={}){const action=o.weapon&&!o.seated&&!o.bandit&&images.has((styles.includes(c.style)?c.style:'hunter')+'-action'),atlas=variant(c,action);if(!atlas)return false;const scale=o.scale||1,angle=Number.isFinite(o.facing)?o.facing:Math.PI/2,direction=o.seated?0:Math.abs(Math.cos(angle))>.65?(Math.cos(angle)<0?1:2):(Math.sin(angle)<0?3:0),row=action?(o.weapon==='rifle'?2:0)+(o.recoil>.25?1:0):direction,col=action?direction:o.walk&&!o.seated?Math.floor(Math.abs(o.phase||0)/(Math.PI/2))%4:0,unit=70/116,frame=action?256:128,size=frame*unit,anchor=frame-4;
  const reduce=reducedMotion.matches,bob=o.walk&&!reduce?-.65*Math.abs(Math.sin(o.phase||0)):0;
  g.save();g.translate(x,y);g.scale(scale,scale);g.fillStyle='#29332744';g.beginPath();g.ellipse(0,3,13,4,0,0,Math.PI*2);g.fill();
  if(o.seated){g.fillStyle='#57402d';g.fillRect(-17,-46,34,34);g.fillStyle='#a47b4e';g.fillRect(-17,-46,34,5);g.fillRect(-17,-16,34,5);for(const side of [-1,1]){line(g,[[side*12,-12],[side*14,5]],'#61472f',4);}g.drawImage(atlas,0,88,128,40,-size/2,-12,size,40*unit*.68);g.drawImage(atlas,0,0,128,89,-size/2,-124*unit+10,size,89*unit);}
  else if(o.walk&&!action){
   // Keep soles grounded; only the upper body bobs between the contact frames.
   const cut=93,lower=frame-cut;g.drawImage(atlas,col*frame,row*frame,frame,cut+2,-size/2,-anchor*unit+bob,size,(cut+2)*unit);
   g.save();if((row===0||row===3)&&col===3)g.scale(-1,1);g.drawImage(atlas,col*frame,row*frame+cut,frame,lower,-size/2,(cut-anchor)*unit,size,lower*unit);g.restore();
  }else{const fit=action?fitFor(c,direction,o.weapon):[1,1];g.drawImage(atlas,col*frame,row*frame,frame,frame,-size/2*fit[0],-anchor*unit*fit[1],size*fit[0],size*fit[1]);}
  if(o.bandit&&direction!==3){g.fillStyle='#814c40';g.strokeStyle='#3e3028';g.lineWidth=.7;g.beginPath();const side=row===1?-1:row===2?1:0;g.moveTo(-7+side*3,-36);g.lineTo(7+side*3,-36);g.lineTo(5+side*3,-29);g.lineTo(side*3,-26);g.lineTo(-5+side*3,-29);g.closePath();g.fill();g.stroke();}
  if(o.weapon&&!o.seated&&!action)weapon(g,c,o);
  if(o.label!==undefined){g.fillStyle='#243f31ee';g.beginPath();g.roundRect(-12,-88,24,15,3);g.fill();g.textAlign='center';g.font='bold 11px Georgia';g.fillStyle='#f3dfae';g.fillText(String(o.label),0,-77);}g.restore();return true;
 }
 return {draw,muzzle,ready:Promise.all(jobs),isReady:style=>images.has(style),get revision(){return revision;},get loaded(){return [...images.keys()];},get failed(){return [...failures];},get cached(){return cache.size;}};
})();
