const Interior=require('./interior');
// Only crossings count: standing near a doorway never changes rooms.
function entering(b,from,to){const y=b.y+b.h+16;if(!(from.y>=y&&to.y<=y&&to.y<from.y))return false;const t=(from.y-y)/(from.y-to.y);const x=from.x+(to.x-from.x)*t;return Math.abs(x-(b.x+b.w/2))<=18;}
function exiting(from,to){if(!(from.y<=573&&to.y>=573&&to.y>from.y))return false;const t=(573-from.y)/(to.y-from.y);return Math.abs(from.x+(to.x-from.x)*t-400)<=36;}
function enter(p,id=3){p.inside=id;p.interior=Interior.create(id);p.dx=p.dy=0;}
function leave(p,b){p.inside=null;p.interior=null;p.x=b.x+b.w/2;p.y=b.y+b.h+42;p.dx=p.dy=0;}
// Check the swept doorway before the room boundary rejects an overshooting step.
function step(p,dt,b){const r=p.interior;if(!r||r.menu)return false;const d=Math.min(.2,Math.max(0,dt));const intended={x:r.x+r.dx*Interior.SPEED*d,y:r.y+r.dy*Interior.SPEED*d};if(Interior.stairs(p,r,intended))return true;if(!r.floor&&exiting(r,intended)){leave(p,b);return true;}Interior.tick(r,d);return false;}
module.exports={entering,exiting,enter,leave,step};
