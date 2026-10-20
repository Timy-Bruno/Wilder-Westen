// One camera convention shared by the renderer, phone input and projection tests.
(function(root){const eye={x:850,y:1300,z:1550},horizontal=Math.hypot(eye.x,eye.z),length=Math.hypot(horizontal,eye.y),right={x:eye.z/horizontal,y:-eye.x/horizontal},down={x:eye.x/horizontal,y:eye.z/horizontal},tilt=eye.y/length;
 const project=(x,y)=>({x:right.x*x+right.y*y,y:(down.x*x+down.y*y)*tilt});
 const toWorld=(x,y)=>{const wx=right.x*x+down.x*y/tilt,wy=right.y*x+down.y*y/tilt,n=Math.max(1,Math.hypot(wx,wy));return {x:wx/n,y:wy/n}};
 const api={eye,project,toWorld};if(typeof module==='object')module.exports=api;else root.RoomProjection=api;
})(typeof window==='object'?window:globalThis);
