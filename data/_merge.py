import json, io, sys

base = "/Users/faputa/Documents/Entro-Cycles/Statistic/data/"
nodes = []
for f in ["_tmp_a.json","_tmp_b.json","_tmp_c.json"]:
    nodes += json.load(open(base+f))

nodes += [
 {"id":"ind.agriculture.crop_farming.chinampa","name":"Chinampa Agriculture","type":"ECONOMIC_ACTIVITY","parent":"ind.agriculture.crop_farming","description":"Aztec floating-garden wetland agriculture of the Valley of Mexico.","name_zh":"奇南帕","historical":True,"global":False},
 {"id":"ind.agriculture.crop_farming.terrace_farming","name":"Terraced Farming","type":"ECONOMIC_ACTIVITY","parent":"ind.agriculture.crop_farming","description":"Step-terraced hillside cultivation practiced in the Andes, Himalaya and Southeast Asia.","name_zh":"梯田农业","global":False},
]

ids = set(n["id"] for n in nodes)
hk = {"HK.mathematics","HK.logic","HK.computer_science","HK.statistics","HK.information_science","HK.systems_science","HK.operations_research","HK.data_science","HK.physics","HK.chemistry","HK.biology","HK.earth_science","HK.astronomy","HK.atmospheric_science","HK.oceanography","HK.materials_science","HK.environmental_science","HK.economics","HK.psychology","HK.sociology","HK.anthropology","HK.political_science","HK.law","HK.geography","HK.linguistics","HK.communication","HK.education","HK.criminology","HK.demography","HK.social_work","HK.philosophy","HK.history","HK.literature","HK.religious_studies","HK.art_history","HK.archaeology","HK.classics","HK.musicology","HK.film_studies","HK.medicine","HK.engineering","HK.agriculture","HK.forestry","HK.architecture","HK.urban_planning","HK.business","HK.accounting","HK.finance","HK.public_health","HK.nursing","HK.dentistry","HK.pharmacy","HK.veterinary_medicine","HK.journalism","HK.library_science","HK.public_administration","HK.cognitive_science","HK.neuroscience","HK.complexity_science","HK.sustainability_science","HK.gender_studies","HK.area_studies","HK.bioinformatics","HK.digital_humanities"}

# validation
dupes = sorted({n["id"] for n in nodes if sum(1 for x in nodes if x["id"]==n["id"])>1})
missing_parents = [n["id"]+" -> "+n["parent"] for n in nodes if n["parent"]!="INDUSTRIES" and n["parent"] not in ids]

rels = []
def R(s,r,t): rels.append({"source":s,"relation":r,"target":t})

HK_LINKS = [
["ind.agriculture","HK.agriculture"],["ind.forestry","HK.forestry"],["ind.mining","HK.earth_science"],["ind.oil_gas","HK.earth_science"],
["ind.energy.electricity_generation.nuclear","HK.physics"],["ind.energy.electricity_generation.solar","HK.physics"],["ind.construction","HK.engineering"],
["ind.manufacturing.chemicals","HK.chemistry"],["ind.manufacturing.materials","HK.materials_science"],["ind.manufacturing.metals","HK.materials_science"],
["ind.manufacturing.semiconductors","HK.physics"],["ind.manufacturing.semiconductors","HK.materials_science"],["ind.manufacturing.semiconductors.design.eda","HK.computer_science"],
["ind.manufacturing.electronics","HK.physics"],["ind.manufacturing.medical_devices","HK.engineering"],
["ind.life_sciences_healthcare.biotech","HK.biology"],["ind.life_sciences_healthcare.pharma","HK.chemistry"],["ind.life_sciences_healthcare.healthcare_services","HK.medicine"],
["ind.life_sciences_healthcare.traditional_medicine.tcm","HK.medicine"],["ind.life_sciences_healthcare.veterinary","HK.veterinary_medicine"],
["ind.information_technology.ai","HK.computer_science"],["ind.information_technology.ai","HK.statistics"],["ind.information_technology.software","HK.computer_science"],
["ind.information_technology.data_analytics","HK.data_science"],["ind.information_technology.internet","HK.information_science"],
["ind.financial_services","HK.finance"],["ind.financial_services.capital_markets","HK.economics"],
["ind.professional_services.accounting","HK.accounting"],["ind.professional_services.legal","HK.law"],["ind.professional_services.market_research","HK.statistics"],
["ind.professional_services.engineering_services","HK.engineering"],["ind.professional_services.architecture","HK.architecture"],
["ind.education","HK.education"],["ind.media_entertainment.news","HK.journalism"],["ind.transport_logistics.logistics","HK.operations_research"],
["ind.hospitality_tourism.tourism","HK.geography"],["ind.utilities","HK.environmental_science"],["ind.defense_space.space","HK.astronomy"],
]
for s,t in HK_LINKS: R(s,"APPLICATION_OF",t)

