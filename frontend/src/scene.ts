import * as T from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { batchRigidParts, prepareOccluders } from './scene-performance';
import { RenderBudget } from './render-budget';
import { WALL_DROP_COUNT, writeWallDrop } from './wall-water';
import { ResidentLife } from './resident-life';
import { IdleDirector, ACTIVITY_LABELS } from './idle-behavior';
import { STATION_LAYOUT, LEFT_BRANCH, RIGHT_FORK, DRIP_TIP, DRIP_INTERVAL, DRIP_GRAVITY } from './habitat-layout';

type FrogInfo={id:number;name:string;daily_pnl:number|null;active:boolean;positions:{symbol:string}[]};
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
let seed=45;
const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
const clamp=T.MathUtils.clamp;
function canvasTexture(draw:(ctx:CanvasRenderingContext2D,n:number)=>void,n=512){const c=document.createElement('canvas');c.width=c.height=n;const ctx=c.getContext('2d')!;draw(ctx,n);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;return tex;}
const bark=()=>canvasTexture((ctx,n)=>{
 ctx.fillStyle='#292b24';ctx.fillRect(0,0,n,n);
 for(let i=0;i<1400;i++){let x=rnd()*n,y=rnd()*n;ctx.strokeStyle=['#101714','#42473a','#575648','#22241f'][i%4];ctx.lineWidth=.6+rnd()*3;ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x+12,y+20,x-12,y+70,x+5,y+100+rnd()*130);ctx.stroke();}
 for(let i=0;i<1800;i++){ctx.fillStyle=`rgba(100,133,47,${rnd()*.35})`;ctx.fillRect(rnd()*n,rnd()*n,rnd()*3,rnd()*7);}
});
function leafTexture(pink=false){return canvasTexture((ctx,n)=>{
 const grad=ctx.createLinearGradient(0,0,n,0);grad.addColorStop(0,pink?'#173d27':'#173f20');grad.addColorStop(.5,pink?'#46763c':'#6e9c37');grad.addColorStop(1,'#153824');ctx.fillStyle=grad;ctx.fillRect(0,0,n,n);
 ctx.strokeStyle=pink?'#ef599d':'#a1b45e';ctx.lineWidth=pink?12:3;ctx.beginPath();ctx.moveTo(n/2,n);ctx.lineTo(n/2,0);ctx.stroke();
 for(let y=30;y<n;y+=55){for(const sign of [-1,1]){ctx.lineWidth=pink?8:1.5;ctx.beginPath();ctx.moveTo(n/2,y+80);ctx.quadraticCurveTo(n/2+sign*80,y+25,n/2+sign*230,y-15);ctx.stroke();if(pink){ctx.lineWidth=3.2;for(let j=1;j<4;j++){ctx.beginPath();ctx.moveTo(n/2+sign*j*50,y+60-j*18);ctx.lineTo(n/2+sign*(j*55+40),y+90-j*10);ctx.stroke();}}}}
 for(let i=0;i<3000;i++){ctx.fillStyle=`rgba(15,35,13,${rnd()*.3})`;ctx.fillRect(rnd()*n,rnd()*n,1+rnd()*3,1+rnd()*3);}
});}
function skinTexture(blue:boolean){return canvasTexture((ctx,n)=>{
 ctx.fillStyle=blue?'#299de9':'#101713';ctx.fillRect(0,0,n,n);
 if(!blue){ctx.fillStyle='#edcb29';for(let i=0;i<3;i++){ctx.beginPath();const y=i*180+15;ctx.moveTo(0,y);for(let x=0;x<=n;x+=8)ctx.lineTo(x,y+18*Math.sin(x/65+i));for(let x=n;x>=0;x-=8)ctx.lineTo(x,y+76+24*Math.sin(x/80+i));ctx.closePath();ctx.fill();}}
 for(let i=0;i<(blue?100:38);i++){const x=rnd()*n,y=rnd()*n;ctx.fillStyle=blue?'#071a2c':'#111d14';ctx.beginPath();ctx.ellipse(x,y,3+rnd()*14,3+rnd()*12,rnd()*3,0,Math.PI*2);ctx.fill();}
 for(let i=0;i<8000;i++){ctx.fillStyle=`rgba(255,255,255,${rnd()*.12})`;ctx.fillRect(rnd()*n,rnd()*n,1,1);}
});}
function leafGeometry(round=false){const geo=new T.BufferGeometry(),verts:number[]=[],uv:number[]=[],idx:number[]=[];const n=14;
 for(let i=0;i<=n;i++){const t=i/n;const width=Math.pow(Math.sin(t*Math.PI),round?.65:.8)*(round?.32:.23);for(let j=0;j<3;j++){const s=j-1;verts.push(s*width,t,Math.sin(t*Math.PI)*.10+Math.abs(s)*.035);uv.push(j/2,t);}}
 for(let i=0;i<n;i++)for(let j=0;j<2;j++){let a=i*3+j;idx.push(a,a+3,a+1,a+1,a+3,a+4);}geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(idx);geo.computeVertexNormals();return geo;}

