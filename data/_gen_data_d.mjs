import { o } from './_gen_lib.mjs';

// ---------- TRANSPORTATION & LOGISTICS ----------
const transport = o('Transportation and Logistics', { s: 'transport', z: '交通与物流', d: 'Occupations moving people and goods by land, sea and air.' },
  o('Aviation', { z: '航空', d: 'Occupations operating and supporting aircraft.' },
    o('Airline Pilot', { a: ['Commercial Pilot'], d: 'Flies commercial passenger aircraft.' },
      o('Cargo Pilot', { d: 'Flies freight aircraft.' }),
      o('Corporate Pilot', { d: 'Flies private business aircraft.' })
    ),
    o('Flight Attendant', { d: 'Ensures passenger safety and service aboard aircraft.' }),
    o('Air Traffic Controller', { d: 'Directs aircraft movement to prevent collisions.' }),
    o('Aircraft Mechanic', { a: ['Aviation Maintenance Technician'], d: 'Inspects and repairs aircraft.' },
      o('Avionics Technician', { d: 'Maintains aircraft electronic systems.' })
    ),
    o('Ground Crew Agent', { a: ['Ramp Agent'], d: 'Handles aircraft loading and ground services.' })
  ),
  o('Maritime', { z: '航运', d: 'Occupations operating and crewing ships.' },
    o('Ship Captain', { a: ['Master Mariner'], d: 'Commands a ship and is responsible for it.' },
      o('Harbor Pilot', { d: 'Navigates ships through harbors and confined waters.' })
    ),
    o('Deck Officer', { a: ['Chief Mate'], d: 'Manages deck operations and navigation watches.' }),
    o('Ship Engineer', { d: 'Operates and maintains a ship machinery.' }),
    o('Deckhand', { d: 'Performs general duties aboard a vessel.' }),
    o('Longshoreman', { a: ['Dockworker'], d: 'Loads and unloads cargo at ports.' })
  ),
  o('Rail', { z: '铁路', d: 'Occupations operating and maintaining railways.' },
    o('Train Driver', { a: ['Locomotive Engineer'], d: 'Operates locomotives and trains.' }),
    o('Train Conductor', { d: 'Manages train operations and passenger safety.' }),
    o('Rail Signal Technician', { d: 'Maintains railway signaling and control systems.' }),
    o('Station Master', { d: 'Manages a railway station and its operations.' })
  ),
  o('Road and Passenger Transport', { s: 'road_transport', d: 'Occupations driving and operating road vehicles.' },
    o('Truck Driver', { z: '卡车司机', d: 'Drives trucks to transport goods.' },
      o('Long Haul Truck Driver', { d: 'Drives long-distance freight routes.' })
    ),
    o('Delivery Driver', { d: 'Delivers packages and goods to customers.' },
      o('Courier', { d: 'Delivers documents and small parcels.' })
    ),
    o('Bus Driver', { d: 'Drives buses for public or private transit.' },
      o('School Bus Driver', { d: 'Transports students to and from school.' })
    ),
    o('Taxi Driver', { a: ['Rideshare Driver'], d: 'Drives passengers for hire.' }),
    o('Chauffeur', { d: 'Drives private clients in luxury vehicles.' })
  ),
  o('Logistics and Warehousing', { s: 'logistics', d: 'Occupations managing the movement and storage of goods.' },
    o('Logistics Manager', { d: 'Plans and coordinates the movement of goods.' }),
    o('Warehouse Worker', { d: 'Handles goods in warehouses.' },
      o('Forklift Operator', { d: 'Operates forklifts to move materials.' })
    ),
    o('Freight Forwarder', { d: 'Arranges the shipment of goods across transport modes.' }),
    o('Customs Broker', { d: 'Facilitates customs clearance of imports and exports.' }),
    o('Dispatcher', { d: 'Schedules and coordinates vehicles and drivers.' }),
    o('Inventory Clerk', { d: 'Tracks and manages stock levels.' })
  ),
  o('Postal and Delivery Services', { s: 'postal', d: 'Occupations delivering mail and parcels.' },
    o('Mail Carrier', { a: ['Postal Worker'], d: 'Delivers mail on assigned routes.' }),
    o('Postal Clerk', { d: 'Processes mail and serves customers at post offices.' })
  ),
  o('Vehicle Maintenance', { s: 'vehicle_maintenance', d: 'Occupations repairing and maintaining vehicles.' },
    o('Automotive Mechanic', { a: ['Auto Service Technician'], d: 'Diagnoses and repairs cars and light trucks.' },
      o('Auto Body Repairer', { d: 'Repairs vehicle bodies and collision damage.' }),
      o('Tire Technician', { d: 'Mounts, balances and repairs tires.' })
    ),
    o('Diesel Mechanic', { d: 'Repairs diesel engines in trucks and heavy equipment.' })
  )
);

