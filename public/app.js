// HK-OI civilization graph browser (multi-view)
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
async function api(p) { const r = await fetch(p); return r.json(); }
function mk(tag, attrs) { const e = document.createElement(tag); if (attrs) for (const [k,v] of Object.entries(attrs)) e.setAttribute(k, v); return e; }

const state = { view: "browse", currentId: null, activeTab: "overview" };

const TYPE_ZH = { UNIVERSE:"宇宙", KNOWLEDGE_FIELD:"知识", METHODOLOGY:"方法", OCCUPATION:"职业", SOCIAL_ROLE:"角色", ART_FORM:"艺术", ART_GENRE:"流派", ART_MOVEMENT:"运动", ART_TECHNIQUE:"技法", SPORT:"体育", GAME:"游戏", INDUSTRY:"产业", SECTOR:"门类", ECONOMIC_ACTIVITY:"活动", PRODUCT:"产品", SERVICE:"服务", TECHNOLOGY:"技术", MATERIAL:"材料", ORGANIZATION_TYPE:"组织", INSTITUTION:"机构", MEDIA_FORM:"媒体", CONTENT_TYPE:"内容", EMERGING_FIELD:"新兴", ACTIVITY:"活动" };
const TYPE_COLOR = { UNIVERSE:"#ffffff", KNOWLEDGE_FIELD:"#5b8cff", METHODOLOGY:"#60a5fa", OCCUPATION:"#22d3a5", SOCIAL_ROLE:"#a78bfa", ART_FORM:"#f472b6", ART_GENRE:"#f472b6", ART_MOVEMENT:"#f472b6", ART_TECHNIQUE:"#f472b6", SPORT:"#fb923c", GAME:"#fb923c", INDUSTRY:"#f59e0b", SECTOR:"#f59e0b", ECONOMIC_ACTIVITY:"#f59e0b", PRODUCT:"#34d399", SERVICE:"#34d399", TECHNOLOGY:"#2dd4bf", MATERIAL:"#2dd4bf", ORGANIZATION_TYPE:"#eab308", INSTITUTION:"#eab308", MEDIA_FORM:"#f87171", CONTENT_TYPE:"#f87171", EMERGING_FIELD:"#c084fc", ACTIVITY:"#38bdf8" };
const shortType = (t) => TYPE_ZH[t] || t;
const colorFor = (t) => TYPE_COLOR[t] || "#94a3b8";
const truncate = (s,n) => (s && s.length>n) ? s.slice(0,n)+"…" : (s||"");

$$(".nav-btn").forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));
function setView(v) {
  state.view = v;
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === v));
  $$(".view").forEach(el => el.classList.add("hidden"));
  $("#view-" + v).classList.remove("hidden");
  if (v === "graph") renderGraphView();
  if (v === "timeline") renderTimeline();
  if (v === "stats") renderStats();
}

async function loadMeta() {
  const m = await api("/api/meta");
  $("#node-count").textContent = m.totalNodes.toLocaleString() + " nodes";
  $("#welcome-stats").innerHTML = [["节点",m.totalNodes.toLocaleString()],["关系",m.totalRelations.toLocaleString()],["指标",m.withMetrics.toLocaleString()],["历史",m.historical.toLocaleString()],["Universe",m.byUniverse.length]].map(([l,v])=>'<div class="stat-card"><div class="v">'+v+'</div><div class="l">'+l+'</div></div>').join("");
  const gu = $("#g-universe"); gu.innerHTML = '<option value="">全部</option>' + m.byUniverse.map(u=>'<option value="'+esc(u.universe)+'">'+esc(u.universe)+'</option>').join("");
  const gt = $("#g-type"); gt.innerHTML = '<option value="">全部</option>' + m.byType.map(t=>'<option value="'+esc(t.type)+'">'+shortType(t.type)+'</option>').join("");
}

