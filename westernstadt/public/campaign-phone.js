const supplyNames={food:'Proviant',ammo:'✦ Munition',med:'✚ Medizin',planks:'▤ Bretter'};
const badge=document.createElement('button');badge.id='chapterBadge';badge.textContent='Kapitel 1 · Versorgungstreck ›';document.querySelector('header').append(badge);
const sheet=document.createElement('section');sheet.id='chapterSheet';sheet.hidden=true;document.body.append(sheet);
const mission=document.createElement('section');mission.id='missionPhone';mission.hidden=true;document.body.append(mission);
let chapterMe=null,lastStage=null,missionKey='',sheetKey='',shotHeld=false,shotTimer=null;
const joystickHome=document.createComment('Joystick home');j.before(joystickHome);
function stopMove(){on=false;k.style.transform='';s.emit('input',{dx:0,dy:0});shotHeld=false;clearInterval(shotTimer);}
function drawSheet(){if(!chapterMe)return;const m=chapterMe,c=m.campaign,atChurch=!m.inside&&m.near==='Kirche',key=JSON.stringify([c.supplies,c.paused,m.inv,atChurch]);if(key===sheetKey)return;sheetKey=key;
 sheet.innerHTML=`<button class="close" data-close>✕</button><p>AUFTRAG DER STADT · KAPITEL 1</p><h2>Der erste Versorgungstreck</h2><p>Ein Wagen wartet außerhalb der Stadt. Bereitet die Reise vor und bringt ihn gemeinsam nach Hause.</p><h3>Vorräte an der Kirche einlagern</h3>${Object.entries(supplyNames).map(([key,n])=>{const owned=m.inv.find(i=>i.k===key)?.n||0;return `<div class="supply-row"><span>${n}<br><small>${c.supplies[key]} / ${c.target} empfohlen · Rucksack: ${owned}</small></span><button data-supply="${key}" ${!atChurch||!owned||c.paused||c.supplies[key]>=c.target?'disabled':''}>Einlagern</button></div>`}).join('')}<p class="help">${atChurch?'Ihr seid an der Kirche. Einlagern verbraucht den Gegenstand aus deinem Rucksack.':'Lauf zur Kirche, um Vorräte einzulagern.'}</p><p class="help">Minimum zum Aufbruch: 1 Proviant und 1 Brett. Am Hauptbildschirm startet ihr danach die Routenwahl.</p><p class="help">Proviant beschleunigt die Reise. Munition verstärkt Schüsse. Medizin heilt automatisch bei kritischem Wagenschaden. Jedes Brett repariert 22 Wagenpunkte.</p><h3>So helft ihr mit</h3><p class="help">Proviant: Saloon · Munition: Schmiede · Medizin: Arztpraxis · Bretter: Zimmerei. In unbesetzten Werkstätten hilft ein Bewohner – die Arbeit dauert doppelt so lange. Rohstoffe gibt es auch in Laden, Mine und Jagdhütte.</p>`;
}
badge.onclick=()=>{stopMove();sheet.hidden=false;drawSheet()};sheet.onclick=e=>{if(e.target.closest('[data-close]'))sheet.hidden=true;const b=e.target.closest('[data-supply]');if(b&&!b.disabled)s.emit('donate',b.dataset.supply)};
s.on('me',m=>{
 chapterMe=m;const c=m.campaign;badge.textContent=`Kapitel 1 · ${c.paused?'Pause':c.stage==='prepare'?'Versorgungstreck vorbereiten':'Gemeinschaftsmission'} ›`;
 if(!sheet.hidden)drawSheet();
 if(m.apprentice&&m.inside)$('bn').textContent=m.inside+' · Aushilfe';
 const displayPhase=c.paused?'paused':c.stage;
 if(displayPhase!==lastStage){stopMove();missionKey='';lastStage=displayPhase;sheet.hidden=true;}
 const inMission=c.stage!=='prepare'||c.paused;mission.hidden=!inMission;
 if(!inMission){if(j.previousSibling!==joystickHome)joystickHome.after(j);$('app').hidden=false;return;}
 $('app').hidden=true;
 const stage=c.paused?'paused':c.stage,nearWagon=Math.hypot(m.position.x-500,m.position.y-310)<=110;
 const key=JSON.stringify([stage,c.remaining,c.votes,c.voters,m.myVote,c.hp,Math.round(c.progress*100),c.supplies,nearWagon,c.result,c.contributions]);
 if(key===missionKey)return;missionKey=key;
 if(stage==='escort'&&mission.querySelector('.controls')){
  mission.querySelector('.mission-top p').textContent=`Wagen ${c.hp}% · Ankunft ${Math.round(c.progress*100)}%`;
  mission.querySelector('.meter i').style.width=c.progress*100+'%';
  mission.querySelector('#repair').disabled=!nearWagon||c.hp>=100||!c.supplies.planks;
  mission.querySelector('#repair small').textContent=c.supplies.planks+' Bretter';
  mission.querySelectorAll('.brief')[1].textContent=nearWagon?'Du bist beim Wagen. Reparatur möglich, wenn er beschädigt ist.':'Bleibt im hellen Kreis. Zum Reparieren näher an den Wagen gehen.';return;
 }
 // Keep the captured joystick mounted between snapshots so touch gestures survive.
 const existingJoy=mission.querySelector('#joy');if(existingJoy)joystickHome.after(j);
 if(stage==='paused')mission.innerHTML='<div class="mission-top"><div class="mission-kicker">GEMEINSAME PAUSE</div><h2>Die Stadt wartet auf euch.</h2><p class="brief">Am Hauptbildschirm könnt ihr weiterspielen. Vorräte, Arbeit und Reisezeit bleiben stehen.</p></div>';
 else if(stage==='vote')mission.innerHTML=`<div class="mission-top"><div class="mission-kicker">ENTSCHEIDET ZUSAMMEN</div><h2>Welchen Weg nehmen wir?</h2><p class="brief">${c.votes}/${c.voters} Stimmen · noch ${c.remaining} Sekunden.<br>Bei Gleichstand: Höhenweg. Deine Wahl bleibt privat.</p></div>${Object.entries(c.routes).map(([key,r])=>`<button class="route-pick ${m.myVote===key?'selected':''}" data-route="${key}">${m.myVote===key?'✓ ':''}${r.name}<small>${r.description}</small><small>Etwa ${r.seconds} Sekunden bei Begleitung</small></button>`).join('')}<p class="brief">Du kannst deine Stimme ändern, bis alle verbundenen Spieler gewählt haben oder die Zeit abläuft.</p>`;
 else if(stage==='escort'){
  mission.innerHTML=`<div class="mission-top"><div class="mission-kicker">SPIELER ${m.slot+1} · ${m.role}</div><h2>Schützt den Treck</h2><p>Wagen ${c.hp}% · Ankunft ${Math.round(c.progress*100)}%</p><div class="meter"><i style="width:${c.progress*100}%"></i></div></div><p class="brief">Schau auf den Hauptbildschirm. Schießen trifft den nächsten Banditen in Reichweite. Halten für weitere Schüsse.</p><p class="brief">${nearWagon?'Du bist beim Wagen. Reparatur möglich, wenn er beschädigt ist.':'Bleibt im hellen Kreis. Zum Reparieren näher an den Wagen gehen.'}</p><div class="controls"><div id="missionJoy"></div><div class="actions"><button id="shoot">✦ Schießen</button><button class="repair" id="repair" ${!nearWagon||c.hp>=100||!c.supplies.planks?'disabled':''}>▤ Reparieren<br><small>${c.supplies.planks} Bretter</small></button></div></div>`;
  $('missionJoy').append(j);const shoot=$('shoot');
  shoot.onpointerdown=e=>{e.preventDefault();stopShots();shoot.setPointerCapture(e.pointerId);shotHeld=true;s.emit('missionAction','shoot');shotTimer=setInterval(()=>{if(shotHeld)s.emit('missionAction','shoot')},180)};
  shoot.onpointerup=shoot.onpointercancel=stopShots;$('repair').onclick=()=>s.emit('missionAction','repair');
 }else{
  mission.innerHTML=`<div class="mission-top"><div class="mission-kicker">KAPITEL 1 · AUSWERTUNG</div><h2>${stage==='won'?'Eine neue Heimat':'Ein neuer Anlauf'}</h2><p>${c.result}</p></div><div class="board">${c.contributions.map(r=>`<p>Spieler ${r.i+1}: ${r.supplies} Vorräte · ${r.shots} Schüsse · ${r.repairs} Reparaturen</p>`).join('')}</div><p class="brief">${stage==='won'?'Ihr habt das erste Kapitel geschafft. Weitere Kapitel folgen. Ihr könnt es am Hauptbildschirm erneut spielen.':'Am Hauptbildschirm könnt ihr einen neuen Versuch vorbereiten. Eure übrigen Gegenstände bleiben erhalten.'}</p>`;
 }
});
function stopShots(){shotHeld=false;clearInterval(shotTimer);}
mission.onclick=e=>{const b=e.target.closest('[data-route]');if(b)s.emit('routeVote',b.dataset.route)};
s.on('disconnect',()=>{stopMove();note('Verbindung unterbrochen. Wiederverbinden läuft …',true)});
window.addEventListener('blur',stopMove);document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMove()});
