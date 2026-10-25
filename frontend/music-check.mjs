import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1100,height:900}});
 page.setDefaultTimeout(60000);
 const errors=[],downloads=[];page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(r.url().endsWith('.mp3'))downloads.push(r.url());});
 await page.addInitScript(()=>{
  const Native=window.AudioContext;window.musicGraphs=[];window.musicGains=[];
  window.AudioContext=class extends Native{
   constructor(...args){super(...args);window.musicGraphs.push(this);}
   createGain(){const gain=super.createGain();window.musicGains.push(gain);return gain;}
  };
 });
 await page.goto(process.env.TERRARIUM_URL||'http://127.0.0.1:8000',{waitUntil:'networkidle'});
 await page.evaluate(()=>{document.querySelector('#habitat').style.display='none';});
 assert.equal(await page.locator('#habitat-music').evaluate(a=>a.paused),true);
 assert.equal(downloads.length,0,'Audio should not download or autoplay on launch');
 await page.locator('#music-settings').click();
 assert.equal(await page.locator('#music-panel').isVisible(),true);
 assert.equal(await page.locator('#music-volume').inputValue(),'30');
 await page.locator('#music-play').click();
 await page.waitForFunction(()=>document.querySelector('#music-status').textContent.startsWith('Playing'));
 await page.waitForFunction(()=>document.querySelector('#habitat-music').currentTime>.2);
 assert.ok((await page.locator('#habitat-music').evaluate(a=>a.duration))>150);
 // Verify decoded audio actually reaches the Web Audio output graph.
 const level=await page.evaluate(async()=>{
  const analyser=musicGraphs[0].createAnalyser();musicGains[0].connect(analyser);
  await new Promise(r=>setTimeout(r,300));const data=new Float32Array(analyser.fftSize);
  analyser.getFloatTimeDomainData(data);analyser.disconnect();
  return Math.max(...data.map(Math.abs));
 });
 assert.ok(level>.0001,'Output should contain audible music, not silent playback');
 await page.locator('#music-volume').fill('0');await page.waitForTimeout(400);
 assert.ok(await page.evaluate(()=>musicGains[0].gain.value<.0001));
 await page.locator('#music-volume').fill('42');
 await page.locator('#music-track').selectOption('piano');
 await page.waitForFunction(()=>document.querySelector('#music-status').textContent==='Playing · Quiet piano');
 assert.ok((await page.locator('#habitat-music').evaluate(a=>a.duration))>120);
 await page.locator('#habitat-music').evaluate(a=>{a.currentTime=a.duration-.15;});
 await page.waitForFunction(()=>{const a=document.querySelector('#habitat-music');return !a.seeking&&a.currentTime<a.duration-1;},null,{polling:100});
 assert.equal(await page.locator('#habitat-music').evaluate(a=>a.paused),false,'Music should loop');
 // Rapid play/pause/track switches must not revive an outdated play request.
 await page.evaluate(()=>{
  document.querySelector('#sound').click();document.querySelector('#sound').click();
  const select=document.querySelector('#music-track');select.value='jazz';select.dispatchEvent(new Event('change'));
  document.querySelector('#sound').click();
 });
 await page.waitForTimeout(400);
 assert.equal(await page.locator('#habitat-music').evaluate(a=>a.paused),true);
 assert.equal(await page.locator('#sound').getAttribute('aria-pressed'),'false');
 assert.equal(await page.evaluate(()=>musicGraphs.length),1,'Reuse one audio graph');
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#music-panel').isVisible(),false);
 assert.equal(await page.locator('#music-settings').evaluate(e=>document.activeElement===e),true);
 await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.locator('#music-track').inputValue(),'jazz');
 assert.equal(await page.locator('#music-volume').inputValue(),'42');
 assert.equal(await page.locator('#habitat-music').evaluate(a=>a.paused),true);
 // Playback rejection is visible and recoverable on the next user click.
 await page.evaluate(()=>{
  const audio=document.querySelector('#habitat-music');const native=audio.play.bind(audio);
  audio.play=()=>{audio.play=native;return Promise.reject(new DOMException('Test rejection','NotAllowedError'));};
 });
 await page.locator('#sound').click();
 await page.waitForFunction(()=>document.querySelector('#music-status').textContent.includes('could not play'));
 assert.equal(await page.locator('#sound').getAttribute('aria-pressed'),'false');
 await page.locator('#sound').click();
 await page.waitForFunction(()=>document.querySelector('#music-status').textContent.startsWith('Playing'));
 await page.locator('#sound').click();
 await page.evaluate(()=>{document.querySelector('#habitat').style.display='';});
 await page.setViewportSize({width:390,height:844});
 await page.locator('#music-settings').click();
 await page.locator('#music-panel').screenshot({path:fileURLToPath(new URL('../reports/music-controls-mobile.png',import.meta.url))});
 const size=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,panel:document.querySelector('#music-panel').getBoundingClientRect().toJSON()}));
 assert.ok(size.scroll<=size.width&&size.panel.x>=0&&size.panel.right<=size.width);
 // Storage restrictions must not break controls or playback.
 console.log('Playback, looping, race handling, preferences, and mobile layout passed.');
 await page.close();
 const blocked=await browser.newPage({viewport:{width:390,height:844}});
 blocked.on('pageerror',e=>errors.push(e.message));
 await blocked.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('Disabled');};Storage.prototype.setItem=()=>{throw Error('Disabled');};});
 const blockedResponse=await blocked.goto(process.env.TERRARIUM_URL||'http://127.0.0.1:8000',{waitUntil:'networkidle'});
 assert.equal(blockedResponse.status(),200);
 assert.deepEqual(errors,[]);
 await blocked.locator('#sound').click();
 await blocked.waitForFunction(()=>document.querySelector('#music-status').textContent.startsWith('Playing'));
 await blocked.close();
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({decodedOutputPeak:level,tracks:'jazz + piano',loop:true,noAutoplay:true,rapidSwitches:true,rejectionRecovery:true,preferences:true,blockedStorage:true,mobile:true,errors}));
}finally{await browser.close();}
