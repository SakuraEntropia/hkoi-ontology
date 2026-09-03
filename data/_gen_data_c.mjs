import { o } from './_gen_lib.mjs';

// ---------- ARTS & DESIGN ----------
const arts = o('Arts and Design', { s: 'arts', z: '艺术与设计', d: 'Occupations creating visual, performing and applied art and design.' },
  o('Visual Arts', { z: '视觉艺术', d: 'Occupations creating visual works of art.' },
    o('Painter', { z: '画家', d: 'Creates artworks using paint on surfaces.' },
      o('Portrait Painter', { d: 'Paints likenesses of people.' }),
      o('Muralist', { d: 'Paints large-scale works on walls and surfaces.' }),
      o('Miniature Painter', { g: false, d: 'Paints detailed miniature artworks in traditional styles.' })
    ),
    o('Sculptor', { z: '雕塑家', d: 'Creates three-dimensional artworks from materials.' },
      o('Stone Carver', { d: 'Carves sculpture from stone.' }),
      o('Bronze Sculptor', { d: 'Creates sculpture cast in bronze.' })
    ),
    o('Illustrator', { z: '插画师', d: 'Creates images to accompany or convey ideas.' },
      o('Childrens Book Illustrator', { s: 'childrens_illustrator', d: 'Illustrates books for children.' }),
      o('Medical Illustrator', { d: 'Creates accurate images of anatomy and medical subjects.' }),
      o('Technical Illustrator', { d: 'Draws diagrams and visuals for technical documentation.' })
    ),
    o('Printmaker', { d: 'Creates art by printing images from plates or screens.' },
      o('Screen Printer', { d: 'Prints images by forcing ink through stenciled screens.' })
    ),
    o('Fine Art Photographer', { d: 'Creates photographs as works of art.' },
      o('Portrait Photographer', { d: 'Photographs people in studio or natural settings.' }),
      o('Documentary Photographer', { d: 'Documents events and social realities through photography.' })
    ),
    o('Ceramic Artist', { a: ['Potter'], z: '陶艺家', d: 'Creates artworks and objects from clay.' },
      o('Studio Potter', { d: 'Produces functional and sculptural pottery.' })
    ),
    o('Glass Artist', { d: 'Creates artworks from glass.' },
      o('Glassblower', { d: 'Shapes molten glass by blowing and forming.' })
    ),
    o('Textile Artist', { d: 'Creates art using fibers and fabrics.' },
      o('Weaver', { d: 'Creates textiles by interlacing threads on a loom.' }),
      o('Quilter', { d: 'Creates layered stitched textile artworks.' })
    ),
    o('Calligrapher', { z: '书法家', d: 'Creates decorative lettering and handwriting.' },
      o('Chinese Calligrapher', { z: '书法家', g: false, d: 'Practices the traditional Chinese art of brush calligraphy.' }),
      o('Illuminator', { d: 'Decorates manuscripts with gold and ornament.' })
    ),
    o('Tattoo Artist', { d: 'Applies permanent decorative designs to skin.' }),
    o('Digital Artist', { d: 'Creates artwork using digital tools and software.' },
      o('Concept Artist', { d: 'Designs visual concepts for games, film and products.' }),
      o('3D Modeler', { d: 'Builds three-dimensional digital models.' })
    ),
    o('Comic Artist', { d: 'Draws sequential art for comics and graphic novels.' },
      o('Manga Artist', { a: ['Mangaka'], g: false, d: 'Creates Japanese-style comics.' })
    ),
    o('Street Artist', { d: 'Creates art in public spaces, often illegally or informally.' })
  ),
  o('Design', { z: '设计', d: 'Occupations designing products, spaces and visual communication.' },
    o('Graphic Designer', { z: '平面设计师', d: 'Creates visual content for print and digital media.' },
      o('Logo Designer', { d: 'Designs logos and wordmarks for brands.' }),
      o('Brand Identity Designer', { d: 'Develops the visual identity of a brand.' })
    ),
    o('Industrial Designer', { a: ['Product Designer'], d: 'Designs manufactured products for usability and appeal.' },
      o('Automotive Designer', { d: 'Designs the appearance of vehicles.' }),
      o('Consumer Product Designer', { d: 'Designs everyday consumer goods.' })
    ),
    o('Interior Designer', { z: '室内设计师', d: 'Designs functional and attractive interior spaces.' },
      o('Lighting Designer', { d: 'Designs lighting for spaces and performance.' })
    ),
    o('Fashion Designer', { z: '时装设计师', d: 'Designs clothing and accessories.' },
      o('Costume Designer', { d: 'Designs costumes for film, theater and performance.' }),
      o('Textile Designer', { d: 'Designs patterns and fabrics.' })
    ),
    o('Jewelry Designer', { d: 'Designs jewelry and accessories.' },
      o('Bench Jeweler', { d: 'Fabricates and repairs jewelry by hand.' })
    ),
    o('Furniture Designer', { d: 'Designs furniture for production or custom making.' }),
    o('Set Designer', { d: 'Designs scenery and environments for stage and screen.' },
      o('Exhibition Designer', { d: 'Designs displays for museums and exhibitions.' })
    ),
    o('Landscape Architect', { z: '景观设计师', d: 'Designs outdoor spaces and landscapes.' }),
    o('Game Designer', { z: '游戏设计师', d: 'Designs the rules, systems and experience of games.' },
      o('Level Designer', { d: 'Designs game levels and environments.' })
    ),
    o('User Interface Designer', { d: 'Designs interfaces for digital products.' })
  ),
  o('Performing Arts', { z: '表演艺术', d: 'Occupations performing for live or recorded audiences.' },
    o('Actor', { z: '演员', d: 'Portrays characters in performance.' },
      o('Stage Actor', { d: 'Performs in live theater.' }),
      o('Film Actor', { d: 'Performs in films and television.' }),
      o('Voice Actor', { d: 'Provides voices for animation, games and dubbing.' })
    ),
    o('Dancer', { z: '舞者', d: 'Performs dance as art or entertainment.' },
      o('Ballet Dancer', { d: 'Performs classical ballet.' }),
      o('Contemporary Dancer', { d: 'Performs modern and contemporary dance.' }),
      o('Traditional Dancer', { g: false, d: 'Performs traditional cultural dance forms.' })
    ),
    o('Choreographer', { d: 'Creates and arranges dance movements.' }),
    o('Musician', { z: '音乐家', d: 'Performs or creates music.' },
      o('Composer', { z: '作曲家', d: 'Writes and arranges musical compositions.' }),
      o('Conductor', { d: 'Directs orchestras and musical ensembles.' }),
      o('Instrumentalist', { d: 'Performs music on an instrument.' },
        o('Pianist', { d: 'Performs on the piano.' }),
        o('Violinist', { d: 'Performs on the violin.' }),
        o('Cellist', { d: 'Performs on the cello.' }),
        o('Guitarist', { d: 'Performs on the guitar.' }),
        o('Drummer', { d: 'Performs on drums and percussion.' }),
        o('Flutist', { d: 'Performs on the flute.' })
      ),
      o('Singer', { a: ['Vocalist'], z: '歌手', d: 'Performs music with the voice.' },
        o('Opera Singer', { d: 'Performs in opera.' }),
        o('Choral Singer', { d: 'Sings in a choir.' })
      )
    ),
    o('Circus Performer', { d: 'Performs circus arts.' },
      o('Acrobat', { d: 'Performs acrobatic feats.' }),
      o('Juggler', { d: 'Performs juggling acts.' })
    ),
    o('Magician', { a: ['Illusionist'], d: 'Performs tricks and illusions for audiences.' }),
    o('Puppeteer', { d: 'Performs with puppets.' })
  ),
  o('Crafts and Traditional Arts', { s: 'crafts', z: '工艺与传统艺术', d: 'Occupations producing handmade and traditional crafts.' },
    o('Woodcarver', { d: 'Carves decorative and functional objects from wood.' }),
    o('Lacquer Artist', { g: false, d: 'Creates decorated objects using traditional lacquer techniques.' }),
    o('Ikebana Artist', { g: false, d: 'Practices the Japanese art of flower arrangement.' }),
    o('Origami Artist', { g: false, d: 'Creates sculptures by folding paper.' }),
    o('Kintsugi Artisan', { g: false, d: 'Repairs ceramics with gold using the Japanese kintsugi technique.' }),
    o('Indigenous Craftsperson', { g: false, d: 'Produces traditional crafts within an indigenous cultural tradition.' }),
    o('Batik Artist', { g: false, d: 'Creates textiles using wax-resist dyeing.' })
  ),
  o('Art Conservation and Curation', { s: 'conservation', d: 'Occupations preserving, restoring and presenting art.' },
    o('Art Conservator', { a: ['Art Restorer'], d: 'Preserves and restores artworks and artifacts.' },
      o('Paintings Conservator', { d: 'Restores and preserves painted artworks.' })
    ),
    o('Curator', { z: '策展人', d: 'Selects and interprets collections for museums and galleries.' },
      o('Museum Curator', { d: 'Manages and interprets museum collections.' })
    ),
    o('Art Dealer', { d: 'Buys and sells artworks.' }),
    o('Art Historian', { d: 'Researches and interprets the history of art.' })
  )
);

