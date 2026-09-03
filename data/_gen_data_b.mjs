import { o } from './_gen_lib.mjs';

// ---------- LAW ----------
const law = o('Law', { s: 'law', z: '法律', d: 'Occupations practicing, applying and upholding the law.' },
  o('Legal Practice', { z: '法律实务', d: 'Occupations representing and advising clients on legal matters.' },
    o('Lawyer', { a: ['Attorney'], z: '律师', d: 'Advises and represents clients on legal matters.' },
      o('Corporate Lawyer', { d: 'Advises businesses on transactions, governance and compliance.' }),
      o('Criminal Defense Lawyer', { d: 'Defends individuals accused of crimes.' }),
      o('Prosecutor', { d: 'Represents the state in criminal proceedings.' }),
      o('Litigation Lawyer', { a: ['Trial Lawyer'], d: 'Represents clients in civil disputes and court proceedings.' }),
      o('Family Lawyer', { d: 'Handles divorce, custody and other family law matters.' }),
      o('Real Estate Lawyer', { d: 'Handles property transactions and land law.' }),
      o('Tax Lawyer', { d: 'Advises on tax law and represents clients in tax disputes.' }),
      o('Intellectual Property Lawyer', { d: 'Protects patents, copyrights and trademarks.' },
        o('Patent Attorney', { d: 'Prepares and prosecutes patent applications.' }),
        o('Trademark Attorney', { d: 'Registers and protects trademarks and brands.' })
      ),
      o('Immigration Lawyer', { d: 'Advises on visas, citizenship and immigration matters.' }),
      o('Environmental Lawyer', { d: 'Handles environmental regulation and compliance cases.' }),
      o('Employment Lawyer', { d: 'Handles workplace disputes and labor law.' }),
      o('Personal Injury Lawyer', { d: 'Represents clients injured by negligence or accidents.' }),
      o('International Lawyer', { d: 'Practices law across national boundaries and treaties.' })
    ),
    o('Paralegal', { d: 'Assists lawyers with research, documents and case preparation.' },
      o('Litigation Paralegal', { d: 'Supports trial preparation and discovery.' })
    ),
    o('Legal Secretary', { d: 'Provides administrative support in law offices.' })
  ),
  o('Judiciary and Adjudication', { s: 'judiciary', z: '司法与裁判', d: 'Occupations that judge, arbitrate and resolve disputes.' },
    o('Judge', { z: '法官', d: 'Presides over court proceedings and issues rulings.' },
      o('Appellate Judge', { d: 'Reviews decisions of lower courts.' }),
      o('Administrative Law Judge', { d: 'Adjudicates disputes involving government agencies.' })
    ),
    o('Magistrate', { d: 'Hears minor cases and preliminary matters.' }),
    o('Mediator', { d: 'Facilitates negotiated settlements between disputing parties.' }),
    o('Arbitrator', { d: 'Resolves disputes outside court through binding decisions.' }),
    o('Court Reporter', { d: 'Creates verbatim transcripts of court proceedings.' }),
    o('Court Clerk', { d: 'Manages court records, filings and administrative procedures.' })
  ),
  o('Legal and Compliance Services', { s: 'legal_services', d: 'Occupations supporting legal transactions and regulatory compliance.' },
    o('Notary Public', { d: 'Witnesses and authenticates legal documents and signatures.' }),
    o('Compliance Officer', { d: 'Ensures organizations follow laws, regulations and internal policies.' },
      o('Regulatory Affairs Specialist', { d: 'Manages submissions and compliance with regulators.' })
    ),
    o('Contract Administrator', { d: 'Drafts, reviews and manages contracts and agreements.' }),
    o('Legal Compliance Investigator', { d: 'Investigates possible violations of laws and policies.' })
  )
);

