// Shared workshop jobs. Customers retain ownership; only their assigned smith can work.
const MAX_CONDITION=3,COST={ore:1,coal:1};
const smith=room=>room.slots.find(p=>p.role===0);
function reason(room,p){
 const f=p.woodland;if(p.inside!==0)return 'Bring die eingepackte Falle zur Schmiede.';
 if(p.cur||p.forge)return 'Beende zuerst deine aktuelle Arbeit.';
 if(!f)return 'Deine Leihfalle bekommst du in der Jagdhütte.';
 if(f.repairId)return 'Deine Falle ist bereits in der Schmiede.';
 if(f.trap)return 'Nimm deine Falle zuerst im Wald auf.';
 if(f.condition>=MAX_CONDITION)return 'Die Falle ist noch in gutem Zustand.';
 if(!(p.inv.ore>=1&&p.inv.coal>=1))return 'Für die Reparatur brauchst du 1 Erz und 1 Kohle.';
 return '';
}
function request(room,p){
 if(reason(room,p))return null;
 room.repairs=room.repairs||[];room.repairOid=(room.repairOid||0)+1;const provider=smith(room);
 const job={id:room.repairOid,owner:p.i,provider:provider?provider.i:null,state:provider?'open':'work',npc:!provider,remaining:provider?0:40,heat:0,heating:false,nodes:[false,false,false],clock:0,cooldown:0,notice:false,message:'Wähle ein verbogenes Gelenk. Erhitze das Metall und richte es mit dem Hammer.'};
 for(const [k,n]of Object.entries(COST))p.inv[k]-=n;p.woodland.repairId=job.id;room.repairs.push(job);return job;
}
function start(room,p,id){
 const job=(room.repairs||[]).find(j=>j.id===id);
 if(!job||job.npc||job.provider!==p.i||p.role!==0||p.inside!==0||p.cur||p.hunt||p.forge||!['open','work'].includes(job.state))return false;
 job.state='work';job.heating=false;p.forge=job.id;p.forgeSuspended=false;return true;
}
function active(room,p){return (room.repairs||[]).find(j=>j.id===p.forge&&j.provider===p.i&&j.state==='work'&&!j.npc);}
function stop(room,p){const job=active(room,p);if(job)job.heating=false;p.forge=null;p.forgeSuspended=false;}
function action(room,p,input){
 const job=active(room,p);if(!job||!input||typeof input!=='object')return false;
 if(input.type==='suspend'){p.forgeSuspended=input.active===true;job.heating=false;return true;}
 if(p.forgeSuspended)return false;
 if(input.type==='heat'){job.heating=input.active===true;return true;}
 if(input.type==='hammer'){
  if(!Number.isInteger(input.node)||input.node<0||input.node>2||job.nodes[input.node]||job.clock<job.cooldown)return false;
  job.cooldown=job.clock+.65;
  if(job.heat<.4){job.message='Noch zu kalt. Halte „Erhitzen“, bis das Metall orange glüht.';return false;}
  if(job.heat>.86){job.message='Zu heiß! Lass das Metall etwas abkühlen.';return false;}
  job.nodes[input.node]=true;job.heat=Math.max(0,job.heat-.12);job.message=job.nodes.every(Boolean)?'Alle Gelenke sind gerichtet. Schrecke die Falle jetzt ab.':'Gelenk gerichtet. Wähle das nächste verbogene Gelenk.';return true;
 }
 if(input.type==='quench'&&job.nodes.every(Boolean)){
  job.state='cooling';job.heating=false;job.remaining=3;stop(room,p);return true;
 }
 return false;
}
function tick(room,dt){
 dt=Math.max(0,Math.min(.2,dt));const ready=[];
 for(const j of room.repairs||[]){
  if(j.state==='ready'||j.state==='open')continue;
  j.clock+=dt;
  if(j.npc||j.state==='cooling'){
   j.remaining=Math.max(0,j.remaining-dt);if(j.remaining<=0){j.state='ready';j.heating=false;j.notice=true;ready.push(j);}continue;
  }
  const p=room.slots[j.provider],working=p?.sock&&p.forge===j.id&&!p.forgeSuspended;
  j.heat=Math.max(0,Math.min(1,j.heat+(working&&j.heating ? .28 : -.1)*dt));
 }
 return ready;
}
function collect(room,p,id){
 const j=(room.repairs||[]).find(j=>j.id===id);
 if(!j||j.owner!==p.i||j.state!=='ready'||p.inside!==0||p.cur||p.forge||p.woodland?.repairId!==id)return false;
 p.woodland.condition=MAX_CONDITION;p.woodland.repairId=null;room.repairs=room.repairs.filter(j=>j!==j);return true;
}
function summary(j){return j?{id:j.id,owner:j.owner,provider:j.provider,state:j.state,npc:j.npc,remaining:Math.ceil(j.remaining),done:j.nodes.filter(Boolean).length}:null;}
function view(room,p){return {here:p.inside===0,busy:!!p.cur||!!p.forge,cost:COST,reason:reason(room,p),own:summary((room.repairs||[]).find(j=>j.owner===p.i)),incoming:p.role===0?(room.repairs||[]).filter(j=>j.provider===p.i&&j.state!=='ready').map(summary):[]};}
function snapshot(room,p,paused=false){const j=active(room,p);return j?{id:j.id,owner:j.owner,heat:j.heat,heating:j.heating,nodes:[...j.nodes],ready:j.clock>=j.cooldown,suspended:!!p.forgeSuspended,paused:paused||!!p.forgeSuspended,message:j.message}:null;}
module.exports={MAX_CONDITION,COST,reason,request,start,action,stop,active,tick,collect,view,snapshot};
