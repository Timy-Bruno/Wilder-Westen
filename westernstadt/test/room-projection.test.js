const test=require('node:test'),assert=require('node:assert/strict'),P=require('../public/room-projection');
test('camera-aligned input projects back toward the screen direction',()=>{for(const [x,y] of [[1,0],[0,-1],[-1,.5],[.3,.8]]){const w=P.toWorld(x,y),s=P.project(w.x,w.y);assert(Math.hypot(w.x,w.y)<=1.00001);assert(Math.abs(s.x*y-s.y*x)<1e-8);assert(s.x*x+s.y*y>0);}});
test('neutral input stays neutral and projection preserves independent axes',()=>{assert.deepEqual(P.toWorld(0,0),{x:0,y:0});const a=P.project(1,0),b=P.project(0,1);assert(Math.abs(a.x*b.y-a.y*b.x)>.1);});
