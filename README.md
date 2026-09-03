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

## Build

```bash
pnpm build     # compiles data/** into exports/ontology.json + exports/ontology.db (SQLite)
pnpm report    # quality-control analytics
```

Uses Node's built-in `node:sqlite` (no native dependencies).
