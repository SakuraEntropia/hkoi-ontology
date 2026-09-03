import { o } from './_gen_lib.mjs';

// ---------- SCIENCE ----------
const science = o('Science', { s: 'science', z: '科学', d: 'Occupations that advance, apply and communicate systematic knowledge of the natural and social world.' },
  o('Physical Sciences', { z: '物理科学', d: 'Occupations investigating non-living matter, energy and the physical universe.' },
    o('Physicist', { z: '物理学家', d: 'Studies matter, energy, motion and the fundamental laws of the universe.' },
      o('Theoretical Physicist', { d: 'Develops mathematical models and theories to explain physical phenomena.' }),
      o('Experimental Physicist', { d: 'Designs and runs experiments to test physical theories and measure phenomena.' }),
      o('Astrophysicist', { d: 'Applies physics to stars, galaxies and the large-scale structure of the universe.' }),
      o('Nuclear Physicist', { d: 'Studies the structure and behavior of atomic nuclei and nuclear reactions.' }),
      o('Particle Physicist', { d: 'Investigates the elementary constituents of matter and their interactions.' }),
      o('Condensed Matter Physicist', { d: 'Studies the physical properties of solids and liquids at atomic scale.' }),
      o('Medical Physicist', { d: 'Applies physics to radiation therapy, imaging and medical instrumentation.' }),
      o('Geophysicist', { d: 'Uses physics to study the Earth, its gravity, magnetism and seismic activity.' }),
      o('Optical Physicist', { d: 'Studies light, lasers, lenses and optical systems.' })
    ),
    o('Chemist', { z: '化学家', d: 'Studies the composition, structure and reactions of matter.' },
      o('Analytical Chemist', { d: 'Identifies and quantifies the chemical components of substances.' }),
      o('Organic Chemist', { d: 'Studies carbon-based compounds and their synthesis and reactions.' }),
      o('Inorganic Chemist', { d: 'Studies non-carbon compounds including metals and minerals.' }),
      o('Physical Chemist', { d: 'Applies physics to understand chemical behavior and reactions.' }),
      o('Medicinal Chemist', { d: 'Designs and synthesizes compounds for pharmaceutical use.' }),
      o('Polymer Chemist', { d: 'Develops and studies large-molecule materials such as plastics.' }),
      o('Electrochemist', { d: 'Studies chemical processes involving electron transfer and batteries.' }),
      o('Theoretical Chemist', { d: 'Models chemical systems computationally to predict properties and reactions.' })
    ),
    o('Astronomer', { z: '天文学家', d: 'Observes and interprets celestial objects and phenomena.' },
      o('Observational Astronomer', { d: 'Collects and analyzes telescope data on celestial objects.' }),
      o('Radio Astronomer', { d: 'Studies the universe using radio-frequency emissions.' }),
      o('Planetary Scientist', { d: 'Studies planets, moons and planetary systems, including exoplanets.' }),
      o('Cosmologist', { d: 'Studies the origin, evolution and large-scale structure of the universe.' })
    ),
    o('Materials Scientist', { z: '材料科学家', d: 'Designs and studies the structure and properties of materials.' },
      o('Metallurgist', { d: 'Studies and develops metals and alloys and their processing.' }),
      o('Nanotechnologist', { d: 'Designs structures and devices at the nanometer scale.' })
    )
  ),
  o('Life Sciences', { z: '生命科学', d: 'Occupations investigating living organisms and biological processes.' },
    o('Biologist', { z: '生物学家', d: 'Studies living organisms and their interactions with the environment.' },
      o('Molecular Biologist', { d: 'Studies biological processes at the molecular level, especially DNA and proteins.' }),
      o('Cell Biologist', { d: 'Investigates the structure and function of cells.' }),
      o('Microbiologist', { d: 'Studies microorganisms including bacteria, viruses and fungi.' },
        o('Virologist', { d: 'Studies viruses and viral diseases.' }),
        o('Bacteriologist', { d: 'Studies bacteria and their roles in health and disease.' }),
        o('Parasitologist', { d: 'Studies parasites and the diseases they cause.' })
      ),
      o('Geneticist', { d: 'Studies genes, heredity and genetic variation.' },
        o('Population Geneticist', { d: 'Analyzes genetic variation within and between populations.' }),
        o('Molecular Geneticist', { d: 'Investigates the molecular basis of genes and their expression.' })
      ),
      o('Immunologist', { d: 'Studies the immune system and its response to disease.' }),
      o('Ecologist', { d: 'Studies the relationships between organisms and their environments.' },
        o('Conservation Biologist', { d: 'Applies ecology to protect species and ecosystems.' }),
        o('Restoration Ecologist', { d: 'Plans the recovery of damaged ecosystems and habitats.' })
      ),
      o('Zoologist', { d: 'Studies animals, their behavior, physiology and classification.' },
        o('Entomologist', { d: 'Studies insects and their ecology and control.' }),
        o('Ornithologist', { d: 'Studies birds and their behavior and habitats.' }),
        o('Ichthyologist', { d: 'Studies fish and their biology and ecology.' }),
        o('Herpetologist', { d: 'Studies reptiles and amphibians.' }),
        o('Mammalogist', { d: 'Studies mammals and their biology and conservation.' })
      ),
      o('Botanist', { z: '植物学家', d: 'Studies plants, their structure, physiology and classification.' },
        o('Plant Pathologist', { d: 'Studies plant diseases and their causal agents.' }),
        o('Plant Physiologist', { d: 'Investigates plant functions such as growth and photosynthesis.' })
      ),
      o('Marine Biologist', { d: 'Studies organisms living in oceans and coastal waters.' }),
      o('Evolutionary Biologist', { d: 'Studies the processes and history of biological evolution.' }),
      o('Physiologist', { d: 'Studies how living organisms and their systems function.' }),
      o('Developmental Biologist', { d: 'Studies how organisms grow and develop from conception to maturity.' }),
      o('Biochemist', { z: '生物化学家', d: 'Studies the chemical processes within living organisms.' }),
      o('Structural Biologist', { d: 'Determines the three-dimensional shapes of biological molecules.' })
    ),
    o('Neuroscientist', { z: '神经科学家', d: 'Studies the nervous system, the brain and behavior.' },
      o('Cognitive Neuroscientist', { d: 'Investigates the neural basis of mental processes.' }),
      o('Computational Neuroscientist', { d: 'Models brain function using computational methods.' })
    ),
    o('Pharmacologist', { d: 'Studies how drugs interact with biological systems.' },
      o('Clinical Pharmacologist', { d: 'Evaluates drug effects and dosing in humans.' })
    ),
    o('Toxicologist', { d: 'Studies the harmful effects of chemicals on living organisms.' },
      o('Regulatory Toxicologist', { d: 'Assesses chemical safety for regulatory compliance.' })
    ),
    o('Biomedical Scientist', { d: 'Conducts laboratory research to understand disease and improve health.' }),
    o('Bioinformatician', { d: 'Uses computation to analyze biological data such as genomes.' }),
    o('Epidemiologist', { z: '流行病学家', d: 'Studies the distribution and determinants of disease in populations.' },
      o('Infectious Disease Epidemiologist', { d: 'Tracks and models the spread of infectious diseases.' }),
      o('Chronic Disease Epidemiologist', { d: 'Studies the causes and patterns of long-term diseases.' })
    )
  ),
  o('Earth and Environmental Sciences', { s: 'earth_sciences', z: '地球与环境科学', d: 'Occupations studying the Earth, its systems and its environment.' },
    o('Geologist', { z: '地质学家', d: 'Studies the solid Earth, its rocks, minerals and history.' },
      o('Petrologist', { d: 'Studies the origin and composition of rocks.' }),
      o('Mineralogist', { d: 'Studies minerals, their structure, properties and formation.' }),
      o('Paleontologist', { d: 'Studies fossils to reconstruct the history of life.' }),
      o('Sedimentologist', { d: 'Studies sedimentary rocks and the processes that form them.' }),
      o('Volcanologist', { d: 'Studies volcanoes, volcanic processes and hazards.' }),
      o('Seismologist', { d: 'Studies earthquakes and the propagation of seismic waves.' }),
      o('Hydrogeologist', { d: 'Studies groundwater distribution and movement.' })
    ),
    o('Meteorologist', { z: '气象学家', d: 'Studies the atmosphere and forecasts weather.' },
      o('Climatologist', { d: 'Studies climate patterns and long-term climate change.' }),
      o('Atmospheric Scientist', { d: 'Investigates atmospheric processes and air quality.' })
    ),
    o('Oceanographer', { z: '海洋学家', d: 'Studies the oceans, their physics, chemistry and biology.' },
      o('Physical Oceanographer', { d: 'Studies ocean currents, waves and physical properties.' }),
      o('Chemical Oceanographer', { d: 'Studies the chemical composition of seawater and marine sediments.' }),
      o('Biological Oceanographer', { d: 'Studies marine organisms and ecosystems.' })
    ),
    o('Hydrologist', { d: 'Studies the distribution and movement of water in the environment.' }),
    o('Soil Scientist', { d: 'Studies soil formation, classification and fertility.' },
      o('Pedologist', { d: 'Studies soil formation and distribution in landscapes.' })
    ),
    o('Environmental Scientist', { z: '环境科学家', d: 'Studies environmental systems and the impacts of human activity.' },
      o('Conservation Scientist', { d: 'Manages and protects natural resources and habitats.' }),
      o('Ecotoxicologist', { d: 'Studies the effects of pollutants on ecosystems.' }),
      o('Climate Change Analyst', { d: 'Analyzes climate data and policy to inform mitigation and adaptation.' }),
      o('Environmental Consultant', { d: 'Advises organizations on environmental compliance and impact.' })
    ),
    o('Geospatial Scientist', { d: 'Analyzes spatial data using remote sensing and GIS technologies.' })
  ),
  o('Social Sciences', { z: '社会科学', d: 'Occupations that study human society, behavior and institutions.' },
    o('Economist', { z: '经济学家', d: 'Studies the production, distribution and consumption of goods and services.' },
      o('Macroeconomist', { d: 'Analyzes economy-wide phenomena such as growth, inflation and unemployment.' }),
      o('Microeconomist', { d: 'Studies individual markets, firms and consumer choices.' }),
      o('Econometrician', { d: 'Applies statistical methods to economic data and models.' }),
      o('Labor Economist', { d: 'Studies labor markets, wages and employment.' }),
      o('Development Economist', { d: 'Studies economic development and poverty reduction.' }),
      o('Environmental Economist', { d: 'Analyzes the economic aspects of environmental policy.' })
    ),
    o('Sociologist', { z: '社会学家', d: 'Studies social behavior, institutions and social change.' },
      o('Urban Sociologist', { d: 'Studies social life and organization in cities.' })
    ),
    o('Anthropologist', { z: '人类学家', d: 'Studies human societies, cultures and their development.' },
      o('Cultural Anthropologist', { d: 'Studies contemporary cultures and social practices.' }),
      o('Biological Anthropologist', { d: 'Studies human biological evolution and variation.' }),
      o('Linguistic Anthropologist', { d: 'Studies language in its social and cultural context.' }),
      o('Medical Anthropologist', { d: 'Studies how culture shapes health, illness and healing.' })
    ),
    o('Archaeologist', { z: '考古学家', d: 'Studies past human societies through material remains.' },
      o('Field Archaeologist', { d: 'Excavates and documents archaeological sites.' }),
      o('Underwater Archaeologist', { d: 'Investigates submerged sites and shipwrecks.' })
    ),
    o('Research Psychologist', { z: '心理学家', d: 'Studies human behavior and mental processes.' },
      o('Cognitive Psychologist', { d: 'Studies mental processes such as memory, perception and reasoning.' }),
      o('Developmental Psychologist', { d: 'Studies psychological growth across the lifespan.' }),
      o('Social Psychologist', { d: 'Studies how social contexts influence behavior and attitudes.' }),
      o('Experimental Psychologist', { d: 'Designs experiments to study behavior and cognition.' }),
      o('Psychometrician', { d: 'Develops and validates psychological tests and measurement instruments.' })
    ),
    o('Political Scientist', { z: '政治学家', d: 'Studies political systems, behavior and theory.' },
      o('Comparative Politics Researcher', { d: 'Compares political systems across countries and regions.' })
    ),
    o('Geographer', { z: '地理学家', d: 'Studies places, spatial patterns and human-environment interaction.' },
      o('Human Geographer', { d: 'Studies how people and societies organize space.' }),
      o('Physical Geographer', { d: 'Studies natural features of the Earth surface and their processes.' })
    ),
    o('Criminologist', { d: 'Studies crime, its causes and society responses to it.' }),
    o('Demographer', { d: 'Studies population size, structure and change.' }),
    o('Linguist', { z: '语言学家', d: 'Studies the structure, history and use of language.' },
      o('Phonologist', { d: 'Studies the sound systems of languages.' }),
      o('Syntax Researcher', { d: 'Studies sentence structure and grammar.' })
    )
  ),
  o('Formal Sciences', { z: '形式科学', d: 'Occupations working with abstract and mathematical systems.' },
    o('Mathematician', { z: '数学家', d: 'Develops and applies mathematical theories and techniques.' },
      o('Pure Mathematician', { d: 'Explores abstract mathematical structures and proofs.' }),
      o('Applied Mathematician', { d: 'Uses mathematics to solve practical problems in science and industry.' }),
      o('Algebraist', { d: 'Studies algebraic structures such as groups and rings.' }),
      o('Topologist', { d: 'Studies the properties of spaces preserved under deformation.' }),
      o('Number Theorist', { d: 'Studies the properties of integers and related structures.' })
    ),
    o('Statistician', { z: '统计学家', d: 'Designs studies and analyzes data using statistical methods.' },
      o('Biostatistician', { d: 'Applies statistics to biological and medical research.' }),
      o('Survey Statistician', { d: 'Designs and analyzes sample surveys and polls.' })
    ),
    o('Operations Research Analyst', { d: 'Uses mathematical modeling to improve decision-making and efficiency.' })
  ),
  o('Applied and Laboratory Science', { s: 'applied_science', z: '应用与实验科学', d: 'Occupations supporting research and applying science in practical settings.' },
    o('Laboratory Technician', { d: 'Performs routine laboratory tests and maintains equipment.' },
      o('Chemical Laboratory Technician', { d: 'Prepares samples and runs analyses in chemistry labs.' }),
      o('Biological Laboratory Technician', { d: 'Supports biological research with sample preparation and assays.' })
    ),
    o('Forensic Scientist', { z: '法医科学家', d: 'Applies science to the investigation of crimes.' },
      o('Forensic Chemist', { d: 'Analyzes chemical evidence such as drugs and residues.' }),
      o('Forensic Biologist', { d: 'Analyzes biological evidence such as DNA and fluids.' }),
      o('Forensic Toxicologist', { d: 'Detects drugs and poisons in biological samples.' })
    ),
    o('Food Scientist', { d: 'Studies food composition, safety and processing.' },
      o('Food Technologist', { d: 'Develops and improves food products and processing methods.' }),
      o('Food Safety Specialist', { d: 'Ensures food products meet safety and quality standards.' })
    )
  )
);

