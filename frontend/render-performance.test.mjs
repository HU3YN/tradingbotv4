import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
const code=await build({stdin:{contents:"export * from './src/render-budget';export * from './src/wall-water';export * from './src/scene-performance';export * as T from 'three';",resolveDir:fileURLToPath(new URL('.',import.meta.url))},bundle:true,write:false,platform:'node',format:'esm'});
const {RenderBudget,WALL_DROP_COUNT,writeWallDrop,batchRigidParts,prepareOccluders,T}=await import('data:text/javascript;base64,'+Buffer.from(code.outputFiles[0].text).toString('base64'));
test('water covers the back wall at multiple times and stays on its surface',()=>{
 const out=new Float32Array(5);
 for(const time of [0,7,29,80]){
  const cells=new Set();
  for(let i=0;i<WALL_DROP_COUNT;i++){
   writeWallDrop(i,time,out);assert.ok([...out].every(Number.isFinite));
   assert.ok(out[0]>=-3.6&&out[0]<=3.6&&out[1]>=.1&&out[1]<=5.4);assert.ok(out[2]>=-1.66&&out[2]<=-1.58);
   assert.ok(out[3]>=0&&out[4]>=0);cells.add(`${Math.min(3,Math.floor((out[0]+3.6)/1.8))}/${Math.min(3,Math.floor(out[1]/1.35))}`);
  }
  assert.ok(cells.size>=15,`Wall coverage at ${time}: ${cells.size}/16 cells`);
 }
});
test('quality adapts to sustained slowness without oscillating on isolated stalls',()=>{
 const budget=new RenderBudget();for(let i=0;i<150;i++)budget.sample(1/60);
 budget.sample(.12);assert.equal(budget.tier,2);
 for(let i=0;i<200;i++)budget.sample(.06);assert.equal(budget.tier,0);
 for(let i=0;i<60;i++)budget.sample(1/60);assert.equal(budget.tier,0);
 for(let i=0;i<1500;i++)budget.sample(1/60);assert.equal(budget.tier,1);
 const ratio=budget.pixelRatio(3,2000,1500);assert.ok(2000*1500*ratio**2<=850001);
 const verySlow=new RenderBudget();for(let i=0;i<30;i++)verySlow.sample(1.2);assert.equal(verySlow.tier,0);
});
test('batching preserves animated eyes and props plus world-space bounds',()=>{
 const group=new T.Group(),material=new T.MeshStandardMaterial(),geometry=new T.BoxGeometry(.2,.2,.2);
 for(let i=0;i<40;i++){const part=new T.Mesh(geometry,material);part.position.set(i*.1,0,0);group.add(part);}
 const eye=new T.Mesh(geometry,material);eye.userData.eye=true;group.add(eye);
 const tongue=new T.Mesh(geometry,material);group.add(tongue);
 const before=new T.Box3().setFromObject(group);batchRigidParts(group,new Set([tongue]));
 const after=new T.Box3().setFromObject(group);assert.ok(before.min.distanceTo(after.min)<1e-6&&before.max.distanceTo(after.max)<1e-6);
 assert.equal(group.children.length,3);assert.equal(eye.parent,group);assert.equal(tongue.parent,group);
 eye.scale.y=.1;tongue.position.y=.5;assert.equal(eye.scale.y,.1);assert.equal(tongue.position.y,.5);
});
test('accelerated foliage picks the same surface as the original triangle query',()=>{
 const root=new T.Group(),mesh=new T.Mesh(new T.SphereGeometry(1,32,24),new T.MeshBasicMaterial());root.add(mesh);root.updateMatrixWorld(true);
 const ray=new T.Raycaster(new T.Vector3(.1,.2,4),new T.Vector3(0,0,-1));const before=ray.intersectObject(root)[0];
 const candidates=prepareOccluders(root);ray.firstHitOnly=true;const after=ray.intersectObjects(candidates,false)[0];
 assert.ok(Math.abs(before.distance-after.distance)<1e-6);assert.equal(after.object,mesh);
});
