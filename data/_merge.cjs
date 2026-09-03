const fs = require("fs");
const base = "/Users/faputa/Documents/Entro-Cycles/Statistic/data/";

let allNodes = [];
let allRels = [];
for (let i = 1; i <= 6; i++) {
  const obj = JSON.parse(fs.readFileSync(base + "_p" + i + ".json", "utf8"));
  allNodes = allNodes.concat(obj.nodes);
  allRels = allRels.concat(obj.rels);
}

const badRels = [
  ["HK.economics.mercantilism","HISTORICAL_SUCCESSOR","HK.economics.economic_thought.classical_economics"],
  ["HK.economics.islamic_economics","RELATED_TO","HK.law"],
  ["HK.economics.social_choice_theory","USES","HK.mathematics"],
  ["HK.law.comparative_law.legal_families.customary_law","OVERLAPS_WITH","HK.anthropology"],
];
const goodRels = [
  ["HK.economics.economic_thought.mercantilism","HISTORICAL_SUCCESSOR","HK.economics.economic_thought.classical_economics"],
  ["HK.economics.economic_thought.islamic_economics","RELATED_TO","HK.law"],
  ["HK.economics.welfare_economics.social_choice_theory","USES","HK.mathematics"],
  ["HK.anthropology.legal_anthropology.customary_law","OVERLAPS_WITH","HK.law.comparative_law"],
];
allRels = allRels.filter(r => !badRels.some(b => b[0]===r.source && b[1]===r.relation && b[2]===r.target));
for (const g of goodRels) allRels.push({ source: g[0], relation: g[1], target: g[2] });

const trim = new Set([
 "HK.economics.monetary_economics.monetary_policy.forward_guidance",
 "HK.economics.macroeconomics.fiscal_policy.austerity",
 "HK.economics.macroeconomics.open_economy_macroeconomics.sovereign_default",
 "HK.economics.macroeconomics.economic_growth.unified_growth_theory",
 "HK.economics.macroeconomics.business_cycles.financial_accelerator",
 "HK.economics.econometrics.panel_data_econometrics.dynamic_panel_model",
 "HK.economics.econometrics.panel_data_econometrics.random_effects_model",
 "HK.economics.econometrics.nonparametric_econometrics",
 "HK.economics.econometrics.structural_estimation",
 "HK.economics.econometrics.macroeconometrics",
 "HK.economics.econometrics.time_series_econometrics.unit_root_testing",
 "HK.economics.econometrics.program_evaluation.propensity_score_matching",
 "HK.economics.behavioral_economics.prospect_theory.reference_dependence",
 "HK.economics.microeconomics.game_theory.auction_theory.dutch_auction",
 "HK.economics.microeconomics.game_theory.auction_theory.vickrey_auction",
 "HK.economics.labor_economics.labor_market_institutions.employment_protection",
 "HK.psychology.cognitive_psychology.memory.prospective_memory",
 "HK.psychology.cognitive_psychology.perception.auditory_perception",
 "HK.psychology.health_psychology.psychoneuroimmunology",
 "HK.psychology.forensic_psychology.criminal_profiling",
 "HK.psychology.forensic_psychology.competency_evaluation",
 "HK.psychology.positive_psychology.character_strengths",
 "HK.psychology.positive_psychology.flow",
 "HK.sociology.urban_sociology.neighborhood_effects",
 "HK.sociology.social_network_analysis.centrality",
 "HK.sociology.sociology_of_gender.gender_performativity",
 "HK.sociology.sociology_of_race_and_ethnicity.ethnicity",
 "HK.anthropology.anthropology_of_religion.witchcraft",
 "HK.anthropology.cognitive_anthropology.folk_taxonomy",
 "HK.anthropology.visual_anthropology.ethnographic_photography",
 "HK.anthropology.archaeological_anthropology.settlement_archaeology",
 "HK.political_science.political_methodology.case_study_method",
 "HK.political_science.political_theory.utopianism",
 "HK.law.private_law.property_law.trusts",
 "HK.law.private_law.family_law.adoption_law",
 "HK.law.comparative_law.legal_transplants",
 "HK.linguistics.historical_linguistics.glottochronology",
 "HK.linguistics.contact_linguistics.language_convergence",
 "HK.communication.communication_theory.spiral_of_silence",
 "HK.communication.group_communication",
]);
allNodes = allNodes.filter(n => !trim.has(n.id));
allRels = allRels.filter(r => !trim.has(r.source) && !trim.has(r.target));

