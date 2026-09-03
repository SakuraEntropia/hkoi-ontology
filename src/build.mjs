// HK-OI build: data/**/*.json -> exports/ontology.json + exports/ontology.db (SQLite)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DATA = "data";
const NODES_DIR = join(DATA, "nodes");
const REL_DIR = join(DATA, "relations");
const METRICS_DIR = join(DATA, "metrics");
const OUT_DIR = "exports";

const NODE_TYPES = new Set([
  "UNIVERSE","KNOWLEDGE_FIELD","METHODOLOGY","OCCUPATION","SOCIAL_ROLE",
  "ART_FORM","ART_MOVEMENT","ART_GENRE","ART_TECHNIQUE",
  "SPORT","GAME",
  "INDUSTRY","SECTOR","ECONOMIC_ACTIVITY",
  "PRODUCT","SERVICE","TECHNOLOGY","MATERIAL",
  "ORGANIZATION_TYPE","INSTITUTION",
  "MEDIA_FORM","CONTENT_TYPE",
  "EMERGING_FIELD",
]);

const RELATION_TYPES = new Set([
  "SUBFIELD_OF","SPECIALIZATION_OF","SUBTYPE_OF","SUBFORM_OF","SUBGENRE_OF",
  "SUBSPORT_OF","SUBGAME_OF","SUBINDUSTRY_OF","SUBTECHNOLOGY_OF","PART_OF",
  "METHOD_OF","TECHNIQUE_OF",
  "RELATED_TO","APPLICATION_OF","APPLIES_TO","METHOD_FOR","USED_BY","USES",
  "PRODUCES","CONSUMES","OVERLAPS_WITH","INTERSECTS_WITH",
  "HISTORICAL_PREDECESSOR","HISTORICAL_SUCCESSOR","PRECURSOR_OF","SUCCESSOR_OF",
  "ROLE_IN","SECTOR_OF","TECHNOLOGY_OF","MARKET_OF","MATERIAL_OF",
]);

const PARENT_RELATION = {
  KNOWLEDGE_FIELD:"SUBFIELD_OF", METHODOLOGY:"METHOD_OF", OCCUPATION:"SPECIALIZATION_OF",
  SOCIAL_ROLE:"SPECIALIZATION_OF", ART_FORM:"SUBFORM_OF", ART_MOVEMENT:"PART_OF",
  ART_GENRE:"SUBGENRE_OF", ART_TECHNIQUE:"TECHNIQUE_OF", SPORT:"SUBSPORT_OF", GAME:"SUBGAME_OF",
  INDUSTRY:"SUBINDUSTRY_OF", SECTOR:"SUBINDUSTRY_OF", ECONOMIC_ACTIVITY:"PART_OF",
  PRODUCT:"SUBTYPE_OF", SERVICE:"SUBTYPE_OF", TECHNOLOGY:"SUBTECHNOLOGY_OF", MATERIAL:"SUBTYPE_OF",
  ORGANIZATION_TYPE:"SUBTYPE_OF", INSTITUTION:"SUBTYPE_OF", MEDIA_FORM:"SUBTYPE_OF",
  CONTENT_TYPE:"SUBTYPE_OF", EMERGING_FIELD:"SUBFIELD_OF", UNIVERSE:"PART_OF",
};

// metric ordinal vocab (validation = warn only)
const METRIC_VOCAB = {
  growth: new Set(["rapidly_growing","growing","stable","declining","rapidly_declining","unknown"]),
  historical_significance: new Set(["negligible","low","moderate","high","very_high","foundational","unknown"]),
  institutionalization: new Set(["minimal","low","moderate","high","very_high","unknown"]),
  cultural_visibility: new Set(["negligible","low","moderate","high","very_high","unknown"]),
  economic_weight: new Set(["negligible","low","moderate","high","very_high","unknown"]),
  cultural_weight: new Set(["negligible","low","moderate","high","very_high","unknown"]),
  method: new Set(["measured","census","survey","model_estimate","qualitative","expert_judgment"]),
};

