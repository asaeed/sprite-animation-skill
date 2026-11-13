# Rigged Sources to Sprite Sheets

Use this production route when a rigged source fits the brief. It requires a suitable licensed skinned model, authored animation clips, and a 3D rendering/animation tool such as Three.js or Blender. These are software and asset inputs, not a dependency on a particular project or another skill. This repository bundles final example sheets, not the source models or a universal retargeting application.

## 1. Freeze Inputs and Rest State

Inspect the model, bone hierarchy, weights, axes, limb proportions, materials, and authored clips before changing them. Record licenses and exact dependency versions. Clone skinned scenes with a skeleton-aware clone, not a shallow shared skeleton. Before running any clip, save immutable local positions/quaternions and required world matrices for both source and target. Keep appearance/gear configuration separate from motion.

For compatible named bone frames, a tested quaternion offset is:

```text
offset = targetRestLocalRotation * inverse(sourceRestLocalRotation)
targetPoseLocalRotation = normalize(offset * sourcePoseLocalRotation)
```

This is not a universal correction for arbitrary bone axes or different hierarchies. Incompatible frames require explicitly authored basis conversions or a proven retargeter. Do not calculate the offset from a pose left over by the mixer. For translated roots, apply displacement relative to the source rest root to the target rest root, with a deliberate proportion scale; do not copy absolute positions of every bone.

## 2. Evaluate Samples Independently

For each clip/view/sample: stop/reset active actions, restore target rest transforms, reset whole-object rotation/scale, evaluate the authored clip at the chosen time, and update world matrices. Only then apply local corrections, attachments, and contact constraints. Apply final viewing rotation after subject-local motion constraints so facing cannot change the meaning of up, left, or forward.

Loop sample times normally use `t = i / N` for `i = 0..N-1`; do not duplicate the endpoint. One-shot motion may use `t = i / (N-1)` when its authored final recovery is needed. Keep source-clip duration, baked sample count, playback FPS, and runtime motion phase explicit. If frame count changes, deliberately preserve or revise duration rather than accidentally speeding the action up.

Choose appropriate source clips before adding lean or arm constraints. An already crouched clip should not inherit another subject's upright correction. If the brief requires planted legs, preserve a reviewed lower-body pose while applying the upper-body motion; still inspect weight transfer and all views.

## 3. Moving Props and Real Palm Contacts

For a prop configured in the subject's reference body frame, use:

```text
bodyDelta = currentBodyWorldMatrix * inverse(restBodyWorldMatrix)
propWorldMatrix = bodyDelta * propReferenceWorldMatrix
```

Keep scale inheritance intentional. Transform prop-local grip positions through the resulting prop matrix. Choose a desired hand orientation relative to the prop, and derive wrist targets from a hand-local palm offset:

```text
palmWorld = transformPoint(propWorldMatrix, gripLocal)
handWorldRotation = propWorldRotation * gripToHandRotation
wristTarget = palmWorld - rotate(handWorldRotation, palmLocalOffset)
handLocalRotation = inverse(parentWorldRotation) * handWorldRotation
```

Solve the arm to the wrist target, then assign the intended hand orientation and update matrices. Verify the resulting mesh palm contact, not just the wrist coordinate. If the target is unreachable through part of a cycle, adjust the prop/contact envelope; do not hide an error behind clamping. A prop-only render checks that its motion actually follows the body.

During hands-free work, retain equipment on a reviewed storage frame such as the back, using the same animated-parent principle. Do not constrain freed working hands to a stored prop. Storage poses and equip/stow transitions are different deliverables.

## 4. Two-Bone Contact Geometry

Let `S` be the shoulder, `T` the wrist target, and `a`, `b` the upper/lower segment lengths. Let `u` be the normalized direction from `S` to `T`; choose a stable bend-plane pole in subject-local space and transform it to the solve space. Clamp reach away from singular full extension, but record any resulting target error. With reach `d`:

```text
along = (a*a - b*b + d*d) / (2*d)
bendDirection = normalize(pole - u * dot(pole, u))
bendHeight = sqrt(max(0, a*a - along*along))
elbow = S + u*along + bendDirection*bendHeight
```

If the pole is nearly parallel to `u`, use a stable alternate pole; never normalize a zero vector or allow it to flip arbitrarily between frames. Rotate each bone from its current child direction toward the solved point, convert world rotation through the inverse parent rotation, and update the chain after each change. Smooth a reach boundary where needed. Matching lengths and endpoints still does not prove credible joint roll or skin clearance.

