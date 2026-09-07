/**
 * Hemanathan University - Central Data Store & State Management
 * Founded & Owned by Hemanathan
 * Supports live reactive persistence via localStorage for the Admin Panel
 */

const STORAGE_KEYS = {
  BOARD: 'hu_board_members_v2',
  FACULTY: 'hu_faculty_members_v2',
  EVENTS: 'hu_events_v2',
  ANNOUNCEMENTS: 'hu_announcements_v2',
  APPLICATIONS: 'hu_applications_v2',
  SETTINGS: 'hu_settings_v2'
};

const DEFAULT_UNIVERSITY_INFO = {
  name: "Hemanathan University",
  shortName: "HU",
  founder: "Hemanathan",
  founderTitle: "Founder & Owner",
  chancellor: "Dr. Hemanathan",
  tagline: "Knowledge • Innovation • Excellence",
  latinMotto: "Scientia • Innovatio • Excellentia",
  established: "1998",
  location: "Hemanathan Knowledge Park, Rajiv Gandhi Salai (OMR), Chennai, Tamil Nadu - 600119, India",
  campusSize: "120 Acres Lush Eco-Green Campus",
  affiliation: "Recognized by University Grants Commission (UGC), AICTE Approved",
  accreditation: "NAAC 'A++' Accredited (Highest Grade • CGPA 3.84/4.00) • NIRF Top 30 Ranked",
  phone: "+91 (044) 2890-4000 / +91 (044) 2890-4001",
  admissionsPhone: "+91 (044) 2890-4100 / Toll Free: 1800-425-9900",
  email: "admissions@hemanathan.edu.in",
  infoEmail: "info@hemanathan.edu.in",
  founderOfficeEmail: "founder.office@hemanathan.edu.in",
  officeHours: "Monday - Saturday: 8:30 AM - 5:30 PM IST",
  stats: {
    yearsOfLegacy: "28+",
    studentsEnrolled: "16,500+",
    placementRate: "98.6%",
    patentsFiled: "140+",
    facultyRatio: "14:1",
    internationalMoUs: "65+",
    medianSalary: "₹ 12.8 LPA",
    highestSalary: "₹ 48.5 LPA"
  }
};

const DEFAULT_FOUNDER = {
  name: "Hemanathan",
  role: "Founder & Owner",
  organization: "Hemanathan University",
  image: "assets/images/chancellor_office.jpg",
  portrait: "assets/images/university_crest.jpg",
  quote: "Education is not only about gaining knowledge; it is about developing the confidence, skills, and vision to create a better future.",
  bio: "Hemanathan is an esteemed visionary educational entrepreneur, philanthropist, and institution builder whose transformative leadership established Hemanathan University as one of the country's most respected higher education centers. With an unyielding belief in youth potential and social progress, Hemanathan envisioned a world-class academic sanctuary where cutting-edge technology, ethical stewardship, and academic brilliance merge.",
  fullBio: `Founded under the visionary patronage of Hemanathan, the university has evolved from an ambitious multidisciplinary institute into a globally acclaimed beacon of higher learning. Under his continuous mentorship, Hemanathan University has pioneered integrated multidisciplinary education, established state-of-the-art incubation hubs, and fostered research alliances with leading global universities and Fortune 500 technology leaders.

Hemanathan believes passionately that quality education should be accessible, empowering, and deeply rooted in values of integrity, merit, and societal advancement. His generous philanthropic endowment funds thousands of merit-cum-need scholarships every year, ensuring that no talented mind is denied academic opportunity.`,
  achievements: [
    "Conferred with the National Exemplary Education Pioneer Award (2022)",
    "Spearheaded ₹150+ Crore endowment for advanced AI and sustainable engineering research",
    "Established 500+ corporate recruiting partnerships across India, US, Europe, and Asia",
    "Pioneered the 'Zero-Fee Talent Fellowship' supporting over 2,500 economically challenged scholars",
    "Ranked among Asia's Top 50 Visionary Educational Leaders"
  ],
  leadershipPillars: [
    { title: "Academic Rigor", desc: "Curricula co-designed with world-renowned scholars and industry leaders." },
    { title: "Disruptive Research", desc: "Interdisciplinary labs addressing global climate, AI, health, and economic challenges." },
    { title: "Ethical Leadership", desc: "Cultivating moral character, inclusive empathy, and societal responsibility." },
    { title: "Global Horizons", desc: "International dual degrees, student exchange, and world-class faculty." }
  ]
};

