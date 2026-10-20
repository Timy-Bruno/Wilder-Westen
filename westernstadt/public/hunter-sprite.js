/* First approved illustrated hunter. Preview-only: foot anchor matches CharacterArt. */
window.HunterSprite=(()=>{
 const image=new Image();image.src='/assets/characters/hunter-v1.webp';
 const ready=image.decode();
 function draw(g,x,y,{scale=1,facing=Math.PI/2,walk=false,phase=0}={}){
  if(!image.complete||!image.naturalWidth)return false;
  const row=Math.abs(Math.cos(facing))>.65?(Math.cos(facing)<0?1:2):(Math.sin(facing)<0?3:0);
  const col=walk?Math.floor(phase/(Math.PI/2))%4:0;
  const size=128*70/116*scale;
  g.save();g.fillStyle='#29332744';g.beginPath();g.ellipse(x,y+3*scale,13*scale,4*scale,0,0,Math.PI*2);g.fill();
  g.drawImage(image,col*128,row*128,128,128,x-size/2,y-size*124/128,size,size);g.restore();return true;
 }
 return {ready,draw};
})();
