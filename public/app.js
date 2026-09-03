// HK-OI ontology browser (vanilla)
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

async function api(path) {
  const r = await fetch(path);
  return r.json();
}

let currentId = null;
let activeTab = "overview";

// ---- header meta ----
async function loadMeta() {
  try {
    const m = await api("/api/meta");
    $("#node-count").textContent = m.totalNodes.toLocaleString() + " nodes · " + m.totalRelations.toLocaleString() + " edges";
    const ws = $("#welcome-stats");
    ws.innerHTML = [
      ["节点", m.totalNodes.toLocaleString()],
      ["关系", m.totalRelations.toLocaleString()],
      ["带指标", m.withMetrics.toLocaleString()],
      ["历史节点", m.historical.toLocaleString()],
      ["地域性节点", m.global.toLocaleString()],
      ["Universe", m.byUniverse.length],
    ].map(([l,v]) => '<div class="stat-card"><div class="v">'+v+'</div><div class="l">'+l+'</div></div>').join("");
  } catch(e){ console.error(e); }
}

// ---- tree ----
async function loadRoots() {
  const roots = await api("/api/roots");
  const tree = $("#tree");
  tree.innerHTML = "";
  for (const r of roots) {
    tree.appendChild(treeNode(r, true));
  }
}

function treeNode(n, expanded=false) {
  const wrap = document.createElement("div");
  const row = document.createElement("div");
  row.className = "tnode";
  const hasChildren = n.childCount > 0 || n.hasChildren;
  const tw = document.createElement("span");
  tw.className = "tw";
  tw.textContent = hasChildren ? (expanded ? "▾" : "▸") : "";
  const nm = document.createElement("span");
  nm.className = "nm";
  nm.textContent = n.name_zh ? n.name + " · " + n.name_zh : n.name;
  nm.title = n.name;
  const ttype = document.createElement("span");
  ttype.className = "ttype";
  ttype.textContent = shortType(n.type);
  row.appendChild(tw); row.appendChild(nm); row.appendChild(ttype);
  row.addEventListener("click", async (e) => {
    e.stopPropagation();
    selectNode(n.id, row);
    if (hasChildren && !wrap.querySelector(".children")) {
      const kids = await api("/api/children?parent=" + encodeURIComponent(n.id));
      const cc = document.createElement("div");
      cc.className = "children";
      for (const k of kids) cc.appendChild(treeNode(k));
      wrap.appendChild(cc);
      tw.textContent = "▾";
    } else if (hasChildren) {
      const cc = wrap.querySelector(".children");
      if (cc) { cc.classList.toggle("hidden"); tw.textContent = cc.classList.contains("hidden") ? "▸" : "▾"; }
    }
  });
  wrap.appendChild(row);
  return wrap;
}

function shortType(t) {
  const map = { KNOWLEDGE_FIELD:"知识", OCCUPATION:"职业", SOCIAL_ROLE:"角色", ART_FORM:"艺术", ART_GENRE:"流派", ART_MOVEMENT:"运动", ART_TECHNIQUE:"技法", SPORT:"体育", GAME:"游戏", INDUSTRY:"产业", SECTOR:"门类", ECONOMIC_ACTIVITY:"活动", PRODUCT:"产品", SERVICE:"服务", TECHNOLOGY:"技术", MATERIAL:"材料", ORGANIZATION_TYPE:"组织", INSTITUTION:"机构", MEDIA_FORM:"媒体", CONTENT_TYPE:"内容", EMERGING_FIELD:"新兴", METHODOLOGY:"方法", UNIVERSE:"宇宙" };
  return map[t] || t;
}

// ---- search ----
let searchTimer = null;
$("#search").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  const q = e.target.value.trim();
  const box = $("#search-results");
  if (!q) { box.classList.add("hidden"); return; }
  searchTimer = setTimeout(async () => {
    const rows = await api("/api/search?q=" + encodeURIComponent(q) + "&limit=40");
    box.innerHTML = "";
    if (!rows.length) { box.innerHTML = '<div class="empty">无结果</div>'; }
    for (const r of rows) {
      const d = document.createElement("div");
      d.className = "sr";
      d.innerHTML = '<div><div class="nm">'+esc(r.name)+'</div><div class="meta">'+esc(r.name_zh||"")+'</div></div><div class="meta">'+shortType(r.type)+' · '+esc(r.universe)+'</div>';
      d.addEventListener("click", () => { box.classList.add("hidden"); $("#search").value = ""; selectNode(r.id); });
      box.appendChild(d);
    }
    box.classList.remove("hidden");
  }, 200);
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrap")) $("#search-results").classList.add("hidden");
});