function walk(dir, acc = []) {
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return acc;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (p.endsWith(".json")) acc.push(p);
  }
  return acc;
}
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));

const warnings = [], errors = [];
const warn = (m) => warnings.push(m);

// ---- load nodes ----
const nodes = new Map();
for (const f of walk(NODES_DIR)) {
  const data = readJson(f);
  const arr = Array.isArray(data) ? data : [data];
  for (const n of arr) {
    if (nodes.has(n.id)) errors.push(`Duplicate node id ${n.id} (${f})`);
    else nodes.set(n.id, n);
  }
}

// ---- load metrics ----
const metrics = new Map();
for (const f of walk(METRICS_DIR)) {
  const data = readJson(f);
  if (Array.isArray(data)) {
    for (const m of data) { if (m.id) metrics.set(m.id, m); }
  } else {
    for (const [id, m] of Object.entries(data)) metrics.set(id, m);
  }
}

// ---- load relations ----
const explicitRelations = [];
for (const f of walk(REL_DIR)) {
  const data = readJson(f);
  const arr = Array.isArray(data) ? data : [data];
  for (const r of arr) explicitRelations.push(r);
}

const byId = (id) => nodes.get(id);
function universeOf(id, seen = new Set()) {
  if (seen.has(id)) return null; seen.add(id);
  const n = byId(id); if (!n) return null;
  if (n.type === "UNIVERSE") return n.id;
  if (!n.parent) return null;
  return universeOf(n.parent, seen);
}
const levelCache = new Map();
function levelOf(id) {
  if (levelCache.has(id)) return levelCache.get(id);
  const n = byId(id); if (!n) return 0;
  if (n.type === "UNIVERSE" || !n.parent) { levelCache.set(id, 0); return 0; }
  const lv = levelOf(n.parent) + 1; levelCache.set(id, lv); return lv;
}

const normalized = [];
for (const [id, n] of nodes) {
  if (!NODE_TYPES.has(n.type)) errors.push(`${id}: unknown type "${n.type}"`);
  if (!n.name) errors.push(`${id}: missing name`);
  const univ = universeOf(id);
  if (!univ && n.type !== "UNIVERSE") errors.push(`${id}: no universe reachable`);
  if (n.type !== "UNIVERSE" && !n.parent) errors.push(`${id}: non-universe missing parent`);
  if (n.parent && !byId(n.parent)) errors.push(`${id}: parent "${n.parent}" not found`);
  let m = metrics.get(id) ?? null;
  if (m) { m = { id, ...m }; delete m.id; // validate ordinals (warn)
    for (const [k, vocab] of Object.entries(METRIC_VOCAB)) if (m[k] && !vocab.has(m[k])) warn(`${id}: metric ${k}="${m[k]}" not in vocab`);
    if (m.confidence != null && (m.confidence < 0 || m.confidence > 1)) warn(`${id}: confidence ${m.confidence} out of [0,1]`);
    if (m.public_awareness && (m.public_awareness.score < 0 || m.public_awareness.score > 100)) warn(`${id}: awareness score out of [0,100]`);
  }
  normalized.push({
    id, name: n.name, name_en: n.name_en ?? n.name, name_zh: n.name_zh ?? null,
    type: n.type, parent: n.parent ?? null, level: levelOf(id), universe: univ,
    description: n.description ?? null, aliases: n.aliases ?? [], examples: n.examples ?? [],
    historical: !!n.historical, global: n.global !== false,
    metrics: m, source: n.source ?? null,
  });
}
for (const r of explicitRelations) {
  if (!RELATION_TYPES.has(r.relation)) warn(`relation type "${r.relation}" not in vocab (${r.source}->${r.target})`);
  if (!byId(r.source)) errors.push(`relation source "${r.source}" not found`);
  if (!byId(r.target)) errors.push(`relation target "${r.target}" not found`);
}