// ---------- MEDIA & ENTERTAINMENT ----------
const media = o('Media and Entertainment', { s: 'media', z: '媒体与娱乐', d: 'Occupations producing and distributing news, content and entertainment.' },
  o('Journalism', { z: '新闻', d: 'Occupations gathering and reporting news.' },
    o('Journalist', { z: '记者', d: 'Gathers and reports news and information.' },
      o('Reporter', { d: 'Covers and reports news stories.' }),
      o('Investigative Journalist', { d: 'Conducts in-depth investigations into wrongdoing.' }),
      o('Broadcast Journalist', { d: 'Reports news on television and radio.' }),
      o('Photojournalist', { d: 'Tells news stories through photography.' }),
      o('Data Journalist', { d: 'Analyzes data to uncover and report stories.' }),
      o('Sports Journalist', { d: 'Covers sports events and athletes.' }),
      o('Foreign Correspondent', { d: 'Reports news from abroad.' })
    ),
    o('Editor', { z: '编辑', d: 'Reviews and shapes written content for publication.' },
      o('Copy Editor', { d: 'Edits text for clarity, accuracy and style.' }),
      o('Managing Editor', { d: 'Oversees the editorial operations of a publication.' })
    ),
    o('News Anchor', { d: 'Presents news on television.' }),
    o('Columnist', { d: 'Writes regular opinion or commentary pieces.' }),
    o('Fact Checker', { s: 'fact_checker', d: 'Verifies the accuracy of reported information.' })
  ),
  o('Broadcasting', { z: '广播', d: 'Occupations producing and presenting radio and television.' },
    o('Radio Producer', { d: 'Produces radio programs and content.' }),
    o('Television Producer', { d: 'Oversees production of television programs.' },
      o('News Producer', { d: 'Produces news broadcasts.' })
    ),
    o('Radio Host', { d: 'Presents and hosts radio shows.' }),
    o('Broadcast Technician', { d: 'Operates and maintains broadcast equipment.' })
  ),
  o('Film and Television Production', { s: 'film_tv', z: '影视制作', d: 'Occupations making films and television.' },
    o('Film Director', { z: '电影导演', d: 'Directs the creative vision of a film.' },
      o('Television Director', { d: 'Directs television programs.' })
    ),
    o('Screenwriter', { d: 'Writes scripts for film and television.' }),
    o('Film Producer', { d: 'Oversees the production of a film from development to release.' },
      o('Line Producer', { d: 'Manages the day-to-day logistics of a production.' })
    ),
    o('Cinematographer', { a: ['Director of Photography'], d: 'Directs the camera and lighting of a film.' },
      o('Camera Operator', { d: 'Operates cameras during filming.' }),
      o('Gaffer', { d: 'Heads the electrical and lighting crew on a set.' }),
      o('Grip', { d: 'Sets up and supports camera and lighting equipment.' })
    ),
    o('Film Editor', { d: 'Assembles and edits footage into a finished film.' },
      o('Colorist', { d: 'Grades and adjusts the color of footage.' })
    ),
    o('Production Designer', { d: 'Designs the visual look of a production.' }),
    o('Casting Director', { d: 'Selects actors for roles.' }),
    o('Visual Effects Artist', { a: ['VFX Artist'], d: 'Creates computer-generated visual effects.' },
      o('Compositor', { d: 'Combines visual elements into final frames.' })
    ),
    o('Animator', { z: '动画师', d: 'Creates animated sequences and characters.' },
      o('2D Animator', { d: 'Animates in two dimensions.' }),
      o('3D Animator', { d: 'Animates three-dimensional characters and scenes.' }),
      o('Stop Motion Animator', { d: 'Animates physical objects frame by frame.' })
    ),
    o('Storyboard Artist', { d: 'Draws storyboards to plan shots and sequences.' }),
    o('Stunt Performer', { d: 'Performs stunts for film and television.' })
  ),
  o('Music and Audio Production', { s: 'audio', d: 'Occupations recording and producing sound and music.' },
    o('Music Producer', { d: 'Guides the creation and production of recorded music.' }),
    o('Recording Engineer', { d: 'Operates recording equipment in the studio.' },
      o('Mixing Engineer', { d: 'Blends recorded tracks into a final mix.' }),
      o('Mastering Engineer', { d: 'Prepares final mixes for distribution.' })
    ),
    o('Sound Designer', { d: 'Creates sound effects and audio environments.' },
      o('Foley Artist', { d: 'Creates sound effects using physical props.' })
    ),
    o('Live Sound Engineer', { d: 'Manages sound for live events and concerts.' }),
    o('Film Composer', { d: 'Composes music for films.' })
  ),
  o('Publishing and Writing', { s: 'publishing', z: '出版与写作', d: 'Occupations writing and producing published works.' },
    o('Author', { a: ['Writer'], z: '作家', d: 'Writes books and other long-form works.' },
      o('Novelist', { d: 'Writes fiction novels.' }),
      o('Poet', { d: 'Writes poetry.' }),
      o('Nonfiction Writer', { d: 'Writes factual books and articles.' })
    ),
    o('Ghostwriter', { d: 'Writes works credited to another person.' }),
    o('Technical Writer', { d: 'Writes technical documentation and manuals.' }),
    o('Copywriter', { d: 'Writes persuasive marketing and advertising copy.' },
      o('Content Writer', { d: 'Writes web and marketing content.' })
    ),
    o('Book Editor', { d: 'Develops and edits books for publication.' },
      o('Acquisitions Editor', { d: 'Evaluates and acquires manuscripts for publication.' })
    ),
    o('Literary Agent', { d: 'Represents authors and sells their work to publishers.' }),
    o('Translator', { z: '翻译', d: 'Converts written text between languages.' },
      o('Interpreter', { d: 'Converts spoken language in real time.' }),
      o('Localization Specialist', { d: 'Adapts products and content for local languages and cultures.' })
    ),
    o('Proofreader', { d: 'Checks text for errors before publication.' })
  ),
  o('Public Relations and Advertising', { s: 'pr_advertising', d: 'Occupations shaping public perception and promoting brands.' },
    o('Public Relations Specialist', { d: 'Manages an organization public image and media relations.' },
      o('Publicist', { d: 'Promotes clients and manages their publicity.' })
    ),
    o('Communications Director', { d: 'Leads an organization communications strategy.' }),
    o('Advertising Creative Director', { d: 'Leads the creative vision of advertising campaigns.' },
      o('Art Director', { d: 'Directs the visual style of campaigns and productions.' })
    ),
    o('Media Planner', { d: 'Plans where advertising should be placed to reach audiences.' }),
    o('Media Buyer', { d: 'Purchases advertising space and time.' })
  ),
  o('Entertainment and Talent', { s: 'entertainment', d: 'Occupations managing and performing in entertainment.' },
    o('Talent Agent', { d: 'Represents performers and negotiates work for them.' },
      o('Talent Manager', { d: 'Guides the careers of entertainers.' })
    ),
    o('Comedian', { d: 'Performs comedy for audiences.' }),
    o('Disc Jockey', { a: ['DJ'], d: 'Selects and plays music for audiences.' }),
    o('Content Creator', { d: 'Produces and publishes online video and media content.' },
      o('Streamer', { d: 'Broadcasts live gameplay or content online.' })
    ),
    o('Event Producer', { d: 'Plans and produces live events.' })
  )
);

