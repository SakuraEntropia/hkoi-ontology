# HK-OI Ontology Report

Generated: 2026-09-03T06:03:49.927Z

## 1. Summary

- **Nodes**: 11491  (with metrics: 346)
- **Relations**: 13395

### By universe

| universe | nodes |
|---|---|
| HUMAN_KNOWLEDGE | 4928 |
| OCCUPATIONS | 1300 |
| ARTS_AND_CULTURE | 894 |
| INDUSTRIES | 864 |
| TECHNOLOGIES | 719 |
| PRODUCTS_AND_SERVICES | 649 |
| SPORTS_AND_GAMES | 619 |
| MEDIA_AND_CONTENT | 437 |
| SOCIAL_ROLES | 398 |
| ORGANIZATIONS_AND_INSTITUTIONS | 359 |
| HISTORICAL_OCCUPATIONS | 297 |
| EMERGING_FIELDS | 27 |

### By level

| level | nodes |
|---|---|
| L0 | 12 |
| L1 | 266 |
| L2 | 2367 |
| L3 | 6224 |
| L4 | 2307 |
| L5 | 292 |
| L6 | 23 |

### By type

| type | nodes |
|---|---|
| KNOWLEDGE_FIELD | 4588 |
| OCCUPATION | 1556 |
| TECHNOLOGY | 715 |
| ECONOMIC_ACTIVITY | 629 |
| PRODUCT | 556 |
| ART_GENRE | 525 |
| SPORT | 448 |
| SOCIAL_ROLE | 411 |
| MEDIA_FORM | 223 |
| INSTITUTION | 222 |
| METHODOLOGY | 213 |
| GAME | 207 |
| SERVICE | 167 |
| ART_FORM | 143 |
| INDUSTRY | 143 |
| ART_MOVEMENT | 140 |
| ORGANIZATION_TYPE | 136 |
| CONTENT_TYPE | 133 |
| ART_TECHNIQUE | 128 |
| EMERGING_FIELD | 88 |
| MATERIAL | 69 |
| SECTOR | 39 |
| UNIVERSE | 12 |

## 2. Civilization Metrics

### Growth trajectory (recent)

| growth | nodes |
|---|---|
| stable | 111 |
| null | 95 |
| growing | 80 |
| rapidly_growing | 26 |
| rapidly_declining | 20 |
| declining | 14 |

### Historical significance

| level | nodes |
|---|---|
| null | 109 |
| high | 75 |
| very_high | 70 |
| moderate | 54 |
| foundational | 33 |
| low | 3 |
| unknown | 2 |

### Economic vs cultural weight (NOT ranked by economics)

| economic_weight | cultural_weight | nodes |
|---|---|---|
| null | null | 109 |
| very_high | moderate | 27 |
| negligible | moderate | 26 |
| very_high | high | 24 |
| high | very_high | 23 |
| moderate | high | 22 |
| low | moderate | 16 |
| very_high | very_high | 16 |
| low | high | 14 |
| moderate | very_high | 12 |
| high | high | 11 |
| low | very_high | 10 |
| moderate | moderate | 7 |
| negligible | high | 6 |
| high | low | 5 |
| very_high | low | 5 |
| high | moderate | 4 |
| negligible | very_high | 4 |
| moderate | low | 3 |
| low | low | 1 |

### Fields where cultural weight exceeds economic weight (culture-first nodes)