const DEFAULT_BOARD_MEMBERS = [
  {
    id: "bm-1",
    name: "Hemanathan",
    position: "Founder & Owner",
    department: "Executive Leadership & Board of Governors",
    qualification: "M.S., D.Litt. (Honoris Causa)",
    experience: "30+ Years in Educational Leadership",
    email: "founder.office@hemanathan.edu.in",
    photo: "assets/images/chancellor_office.jpg",
    bio: "Visionary founder and principal patron of Hemanathan University. Spearheads the institutional roadmap, capital infrastructure development, and international collaborations.",
    fullBio: "Hemanathan has steered the university since its inception, championing student-centric pedagogy, world-class physical and digital infrastructure, and global academic affiliations. Under his aegis, HU has emerged as a premier research hub attracting top academic talent and multinational recruiters.",
    researchInterests: "Educational Policy, Sustainable Campus Architecture, Philanthropic Governance",
    publications: "Author of 3 books on Modern Higher Education Management and Sustainable University Ecosystems.",
    achievements: "Honored with Lifetime Achievement in Higher Education (2024); Architect of the 120-acre Green Campus Masterplan.",
    featured: true
  },
  {
    id: "bm-2",
    name: "Dr. Hemanathan",
    position: "Chancellor",
    department: "University Governance & Senate",
    qualification: "Ph.D., D.Sc., F.I.E.",
    experience: "28 Years of Academic & Institutional Governance",
    email: "chancellor@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Distinguished academician presiding over university convocations, statutory council governance, and academic policy formulation.",
    fullBio: "Dr. Hemanathan brings extensive experience in higher education strategy, national regulatory compliance, and university accreditation. He guides the Senate in upholding high academic standards, institutional autonomy, and multidisciplinary excellence.",
    researchInterests: "Higher Education Accreditation Models, Cognitive Computing, Institutional Leadership",
    publications: "Published 45+ papers in international journals of academic administration and engineering education.",
    achievements: "Member of International Association of University Presidents; Keynote Speaker at World Education Summit.",
    featured: true
  },
  {
    id: "bm-3",
    name: "Dr. Priya Sharma",
    position: "Vice Chancellor",
    department: "Executive Academic Administration",
    qualification: "Ph.D. (Computer Science, IIT Delhi), Postdoc (MIT)",
    experience: "24 Years in Higher Education & Research",
    email: "vc@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Renowned computer scientist and administrator orchestrating academic programs, faculty development, and global research consortia.",
    fullBio: "Dr. Priya Sharma is an internationally recognized expert in artificial intelligence and academic innovation. Prior to joining HU, she served as Dean of Academics at premier institutes and led numerous government research initiatives in applied computing.",
    researchInterests: "Artificial Intelligence, Neural Networks, Women in STEM Leadership",
    publications: "Over 80 peer-reviewed journal papers, 4 US Patents, and 2 textbooks on Intelligent Systems.",
    achievements: "Recipient of National Woman Scientist Award; Fellow of IEEE and National Academy of Sciences.",
    featured: true
  },
  {
    id: "bm-4",
    name: "Dr. Rajesh Kumar",
    position: "Registrar",
    department: "Statutory Affairs & University Administration",
    qualification: "Ph.D., M.Phil., MBA",
    experience: "21 Years of Higher Education Administration",
    email: "registrar@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Custodian of university records, statutory compliances, legal liaison, and administrative synchronization across all faculties.",
    fullBio: "Dr. Rajesh Kumar oversees university regulatory compliance with UGC, AICTE, and NAAC. He directs academic admissions, student enrollment, statutory audits, and board secretariats with unwavering diligence.",
    researchInterests: "Educational Law, Organizational Behavior, Digital University Management",
    publications: "25 papers on administrative reform and digital student lifecycle governance.",
    achievements: "Pioneered paperless digital governance and blockchain verification for university transcripts at HU.",
    featured: false
  },
  {
    id: "bm-5",
    name: "Dr. Meena Devi",
    position: "Director of Academic Affairs",
    department: "Curriculum Design & Academic Planning",
    qualification: "Ph.D., M.Sc., M.Ed.",
    experience: "22 Years in Pedagogy & Outcome-Based Education",
    email: "academic.affairs@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Directs undergraduate and postgraduate curriculum modernization, continuous assessment, and accreditation benchmarks.",
    fullBio: "Dr. Meena Devi leads HU's Academic Council, spearheading the implementation of NEP-aligned Choice-Based Credit Systems (CBCS), interdisciplinary minors, and international credit transfers.",
    researchInterests: "Curriculum Engineering, Active Learning Methodologies, Pedagogical Quality Metrics",
    publications: "30+ research papers on outcome-based education and educational psychometrics.",
    achievements: "Lead Auditor for NBA Accreditation; National Academic Leadership Citation.",
    featured: false
  },
  {
    id: "bm-6",
    name: "Mr. Suresh Kumar",
    position: "Finance Director",
    department: "University Treasury & Fiscal Operations",
    qualification: "FCA, MBA (Finance), B.Com (Hons)",
    experience: "25 Years in Corporate & Institutional Finance",
    email: "finance.director@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Manages capital endowment, research grant treasury, infrastructure fiscal planning, and student scholarship portfolios.",
    fullBio: "Mr. Suresh Kumar ensures institutional fiscal sustainability and transparency. He has overseen massive capital investments in modern labs, digital classrooms, and smart hostel infrastructures with meticulous prudence.",
    researchInterests: "University Endowment Management, Educational Financial Modeling, Public-Private Partnerships",
    publications: "White papers on sustainable funding models for non-profit research universities.",
    achievements: "Gold Medalist Chartered Accountant; Successfully managed ₹500 Cr infrastructure capital plan.",
    featured: false
  },
  {
    id: "bm-7",
    name: "Dr. Karthik Raman",
    position: "Director of Research",
    department: "Research & Innovation Council",
    qualification: "Ph.D. (Materials Science, IISc Bangalore), Postdoc (Stanford)",
    experience: "19 Years in Deep-Tech Research & Technology Transfer",
    email: "research.director@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Spearheads sponsored research projects, patents, industry incubation, and doctoral fellowships across all departments.",
    fullBio: "Dr. Karthik Raman drives HU's innovation ecosystem, managing 12 specialized research centers and securing research grants exceeding ₹45 Crore from DST, SERB, and international funding agencies.",
    researchInterests: "Advanced Nanomaterials, Quantum Energy, Semiconductor Fabrication",
    publications: "110+ high-impact publications (h-index 38), 12 international patents filed.",
    achievements: "Shanti Swarup Bhatnagar Young Scientist Nominee; Chairman of HU Technology Business Incubator.",
    featured: false
  }
];

