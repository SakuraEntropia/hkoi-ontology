// HK-OI quality-control + analytics report -> reports/report.md + stdout JSON
import { DatabaseSync } from "node:sqlite";
import { mkdirSync, writeFileSync } from "node:fs";

const db = new DatabaseSync("exports/ontology.db");
const q = (sql) => db.prepare(sql).all();
const q1 = (sql) => db.prepare(sql).get();

const L = [];
const line = (s="") => L.push(s);

// ---- summary ----
const totalNodes = q1("SELECT COUNT(*) c FROM nodes").c;
const totalRels = q1("SELECT COUNT(*) c FROM relations").c;
line("# HK-OI Ontology Report");
line();
line("Generated: " + new Date().toISOString());
line();
line("## 1. Summary");
line();
line(`- **Nodes**: ${totalNodes}`);
line(`- **Relations**: ${totalRels}`);
line();

line("### By universe");
line();
line("| universe | nodes |");
line("|---|---|");
for (const r of q("SELECT universe, COUNT(*) c FROM nodes GROUP BY universe ORDER BY c DESC")) line(`| ${r.universe} | ${r.c} |`);
line();

line("### By level");
line();
line("| level | nodes |");
line("|---|---|");
for (const r of q("SELECT level, COUNT(*) c FROM nodes GROUP BY level ORDER BY level")) line(`| L${r.level} | ${r.c} |`);
line();

line("### By type");
line();
line("| type | nodes |");
line("|---|---|");
for (const r of q("SELECT type, COUNT(*) c FROM nodes GROUP BY type ORDER BY c DESC")) line(`| ${r.type} | ${r.c} |`);
line();

// ---- QC ----
line("## 2. Quality Control");
line();
line("### A. Completeness — universes");
line();
line("| universe | nodes | status |");
line("|---|---|---|");
for (const r of q("SELECT universe, COUNT(*) c FROM nodes WHERE type != 'UNIVERSE' GROUP BY universe ORDER BY c")) {
  line(`| ${r.universe} | ${r.c} | ${r.c < 30 ? "⚠ under-developed" : "ok"} |`);
}
line();

line("### B. Granularity — max depth reached per universe");
line();
line("| universe | max level |");
line("|---|---|");
for (const r of q("SELECT universe, MAX(level) m FROM nodes GROUP BY universe ORDER BY m DESC")) line(`| ${r.universe} | ${r.m} |`);
line();

line("### C. Overlap — cross-link relations");
line();
line("| relation | count |");
line("|---|---|");
for (const r of q("SELECT relation, COUNT(*) c FROM relations GROUP BY relation ORDER BY c DESC")) line(`| ${r.relation} | ${r.c} |`);
line();

line("### D. Duplication — identical names");
line();
const dups = q("SELECT name, COUNT(*) c FROM nodes GROUP BY name HAVING c > 1 ORDER BY c DESC LIMIT 30");
line(`Potential duplicate names: ${dups.length}`);
line();
for (const r of dups) line(`- ${r.name} (x${r.c})`);
line();

line("### F. Cultural bias — region-specific nodes");
line();
line(`- region-specific (global=false): ${q1("SELECT COUNT(*) c FROM nodes WHERE global=0").c}`);
line();

line("### G. Historical — extinct categories");
line();
line(`- historical: ${q1("SELECT COUNT(*) c FROM nodes WHERE historical=1").c}`);
line();

// ---- analytics ----
line("## 3. Analytics (sample questions)");
line();

// Q1 math fields
line("### Q1. 数学有哪些领域? (subtree of Mathematics)");
line();
const mathSub = q("WITH RECURSIVE sub(id) AS (SELECT 'HK.mathematics' UNION ALL SELECT n.id FROM nodes n JOIN sub s ON n.parent=s.id) SELECT id,name,level FROM nodes WHERE id IN (SELECT id FROM sub) AND id != 'HK.mathematics' ORDER BY level, id");
line(`- count: ${mathSub.length}`);
line();
line("| level | example nodes |");
line("|---|---|");
const byLvl = {};
for (const r of mathSub) (byLvl[r.level] = byLvl[r.level] || []).push(r.name);
for (const [lv, names] of Object.entries(byLvl).sort((a,b)=>a[0]-b[0])) line(`| L${lv} | ${names.slice(0,14).join(", ")}… |`);
line();

// Q historical
line("### Q. 有哪些已经消失的职业? (historical nodes)");
line();
const hist = q("SELECT name FROM nodes WHERE historical=1 ORDER BY name LIMIT 40");
line(`- count: ${q1("SELECT COUNT(*) c FROM nodes WHERE historical=1").c}`);
for (const r of hist) line(`- ${r.name}`);
line();

// Q emerging
line("### Q. 正在诞生的新领域 (emerging fields)");
line();
for (const r of q("SELECT name FROM nodes WHERE type='EMERGING_FIELD' ORDER BY name")) line(`- ${r.name}`);
line();

// Q most connected nodes
line("### Q. 关联最多的节点 (most cross-linked)");
line();
line("| node | degree |");
line("|---|---|");
for (const r of q("SELECT n.name, COUNT(*) d FROM relations r JOIN nodes n ON n.id=r.source GROUP BY n.id ORDER BY d DESC LIMIT 20")) line(`| ${r.name} | ${r.d} |`);
line();

// Q occupations spanning most knowledge (relations from OCCUPATION to KNOWLEDGE_FIELD)
line("### Q. 哪些职业跨越最多知识领域? (occupation -> knowledge links)");
line();
const occ = q("SELECT n.name, COUNT(*) d FROM relations r JOIN nodes n ON n.id=r.source WHERE n.type='OCCUPATION' AND r.target LIKE 'HK.%' GROUP BY n.id ORDER BY d DESC LIMIT 15");
for (const r of occ) line(`- ${r.name}: ${r.d}`);
if (!occ.length) line("_none yet — pending cross-universe links_");
line();

// Q industries with most occupations
line("### Q. 哪些产业拥有最多不同职业? (industry -> occupation links)");
line();
const ind = q("SELECT n.name, COUNT(*) d FROM relations r JOIN nodes n ON n.id=r.source WHERE n.type IN ('INDUSTRY','SECTOR') AND r.target LIKE 'OCC.%' GROUP BY n.id ORDER BY d DESC LIMIT 15");
for (const r of ind) line(`- ${r.name}: ${r.d}`);
if (!ind.length) line("_none yet — pending cross-universe links_");
line();

line("## 4. Note");
line();
line("Cross-universe links (occupation↔industry↔technology↔knowledge) are authored in a later pass; the last two tables populate as that graph is filled in.");

mkdirSync("reports", { recursive: true });
writeFileSync("reports/report.md", L.join("\n"));

db.close();
console.log(JSON.stringify({ totalNodes, totalRels, wrote: "reports/report.md" }));