async function loadRoots() {
  const roots = await api("/api/roots");
  const tree = $("#tree"); tree.innerHTML = "";
  roots.forEach(r => tree.appendChild(treeNode(r)));
}
function treeNode(n) {
  const wrap = document.createElement("div");
  const row = document.createElement("div"); row.className = "tnode";
  const tw = mk("span", {class:"tw"}); tw.textContent = (n.childCount>0||n.hasChildren) ? "▸" : "";
  const nm = mk("span", {class:"nm"}); nm.textContent = n.name_zh ? n.name+" · "+n.name_zh : n.name; nm.title = n.name;
  const cnt = mk("span", {class:"cnt"}); cnt.textContent = n.childCount != null ? n.childCount : (n.hasChildren ? "…" : "0");
  const tt = mk("span", {class:"ttype"}); tt.textContent = shortType(n.type);
  row.append(tw, nm, cnt, tt);
  row.addEventListener("click", async (e) => {
    e.stopPropagation(); setView("browse"); selectNode(n.id, row);
    if ((n.childCount>0||n.hasChildren) && !wrap.querySelector(".children")) {
      const kids = await api("/api/children?parent="+encodeURIComponent(n.id));
      const cc = document.createElement("div"); cc.className = "children";
      kids.forEach(k => cc.appendChild(treeNode(k)));
      wrap.appendChild(cc); tw.textContent = "▾";
    } else if (wrap.querySelector(".children")) {
      const cc = wrap.querySelector(".children"); cc.classList.toggle("hidden"); tw.textContent = cc.classList.contains("hidden")?"▸":"▾";
    }
  });
  wrap.appendChild(row); return wrap;
}

let st = null;
$("#search").addEventListener("input", e => {
  clearTimeout(st);
  const q = e.target.value.trim(); const box = $("#search-results");
  if (!q) { box.classList.add("hidden"); return; }
  st = setTimeout(async () => {
    const rows = await api("/api/search?q="+encodeURIComponent(q)+"&limit=40");
    box.innerHTML = "";
    if (!rows.length) box.innerHTML = '<div class="empty">无结果</div>';
    rows.forEach(r => { const d = document.createElement("div"); d.className="sr"; d.innerHTML='<div><div class="nm">'+esc(r.name)+'</div><div class="meta">'+esc(r.name_zh||"")+'</div></div><div class="meta">'+shortType(r.type)+'</div>'; d.addEventListener("click",()=>{box.classList.add("hidden");$("#search").value="";setView("browse");selectNode(r.id);}); box.appendChild(d); });
    box.classList.remove("hidden");
  }, 200);
});
document.addEventListener("click", e => { if (!e.target.closest(".search-wrap")) $("#search-results").classList.add("hidden"); });

