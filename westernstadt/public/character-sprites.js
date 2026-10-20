/* Illustrated profession sprites. All surfaces share this foot-anchored renderer.
   Outfit recolours are cached, alpha-preserving and bounded for mobile memory. */
window.CharacterSprites=(()=>{
 const styles=['apron','doctor','sheriff','merchant','barkeep','hunter','miner','carpenter'];
 const images=new Map(),cache=new Map(),failures=new Set();let revision=0;
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 function hsl(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,l=(max+min)/2;let h=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));h=(max===r?((g-b)/d+6)%6:max===g?(b-r)/d+2:(r-g)/d+4)*60;}return [h,s,l];}
 function rgb(h,s,l){const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;const a=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return a.map(v=>Math.round(255*(v+m)));}
 const parse=hex=>/^#[0-9a-f]{6}$/i.test(hex||'')?hsl(...[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16))):null;
 const jobs=styles.map(async style=>{const image=new Image();image.src=`/assets/characters/${style}-v1.webp`;try{await image.decode();images.set(style,image);revision++;window.dispatchEvent(new CustomEvent('character-art-ready',{detail:{style}}));}catch(e){failures.add(style);console.warn('Figur konnte nicht geladen werden:',style);}});
 function variant(c){const style=styles.includes(c.style)?c.style:'hunter',key=[style,c.shirt,c.hat,c.skin,c.hair].join('|');if(cache.has(key)){const value=cache.get(key);cache.delete(key);cache.set(key,value);return value;}const image=images.get(style);if(!image)return null;
  const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const g=canvas.getContext('2d',{willReadFrequently:true});g.drawImage(image,0,0);const pixels=g.getImageData(0,0,512,512),d=pixels.data;
  const shirt=parse(c.shirt),hat=parse(c.hat),skin=parse(c.skin),hair=parse(c.hair),formal=['merchant','barkeep'].includes(style),hatEnd=formal?.31:.34,faceEnd=formal?.51:.59;
  for(let y=0;y<512;y++)for(let x=0;x<512;x++){const i=(y*512+x)*4;if(d[i+3]<12)continue;const yy=(y%128-8)/116,xx=Math.abs(x%128-64)/64,[h,s,l]=hsl(d[i],d[i+1],d[i+2]);let target=null,base=0,strength=1;
   // Felt only: leave the gold band, feather and lamp intact.
   if(hat&&yy<hatEnd&&h>14&&h<105&&s>.12&&s<.72&&l>.09&&l<.60){target=hat;base=.30;}
   else if(shirt&&yy>.42&&yy<.77&&((h>175&&h<245&&s>.09&&l>.18)||(style!=='doctor'&&yy>(formal?.49:.53)&&h>27&&h<65&&s<.85&&l>.62))){target=shirt;base=h>175?.57:.78;}
   // Head and exposed hands only; leather elsewhere keeps its painted colours.
   else if(skin&&h>9&&h<39&&s>.37&&l>.29&&l<.85&&((yy>hatEnd&&yy<faceEnd&&xx<.62)||(yy>.58&&yy<.78&&xx>.28))){target=skin;base=.65;strength=.65;}
   else if(hair&&yy>hatEnd&&yy<faceEnd&&h>10&&h<65&&s<.55&&l>.14&&l<.61){target=hair;base=.27;strength=.65;}
   if(target){const light=clamp(target[2]+(l-base)*.8,.045,.92),sat=clamp(target[1]*(.72+s*.45),.04,.85),out=rgb(target[0],sat,light);for(let k=0;k<3;k++)d[i+k]=Math.round(d[i+k]*(1-strength)+out[k]*strength);}
  }
  g.putImageData(pixels,0,0);cache.set(key,canvas);while(cache.size>24)cache.delete(cache.keys().next().value);return canvas;
 }
 function line(g,ps,color,width){g.strokeStyle=color;g.lineWidth=width;g.lineCap='round';g.lineJoin='round';g.beginPath();ps.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();}
 function weapon(g,c,o){const a=Number.isFinite(o.facing)?o.facing:0,dx=Math.cos(a),dy=Math.sin(a)*.65;g.save();g.translate(Math.abs(dx)<.4?11:dx*10,-22+dy*8);g.rotate(Math.atan2(dy,dx));
  if(o.weapon==='rifle'){line(g,[[-8,1],[-2,1],[7,-1]],'#302b24',7);line(g,[[-8,1],[-2,1],[7,-1]],'#936443',4);line(g,[[4,-2],[30,-2]],'#262e2c',4);line(g,[[6,-3],[30,-3]],'#b4bdb1',1);line(g,[[11,-6],[23,-6]],'#303b38',3);line(g,[[13,-4],[13,-1],[22,-4],[22,-1]],'#777f6f',1);}
  else{line(g,[[-2,4],[1,-1],[13,-1]],'#242b29',5);line(g,[[-2,4],[1,-1]],'#946441',3);line(g,[[2,-2],[13,-2]],'#bdc0a9',1);g.fillStyle='#8d9688';g.fillRect(1,-3,5,4);}
  g.restore();
 }
 function draw(g,x,y,c={},o={}){const atlas=variant(c);if(!atlas)return false;const scale=o.scale||1,angle=Number.isFinite(o.facing)?o.facing:Math.PI/2,row=o.seated?0:Math.abs(Math.cos(angle))>.65?(Math.cos(angle)<0?1:2):(Math.sin(angle)<0?3:0),col=o.walk&&!o.seated?Math.floor(Math.abs(o.phase||0)/(Math.PI/2))%4:0,unit=70/116,size=128*unit;
  g.save();g.translate(x,y);g.scale(scale,scale);g.fillStyle='#29332744';g.beginPath();g.ellipse(0,3,13,4,0,0,Math.PI*2);g.fill();
  if(o.seated){g.fillStyle='#57402d';g.fillRect(-17,-46,34,34);g.fillStyle='#a47b4e';g.fillRect(-17,-46,34,5);g.fillRect(-17,-16,34,5);for(const side of [-1,1]){line(g,[[side*12,-12],[side*14,5]],'#61472f',4);}g.drawImage(atlas,0,88,128,40,-size/2,-12,size,40*unit*.68);g.drawImage(atlas,0,0,128,89,-size/2,-124*unit+10,size,89*unit);}
  else g.drawImage(atlas,col*128,row*128,128,128,-size/2,-124*unit,size,size);
  if(o.bandit&&row!==3){g.fillStyle='#814c40';g.strokeStyle='#3e3028';g.lineWidth=.7;g.beginPath();const side=row===1?-1:row===2?1:0;g.moveTo(-7+side*3,-36);g.lineTo(7+side*3,-36);g.lineTo(5+side*3,-29);g.lineTo(side*3,-26);g.lineTo(-5+side*3,-29);g.closePath();g.fill();g.stroke();}
  if(o.weapon&&!o.seated)weapon(g,c,o);
  if(o.label!==undefined){g.fillStyle='#243f31ee';g.beginPath();g.roundRect(-12,-88,24,15,3);g.fill();g.textAlign='center';g.font='bold 11px Georgia';g.fillStyle='#f3dfae';g.fillText(String(o.label),0,-77);}g.restore();return true;
 }
 return {draw,ready:Promise.all(jobs),isReady:style=>images.has(style),get revision(){return revision;},get loaded(){return [...images.keys()];},get failed(){return [...failures];},get cached(){return cache.size;}};
})();
