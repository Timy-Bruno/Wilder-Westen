/* Woodland expedition. Rendering and input only; simulation and rewards live on the server. */
(()=>{
 const root=document.createElement('section');root.id='hunting';root.hidden=true;
 const style=document.createElement('style');style.textContent=`
 #hunting{--ink:#f5ebc9;--gold:#dfbd76;--green:#173b2c;position:fixed;inset:0;z-index:25;background:#1f3e2c;color:var(--ink);font:13px/1.35 system-ui,sans-serif;overflow:hidden;touch-action:none;user-select:none}
 #huntCanvas{position:absolute;inset:0;display:block;width:100%;height:100%;touch-action:none}
 #hunting .hunt-top{position:absolute;top:max(10px,env(safe-area-inset-top));left:max(12px,env(safe-area-inset-left));right:max(12px,env(safe-area-inset-right));display:flex;align-items:start;justify-content:space-between;gap:10px;pointer-events:none}
 #hunting .hunt-title{padding:8px 11px;background:#10291fe8;border:1px solid #a4b17b55;border-radius:8px;box-shadow:0 4px 16px #10291f55}#hunting .hunt-kicker{font:8px/1.5 system-ui;letter-spacing:.18em;color:#b9c89b}#hunting h2{font:600 19px/1.2 Georgia,serif;color:#f4dca1;margin:0}#huntBag{font-size:10px;color:#d9dfb9;display:block;margin-top:4px}
 #hunting button{margin:0;min-width:0;min-height:44px;border:1px solid #b5bf8666;border-radius:12px;background:#173b2ee8;color:var(--ink);font:600 12px/1.2 system-ui;box-shadow:0 3px 0 #0a211bc2;touch-action:none;padding:9px 12px}#hunting button:active{filter:brightness(1.17)}#hunting button:disabled{opacity:.45}#hunting button[aria-pressed=true]{background:#807346;border-color:#e0c885}#hunting button small{display:block;font-size:9px;font-weight:400;opacity:.8;margin-top:3px}
 #hunting #huntBack{pointer-events:auto;min-height:40px;font-size:11px;background:#10291fe8}
 #huntHint{position:absolute;top:104px;left:16px;right:16px;margin:auto;max-width:440px;text-align:center;color:#fff3d0;background:#15392ce6;border:1px solid #a3b07944;border-radius:7px;padding:7px 10px;font-size:11px;pointer-events:none}
 #huntStatus{position:absolute;left:50%;transform:translateX(-50%);bottom:max(16px,env(safe-area-inset-bottom));font-size:10px;white-space:nowrap;color:#e6e7c4;background:#0f2a20cf;border-radius:20px;padding:5px 12px;pointer-events:none}
 #huntJoystick{position:absolute;left:max(20px,env(safe-area-inset-left));bottom:max(48px,calc(env(safe-area-inset-bottom) + 24px));width:122px;height:122px;border-radius:50%;border:2px solid #c3cba571;background:radial-gradient(circle,#8eaa6d20,#102d2170);box-shadow:inset 0 0 20px #10291f55;touch-action:none}
 #huntStick{position:absolute;left:38px;top:38px;width:42px;height:42px;border-radius:50%;background:radial-gradient(circle at 35% 25%,#d6cca2,#7e9362);border:2px solid #d5d3a1;box-shadow:0 3px 8px #10251c99;pointer-events:none}
 #huntJoystick span{position:absolute;left:0;right:0;bottom:-19px;text-align:center;font-size:9px;letter-spacing:.13em;color:#e4e9c2;pointer-events:none}
 #hunting .hunt-actions{position:absolute;right:max(16px,env(safe-area-inset-right));bottom:max(48px,calc(env(safe-area-inset-bottom) + 24px));width:166px;display:grid;grid-template-columns:1fr 1fr;gap:8px}
 #hunting #huntAim{min-height:63px}#hunting #huntFire{background:linear-gradient(#c29958,#8b642f);border-color:#e5c98d;min-height:63px;font-size:14px}#hunting #huntSneak,#hunting #huntBait{font-size:10px;padding:8px 3px;min-height:44px}
 #huntFocus{position:absolute;bottom:210px;left:50%;transform:translateX(-50%);padding:7px 12px;background:#10291fe6;border:1px solid #b4bb7888;border-radius:8px;font-size:11px;text-align:center;min-width:150px;pointer-events:none}#huntFocusBar{height:3px;margin-top:5px;background:#45684b;border-radius:2px;overflow:hidden}#huntFocusFill{height:100%;width:0;background:#e9cc85}
 #huntSummary{position:absolute;top:32%;left:50%;transform:translateX(-50%);width:min(300px,85%);padding:22px;text-align:center;border:1px solid #d5bd7b80;border-radius:12px;background:#102b23ee;box-shadow:0 8px 40px #0b201b88;pointer-events:none}#huntSummary h3{font:24px Georgia,serif;color:#f3daa0;letter-spacing:0;text-transform:none;margin:0 0 12px;width:auto}#huntSummary p{font-size:12px;line-height:1.5}#huntSummary strong{font-size:19px;color:#eed49b}
 @media(orientation:landscape){#huntHint{top:16px;left:230px;right:125px;max-width:370px;font-size:10px}#hunting .hunt-title{padding:6px 10px}#hunting h2{font-size:17px}#huntJoystick{width:108px;height:108px;bottom:max(30px,env(safe-area-inset-bottom))}#huntStick{left:31px;top:31px}#hunting .hunt-actions{bottom:max(30px,env(safe-area-inset-bottom));width:164px}#huntFocus{bottom:65px}#huntSummary{top:23%;padding:16px}#huntStatus{bottom:8px}}
 @media(max-width:350px){#hunting h2{font-size:16px}#huntHint{top:98px;font-size:10px}#huntJoystick{left:12px;width:104px;height:104px}#huntStick{left:29px;top:29px}#hunting .hunt-actions{right:10px;width:151px;gap:6px}#huntFocus{bottom:205px}}
 `;document.head.append(style);
 root.innerHTML=`<canvas id="huntCanvas" aria-label="Begehbarer Wald: Tier antippen, mit dem Joystick bewegen"></canvas><div class="hunt-top"><div class="hunt-title"><div class="hunt-kicker">JAGDGEBIET · BLACKWOOD CREEK</div><h2>Auf leisen Sohlen</h2><span id="huntBag">6 Patronen · 0 / 1 Tier</span></div><button id="huntBack">Zur Stadt<small>Beute mitnehmen</small></button></div><div id="huntHint"></div><div id="huntFocus" hidden><span id="huntFocusText"></span><div id="huntFocusBar"><div id="huntFocusFill"></div></div></div><div id="huntSummary" hidden></div><div id="huntJoystick" role="group" aria-label="Bewegen mit dem Daumen"><div id="huntStick"></div><span>BEWEGEN</span></div><div class="hunt-actions"><button id="huntSneak" aria-pressed="false">Schleichen<small>leise & langsam</small></button><button id="huntBait">Köder<small>hier auslegen</small></button><button id="huntAim" aria-pressed="false">Zielen<small>halten</small></button><button id="huntFire">Schießen</button></div><div id="huntStatus">Wildspuren folgen · Tier antippen</div>`;
 document.body.append(root);
 const el=id=>root.querySelector('#'+id),canvas=el('huntCanvas');let g=canvas.getContext('2d');
 let state=null,raf=0,lastFrame=0,camera={x:180,y:790,s:1},view={w:0,h:0},visual=new Map(),playerVisual=null,stickPointer=null,aimPointer=null,shotPending=false,lastAudio=null,lastMessage='',messageAt=0,moveInput={x:0,y:0},keys=new Set(),lastShotAt=-1,shotReceivedAt=0;
 const seeded=n=>{let a=n|0;return()=>{a=(a*1664525+1013904223)>>>0;return a/4294967296}};
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const rect=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
 function poly(c,ps){g.fillStyle=c;g.beginPath();ps.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill()}
 function ellipse(c,x,y,rx,ry){g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fill()}
 function stroke(c,width,ps){g.strokeStyle=c;g.lineWidth=width;g.lineCap='round';g.lineJoin='round';g.beginPath();ps.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke()}
 const groundY=y=>y*.72;
 let terrain=null,surround=null,forest=null;
 const edgeTrees=[];for(let y=-500;y<1600;y+=95)for(let x=-500;x<1800;x+=110)if(x<20||x>1260||y<20||y>1020)edgeTrees.push({x:x+Math.sin(y+x)*22,y:y+Math.cos(x)*20,size:100+(x+y)%30,id:x+y});
 function makeTerrain(){
  surround=document.createElement('canvas');surround.width=2560;surround.height=2320;const outer=surround.getContext('2d'),noise=seeded(982);outer.fillStyle='#3c623c';outer.fillRect(0,0,2560,2320);for(let i=0;i<5000;i++){outer.fillStyle=['#456c3e','#527945','#365e39'][i%3];outer.beginPath();outer.ellipse(noise()*2560,noise()*2320,15+noise()*25,8+noise()*20,0,0,7);outer.fill()}
  terrain=document.createElement('canvas');terrain.width=1280;terrain.height=1040;const b=terrain.getContext('2d'),r=seeded(8247);
  b.fillStyle='#557947';b.fillRect(0,0,1280,1040);
  for(let i=0;i<450;i++){b.fillStyle=['#5d7e49','#547846','#63844c','#507747'][i%4];b.beginPath();b.ellipse(r()*1280,r()*1040,12+r()*42,10+r()*30,0,0,7);b.fill()}
  // Open clearings and a warm earth path lead from the trailhead to the deer meadow.
  for(const [x,y,rx,ry] of [[180,810,150,120],[650,405,205,160],[970,770,140,150]]){b.fillStyle='#7d9656';b.beginPath();b.ellipse(x,y,rx,ry,0,0,7);b.fill()}
  b.lineCap='round';b.lineJoin='round';const route=[[170,1040],[180,810],[300,700],[430,600],[520,530],[650,405],[790,355],[925,280],[1030,0]];
  for(const [color,width]of [['#435f3a',66],['#9c9b65',54],['#b2a875',37]]){b.strokeStyle=color;b.lineWidth=width;b.beginPath();route.forEach(([x,y],i)=>i?b.lineTo(x,y):b.moveTo(x,y));b.stroke()}
  // Creek on the eastern edge, with reeds and a shallow bank.
  const creek=[[1170,0],[1120,170],[1175,330],[1080,475],[1145,660],[1080,860],[1120,1040]];
  for(const [color,width]of [['#456e50',90],['#b2ae77',70],['#55968a',52],['#83b7a0',31]]){b.strokeStyle=color;b.lineWidth=width;b.beginPath();creek.forEach(([x,y],i)=>i?b.lineTo(x,y):b.moveTo(x,y));b.stroke()}
  for(let i=0;i<2300;i++){const x=r()*1280,y=r()*1040;b.fillStyle=['#b9bb7b','#879f58','#345f39','#76914d','#ced398'][i%5];b.fillRect(x,y,1+r()*3,1+r()*4)}
  // Flowers cluster at the sunny meadow edge rather than everywhere.
  for(let i=0;i<85;i++){const angle=r()*7,x=650+Math.cos(angle)*(160+r()*35),y=405+Math.sin(angle)*(125+r()*30);b.fillStyle='#486e3c';b.fillRect(x,y,2,7);b.fillStyle=i%3?'#e2d79a':'#c8b3bd';b.fillRect(x-2,y-2,5,4)}
  for(let i=0;i<45;i++){const x=r()*1280,y=r()*1040;b.fillStyle='#6f8050';b.fillRect(x,y,5,3);b.fillStyle='#a2a477';b.fillRect(x+1,y,3,1)}
 }
 function cacheForest(){
  forest=document.createElement('canvas');forest.width=2560;forest.height=Math.ceil(2320*.72);const screenContext=g;g=forest.getContext('2d');g.translate(640,groundY(640));g.imageSmoothingEnabled=false;
  g.drawImage(surround,-640,groundY(-640),2560,groundY(2320));g.drawImage(terrain,0,0,1280,groundY(1040));
  stroke('#264d3277',18,[[12,groundY(15)],[1268,groundY(15)],[1268,groundY(1025)],[12,groundY(1025)],[12,groundY(15)]]);
  for(const t of state.tracks)for(const off of [-5,5]){g.save();g.translate(t.x+off,groundY(t.y)+off);g.rotate(.6);ellipse('#605e3888',0,0,2.6,5);rect('#b5aa71',0,-5,1,10);g.restore()}
  for(const t of [...edgeTrees,...state.trees])shadow(t.x,t.y,t.size*.5,13);for(const o of state.rocks)shadow(o.x,o.y,o.r,9);
  const scenery=[...edgeTrees,...state.trees].map(t=>({y:t.y,draw:()=>pine(t)}));scenery.push(...state.rocks.map(o=>({y:o.y,draw:()=>rock(o)})));for(const o of scenery.sort((a,b)=>a.y-b.y))o.draw();g=screenContext;
 }

 function configure(){view={w:root.clientWidth,h:root.clientHeight};camera.s=clamp(Math.min(view.w/440,view.h/500),.75,1.6);const p=playerVisual||state.player;
  camera.x=p.x;camera.y=p.y-45;
 }
 function screen(x,y){return {x:(x-camera.x)*camera.s+view.w/2,y:(y-camera.y)*.72*camera.s+view.h/2}}
 function world(x,y){return {x:(x-view.w/2)/camera.s+camera.x,y:(y-view.h/2)/(.72*camera.s)+camera.y}}
 function shadow(x,y,rx,ry){ellipse('#163c2c45',x+15,groundY(y)+5,rx,ry)}
 function pine(t){
  const x=t.x,y=groundY(t.y),size=t.size,r=seeded(t.id*71+31);
  rect('#494c30',x-7,y-size*.7,14,size*.7);rect('#8d7945',x-4,y-size*.7,4,size*.7);
  poly('#3d5732',[[x-17,y+1],[x-5,y-16],[x+8,y-14],[x+19,y+2]]);
  for(let j=0;j<4;j++){
   const yy=y-size*.38-j*size*.2,w=size*(.57-j*.09);
   poly(['#254c34','#2d5638','#365f3b','#436c3f'][j],[[x,yy-size*.58],[x-w*.55,yy+8],[x-w*.3,yy+5],[x-w*.4,yy+15],[x+w*.5,yy+11],[x+w*.34,yy+3]]);
   for(let k=0;k<10;k++){const xx=x+(r()-.5)*w*.7,py=yy-5-r()*size*.17;rect(j%2?'#71904e':'#4e7741',xx,py,3+r()*7,2+r()*3)}
  }
 }
 function rock(o){const x=o.x,y=groundY(o.y);poly('#485f4c',[[x-o.r,y],[x-o.r*.8,y-18],[x+o.r*.2,y-26],[x+o.r,y-10],[x+o.r*.7,y+5]]);poly('#91a087',[[x-o.r*.8,y-18],[x+o.r*.2,y-26],[x+o.r*.75,y-12],[x-4,y-9]]);}
 function deer(a,t){
  const p=visual.get(a.id)||{x:a.x,y:a.y};p.x+=(a.x-p.x)*.35;p.y+=(a.y-p.y)*.35;visual.set(a.id,p);
  const x=p.x,y=groundY(p.y),moving=a.mode==='walk'||a.mode==='flee',step=moving?Math.sin(t*(a.mode==='flee'?17:6))*5:0;
  g.save();g.translate(x,y);g.scale(a.dir,1);
  if(!a.alive){ellipse('#22492d55',0,0,20,7);rect('#9f8551',-12,-13,24,17);rect('#d5bd80',-9,-17,18,6);stroke('#6c5835',2,[[-10,-3],[10,-3]]);g.restore();return;}
  ellipse('#1c382e55',0,2,22,7);
  for(const [xx,d]of [[-12,1],[12,-1]]){rect('#765035',xx+step*d,-14,4,18);rect('#302f25',xx+step*d,2,5,3)}
  poly('#b88248',[[-23,-26],[-18,-32],[12,-31],[22,-22],[17,-11],[-15,-11],[-23,-17]]);
  poly('#d9b77a',[[-17,-30],[11,-30],[17,-25],[-16,-24]]);poly('#ead6ab',[[-14,-14],[15,-14],[10,-10],[-12,-11]]);
  const dip=a.mode==='graze';poly('#b88248',[[12,-25],[17,dip?-20:-43],[25,dip?-17:-45],[25,-16]]);
  const hy=dip?-19:-46;poly('#c9975b',[[18,hy],[29,hy-2],[36,hy+3],[33,hy+9],[22,hy+8]]);rect('#292e23',33,hy+2,5,4);rect('#243a27',27,hy+1,2,2);
  poly('#d7b67e',[[20,hy],[15,hy-9],[24,hy-4]]);poly('#b9834b',[[27,hy-1],[31,hy-11],[32,hy-4]]);
  poly('#eee0bd',[[-23,-23],[-30,-26],[-26,-17],[-21,-17]]);
  stroke('#dfcd9e',2,[[21,hy-3],[17,hy-16],[11,hy-20]]);stroke('#dfcd9e',2,[[17,hy-14],[21,hy-21]]);
  g.restore();
  if(a.mode==='watch'||a.mode==='flee'){g.fillStyle=a.mode==='flee'?'#f1bc77':'#eee2a0';g.font='bold 17px Georgia';g.textAlign='center';g.fillText(a.mode==='flee'?'!':'?',x,y-66);}
 }
 function cowboy(t){const p=playerVisual,x=p.x,y=groundY(p.y),moving=!state.aiming&&Math.hypot(state.player.dx,state.player.dy)>.1,step=moving?Math.sin(t*(state.sneak?7:11))*3:0;
  ellipse('#1c382d55',x,y+2,14,6);
  rect('#293d37',x-8,y-15,6,14+step);rect('#293d37',x+2,y-15,6,14-step);rect('#3c3026',x-9,y-2+step,8,5);rect('#3c3026',x+1,y-2-step,8,5);
  poly('#8b6941',[[x-12,y-31],[x+10,y-31],[x+13,y-12],[x-13,y-12]]);rect('#ba9a59',x-8,y-30,7,15);rect('#443d2b',x-12,y-15,25,4);rect('#dfc37d',x-2,y-15,4,4);
  rect('#cdab77',x-6,y-40,12,12);ellipse('#b49a57',x,y-40,19,6);rect('#b59a58',x-10,y-50,20,11);rect('#634e30',x-10,y-43,20,3);ellipse('#d1b575',x,y-49,10,3);
  const angle=state.player.facing,dx=Math.cos(angle),dy=Math.sin(angle)*.72;
  stroke('#59442b',5,[[x+dx*7,y-23+dy*7],[x+dx*24,y-23+dy*24]]);stroke('#cad0ad',2,[[x+dx*20,y-24+dy*20],[x+dx*34,y-24+dy*34]]);ellipse('#cca777',x+dx*13,y-23+dy*13,4,3);
 }
 function render(now){raf=requestAnimationFrame(render);if(!state||root.hidden||now-lastFrame<30)return;lastFrame=now;
  const p=state.player;if(!playerVisual)playerVisual={x:p.x,y:p.y};playerVisual.x+=(p.x-playerVisual.x)*.38;playerVisual.y+=(p.y-playerVisual.y)*.38;configure();
  const {w,h}=view,dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}
  g.setTransform(dpr,0,0,dpr,0,0);rect('#294e35',0,0,w,h);g.setTransform(dpr*camera.s,0,0,dpr*camera.s,dpr*(w/2-camera.x*camera.s),dpr*(h/2-groundY(camera.y)*camera.s));
  g.imageSmoothingEnabled=false;g.drawImage(forest,-640,groundY(-640));
  if(state.baitSpot){const b=state.baitSpot;ellipse('#d1b66c44',b.x,groundY(b.y),23,12);rect('#8b653b',b.x-7,groundY(b.y)-8,14,9);rect('#e4c580',b.x-5,groundY(b.y)-10,10,5);}
  const entities=[...state.animals.map(a=>({y:a.y,draw:()=>deer(a,now/1000)})),{y:playerVisual.y,draw:()=>cowboy(now/1000)}];
  const actors=[playerVisual,...state.animals],frontTrees=[...edgeTrees,...state.trees].filter(t=>actors.some(a=>t.y>a.y&&t.y-a.y<180&&Math.abs(t.x-a.x)<70));
  entities.push(...frontTrees.map(t=>({y:t.y,draw:()=>{g.globalAlpha=t.y>playerVisual.y&&t.y-playerVisual.y<170&&Math.abs(t.x-playerVisual.x)<60?.55:1;pine(t);g.globalAlpha=1}})));
  for(const o of entities.sort((a,b)=>a.y-b.y))o.draw();
  const selected=state.animals.find(a=>a.id===state.targetId&&a.alive);
  for(const a of state.animals.filter(a=>a.alive)){g.strokeStyle=a===selected?'#f4da8e':'#eff3c58a';g.lineWidth=a===selected?2:1;g.setLineDash(a===selected?[]:[3,5]);g.beginPath();g.ellipse(a.x,groundY(a.y)+2,28,14,0,0,7);g.stroke();g.setLineDash([]);}
  if(state.aiming&&state.aim){const a=state.aim,pt={x:a.x,y:groundY(a.y)-22};stroke('#eddda277',1.5,[[playerVisual.x,groundY(playerVisual.y)-23],[pt.x,pt.y]]);g.strokeStyle=a.inRange?'#f3e6ab':'#e4a17b';g.lineWidth=1.5;g.beginPath();g.arc(pt.x,pt.y,6,0,7);g.moveTo(pt.x-12,pt.y);g.lineTo(pt.x+12,pt.y);g.moveTo(pt.x,pt.y-12);g.lineTo(pt.x,pt.y+12);g.stroke();ellipse('#fff2c0',pt.x,pt.y,2,2);}
  const shot=state.lastShot;if(shot&&now-shotReceivedAt<160){stroke('#ffedb3',2,[[shot.fromX,groundY(shot.fromY)-23],[shot.x,groundY(shot.y)-22]]);ellipse('#f9d780aa',shot.fromX,groundY(shot.fromY)-23,9,6);}
  // Compact compass; it reveals the trailhead and player, never hidden animals.
  g.setTransform(dpr,0,0,dpr,0,0);const mx=16,my=h>500?164:94,mw=72,mh=59;rect('#10291fce',mx,my,mw,mh);g.strokeStyle='#afba7e77';g.lineWidth=1;g.strokeRect(mx,my,mw,mh);stroke('#b2a374',2,state.tracks.map(t=>[mx+t.x/1280*mw,my+t.y/1040*mh]));ellipse('#f9db8e',mx+p.x/1280*mw,my+p.y/1040*mh,3,3);g.fillStyle='#e8e6bd';g.font='8px system-ui';g.textAlign='left';g.fillText('N ↑',mx+4,my+10);g.fillText('WILDPFAD',mx+4,my+mh-4);
  const vignette=g.createRadialGradient(w/2,h/2,Math.min(w,h)*.3,w/2,h/2,Math.max(w,h)*.7);vignette.addColorStop(0,'#10291f00');vignette.addColorStop(1,'#10291f40');g.fillStyle=vignette;g.fillRect(0,0,w,h);
  el('huntHint').style.opacity=now-messageAt>11000&&state.status==='active'?'.0':'1';
 }
 function emitMove(x,y){moveInput={x,y};if(state&&!state.paused)s.emit('huntControl',{type:'move',x,y})}
 const joy=el('huntJoystick'),stick=el('huntStick');
 function stickAt(e){const r=joy.getBoundingClientRect(),dx=e.clientX-r.x-r.width/2,dy=e.clientY-r.y-r.height/2,n=Math.max(1,Math.hypot(dx,dy)/(r.width*.31)),x=dx/n,y=dy/n;stick.style.transform=`translate(${x}px,${y}px)`;emitMove(x/(r.width*.31),y/(r.width*.31));}
 joy.onpointerdown=e=>{if(!state||state.paused||state.status!=='active')return;e.preventDefault();stickPointer=e.pointerId;joy.setPointerCapture(e.pointerId);stickAt(e)};
 joy.onpointermove=e=>{if(e.pointerId===stickPointer)stickAt(e)};
 function stopStick(){stickPointer=null;stick.style.transform='';emitMove(0,0)}
 joy.onpointerup=joy.onpointercancel=joy.onlostpointercapture=stopStick;
 canvas.onpointerdown=e=>{if(!state||state.paused)return;const r=canvas.getBoundingClientRect();configure();const p=world(e.clientX-r.x,e.clientY-r.y),a=state.animals.filter(a=>a.alive).sort((a,b)=>Math.hypot(a.x-p.x,a.y-22/.72-p.y)-Math.hypot(b.x-p.x,b.y-22/.72-p.y))[0];if(a&&Math.hypot(a.x-p.x,(a.y-p.y)*.72-22)<55)s.emit('huntControl',{type:'select',id:a.id});};
 function setAim(active){if(state&&!state.paused)s.emit('huntControl',{type:'aim',active})}
 const aimButton=el('huntAim');aimButton.onpointerdown=e=>{if(aimButton.disabled)return;e.preventDefault();aimPointer=e.pointerId;aimButton.setPointerCapture(e.pointerId);setAim(true)};
 aimButton.onpointerup=aimButton.onpointercancel=aimButton.onlostpointercapture=()=>{if(aimPointer!==null){aimPointer=null;setAim(false)}};
 el('huntSneak').onclick=()=>s.emit('huntControl',{type:'sneak',active:!state.sneak});el('huntBait').onclick=()=>s.emit('huntControl',{type:'bait'});
 function gunSound(){try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;lastAudio=lastAudio||new AC();lastAudio.resume();const ctx=lastAudio,buf=ctx.createBuffer(1,ctx.sampleRate*.13,ctx.sampleRate),data=buf.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*.025));const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buf;gain.gain.value=.13;source.connect(gain);gain.connect(ctx.destination);source.start();}catch{}}
 function fire(){if(!state||state.paused||!state.ready||!state.aiming||!state.aim?.inRange||shotPending)return;shotPending=true;s.emit('huntShoot',{});gunSound();navigator.vibrate?.(30)}
 el('huntFire').onpointerdown=e=>{e.preventDefault();fire()};el('huntFire').onclick=e=>{if(e.detail===0)fire()};
 el('huntBack').onclick=()=>{stopStick();setAim(false);s.emit('huntLeave')};
 function stopInputs(){stopStick();aimPointer=null;setAim(false);keys.clear()}
 window.addEventListener('keydown',e=>{if(!root.hidden&&e.code==='Space'){e.preventDefault();if(!e.repeat)el('huntFire').click();return;}if(root.hidden||!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key))return;e.preventDefault();keys.add(e.key);keyboardMove()});
 window.addEventListener('keyup',e=>{if(root.hidden)return;keys.delete(e.key);keyboardMove()});
 function keyboardMove(){emitMove(Number(keys.has('d')||keys.has('ArrowRight'))-Number(keys.has('a')||keys.has('ArrowLeft')),Number(keys.has('s')||keys.has('ArrowDown'))-Number(keys.has('w')||keys.has('ArrowUp')))}
 s.on('huntState',h=>{
  const opening=root.hidden;state=h;root.hidden=false;shotPending=false;if(h.lastShot&&h.lastShot.at!==lastShotAt){lastShotAt=h.lastShot.at;shotReceivedAt=performance.now()}
  if(opening){visual.clear();playerVisual={...h.player};if(!terrain){makeTerrain();cacheForest();}if(typeof stopMove==='function')stopMove();if(!raf)raf=requestAnimationFrame(render);}
  if(h.suspended&&!document.hidden)s.emit('huntControl',{type:'suspend',active:false});
  if(lastMessage!==h.message){lastMessage=h.message;messageAt=performance.now()}el('huntHint').textContent=h.message;
  el('huntBag').textContent=`${h.ammo} Patronen · ${h.kills} / 1 Tier · ${h.loot.meat} Fleisch`;
  el('huntStatus').textContent=h.paused?'Pause · Dein Ausflug wartet':h.status==='done'?'Beute gesichert · Zur Stadt zurückkehren':h.aiming?'Stillstehen · Zielpunkt beobachten':h.sneak?'Du schleichst · Tiere hören dich später':'Wildspuren folgen · Tier antippen';
  el('huntSneak').setAttribute('aria-pressed',String(h.sneak));aimButton.setAttribute('aria-pressed',String(h.aiming));
  for(const id of ['huntSneak','huntBait','huntAim'])el(id).disabled=h.paused||h.status!=='active';el('huntBait').disabled=el('huntBait').disabled||!h.bait;
  el('huntBait').querySelector('small').textContent=h.bait?'hier auslegen':'ausgelegt';
  el('huntFire').disabled=h.paused||h.status!=='active'||!h.aiming||!h.aim?.inRange||!h.ready||!h.ammo;
  el('huntFocus').hidden=!h.aiming;el('huntFocusText').textContent=!h.aim?'Kein Tier in Sicht':!h.aim.inRange?`${h.aim.distance} m · zu weit entfernt`:`${h.aim.distance} m · ${h.focus>.85?'ruhiges Ziel':'Ziel beruhigen …'}`;el('huntFocusFill').style.width=h.focus*100+'%';
  const summary=el('huntSummary');summary.hidden=h.status!=='done'&&!h.paused;
  if(!summary.hidden)summary.innerHTML=h.paused?'<h3>Der Wald ruht.</h3><p>Nach der Pause geht es hier weiter.</p>':`<h3>${h.kills?'Weidmannsheil.':'Zurück zum Trailhead.'}</h3><strong>${h.loot.meat} Fleisch · ${h.loot.hide} Fell</strong><p>${h.message}</p>`;
 });
 s.on('huntEnded',()=>{stopInputs();root.hidden=true;state=null;cancelAnimationFrame(raf);raf=0;visual.clear();playerVisual=null;lastMessage=''});
 s.on('disconnect',()=>{if(state){state.paused=true;el('huntStatus').textContent='Verbindung unterbrochen · Dein Ausflug wartet';el('huntFire').disabled=true;stickPointer=aimPointer=null;stick.style.transform=''}});
 document.addEventListener('visibilitychange',()=>{if(state){stopInputs();s.emit('huntControl',{type:'suspend',active:document.hidden})}});
 window.addEventListener('blur',()=>{if(state)stopInputs()});
})();
