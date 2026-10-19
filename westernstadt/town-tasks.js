// Shared town requests. Inventory and reward values never come from the phone.
const {ITEM}=require('./data');
const TYPES=[
 {title:'Frisches Wild für den Saloon',from:'Saloon-Küche',building:4,place:'Saloon',need:{meat:2},gold:4,benefit:{food:6},effect:'Die Stadt erhält +6 Nahrung.'},
 {title:'Felle für warme Kleidung',from:'Handelskontor',building:3,place:'Laden',need:{hide:2},gold:8,benefit:{morale:4},effect:'Die Stadt erhält +4 Moral.'},
 {title:'Vorräte für die Fährtensucher',from:'Jagdgemeinschaft',building:5,place:'Jagdhütte',need:{meat:2,hide:1},gold:7,benefit:{food:4},effect:'Die Stadt erhält +4 Nahrung.'}
];
function create(n=1){const board={nextId:1,entries:[]};for(let i=0;i<Math.min(8,Math.max(3,n));i++)board.entries.push({id:board.nextId++,type:i%TYPES.length,owner:null,cooldown:0});return board;}
const free=p=>!p.cur&&!p.hunt&&!p.forge;
const mine=(board,p)=>board.entries.find(j=>j.owner===p.i);
function accept(board,p,id){const j=board.entries.find(j=>j.id===id);if(!free(p)||mine(board,p)||!j||j.owner!==null||j.cooldown>0)return false;j.owner=p.i;return true;}
function cancel(board,p,id){const j=mine(board,p);if(!free(p)||!j||j.id!==id)return false;j.owner=null;return true;}
function complete(board,p,id,stats){const j=mine(board,p);if(!free(p)||!j||j.id!==id)return false;const t=TYPES[j.type];if(p.inside!==t.building||!Object.entries(t.need).every(([k,n])=>(p.inv[k]||0)>=n))return false;
 for(const [k,n] of Object.entries(t.need))p.inv[k]-=n;
 p.gold=(p.gold||0)+t.gold;p.townCompleted=(p.townCompleted||0)+1;
 for(const [k,n] of Object.entries(t.benefit))stats[k]=Math.min(100,(stats[k]||0)+n);
 j.owner=null;j.cooldown=90;return {title:t.title,gold:t.gold,effect:t.effect};
}
function tick(board,dt){if(!Number.isFinite(dt)||dt<=0)return;for(const j of board.entries)if(j.cooldown>0){j.cooldown=Math.max(0,j.cooldown-Math.min(.2,dt));if(j.cooldown===0)j.id=board.nextId++;}}
function view(board,p){const active=mine(board,p);return {completed:p.townCompleted||0,activeId:active?.id??null,busy:!free(p),entries:board.entries.map(j=>{const t=TYPES[j.type],owned=j.owner===p.i,ready=Object.entries(t.need).every(([k,n])=>(p.inv[k]||0)>=n);return {id:j.id,title:t.title,from:t.from,place:t.place,gold:t.gold,effect:t.effect,owned,taken:j.owner!==null&&!owned,cooldown:Math.ceil(j.cooldown),need:Object.entries(t.need).map(([k,n])=>({key:k,name:ITEM[k],amount:n,have:p.inv[k]||0})),ready,here:p.inside===t.building,canDeliver:owned&&ready&&p.inside===t.building&&free(p)};})};}
module.exports={create,accept,cancel,complete,tick,view};