const DEFAULT_FACULTY_MEMBERS = [
  {
    id: "fac-1",
    name: "Dr. Anitha Raj",
    designation: "Professor & Head",
    department: "Computer Applications",
    qualification: "Ph.D., MCA, M.Tech",
    specialization: "Artificial Intelligence & Big Data Analytics",
    experience: "17 Years",
    email: "anitha.raj@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Head of the Department of Computer Applications. Renowned researcher in natural language processing and predictive intelligence.",
    fullBio: "Dr. Anitha Raj has mentored 14 Ph.D. scholars and spearheaded multiple AI-powered healthcare diagnostics projects funded by national research grants.",
    researchInterests: "Deep Learning, Medical Image Segmentation, Generative AI in Education",
    publications: "42 papers in IEEE & Springer journals; 2 granted patents in medical imaging AI.",
    achievements: "Best Faculty Award (2023); Principal Investigator for DST-SERB grant of ₹65 Lakhs.",
    featured: true
  },
  {
    id: "fac-2",
    name: "Dr. Vijay Kumar",
    designation: "Associate Professor",
    department: "Computer Science",
    qualification: "Ph.D., M.Tech (CSE), B.E.",
    specialization: "Machine Learning & Autonomous Systems",
    experience: "14 Years",
    email: "vijay.kumar@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Leads the Machine Learning and Autonomous Robotics laboratory at the Department of Computer Science.",
    fullBio: "Dr. Vijay Kumar has worked on self-driving vehicle perception models and edge AI architectures. He regularly consults for autonomous mobility startups.",
    researchInterests: "Edge Machine Learning, Computer Vision, Reinforcement Learning",
    publications: "35 international conference and journal publications; Author of 'Practical Machine Learning with PyTorch'.",
    achievements: "IEEE Senior Member; Winner of National Smart India Hackathon Mentor Award.",
    featured: true
  },
  {
    id: "fac-3",
    name: "Ms. Divya Sharma",
    designation: "Assistant Professor",
    department: "Commerce",
    qualification: "M.Com., M.Phil., UGC-NET (JRF)",
    specialization: "Corporate Accounting & FinTech Analytics",
    experience: "7 Years",
    email: "divya.sharma@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Expert in computerized accounting systems, financial statement analysis, and blockchain ledger applications.",
    fullBio: "Ms. Divya Sharma integrates practical Bloomberg terminal simulations and Python for financial analysis into the undergraduate commerce curriculum.",
    researchInterests: "FinTech Disruption, ESG Financial Reporting, Behavioral Finance",
    publications: "12 papers in national and international commerce journals.",
    achievements: "Junior Research Fellowship (JRF) holder; Excellent Teaching Recognition Award (2024).",
    featured: true
  },
  {
    id: "fac-4",
    name: "Dr. Anandhi Ramanathan",
    designation: "Professor & Head",
    department: "Computer Science",
    qualification: "Ph.D., M.E. (CSE), B.Tech",
    specialization: "Cloud Computing & Distributed Systems",
    experience: "19 Years",
    email: "anandhi.r@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Head of the Department of Computer Science, leading curriculum innovation in cyber-physical systems and cloud scalability.",
    fullBio: "Dr. Anandhi has consulted for major cloud service providers and established HU's High-Performance Computing Cluster.",
    researchInterests: "Kubernetes Orchestration, Serverless Architectures, Cloud Security",
    publications: "50+ peer-reviewed papers; 3 books on Cloud Infrastructure Engineering.",
    achievements: "AWS Certified Solutions Architect & Educator; IBM Faculty Excellence Award.",
    featured: false
  },
  {
    id: "fac-5",
    name: "Dr. Sanjay Mehta",
    designation: "Professor & Dean",
    department: "Management",
    qualification: "Ph.D., MBA (IIM Ahmedabad)",
    specialization: "Strategic Leadership & Global Marketing",
    experience: "21 Years",
    email: "sanjay.mehta@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Dean of the School of Management. Former corporate consultant turned academic leader.",
    fullBio: "Dr. Sanjay Mehta has trained over 5,000 corporate executives across Fortune 500 organizations and teaches case-method strategic leadership.",
    researchInterests: "Digital Brand Equity, International Market Strategy, Crisis Leadership",
    publications: "Over 40 case studies published in Harvard Business Publishing.",
    achievements: "Eminent Management Educator Award; Board Advisor to three public sector corporations.",
    featured: false
  },
  {
    id: "fac-6",
    name: "Dr. Pooja Menon",
    designation: "Associate Professor",
    department: "Management",
    qualification: "Ph.D., MBA (HRM)",
    specialization: "Organizational Behavior & Talent Analytics",
    experience: "12 Years",
    email: "pooja.menon@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Passionate educator exploring AI's transformative impact on talent acquisition, employee wellbeing, and organizational agility.",
    fullBio: "Dr. Pooja leads the HU Executive Leadership Cell and oversees global student internships for the MBA program.",
    researchInterests: "Remote Work Psychology, Generational Workplace Dynamics, Diversity & Inclusion",
    publications: "18 papers in Scopus-indexed management journals.",
    achievements: "SHRM Certified Senior Professional; Best Research Paper at AIMS International.",
    featured: false
  },
  {
    id: "fac-7",
    name: "Dr. S. Narayanan",
    designation: "Professor & Head",
    department: "Mathematics",
    qualification: "Ph.D. (IIT Madras), M.Sc.",
    specialization: "Discrete Mathematics & Cryptographic Algorithms",
    experience: "23 Years",
    email: "s.narayanan@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Head of the Department of Mathematics. Celebrated researcher in post-quantum cryptography and algebraic graph theory.",
    fullBio: "Dr. Narayanan bridges pure mathematical theories with modern cybersecurity algorithms, authoring foundational textbooks used nationwide.",
    researchInterests: "Post-Quantum Cryptography, Graph Neural Networks, Number Theory",
    publications: "60+ international research papers, 3 monographs in Applied Discrete Mathematics.",
    achievements: "Ramanujan Mathematical Society Fellow; Outstanding Research Citation (2022).",
    featured: false
  },
  {
    id: "fac-8",
    name: "Dr. Kavitha Sundar",
    designation: "Associate Professor",
    department: "Mathematics",
    qualification: "Ph.D., M.Sc., B.Ed.",
    specialization: "Applied Statistics & Operations Research",
    experience: "13 Years",
    email: "kavitha.s@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Specializes in stochastic modeling, statistical optimization, and data-driven supply chain decision engines.",
    fullBio: "Dr. Kavitha teaches engineering and business statistics, mentoring interdisciplinary student research projects in big data math.",
    researchInterests: "Stochastic Processes, Monte Carlo Simulation, Bayesian Data Analysis",
    publications: "22 papers in top applied mathematics journals.",
    achievements: "Elected Member of Indian Society for Probability and Statistics.",
    featured: false
  },
  {
    id: "fac-9",
    name: "Dr. R. Chandrasekhar",
    designation: "Professor & Head",
    department: "Physics",
    qualification: "Ph.D. (IISc Bangalore), M.Sc.",
    specialization: "Quantum Optics & Condensed Matter Physics",
    experience: "22 Years",
    email: "chandrasekhar.r@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Head of the Department of Physics. Pioneering researcher in solid-state semiconductors and quantum sensor materials.",
    fullBio: "Dr. Chandrasekhar directs the Advanced Materials Characterization Lab with funding from national scientific councils.",
    researchInterests: "Photonic Crystals, Quantum Spintronics, 2D Nanomaterials",
    publications: "75+ international publications in Physical Review and Nature Materials.",
    achievements: "INSA Young Scientist Medalist; Regular visiting scientist at CERN and Max Planck Institute.",
    featured: false
  },
  {
    id: "fac-10",
    name: "Dr. Shalini Mukherjee",
    designation: "Assistant Professor",
    department: "Physics",
    qualification: "Ph.D., M.Sc.",
    specialization: "Nanotechnology & Solar Energy Harvesting",
    experience: "9 Years",
    email: "shalini.m@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Researcher focused on perovskite solar cells, green energy storage devices, and carbon nanomaterials.",
    fullBio: "Dr. Shalini works closely with industry partners to develop flexible, high-efficiency solar films for clean smart campuses.",
    researchInterests: "Perovskite Photovoltaics, Supercapacitors, Green Energy Harvesting",
    publications: "20 papers in ACS and RSC journals; 1 commercial patent for nanomaterial coating.",
    achievements: "DST INSPIRE Faculty Fellow; Best Poster Award at International Conference on Nanoscience.",
    featured: false
  },
  {
    id: "fac-11",
    name: "Dr. Elizabeth Thomas",
    designation: "Professor & Head",
    department: "English",
    qualification: "Ph.D., MA (English), PGCTE",
    specialization: "Comparative Literature & Executive Communication",
    experience: "18 Years",
    email: "elizabeth.thomas@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Head of the Department of English and Director of the University Center for Professional Language Excellence.",
    fullBio: "Dr. Elizabeth trains students in corporate interpersonal communication, cross-cultural rhetoric, and literary discourse.",
    researchInterests: "Post-Colonial Literature, Technical Writing, Digital Humanities",
    publications: "28 papers, 2 published poetry anthologies, and 1 textbook on Professional Rhetoric.",
    achievements: "Cambridge English Certified Assessor; National Humanities Leadership Award.",
    featured: false
  },
  {
    id: "fac-12",
    name: "Dr. Arun George",
    designation: "Assistant Professor",
    department: "English",
    qualification: "Ph.D., MA, NET-JRF",
    specialization: "Applied Linguistics & Academic Writing",
    experience: "8 Years",
    email: "arun.george@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Specializes in computational linguistics, English for Academic Purposes (EAP), and speech communication pedagogy.",
    fullBio: "Dr. Arun leads the University Debate Guild and oversees English language proficiency modules for international students.",
    researchInterests: "Sociolinguistics, Corpus Linguistics, Discourse Analysis",
    publications: "14 articles in international linguistics journals.",
    achievements: "Chief Adjudicator at All-India Inter-University Parliamentary Debate (2024).",
    featured: false
  },
  {
    id: "fac-13",
    name: "Dr. P. Balasubramanian",
    designation: "Professor & Head",
    department: "Commerce",
    qualification: "Ph.D., M.Com., FCMA, FCS",
    specialization: "Corporate Taxation & Investment Banking",
    experience: "24 Years",
    email: "bala.p@hemanathan.edu.in",
    photo: "assets/images/university_crest.jpg",
    bio: "Head of Department of Commerce with extensive expertise in corporate restructuring, capital markets, and international taxation.",
    fullBio: "Dr. Balasubramanian mentors students for CA, CMA, and CS certifications and consults for leading capital investment firms.",
    researchInterests: "International Tax Treaties, Corporate Mergers & Acquisitions, Financial Derivatives",
    publications: "45+ research papers in financial journals; Author of 4 university standard reference texts.",
    achievements: "Fellow of the Institute of Cost Accountants of India; Lifetime Commerce Educator Citation.",
    featured: false
  }
];

