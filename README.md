# HK-OI — Human Knowledge, Occupation & Industry Ontology

A **tree + graph** multi-level ontology approximating the full classification space of human
knowledge, labour, culture, and economic activity.

## Design principles

- **Not one tree.** Reality is a graph. Each node has a primary `parent` (the hierarchy) plus
  explicit `relations` (the cross-reference graph).
- **Global & cross-cultural.** Not anchored to any single national classification system.
- **Historical depth.** Extinct occupations/fields are retained with `historical: true` and linked
  to modern successors.
- **Structural completeness over apparent completeness.** Deep recursion stops only when a real
  community / methodology / market / object boundary is reached — never to pad counts.

## Universes (Level 0)

| id | universe |
|----|----------|
| HUMAN_KNOWLEDGE | academic disciplines & knowledge fields |
| OCCUPATIONS | jobs, professions, trades |
| SOCIAL_ROLES | roles in society (not necessarily paid) |
| ARTS_AND_CULTURE | art forms, movements, genres, techniques |
| SPORTS_AND_GAMES | sports, games, mind sports, traditional games |
| INDUSTRIES | sectors → industries → economic activities |
| PRODUCTS_AND_SERVICES | goods and services |
| ORGANIZATIONS_AND_INSTITUTIONS | company/institution types |
| TECHNOLOGIES | technologies, materials, methods-as-artifacts |
| MEDIA_AND_CONTENT | media forms & content types |
| HISTORICAL_OCCUPATIONS | extinct/historical occupations |
| EMERGING_FIELDS | nascent cross-disciplinary areas |

## Node schema

```json
{
  "id": "human_knowledge.mathematics.algebra.group_theory",
  "name": "Group Theory",
  "name_en": "Group Theory",
  "name_zh": "群论",
  "type": "KNOWLEDGE_FIELD",
  "parent": "human_knowledge.mathematics.algebra",
  "level": 4,
  "description": "...",
  "aliases": [],
  "examples": [],
  "historical": false,
  "global": true
}
```

## Relation schema

```json
{ "source": "computer_vision.id", "relation": "APPLICATION_OF", "target": "mathematics.id" }
```


## Civilization Metrics (per-node quantitative/estimated metadata)

Every relevant node carries optional `metrics` (stored as JSON in SQLite `nodes.metrics` and in
`exports/ontology.json`). Schema:

```json
{
  "population": { "est": "~30M", "note": "..." },            // practitioners/participants
  "economy":    { "est": "$5T", "basis": "...", "year": 2025, "currency": "USD", "note": "..." },
  "public_awareness": { "score": 80, "basis": "..." },       // 0-100
  "historical_significance": "very_high",                    // negligible|low|moderate|high|very_high|foundational|unknown
  "growth": "rapidly_growing",                               // rapidly_growing|growing|stable|declining|rapidly_declining|unknown
  "geography": ["global", "East Asia"],                      // major regions
  "institutionalization": "very_high",                       // minimal|low|moderate|high|very_high
  "cultural_visibility": "high",                             // negligible|low|moderate|high|very_high
  "economic_weight": "very_high",                            // orthogonal to cultural_weight
  "cultural_weight": "very_high",                            // orthogonal to economic_weight
  "confidence": 0.5,                                         // 0-1
  "method": "model_estimate"                                 // measured|census|survey|model_estimate|expert_judgment|qualitative
}
```

**Principles**: order-of-magnitude estimates with explicit confidence and provenance; `unknown` /
omitted where no reliable basis exists; measured vs model-based estimates are distinguished; and
**economic and cultural weight are kept as separate orthogonal dimensions** — a small economy can
have enormous cultural/scientific/historical significance, so no single ranking is imposed.


## Web UI viewer

```bash
pnpm ui        # or: node src/server.mjs
# open http://localhost:4173
```

Features: lazy-loading universe tree · full-text search (English/中文/ID) · node detail
(description/aliases/examples) · relations (in/out graph edges) · civilization-metrics panel
(population, economy, awareness, growth, geography, institutionalization, economic-vs-cultural weight,
confidence) · analytics dashboard answering the sample questions.

## Current scale (auto-reported)

See `reports/report.md`. The build prints live counts; as of the latest build:
**12,334 nodes · 14,877 relations · 455 nodes with civilization metrics · 12 universes · depth L0–L7.**

## Build

```bash
pnpm build     # compiles data/** into exports/ontology.json + exports/ontology.db (SQLite)
pnpm report    # quality-control analytics
```

Uses Node's built-in `node:sqlite` (no native dependencies).
