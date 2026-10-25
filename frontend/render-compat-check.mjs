import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1000,height:720},deviceScaleFactor:2});page.setDefaultTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/render-check',route=>route.fulfill({contentType:'text/html',body:'<html><head><link rel="stylesheet" href="/src/style.css"></head><body style="margin:0"><div id="habitat" style="width:1000px;height:720px;position:relative"></div></body></html>'}));
 await page.goto('http://127.0.0.1:5173/render-check');
 const results=await page.evaluate(async()=>{
  const {Habitat}=await import('/src/scene.ts'),h=new Habitat(document.querySelector('#habitat'),()=>{});window.h=h;cancelAnimationFrame(h.frame);
  const residents=['Mac','Cobalt','Cheese','Bluey'].map((name,id)=>({id,name,daily_pnl:null,active:false,positions:[]}));h.update(residents,false);
  const versions=h.monitors.map(m=>m.texture.version);h.update(residents,false);
  if(h.monitors.some((m,i)=>m.texture.version!==versions[i]))throw Error('Unchanged state uploaded monitor textures again');
  h.update(residents.map((resident,id)=>({...resident,daily_pnl:id===0?12.34:null})),false);
  if(h.monitors[1].texture.version<=versions[1]||h.monitors.slice(2).some((m,i)=>m.texture.version!==versions[i+2]))throw Error('Dirty monitor update incorrect');
  h.update(residents,false);h.select(0);h.camera.position.copy(h.targetPos);h.controls.target.copy(h.targetLook);h.targetPos=null;h.controls.update();h.clearCameraSightline();
  const render=h.renderer.render.bind(h.renderer);h.renderer.render=()=>{};h.clock.getDelta=()=>.016;
  let queries=0;const clear=h.clearCameraSightline.bind(h);h.clearCameraSightline=()=>{queries++;clear();};
  for(let i=0;i<120;i++){h.clock.elapsedTime+=.016;h.tick();cancelAnimationFrame(h.frame);}
  if(queries>1)throw Error('Stationary camera repeatedly tested foliage: '+queries);
  h.camera.position.x+=.3;h.clock.elapsedTime+=.2;h.tick();cancelAnimationFrame(h.frame);if(queries<1)throw Error('Camera movement did not refresh occlusion');
  h.renderer.render=render;h.select(null);h.camera.position.copy(h.targetPos);h.controls.target.copy(h.targetLook);h.targetPos=null;h.controls.update();
  h.budget.tier=0;h.applyRenderBudget();h.clock.elapsedTime+=.2;h.tick();cancelAnimationFrame(h.frame);h.renderer.render(h.scene,h.camera);h.renderer.getContext().finish();
  if(h.renderer.shadowMap.enabled||h.renderer.getPixelRatio()>.75)throw Error('Low tier failed');
  return {stationaryChecks:queries-1,lowPixelRatio:h.renderer.getPixelRatio(),pixelCount:h.renderer.domElement.width*h.renderer.domElement.height,drawCalls:h.renderer.info.render.calls};
 });
 await page.locator('#habitat').screenshot({path:fileURLToPath(new URL('../reports/habitat-low-detail.png',import.meta.url))});
 await page.evaluate(()=>{const h=window.h;h.budget.tier=2;h.applyRenderBudget();h.renderer.render(h.scene,h.camera);if(!h.renderer.shadowMap.enabled)throw Error('High tier did not restore shadows');});
 assert.deepEqual(errors,[]);console.log(JSON.stringify(results));console.log('Cached monitors, stationary camera, moving-camera refresh, and low/high rendering tiers passed.');
}finally{await browser.close();}