const DEFAULT_DEPARTMENTS = [
  {
    id: "dept-cs",
    name: "Department of Computer Science",
    slug: "computer-science",
    icon: "laptop-code",
    image: "assets/images/ai_research_lab.jpg",
    hod: "Dr. Anandhi Ramanathan, Ph.D.",
    facultyCount: 28,
    studentCount: 1450,
    programs: ["B.Sc Computer Science", "M.Sc Computer Science", "Ph.D. in Computer Science"],
    description: "Equipping students with deep competencies in algorithms, distributed computing, cloud architectures, cybersecurity, and cutting-edge software engineering paradigms.",
    labs: ["High Performance Computing Lab", "Cloud Virtualization Lab", "Cybersecurity & Cryptography Lab"],
    featured: true
  },
  {
    id: "dept-ca",
    name: "Department of Computer Applications",
    slug: "computer-applications",
    icon: "code-branch",
    image: "assets/images/ai_research_lab.jpg",
    hod: "Dr. Anitha Raj, Ph.D.",
    facultyCount: 24,
    studentCount: 1200,
    programs: ["BCA (Bachelor of Computer Applications)", "MCA (Master of Computer Applications)", "Ph.D."],
    description: "Fostering industry-ready application developers, AI engineers, and full-stack software architects through experiential software development and live client sprints.",
    labs: ["Artificial Intelligence & Big Data Lab", "Mobile & Web App Development Studio", "Software Testing & DevOps Suite"],
    featured: true
  },
  {
    id: "dept-comm",
    name: "Department of Commerce",
    slug: "commerce",
    icon: "chart-line",
    image: "assets/images/digital_library.jpg",
    hod: "Dr. P. Balasubramanian, Ph.D.",
    facultyCount: 20,
    studentCount: 1350,
    programs: ["B.Com (General / Corporate Secretaryship / FinTech)", "M.Com (Accounting & Finance)", "Ph.D."],
    description: "Preparing tomorrow's financial strategists, certified accountants, and investment consultants with modern financial analytics, corporate taxation, and business forensics.",
    labs: ["Bloomberg Terminal Financial Lab", "Computerized Tally & SAP Accounting Center", "Commerce Incubation Cell"],
    featured: true
  },
  {
    id: "dept-mgmt",
    name: "Department of Management",
    slug: "management",
    icon: "briefcase",
    image: "assets/images/campus_auditorium.jpg",
    hod: "Dr. Sanjay Mehta, Ph.D.",
    facultyCount: 26,
    studentCount: 1100,
    programs: ["BBA (Bachelor of Business Administration)", "MBA (Dual Specialization)", "Executive MBA", "Ph.D."],
    description: "Shaping dynamic corporate leaders and ethical entrepreneurs equipped with analytical problem-solving, strategic innovation, and global business acumen.",
    labs: ["Executive Boardroom Simulator", "Behavioral Leadership & Assessment Studio", "Management Analytics Hub"],
    featured: true
  },
  {
    id: "dept-math",
    name: "Department of Mathematics",
    slug: "mathematics",
    icon: "calculator",
    image: "assets/images/digital_library.jpg",
    hod: "Dr. S. Narayanan, Ph.D.",
    facultyCount: 18,
    studentCount: 650,
    programs: ["B.Sc Mathematics with Data Science", "M.Sc Applicable Mathematics", "M.Phil", "Ph.D."],
    description: "Exploring both theoretical and applied realms of mathematical sciences, data modeling, statistical machine learning, and advanced cryptographic systems.",
    labs: ["Mathematical Modeling & Simulation Lab", "MATLAB & Wolfram Mathematica Suite", "Statistical Analytics Lab"],
    featured: true
  },
  {
    id: "dept-phys",
    name: "Department of Physics",
    slug: "physics",
    icon: "atom",
    image: "assets/images/ai_research_lab.jpg",
    hod: "Dr. R. Chandrasekhar, Ph.D.",
    facultyCount: 16,
    studentCount: 550,
    programs: ["B.Sc Physics", "M.Sc Physics (Condensed Matter / Photonics)", "Ph.D. in Physics"],
    description: "Investigating the fundamental laws of nature, quantum phenomena, nanotechnology, optoelectronics, and renewable energy conversion mechanisms.",
    labs: ["Quantum Optics & Laser Lab", "Nanomaterials & Thin Film Facility", "Solid State Electronics Lab"],
    featured: true
  },
  {
    id: "dept-eng",
    name: "Department of English",
    slug: "english",
    icon: "feather-alt",
    image: "assets/images/digital_library.jpg",
    hod: "Dr. Elizabeth Thomas, Ph.D.",
    facultyCount: 15,
    studentCount: 600,
    programs: ["B.A. English Literature", "M.A. English & Comparative Literature", "Ph.D."],
    description: "Cultivating critical inquiry, expressive mastery, global literary appreciation, and professional rhetoric for careers in publishing, media, and corporate leadership.",
    labs: ["Digital Multimedia Language Lab", "Creative Writing & Speech Guild", "Phonetics & Audio Recording Studio"],
    featured: true
  }
];

