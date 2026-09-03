-- HK-OI ontology schema (SQLite, built by src/build.mjs)
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS nodes (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  name_en     TEXT NOT NULL,
  name_zh     TEXT,
  type        TEXT NOT NULL,
  parent      TEXT,
  level       INTEGER NOT NULL,
  universe    TEXT NOT NULL,
  description TEXT,
  aliases     TEXT,          -- JSON array
  examples    TEXT,          -- JSON array
  historical  INTEGER NOT NULL DEFAULT 0,
  global      INTEGER NOT NULL DEFAULT 1,
  source      TEXT
);
CREATE INDEX IF NOT EXISTS idx_nodes_parent   ON nodes(parent);
CREATE INDEX IF NOT EXISTS idx_nodes_type     ON nodes(type);
CREATE INDEX IF NOT EXISTS idx_nodes_universe ON nodes(universe);
CREATE INDEX IF NOT EXISTS idx_nodes_level    ON nodes(level);

CREATE TABLE IF NOT EXISTS relations (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  source   TEXT NOT NULL,
  relation TEXT NOT NULL,
  target   TEXT NOT NULL,
  kind     TEXT NOT NULL DEFAULT 'explicit'   -- 'parent' (materialized tree edge) | 'explicit'
);
CREATE INDEX IF NOT EXISTS idx_rel_source ON relations(source);
CREATE INDEX IF NOT EXISTS idx_rel_target ON relations(target);
CREATE INDEX IF NOT EXISTS idx_rel_kind   ON relations(kind);

CREATE TABLE IF NOT EXISTS meta (
  key   TEXT PRIMARY KEY,
  value TEXT
);
