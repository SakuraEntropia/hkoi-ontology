// HK-OI ad-hoc query runner (sqlite)
// usage: node src/query.mjs "SELECT ..."
import { DatabaseSync } from "node:sqlite";
const sql = process.argv.slice(2).join(" ") || "SELECT COUNT(*) AS nodes FROM nodes";
const db = new DatabaseSync("exports/ontology.db");
const rows = db.prepare(sql).all();
console.log(JSON.stringify(rows, null, 1));
db.close();
