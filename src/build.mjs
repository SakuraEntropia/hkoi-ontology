// HK-OI build pipeline: data/**/*.json -> exports/ontology.json + exports/ontology.db (SQLite)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const DATA = "data";
const NODES_DIR = join(DATA, "nodes");
const REL_DIR = join(DATA, "relations");
const OUT_DIR = "exports";

export const NODE_TYPES = new Set([
  "UNIVERSE","KNOWLEDGE_FIELD","METHODOLOGY","OCCUPATION","SOCIAL_ROLE",
  "ART_FORM","ART_MOVEMENT","ART_GENRE","ART_TECHNIQUE",
  "SPORT","GAME",
  "INDUSTRY","SECTOR","ECONOMIC_ACTIVITY",
  "PRODUCT","SERVICE","TECHNOLOGY","MATERIAL",
  "ORGANIZATION_TYPE","INSTITUTION",
  "MEDIA_FORM","CONTENT_TYPE",
  "EMERGING_FIELD",
]);

export const RELATION_TYPES = new Set([
  "SUBFIELD_OF","SPECIALIZATION_OF","SUBTYPE_OF","SUBFORM_OF","SUBGENRE_OF",
  "SUBSPORT_OF","SUBGAME_OF","SUBINDUSTRY_OF","SUBTECHNOLOGY_OF","PART_OF",
  "METHOD_OF","TECHNIQUE_OF",
  "RELATED_TO","APPLICATION_OF","APPLIES_TO","METHOD_FOR","USED_BY","USES",
  "PRODUCES","CONSUMES","OVERLAPS_WITH","INTERSECTS_WITH",
  "HISTORICAL_PREDECESSOR","HISTORICAL_SUCCESSOR","PRECURSOR_OF","SUCCESSOR_OF",
  "ROLE_IN","SECTOR_OF","TECHNOLOGY_OF","MARKET_OF","MATERIAL_OF",
]);

// relation type to use when materializing a parent (tree) edge, by child node type
const PARENT_RELATION = {
  KNOWLEDGE_FIELD: "SUBFIELD_OF",
  METHODOLOGY: "METHOD_OF",
  OCCUPATION: "SPECIALIZATION_OF",
  SOCIAL_ROLE: "SPECIALIZATION_OF",
  ART_FORM: "SUBFORM_OF",
  ART_MOVEMENT: "PART_OF",
  ART_GENRE: "SUBGENRE_OF",
  ART_TECHNIQUE: "TECHNIQUE_OF",
  SPORT: "SUBSPORT_OF",
  GAME: "SUBGAME_OF",
  INDUSTRY: "SUBINDUSTRY_OF",
  SECTOR: "SUBINDUSTRY_OF",
  ECONOMIC_ACTIVITY: "PART_OF",
  PRODUCT: "SUBTYPE_OF",
  SERVICE: "SUBTYPE_OF",
  TECHNOLOGY: "SUBTECHNOLOGY_OF",
  MATERIAL: "SUBTYPE_OF",
  ORGANIZATION_TYPE: "SUBTYPE_OF",
  INSTITUTION: "SUBTYPE_OF",
  MEDIA_FORM: "SUBTYPE_OF",
  CONTENT_TYPE: "SUBTYPE_OF",
  EMERGING_FIELD: "SUBFIELD_OF",
  UNIVERSE: "PART_OF",
};

// ---- filesystem ----
import { readdirSync, statSync } from "node:fs";
function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (p.endsWith(".json")) acc.push(p);
  }
  return acc;
}
function readJson(p) { return JSON.parse(readFileSync(p, "utf8")); }

// ---- load ----
const nodeFiles = walk(NODES_DIR);
const relFiles = walk(REL_DIR);

const nodes = new Map();
for (const f of nodeFiles) {
  const data = readJson(f);
  const arr = Array.isArray(data) ? data : [data];
  for (const n of arr) {
    if (nodes.has(n.id)) throw new Error(`Duplicate node id ${n.id} (${f})`);
    nodes.set(n.id, n);
  }
}
const explicitRelations = [];
for (const f of relFiles) {
  const data = readJson(f);
  const arr = Array.isArray(data) ? data : [data];
  for (const r of arr) explicitRelations.push(r);
}

// ---- normalize / validate ----
const warnings = [];
const errors = [];
function warn(m){ warnings.push(m); }

const byId = (id) => nodes.get(id);

// derive universe by walking up
function universeOf(id, seen = new Set()) {
  if (seen.has(id)) return null;
  seen.add(id);
  const n = byId(id);
  if (!n) return null;
  if (n.type === "UNIVERSE") return n.id;
  if (!n.parent) return null;
  return universeOf(n.parent, seen);
}
// derive level by walking up (memoized)
const levelCache = new Map();
function levelOf(id) {
  if (levelCache.has(id)) return levelCache.get(id);
  const n = byId(id);
  if (!n) return 0;
  if (n.type === "UNIVERSE") { levelCache.set(id, 0); return 0; }
  if (!n.parent) { levelCache.set(id, 0); return 0; }
  const lv = levelOf(n.parent) + 1;
  levelCache.set(id, lv);
  return lv;
}

