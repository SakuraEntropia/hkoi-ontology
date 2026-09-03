// HK-OI export: CSV + Neo4j import files
import { DatabaseSync } from "node:sqlite";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const db = new DatabaseSync(join(process.cwd(), "exports", "ontology.db"), { readOnly: true });
mkdirSync(join(process.cwd(), "exports"), { recursive: true });
mkdirSync(join(process.cwd(), "exports", "neo4j"), { recursive: true });

const csvEsc = (v) => {
  if (v == null) return "";
  const s = String(v);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const line = (cols) => cols.map(csvEsc).join(",") + "\n";

// ---- generic CSV ----
const nodes = db.prepare("SELECT id,name,name_en,name_zh,type,parent,level,universe,description,historical,global FROM nodes ORDER BY id").all();
let out = line(["id","name","name_en","name_zh","type","parent","level","universe","description","historical","global"]);
for (const n of nodes) out += line([n.id,n.name,n.name_en,n.name_zh,n.type,n.parent,n.level,n.universe,n.description,n.historical,n.global]);
writeFileSync(join(process.cwd(),"exports","nodes.csv"), out);

const rels = db.prepare("SELECT source,relation,target,kind FROM relations ORDER BY source").all();
out = line(["source","relation","target","kind"]);
for (const r of rels) out += line([r.source,r.relation,r.target,r.kind]);
writeFileSync(join(process.cwd(),"exports","relations.csv"), out);

// ---- Neo4j ----
// nodes: :ID,:LABEL,id,name,name_zh,type,universe,level
out = line([":ID",":LABEL","id:ID","name","name_zh","type","universe","level:INT"]);
for (const n of nodes) {
  out += line([n.id, "Node;" + n.type, n.id, n.name, n.name_zh, n.type, n.universe, n.level]);
}
writeFileSync(join(process.cwd(),"exports","neo4j","nodes.csv"), out);

// relationships: :START_ID,:END_ID,:TYPE,relation,kind
out = line([":START_ID",":END_ID",":TYPE","relation","kind"]);
for (const r of rels) out += line([r.source, r.target, r.relation, r.relation, r.kind]);
writeFileSync(join(process.cwd(),"exports","neo4j","relationships.csv"), out);

// Cypher load script (for neo4j browser / cypher-shell)
let cypher = "// HK-OI import (run in Neo4j after placing CSV in import dir)\n";
cypher += "// neo4j-admin import:\n";
cypher += "// bin/neo4j-admin database import full --nodes=import/nodes.csv --relationships=import/relationships.csv --overwrite-destination\n\n";
cypher += "LOAD CSV WITH HEADERS FROM 'file:///nodes.csv' AS row\n";
cypher += "CALL (n) { WITH row CALL apoc.create.node([row.:LABEL], {id:row.id, name:row.name, name_zh:row.name_zh, type:row.type, universe:row.universe, level:toInteger(row.level)}) YIELD node RETURN node }\n";
cypher += "RETURN count(*);\n";
writeFileSync(join(process.cwd(),"exports","neo4j","import.cypher"), cypher);

console.log(JSON.stringify({ nodes: nodes.length, relations: rels.length, files: ["exports/nodes.csv","exports/relations.csv","exports/neo4j/nodes.csv","exports/neo4j/relationships.csv","exports/neo4j/import.cypher"] }));
db.close();
