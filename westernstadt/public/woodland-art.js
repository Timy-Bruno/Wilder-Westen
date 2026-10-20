/* Generated woodland illustrations, packed once with shared per-species scales and ground anchors. */
window.WoodlandArt=(()=>{
 const images=new Map(),failed=[];
 const ready=Promise.all(['wildlife','props'].map(async name=>{const image=new Image();image.src='/assets/woodland/'+name+'-v1.webp';try{await image.decode();images.set(name,image);window.dispatchEvent(new CustomEvent('woodland-art-ready'));}catch(e){failed.push(name);}}));
 function prop(g,id,x,y,scale=1){const image=images.get('props');if(!image)return false;g.save();g.imageSmoothingEnabled=true;g.drawImage(image,(id%4)*256,Math.floor(id/4)*256,256,256,x-128*scale,y-252*scale,256*scale,256*scale);g.restore();return true;}
 function animal(g,a,x,y,time){const image=images.get('wildlife');if(!image)return false;const row=Math.max(0,['deer','hare','boar','fox'].indexOf(a.kind)),moving=a.mode==='walk'||a.mode==='flee',col=moving?1+Math.floor(time*(a.mode==='flee'?10:5))%2:a.mode==='graze'?3:0;g.save();g.translate(x,y);g.scale(a.dir<0?-1:1,1);g.imageSmoothingEnabled=true;g.drawImage(image,col*256,row*256,256,256,-64,-126,128,128);g.restore();return true;}
 return {ready,prop,animal,get loaded(){return [...images.keys()];},get failed(){return [...failed];}};
})();
