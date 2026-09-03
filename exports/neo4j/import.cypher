// HK-OI import (run in Neo4j after placing CSV in import dir)
// neo4j-admin import:
// bin/neo4j-admin database import full --nodes=import/nodes.csv --relationships=import/relationships.csv --overwrite-destination

LOAD CSV WITH HEADERS FROM 'file:///nodes.csv' AS row
CALL (n) { WITH row CALL apoc.create.node([row.:LABEL], {id:row.id, name:row.name, name_zh:row.name_zh, type:row.type, universe:row.universe, level:toInteger(row.level)}) YIELD node RETURN node }
RETURN count(*);
