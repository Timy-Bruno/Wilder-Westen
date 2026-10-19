/* Private 2D hunting view. The server owns animals, timing, hits and rewards. */
(()=>{
 const root=document.createElement('section');root.id='hunting';root.hidden=true;
 const style=document.createElement('style');style.textContent=`
 #hunting{position:fixed;inset:0;z-index:25;display:grid;grid-template-rows:auto minmax(150px,1fr) auto;background:#122b28;color:#f5eed7;font:14px/1.4 system-ui,sans-serif;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}
 #hunting .hunt-header{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 14px;background:#112823;border-bottom:1px solid #75997b55;grid-column:1/-1}
 #hunting .hunt-kicker{font-size:9px;letter-spacing:.22em;color:#b4c7a0;text-transform:uppercase}#hunting h2{font:600 21px Georgia,serif;margin:1px 0;color:#f0dba2}#hunting .hunt-bag{text-align:right;font-size:12px;color:#d6e0ba}#hunting .hunt-bag b{font-size:18px;color:#fff1c6}
 #hunting .hunt-scene{position:relative;min-height:0;overflow:hidden;background:#344d3b}#huntCanvas{display:block;width:100%;height:100%;touch-action:none}
 #hunting .hunt-label{position:absolute;left:12px;top:10px;font:10px/1.4 system-ui,sans-serif;letter-spacing:.15em;color:#f4f5d5;text-shadow:0 1px 4px #14251d;pointer-events:none}#hunting .hunt-weather{position:absolute;right:12px;top:10px;font-size:11px;color:#eff2d4;text-shadow:0 1px 4px #14251d;pointer-events:none}
 #huntHint{position:absolute;left:12px;right:12px;bottom:10px;pointer-events:none;font:12px/1.4 system-ui,sans-serif;text-align:center;color:#f5eed7;text-shadow:0 1px 4px #000;background:#102a22bf;padding:7px 9px;border-radius:6px}
 #hunting .hunt-controls{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:10px 12px 12px;background:linear-gradient(#1c382e,#122820);border-top:1px solid #7b95605c;align-content:start}
 #hunting button{min-width:0;min-height:44px;padding:9px 5px;margin:0;font:600 12px/1.25 system-ui,sans-serif;color:#f5e9bf;background:#3b5540;border:1px solid #8c9c655c;border-radius:7px;box-shadow:0 3px #0c201b;touch-action:none}#hunting button:active{transform:translateY(2px)}#hunting button small{display:block;font-size:9px;font-weight:400;opacity:.8;margin-top:3px}#hunting button[aria-pressed=true]{background:#81734a;border-color:#d5c58a}#hunting button:disabled{opacity:.45}
 #hunting #huntFire{grid-column:2/4;background:linear-gradient(#c39555,#8f642f);border-color:#e0bf7a;color:#fff7e2;font-size:16px;min-height:56px;box-shadow:0 3px #533d21}#hunting #huntBack{font-size:11px;background:#213b30;color:#ccd3b5}#huntStatus{grid-column:1/-1;min-height:17px;text-align:center;font-size:11px;color:#bfcba6}
 #huntSummary{position:absolute;inset:0;background:#10291fdb;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;color:#f5ebc7;pointer-events:none}#huntSummary h3{font:26px Georgia,serif;color:#f3daa0;margin:0 0 12px;letter-spacing:0;text-transform:none;width:auto}#huntSummary strong{font:700 22px Georgia,serif;margin:10px}#huntSummary p{max-width:320px}
 @media(orientation:landscape) and (min-width:600px){#hunting{grid-template-columns:minmax(0,1fr) 200px;grid-template-rows:auto minmax(0,1fr)}#hunting .hunt-header{padding:5px 12px}#hunting h2{font-size:18px}#hunting .hunt-scene{grid-column:1;grid-row:2}#hunting .hunt-controls{grid-column:2;grid-row:2;grid-template-columns:1fr 1fr;overflow:auto;padding:10px;gap:8px;border-top:0;border-left:1px solid #7b95605c}#hunting #huntFire{grid-column:1/-1;grid-row:3}#hunting #huntBack{grid-column:1/-1;grid-row:4}#hunting #huntBait{grid-column:1/-1}#huntStatus{grid-row:5}#huntHint{font-size:11px}}
 @media(max-width:340px){#hunting h2{font-size:18px}#hunting .hunt-header{padding:7px 10px}#hunting .hunt-controls{padding:8px;gap:6px}#hunting button{min-height:40px}#hunting #huntFire{min-height:48px}#huntHint{font-size:10px;padding:5px}}
 `;document.head.append(style);
 root.innerHTML=`<div class="hunt-header"><div><div class="hunt-kicker">Grenzland · Jagdhütte</div><h2>Die stille Lichtung</h2></div><div class="hunt-bag"><b id="huntBag">0 / 2</b> Tiere<br><span id="huntClock">90 s</span> · <span id="huntRounds">6 Patronen</span></div></div><div class="hunt-scene"><canvas id="huntCanvas" aria-label="Waldlichtung: Finger ziehen zum Zielen"></canvas><div class="hunt-label">BLACKWOOD CREEK<br>WESTLICH DER STADT</div><div class="hunt-weather">Morgenlicht · windstill</div><div id="huntHint"></div><div id="huntSummary" hidden></div></div><div class="hunt-controls"><button id="huntApproach">Anschleichen<small>gedrückt halten</small></button><button id="huntScope" aria-pressed="false">Anvisieren<small>näher heranblicken</small></button><button id="huntBait">Köder legen<small>1 Köder dabei</small></button><button id="huntBack">Zurück<small>Beute mitnehmen</small></button><button id="huntFire">Schießen</button><div id="huntStatus">Gewehr · Ziehen zum Zielen</div></div>`;
 document.body.append(root);
 const el=id=>root.querySelector('#'+id),canvas=el('huntCanvas'),g=canvas.getContext('2d'),scene=root.querySelector('.hunt-scene');
 let state=null,raf=0,aim={x:320,y:270},focus={x:320,y:265},camera={s:1,x:0,y:0},visual=new Map(),previous=0,flashUntil=0,shotPending=false,lastAudio=null;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const seeded=n=>{let a=n|0;return()=>{a=(a*1664525+1013904223)>>>0;return a/4294967296}};
 const rect=(ctx,color,x,y,w,h)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h))};
 function poly(ctx,color,points){ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill()}
 function tree(ctx,x,y,size,far=false){
  const r=seeded((x*91+y*73+size*5)|0),trunk=size*.12,h=size*1.75;
  rect(ctx,far?'#466658':'#344d35',x-trunk/2,y-h,trunk,h);
  rect(ctx,far?'#5d7861':'#6a6040',x-trunk*.2,y-h,trunk*.28,h);
  for(let layer=0;layer<5;layer++){const yy=y-h+layer*size*.25,ww=size*(.35+layer*.15);poly(ctx,far?'#55765c':'#244c36',[[x,yy-size*.42],[x-ww*.55,yy+size*.35],[x+ww*.58,yy+size*.35]]);
   for(let k=0;k<10;k++){const xx=x+(r()-.5)*ww,py=yy+r()*size*.35;rect(ctx,far?'#769077':r()>.6?'#71925c':'#3e6b43',xx,py,3+r()*6,2+r()*4);}}
 }
 function background(ctx,bounds){
  const r=seeded(942);rect(ctx,'#90ad85',bounds.x,bounds.y,bounds.w,bounds.h);
  const sky=ctx.createLinearGradient(0,-160,0,400);sky.addColorStop(0,'#d7dcab');sky.addColorStop(.38,'#a5c29b');sky.addColorStop(.7,'#668b6c');sky.addColorStop(1,'#344f39');ctx.fillStyle=sky;ctx.fillRect(bounds.x,bounds.y,bounds.w,bounds.h);
  poly(ctx,'#7d9e80',[[bounds.x,170],[80,100],[230,140],[390,85],[520,120],[bounds.x+bounds.w,65],[bounds.x+bounds.w,350],[bounds.x,350]]);
  for(let x=bounds.x-60;x<bounds.x+bounds.w+100;x+=29)tree(ctx,x,205+r()*35,55+r()*35,true);
  // Layers of shaded undergrowth frame a lighter, open meadow.
  rect(ctx,'#456447',bounds.x,226,bounds.w,bounds.y+bounds.h-226);
  poly(ctx,'#71905a',[[bounds.x,274],[80,243],[220,250],[330,211],[465,239],[640,235],[bounds.x+bounds.w,270],[bounds.x+bounds.w,700],[bounds.x,700]]);
  poly(ctx,'#8f9f64',[[75,340],[160,275],[295,264],[350,242],[493,272],[600,320],[650,430],[200,470]]);
  poly(ctx,'#b1ad79',[[354,225],[376,225],[340,278],[368,306],[333,348],[287,412],[225,450],[270,355],[302,307],[304,279]]);
  poly(ctx,'#91b7a2',[[430,259],[459,258],[503,284],[480,309],[528,330],[500,358],[539,420],[505,450],[478,359],[496,333],[456,310],[472,284]]);
  for(let i=0;i<1250;i++){const x=bounds.x+r()*bounds.w,y=235+r()*Math.max(180,bounds.y+bounds.h-235);rect(ctx,['#84955b','#617e4c','#a2ac6c','#4b7049','#bfbb7b'][i%5],x,y,1+r()*4,1+r()*2);}
  for(let i=0;i<36;i++){const x=r()*640,y=260+r()*140;rect(ctx,'#c7c481',x,y,2,2);rect(ctx,'#e9d8a6',x+1,y-2,2,2);}
  for(let x=bounds.x-80;x<bounds.x+bounds.w+100;x+=72){if(x>65&&x<570)continue;tree(ctx,x,290+r()*65,85+r()*30);}
  // Warm, translucent shafts cut through the cool tree line.
  poly(ctx,'#f7e6a115',[[399,bounds.y],[427,bounds.y],[290,380],[229,380]]);poly(ctx,'#f7e6a118',[[465,bounds.y],[481,bounds.y],[383,337],[355,337]]);
  for(const [x,y] of [[78,308],[423,333],[554,284]]){poly(ctx,'#536758',[[x-12,y],[x-9,y-9],[x+6,y-13],[x+15,y-3],[x+11,y+4]]);rect(ctx,'#85917a',x-6,y-8,12,3);}
 }
 let cached=null,cacheKey='';
 function transform(){const w=scene.clientWidth,h=scene.clientHeight,z=(state?.scoped?1.55:1)*(1+(65-(state?.distance||65))/160),base=Math.min(w/640,h/400);camera={s:base*z,x:w/2-(state?.scoped?focus.x:320)*base*z,y:h/2-(state?.scoped?focus.y:200)*base*z};return {w,h};}
 function deer(a,t){
  let p=visual.get(a.id);if(!p){p={x:a.x,y:a.y};visual.set(a.id,p)}const warp=Math.abs(p.x-a.x)>180;p.x=warp?a.x:p.x+(a.x-p.x)*.25;p.y+=(a.y-p.y)*.25;
  if(!a.alive&&a.fade<=0)return;
  g.save();g.translate(Math.round(p.x),Math.round(p.y));g.scale(a.dir,1);g.globalAlpha=a.alive?1:a.fade;
  if(!a.alive){rect(g,'#e6d5a5',-10,-5,20,12);rect(g,'#7b633f',-8,-9,16,5);rect(g,'#b6a278',-6,7,12,3);g.restore();return;}
  const moving=a.mode==='walk'||a.mode==='flee',pace=Math.sin(t*(a.mode==='flee'?18:7)+a.id)* (moving?5:0),dip=a.mode==='graze';
  g.fillStyle='#263c2d44';g.beginPath();g.ellipse(0,20,27,6,0,0,7);g.fill();
  poly(g,'#6b4b30',[[-16,7],[-11,7],[-13+pace,27],[-18+pace,27]]);poly(g,'#6b4b30',[[12,7],[16,7],[18-pace,27],[14-pace,27]]);
  poly(g,'#b4824c',[[-22,-8],[-16,-13],[12,-12],[23,-5],[21,8],[8,13],[-16,10],[-24,3]]);
  rect(g,'#d1a367',-16,-10,27,5);poly(g,'#ead2a0',[[-17,7],[16,8],[9,12],[-14,10]]);
  poly(g,'#9c6b3d',[[-13,7],[-8,8],[-9-pace,28],[-13-pace,28]]);poly(g,'#c79a60',[[16,7],[20,6],[16+pace,28],[12+pace,28]]);
  rect(g,'#3b3a2b',-14-pace,27,6,3);rect(g,'#3b3a2b',11+pace,27,6,3);
  poly(g,'#f0dec0',[[-22,-5],[-31,-9],[-28,-1],[-21,3]]);
  if(dip){poly(g,'#b4824c',[[16,-9],[25,-8],[33,-1],[31,6],[23,0]]);poly(g,'#c99a63',[[28,-5],[41,-5],[45,1],[40,6],[29,4]]);rect(g,'#292c22',42,0,4,3);rect(g,'#1d3026',35,-3,2,2);poly(g,'#d2ad78',[[30,-5],[24,-14],[33,-10]]);}
  else{poly(g,'#b4824c',[[14,-10],[20,-31],[28,-34],[29,-13],[23,2]]);poly(g,'#d1a46d',[[20,-34],[33,-37],[41,-33],[40,-28],[28,-24],[20,-27]]);rect(g,'#252d22',38,-33,5,4);rect(g,'#172b24',30,-34,2,2);poly(g,'#d2ad78',[[20,-35],[17,-47],[24,-41],[27,-36]]);poly(g,'#9a6d44',[[27,-37],[33,-47],[34,-39],[31,-35]]);
   if(a.id===1){g.strokeStyle='#d8c4a0';g.lineWidth=2;g.beginPath();g.moveTo(23,-38);g.lineTo(16,-52);g.lineTo(9,-56);g.moveTo(17,-49);g.lineTo(20,-57);g.moveTo(27,-39);g.lineTo(29,-52);g.lineTo(35,-57);g.stroke();}}
  if(a.mode==='watch'){g.fillStyle='#f0db9c';g.font='bold 13px Georgia';g.textAlign='center';g.fillText('!',0,-57)}g.restore();
 }
 function cover(r){
  if(r.h>60){
   rect(g,'#253b2b',r.x-3,-180,r.w+6,r.y+r.h+180);rect(g,'#4e4b2e',r.x,-180,r.w*.55,r.y+180);rect(g,'#777047',r.x+3,-180,r.w*.14,r.y+180);
   poly(g,'#344a30',[[r.x,-70],[r.x-60,-130],[r.x-64,-146],[r.x+12,-95],[r.x+53,-151],[r.x+63,-144],[r.x+20,-62]]);
   const leaf=seeded(r.x);for(let i=0;i<22;i++){const x=r.x+(leaf()-.5)*135-20,y=-225+leaf()*125,w=32+leaf()*32,h=26+leaf()*24,c=['#1d3d2d','#284d33','#385d37','#4c7040'][i%4];rect(g,c,x+8,y,w-16,h);rect(g,c,x+3,y+5,w-6,h-10);rect(g,c,x,y+10,w,h-20);for(let k=0;k<9;k++)rect(g,i%3?'#547b45':'#345d39',x+8+leaf()*(w-16),y+5+leaf()*(h-10),2+leaf()*4,2);}
   rect(g,'#253b2b',r.x-3,r.y,r.w+6,r.h);rect(g,'#4e4b2e',r.x,r.y,r.w*.55,r.h);rect(g,'#777047',r.x+3,r.y,r.w*.14,r.h);for(let y=r.y+8;y<r.y+r.h;y+=19)rect(g,'#393e28',r.x+8,y,r.w*.55,3);poly(g,'#263d2d',[[r.x-7,r.y+r.h+3],[r.x+4,r.y+r.h-20],[r.x+r.w,r.y+r.h-16],[r.x+r.w+10,r.y+r.h+3]]);}
  else{const rng=seeded(34);for(let i=0;i<16;i++){const x=r.x+rng()*r.w,y=r.y+rng()*r.h;rect(g,i%3?'#365a36':'#547a42',x-4,y-7,11,10)}rect(g,'#355b34',r.x,r.y+8,r.w,12)}
 }
 function render(now){raf=requestAnimationFrame(render);if(!state||root.hidden)return;if(now-previous<30)return;previous=now;
  const {w,h}=transform(),dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);cacheKey='';}
  const key=[w,h,camera.s,camera.x,camera.y].join(':');if(key!==cacheKey){cacheKey=key;cached=document.createElement('canvas');cached.width=canvas.width;cached.height=canvas.height;const bg=cached.getContext('2d');bg.setTransform(dpr*camera.s,0,0,dpr*camera.s,dpr*camera.x,dpr*camera.y);background(bg,{x:-camera.x/camera.s,y:-camera.y/camera.s,w:w/camera.s,h:h/camera.s});}
  g.setTransform(1,0,0,1,0,0);g.drawImage(cached,0,0);g.setTransform(dpr*camera.s,0,0,dpr*camera.s,dpr*camera.x,dpr*camera.y);g.imageSmoothingEnabled=false;
  for(const a of [...state.animals].sort((a,b)=>a.y-b.y))deer(a,now/1000);
  if(state.baitActive){rect(g,'#bba16a',311,280,18,11);rect(g,'#e0c58d',314,277,12,4);rect(g,'#7b7042',316,291,12,3)}
  for(const r of state.cover)cover(r);
  // Foreground ferns and branches establish the hunter's hiding place.
  const bounds={left:-camera.x/camera.s,right:(w-camera.x)/camera.s,bottom:(h-camera.y)/camera.s};
  for(const x of [bounds.left+15,bounds.right-20]){poly(g,'#1c3b2a',[[x-25,bounds.bottom],[x,bounds.bottom-90],[x+16,bounds.bottom]]);for(let i=0;i<6;i++)poly(g,i%2?'#3d6540':'#2c5435',[[x,bounds.bottom-i*12],[x-30,bounds.bottom-i*12-20],[x,bounds.bottom-i*12-10],[x+25,bounds.bottom-i*12-28]]);}
  if(!reduced){g.fillStyle='#f0e6a977';for(let i=0;i<10;i++)g.fillRect(70+i*55+Math.sin(now/2400+i)*8,170+(i*43+now/65)%210,1.5,1.5);}
  g.setTransform(dpr,0,0,dpr,0,0);const ax=aim.x*camera.s+camera.x,ay=aim.y*camera.s+camera.y;
  g.save();g.translate(w-35,h+15);g.rotate(Math.atan2(ay-h,ax-(w-35)));g.scale(.8,.8);poly(g,'#9b6b3f',[[-48,-8],[-14,-9],[3,-4],[10,6],[-10,10],[-45,16]]);rect(g,'#513b28',-42,-5,23,17);rect(g,'#283a35',-4,-5,75,7);rect(g,'#63766b',4,-5,65,2);rect(g,'#263a33',21,-14,28,7);rect(g,'#adc0a3',44,-12,3,3);rect(g,'#b28754',-3,2,29,9);g.restore();
  g.strokeStyle=now<flashUntil?'#ffdb82':'#f3ead1';g.lineWidth=1.5;g.beginPath();g.arc(ax,ay,state.scoped?17:12,0,7);for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){g.moveTo(ax+dx*7,ay+dy*7);g.lineTo(ax+dx*23,ay+dy*23)}g.stroke();g.fillStyle='#e8d8aa';g.fillRect(ax-1,ay-1,2,2);
  if(now<flashUntil){g.fillStyle='#fff0b424';g.fillRect(0,0,w,h)}
 }
 function aimAt(e){const r=canvas.getBoundingClientRect();transform();aim.x=Math.max(0,Math.min(640,(e.clientX-r.left-camera.x)/camera.s));aim.y=Math.max(0,Math.min(400,(e.clientY-r.top-camera.y)/camera.s));}
 canvas.onpointerdown=e=>{if(state?.status!=='active'||state.paused)return;canvas.setPointerCapture(e.pointerId);aimAt(e)};canvas.onpointermove=e=>{if(canvas.hasPointerCapture(e.pointerId))aimAt(e)};
 function approach(active){if(!state||state.paused)return;s.emit('huntControl',{type:'approach',active})}
 el('huntApproach').onpointerdown=e=>{e.preventDefault();el('huntApproach').setPointerCapture(e.pointerId);approach(true)};el('huntApproach').onpointerup=el('huntApproach').onpointercancel=()=>approach(false);
 el('huntScope').onclick=()=>{if(!state.scoped)focus={...aim};s.emit('huntControl',{type:'scope',active:!state.scoped})};el('huntBait').onclick=()=>s.emit('huntControl',{type:'bait'});
 function gunSound(){try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;lastAudio=lastAudio||new AC();lastAudio.resume();const ctx=lastAudio,buf=ctx.createBuffer(1,ctx.sampleRate*.13,ctx.sampleRate),data=buf.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*.025));const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buf;gain.gain.value=.13;source.connect(gain);gain.connect(ctx.destination);source.start();}catch{}}
 el('huntFire').onclick=()=>{if(!state||state.paused||!state.ready||!state.ammo||state.status!=='active'||shotPending)return;shotPending=true;flashUntil=performance.now()+110;s.emit('huntShoot',{x:aim.x,y:aim.y});gunSound();if(navigator.vibrate)navigator.vibrate(35)};
 el('huntBack').onclick=()=>{approach(false);s.emit('huntLeave')};
 s.on('huntState',h=>{
  const opening=root.hidden;state=h;root.hidden=false;shotPending=false;
  if(opening){visual.clear();aim={x:320,y:270};cacheKey='';if(typeof stopMove==='function')stopMove();if(!raf)raf=requestAnimationFrame(render);}
  if(h.suspended&&!document.hidden)s.emit('huntControl',{type:'suspend',active:false});
  el('huntBag').textContent=h.kills+' / 2';el('huntClock').textContent=h.remaining+' s';el('huntRounds').textContent=h.ammo+' Patronen';el('huntHint').textContent=h.message;
  el('huntStatus').textContent=h.paused?'Pause · Die Jagd wartet':h.status==='done'?'Beute wird beim Zurückkehren in den Rucksack gelegt':`${h.distance} m Abstand · Fleisch ${h.loot.meat} · Felle ${h.loot.hide}`;
  el('huntScope').setAttribute('aria-pressed',String(h.scoped));el('huntApproach').setAttribute('aria-pressed',String(h.approach));
  for(const id of ['huntScope','huntApproach','huntBait','huntFire'])el(id).disabled=h.paused||h.status!=='active';el('huntBait').disabled=el('huntBait').disabled||h.bait===0;
  el('huntBait').querySelector('small').textContent=h.bait?'1 Köder dabei':h.baitActive?'Köder liegt aus':'Köder verbraucht';el('huntFire').disabled=el('huntFire').disabled||!h.ready||!h.ammo;
  const summary=el('huntSummary');summary.hidden=h.status!=='done'&&!h.paused;
  if(!summary.hidden){summary.innerHTML=h.paused?'<h3>Die Lichtung ruht.</h3><p>Nach der Pause geht es hier weiter.</p>':`<h3>${h.kills?'Weidmannsheil.':'Heute blieb der Wald still.'}</h3><strong>${h.loot.meat} Fleisch · ${h.loot.hide} Felle</strong><p>${h.message}</p><p>Unten „Zurück“ wählen, um die Jagd zu beenden.</p>`;}
 });
 s.on('huntEnded',()=>{root.hidden=true;state=null;cancelAnimationFrame(raf);raf=0;visual.clear()});
 s.on('disconnect',()=>{if(state){state.paused=true;el('huntStatus').textContent='Verbindung unterbrochen · Jagd wird nach Wiederbeitritt fortgesetzt';el('huntFire').disabled=true;}});
 document.addEventListener('visibilitychange',()=>{if(state)s.emit('huntControl',{type:'suspend',active:document.hidden})});
 window.addEventListener('blur',()=>{if(state)approach(false)});
})();
