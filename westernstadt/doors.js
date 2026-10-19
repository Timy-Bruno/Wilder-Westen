const Interior=require('./interior');
// Only crossings count: standing near a doorway never changes rooms.
function entering(b,from,to){const y=b.y+b.h+16;if(!(from.y>=y&&to.y<=y&&to.y<from.y))return false;const t=(from.y-y)/(from.y-to.y);const x=from.x+(to.x-from.x)*t;return Math.abs(x-(b.x+b.w/2))<=18;}
function exiting(from,to){if(!(from.y<=573&&to.y>=573&&to.y>from.y))return false;const t=(573-from.y)/(to.y-from.y);return Math.abs(from.x+(to.x-from.x)*t-400)<=36;}
function enter(p){p.inside=3;p.interior=Interior.create();p.dx=p.dy=0;}
function leave(p,b){p.inside=null;p.interior=null;p.x=b.x+b.w/2;p.y=b.y+b.h+42;p.dx=p.dy=0;}
module.exports={entering,exiting,enter,leave};
