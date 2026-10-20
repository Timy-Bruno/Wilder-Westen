/* Visual test ground uses shipped scenery and the same world sizes/camera as the game.
   No sockets or game-state mutations: the hunter costume is a fixed art prototype. */
(()=>{
 const $=id=>document.getElementById(id),canvas=$('world'),g=canvas.getContext('2d');
 const hunter={style:'hunter',shirt:'#d8c9a3',hat:'#64714f',skin:'#d4ae80',hair:'#594332',beard:true};
 const solids=[{x:190,y:180,w:420,h:75,kind:'counter'},{x:45,y:125,w:85,h:280,kind:'shelf'},{x:670,y:125,w:85,h:280,kind:'shelf'},{x:325,y:390,w:150,h:65,kind:'display'},{x:165,y:460,w:65,h:65,kind:'barrels'},{x:585,y:450,w:65,h:65,kind:'crates'}];
 const buildings=Array.from({length:8},(_,i)=>({x:60+(i%4)*230,y:i<4?50:430,w:130,h:100}));
 let scene='shop',old=false,zoom=false,auto=false,ready=false,drag=null,dx=0,dy=0,last=0,phase=0,autoTime=0;
 const player={x:400,y:330,facing:Math.PI/2},keys=new Set();let cam={x:400,y:250};
 const stop=()=>{dx=dy=0;drag=null;keys.clear();$('knob').style.transform='';};
 const setAuto=v=>{auto=v;$('auto').setAttribute('aria-pressed',String(v));$('auto').textContent=v?'Laufprobe stoppen':'Laufprobe starten';};
 const reset=next=>{stop();setAuto(false);scene=next;player.x=scene==='shop'?400:620;player.y=scene==='shop'?330:315;player.facing=Math.PI/2;cam={x:400,y:250};for(const id of ['shop','city'])$(id).setAttribute('aria-pressed',String(scene===id));};
 $('shop').onclick=()=>reset('shop');$('city').onclick=()=>reset('city');
 $('compare').onclick=()=>{old=!old;$('compare').setAttribute('aria-pressed',String(old));$('compare').textContent=old?'Neuen Entwurf ansehen':'Vorher ansehen';};
 $('zoom').onclick=()=>{zoom=!zoom;$('zoom').setAttribute('aria-pressed',String(zoom));$('zoom').textContent=zoom?'Originalgröße':'Näher ansehen';};
 $('auto').onclick=()=>{stop();autoTime=0;setAuto(!auto);};
 function input(e){if(e.pointerId!==drag)return;const r=$('stick').getBoundingClientRect(),max=29;let x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;const n=Math.max(1,Math.hypot(x,y)/max);x/=n;y/=n;dx=x/max;dy=y/max;$('knob').style.transform=`translate(${x}px,${y}px)`;}
 $('stick').onpointerdown=e=>{setAuto(false);drag=e.pointerId;$('stick').setPointerCapture(e.pointerId);input(e);};$('stick').onpointermove=input;$('stick').onpointerup=$('stick').onpointercancel=$('stick').onlostpointercapture=stop;
 const moves={ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0],ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1]};
 addEventListener('keydown',e=>{if(moves[e.key]&&!/BUTTON|INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();setAuto(false);keys.add(e.key);}});addEventListener('keyup',e=>keys.delete(e.key));addEventListener('blur',()=>{stop();setAuto(false);});document.addEventListener('visibilitychange',()=>{stop();setAuto(false);});
 function stand(x,y){if(scene==='shop')return x>=30&&x<=770&&y>=105&&y<=565&&!solids.some(b=>x>b.x-12&&x<b.x+b.w+12&&y>b.y-12&&y<b.y+b.h+12);return x>=20&&x<=980&&y>=175&&y<=405&&!(x>423&&x<577&&y>228&&y<362);}
 const py=y=>scene==='shop'?y*.78:y;
 function avatar(x,y,scale,walk){if(!old&&ready)HunterSprite.draw(g,x,y,{scale,walk,phase,facing:player.facing});else CharacterArt.draw(g,x,y,hunter,{scale,walk,phase});}
 function draw(now){requestAnimationFrame(draw);const dt=Math.min(.05,Math.max(0,(now-last)/1000||0));last=now;
  let vx=dx,vy=dy;if(keys.size){vx=vy=0;for(const key of keys){vx+=moves[key][0];vy+=moves[key][1];}const n=Math.max(1,Math.hypot(vx,vy));vx/=n;vy/=n;}
  if(auto){autoTime+=dt;const i=Math.floor(autoTime/1.2)%4;[vx,vy]=[[1,0],[0,1],[-1,0],[0,-1]][i];}
  const speed=auto?38:150,px=player.x,yp=player.y;if(stand(player.x+vx*speed*dt,player.y))player.x+=vx*speed*dt;if(stand(player.x,player.y+vy*speed*dt))player.y+=vy*speed*dt;if(vx||vy)player.facing=Math.atan2(vy,vx);
  const walking=Math.hypot(player.x-px,player.y-yp)>.001;if(walking)phase+=dt*10;else phase=0;
  const w=innerWidth,h=innerHeight,dpr=Math.min(2,devicePixelRatio||1);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}g.setTransform(dpr,0,0,dpr,0,0);g.fillStyle='#241b13';g.fillRect(0,0,w,h);g.save();
  if(scene==='shop'){
   const scale=(w>h?Math.min(w/850,(h-30)/520):Math.min(w/540,h/450))*(zoom?1.65:1);
   const tx=w>h?400:Math.max(270,Math.min(530,player.x)),ty=w>h?250:Math.max(210,Math.min(330,py(player.y)-50));cam.x+=(tx-cam.x)*Math.min(1,dt*7);cam.y+=(ty-cam.y)*Math.min(1,dt*7);
   g.translate(w/2,h*(w>h?.49:.43));g.scale(scale,scale);g.translate(-cam.x,-cam.y);ShopArt.base(g,{id:3,name:'Handelskontor'});
   const actors=solids.map(s=>({y:s.y+s.h,draw:()=>ShopArt.furniture(g,s)}));actors.push({y:165,draw:()=>ShopArt.merchant(g)},{y:player.y,draw:()=>avatar(player.x,py(player.y),1.3,walking)});actors.sort((a,b)=>a.y-b.y).forEach(a=>a.draw());
  }else{
   const scale=Math.min(w/1000,h/600)*(zoom?2:1);g.translate(w/2,h/2);g.scale(scale,scale);g.translate(zoom?-player.x:-500,zoom?-player.y:-300);
   g.fillStyle='#d9b77d';g.fillRect(0,0,1000,600);g.fillStyle='#bf9a5e';g.fillRect(0,165,1000,70);g.fillRect(0,355,1000,70);
   buildings.forEach((b,i)=>{if(i===3)CityShop.draw(g,b,false);else if(i===0)CitySmith.draw(g,b,false);else CityBuildings.draw(g,b,i,false);});CityBuildings.church(g,{x:435,y:240,w:130,h:110});
   for(let i=0;i<4;i++)CharacterArt.draw(g,200+i*180,380,{style:['merchant','barkeep','sheriff','apron'][i],shirt:['#b59369','#e0ceaa','#a48d55','#926743'][i]},{scale:.68});avatar(player.x,player.y,.72,walking);
  }g.restore();
  document.body.dataset.scene=scene;document.body.dataset.direction=Math.abs(Math.cos(player.facing))>.65?(Math.cos(player.facing)<0?'left':'right'):(Math.sin(player.facing)<0?'up':'down');document.body.dataset.walking=String(walking);
 }
 HunterSprite.ready.then(()=>{ready=true;document.body.dataset.ready='true';$('status').textContent='Erste Figur in Spielgröße';}).catch(()=>{$('status').textContent='Bild nicht geladen';$('notice').hidden=false;$('notice').textContent='Die neue Figur konnte nicht geladen werden. Bitte lade die Seite erneut.';});
 requestAnimationFrame(draw);
})();
