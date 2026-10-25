import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
const bundle=await build({stdin:{contents:"export {ResidentLife} from './src/resident-life';export {STATION_LAYOUT} from './src/habitat-layout';export * as T from 'three';",resolveDir:fileURLToPath(new URL('.',import.meta.url))},bundle:true,write:false,platform:'node',format:'esm'});
const {ResidentLife,STATION_LAYOUT,T}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
function fixture(id){
 const station=new T.Group(),[x,y,z,angle]=STATION_LAYOUT[id];station.position.set(x,y,z);station.scale.setScalar(.73);station.rotation.y=angle;
 const seated=new T.Group(),head=new T.Group(),arms=[new T.Group(),new T.Group()],legs=[new T.Group(),new T.Group()],mug=new T.Group();
 station.add(seated,mug);seated.add(head,...arms,...legs);head.position.set(0,1.14,.22);arms.forEach((arm,i)=>arm.position.set(i?.21:-.21,1,.27));
 const material=new T.MeshStandardMaterial(),table=new T.Mesh(new T.BoxGeometry(1.65,.10,.85),material);table.position.set(0,.82,-.37);station.add(table);
 const rig=new ResidentLife(id,station,seated,head,arms,legs,mug,material);return {rig,table};
}
test('hunting routes remain inside the tank and clear the desk surfaces',()=>{
 const issues=[];
 for(let id=0;id<4;id++){
  const {rig,table}=fixture(id),deskBox=new T.Box3().setFromObject(table);
  for(const phase of [.07,.10,.14,.18,.20,.30,.40,.50,.60,.70,.77,.82,.90,.94]){
   rig.tick('hunt',phase*20,20,phase*20,true);
   const box=new T.Box3().setFromObject(rig.hunter,true);
   if(!(box.min.x>=-3.8&&box.max.x<=3.8&&box.min.z>=-2.4&&box.max.z<=2.48))issues.push(`resident ${id} outside glass at ${phase}: ${JSON.stringify(box)}`);
   if(box.intersectsBox(deskBox))issues.push(`resident ${id} intersects desk at ${phase}`);
  }
 }
 assert.deepEqual(issues,[]);
});
test('caught flies stay eaten for the routine, and idle props reset when work resumes',()=>{
 for(let id=0;id<4;id++){
  const {rig}=fixture(id);rig.tick('hunt',.32*20,20,5,true);assert.equal(rig.flies[0].visible,false);
  rig.tick('hunt',.40*20,20,7,true);assert.equal(rig.flies[0].visible,false);
  rig.tick('coffee',10,20,10,true);assert.ok(rig.mug.position.distanceTo(new T.Vector3(-.66,.94,-.02))>.25);
  rig.tick('desk',0,0,11,false);assert.ok(rig.seated.visible&&!rig.hunter.visible&&!rig.tongue.visible);assert.ok(rig.flies.every(fly=>!fly.visible));
  assert.equal(rig.seated.position.length(),0);assert.equal(rig.mug.position.distanceTo(new T.Vector3(-.66,.94,-.02)),0);
 }
});