async function selectNode(id, rowEl) {
  state.currentId = id; state.activeTab = "overview";
  $$(".tnode.active").forEach(x=>x.classList.remove("active"));
  if (rowEl) rowEl.classList.add("active");
  $("#welcome").classList.add("hidden");
  $("#detail").classList.remove("hidden");
  const data = await api("/api/nodes/"+encodeURIComponent(id));
  if (data.error) { $("#detail").innerHTML='<div class="empty">未找到 '+esc(id)+'</div>'; return; }
  renderDetail(data);
}
function renderDetail(data) {
  const n = data.node;
  const bc = data.ancestors.map(a=>'<a data-id="'+esc(a.id)+'">'+esc(a.name)+'</a>').join(' / ');
  let badges = '<span class="badge type">'+n.type+'</span><span class="badge">'+esc(n.universe)+'</span><span class="badge">L'+n.level+'</span>';
  if (n.historical) badges += '<span class="badge hist">历史</span>';
  if (n.status) badges += '<span class="badge hist">'+(STATUS_ZH2[n.status]||n.status)+'</span>';
  if (!n.global) badges += '<span class="badge regional">地域性</span>';
  let html = '<div class="breadcrumb">'+(bc?bc+' / ':"")+'<span>'+esc(n.name)+'</span></div>';
  html += '<h1 class="node-title">'+esc(n.name)+'</h1>';
  if (n.name_zh) html += '<div class="node-zh">'+esc(n.name_zh)+'</div>';
  html += '<div class="badges">'+badges+'</div>';
  if (n.description) html += '<div class="desc">'+esc(n.description)+'</div>';
  if (n.aliases && n.aliases.length) html += '<div><span class="muted">别名：</span>'+n.aliases.map(a=>'<span class="chip">'+esc(a)+'</span>').join("")+'</div>';
  if (n.participation_modes && n.participation_modes.length) html += '<div style="margin-top:6px"><span class="muted">参与方式：</span>'+n.participation_modes.map(m=>'<span class="chip">'+(MODE_ZH[m]||m)+'</span>').join("")+'</div>';
  if (n.temporal) html += renderTemporal(n.temporal);
  if (n.hist) html += renderHist(n.hist);
  html += '<div class="tabs">'+
    '<div class="tab '+(state.activeTab==="overview"?"active":"")+'" data-tab="overview">子节点 ('+data.children.length+')</div>'+
    '<div class="tab '+(state.activeTab==="relations"?"active":"")+'" data-tab="relations">关系 ('+(data.relationsOut.length+data.relationsIn.length)+')</div>'+
    '<div class="tab '+(state.activeTab==="graph"?"active":"")+'" data-tab="graph">关系图</div>'+
    (n.metrics?'<div class="tab '+(state.activeTab==="metrics"?"active":"")+'" data-tab="metrics">文明指标</div>':'')+
    '</div><div id="tab-body"></div>';
  $("#detail").innerHTML = html;
  $("#detail").querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>{state.activeTab=t.dataset.tab;renderTab(data);}));
  $("#detail").querySelectorAll(".breadcrumb a[data-id]").forEach(a=>a.addEventListener("click",()=>selectNode(a.dataset.id)));
  renderTab(data);
}
const STATUS_ZH2 = { EXTINCT:"已灭绝", TRANSFORMED:"已演变", REGIONALLY_SURVIVING:"局部存续", REVIVED:"复兴", HISTORICAL_ONLY:"仅历史" };
function renderHist(h){ if(!h) return ""; const bits=[]; if(h.civilization) bits.push('<span class="muted">文明：</span>'+esc(h.civilization)); if(h.social_role) bits.push('<span class="muted">社会角色：</span>'+esc(h.social_role)); if(h.functions&&h.functions.length) bits.push('<span class="muted">职能：</span>'+h.functions.map(x=>'<span class="chip">'+esc(x)+'</span>').join("")); if(h.skills&&h.skills.length) bits.push('<span class="muted">技能：</span>'+h.skills.map(x=>'<span class="chip">'+esc(x)+'</span>').join("")); if(h.technologies&&h.technologies.length) bits.push('<span class="muted">技术：</span>'+h.technologies.map(x=>'<span class="chip">'+esc(x)+'</span>').join("")); if(h.institutions&&h.institutions.length) bits.push('<span class="muted">制度：</span>'+h.institutions.map(x=>'<span class="chip">'+esc(x)+'</span>').join("")); return '<div style="margin-top:6px">'+bits.join(" &nbsp; ")+'</div>'; }
const MODE_ZH = { professional:"职业实践", amateur:"业余实践", recreational:"娱乐参与", spectator:"观众参与", community:"社群参与" };
const STATUS_ZH = { exists_today:"现存", disappeared:"已消失", transformed:"已演变", limited_regions:"仅存局部地区", recreational_reconstruction:"仅存娱乐/复原", different_institutional_form:"制度形态已变" };
function renderTemporal(t) {
  if (!t) return "";
  const bits = [];
  if (t.valid_from || t.valid_until) bits.push('<span class="muted">时期：</span>' + esc([t.valid_from,t.valid_until].filter(Boolean).join(" – ")));
  if (t.peak_period) bits.push('<span class="muted">高峰：</span>'+esc(t.peak_period));
  if (t.geographic_scope && t.geographic_scope.length) bits.push('<span class="muted">地域：</span>'+t.geographic_scope.map(g=>'<span class="chip">'+esc(g)+'</span>').join(""));
  if (t.historical_status) bits.push('<span class="muted">状态：</span><span class="chip">'+(STATUS_ZH[t.historical_status]||t.historical_status)+'</span>');
  return '<div style="margin-top:8px">'+bits.join(" &nbsp; ")+'</div>';
}
function renderTab(data) {
  $$("#detail .tab").forEach(t=>t.classList.toggle("active", t.dataset.tab===state.activeTab));
  const body = $("#tab-body"), n = data.node;
  if (state.activeTab === "overview") {
    if (!data.children.length) { body.innerHTML='<div class="empty">叶子节点</div>'; return; }
    body.innerHTML = '<div class="panel"><h3>子节点 ('+data.children.length+') · 后代 ('+(data.descendants||0)+')</h3>'+data.children.map(c=>'<div class="rel-row"><a data-id="'+esc(c.id)+'" class="nm" style="flex:1">'+esc(c.name)+(c.name_zh?' · '+esc(c.name_zh):'')+'</a><span class="cnt">'+c.childCount+'</span></div>').join("")+'</div>';
    body.querySelectorAll("a[data-id]").forEach(a=>a.addEventListener("click",()=>selectNode(a.dataset.id)));
  } else if (state.activeTab === "relations") {
    const out = data.relationsOut.map(r=>'<div class="rel-row"><span class="rel-dir">→</span><span class="rel-type">'+esc(r.relation)+'</span><a data-id="'+esc(r.id)+'" class="nm" style="flex:1">'+esc(r.name)+'</a><span class="muted">'+shortType(r.type)+'</span></div>').join("");
    const inc = data.relationsIn.map(r=>'<div class="rel-row"><span class="rel-dir">←</span><span class="rel-type">'+esc(r.relation)+'</span><a data-id="'+esc(r.id)+'" class="nm" style="flex:1">'+esc(r.name)+'</a><span class="muted">'+shortType(r.type)+'</span></div>').join("");
    body.innerHTML = '<div class="panel"><h3>出边</h3>'+(out||'<div class="empty">无</div>')+'</div><div class="panel"><h3>入边</h3>'+(inc||'<div class="empty">无</div>')+'</div>';
    body.querySelectorAll("a[data-id]").forEach(a=>a.addEventListener("click",()=>selectNode(a.dataset.id)));
  } else if (state.activeTab === "graph") {
    body.innerHTML=""; renderNetwork(body, data.relationsOut, data.relationsIn, data.node, (id)=>selectNode(id));
  } else if (state.activeTab === "metrics") {
    body.innerHTML = renderMetrics(n.metrics);
  }
}
function renderMetrics(m) {
  if (!m) return '<div class="empty">无指标</div>';
  const c = [];
  const cell=(k,v,n)=>'<div class="metric-card"><div class="k">'+k+'</div><div class="v">'+v+'</div>'+(n?'<div class="n">'+esc(n)+'</div>':'')+'</div>';
  if (m.population) c.push(cell("从业/参与人数", esc(m.population.est||"未知"), m.population.note));
  if (m.economy) c.push(cell("经济规模", esc(m.economy.est||"未知"), (m.economy.basis||"")+(m.economy.year?" · "+m.economy.year:"")));
  if (m.public_awareness) c.push('<div class="metric-card"><div class="k">公众认知 ('+m.public_awareness.score+'/100)</div><div class="bar"><i style="width:'+m.public_awareness.score+'%"></i></div><div class="n">'+esc(m.public_awareness.basis||"")+'</div></div>');
  if (m.historical_significance) c.push(cell("历史意义", ZH[m.historical_significance]||m.historical_significance, ""));
  if (m.growth) c.push('<div class="metric-card"><div class="k">近期趋势</div><div class="v"><span class="pill '+(GC[m.growth]||"stable")+'">'+(GZ[m.growth]||m.growth)+'</span></div></div>');
  if (m.geography) c.push('<div class="metric-card"><div class="k">地理分布</div><div class="v" style="font-size:13px">'+m.geography.map(g=>'<span class="chip">'+esc(g)+'</span>').join("")+'</div></div>');
  if (m.institutionalization) c.push(cell("制度化", ZH[m.institutionalization]||m.institutionalization,""));
  if (m.cultural_visibility) c.push(cell("文化可见度", ZH[m.cultural_visibility]||m.cultural_visibility,""));
  if (m.economic_weight||m.cultural_weight) c.push('<div class="metric-card"><div class="k">经济 vs 文化权重</div><div style="margin-top:6px">经济 '+wbar(m.economic_weight)+'</div><div style="margin-top:6px">文化 '+wbar(m.cultural_weight)+'</div></div>');
  if (m.confidence!=null) c.push('<div class="metric-card"><div class="k">置信度 ('+Math.round(m.confidence*100)+'%)</div><div class="bar gold"><i style="width:'+(m.confidence*100)+'%"></i></div></div>');
  if (m.method) c.push(cell("来源/方法", MZ[m.method]||m.method,""));
  return '<div class="panel"><h3>文明量化指标</h3><div class="metric-grid">'+c.join("")+'</div></div>';
}
const ZH={negligible:"可忽略",minimal:"极低",low:"低",moderate:"中等",high:"高",very_high:"极高",foundational:"奠基性",unknown:"未知"};
const GC={rapidly_growing:"rapid",growing:"grow",stable:"stable",declining:"declining",rapidly_declining:"rapid_declining",unknown:"stable"};
const GZ={rapidly_growing:"快速增长",growing:"增长",stable:"稳定",declining:"衰退",rapidly_declining:"快速衰退",unknown:"未知"};
const MZ={measured:"实测",census:"普查",survey:"调查",model_estimate:"模型估计",expert_judgment:"专家判断",qualitative:"定性",inherited_estimate:"继承估计"};
function wbar(l){const w={negligible:5,minimal:8,low:25,moderate:50,high:75,very_high:95,foundational:100,unknown:0}[l]||0;return '<div class="bar"><i style="width:'+w+'%"></i></div>';}


