---
name: sprite-animation
description: Create and refine animated 2D assets and sprite sheets from visual references, authored frames, or rigged sources. Use for sprite production, motion design, frame alignment, animation repair, directional consistency, and renderer integration; ChatGPT Pets use their own skills.
---

# Sprite Animation

Deliver coherent motion at the intended display size. This applies to characters, objects, effects, and other animated assets; choose the method to fit the subject.

## Establish the Brief

- Inspect the destination renderer, frame format, approved appearance, camera, palette, display size, timing, views, transparency, and pivot/contact behavior.
- Define observable motion requirements: key poses, emphasis, holds, transitions, attachment relationships, and the intended starting/ending state. Express directions and constraints in the subject's local frame before projecting them.
- Identify the exact parts, actions, and views being revised. Freeze accepted sources, frames, timing, and unaffected features; later feedback may narrow an earlier approval.
- Prototype the most demanding representative sequence before expanding. Reuse a validated source and bake path when refining accepted work.

Read [production.md](references/production.md) for shared motion, packaging, and review guidance. Load the relevant method guide: [raster sources](references/raster-sources.md) for generated/painted artwork, or [rigged sources](references/rigged-to-sprites.md) for 3D models and attachments. [Lessons](references/lessons.md) explain demonstrated failure modes; [delivered examples](references/dead-zone.md) are optional evidence, not defaults or dependencies.

## Choose the Production Method

- **Authored frames:** suitable for controlled shape, silhouette, or perspective changes.
- **Segmented 2D rig:** suitable for planar articulation when complete hidden surfaces and overlap regions exist.
- **Rigged 3D rendered to sprites:** suitable for repeatable articulation, depth, and multiple views. Inspect the model, materials, and authored motion against the intended style.
- **Hybrid:** use a rig or pose reference to guide motion while retaining authored appearance; validate both together.

For raster artwork, use the available image-generation/editing tool according to its actual interface. Preserve references and raw output. If unavailable, use supplied/licensed art or disclose the missing capability. Record the actual tool/model when exposed; do not invent generation or silently switch to a separately billed service.

Repeated structural rejection is a reason to revisit the source or motion method. More frames and stronger deformation do not repair missing surfaces, wrong ownership, or an unsuitable rig.

## Build and Package

1. Inspect the source in all required views before animation: proportions, part identity, materials, alpha, and hidden overlap surfaces.
2. Author readable pose progression, timing, recovery, and loop seams. Preserve the state the asset should return to; an action need not end in a generic neutral pose.
3. For articulated assets, separate endpoint position, orientation, bend, and secondary motion. Choose an appropriate moving frame for each attachment and verify actual surface fit.
4. Register frames to a stable pivot, contact, or landmark. Measure the full motion envelope and use one padded crop per subject; do not recenter changing silhouettes independently.
5. Bake deterministically with explicit rectangles, anchors, durations, directions, and tags. Keep source resolution, useful atlas pixels, and displayed size separate; minimize resampling.

## Validate Before Integration

**Visual:** review complete sequences at native/enlarged size, normal/slow speed, and by stepping. Compare approved baselines synchronously. Check part ownership, attachment continuity, pose progression, recovery, seams, shading, and readable silhouettes in every delivered view. A generated contact sheet is evidence to inspect, not approval.

**Technical:** audit decoded alpha, clipping, anchors, coverage, and timing. Use narrow checks for the specific failure: local attachment drift, skin fit, pixel overlap, or unchanged accepted regions. Check emitted geometry/pixels through the actual render path; baker metadata alone can repeat the same mistake.

**Critical:** judge raw output against the brief separately from the creator's technical report. Use an independent reviewer when available and authorized; disclose when review is by the same agent. Do not install known-failing art or call passing tests aesthetic approval.

**Integration:** verify the served renderer at relevant sizes, zooms, and pixel densities, including action transitions, loading/cache behavior, and occlusion. Preserve unrelated behavior. User feedback remains the authority on aesthetic acceptance.

## Inspection Helper

[scripts/inspect-sheet.mjs](scripts/inspect-sheet.mjs) audits frame bounds, alpha, and exact duplicates, and can create a playback/stepping review. It does not repair motion or judge aesthetics.

```sh
node /path/to/sprite-animation/scripts/inspect-sheet.mjs sheet.png \
  --frames frames.json --module-root /path/to/project \
  --report sheet-audit.json --preview sheet-review.html
```

For equal cells, use `--columns 4 --rows 1`. For explicit rectangles, `frames.json` is an array or `{ "frames": [...] }` with `id`, `rect: {x,y,w,h}`, optional `anchor: {x,y}`, and `durationMs`. Adapt this inspection format to the destination schema.

## Maintain and Deliver

Deliver saved assets, a working review, the production method, validation, and material limitations. When maintenance is requested, promote demonstrated lessons into the general guidance and keep project settings, commands, thresholds, and chronology in project references. Prefer replacing redundant guidance to accumulating rules from individual examples. Skill use does not authorize publication, purchases, unrelated changes, or separate memory updates.
