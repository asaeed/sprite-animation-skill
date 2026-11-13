# Sprite Production Methodology

Shared guidance for animated characters, objects, effects, and other 2D assets. Use [raster sources](raster-sources.md) or [rigged sources](rigged-to-sprites.md) for method-specific details. Project settings and historical examples belong in [project profiles](dead-zone.md).

## Source and Method

Identify the hardest motion requirement before choosing a tool: changing silhouette, depth, hidden surfaces, articulation, contact, or identity consistency. A quiet cycle does not prove that the same method can handle a broad action or new view.

Assign references separate jobs: appearance, pose/motion, camera, or layout. Inspect the actual source instead of trusting requested grids, part names, or a style label. Segmented art needs complete overlapping components; a flattened image cannot reveal hidden surfaces. A rigged source needs suitable topology, weights, proportions, and authored motion. A crude model does not establish the quality ceiling of rendered sprites.

Keep raw sources before registration, palette calibration, or cleanup. Those repairs can reduce drift but cannot fix an incorrect pose or repeated phase. Change the source or method when structural failures persist.

## Translate Feedback Into a Bounded Edit

Record what is approved and what should change: silhouette, proportion, action, hand/part orientation, attachment, cadence, or presentation size. Preserve accepted clips and features while piloting the affected combination. An approved walk does not approve an attack, and feedback on one hand does not require reposing both arms.

Use synchronous before/after playback with identical lighting, camera, anchor, and time. Check unchanged regions through decoded pixels or fixed landmarks where appropriate. Hashes are useful for exact preservation; they do not establish quality of changed artwork.

For size feedback, distinguish presentation scale from anatomy. Uniform display resizing should preserve the source and pivot; changing body/object shape may require remodeling and weight repair. Strong nonuniform scaling can stretch joints and distort motion. Use an appropriate fresh source when the proportions cannot support the intended silhouette, while preserving the project's identity and source rights.

## Motion and State Boundaries

Define key poses, anticipation, contact/emphasis, follow-through, recovery, and holds where relevant. Timing and pose progression make motion readable; frame count alone does not.

Inspect authored motion before adding corrections. Extra lean can compound an existing crouch, and a whole-body action may move parts intended to remain still. Select or edit the useful interval, then inspect its new start/end and loop seam. A combat action might return to a ready guard; a mechanism might return to a loaded or open state. Use the intended state, not an arbitrary universal rest frame.

Treat transitions as deliverables. Verify what the runtime selects between actions, including brief idle periods and repeated attacks. Blend compatible poses or author a recovery where necessary; more samples or a crossfade cannot repair conflicting endpoint structure. Preserve source duration deliberately when changing sample count or playback cadence.

Express direction in the subject's frame before projection. Screen-left/right does not reliably identify an anatomical side, leading edge, or depth relationship. Keep part ownership consistent through turns. For constrained articulation, solve position, bend, orientation, and secondary motion separately; a correct endpoint can still have an incorrect palm, joint roll, or surface intersection.

## Attachments and Coverage

Choose the moving frame according to what the attachment belongs to: a hip, hand, head, hinge, chassis, or a deforming surface. Being fixed in world space is not being attached. Skin-following is also different from remaining rigid relative to a joint; inspect the intended relationship explicitly.

Establish the attachment shape in its reference pose and preserve that correspondence through the cycle. Resampling a moving surface by a world-height slice or changing bounds can make an apparently fitted part slide. Check local position/orientation invariance and the actual emitted surface gap; neither alone proves both anchoring and fit. Detailed rigging approaches are in [rigged-to-sprites.md](rigged-to-sprites.md).

Coverage is a volume and projection problem as well as an attachment problem. Review front, rear, side, and extreme poses. Match clothing, shells, or covers to both the attachment surface and the moving contents. Adjust motion only when that suits the brief; preserve actual travel speed deliberately when changing stride and cadence. A shorter step is not automatically a slower-moving actor.

For intentionally layered 2D output, explicit masks or depth passes can prevent covered parts from showing through. Preserve legitimate exposed regions, contact continuity, and self-occlusion; check all required views. This is a sprite compositing technique, not proof of collision-free 3D geometry. Diagnostic flat-color masks can test whether actual overlap is covered, but the pixel check must exercise overlap rather than pass vacuously.

## Packing, Scale, and Sampling

Register to a meaningful pivot/contact/landmark; changing alpha bounds are unsuitable for independent centering. Measure the union of emitted silhouettes over every action/view, add padding, and crop all cells consistently. Preserve intentional bob and root motion.

Keep source resolution, useful atlas body/object pixels, padding, and displayed CSS size distinct. Larger empty cells add decode cost, not detail. Minimize reductions and use filtering appropriate to the style. Recover native originals when available rather than upscaling reduced exports. Compare at the actual display size and relevant zoom/DPR settings.

Calibrate direction labels against the renderer's real projection and movement. A reversed turn order differs from a half-turn; do not fix either by mirroring asymmetrical art. Keep corrections idempotent across partial rebuilds. For vehicles or elongated objects, the contact plane may differ from the lowest visible pixel; verify shadow and selection alignment separately from collision bounds.

## Review and Runtime Evidence

Keep source quality, motion quality, packaging correctness, and runtime correctness as separate findings. Define observable requirements before production, then inspect complete cycles and transitions rather than only selected peaks. Nonblank frames, unique pixels, and fixed bone lengths can coexist with visibly bad motion.

Use focused independent evidence: replay the emitted pose onto the source surface, inspect decoded frame masks, verify unchanged pixels, or exercise the actual destination selector. Refresh transforms before geometry probes; stale or differently ordered state can invalidate measurements. Record exclusions and input fingerprints for approximate collision/envelope tests.

Review playback at native and enlarged scale, normal and slow speed, and by stepping through problem regions and seams. Judge raw images separately from the technical report. State whether critical review is by the same agent or an independent reviewer; neither replaces the user's aesthetic judgment.

Check the served asset bytes and renderer after installation. Content-hashed files or appropriate cache invalidation prevent an old image from masquerading as a failed fix. Verify action selection, loading/retry behavior, and scene sampling. When performance matters, measure actual drawing work before reducing animation quality: static redraws, offscreen panels, and canvas resizing may dominate. Report conditions instead of promising a universal frame rate.

Keep a compact evidence record with the asset: approved brief and scope, sources/licenses/tool, camera and scale, frame/pivot/timing contract, observed visual results, technical/runtime checks, preservation evidence, and remaining gaps. Keep numerical settings and chronology out of this general guide.
