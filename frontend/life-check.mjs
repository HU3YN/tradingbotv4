import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1120,height:790},deviceScaleFactor:1});page.setDefaultTimeout(120000);
const errors=[];page.on('pageerror',error=>errors.push(error.message));
await page.route('**/life-check',route=>route.fulfill({contentType:'text/html',body:'<html><head><link rel="stylesheet" href="/src/style.css"></head><body style="margin:0"><div id="habitat" style="position:relative;width:1120px;height:790px;border-radius:0"></div></body></html>'}));
await page.goto('http://127.0.0.1:5173/life-check');
await page.evaluate(async()=>{
 const {Habitat}=await import('/src/scene.ts');const h=new Habitat(document.querySelector('#habitat'),()=>{});window.habitatTest=h;cancelAnimationFrame(h.frame);
 window.residents=['Mac','Cobalt','Cheese','Bluey'].map((name,id)=>({id,name,daily_pnl:null,active:false,positions:[]}));
 window.renderPose=()=>{h.clock.getDelta=()=>.016;h.clock.elapsedTime+=.2;h.tick();cancelAnimationFrame(h.frame);};
 h.update(window.residents,false);window.renderPose();
});
const shot=async name=>{await page.locator('#habitat').screenshot({path:fileURLToPath(new URL(`../reports/${name}.png`,import.meta.url))});console.log('Captured '+name);};
await shot('habitat-moss-water');
await page.evaluate(()=>{
 const h=window.habitatTest;h.update(window.residents,true);
 for(const [i,action] of ['sleep','coffee','hunt','desk'].entries())Object.assign(h.director.residents[i],{action,elapsed:action==='hunt'?10:8,duration:action==='sleep'?30:20,wait:100});
 window.renderPose();
});
await shot('habitat-off-duty');
const focus=async(id,action,elapsed,duration)=>page.evaluate(({id,action,elapsed,duration})=>{
 const h=window.habitatTest;h.select(id);h.update(window.residents,true);
 Object.assign(h.director.residents[id],{action,elapsed,duration});window.renderPose();
 const anchor=h.life[id].anchor();h.camera.position.copy(anchor).add({x:1.25,y:.65,z:-1.65});h.controls.target.copy(anchor);h.targetPos=null;
 h.freeCamera=true;h.followAnchor=anchor.clone();h.controls.update();h.clearCameraSightline();window.renderPose();
},{id,action,elapsed,duration});
if(process.env.HUNT_ONLY){
 for(const [id,name] of ['mac','cobalt','cheese','bluey'].entries()){await focus(id,'hunt',6,20);await shot('hunt-'+name);}
}else{
await focus(0,'sleep',10,30);await shot('resident-sleep');
await focus(1,'coffee',8,20);await shot('resident-coffee');
await focus(2,'hunt',10,20);await shot('resident-hunt');
await focus(3,'stretch',5,10);await shot('resident-stretch');
}
const checks=await page.evaluate(()=>{
 const h=window.habitatTest,result=[];
 for(let id=0;id<4;id++)for(const action of ['sleep','stretch','coffee','hunt'])for(const phase of [.01,.07,.17,.32,.5,.72,.90,.99]){
  const rig=h.life[id];rig.tick(action,phase*20,20,phase*20,true);
  for(const object of [rig.seated,rig.hunter,rig.mug,rig.tongue,...rig.flies])if(![...object.position,...object.scale].every(Number.isFinite))throw Error('Nonfinite pose '+action);
  if(rig.seated.visible===rig.hunter.visible)throw Error('Missing or duplicate resident '+action);
 }
 h.update(window.residents,false);window.renderPose();
 for(const rig of h.life){
  if(!rig.seated.visible||rig.hunter.visible||rig.tongue.visible||rig.flies.some(fly=>fly.visible))throw Error('Open-market reset failed');
  if(rig.seated.position.length()>.0001||rig.mug.position.distanceTo({x:-.66,y:.94,z:-.02})>.0001)throw Error('Prop did not return to desk');
 }
 result.push('128 action poses finite; market-open reset restores all residents and mugs');
 h.update(window.residents,true);h.director.residents[0].action='hunt';h.lastStateAt=performance.now()-30000;window.renderPose();
 if(h.director.residents.some(r=>r.action!=='desk'))throw Error('Stale status allowed play');
 result.push('Stale status stops idle routines');return result;
});
assert.deepEqual(errors,[]);checks.forEach(message=>console.log(message));
await browser.close();console.log('Resident animation browser checks passed.');
