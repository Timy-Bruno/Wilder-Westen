// Distinct server-simulated production: furnace/slag/bar vs individual ammunition moulds.
function create(kind){return {kind,phase:kind==='smelt'?'charge':'heat',ore:0,coal:0,heat:.08,heating:false,steady:0,quality:1,slag:[false,false,false],fills:Array(kind==='smelt'?1:3).fill(0),selected:0,pouring:false,cooling:0,trim:[false,false,false],suspended:false};}
function cooled(w){w.phase='cool';w.cooling=4;w.pouring=false;}
function endPour(w){const i=w.selected;if(w.fills[i]<.78)return;w.quality=Math.max(.4,w.quality-(w.fills[i]>1.03?.22:0));w.fills[i]=Math.max(.8,Math.min(1.12,w.fills[i]));w.pouring=false;const next=w.fills.findIndex(v=>v<.78);if(next<0)cooled(w);else w.selected=next;}
function action(w,v){if(!w||!v||typeof v.type!=='string')return false;if(v.type==='suspend'){w.suspended=v.active===true;w.heating=false;w.pouring=false;return true;}if(w.suspended)return false;
 if(v.type==='load'&&w.phase==='charge'){if(v.item==='ore'&&w.ore<2)w.ore++;else if(v.item==='coal'&&w.coal<1)w.coal++;else return false;if(w.ore===2&&w.coal===1)w.phase='heat';return true;}
 if(v.type==='heat'&&w.phase==='heat'){w.heating=v.active===true;return true;}
 if(v.type==='skim'&&w.phase==='clean'&&Number.isInteger(v.node)&&v.node>=0&&v.node<3&&!w.slag[v.node]){w.slag[v.node]=true;if(w.slag.every(Boolean))w.phase='pour';return true;}
 if(v.type==='select'&&w.phase==='pour'&&!w.pouring&&Number.isInteger(v.node)&&v.node>=0&&v.node<w.fills.length&&w.fills[v.node]<.78){w.selected=v.node;return true;}
 if(v.type==='pour'&&w.phase==='pour'){w.pouring=v.active===true;if(!w.pouring)endPour(w);return true;}
 if(v.type==='trim'&&w.phase==='trim'&&Number.isInteger(v.node)&&v.node>=0&&v.node<3&&!w.trim[v.node]){w.trim[v.node]=true;if(w.trim.every(Boolean))w.phase='done';return true;}return false;}
function tick(w,dt){if(!w||w.suspended)return null;dt=Math.min(.2,Math.max(0,dt));if(w.phase==='heat'){w.heat=Math.max(0,Math.min(1,w.heat+(w.heating?.22:-.065)*dt));if(w.heat>=.6&&w.heat<=.82)w.steady+=dt;else w.steady=Math.max(0,w.steady-dt);if(w.heat>.92)w.quality=Math.max(.4,w.quality-.06*dt);if(w.steady>=2.4){w.phase=w.kind==='smelt'?'clean':'pour';w.heating=false;}}
 if(w.phase==='pour'){w.heat=Math.max(.2,w.heat-.015*dt);if(w.pouring){w.fills[w.selected]+=.32*dt;if(w.fills[w.selected]>=1.12)endPour(w);}}
 if(w.phase==='cool'){w.cooling=Math.max(0,w.cooling-dt);if(w.cooling===0)w.phase=w.kind==='smelt'?'done':'trim';}return w.phase==='done'?Math.max(.4,Math.min(1,w.quality)):null;}
function hint(w){return {charge:'Lege zwei Erzstücke und ein Stück Kohle in die Esse.',heat:'Blasebalg halten und die Arbeitswärme im goldenen Bereich halten.',clean:'Tippe die drei dunklen Schlackereste auf dem flüssigen Eisen an.',pour:w.kind==='smelt'?'Kippe den Tiegel. Lass los, wenn die Barrenform fast voll ist.':'Tippe eine Gussform an. Gieße jede Form bis zur Markierung voll.',cool:'Das Metall erstarrt. Warte, bis es abgekühlt ist.',trim:'Entferne die drei Gussansätze an der fertigen Munition.',done:'Fertig.'}[w.phase];}
function snapshot(w,paused=false){return w?{...w,slag:[...w.slag],fills:[...w.fills],trim:[...w.trim],paused:paused||w.suspended,worldPaused:paused,hint:hint(w)}:null;}
module.exports={create,action,tick,snapshot};
