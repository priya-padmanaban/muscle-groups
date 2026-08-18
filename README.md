# Kinetic Atlas

Kinetic Atlas is a desktop-first interactive 3D biomechanics sandbox. Pose a stylized anatomical mannequin through draggable hand and foot targets, add independent dumbbell loads, capture start/end poses, animate or scrub a rep, and inspect continuously recalculated muscle activity.

## Run locally

```bash
npm install
npm run dev
```

Production verification: `npm run build`. The app uses client-side state only and deploys on Vercel without environment variables.

## Model source and licensing

No third-party anatomical model or texture is bundled. The mannequin, muscle volumes, dumbbells, and IK rig are original procedural geometry built at runtime from Three.js primitives in `components/AnatomyViewer.tsx`. Project code is provided under the MIT license (see `LICENSE`). This avoids unclear licensing or attribution requirements while keeping every muscle proxy independently addressable.

The model is a deliberately simplified, non-graphic adult female anatomical abstraction. It is not intended as a detailed anatomical reference.

## Biomechanics approximation

Dumbbells emit generic `ExternalLoad` records: body part, force vector, application point, source type, and mass. The estimator applies gravity (`mass × 9.81`) and horizontal moment arms to estimate shoulder/elbow torque. Hip depth, torso hinge, joint reach, load, and asymmetry feed structured muscle contribution mappings. Static weighted poses remain active. Values are normalized educational estimates, not physiological measurements.

## Architecture

- `components/AnatomyViewer.tsx` — R3F scene, constrained two-segment IK, mannequin, muscle overlays, handles, camera
- `components/Simulator.tsx` — application shell, panels, playback, timeline
- `lib/biomechanics.ts` — loads, torque and activation estimates
- `lib/presets.ts` — data-driven poses and exercise presets
- `lib/store.ts` — client-side simulator state
- `lib/muscles.ts` — muscle definitions and educational descriptions

## Limitations

The procedural model uses proxy muscle volumes and planar two-bone IK, not a clinical skeleton. Collision, tendon mechanics, fatigue, equipment contact, and research-grade inverse dynamics are intentionally out of scope. Bench press is approximated standing to preserve the same manipulation system without a bench constraint solver.
