# Example Provenance

These five examples are derived from the delivered Dead Zone / Rigged Tactics graphics, accepted by the project owner. They demonstrate the outcome of the method; they are not the game, a proposed replacement skin, or independently reviewed new artwork.

## Humanoids

Soldier, builder, walker, and exploder are exact copies of delivered PNG atlases. The bundled manifest retains the delivered frame rectangles, pivots, cadence, and calibrated direction labels, with SHA-256 fingerprints of each source PNG. GIFs are enlarged southeast locomotion previews rendered from those cells; no new poses, model warps, or frame crossfades are introduced. The Exploder uses its delivered `Jog_Fwd_Loop` running sequence at 17 FPS, stored under the game's `walk` clip name.

Production used a Quaternius Universal Base Characters Kit skinned model and authored animation library. The supplied [character notice](character-license.txt) and [animation notice](animation-license.txt) identify those source assets as CC0 1.0. Original model/animation binaries are not bundled. The recipe, retargeting equations, attachments, contact constraints, packing, and review requirements are included in the skill's rigged-source reference.

## Vehicle

The white SUV is the exact painted directional atlas retained by the final pack. Its GIF steps through the eight delivered views at four poses per second. It is a turnaround, not a wheel/drive animation.

Tool: the included image-generation tool. Model identity: not exposed. The original production prompt was:

```text
Use attached Brushwork Tactics concept for PAINTED GOUACHE style and camera, not its military truck design. Produce an eight-direction production sprite turnaround of a small WHITE civilian four-seat SUV, sturdy modern square-ended SUV with a non-cubical body, black tires, dark blue-grey windows, small red rear lights, understated charcoal trim. Broad clean gouache-painted shaded planes with lovely restrained lighting, same natural elevated 2:1 isometric RTS camera as reference, NOT 3D rendered, pixel, vector or outlined. EXACTLY FOUR columns by TWO rows = eight individual complete vehicle cutouts with generous true transparent gutters. Direction order top row S (FRONT of SUV points toward viewer), SE (front points lower RIGHT), E (front points RIGHT), NE (front points upper RIGHT, see rear end on left). Bottom row N (rear end toward viewer, front points away), NW (front points upper LEFT), W (front points LEFT), SW (front points lower LEFT). Distinct front grille/headlights vs rear red taillights visibly prove facing. Same vehicle size in each cell, all tires grounded, no terrain, cast shadows outside vehicle, labels, occupants or backgrounds. Do not repeat SE as NE or NW as SW. Every entire bumper and wheel in its cell. Return only transparent eight-view sheet.
```

The source notices concern the original character/animation assets; they do not declare a blanket license for every file in this repository. The original game code, live saves, production models, old experiments, and unrelated game features are not included.

## Rebuild

`npm ci` followed by `npm run examples:render` recreates the GIFs, PNG posters, frame-inspection JSON files, and `previews.json` from the bundled assets. It requires a Chromium browser and FFmpeg. GIF timing is quantized to centiseconds by the format; each locomotion cadence remains the source cadence to that precision. One global palette per clip and no dithering avoid frame-to-frame palette changes and animated dither noise.

## Verification

[validation.json](validation.json) records native Chromium GIF decoding of all 72 preview frames, their distinctness and centisecond timing, non-clipped displayed bounds, and a decoded-pixel audit of all 1,800 bundled source cells. Full decoded cycle grids were visually inspected by the same agent, not an independent model. Fourteen repository tests cover installation safety, source fingerprints, metadata consistency, local links, and portable references. These checks do not turn the skill into an automatic aesthetic judge.
