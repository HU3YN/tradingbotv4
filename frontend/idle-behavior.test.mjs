import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
const compiled=await build({entryPoints:[fileURLToPath(new URL('./src/idle-behavior.ts',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm'});
const {IdleDirector,outsideRegularSession,offDutyAllowed}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].text).toString('base64'));
function random(seed=24){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/2**32;};}
test('closed-session preview handles New York time, DST, and session boundaries',()=>{
 for(const date of ['2026-10-24T15:00:00Z','2026-10-26T13:29:00Z','2026-10-26T20:00:00Z','2026-11-02T14:29:00Z'])assert.equal(outsideRegularSession(new Date(date)),true,date);
 for(const date of ['2026-10-26T13:30:00Z','2026-10-26T19:59:00Z','2026-11-02T14:30:00Z','2026-11-02T20:59:00Z'])assert.equal(outsideRegularSession(new Date(date)),false,date);
});
test('every resident eventually gets every routine, overlaps differ, and departures stagger',()=>{
 const director=new IdleDirector(random()),seen=Array.from({length:4},()=>new Set()),starts=[];let overlap=false;
 for(let frame=0;frame<12000;frame++){
  const before=director.residents.map(r=>r.action),state=director.step(.1,true,[false,false,false,false]);
  assert.ok(state.slice(0,2).filter(r=>r.action==='hunt').length<=1);
  const away=state.filter(r=>r.action!=='desk');assert.ok(away.length<=3);
  if(new Set(away.map(r=>r.action)).size>=2)overlap=true;
  state.forEach((r,i)=>{seen[i].add(r.action);if(before[i]==='desk'&&r.action!=='desk')starts.push(frame*.1);});
 }
 seen.forEach(actions=>assert.deepEqual([...actions].sort(),['coffee','desk','hunt','sleep','stretch']));
 assert.ok(overlap);for(let i=1;i<starts.length;i++)assert.ok(starts[i]-starts[i-1]>=1.9);
});
test('market open, missing status, and active orders prevent or interrupt play',()=>{
 const director=new IdleDirector(random());
 for(let i=0;i<2000;i++)director.step(.1,false,[false,false,false,false]);
 assert.ok(director.residents.every(r=>r.action==='desk'));
 for(let i=0;i<4;i++)Object.assign(director.residents[i],{action:['hunt','sleep','coffee','stretch'][i],elapsed:5,duration:20});
 director.step(.1,true,[true,false,false,false]);assert.equal(director.residents[0].action,'desk');assert.equal(director.residents[1].action,'sleep');
 director.step(.1,false,[false,false,false,false]);assert.ok(director.residents.every(r=>r.action==='desk'));
 for(let i=0;i<2000;i++)director.step(.1,true,[]);assert.ok(director.residents.every(r=>r.action==='desk'));
});

test('disconnected restart ignores saved open flags and uses server time, not the local clock',()=>{
 const weekend={credentials_present:false,market_open:true,market_clock_fresh:false,server_time:'2026-10-24T16:00:00Z',error:'Old trading error'};
 assert.equal(offDutyAllowed(weekend,new Date('2026-10-26T15:00:00Z')),true);
 assert.equal(offDutyAllowed({...weekend,server_time:'2026-10-26T15:00:00Z'},new Date('2026-10-24T16:00:00Z')),false);
 assert.equal(offDutyAllowed({...weekend,server_time:'invalid'}),false);
 const director=new IdleDirector(random());
 for(let i=0;i<150;i++)director.step(.1,offDutyAllowed(weekend),[false,false,false,false]);
 assert.ok(director.residents.some(r=>r.action!=='desk'));
});
test('fresh broker state wins, including holidays and an open clock outside fallback hours',()=>{
 const connected={credentials_present:true,market_open:false,market_clock_fresh:true,error:'Previous order error',server_time:'2026-10-26T15:00:00Z'};
 assert.equal(offDutyAllowed(connected),true);
 assert.equal(offDutyAllowed({...connected,market_open:true}),false);
 assert.equal(offDutyAllowed({...connected,market_open:true,server_time:'2026-10-25T16:00:00Z'}),false);
 assert.equal(offDutyAllowed({...connected,market_clock_fresh:false}),false);
 assert.equal(offDutyAllowed({...connected,market_clock_fresh:undefined}),false);
});
test('stored desktop credentials cannot suppress off-hours routines when the laptop has no keys',()=>{
 for(const server_time of ['2026-10-25T16:00:00Z','2026-10-26T21:00:00Z','2026-11-02T13:00:00Z']){
  const base={market_open:false,market_clock_fresh:false,server_time};
  const laptop=offDutyAllowed({...base,credentials_present:false});
  const desktop=offDutyAllowed({...base,credentials_present:true});
  assert.equal(laptop,true);assert.equal(desktop,laptop);
  const director=new IdleDirector(random()),seen=new Set();
  for(let i=0;i<10000;i++){
   const states=director.step(.1,desktop,[true,false,false,false]);
   assert.equal(states[0].action,'desk');
   states.slice(1).forEach(s=>seen.add(s.action));
  }
  assert.deepEqual([...seen].sort(),['coffee','desk','hunt','sleep','stretch']);
 }
 assert.equal(offDutyAllowed({credentials_present:true,market_open:false,server_time:'invalid'}),false);
});