- Social Roles (cultural very_high / economic low)
- Craft (cultural high / economic low)
- Digital Art (cultural high / economic low)
- Performing Arts (cultural very_high / economic low)
- Astronomy (cultural high / economic low)
- Sociology (cultural high / economic low)
- Anthropology (cultural high / economic low)
- Philosophy (cultural very_high / economic low)
- Religious Studies (cultural very_high / economic low)
- Art History (cultural high / economic low)
- Archaeology (cultural high / economic low)
- Library & Information Science (cultural high / economic low)
- Gender Studies (cultural high / economic negligible)
- Area Studies (cultural high / economic negligible)
- Oral Tradition (cultural very_high / economic negligible)
- Photography (cultural high / economic low)
- Podcasting (cultural high / economic low)
- Religious and Spiritual (cultural very_high / economic low)
- Religious Institution (cultural very_high / economic low)
- Cultural Institution (cultural very_high / economic low)
- Community Organization (cultural high / economic low)
- Family & Kinship Roles (cultural very_high / economic negligible)
- Community & Civil Roles (cultural very_high / economic low)
- Political & Civic Roles (cultural very_high / economic low)
- Religious & Spiritual Roles (cultural very_high / economic low)
- Ceremonial & Ritual Roles (cultural high / economic negligible)
- Gender Roles (cultural very_high / economic negligible)
- Age-Graded & Life-Stage Roles (cultural very_high / economic negligible)
- Clan & Village Roles (cultural high / economic low)
- Mind Sports (cultural high / economic low)
- Board Games (cultural high / economic low)
- Tile Games (cultural high / economic negligible)
- Traditional & Indigenous Games (cultural high / economic negligible)
- Children's Games (cultural high / economic negligible)

### Data confidence (distribution)

| confidence | nodes |
|---|---|
| null | 14 |
| 0.4 | 5 |
| 0.45 | 128 |
| 0.5 | 111 |
| 0.55 | 32 |
| 0.6 | 55 |
| 0.7 | 1 |

### Methodology provenance

| method | nodes |
|---|---|
| expert_judgment | 170 |
| model_estimate | 84 |
| qualitative | 78 |
| null | 14 |

## 3. Quality Control

### A. Completeness — universes

| universe | nodes | status |
|---|---|---|
| EMERGING_FIELDS | 26 | ⚠ under-developed |
| HISTORICAL_OCCUPATIONS | 296 | ok |
| ORGANIZATIONS_AND_INSTITUTIONS | 358 | ok |
| SOCIAL_ROLES | 397 | ok |
| MEDIA_AND_CONTENT | 436 | ok |
| SPORTS_AND_GAMES | 618 | ok |
| PRODUCTS_AND_SERVICES | 648 | ok |
| TECHNOLOGIES | 718 | ok |
| INDUSTRIES | 863 | ok |
| ARTS_AND_CULTURE | 893 | ok |
| OCCUPATIONS | 1299 | ok |
| HUMAN_KNOWLEDGE | 4927 | ok |

### B. Granularity — max depth per universe

| universe | max level |
|---|---|
| ARTS_AND_CULTURE | 6 |
| HUMAN_KNOWLEDGE | 6 |
| OCCUPATIONS | 6 |
| INDUSTRIES | 5 |
| MEDIA_AND_CONTENT | 5 |
| PRODUCTS_AND_SERVICES | 5 |
| SPORTS_AND_GAMES | 5 |
| TECHNOLOGIES | 5 |
| HISTORICAL_OCCUPATIONS | 4 |
| ORGANIZATIONS_AND_INSTITUTIONS | 4 |
| SOCIAL_ROLES | 3 |
| EMERGING_FIELDS | 1 |

### C. Overlap — cross-link relation types

| relation | count |
|---|---|
| SUBFIELD_OF | 4680 |
| SPECIALIZATION_OF | 1983 |
| SUBTYPE_OF | 1508 |
| PART_OF | 783 |
| SUBTECHNOLOGY_OF | 715 |
| OVERLAPS_WITH | 663 |
| SUBGENRE_OF | 526 |
| SUBSPORT_OF | 448 |
| RELATED_TO | 401 |
| APPLICATION_OF | 255 |
| METHOD_OF | 213 |
| SUBGAME_OF | 207 |
| SUBINDUSTRY_OF | 182 |
| USES | 180 |
| SUBFORM_OF | 157 |
| TECHNIQUE_OF | 134 |
| HISTORICAL_SUCCESSOR | 110 |
| USED_BY | 56 |
| ROLE_IN | 36 |
| PRODUCES | 32 |
| PRECURSOR_OF | 31 |
| APPLIES_TO | 27 |
| CONSUMES | 20 |
| HISTORICAL_PREDECESSOR | 15 |
| INTERSECTS_WITH | 12 |
| MATERIAL_OF | 11 |
| TECHNOLOGY_OF | 3 |
| SUCCESSOR_OF | 3 |
| METHOD_FOR | 3 |
| SECTOR_OF | 1 |

