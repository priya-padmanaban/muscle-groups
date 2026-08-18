export const boneMap = {
  pelvis:'Pelvis', spine:'Spine', chest:'Chest', neck:'Neck', head:'Head',
  leftUpperArm:'LeftUpperArm', leftForearm:'LeftForearm', leftHand:'LeftHandGrip',
  rightUpperArm:'RightUpperArm', rightForearm:'RightForearm', rightHand:'RightHandGrip',
  leftThigh:'LeftThigh', leftShin:'LeftShin', leftFoot:'LeftFoot',
  rightThigh:'RightThigh', rightShin:'RightShin', rightFoot:'RightFoot'
} as const;
export type LogicalBone = keyof typeof boneMap;
