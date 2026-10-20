/* First finished street facade: footprint and doorway match the server building. */
window.CityShop={draw(g,b,occupied){const {x,y,w,h}=b,cx=x+w/2,bottom=y+h;g.save();
 const rect=(xx,yy,ww,hh,c)=>{g.fillStyle=c;g.fillRect(xx,yy,ww,hh)},line=(ps,c,z=1)=>{g.strokeStyle=c;g.lineWidth=z;g.beginPath();ps.forEach(([xx,yy],i)=>i?g.lineTo(xx,yy):g.moveTo(xx,yy));g.stroke()},poly=(ps,c)=>{g.fillStyle=c;g.beginPath();ps.forEach(([xx,yy],i)=>i?g.lineTo(xx,yy):g.moveTo(xx,yy));g.closePath();g.fill()};
 poly([[x+8,y+12],[x+w+10,y+18],[x+w+12,bottom+18],[x+10,bottom+14]],'#573d2844');
 // Raised timber boardwalk and front steps clearly point toward the doorway.
 rect(x-7,bottom-3,w+14,20,'#795333');for(let i=0;i<4;i++){rect(x-7,bottom-3+i*5,w+14,4,i%2?'#ba915a':'#aa7e48');line([[x+3,bottom+i*5],[x+w-4,bottom+i*5]],'#d4b17b55');}rect(cx-27,bottom+17,54,6,'#7a5939');rect(cx-30,bottom+21,60,5,'#ad8855');
 // Straight street alignment; roof depth rises toward the back without rotating the footprint.
 poly([[x-4,y+14],[x+8,y-14],[x+w-8,y-14],[x+w+4,y+14]],'#6f5240');
 for(let yy=y-10;yy<y+14;yy+=5)line([[x+6,yy],[x+w-6,yy]],'#aa8260',1);
 line([[x+8,y-14],[x+w-8,y-14]],'#d2ad78',3);
 rect(x+w-29,y-27,12,21,'#795643');rect(x+w-31,y-29,16,5,'#b39169');
 rect(x,y+12,w,h-12,'#976b40');poly([[x+w-10,y+12],[x+w,y+17],[x+w,bottom],[x+w-10,bottom-4]],'#604329');
 for(let yy=y+20;yy<bottom;yy+=9){rect(x+2,yy,w-14,7,(yy-y)%18?'#a47c4c':'#926a3e');line([[x+6,yy+2],[x+w-17,yy+2]],'#d4ac7055');}
 // False front, projecting cornice and inset hand-painted sign.
 poly([[x-3,y+4],[x+w-6,y+4],[x+w+3,y+13],[x+5,y+13]],'#ccaa73');rect(x+5,y+13,w-2,6,'#4c3828');rect(x-3,y+4,w+6,5,'#9b7548');rect(x+8,y+20,w-26,23,'#463c2a');rect(x+11,y+23,w-32,17,'#4d5a49');g.textAlign='center';g.fillStyle='#f0dca4';let signSize=11;do{g.font=`bold ${signSize}px Georgia`;if(g.measureText('HANDELSKONTOR').width<=w-44)break;signSize-=.25;}while(signSize>5);g.fillText('HANDELSKONTOR',x+11+(w-32)/2,y+35);
 // Recessed dark opening: entry line is on the boardwalk, not anywhere along the wall.
 rect(cx-22,bottom-35,44,36,'#4f3724');rect(cx-17,bottom-31,34,31,'#1e2420');rect(cx-15,bottom-29,29,25,'#38483a');rect(cx-13,bottom-27,24,22,'#222d26');rect(cx-23,bottom-38,46,5,'#dab679');rect(cx-23,bottom-34,5,34,'#c39a5e');rect(cx+17,bottom-34,5,34,'#8c653d');rect(cx-18,bottom-2,36,4,'#ead0a0');
 for(const xx of [x+12,x+w-43]){rect(xx-2,y+53,29,31,'#57402b');const glow=g.createLinearGradient(xx,y+54,xx,y+82);glow.addColorStop(0,occupied?'#e6cb86':'#c2c9a2');glow.addColorStop(1,'#8fa990');g.fillStyle=glow;g.fillRect(xx,y+55,24,24);rect(xx+10,y+55,3,24,'#6d5436');rect(xx,y+65,24,3,'#6d5436');rect(xx-3,y+80,30,4,'#d4ad70');}
 for(const xx of [x-2,x+w-4]){rect(xx,bottom-53,5,55,'#684a2d');rect(xx-2,bottom-55,9,4,'#d0ab70');}poly([[x-8,bottom-56],[x+w-4,bottom-56],[x+w+8,bottom-43],[x+4,bottom-43]],'#b78d53');line([[x+4,bottom-43],[x+w+8,bottom-43]],'#61482d',2);
 // The entrance stays open even while other players are inside.
 rect(cx-22,bottom-42,44,9,'#493b29');g.font='bold 6px Georgia';g.fillStyle='#f0dca4';g.fillText('EINGANG',cx,bottom-35);g.restore();}};