// ---------- AGRICULTURE & NATURAL RESOURCES ----------
const agriculture = o('Agriculture and Natural Resources', { s: 'agriculture', z: '农业与自然资源', d: 'Occupations producing food, fiber and managing natural resources.' },
  o('Crop Production and Horticulture', { s: 'crop_production', d: 'Occupations growing and cultivating plants.' },
    o('Farmer', { z: '农民', d: 'Cultivates crops and manages farm operations.' },
      o('Crop Farmer', { d: 'Grows field crops such as grain and vegetables.' }),
      o('Organic Farmer', { d: 'Farms without synthetic chemicals.' }),
      o('Rice Farmer', { g: false, d: 'Cultivates rice, especially in wet-field systems.' })
    ),
    o('Horticulturist', { d: 'Cultivates fruits, vegetables, flowers and ornamental plants.' },
      o('Viticulturist', { d: 'Cultivates grapevines for wine production.' }),
      o('Floriculturist', { d: 'Cultivates flowering plants.' })
    ),
    o('Agronomist', { d: 'Applies science to improve crop production and soil management.' }),
    o('Agricultural Scientist', { d: 'Conducts research to improve farming and food production.' }),
    o('Plant Breeder', { d: 'Develops new crop varieties through breeding.' }),
    o('Arborist', { d: 'Cares for and maintains individual trees.' }),
    o('Gardener', { d: 'Cultivates and maintains gardens.' },
      o('Landscape Gardener', { d: 'Designs and maintains garden landscapes.' })
    ),
    o('Groundskeeper', { d: 'Maintains grounds such as parks, golf courses and campuses.' })
  ),
  o('Livestock and Animal Husbandry', { s: 'livestock', d: 'Occupations raising animals for food and products.' },
    o('Rancher', { a: ['Cattle Rancher'], d: 'Raises cattle on grazing land.' }),
    o('Dairy Farmer', { d: 'Raises cows and produces milk.' }),
    o('Poultry Farmer', { d: 'Raises chickens and other poultry.' }),
    o('Shepherd', { d: 'Tends sheep and flocks.' }),
    o('Beekeeper', { a: ['Apiarist'], d: 'Keeps bees for honey and pollination.' }),
    o('Fish Farmer', { a: ['Aquaculturist'], d: 'Raises fish and shellfish in controlled environments.' }),
    o('Reindeer Herder', { g: false, d: 'Herd reindeer in Arctic and subarctic regions.' }),
    o('Farrier', { d: 'Shoes horses and cares for their hooves.' })
  ),
  o('Forestry', { z: '林业', d: 'Occupations managing and harvesting forests.' },
    o('Forester', { d: 'Manages forests for timber, conservation and recreation.' },
      o('Silviculturist', { d: 'Cultivates and regenerates forests.' })
    ),
    o('Logger', { a: ['Lumberjack'], d: 'Fells and harvests timber.' }),
    o('Forest Ranger', { d: 'Protects forests and assists visitors.' })
  ),
  o('Fishing and Aquaculture', { s: 'fishing', d: 'Occupations harvesting fish and seafood.' },
    o('Commercial Fisher', { d: 'Catches fish and seafood commercially.' },
      o('Trawler Crew Member', { d: 'Works aboard fishing trawlers.' })
    ),
    o('Aquaculture Worker', { d: 'Raises aquatic organisms in farms and hatcheries.' })
  ),
  o('Natural Resource Management', { s: 'natural_resources', d: 'Occupations protecting and managing natural resources.' },
    o('Conservation Officer', { d: 'Enforces wildlife and conservation laws.' }),
    o('Wildlife Manager', { d: 'Manages wildlife populations and habitats.' }),
    o('Fisheries Officer', { d: 'Monitors and enforces fishing regulations.' })
  ),
  o('Agricultural Services', { s: 'ag_services', d: 'Occupations supporting farm operations and production.' },
    o('Farm Manager', { d: 'Oversees the operations of a farm.' }),
    o('Agricultural Extension Officer', { d: 'Advises farmers on practices and technology.' }),
    o('Agricultural Equipment Operator', { d: 'Operates tractors and farm machinery.' }),
    o('Winemaker', { a: ['Enologist'], d: 'Makes wine from grapes.' }),
    o('Irrigation Technician', { d: 'Installs and maintains irrigation systems.' })
  )
);

