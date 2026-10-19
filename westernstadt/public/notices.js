// Notifications can be dismissed without waiting for their expiry.
window.GameNotices={install(e){let timer=null,gesture=null,generation=0;
 e.innerHTML='<span class="noticeText"></span><button type="button" aria-label="Hinweis schließen">×</button>';e.setAttribute('role','status');e.setAttribute('aria-live','polite');e.tabIndex=0;e.title='Antippen oder wegwischen zum Schließen';
 const reset=()=>{e.style.transform='';e.style.opacity='';};
 const dismiss=()=>{clearTimeout(timer);e.hidden=true;gesture=null;reset();};
 e.querySelector('button').onclick=ev=>{ev.stopPropagation();dismiss()};
 e.onpointerdown=ev=>{gesture={x:ev.clientX,y:ev.clientY,id:ev.pointerId,generation};e.setPointerCapture(ev.pointerId);};
 e.onpointermove=ev=>{if(!gesture||gesture.id!==ev.pointerId)return;const dx=ev.clientX-gesture.x,dy=ev.clientY-gesture.y;if(Math.hypot(dx,dy)>8){e.style.transform=`translate(${dx}px,${dy}px)`;e.style.opacity=String(Math.max(.25,1-Math.hypot(dx,dy)/150));}};
 e.onpointerup=ev=>{if(!gesture||gesture.id!==ev.pointerId||gesture.generation!==generation)return;ev.preventDefault();ev.stopPropagation();dismiss()};
 e.onpointercancel=()=>{gesture=null;reset()};e.onkeydown=ev=>{if(['Escape','Enter',' '].includes(ev.key)){ev.preventDefault();dismiss()}};
 return (text,alert)=>{generation++;gesture=null;reset();clearTimeout(timer);e.querySelector('.noticeText').textContent=text;e.className=alert?'al':'';e.hidden=false;timer=setTimeout(dismiss,6500);};
}};