// ---- performant force-directed graph (rAF + spatial grid + capping + label culling) ----
function forceGraph(container, graph) {
  const { nodes, edges, centerId, onNodeClick } = graph;
  if (!nodes || !nodes.length) { container.innerHTML = '<div class="empty">无数据</div>'; return; }
  const MAX = 220;
  const capped = nodes.length > MAX;
  const arr = nodes.slice(0, MAX).map(n => ({ id:n.id, name:n.name, type:n.type, level:n.level, historical:n.historical, x:0, y:0, vx:0, vy:0 }));
  const idSet = new Set(arr.map(n => n.id));
  const es = (edges || []).filter(e => idSet.has(e.source) && idSet.has(e.target));
  const W = container.clientWidth || 900, H = (container.clientHeight || 540);
  container.innerHTML = "";
  const head = document.createElement("div");
  head.style.cssText = "padding:4px 10px;font-size:12px;color:var(--muted)";
  head.innerHTML = arr.length + " 节点 · " + es.length + " 边" + (capped ? ' · <span style="color:var(--warn)">已截断前 '+MAX+'</span>' : '') + ' · <a id="fg-fit" style="cursor:pointer;color:var(--accent)">适应视图</a> · <a id="fg-lbl" style="cursor:pointer;color:var(--accent)">标签</a>';
  container.appendChild(head);
  const svgH = H - 26;
  const svg = mk("svg", { width: W, height: svgH });
  container.appendChild(svg);
  const viewport = mk("g"); svg.appendChild(viewport);
  let tx = 0, ty = 0, scale = 1, showLabel = arr.length <= 70;
  const apply = () => viewport.setAttribute("transform", "translate(" + tx + "," + ty + ") scale(" + scale + ")");
  const cx = W / 2, cy = svgH / 2;
  arr.forEach((n, i) => { const ang = 2 * Math.PI * i / arr.length; const r = Math.min(W, svgH) / 2.6; n.x = cx + r * Math.cos(ang); n.y = cy + r * Math.sin(ang); });
  const byId = new Map(arr.map(n => [n.id, n]));
  const ns = "http://www.w3.org/2000/svg";
  const lineEls = es.map(e => { const l = document.createElementNS(ns, "line"); l.setAttribute("stroke", "#333a4d"); l.setAttribute("stroke-width", "1"); viewport.appendChild(l); return l; });
  const nodeEls = arr.map(n => {
    const g = document.createElementNS(ns, "g"); g.style.cursor = "pointer";
    const c = document.createElementNS(ns, "circle"); c.setAttribute("r", n.level <= 1 ? 7 : 5); c.setAttribute("fill", colorFor(n.type)); c.setAttribute("stroke", n.historical ? "#eab308" : "#0f1117"); c.setAttribute("stroke-width", "1.5");
    const t = document.createElementNS(ns, "text"); t.setAttribute("font-size", "10"); t.setAttribute("fill", "#aeb6c8"); t.setAttribute("x", "9"); t.setAttribute("y", "3"); t.textContent = truncate(n.name, 22);
    g.append(c, t);
    g.addEventListener("click", e => { e.stopPropagation(); if (onNodeClick) onNodeClick(n.id); });
    viewport.appendChild(g);
    return { g, n, c, t };
  });
  const CELL = 110;
  function buildGrid() {
    const grid = new Map();
    for (const n of arr) { const k = Math.floor(n.x / CELL) + "," + Math.floor(n.y / CELL); if (!grid.has(k)) grid.set(k, []); grid.get(k).push(n); }
    return grid;
  }
  let alpha = 1;
  function tick() {
    const grid = buildGrid();
    for (const n of arr) {
      const gx = Math.floor(n.x / CELL), gy = Math.floor(n.y / CELL);
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
        const bucket = grid.get((gx + dx) + "," + (gy + dy)); if (!bucket) continue;
        for (const m of bucket) {
          if (m === n) continue;
          let ddx = n.x - m.x, ddy = n.y - m.y; let d2 = ddx * ddx + ddy * ddy; if (d2 < 1) d2 = 1;
          if (d2 > CELL * CELL * 4) continue;
          const d = Math.sqrt(d2), f = alpha * 9000 / d2;
          n.vx += ddx / d * f; n.vy += ddy / d * f;
        }
      }
    }
    for (const e of es) { const aa = byId.get(e.source), b = byId.get(e.target); if (!aa || !b) continue; let dx = b.x - aa.x, dy = b.y - aa.y; let d = Math.sqrt(dx * dx + dy * dy) || 1; const f = (d - 70) * 0.01 * alpha; aa.vx += dx / d * f; aa.vy += dy / d * f; b.vx -= dx / d * f; b.vy -= dy / d * f; }
    for (const n of arr) { n.vx += (cx - n.x) * 0.012 * alpha; n.vy += (cy - n.y) * 0.012 * alpha; }
    for (const n of arr) { n.vx *= 0.85; n.vy *= 0.85; n.x += n.vx; n.y += n.vy; }
    alpha *= 0.985;
  }
  function paint() {
    lineEls.forEach((l, i) => { const e = es[i], aa = byId.get(e.source), b = byId.get(e.target); if (!aa || !b) return; l.setAttribute("x1", aa.x); l.setAttribute("y1", aa.y); l.setAttribute("x2", b.x); l.setAttribute("y2", b.y); });
    nodeEls.forEach(o => { o.g.setAttribute("transform", "translate(" + o.n.x.toFixed(1) + "," + o.n.y.toFixed(1) + ")"); o.c.setAttribute("r", o.n.id === centerId ? 8 : (o.n.level <= 1 ? 7 : 5)); o.t.style.display = showLabel ? "" : "none"; });
  }
  let raf;
  function loop() { if (alpha > 0.02) { for (let k = 0; k < 3; k++) tick(); paint(); raf = requestAnimationFrame(loop); } }
  loop(); paint();
  svg.addEventListener("wheel", e => { e.preventDefault(); const r = svg.getBoundingClientRect(); const mx = e.clientX - r.left, my = e.clientY - r.top; const f = e.deltaY < 0 ? 1.1 : 0.9; scale = Math.max(0.1, Math.min(8, scale * f)); tx = mx - (mx - tx) * f; ty = my - (my - ty) * f; apply(); paint(); }, { passive: false });
  let drag = false, sx, sy, stx, sty;
  svg.addEventListener("mousedown", e => { drag = true; sx = e.clientX; sy = e.clientY; stx = tx; sty = ty; });
  window.addEventListener("mousemove", e => { if (!drag) return; tx = stx + (e.clientX - sx); ty = sty + (e.clientY - sy); apply(); });
  window.addEventListener("mouseup", () => { drag = false; });
  head.querySelector("#fg-fit").addEventListener("click", () => { tx = 0; ty = 0; scale = 1; apply(); paint(); });
  head.querySelector("#fg-lbl").addEventListener("click", () => { showLabel = !showLabel; paint(); });
}

