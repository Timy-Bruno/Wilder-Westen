const SHIRTS=['#c16f54','#6c99ac','#83945c','#c5aa58','#ac83a5','#659d8d'],HATS=['#9c8353','#4f4a39','#b49d72'];
function ensure(p){return p.character||(p.character={shirt:SHIRTS[p.i%SHIRTS.length]||SHIRTS[0],hat:HATS[0],trousers:'#4c5245',bandana:'#9d5e44',owned:{revolver:true,rifle:false},equipped:'revolver'});}
function view(p){const c=ensure(p);return {...c,owned:{...c.owned}};}
function equip(p,id){const c=ensure(p);if(!['revolver','rifle'].includes(id)||!c.owned[id]||p.cur||p.forge)return false;c.equipped=id;if(p.woodland)p.woodland.weapon=id;return true;}
function dress(p,v){const c=ensure(p);if(!v||p.cur||p.forge)return false;if(v.part==='shirt'&&SHIRTS.includes(v.color))c.shirt=v.color;else if(v.part==='hat'&&HATS.includes(v.color))c.hat=v.color;else return false;return true;}
module.exports={ensure,view,equip,dress,SHIRTS,HATS};
