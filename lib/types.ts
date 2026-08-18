export type Vec3 = [number, number, number];
export type TargetKey = 'leftHand' | 'rightHand' | 'leftFoot' | 'rightFoot';
export type Pose = Record<TargetKey, Vec3> & { pelvis: Vec3; chestLean: number };
export type Side = 'left' | 'right' | 'center';
export type MuscleId = 'biceps'|'triceps'|'antDelts'|'latDelts'|'postDelts'|'pectorals'|'trapezius'|'lats'|'abs'|'obliques'|'erectors'|'glutes'|'quads'|'hamstrings'|'calves';
export type ActivationMap = Record<string, number>;
export type ExternalLoad = { bodyPart: TargetKey; forceVector: Vec3; applicationPoint: Vec3; sourceType: 'dumbbell'; massKg: number };
export type ExercisePreset = { id: string; name: string; startPose: Pose; endPose: Pose; weights: { left: number; right: number }; camera: 'front'|'side'|'perspective' };