// ---------- ENGINEERING & TECHNOLOGY ----------
const engineering = o('Engineering and Technology', { s: 'engineering', z: '工程与技术', d: 'Occupations that design, build and maintain engineered systems and technologies.' },
  o('Civil Engineering', { z: '土木工程', d: 'Occupations designing and building public infrastructure.' },
    o('Structural Engineer', { d: 'Designs buildings and structures to safely bear loads.' },
      o('Bridge Engineer', { d: 'Designs and assesses bridges and long-span structures.' }),
      o('Earthquake Engineer', { d: 'Designs structures to resist seismic forces.' })
    ),
    o('Geotechnical Engineer', { d: 'Designs foundations and analyzes soil and rock behavior.' }),
    o('Transportation Engineer', { d: 'Plans and designs transportation systems and infrastructure.' },
      o('Highway Engineer', { d: 'Designs roads, highways and interchanges.' }),
      o('Traffic Engineer', { d: 'Manages traffic flow, signals and road safety.' })
    ),
    o('Environmental Engineer', { d: 'Designs systems to control pollution and protect environmental health.' },
      o('Water Resources Engineer', { d: 'Plans water supply, flood control and drainage systems.' }),
      o('Wastewater Engineer', { d: 'Designs treatment systems for sewage and industrial effluent.' })
    ),
    o('Construction Engineer', { d: 'Manages the technical aspects of construction projects.' }),
    o('Coastal Engineer', { d: 'Designs structures protecting coastlines from erosion and flooding.' }),
    o('Land Surveyor', { d: 'Measures land boundaries and topographic features.' },
      o('Geodetic Surveyor', { d: 'Measures large areas accounting for the Earth curvature.' }),
      o('Quantity Surveyor', { d: 'Estimates and manages construction project costs.' })
    )
  ),
  o('Mechanical Engineering', { z: '机械工程', d: 'Occupations designing machines, engines and mechanical systems.' },
    o('Mechanical Design Engineer', { d: 'Designs mechanical components and products.' }),
    o('HVAC Engineer', { d: 'Designs heating, ventilation and air-conditioning systems.' }),
    o('Automotive Engineer', { d: 'Designs and develops vehicles and their systems.' },
      o('Powertrain Engineer', { d: 'Develops engines and drivetrains for vehicles.' }),
      o('Vehicle Dynamics Engineer', { d: 'Optimizes vehicle handling, ride and stability.' })
    ),
    o('Robotics Engineer', { d: 'Designs and builds robots and automated systems.' },
      o('Robotics Controls Engineer', { d: 'Develops control algorithms for robotic motion.' })
    ),
    o('Manufacturing Engineer', { d: 'Improves production processes and manufacturing systems.' },
      o('Lean Manufacturing Engineer', { d: 'Reduces waste and improves flow in production.' })
    ),
    o('Mechatronics Engineer', { d: 'Integrates mechanical, electronic and software systems.' }),
    o('Acoustics Engineer', { d: 'Designs systems to control sound and vibration.' })
  ),
  o('Electrical Engineering', { z: '电气工程', d: 'Occupations working with electricity, power and electronics.' },
    o('Power Systems Engineer', { d: 'Designs and manages electrical generation and transmission.' },
      o('Grid Operations Engineer', { d: 'Manages the operation and stability of power grids.' }),
      o('Power Electronics Engineer', { d: 'Designs converters and power conditioning circuits.' })
    ),
    o('Electronics Engineer', { d: 'Designs electronic circuits and devices.' },
      o('Analog Circuit Designer', { d: 'Designs analog electronic circuits.' }),
      o('RF Engineer', { d: 'Designs radio-frequency circuits and systems.' })
    ),
    o('Control Systems Engineer', { d: 'Designs automatic control systems for processes and machines.' }),
    o('Telecommunications Engineer', { d: 'Designs systems for transmitting voice, data and signals.' },
      o('Network Systems Engineer', { d: 'Designs and operates telecommunication networks.' })
    ),
    o('Instrumentation Engineer', { d: 'Designs sensors and measurement systems for industry.' }),
    o('Signal Processing Engineer', { d: 'Develops algorithms to analyze and transform signals.' })
  ),
  o('Computer Hardware Engineering', { s: 'computer_hardware', d: 'Occupations designing computer and electronic hardware.' },
    o('Hardware Engineer', { d: 'Designs and tests computer and electronic hardware.' },
      o('Semiconductor Engineer', { d: 'Designs integrated circuits and semiconductor devices.' }),
      o('PCB Designer', { d: 'Designs printed circuit board layouts.' })
    ),
    o('Embedded Systems Engineer', { d: 'Develops hardware and firmware for embedded devices.' },
      o('Firmware Engineer', { d: 'Writes low-level software that runs on hardware.' })
    ),
    o('FPGA Engineer', { d: 'Programs field-programmable gate arrays for specialized hardware.' })
  ),
  o('Chemical Engineering', { z: '化学工程', d: 'Occupations designing processes that transform raw materials into products.' },
    o('Process Engineer', { d: 'Designs and optimizes industrial chemical processes.' },
      o('Petrochemical Engineer', { d: 'Designs processes for refining petroleum into chemicals.' }),
      o('Pharmaceutical Process Engineer', { d: 'Scales up and optimizes drug manufacturing processes.' })
    ),
    o('Bioprocess Engineer', { d: 'Designs processes using biological systems for production.' }),
    o('Polymer Engineer', { d: 'Develops polymer materials and their processing.' })
  ),
  o('Aerospace Engineering', { z: '航空航天工程', d: 'Occupations designing aircraft and spacecraft.' },
    o('Aeronautical Engineer', { d: 'Designs aircraft and their aerodynamic and structural systems.' }),
    o('Astronautical Engineer', { d: 'Designs spacecraft and space launch systems.' },
      o('Propulsion Engineer', { d: 'Designs rocket and jet propulsion systems.' }),
      o('Avionics Engineer', { d: 'Designs electronic systems for aircraft and spacecraft.' })
    ),
    o('Flight Test Engineer', { d: 'Plans and conducts flight tests of aircraft and systems.' })
  ),
  o('Biomedical Engineering', { z: '生物医学工程', d: 'Occupations applying engineering to medicine and biology.' },
    o('Medical Device Engineer', { d: 'Designs and tests medical devices and equipment.' }),
    o('Biomechanical Engineer', { d: 'Applies mechanics to the human body and implants.' }),
    o('Clinical Engineer', { d: 'Manages medical technology in healthcare facilities.' })
  ),
  o('Industrial and Systems Engineering', { s: 'industrial_engineering', d: 'Occupations optimizing systems, processes and organizations.' },
    o('Industrial Engineer', { d: 'Optimizes production systems and workflows.' }),
    o('Quality Engineer', { d: 'Ensures products meet quality standards through testing and analysis.' },
      o('Reliability Engineer', { d: 'Analyzes and improves the reliability of systems and products.' })
    ),
    o('Human Factors Engineer', { a: ['Ergonomist'], d: 'Designs systems and products around human capabilities and limits.' }),
    o('Supply Chain Engineer', { d: 'Designs and optimizes supply chain networks and flows.' })
  ),
  o('Materials Engineering', { z: '材料工程', d: 'Occupations developing and applying engineering materials.' },
    o('Metallurgical Engineer', { d: 'Develops metal alloys and metal processing methods.' }),
    o('Ceramics Engineer', { d: 'Develops ceramic materials for industrial and technical uses.' }),
    o('Composites Engineer', { d: 'Designs and develops composite materials and structures.' })
  ),
  o('Nuclear and Energy Engineering', { s: 'nuclear_energy', d: 'Occupations working with nuclear and renewable energy systems.' },
    o('Nuclear Engineer', { z: '核工程师', d: 'Designs and operates nuclear reactors and systems.' },
      o('Nuclear Reactor Engineer', { d: 'Designs and analyzes nuclear reactor cores and safety systems.' }),
      o('Radiation Protection Specialist', { d: 'Manages radiation safety and shielding.' })
    ),
    o('Renewable Energy Engineer', { d: 'Designs systems that generate energy from renewable sources.' },
      o('Solar Energy Engineer', { d: 'Designs photovoltaic and solar thermal systems.' }),
      o('Wind Energy Engineer', { d: 'Designs wind turbines and wind farm layouts.' }),
      o('Energy Storage Engineer', { d: 'Develops battery and energy storage systems.' })
    ),
    o('Petroleum Engineer', { z: '石油工程师', d: 'Develops methods to extract oil and gas from reservoirs.' },
      o('Drilling Engineer', { d: 'Plans and manages the drilling of oil and gas wells.' }),
      o('Reservoir Engineer', { d: 'Models subsurface reservoirs to optimize recovery.' })
    )
  ),
  o('Marine Engineering', { z: '船舶工程', d: 'Occupations designing ships and offshore structures.' },
    o('Naval Architect', { d: 'Designs ships, boats and marine vessels.' }),
    o('Marine Systems Engineer', { d: 'Designs propulsion and auxiliary systems for vessels.' })
  ),
  o('Engineering Technician', { d: 'Supports engineers with hands-on technical work.' },
    o('Civil Engineering Technician', { d: 'Assists with surveying, drafting and site inspection.' }),
    o('Mechanical Engineering Technician', { d: 'Assists with machine design, testing and maintenance.' }),
    o('Electrical Engineering Technician', { d: 'Assists with electrical design, testing and installation.' }),
    o('Electronics Technician', { d: 'Builds, tests and repairs electronic equipment.' })
  )
);