// ---------- BUSINESS & FINANCE ----------
const business = o('Business and Finance', { s: 'business', z: '商业与金融', d: 'Occupations managing organizations, money and markets.' },
  o('Executive Management', { s: 'executive', z: '高层管理', d: 'Occupations leading and directing organizations.' },
    o('Chief Executive Officer', { d: 'Leads an organization and sets its overall direction.' },
      o('Chief Operating Officer', { d: 'Oversees day-to-day operations of an organization.' }),
      o('Chief Financial Officer', { d: 'Directs an organization finances and financial strategy.' }),
      o('Chief Marketing Officer', { d: 'Directs marketing strategy and brand.' })
    ),
    o('General Manager', { d: 'Manages the operations and performance of a business unit.' }),
    o('Operations Manager', { d: 'Oversees the production and delivery of goods or services.' }),
    o('Project Manager', { d: 'Plans and delivers projects within scope, time and budget.' },
      o('Program Manager', { d: 'Coordinates multiple related projects toward shared goals.' })
    ),
    o('Product Manager', { d: 'Defines and guides a product from concept to launch.' }),
    o('Business Development Manager', { d: 'Identifies and pursues growth opportunities and partnerships.' })
  ),
  o('Finance', { z: '金融', d: 'Occupations managing money, investments and financial risk.' },
    o('Financial Analyst', { d: 'Analyzes financial data to guide investment and business decisions.' },
      o('Investment Analyst', { d: 'Researches investments and builds recommendations.' }),
      o('Equity Research Analyst', { d: 'Analyzes public companies and issues stock recommendations.' }),
      o('Credit Analyst', { d: 'Assesses the creditworthiness of borrowers.' })
    ),
    o('Investment Banker', { d: 'Advises on mergers, acquisitions and capital raising.' },
      o('Mergers and Acquisitions Analyst', { s: 'ma_analyst', d: 'Analyzes and executes M&A transactions.' })
    ),
    o('Portfolio Manager', { d: 'Manages investment portfolios to meet objectives.' },
      o('Fund Manager', { d: 'Manages pooled investment funds and their strategy.' })
    ),
    o('Trader', { d: 'Buys and sells financial instruments to profit from markets.' },
      o('Securities Trader', { d: 'Trades stocks and bonds.' }),
      o('Commodities Trader', { d: 'Trades physical commodities and futures.' }),
      o('Foreign Exchange Trader', { d: 'Trades currencies in foreign exchange markets.' })
    ),
    o('Risk Manager', { d: 'Identifies and mitigates financial and operational risks.' },
      o('Credit Risk Analyst', { d: 'Assesses and manages credit risk exposure.' }),
      o('Market Risk Analyst', { d: 'Analyzes exposure to market movements.' })
    ),
    o('Actuary', { z: '精算师', d: 'Quantifies financial risk using mathematics and statistics.' },
      o('Pension Actuary', { d: 'Valuates pension plans and retirement obligations.' }),
      o('Insurance Actuary', { d: 'Prices insurance products and reserves.' })
    ),
    o('Quantitative Analyst', { a: ['Quant'], d: 'Develops mathematical models for trading and risk.' }),
    o('Financial Advisor', { d: 'Advises clients on investments and financial planning.' },
      o('Wealth Manager', { d: 'Manages assets for high-net-worth clients.' }),
      o('Retirement Planner', { d: 'Advises clients on retirement savings and income.' })
    ),
    o('Underwriter', { d: 'Evaluates risk to decide insurance coverage and pricing.' },
      o('Insurance Underwriter', { d: 'Assesses insurance applications and sets premiums.' }),
      o('Loan Underwriter', { d: 'Evaluates loan applications and credit risk.' })
    ),
    o('Loan Officer', { d: 'Evaluates and approves loan applications.' },
      o('Mortgage Loan Officer', { d: 'Specializes in home mortgage lending.' })
    ),
    o('Treasury Analyst', { d: 'Manages an organization cash, liquidity and funding.' })
  ),
  o('Accounting and Auditing', { s: 'accounting', z: '会计与审计', d: 'Occupations recording and verifying financial information.' },
    o('Accountant', { z: '会计师', d: 'Prepares and examines financial records.' },
      o('Management Accountant', { d: 'Provides internal financial analysis for decision-making.' }),
      o('Cost Accountant', { d: 'Tracks and analyzes production and operating costs.' })
    ),
    o('Certified Public Accountant', { d: 'Provides auditing, tax and accounting services to the public.' }),
    o('Auditor', { d: 'Examines financial records for accuracy and compliance.' },
      o('Internal Auditor', { d: 'Evaluates internal controls and risk management.' }),
      o('External Auditor', { d: 'Independently audits financial statements.' }),
      o('Forensic Accountant', { d: 'Investigates financial fraud and disputes.' })
    ),
    o('Tax Accountant', { d: 'Prepares tax returns and advises on tax planning.' }),
    o('Bookkeeper', { d: 'Records day-to-day financial transactions.' }),
    o('Payroll Specialist', { d: 'Processes employee wages, benefits and deductions.' })
  ),
  o('Human Resources', { s: 'hr', z: '人力资源', d: 'Occupations managing people in organizations.' },
    o('Human Resources Manager', { d: 'Oversees hiring, development and employee relations.' },
      o('Compensation and Benefits Specialist', { s: 'comp_benefits', d: 'Designs pay and benefits programs.' }),
      o('Labor Relations Specialist', { d: 'Manages relations with unions and labor agreements.' })
    ),
    o('Recruiter', { d: 'Finds and hires candidates for open positions.' },
      o('Technical Recruiter', { d: 'Recruits for technical and engineering roles.' })
    ),
    o('Human Resources Generalist', { d: 'Handles day-to-day HR functions.' }),
    o('Training and Development Specialist', { d: 'Designs and delivers employee training programs.' })
  ),
  o('Marketing and Sales Management', { s: 'marketing_sales', d: 'Occupations planning marketing and directing sales.' },
    o('Marketing Manager', { d: 'Plans and executes marketing campaigns.' },
      o('Brand Manager', { d: 'Manages a brand identity and positioning.' }),
      o('Product Marketing Manager', { d: 'Leads go-to-market strategy for products.' })
    ),
    o('Marketing Analyst', { d: 'Analyzes market data to guide marketing decisions.' }),
    o('Market Research Analyst', { d: 'Studies markets and consumer behavior.' }),
    o('Sales Manager', { d: 'Leads a sales team and sales strategy.' },
      o('Account Manager', { d: 'Manages relationships with key clients.' })
    ),
    o('Digital Marketing Manager', { d: 'Plans online marketing across digital channels.' },
      o('Search Engine Optimization Specialist', { s: 'seo_specialist', d: 'Improves website visibility in search engines.' }),
      o('Social Media Manager', { d: 'Manages brand presence on social platforms.' })
    )
  ),
  o('Consulting and Analysis', { s: 'consulting', d: 'Occupations advising organizations on strategy and operations.' },
    o('Management Consultant', { d: 'Advises organizations on strategy and performance.' },
      o('Strategy Consultant', { d: 'Advises on corporate and competitive strategy.' }),
      o('Operations Consultant', { d: 'Improves operational efficiency and processes.' })
    ),
    o('Business Analyst', { d: 'Analyzes business processes and requirements.' },
      o('Systems Analyst', { d: 'Bridges business needs and IT solutions.' })
    ),
    o('Management Accountant', { d: 'Supports internal decisions with financial analysis.' })
  ),
  o('Real Estate and Property', { s: 'real_estate', z: '房地产', d: 'Occupations dealing with property development and management.' },
    o('Real Estate Broker', { d: 'Facilitates and manages real estate transactions.' },
      o('Real Estate Agent', { d: 'Helps clients buy, sell and rent properties.' })
    ),
    o('Property Manager', { d: 'Manages the operation and leasing of properties.' },
      o('Facilities Manager', { d: 'Manages building services and maintenance.' })
    ),
    o('Real Estate Appraiser', { d: 'Estimates the value of properties.' }),
    o('Real Estate Developer', { d: 'Plans and finances property development projects.' })
  ),
  o('Procurement and Supply Chain', { s: 'procurement', d: 'Occupations sourcing goods and managing supply chains.' },
    o('Procurement Manager', { d: 'Leads purchasing strategy and supplier relationships.' },
      o('Purchasing Agent', { d: 'Buys goods and services for an organization.' }),
      o('Sourcing Specialist', { d: 'Identifies and evaluates suppliers.' })
    ),
    o('Supply Chain Manager', { d: 'Coordinates the end-to-end flow of goods.' },
      o('Demand Planner', { d: 'Forecasts demand to plan inventory and production.' })
    ),
    o('Procurement Specialist', { d: 'Manages procurement processes and vendor contracts.' })
  )
);

