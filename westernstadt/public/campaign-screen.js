/* Public chapter HUD. No private inventories or roles are sent here. */
const chapter=document.createElement('section');chapter.className='campaign-panel';chapter.hidden=true;document.querySelector('canvas').before(chapter);
let chapterKey='',hostNotice='',detailsOpen=false,lastChapterStage=null;
const chapterDock=document.createElement('nav');chapterDock.id='chapterDock';chapterDock.hidden=true;
chapterDock.innerHTML='<button id="chapterToggle" aria-expanded="false" aria-controls="chapterDetails">Kapitel 1 · Auftrag ▴</button><button id="townRally">Treck versammeln</button><button id="quickPause">Pause</button><button id="screenFullscreen">⛶ Vollbild</button>';
document.body.append(chapterDock);chapter.id='chapterDetails';
const chapterToggle=document.getElementById('chapterToggle'),quickPause=document.getElementById('quickPause');
function showChapter(open){detailsOpen=open;chapter.hidden=!open;chapterToggle.setAttribute('aria-expanded',String(open));}
chapterToggle.onclick=()=>showChapter(!detailsOpen);
quickPause.onclick=()=>s.emit('pause');
const rallyButton=document.getElementById('townRally');rallyButton.onclick=()=>s.emit(rallyButton.dataset.command||'depart');
const fullscreenButton=document.getElementById('screenFullscreen');
if(!document.documentElement.requestFullscreen)fullscreenButton.hidden=true;
fullscreenButton.onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{hostNotice='Vollbild ist in diesem Browser nicht verfügbar.';chapterKey='';showChapter(true)}};
document.addEventListener('fullscreenchange',()=>{fullscreenButton.textContent=document.fullscreenElement?'⛶ Verkleinern':'⛶ Vollbild'});
document.addEventListener('keydown',e=>{if(e.key==='Escape')showChapter(false)});
function chapterHUD(c){
 chapterDock.hidden=false;chapter.hidden=!detailsOpen;const names={food:'Proviant',ammo:'✦ Munition',med:'✚ Medizin',planks:'▤ Bretter'};
 const titles={arrival:'Willkommen am Fort Hoffnung',rally:'Die Stadt bricht gemeinsam auf',prepare:'Der erste Versorgungstreck',vote:'Welchen Weg nehmen wir?',escort:'Gemeinsam nach Hause',won:'Eine neue Heimat',lost:'Noch ist die Stadt nicht verloren'};
 const text={arrival:'Der Wagen fährt ins Fort ein. Die Auswertung folgt gleich am Handy.',rally:'Alle schauen auf den großen Bildschirm: Lauft mit eurem Handy-Joystick zum Wagenkreis vor der Kirche und bestätigt dort Bereit. Sobald alle verbundenen Spieler bereit sind, beginnt die Routenwahl.',prepare:'Stellt Vorräte her und lagert sie an der Kirche ein. Mindestens 1 Proviant und 1 Brett sind nötig; mehr Vorräte helfen unterwegs.',vote:'Stimmt auf euren Handys ab. Mehrheit entscheidet; bei Gleichstand gilt der sicherere Höhenweg.',escort:'Bleibt im hellen Schutzkreis, damit der Wagen vorankommt. Banditen anvisieren: in ihre Nähe laufen und schießen.',won:c.result,lost:c.result};
 if(c.stage!==lastChapterStage){lastChapterStage=c.stage;showChapter(['won','lost'].includes(c.stage));}
 chapterToggle.textContent=c.stage==='escort'?`Treck · ${Math.round(c.progress*100)}% · Auftrag ▴`:c.completed?'Treck geschafft · Freies Stadtleben ▴':'Kapitel 1 · Auftrag ▴';
 rallyButton.hidden=!['prepare','rally'].includes(c.stage);rallyButton.dataset.command=c.stage==='rally'?'rallyCancel':'depart';rallyButton.textContent=c.stage==='rally'?'Aufbruch abbrechen':'Treck versammeln';rallyButton.disabled=c.paused||(c.stage==='prepare'&&(c.supplies.food<1||c.supplies.planks<1));rallyButton.title='Benötigt 1 Proviant und 1 Brett an der Kirche';
 quickPause.textContent=c.paused?'Weiter spielen':'Pause';quickPause.classList.toggle('is-paused',c.paused);quickPause.hidden=['won','lost'].includes(c.stage);
 const key=JSON.stringify([c.stage,c.paused,c.attempt,c.supplies,c.target,c.remaining,c.votes,c.voters,c.ready,c.hp,Math.round(c.progress*100),c.escorted,c.result,c.contributions,hostNotice]);if(key===chapterKey)return;chapterKey=key;
 chapter.innerHTML=`<div class="drawer-heading"><span class="eyebrow">Auftrag & Vorbereitung</span><button data-close aria-label="Auftrag schließen">Schließen ✕</button></div><div class="row"><div class="grow"><div class="eyebrow">Kapitel 01 · Eine neue Heimat · Versuch ${c.attempt}</div><h2>${titles[c.stage]}${c.paused?' · PAUSE':''}</h2><p>${text[c.stage]}</p></div><div class="row">${c.stage==='prepare'?`<button data-command="depart" ${c.paused||c.supplies.food<1||c.supplies.planks<1?'disabled':''}>Gemeinsam am Wagen sammeln →</button>`:''}${['prepare','rally','vote','escort'].includes(c.stage)?`<button class="secondary" data-command="pause">${c.paused?'Weiter spielen':'Pause'}</button>`:''}${['won','lost'].includes(c.stage)?`<button data-command="retry">${c.stage==='won'?'Kapitel erneut spielen':'Neuen Versuch vorbereiten'}</button><button data-command="missionReturn">Zur Stadt zurück</button>`:''}</div></div>
 <div class="goods">${Object.entries(names).map(([k,n])=>`<span class="good ${c.supplies[k]>=c.target?'ready':''}">${n} <b>${c.supplies[k]}</b>${c.stage==='prepare'?' / '+c.target:''}</span>`).join('')}${c.stage==='escort'?`<span class="good">Wagen ${c.hp}%</span><span class="good">Strecke ${Math.round(c.progress*100)}%</span><span class="good">${c.escorted?'Begleitung in Reichweite':'Wartet auf Begleitung'}</span>`:''}${c.stage==='vote'?`<span class="good">${c.votes}/${c.voters} Stimmen · ${c.remaining}s</span>`:''}</div>
 ${c.stage==='prepare'?'<p><small>Unbesetzte Werkstätten: selbst mit Aushilfe arbeiten, doppelte Herstellungszeit. Munition verstärkt Schüsse, Medizin heilt den Wagen automatisch, Bretter dienen zur Reparatur.</small></p>':''}
 ${c.stage==='vote'?`<div class="route-cards">${Object.values(c.routes).map(r=>`<div class="route-card"><b>${r.name}</b><p>${r.description}</p><small>Etwa ${r.seconds} Sekunden bei Begleitung</small></div>`).join('')}</div>`:''}
 ${['won','lost'].includes(c.stage)?`<p class="result">${c.stage==='won'?'✓ Kapitel 1 abgeschlossen. Weitere Kapitel folgen.':'Ein neuer Anlauf behält eure übrigen Vorräte und Gegenstände.'}</p><p>${c.contributions.map(r=>`Spieler ${r.i+1}: ${r.supplies} Vorräte · ${r.shots} Schüsse · ${r.repairs} Reparaturen`).join(' &nbsp; | &nbsp; ')}</p>`:''}<p id="hostMessage">${hostNotice}</p>`;
}
chapter.onclick=e=>{if(e.target.closest('[data-close]'))return showChapter(false);const b=e.target.closest('[data-command]');if(b&&!b.disabled)s.emit(b.dataset.command)};
s.on('hostToken',token=>localStorage.setItem('western-host-token',token));
s.on('connect',()=>{const token=localStorage.getItem('western-host-token');if(token)s.emit('screen',token)});
s.on('err',message=>{showChapter(true);hostNotice=message;setTimeout(()=>{hostNotice='';chapterKey=''},6000);const e=document.getElementById('hostMessage');if(e)e.textContent=message;else alert(message)});
s.on('state',d=>{document.body.classList.add('game-active');chapterHUD(d.campaign);document.getElementById('lobby').hidden=true;cv.hidden=false});
function renderConvoy(g,d,t){ConvoyArt.draw(g,d,t)}

