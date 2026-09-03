# HK-OI Authoring Specification (read this fully before writing)

You are authoring ONE slice of the HK-OI ontology — a tree+graph taxonomy approximating the full
classification space of human knowledge, work, culture, and economic activity.

## Where to write
- Nodes     -> `data/nodes/<your-file>.json`     (a JSON array of node objects)
- Relations -> `data/relations/<your-file>.json` (a JSON array of relation objects)

## Existing universes (L0) — DO NOT recreate them. Root nodes attach to these ids.
Read `data/ids.json` for the exact universe ids and their child-id prefixes.

## Node schema (exact)
{
  "id": "<prefix>.<slug.path>",   // lowercase snake_case, dot-separated hierarchy
  "name": "English Name",         // canonical English name, Title Case
  "name_zh": "中文名",            // optional; omit for obscure technical terms
  "type": "KNOWLEDGE_FIELD",      // see allowed types
  "parent": "<existing node id>", // REQUIRED (a universe id or a node you create)
  "description": "One concise sentence.",
  "aliases": ["alias"],           // optional
  "examples": ["concrete example"], // optional
  "historical": false,            // true only if extinct/obsolete
  "global": true                  // false only if region/culture-specific
}
Do NOT add `level` or `universe` fields — the build derives them.

## Node types (ONLY these)
UNIVERSE, KNOWLEDGE_FIELD, METHODOLOGY, OCCUPATION, SOCIAL_ROLE, ART_FORM, ART_MOVEMENT,
ART_GENRE, ART_TECHNIQUE, SPORT, GAME, INDUSTRY, SECTOR, ECONOMIC_ACTIVITY, PRODUCT, SERVICE,
TECHNOLOGY, MATERIAL, ORGANIZATION_TYPE, INSTITUTION, MEDIA_FORM, CONTENT_TYPE, EMERGING_FIELD

## Relation schema
{ "source": "<node id>", "relation": "<REL>", "target": "<node id>" }
Allowed relation types: SUBFIELD_OF, SPECIALIZATION_OF, SUBTYPE_OF, SUBFORM_OF, SUBGENRE_OF,
SUBSPORT_OF, SUBGAME_OF, SUBINDUSTRY_OF, SUBTECHNOLOGY_OF, PART_OF, METHOD_OF, TECHNIQUE_OF,
RELATED_TO, APPLICATION_OF, APPLIES_TO, METHOD_FOR, USED_BY, USES, PRODUCES, CONSUMES,
OVERLAPS_WITH, INTERSECTS_WITH, HISTORICAL_PREDECESSOR, HISTORICAL_SUCCESSOR, PRECURSOR_OF,
SUCCESSOR_OF, ROLE_IN, SECTOR_OF, TECHNOLOGY_OF, MARKET_OF, MATERIAL_OF

## Rules
1. `parent` = the tree (primary "is-a / part-of / specialization" home).
   Cross-links = relations (the graph). Never duplicate a parent edge as a relation.
2. Overlaps go in relations (OVERLAPS_WITH, APPLICATION_OF, ...), NOT by forcing a node into a
   parent you are unsure about.
3. Reference ONLY ids you are certain exist: your own ids, universe ids, and the
   `human_knowledge_l1` ids in `data/ids.json`. If a cross-universe target is uncertain, SKIP
   the relation instead of inventing an id.
4. Recurse while a node has (a) an independent community, (b) independent methodology,
   (c) independent education, (d) independent market, OR (e) a clearly distinct object of study.
   STOP when further splits would merely list specific technologies/papers/companies/people.
5. Global & cross-cultural: include non-Western and indigenous forms (e.g. Traditional Chinese
   Medicine, Ayurveda, Kabuki, Muay Thai, indigenous crafts). Mark region-specific nodes `"global": false`.
6. Historical: mark extinct categories `"historical": true`; link source=historical ->
   target=modern via HISTORICAL_SUCCESSOR.
7. Do NOT conflate occupation vs industry vs product vs technology.
   ("AI research scientist" = OCCUPATION; "AI industry" = INDUSTRY; "inference accelerator" = TECHNOLOGY/PRODUCT.)
8. No duplicate nodes; prefer one canonical id + aliases.
9. Keep names precise, standard, English. Add name_zh only where a standard Chinese term exists.

## Quality checklist (verify before finishing)
A. Completeness — any obvious missing major area?
B. Granularity — any node coarser than its siblings?
C. Overlap — should any pair be a cross-link instead of parent-child?
D. Duplication — synonyms/duplicate nodes?
E. Taxonomy errors — mixed occupation/discipline/industry/product under one parent?
F. Cultural bias — over-reliance on Western categories?
G. Historical — missing important extinct categories?

## Finish
Return a compact JSON summary: { file, nodesWritten, relationsWritten, topLevelChildren,
deepestLevel, notableCrossLinks, gaps }.