// ---- detail ----
async function selectNode(id, rowEl) {
  currentId = id;
  document.querySelectorAll(".tnode.active").forEach(x => x.classList.remove("active"));
  if (rowEl) rowEl.classList.add("active");
  $("#welcome").classList.add("hidden");
  $("#analytics").classList.add("hidden");
  $("#detail").classList.remove("hidden");
  const data = await api("/api/nodes/" + encodeURIComponent(id));
  if (data.error) { $("#detail").innerHTML = '<div class="empty">未找到节点 '+esc(id)+'</div>'; return; }
  renderDetail(data);
}

function renderDetail(data) {
  const n = data.node;
  const bc = data.ancestors.map(a => '<a data-id="'+esc(a.id)+'">'+esc(a.name)+'</a>').join(" <span class='muted'>/</span> ");
  let badges = '<span class="badge type">'+n.type+'</span><span class="badge">'+esc(n.universe)+'</span><span class="badge">L'+n.level+'</span>';
  if (n.historical) badges += '<span class="badge hist">历史/已消失</span>';
  if (!n.global) badges += '<span class="badge regional">地域性</span>';

  let html = '<div class="breadcrumb">' + (bc ? bc + " <span class='muted'>/</span> " : "") + '<span>'+esc(n.name)+'</span></div>';
  html += '<h1 class="node-title">'+esc(n.name)+'</h1>';
  if (n.name_zh) html += '<div class="node-zh">'+esc(n.name_zh)+'</div>';
  html += '<div class="badges">'+badges+'</div>';
  if (n.description) html += '<div class="desc">'+esc(n.description)+'</div>';
  if (n.aliases && n.aliases.length) html += '<div><span class="muted">别名：</span>' + n.aliases.map(a=>'<span class="chip">'+esc(a)+'</span>').join("") + '</div>';
  if (n.examples && n.examples.length) html += '<div style="margin-top:6px"><span class="muted">实例：</span>' + n.examples.map(a=>'<span class="chip">'+esc(a)+'</span>').join("") + '</div>';
  if (n.participation_modes && n.participation_modes.length) html += '<div style="margin-top:6px"><span class="muted">参与方式：</span>' + n.participation_modes.map(m=>'<span class="chip">'+(MODE_ZH[m]||m)+'</span>').join("") + '</div>';

  html += '<div class="tabs">' +
    '<div class="tab '+(activeTab==="overview"?"active":"")+'" data-tab="overview">子节点 ('+data.children.length+')</div>' +
    '<div class="tab '+(activeTab==="relations"?"active":"")+'" data-tab="relations">关系 ('+(data.relationsOut.length+data.relationsIn.length)+')</div>' +
    (n.metrics ? '<div class="tab '+(activeTab==="metrics"?"active":"")+'" data-tab="metrics">文明指标</div>' : '') +
    '</div><div id="tab-body"></div>';

  $("#detail").innerHTML = html;
  $("#detail").querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => { activeTab = t.dataset.tab; renderTab(data); }));
  $("#detail").querySelectorAll(".breadcrumb a[data-id]").forEach(a => a.addEventListener("click", () => selectNode(a.dataset.id)));
  renderTab(data);
}