// The gathering is played on the city screen, never on a second phone map.
function renderTownEvent(g,d,t){
 const c=d.campaign;if(!['prepare','rally','vote'].includes(c.stage))return;g.save();
 const active=c.stage==='rally',x=c.rally.x,y=c.rally.y;
 if(active){g.fillStyle='#ead59b22';g.strokeStyle='#f3d798';g.lineWidth=2;g.setLineDash([9,7]);g.beginPath();g.ellipse(x,y,c.rally.radius,c.rally.radius*.48,0,0,7);g.fill();g.stroke();g.setLineDash([]);}
 // Small supply wagon parked beside the church, with original canvas detail.
 const wx=620,wy=300;g.fillStyle='#523d2840';g.beginPath();g.ellipse(wx+27,wy+30,58,11,0,0,7);g.fill();g.fillStyle='#775435';g.fillRect(wx-19,wy-1,91,28);g.fillStyle='#d9c396';g.beginPath();g.roundRect(wx-23,wy-33,95,47,[22,22,3,3]);g.fill();g.strokeStyle='#967d54';g.lineWidth=2;for(let a=wx-13;a<wx+70;a+=19){g.beginPath();g.moveTo(a,wy-29);g.lineTo(a,wy+11);g.stroke();}for(const a of [wx-4,wx+56]){g.fillStyle='#423b2a';g.beginPath();g.arc(a,wy+26,12,0,7);g.fill();g.strokeStyle='#b5a077';g.beginPath();g.arc(a,wy+26,8,0,7);g.moveTo(a-8,wy+26);g.lineTo(a+8,wy+26);g.moveTo(a,wy+18);g.lineTo(a,wy+34);g.stroke();}
 g.fillStyle='#263b2eef';g.beginPath();g.roundRect(20,257,350,active?78:65,7);g.fill();g.textAlign='left';g.fillStyle='#eed5a0';g.font='bold 14px Georgia';g.fillText(active?'ALLE ZUM WAGEN':c.stage==='vote'?'ROUTENWAHL':(c.completed?'TRECK GESCHAFFT · STADTLEBEN':'VERSORGUNGSTRECK'),34,279);g.font='11px system-ui';g.fillStyle='#d1ceb0';g.fillText(active?'Am Kreis vor der Kirche am Handy „Bereit“ drücken.':c.stage==='vote'?`${c.votes}/${c.voters} Stimmen · ${c.remaining} Sekunden`:`Vorräte: ${c.supplies.food} Proviant · ${c.supplies.planks} Bretter`,34,298,322);if(!active){g.fillText(c.stage==='vote'?'Schaut zusammen auf die Stadt und stimmt am Handy ab.':c.completed?'Ein weiterer Treck ist optional. Steuert alles am Handy.':'Zum Aufbruch am Handy Spiel → Alle zum Treck rufen.',34,313,322)};
 if(active){g.font='bold 11px system-ui';g.fillText(c.ready.map(p=>`${p.i+1}: ${p.ready?'BEREIT':p.near?'BESTÄTIGEN':'UNTERWEGS'}`).join('   ·   '),34,318,322);g.textAlign='center';g.fillStyle='#f8e4ad';g.font='bold 10px Georgia';g.fillText('SAMMELPUNKT',x,y+4);}
 g.restore();
}