function renderNetwork(container, outRel, inRel, centerNode, onNodeClick) {
  const nodes = new Map();
  const add = n => { if (n && n.id && !nodes.has(n.id)) nodes.set(n.id, { id:n.id, name:n.name, type:n.type, historical:n.historical }); };
  if (centerNode) add({ id: centerNode.id, name: centerNode.name, type: centerNode.type, historical: centerNode.historical });
  const edges = [];
  if (outRel) for (const r of outRel) { add({ id:r.id, name:r.name, type:r.type }); edges.push({ source: centerNode ? centerNode.id : r.source, target: r.id, label: r.relation }); }
  if (inRel) for (const r of inRel) { add({ id:r.id, name:r.name, type:r.type }); edges.push({ source: r.id, target: centerNode ? centerNode.id : r.target, label: r.relation }); }
  forceGraph(container, { nodes: [...nodes.values()], edges, centerId: centerNode ? centerNode.id : null, onNodeClick });
}

async function expandGraph(id) {
  const g = await api("/api/graph?seed="+encodeURIComponent(id));
  $("#g-info").textContent = g.nodes.length+" 节点 · "+g.edges.length+" 边";
  const d = await api("/api/nodes/"+encodeURIComponent(id));
  const n = d.node;
  const gd = $("#g-detail");
  gd.innerHTML = '<div style="display:flex;justify-content:space-between"><strong>'+esc(n.name)+'</strong><a id="gd-close" style="cursor:pointer">✕</a></div>'+
    '<div class="muted">'+shortType(n.type)+' · '+esc(n.universe)+' · L'+n.level+(n.historical?' · <span class="badge hist">历史</span>':'')+'</div>'+
    (n.name_zh?'<div class="node-zh">'+esc(n.name_zh)+'</div>':'')+
    (n.description?'<div class="desc" style="font-size:12px">'+esc(n.description)+'</div>':'')+
    (n.metrics?'<div class="metric-grid">'+renderMetricsMini(n.metrics)+'</div>':'')+
    '<div style="margin-top:8px"><a data-id="'+esc(n.id)+'">打开详情 →</a></div>';
  gd.querySelector("#gd-close").addEventListener("click",()=>gd.innerHTML="");
  gd.querySelector("a[data-id]").addEventListener("click",()=>{setView("browse");selectNode(n.id);});
  const cont = $("#g-container"); cont.innerHTML = "";
  renderGraphNetwork(cont, g.nodes, g.edges, expandGraph);
}
function renderMetricsMini(m){const out=[];if(m.population)out.push('<div class="metric-card"><div class="k">人数</div><div class="v" style="font-size:12px">'+esc(m.population.est||"未知")+'</div></div>');if(m.economy)out.push('<div class="metric-card"><div class="k">经济</div><div class="v" style="font-size:12px">'+esc(m.economy.est||"未知")+'</div></div>');if(m.growth)out.push('<div class="metric-card"><div class="k">趋势</div><div class="v" style="font-size:12px">'+(GZ[m.growth]||m.growth)+'</div></div>');if(m.historical_significance)out.push('<div class="metric-card"><div class="k">历史意义</div><div class="v" style="font-size:12px">'+(ZH[m.historical_significance]||m.historical_significance)+'</div></div>');return out.join("");}
$("#g-reload").addEventListener("click",renderGraphView);
$("#g-reset").addEventListener("click",()=>{renderGraphView();$("#g-detail").innerHTML="";});