function renderTab(data) {
  $("#detail").querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === activeTab));
  const body = $("#tab-body");
  const n = data.node;
  if (activeTab === "overview") {
    if (!data.children.length) { body.innerHTML = '<div class="empty">叶子节点（无子节点）</div>'; return; }
    body.innerHTML = '<div class="panel"><h3>子节点</h3>' + data.children.map(c =>
      '<div class="rel-row"><span class="ttype muted">'+shortType(c.type)+'</span><a data-id="'+esc(c.id)+'" class="nm" style="flex:1">'+esc(c.name)+(c.name_zh?' · '+esc(c.name_zh):'')+'</a><span class="cnt">'+c.childCount+'</span></div>'
    ).join("") + '</div>';
    body.querySelectorAll("a[data-id]").forEach(a => a.addEventListener("click", () => selectNode(a.dataset.id)));
  } else if (activeTab === "relations") {
    const out = data.relationsOut.map(r => '<div class="rel-row"><span class="rel-dir">→</span><span class="rel-type">'+esc(r.relation)+'</span><a data-id="'+esc(r.id)+'" class="nm" style="flex:1">'+esc(r.name)+'</a><span class="muted">'+shortType(r.type)+'</span></div>').join("");
    const inc = data.relationsIn.map(r => '<div class="rel-row"><span class="rel-dir">←</span><span class="rel-type">'+esc(r.relation)+'</span><a data-id="'+esc(r.id)+'" class="nm" style="flex:1">'+esc(r.name)+'</a><span class="muted">'+shortType(r.type)+'</span></div>').join("");
    body.innerHTML = '<div class="panel"><h3>出边 ('+data.relationsOut.length+')</h3>'+(out||'<div class="empty">无</div>')+'</div>'+
      '<div class="panel"><h3>入边 ('+data.relationsIn.length+')</h3>'+(inc||'<div class="empty">无</div>')+'</div>';
    body.querySelectorAll("a[data-id]").forEach(a => a.addEventListener("click", () => selectNode(a.dataset.id)));
  } else if (activeTab === "graph") {
    body.innerHTML = "";
    mountForceGraph(body, data);
  } else if (activeTab === "metrics") {
    body.innerHTML = renderMetrics(n.metrics);
  }
}

const GROWTH_CLASS = { rapidly_growing:"rapid", growing:"grow", stable:"stable", declining:"declining", rapidly_declining:"rapid_declining", unknown:"stable" };
const GROWTH_ZH = { rapidly_growing:"快速增长", growing:"增长", stable:"稳定", declining:"衰退", rapidly_declining:"快速衰退", unknown:"未知" };

function renderMetrics(m) {
  if (!m) return '<div class="empty">无指标数据</div>';
  const cards = [];
  const cell = (k, v, n) => '<div class="metric-card"><div class="k">'+k+'</div><div class="v">'+v+'</div>'+(n?'<div class="n">'+esc(n)+'</div>':'')+'</div>';
  if (m.population) cards.push(cell("从业/参与人数", esc(m.population.est||"未知"), m.population.note));
  if (m.economy) cards.push(cell("经济规模", esc(m.economy.est||"未知"), (m.economy.basis||"") + (m.economy.year?" · "+m.economy.year:"")));
  if (m.public_awareness) cards.push('<div class="metric-card"><div class="k">公众认知度 ('+m.public_awareness.score+'/100)</div><div class="bar"><i style="width:'+m.public_awareness.score+'%"></i></div><div class="n">'+esc(m.public_awareness.basis||"")+'</div></div>');
  if (m.historical_significance) cards.push(cell("历史意义", ZH_LEVEL[m.historical_significance] || m.historical_significance, ""));
  if (m.growth) cards.push('<div class="metric-card"><div class="k">近期趋势</div><div class="v"><span class="pill '+(GROWTH_CLASS[m.growth]||"stable")+'">'+ (GROWTH_ZH[m.growth]||m.growth) +'</span></div></div>');
  if (m.geography) cards.push('<div class="metric-card"><div class="k">地理分布</div><div class="v" style="font-size:13px">'+m.geography.map(g=>'<span class="chip">'+esc(g)+'</span>').join("")+'</div></div>');
  if (m.institutionalization) cards.push(cell("制度化程度", ZH_LEVEL[m.institutionalization] || m.institutionalization, ""));
  if (m.cultural_visibility) cards.push(cell("文化可见度", ZH_LEVEL[m.cultural_visibility] || m.cultural_visibility, ""));
  if (m.economic_weight || m.cultural_weight) {
    cards.push('<div class="metric-card"><div class="k">经济权重 vs 文化权重</div>'+
      '<div style="margin-top:6px">经济 '+bar(m.economic_weight)+'</div>'+
      '<div style="margin-top:6px">文化 '+bar(m.cultural_weight)+'</div></div>');
  }
  if (m.confidence != null) cards.push('<div class="metric-card"><div class="k">数据置信度 ('+Math.round(m.confidence*100)+'%)</div><div class="bar gold"><i style="width:'+(m.confidence*100)+'%"></i></div></div>');
  if (m.method) cards.push(cell("来源/方法", methodZh(m.method), ""));
  return '<div class="panel"><h3>文明量化指标</h3><div class="metric-grid">'+cards.join("")+'</div></div>';
}
const ZH_LEVEL = { negligible:"可忽略", low:"低", moderate:"中等", high:"高", very_high:"极高", foundational:"奠基性", minimal:"极低", unknown:"未知" };
function bar(level) {
  const w = { negligible:5, minimal:8, low:25, moderate:50, high:75, very_high:95, foundational:100, unknown:0 }[level] || 0;
  return '<div class="bar"><i style="width:'+w+'%"></i></div>';
}
function methodZh(m) { return { measured:"实测数据", census:"普查/统计", survey:"调查", model_estimate:"模型估计", expert_judgment:"专家判断", qualitative:"定性估计" }[m] || m; }

