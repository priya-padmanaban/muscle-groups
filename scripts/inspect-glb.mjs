import fs from 'node:fs';
const bytes = fs.readFileSync(process.argv[2]);
if (bytes.toString('utf8', 0, 4) !== 'glTF') throw new Error('Not a GLB');
const jsonLength = bytes.readUInt32LE(12);
const json = JSON.parse(bytes.toString('utf8', 20, 20 + jsonLength));
console.log(JSON.stringify({ scenes: json.scenes?.length, nodes: json.nodes?.length, meshes: json.meshes?.length, materials: json.materials?.length, accessors: json.accessors?.length, firstNodes: json.nodes?.slice(0, 12).map(n => n.name), firstMeshes: json.meshes?.slice(0, 12).map(n => n.name) }, null, 2));
