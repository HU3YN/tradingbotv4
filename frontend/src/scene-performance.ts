import * as T from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';

/** Merge only rigid siblings. Animated pivots, eyes, fingers, props, and ownership survive. */
export function batchRigidParts(parent:T.Object3D,excluded:Set<T.Object3D>){
 for(const child of [...parent.children])if(!(child instanceof T.Mesh))batchRigidParts(child,excluded);
 const buckets=new Map<string,T.Mesh[]>();
 for(const child of parent.children){
  if(!(child instanceof T.Mesh)||child instanceof T.InstancedMesh||Array.isArray(child.material)||child.userData.eye||excluded.has(child))continue;
  const key=`${child.material.id}/${child.castShadow}/${child.receiveShadow}/${child.visible}`;
  if(!buckets.has(key))buckets.set(key,[]);buckets.get(key)!.push(child);
 }
 for(const meshes of buckets.values()){
  if(meshes.length<2)continue;
  const geometries=meshes.map(mesh=>{mesh.updateMatrix();return mesh.geometry.clone().applyMatrix4(mesh.matrix);});
  const geometry=mergeGeometries(geometries,false);geometries.forEach(geo=>geo.dispose());
  if(!geometry)continue;
  const first=meshes[0],batch=new T.Mesh(geometry,first.material);batch.castShadow=first.castShadow;batch.receiveShadow=first.receiveShadow;batch.visible=first.visible;
  batch.name='rigid-detail-batch';parent.add(batch);meshes.forEach(mesh=>mesh.removeFromParent());
 }
}

/** Static triangle trees make visibility queries independent of total foliage density. */
export function prepareOccluders(root:T.Object3D):T.Mesh[]{
 const meshes:T.Mesh[]=[];
 root.traverse(object=>{
  if(!(object instanceof T.Mesh))return;
  if(object instanceof T.InstancedMesh){
   const bounds=object.userData.occlusionBounds as T.Box3|undefined;
   if(!bounds)return;
   // Moss and droplets occupy a thin wall slab: don't test thousands of tiny instances.
   const point=new T.Vector3();object.raycast=(raycaster,hits)=>{
    if(!raycaster.ray.intersectBox(bounds,point))return;
    const distance=raycaster.ray.origin.distanceTo(point);
    if(distance>=raycaster.near&&distance<=raycaster.far)hits.push({distance,point:point.clone(),object});
   };
  }else if(object.geometry.attributes.position.count>128){
   if(!object.geometry.boundsTree)object.geometry.boundsTree=new MeshBVH(object.geometry,{targetLeafSize:12});
   object.raycast=acceleratedRaycast;
  }
  meshes.push(object);
 });
 return meshes;
}