// ---------- MINING & ENERGY ----------
const mining = o('Mining and Energy', { s: 'mining_energy', z: '采矿与能源', d: 'Occupations extracting resources and producing energy.' },
  o('Mining', { z: '采矿', d: 'Occupations extracting minerals and ores from the ground.' },
    o('Miner', { z: '矿工', d: 'Works underground or at the surface to extract minerals.' },
      o('Coal Miner', { d: 'Extracts coal from underground or surface mines.' }),
      o('Hard Rock Miner', { d: 'Extracts metal ores from underground mines.' })
    ),
    o('Surface Miner', { d: 'Works in open-pit and surface mining operations.' }),
    o('Quarry Worker', { d: 'Extracts stone and aggregates from quarries.' }),
    o('Mining Driller', { d: 'Drills blast holes and exploration boreholes.' }),
    o('Blaster', { a: ['Shot Firer'], d: 'Handles explosives for blasting rock.' }),
    o('Mine Safety Inspector', { d: 'Inspects mines for safety and compliance.' })
  ),
  o('Oil and Gas Extraction', { s: 'oil_gas', d: 'Occupations extracting petroleum and natural gas.' },
    o('Oil Rig Worker', { a: ['Roughneck'], d: 'Works on drilling rigs to extract oil and gas.' },
      o('Roustabout', { d: 'Performs general labor on oil rigs.' }),
      o('Oil Driller', { d: 'Operates the drilling equipment on oil rigs.' })
    ),
    o('Gas Plant Operator', { d: 'Operates plants that process natural gas.' }),
    o('Pipeline Technician', { d: 'Maintains oil and gas pipelines.' })
  ),
  o('Energy Production and Utilities', { s: 'energy_production', d: 'Occupations generating and distributing power.' },
    o('Power Plant Operator', { d: 'Operates equipment that generates electricity.' },
      o('Control Room Operator', { d: 'Monitors and controls plant systems from a control room.' })
    ),
    o('Wind Turbine Technician', { d: 'Installs and maintains wind turbines.' }),
    o('Geothermal Technician', { d: 'Maintains geothermal power systems.' }),
    o('Substation Technician', { d: 'Maintains electrical substations.' })
  )
);

// ---------- RETAIL & SALES ----------
const retail = o('Retail and Sales', { s: 'retail', z: '零售与销售', d: 'Occupations selling goods and services to customers.' },
  o('Retail Operations', { z: '零售运营', d: 'Occupations running stores and serving shoppers.' },
    o('Retail Salesperson', { a: ['Sales Associate'], d: 'Assists customers and sells goods in stores.' }),
    o('Cashier', { d: 'Processes customer purchases and payments.' }),
    o('Retail Store Manager', { d: 'Manages a retail store and its staff.' },
      o('Department Manager', { d: 'Manages a department within a store.' })
    ),
    o('Visual Merchandiser', { d: 'Designs store displays to attract customers.' }),
    o('Retail Buyer', { d: 'Selects and purchases merchandise for stores.' }),
    o('Stock Clerk', { d: 'Stocks shelves and manages store inventory.' })
  ),
  o('Professional Sales', { s: 'sales', d: 'Occupations selling to businesses and specialized clients.' },
    o('Sales Representative', { d: 'Sells products or services to customers.' },
      o('Wholesale Sales Representative', { d: 'Sells goods to retailers and businesses.' }),
      o('Inside Sales Representative', { d: 'Sells remotely by phone and online.' }),
      o('Field Sales Representative', { d: 'Sells in person by visiting clients.' })
    ),
    o('Sales Consultant', { d: 'Advises customers and sells complex products.' }),
    o('Telemarketer', { d: 'Sells products by phone.' }),
    o('Insurance Agent', { d: 'Sells insurance policies.' }),
    o('Pharmaceutical Sales Representative', { d: 'Promotes and sells medications to healthcare providers.' })
  ),
  o('Specialty Retail', { s: 'specialty_retail', d: 'Occupations in niche retail and trade.' },
    o('Florist', { d: 'Arranges and sells flowers.' }),
    o('Auctioneer', { d: 'Conducts auctions and sells goods to bidders.' }),
    o('Pawnbroker', { d: 'Lends money against and sells pledged goods.' }),
    o('E-commerce Merchant', { d: 'Sells goods through online marketplaces and stores.' })
  )
);

