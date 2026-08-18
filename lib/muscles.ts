import { MuscleId } from './types';
export const muscleDefinitions: {id:MuscleId;name:string;function:string}[] = [
  {id:'biceps',name:'Biceps',function:'Elbow flexion'},{id:'triceps',name:'Triceps',function:'Elbow extension'},
  {id:'antDelts',name:'Anterior deltoids',function:'Shoulder flexion'},{id:'latDelts',name:'Lateral deltoids',function:'Shoulder abduction'},
  {id:'postDelts',name:'Posterior deltoids',function:'Shoulder extension'},{id:'pectorals',name:'Pectorals',function:'Horizontal shoulder adduction'},
  {id:'trapezius',name:'Trapezius',function:'Scapular elevation and rotation'},{id:'lats',name:'Latissimus dorsi',function:'Shoulder extension and trunk stability'},
  {id:'abs',name:'Rectus abdominis',function:'Trunk flexion and bracing'},{id:'obliques',name:'Obliques',function:'Trunk rotation and lateral stability'},
  {id:'erectors',name:'Erector spinae',function:'Spinal extension and bracing'},{id:'glutes',name:'Glutes',function:'Hip extension'},
  {id:'quads',name:'Quadriceps',function:'Knee extension'},{id:'hamstrings',name:'Hamstrings',function:'Hip extension and knee flexion'},
  {id:'calves',name:'Calves',function:'Ankle plantar flexion'}
];
