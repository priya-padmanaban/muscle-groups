import { ActivationMap, ExternalLoad, Pose } from './types';
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const dist=(a:number[],b:number[])=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
export function makeLoads(pose:Pose,leftLb:number,rightLb:number):ExternalLoad[]{
  return ([['leftHand',leftLb],['rightHand',rightLb]] as const).filter(([,lb])=>lb>0).map(([bodyPart,lb])=>({bodyPart,forceVector:[0,-lb*.453592*9.81,0],applicationPoint:pose[bodyPart],sourceType:'dumbbell',massKg:lb*.453592}));
}
export function calculate(p:Pose,leftLb:number,rightLb:number){
  const activations:ActivationMap={}; const torques:Record<string,number>={};
  const pelvisDrop=clamp((1.18-p.pelvis[1])/0.55), hinge=clamp(p.chestLean/0.65);
  for(const side of ['left','right'] as const){
    const hand=p[`${side}Hand`], shoulder:[number,number,number]=[side==='left'?-.39:.39,p.pelvis[1]+.69,-p.chestLean*.2];
    const lb=side==='left'?leftLb:rightLb, force=lb*.453592*9.81;
    const horizontal=Math.hypot(hand[0]-shoulder[0],hand[2]-shoulder[2]);
    const shoulderTorque=force*horizontal; const reach=dist(hand,shoulder);
    const elbowFlex=clamp((.78-reach)/.48); const elbowTorque=force*Math.max(.04,horizontal*.45)*elbowFlex;
    torques[`${side} shoulder`]=shoulderTorque; torques[`${side} elbow`]=elbowTorque;
    const abduction=clamp(Math.abs(hand[0]-shoulder[0])/.95), forward=clamp((shoulder[2]-hand[2]+.15)/.8);
    const load=clamp(force/180), staticBase=lb? .06:0;
    activations[`${side}:latDelts`]=clamp(staticBase+abduction*(.16+load*.9));
    activations[`${side}:antDelts`]=clamp(staticBase+forward*(.18+load*.7));
    activations[`${side}:postDelts`]=clamp(staticBase+Math.max(0,hand[2]-shoulder[2])*(.3+load));
    activations[`${side}:biceps`]=clamp(elbowFlex*(.18+load*.95));
    activations[`${side}:triceps`]=clamp((1-elbowFlex)*load*.32+(hand[1]>shoulder[1]?load*.25:0));
    activations[`${side}:pectorals`]=clamp((hand[1]>shoulder[1]&&Math.abs(hand[0])<.7?.24:0)+load*(hand[1]>1.5?.38:0));
    activations[`${side}:trapezius`]=clamp(abduction*.18+load*abduction*.35);
    activations[`${side}:lats`]=clamp(hinge*.25+load*hinge*.3);
    activations[`${side}:obliques`]=clamp((Math.abs(leftLb-rightLb)/50)*.7+pelvisDrop*.18+hinge*.2);
    activations[`${side}:glutes`]=clamp(pelvisDrop*.75+hinge*.58);
    activations[`${side}:quads`]=clamp(pelvisDrop*.9+(.12*load));
    activations[`${side}:hamstrings`]=clamp(pelvisDrop*.38+hinge*.82);
    activations[`${side}:calves`]=clamp(pelvisDrop*.24+.05);
  }
  activations['center:abs']=clamp(.08+pelvisDrop*.45+hinge*.55+(leftLb+rightLb)/180);
  activations['center:erectors']=clamp(.05+pelvisDrop*.3+hinge*.95+(leftLb+rightLb)*hinge/100);
  torques['hip']=Math.round((pelvisDrop*55+hinge*90+(leftLb+rightLb)*.5)*10)/10;
  torques['spine']=Math.round((hinge*70+(leftLb+rightLb)*hinge*1.1)*10)/10;
  return {activations,torques,loads:makeLoads(p,leftLb,rightLb)};
}
