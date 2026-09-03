import fs from 'node:fs';
import path from 'node:path';
import { slugify } from './_gen_lib.mjs';
import dataA from './_gen_data_a.mjs';
import dataB from './_gen_data_b.mjs';
import dataC from './_gen_data_c.mjs';
import dataD, { extraNodes, relations } from './_gen_data_d.mjs';

const ROOT = 'OCCUPATIONS';
const groups = [...dataA, ...dataB, ...dataC, ...dataD];

// Marginal / redundant / misplaced leaves trimmed to keep the slice within the 800-1300 target.
const REMOVE = new Set([
  'OCC.business.consulting.management_accountant',
  'OCC.science.physical_sciences.chemist.theoretical_chemist',
  'OCC.science.physical_sciences.physicist.optical_physicist',
  'OCC.science.social_sciences.linguist.syntax_researcher',
  'OCC.science.social_sciences.sociologist.urban_sociologist',
  'OCC.science.social_sciences.political_scientist.comparative_politics_researcher',
  'OCC.engineering.civil_engineering.land_surveyor.quantity_surveyor',
  'OCC.trades.woodworking.cooper',
  'OCC.transport.aviation.airline_pilot.corporate_pilot',
  'OCC.agriculture.crop_production.horticulturist.floriculturist',
  'OCC.arts.visual_arts.calligrapher.illuminator',
  'OCC.science.earth_sciences.soil_scientist.pedologist',
  'OCC.it_computing.data_analytics.statistician_programmer',
  'OCC.transport.aviation.ground_crew_agent',
  'OCC.transport.vehicle_maintenance.automotive_mechanic.tire_technician',
  'OCC.business.procurement.procurement_manager.sourcing_specialist',
  'OCC.business.procurement.procurement_specialist'
]);

const slugOf = (n) => n._slug || slugify(n.name);
const idMap = {};
function assign(node, parentPath) {
  const id = parentPath ? parentPath + '.' + slugOf(node) : 'OCC.' + slugOf(node);
  node.id = id;
  idMap[id] = node;
  (node.children || []).forEach((c) => assign(c, id));
}
groups.forEach((g) => assign(g, ''));

for (const ex of extraNodes) {
  const p = idMap[ex.parent];
  if (!p) throw new Error('Unknown extra parent: ' + ex.parent);
  p.children = p.children || [];
  ex.node.id = ex.parent + '.' + slugOf(ex.node);
  p.children.push(ex.node);
}

const nodes = [];
const nameIndex = new Map(); // name -> [ids]
function emit(node, parentId) {
  if (REMOVE.has(node.id)) return;
  const obj = {
    id: node.id,
    name: node.name,
    type: 'OCCUPATION',
    parent: parentId
  };
  if (node.name_zh) obj.name_zh = node.name_zh;
  if (node.description) obj.description = node.description;
  if (node.aliases) obj.aliases = node.aliases;
  if (node.historical) obj.historical = true;
  if (node.global === false) obj.global = false;
  nodes.push(obj);
  if (!nameIndex.has(node.name)) nameIndex.set(node.name, []);
  nameIndex.get(node.name).push(node.id);
  (node.children || []).forEach((c) => emit(c, node.id));
}
groups.forEach((g) => emit(g, ROOT));

// Resolve a unique name to an id (throws on ambiguity/missing).
function resolveName(name) {
  const ids = nameIndex.get(name);
  if (!ids || ids.length === 0) throw new Error('Relation name not found: ' + name);
  if (ids.length > 1) throw new Error('Relation name ambiguous: ' + name + ' -> ' + ids.join(', '));
  return ids[0];
}

const relOut = [];
for (const [s, r, t] of relations) {
  const sid = resolveName(s);
  const tid = t.startsWith('HK.') ? t : resolveName(t);
  relOut.push({ source: sid, relation: r, target: tid });
}

// ---- validation ----
const idSet = new Set(nodes.map((n) => n.id));
if (idSet.size !== nodes.length) {
  const seen = new Map();
  for (const n of nodes) {
    seen.set(n.id, (seen.get(n.id) || 0) + 1);
  }
  const dups = [...seen.entries()].filter(([, c]) => c > 1).map(([i]) => i);
  throw new Error('Duplicate ids: ' + dups.join(', '));
}
const nameDups = [...nameIndex.entries()].filter(([, ids]) => ids.length > 1).map(([n, ids]) => n + ':' + ids.join('|'));
if (nameDups.length) console.log('WARN duplicate names across tree:', nameDups.join(' ; '));

// depth stats
let deepest = 0;
let deepestNode = null;
for (const n of nodes) {
  const seg = n.id.split('.').length - 1; // exclude OCC
  if (seg > deepest) { deepest = seg; deepestNode = n.id; }
}

const nodePath = path.join(process.cwd(), 'data', 'nodes', 'occ.json');
const relPath = path.join(process.cwd(), 'data', 'relations', 'occ.json');
fs.writeFileSync(nodePath, JSON.stringify(nodes, null, 1) + '\n');
fs.writeFileSync(relPath, JSON.stringify(relOut, null, 1) + '\n');

console.log('nodesWritten', nodes.length);
console.log('relationsWritten', relOut.length);
console.log('topLevelChildren', groups.map((g) => g.name));
console.log('deepestLevel', deepest, 'at', deepestNode);
console.log('nameDuplicates', nameDups.length);
console.log('applicationLinks', relOut.filter((r) => r.relation === 'APPLICATION_OF').length);
console.log('overlapLinks', relOut.filter((r) => r.relation === 'OVERLAPS_WITH').length);
console.log('historicalLinks', relOut.filter((r) => r.relation === 'HISTORICAL_SUCCESSOR').length);