const DEFAULT_ACADEMIC_PROGRAMS = [
  // Undergraduate
  {
    id: "prog-bsc-cs",
    level: "Undergraduate",
    degree: "B.Sc",
    name: "B.Sc Computer Science",
    department: "Computer Science",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 Higher Secondary with Mathematics / Computer Science (Min 55% Aggregate)",
    overview: "A comprehensive foundational degree covering data structures, object-oriented programming, cloud computing, database systems, and modern AI algorithms.",
    careers: ["Software Engineer", "Systems Analyst", "Cloud Associate", "Data Analyst", "Full-Stack Web Developer"],
    tuition: "₹ 85,000 / Year",
    seats: 120
  },
  {
    id: "prog-bca",
    level: "Undergraduate",
    degree: "BCA",
    name: "Bachelor of Computer Applications (BCA)",
    department: "Computer Applications",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 in any stream with Mathematics / Business Mathematics / Computer Applications (Min 50%)",
    overview: "Designed for aspiring software practitioners, focusing heavily on hands-on application development, full-stack frameworks, mobile apps, and UX engineering.",
    careers: ["Full-Stack Developer", "Mobile App Developer", "DevOps Engineer", "UI/UX Specialist", "Database Administrator"],
    tuition: "₹ 90,000 / Year",
    seats: 150
  },
  {
    id: "prog-bcom",
    level: "Undergraduate",
    degree: "B.Com",
    name: "Bachelor of Commerce (B.Com)",
    department: "Commerce",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 with Commerce / Accountancy / Mathematics (Min 50% Aggregate)",
    overview: "In-depth exposure to corporate accounting, corporate law, direct & indirect taxation, financial management, and computer-aided auditing.",
    careers: ["Financial Analyst", "Tax Consultant", "Audit Associate", "Investment Banker", "Chartered Accountant (CA/CMA Aspirant)"],
    tuition: "₹ 75,000 / Year",
    seats: 180
  },
  {
    id: "prog-bba",
    level: "Undergraduate",
    degree: "BBA",
    name: "Bachelor of Business Administration (BBA)",
    department: "Management",
    duration: "3 Years (6 Semesters)",
    eligibility: "10+2 in any stream from a recognized board (Min 50% Aggregate)",
    overview: "Develops core management capabilities across marketing, human resources, organizational leadership, entrepreneurship, and international trade.",
    careers: ["Business Operations Manager", "Marketing Executive", "HR Generalist", "Brand Strategist", "Startup Founder"],
    tuition: "₹ 85,000 / Year",
    seats: 120
  },

  // Postgraduate
  {
    id: "prog-mca",
    level: "Postgraduate",
    degree: "MCA",
    name: "Master of Computer Applications (MCA)",
    department: "Computer Applications",
    duration: "2 Years (4 Semesters)",
    eligibility: "BCA / B.Sc CS / B.Sc IT or any graduate degree with Mathematics at 10+2 or degree level (Min 55%)",
    overview: "Advanced professional curriculum covering distributed enterprise systems, cloud DevOps, machine learning engineering, and scalable microservices.",
    careers: ["Senior Software Architect", "AI/ML Engineer", "Cloud Infrastructure Architect", "Technical Product Manager"],
    tuition: "₹ 1,10,000 / Year",
    seats: 90
  },
  {
    id: "prog-mcom",
    level: "Postgraduate",
    degree: "M.Com",
    name: "Master of Commerce (M.Com)",
    department: "Commerce",
    duration: "2 Years (4 Semesters)",
    eligibility: "B.Com / B.B.A / B.B.M from a recognized university (Min 50% Aggregate)",
    overview: "Advanced study in multinational financial reporting, forensic accounting, quantitative portfolio management, and international corporate law.",
    careers: ["Chief Financial Controller", "Risk Analyst", "Forensic Auditor", "Professor / Academic Researcher", "Corporate Treasurer"],
    tuition: "₹ 70,000 / Year",
    seats: 60
  },
  {
    id: "prog-msc-cs",
    level: "Postgraduate",
    degree: "M.Sc",
    name: "M.Sc Computer Science",
    department: "Computer Science",
    duration: "2 Years (4 Semesters)",
    eligibility: "B.Sc CS / BCA / B.Sc Mathematics / Statistics / B.E. (Min 55% Aggregate)",
    overview: "Research-driven master's program emphasizing advanced algorithms, cybersecurity architectures, computer vision, and deep generative models.",
    careers: ["Data Scientist", "Computer Vision Specialist", "Cybersecurity Architect", "Research Scientist", "Doctoral Researcher"],
    tuition: "₹ 95,000 / Year",
    seats: 60
  },
  {
    id: "prog-mba",
    level: "Postgraduate",
    degree: "MBA",
    name: "Master of Business Administration (MBA)",
    department: "Management",
    duration: "2 Years (4 Semesters)",
    eligibility: "Bachelor's degree in any discipline with valid CAT/MAT/TANCET or HU-MAT score (Min 55%)",
    overview: "Dual-specialization flagship MBA offering choices in Finance, Marketing, Human Resources, Business Analytics, and Logistics Management.",
    careers: ["Management Consultant", "Product Lead", "Investment Banking Associate", "Strategy Director", "Supply Chain Lead"],
    tuition: "₹ 1,75,000 / Year",
    seats: 120
  },

  // Research
  {
    id: "prog-mphil",
    level: "Research",
    degree: "M.Phil",
    name: "Master of Philosophy (M.Phil)",
    department: "Multiple Departments",
    duration: "1 to 2 Years",
    eligibility: "Master's degree in relevant discipline with minimum 55% marks (50% for reserved categories)",
    overview: "Pre-doctoral advanced research methodology training focused on publication writing, literature appraisal, and research defense.",
    careers: ["Senior Lecturer", "Research Fellow", "Academic Curriculum Specialist", "Think-Tank Analyst"],
    tuition: "₹ 60,000 / Year",
    seats: 40
  },
  {
    id: "prog-phd",
    level: "Research",
    degree: "Ph.D.",
    name: "Doctor of Philosophy (Ph.D.)",
    department: "All Departments",
    duration: "3 to 5 Years (Full-Time / Part-Time)",
    eligibility: "Master's degree with minimum 55% aggregate marks and qualification in HU-PET or UGC-NET / CSIR-NET / GATE",
    overview: "The pinnacle of academic discovery. Scholars conduct original, pioneering research with access to advanced laboratories and international mentorship.",
    careers: ["University Professor", "Chief Scientist", "Director of R&D", "Postdoctoral Fellow at Global Universities", "Principal Investigator"],
    tuition: "₹ 50,000 / Year (Generous fellowships available)",
    seats: 75
  }
];