// ---------- HOSPITALITY & FOOD SERVICE ----------
const hospitality = o('Hospitality and Food Service', { s: 'hospitality', z: '酒店与餐饮', d: 'Occupations preparing food and serving guests.' },
  o('Food Preparation', { z: '食品制作', d: 'Occupations preparing food in kitchens.' },
    o('Chef', { z: '厨师', d: 'Leads kitchen operations and prepares food.' },
      o('Sous Chef', { d: 'Second-in-command in a professional kitchen.' }),
      o('Pastry Chef', { d: 'Specializes in desserts and baked goods.' }),
      o('Line Cook', { d: 'Prepares dishes at a specific kitchen station.' })
    ),
    o('Cook', { d: 'Prepares meals in restaurants and institutions.' },
      o('Short Order Cook', { d: 'Quickly prepares simple dishes to order.' })
    ),
    o('Baker', { z: '面包师', d: 'Bakes bread and baked goods.' },
      o('Pastry Baker', { d: 'Prepares pastries and desserts.' })
    ),
    o('Butcher', { d: 'Cuts and prepares meat for sale.' }),
    o('Food Preparation Worker', { d: 'Assists with basic food preparation tasks.' })
  ),
  o('Restaurant and Bar Service', { s: 'restaurant_service', d: 'Occupations serving food and drinks to customers.' },
    o('Server', { a: ['Waiter', 'Waitress'], z: '服务员', d: 'Takes orders and serves food to guests.' }),
    o('Bartender', { z: '调酒师', d: 'Prepares and serves alcoholic drinks.' },
      o('Barista', { d: 'Prepares coffee and espresso drinks.' })
    ),
    o('Sommelier', { d: 'Curates wine lists and advises on wine pairing.' }),
    o('Host', { a: ['Hostess'], d: 'Greets guests and manages seating.' })
  ),
  o('Lodging and Tourism', { s: 'lodging', z: '住宿与旅游', d: 'Occupations serving hotel guests and travelers.' },
    o('Hotel Manager', { d: 'Oversees hotel operations and guest experience.' },
      o('Front Desk Agent', { d: 'Checks guests in and out and assists them.' }),
      o('Concierge', { d: 'Assists guests with services and recommendations.' }),
      o('Housekeeper', { d: 'Cleans and maintains hotel rooms.' })
    ),
    o('Bellhop', { a: ['Porter'], d: 'Carries luggage and assists hotel guests.' }),
    o('Tour Guide', { d: 'Leads and informs visitors on tours.' }),
    o('Travel Agent', { d: 'Plans and books travel for clients.' })
  ),
  o('Catering and Events', { s: 'catering', d: 'Occupations providing food and service for events.' },
    o('Caterer', { d: 'Prepares and serves food for events.' }),
    o('Banquet Manager', { d: 'Manages food service for banquets and functions.' })
  )
);