// ---------- SPORTS & RECREATION ----------
const sports = o('Sports and Recreation', { s: 'sports', z: '体育与休闲', d: 'Occupations in competitive sport, coaching, officiating and recreation.' },
  o('Athletes', { z: '运动员', d: 'Occupations competing in sport.' },
    o('Team Sport Athlete', { d: 'Competes in team sports.' },
      o('Footballer', { a: ['Soccer Player'], d: 'Plays association football.' }),
      o('Basketball Player', { d: 'Plays basketball.' }),
      o('Baseball Player', { d: 'Plays baseball.' }),
      o('American Football Player', { d: 'Plays American football.' }),
      o('Ice Hockey Player', { d: 'Plays ice hockey.' }),
      o('Cricket Player', { d: 'Plays cricket.' }),
      o('Rugby Player', { d: 'Plays rugby.' }),
      o('Volleyball Player', { d: 'Plays volleyball.' })
    ),
    o('Individual Sport Athlete', { d: 'Competes in individual sports.' },
      o('Tennis Player', { d: 'Plays tennis.' }),
      o('Golfer', { d: 'Plays golf.' }),
      o('Swimmer', { d: 'Competes in swimming.' }),
      o('Track and Field Athlete', { s: 'track_athlete', d: 'Competes in athletics events.' },
        o('Sprinter', { d: 'Competes in short-distance running.' }),
        o('Marathon Runner', { d: 'Competes in long-distance road running.' })
      ),
      o('Boxer', { d: 'Competes in boxing.' }),
      o('Martial Artist', { d: 'Competes in martial arts.' },
        o('Judo Practitioner', { d: 'Competes in judo.' }),
        o('Karate Practitioner', { d: 'Competes in karate.' }),
        o('Wrestler', { d: 'Competes in wrestling.' })
      ),
      o('Gymnast', { d: 'Competes in gymnastics.' }),
      o('Cyclist', { d: 'Competes in cycling.' }),
      o('Weightlifter', { d: 'Competes in weightlifting.' }),
      o('Equestrian', { d: 'Competes on horseback.' }),
      o('Skier', { d: 'Competes in skiing.' })
    )
  ),
  o('Coaching', { z: '教练', d: 'Occupations training and directing athletes.' },
    o('Head Coach', { d: 'Leads a sports team and its strategy.' },
      o('Assistant Coach', { d: 'Supports the head coach in training and strategy.' })
    ),
    o('Strength and Conditioning Coach', { d: 'Trains athletes in physical conditioning.' }),
    o('Skills Coach', { d: 'Develops specific technical skills in athletes.' },
      o('Swimming Coach', { d: 'Trains competitive swimmers.' }),
      o('Tennis Coach', { d: 'Trains tennis players.' })
    )
  ),
  o('Sports Officiating', { s: 'officiating', d: 'Occupations enforcing rules in competition.' },
    o('Referee', { d: 'Enforces rules during sports matches.' },
      o('Umpire', { d: 'Officiates games such as baseball and cricket.' }),
      o('Match Judge', { d: 'Scores and judges sports such as boxing and gymnastics.' })
    ),
    o('Video Assistant Referee', { d: 'Reviews match incidents using video replay.' })
  ),
  o('Sports Management and Support', { s: 'sports_management', d: 'Occupations managing teams, athletes and events.' },
    o('Athletic Director', { d: 'Oversees sports programs at an institution.' }),
    o('Sports Agent', { d: 'Represents athletes and negotiates their contracts.' }),
    o('Sports Scout', { d: 'Identifies and evaluates athletic talent.' }),
    o('Sports Team Manager', { d: 'Manages the operations of a sports team.' })
  ),
  o('Fitness and Recreation', { s: 'fitness', z: '健身与休闲', d: 'Occupations leading fitness and recreational activities.' },
    o('Personal Trainer', { d: 'Designs and delivers individual fitness programs.' }),
    o('Group Fitness Instructor', { d: 'Leads group exercise classes.' },
      o('Yoga Instructor', { d: 'Teaches yoga practice.' }),
      o('Pilates Instructor', { d: 'Teaches Pilates exercise.' }),
      o('Aerobics Instructor', { d: 'Leads aerobic exercise classes.' })
    ),
    o('Recreation Worker', { d: 'Organizes and leads recreational activities.' },
      o('Camp Counselor', { d: 'Supervises and leads activities at camps.' })
    ),
    o('Outdoor Adventure Guide', { d: 'Guides outdoor recreational expeditions.' },
      o('Mountain Guide', { d: 'Guides climbs and treks in mountains.' }),
      o('Diving Instructor', { d: 'Teaches and guides scuba diving.' }),
      o('Ski Instructor', { d: 'Teaches skiing.' })
    ),
    o('Lifeguard', { d: 'Monitors swimmers and prevents aquatic accidents.' })
  )
);