const DEFAULT_CAMPUS_FACILITIES = [
  {
    id: "fac-smart-class",
    title: "Smart Classrooms",
    icon: "chalkboard-teacher",
    image: "assets/images/campus_hero.jpg",
    tag: "Next-Gen Learning",
    description: "120+ air-conditioned smart classrooms equipped with 4K interactive touch displays, AI-driven lecture capture systems, and acoustic surround audio."
  },
  {
    id: "fac-digital-library",
    title: "Digital & Central Library",
    icon: "book-reader",
    image: "assets/images/digital_library.jpg",
    tag: "Knowledge Haven",
    description: "Spanning 45,000 sq.ft across 3 floors with over 150,000 print volumes, 40,000 e-journals (IEEE, Springer, ScienceDirect), 200 study pods, and 24/7 digital access."
  },
  {
    id: "fac-comp-labs",
    title: "Advanced Computer Labs",
    icon: "desktop",
    image: "assets/images/ai_research_lab.jpg",
    tag: "High-Tech Computing",
    description: "18 dedicated computing laboratories hosting 1,200+ high-end workstations with licensed development suites, dual monitors, and high-speed fiber connectivity."
  },
  {
    id: "fac-ai-lab",
    title: "AI & Robotics Research Center",
    icon: "robot",
    image: "assets/images/ai_research_lab.jpg",
    tag: "Deep-Tech Hub",
    description: "State-of-the-art center equipped with NVIDIA DGX A100 AI supercomputing clusters, collaborative robotic arms, VR headsets, and IoT sensor testbeds."
  },
  {
    id: "fac-auditorium",
    title: "Grand University Auditorium",
    icon: "theater-masks",
    image: "assets/images/campus_auditorium.jpg",
    tag: "Cultural Epicenter",
    description: "A 2,500-seat magnificent architectural marvel featuring world-class Bose acoustics, motorized stage curtains, automated lighting rigs, and VIP green rooms."
  },
  {
    id: "fac-sports",
    title: "Olympic Sports Complex",
    icon: "running",
    image: "assets/images/sports_complex.jpg",
    tag: "Athletics & Wellness",
    description: "Includes a synthetic 400m running track, FIFA-standard football pitch, indoor badminton arena, Olympic swimming pool, tennis courts, and gymnasium."
  },
  {
    id: "fac-hostel",
    title: "Hostels & Residences",
    icon: "hotel",
    image: "assets/images/campus_hero.jpg",
    tag: "Home Away From Home",
    description: "Separate multi-story air-conditioned residences for male and female students with Wi-Fi, 24/7 biometric security, reading lounges, and hygienic dining."
  },
  {
    id: "fac-cafeteria",
    title: "Cafeteria & Food Court",
    icon: "utensils",
    image: "assets/images/digital_library.jpg",
    tag: "Nutritious & Multi-Cuisine",
    description: "Multi-vendor food pavilion serving nutritious North Indian, South Indian, Continental, and bakery delicacies with strict FSSAI hygiene ratings."
  },
  {
    id: "fac-transport",
    title: "Fleet Transportation",
    icon: "bus-alt",
    image: "assets/images/campus_hero.jpg",
    tag: "City-Wide Connectivity",
    description: "Over 65 GPS-tracked air-conditioned buses connecting all corners of Chennai, Kanchipuram, and surrounding residential corridors."
  },
  {
    id: "fac-medical",
    title: "24/7 Medical Health Center",
    icon: "heartbeat",
    image: "assets/images/university_crest.jpg",
    tag: "Health & Wellbeing",
    description: "In-campus 10-bed hospital with resident physicians, trained nurses, emergency ambulance, diagnostic pharmacy, and student mental health counseling."
  },
  {
    id: "fac-wifi",
    title: "10 Gbps Wi-Fi & Smart IoT Campus",
    icon: "wifi",
    image: "assets/images/ai_research_lab.jpg",
    tag: "Pervasive Connectivity",
    description: "Seamless high-speed enterprise Wi-Fi 6 coverage across every square foot of the 120-acre campus, hostels, libraries, and outdoor amphitheater."
  }
];