// ---------- GOVERNMENT & PUBLIC SERVICE ----------
const government = o('Government and Public Service', { s: 'government', z: '政府与公共服务', d: 'Occupations serving the public through government and civic institutions.' },
  o('Elected and Political Leadership', { s: 'political_leadership', d: 'Occupations elected or appointed to lead and represent.' },
    o('Legislator', { z: '议员', d: 'Elected official who makes laws.' },
      o('Member of Parliament', { d: 'Elected representative in a parliamentary system.' }),
      o('Senator', { d: 'Member of an upper legislative chamber.' })
    ),
    o('Mayor', { d: 'Elected head of a city or municipality.' }),
    o('Diplomat', { z: '外交官', d: 'Represents a nation in international relations.' },
      o('Ambassador', { d: 'Heads a diplomatic mission in a foreign country.' }),
      o('Consular Officer', { d: 'Assists citizens abroad and issues visas.' })
    ),
    o('Policy Advisor', { d: 'Advises officials on policy development and analysis.' }),
    o('Public Policy Analyst', { d: 'Researches and evaluates policy options and outcomes.' })
  ),
  o('Public Administration', { z: '公共行政', d: 'Occupations administering government programs and services.' },
    o('Civil Servant', { d: 'Works in the administrative service of government.' }),
    o('Program Administrator', { d: 'Manages public programs and their delivery.' }),
    o('Budget Analyst', { d: 'Develops and analyzes government budgets.' }),
    o('Urban Planner', { z: '城市规划师', d: 'Plans land use and development in cities and regions.' },
      o('Regional Planner', { d: 'Plans development across metropolitan and regional areas.' }),
      o('Transportation Planner', { d: 'Plans transportation networks and mobility systems.' })
    ),
    o('City Manager', { d: 'Runs the day-to-day administration of a municipality.' }),
    o('Public Affairs Officer', { d: 'Manages communication between government and the public.' })
  ),
  o('Public Safety and Emergency Services', { s: 'public_safety', z: '公共安全与应急', d: 'Occupations protecting the public and responding to emergencies.' },
    o('Police Officer', { z: '警察', d: 'Enforces laws and maintains public order.' },
      o('Detective', { d: 'Investigates crimes and gathers evidence.' }),
      o('Crime Scene Investigator', { d: 'Collects and analyzes physical evidence at crime scenes.' })
    ),
    o('Sheriff', { d: 'Elected law enforcement officer for a county.' }),
    o('Firefighter', { z: '消防员', d: 'Responds to fires and emergencies and rescues people.' },
      o('Fire Inspector', { d: 'Inspects buildings for fire safety compliance.' }),
      o('Fire Investigator', { d: 'Determines the origin and cause of fires.' })
    ),
    o('Emergency Dispatcher', { d: 'Receives emergency calls and coordinates response units.' }),
    o('Correctional Officer', { d: 'Supervises individuals in prisons and jails.' }),
    o('Probation Officer', { d: 'Supervises offenders serving community sentences.' }),
    o('Parole Officer', { d: 'Supervises released prisoners during parole.' }),
    o('Border Patrol Agent', { d: 'Enforces border security and immigration law.' }),
    o('Park Ranger', { d: 'Protects parks and enforces regulations in natural areas.' })
  ),
  o('Regulation, Inspection and Customs', { s: 'regulation', d: 'Occupations enforcing standards and inspecting compliance.' },
    o('Building Inspector', { d: 'Inspects construction for code compliance.' },
      o('Health Inspector', { d: 'Inspects facilities for health and sanitation standards.' }),
      o('Food Safety Inspector', { d: 'Inspects food production and service for safety.' })
    ),
    o('Customs Officer', { d: 'Enforces import, export and border regulations.' }),
    o('Tax Inspector', { d: 'Examines tax returns and investigates evasion.' })
  ),
  o('Civilian Intelligence and Security', { s: 'intelligence', d: 'Occupations gathering and analyzing security information.' },
    o('Intelligence Analyst', { d: 'Analyzes information to support security decisions.' }),
    o('Counterintelligence Officer', { d: 'Identifies and counters espionage and threats.' })
  )
);