// ---------- MANUFACTURING & TRADES ----------
const trades = o('Manufacturing and Trades', { s: 'trades', z: '制造与技工', d: 'Occupations producing, fabricating and repairing goods.' },
  o('Machining and Metalworking', { s: 'machining', z: '机加工与金属加工', d: 'Occupations shaping and joining metal.' },
    o('Machinist', { d: 'Operates machine tools to shape metal parts.' },
      o('CNC Machinist', { d: 'Programs and operates computer-numerical-control machines.' }),
      o('Tool and Die Maker', { s: 'tool_die_maker', d: 'Makes precision tools, dies and molds.' })
    ),
    o('Welder', { z: '焊工', d: 'Joins metal parts using heat and pressure.' },
      o('Pipe Welder', { d: 'Welds pipes for industrial and plumbing systems.' }),
      o('Underwater Welder', { d: 'Welds underwater structures.' })
    ),
    o('Sheet Metal Worker', { d: 'Fabricates and installs sheet metal products.' }),
    o('Boilermaker', { d: 'Builds and repairs boilers and large vessels.' }),
    o('Millwright', { d: 'Installs and maintains industrial machinery.' }),
    o('Metal Fabricator', { d: 'Cuts, bends and assembles metal components.' }),
    o('Foundry Worker', { d: 'Casts metal parts in foundries.' }),
    o('Blacksmith', { z: '铁匠', d: 'Forges iron and steel by heating and hammering.' },
      o('Bladesmith', { d: 'Forges knives and blades.' })
    )
  ),
  o('Woodworking', { z: '木工', d: 'Occupations crafting items from wood.' },
    o('Cabinetmaker', { d: 'Builds cabinets and fine furniture.' }),
    o('Woodworker', { d: 'Crafts objects and structures from wood.' },
      o('Furniture Finisher', { d: 'Applies finishes to wooden furniture.' }),
      o('Luthier', { d: 'Builds and repairs stringed musical instruments.' })
    ),
    o('Cooper', { d: 'Builds and repairs wooden barrels and casks.' })
  ),
  o('Assembly and Production', { s: 'assembly', d: 'Occupations assembling products and running production lines.' },
    o('Assembler', { d: 'Assembles components into finished products.' },
      o('Electronics Assembler', { d: 'Assembles electronic components and devices.' })
    ),
    o('Machine Operator', { d: 'Operates production machinery.' },
      o('CNC Operator', { d: 'Operates computer-numerical-control machines.' })
    ),
    o('Production Worker', { d: 'Performs tasks on a production line.' }),
    o('Quality Control Inspector', { d: 'Inspects products for defects and conformity.' })
  ),
  o('Printing and Graphics', { s: 'printing', d: 'Occupations in print production.' },
    o('Printing Press Operator', { d: 'Operates printing presses.' }),
    o('Prepress Technician', { d: 'Prepares digital files for printing.' }),
    o('Bookbinder', { d: 'Binds printed pages into books.' }),
    o('Screen Printer', { d: 'Prints designs using screen printing.' })
  ),
  o('Textile and Apparel Production', { s: 'textile_apparel', d: 'Occupations making clothing and textiles.' },
    o('Tailor', { z: '裁缝', d: 'Makes and alters garments to fit.' },
      o('Dressmaker', { d: 'Makes womens clothing to order.' })
    ),
    o('Pattern Maker', { d: 'Creates patterns for garment production.' }),
    o('Textile Machine Operator', { d: 'Operates machinery that produces fabric.' }),
    o('Upholsterer', { d: 'Covers furniture with fabric and padding.' }),
    o('Shoemaker', { a: ['Cobbler'], d: 'Makes and repairs shoes.' })
  ),
  o('Chemical and Process Operations', { s: 'process_ops', d: 'Occupations operating industrial chemical and process plants.' },
    o('Chemical Plant Operator', { d: 'Operates equipment that processes chemicals.' },
      o('Refinery Operator', { d: 'Operates petroleum refining units.' })
    ),
    o('Water Treatment Plant Operator', { d: 'Operates water and wastewater treatment facilities.' })
  ),
  o('Electrical and Appliance Repair', { s: 'repair', d: 'Occupations repairing equipment and appliances.' },
    o('Electronics Repair Technician', { d: 'Diagnoses and repairs electronic devices.' }),
    o('Appliance Repair Technician', { d: 'Repairs household appliances.' }),
    o('Small Engine Mechanic', { d: 'Repairs small engines such as lawnmowers.' })
  ),
  o('Specialty Craft Trades', { s: 'specialty_crafts', d: 'Occupations in specialized manual crafts.' },
    o('Gunsmith', { d: 'Builds, repairs and customizes firearms.' }),
    o('Watchmaker', { d: 'Repairs and services watches and clocks.' },
      o('Horologist', { d: 'Studies and restores clocks and timepieces.' })
    ),
    o('Leatherworker', { d: 'Crafts goods from leather.' }),
    o('Jeweler', { d: 'Fabricates and repairs jewelry.' }),
    o('Locksmith', { d: 'Installs and repairs locks and security hardware.' })
  ),
  o('Industrial Maintenance', { s: 'industrial_maintenance', d: 'Occupations maintaining industrial equipment and facilities.' },
    o('Industrial Maintenance Technician', { d: 'Maintains and repairs factory equipment.' }),
    o('HVAC Technician', { a: ['HVAC Mechanic'], d: 'Installs and services heating and cooling systems.' }),
    o('Plant Maintenance Supervisor', { d: 'Oversees maintenance operations in a facility.' })
  )
);