async function renderTimeline() {
  const rows = await api("/api/timeline");
  $("#tl-info").textContent = rows.length + " 个历史/演变实体";
  const cont = $("#tl-container"); cont.innerHTML="";
  const groups = {};
  for (const r of rows) {
    const st = r.status || r.temporal?.historical_status || (r.historical ? "disappeared" : "unknown");
    (groups[st] = groups[st] || []).push(r);
  }
  for (const [st, list] of Object.entries(groups)) {
    cont.innerHTML += '<h4 style="margin:12px 0 4px;color:var(--gold)">'+(STATUS_ZH2[st]||STATUS_ZH[st]||st)+' ('+list.length+')</h4>';
    for (const r of list.slice(0, 120)) {
      const t = r.temporal;
      const d = document.createElement("div"); d.className = "tl-item " + (st==="disappeared"?"":"cont");
      d.innerHTML = '<div class="nm">'+esc(r.name)+(r.name_zh?' · '+esc(r.name_zh):'')+'</div><div class="meta">'+shortType(r.type)+' · '+esc(r.universe)+(t?' · '+esc([t.valid_from,t.valid_until].filter(Boolean).join(" – ")):'')+(t?.geographic_scope?' · '+esc(t.geographic_scope.join("/")):'')+'</div>';
      d.addEventListener("click",()=>{setView("browse");selectNode(r.id);});
      cont.appendChild(d);
    }
  }
}