const myIds = new Set(allNodes.map(n => n.id));
const L1 = new Set([
 "HK.economics","HK.psychology","HK.sociology","HK.anthropology","HK.political_science",
 "HK.law","HK.geography","HK.linguistics","HK.communication","HK.education",
 "HK.criminology","HK.demography","HK.social_work"
]);
const externalL1 = new Set([
 "HK.mathematics","HK.logic","HK.computer_science","HK.statistics","HK.information_science",
 "HK.systems_science","HK.operations_research","HK.data_science","HK.physics","HK.chemistry",
 "HK.biology","HK.earth_science","HK.astronomy","HK.atmospheric_science","HK.oceanography",
 "HK.materials_science","HK.environmental_science","HK.philosophy","HK.history","HK.literature",
 "HK.religious_studies","HK.art_history","HK.archaeology","HK.classics","HK.musicology",
 "HK.film_studies","HK.medicine","HK.engineering","HK.agriculture","HK.forestry","HK.architecture",
 "HK.urban_planning","HK.business","HK.accounting","HK.finance","HK.public_health","HK.nursing",
 "HK.dentistry","HK.pharmacy","HK.veterinary_medicine","HK.journalism","HK.library_science",
 "HK.public_administration","HK.cognitive_science","HK.neuroscience","HK.complexity_science",
 "HK.sustainability_science","HK.gender_studies","HK.area_studies","HK.bioinformatics","HK.digital_humanities"
]);
const validTypes = new Set([
 "UNIVERSE","KNOWLEDGE_FIELD","METHODOLOGY","OCCUPATION","SOCIAL_ROLE","ART_FORM","ART_MOVEMENT",
 "ART_GENRE","ART_TECHNIQUE","SPORT","GAME","INDUSTRY","SECTOR","ECONOMIC_ACTIVITY","PRODUCT",
 "SERVICE","TECHNOLOGY","MATERIAL","ORGANIZATION_TYPE","INSTITUTION","MEDIA_FORM","CONTENT_TYPE","EMERGING_FIELD"
]);
const validRels = new Set([
 "SUBFIELD_OF","SPECIALIZATION_OF","SUBTYPE_OF","SUBFORM_OF","SUBGENRE_OF","SUBSPORT_OF",
 "SUBGAME_OF","SUBINDUSTRY_OF","SUBTECHNOLOGY_OF","PART_OF","METHOD_OF","TECHNIQUE_OF","RELATED_TO",
 "APPLICATION_OF","APPLIES_TO","METHOD_FOR","USED_BY","USES","PRODUCES","CONSUMES","OVERLAPS_WITH",
 "INTERSECTS_WITH","HISTORICAL_PREDECESSOR","HISTORICAL_SUCCESSOR","PRECURSOR_OF","SUCCESSOR_OF",
 "ROLE_IN","SECTOR_OF","TECHNOLOGY_OF","MARKET_OF","MATERIAL_OF"
]);

const errors = [];
const seen = new Set();
for (const n of allNodes) {
  if (seen.has(n.id)) errors.push("DUPLICATE id " + n.id);
  seen.add(n.id);
}
for (const n of allNodes) {
  if (!myIds.has(n.parent) && !L1.has(n.parent)) errors.push("MISSING parent " + n.parent + " for " + n.id);
}
for (const n of allNodes) {
  if (!validTypes.has(n.type)) errors.push("BAD TYPE " + n.type + " on " + n.id);
}
for (const r of allRels) {
  if (!validRels.has(r.relation)) errors.push("BAD REL " + r.relation + " " + JSON.stringify(r));
  const sOk = myIds.has(r.source) || L1.has(r.source);
  const tOk = myIds.has(r.target) || L1.has(r.target) || externalL1.has(r.target);
  if (!sOk) errors.push("BAD REL source " + r.source);
  if (!tOk) errors.push("BAD REL target " + r.target);
  if (r.source === r.target) errors.push("SELF REL " + r.source);
}
for (const r of allRels) {
  const isParentEdge = allNodes.some(n => n.parent === r.source && n.id === r.target);
  if (isParentEdge) errors.push("PARENT EDGE AS REL " + r.source + " -> " + r.target);
}

const maxSeg = Math.max(...allNodes.map(n => n.id.split(".").length));
const l2 = allNodes.filter(n => L1.has(n.parent)).map(n => n.id).sort();
const typeCounts = {};
for (const n of allNodes) typeCounts[n.type] = (typeCounts[n.type]||0)+1;

if (errors.length) {
  console.log(JSON.stringify({ status: "ERRORS", count: errors.length, errors: errors.slice(0,100) }));
  process.exit(0);
}

fs.writeFileSync(base + "nodes/hk_social.json", JSON.stringify(allNodes));
fs.writeFileSync(base + "relations/hk_social.json", JSON.stringify(allRels));

for (let i = 1; i <= 6; i++) fs.unlinkSync(base + "_p" + i + ".json");

console.log(JSON.stringify({
  status: "OK", nodes: allNodes.length, rels: allRels.length, maxSeg,
  l2Count: l2.length, topLevelChildren: l2, typeCounts
}));