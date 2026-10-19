/* First finished street facade: footprint and doorway match the server building. */
window.CityShop={draw(g,b,occupied){const {x,y,w,h}=b,cx=x+w/2,bottom=y+h;g.save();
 const rect=(xx,yy,ww,hh,c)=>{g.fillStyle=c;g.fillRect(xx,yy,ww,hh)},line=(ps,c,z=1)=>{g.strokeStyle=c;g.lineWidth=z;g.beginPath();ps.forEach(([xx,yy],i)=>i?g.lineTo(xx,yy):g.moveTo(xx,yy));g.stroke()},poly=(ps,c)=>{g.fillStyle=c;g.beginPath();ps.forEach(([xx,yy],i)=>i?g.lineTo(xx,yy):g.moveTo(xx,yy));g.closePath();g.fill()};
 poly([[x+8,y+12],[x+w+10,y+18],[x+w+12,bottom+18],[x+10,bottom+14]],'#573d2844');
 // Raised timber boardwalk and front steps clearly point toward the doorway.
 rect(x-7,bottom-3,w+14,20,'#795333');for(let i=0;i<4;i++){rect(x-7,bottom-3+i*5,w+14,4,i%2?'#ba915a':'#aa7e48');line([[x+3,bottom+i*5],[x+w-4,bottom+i*5]],'#d4b17b55');}rect(cx-27,bottom+17,54,6,'#7a5939');rect(cx-30,bottom+21,60,5,'#ad8855');
 rect(x,y+12,w,h-12,'#976b40');poly([[x+w-10,y+12],[x+w,y+17],[x+w,bottom],[x+w-10,bottom-4]],'#604329');
 for(let yy=y+20;yy<bottom;yy+=9){rect(x+2,yy,w-14,7,(yy-y)%18?'#a47c4c':'#926a3e');line([[x+6,yy+2],[x+w-17,yy+2]],'#d4ac7055');}
 // False front, projecting cornice and inset hand-painted sign.
 poly([[x-3,y+4],[x+w-6,y+4],[x+w+3,y+13],[x+5,y+13]],'#ccaa73');rect(x+5,y+13,w-2,6,'#4c3828');rect(x-3,y+4,w+6,5,'#9b7548');rect(x+8,y+20,w-26,23,'#463c2a');rect(x+11,y+23,w-32,17,'#4d5a49');g.textAlign='center';g.fillStyle='#f0dca4';g.font='bold 11px Georgia';g.fillText('HANDELSKONTOR',cx-4,y+35);
 // Recessed dark opening: entry line is on the boardwalk, not anywhere along the wall.
 rect(cx-22,bottom-35,44,36,'#4f3724');rect(cx-17,bottom-31,34,31,'#1e2420');rect(cx-15,bottom-29,29,25,'#38483a');rect(cx-13,bottom-27,24,22,'#222d26');rect(cx-23,bottom-38,46,5,'#dab679');rect(cx-23,bottom-34,5,34,'#c39a5e');rect(cx+17,bottom-34,5,34,'#8c653d');rect(cx-18,bottom-2,36,4,'#ead0a0');
 for(const xx of [x+12,x+w-43]){rect(xx-2,y+53,29,31,'#57402b');const glow=g.createLinearGradient(xx,y+54,xx,y+82);glow.addColorStop(0,occupied?'#e6cb86':'#c2c9a2');glow.addColorStop(1,'#8fa990');g.fillStyle=glow;g.fillRect(xx,y+55,24,24);rect(xx+10,y+55,3,24,'#6d5436');rect(xx,y+65,24,3,'#6d5436');rect(xx-3,y+80,30,4,'#d4ad70');}
 for(const xx of [x-2,x+w-4]){rect(xx,bottom-53,5,55,'#684a2d');rect(xx-2,bottom-55,9,4,'#d0ab70');}poly([[x-8,bottom-56],[x+w-4,bottom-56],[x+w+8,bottom-43],[x+4,bottom-43]],'#b78d53');line([[x+4,bottom-43],[x+w+8,bottom-43]],'#61482d',2);
 // The entrance stays open even while other players are inside.
 g.font='9px Georgia';g.fillStyle='#3d3224';g.fillText('EINGANG',cx,bottom+11);g.restore();}};
