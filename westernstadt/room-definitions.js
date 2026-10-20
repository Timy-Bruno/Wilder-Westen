// Shared floor plans: collision bodies and interaction points use the same coordinates.
const names=['Schmiede','Arztpraxis','Sheriff-Büro','Handelskontor','Saloon','Jagdhütte','Mine','Zimmerei'];
const station=(id,label,x,y,kind,recipes=[])=>({id,label,x,y,w:150,h:65,kind,recipes,reach:{x:x-20,y:y+78,w:190,h:68}});
const plans=[
 [station('smelt','Esse · Eisen schmelzen',155,170,'forge',['smelt']),station('cast','Gusstisch · Munition',495,170,'casting',['cast']),station('repairs','Werkbank · Fallen reparieren',155,380,'anvil'),station('service','Reparaturannahme & Abholung',495,380,'repairdesk')],
 [station('brew','Apothekertisch · Medizin mischen',190,180,'medicine',['brew']),station('service','Empfang & Aufträge',495,380,'desk')],
 [station('guard','Schreibtisch · Wache einteilen',190,180,'sheriff',['guard']),station('service','Aufträge & Abholung',495,380,'desk')],null,
 [station('stew','Herd · Eintopf kochen',155,180,'stove',['stew']),station('whis','Brennerei · Whiskey',495,180,'still',['whis']),station('service','Tresen · Aufträge',495,380,'desk')],
 [station('hunt','Jagdausrüstung · In den Wald',155,180,'hunting',['hunt']),station('gather','Kräutertisch · Sammeln',495,180,'herbs',['gather']),station('service','Aufträge & Abholung',495,380,'desk')],
 [station('blast','Sprengbank · Erz abbauen',155,180,'mining',['blast']),station('coal','Kohleflöz · Kohle abbauen',495,180,'coal',['coal']),station('service','Aufträge & Abholung',495,380,'desk')],
 [station('saw','Sägebank · Bretter sägen',155,180,'saw',['saw']),station('fence','Werkbank · Zaun bauen',495,180,'fence',['fence']),station('service','Aufträge & Abholung',495,380,'desk')]
];
const rooms=plans.map((stations,id)=>stations?{id,name:names[id],w:800,h:620,spawn:{x:400,y:535},door:{x:350,y:570,w:100,h:30},stations,solids:[...stations.map(({x,y,w,h,kind})=>({x,y,w,h,kind})),{x:45,y:140,w:70,h:220,kind:'shelf'},{x:685,y:140,w:70,h:220,kind:'shelf'}]}:null);
module.exports={rooms,names};