// ---------- MILITARY & DEFENSE ----------
const military = o('Military and Defense', { s: 'military', z: '军事与国防', d: 'Occupations serving in armed forces and national defense.' },
  o('Commissioned Officers', { s: 'officers', z: '军官', d: 'Leaders who command military units.' },
    o('Infantry Officer', { d: 'Commands ground combat troops.' }),
    o('Artillery Officer', { d: 'Commands artillery and indirect fire units.' }),
    o('Naval Officer', { d: 'Commands ships and naval operations.' }),
    o('Air Force Officer', { d: 'Leads air operations and units.' }),
    o('Intelligence Officer', { d: 'Leads military intelligence collection and analysis.' }),
    o('Logistics Officer', { d: 'Plans and manages military supply and movement.' })
  ),
  o('Non-Commissioned Officers', { s: 'nco', d: 'Experienced enlisted leaders who supervise soldiers.' },
    o('Sergeant', { d: 'Leads and supervises enlisted personnel.' },
      o('Drill Sergeant', { d: 'Trains new recruits in basic military skills.' })
    ),
    o('Warrant Officer', { d: 'Technical specialist and leader between enlisted and commissioned ranks.' })
  ),
  o('Enlisted Personnel', { s: 'enlisted', d: 'Service members who carry out military operations.' },
    o('Infantry Soldier', { d: 'Fights on foot in ground combat.' },
      o('Cavalry Scout', { d: 'Conducts reconnaissance and surveillance.' })
    ),
    o('Artillery Specialist', { d: 'Operates and maintains artillery weapons.' }),
    o('Armor Crewman', { d: 'Operates tanks and armored vehicles.' }),
    o('Combat Engineer', { d: 'Builds and clears obstacles and fortifications.' }),
    o('Sailor', { d: 'Serves aboard naval vessels.' },
      o('Submariner', { d: 'Serves aboard submarines.' })
    ),
    o('Airman', { d: 'Serves in the air force in operational support roles.' })
  ),
  o('Military Aviation', { s: 'aviation', d: 'Occupations operating military aircraft.' },
    o('Military Pilot', { d: 'Flies military aircraft in operations.' },
      o('Fighter Pilot', { d: 'Flies combat aircraft in air-to-air and strike missions.' }),
      o('Helicopter Pilot', { d: 'Flies military helicopters for transport and attack.' }),
      o('Transport Pilot', { d: 'Flies cargo and troop transport aircraft.' })
    ),
    o('Weapon Systems Officer', { d: 'Operates weapons and sensors in multi-crew aircraft.' }),
    o('Unmanned Aerial Vehicle Operator', { a: ['Drone Pilot'], s: 'drone_operator', d: 'Operates remotely piloted aircraft.' })
  ),
  o('Special Operations', { s: 'special_ops', d: 'Occupations conducting specialized high-risk missions.' },
    o('Special Operations Operator', { d: 'Conducts unconventional warfare and counterterrorism.' }),
    o('Sniper', { d: 'Engages targets with precision rifle fire from concealed positions.' })
  ),
  o('Combat and Operational Support', { s: 'combat_support', d: 'Occupations supporting combat operations.' },
    o('Combat Medic', { d: 'Provides emergency medical care on the battlefield.' }),
    o('Military Police', { d: 'Enforces discipline and provides security in the armed forces.' }),
    o('Explosive Ordnance Disposal Technician', { a: ['Bomb Disposal Specialist'], s: 'eod_technician', d: 'Disarms and disposes of explosive devices.' }),
    o('Signals Specialist', { d: 'Operates military communications systems.' }),
    o('Military Intelligence Analyst', { d: 'Analyzes intelligence to support military operations.' }),
    o('Military Logistics Specialist', { d: 'Manages supply, transport and equipment for forces.' }),
    o('Military Engineer', { d: 'Applies engineering to military construction and operations.' })
  )
);