/* The smith shares the approved straight street perspective, with stone and iron. */
window.CitySmith={draw(g,b,occupied){
 const {x,y,w,h}=b,cx=x+w/2,bottom=y+h;g.save();
 const rect=(xx,yy,ww,hh,c)=>{g.fillStyle=c;g.fillRect(xx,yy,ww,hh)},poly=(points,c)=>{g.fillStyle=c;g.beginPath();points.forEach(([xx,yy],i)=>i?g.lineTo(xx,yy):g.moveTo(xx,yy));g.closePath();g.fill()},line=(points,c,width=1)=>{g.strokeStyle=c;g.lineWidth=width;g.beginPath();points.forEach(([xx,yy],i)=>i?g.lineTo(xx,yy):g.moveTo(xx,yy));g.stroke()};
 // Solid stone plinth, rear roof plane and long iron chimney.
 poly([[x+5,y+8],[x+w+10,y+12],[x+w+12,bottom+14],[x+9,bottom+15]],'#48392f44');
 rect(x-3,bottom-2,w+6,10,'#625b4d');rect(x-5,bottom+8,w+10,5,'#b6a17a');
 poly([[x-5,y+15],[x+7,y-12],[x+w-7,y-12],[x+w+5,y+15]],'#58544b');
 for(let yy=y-7;yy<y+15;yy+=5)line([[x+6,yy],[x+w-6,yy]],'#938a72');
 for(let xx=x+16;xx<x+w-8;xx+=22)line([[xx,y-10],[xx,y+13]],'#423f37');
 rect(x+14,y-30,16,38,'#685b4d');for(let yy=y-27;yy<y+5;yy+=6){rect(x+15,yy,14,1,'#aa9271');}rect(x+11,y-32,22,5,'#3c3933');
 rect(x,y+13,w,h-13,'#827053');rect(x+w-7,y+13,7,h-13,'#4c4335');
 for(let yy=y+19;yy<bottom-5;yy+=10){rect(x+3,yy,w-13,8,yy%20?'#927b56':'#a1875e');line([[x+5,yy+2],[x+w-13,yy+2]],'#c3a67455');}
 // Painted metal sign, sized to its frame.
 rect(x+8,y+18,w-24,24,'#3e3b31');rect(x+11,y+21,w-30,18,'#43554d');g.textAlign='center';g.fillStyle='#efdab0';g.font='bold 10px Georgia';g.fillText('SCHMIEDE',cx-4,y+34);
 for(const xx of [x+13,x+w-23]){rect(xx,y+23,2,2,'#d4b783');rect(xx,y+35,2,2,'#d4b783');}
 // Door remains centered on the original interactive footprint.
 rect(cx-19,bottom-39,38,39,'#40372b');rect(cx-15,bottom-34,30,34,'#252c28');rect(cx-22,bottom-43,44,7,'#b59a6c');rect(cx-21,bottom-36,5,36,'#69563d');rect(cx+16,bottom-36,5,36,'#5a4936');rect(cx-17,bottom-2,34,4,'#d6bd8d');
 // Forge bay: stone arch, ember glow and a raised anvil with visible top/front.
 rect(x+7,bottom-43,31,39,'#605e50');rect(x+12,bottom-38,21,27,'#272a26');
 const glow=g.createRadialGradient(x+23,bottom-17,1,x+23,bottom-17,15);glow.addColorStop(0,occupied?'#fff0a6':'#f6c276');glow.addColorStop(.45,'#cf6a36');glow.addColorStop(1,'#332b2500');g.fillStyle=glow;g.fillRect(x+8,bottom-34,29,28);
 for(let k=0;k<3;k++){rect(x+11+k*7,bottom-12,5,4,k%2?'#f3b25e':'#b95730');}rect(x+8,bottom-8,30,5,'#a99570');
 const ax=x+w-34;rect(ax+5,bottom-18,13,15,'#634b33');poly([[ax+1,bottom-20],[ax+23,bottom-20],[ax+20,bottom-15],[ax+5,bottom-15]],'#454c47');poly([[ax-2,bottom-25],[ax+27,bottom-25],[ax+22,bottom-20],[ax+2,bottom-20]],'#a4a89a');rect(ax+3,bottom-20,18,4,'#68716a');line([[ax+1,bottom-25],[ax+23,bottom-25]],'#d1cbb1');
 // Hanging hammer and tongs, drawn without platform-dependent emoji.
 line([[x+w-25,y+50],[x+w-25,y+64]],'#533b2b',3);rect(x+w-31,y+48,13,5,'#b1b1a0');line([[x+w-15,y+49],[x+w-18,y+57],[x+w-14,y+65]],'#c2b798',1.5);
 rect(x-4,y+42,w+8,5,'#b69a68');rect(x-2,y+47,4,47,'#514431');rect(x+w-3,y+47,4,47,'#514431');
 g.restore();
}};
