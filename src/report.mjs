// HK-OI quality-control & analytics report
import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("exports/ontology.db");
const q = (sql) => db.prepare(sql).all();

const out = {};
out.totalNodes = q("SELECT COUNT(*) c FROM nodes")[0].c;
out.totalRelations = q("SELECT COUNT(*) c FROM relations")[0].c;

out.byUniverse = q("SELECT universe, COUNT(*) c FROM nodes GROUP BY universe ORDER BY c DESC");
out.byType = q("SELECT type, COUNT(*) c FROM nodes GROUP BY type ORDER BY c DESC");
out.byLevel = q("SELECT level, COUNT(*) c FROM nodes GROUP BY level ORDER BY level");
out.historical = q("SELECT COUNT(*) c FROM nodes WHERE historical=1")[0].c;
out.global = q("SELECT COUNT(*) c FROM nodes WHERE global=1")[0].c;
out.orphans = q("SELECT id FROM nodes WHERE parent IS NULL AND type != 'UNIVERSE'");
out.relationTypes = q("SELECT relation, COUNT(*) c FROM relations GROUP BY relation ORDER BY c DESC");

// industries with the most occupations (via relations/explicit links)
out.mostConnectedNodes = q(`
  SELECT n.id, n.name, COUNT(*) AS deg
  FROM relations r JOIN nodes n ON n.id = r.source
  GROUP BY n.id ORDER BY deg DESC LIMIT 25`);

console.log(JSON.stringify(out, null, 1));
db.close();
