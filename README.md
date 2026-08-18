# Kinetic Atlas

Kinetic Atlas is a desktop-first interactive 3D biomechanics sandbox. Pose a segmented anatomical atlas through draggable hand and foot targets, add independent dumbbell loads, capture start/end poses, animate or scrub a rep, and inspect continuously recalculated muscle activity.

## Run locally

```bash
npm install
npm run dev
```

Production verification: `npm run build`. The app uses client-side state only and deploys on Vercel without environment variables.

## Anatomy source and licensing

The visible body is the `anatomy.glb` atlas prepared by Johan Bellander for [BodyExplorer](https://github.com/JohanBellander/BodyExplorer). It contains 467 separately named muscle, tendon, and connective-tissue meshes derived from:

- **BodyParts3D**, Database Center for Life Science — 401 MRI-derived meshes, licensed [CC BY-SA 2.1 Japan](https://creativecommons.org/licenses/by-sa/2.1/jp/).
- **Z-Anatomy**, Gauthier Kervyn and contributors — 66 supplementary meshes, licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

BodyExplorer's source code is MIT licensed; its anatomical meshes retain the licenses above. Redistribution is permitted with attribution and ShareAlike. The local asset is stored at `public/models/bodyparts3d-anatomy.glb`, with its source mapping beside it.

### Processing and integration

BodyExplorer decimated source structures to roughly 4,000 faces each and spatially aligned the BodyParts3D and Z-Anatomy datasets. Kinetic Atlas preserves the 467 named meshes, remaps the medical dataset's axes and millimeter scale into the Three.js scene, recomputes normals and bounds, classifies structures into stable logical muscle groups, and attaches anatomical regions to a rigid segmented IK hierarchy. Materials remain independently controllable for activation and selection.

## Biomechanics approximation

Dumbbells emit generic `ExternalLoad` records: body part, force vector, application point, source type, and mass. The estimator applies gravity (`mass × 9.81`) and horizontal moment arms to estimate shoulder/elbow torque. Hip depth, torso hinge, joint reach, load, and asymmetry feed structured muscle contribution mappings. Static weighted poses remain active. Values are normalized educational estimates, not physiological measurements.

## Architecture

- `components/AnatomyViewer.tsx` — R3F scene, constrained two-segment IK, handles, loads, camera
- `components/anatomy/RealAnatomyModel.tsx` — GLB normalization, anatomical mapping, segmented attachment, activation materials
- `components/Simulator.tsx` — application shell, panels, playback, timeline
- `lib/biomechanics.ts` — loads, torque and activation estimates
- `lib/presets.ts` — data-driven poses and exercise presets
- `lib/store.ts` — client-side simulator state
- `lib/muscles.ts` — muscle definitions and educational descriptions

## Limitations

The anatomical meshes are real atlas data, but their movement uses rigid segment attachment rather than clinical multi-bone skinning. Deformation near joints is therefore approximate. Collision, tendon mechanics, fatigue, equipment contact, and research-grade inverse dynamics are intentionally out of scope. Bench press is approximated standing to preserve the same manipulation system without a bench constraint solver.