const DEFAULT_EVENTS = [
  {
    id: "evt-1",
    title: "Annual Convocation Ceremony 2026",
    category: "Graduation",
    date: "2026-10-15",
    time: "10:00 AM - 1:30 PM",
    venue: "Grand University Auditorium",
    image: "assets/images/graduation_ceremony.jpg",
    description: "Honoring the graduating Class of 2026. Degrees will be conferred by Founder & Owner Hemanathan alongside distinguished Chief Guests from academia and industry.",
    speaker: "Chief Guest: Hon. Minister of Higher Education & Global Tech Leaders",
    registrationLink: "#register",
    status: "Upcoming"
  },
  {
    id: "evt-2",
    title: "International Conference on Generative AI & Computing (ICGAC 2026)",
    category: "Conferences",
    date: "2026-11-20",
    time: "9:00 AM - 5:30 PM (2 Days)",
    venue: "School of Computing & AI Hub",
    image: "assets/images/ai_research_lab.jpg",
    description: "Global symposium gathering prominent researchers, computer scientists, and scholars discussing breakthroughs in Large Language Models and ethical computing.",
    speaker: "Keynotes from MIT, Stanford, and Google Research Fellows",
    registrationLink: "#register",
    status: "Upcoming"
  },
  {
    id: "evt-3",
    title: "HU National Hackathon & Startup Pitch (HackHemanathan '26)",
    category: "Workshops",
    date: "2026-10-28",
    time: "36-Hour Continuous Hackathon",
    venue: "AI & Research Center",
    image: "assets/images/ai_research_lab.jpg",
    description: "A 36-hour battle of innovation where 500+ collegiate coders develop solutions for healthcare, climate tech, and financial inclusion with ₹10 Lakh in cash prizes.",
    speaker: "Mentors from leading Venture Capitalists and Tech Accelerators",
    registrationLink: "#register",
    status: "Upcoming"
  },
  {
    id: "evt-4",
    title: "Tarang 2026 - Inter-Collegiate Mega Cultural Fest",
    category: "Cultural",
    date: "2026-12-05",
    time: "11:00 AM - 9:00 PM (3 Days)",
    venue: "University Open Air Amphitheater & Lawns",
    image: "assets/images/campus_auditorium.jpg",
    description: "Three exhilarating days of musical concerts, dance championships, theatrical dramas, literary debates, fashion exhibitions, and celebrity artist performances.",
    speaker: "Celebrity Artists & University Cultural Guild",
    registrationLink: "#register",
    status: "Upcoming"
  },
  {
    id: "evt-5",
    title: "All-India Inter-University Athletics & Football Championship",
    category: "Sports",
    date: "2026-11-08",
    time: "7:00 AM - 6:00 PM",
    venue: "Olympic Sports Complex",
    image: "assets/images/sports_complex.jpg",
    description: "Hosting 48 university teams competing across track and field events, football, basketball, and badminton in Olympic-standard facilities.",
    speaker: "Organized by Directorate of Physical Education",
    registrationLink: "#register",
    status: "Upcoming"
  },
  {
    id: "evt-6",
    title: "Workshop on Quantitative Finance & Algorithmic Trading",
    category: "Seminars",
    date: "2026-09-30",
    time: "2:00 PM - 5:00 PM",
    venue: "Commerce & Management Seminar Hall",
    image: "assets/images/digital_library.jpg",
    description: "Hands-on masterclass for commerce and MBA scholars demonstrating live algorithmic trading models, risk mitigation, and automated derivatives strategies.",
    speaker: "Mr. R. Raghavan, Managing Director, Global Capital Markets",
    registrationLink: "#register",
    status: "Upcoming"
  }
];

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Admissions Open for Academic Year 2026-27: UG, PG & Ph.D. Programs",
    date: "2026-09-01",
    priority: "High",
    category: "Admissions",
    summary: "Online application portal is now active for all faculties. Apply early for merit scholarships up to 100% tuition waiver.",
    link: "admissions.html"
  },
  {
    id: "ann-2",
    title: "Hemanathan University Accredited with NAAC 'A++' Grade (CGPA 3.84/4.00)",
    date: "2026-08-20",
    priority: "High",
    category: "Accreditation",
    summary: "The National Assessment and Accreditation Council awards the university its highest echelon rating for institutional excellence.",
    link: "about.html"
  },
  {
    id: "ann-3",
    title: "Founder's Merit-Cum-Means Scholarship 2026 - Applications Open",
    date: "2026-08-15",
    priority: "Normal",
    category: "Scholarships",
    summary: "Founder & Owner Hemanathan announces ₹15 Crore scholarship corpus for deserving scholars from diverse backgrounds.",
    link: "admissions.html#scholarships"
  },
  {
    id: "ann-4",
    title: "Campus Placements 2026 Achieves Record 98.6% Placement Rate",
    date: "2026-08-05",
    priority: "Normal",
    category: "Placements",
    summary: "Over 240 marquee recruiters visited campus with the highest national package touching ₹48.5 LPA.",
    link: "academics.html"
  },
  {
    id: "ann-5",
    title: "Call for Papers: International Conference on Generative AI & Computing (ICGAC '26)",
    date: "2026-07-28",
    priority: "Normal",
    category: "Research",
    summary: "Original research papers invited for publication in IEEE Xplore proceedings. Deadline for full paper submission: Oct 10, 2026.",
    link: "events.html"
  }
];

const DEFAULT_GALLERY = [
  {
    id: "gal-1",
    title: "Historic Clock Tower Quadrangle",
    category: "Campus",
    image: "assets/images/campus_hero.jpg",
    caption: "The majestic main building and lush manicured lawns of Hemanathan University."
  },
  {
    id: "gal-2",
    title: "Class of 2026 Commencement Celebration",
    category: "Graduation",
    image: "assets/images/graduation_ceremony.jpg",
    caption: "Joyous university graduates celebrating at the convocation ceremony."
  },
  {
    id: "gal-3",
    title: "Grand Digital & Central Library",
    category: "Campus",
    image: "assets/images/digital_library.jpg",
    caption: "Soaring vaulted timber arches and collaborative learning spaces in the library."
  },
  {
    id: "gal-4",
    title: "AI & Robotics Research Center",
    category: "Faculty",
    image: "assets/images/ai_research_lab.jpg",
    caption: "Faculty scientists and scholars conducting cutting-edge AI neural experiments."
  },
  {
    id: "gal-5",
    title: "Grand Convocation Auditorium",
    category: "Events",
    image: "assets/images/campus_auditorium.jpg",
    caption: "The 2,500-seat university auditorium hosting international symposiums."
  },
  {
    id: "gal-6",
    title: "Olympic Athletic Arena & Stadium",
    category: "Sports",
    image: "assets/images/sports_complex.jpg",
    caption: "State-of-the-art synthetic running track and collegiate soccer arena."
  },
  {
    id: "gal-7",
    title: "Founder & Chancellor Executive Suite",
    category: "Campus",
    image: "assets/images/chancellor_office.jpg",
    caption: "The executive boardroom and Founder's office overlooking the historic academic quad."
  },
  {
    id: "gal-8",
    title: "University Official Crest of Knowledge",
    category: "Campus",
    image: "assets/images/university_crest.jpg",
    caption: "The official golden seal embodying Knowledge, Innovation, and Excellence."
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    quote: "Studying at Hemanathan University has been the most transformative chapter of my life. The state-of-the-art AI labs and mentorship from world-class faculty gave me the confidence to secure a role as an AI Engineer at Microsoft.",
    author: "Aditya Subramanian",
    role: "B.Sc Computer Science (Alumnus '24) • AI Engineer at Microsoft",
    image: "assets/images/university_crest.jpg"
  },
  {
    quote: "Founder Hemanathan's vision of blending academic rigor with moral leadership is palpable across every classroom and seminar. The corporate mentorship helped our team launch our FinTech venture straight out of university.",
    author: "Sneha Nair",
    role: "MBA Graduate ('23) • Co-Founder, PayNext Technologies",
    image: "assets/images/university_crest.jpg"
  },
  {
    quote: "The computational resources and research grants provided by HU enabled our team to publish 3 international IEEE papers and file a patent before even finishing our MCA degree.",
    author: "Rohan Kulkarni",
    role: "MCA Alumnus ('25) • Doctoral Fellow at NUS Singapore",
    image: "assets/images/university_crest.jpg"
  }
];