// ---------- CONSTRUCTION ----------
const construction = o('Construction', { s: 'construction', z: '建筑与施工', d: 'Occupations building and maintaining structures.' },
  o('Construction Trades', { z: '建筑工种', d: 'Skilled trades building structures.' },
    o('Carpenter', { z: '木匠', d: 'Builds and installs wooden structures and fittings.' },
      o('Framer', { d: 'Builds the structural framing of buildings.' }),
      o('Finish Carpenter', { d: 'Installs trim, doors and finished woodwork.' })
    ),
    o('Electrician', { z: '电工', d: 'Installs and maintains electrical systems.' },
      o('Residential Electrician', { d: 'Wires homes and residential buildings.' }),
      o('Lineman', { d: 'Installs and maintains overhead power lines.' })
    ),
    o('Plumber', { z: '水管工', d: 'Installs and repairs water and drainage systems.' },
      o('Pipefitter', { d: 'Installs high-pressure and industrial piping.' })
    ),
    o('Bricklayer', { a: ['Mason'], z: '砌砖工', d: 'Builds structures from brick and block.' },
      o('Stonemason', { d: 'Cuts and lays stone for structures.' })
    ),
    o('Concrete Finisher', { d: 'Pours and finishes concrete surfaces.' }),
    o('Roofer', { d: 'Installs and repairs roofs.' }),
    o('Glazier', { d: 'Installs glass in windows and structures.' }),
    o('Drywall Installer', { d: 'Installs drywall panels and finishes joints.' }),
    o('Painter', { z: '油漆工', d: 'Applies paint to interior and exterior surfaces.' }),
    o('Insulation Installer', { d: 'Installs insulation in buildings.' }),
    o('Flooring Installer', { d: 'Installs flooring materials.' },
      o('Tile Setter', { d: 'Installs ceramic and stone tile.' })
    ),
    o('Structural Ironworker', { d: 'Erects the steel framework of buildings and bridges.' }),
    o('Heavy Equipment Operator', { d: 'Operates construction machinery.' },
      o('Crane Operator', { d: 'Operates cranes to lift and move materials.' }),
      o('Excavator Operator', { d: 'Operates excavators for earthmoving.' }),
      o('Bulldozer Operator', { d: 'Operates bulldozers to move earth.' })
    ),
    o('Rigger', { d: 'Rig and move heavy loads on construction sites.' })
  ),
  o('Construction Management', { z: '施工管理', d: 'Occupations planning and managing construction.' },
    o('Construction Manager', { d: 'Oversees construction projects from planning to completion.' },
      o('Site Supervisor', { a: ['Foreman'], d: 'Supervises workers on a construction site.' })
    ),
    o('General Contractor', { d: 'Coordinates and manages construction work for clients.' }),
    o('Construction Estimator', { d: 'Calculates the cost of construction projects.' }),
    o('Construction Safety Officer', { d: 'Enforces safety standards on construction sites.' }),
    o('Construction Scheduler', { d: 'Plans the timeline and sequencing of construction work.' })
  ),
  o('Building Systems Installation', { s: 'building_systems', d: 'Occupations installing building systems and services.' },
    o('Elevator Installer', { d: 'Installs and repairs elevators and escalators.' }),
    o('Building Automation Technician', { d: 'Installs and maintains building control systems.' }),
    o('Solar Panel Installer', { d: 'Installs photovoltaic systems on buildings.' })
  )
);

export default [ arts, media, sports, trades, construction ];