// ---------- EDUCATION ----------
const education = o('Education', { s: 'education', z: '教育', d: 'Occupations teaching, training and supporting learning.' },
  o('School Teaching', { s: 'teaching', z: '教学', d: 'Occupations teaching in schools.' },
    o('Early Childhood Educator', { d: 'Teaches and cares for young children.' },
      o('Kindergarten Teacher', { d: 'Teaches children in kindergarten.' }),
      o('Preschool Teacher', { d: 'Teaches children before compulsory schooling.' })
    ),
    o('Elementary School Teacher', { d: 'Teaches multiple subjects to primary school children.' }),
    o('Middle School Teacher', { d: 'Teaches subject areas to early adolescents.' },
      o('Mathematics Teacher', { d: 'Teaches mathematics at school level.' }),
      o('Science Teacher', { d: 'Teaches science subjects at school level.' }),
      o('English Teacher', { d: 'Teaches English language and literature.' }),
      o('History Teacher', { d: 'Teaches history and social studies.' })
    ),
    o('Secondary School Teacher', { a: ['High School Teacher'], d: 'Teaches specialized subjects to secondary students.' }),
    o('Special Education Teacher', { d: 'Teaches students with disabilities and special needs.' },
      o('Learning Support Teacher', { d: 'Supports students with learning difficulties.' })
    ),
    o('English as a Second Language Teacher', { a: ['ESL Teacher'], s: 'esl_teacher', d: 'Teaches English to non-native speakers.' }),
    o('Adult Education Teacher', { d: 'Teaches adult learners in continuing education.' }),
    o('Vocational Teacher', { d: 'Teaches practical job skills in a trade.' })
  ),
  o('Higher Education', { z: '高等教育', d: 'Occupations teaching and researching in universities.' },
    o('Professor', { z: '教授', d: 'Teaches and conducts research at a university.' },
      o('Assistant Professor', { d: 'Early-career university faculty on tenure track.' }),
      o('Associate Professor', { d: 'Mid-career university faculty member.' }),
      o('Full Professor', { d: 'Senior university faculty member and researcher.' })
    ),
    o('Lecturer', { d: 'Teaches university courses.' },
      o('Adjunct Instructor', { d: 'Teaches courses on a part-time contract.' })
    ),
    o('Graduate Teaching Assistant', { d: 'Supports university teaching while pursuing a degree.' })
  ),
  o('Education Administration', { s: 'admin', z: '教育行政', d: 'Occupations leading and administering educational institutions.' },
    o('School Principal', { d: 'Leads and manages a school.' },
      o('Vice Principal', { a: ['Assistant Principal'], d: 'Supports the principal in school management.' })
    ),
    o('School Superintendent', { d: 'Leads a school district.' }),
    o('Academic Dean', { d: 'Oversees a college or academic division.' }),
    o('Registrar', { d: 'Manages student records and enrollment.' }),
    o('Admissions Officer', { d: 'Recruits and evaluates applicants for enrollment.' })
  ),
  o('Student Support Services', { s: 'student_support', d: 'Occupations supporting student well-being and success.' },
    o('School Counselor', { d: 'Supports students academic and personal development.' },
      o('College Counselor', { d: 'Guides students through college applications and choices.' })
    ),
    o('School Psychologist', { d: 'Assesses and supports student mental health and learning.' }),
    o('Academic Advisor', { d: 'Guides students in course selection and academic goals.' }),
    o('Librarian', { z: '图书管理员', d: 'Manages library collections and helps users find information.' },
      o('School Librarian', { d: 'Runs a school library and supports student research.' }),
      o('Academic Librarian', { d: 'Supports research and teaching in university libraries.' })
    ),
    o('Tutor', { d: 'Provides individualized instruction outside the classroom.' })
  ),
  o('Instructional Design and Development', { s: 'instructional_design', d: 'Occupations designing curricula and learning experiences.' },
    o('Instructional Designer', { d: 'Designs courses and learning materials.' },
      o('Curriculum Developer', { d: 'Develops educational curricula and standards.' })
    ),
    o('Educational Technology Specialist', { d: 'Integrates technology into teaching and learning.' }),
    o('Corporate Trainer', { d: 'Delivers training programs for employees.' }),
    o('Education Researcher', { d: 'Studies teaching methods and educational outcomes.' })
  ),
  o('Childcare', { z: '儿童保育', d: 'Occupations caring for children outside formal schooling.' },
    o('Childcare Worker', { d: 'Cares for children in daycare settings.' }),
    o('Nanny', { d: 'Provides in-home childcare.' })
  )
);

export default [ law, business, government, military, education ];