export class Habitat{
 renderer:T.WebGLRenderer; scene=new T.Scene(); camera=new T.PerspectiveCamera(39,1,.05,65); controls:OrbitControls;
 root=new T.Group(); stations:T.Group[]=[]; frogs:T.Group[]=[]; hands:T.Group[]=[]; monitors:{canvas:HTMLCanvasElement;texture:T.CanvasTexture;agent:number;profit:boolean}[]=[];
 life:ResidentLife[]=[];heads:T.Group[]=[];legs:T.Group[]=[];
 director=new IdleDirector();marketClosed=false;lastStateAt=-Infinity;lifeTime=0;
 wallMoss!:T.InstancedMesh;mossDetailed=new T.IcosahedronGeometry(.035,1);mossSimple=new T.IcosahedronGeometry(.035,0);
 wallDrops!:T.InstancedMesh;wallSample=new Float32Array(5);followAnchor:T.Vector3|null=null;
 drops:T.InstancedMesh; dripBud:T.Mesh; ripples:T.Mesh[]=[];
 fingers:{joint:T.Group;agent:number;hand:number;index:number}[]=[];
 freeCamera=false; cameraOccluders:T.Object3D[]=[]; occlusionTimer=0;
 clearances:T.Box3[]=[]; dropletTransform=new T.Object3D();
 bubbles:HTMLElement[]=[]; selected:number|null=null; targetPos: T.Vector3|null=null; targetLook=V(0,2.4,0);
 raycaster=new T.Raycaster(); pointer=new T.Vector2(); frame=0; disposed=false; lastTime=0; animateHands=true; sound=false;
 charts:Record<string,{date:string;open:number;high:number;low:number;close:number}[]>={};
 info:FrogInfo[]=[]; onSelect:(i:number|null)=>void; host:HTMLElement; clock=new T.Clock();
 materialCache=new Map<string,T.MeshStandardMaterial>();sphereGeometry=new T.SphereGeometry(1,24,16);boxGeometry=new T.BoxGeometry(1,1,1);
 budget=new RenderBudget((navigator.hardwareConcurrency||8)<=4||matchMedia('(pointer:coarse)').matches||((navigator as Navigator & {deviceMemory?:number}).deviceMemory||8)<=4);
 occluders:T.Mesh[]=[];lastVisibilityCamera=V(Infinity,Infinity,Infinity);lastVisibilityTarget=V(Infinity,Infinity,Infinity);lastVisibilityAnchor=V(Infinity,Infinity,Infinity);
 shadowTime=0;labelTime=0;viewportWidth=1;viewportHeight=1;monitorKeys:string[]=[];
 staticMeshes=new Map<T.Material,T.BufferGeometry[]>();
 constructor(host:HTMLElement,onSelect:(i:number|null)=>void){
  this.host=host;this.onSelect=onSelect;
  this.clearances=STATION_LAYOUT.map(([x,y,z,angle])=>{
   const matrix=new T.Matrix4().compose(V(x,y,z),new T.Quaternion().setFromAxisAngle(V(0,1,0),angle),V(.73,.73,.73));
   return new T.Box3(V(-1.02,.74,-1.02),V(1.02,1.85,1.30)).applyMatrix4(matrix);
  });
  this.renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
  this.renderer.setPixelRatio(this.budget.pixelRatio(window.devicePixelRatio,host.clientWidth,host.clientHeight));this.renderer.setClearColor('#101d19');this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.autoUpdate=false;this.renderer.shadowMap.needsUpdate=true;this.renderer.shadowMap.type=T.PCFSoftShadowMap;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.5;
  host.appendChild(this.renderer.domElement);this.camera.position.set(0,4.1,12.6);this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.target.set(0,2.5,0);this.controls.enableDamping=false;this.controls.enablePan=false;this.controls.minDistance=.8;this.controls.maxDistance=40;this.controls.minPolarAngle=.12;this.controls.maxPolarAngle=Math.PI-.12;this.controls.maxAzimuthAngle=Infinity;this.controls.minAzimuthAngle=-Infinity;this.controls.enabled=false;
  this.scene.fog=new T.FogExp2('#10231e',.028);this.scene.add(this.root);this.lighting();this.enclosure();this.plants();this.backWater();this.mergeStatic();
  STATION_LAYOUT.forEach((p,i)=>this.station(i,p));
  const animatedMeshes=new Set<T.Object3D>(this.life.map(rig=>rig.tongue));
  this.stations.forEach(station=>batchRigidParts(station,animatedMeshes));
  this.occluders=prepareOccluders(this.root);this.raycaster.firstHitOnly=true;
  const water=new T.MeshPhysicalMaterial({color:'#bfe6e3',roughness:.12,metalness:.12,transparent:true,opacity:.78,emissive:'#315855',emissiveIntensity:.35});
  this.drops=new T.InstancedMesh(new T.SphereGeometry(.025,12,8),water,4);
  this.drops.instanceMatrix.setUsage(T.DynamicDrawUsage);this.drops.frustumCulled=false;
  this.scene.add(this.drops);
  this.dripBud=this.ball(this.scene,water,V(...DRIP_TIP).add(V(0,-.025,0)),V(.022,.035,.022));
  for(let i=0;i<2;i++){
   const ripple=this.mesh(new T.RingGeometry(.09,.10,40),new T.MeshBasicMaterial({color:'#9bcfc2',transparent:true,opacity:.35,side:T.DoubleSide,depthWrite:false}),this.scene,V(DRIP_TIP[0],.057+i*.001,DRIP_TIP[2]));
   ripple.rotation.x=-Math.PI/2;ripple.castShadow=false;this.ripples.push(ripple);
  }
  this.renderer.domElement.addEventListener('pointerdown',this.click);window.addEventListener('resize',this.resize);new ResizeObserver(this.resize).observe(host);this.resize();this.tick();
 }
 mat(color:string,roughness=.8,metalness=0){const key=`${color}/${roughness}/${metalness}`;if(!this.materialCache.has(key))this.materialCache.set(key,new T.MeshStandardMaterial({color,roughness,metalness}));return this.materialCache.get(key)!;}
 mesh(geo:T.BufferGeometry,mat:T.Material,parent:T.Object3D=this.root,pos=V(),scale=V(1,1,1)){const m=new T.Mesh(geo,mat);m.position.copy(pos);m.scale.copy(scale);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 ball(parent:T.Object3D,mat:T.Material,p:T.Vector3,s:T.Vector3){return this.mesh(this.sphereGeometry,mat,parent,p,s);}
 box(parent:T.Object3D,mat:T.Material,p:T.Vector3,s:T.Vector3){return this.mesh(this.boxGeometry,mat,parent,p,s);}
 tube(points:T.Vector3[],radius:number,mat:T.Material,parent:T.Object3D=this.root,segments=40){return this.mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),segments,radius,9,false),mat,parent);}
 addStatic(mesh:T.Mesh,keepDesksClear=false){mesh.updateMatrixWorld(true);
  if(keepDesksClear&&this.clearances.some(box=>box.intersectsBox(new T.Box3().setFromObject(mesh)))){mesh.removeFromParent();mesh.geometry.dispose();return;}
const geometry=mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);const mat=mesh.material as T.Material;if(!this.staticMeshes.has(mat))this.staticMeshes.set(mat,[]);this.staticMeshes.get(mat)!.push(geometry);mesh.removeFromParent();}
 taperedBranch(points:T.Vector3[],radius:number,material:T.Material){
  const curve=new T.CatmullRomCurve3(points),segments=64,radial=14;
  const geo=new T.TubeGeometry(curve,segments,radius,radial,false),positions=geo.attributes.position as T.BufferAttribute;
  for(let i=0;i<=segments;i++){
   const t=i/segments,center=curve.getPointAt(t),taper=Math.max(.025,Math.pow(1-t,.68));
   for(let j=0;j<=radial;j++){
    const index=i*(radial+1)+j,point=V().fromBufferAttribute(positions,index).sub(center).multiplyScalar(taper).add(center);
    positions.setXYZ(index,point.x,point.y,point.z);
   }
  }
  geo.computeVertexNormals();return this.mesh(geo,material);
 }
 mergeStatic(){this.staticMeshes.forEach((geos,mat)=>{const merged=mergeGeometries(geos,false);if(merged){const m=this.mesh(merged,mat);m.castShadow=false;}geos.forEach(g=>g.dispose());});this.staticMeshes.clear();}
 lighting(){
  this.scene.add(new T.HemisphereLight('#dceee4','#605542',3.2));const light=new T.DirectionalLight('#fff2d0',4.5);light.position.set(-2,8,5);light.castShadow=true;light.shadow.mapSize.set(1024,1024);Object.assign(light.shadow.camera,{left:-5,right:5,top:6,bottom:-4,near:.1,far:22});light.shadow.bias=-.0008;light.shadow.normalBias=.035;this.scene.add(light);
  const rim=new T.SpotLight('#83cda9',28,16,.8,.8,1.4);rim.position.set(1,6,-2);rim.target.position.set(0,1,1);this.scene.add(rim,rim.target);
  const front=new T.PointLight('#d6e5cf',12,12,1.3);front.position.set(0,3,6);this.scene.add(front);
 }
 enclosure(){
  const frame=this.mat('#141e1c',.35,.65),soil=this.mat('#1a2115');const wallTex=bark();wallTex.wrapS=wallTex.wrapT=T.RepeatWrapping;wallTex.repeat.set(3,3);
  const rockMat=new T.MeshStandardMaterial({color:'#455238',map:wallTex,bumpMap:wallTex,bumpScale:.15,roughness:.9});
  this.box(this.root,soil,V(0,-.15,0),V(7.6,.35,4.9));this.box(this.root,rockMat,V(0,2.8,-2.45),V(7.6,5.8,.25));
  const rockGeo=new T.PlaneGeometry(7.6,5.8,70,60);const rv=rockGeo.attributes.position as T.BufferAttribute;
  for(let i=0;i<rv.count;i++){const x=rv.getX(i),y=rv.getY(i);rv.setZ(i,.1+.09*Math.sin(x*9+y*8)+.12*Math.sin(x*3-y*4)+rnd()*.12);}rockGeo.computeVertexNormals();
  const rockFace=this.mesh(rockGeo,rockMat,this.root,V(0,2.8,-2.16));rockFace.receiveShadow=true;
  const wallMoss=this.mat('#283b1d',.98);
  const mossMesh=new T.InstancedMesh(this.mossDetailed,wallMoss,2200);const dummy=new T.Object3D();
  for(let i=0;i<2200;i++){const x=(rnd()-.5)*7.3,y=rnd()*5.5;dummy.position.set(x,y,-1.94+.07*Math.sin(x*9+y*8));dummy.scale.set(1+rnd()*2.5,1+rnd()*2.5,.10+rnd()*.2);dummy.updateMatrix();mossMesh.setMatrixAt(i,dummy.matrix);}this.wallMoss=mossMesh;mossMesh.userData.occlusionBounds=new T.Box3(V(-3.75,0,-2.08),V(3.75,5.6,-1.65));this.root.add(mossMesh);

  for(const x of [-3.85,3.85]){this.box(this.root,frame,V(x,2.8,.05),V(.11,5.9,5.1));}
  for(const y of [-.25,5.65]){this.box(this.root,frame,V(0,y,2.48),V(7.85,.12,.13));this.box(this.root,frame,V(0,y,-2.5),V(7.85,.16,.16));}
  const glass=new T.MeshPhysicalMaterial({color:'#8cbaa9',transparent:true,opacity:.045,roughness:.1,metalness:0,side:T.DoubleSide,depthWrite:false});
  for(const x of [-3.78,3.78]){const g=this.mesh(new T.PlaneGeometry(5,5.7),glass,this.root,V(x,2.7,0));g.rotation.y=Math.PI/2;g.castShadow=false;}
  const lamp=new T.MeshStandardMaterial({color:'#eafff0',emissive:'#d6ffe0',emissiveIntensity:3});
  for(let i=0;i<15;i++)this.box(this.root,lamp,V(-3.4+i*.485,5.50,-.4),V(.16,.035,.13));
  const trunkTex=bark();trunkTex.wrapS=trunkTex.wrapT=T.RepeatWrapping;trunkTex.repeat.set(3,2);
  const trunk=new T.MeshStandardMaterial({map:trunkTex,bumpMap:trunkTex,bumpScale:.36,color:'#a6a18a',roughness:.75});
  this.tube([V(3.1,.08,1.6),V(2.85,1.0,.9),V(2.45,2.10,.05),V(2.88,3.45,-1.15)],.31,trunk).name='right-upright';
  this.tube([V(-2.4,.2,1.7),V(-1.6,.8,1.1),V(0,1.55,.65),V(1.8,2.0,.25),V(2.45,2.10,.05)],.29,trunk).name='main-branch';
  this.tube(RIGHT_FORK.map(p=>V(...p)),.16,trunk).name='right-y-fork';
  this.taperedBranch(LEFT_BRANCH.map(p=>V(...p)),.32,trunk).name='separate-left-branch';
  this.tube([V(-3,.15,-1),V(-2.5,1.1,-1.5),V(-2,2.2,-1.4),V(-2.7,3.5,-1.4)],.17,trunk);
  this.tube([V(-.4,.1,-1),V(-1.1,.65,-.7),V(-.9,1.4,-1)],.13,trunk);
  const pool=this.mesh(new T.CircleGeometry(.68,48),new T.MeshPhysicalMaterial({color:'#183b35',roughness:.12,metalness:.5,transparent:true,opacity:.92}),this.root,V(DRIP_TIP[0],.05,DRIP_TIP[2]));pool.rotation.x=-Math.PI/2;pool.scale.set(1,.65,1);
  const deadTexture=canvasTexture((ctx,n)=>{ctx.fillStyle='#b1a17c';ctx.fillRect(0,0,n,n);for(let i=0;i<12000;i++){ctx.fillStyle=`rgba(55,30,12,${rnd()*.27})`;ctx.fillRect(rnd()*n,rnd()*n,1+rnd()*6,1+rnd()*6);}ctx.strokeStyle='#5f482f';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(n/2,0);ctx.lineTo(n/2,n);ctx.stroke();for(let y=40;y<n;y+=65){for(const sign of [-1,1]){ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(n/2,y);ctx.lineTo(n/2+sign*230,y+110);ctx.stroke();}}});
  const litterTexture=canvasTexture((ctx,n)=>{
   ctx.fillStyle='#5a4027';ctx.fillRect(0,0,n,n);
   for(let i=0;i<260;i++){
    ctx.save();ctx.translate(rnd()*n,rnd()*n);ctx.rotate(rnd()*Math.PI*2);
    ctx.fillStyle=['#765233','#91663c','#ad8653','#62492d'][i%4];ctx.beginPath();ctx.moveTo(0,-28);ctx.bezierCurveTo(32,-12,24,17,0,36);ctx.bezierCurveTo(-22,18,-30,-10,0,-28);ctx.fill();ctx.strokeStyle='#493621';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,-25);ctx.lineTo(0,31);ctx.stroke();ctx.restore();
   }
  });litterTexture.wrapS=litterTexture.wrapT=T.RepeatWrapping;litterTexture.repeat.set(3,2);
  const litterBed=this.mesh(new T.PlaneGeometry(7.48,4.78),new T.MeshStandardMaterial({map:litterTexture,roughness:.9}),this.root,V(0,.035,0));litterBed.rotation.x=-Math.PI/2;
  const deadMaterials=['#8d673c','#967045','#51402c','#ad8350','#6b5538'].map(color=>new T.MeshStandardMaterial({color,map:deadTexture,roughness:.62,side:T.DoubleSide}));deadMaterials.forEach(m=>m.side=T.DoubleSide);const leafGeo=leafGeometry();
  for(let i=0;i<1200;i++){
   const x=(rnd()-.5)*7.35,z=(rnd()-.5)*4.65;
   // Only the small actual pool is open water, rather than the previous wide bare ring.
   if(((x-DRIP_TIP[0])/.67)**2+((z-DRIP_TIP[2])/.43)**2<1)continue;
   const m=this.mesh(leafGeo,deadMaterials[i%5],this.root,V(x,.05+rnd()*.07,z));
   m.rotation.set(-Math.PI/2+(rnd()-.5)*.25,rnd()*.2,rnd()*Math.PI*2);
   m.scale.set(.9+rnd()*.85,.40+rnd()*.52,1);
   const bounds=new T.Box3().setFromObject(m);
   m.position.x+=Math.max(0,-3.73-bounds.min.x)-Math.max(0,bounds.max.x-3.73);
   m.position.z+=Math.max(0,-2.37-bounds.min.z)-Math.max(0,bounds.max.z-2.37);
   this.addStatic(m);
  }
  const moss=this.mat('#526b2d');for(let i=0;i<130;i++){const x=(rnd()-.5)*7,z=(rnd()-.5)*4.5;const m=this.mesh(new T.IcosahedronGeometry(.06+rnd()*.09,0),moss,this.root,V(x,.05,z),V(1,.4+rnd(),1));this.addStatic(m);}
  // Continuous living side walls sit behind the specimen plants, leaving no dark gaps.
  const wallSeed=seed;
  const mossTexture=canvasTexture((ctx,n)=>{
   ctx.fillStyle='#193724';ctx.fillRect(0,0,n,n);
   for(let i=0;i<15000;i++){
    ctx.fillStyle=['#25482b','#3f6033','#52733d','#1b3524','#6c8245'][i%5];
    ctx.beginPath();ctx.ellipse(rnd()*n,rnd()*n,1+rnd()*5,1+rnd()*3,rnd()*Math.PI,0,Math.PI*2);ctx.fill();
   }
  });mossTexture.wrapS=mossTexture.wrapT=T.RepeatWrapping;mossTexture.repeat.set(2,2);
  const livingWall=new T.MeshStandardMaterial({map:mossTexture,color:'#71835c',roughness:.97,side:T.DoubleSide});
  const creeper=new T.MeshStandardMaterial({map:leafTexture(),color:'#587545',roughness:.82,side:T.DoubleSide});
  const vineMat=this.mat('#405a30'),creeperGeo=leafGeometry(true);
  for(const side of [-1,1]){
   const wall=this.mesh(new T.PlaneGeometry(4.78,5.55),livingWall,this.root,V(side*3.73,2.78,-.02));wall.rotation.y=side*Math.PI/2;wall.castShadow=false;
   for(let vine=0;vine<9;vine++){
    const z=-2.12+vine*.53,points=Array.from({length:19},(_,j)=>V(side*(3.66+.025*Math.sin(j+vine)),.08+j*.29,z+Math.sin(j*.6+vine)*.09));
    this.addStatic(this.tube(points,.009,vineMat,this.root,24),true);
    for(let j=1;j<points.length;j++)for(const direction of [-1,1]){
     const size=.20+rnd()*.13,leaf=this.mesh(creeperGeo,creeper,this.root,points[j],V(size,size,size));
     leaf.rotation.set(direction*.65,side*Math.PI/2,direction*.20);this.addStatic(leaf,true);
    }
   }
  }
  seed=wallSeed;
  const stripe=this.mat('#617259',.25,.5);this.box(this.root,stripe,V(0,-.34,2.49),V(7.7,.025,.02));
 }
 backWater(){
  const water=new T.MeshStandardMaterial({color:'#bbd6cb',roughness:.10,metalness:.30,transparent:true,opacity:.64,depthWrite:false});
  this.wallDrops=new T.InstancedMesh(new T.SphereGeometry(1,8,6),water,WALL_DROP_COUNT);
  this.wallDrops.instanceMatrix.setUsage(T.DynamicDrawUsage);this.wallDrops.frustumCulled=false;
  this.wallDrops.userData.occlusionBounds=new T.Box3(V(-3.6,.05,-1.66),V(3.6,5.4,-1.58));
  this.root.add(this.wallDrops);
 }
 plants(){
  const leafGeo=leafGeometry();const green=new T.MeshStandardMaterial({map:leafTexture(),roughness:.57,side:T.DoubleSide,color:'#b1c789'});const pink=new T.MeshStandardMaterial({map:leafTexture(true),roughness:.65,side:T.DoubleSide});const stem=this.mat('#678e3d');
  const putLeaf=(p:T.Vector3,length:number,rot:T.Euler,mat:T.Material=green,width=1)=>{const m=this.mesh(leafGeo,mat,this.root,p,V(length*width,length,length));m.rotation.copy(rot);this.addStatic(m,true);};
  // Arching fern fronds with alternating narrow pinnae.
  const fern=(x:number,y:number,z:number,size:number)=>{
   for(let a=0;a<7;a++){const angle=a/7*Math.PI*2;const height=size*(.65+rnd()*.35);const points=[];for(let j=0;j<=15;j++){const t=j/15;points.push(V(x+Math.cos(angle)*t*t*size*.65,y+Math.sin(t*1.8)*height,z+Math.sin(angle)*t*t*size*.65));}
    this.addStatic(this.tube(points,.011,stem,this.root,20),true);
    for(let j=2;j<15;j++){const t=j/15,p=points[j];for(const sign of [-1,1]){const len=Math.sin(t*Math.PI)*size*.21;putLeaf(p,len,new T.Euler(.2,angle+Math.PI/2,sign*(.8+t*.3)),green,.63);}}
   }
  };
  fern(3.05,2.05,-2.0,2.65);fern(-3.35,.25,-1.7,2.2);fern(-3,2.1,-2.0,1.8);fern(3.35,.2,-.8,1.8);fern(3.2,3.4,-2,1.7);fern(-3.4,1.2,-1.8,1.8);fern(2.9,.2,1.6,1.1);
  // Broad bromeliads at the same upper-left and central-right locations as the reference.
  for(const [x,y,z,s] of [[-2.4,2.55,-1.9,1.45],[.9,2.8,-2.1,1.2],[-2.8,.2,.4,1.3]]){
   for(let j=0;j<12;j++){const angle=j/12*Math.PI*2;putLeaf(V(x,y,z),s*(.65+rnd()*.35),new T.Euler(Math.sin(angle)*.7,angle,Math.cos(angle)*.65),green,.65);}
  }
  // Fittonia: a compact middle-left bush and a taller plant climbing the right wall.
  const fittoniaLeaf=leafGeometry(true);
  const fitLeaf=(point:T.Vector3,length:number,rotation:T.Euler)=>{
   const leaf=this.mesh(fittoniaLeaf,pink,this.root,point,V(length,length,length));leaf.rotation.copy(rotation);
   this.addStatic(leaf,true);
  };
  for(let i=0;i<17;i++){
   const angle=i*2.399,spread=.18+rnd()*.45,base=V(-2.85,.06,.40);
   const tip=V(-2.85+Math.cos(angle)*spread,.82+rnd()*.57,.40+Math.sin(angle)*spread*.7);
   const curve=new T.CatmullRomCurve3([base,base.clone().lerp(tip,.5).add(V(0,.12,0)),tip]);
   this.addStatic(this.mesh(new T.TubeGeometry(curve,12,.012,5,false),stem),true);
   for(let n=1;n<=3;n++)for(const sign of [-1,1]){
    const point=curve.getPoint(n/3);
    fitLeaf(point,.33+rnd()*.19,new T.Euler(.10+Math.cos(angle)*.18,Math.sin(angle)*.48,sign*(.80+rnd()*.45)));
   }
  }
  for(let vine=0;vine<3;vine++){
   const points=Array.from({length:12},(_,i)=>V(3.37+Math.sin(i*.9+vine)*.12,.08+i*.28,.62+vine*.12));
   this.addStatic(this.tube(points,.014,stem,this.root,35),true);
   for(let i=1;i<points.length;i++)for(const sign of [-1,1]){
    fitLeaf(points[i],.37+rnd()*.17,new T.Euler(.12,sign*.18,sign*(.85+Math.sin(i)*.2)));
   }
  }
  // A few low offshoots connect the left bush naturally to the leaf litter.
  for(let i=0;i<7;i++){
   const base=V(-2.7+rnd()*1.4,.10,1.0+rnd()*.45);
   for(const sign of [-1,1])fitLeaf(base,.32+rnd()*.12,new T.Euler(.4,sign*.3,sign*.9));
  }
  // Heart-shaped climbing leaves along the left glass.
  for(let i=0;i<20;i++){const y=.3+i*.22,x=-3.3+Math.sin(i)*.25;putLeaf(V(x,y,.4+Math.cos(i)*.6),.55+rnd()*.35,new T.Euler(.2,.4,Math.sin(i)*.6),green,1.6);}
  // Keep tall ferns confined to the sides; the central rear wall stays mossy.
  // Keep their leaf faces toward the glass, like the long feathered fronds in the reference.
  const plantingSeed=seed;
  const wallFern=(x:number,y:number,z:number,height:number,spread:number)=>{
   for(let frond=0;frond<5;frond++){
    const fan=(frond-2)/2,h=height*(1-Math.abs(fan)*.22);
    const points=Array.from({length:17},(_,i)=>{
     const t=i/16;
     return V(x+fan*spread*Math.pow(t,1.45),y+h*Math.sin(t*1.52),z+.32*t*t+Math.abs(fan)*.08);
    });
    this.addStatic(this.tube(points,.012,stem,this.root,24),true);
    for(let i=2;i<16;i++){
     const t=i/16,length=(.13+.31*Math.sin(t*Math.PI))*(height/2.2);
     for(const sign of [-1,1]){
      putLeaf(points[i].clone().add(V(0,0,.025)),length,new T.Euler(.12+fan*.05,fan*.14,sign*(.96+t*.34)-fan*.18),green,.72);
     }
    }
    putLeaf(points[15],.23,new T.Euler(.16,0,-fan*.45),green,.65);
   }
  };
  wallFern(-3.02,.18,-1.78,2.55,.48);
  wallFern(-3.04,1.80,-1.76,2.52,.43);
  wallFern(-3.12,3.42,-1.55,1.72,.36);
  wallFern(3.02,.20,-1.80,2.65,.46);
  wallFern(2.95,1.96,-1.80,2.80,.52);
  wallFern(3.08,3.42,-1.55,1.85,.36);
  // Long, arching strap leaves emerge behind the left-hand wood.
  const grassMat=this.mat('#567833',.62);
  for(let blade=0;blade<23;blade++){
   const angle=blade*2.399,height=1.15+rnd()*1.55,lean=.30+rnd()*.85;
   const positions:number[]=[],indices:number[]=[],count=20;
   for(let j=0;j<=count;j++){
    const t=j/count,width=.038*Math.sin(Math.PI*t)**.45;
    const x=-1.95+Math.cos(angle)*lean*t*t,y=.10+height*Math.sin(t*1.75),z=-1.55+Math.sin(angle)*lean*t*t;
    for(const side of [-1,1])positions.push(x+side*width,y,z+side*width*.3);
    if(j<count){const k=j*2;indices.push(k,k+2,k+1,k+1,k+2,k+3);}
   }
   const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();grassMat.side=T.DoubleSide;
   this.addStatic(this.mesh(geometry,grassMat),true);
  }
  seed=plantingSeed;
 }
 station(id:number,p:number[]){
  const group=new T.Group();group.position.set(p[0],p[1],p[2]);group.rotation.y=p[3];group.scale.setScalar(.73);group.userData.agent=id;this.scene.add(group);this.stations.push(group);
  const desk=this.mat('#6c4d2e',.56),edge=this.mat('#b0925b'),metal=this.mat('#253734',.33,.7),black=this.mat('#131d21',.5),chair=this.mat('#31433b',.85);
  if(id>=2){
   // The deck's top is exactly at the casters and desk feet, bedded into its supporting branch.
   const platform=new T.Group();platform.name='branch-platform';group.add(platform);
   for(let i=0;i<6;i++)this.box(platform,desk,V(0,-.06,-.76+i*.30),V(1.91,.12,.285));
   for(const x of [-.57,.57])this.box(platform,metal,V(x,-.14,-.01),V(.065,.065,1.84));
  }
  this.box(group,desk,V(0,.82,-.37),V(1.65,.10,.85));this.box(group,edge,V(0,.85,.07),V(1.65,.045,.025));
  for(const x of [-.67,.67])for(const z of [-.65,-.07])this.box(group,metal,V(x,.40,z),V(.045,.8,.045));
  this.box(group,black,V(0,.89,-.07),V(.57,.035,.20));for(let r=0;r<4;r++)for(let k=0;k<11;k++)this.box(group,this.mat('#85998e'),V(-.25+k*.048,.913,-.14+r*.043),V(.031,.008,.024));
  this.ball(group,black,V(.42,.91,-.06),V(.06,.025,.09));
  // Twin monitors face the frog and the over-the-shoulder camera.
  for(let m=0;m<2;m++){
   const x=m===0?-.40:.43;this.box(group,metal,V(x,.94,-.59),V(.25,.035,.18));this.box(group,metal,V(x,1.1,-.70),V(.035,.3,.035));
   const monitor=new T.Group();monitor.name='desk-monitor';monitor.position.set(x,1.33,-.63);monitor.rotation.y=m===0?.14:-.14;group.add(monitor);this.box(monitor,black,V(),V(.78,.49,.055));
   const canvas=document.createElement('canvas');canvas.width=640;canvas.height=384;const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
   const screen=this.mesh(new T.PlaneGeometry(.73,.44),new T.MeshBasicMaterial({map:texture}),monitor,V(0,0,.031));screen.castShadow=false;
   this.monitors.push({canvas,texture,agent:id,profit:m===1});
  }
  // Swivel office chair: cushioned seat, curved back, central stem and five casters.
  this.box(group,chair,V(0,.52,.43),V(.58,.075,.53));const back=this.box(group,chair,V(0,.84,.72),V(.48,.53,.035));back.rotation.x=-.12;
  this.tube([V(-.34,.57,.25),V(-.37,.8,.35),V(-.37,.8,.65)],.028,metal,group);this.tube([V(.34,.57,.25),V(.37,.8,.35),V(.37,.8,.65)],.028,metal,group);
  this.tube([V(0,.12,.43),V(0,.49,.43)],.045,metal,group,3);
  for(let j=0;j<5;j++){const a=j*2*Math.PI/5,x=Math.cos(a)*.40,z=.43+Math.sin(a)*.40;this.tube([V(0,.15,.43),V(x,.08,z)],.025,metal,group,3);this.ball(group,black,V(x,.045,z),V(.055,.045,.055));}
  this.frog(group,id);
  const mugMat=this.mat(id%2?'#82baca':'#c8b55b'),mug=new T.Group();mug.position.set(-.66,.94,-.02);group.add(mug);
  this.mesh(new T.CylinderGeometry(.065,.055,.12,18),mugMat,mug);
  const handle=this.mesh(new T.TorusGeometry(.04,.012,8,16),mugMat,mug,V(-.07,.01,0));handle.rotation.y=Math.PI/2;
  const coffee=this.mesh(new T.CircleGeometry(.054,18),this.mat('#3b2415',.3),mug,V(0,.061,0));coffee.rotation.x=-Math.PI/2;
  const skin=(this.frogs[id].children[0] as T.Mesh).material as T.Material;
  this.life.push(new ResidentLife(id,group,this.frogs[id],this.heads[id],this.hands.slice(id*2,id*2+2),this.legs.slice(id*2,id*2+2),mug,skin));
  const label=document.createElement('button');label.className=`frog-label frog-${id}`;label.setAttribute('aria-label',`Visit ${['Mac','Cobalt','Cheese','Bluey'][id]}'s desk`);label.innerHTML=`<span class="label-dot ${id%2?'blue':'yellow'}"></span><span>${['Mac','Cobalt','Cheese','Bluey'][id]}</span><strong>—</strong><small class="frog-mood"></small>`;label.onclick=()=>this.select(id);this.host.append(label);this.bubbles.push(label);
 }
 frog(parent:T.Group,id:number){
  const blue=id%2===1,skin=new T.MeshPhysicalMaterial({map:skinTexture(blue),roughness:.38,clearcoat:.65,clearcoatRoughness:.27,color:blue?'#9ecdf8':'#fff4b0'});
  const belly=this.mat(blue?'#6996a1':'#827b3d',.55);const black=this.mat('#030c0a',.09);const eyeRim=this.mat(blue?'#4986b1':'#b9a22c',.3);
  const frog=new T.Group();parent.add(frog);this.frogs.push(frog);
  this.ball(frog,skin,V(0,.83,.37),V(.215,.33,.185));this.ball(frog,belly,V(0,.86,.205),V(.165,.26,.055));
  this.ball(frog,skin,V(0,1.14,.22),V(.295,.19,.235));this.ball(frog,skin,V(0,1.07,.015),V(.25,.085,.14));
  // Wide raised eyes and horizontal glints preserve dart-frog anatomy.
  for(const x of [-.225,.225]){
   this.ball(frog,skin,V(x,1.285,.145),V(.132,.14,.13));this.ball(frog,eyeRim,V(x,1.29,.044),V(.095,.09,.065)).userData.eye=true;this.ball(frog,black,V(x,1.293,.005),V(.069,.072,.031)).userData.eye=true;
   this.ball(frog,new T.MeshBasicMaterial({color:'#f6fff3'}),V(x-.022,1.32,-.019),V(.018,.019,.008)).userData.eye=true;
   this.ball(frog,black,V(x*.45,1.11,-.12),V(.011,.008,.007));
  }
  this.tube([V(-.25,1.04,-.045),V(0,1.013,-.12),V(.25,1.04,-.045)],.007,this.mat('#1f3426'),frog,20);
  const headParts=frog.children.slice(2),head=new T.Group();head.position.set(0,1.14,.22);frog.add(head);headParts.forEach(part=>head.attach(part));this.heads.push(head);
  for(const sign of [-1,1]){
   const legStart=frog.children.length;
   this.ball(frog,skin,V(sign*.215,.65,.30),V(.15,.15,.18));this.tube([V(sign*.32,.62,.22),V(sign*.36,.37,.2),V(sign*.29,.29,-.01)],.055,skin,frog,15);
   for(let t=0;t<3;t++){const x=sign*(.22+t*.08);this.tube([V(sign*.29,.29,-.01),V(x,.25,-.17),V(x+sign*.03,.26,-.24)],.017,skin,frog,8);this.ball(frog,skin,V(x+sign*.03,.26,-.24),V(.025,.012,.034));}
   const legParts=frog.children.slice(legStart),leg=new T.Group();leg.position.set(sign*.215,.65,.30);frog.add(leg);legParts.forEach(part=>leg.attach(part));this.legs.push(leg);
   const arm=new T.Group();arm.position.set(sign*.21,1.00,.27);frog.add(arm);this.hands.push(arm);
   const local=(point:T.Vector3)=>point.clone().sub(arm.position);
   this.tube([V(sign*.21,1.00,.27),V(sign*.34,.86,.12),V(sign*.21,.943,-.04)].map(local),.034,skin,arm,20);
   this.ball(arm,skin,local(V(sign*.21,.943,-.04)),V(.065,.025,.047));
   for(let index=0;index<4;index++){
    const x=sign*(.145+index*.038),joint=new T.Group();joint.position.copy(local(V(x,.94,-.062)));arm.add(joint);
    this.tube([V(),V(sign*.006,-.007,-.035),V(sign*.012,-.009,-.085)],.008,skin,joint,7);
    this.ball(joint,skin,V(sign*.012,-.009,-.085),V(.012,.007,.017));
    this.fingers.push({joint,agent:id,hand:sign,index});
   }

  }
 }
 drawMonitors(){
  for(const [index,m] of this.monitors.entries()){const agent=this.info[m.agent],symbol=agent?.positions[0]?.symbol||'SPY',bars=this.charts[symbol]||[],key=JSON.stringify([agent?.name,agent?.daily_pnl,agent?.active,symbol,bars.length,bars.at(-1)]);if(this.monitorKeys[index]===key)continue;this.monitorKeys[index]=key;const ctx=m.canvas.getContext('2d')!,a=this.info[m.agent];ctx.fillStyle='#0b1a20';ctx.fillRect(0,0,640,384);ctx.fillStyle='#8da69c';ctx.font='20px monospace';ctx.fillText('TERRARIUM  /  PAPER',25,35);ctx.fillStyle='#25403d';ctx.fillRect(25,52,590,1);
   if(m.profit){ctx.fillStyle='#c0cfc6';ctx.font='22px sans-serif';ctx.fillText('SESSION P&L',30,105);ctx.fillStyle='#a8db9c';ctx.font='bold 66px sans-serif';ctx.fillText(a?.daily_pnl==null?'—':`${a.daily_pnl<0?'−':'+'}$${Math.abs(a.daily_pnl).toFixed(2)}`,30,185);ctx.fillStyle='#66857d';ctx.font='19px monospace';ctx.fillText(a?.active?'ORDER IN PROGRESS':'WAITING FOR SIGNAL',30,244);ctx.fillText(a?.name.toUpperCase()||'PAPER AGENT',30,330);}
   else {const symbol=a?.positions[0]?.symbol||'SPY';const bars=this.charts[symbol]||[];
    ctx.fillStyle='#dee7dc';ctx.font='bold 28px sans-serif';ctx.fillText(symbol+' / DAILY',25,95);ctx.fillStyle='#6e9182';ctx.font='17px monospace';ctx.fillText(bars.length?'HISTORICAL CLOSE · '+bars[bars.length-1].date:'AWAITING VERIFIED PRICE HISTORY',25,123);
    for(let j=0;j<4;j++){ctx.fillStyle='#1a3033';ctx.fillRect(25,160+j*45,590,1);}
    if(bars.length){const visible=bars.slice(-35),low=Math.min(...visible.map(b=>b.low)),high=Math.max(...visible.map(b=>b.high));const y=(price:number)=>320-(price-low)/Math.max(high-low,.01)*155;
     visible.forEach((bar,j)=>{ctx.fillStyle=bar.close>=bar.open?'#91c69b':'#d3a282';ctx.fillRect(30+j*16,y(bar.high),1,y(bar.low)-y(bar.high));ctx.fillRect(26+j*16,Math.min(y(bar.open),y(bar.close)),9,Math.max(2,Math.abs(y(bar.open)-y(bar.close))));});
    }else{ctx.fillStyle='#456359';ctx.font='20px sans-serif';ctx.fillText('Research first. Then let it grow.',95,238);}
   }
   m.texture.needsUpdate=true;
  }
 }
 setCharts(charts:Record<string,{date:string;open:number;high:number;low:number;close:number}[]>){if(JSON.stringify(this.charts)!==JSON.stringify(charts))this.monitorKeys=[];this.charts=charts;this.drawMonitors();}
 update(info:FrogInfo[],marketClosed=false){this.info=info;this.marketClosed=marketClosed;this.lastStateAt=performance.now();this.drawMonitors();info.forEach((a,i)=>{const label=this.bubbles[i];label.querySelector('strong')!.textContent=a.daily_pnl==null?'—':`${a.daily_pnl<0?'−':'+'}$${Math.abs(a.daily_pnl).toFixed(0)}`;label.classList.toggle('trading',a.active);});}
 restoreOccluders(){this.cameraOccluders.forEach(object=>object.visible=true);this.cameraOccluders=[];}
 select(id:number|null){
  this.selected=id;this.lastVisibilityCamera.set(Infinity,Infinity,Infinity);this.followAnchor=null;this.freeCamera=false;this.restoreOccluders();this.controls.enabled=false;
  this.controls.enablePan=false;this.controls.minDistance=.8;this.controls.maxDistance=40;
  this.host.dataset.cameraMode=id===null?'overview':'desk';this.bubbles.forEach(label=>{label.style.opacity=id===null?'1':'0';label.style.pointerEvents=id===null?'auto':'none';});this.onSelect(id);
  if(id===null){this.targetPos=this.overviewPosition();this.targetLook=V(0,2.5,0);}
  else this.deskView();
 }
 deskView(){
  if(this.selected===null)return;
  this.freeCamera=false;this.controls.enabled=false;this.restoreOccluders();
  const station=this.stations[this.selected];station.updateMatrixWorld(true);
  this.targetPos=station.localToWorld(V(.95,2.32,1.92));
  this.targetLook=station.localToWorld(V(0,1.12,-.28));
  this.host.dataset.cameraMode='desk';
 }
 setFreeCamera(enabled:boolean){
  if(this.selected===null)return;
  if(!enabled){this.deskView();return;}
  // Recenter orbit on the resident, without jumping the camera or limiting azimuth.
  this.freeCamera=true;this.targetPos=null;
  this.controls.target.copy(this.life[this.selected].anchor());this.followAnchor=this.life[this.selected].anchor();
  this.controls.minAzimuthAngle=-Infinity;this.controls.maxAzimuthAngle=Infinity;
  this.controls.minPolarAngle=.12;this.controls.maxPolarAngle=Math.PI-.12;
  this.controls.minDistance=.45;this.controls.maxDistance=4;
  this.controls.enablePan=true;this.controls.panSpeed=.55;this.controls.rotateSpeed=.65;
  this.controls.enabled=true;this.controls.update();this.host.dataset.cameraMode='free';
 }
 clearCameraSightline(){
  this.restoreOccluders();
  if(this.selected===null)return;
  const station=this.stations[this.selected];
  // Temporarily remove foreground habitat pieces when orbiting through the enclosure.
  // Resident meshes and monitors remain intact; the overview restores every plant and wall.
  const rig=this.life[this.selected],body=rig.hunter.visible?rig.hunter:rig.seated;
  const bodyPoints=rig.hunter.visible?[V(0,.30,.12),V(-.32,.16,.35),V(.32,.16,.35),V(-.30,.05,-.25),V(.30,.05,-.25)]:[V(0,.83,.37),V(-.24,.65,.30),V(.24,.65,.30)];
  const targets=[station.worldToLocal(rig.anchor()),...bodyPoints.map(point=>station.worldToLocal(body.localToWorld(point))),V(-.40,1.33,-.60),V(.43,1.33,-.60)];
  for(const point of targets){
   const target=station.localToWorld(point),direction=target.clone().sub(this.camera.position),distance=direction.length();
   this.raycaster.set(this.camera.position,direction.normalize());this.raycaster.far=Math.max(0,distance-.08);
   for(const hit of this.raycaster.intersectObjects(this.occluders.filter(mesh=>mesh.visible),false)){
    if(hit.object.visible){hit.object.visible=false;this.cameraOccluders.push(hit.object);}
   }
  }
  if(this.freeCamera){
   // Monitor backs should not conceal the resident's face when orbiting in front.
   const monitors=station.children.filter(child=>child.name==='desk-monitor');
   const rig=this.life[this.selected],head=rig.hunter.visible?rig.head:rig.seatedHead;
   for(const point of [V(0,0,-.20),V(-.225,.15,-.20),V(.225,.15,-.20),V(0,-.10,-.26),V(-.25,-.05,-.20),V(.25,-.05,-.20)]){
    const target=head.localToWorld(point),direction=target.clone().sub(this.camera.position);
    this.raycaster.set(this.camera.position,direction.clone().normalize());this.raycaster.far=direction.length()-.02;
    for(const monitor of monitors){
     if(monitor.visible&&this.raycaster.intersectObject(monitor,true).length){monitor.visible=false;this.cameraOccluders.push(monitor);}
    }
   }
  }
  this.raycaster.far=Infinity;
  this.lastVisibilityCamera.copy(this.camera.position);this.lastVisibilityTarget.copy(this.controls.target);this.lastVisibilityAnchor.copy(this.life[this.selected].anchor());
 }
 click=(event:PointerEvent)=>{
  // A drag in a desk view belongs exclusively to OrbitControls.
  if(this.selected!==null)return;
  const rect=this.renderer.domElement.getBoundingClientRect();
  this.pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
  this.raycaster.setFromCamera(this.pointer,this.camera);
  const hits=this.raycaster.intersectObjects(this.stations,true);
  if(hits.length){let object:T.Object3D|null=hits[0].object;while(object&&object.userData.agent===undefined)object=object.parent;if(object)this.select(object.userData.agent);}
 };
 overviewPosition(){const z=Math.max(12.6,4.35/(Math.tan(T.MathUtils.degToRad(this.camera.fov/2))*this.camera.aspect));return V(0,2.5+z*.127,z);}
 applyRenderBudget(){
  this.host.dataset.renderTier=String(this.budget.tier);const mossGeometry=this.budget.tier===0?this.mossSimple:this.mossDetailed;if(this.wallMoss.geometry!==mossGeometry)this.wallMoss.geometry=mossGeometry;
  const ratio=this.budget.pixelRatio(window.devicePixelRatio,this.viewportWidth,this.viewportHeight);
  if(Math.abs(this.renderer.getPixelRatio()-ratio)>.02)this.renderer.setPixelRatio(ratio);
  const shadows=this.budget.tier>0;if(this.renderer.shadowMap.enabled!==shadows){this.renderer.shadowMap.enabled=shadows;this.renderer.shadowMap.needsUpdate=true;const materials=new Set<T.Material>();this.scene.traverse(object=>{if(object instanceof T.Mesh)for(const material of Array.isArray(object.material)?object.material:[object.material])materials.add(material);});materials.forEach(material=>material.needsUpdate=true);}
 }
 resize=()=>{const w=this.host.clientWidth,h=this.host.clientHeight;if(!w||!h)return;const changed=w!==this.viewportWidth||h!==this.viewportHeight;this.viewportWidth=w;this.viewportHeight=h;this.applyRenderBudget();if(!changed)return;this.camera.aspect=w/h;this.camera.updateProjectionMatrix();if(this.selected===null){this.camera.position.copy(this.overviewPosition());this.controls.target.set(0,2.5,0);this.targetPos=null;}this.renderer.setSize(w,h);};
 tick=()=>{if(this.disposed)return;this.frame=requestAnimationFrame(this.tick);if(document.hidden||!this.host.offsetParent){this.clock.getDelta();return;}const elapsed=this.clock.getDelta(),dt=Math.min(elapsed,.08),t=this.clock.elapsedTime;
  if(this.budget.sample(elapsed))this.applyRenderBudget();
  if(this.targetPos){this.camera.position.lerp(this.targetPos,1-Math.exp(-elapsed*3));this.controls.target.lerp(this.targetLook,1-Math.exp(-elapsed*3));if(this.camera.position.distanceTo(this.targetPos)<.006&&this.controls.target.distanceTo(this.targetLook)<.006){this.camera.position.copy(this.targetPos);this.controls.target.copy(this.targetLook);this.targetPos=null;}}
  this.controls.update();
  this.lifeTime+=Math.min(elapsed,.25);
  const allowIdle=this.marketClosed&&performance.now()-this.lastStateAt<20000;
  const activities=this.director.step(elapsed,allowIdle,this.info.map(agent=>agent.active));
  this.frogs.forEach((frog,i)=>{
   frog.scale.y=1+Math.sin(t*1.4+i)*.007;
   const active=this.info[i]?.active;
   // Quiet keyboard practice remains visible while markets are closed; activity indicators
   // still come exclusively from real order state, never from the decorative animation.
   const rhythm=active?9:4.2,amount=active?.036:.020;
   for(let side=0;side<2;side++){
    const hand=this.hands[i*2+side],phase=t*rhythm+i*1.7+side*Math.PI;
    hand.position.y=1.00+(activities[i].action==='desk'?Math.max(0,Math.sin(phase))*amount:0);
    hand.rotation.set(Math.sin(phase)*.022,0,0);
   }
  });
  this.fingers.forEach(({joint,agent,hand,index})=>{
   const speed=this.info[agent]?.active?15:6.0;
   joint.rotation.x=activities[agent].action==='desk'?-Math.max(0,Math.sin(t*speed+agent*1.3+hand*1.1+index*.85))*.19:0;
  });
  this.life.forEach((rig,i)=>{
   const activity=activities[i];rig.tick(activity.action,activity.elapsed,activity.duration,this.lifeTime,allowIdle&&this.info[i]?.active===false);
   const label=this.bubbles[i],mood=label.querySelector('.frog-mood')!;
   const description=activity.action==='desk'?'':ACTIVITY_LABELS[activity.action];if(mood.textContent!==description)mood.textContent=description;
   label.dataset.activity=activity.action;
  });
  if(this.selected!==null){
   const rig=this.life[this.selected],anchor=rig.anchor();
   if(this.freeCamera&&this.followAnchor){const shift=anchor.clone().sub(this.followAnchor);this.camera.position.add(shift);this.controls.target.add(shift);this.followAnchor.copy(anchor);}
   else if(activities[this.selected].action==='hunt'){
    this.targetLook.copy(anchor);this.targetPos=anchor.clone().add(V(.75,.95,1.65).applyQuaternion(this.stations[this.selected].quaternion));
   }else if(rig.lastAction==='desk'&&this.host.dataset.followingHunt==='true')this.deskView();
   this.host.dataset.followingHunt=String(activities[this.selected].action==='hunt');
  }
  for(let i=0;i<this.wallDrops.count;i++){
   writeWallDrop(i,t,this.wallSample);
   this.dropletTransform.position.set(this.wallSample[0],this.wallSample[1],this.wallSample[2]);this.dropletTransform.scale.set(this.wallSample[3],this.wallSample[4],this.wallSample[3]*.7);
   this.dropletTransform.updateMatrix();this.wallDrops.setMatrixAt(i,this.dropletTransform.matrix);
  }
  this.wallDrops.instanceMatrix.needsUpdate=true;
  const flight=Math.sqrt(2*(DRIP_TIP[1]-.06)/DRIP_GRAVITY);
  for(let i=0;i<this.drops.count;i++){
   const age=(t+i*DRIP_INTERVAL)%(this.drops.count*DRIP_INTERVAL),visible=age<flight;
   this.dropletTransform.position.set(DRIP_TIP[0],DRIP_TIP[1]-.5*DRIP_GRAVITY*age*age,DRIP_TIP[2]);
   this.dropletTransform.scale.set(visible?.75:0,visible?1.15+age*.22:0,visible?.75:0);
   this.dropletTransform.updateMatrix();this.drops.setMatrixAt(i,this.dropletTransform.matrix);
  }
  this.drops.instanceMatrix.needsUpdate=true;
  const forming=(t%DRIP_INTERVAL)/DRIP_INTERVAL;this.dripBud.scale.set(.012+forming*.011,.016+forming*.024,.012+forming*.011);
  this.ripples.forEach((ripple,i)=>{
   const age=((t-flight+DRIP_INTERVAL*10)%DRIP_INTERVAL)/DRIP_INTERVAL;
   const expansion=(age+i*.25)%1;ripple.scale.setScalar(.4+expansion*4.8);
   (ripple.material as T.MeshBasicMaterial).opacity=(1-expansion)*.28;
  });
  if(this.selected!==null&&t-this.occlusionTimer>.10&&(this.camera.position.distanceToSquared(this.lastVisibilityCamera)>.0002||this.controls.target.distanceToSquared(this.lastVisibilityTarget)>.0002||this.life[this.selected].anchor().distanceToSquared(this.lastVisibilityAnchor)>.0002)){this.clearCameraSightline();this.occlusionTimer=t;}
  if(this.selected===null&&t-this.labelTime>1/30){this.labelTime=t;this.bubbles.forEach((el,i)=>{const p=this.life[i].anchor().add(V(0,.48,0));p.project(this.camera);el.style.transform=`translate(-50%,-50%) translate(${(p.x*.5+.5)*this.viewportWidth}px,${(-p.y*.5+.5)*this.viewportHeight}px)`;});}
  if(this.renderer.shadowMap.enabled&&t-this.shadowTime>1/12){this.renderer.shadowMap.needsUpdate=true;this.shadowTime=t;}
  this.renderer.render(this.scene,this.camera);
 };
}