async function renderLineage(id) {
  const g = await api("/api/lineage/"+encodeURIComponent(id));
  const cont = $("#ln-container"); cont.innerHTML="";
  if (!g.nodes.length) { cont.innerHTML='<div class="empty">无谱系数据</div>'; return; }
  renderGraphNetwork(cont, g.nodes, g.edges, (nid)=>renderLineage(nid));
}
$("#ln-go").addEventListener("click",()=>{ const v=$("#ln-input").value.trim(); if(v) renderLineage(v); });
$$(".ln-ex").forEach(b=>b.addEventListener("click",()=>{ $("#ln-input").value=b.dataset.id; renderLineage(b.dataset.id); }));

async function renderStats() {
  const el = $("#analytics");
  el.innerHTML = '<div class="empty">加载中…</div>';
  const a = await api("/api/analytics");
  el.innerHTML =
    '<h2>📊 统计</h2>'+
    '<div class="panel"><h3>数学领域 ('+a.mathCount+')</h3><div class="muted">递归子树已建模，见左侧树。</div></div>'+
    '<div class="panel"><h3>半导体环节 ('+a.semiCount+')</h3>'+a.semi.map(s=>'<span class="chip">'+esc(s.name)+'</span>').join(" ")+'</div>'+
    '<div class="panel"><h3>GPU 关联产业/技术</h3>'+a.gpu.map(g=>'<div class="rel-row"><span class="rel-type">'+esc(g.relation)+'</span><span class="nm">'+esc(g.name)+'</span></div>').join("")+'</div>'+
    '<div class="panel"><h3>跨知识领域最多的职业</h3>'+a.occSpan.map(o=>'<div class="rel-row"><span class="nm" style="flex:1">'+esc(o.name)+'</span><span class="cnt">'+o.d+'</span></div>').join("")+'</div>'+
    '<div class="panel"><h3>中心性最高节点</h3>'+a.mostLinked.map(o=>'<div class="rel-row"><span class="nm" style="flex:1">'+esc(o.name)+'</span><span class="cnt">'+o.d+'</span></div>').join("")+'</div>'+
    '<div class="panel"><h3>已消失职业（前40）</h3>'+a.historical.map(h=>'<span class="chip">'+esc(h)+'</span>').join(" ")+'</div>';
}

loadMeta(); loadRoots(); setView("browse");
