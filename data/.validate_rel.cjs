const fs = require('fs');
const nodes = JSON.parse(fs.readFileSync('/Users/faputa/Documents/Entro-Cycles/Statistic/data/nodes/tech.json', 'utf8'));
const ids = new Set(nodes.map(n => n.id));
const hk = new Set(["HK.mathematics","HK.logic","HK.computer_science","HK.statistics","HK.information_science","HK.systems_science","HK.operations_research","HK.data_science","HK.physics","HK.chemistry","HK.biology","HK.earth_science","HK.astronomy","HK.atmospheric_science","HK.oceanography","HK.materials_science","HK.environmental_science","HK.economics","HK.psychology","HK.sociology","HK.anthropology","HK.political_science","HK.law","HK.geography","HK.linguistics","HK.communication","HK.education","HK.criminology","HK.demography","HK.social_work","HK.philosophy","HK.history","HK.literature","HK.religious_studies","HK.art_history","HK.archaeology","HK.classics","HK.musicology","HK.film_studies","HK.medicine","HK.engineering","HK.agriculture","HK.forestry","HK.architecture","HK.urban_planning","HK.business","HK.accounting","HK.finance","HK.public_health","HK.nursing","HK.dentistry","HK.pharmacy","HK.veterinary_medicine","HK.journalism","HK.library_science","HK.public_administration","HK.cognitive_science","HK.neuroscience","HK.complexity_science","HK.sustainability_science","HK.gender_studies","HK.area_studies","HK.bioinformatics","HK.digital_humanities"]);
const rels = fs.readFileSync('/Users/faputa/Documents/Entro-Cycles/Statistic/data/.tech_rel.jsonl', 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
const bad = rels.filter(r => !ids.has(r.source) || !ids.has(r.target))
  .map(r => (ids.has(r.source) ? '' : 'SRC ') + (ids.has(r.target) ? '' : 'TGT ') + r.source + ' --' + r.relation + '--> ' + r.target);
// parent-edge duplication check
const parent = new Set(nodes.map(n => n.id + '||' + n.parent));
const parentDup = rels.filter(r => {
  // relation equals a tree edge in either direction with SUB*/PART types is not it; check if source->target is a parent edge
  return parent.has(r.source + '||' + r.target) || parent.has(r.target + '||' + r.source);
}).map(r => r.source + ' ' + r.relation + ' ' + r.target);
console.log(JSON.stringify({relCount: rels.length, badCount: bad.length, bad, parentDupCount: parentDup.length, parentDup}, null, 1));
