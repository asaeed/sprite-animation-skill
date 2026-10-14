import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'node:test';
const root=fileURLToPath(new URL('../',import.meta.url));
const docs=['SKILL.md','README.md',...fs.readdirSync(path.join(root,'references')).filter(f=>f.endsWith('.md')).map(f=>'references/'+f),'examples/dead-zone/PROVENANCE.md'];
test('all documented local links and README images resolve within the skill checkout',()=>{
 for(const rel of docs){
  const file=path.join(root,rel),text=fs.readFileSync(file,'utf8');
  const destinations=[...text.matchAll(/\]\(([^)]+)\)/g)].map(match=>match[1]);
  destinations.push(...[...text.matchAll(/<img\s[^>]*src="([^"]+)"/g)].map(match=>match[1]));
  for(const destination of destinations){
   if(/^[a-z]+:|^#/.test(destination))continue;
   const target=path.resolve(path.dirname(file),destination.split('#')[0]);
   assert.ok(target.startsWith(root),rel+' link outside checkout: '+destination);
   assert.ok(fs.existsSync(target),rel+' missing link: '+destination);
  }
 }
});
test('current skill guidance contains no original-machine or game-server paths',()=>{
 for(const rel of docs){const text=fs.readFileSync(path.join(root,rel),'utf8');assert.doesNotMatch(text,/\/Users\/ASaeed\/|127\.0\.0\.1:8787/,rel);}
});