// ---- relations (parent + explicit) ----
const allRelations = []; const seenRel = new Set();
function addRel(source, relation, target, kind) {
  const key = `${source}||${relation}||${target}`;
  if (seenRel.has(key)) return; seenRel.add(key);
  allRelations.push({ source, relation, target, kind });
}
for (const n of normalized) if (n.parent) addRel(n.id, PARENT_RELATION[n.type] ?? "PART_OF", n.parent, "parent");
for (const r of explicitRelations) addRel(r.source, r.relation, r.target, "explicit");

// ---- combined JSON ----
const combined = {
  meta: {
    name: "HK-OI", title: "Human Knowledge, Occupation & Industry Ontology",
    version: "0.2.0", generatedAt: new Date().toISOString(),
    universes: normalized.filter(n => n.type === "UNIVERSE").map(n => n.id),
    counts: {
      nodes: normalized.length, relations: allRelations.length,
      explicitRelations: explicitRelations.length,
      parentEdges: allRelations.filter(r => r.kind === "parent").length,
      withMetrics: normalized.filter(n => n.metrics).length,
    },
  },
  nodes: normalized,
  relations: allRelations,
};
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "ontology.json"), JSON.stringify(combined, null, 1));

// ---- SQLite ----
const schema = readFileSync("schema.sql", "utf8");
const dbPath = join(OUT_DIR, "ontology.db");
try { writeFileSync(dbPath, ""); } catch {}
const { DatabaseSync } = await import("node:sqlite");
const db = new DatabaseSync(dbPath);
db.exec(schema);
const insNode = db.prepare(`INSERT OR REPLACE INTO nodes
  (id,name,name_en,name_zh,type,parent,level,universe,description,aliases,examples,historical,global,metrics,source)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
const insRel = db.prepare(`INSERT INTO relations (source,relation,target,kind) VALUES (?,?,?,?)`);
db.exec("BEGIN");
for (const n of normalized) insNode.run(n.id, n.name, n.name_en, n.name_zh, n.type, n.parent, n.level, n.universe,
  n.description, JSON.stringify(n.aliases), JSON.stringify(n.examples), n.historical?1:0, n.global?1:0,
  n.metrics ? JSON.stringify(n.metrics) : null, n.source);
for (const r of allRelations) insRel.run(r.source, r.relation, r.target, r.kind);
db.exec("COMMIT");
db.exec(`INSERT OR REPLACE INTO meta VALUES ('generated_at', '${new Date().toISOString()}')`);
db.exec(`INSERT OR REPLACE INTO meta VALUES ('node_count', '${normalized.length}')`);
db.exec(`INSERT OR REPLACE INTO meta VALUES ('relation_count', '${allRelations.length}')`);
db.close();

// ---- summary ----
const byUniv = {}, byType = {}, byLevel = {};
for (const n of normalized) { byUniv[n.universe]=(byUniv[n.universe]??0)+1; byType[n.type]=(byType[n.type]??0)+1; byLevel[n.level]=(byLevel[n.level]??0)+1; }
console.log("=== HK-OI build ===");
console.log("nodes:", normalized.length, "| with metrics:", normalized.filter(n=>n.metrics).length);
console.log("relations:", allRelations.length, "(parent:", allRelations.filter(r=>r.kind==="parent").length, "| explicit:", explicitRelations.length, ")");
console.log("\nby universe:");
for (const [k,v] of Object.entries(byUniv).sort((a,b)=>b[1]-a[1])) console.log("  ", k, v);
console.log("\nby level:");
for (const [k,v] of Object.entries(byLevel).sort((a,b)=>a[0]-b[0])) console.log("  ","L"+k,v);
if (warnings.length) { console.log("\nwarnings:", warnings.length); for (const w of warnings.slice(0,40)) console.log("  !", w); }
if (errors.length) { console.log("\nERRORS:", errors.length); for (const e of errors.slice(0,40)) console.log("  ✗", e); }

export { normalized, allRelations, explicitRelations, warnings, errors };
