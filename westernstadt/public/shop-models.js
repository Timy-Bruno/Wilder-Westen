import * as T from '/vendor/three-0.180.0/three.module.min.js';
// Models use X/Z for the server floor, Y for height. Every item has real thickness.
export function kit(){
 const materials=new Map(),geo=new Map();const mat=(color)=>{if(!materials.has(color))materials.set(color,new T.MeshStandardMaterial({color,roughness:1,flatShading:true}));return materials.get(color)};
 function box(parent,x,y,z,w,h,d,color,shadow=true){const k=[w,h,d].join(',');if(!geo.has(k))geo.set(k,new T.BoxGeometry(w,h,d));const o=new T.Mesh(geo.get(k),typeof color==='string'?mat(color):color);o.position.set(x,y,z);o.castShadow=shadow;o.receiveShadow=true;parent.add(o);return o;}
 function cyl(parent,x,y,z,r,h,color,r2=r,n=12){const o=new T.Mesh(new T.CylinderGeometry(r2,r,h,n),mat(color));o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 function texture(w,h,paint){const c=document.createElement('canvas');c.width=w;c.height=h;paint(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=2;return t;}
 function label(parent,text,x,y,z,w,h,bg='#38463a',fg='#e9d3a0'){const t=texture(512,128,g=>{g.fillStyle=bg;g.fillRect(0,0,512,128);g.strokeStyle='#b69760';g.lineWidth=5;g.strokeRect(8,8,496,112);g.fillStyle=fg;g.textAlign='center';g.textBaseline='middle';g.font='bold 37px Georgia';g.fillText(text,256,65,470)});const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:t}));m.position.set(x,y,z);parent.add(m);return m;}
 const wood=texture(256,256,g=>{g.fillStyle='#b48a57';g.fillRect(0,0,256,256);for(let r=0;r<8;r++){g.fillStyle=r%3===0?'#aa7e4d':'#ba915e';g.fillRect(0,r*32,256,31);g.strokeStyle='#60442944';g.beginPath();g.moveTo(0,r*32);g.lineTo(256,r*32);g.stroke();for(let i=0;i<4;i++){g.strokeStyle=i%2?'#563b2422':'#f1c88444';g.beginPath();g.moveTo(0,r*32+4+i*6);g.bezierCurveTo(70,r*32+i*6,180,r*32+8+i*6,256,r*32+4+i*6);g.stroke()}g.fillStyle='#62472e77';g.fillRect((r%2)*126,r*32,2,32)}});wood.wrapS=wood.wrapT=T.RepeatWrapping;
 const timber=new T.MeshStandardMaterial({map:wood,color:'#d7b88c',roughness:1});
 return {box,cyl,label,mat,texture,timber};
}
export function roomModel(scene,k){const {box,cyl,label,mat,timber}=k;
 box(scene,400,-10,350,800,20,530,'#5d4230');
 // Staggered boards are instanced: detailed floor without hundreds of draw calls.
 const floor=new T.InstancedMesh(new T.BoxGeometry(98,3,32),timber,17*8);const matrix=new T.Matrix4();let idx=0;
 for(let r=0;r<17;r++)for(let c=0;c<8;c++){const x=c*100+49;matrix.makeTranslation(x,1,100+r*30);floor.setMatrixAt(idx++,matrix)}floor.receiveShadow=true;scene.add(floor);
 box(scene,400,74,90,810,150,14,timber);box(scene,10,55,350,14,114,530,timber); // Back and left cutaway walls, open front/right.
 for(let x=25;x<800;x+=85)box(scene,x,75,99,7,145,8,'#5b402a');box(scene,400,149,90,825,12,22,'#9f794b');box(scene,10,115,350,22,10,540,'#b99663');
 for(const x of [170,630]){box(scene,x,99,100,102,75,8,'#493a29');box(scene,x,99,105,88,61,3,'#9ebaaa',false);box(scene,x,99,109,5,64,3,'#785a38');box(scene,x,99,109,90,4,3,'#785a38');box(scene,x,65,109,108,8,14,'#bf9a62');}
 label(scene,'HANDELSKONTOR',400,111,105,220,45);label(scene,'WAREN  ·  VORRÄTE  ·  HANDEL',400,72,105,220,22);
 for(const x of [88,712]){box(scene,x,128,114,3,33,3,'#493d2b');cyl(scene,x,107,114,10,25,'#cead63');const lamp=box(scene,x,108,114,11,17,11,'#ffe4a3');lamp.material=new T.MeshStandardMaterial({color:'#efc36b',emissive:'#e9aa44',emissiveIntensity:.5,roughness:.6});box(scene,x,122,114,24,4,24,'#5b5137');}
 // Side shelving runs: rear, sides, thick shelves and containers all occupy volume.
 for(const x of [87,713]){box(scene,x,6,265,85,12,280,'#62482f');box(scene,x,55,128,85,110,7,'#725237');for(const edge of [-39,39]){box(scene,x+edge,13,265,7,26,280,'#a37f4f');box(scene,x+edge,91,265,6,7,280,'#c2a16a');for(const z of [132,397])box(scene,x+edge,48,z,6,96,7,'#9c794b');}for(let r=0;r<4;r++){const z=153+r*67;box(scene,x,18,z,82,9,61,'#b79259');box(scene,x,92,z-23,82,5,6,'#ba9963');for(let i=0;i<3;i++){const xx=x-24+i*23;if((r+i)%3===0){cyl(scene,xx,39,z,7,31,['#8c9e7c','#668a7c','#b3a17a'][i]);cyl(scene,xx,58,z,3,8,'#473f2e');}else{box(scene,xx,38,z,15,30,18,['#d2ba85','#6b897c','#b98a5b'][i]);box(scene,xx,41,z+10,10,11,1,'#e3d2aa',false);}}}box(scene,x,96,128,95,8,16,'#c2a26e');}
 // Counter: back edge at z=180, front at z=255, waist-high for the merchant.
 box(scene,400,25,217.5,420,50,75,timber);box(scene,400,55,217.5,434,10,87,'#c8a16a');box(scene,400,4,219,424,8,78,'#493422');
 for(let i=0;i<7;i++){const x=221+i*58;box(scene,x,27,256,48,36,3,'#9c713f');box(scene,x,27,258,39,27,2,'#bd945b');box(scene,x,27,260,33,21,1,'#78542e');cyl(scene,x,27,262,2,3,'#dfc07f').rotation.x=Math.PI/2;}
 // Open book and a brass register rest exactly on the counter top at y=60.
 box(scene,255,62,212,62,3,37,'#493a2a');const book=k.texture(256,128,g=>{g.fillStyle='#e7d7ae';g.fillRect(0,0,256,128);g.strokeStyle='#ab9368';g.lineWidth=3;g.beginPath();g.moveTo(128,4);g.lineTo(128,123);g.stroke();for(let y=20;y<110;y+=15){g.fillRect(15,y,93,2);g.strokeStyle='#907c56';g.beginPath();g.moveTo(145,y);g.lineTo(235,y);g.stroke()}});const paper=new T.Mesh(new T.PlaneGeometry(57,32),new T.MeshBasicMaterial({map:book}));paper.rotation.x=-Math.PI/2;paper.position.set(255,64,212);scene.add(paper);
 box(scene,550,72,210,62,22,39,'#a59b60');box(scene,550,92,201,47,24,24,'#bdac70');label(scene,'12.00',550,93,214,34,11,'#2e443a','#ead9a1');for(let i=0;i<6;i++)cyl(scene,528+i*9,85,224,2,3,'#f1dfb1');
 box(scene,346,62,211,30,2,21,'#e7d6ad');cyl(scene,376,65,213,6,9,'#39473c');
 // Central island, with a real top and four feet rather than a front drawing.
 box(scene,400,32,422.5,150,12,65,'#b88f57');for(const xx of [337,463])for(const zz of [401,444])box(scene,xx,15,zz,9,30,9,'#725033');box(scene,400,15,422,140,8,54,'#896038');
 for(const x of [359,403]){const bag=new T.Mesh(new T.SphereGeometry(17,10,8),mat(x===359?'#c7b78c':'#adb18d'));bag.scale.set(1,1.2,.85);bag.position.set(x,58,420);bag.castShadow=true;scene.add(bag);cyl(scene,x,78,420,6,8,'#b6a177');box(scene,x,59,434,19,12,1,'#8c8568');}box(scene,447,49,425,33,23,29,'#78978d');
 for(const [x,z] of [[181,486],[214,499]]){cyl(scene,x,25,z,17,50,'#a77e45',15,12);for(const h of [10,39])cyl(scene,x,h,z,17.5,5,'#596055',17.5,12);cyl(scene,x,51,z,14,3,'#c1a168');}
 box(scene,617,25,482,65,50,65,timber);for(const a of [-.65,.65]){const beam=box(scene,617,27,515,6,58,3,'#65482d');beam.rotation.z=a;}box(scene,617,62,482,42,24,34,'#7d9687');
 // Thin rug, door opening and jambs lie at the exact server threshold.
 box(scene,400,2.5,534,145,2,48,'#9f523b',false);for(const z of [513,553])box(scene,400,4,z,134,1,2,'#d7ae76',false);for(const x of [335,465])box(scene,x,4,534,2,1,40,'#d7ae76',false);
 for(const x of [347,453])box(scene,x,29,583,12,58,18,'#9f794c');box(scene,400,0,582,98,2,31,'#57412c');for(let i=0;i<4;i++)box(scene,400,2,572+i*7,94,2,2,'#c1a270',false);
}
export function exteriorModel(scene,k){const {box,cyl,label,timber}=k;
 // Local footprint: x +/-65, z +/-50; front door centered at z=50.
 box(scene,0,3,65,154,6,44,timber);box(scene,0,0,91,58,5,12,'#9d7b4d');box(scene,0,-3,98,64,4,8,'#c09c65');
 box(scene,0,38,-48,130,76,6,timber);for(const x of [-62,62])box(scene,x,38,0,6,76,100,timber);
 for(const x of [-43,43])box(scene,x,38,49,44,76,6,timber);box(scene,0,67,49,43,18,6,timber);box(scene,0,25,35,37,50,2,'#1d3028');
 // Gabled roof with two physically sloping planes.
 for(const sign of [-1,1]){const roof=box(scene,sign*33,87,0,77,7,115,'#655947');roof.rotation.z=sign*-.43;for(let i=0;i<5;i++){const strip=box(scene,sign*33,91,-48+i*24,77,1.5,2,'#a69777');strip.rotation.z=sign*-.43;}}
 box(scene,0,80,57,143,29,8,'#ab8754');label(scene,'HANDELSKONTOR',0,81,62,132,22);box(scene,0,98,57,151,6,14,'#d6b47b');
 for(const x of [-43,43]){box(scene,x,40,53,28,33,5,'#493f2d');box(scene,x,40,56,23,27,2,'#a9c0a6');box(scene,x,40,58,3,28,2,'#7a623e');box(scene,x,40,58,24,3,2,'#7a623e');box(scene,x,24,56,33,5,10,'#c9a36a');}
 for(const x of [-23,23])box(scene,x,26,55,5,51,8,'#d7b782');box(scene,0,53,55,51,6,10,'#d7b782');
 box(scene,0,63,76,152,5,44,'#b68c54');for(const x of [-67,67])box(scene,x,33,89,5,61,5,'#795a36');
 box(scene,28,109,-23,15,31,18,'#845d42');box(scene,28,126,-23,21,4,24,'#ad8760');
}
