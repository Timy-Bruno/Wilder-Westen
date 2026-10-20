(()=>{
 const style=document.createElement('style');style.textContent=`
 #tradingPost{padding:12px;background:#3d291b;border:1px solid #bd9559;border-radius:8px;margin:8px 0}
 #catalog{--ink:#372817;--rule:#af996b;position:fixed;inset:0;z-index:160;background:#302017;display:none;padding:max(12px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left));color:var(--ink);font-family:Georgia,serif}
 #catalog.open{display:flex}#catalog .paper{background:#eee0ba;background-image:linear-gradient(95deg,#cbb98855,transparent 8%,transparent 96%,#8e6c4444);box-shadow:0 3px 22px #0008;border:double 5px #79613c;min-height:0;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:auto auto minmax(0,1fr) auto auto;padding:16px;max-width:1000px;width:100%;height:100%;margin:0 auto;box-sizing:border-box}
 #catalog header{background:transparent;grid-area:auto;color:var(--ink);text-align:center;border-bottom:double 4px #715936;padding:6px 0 12px}
 #catalog h1{font-size:clamp(17px,5.6vw,26px);letter-spacing:1px;margin:5px 0}#catalog small{letter-spacing:2px}
 #catalog .ledger{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:10px 0}
 #catalog button{min-width:0;flex-shrink:0;box-shadow:none;background:#483220;color:#fff0cd;border:1px solid #806342;border-radius:3px;padding:10px 14px;font:inherit;min-height:44px;touch-action:manipulation}
 #catalog button:disabled{opacity:.4}#catalog button:focus-visible{outline:2px solid #372817;outline-offset:3px}
 #catalog .pages{width:100%;overflow:auto;touch-action:pan-y;min-height:0;overscroll-behavior:contain}
 #catalog .catalogIntro,#catalog .catalogOffers{min-width:0}#catalog article>div{min-width:0}
 #catalog article{border-top:1px solid var(--rule);padding:12px 0;display:flex;align-items:center;gap:12px;justify-content:space-between}
 #catalog .rifleOffer article{display:block}#catalog .rifleOffer article button{display:block;margin:12px 0 0 auto}
 #catalog h2{font-size:24px;margin:12px 0}#catalog h3{color:var(--ink);letter-spacing:0;text-transform:none;width:auto;font-size:18px;margin:0 0 5px}#catalog p{font-size:14px;line-height:1.4;margin:4px 0}
 #catalog nav{background:transparent;grid-area:auto;flex-direction:row;border-left:0;display:flex;justify-content:space-between;align-items:center;border-top:double 4px #715936;padding:10px 0 0;gap:8px}
 #catalog nav button{flex:1}#catalogReceipt{min-height:36px;font-size:14px;padding:8px 0}
 #catalog .engraving{font-size:44px;text-align:center;filter:sepia(1);margin:6px}
 #catalog .riflePrint{margin:12px 0 8px;padding:10px 0 6px;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
 #catalog .riflePrint svg{width:100%;height:auto;max-height:160px;display:block;color:#433b2c}#catalog .riflePrint figcaption{font-size:9px;letter-spacing:.15em;text-align:center;margin-top:4px}
 #purse{padding:10px;color:#efd38a}
 @media(orientation:landscape) and (max-height:600px){
 #catalog{padding:max(8px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(8px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left))}
 #catalog .paper{padding:10px 16px;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:44px minmax(0,1fr) 24px 48px;column-gap:16px}
 #catalog header{grid-column:1;grid-row:1;text-align:left;padding:0;display:flex;align-items:center;border-bottom:1px solid var(--rule)}#catalog header small{display:none}#catalog h1{font-size:18px;margin:0}
 #catalog .ledger{grid-column:2;grid-row:1;margin:0;border-bottom:1px solid var(--rule);gap:14px}#catalog .ledger button{font-size:12px;padding:7px 10px;min-height:36px}
 #catalog .pages{grid-column:1/-1;grid-row:2;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px;overflow:hidden;padding-top:10px}
 #catalog .catalogIntro,#catalog .catalogOffers{overflow-y:auto;touch-action:pan-y;min-height:0;overscroll-behavior:contain;padding-bottom:8px}
 #catalog .catalogOffers{border-left:1px solid var(--rule);padding-left:20px}#catalog .catalogOffers article:first-child{border-top:0;padding-top:0}
 #catalog h2{font-size:22px;margin:0 0 6px}#catalog p{font-size:13px}#catalog h3{font-size:17px}
 #catalog .engraving{font-size:27px;margin:0 0 4px}#catalog .riflePrint{margin:8px 0;padding:4px 0}#catalog .riflePrint svg{max-height:95px}#catalog .riflePrint figcaption{font-size:8px}
 #catalogReceipt{grid-column:1/-1;grid-row:3;min-height:0;padding:3px 0;font-size:12px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
 #catalog nav{grid-column:1/-1;grid-row:4;padding-top:5px;gap:12px}#catalog nav button{flex:0 1 150px;padding:7px 14px;min-height:38px;font-size:14px}#catalogNumber{font-size:13px}
 }
 `;
 document.head.append(style);
 const card=document.createElement('div');card.id='tradingPost';card.hidden=true;card.innerHTML='<b>Handelskontor</b><p>Jagdvorräte, Rohstoffe und Ankauf deiner Beute.</p><button id="openCatalog">Katalog durchblättern</button>';document.getElementById('rec').before(card);
 const purse=document.createElement('div');purse.id='purse';document.getElementById('pack').before(purse);
 const overlay=document.createElement('section');overlay.id='catalog';overlay.setAttribute('aria-label','Ladenkatalog');overlay.innerHTML='<div class="paper"><header><small>WAREN FÜR STADT & WILDNIS</small><h1>HANDELSKONTOR</h1><small>DER WESTERN-KATALOG</small></header><div class="ledger"><b id="catalogGold"></b><button id="closeCatalog">Schließen ×</button></div><div class="pages" id="catalogPage"></div><div id="catalogReceipt" role="status">Wähle deine Ausrüstung mit Bedacht.</div><nav><button id="catalogPrev">← Zurück</button><span id="catalogNumber"></span><button id="catalogNext">Weiter →</button></nav></div>';document.body.append(overlay);
 const riflePrint=`<figure class="riflePrint"><svg viewBox="0 0 640 190" role="img" aria-label="Gravur eines Western-Jagdgewehrs"><defs><pattern id="rifleHatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(25)"><path d="M0 0V5" stroke="currentColor" stroke-width=".8"/></pattern></defs><g transform="translate(16 10) rotate(-8 300 85)" stroke="currentColor" stroke-linejoin="round"><path d="M20 65H377L401 72L387 84H34Z" fill="url(#rifleHatch)" stroke-width="2"/><path d="M20 62H390V68H20Z" fill="#eee0ba" stroke-width="2"/><path d="M34 70H360M40 76H355" fill="none" stroke-width="1"/><path d="M42 63V56H49V63M323 63V54H331V63" fill="currentColor"/><path d="M195 80L330 80L362 91L340 103L219 97Z" fill="url(#rifleHatch)" stroke-width="2"/><path d="M221 85L328 86M226 90L333 93" fill="none"/><path d="M351 68L403 69L424 88L407 107L363 96L345 85Z" fill="#eee0ba" stroke-width="2.5"/><path d="M359 72L392 74L405 86L393 95L364 90Z" fill="url(#rifleHatch)"/><path d="M403 86L430 91L466 109L574 133L564 173L490 147L418 110L393 100Z" fill="url(#rifleHatch)" stroke-width="3"/><path d="M438 107Q476 129 554 146M449 119Q482 139 549 155M480 126L529 139M493 139L534 152" fill="none" stroke-width="1.2"/><path d="M574 131L581 133L571 177L563 174Z" fill="currentColor"/><path d="M363 97Q347 118 377 127Q403 136 420 110M368 99Q358 115 380 120Q395 124 405 109" fill="none" stroke-width="3"/><path d="M385 98Q376 108 385 114" fill="none" stroke-width="3"/><path d="M394 69L399 52L407 48L412 54L405 59L404 73" fill="url(#rifleHatch)" stroke-width="2"/><circle cx="374" cy="82" r="3" fill="currentColor"/><path d="M350 102L340 111M210 99L201 108" stroke-width="2"/></g></svg><figcaption>JAGDGEWEHR · FEDER & STAHL</figcaption></figure>`;
 let state=null,page=0,paused=false,stamp='';const names=['Jagdvorräte','Dein Gewehr','Rohstoffe','Beute verkaufen'],icons=['🌲','⚒','📦','🦌'];
 function render(){if(!state)return;document.getElementById('catalogGold').textContent=state.gold+' Gold';purse.textContent='🪙 '+state.gold+' Gold · Jagdvorrat: '+state.ammo+' Patronen, '+state.bait+' Köder';
 const key=JSON.stringify([state,page,paused]);if(key===stamp)return;stamp=key;
 document.getElementById('catalogNumber').textContent=(page+1)+' / 4';document.getElementById('catalogPrev').disabled=page===0;document.getElementById('catalogNext').disabled=page===3;
 const area=document.getElementById('catalogPage');area.innerHTML='<div class="catalogIntro"><h2>'+names[page]+'</h2>'+ (page===1?riflePrint:'<div class="engraving">'+icons[page]+'</div>')+(page===0?'<p>Dein Vorrat: '+state.ammo+' Patronen · '+state.bait+' Köder. Bleibt bei der Rückkehr aus dem Wald erhalten.</p>':page===1?'<p>Gewehrstufe '+state.rifleLevel+' / 2. Verbesserungen bleiben für diese Partie erhalten.</p>':page===3?'<p>Verkauft wird jeweils ein Stück aus deinem Rucksack. Jagdbeute zuerst in die Stadt bringen.</p>':'<p>Für Handwerk, Reparaturen und den Ausbau der Stadt.</p>')+'</div><div class="catalogOffers"></div>';const offers=area.querySelector('.catalogOffers');offers.classList.toggle('rifleOffer',page===1);
 for(const g of page===3?state.sales:state.goods.filter(g=>g.page===page)){const row=document.createElement('article'),info=document.createElement('div');const title=document.createElement('h3');title.textContent=g.name;info.append(title);const text=document.createElement('p');text.textContent=page===3?'Im Rucksack: '+g.count:g.description||'Lieferung direkt in deinen Rucksack.';info.append(text);const button=document.createElement('button');button.textContent=g.owned?(g.kind==='weapon'?'Im Besitz':'Bereits verbessert'):(page===3?'+':'')+g.price+' Gold';button.disabled=paused||state.busy||g.owned||(page===3?g.count<1:state.gold<g.price);button.onclick=()=>{button.disabled=true;s.emit(page===3?'shopSell':'shopBuy',g.id)};row.append(info,button);offers.append(row);}
 }
 document.getElementById('openCatalog').onclick=()=>{overlay.classList.add('open');render()};document.getElementById('closeCatalog').onclick=()=>overlay.classList.remove('open');
 document.getElementById('catalogPrev').onclick=()=>{page=Math.max(0,page-1);render()};document.getElementById('catalogNext').onclick=()=>{page=Math.min(3,page+1);render()};
 s.on('me',m=>{state=m.shop;paused=!!m.campaign?.paused||m.campaign?.stage!=='prepare';card.hidden=!state?.here;if(!state?.here)overlay.classList.remove('open');render()});
 s.on('shopReceipt',message=>{document.getElementById('catalogReceipt').textContent=message;stamp='';render()});
})();