Inspect posed sleeves/forearms against the actual torso and gear. A source-skin vertex/hull audit can expose penetration missed by joint tests; define exclusions, fingerprint inputs, and disclose that it is not full triangle collision or aesthetic approval. Preserve accepted contacts, opposite-limb motion, and unrelated clips while repairing a local clearance issue.

## 5. Orientation and Action Editing

A hand needs an anatomical basis, not only a wrist coordinate. Derive forward from finger landmarks and lateral direction from thumb/pinky landmarks, orthogonalize them, and infer the palm normal with the correct handedness. A shared Euler correction can invert mirrored hands. Apply the desired palm roll and wrist droop in the animated body/part frame after solving the arm, then relax fingers separately. Verify both sides throughout each requested action. A hanging wrist should not require moving an approved shoulder, elbow, or reach target.

For other articulated parts, use equivalent meaningful axes: a tool's grip/working edge, a flap's hinge/normal, or a nozzle's forward direction. Keep orientation ownership separate from position ownership.

Inspect the source action for usable preparation, contact, recovery, and ready poses. Trim unwanted lead-in/tail frames only after checking the new boundaries. A sustained ready pose, retraced recovery, or compatible authored blend may fit a repeated action better than returning to generic idle. Preserve unaffected walking/idle motion. Do not copy a frame number from another clip; choose by the actual pose and intended state.

## 6. Fitted Attachments and Deforming Surfaces

Select the attachment frame deliberately. Hair or a rigid head accessory usually follows the head; a held tool follows the gripping hand; a fitted waistband may need to stay rigid relative to the pelvis even when nearby skin blends spine/thigh influences. Express the attachment's reference points in that parent frame and transform the same points for each pose. Verify inverse-transformed emitted points remain fixed locally.

Fit the original cross-section or surface contour rather than replacing it with a convenient circle or continually re-cutting the animated mesh at world height. For a skin-following attachment, fixed triangle indices plus barycentric weights preserve correspondence. For a rigid joint-following seam, nearby skin may require a small, smoothly transitioned weighting correction so garment and skin share the same motion. This is a targeted mesh edit, not a requirement to pin all clothing or suppress normal torso deformation. Measure both local attachment drift and the actual skin-to-attachment gap.

Construct connected panels from consistently ordered boundary points in the same coordinate frame. Mixing rest and animated bases can reverse radial directions and twist panels despite correct top anchors. Verify the emitted surface from opposing views, not just anchor coordinates. Establish coverage through extreme limb poses before shortening a gait or using masks. For 2D layered renders, keep exposed limb portions connected and retain correct upper-body/hand depth.

CPU skin probes must match the render state: update relevant world/skeleton transforms and, where the engine uses them, attached-mesh bind inverses before sampling. Reset view transforms between samples; a stale previous-facing matrix can produce convincing but false fit errors. Use an isolated flat-color render to cross-check claimed overlap/occlusion.

Fit new accessories to measured local source bounds, inspect face/identity visibility in front and rear views, and match the existing shading pipeline. Vertex colors and material colors may use different color-space conversions; inspect the rendered result rather than judging numeric color values alone.

## 7. Camera, Light, and Stable Packing

Use a fixed orthographic camera and world lighting. Define the projected contact pivot and useful body/object density before rendering. Render all views with consistent materials, exposure, tone mapping, and alpha. A tested illustrated pipeline renders at 4x source size and reduces once with high-quality filtering; deliberate pixel styles need a different sampling decision.

Measure the union of all emitted silhouettes across every action/view for one subject, add motion-safe padding, and crop every cell identically. Adjust the pivot by the same crop offset. Do not recenter individual poses. Bone-height density, atlas padding, and runtime presentation scale are separate parameters.

Map directional labels against the destination engine's actual projection and motion. A reversed turn order is not necessarily a 180-degree error. Preserve already-correct views and make any correction explicit/idempotent. For long objects, validate wheel/foot plane, shadow, and selection together; the lowest opaque pixel is not necessarily the correct world pivot.

## 8. Package and Judge the Result

Emit transparent PNG atlases plus explicit per-clip/per-direction rectangles, frame cadence, looping policy, pivot, and presentation scale. Keep source/license provenance and accepted baseline hashes. The destination can remain a 2D renderer.

Review every delivered sequence/view at normal and slow speed, native and enlarged scale, and through loop transitions. Check pose progression, part ownership, contact/clearance, identity markers, and lighting. Separately audit decoded alpha, clipping, timing, and coverage. Exercise actual served movement, sampling, occlusion, scale, and state transitions. Same-agent review and passing geometry tests do not establish independent or automatic aesthetic approval.
