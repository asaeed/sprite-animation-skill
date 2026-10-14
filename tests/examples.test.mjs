import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {test} from 'node:test';
import {auditPixels} from '../scripts/inspect-sheet.mjs';

const root=new URL('../',import.meta.url),base=new URL('examples/dead-zone/',root);
const manifest=JSON.parse(fs.readFileSync(new URL('manifest.json',base),'utf8'));
const previews=JSON.parse(fs.readFileSync(new URL('previews.json',base),'utf8')).previews;
test('examples contain exactly two humans, two zombies and the vehicle',()=>{
 assert.deepEqual(Object.keys(manifest.characters),['soldier','builder','walker','spitter','suv']);
 assert.equal(Object.values(manifest.characters).filter(c=>c.group==='unit').length,2);
 assert.equal(Object.values(manifest.characters).filter(c=>c.group==='zombie').length,2);
 assert.equal(manifest.characters.suv.group,'vehicle');
});
for(const[id,record]of Object.entries(manifest.characters))test(id+' source, frame descriptors and previews are bundled and consistent',()=>{
 const png=fs.readFileSync(new URL(record.image,base));assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 assert.equal(crypto.createHash('sha256').update(png).digest('hex'),record.sourceSha256);
 const width=png.readUInt32BE(16),height=png.readUInt32BE(20);
 assert.equal(record.directions.length,8);assert.ok(record.footAnchor.x>=0&&record.footAnchor.y>=0);
 for(const clip of Object.values(record.clips)){
  assert.ok(clip.fps>0);
  for(const direction of record.directions)for(const f of clip.directions[direction]){
   assert.ok(f.x>=0&&f.y>=0&&f.width>0&&f.height>0);
   assert.ok(f.x+f.width<=width&&f.y+f.height<=height);
  }
 }
 const preview=previews.find(p=>p.id===id),turnaround=id==='suv';
 assert.equal(preview.frames,turnaround?8:record.clips.walk.directions.SE.length);
 assert.equal(preview.fps,turnaround?4:record.clips.walk.fps);
 const gif=fs.readFileSync(new URL(preview.image,base));assert.match(gif.subarray(0,6).toString(),/^GIF8[79]a$/);
 assert.equal(gif.readUInt16LE(6),preview.width);assert.equal(gif.readUInt16LE(8),preview.height);
 const poster=fs.readFileSync(new URL(preview.poster,base));assert.equal(poster.readUInt32BE(16),192);assert.equal(poster.readUInt32BE(20),192);
 const frames=JSON.parse(fs.readFileSync(new URL(id+(turnaround?'-turnaround':'-walk')+'.json',base),'utf8'));
 assert.equal(frames.length,preview.frames);
 frames.forEach((f,i)=>{
  const src=turnaround?record.clips.idle.directions[record.directions[i]][0]:record.clips.walk.directions.SE[i];
  assert.deepEqual(f.rect,{x:src.x,y:src.y,w:src.width,h:src.height});
  assert.deepEqual(f.anchor,record.footAnchor);assert.equal(f.durationMs,1000/preview.fps);
 });
});
test('inspection audit checks pixels without another skill or game checkout',()=>{
 const pixels=new Uint8Array(4*4*4);pixels[(1*4+1)*4+3]=255;
 const report=auditPixels(pixels,4,4,[{id:'one',rect:{x:0,y:0,w:4,h:4},anchor:{x:2,y:3}}]);
 assert.equal(report.frames[0].opaquePixels,1);assert.deepEqual(report.frames[0].touchesEdges,[]);
 assert.deepEqual(report.frames[0].alphaBounds,{left:1,top:1,right:1,bottom:1});
 assert.throws(()=>auditPixels(pixels,4,4,[{rect:{x:3,y:0,w:2,h:4}}]),/out-of-bounds/);
});
