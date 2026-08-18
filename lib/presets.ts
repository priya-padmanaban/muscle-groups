import { ExercisePreset, Pose } from './types';
export const neutralPose: Pose = {
  leftHand: [-0.48, 1.02, 0], rightHand: [0.48, 1.02, 0],
  leftFoot: [-0.13, 0.06, 0], rightFoot: [0.13, 0.06, 0], pelvis: [0, 1.18, 0], chestLean: 0
};
const pose = (p: Partial<Pose>): Pose => ({ ...neutralPose, ...p });
export const presets: ExercisePreset[] = [
  { id:'free', name:'Free pose', startPose:neutralPose, endPose:neutralPose, weights:{left:0,right:0}, camera:'perspective' },
  { id:'curl', name:'Biceps curl', startPose:pose({leftHand:[-.48,1.02,.02],rightHand:[.48,1.02,.02]}), endPose:pose({leftHand:[-.42,1.7,-.08],rightHand:[.42,1.7,-.08]}), weights:{left:15,right:15}, camera:'front' },
  { id:'lateral', name:'Lateral raise', startPose:pose({leftHand:[-.48,1.02,0],rightHand:[.48,1.02,0]}), endPose:pose({leftHand:[-1.12,1.78,0],rightHand:[1.12,1.78,0]}), weights:{left:10,right:10}, camera:'front' },
  { id:'squat', name:'Squat', startPose:neutralPose, endPose:pose({pelvis:[0,.72,.18],leftFoot:[-.18,.06,.08],rightFoot:[.18,.06,.08],leftHand:[-.42,1.2,-.2],rightHand:[.42,1.2,-.2],chestLean:.3}), weights:{left:15,right:15}, camera:'side' },
  { id:'deadlift', name:'Deadlift', startPose:pose({pelvis:[0,.92,.22],leftHand:[-.42,.55,-.25],rightHand:[.42,.55,-.25],chestLean:.58}), endPose:neutralPose, weights:{left:25,right:25}, camera:'side' },
  { id:'bench', name:'Bench press', startPose:pose({pelvis:[0,1.05,.1],leftHand:[-.66,1.58,.2],rightHand:[.66,1.58,.2]}), endPose:pose({pelvis:[0,1.05,.1],leftHand:[-.48,2.12,.05],rightHand:[.48,2.12,.05]}), weights:{left:20,right:20}, camera:'perspective' }
];
