// Pharmacy work is simulated on the server; client results cannot award medicine.
function create(){return {phase:'sort',selected:[],ground:0,lastAngle:null,stirred:0,filled:[false,false],suspended:false};}
const herbs=['Salbei','Kamille','Fingerhut'];
function action(w,v){if(!w||!v)return false;if(v.type==='suspend'){w.suspended=v.active===true;w.lastAngle=null;return true;}if(w.suspended)return false;
 if(v.type==='herb'&&w.phase==='sort'&&Number.isInteger(v.node)&&v.node>=0&&v.node<3){if(v.node===2||w.selected.includes(v.node))return false;w.selected.push(v.node);if(w.selected.length===2)w.phase='grind';return true;}
 if(v.type==='stroke'&&w.phase==='grind'&&Number.isFinite(v.angle)){const a=((v.angle%360)+360)%360;if(w.lastAngle!==null){const d=Math.abs(((a-w.lastAngle+540)%360)-180);if(d<=60)w.ground=Math.min(1080,w.ground+d);}w.lastAngle=a;if(w.ground>=1080){w.phase='mix';w.lastAngle=null;}return true;}
 if(v.type==='mix'&&w.phase==='mix'){w.stirred=Math.min(6,w.stirred+1);if(w.stirred===6)w.phase='bottle';return true;}
 if(v.type==='bottle'&&w.phase==='bottle'&&Number.isInteger(v.node)&&v.node>=0&&v.node<2&&!w.filled[v.node]){w.filled[v.node]=true;if(w.filled.every(Boolean))w.phase='done';return true;}return false;}
function tick(w){return w&&!w.suspended&&w.phase==='done'?1:null;}
function snapshot(w,paused=false){return w?{...w,selected:[...w.selected],filled:[...w.filled],paused:paused||w.suspended,worldPaused:paused,herbs:[...herbs],hint:{sort:'Rezept: Salbei und Kamille. Fingerhut gehört nicht in diese Medizin.',grind:'Ziehe mit dem Finger drei Kreise im Mörser. Kleine Kreisbewegungen zählen in beide Richtungen.',mix:'Rühre den Kräutersud mit sechs ruhigen Löffelzügen um.',bottle:'Fülle beide Arzneiflaschen ab.',done:'Die Medizin wird zur Abholung vorbereitet.'}[w.phase]}:null;}
module.exports={create,action,tick,snapshot};
