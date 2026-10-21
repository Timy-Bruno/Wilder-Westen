// Inhalte des Spiels: hier können später Waren, Rezepte und Rollen ergänzt werden.
const ITEM={ore:'Erz',coal:'Kohle',bar:'Eisenbarren',ammo:'Munition',meat:'Fleisch',hide:'Fell',herbs:'Kräuter',med:'Medizin',wood:'Holz',planks:'Bretter',fence:'Zaun',food:'Essen',whiskey:'Whiskey',guard:'Wache'};
const SELL={ammo:['ammo',6],med:['med',6],food:['food',6],whiskey:['morale',6],fence:['security',8],guard:['security',8]};
const META={ore:['⛏️','Für den Schmied'],coal:['🪨','Für den Schmied'],bar:['🔩','Für Munition (Schmied)'],ammo:['🔫','→ Stadt: Munition'],meat:['🥩','Für den Saloon-Wirt'],hide:['🦌','Für Laden und Stadtgesuche'],herbs:['🌿','Für Doc & Saloon'],med:['💊','→ Stadt: Medizin'],wood:['🪵','Für den Baumeister'],planks:['🪚','Für den Baumeister'],fence:['🚧','→ Stadt: Sicherheit'],food:['🍲','→ Stadt: Nahrung'],whiskey:['🥃','→ Stadt: Moral'],guard:['💂','→ Stadt: Sicherheit']};
const STN={food:'Nahrung',ammo:'Munition',med:'Medizin',morale:'Moral',security:'Sicherheit'};
const RICON=['⚒️','⚕️','⭐','💰','🥃','🏹','🧨','🔨'];
// Rezepte: i = Zutaten, o = Ergebnis, t = Dauer in Sekunden. Rezepte mit Zutaten können andere Spieler bestellen.
const ROLES=[
 {n:'Schmied',b:'Schmiede',r:[
  {id:'smelt',n:'Eisen schmelzen',g:'smelt',h:'Erz schmelzen, Schlacke entfernen und einen Barren gießen.',i:{ore:2,coal:1},o:{bar:1},t:15},
  {id:'cast',n:'Munition gießen',g:'cast',h:'Gussformen erwärmen, einzeln füllen und die Ansätze entfernen.',i:{bar:1},o:{ammo:3},t:20}]},
 {n:'Doc',b:'Arztpraxis',r:[
  {id:'brew',n:'Medizin mischen',g:'medicine',h:'Kräuter auswählen, zerreiben und Medizin abfüllen.',i:{herbs:2},o:{med:2},t:20}]},
 {n:'Sheriff',b:'Sheriff-Büro',r:[
  {id:'guard',n:'Wache einteilen',g:'memory',h:'Merke dir den Schichtplan!',i:{ammo:1},o:{guard:1},t:15}]},
 {n:'Händler',b:'Laden',r:[
  {id:'wood',n:'Holz einkaufen',g:'hotcold',h:'Finde den fairen Preis!',i:{},o:{wood:3},t:10},
  {id:'herb',n:'Kräuter einkaufen',g:'hotcold',h:'Finde den fairen Preis!',i:{},o:{herbs:2},t:10}]},
 {n:'Saloon-Wirt',b:'Saloon',r:[
  {id:'stew',n:'Eintopf kochen',g:'cooking',h:'Zutaten schneiden, in den Topf geben, bei guter Hitze rühren und portionieren.',i:{meat:1},o:{food:3},t:15},
  {id:'whis',n:'Whiskey brennen',g:'memory',h:'Merke dir die Mischung!',i:{herbs:1},o:{whiskey:2},t:20}]},
 {n:'Jäger',b:'Jagdhütte',r:[
  {id:'hunt',n:'Im Wald jagen',g:'hunt',h:'Wildspuren folgen, leise anschleichen und ruhig zielen.',i:{},o:{meat:2,hide:1},t:0},
  {id:'gather',n:'Kräuter suchen',g:'hotcold',h:'Wo wachsen die Kräuter?',i:{},o:{herbs:2},t:10}]},
 {n:'Sprengmeister',b:'Mine',r:[
  {id:'blast',n:'Erz sprengen',g:'hotcold',h:'Wo liegt die Erzader?',i:{},o:{ore:3},t:15},
  {id:'coal',n:'Kohle abbauen',g:'timing',h:'Triff die Kohleschicht!',i:{},o:{coal:2},t:10}]},
 {n:'Baumeister',b:'Zimmerei',r:[
  {id:'saw',n:'Bretter sägen',g:'timing',h:'Säge im richtigen Moment!',i:{wood:2},o:{planks:2},t:12},
  {id:'fence',n:'Zaun bauen',g:'memory',h:'Merke dir den Bauplan!',i:{planks:3},o:{fence:1},t:20}]}];
module.exports={ITEM,SELL,META,STN,RICON,ROLES};

