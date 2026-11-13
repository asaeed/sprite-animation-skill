# Lessons From Sprite Production

These observations come from iterative sprite production and user review. They inform decisions, not universal style, pose, or numerical defaults. Bundled outcomes remain in [the example profile](dead-zone.md); detailed algorithms are in [rigged sources](rigged-to-sprites.md).

## Source Quality and Motion Quality Differ

Generated artwork improved shading while still repeating phases, changing identity, or supplying incorrect views. Flat-image deformation and generic cutout bindings stretched or reassigned anatomy when the source lacked hidden surfaces. Better registration, palette matching, and more frames did not fix those structural errors. Appropriate artist-made rigged sources improved repeatable depth/articulation, but did not guarantee an exact painted style or approve an entire roster.

## Preserve What the User Actually Approved

Users often accepted one walk and a different attack, or requested a local hand adjustment after approving clothing and proportions. Rebuilding the whole pose could undo the accepted result. Freezing action/view scope, comparing synchronously, and checking unchanged landmarks/pixels made local refinements reliable. Display resizing was also distinct from remodeling; stretching a rig to create bulk distorted anatomy.

## The Right Attachment Frame Matters

World-fixed wrist targets made carried equipment appear suspended. Moving it with the torso or gripping hand, then solving actual palm contacts, restored the relationship. A skin-sampled waistband still slid relative to the hips because the skin blended several joints. A pelvis-local seam with a matching narrow skin band solved that specific case. The general lesson is to choose the intended moving parent and verify both attachment invariance and surface fit; skin-following and joint-following are different requirements.

## Position Does Not Determine Orientation or Clearance

Correct wrist endpoints coexisted with reversed palms, rigid wrists, and sleeves crossing the torso. Anatomical hand axes, mirrored handedness, independent palm roll, and restrained wrist/finger relaxation fixed orientation without changing arm reach. A better bend plane or joint roll could repair clearance locally. Joint tests needed actual posed-surface and rendered-silhouette checks.

## Recovery Belongs to the Intended State

Unwanted lead-in and tail poses made otherwise useful strikes look wrong. Returning to full rest between repeated actions caused visible stutters. Selecting a useful interval and returning to its ready pose improved the sequence, while changing a whole source clip could disturb accepted locomotion. The transferable decision is to inspect meaningful boundaries and runtime transitions, not reuse a particular frame number or force every action back to neutral.

## Coverage and Measurements Need Rendered Evidence

Correct top anchors did not prevent twisted garment panels or projected legs showing through cloth. Consistent boundary correspondence, fitted volume, and reviewed 2D compositing addressed different parts of the problem. Flat-color masks caught actual overlap failures; stale skin-probe matrices also produced false errors after facing changes. Local geometry measurements, decoded pixels, and actual renderer checks supplied complementary evidence, not interchangeable approval.

## Stable Assets Still Need Integration Review

Per-subject motion envelopes preserved pivots while reducing wasted padding. Source density, filtered display size, direction calibration, contact/shadow alignment, and loading/cache behavior remained separate concerns. Passing tests and nonblank frames repeatedly coexisted with visibly poor motion. Review complete cycles and transitions at the intended scale, and distinguish same-agent inspection, independent review, and user acceptance.