OWN = [
("ind.energy.electricity_generation.coal_power","CONSUMES","ind.mining.coal"),
("ind.energy.electricity_generation.gas_power","CONSUMES","ind.oil_gas"),
("ind.energy.electricity_generation.nuclear","CONSUMES","ind.mining.metal_ore.uranium"),
("ind.energy.electricity_generation.bioenergy.biomass","CONSUMES","ind.manufacturing.wood_paper.wood_pellets"),
("ind.manufacturing.metals.steel","CONSUMES","ind.mining.metal_ore.iron"),
("ind.manufacturing.metals.aluminium","CONSUMES","ind.mining.metal_ore.aluminium"),
("ind.manufacturing.metals.copper_refining","CONSUMES","ind.mining.metal_ore.copper"),
("ind.manufacturing.materials.cement","CONSUMES","ind.mining.nonmetal.limestone"),
("ind.construction","CONSUMES","ind.manufacturing.materials.concrete_products"),
("ind.manufacturing.chemicals.petrochemicals","CONSUMES","ind.oil_gas"),
("ind.manufacturing.automotive.parts.tires","CONSUMES","ind.manufacturing.chemicals.synthetic_rubber"),
("ind.manufacturing.electronics.batteries","CONSUMES","ind.mining.metal_ore.lithium"),
("ind.information_technology.internet.data_centers","CONSUMES","ind.energy"),
("ind.manufacturing.food","CONSUMES","ind.agriculture"),
("ind.manufacturing.food.meat_processing","USES","ind.agriculture.livestock"),
("ind.manufacturing.food.dairy_products","USES","ind.agriculture.livestock.dairy"),
("ind.manufacturing.food.beverages.brewery","USES","ind.agriculture.crop_farming.cereals"),
("ind.manufacturing.food.beverages.winery","CONSUMES","ind.agriculture.horticulture.viticulture"),
("ind.manufacturing.food.sugar_refining","USES","ind.agriculture.crop_farming.sugar_crops"),
("ind.manufacturing.food.coffee_tea_processing","USES","ind.agriculture.plantation_crops"),
("ind.manufacturing.textiles","CONSUMES","ind.agriculture.crop_farming.fiber_crops"),
("ind.manufacturing.textiles.silk_weaving","USES","ind.agriculture.sericulture"),
("ind.manufacturing.wood_paper","CONSUMES","ind.forestry"),
("ind.manufacturing.wood_paper.pulp","USES","ind.forestry.pulpwood"),
("ind.agriculture","USES","ind.manufacturing.chemicals.agrochemicals"),
("ind.agriculture.agritech.precision_agriculture","USES","ind.defense_space.space.earth_observation"),
("ind.agriculture.livestock.apiculture","USED_BY","ind.agriculture.horticulture"),
("ind.life_sciences_healthcare.biotech.ag_biotech","USED_BY","ind.agriculture.seed_industry"),
("ind.manufacturing.machinery.agricultural_machinery","USED_BY","ind.agriculture"),
("ind.manufacturing.machinery.construction_machinery","USED_BY","ind.construction"),
("ind.manufacturing.machinery.mining_machinery","USED_BY","ind.mining"),
("ind.life_sciences_healthcare.pharma","USES","ind.manufacturing.chemicals.fine_chemicals"),
("ind.life_sciences_healthcare.biotech.genomics","USED_BY","ind.life_sciences_healthcare.pharma.drug_discovery"),
("ind.manufacturing.semiconductors.equipment","USED_BY","ind.manufacturing.semiconductors.fabrication"),
("ind.manufacturing.semiconductors.materials","USED_BY","ind.manufacturing.semiconductors.fabrication"),
("ind.manufacturing.semiconductors.process_technologies","USED_BY","ind.manufacturing.semiconductors.fabrication"),
("ind.manufacturing.semiconductors.design.eda","USED_BY","ind.manufacturing.semiconductors.design.fabless"),
("ind.manufacturing.semiconductors.materials.silicon_wafers","MATERIAL_OF","ind.manufacturing.semiconductors.fabrication"),
("ind.manufacturing.semiconductors.materials.photoresist","MATERIAL_OF","ind.manufacturing.semiconductors.process_technologies.lithography"),
("ind.manufacturing.semiconductors.process_technologies.lithography","TECHNOLOGY_OF","ind.manufacturing.semiconductors.fabrication"),
("ind.manufacturing.semiconductors.process_technologies.etching","TECHNOLOGY_OF","ind.manufacturing.semiconductors.fabrication"),
("ind.manufacturing.semiconductors.process_technologies.deposition","TECHNOLOGY_OF","ind.manufacturing.semiconductors.fabrication"),
("ind.manufacturing.semiconductors.distribution","USED_BY","ind.manufacturing.electronics"),
("ind.manufacturing.electronics","USES","ind.manufacturing.semiconductors"),
("ind.manufacturing.electronics.components.pcb","USES","ind.manufacturing.semiconductors"),
("ind.manufacturing.electronics.display_panels","USED_BY","ind.manufacturing.electronics.consumer_electronics.televisions"),
("ind.manufacturing.semiconductors.device_segments.memory.nand","USED_BY","ind.manufacturing.electronics.computer_hardware.servers"),
("ind.manufacturing.semiconductors.device_segments.logic","USED_BY","ind.manufacturing.electronics.computer_hardware"),
("ind.manufacturing.semiconductors.device_segments.mems","USED_BY","ind.manufacturing.automotive"),
("ind.information_technology.ai","USES","ind.manufacturing.semiconductors"),
("ind.information_technology.telecom","USES","ind.manufacturing.electronics.telecom_equipment"),
("ind.information_technology.internet.cloud","USES","ind.information_technology.internet.data_centers"),
("ind.information_technology.telecom.satellite_comms","USES","ind.defense_space.space.satellite_operations"),
("ind.manufacturing.automotive.parts","USES","ind.manufacturing.semiconductors"),
("ind.manufacturing.automotive.autonomous","USES","ind.information_technology.ai"),
("ind.energy.energy_storage.battery","USES","ind.manufacturing.electronics.batteries"),
("ind.energy.hydrogen.green_hydrogen","USES","ind.energy.electricity_generation.solar"),
("ind.manufacturing.electronics.power_electronics","USED_BY","ind.energy.electricity_generation.solar"),
("ind.manufacturing.medical_devices","USED_BY","ind.life_sciences_healthcare.healthcare_services"),
("ind.manufacturing.materials.advanced_materials.composites","MATERIAL_OF","ind.manufacturing.aerospace"),
("ind.manufacturing.aerospace","USES","ind.manufacturing.materials.advanced_materials.composites"),
("ind.manufacturing.shipbuilding","USES","ind.manufacturing.metals.steel"),
("ind.manufacturing.machinery","USES","ind.manufacturing.metals.steel"),
("ind.manufacturing.semiconductors","OVERLAPS_WITH","ind.manufacturing.electronics"),
("ind.manufacturing.medical_devices","SECTOR_OF","ind.life_sciences_healthcare"),
("ind.life_sciences_healthcare.pharma","OVERLAPS_WITH","ind.life_sciences_healthcare.biotech"),
("ind.manufacturing.chemicals","OVERLAPS_WITH","ind.life_sciences_healthcare.pharma"),
("ind.manufacturing.electronics.batteries","OVERLAPS_WITH","ind.manufacturing.automotive.ev.batteries"),
("ind.manufacturing.automotive.ev.batteries","OVERLAPS_WITH","ind.energy.energy_storage.battery"),
("ind.information_technology.internet.ecommerce_platforms","OVERLAPS_WITH","ind.retail_trade.ecommerce"),
("ind.manufacturing.aerospace.uav","OVERLAPS_WITH","ind.information_technology.robotics"),
("ind.manufacturing.aerospace","OVERLAPS_WITH","ind.defense_space.defense.aerospace_defense"),
("ind.manufacturing.shipbuilding.naval","OVERLAPS_WITH","ind.defense_space.defense.naval"),
("ind.defense_space.space.satellite_manufacturing","OVERLAPS_WITH","ind.manufacturing.aerospace"),
("ind.utilities.power_grid","RELATED_TO","ind.energy.electricity_generation"),
("ind.oil_gas.midstream.pipelines","OVERLAPS_WITH","ind.transport_logistics.pipeline"),
("ind.real_estate.investment","RELATED_TO","ind.financial_services.asset_management"),
("ind.financial_services.insurance.health","RELATED_TO","ind.life_sciences_healthcare.healthcare_services"),
("ind.hospitality_tourism.tourism.medical_tourism","OVERLAPS_WITH","ind.life_sciences_healthcare.healthcare_services"),
("ind.manufacturing.rail","OVERLAPS_WITH","ind.transport_logistics.rail"),
("ind.manufacturing.automotive.vehicles","RELATED_TO","ind.transport_logistics.road"),
("ind.manufacturing.aerospace.commercial_aircraft","RELATED_TO","ind.transport_logistics.aviation"),
("ind.manufacturing.shipbuilding.cargo_ships","RELATED_TO","ind.transport_logistics.maritime"),
("ind.energy.electricity_generation.wind.offshore","OVERLAPS_WITH","ind.manufacturing.shipbuilding.offshore_structures"),
("ind.financial_services.fintech","OVERLAPS_WITH","ind.information_technology"),
("ind.media_entertainment.gaming","OVERLAPS_WITH","ind.information_technology.software"),
("ind.media_entertainment.advertising","OVERLAPS_WITH","ind.information_technology.internet"),
("ind.media_entertainment.gambling","OVERLAPS_WITH","ind.hospitality_tourism.casinos"),
("ind.retail_trade.ecommerce.livestream","RELATED_TO","ind.media_entertainment.creator_economy"),
("ind.manufacturing.food","OVERLAPS_WITH","ind.hospitality_tourism.food_service"),
("ind.information_technology.ai","OVERLAPS_WITH","ind.life_sciences_healthcare.digital_health"),
("ind.information_technology.robotics","INTERSECTS_WITH","ind.information_technology.ai"),
("ind.information_technology.software.cybersecurity","INTERSECTS_WITH","ind.defense_space.defense.cyber_defense"),
("ind.life_sciences_healthcare.digital_health","INTERSECTS_WITH","ind.information_technology"),
("ind.financial_services.fintech","INTERSECTS_WITH","ind.information_technology"),
("ind.information_technology.telecom.telegraph","HISTORICAL_SUCCESSOR","ind.information_technology.telecom.fixed_line"),
("ind.utilities.town_gas","HISTORICAL_SUCCESSOR","ind.utilities.gas_distribution"),
("ind.manufacturing.chemicals.photographic_film","HISTORICAL_SUCCESSOR","ind.manufacturing.electronics.consumer_electronics"),
("ind.fishing.capture.whaling","HISTORICAL_SUCCESSOR","ind.oil_gas"),
("ind.agriculture.crop_farming.chinampa","HISTORICAL_SUCCESSOR","ind.agriculture.horticulture"),
("ind.energy.electricity_generation.nuclear.smr","SUCCESSOR_OF","ind.energy.electricity_generation.nuclear.fission"),
("ind.energy.electricity_generation.nuclear.fusion","SUCCESSOR_OF","ind.energy.electricity_generation.nuclear.fission"),
("ind.manufacturing.automotive.ev","SUCCESSOR_OF","ind.manufacturing.automotive.vehicles"),
]
for s,r,t in OWN: R(s,r,t)