// ---------- PERSONAL & COMMUNITY SERVICES ----------
const personal = o('Personal and Community Services', { s: 'personal_services', z: '个人与社区服务', d: 'Occupations providing personal care, social services and community support.' },
  o('Personal Care and Grooming', { s: 'grooming', z: '个人护理与美容', d: 'Occupations caring for personal appearance.' },
    o('Barber', { d: 'Cuts and styles hair, primarily for men.' }),
    o('Hairdresser', { a: ['Cosmetologist'], z: '美发师', d: 'Cuts, colors and styles hair.' }),
    o('Manicurist', { a: ['Nail Technician'], d: 'Cares for and decorates fingernails.' }),
    o('Esthetician', { a: ['Skincare Specialist'], d: 'Provides skincare treatments.' }),
    o('Makeup Artist', { d: 'Applies makeup for clients and productions.' })
  ),
  o('Therapeutic and Wellness Services', { s: 'wellness', d: 'Occupations providing therapeutic bodywork and care.' },
    o('Massage Therapist', { d: 'Provides massage for relaxation and therapy.' },
      o('Sports Massage Therapist', { d: 'Provides massage for athletes.' })
    ),
    o('Doula', { d: 'Provides physical and emotional support during childbirth.' })
  ),
  o('Home and Community Care', { s: 'care', d: 'Occupations caring for people in homes and communities.' },
    o('Home Health Aide', { d: 'Helps elderly or disabled people with daily living.' },
      o('Personal Care Aide', { d: 'Assists individuals with personal tasks and companionship.' })
    ),
    o('Caregiver', { d: 'Cares for family members or clients needing assistance.' })
  ),
  o('Social Work and Community Services', { s: 'social_services', z: '社会工作与社区服务', d: 'Occupations supporting individuals and communities.' },
    o('Social Worker', { z: '社会工作者', d: 'Helps people cope with challenges and access services.' },
      o('Clinical Social Worker', { d: 'Provides therapy and mental health support.' }),
      o('Child Welfare Worker', { d: 'Protects children and supports families.' }),
      o('School Social Worker', { d: 'Supports students and families in schools.' })
    ),
    o('Case Manager', { d: 'Coordinates services and care for clients.' }),
    o('Youth Worker', { d: 'Supports and mentors young people.' }),
    o('Community Organizer', { d: 'Mobilizes communities around shared goals.' }),
    o('Volunteer Coordinator', { d: 'Recruits and manages volunteers.' })
  ),
  o('Funeral and Death Care', { s: 'funeral', d: 'Occupations caring for the deceased and bereaved.' },
    o('Funeral Director', { a: ['Mortician'], d: 'Arranges funerals and manages funeral homes.' },
      o('Embalmer', { d: 'Preserves bodies for viewing and burial.' })
    ),
    o('Crematory Operator', { d: 'Operates cremation equipment.' })
  ),
  o('Cleaning and Custodial Services', { s: 'cleaning', d: 'Occupations cleaning and maintaining spaces.' },
    o('Janitor', { a: ['Custodian'], d: 'Cleans and maintains buildings.' }),
    o('House Cleaner', { d: 'Cleans private homes.' })
  ),
  o('Pet and Animal Services', { s: 'pet_services', d: 'Occupations caring for and training animals.' },
    o('Dog Groomer', { d: 'Grooms and bathes dogs.' }),
    o('Dog Trainer', { d: 'Trains dogs in obedience and behavior.' }),
    o('Pet Sitter', { d: 'Cares for pets while owners are away.' }),
    o('Animal Shelter Worker', { d: 'Cares for animals in shelters.' })
  ),
  o('Customer Service and Reception', { s: 'customer_service', d: 'Occupations assisting customers and visitors.' },
    o('Customer Service Representative', { d: 'Helps customers with inquiries and issues.' },
      o('Call Center Agent', { d: 'Handles customer calls in a call center.' })
    ),
    o('Receptionist', { d: 'Greets visitors and handles front-desk duties.' })
  ),
  o('Private Security and Investigation', { s: 'private_security', d: 'Occupations providing private protection and investigation.' },
    o('Security Guard', { d: 'Protects property and people.' }),
    o('Private Investigator', { d: 'Investigates cases for private clients.' }),
    o('Bodyguard', { d: 'Provides close personal protection.' })
  )
);