// DATA ACCESS & STORAGE MANAGER
const HUData = {
  getUniversityInfo: function() {
    return DEFAULT_UNIVERSITY_INFO;
  },

  getFounder: function() {
    return DEFAULT_FOUNDER;
  },

  getBoardMembers: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOARD);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Storage read error, using default board data", e);
    }
    return DEFAULT_BOARD_MEMBERS;
  },

  saveBoardMember: function(member) {
    const list = this.getBoardMembers();
    const index = list.findIndex(m => m.id === member.id);
    if (index >= 0) {
      list[index] = { ...list[index], ...member };
    } else {
      member.id = member.id || 'bm-' + Date.now();
      list.push(member);
    }
    localStorage.setItem(STORAGE_KEYS.BOARD, JSON.stringify(list));
    return member;
  },

  deleteBoardMember: function(id) {
    let list = this.getBoardMembers();
    list = list.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOARD, JSON.stringify(list));
    return true;
  },

  getFaculty: function(deptFilter = 'all', searchQuery = '') {
    let list = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FACULTY);
      list = stored ? JSON.parse(stored) : DEFAULT_FACULTY_MEMBERS;
    } catch (e) {
      list = DEFAULT_FACULTY_MEMBERS;
    }

    if (deptFilter && deptFilter !== 'all') {
      const cleanFilter = deptFilter.toLowerCase().trim();
      list = list.filter(f => f.department.toLowerCase().includes(cleanFilter));
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(f => 
        f.name.toLowerCase().includes(q) ||
        f.department.toLowerCase().includes(q) ||
        f.specialization.toLowerCase().includes(q) ||
        f.designation.toLowerCase().includes(q) ||
        f.qualification.toLowerCase().includes(q)
      );
    }

    return list;
  },

  saveFaculty: function(faculty) {
    const list = this.getFaculty('all', '');
    const index = list.findIndex(f => f.id === faculty.id);
    if (index >= 0) {
      list[index] = { ...list[index], ...faculty };
    } else {
      faculty.id = faculty.id || 'fac-' + Date.now();
      list.push(faculty);
    }
    localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(list));
    return faculty;
  },

  deleteFaculty: function(id) {
    let list = this.getFaculty('all', '');
    list = list.filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(list));
    return true;
  },

  getDepartments: function() {
    return DEFAULT_DEPARTMENTS;
  },

  getDepartmentBySlug: function(slug) {
    return DEFAULT_DEPARTMENTS.find(d => d.slug === slug || d.id === slug);
  },

  getPrograms: function(level = 'all') {
    if (level === 'all') return DEFAULT_ACADEMIC_PROGRAMS;
    return DEFAULT_ACADEMIC_PROGRAMS.filter(p => p.level.toLowerCase() === level.toLowerCase());
  },

  getCampusFacilities: function() {
    return DEFAULT_CAMPUS_FACILITIES;
  },

  getEvents: function(category = 'all') {
    let list = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
      list = stored ? JSON.parse(stored) : DEFAULT_EVENTS;
    } catch (e) {
      list = DEFAULT_EVENTS;
    }
    if (category && category !== 'all') {
      list = list.filter(evt => evt.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  },

  saveEvent: function(event) {
    const list = this.getEvents('all');
    const index = list.findIndex(e => e.id === event.id);
    if (index >= 0) {
      list[index] = { ...list[index], ...event };
    } else {
      event.id = event.id || 'evt-' + Date.now();
      list.push(event);
    }
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(list));
    return event;
  },

  deleteEvent: function(id) {
    let list = this.getEvents('all');
    list = list.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(list));
    return true;
  },

  getAnnouncements: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Announcements read error", e);
    }
    return DEFAULT_ANNOUNCEMENTS;
  },

  saveAnnouncement: function(announcement) {
    const list = this.getAnnouncements();
    const index = list.findIndex(a => a.id === announcement.id);
    if (index >= 0) {
      list[index] = { ...list[index], ...announcement };
    } else {
      announcement.id = announcement.id || 'ann-' + Date.now();
      list.unshift(announcement);
    }
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(list));
    return announcement;
  },

  deleteAnnouncement: function(id) {
    let list = this.getAnnouncements();
    list = list.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(list));
    return true;
  },

  getGallery: function(category = 'all') {
    if (!category || category === 'all') return DEFAULT_GALLERY;
    return DEFAULT_GALLERY.filter(g => g.category.toLowerCase() === category.toLowerCase());
  },

  getTestimonials: function() {
    return DEFAULT_TESTIMONIALS;
  },

  saveApplication: function(appData) {
    let apps = [];
    try {
      apps = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
    } catch (e) {
      apps = [];
    }
    appData.id = 'APP-' + Math.floor(100000 + Math.random() * 900000);
    appData.submittedAt = new Date().toISOString();
    apps.unshift(appData);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    return appData;
  },

  getApplications: function() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
    } catch (e) {
      return [];
    }
  },

  resetToDefaults: function() {
    localStorage.removeItem(STORAGE_KEYS.BOARD);
    localStorage.removeItem(STORAGE_KEYS.FACULTY);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    return true;
  }
};

// Make accessible globally
window.HUData = HUData;