const normalized = [];
for (const [id, n] of nodes) {
  if (!NODE_TYPES.has(n.type)) errors.push(`${id}: unknown type "${n.type}"`);
  if (!n.name) errors.push(`${id}: missing name`);
  const univ = universeOf(id);
  if (!univ && n.type !== "UNIVERSE") errors.push(`${id}: no universe reachable via parent chain`);
  if (n.type !== "UNIVERSE" && !n.parent) errors.push(`${id}: non-universe node missing parent`);
  if (n.parent && !byId(n.parent)) errors.push(`${id}: parent "${n.parent}" not found`);
  const level = levelOf(id);
  const node = {
    id,
    name: n.name,
    name_en: n.name_en ?? n.name,
    name_zh: n.name_zh ?? null,
    type: n.type,
    parent: n.parent ?? null,
    level,
    universe: univ,
    description: n.description ?? null,
    aliases: n.aliases ?? [],
    examples: n.examples ?? [],
    historical: !!n.historical,
    global: n.global !== false,
    source: n.source ?? null,
  };
  normalized.push(node);
}
for (const r of explicitRelations) {
  if (!RELATION_TYPES.has(r.relation)) warn(`relation type "${r.relation}" not in vocabulary (${r.source}->${r.target})`);
  if (!byId(r.source)) errors.push(`relation source "${r.source}" not found`);
  if (!byId(r.target)) errors.push(`relation target "${r.target}" not found`);
}

// ---- build relations (parent edges + explicit) ----
const allRelations = [];
const seenRel = new Set();
function addRel(source, relation, target, kind) {
  const key = `${source}||${relation}||${target}`;
  if (seenRel.has(key)) return;
  seenRel.add(key);
  allRelations.push({ source, relation, target, kind });
}
for (const n of normalized) {
  if (n.parent) {
    const rel = PARENT_RELATION[n.type] ?? "PART_OF";
    addRel(n.id, rel, n.parent, "parent");
  }
}
for (const r of explicitRelations) {
  addRel(r.source, r.relation, r.target, "explicit");
}

// ---- write combined JSON ----
const byId2 = new Map(normalized.map((n) => [n.id, n]));
const combined = {
  meta: {
    name: "HK-OI",
    title: "Human Knowledge, Occupation & Industry Ontology",
    version: "0.1.0",
    generatedAt: new Date().toISOString(),
    universes: normalized.filter((n) => n.type === "UNIVERSE").map((n) => n.id),
    counts: {
      nodes: normalized.length,
      relations: allRelations.length,
      explicitRelations: explicitRelations.length,
      parentEdges: allRelations.filter((r) => r.kind === "parent").length,
    },
  },
  nodes: normalized,
  relations: allRelations,
};
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "ontology.json"), JSON.stringify(combined, null, 1));

// ---- write SQLite ----
let sqlite = null;
try {
  const { DatabaseSync } = await import("node:sqlite");
  sqlite = DatabaseSync;
} catch {
  warn("node:sqlite unavailable -> writing SQL dump only");
}
const dbPath = join(OUT_DIR, "ontology.db");
try { writeFileSync(dbPath, ""); } catch {}

const schema = readFileSync("schema.sql", "utf8");
if (sqlite) {
  const db = new sqlite(dbPath);
  db.exec(schema);
  const insNode = db.prepare(`INSERT OR REPLACE INTO nodes
    (id,name,name_en,name_zh,type,parent,level,universe,description,aliases,examples,historical,global,source)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
  const insRel = db.prepare(`INSERT INTO relations (source,relation,target,kind) VALUES (?,?,?,?)`);
  db.exec("BEGIN");
  for (const n of normalized) {
    insNode.run(n.id, n.name, n.name_en, n.name_zh, n.type, n.parent, n.level, n.universe,
      n.description, JSON.stringify(n.aliases), JSON.stringify(n.examples), n.historical?1:0, n.global?1:0, n.source);
  }
  for (const r of allRelations) insRel.run(r.source, r.relation, r.target, r.kind);
  db.exec("COMMIT");
  db.exec(`INSERT OR REPLACE INTO meta VALUES ('generated_at', '${new Date().toISOString()}')`);
  db.exec(`INSERT OR REPLACE INTO meta VALUES ('node_count', '${normalized.length}')`);
  db.exec(`INSERT OR REPLACE INTO meta VALUES ('relation_count', '${allRelations.length}')`);
  db.close();
}

// ---- summary ----
const byUniv = {};
const byType = {};
const byLevel = {};
for (const n of normalized) {
  byUniv[n.universe] = (byUniv[n.universe] ?? 0) + 1;
  byType[n.type] = (byType[n.type] ?? 0) + 1;
  byLevel[n.level] = (byLevel[n.level] ?? 0) + 1;
}

console.log("=== HK-OI build ===");
console.log("nodes:", normalized.length);
console.log("relations:", allRelations.length, "(parent edges:", allRelations.filter(r=>r.kind==="parent").length, "| explicit:", explicitRelations.length, ")");
console.log("\nby universe:");
for (const [k,v] of Object.entries(byUniv).sort((a,b)=>b[1]-a[1])) console.log("  ", k, v);
console.log("\nby level:");
for (const [k,v] of Object.entries(byLevel).sort((a,b)=>a[0]-b[0])) console.log("  ", "L"+k, v);
console.log("\nby type:");
for (const [k,v] of Object.entries(byType).sort((a,b)=>b[1]-a[1])) console.log("  ", k, v);
if (warnings.length) { console.log("\nwarnings:", warnings.length); for (const w of warnings.slice(0,40)) console.log("  !", w); }
if (errors.length) { console.log("\nERRORS:", errors.length); for (const e of errors.slice(0,40)) console.log("  ✗", e); }

export { normalized, allRelations, explicitRelations, warnings, errors, byUniv, byType, byLevel };