// ---------- RELIGIOUS & SPIRITUAL ----------
const religious = o('Religious and Spiritual', { s: 'religious', z: '宗教与灵性', d: 'Occupations leading and serving religious and spiritual communities.' },
  o('Clergy and Religious Leadership', { s: 'clergy', z: '神职人员', d: 'Occupations leading religious communities and worship.' },
    o('Priest', { z: '神父', d: 'Leads worship and administers sacraments in Christian churches.' },
      o('Bishop', { d: 'Oversees a diocese and its churches.' }),
      o('Pastor', { a: ['Minister'], z: '牧师', d: 'Leads a Protestant congregation.' }),
      o('Chaplain', { d: 'Provides spiritual care in hospitals, schools and the military.' })
    ),
    o('Rabbi', { d: 'Leads and teaches a Jewish community.' }),
    o('Imam', { d: 'Leads prayers and guides a Muslim community.' }),
    o('Monk', { d: 'Lives a monastic religious life in community.' },
      o('Buddhist Monk', { a: ['Bhikkhu'], z: '僧人', g: false, d: 'Practices Buddhist monastic life.' })
    ),
    o('Nun', { d: 'Lives a consecrated religious life in community.' }),
    o('Shaman', { g: false, d: 'Practices indigenous spiritual healing and mediation.' }),
    o('Lama', { z: '喇嘛', g: false, d: 'A Tibetan Buddhist teacher.' }),
    o('Pujari', { g: false, d: 'Performs rituals and worship in Hindu temples.' }),
    o('Cantor', { g: false, d: 'Leads liturgical singing in Jewish worship.' }),
    o('Muezzin', { g: false, d: 'Calls Muslims to prayer.' }),
    o('Guru', { g: false, d: 'A spiritual teacher in Hindu and Sikh traditions.' })
  ),
  o('Religious Scholarship and Teaching', { s: 'religious_scholarship', d: 'Occupations studying and teaching religion.' },
    o('Theologian', { d: 'Studies religious beliefs and doctrine.' }),
    o('Religious Educator', { d: 'Teaches religious doctrine and practice.' },
      o('Quran Teacher', { g: false, d: 'Teaches recitation and study of the Quran.' })
    ),
    o('Catechist', { d: 'Instructs people in Christian faith.' })
  ),
  o('Religious Support Services', { s: 'religious_support', d: 'Occupations supporting religious institutions.' },
    o('Sexton', { d: 'Cares for a church building and grounds.' }),
    o('Church Musician', { d: 'Provides music for worship services.' })
  )
);

// Historical occupations injected into existing branches (tree-only; linked via relations).
export const extraNodes = [
  { parent: 'OCC.personal_services', node: o('Lamplighter', { h: true, d: 'Lit and maintained street gas lamps.' }) },
  { parent: 'OCC.it_computing', node: o('Switchboard Operator', { h: true, d: 'Connected telephone calls on manual switchboards.' }) },
  { parent: 'OCC.media', node: o('Town Crier', { h: true, d: 'Made public announcements in the streets.' }) },
  { parent: 'OCC.media', node: o('Scribe', { h: true, d: 'Copied and wrote documents by hand.' }) },
  { parent: 'OCC.business', node: o('Typist', { h: true, d: 'Produced documents using a typewriter.' }) },
  { parent: 'OCC.business', node: o('Administrative Assistant', { d: 'Provides clerical and organizational support in offices.' }) }
];