// ---------- IT & COMPUTING ----------
const it = o('IT and Computing', { s: 'it_computing', z: '信息技术与计算', d: 'Occupations that build, operate and secure software and computing systems.' },
  o('Software Development', { z: '软件开发', d: 'Occupations designing and writing software.' },
    o('Software Engineer', { z: '软件工程师', d: 'Designs, builds and maintains software applications.' },
      o('Frontend Developer', { d: 'Builds the user-facing interfaces of web applications.' }),
      o('Backend Developer', { d: 'Builds server-side logic, APIs and data services.' }),
      o('Full Stack Developer', { d: 'Works across both frontend and backend of applications.' }),
      o('Mobile App Developer', { d: 'Builds applications for smartphones and tablets.' },
        o('iOS Developer', { d: 'Develops applications for Apple mobile platforms.' }),
        o('Android Developer', { d: 'Develops applications for the Android platform.' })
      ),
      o('Desktop Application Developer', { d: 'Builds applications that run on desktop operating systems.' })
    ),
    o('Systems Software Engineer', { d: 'Develops operating systems, compilers and low-level software.' }),
    o('Embedded Software Engineer', { d: 'Writes software for microcontrollers and embedded devices.' }),
    o('Game Developer', { z: '游戏开发者', d: 'Designs and programs video games.' },
      o('Gameplay Programmer', { d: 'Implements game mechanics and interactive systems.' }),
      o('Game Engine Programmer', { d: 'Develops the underlying engines that run games.' })
    ),
    o('DevOps Engineer', { d: 'Automates software delivery and manages build and release pipelines.' },
      o('Site Reliability Engineer', { d: 'Applies software engineering to keep systems reliable and scalable.' }),
      o('Platform Engineer', { d: 'Builds internal developer platforms and infrastructure tooling.' })
    ),
    o('Quality Assurance Engineer', { d: 'Tests software to ensure it works correctly and reliably.' },
      o('Test Automation Engineer', { d: 'Writes automated test suites for software.' })
    )
  ),
  o('Web, UI and UX', { s: 'web_ui_ux', d: 'Occupations designing interfaces and user experiences.' },
    o('Web Developer', { d: 'Builds websites and web applications.' }),
    o('UX Designer', { d: 'Designs user experiences based on research and usability.' },
      o('UX Researcher', { d: 'Studies users to inform product and interface design.' }),
      o('Interaction Designer', { d: 'Designs how users interact with products and interfaces.' })
    ),
    o('UI Designer', { d: 'Designs the visual interface elements of digital products.' }),
    o('Accessibility Specialist', { d: 'Ensures digital products are usable by people with disabilities.' })
  ),
  o('Data and Analytics', { s: 'data_analytics', d: 'Occupations working with data to derive insight and value.' },
    o('Data Scientist', { z: '数据科学家', d: 'Analyzes complex data to build models and extract insights.' },
      o('Machine Learning Engineer', { d: 'Builds and deploys machine learning models in production.' },
        o('Deep Learning Engineer', { d: 'Develops neural network models for complex tasks.' }),
        o('NLP Engineer', { d: 'Builds systems that process and understand natural language.' }),
        o('Computer Vision Engineer', { d: 'Builds systems that interpret images and video.' })
      ),
      o('Data Engineer', { d: 'Builds the pipelines and infrastructure that move and store data.' }),
      o('Analytics Engineer', { d: 'Transforms raw data into well-modeled datasets for analysis.' })
    ),
    o('Data Analyst', { d: 'Interprets data to answer business and operational questions.' }),
    o('Business Intelligence Analyst', { d: 'Builds dashboards and reports to support decision-making.' }),
    o('Database Administrator', { d: 'Installs, maintains and secures databases.' },
      o('Database Architect', { d: 'Designs the structure and integration of databases.' })
    ),
    o('Statistician Programmer', { d: 'Programs statistical analyses, often for clinical trials.' })
  ),
  o('Cybersecurity', { z: '网络安全', d: 'Occupations protecting systems, networks and data from attack.' },
    o('Security Engineer', { d: 'Builds and maintains security controls in systems.' },
      o('Application Security Engineer', { d: 'Finds and fixes security flaws in software.' }),
      o('Network Security Engineer', { d: 'Protects networks with firewalls, VPNs and monitoring.' }),
      o('Cloud Security Engineer', { d: 'Secures cloud infrastructure and services.' })
    ),
    o('Penetration Tester', { a: ['Ethical Hacker'], d: 'Simulates attacks to find vulnerabilities before adversaries do.' }),
    o('Security Analyst', { d: 'Monitors systems and investigates security events.' },
      o('SOC Analyst', { d: 'Works in a security operations center monitoring alerts.' }),
      o('Incident Responder', { d: 'Investigates and contains security breaches.' }),
      o('Threat Intelligence Analyst', { d: 'Researches cyber threats and adversaries.' })
    ),
    o('Security Architect', { d: 'Designs the overall security architecture of an organization.' }),
    o('Cryptographer', { d: 'Designs encryption algorithms and protocols.' }),
    o('Digital Forensics Analyst', { d: 'Recovers and analyzes digital evidence for investigations.' }),
    o('Identity and Access Management Specialist', { s: 'iam_specialist', d: 'Manages user identities, authentication and access rights.' })
  ),
  o('IT Operations and Infrastructure', { s: 'it_operations', d: 'Occupations running and maintaining IT systems and networks.' },
    o('Systems Administrator', { d: 'Installs, configures and maintains servers and systems.' },
      o('Linux Administrator', { d: 'Administers Linux servers and systems.' }),
      o('Windows Administrator', { d: 'Administers Windows servers and systems.' })
    ),
    o('Network Engineer', { d: 'Designs and manages computer networks.' },
      o('Network Administrator', { d: 'Operates and maintains network infrastructure.' })
    ),
    o('Cloud Engineer', { d: 'Builds and manages cloud infrastructure and services.' },
      o('Cloud Architect', { d: 'Designs cloud environments and migration strategies.' })
    ),
    o('IT Support Specialist', { d: 'Provides technical support to users and resolves issues.' },
      o('Help Desk Technician', { d: 'Handles first-line user support requests.' }),
      o('Desktop Support Technician', { d: 'Supports end-user devices and software.' })
    ),
    o('Datacenter Technician', { d: 'Maintains servers and physical infrastructure in data centers.' })
  ),
  o('IT Leadership and Advisory', { s: 'it_leadership', d: 'Occupations leading technology strategy and delivery.' },
    o('IT Project Manager', { d: 'Plans and delivers technology projects on time and budget.' },
      o('Scrum Master', { d: 'Facilitates agile teams and their processes.' })
    ),
    o('Enterprise Architect', { d: 'Aligns an organization technology landscape with its strategy.' }),
    o('Solutions Architect', { d: 'Designs technical solutions to meet business requirements.' }),
    o('IT Consultant', { d: 'Advises organizations on technology strategy and implementation.' }),
    o('Technical Product Manager', { d: 'Guides the development of technical products from concept to launch.' })
  ),
  o('Specialized Computing', { z: '专业计算', d: 'Occupations applying computing in specialized domains.' },
    o('Blockchain Developer', { d: 'Builds applications and protocols on blockchain platforms.' },
      o('Smart Contract Developer', { d: 'Writes self-executing smart contract code.' })
    ),
    o('Scientific Computing Specialist', { d: 'Applies high-performance computing to scientific problems.' }),
    o('Bioinformatics Developer', { d: 'Builds software tools for analyzing biological data.' }),
    o('Quantum Computing Researcher', { d: 'Develops algorithms and software for quantum computers.' }),
    o('Geographic Information Systems Specialist', { s: 'gis_specialist', d: 'Builds and analyzes geographic data systems.' })
  )
);

