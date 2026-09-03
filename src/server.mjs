// HK-OI ontology viewer server (no dependencies; uses node:sqlite + node:http)
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";
import { DatabaseSync } from "node:sqlite";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4173;
const ROOT = process.cwd();
const DB_PATH = join(ROOT, "exports", "ontology.db");

if (!existsSync(DB_PATH)) {
  console.error("exports/ontology.db not found. Run: node src/build.mjs");
  process.exit(1);
}

const db = new DatabaseSync(DB_PATH, { readOnly: true });
const qAll = (sql, ...p) => db.prepare(sql).all(...p);
const qOne = (sql, ...p) => db.prepare(sql).get(...p);

const MIME = { ".html":"text/html; charset=utf-8", ".js":"text/javascript", ".css":"text/css", ".json":"application/json", ".svg":"image/svg+xml", ".png":"image/png", ".ico":"image/x-icon" };

function json(res, code, obj) {
  res.writeHead(code, { "Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store" });
  res.end(JSON.stringify(obj));
}

function api(path, query) {
  const seg = path.split("/").filter(Boolean); // e.g. ["api","nodes","HK.mathematics"]
  const q = query || new URLSearchParams("");

  // GET /api/meta
  if (seg[1] === "meta") {
    return {
      totalNodes: qOne("SELECT COUNT(*) c FROM nodes").c,
      totalRelations: qOne("SELECT COUNT(*) c FROM relations").c,
      withMetrics: qOne("SELECT COUNT(*) c FROM nodes WHERE metrics IS NOT NULL").c,
      historical: qOne("SELECT COUNT(*) c FROM nodes WHERE historical=1").c,
      global: qOne("SELECT COUNT(*) c FROM nodes WHERE global=0").c,
      byUniverse: qAll("SELECT universe, COUNT(*) c FROM nodes GROUP BY universe ORDER BY c DESC"),
      byType: qAll("SELECT type, COUNT(*) c FROM nodes GROUP BY type ORDER BY c DESC"),
      byLevel: qAll("SELECT level, COUNT(*) c FROM nodes GROUP BY level ORDER BY level"),
    };
  }

  // GET /api/roots  (universes)
  if (seg[1] === "roots") {
    return qAll("SELECT id,name,name_zh,type,description FROM nodes WHERE type='UNIVERSE' ORDER BY id")
      .map(u => ({ ...u, hasChildren: qOne("SELECT COUNT(*) c FROM nodes WHERE parent=?", u.id).c > 0 }));
  }

  // GET /api/search?q=&limit=
  if (seg[1] === "search") {
    const term = (q.get("q") || "").trim();
    const limit = Math.min(Number(q.get("limit") || 50), 200);
    if (!term) return [];
    const like = "%" + term + "%";
    const rows = qAll(
      "SELECT id,name,name_zh,type,universe,level FROM nodes WHERE name LIKE ?1 OR name_en LIKE ?1 OR name_zh LIKE ?1 OR id LIKE ?1 ORDER BY CASE WHEN name = ?2 THEN 0 WHEN name LIKE ?2 THEN 1 ELSE 2 END, level, name LIMIT ?3",
      like, term, limit
    );
    return rows;
  }

  // GET /api/children?parent=ID
  if (seg[1] === "children") {
    const parent = q.get("parent") || "";
    if (!parent) return [];
    return qAll(
      "SELECT id,name,name_zh,type,level,universe,(SELECT COUNT(*) FROM nodes c WHERE c.parent=n.id) AS childCount FROM nodes n WHERE parent=? ORDER BY name",
      parent
    );
  }

  // GET /api/nodes/:id
  if (seg[1] === "nodes" && seg[2]) {
    const id = decodeURIComponent(seg[2]);
    const node = qOne("SELECT * FROM nodes WHERE id=?", id);
    if (!node) return { error: "not found", id };
    const children = qAll(
      "SELECT id,name,name_zh,type,level,(SELECT COUNT(*) FROM nodes c WHERE c.parent=n.id) AS childCount FROM nodes n WHERE parent=? ORDER BY name",
      id
    );
    // ancestors
    const ancestors = [];
    let p = node.parent;
    let guard = 0;
    while (p && guard++ < 20) {
      const a = qOne("SELECT id,name,type,level,parent FROM nodes WHERE id=?", p);
      if (!a) break;
      ancestors.unshift(a);
      p = a.parent;
    }
    // relations out + in
    const out = qAll("SELECT r.relation, n.name, n.type, n.id, r.kind FROM relations r JOIN nodes n ON n.id=r.target WHERE r.source=? ORDER BY r.relation", id);
    const inc = qAll("SELECT r.relation, n.name, n.type, n.id, r.kind FROM relations r JOIN nodes n ON n.id=r.source WHERE r.target=? ORDER BY r.relation", id);
    let metrics = null;
    if (node.metrics) { try { metrics = JSON.parse(node.metrics); } catch {} }
    return {
      node: {
        id: node.id, name: node.name, name_en: node.name_en, name_zh: node.name_zh,
        type: node.type, parent: node.parent, level: node.level, universe: node.universe,
        description: node.description,
        aliases: node.aliases ? safeJson(node.aliases) : [],
        examples: node.examples ? safeJson(node.examples) : [],
        historical: !!node.historical, global: !!node.global, metrics,
        participation_modes: node.participation_modes ? safeJson(node.participation_modes) : [],
      },
      children, ancestors,
      relationsOut: out, relationsIn: inc,
    };
  }

  // GET /api/analytics  (sample questions)
  if (seg[1] === "analytics") {
    const mathSub = qAll("WITH RECURSIVE sub(id) AS (SELECT 'HK.mathematics' UNION ALL SELECT n.id FROM nodes n JOIN sub s ON n.parent=s.id) SELECT name,level FROM nodes WHERE id IN (SELECT id FROM sub) AND id != 'HK.mathematics'");
    const semi = qAll("WITH RECURSIVE sub(id) AS (SELECT 'ind.manufacturing.semiconductors' UNION ALL SELECT n.id FROM nodes n JOIN sub s ON n.parent=s.id) SELECT name,level FROM nodes WHERE id IN (SELECT id FROM sub) ORDER BY level,name");
    const hist = qAll("SELECT name FROM nodes WHERE historical=1 AND universe='HISTORICAL_OCCUPATIONS'");
    const gpu = qAll("SELECT r.relation, n.name FROM relations r JOIN nodes n ON n.id=r.target WHERE r.source='TECH.information_technology.computing.computer_hardware.processor_technology.graphics_processing_unit'");
    const occSpan = qAll("SELECT n.name, COUNT(*) d FROM relations r JOIN nodes n ON n.id=r.source WHERE n.type='OCCUPATION' AND r.target LIKE 'HK.%' GROUP BY n.id ORDER BY d DESC LIMIT 15");
    const mostLinked = qAll("SELECT n.name, COUNT(*) d FROM relations r JOIN nodes n ON n.id=r.source GROUP BY n.id ORDER BY d DESC LIMIT 20");
    return { mathCount: mathSub.length, semiCount: semi.length, semi: semi.slice(0,60), historicalCount: hist.length, historical: hist.slice(0,40).map(x=>x.name), gpu, occSpan, mostLinked };
  }

  return { error: "unknown endpoint" };
}

function safeJson(s) { try { return JSON.parse(s); } catch { return []; } }

const server = createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const path = url.pathname;

  if (path.startsWith("/api/")) {
    try {
      const result = api(path, url.searchParams);
      json(res, 200, result);
    } catch (e) {
      json(res, 500, { error: String(e && e.message || e) });
    }
    return;
  }

  // static file serving from public/
  let filePath = path === "/" ? "/index.html" : path;
  filePath = normalize(join(ROOT, "public", filePath));
  if (!filePath.startsWith(join(ROOT, "public"))) { res.writeHead(403); res.end("forbidden"); return; }
  if (!existsSync(filePath) || !statSync(filePath).isFile()) { res.writeHead(404); res.end("not found"); return; }
  const type = MIME[extname(filePath)] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type });
  res.end(readFileSync(filePath));
});

server.listen(PORT, () => {
  console.log("HK-OI viewer running at http://localhost:" + PORT);
});
