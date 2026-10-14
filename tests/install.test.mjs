import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {test} from 'node:test';

const root=fileURLToPath(new URL('../',import.meta.url));
function fixture(t){
  const home=fs.mkdtempSync(path.join(os.tmpdir(),'sprite-skill-install-'));
  t.after(()=>fs.rmSync(home,{recursive:true,force:true}));
  const targets=['.claude','.codex'].map(agent=>path.join(home,agent,'skills','sprite-animation'));
  const install=()=>spawnSync('bash',[path.join(root,'install.sh')],{
    cwd:home,env:{...process.env,HOME:home},encoding:'utf8',
  });
  return {home,targets,install};
}
function assertInstalled(targets){
  for(const target of targets){
    assert.ok(fs.lstatSync(target).isSymbolicLink());
    assert.equal(fs.realpathSync(target),fs.realpathSync(root));
    assert.ok(fs.readFileSync(path.join(target,'SKILL.md')).equals(fs.readFileSync(path.join(root,'SKILL.md'))));
  }
}

test('installs for both agents from outside the checkout',t=>{
  const {targets,install}=fixture(t),result=install();
  assert.equal(result.status,0,result.stderr);assertInstalled(targets);
});
test('repeated installation preserves the shared checkout links',t=>{
  const {targets,install}=fixture(t);
  assert.equal(install().status,0);assert.equal(install().status,0);assertInstalled(targets);
});
test('replaces existing and broken symlinks without changing their old contents',t=>{
  const {home,targets,install}=fixture(t),old=path.join(home,'old-skill');
  fs.mkdirSync(old);fs.writeFileSync(path.join(old,'keep.txt'),'keep');
  targets.forEach((target,i)=>{
    fs.mkdirSync(path.dirname(target),{recursive:true});
    fs.symlinkSync(i?path.join(home,'missing-skill'):old,target);
  });
  const result=install();assert.equal(result.status,0,result.stderr);assertInstalled(targets);
  assert.equal(fs.readFileSync(path.join(old,'keep.txt'),'utf8'),'keep');
});
test('refuses a real directory before modifying the other installation',t=>{
  const {targets,install}=fixture(t);
  fs.mkdirSync(targets[1],{recursive:true});fs.writeFileSync(path.join(targets[1],'keep.txt'),'keep');
  const result=install();assert.notEqual(result.status,0);assert.match(result.stderr,/Refusing to replace non-symlink/);
  assert.equal(fs.existsSync(targets[0]),false);
  assert.equal(fs.readFileSync(path.join(targets[1],'keep.txt'),'utf8'),'keep');
});
test('refuses a regular file without overwriting it',t=>{
  const {targets,install}=fixture(t);
  fs.mkdirSync(path.dirname(targets[0]),{recursive:true});fs.writeFileSync(targets[0],'keep');
  const result=install();assert.notEqual(result.status,0);assert.match(result.stderr,/Refusing to replace non-symlink/);
  assert.equal(fs.readFileSync(targets[0],'utf8'),'keep');assert.equal(fs.existsSync(targets[1]),false);
});
