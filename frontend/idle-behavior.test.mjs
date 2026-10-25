import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
const compiled=await build({entryPoints:[fileURLToPath(new URL('./src/idle-behavior.ts',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm'});
const {IdleDirector,outsideRegularSession}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].text).toString('base64'));
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
