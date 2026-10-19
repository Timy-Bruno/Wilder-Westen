const Hunt=require('./hunt');
const Interior=require('./interior');
const GOODS=[
 {id:'cartridges',name:'6 Jagdpatronen',price:4,kind:'ammo',amount:6,page:0,description:'Nachschub für dein Jagdgewehr.'},
 {id:'bait',name:'2 Wildköder',price:3,kind:'bait',amount:2,page:0,description:'Für Köderplätze und deine Falle.'},
 {id:'rifle',name:'Gewehr verbessern',price:18,kind:'rifleLevel',amount:1,page:1,description:'Ruhiger zielen: 1,6 statt 2,2 Sekunden. Reichweite: 70 statt 60 Meter.'},
 {id:'ore',name:'2 Erz',price:2,kind:'ore',amount:2,page:2},
 {id:'coal',name:'1 Kohle',price:2,kind:'coal',amount:1,page:2},
 {id:'wood',name:'2 Holz',price:3,kind:'wood',amount:2,page:2},
 {id:'herbs',name:'2 Kräuter',price:3,kind:'herbs',amount:2,page:2}
];
const SELL={meat:{name:'Fleisch',price:1},hide:{name:'Fell',price:3}};
function allowed(p){return Interior.canTrade(p);}
function buy(p,id){const g=GOODS.find(g=>g.id===id);if(!allowed(p)||!g||(p.gold||0)<g.price)return false;
 if(g.kind==='rifleLevel'&&(p.woodland?.rifleLevel||1)>=2)return false;
 if(['ammo','bait','rifleLevel'].includes(g.kind)){p.woodland=p.woodland||Hunt.createField();p.woodland[g.kind]=(p.woodland[g.kind]??(g.kind==='ammo'?6:1))+g.amount;}
 else p.inv[g.kind]=(p.inv[g.kind]||0)+g.amount;
 p.gold-=g.price;return g;
}
function sell(p,key){const g=typeof key==='string'&&Object.hasOwn(SELL,key)?SELL[key]:null;if(!allowed(p)||!g||!(p.inv[key]>0))return false;p.inv[key]--;p.gold=(p.gold||0)+g.price;return g;}
function view(p){return {here:Interior.canTrade(p),busy:!allowed(p),gold:p.gold||0,ammo:p.woodland?.ammo??6,bait:p.woodland?.bait??1,rifleLevel:p.woodland?.rifleLevel??1,goods:GOODS.map(g=>({...g,owned:g.id==='rifle'&&(p.woodland?.rifleLevel||1)>=2})),sales:Object.entries(SELL).map(([id,g])=>({id,...g,count:p.inv[id]||0}))};}
module.exports={buy,sell,view};
