// Run against an extracted Git archive served with --app-dir <archive>/backend.
// All broker states below are browser-only fixtures; no trading mutation is allowed.
import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:900,height:850}});page.setDefaultTimeout(120000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let scenario='disconnected',offline=false;
 await page.addInitScript(()=>{Math.random=()=>.2;});
 await page.route('**/api/**',async route=>{
  if(route.request().method()!=='GET')throw Error('Distribution check must not submit orders');
  if(!route.request().url().endsWith('/api/state'))return route.continue();
  if(offline)return route.abort();
  const response=await route.fetch(),state=await response.json();
  state.server_time=['weekday','stale-weekday'].includes(scenario)?'2026-10-26T15:00:00Z':'2026-10-24T16:00:00Z';
  state.credentials_present=!['disconnected','weekday'].includes(scenario);
  state.market_clock_fresh=!['disconnected','stale','stale-weekday','weekday'].includes(scenario);
  state.market_open=['disconnected','open'].includes(scenario); // Saved Friday open flag on restart.
  state.error='Previous session error';
  state.agents.forEach(a=>a.active=scenario==='active'&&a.id===0);
  await route.fulfill({response,json:state});
 });
 const url=process.env.TERRARIUM_URL||'http://127.0.0.1:8001';
 await page.goto(url,{waitUntil:'networkidle'});
 const health=await (await page.request.get(url+'/api/health')).json();
 assert.match(health.dashboard_build,/^[a-f0-9]{12}$/);
 assert.equal(await page.locator('.frog-label').count(),4);
 const anyRest=()=>page.waitForFunction(()=>[...document.querySelectorAll('.frog-label')].some(e=>e.dataset.activity&&e.dataset.activity!=='desk'));
 const allDesk=()=>page.waitForFunction(()=>[...document.querySelectorAll('.frog-label')].every(e=>e.dataset.activity==='desk'));
 await anyRest();console.log('Fresh extracted GitHub build: resting works without a tournament, despite a saved open flag and old error.');
 scenario='open';await allDesk();console.log('Fresh open-market clock interrupts rest.');
 scenario='closed';await anyRest();console.log('Fresh closed-market clock permits rest despite a previous error.');
 scenario='active';await page.waitForFunction(()=>parseInt(document.querySelector('#active-count').textContent)===1&&document.querySelector('.frog-0').dataset.activity==='desk');
 assert.equal(await page.locator('.frog-0').getAttribute('data-activity'),'desk');
 scenario='stale';await anyRest();await page.waitForFunction(()=>document.querySelector('#resident-context').textContent==='Off hours · routines enabled');console.log('Desktop with stored keys and stale closed clock now animates like the disconnected laptop.');
 scenario='stale-weekday';await allDesk();await page.waitForFunction(()=>document.querySelector('#resident-context').textContent==='Waiting for the market clock');console.log('Active orders and unknown weekday sessions still block resting.');
 scenario='weekday';await page.waitForFunction(()=>document.querySelector('#resident-context').textContent==='Market hours · at the desks');await allDesk();
 scenario='disconnected';await anyRest();
 offline=true;await allDesk();console.log('Weekday preview and offline state block rest; weekend preview recovers.');
 await page.setViewportSize({width:390,height:844});
 await page.locator('#music-settings').click();
 assert.equal(await page.locator('#music-panel').isVisible(),true);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(errors,[]);console.log('Mobile controls and packaged assets passed; no browser errors or trading mutations.');
}finally{await browser.close();}
