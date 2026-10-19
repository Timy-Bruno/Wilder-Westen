/* Public chapter HUD. No private inventories or roles are sent here. */
const chapter=document.createElement('section');chapter.className='campaign-panel';chapter.hidden=true;document.querySelector('canvas').before(chapter);
let chapterKey='',hostNotice='';
function chapterHUD(c){
 chapter.hidden=false;const names={food:'Proviant',ammo:'✦ Munition',med:'✚ Medizin',planks:'▤ Bretter'};
 const titles={prepare:'Der erste Versorgungstreck',vote:'Welchen Weg nehmen wir?',escort:'Gemeinsam nach Hause',won:'Eine neue Heimat',lost:'Noch ist die Stadt nicht verloren'};
 const text={prepare:'Stellt Vorräte her und lagert sie an der Kirche ein. Mindestens 1 Proviant und 1 Brett sind nötig; mehr Vorräte helfen unterwegs.',vote:'Stimmt auf euren Handys ab. Mehrheit entscheidet; bei Gleichstand gilt der sicherere Höhenweg.',escort:'Bleibt im hellen Schutzkreis, damit der Wagen vorankommt. Banditen anvisieren: in ihre Nähe laufen und schießen.',won:c.result,lost:c.result};
 const key=JSON.stringify([c.stage,c.paused,c.attempt,c.supplies,c.target,c.remaining,c.votes,c.voters,c.hp,Math.round(c.progress*100),c.escorted,c.result,c.contributions,hostNotice]);if(key===chapterKey)return;chapterKey=key;
 chapter.innerHTML=`<div class="row"><div class="grow"><div class="eyebrow">Kapitel 01 · Eine neue Heimat · Versuch ${c.attempt}</div><h2>${titles[c.stage]}${c.paused?' · PAUSE':''}</h2><p>${text[c.stage]}</p></div><div class="row">${c.stage==='prepare'?`<button data-command="depart" ${c.paused||c.supplies.food<1||c.supplies.planks<1?'disabled':''}>Route wählen & aufbrechen →</button>`:''}${['prepare','vote','escort'].includes(c.stage)?`<button class="secondary" data-command="pause">${c.paused?'Weiter spielen':'Pause'}</button>`:''}${['won','lost'].includes(c.stage)?`<button data-command="retry">${c.stage==='won'?'Kapitel erneut spielen':'Neuen Versuch vorbereiten'}</button>`:''}</div></div>
 <div class="goods">${Object.entries(names).map(([k,n])=>`<span class="good ${c.supplies[k]>=c.target?'ready':''}">${n} <b>${c.supplies[k]}</b>${c.stage==='prepare'?' / '+c.target:''}</span>`).join('')}${c.stage==='escort'?`<span class="good">Wagen ${c.hp}%</span><span class="good">Strecke ${Math.round(c.progress*100)}%</span><span class="good">${c.escorted?'Begleitung in Reichweite':'Wartet auf Begleitung'}</span>`:''}${c.stage==='vote'?`<span class="good">${c.votes}/${c.voters} Stimmen · ${c.remaining}s</span>`:''}</div>
 ${c.stage==='prepare'?'<p><small>Unbesetzte Werkstätten: selbst mit Aushilfe arbeiten, doppelte Herstellungszeit. Munition verstärkt Schüsse, Medizin heilt den Wagen automatisch, Bretter dienen zur Reparatur.</small></p>':''}
 ${c.stage==='vote'?`<div class="route-cards">${Object.values(c.routes).map(r=>`<div class="route-card"><b>${r.name}</b><p>${r.description}</p><small>Etwa ${r.seconds} Sekunden bei Begleitung</small></div>`).join('')}</div>`:''}
 ${['won','lost'].includes(c.stage)?`<p class="result">${c.stage==='won'?'✓ Kapitel 1 abgeschlossen. Weitere Kapitel folgen.':'Ein neuer Anlauf behält eure übrigen Vorräte und Gegenstände.'}</p><p>${c.contributions.map(r=>`Spieler ${r.i+1}: ${r.supplies} Vorräte · ${r.shots} Schüsse · ${r.repairs} Reparaturen`).join(' &nbsp; | &nbsp; ')}</p>`:''}<p id="hostMessage">${hostNotice}</p>`;
}
chapter.onclick=e=>{const b=e.target.closest('[data-command]');if(b&&!b.disabled)s.emit(b.dataset.command)};
s.on('hostToken',token=>localStorage.setItem('western-host-token',token));
s.on('connect',()=>{const token=localStorage.getItem('western-host-token');if(token)s.emit('screen',token)});
s.on('err',message=>{hostNotice=message;setTimeout(()=>{hostNotice='';chapterKey=''},6000);const e=document.getElementById('hostMessage');if(e)e.textContent=message;else alert(message)});
s.on('state',d=>{document.body.classList.add('game-active');chapterHUD(d.campaign);document.getElementById('lobby').hidden=true;cv.hidden=false});
function renderConvoy(g,d,t){
 const c=d.campaign,scroll=c.progress*2300;
 const sky=g.createLinearGradient(0,0,0,600);sky.addColorStop(0,'#cbaa7a');sky.addColorStop(.55,'#e0bc7e');sky.addColorStop(1,'#a96e3f');g.fillStyle=sky;g.fillRect(0,0,1000,600);
 g.fillStyle='#b17b50';g.beginPath();g.moveTo(0,150);for(let x=0;x<=1000;x+=30)g.lineTo(x,105+Math.sin((x+scroll*.1)/100)*30+Math.sin(x/45)*15);g.lineTo(1000,250);g.lineTo(0,250);g.fill();
 g.fillStyle='#9c633d';g.beginPath();g.moveTo(0,170);for(let x=0;x<=1000;x+=40)g.lineTo(x,155+Math.cos((x+scroll*.2)/140)*30);g.lineTo(1000,280);g.lineTo(0,280);g.fill();
 g.fillStyle='#c9995f';g.fillRect(0,225,1000,220);g.strokeStyle='#b18350';g.lineWidth=3;for(const y of [270,350]){g.beginPath();g.moveTo(0,y);g.lineTo(1000,y);g.stroke();}
 for(let i=0;i<24;i++){const x=((i*157-scroll*.8)%1100+1100)%1100-50,y=i%2?480+(i%4)*22:185+(i%3)*12;g.fillStyle=i%3?'#756e3c':'#855c3c';g.beginPath();g.ellipse(x,y,12+i%7,5,0,0,7);g.fill();if(i%3===0){g.strokeStyle='#586343';g.lineWidth=7;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-38);g.moveTo(x,y-17);g.lineTo(x-12,y-17);g.lineTo(x-12,y-29);g.stroke();}}
 // Escort ring is an explicit gameplay boundary, kept visible beneath entities.
 g.fillStyle='#fff0bc14';g.strokeStyle='#ffe4a75c';g.lineWidth=2;g.beginPath();g.ellipse(500,310,190,190,0,0,7);g.fill();g.stroke();
 g.fillStyle='#41291b55';g.beginPath();g.ellipse(500,330,75,22,0,0,7);g.fill();
 g.fillStyle='#583a24';g.fillRect(444,288,115,48);g.fillStyle='#d5b584';g.beginPath();g.roundRect(440,257,116,64,[30,30,4,4]);g.fill();g.strokeStyle='#a08054';g.lineWidth=3;for(let x=453;x<550;x+=22){g.beginPath();g.moveTo(x,263);g.lineTo(x,315);g.stroke();}
 for(const x of [459,542]){g.fillStyle='#36291d';g.beginPath();g.arc(x,336,16,0,7);g.fill();g.strokeStyle='#b68c50';g.lineWidth=3;g.beginPath();g.arc(x,336,11,0,7);g.stroke();g.beginPath();g.moveTo(x-10,336);g.lineTo(x+10,336);g.moveTo(x,326);g.lineTo(x,346);g.stroke();}
 g.fillStyle='#67472e';g.fillRect(560,293,43,18);g.beginPath();g.ellipse(602,295,24,12,0,0,7);g.fill();g.fillRect(615,277,12,22);g.fillStyle='#412c20';g.fillRect(585,306,6,20);g.fillRect(608,306,6,20);
 const colors=['#dc7759','#72a8c4','#8aaa63','#e0bb5c','#bc8abb','#d99a66','#68b2a4','#ddd1bc'];
 function person(x,y,color,label,enemy){g.fillStyle='#0003';g.beginPath();g.ellipse(x,y+14,13,5,0,0,7);g.fill();g.fillStyle=color;g.beginPath();g.roundRect(x-10,y-8,20,24,6);g.fill();g.fillStyle='#d3aa78';g.beginPath();g.arc(x,y-13,8,0,7);g.fill();g.fillStyle=enemy?'#3d2d29':'#725033';g.fillRect(x-15,y-20,30,5);g.fillRect(x-9,y-27,18,10);g.fillStyle='#2e241b';g.fillRect(x-8,y+12,6,10);g.fillRect(x+3,y+12,6,10);g.fillStyle='#fff2d7';g.textAlign='center';g.font='bold 12px system-ui';g.fillText(label,x,y-34);}
 for(const q of d.slots)person(q.x,q.y,colors[q.i],String(q.i+1),false);
 for(const e of c.enemies)person(e.x,e.y,'#633a32','BANDIT',true);
 g.strokeStyle='#ffeba8';g.lineWidth=3;for(const shot of c.shots){g.beginPath();g.moveTo(shot.x,shot.y);g.lineTo(shot.tx,shot.ty);g.stroke();}
 g.fillStyle='#21180fe8';g.fillRect(0,0,1000,66);g.textAlign='left';g.fillStyle='#edcc8f';g.font='bold 19px Georgia';g.fillText(c.routes[c.route].name.toUpperCase()+' · VERSORGUNGSTRECK',24,29);g.font='13px system-ui';g.fillStyle='#d2b995';g.fillText(c.escorted?'Wagen unterwegs · Zusammenbleiben schützt eure Zukunft':'Wagen wartet · Mindestens ein Spieler muss in den Schutzkreis',24,50);
 g.fillStyle='#594534';g.fillRect(640,24,330,12);g.fillStyle='#d5b36d';g.fillRect(640,24,330*c.progress,12);g.fillStyle='#e4d1af';g.font='12px system-ui';g.fillText('ANKUNFT '+Math.round(c.progress*100)+'% · WAGEN '+c.hp+'%',640,53);
 if(c.paused){g.fillStyle='#15100bc9';g.fillRect(0,66,1000,534);g.textAlign='center';g.font='bold 42px Georgia';g.fillStyle='#f3d39c';g.fillText('PAUSE',500,310);}
}
