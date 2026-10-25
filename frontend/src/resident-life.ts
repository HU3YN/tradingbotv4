import * as T from 'three';
import { LEFT_BRANCH, RIGHT_FORK } from './habitat-layout';
import type { IdleAction } from './idle-behavior';
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
const ease=(x:number)=>{x=T.MathUtils.clamp(x,0,1);return x*x*(3-2*x);};
const routes:number[][][]=[
 [[-.60,.15,1.85],[-.80,.15,2.00],[-.35,.15,1.80],[-.70,.15,1.65]],
 [[.60,.15,1.85],[.80,.15,2.00],[.35,.15,1.80],[.70,.15,1.65]],
 [[-.98,2.95,-.48],[-.78,2.82,-.43],[-.56,2.69,-.36],[-.86,2.87,-.45]],
 [[3.18,3.21,-1.05],[3.15,3.24,-1.24],[3.18,3.22,-1.14],[3.14,3.25,-1.30]],
];

/** A visual rig owned by one resident. All paths return to that resident's own chair. */
export class ResidentLife {
 hunter=new T.Group();head=new T.Group();limbs:T.Group[]=[];flies:T.Group[]=[];tongue:T.Mesh;
 eaten=new Set<number>();
 path:T.Vector3[];stops:T.Vector3[];lastAction:IdleAction='desk';eyeParts:T.Object3D[];
 constructor(public id:number,public station:T.Group,public seated:T.Group,public seatedHead:T.Group,public arms:T.Group[],public legs:T.Group[],public mug:T.Group,skin:T.Material){
  const ball=(parent:T.Object3D,material:T.Material,p:T.Vector3,size:T.Vector3)=>{const m=new T.Mesh(new T.SphereGeometry(1,20,14),material);m.position.copy(p);m.scale.copy(size);m.castShadow=true;parent.add(m);return m;};
  const tube=(parent:T.Object3D,material:T.Material,points:T.Vector3[],r:number)=>{const m=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),12,r,6,false),material);m.castShadow=true;parent.add(m);return m;};
  this.eyeParts=seatedHead.children.filter(child=>child.userData.eye);this.eyeParts.forEach(eye=>eye.userData.restY=eye.scale.y);
  const black=new T.MeshStandardMaterial({color:'#08130e',roughness:.18}),shine=new T.MeshBasicMaterial({color:'#f0fff2'});
  station.add(this.hunter);this.hunter.visible=false;this.hunter.name='hunting-frog';
  ball(this.hunter,skin,V(0,.32,.13),V(.25,.19,.36));
  this.head.position.set(0,.40,-.23);this.hunter.add(this.head);
  ball(this.head,skin,V(),V(.285,.17,.235));ball(this.head,skin,V(0,-.075,-.17),V(.25,.06,.12));
  for(const sign of [-1,1]){
   ball(this.head,skin,V(sign*.20,.12,-.04),V(.12,.13,.12));
   ball(this.head,black,V(sign*.20,.14,-.14),V(.068,.074,.035));ball(this.head,shine,V(sign*.20-.02,.16,-.17),V(.016,.018,.008));
   ball(this.head,black,V(sign*.10,-.03,-.27),V(.01,.008,.007));
  }
  tube(this.head,black,[V(-.22,-.08,-.22),V(0,-.105,-.28),V(.22,-.08,-.22)],.006);
  for(const sign of [-1,1])for(const rear of [false,true]){
   const limb=new T.Group();limb.position.set(sign*.19,.30,rear?.34:-.18);this.hunter.add(limb);this.limbs.push(limb);
   if(rear)ball(limb,skin,V(sign*.08,-.035,.025),V(.16,.12,.18));
   tube(limb,skin,[V(),V(sign*.16,-.12,rear?.14:.04),V(sign*.15,-.27,rear?-.04:-.13)],rear?.046:.029);
   for(let toe=0;toe<3;toe++){
    const x=sign*(.10+toe*.05),z=rear?-.04:-.13;
    tube(limb,skin,[V(sign*.15,-.27,z),V(x,-.285,z-.10),V(x+sign*.015,-.28,z-.15)],.009);
    ball(limb,skin,V(x+sign*.015,-.28,z-.15),V(.018,.009,.024));
   }
  }
  this.tongue=new T.Mesh(new T.CylinderGeometry(.013,.018,1,8),new T.MeshStandardMaterial({color:'#dc8e9f',roughness:.6}));station.add(this.tongue);this.tongue.visible=false;
  station.updateMatrixWorld(true);
  const branch=id>=2?new T.CatmullRomCurve3((id===2?LEFT_BRANCH:RIGHT_FORK).map(p=>V(...p))):null;
  const support=(point:T.Vector3)=>{
   if(branch){
    let nearest=Infinity,best=V(),progress=0;
    for(let i=0;i<=160;i++){const u=i/160,sample=branch.getPointAt(u),distance=(sample.x-point.x)**2+(sample.z-point.z)**2;if(distance<nearest){nearest=distance;best=sample;progress=u;}}
    point.y=best.y+(id===2?.32*Math.max(.025,(1-progress)**.68):.16)+.02;point.z=best.z;
   }
   return point;
  };
  this.path=routes[id].map(p=>station.worldToLocal(support(V(...p))));
  this.stops=this.path.map((point,i)=>{const direction=(i?point.clone().sub(this.path[i-1]):this.path[1].clone().sub(point));direction.y=0;const stop=point.clone().addScaledVector(direction.normalize(),id===3?-.20:-.40);return station.worldToLocal(support(station.localToWorld(stop))); });
  const insect=new T.MeshStandardMaterial({color:'#37251a',roughness:.8}),eye=new T.MeshStandardMaterial({color:'#ac5034'});
  for(let i=0;i<4;i++){
   const fly=new T.Group();fly.name='flightless-fruit-fly';station.add(fly);this.flies.push(fly);
   ball(fly,insect,V(0,.018,0),V(.020,.018,.034));ball(fly,eye,V(0,.02,-.037),V(.016,.015,.015));
   for(const sign of [-1,1])for(let leg=0;leg<3;leg++)tube(fly,insect,[V(sign*.01,.018,(leg-1)*.018),V(sign*.034,.012,(leg-1)*.025),V(sign*.045,0,(leg-1)*.027)],.0025);
  }
 }
 anchor(){return this.hunter.visible?this.head.getWorldPosition(V()):this.seatedHead.getWorldPosition(V());}
 tick(action:IdleAction,elapsed:number,duration:number,time:number,allowIdle:boolean){
  if(action!==this.lastAction)this.eaten.clear();
  const p=duration?elapsed/duration:0,blend=ease(p/.13)*(1-ease((p-.86)/.14));
  this.seated.visible=true;this.hunter.visible=false;this.tongue.visible=false;
  this.seated.position.set(0,0,0);this.seated.rotation.set(0,0,0);this.seated.scale.set(1,1+Math.sin(time*1.4+this.id)*.007,1);this.arms.forEach(arm=>arm.scale.set(1,1,1));
  this.seatedHead.rotation.set(0,0,0);this.legs.forEach(leg=>leg.scale.set(1,1,1));
  this.eyeParts.forEach(eye=>eye.scale.y=eye.userData.restY);
  this.mug.position.set(-.66,.94,-.02);this.mug.rotation.set(0,0,0);
  for(let i=0;i<this.flies.length;i++){
   const fly=this.flies[i],home=this.path[i];fly.visible=allowIdle&&!this.eaten.has(i);
   fly.position.copy(home).add(V(Math.sin(time*.7+i*2+this.id)*.055,.012,Math.cos(time*.9+i)*.035));
   fly.rotation.y=Math.sin(time*.4+i)*2;fly.rotation.z=Math.sin(time*15+i)*.035;
  }
  if(action==='sleep'){
   this.seatedHead.rotation.x=.24*blend;this.seatedHead.rotation.z=Math.sin(time*.48+this.id)*.045*blend;
   this.eyeParts.forEach(eye=>eye.scale.y=eye.userData.restY*(1-.96*blend));
   this.arms.forEach((arm,i)=>{arm.rotation.x=-.25*blend;arm.rotation.z=(i?1:-1)*.12*blend;});
  }else if(action==='stretch'){
   const side=this.id%2?1:-1;
   this.seated.position.set(side*.50*blend,.07*blend,.10*blend);this.legs.forEach(leg=>leg.scale.y=1+blend*.8);
   this.seated.rotation.z=Math.sin(time*1.6)*.065*blend;this.seatedHead.rotation.x=-.17*blend;
   this.arms.forEach((arm,i)=>{arm.rotation.z=(i?-1:1)*.60*blend;arm.rotation.x=1.90*blend;arm.scale.z=1+.45*blend;});
  }else if(action==='coffee'){
   // Stand beside the chair, then bring the mug and left hand to the mouth together.
   this.seated.position.set(-.50*blend,.07*blend,.08*blend);this.legs.forEach(leg=>leg.scale.y=1+blend*.8);
   const sip=blend*(.90+.1*Math.sin(time*2));this.arms[0].rotation.x=.70*sip;this.arms[0].rotation.z=-.16*sip;
   const palm=V(0,-.057,-.31).applyEuler(this.arms[0].rotation).add(this.arms[0].position).add(this.seated.position);
   this.mug.position.lerp(palm.add(V(.025,-.015,-.025)),blend);this.mug.rotation.x=-.65*sip;this.seatedHead.rotation.x=.05*sip;
  }else if(action==='hunt'){
   const exit=ease(p/.065),entry=ease((p-.95)/.05),away=exit*(1-entry);
   const departure=V(this.id===1?-.66:.66,.08,.45);
   this.seated.position.copy(departure).multiplyScalar(away);this.seated.scale.y*=1-.52*ease((p-.025)/.04)*(1-ease((p-.95)/.04));
   this.legs.forEach(leg=>leg.scale.y=1+away*.65);
   if(p>.065&&p<.95){
    this.seated.visible=false;this.hunter.visible=true;
    let from:T.Vector3,to:T.Vector3,u:number,landing=false,targetIndex=-1;
    if(p<.18){from=departure;to=this.stops[0];u=(p-.065)/.115;}
    else if(p>.78){from=this.stops[3];to=departure;u=(p-.78)/.17;}
    else{
     const segment=(p-.18)/.60*4,index=Math.min(3,Math.floor(segment));u=segment-index;
     from=index===0?this.stops[0]:this.stops[index-1];to=this.stops[index];targetIndex=index;landing=u>.62;
     u=Math.min(u/.62,1);
    }
    u=T.MathUtils.clamp(u,0,1);let hopHeight=this.id<2?.40:.27,reverse=false;
    if(p<.18||p>.78){
     // Crawl out from under the desktop before jumping; reverse that route on return.
     reverse=p>.78;const travel=reverse?1-u:u,side=departure.clone();side.x=Math.sign(departure.x)*1.34;
     if(travel<.35){from=departure;to=side;u=travel/.35;hopHeight=.012;}
     else{from=side;to=reverse?this.stops[3]:this.stops[0];u=(travel-.35)/.65;hopHeight=.70;}
    }
    const hop=Math.sin(u*Math.PI);
    this.hunter.position.copy(from).lerp(to,ease(u));this.hunter.position.y+=hop*hopHeight;
    const direction=landing&&targetIndex>=0?this.path[targetIndex].clone().sub(to):to.clone().sub(from).multiplyScalar(reverse?-1:1);if(direction.lengthSq()>.001)this.hunter.rotation.y=Math.atan2(-direction.x,-direction.z);
    this.hunter.scale.set(1,1-hop*.12,1);this.limbs.forEach((limb,i)=>limb.rotation.x=Math.sin(u*Math.PI*2)*(i%2?.48:-.24));
    this.head.rotation.x=landing?.12:0;
    if(landing&&targetIndex>=0){
     const phase=((p-.18)/.60*4)%1,strike=Math.sin(T.MathUtils.clamp((phase-.65)/.20,0,1)*Math.PI);
     if(phase>.82){this.eaten.add(targetIndex);this.flies[targetIndex].visible=false;}
     if(strike>.03){
      this.hunter.updateMatrixWorld(true);const start=this.station.worldToLocal(this.head.localToWorld(V(0,-.08,-.29)));
      const end=start.clone().lerp(this.flies[targetIndex].position,strike),delta=end.clone().sub(start);
      this.tongue.visible=true;this.tongue.position.copy(start).add(end).multiplyScalar(.5);this.tongue.scale.set(1,delta.length(),1);this.tongue.quaternion.setFromUnitVectors(V(0,1,0),delta.normalize());
     }
    }
   }
  }
  this.lastAction=action;
 }
}
