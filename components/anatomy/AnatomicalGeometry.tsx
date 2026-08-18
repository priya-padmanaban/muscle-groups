'use client';
import * as THREE from 'three';
import { useMemo } from 'react';

export type FormKind = 'fusiform' | 'tapered' | 'sheet' | 'fan' | 'joint';

function formGeometry(kind: FormKind, radial = 16, rows = 12) {
  const positions:number[]=[]; const indices:number[]=[];
  for(let y=0;y<=rows;y++){
    const t=y/rows, yy=t-.5;
    let width=1, depth=1;
    if(kind==='fusiform'){width=.28+.72*Math.pow(Math.sin(Math.PI*t),.65);depth=.38+.62*Math.sin(Math.PI*t)}
    if(kind==='tapered'){width=.22+.9*Math.pow(1-t,.58);depth=.28+.72*Math.pow(1-t,.72)}
    if(kind==='sheet'){width=.72+.28*Math.sin(Math.PI*t);depth=.22+.12*Math.sin(Math.PI*t)}
    if(kind==='fan'){width=.2+.95*t;depth=.2+.35*t}
    if(kind==='joint'){width=.72+.28*Math.sin(Math.PI*t);depth=width}
    for(let x=0;x<radial;x++){const a=x/radial*Math.PI*2;positions.push(Math.cos(a)*width,yy,Math.sin(a)*depth)}
  }
  for(let y=0;y<rows;y++)for(let x=0;x<radial;x++){const n=(x+1)%radial,a=y*radial+x,b=y*radial+n,c=(y+1)*radial+n,d=(y+1)*radial+x;indices.push(a,b,d,b,c,d)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();return g;
}

export function AnatomicalForm({kind='fusiform'}:{kind?:FormKind}){
  const geometry=useMemo(()=>formGeometry(kind),[kind]);
  return <primitive object={geometry} attach="geometry"/>;
}

export function makeSegmentTransform(a:[number,number,number],b:[number,number,number]){
  const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),mid=av.clone().add(bv).multiplyScalar(.5),len=av.distanceTo(bv);
  const quaternion=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),bv.clone().sub(av).normalize());
  return {position:mid.toArray() as [number,number,number],quaternion,length:len};
}
