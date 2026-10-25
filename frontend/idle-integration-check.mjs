import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1000,height:850}});page.setDefaultTimeout(120000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));let open=false,active=false,offline=false;
 await page.addInitScript(()=>{Math.random=()=>.2;});
 await page.route('**/api/state',async route=>{
  if(offline){await route.abort();return;}
  const response=await route.fetch(),state=await response.json();
  state.market_open=open;state.market_clock_fresh=true;state.credentials_present=true;state.error='';state.agents.forEach(a=>a.active=active&&a.id===0);
  await route.fulfill({response,json:state});
 });
 await page.route('**/api/start',()=>{throw Error('Animation must never start trading');});
 await page.goto('http://127.0.0.1:8000',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>[...document.querySelectorAll('.frog-label')].some(el=>el.dataset.activity&&el.dataset.activity!=='desk'),{},{timeout:120000});
 console.log('Closed market: actual dashboard starts an independent idle routine.');
 open=true;
 await page.waitForFunction(()=>document.querySelector('#market-status')?.textContent==='Market open'&&[...document.querySelectorAll('.frog-label')].every(el=>el.dataset.activity==='desk'));
 console.log('Open-market API update returns every resident to the desk.');
 open=false;active=true;
 await page.waitForFunction(()=>document.querySelector('#market-status')?.textContent==='Market closed'&&[...document.querySelectorAll('.frog-label')].slice(1).some(el=>el.dataset.activity!=='desk'));
 assert.equal(await page.locator('.frog-0').getAttribute('data-activity'),'desk');
 console.log('Active-order resident stays at the desk while other resting residents can play.');
 offline=true;
 await page.waitForFunction(()=>document.querySelector('#market-status')?.textContent==='Server offline'&&[...document.querySelectorAll('.frog-label')].every(el=>el.dataset.activity==='desk'));
 console.log('Offline status cancels play; no trading requests.');
 await page.setViewportSize({width:390,height:844});
 await page.locator('.resident-nav[data-agent="2"]').dispatchEvent('click');
 await page.locator('#free-camera').click();
 assert.equal(await page.locator('#habitat').getAttribute('data-camera-mode'),'free');
 await page.locator('#back-habitat').click();
 const width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));assert.ok(width.scroll<=width.viewport);
 await page.locator('#habitat').screenshot({path:fileURLToPath(new URL('../reports/habitat-mobile-life.png',import.meta.url))});
 assert.deepEqual(errors,[]);console.log('Mobile layout and free-camera control passed; no JavaScript errors.');
}finally{await browser.close();}
