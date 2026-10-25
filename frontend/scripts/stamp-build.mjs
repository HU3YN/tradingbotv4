// Build provenance lets launchers reject an old or incomplete copied dashboard.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const walk=folder=>readdirSync(join(root,folder),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${folder}/${e.name}`):[`${folder}/${e.name}`]);
const inputs=[...walk('src'),...walk('public'),...walk('scripts'),'index.html','package.json','package-lock.json','tsconfig.json','vite.config.ts'].sort();
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const sourceHash=name=>{const bytes=readFileSync(join(root,name));return hash(/\.(ts|js|mjs|css|json|html|svg|md|txt)$/.test(name)?bytes.toString('utf8').replace(/\r\n/g,'\n'):bytes);};
const sources=Object.fromEntries(inputs.map(name=>[name,sourceHash(name)]));
const assets=Object.fromEntries(walk('dist').filter(name=>name!=='dist/build-info.json').sort().map(name=>[relative('dist',name).replaceAll('\\','/'),hash(readFileSync(join(root,name)))]));
const sourceHashValue=hash(inputs.map(name=>`${name}:${sources[name]}\n`).join(''));
writeFileSync(join(root,'dist/build-info.json'),JSON.stringify({schema:1,build:sourceHashValue.slice(0,12),sources,assets},null,2)+'\n');
console.log(`Dashboard build ${sourceHashValue.slice(0,12)} verified against ${inputs.length} source files.`);