// ---------- MEDICINE & HEALTHCARE ----------
const medicine = o('Medicine and Healthcare', { s: 'medicine', z: '医疗与健康', d: 'Occupations that prevent, diagnose and treat illness and promote health.' },
  o('Physicians', { s: 'physicians', z: '医生', d: 'Medical doctors who diagnose and treat patients.' },
    o('Primary Care Physician', { d: 'Provides first-contact, ongoing general medical care.' },
      o('Family Medicine Physician', { d: 'Provides comprehensive care for individuals and families.' }),
      o('Internal Medicine Physician', { a: ['Internist'], d: 'Diagnoses and treats adult internal diseases.' },
        o('Cardiologist', { d: 'Diagnoses and treats heart and blood vessel disorders.' }),
        o('Gastroenterologist', { d: 'Treats disorders of the digestive system.' }),
        o('Pulmonologist', { d: 'Treats diseases of the lungs and respiratory system.' }),
        o('Nephrologist', { d: 'Treats kidney diseases and disorders.' }),
        o('Endocrinologist', { d: 'Treats hormone and gland disorders.' }),
        o('Rheumatologist', { d: 'Treats autoimmune and joint diseases.' }),
        o('Hematologist', { d: 'Treats blood disorders.' }),
        o('Oncologist', { d: 'Diagnoses and treats cancer.' },
          o('Medical Oncologist', { d: 'Treats cancer with drug therapies.' }),
          o('Radiation Oncologist', { d: 'Treats cancer using radiation therapy.' })
        ),
        o('Infectious Disease Specialist', { d: 'Diagnoses and treats infections.' })
      )
    ),
    o('Pediatrician', { z: '儿科医生', d: 'Provides medical care for infants, children and adolescents.' },
      o('Neonatologist', { d: 'Cares for critically ill newborn infants.' })
    ),
    o('Geriatrician', { d: 'Provides medical care for older adults.' }),
    o('Emergency Medicine Physician', { d: 'Provides urgent care for acute illness and injury.' }),
    o('Anesthesiologist', { z: '麻醉医生', d: 'Administers anesthesia and manages patients during surgery.' },
      o('Pain Management Specialist', { d: 'Treats chronic and acute pain.' })
    ),
    o('Dermatologist', { d: 'Diagnoses and treats skin, hair and nail disorders.' }),
    o('Neurologist', { d: 'Diagnoses and treats nervous system disorders.' }),
    o('Psychiatrist', { z: '精神科医生', d: 'Diagnoses and treats mental disorders.' },
      o('Child and Adolescent Psychiatrist', { s: 'child_psychiatrist', d: 'Treats mental disorders in children and adolescents.' }),
      o('Addiction Psychiatrist', { d: 'Treats substance use and behavioral addictions.' })
    ),
    o('Physiatrist', { a: ['Rehabilitation Physician'], d: 'Treats physical impairments and restores function.' }),
    o('Radiologist', { z: '放射科医生', d: 'Diagnoses disease using medical imaging.' },
      o('Interventional Radiologist', { d: 'Performs minimally invasive procedures guided by imaging.' }),
      o('Neuroradiologist', { d: 'Interprets imaging of the brain and nervous system.' })
    ),
    o('Pathologist', { d: 'Diagnoses disease by examining tissues and body fluids.' },
      o('Forensic Pathologist', { d: 'Determines causes of death in legal investigations.' })
    ),
    o('Allergist Immunologist', { s: 'allergist', d: 'Treats allergies and immune system disorders.' }),
    o('Sports Medicine Physician', { d: 'Treats sports injuries and promotes athletic health.' })
  ),
  o('Surgeons', { s: 'surgeons', z: '外科医生', d: 'Medical doctors who perform operations.' },
    o('General Surgeon', { d: 'Performs a broad range of surgical procedures.' }),
    o('Orthopedic Surgeon', { d: 'Operates on bones, joints and muscles.' }),
    o('Cardiothoracic Surgeon', { d: 'Operates on the heart and chest.' }),
    o('Neurosurgeon', { d: 'Operates on the brain and nervous system.' }),
    o('Plastic Surgeon', { d: 'Reconstructs and restores body tissue and appearance.' }),
    o('Vascular Surgeon', { d: 'Operates on blood vessels outside the heart.' }),
    o('Urologist', { d: 'Treats urinary tract and male reproductive disorders.' }),
    o('Otolaryngologist', { a: ['ENT Surgeon'], d: 'Treats ear, nose and throat disorders.' }),
    o('Ophthalmologist', { d: 'Treats eye diseases and performs eye surgery.' }),
    o('Obstetrician Gynecologist', { s: 'obgyn', d: 'Manages pregnancy and treats female reproductive disorders.' },
      o('Maternal Fetal Medicine Specialist', { s: 'mfm_specialist', d: 'Cares for high-risk pregnancies.' })
    ),
    o('Oral and Maxillofacial Surgeon', { s: 'oral_surgeon', d: 'Operates on the mouth, jaws and face.' }),
    o('Pediatric Surgeon', { d: 'Performs surgery on infants and children.' }),
    o('Transplant Surgeon', { d: 'Performs organ transplantation surgery.' }),
    o('Trauma Surgeon', { d: 'Provides emergency surgery for severe injuries.' })
  ),
  o('Nursing', { z: '护理', d: 'Occupations providing direct patient care.' },
    o('Registered Nurse', { z: '注册护士', d: 'Provides and coordinates patient care.' },
      o('Critical Care Nurse', { d: 'Cares for critically ill patients in intensive care.' }),
      o('Emergency Nurse', { d: 'Provides nursing care in emergency departments.' }),
      o('Pediatric Nurse', { d: 'Provides nursing care for children.' }),
      o('Oncology Nurse', { d: 'Cares for cancer patients.' }),
      o('Psychiatric Mental Health Nurse', { s: 'psych_nurse', d: 'Provides nursing care for mental health patients.' }),
      o('Perioperative Nurse', { d: 'Cares for patients before, during and after surgery.' }),
      o('Community Health Nurse', { d: 'Delivers care in homes and community settings.' }),
      o('Occupational Health Nurse', { d: 'Promotes health and safety in workplaces.' })
    ),
    o('Nurse Practitioner', { d: 'Provides advanced nursing care and can diagnose and prescribe.' },
      o('Family Nurse Practitioner', { d: 'Provides primary care to families.' }),
      o('Acute Care Nurse Practitioner', { d: 'Provides advanced care in hospital and acute settings.' }),
      o('Psychiatric Nurse Practitioner', { d: 'Provides advanced mental health care.' })
    ),
    o('Nurse Anesthetist', { d: 'Administers anesthesia under physician supervision.' }),
    o('Nurse Midwife', { d: 'Provides prenatal, childbirth and postpartum care.' }),
    o('Licensed Practical Nurse', { d: 'Provides basic nursing care under supervision.' }),
    o('Nurse Educator', { d: 'Teaches and trains nursing students and staff.' })
  ),
  o('Dentistry', { z: '牙科', d: 'Occupations caring for teeth and oral health.' },
    o('General Dentist', { d: 'Diagnoses and treats dental and oral conditions.' },
      o('Orthodontist', { d: 'Corrects misaligned teeth and jaws.' }),
      o('Endodontist', { d: 'Treats diseases of the dental pulp and performs root canals.' }),
      o('Periodontist', { d: 'Treats gum disease and supporting structures.' }),
      o('Prosthodontist', { d: 'Restores and replaces missing teeth with prosthetics.' }),
      o('Pediatric Dentist', { d: 'Provides dental care for children.' })
    ),
    o('Dental Hygienist', { d: 'Cleans teeth and educates patients on oral hygiene.' }),
    o('Dental Assistant', { d: 'Assists dentists during procedures and manages instruments.' }),
    o('Dental Laboratory Technician', { d: 'Fabricates crowns, bridges and dentures.' })
  ),
  o('Pharmacy', { z: '药学', d: 'Occupations preparing and dispensing medications.' },
    o('Pharmacist', { z: '药剂师', d: 'Dispenses medications and advises on their safe use.' },
      o('Clinical Pharmacist', { d: 'Works with care teams to optimize medication therapy.' }),
      o('Compounding Pharmacist', { d: 'Prepares customized medications for individual patients.' })
    ),
    o('Pharmacy Technician', { d: 'Assists pharmacists in dispensing and managing medications.' })
  ),
  o('Allied Health Professions', { s: 'allied_health', z: '专职医疗', d: 'Occupations providing diagnostic, therapeutic and support services.' },
    o('Physical Therapist', { z: '物理治疗师', d: 'Restores movement and function through exercise and therapy.' },
      o('Orthopedic Physical Therapist', { d: 'Treats musculoskeletal injuries and conditions.' }),
      o('Neurological Physical Therapist', { d: 'Treats movement disorders from neurological conditions.' }),
      o('Sports Physical Therapist', { d: 'Treats and prevents sports-related injuries.' })
    ),
    o('Occupational Therapist', { d: 'Helps people regain skills for daily living and work.' },
      o('Pediatric Occupational Therapist', { d: 'Helps children develop functional skills.' })
    ),
    o('Speech Language Pathologist', { s: 'speech_pathologist', d: 'Diagnoses and treats speech, language and swallowing disorders.' }),
    o('Respiratory Therapist', { d: 'Treats patients with breathing and cardiopulmonary disorders.' }),
    o('Audiologist', { d: 'Diagnoses and treats hearing and balance disorders.' }),
    o('Dietitian Nutritionist', { s: 'dietitian', d: 'Advises on food and nutrition to promote health.' },
      o('Clinical Dietitian', { d: 'Plans nutrition care for patients in clinical settings.' }),
      o('Sports Nutritionist', { d: 'Designs nutrition plans for athletic performance.' })
    ),
    o('Medical Laboratory Scientist', { d: 'Performs diagnostic laboratory tests on clinical samples.' },
      o('Clinical Chemist', { d: 'Analyzes blood and body fluids for diagnostic chemistry.' }),
      o('Medical Microbiologist', { d: 'Identifies infectious organisms in clinical samples.' })
    ),
    o('Radiologic Technologist', { d: 'Produces medical images using X-ray and other modalities.' },
      o('MRI Technologist', { d: 'Operates magnetic resonance imaging equipment.' }),
      o('CT Technologist', { d: 'Operates computed tomography scanners.' }),
      o('Sonographer', { a: ['Ultrasound Technologist'], d: 'Produces ultrasound images of the body.' }),
      o('Nuclear Medicine Technologist', { d: 'Administers radioactive tracers for imaging.' })
    ),
    o('Radiation Therapist', { d: 'Administers radiation treatments to cancer patients.' }),
    o('Physician Assistant', { d: 'Practices medicine under physician supervision.' }),
    o('Emergency Medical Technician', { a: ['EMT'], d: 'Provides emergency prehospital care.' },
      o('Paramedic', { d: 'Provides advanced emergency medical care in the field.' })
    ),
    o('Optometrist', { d: 'Examines eyes and prescribes corrective lenses.' }),
    o('Podiatrist', { d: 'Diagnoses and treats foot and ankle conditions.' }),
    o('Chiropractor', { d: 'Treats musculoskeletal conditions through spinal adjustment.' }),
    o('Orthotist Prosthetist', { s: 'orthotist', d: 'Designs and fits braces and artificial limbs.' }),
    o('Genetic Counselor', { d: 'Advises individuals on genetic conditions and testing.' }),
    o('Surgical Technologist', { d: 'Prepares operating rooms and assists during surgery.' }),
    o('Physical Therapy Assistant', { d: 'Assists physical therapists with patient treatment.' }),
    o('Occupational Therapy Assistant', { d: 'Assists occupational therapists with therapy sessions.' })
  ),
  o('Mental Health and Counseling', { s: 'mental_health', z: '心理健康与咨询', d: 'Occupations providing psychological therapy and counseling.' },
    o('Clinical Psychologist', { z: '临床心理学家', d: 'Diagnoses and treats mental disorders using psychotherapy.' },
      o('Neuropsychologist', { d: 'Assesses brain-behavior relationships and cognitive function.' }),
      o('Health Psychologist', { d: 'Applies psychology to physical health and illness.' })
    ),
    o('Counseling Psychologist', { d: 'Helps people cope with life challenges and transitions.' }),
    o('Psychotherapist', { d: 'Provides talk therapy for emotional and mental health issues.' },
      o('Marriage and Family Therapist', { s: 'mft', d: 'Treats individuals, couples and families.' }),
      o('Art Therapist', { d: 'Uses creative arts to support mental health.' }),
      o('Music Therapist', { d: 'Uses music to address therapeutic goals.' })
    ),
    o('Mental Health Counselor', { d: 'Provides counseling for mental and emotional well-being.' },
      o('Substance Abuse Counselor', { d: 'Treats people with drug and alcohol addictions.' }),
      o('Grief Counselor', { d: 'Supports people coping with loss and bereavement.' })
    )
  ),
  o('Public Health', { z: '公共卫生', d: 'Occupations protecting and improving population health.' },
    o('Public Health Specialist', { d: 'Designs and evaluates programs to improve population health.' }),
    o('Health Educator', { d: 'Teaches communities and individuals about healthy behaviors.' }),
    o('Environmental Health Officer', { d: 'Monitors and enforces environmental health standards.' }),
    o('Community Health Worker', { d: 'Connects communities with health services and education.' })
  ),
  o('Veterinary Medicine', { z: '兽医', d: 'Occupations caring for animal health.' },
    o('Veterinarian', { z: '兽医', d: 'Diagnoses and treats diseases and injuries in animals.' },
      o('Small Animal Veterinarian', { d: 'Cares for companion animals such as dogs and cats.' }),
      o('Large Animal Veterinarian', { d: 'Cares for livestock and farm animals.' }),
      o('Equine Veterinarian', { d: 'Specializes in the care of horses.' }),
      o('Exotic Animal Veterinarian', { d: 'Cares for exotic and non-domestic species.' }),
      o('Veterinary Pathologist', { d: 'Diagnoses animal disease through laboratory analysis.' })
    ),
    o('Veterinary Technician', { d: 'Assists veterinarians with animal care and procedures.' }),
    o('Veterinary Assistant', { d: 'Supports veterinary clinics with animal handling and care.' })
  ),
  o('Traditional and Alternative Medicine', { s: 'traditional_medicine', z: '传统与替代医学', d: 'Occupations practicing traditional and complementary healing systems.' },
    o('Traditional Chinese Medicine Practitioner', { s: 'tcm_practitioner', z: '中医师', g: false, d: 'Diagnoses and treats using traditional Chinese medical theory and herbs.' },
      o('Acupuncturist', { z: '针灸师', g: false, d: 'Treats conditions by inserting needles at specific points.' }),
      o('Chinese Herbalist', { z: '中药师', g: false, d: 'Prescribes and prepares herbal formulas.' })
    ),
    o('Ayurvedic Practitioner', { g: false, d: 'Practices the traditional Indian system of Ayurvedic medicine.' }),
    o('Naturopathic Doctor', { d: 'Treats disease using natural and holistic approaches.' }),
    o('Homeopath', { d: 'Practices homeopathic medicine using highly diluted remedies.' }),
    o('Osteopath', { d: 'Treats the body through manual manipulation of muscles and bones.' }),
    o('Traditional Healer', { g: false, d: 'Practices indigenous healing methods within a local cultural tradition.' })
  )
);

export default [ science, engineering, it, medicine ];
