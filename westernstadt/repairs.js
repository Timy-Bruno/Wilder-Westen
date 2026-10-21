const Interior=require('./interior');
// Shared workshop jobs. Customers retain ownership; only their assigned smith can work.
const MAX_CONDITION=3,COST={ore:1,coal:1};
const smith=room=>room.slots.find(p=>p.role===0);
const carpenter=room=>room.slots.find(p=>p.role===7);
const cost=p=>p.woodland?.condition===0?{...COST,planks:1}:COST;
const atService=p=>!p.interior||(Interior.canWork(p)&&Interior.station(p.interior)?.id==='service');
function reason(room,p){
 const f=p.woodland;if(p.interior&&(!Interior.canWork(p)||Interior.station(p.interior)?.id!=='service'))return 'Geh zur Reparaturannahme und öffne den Arbeitsplatz.';if(p.inside!==0)return 'Bring die eingepackte Falle zur Schmiede.';
 if(p.cur||p.forge)return 'Beende zuerst deine aktuelle Arbeit.';
 if(!f)return 'Deine Leihfalle bekommst du in der Jagdhütte.';
 if(f.repairId)return 'Deine Falle ist bereits in der Schmiede.';
 if(f.trap)return 'Nimm deine Falle zuerst im Wald auf.';
 if(f.condition>=MAX_CONDITION)return 'Die Falle ist noch in gutem Zustand.';
 if(!(p.inv.ore>=1&&p.inv.coal>=1))return 'Für die Reparatur brauchst du 1 Erz und 1 Kohle.';
 if(f.condition===0&&!(p.inv.planks>=1))return 'Für den verschlissenen Rahmen brauchst du zusätzlich 1 Brett. Das Ersatzteil fertigt die Zimmerei.';
 return '';
}
function request(room,p){
 if(reason(room,p))return null;
 room.repairs=room.repairs||[];room.repairOid=(room.repairOid||0)+1;const provider=smith(room);
 const job={id:room.repairOid,owner:p.i,provider:provider?provider.i:null,state:provider?'open':'work',npc:!provider,remaining:provider?0:40,heat:0,heating:false,nodes:[false,false,false],clock:0,cooldown:0,notice:false,message:'Wähle ein verbogenes Gelenk. Erhitze das Metall und richte es mit dem Hammer.'};
 if(p.woodland.condition===0){const worker=carpenter(room);job.state='wood';job.wood={provider:worker?.i??null,npc:!worker,remaining:20,board:null,strokes:0,edge:0,nextStroke:0,holes:[0,0],drilling:null};job.message='Der Holzrahmen ist verschlissen. Zuerst fertigt die Zimmerei ein Ersatzteil.';}
 for(const [k,n]of Object.entries(cost(p)))p.inv[k]-=n;p.woodland.repairId=job.id;room.repairs.push(job);return job;
}
function start(room,p,id){
 const job=(room.repairs||[]).find(j=>j.id===id),wood=job?.state==='wood',provider=wood?job.wood.provider:job?.provider;
 if(p.interior&&(!Interior.canWork(p)||Interior.station(p.interior)?.id!==(wood?'saw':'repairs')))return false;
 if(!job||(wood?job.wood.npc:job.npc)||provider!==p.i||p.role!==(wood?7:0)||p.inside!==(wood?7:0)||p.cur||p.hunt||p.forge||!['wood','open','work'].includes(job.state))return false;
 if(!wood)job.state='work';job.heating=false;if(job.wood)job.wood.drilling=null;Interior.stop(p.interior);p.forge=job.id;p.forgeSuspended=false;return true;
}
function active(room,p){return (room.repairs||[]).find(j=>j.id===p.forge&&(j.state==='wood'?j.wood.provider===p.i&&!j.wood.npc:j.provider===p.i&&j.state==='work'&&!j.npc));}
function stop(room,p){const job=active(room,p);if(job){job.heating=false;if(job.wood)job.wood.drilling=null;}p.forge=null;p.forgeSuspended=false;}
function finishWood(room,j){const w=j.wood;if(!w||j.state!=='wood')return false;const worker=room.slots.find(p=>p.i===w.provider);if(worker?.forge===j.id)stop(room,worker);w.drilling=null;w.done=true;j.state=j.npc?'work':'open';j.remaining=j.npc?40:0;j.partNotice=true;j.message='Ersatzrahmen geliefert. Erhitze und richte jetzt die Metallgelenke.';if(!w.npc&&worker&&worker.i!==j.owner&&!w.rewarded){worker.gold=(worker.gold||0)+2;w.rewarded=true;}return true;}
function woodAction(room,p,j,input){const w=j.wood;
 if(input.type==='heat'&&input.active===false){w.drilling=null;return true;}
 if(input.type==='measure'&&w.board===null&&Number.isInteger(input.choice)&&input.choice>=0&&input.choice<3){if(input.choice!==j.id%3){j.message='Dieses Brett passt nicht zum Bauplan. Vergleiche die markierte Länge.';return false;}w.board=input.choice;j.message='Brett gewählt. Säge entlang der waagerechten Markierung hin und her.';return true;}
 if(input.type==='saw'&&w.board!==null&&w.strokes<6){if(!Number.isFinite(input.x)||!Number.isFinite(input.y)||input.x<0||input.x>1||Math.abs(input.y-.55)>.13)return false;const edge=input.x<.2?-1:input.x>.8?1:0;if(!edge||edge===w.edge||j.clock<w.nextStroke)return false;if(w.edge)w.strokes++;w.edge=edge;w.nextStroke=j.clock+.18;if(w.strokes===6)j.message='Sauber zugeschnitten. Halte den Bohrer auf beiden markierten Löchern.';return true;}
 if(input.type==='drill'&&w.strokes===6){if(input.active===false){w.drilling=null;return true;}if(!Number.isInteger(input.node)||input.node<0||input.node>1||w.holes[input.node]>=1)return false;w.drilling=input.node;return true;}
 if(input.type==='finish'&&w.holes.every(n=>n>=1))return finishWood(room,j);
 return false;
}
function npcTakeover(room,p,id){const j=(room.repairs||[]).find(j=>j.id===id);if(!j||j.owner!==p.i||p.inside!==0||!atService(p)||p.cur||p.forge||!['wood','open','work'].includes(j.state))return false;const w=j.state==='wood'?j.wood:null,provider=room.slots.find(p=>p.i===(w?w.provider:j.provider));if(!provider||provider.sock||(w?w.npc:j.npc))return false;if(provider.forge===j.id)stop(room,provider);if(w){w.npc=true;w.remaining=20;}else{j.npc=true;j.state='work';j.remaining=40;}return true;}
function action(room,p,input){
 const job=active(room,p);if(!job||!input||typeof input!=='object')return false;
 if(input.type==='suspend'){p.forgeSuspended=input.active===true;job.heating=false;if(job.wood)job.wood.drilling=null;return true;}
 if(p.forgeSuspended)return false;
 if(job.state==='wood')return woodAction(room,p,job,input);
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
  if(j.state==='wood'){j.clock+=dt;const w=j.wood,worker=room.slots.find(p=>p.i===w.provider);if(w.npc){w.remaining=Math.max(0,w.remaining-dt);if(w.remaining<=0)finishWood(room,j);}else if(worker?.sock&&worker.forge===j.id&&!worker.forgeSuspended&&w.drilling!==null){const node=w.drilling;w.holes[node]=Math.min(1,w.holes[node]+dt/.8);if(w.holes[node]>=1){w.drilling=null;j.message=w.holes.every(n=>n>=1)?'Ersatzteil fertig. Liefere es an die Schmiede.':'Erstes Loch fertig. Bohre jetzt die zweite Markierung.';}}continue;}
  j.clock+=dt;
  if(j.npc||j.state==='cooling'){
   j.remaining=Math.max(0,j.remaining-dt);if(j.remaining<=0){j.state='ready';j.heating=false;j.notice=true;if(j.wood&&!j.npc&&j.provider!==j.owner&&!j.rewarded){const worker=room.slots.find(p=>p.i===j.provider);if(worker)worker.gold=(worker.gold||0)+2;j.rewarded=true;}ready.push(j);}continue;
  }
  const p=room.slots[j.provider],working=p?.sock&&p.forge===j.id&&!p.forgeSuspended;
  j.heat=Math.max(0,Math.min(1,j.heat+(working&&j.heating ? .28 : -.1)*dt));
 }
 return ready;
}
function collect(room,p,id){
 const j=(room.repairs||[]).find(j=>j.id===id);
 if(p.interior&&(!Interior.canWork(p)||Interior.station(p.interior)?.id!=='service'))return false;
 if(!j||j.owner!==p.i||j.state!=='ready'||p.inside!==0||p.cur||p.forge||p.woodland?.repairId!==id)return false;
 p.woodland.condition=MAX_CONDITION;p.woodland.repairId=null;room.repairs=room.repairs.filter(j=>j!==j);return true;
}
function summary(j){return j?{wood:j.wood?{provider:j.wood.provider,npc:j.wood.npc,remaining:Math.ceil(j.wood.remaining),done:!!j.wood.done,board:j.wood.board,strokes:j.wood.strokes,holes:j.wood.holes.filter(n=>n>=1).length}:null,id:j.id,owner:j.owner,provider:j.provider,state:j.state,npc:j.npc,remaining:Math.ceil(j.remaining),done:j.nodes.filter(Boolean).length}:null;}
function view(room,p){const own=(room.repairs||[]).find(j=>j.owner===p.i),w=own?.state==='wood'?own.wood:null,provider=own&&room.slots.find(p=>p.i===(w?w.provider:own.provider));return {here:p.inside===0||p.inside===7,busy:!!p.cur||!!p.forge,cost:cost(p),reason:reason(room,p),own:own?{...summary(own),canNpc:!!provider&&!provider.sock&&!(w?w.npc:own.npc)&&['wood','open','work'].includes(own.state)}:null,incoming:(room.repairs||[]).filter(j=>j.state==='wood'?j.wood.provider===p.i&&!j.wood.npc:j.provider===p.i&&!j.npc&&j.state!=='ready').map(summary)};}
function snapshot(room,p,paused=false){const j=active(room,p);return j?{kind:j.state==='wood'?'wood':'metal',wood:j.state==='wood'?{board:j.wood.board,required:j.id%3,lengths:[24,30,36],strokes:j.wood.strokes,holes:[...j.wood.holes],drilling:j.wood.drilling}:null,id:j.id,owner:j.owner,heat:j.heat,heating:j.heating,nodes:[...j.nodes],ready:j.clock>=j.cooldown,suspended:!!p.forgeSuspended,paused:paused||!!p.forgeSuspended,message:j.message}:null;}
module.exports={MAX_CONDITION,COST,npcTakeover,reason,request,start,action,stop,active,tick,collect,view,snapshot};