// ---- analytics ----
$("#btn-analytics").addEventListener("click", async () => {
  $("#welcome").classList.add("hidden");
  $("#detail").classList.add("hidden");
  const el = $("#analytics");
  el.classList.remove("hidden");
  el.innerHTML = '<div class="empty">加载中…</div>';
  const a = await api("/api/analytics");
  el.innerHTML =
    '<h2>📊 分析（示例问题）</h2>'+
    '<div class="panel"><h3>数学有哪些领域？ ('+a.mathCount+')</h3><div class="muted">递归子树已加载，点击左侧 HK.mathematics 浏览全部。</div></div>'+
    '<div class="panel"><h3>半导体产业有哪些环节？ ('+a.semiCount+')</h3>'+(a.semi.map(s=>'<span class="chip">'+esc(s.name)+'</span>').join(" "))+'</div>'+
    '<div class="panel"><h3>一个 GPU 公司属于哪些产业/技术？</h3>'+(a.gpu.map(g=>'<div class="rel-row"><span class="rel-type">'+esc(g.relation)+'</span><span class="nm">'+esc(g.name)+'</span></div>').join(""))+'</div>'+
    '<div class="panel"><h3>哪些职业跨越最多知识领域？</h3>'+(a.occSpan.map(o=>'<div class="rel-row"><span class="nm" style="flex:1">'+esc(o.name)+'</span><span class="cnt">'+o.d+' 条</span></div>').join(""))+'</div>'+
    '<div class="panel"><h3>关联最多的节点（中心性）</h3>'+(a.mostLinked.map(o=>'<div class="rel-row"><span class="nm" style="flex:1">'+esc(o.name)+'</span><span class="cnt">'+o.d+' 条</span></div>').join(""))+'</div>'+
    '<div class="panel"><h3>已消失职业（前 40）</h3>'+a.historical.map(h=>'<span class="chip">'+esc(h)+'</span>').join(" ")+'</div>';
});

// init
loadMeta();
loadRoots();