allowed_rel = {"SUBFIELD_OF","SPECIALIZATION_OF","SUBTYPE_OF","SUBFORM_OF","SUBGENRE_OF","SUBSPORT_OF","SUBGAME_OF","SUBINDUSTRY_OF","SUBTECHNOLOGY_OF","PART_OF","METHOD_OF","TECHNIQUE_OF","RELATED_TO","APPLICATION_OF","APPLIES_TO","METHOD_FOR","USED_BY","USES","PRODUCES","CONSUMES","OVERLAPS_WITH","INTERSECTS_WITH","HISTORICAL_PREDECESSOR","HISTORICAL_SUCCESSOR","PRECURSOR_OF","SUCCESSOR_OF","ROLE_IN","SECTOR_OF","TECHNOLOGY_OF","MARKET_OF","MATERIAL_OF"}
bad_rel_types = sorted({r["relation"] for r in rels if r["relation"] not in allowed_rel})
missing_endpoints = [f"{r['source']} -{r['relation']}-> {r['target']}" for r in rels if r["source"] not in ids and r["source"] not in hk or r["target"] not in ids and r["target"] not in hk]
parent = {n["id"]: n["parent"] for n in nodes}
parent_dup = [f"{r['source']}-{r['relation']}-{r['target']}" for r in rels if parent.get(r["source"])==r["target"] or parent.get(r["target"])==r["source"]]

deepest = max(len(n["id"].split(".")) for n in nodes)
top = [n["id"] for n in nodes if n["parent"]=="INDUSTRIES"]

json.dump(nodes, open(base+"nodes/ind.json","w"), indent=1, ensure_ascii=False)
json.dump(rels, open(base+"relations/ind.json","w"), indent=1, ensure_ascii=False)

print("NODES", len(nodes), "RELS", len(rels), "TOP", len(top), "DEEPEST", deepest)
print("dupes", dupes, "missing_parents", len(missing_parents), "bad_rel_types", bad_rel_types, "missing_endpoints", len(missing_endpoints), "parent_dup", len(parent_dup))
if missing_endpoints: print("ENDPOINTS", missing_endpoints)
if parent_dup: print("PARENTDUP", parent_dup)
print("SUMMARY", json.dumps({"file":"ind.json","nodesWritten":len(nodes),"relationsWritten":len(rels),"topLevelChildren":top,"deepestLevel":deepest,"notableCrossLinks":len(rels),"gaps":"pharma/biotech canonical under life-sciences (cross-linked from chemicals); medical devices canonical under manufacturing (cross-linked to healthcare); robotics canonical under ICT"}, ensure_ascii=False))
