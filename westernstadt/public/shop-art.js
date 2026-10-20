/* Illustrated frontier interiors. All drawings are original, code-native Canvas art.
   Cached scenery is separate from gameplay coordinates and animated characters. */
window.ShopArt=(()=>{
 const P={ink:'#34291e',wood:'#96653c',gold:'#dab77b',cream:'#f1dbab',teal:'#52796e'};
 let g;const cache=new Map();
 const ground=y=>y*.78;
 function fill(x,y,w,h,c){g.fillStyle=c;g.fillRect(x,y,w,h)}
 function path(points,c,width=1,closed=false,paint=null){g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));if(closed)g.closePath();if(paint){g.fillStyle=paint;g.fill()}if(c){g.strokeStyle=c;g.lineWidth=width;g.lineJoin='round';g.lineCap='round';g.stroke()}}
 function oval(x,y,rx,ry,c,stroke=null){g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=c;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=1;g.stroke()}}
 function round(x,y,w,h,r,c,stroke=null){g.beginPath();g.roundRect(x,y,w,h,r);g.fillStyle=c;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=1;g.stroke()}}
 function grad(x,y,w,h,a,b){const q=g.createLinearGradient(x,y,x+w,y+h);q.addColorStop(0,a);q.addColorStop(1,b);return q}
 function text(t,x,y,size=12,c=P.cream,font='Georgia'){g.font=`${size}px ${font}`;g.textAlign='center';g.fillStyle=c;g.fillText(t,x,y)}
 function grain(x,y,w,h,seed=0){g.save();g.beginPath();g.rect(x,y,w,h);g.clip();for(let i=0;i<5;i++){const yy=y+5+(i*11+seed*7)%Math.max(6,h-5);g.strokeStyle=i%2?'#f3d09320':'#281c1426';g.lineWidth=.7;g.beginPath();g.moveTo(x+4,yy);g.bezierCurveTo(x+w*.3,yy-3,x+w*.6,yy+3,x+w-4,yy);g.stroke()}g.restore()}
 function shadow(x,y,w,h,alpha=.28){const q=g.createRadialGradient(x+w/2,y+h/2,2,x+w/2,y+h/2,Math.max(w,h)*.6);q.addColorStop(0,`rgba(27,19,12,${alpha})`);q.addColorStop(1,'rgba(27,19,12,0)');oval(x+w/2,y+h/2,w*.66,h*.75,q)}
 function nail(x,y){oval(x,y,1.5,1.2,'#463b2d');fill(x-.5,y-.5,1,1,'#c6aa77')}
 function wood(x,y,w,h,light='#ae7c49',dark='#71502f',seed=0){round(x,y,w,h,1,grad(x,y,w,h,light,dark));grain(x+2,y+2,w-4,h-4,seed);path([[x+1,y+1],[x+w-1,y+1]],'#e7b97b66');}
 function bottle(x,y,h,c){shadow(x-2,y+h-2,14,6,.2);round(x,y+6,12,h-6,3,grad(x,y,12,h,c,'#3d4836'));round(x+3,y,6,10,2,c);fill(x+3,y,6,3,'#60402b');fill(x+2,y+13,8,Math.max(7,h*.3),'#e3d3a6');path([[x+2,y+10],[x+2,y+h-5]],'#ffffff44');fill(x+5,y+16,3,1,'#6b5941')}
 function sack(x,y,w,h,c='#bfa67b'){shadow(x,y+h-3,w,7);g.beginPath();g.moveTo(x+w*.3,y+7);g.quadraticCurveTo(x-8,y+h*.8,x+3,y+h);g.quadraticCurveTo(x+w*.5,y+h+5,x+w-3,y+h);g.quadraticCurveTo(x+w+8,y+h*.75,x+w*.7,y+7);g.closePath();g.fillStyle=grad(x,y,w,h,'#d4be92',c);g.fill();path([[x+w*.25,y+7],[x+w*.75,y+7]],'#715e40',3);path([[x+w*.34,y+4],[x+w*.25,y-3],[x+w*.5,y+2],[x+w*.7,y-3]],'#a18a62',2);oval(x+w*.5,y+h*.58,w*.3,h*.2,'#6a624a77');text('FLOUR',x+w*.5,y+h*.64,6,'#eee0b7');path([[x+7,y+h*.55],[x+4,y+h*.85]],'#876c4944')}
 function tin(x,y,w,h,c){round(x,y,w,h,2,grad(x,y,w,h,c,'#686048'));oval(x+w/2,y,w/2,2,'#c8b58b');oval(x+w/2,y+h,w/2,2,'#776c51');fill(x+2,y+5,w-4,h-8,'#e4cfa1bb');path([[x+3,y+8],[x+w-3,y+8]],'#7b5c3c');}
 function barrel(x,y,w=33,h=45){shadow(x-3,y+h-5,w+6,12);g.beginPath();g.moveTo(x+3,y);g.bezierCurveTo(x-5,y+h*.3,x-5,y+h*.8,x+4,y+h);g.quadraticCurveTo(x+w/2,y+h+8,x+w-4,y+h);g.bezierCurveTo(x+w+5,y+h*.8,x+w+5,y+h*.3,x+w-3,y);g.closePath();g.fillStyle=grad(x,y,w,h,'#b98d52','#6f4a29');g.fill();for(let i=1;i<5;i++)path([[x+i*w/5,y+2],[x+i*w/5-1,y+h-1]],'#543e2a88');for(const yy of [y+10,y+h-11]){round(x-1,yy,w+2,5,1,grad(x,yy,w,5,'#77766b','#343d37'));fill(x+2,yy+1,w-4,1,'#a9a58c');nail(x+6,yy+3)}oval(x+w/2,y,w/2-2,7,'#be995f','#644c31');oval(x+w/2,y,w/2-6,4,'#a6804c');path([[x+5,y],[x+w-5,y]],'#76562f');}
 function base(){
 fill(0,70,800,420,'#6c4c31');g.save();g.beginPath();g.rect(0,70,800,420);g.clip();for(let row=0;row<15;row++){const yy=ground(95)+row*27;let xx=row%2?-51:0;let k=0;while(xx<800){const width=94+(row*19+k*23)%40;wood(xx,yy,width-1,26,['#ad8152','#a07649','#b48b5a','#976c42'][(row+k)%4],'#8b623c',row+k);if(xx>0){nail(xx+5,yy+5);nail(xx+5,yy+21)}if((row+k)%3===0){oval(xx+width*.6,yy+15,8,2,'#6d4c2e44');oval(xx+width*.6,yy+15,3,1,'#5e422c66')}xx+=width;k++;}}
 g.restore();
 // Timber wall, plinth and windows with reflected daylight.
 fill(0,-22,800,101,grad(0,-22,0,100,'#493728','#795639'));for(let x=0;x<800;x+=42){wood(x+1,-20,40,99,'#795b3e','#4f3827',x/42);path([[x+5,-12],[x+5,66]],'#d3ab6c22')}
 wood(0,69,800,12,'#c39b65','#7c5839');fill(0,81,800,4,'#261e1766');
 for(const x of [126,585]){shadow(x-8,0,98,71,.5);wood(x-7,-11,99,76,'#977448','#5e422a');fill(x,-4,85,56,grad(x,-4,0,56,'#a4c3bd','#ded9ac'));g.save();g.beginPath();g.rect(x,-4,85,56);g.clip();for(let j=0;j<4;j++){const xx=x+j*27;path([[xx,30],[xx+10,1],[xx+20,30]],null,1,true,'#59756633')}path([[x+5,0],[x+35,0],[x+10,45],[x-3,45]],null,1,true,'#ffffff33');g.restore();wood(x+39,-7,6,63,'#b38a57','#795736');wood(x-2,22,89,5,'#b08a56','#6c4a30');wood(x-8,52,102,8,'#c09a62','#6e5133');
 const beam=g.createLinearGradient(x,65,x+130,320);beam.addColorStop(0,'#f6d79720');beam.addColorStop(1,'#f6d79700');path([[x,65],[x+85,65],[x+205,380],[x+50,380]],null,1,true,beam);}
 // Sign with carved border, corner pins and aged lettering.
 shadow(278,-8,245,69,.4);round(278,-15,244,69,3,'#302b22','#bda06b');round(284,-9,232,57,1,'#374139','#887a51');text('HANDELSKONTOR',400,16,17,'#e8d4a5');path([[300,24],[500,24]],'#b9a174',.8);text('WAREN  ·  VORRÄTE  ·  HANDEL',400,38,8,'#c9bd96');for(const x of [288,512])for(const y of [-4,42])nail(x,y);
 // Notice and hunting print on the wall, away from the central sign.
 round(30,1,57,49,1,'#332d23');fill(34,4,49,41,'#cebd92');text('WILD & FELL',58,14,6,'#5c4a30');path([[42,33],[47,22],[57,25],[66,22],[72,30],[62,34],[51,34]],'#6b6746',1.5);path([[51,33],[48,40],[60,33],[62,40]],'#6b6746');
 // Brass lanterns and their warm pool of light.
 for(const x of [166,634]){path([[x,-20],[x,19]],'#30291f',2);oval(x,28,28,20,'#ffce7020');round(x-8,16,16,26,3,'#69502e','#c7a76a');round(x-5,20,10,17,2,grad(x,20,0,17,'#fff2b1','#dc983f'));fill(x-11,14,22,4,'#463d2b');oval(x,43,11,3,'#3d3424');const glow=g.createRadialGradient(x,100,4,x,100,150);glow.addColorStop(0,'#f8bd5722');glow.addColorStop(1,'#f8bd5700');oval(x,130,135,110,glow)}
 // Woven runner and worn welcome mat.
 shadow(327,ground(510),146,46);round(326,ground(507),148,43,2,'#643c2b');round(331,ground(511),138,35,1,'#ad6842');g.save();g.beginPath();g.rect(332,ground(512),136,33);g.clip();for(let i=0;i<10;i++)path([[333,ground(514)+i*3],[467,ground(514)+i*3]],'#e9b47522');g.restore();path([[335,ground(516)],[465,ground(516)],[465,ground(548)],[335,ground(548)],[335,ground(516)]],'#cba372',2);for(let x=343;x<465;x+=22)path([[x,ground(520)],[x+5,ground(526)],[x,ground(532)],[x-5,ground(526)],[x,ground(520)]],'#d5b17e66');
 wood(344,ground(568),112,31,'#725835','#30281e');for(let i=0;i<4;i++)fill(349,ground(573)+i*6,102,2,'#c4ae7a');text('ZUR STADT',400,ground(603),9,'#ddc590');
 // Contact shadows and border framing ground every object.
 fill(0,79,13,408,grad(0,0,13,0,'#32261b','#6c4b2c'));fill(787,79,13,408,'#3b2b1d');wood(0,ground(609),800,8,'#6d5032','#392b20');
 }
 function volume(x,sy,w,depth,z){
 const front=sy+depth-z;
 // Distinct top, dark right side and vertical front share the same ground footprint.
 path([[x+w-14,sy-z],[x+w,front],[x+w,sy+depth],[x+w-14,sy]],'#49331f',1,true,grad(x+w-14,sy-z,14,depth+z,'#6f482a','#3c2c20'));
 path([[x+12,front],[x+w,front],[x+w,sy+depth],[x+12,sy+depth]],'#634226',1,true,grad(x,front,0,z,'#956533','#5c3c23'));
 path([[x,sy-z],[x+w-14,sy-z],[x+w,front],[x+12,front]],'#6b4829',1.5,true,grad(x,sy-z,0,depth,'#d2ab70','#ab7c44'));
 path([[x,sy-z],[x+12,front],[x+w,front]],'#e9c993',2);path([[x+13,front+5],[x+w-3,front+5]],'#443120',3);
 return front;
 }
 function furniture(o){const {x,y,w,h,kind}=o,sy=ground(y),dh=h*.78;
 shadow(x-6,sy+dh-10,w+12,32,.5);
 if(kind==='shelf'){
 wood(x,sy-57,w,dh+57,'#805a35','#473422');fill(x+7,sy-49,w-15,dh+43,'#30271e');for(let row=0;row<4;row++){const yy=sy-43+row*51;fill(x+8,yy,w-18,43,grad(0,yy,0,43,'#29251e','#4b3b27'));for(let j=0;j<4;j++){const xx=x+12+j*16;if((row+j)%4===0)tin(xx,yy+21,12,18,['#9c6d46','#638378'][row%2]);else if(row===2&&j>1){wood(xx,yy+17,13,24,'#a59b72','#6f6949');path([[xx+2,yy+24],[xx+11,yy+24]],'#d5c8a1',2);}else bottle(xx,yy+7+(j%2)*4,31-(j%2)*4,['#9eac7d','#b78d5d','#708b78','#b4a382'][j]);}wood(x+4,yy+41,w-9,6,'#b29258','#75502d');for(const xx of [x+10,x+w-12])nail(xx,yy+44);}
 path([[x+w-9,sy-57],[x+w+7,sy-48],[x+w+7,sy+dh],[x+w-9,sy+dh-8]],'#463420',1,true,'#483222');path([[x-3,sy-67],[x+w-10,sy-67],[x+w+7,sy-57],[x+12,sy-57]],'#6b4c2c',1,true,'#d2ad70');path([[x+12,sy-57],[x+w+7,sy-57]],'#f1d19a',2);wood(x,sy+dh-36,w,36,'#7f5d36','#503b24');round(x+9,sy+dh-28,w-21,19,1,'#6c5032','#97764b');fill(x+8,sy+dh,w-15,5,'#372c1e');return;}
 if(kind==='counter'){
 const front=volume(x,sy,w,dh,52);for(let i=0;i<7;i++){const xx=x+21+i*54;round(xx,front+9,43,33,2,grad(xx,front,0,38,'#ad7c43','#76502d'),'#d2a461');round(xx+5,front+14,33,21,1,'#80592f','#ba8d50');oval(xx+21,front+26,3,2,'#e0bd7b');}
 for(let i=0;i<4;i++)path([[x+5+i*2,sy-44+i*12],[x+w-16+i*2,sy-44+i*12]],'#6f4c2944',1);grain(x+14,sy-43,w-34,34,7);fill(x+12,sy+dh-4,w-13,6,'#352719');
 // Open leather catalog, loose order slips, inkwell and mug.
 round(x+34,sy-31,61,32,2,'#423c2b','#d3ba80');path([[x+39,sy-27],[x+63,sy-25],[x+63,sy-4],[x+39,sy-7]],'#d7c59e',1,true,'#e8d9b2');path([[x+65,sy-25],[x+89,sy-28],[x+89,sy-7],[x+65,sy-4]],'#d7c59e',1,true,'#dbccaa');for(let i=0;i<4;i++)path([[x+69,sy-21+i*4],[x+84,sy-23+i*4]],'#8b7a58',.6);text('KATALOG',x+65,sy+7,6,'#4d3824');
 round(x+122,sy-25,26,15,1,'#ded0a5');path([[x+126,sy-20],[x+143,sy-20],[x+127,sy-15],[x+138,sy-15]],'#958466',.8);oval(x+168,sy-17,7,4,'#3b4035');path([[x+169,sy-18],[x+176,sy-32]],'#b29e6e',2);
 // Antique brass register on the right.
 round(x+w-98,sy-22,66,30,3,grad(x,sy-22,0,30,'#a99556','#605b32'),'#433f2b');round(x+w-91,sy-45,48,30,5,grad(x,sy-45,0,30,'#c5ad6c','#777041'),'#4a482f');round(x+w-85,sy-38,35,9,1,'#283b32','#d9c18a');text('12.00',x+w-67,sy-31,7,'#e6d9a8');for(let r=0;r<2;r++)for(let i=0;i<6;i++)oval(x+w-87+i*8,sy-20+r*7,2.7,2,'#e4d2a5','#5c5638');round(x+w-77,sy+1,27,4,2,'#bba569');return;}
 if(kind==='display'){
 const front=volume(x,sy,w,dh,33);for(let i=0;i<3;i++){const xx=x+20+i*43;wood(xx,front+9,34,19,'#a77943','#68452a',i);nail(xx+4,front+13);}for(let i=0;i<3;i++)path([[x+4+i*3,sy-25+i*12],[x+w-15+i*3,sy-25+i*12]],'#754f2d55');sack(x+14,sy-65,39,43);sack(x+59,sy-58,38,38,'#9b9b73');round(x+103,sy-40,34,18,3,'#6c8b83','#40564c');path([[x+110,sy-39],[x+112,sy-22],[x+129,sy-39],[x+131,sy-22]],'#d3bd88',2);tin(x+109,sy-18,17,16,'#aa7951');return;}
 if(kind==='barrels'){barrel(x,sy-21,32,48);barrel(x+33,sy-11,32,46);return;}
 // Shipping crate with a broad top and two upright faces.
 const front=volume(x,sy,w,dh,43);for(let i=0;i<3;i++)path([[x+4+i*3,sy-34+i*15],[x+w-14+i*3,sy-34+i*15]],'#89633b',1);path([[x+19,front+10],[x+w-8,sy+dh-8],[x+19,sy+dh-8],[x+w-8,front+10]],'#4f3823',4);path([[x+19,front+9],[x+w-8,sy+dh-9]],'#d8b77b',1);for(const xx of [x+20,x+w-9])for(const yy of [front+10,sy+dh-8])nail(xx,yy);round(x+9,sy-55,w-24,19,4,'#889b87','#485a50');path([[x+20,sy-55],[x+20,sy-36],[x+41,sy-55],[x+41,sy-36]],'#dcc695',2);

 }
 function person(p,color,walk=false,phase=0,npc=false,noShadow=false){const x=p.x,y=ground(p.y),step=walk?Math.sin(phase)*4:0,back=!npc&&Math.sin(p.facing||0)<-.45,side=!npc&&Math.abs(Math.cos(p.facing||0))>.8;if(!noShadow)shadow(x-17,y-3,34,10,.45);
 for(const [xx,ss] of [[x-9,step],[x+3,-step]]){round(xx,y-21+ss,7,20,2,'#3d3d37');round(xx-2,y-5+ss,11,6,2,'#3b2a22');path([[xx,y-4+ss],[xx+6,y-4+ss]],'#836247',1);}
 round(x-14,y-49,28,31,6,grad(x,y-50,28,30,color,'#524a37'),'#3c3528');round(x-11,y-48,22,28,3,color);path([[x,y-47],[x,y-19]],'#392e24',1);fill(x-11,y-25,22,4,'#5c412b');round(x+1,y-25,6,4,1,'#d8b970');
 const swing=walk?Math.sin(phase)*3:0;for(const [xx,sw] of [[x-17,swing],[x+11,-swing]]){round(xx,y-46+sw,7,25,3,color);round(xx,y-25+sw,7,8,2,'#d9aa7d');fill(xx,y-29+sw,7,3,npc?'#ded7bc':'#aa895b');}
 // Neck scarf, ears, face, hair and a shaded felt hat.
 round(x-6,y-56,12,10,2,'#c8996e');oval(x,y-61,12,14,'#dcb388','#805d42');oval(x-12,y-61,2,4,'#c49b72');oval(x+12,y-61,2,4,'#c49b72');if(back){round(x-10,y-72,20,17,4,'#5c4631');}else{if(!side){fill(x-6,y-63,2,2,'#3b342c');fill(x+4,y-63,2,2,'#3b342c');path([[x-5,y-67],[x-2,y-67]],'#786046');path([[x+3,y-67],[x+6,y-67]],'#786046');path([[x-2,y-61],[x-1,y-57],[x+2,y-57]],'#af8058',1);path([[x-3,y-53],[x+3,y-53]],'#986e50');if(npc){path([[x-7,y-55],[x-2,y-57],[x,y-55],[x+2,y-57],[x+7,y-55]],'#77583b',2);}}else{fill(x+(Math.cos(p.facing)>0?5:-7),y-63,2,2,'#3c3429');}}
 path([[x-10,y-49],[x,y-45],[x+10,y-49]],null,1,true,npc?'#e0d2ac':'#9b4837');if(!npc)path([[x+6,y-47],[x+9,y-35],[x+2,y-40]],null,1,true,'#aa5039');
 oval(x,y-75,23,6,'#3c3021aa');oval(x,y-77,22,6,grad(x-22,y-81,44,8,'#b19360','#765631'),'#4a3a27');round(x-13,y-94,26,18,5,grad(x-13,y-94,26,18,'#bc9a62','#886434'),'#624a2c');path([[x-12,y-79],[x+12,y-79]],'#4e4230',4);path([[x-10,y-90],[x+6,y-92]],'#e0bd7a88',1);
 if(npc){for(const xx of [x-6,x+5]){g.strokeStyle='#a89770';g.lineWidth=1;g.beginPath();g.arc(xx,y-62,4,0,Math.PI*2);g.stroke()}path([[x-2,y-62],[x+1,y-62]],'#a89770');}else if(!back){for(let i=0;i<2;i++)oval(x+5,y-39+i*8,1,1,'#d3b376');}
 }
 function cached(key,ox,oy,w,h,paint){if(!cache.has(key)){const c=document.createElement('canvas');c.width=Math.ceil(w*2);c.height=Math.ceil(h*2);const previous=g;g=c.getContext('2d');g.scale(2,2);g.translate(-ox,-oy);paint();g=previous;cache.set(key,{c,ox,oy,w,h});}const a=cache.get(key);g.drawImage(a.c,a.ox,a.oy,a.w,a.h)}
 return {characterCanvas(color,facing=1.57,phase=0,npc=false){const c=document.createElement('canvas');c.width=160;c.height=240;const previous=g;g=c.getContext('2d');g.scale(2,2);person({x:40,y:140,facing},color,phase!==0,phase,npc,true);g=previous;return c;},palette:P,base(ctx){g=ctx;cached('base',-20,-30,840,550,base)},furniture(ctx,o){g=ctx;cached('f-'+o.kind+'-'+o.x,o.x-24,ground(o.y)-100,o.w+48,o.h*.78+145,()=>furniture(o))},person(ctx,p,color,walk,phase){g=ctx;person(p,color,walk,phase)},merchant(ctx){g=ctx;g.save();g.beginPath();g.rect(300,25,200,ground(180)+8-25);g.clip();person({x:445,y:230,facing:Math.PI/2},'#527c70',false,0,true);g.restore();oval(428,ground(180)+3,5,3,'#dbb085');oval(462,ground(180)+3,5,3,'#dbb085');},vignette(ctx,w,h){const q=ctx.createRadialGradient(w*.5,h*.45,Math.min(w,h)*.15,w*.5,h*.45,Math.max(w,h)*.75);q.addColorStop(0,'#00000000');q.addColorStop(1,'#0e0d0b55');ctx.fillStyle=q;ctx.fillRect(0,0,w,h)}};
})();
