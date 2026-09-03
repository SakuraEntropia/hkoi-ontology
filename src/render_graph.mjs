// HK-OI full-graph static renderer -> exports/graph/*.svg (+PNG if rasterizer available)
import { DatabaseSync } from "node:sqlite";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const db = new DatabaseSync(join(process.cwd(), "exports", "ontology.db"), { readOnly: true });
const nodes = db.prepare("SELECT id,name,type,level,universe,historical FROM nodes").all();
const rels = db.prepare("SELECT source,relation,target FROM relations").all();
db.close();

const COLORS = { UNIVERSE:"#ffffff", KNOWLEDGE_FIELD:"#5b8cff", METHODOLOGY:"#60a5fa", OCCUPATION:"#22d3a5", SOCIAL_ROLE:"#a78bfa", ART_FORM:"#f472b6", ART_GENRE:"#f472b6", ART_MOVEMENT:"#f472b6", ART_TECHNIQUE:"#f472b6", SPORT:"#fb923c", GAME:"#fb923c", INDUSTRY:"#f59e0b", SECTOR:"#f59e0b", ECONOMIC_ACTIVITY:"#f59e0b", PRODUCT:"#34d399", SERVICE:"#34d399", TECHNOLOGY:"#2dd4bf", MATERIAL:"#2dd4bf", ORGANIZATION_TYPE:"#eab308", INSTITUTION:"#eab308", MEDIA_FORM:"#f87171", CONTENT_TYPE:"#f87171", EMERGING_FIELD:"#c084fc", ACTIVITY:"#38bdf8", OFFICE:"#eab308", RELIGIOUS_ROLE:"#a78bfa", MILITARY_ROLE:"#fb923c", STATUS:"#94a3b8", PROFESSION:"#22d3a5", CRAFT:"#f59e0b", FUNCTION:"#94a3b8" };
const c = (t) => COLORS[t] || "#94a3b8";
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, x => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[x]));

function force(arr, edges, W, H, iters) {
  const cx = W / 2, cy = H / 2;
  arr.forEach((n, i) => { const a = 2 * Math.PI * i / arr.length; const r = Math.min(W, H) / 2.5; n.x = cx + r * Math.cos(a); n.y = cy + r * Math.sin(a); n.vx = 0; n.vy = 0; });
  const byId = new Map(arr.map(n => [n.id, n]));
  const CELL = 150; let alpha = 1;
  for (let it = 0; it < iters; it++) {
    const grid = new Map();
    for (const n of arr) { const k = Math.floor(n.x / CELL) + "," + Math.floor(n.y / CELL); if (!grid.has(k)) grid.set(k, []); grid.get(k).push(n); }
    for (const n of arr) {
      const gx = Math.floor(n.x / CELL), gy = Math.floor(n.y / CELL);
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
        const b = grid.get((gx + dx) + "," + (gy + dy)); if (!b) continue;
        for (const m of b) { if (m === n) continue; let ddx = n.x - m.x, ddy = n.y - m.y, d2 = ddx * ddx + ddy * ddy; if (d2 < 1) d2 = 1; if (d2 > CELL * CELL * 4) continue; const d = Math.sqrt(d2), f = alpha * 16000 / d2; n.vx += ddx / d * f; n.vy += ddy / d * f; }
      }
    }
    for (const e of edges) { const a = byId.get(e.source), b = byId.get(e.target); if (!a || !b) continue; let dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 1; const f = (d - 60) * 0.01 * alpha; a.vx += dx / d * f; a.vy += dy / d * f; b.vx -= dx / d * f; b.vy -= dy / d * f; }
    for (const n of arr) { n.vx += (cx - n.x) * 0.01 * alpha; n.vy += (cy - n.y) * 0.01 * alpha; }
    for (const n of arr) { n.vx *= 0.85; n.vy *= 0.85; n.x += n.vx; n.y += n.vy; }
    alpha *= 0.985;
  }
}

