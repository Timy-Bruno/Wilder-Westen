const SHIRTS=['#c16f54','#6c99ac','#83945c','#c5aa58','#ac83a5','#659d8d'],HATS=['#9c8353','#4f4a39','#b49d72'];
const STYLES=['apron','doctor','sheriff','merchant','barkeep','hunter','miner','carpenter'];
function look(role=0,seed=0){return {style:STYLES[role%8],skin:['#d4ae80','#b78862','#deb993','#9b7356'][seed%4],hair:['#594332','#453d30','#90714e','#b1a38b'][seed%4],beard:seed%3===0,face:seed%3,shirt:SHIRTS[(role+seed)%SHIRTS.length],hat:HATS[seed%HATS.length],trousers:['#4c5245','#555b56','#695b45'][seed%3],bandana:['#9d5e44','#647665','#b09a62'][seed%3]};}
function npc(role,seed=0){return look(role,seed+8);}
function ensure(p){return p.character||(p.character={...look(p.role||0,p.i||0),shirt:SHIRTS[p.i%SHIRTS.length]||SHIRTS[0],hat:HATS[(p.i||0)%HATS.length],owned:{revolver:true,rifle:false},equipped:'revolver'});}
function view(p){const c=ensure(p);return {...c,owned:{...c.owned}};}
function equip(p,id){const c=ensure(p);if(!['revolver','rifle'].includes(id)||!c.owned[id]||p.cur||p.forge)return false;c.equipped=id;if(p.woodland)p.woodland.weapon=id;return true;}
function dress(p,v){const c=ensure(p);if(!v||p.cur||p.forge)return false;if(v.part==='shirt'&&SHIRTS.includes(v.color))c.shirt=v.color;else if(v.part==='hat'&&HATS.includes(v.color))c.hat=v.color;else return false;return true;}
module.exports={npc,look,STYLES,ensure,view,equip,dress,SHIRTS,HATS};