// ---- force-directed ego graph ----
function mountForceGraph(container, data) {
  const nodes = new Map();
  const add = (n) => { if (n && n.id && !nodes.has(n.id)) nodes.set(n.id, { id:n.id, name:n.name, type:n.type, x:0, y:0, vx:0, vy:0 }); };
  add({ id: data.node.id, name: data.node.name, type: data.node.type });
  const edges = [];
  for (const r of data.relationsOut) { add({ id:r.id, name:r.name, type:r.type }); edges.push([data.node.id, r.id, r.relation]); }
  for (const r of data.relationsIn)  { add({ id:r.id, name:r.name, type:r.type }); edges.push([r.id, data.node.id, r.relation]); }
  const arr = [...nodes.values()];
  if (arr.length <= 1) { container.innerHTML = '<div class="empty">该节点无关系边</div>'; return; }
  const W = Math.max(container.clientWidth - 4, 500), H = 540;
  container.innerHTML = '<div class="muted" style="margin-bottom:8px">'+arr.length+' 节点 · '+edges.length+' 边 · 中心='+esc(data.node.name)+'</div><svg id="g"></svg>';
  const svg = container.querySelector("svg");
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  svg.setAttribute("width", W); svg.setAttribute("height", H);
  const cx = W/2, cy = H/2;
  arr.forEach((n,i) => { const a = 2*Math.PI*i/arr.length; const r = Math.min(W,H)/3; n.x = cx + r*Math.cos(a); n.y = cy + r*Math.sin(a); });
  const ns = "http://www.w3.org/2000/svg";
  const lineEls = edges.map(e => { const l = document.createElementNS(ns,"line"); l.setAttribute("stroke","#333a4d"); l.setAttribute("stroke-width","1"); svg.appendChild(l); return l; });
  const nodeEls = arr.map(n => {
    const g = document.createElementNS(ns,"g");
    g.style.cursor = "pointer";
    const c = document.createElementNS(ns,"circle"); c.setAttribute("r","5"); c.setAttribute("fill", colorFor(n.type)); c.setAttribute("stroke","#0f1117"); c.setAttribute("stroke-width","1.5");
    const t = document.createElementNS(ns,"text"); t.setAttribute("font-size","10"); t.setAttribute("fill","#aeb6c8"); t.setAttribute("x","9"); t.setAttribute("y","3"); t.textContent = truncate(n.name, 26);
    g.appendChild(c); g.appendChild(t);
    g.addEventListener("click", () => selectNode(n.id));
    svg.appendChild(g);
    return { g, n, c };
  });
  const byId = new Map(arr.map(n => [n.id, n]));
  for (let tick = 0; tick < 320; tick++) {
    for (let i=0;i<arr.length;i++) for (let j=i+1;j<arr.length;j++) {
      const a=arr[i], b=arr[j]; let dx=a.x-b.x, dy=a.y-b.y; let d2=dx*dx+dy*dy||1; let d=Math.sqrt(d2);
      const f = 8000/d2; a.vx+=dx/d*f; a.vy+=dy/d*f; b.vx-=dx/d*f; b.vy-=dy/d*f;
    }
    for (const [sa,sb] of edges) {
      const a=byId.get(sa), b=byId.get(sb); if(!a||!b) continue;
      let dx=b.x-a.x, dy=b.y-a.y; let d=Math.sqrt(dx*dx+dy*dy)||1; const f=(d-85)*0.012;
      a.vx+=dx/d*f; a.vy+=dy/d*f; b.vx-=dx/d*f; b.vy-=dy/d*f;
    }
    for (const n of arr) { n.vx+=(cx-n.x)*0.012; n.vy+=(cy-n.y)*0.012; }
    for (const n of arr) { n.vx*=0.85; n.vy*=0.85; n.x+=n.vx; n.y+=n.vy; }
  }
  (function render() {
    lineEls.forEach((l,i) => { const e=edges[i]; const a=byId.get(e[0]), b=byId.get(e[1]); if(!a||!b) return; l.setAttribute("x1",a.x); l.setAttribute("y1",a.y); l.setAttribute("x2",b.x); l.setAttribute("y2",b.y); });
    nodeEls.forEach(o => { o.g.setAttribute("transform","translate("+o.n.x.toFixed(1)+","+o.n.y.toFixed(1)+")"); o.c.setAttribute("r", o.n.id===data.node.id?8:5); });
  })();
}
const MODE_ZH = { professional:"职业实践", amateur:"业余实践", recreational:"娱乐参与", spectator:"观众参与", community:"社群参与" };
function colorFor(type) {
  const m = { UNIVERSE:"#ffffff", KNOWLEDGE_FIELD:"#5b8cff", METHODOLOGY:"#60a5fa", OCCUPATION:"#22d3a5", SOCIAL_ROLE:"#a78bfa", ART_FORM:"#f472b6", ART_GENRE:"#f472b6", ART_MOVEMENT:"#f472b6", ART_TECHNIQUE:"#f472b6", SPORT:"#fb923c", GAME:"#fb923c", INDUSTRY:"#f59e0b", SECTOR:"#f59e0b", ECONOMIC_ACTIVITY:"#f59e0b", PRODUCT:"#34d399", SERVICE:"#34d399", TECHNOLOGY:"#2dd4bf", MATERIAL:"#2dd4bf", ORGANIZATION_TYPE:"#eab308", INSTITUTION:"#eab308", MEDIA_FORM:"#f87171", CONTENT_TYPE:"#f87171", EMERGING_FIELD:"#c084fc", ACTIVITY:"#38bdf8" };
  return m[type] || "#94a3b8";
}
function truncate(s, n) { return (s && s.length > n) ? s.slice(0, n) + "…" : (s || ""); }