### D. Duplication — identical names

Potential duplicate names: 30
- Synthetic Biology (x4)
- Semiconductor Materials (x4)
- Public Relations (x4)
- Proteomics (x4)
- Powder Metallurgy (x4)
- Natural Language Processing (x4)
- Medical Devices (x4)
- Landscape Architecture (x4)
- Interior Design (x4)
- Higher Education (x4)
- Geodesy (x4)
- Biomaterials (x4)
- Weaving (x3)
- Water Treatment (x3)
- Wastewater Treatment (x3)
- Waste-to-Energy (x3)
- Warehousing (x3)
- Visual Effects (x3)
- Video Games (x3)
- Venture Capital (x3)
- Urban Design (x3)
- Travel Writing (x3)
- Transcriptomics (x3)
- Town Crier (x3)
- Thriller (x3)
- Textile Machinery (x3)
- Taxation (x3)
- Takaful (x3)
- Soviet Montage (x3)
- Software as a Service (x3)

### F. Cultural bias — region-specific nodes
- region-specific (global=false): 818

### G. Historical — extinct categories
- historical: 489

## 4. Analytics (sample questions)

### Q. 数学有哪些领域?
- count: 368

### Q. 半导体产业有哪些环节?
- count: 74

### Q. 有哪些已经消失的职业?
- count: 296
- Administrative & Clerical Occupations
- Agricultural & Pastoral Occupations
- Alchemist
- Almanac Maker
- Anchorite
- Apothecary
- Archer
- Armourer
- Arquebusier
- Astrologer
- Astronomical Computer
- Augur
- Baker
- Barber-Surgeon
- Bard
- Bargeman
- Basket Maker
- Bath Attendant
- Beadle
- Bell Founder
- Blacksmith
- Bonesetter
- Bowyer
- Breaker Boy
- Brewer
- Brickmaker
- Broom Squire
- Bull Leaper
- Butler
- Camel Driver

### Q. 一个 GPU 公司属于哪些产业? (graph reach from GPU)
- SUBTECHNOLOGY_OF Processor Technology
- RELATED_TO Semiconductor Industry
- USED_BY Information & Communications Technology
- USED_BY Artificial Intelligence
- RELATED_TO Games
- RELATED_TO Computer Graphics
- USED_BY Internet & Cloud
- RELATED_TO Video Games
- RELATED_TO Electronics & Electrical Equipment

### Q. 哪些职业跨越最多知识领域? (occupation -> knowledge links)
- Mathematician: 3
- Human Computer: 2
- Scribe: 1
- Illuminator: 1
- Phrenologist: 1
- Haruspex: 1
- Astrologer: 1
- Alchemist: 1
- Barber-Surgeon: 1
- Apothecary: 1
- Tabulating Machine Operator: 1
- Keypunch Operator: 1
- Comptometer Operator: 1
- Telegraph Operator: 1
- Sociologist: 1

### Q. 哪些产业拥有最多不同职业? (industry -> occupation links)
- Semiconductor Industry: 1

### Q. 关联最多的节点 (most cross-linked)
| node | degree |
|---|---|
| Graphics Processing Unit | 9 |
| Life Sciences & Healthcare | 9 |
| Manufacturing | 9 |
| Semiconductor Industry | 9 |
| Mathematician | 8 |
| Information & Communications Technology | 8 |
| Cognitive Science | 7 |
| Agriculture & Agrifood | 7 |
| Data Science | 6 |
| Engineering and Technology | 6 |
| Energy & Power Generation | 6 |
| Bioinformatics | 5 |
| Semiconductors | 5 |
| Human Computer | 5 |
| Construction & Civil Engineering | 5 |
| Artificial Intelligence | 5 |
| Oil & Gas Extraction | 5 |
| Professional, Scientific & Technical Services | 5 |
| Transportation & Logistics | 5 |
| Architecture | 4 |

## 5. Method note

Metrics are order-of-magnitude estimates (method: model_estimate / expert_judgment / qualitative) with explicit confidence in [0,1]. Population/economy are omitted (not 'unknown') where a node is not a human activity (products, organizations). No single ranking is imposed — economic_weight and cultural_weight are kept as separate orthogonal dimensions.