// Cross-links: source = unique node name, target = unique node name OR an HK L1 id.
export const relations = [
  // Occupation applies discipline (APPLICATION_OF -> HK L1)
  ['Physicist', 'APPLICATION_OF', 'HK.physics'],
  ['Chemist', 'APPLICATION_OF', 'HK.chemistry'],
  ['Astronomer', 'APPLICATION_OF', 'HK.astronomy'],
  ['Biologist', 'APPLICATION_OF', 'HK.biology'],
  ['Geologist', 'APPLICATION_OF', 'HK.earth_science'],
  ['Meteorologist', 'APPLICATION_OF', 'HK.atmospheric_science'],
  ['Oceanographer', 'APPLICATION_OF', 'HK.oceanography'],
  ['Materials Scientist', 'APPLICATION_OF', 'HK.materials_science'],
  ['Environmental Scientist', 'APPLICATION_OF', 'HK.environmental_science'],
  ['Economist', 'APPLICATION_OF', 'HK.economics'],
  ['Sociologist', 'APPLICATION_OF', 'HK.sociology'],
  ['Anthropologist', 'APPLICATION_OF', 'HK.anthropology'],
  ['Research Psychologist', 'APPLICATION_OF', 'HK.psychology'],
  ['Political Scientist', 'APPLICATION_OF', 'HK.political_science'],
  ['Geographer', 'APPLICATION_OF', 'HK.geography'],
  ['Linguist', 'APPLICATION_OF', 'HK.linguistics'],
  ['Criminologist', 'APPLICATION_OF', 'HK.criminology'],
  ['Demographer', 'APPLICATION_OF', 'HK.demography'],
  ['Archaeologist', 'APPLICATION_OF', 'HK.archaeology'],
  ['Mathematician', 'APPLICATION_OF', 'HK.mathematics'],
  ['Statistician', 'APPLICATION_OF', 'HK.statistics'],
  ['Operations Research Analyst', 'APPLICATION_OF', 'HK.operations_research'],
  ['Data Scientist', 'APPLICATION_OF', 'HK.data_science'],
  ['Primary Care Physician', 'APPLICATION_OF', 'HK.medicine'],
  ['Registered Nurse', 'APPLICATION_OF', 'HK.nursing'],
  ['General Dentist', 'APPLICATION_OF', 'HK.dentistry'],
  ['Pharmacist', 'APPLICATION_OF', 'HK.pharmacy'],
  ['Veterinarian', 'APPLICATION_OF', 'HK.veterinary_medicine'],
  ['Epidemiologist', 'APPLICATION_OF', 'HK.public_health'],
  ['Lawyer', 'APPLICATION_OF', 'HK.law'],
  ['Accountant', 'APPLICATION_OF', 'HK.accounting'],
  ['Financial Analyst', 'APPLICATION_OF', 'HK.finance'],
  ['Software Engineer', 'APPLICATION_OF', 'HK.computer_science'],
  ['Professor', 'APPLICATION_OF', 'HK.education'],
  ['Urban Planner', 'APPLICATION_OF', 'HK.urban_planning'],
  ['Social Worker', 'APPLICATION_OF', 'HK.social_work'],
  ['Journalist', 'APPLICATION_OF', 'HK.journalism'],
  ['Librarian', 'APPLICATION_OF', 'HK.library_science'],
  ['Civil Servant', 'APPLICATION_OF', 'HK.public_administration'],
  ['Neuroscientist', 'APPLICATION_OF', 'HK.neuroscience'],
  ['Bioinformatician', 'APPLICATION_OF', 'HK.bioinformatics'],
  ['Actuary', 'USES', 'HK.mathematics'],
  ['Quantitative Analyst', 'USES', 'HK.statistics'],
  // Overlaps between related occupations
  ['Data Scientist', 'OVERLAPS_WITH', 'Statistician'],
  ['Machine Learning Engineer', 'OVERLAPS_WITH', 'Software Engineer'],
  ['Biostatistician', 'OVERLAPS_WITH', 'Epidemiologist'],
  ['Biochemist', 'OVERLAPS_WITH', 'Biomedical Scientist'],
  ['Clinical Psychologist', 'OVERLAPS_WITH', 'Psychiatrist'],
  ['Nurse Practitioner', 'OVERLAPS_WITH', 'Physician Assistant'],
  ['Physical Therapist', 'OVERLAPS_WITH', 'Occupational Therapist'],
  ['UX Designer', 'OVERLAPS_WITH', 'UI Designer'],
  ['Forensic Scientist', 'OVERLAPS_WITH', 'Crime Scene Investigator'],
  ['Actuary', 'OVERLAPS_WITH', 'Quantitative Analyst'],
  ['Urban Planner', 'OVERLAPS_WITH', 'Landscape Architect'],
  ['Journalist', 'OVERLAPS_WITH', 'Content Creator'],
  ['Carpenter', 'OVERLAPS_WITH', 'Cabinetmaker'],
  ['Electrician', 'OVERLAPS_WITH', 'Electronics Technician'],
  ['Agricultural Scientist', 'OVERLAPS_WITH', 'Food Scientist'],
  ['Social Worker', 'OVERLAPS_WITH', 'Mental Health Counselor'],
  ['Personal Trainer', 'OVERLAPS_WITH', 'Strength and Conditioning Coach'],
  ['Security Guard', 'OVERLAPS_WITH', 'Police Officer'],
  ['Industrial Designer', 'OVERLAPS_WITH', 'Graphic Designer'],
  ['Film Director', 'OVERLAPS_WITH', 'Film Producer'],
  ['Massage Therapist', 'OVERLAPS_WITH', 'Physical Therapist'],
  // Historical succession
  ['Lamplighter', 'HISTORICAL_SUCCESSOR', 'Electrician'],
  ['Switchboard Operator', 'HISTORICAL_SUCCESSOR', 'Customer Service Representative'],
  ['Town Crier', 'HISTORICAL_SUCCESSOR', 'News Anchor'],
  ['Scribe', 'HISTORICAL_SUCCESSOR', 'Typist'],
  ['Typist', 'HISTORICAL_SUCCESSOR', 'Administrative Assistant']
];

export default [ transport, agriculture, mining, retail, hospitality, personal, religious ];
