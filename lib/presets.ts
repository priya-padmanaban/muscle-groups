import { ExercisePreset, Pose } from './types';
export const neutralPose: Pose = {
  leftHand: [-0.72, 1.15, 0], rightHand: [0.72, 1.15, 0],
  leftFoot: [-0.24, 0.08, 0], rightFoot: [0.24, 0.08, 0], pelvis: [0, 1.18, 0], chestLean: 0
};
const pose = (p: Partial<Pose>): Pose => ({ ...neutralPose, ...p });
export const presets: ExercisePreset[] = [
  { id:'free', name:'Free pose', startPose:neutralPose, endPose:neutralPose, weights:{left:0,right:0}, camera:'perspective' },
  { id:'curl', name:'Biceps curl', startPose:pose({leftHand:[-.7,1.08,.02],rightHand:[.7,1.08,.02]}), endPose:pose({leftHand:[-.55,1.72,.08],rightHand:[.55,1.72,.08]}), weights:{left:15,right:15}, camera:'front' },
  { id:'lateral', name:'Lateral raise', startPose:pose({leftHand:[-.68,1.12,0],rightHand:[.68,1.12,0]}), endPose:pose({leftHand:[-1.42,1.86,0],rightHand:[1.42,1.86,0]}), weights:{left:10,right:10}, camera:'front' },
  { id:'squat', name:'Squat', startPose:neutralPose, endPose:pose({pelvis:[0,.72,.18],leftFoot:[-.3,.08,.08],rightFoot:[.3,.08,.08],leftHand:[-.55,1.25,-.2],rightHand:[.55,1.25,-.2],chestLean:.3}), weights:{left:15,right:15}, camera:'side' },
  { id:'deadlift', name:'Deadlift', startPose:pose({pelvis:[0,.92,.22],leftHand:[-.42,.55,-.25],rightHand:[.42,.55,-.25],chestLean:.58}), endPose:neutralPose, weights:{left:25,right:25}, camera:'side' },
  { id:'bench', name:'Bench press', startPose:pose({pelvis:[0,1.05,.1],leftHand:[-.66,1.58,.2],rightHand:[.66,1.58,.2]}), endPose:pose({pelvis:[0,1.05,.1],leftHand:[-.48,2.12,.05],rightHand:[.48,2.12,.05]}), weights:{left:20,right:20}, camera:'perspective' }
];