function svgHeader(W, H, title) { return '<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '"><rect width="100%" height="100%" fill="#0f1117"/><text x="20" y="30" fill="#e6e8ee" font-size="22" font-family="sans-serif">' + esc(title) + '</text>'; }

// ---------- 1. Overview: L0+L1 readable ----------
const ovNodes = nodes.filter(n => n.level <= 1).map(n => ({ ...n }));
const ovIds = new Set(ovNodes.map(n => n.id));
const ovEdges = rels.filter(e => ovIds.has(e.source) && ovIds.has(e.target));
force(ovNodes, ovEdges, 6000, 4500, 500);
let s = svgHeader(6000, 4500, "HK-OI · 全景总览 (L0-L1, " + ovNodes.length + " 节点)");
s += ovEdges.map(e => { const a = ovNodes.find(n => n.id === e.source), b = ovNodes.find(n => n.id === e.target); if (!a || !b) return ""; return '<line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '" stroke="#333a4d" stroke-width="0.6" opacity="0.5"/>'; }).join("");
s += ovNodes.map(n => '<circle cx="' + n.x.toFixed(1) + '" cy="' + n.y.toFixed(1) + '" r="' + (n.type === "UNIVERSE" ? 16 : 9) + '" fill="' + c(n.type) + '" stroke="' + (n.historical ? "#eab308" : "#0f1117") + '" stroke-width="1"/><text x="' + (n.x + (n.type === "UNIVERSE" ? 15 : 9)).toFixed(1) + '" y="' + (n.y + 3).toFixed(1) + '" fill="#aeb6c8" font-size="' + (n.type === "UNIVERSE" ? 24 : 17) + '" font-family="sans-serif">' + esc(n.name) + '</text>').join("");
s += "</svg>";
writeFileSync(join(process.cwd(), "exports", "graph", "ontology_overview.svg"), s);

// ---------- 2. Full graph: all nodes, tiny dots, hub labels ----------
const deg = new Map();
for (const e of rels) { deg.set(e.source, (deg.get(e.source) || 0) + 1); deg.set(e.target, (deg.get(e.target) || 0) + 1); }
const all = nodes.map(n => ({ ...n, deg: deg.get(n.id) || 0 }));
const W = 14000, H = 14000;
const allEdges = rels;
force(all, allEdges, W, H, 350);
// label top hubs
const hubs = [...all].sort((a, b) => b.deg - a.deg).slice(0, 60).map(n => n.id);
const hubSet = new Set(hubs);
let s2 = svgHeader(W, H, "HK-OI · 全图 (全部 " + all.length + " 节点 · " + allEdges.length + " 边)");
s2 += allEdges.map(e => { const a = all.find(n => n.id === e.source), b = all.find(n => n.id === e.target); if (!a || !b) return ""; return '<line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '" stroke="#2a3040" stroke-width="0.6" opacity="0.08"/>'; }).join("");
s2 += all.map(n => { const r = hubSet.has(n.id) ? 10 : (n.type === "UNIVERSE" ? 7 : 4); return '<circle cx="' + n.x.toFixed(1) + '" cy="' + n.y.toFixed(1) + '" r="' + r + '" fill="' + c(n.type) + '" stroke="#ffffff" stroke-width="0.8"/>'; }).join("");
s2 += all.filter(n => hubSet.has(n.id)).map(n => '<text x="' + (n.x + 7).toFixed(1) + '" y="' + (n.y + 3).toFixed(1) + '" fill="#ffffff" font-size="26" font-weight="bold" font-family="sans-serif">' + esc(n.name) + '</text>').join("");
s2 += "</svg>";
writeFileSync(join(process.cwd(), "exports", "graph", "ontology_full.svg"), s2);

// ---------- 3. legend ----------
const legendTypes = [...new Set(all.map(n => n.type))];
let s3 = svgHeader(500, 40 + legendTypes.length * 26, "图例 Legend");
legendTypes.forEach((t, i) => { s3 += '<circle cx="24" cy="' + (50 + i * 26) + '" r="7" fill="' + c(t) + '"/><text x="40" y="' + (54 + i * 26) + '" fill="#cdd2dd" font-size="14" font-family="sans-serif">' + t + '</text>'; });
s3 += "</svg>";
writeFileSync(join(process.cwd(), "exports", "graph", "legend.svg"), s3);

console.log(JSON.stringify({ nodes: all.length, edges: allEdges.length, overview: ovNodes.length, files: ["exports/graph/ontology_overview.svg", "exports/graph/ontology_full.svg", "exports/graph/legend.svg"] }));
