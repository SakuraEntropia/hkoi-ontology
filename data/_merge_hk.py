import json, os

base = "/Users/faputa/Documents/Entro-Cycles/Statistic/data"
ids = json.load(open(base + "/ids.json", encoding="utf-8"))
L1 = set(x["id"] for x in ids["human_knowledge_l1"])
UNI = set(ids["universes"].keys())
MY9 = {"HK.philosophy","HK.history","HK.literature","HK.religious_studies","HK.art_history","HK.archaeology","HK.classics","HK.musicology","HK.film_studies"}

ALLOWED_TYPES = {"UNIVERSE","KNOWLEDGE_FIELD","METHODOLOGY","OCCUPATION","SOCIAL_ROLE","ART_FORM","ART_MOVEMENT","ART_GENRE","ART_TECHNIQUE","SPORT","GAME","INDUSTRY","SECTOR","ECONOMIC_ACTIVITY","PRODUCT","SERVICE","TECHNOLOGY","MATERIAL","ORGANIZATION_TYPE","INSTITUTION","MEDIA_FORM","CONTENT_TYPE","EMERGING_FIELD"}
ALLOWED_RELS = {"SUBFIELD_OF","SPECIALIZATION_OF","SUBTYPE_OF","SUBFORM_OF","SUBGENRE_OF","SUBSPORT_OF","SUBGAME_OF","SUBINDUSTRY_OF","SUBTECHNOLOGY_OF","PART_OF","METHOD_OF","TECHNIQUE_OF","RELATED_TO","APPLICATION_OF","APPLIES_TO","METHOD_FOR","USED_BY","USES","PRODUCES","CONSUMES","OVERLAPS_WITH","INTERSECTS_WITH","HISTORICAL_PREDECESSOR","HISTORICAL_SUCCESSOR","PRECURSOR_OF","SUCCESSOR_OF","ROLE_IN","SECTOR_OF","TECHNOLOGY_OF","MARKET_OF","MATERIAL_OF"}

chunk_files = ["_build_philosophy.json","_build_history.json","_build_literature.json","_build_religion.json","_build_arthistory.json","_build_archaeology.json","_build_classics.json","_build_musicology.json","_build_filmstudies.json"]
nodes=[]; rels=[]
for f in chunk_files:
    d = json.load(open(base + "/" + f, encoding="utf-8"))
    nodes += d["nodes"]; rels += d["relations"]

errors=[]
id_set=set(); dup=[]
for nd in nodes:
    if nd["id"] in id_set: dup.append(nd["id"])
    id_set.add(nd["id"])

for nd in nodes:
    if nd["type"] not in ALLOWED_TYPES: errors.append("bad type "+nd["id"]+":"+nd["type"])
    if nd["parent"] not in id_set and nd["parent"] not in L1 and nd["parent"] not in UNI:
        errors.append("dangling parent "+nd["id"]+" -> "+nd["parent"])

valid=[]; dropped=[]
for r in rels:
    if r["relation"] not in ALLOWED_RELS: errors.append("bad rel "+r["relation"]); continue
    sok = r["source"] in id_set or r["source"] in L1 or r["source"] in UNI
    tok = r["target"] in id_set or r["target"] in L1 or r["target"] in UNI
    if not (sok and tok): dropped.append(r["source"]+" --"+r["relation"]+"-> "+r["target"]); continue
    valid.append(r)

# write finals
os.makedirs(base + "/nodes", exist_ok=True)
os.makedirs(base + "/relations", exist_ok=True)
with open(base + "/nodes/hk_humanities.json", "w", encoding="utf-8") as f:
    json.dump(nodes, f, ensure_ascii=False, indent=1)
with open(base + "/relations/hk_humanities.json", "w", encoding="utf-8") as f:
    json.dump(valid, f, ensure_ascii=False, indent=1)

# cleanup only MY chunk files
for f in chunk_files:
    p = base + "/" + f
    if os.path.exists(p): os.remove(p)

# summary
deepest = max(len(x["id"].split(".")) for x in nodes)
top = sorted(x["name"] for x in nodes if x["parent"] in MY9)
cross = sum(1 for r in valid if (r["target"] in L1 and r["target"] not in MY9) or (r["source"] in L1 and r["source"] not in MY9))
hist = sum(1 for x in nodes if x.get("historical"))
nonglob = sum(1 for x in nodes if not x.get("global", True))

print("NODES", len(nodes))
print("RELATIONS", len(valid))
print("DEEPEST", deepest)
print("TOP_LEVEL_CHILDREN", len(top))
print("CROSS_LINKS", cross)
print("HISTORICAL_NODES", hist, "NONGLOBAL_NODES", nonglob)
print("DUP_IDS", len(dup), dup[:10])
print("ERRORS", len(errors), errors[:20])
print("DROPPED_RELS", len(dropped), dropped)
print("TOP_NAMES:", " | ".join(top))
