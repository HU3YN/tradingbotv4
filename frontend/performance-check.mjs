import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1000,height:720},deviceScaleFactor:1});page.setDefaultTimeout(120000);
 await page.route('**/performance-check',r=>r.fulfill({contentType:'text/html',body:'<div id="habitat" style="width:1000px;height:720px;position:relative"></div>'}));
 await page.goto('http://127.0.0.1:5173/performance-check');
 const result=await page.evaluate(async()=>{
  const {Habitat}=await import('/src/scene.ts');const init=performance.now(),h=new Habitat(document.querySelector('#habitat'),()=>{});cancelAnimationFrame(h.frame);
  const initMs=performance.now()-init;h.update(['Mac','Cobalt','Cheese','Bluey'].map((name,id)=>({id,name,daily_pnl:null,active:false,positions:[]})),false);
  // Fixed resolution and camera path isolate scene work from the adaptive quality controller.
  h.renderer.setPixelRatio(1);const gl=h.renderer.getContext(),stats=[];
  h.renderer.render(h.scene,h.camera);gl.finish();
  const overview={...h.renderer.info.render};h.select(0);
  for(let i=0;i<8;i++){
   h.camera.position.lerp(h.targetPos,.3);h.controls.target.lerp(h.targetLook,.3);h.controls.update();
   const start=performance.now();h.clearCameraSightline();const visibilityMs=performance.now()-start;
   const renderStart=performance.now();h.renderer.render(h.scene,h.camera);gl.finish();
   stats.push({visibilityMs,renderMs:performance.now()-renderStart,calls:h.renderer.info.render.calls,triangles:h.renderer.info.render.triangles});
  }
  return {renderer:gl.getParameter(gl.RENDERER),viewport:[1000,720],pixelRatio:1,initMs,overview,frames:stats};
 });
 const name=process.env.PERF_NAME||'performance-after';await writeFile(fileURLToPath(new URL(`../reports/${name}.json`,import.meta.url)),JSON.stringify(result,null,2));
 const mean=key=>result.frames.reduce((sum,f)=>sum+f[key],0)/result.frames.length;
 console.log(JSON.stringify({name,overviewCalls:result.overview.calls,overviewTriangles:result.overview.triangles,meanVisibilityMs:mean('visibilityMs'),meanRenderMs:mean('renderMs'),meanDeskCalls:mean('calls')},null,2));
}finally{await browser.close();}
