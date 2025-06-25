import type { ResumeData } from "./types";

export const classicTemplateData: ResumeData = {
  personalInfo: {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    linkedin: "https://linkedin.com/in/janedoe",
    github: "https://github.com/janedoe",
    website: "https://janedoe.com",
    photo: "",
  },
  professionalSummary:
    "A highly motivated and detail-oriented software engineer with experience in building and maintaining web applications. Proficient in React, Node.js, and modern web technologies. Seeking to leverage my skills to contribute to a challenging and dynamic team.",
  experience: [
    {
      id: "1",
      role: "Software Engineer",
      company: "Tech Corp",
      startDate: "Jan 2020",
      endDate: "Present",
      description:
        "Developed and maintained web applications using React and Node.js.\nCollaborated with cross-functional teams to deliver high-quality software solutions.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "University of Technology",
      degree: "B.S. in Computer Science",
      startDate: "Sep 2016",
      endDate: "Dec 2019",
      gpa: "3.8/4.0",
    },
  ],
  projects: [
    {
      id: "1",
      name: "Personal Portfolio",
      description:
        "A responsive personal portfolio website to showcase my projects and skills.",
      url: "https://janedoe.com",
    },
  ],
  skills: [
    { id: "1", name: "JavaScript", category: "Languages" },
    { id: "7", name: "Python", category: "Languages" },
    { id: "2", name: "React", category: "Technologies/Frameworks" },
    { id: "3", name: "Node.js", category: "Technologies/Frameworks" },
    { id: "4", name: "Tailwind CSS", category: "Technologies/Frameworks" },
    { id: "5", name: "VS Code", category: "Developer Tools" },
    { id: "6", name: "Git", category: "Developer Tools" },
  ],
  extracurriculars: [
    {
      id: "1",
      organization: "Tech Club",
      role: "President",
      title: "President",
      startDate: "Sep 2018",
      endDate: "May 2019",
      description:
        "Organized weekly coding workshops and hackathons for students.",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "Certified React Developer",
      description: "An advanced certification for React professionals.",
      url: "https://example.com/cert",
    },
  ],
  languages: [
    { id: "lang1", name: "English", level: "Native" },
    { id: "lang2", name: "Spanish", level: "Intermediate" },
  ],
};

export const modernTemplateData: ResumeData = {
  personalInfo: {
    name: "Alex Ray",
    email: "alex.ray@email.com",
    phone: "555-010-2030",
    address: "456 Modern Ave, Metropolis, USA",
    linkedin: "https://linkedin.com/in/alexray",
    github: "https://github.com/alexray",
    website: "",
    photo: "",
  },
  professionalSummary:
    "Innovative UX/UI Designer with a passion for creating intuitive and beautiful user experiences. 4+ years of experience in mobile and web design, wireframing, and prototyping. A collaborative team player dedicated to user-centered design principles.",
  experience: [
    {
      id: "exp1",
      role: "Senior UX/UI Designer",
      company: "Innovate Digital",
      startDate: "June 2021",
      endDate: "Present",
      description:
        "Lead design on major client projects, resulting in a 25% increase in user engagement.\nMentored junior designers and established a new design system for the company.",
    },
    {
      id: "exp2",
      role: "UX Designer",
      company: "Creative Solutions",
      startDate: "May 2019",
      endDate: "June 2021",
      description:
        "Designed wireframes, mockups, and prototypes for various web and mobile applications.\nConducted user research and usability testing to inform design decisions.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "Design Institute of America",
      degree: "B.F.A. in Graphic Design",
      startDate: "2015",
      endDate: "2019",
      gpa: "3.9",
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "Mobile Banking App Redesign",
      description:
        "A personal project focused on improving the user flow and visual design of a popular banking application.",
      url: "https://github.com/alexray/banking-redesign",
    },
  ],
  skills: [
    { id: "sk1", name: "Figma", category: "Developer Tools" },
    { id: "sk2", name: "Adobe XD", category: "Developer Tools" },
    { id: "sk3", name: "User Research", category: "Other" },
    { id: "sk4", name: "Prototyping", category: "Other" },
    { id: "sk5", name: "HTML/CSS", category: "Languages" },
  ],
  extracurriculars: [],
  certifications: [
    {
      id: "cert1",
      name: "Certified UX Professional (CUXP)",
      description:
        "Covers user research, design thinking, and interaction design principles.",
      url: "https://example.com/cert",
    },
  ],
  languages: [],
};

export const creativeTemplateData: ResumeData = {
  personalInfo: {
    name: "Samira Khan",
    email: "samira.khan@creative.dev",
    phone: "111-222-3333",
    address: "789 Creative Lane, Artsburg, USA",
    linkedin: "https://linkedin.com/in/samirakhan",
    github: "",
    website: "https://samirakhan.art",
    photo: "",
  },
  professionalSummary:
    "Dynamic and creative content creator and social media strategist with a proven track record of growing online communities and building brand identity. Expertise in video production, copywriting, and analytics.",
  experience: [
    {
      id: "exp1",
      role: "Content Strategist",
      company: "Vivid Media",
      startDate: "Jan 2022",
      endDate: "Present",
      description:
        "Developed and executed content strategies across multiple platforms, increasing follower count by 150%.\nProduced and edited viral video content, amassing over 10 million views.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "State University",
      degree: "B.A. in Communications",
      startDate: "2017",
      endDate: "2021",
      gpa: "3.7",
    },
  ],
  projects: [
    {
      id: "proj1",
      name: '"City Lights" Short Film',
      description:
        "Wrote, directed, and edited a short film that was accepted into three local film festivals.",
      url: "https://vimeo.com/samirakhan/citylights",
    },
  ],
  skills: [
    { id: "sk1", name: "Adobe Premiere Pro", category: "Developer Tools" },
    { id: "sk2", name: "Copywriting", category: "Other" },
    { id: "sk3", name: "Social Media Marketing", category: "Other" },
    { id: "sk4", name: "SEO", category: "Other" },
    { id: "sk5", name: "Canva", category: "Developer Tools" },
  ],
  extracurriculars: [
    {
      id: "extra1",
      organization: "University Film Club",
      role: "Vice President",
      title: "Vice President",
      startDate: "2019",
      endDate: "2021",
      description: "Organized film screenings and workshops for students.",
    },
  ],
  certifications: [],
  languages: [],
};

export const photoTemplateData: ResumeData = {
  personalInfo: {
    name: "Emily Carter",
    email: "emily.carter@photo.com",
    phone: "555-123-4567",
    address: "123 Pixel Perfect Rd, San Francisco, CA",
    linkedin: "https://linkedin.com/in/emilycarter",
    github: "https://github.com/emilycarter",
    website: "https://emilycarter.dev",
    photo: "https://placehold.co/150x150.png",
  },
  professionalSummary:
    "Creative and detail-oriented Front-End Developer with 5 years of experience building responsive and user-friendly web applications. Passionate about creating seamless user experiences and beautiful interfaces. Seeking to bring my technical and creative skills to a forward-thinking company.",
  experience: [
    {
      id: "1",
      role: "Front-End Developer",
      company: "Web Solutions Inc.",
      startDate: "Mar 2020",
      endDate: "Present",
      description:
        "Led the development of a new e-commerce platform using React and Redux, increasing sales by 20%.\nImplemented a component library to ensure brand consistency across all web properties.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "B.A. in Cognitive Science",
      startDate: "Sep 2011",
      endDate: "May 2015",
      gpa: "3.7/4.0",
    },
  ],
  projects: [
    {
      id: "1",
      name: "Interactive Data Visualization Tool",
      description:
        "Developed a tool using D3.js to visualize complex datasets for a non-profit organization.",
      url: "https://github.com/emilycarter/data-viz",
    },
  ],
  skills: [
    { id: "1", name: "HTML5 & CSS3", category: "Languages" },
    { id: "2", name: "JavaScript (ES6+)", category: "Languages" },
    { id: "3", name: "React", category: "Technologies/Frameworks" },
    { id: "4", name: "Vue.js", category: "Technologies/Frameworks" },
    { id: "5", name: "Webpack", category: "Developer Tools" },
    { id: "6", name: "Figma", category: "Developer Tools" },
  ],
  extracurriculars: [],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Cloud Practitioner",
      description:
        "Validates foundational knowledge of AWS cloud services and concepts.",
      url: "https://example.com/cert-aws",
    },
  ],
  languages: [],
};

export const elegantTemplateData: ResumeData = {
  personalInfo: {
    name: "Name Surname",
    email: "name.surname@gmail.com",
    phone: "+1 222 222 222",
    address: "NY, USA",
    linkedin: "",
    github: "",
    website: "",
    photo: "/Profile.png",
  },
  professionalSummary:
    "A detail-oriented and results-driven Financial Analyst with over 7 years of experience in financial analysis, forecasting, and budgeting. Proven ability to provide actionable insights through data analysis and financial modeling. Strong analytical and problem-solving skills.",
  experience: [
    {
      id: "exp1",
      role: "Senior Financial Analyst",
      company: "ABC CORPORATION",
      location: "NY, USA",
      startDate: "Nov. 20XX",
      endDate: "Jul. 20XX",
      description:
        "Conducted comprehensive financial analysis to identify cost-saving opportunities, resulting in a 10% reduction in operational expenses.\nDeveloped complex financial models to support strategic decision-making, leading to a successful merger and acquisition deal worth $50 million.",
    },
    {
      id: "exp2",
      role: "Financial Planning & Analyst Manager",
      company: "DEF INCORPORATION",
      location: "NY, USA",
      startDate: "Nov. 20XX",
      endDate: "Jul. 20XX",
      description:
        "Conducted in-depth market research and due diligence on potential investment opportunities, resulting in the identification of a high-performing fund that generated a 20% return on investment.\nMonitored portfolio performance and recommended adjustments to maintain portfolio health, leading to consistent returns above industry benchmarks.",
    },
    {
      id: "exp3",
      role: "Investment Analyst",
      company: "GHI INVESTMENT GROUP",
      location: "NY, USA",
      startDate: "Nov. 20XX",
      endDate: "Jul. 20XX",
      description:
        "Conducted in-depth market research and due diligence on potential investment opportunities, resulting in the identification of a high-performing fund that generated a 20% return on investment.\nMonitored portfolio performance and recommended adjustments to maintain portfolio health, leading to consistent returns above industry benchmarks.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "NYU",
      degree: "Master of Business Administration",
      fieldOfStudy: "",
      startDate: "20XX",
      endDate: "20XX",
      gpa: "",
    },
    {
      id: "edu2",
      institution: "NYU",
      degree: "Bachelor of Science in Finance",
      fieldOfStudy: "",
      startDate: "20XX",
      endDate: "20XX",
      gpa: "",
    },
  ],
  projects: [],
  skills: [
    { id: "sk1", name: "Financial Modeling", category: "Hard" },
    { id: "sk2", name: "Excel", category: "Hard" },
    { id: "sk3", name: "Word", category: "Hard" },
    { id: "sk4", name: "PowerPoint", category: "Hard" },
    { id: "sk5", name: "Outlook", category: "Hard" },
    { id: "sk6", name: "Analytical thinking", category: "Soft" },
    { id: "sk7", name: "Problem Solving", category: "Soft" },
    { id: "sk8", name: "Communication", category: "Soft" },
    { id: "sk9", name: "Time Management", category: "Soft" },
  ],
  extracurriculars: [],
  certifications: [],
  languages: [
    { id: "lang1", name: "English", level: "Fluent" },
    { id: "lang2", name: "Spanish", level: "Professional" },
    { id: "lang3", name: "French", level: "Intermediate" },
  ],
};

export const modernIconicTemplateData: ResumeData = {
  personalInfo: {
    name: "John Smith",
    email: "j.smith@uptowork.com",
    phone: "774-987-4009",
    address: "",
    linkedin: "linkedin.com/johnutw",
    github: "",
    website: "",
    photo: "",
  },
  professionalSummary:
    "IT Professional with over 10 years of experience specializing in IT department management for international logistics companies. I can implement effective IT strategies at local and global levels. My greatest strength is business awareness, which enables me to permanently streamline infrastructure and applications. Seeking to leverage my IT management skills at SanCorp Inc.",
  experience: [
    {
      id: "exp1",
      role: "Senior Project Manager",
      company: "Seton Hospital, ME",
      location: "",
      startDate: "2006-12",
      endDate: "present",
      description:
        "Oversaw all major hospital IT projects for 10+ years, focus on cost reduction.\nResponsible for creating, improving, and developing IT project strategies.\nImplemented the highly successful Lean Training and Six Sigma projects for all employees. Cut costs by 32%.\nI reduced the costs of IT infrastructure maintenance by 5% in 2015 by successfully rebuilding the infrastructure.",
    },
    {
      id: "exp2",
      role: "Junior Project Manager",
      company: "Seton Hospital, ME",
      location: "",
      startDate: "2004-09",
      endDate: "2006-11",
      description:
        "Streamlined IT logistics and administration operation cutting costs by 25%.\nDiagnosed problems with hardware and operating systems and implemented solutions to increase efficiency.\nMaintained the user database of over 30000 patients, implemented new solutions inside the dashboard.\nManaged project for lean training for all IT Support Officers.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of Maryland",
      degree: "BS/MS in Computer Science",
      fieldOfStudy: "",
      startDate: "1996-09",
      endDate: "2001-05",
      gpa: "",
    },
  ],
  projects: [],
  skills: [
    {
      id: "sk1",
      name: "Business Process Improvement",
      category: "General",
    },
    { id: "sk2", name: "Vendor Management", category: "General" },
    { id: "sk3", name: "Project Scheduling", category: "General" },
    { id: "sk4", name: "Sales Analysis", category: "General" },
  ],
  extracurriculars: [],
  certifications: [],
  languages: [],
};

export const redlineChronoTemplateData: ResumeData = {
  personalInfo: {
    name: "DANIEL BURKE",
    email: "example@example.com",
    phone: "(555) 555-5555",
    address: "Manchester, NH",
    linkedin: "https://linkedin.com/in/danielburke",
    github: "https://github.com/danielburke",
    website: "https://danielburke.com",
    photo: "/Profile.png",
  },
  professionalSummary:
    "Focused construction worker familiar with transporting supplies, operating machines and coordinating traffic for smooth and efficient site work. Adept at digging trenches, backfilling excavations and grading sites, as well as mixing materials, erecting temporary support structures and helping tradesmen carry out skilled tasks.",
  experience: [
    {
      id: "exp1",
      role: "Construction Worker",
      company: "Luce Contracting",
      location: "Manchester, NH",
      startDate: "03/2016",
      endDate: "Current",
      description:
        "Consulted with over 70 customers to understand desires and help each owner meet individual property objectives.\nInterpreted job site supervisor's orders and technical documentation to complete work with 100% accuracy.\nInstalled new structures, updated systems and replaced worn components to bring buildings up to current codes.\nDirected traffic away from hazardous locations, protecting team members and general public.",
    },
    {
      id: "exp2",
      role: "Construction Worker",
      company: "TradeSource Inc.",
      location: "Nashua, NH",
      startDate: "11/2012",
      endDate: "01/2016",
      description:
        "Managed independent resolutions of site issues to keep workers on-task and prevent more complex issues.\nSupported customer preferences with basic carpentry work such as installing wooden floors and crown molding.\nEnhanced team efficiency and multitasking abilities by effectively using hand tools, power tools and equipment.",
    },
    {
      id: "exp3",
      role: "Construction Laborer",
      company: "MOJ Construction",
      location: "Manchester, NH",
      startDate: "08/2009",
      endDate: "10/2012",
      description:
        "Brought materials and tools from trucks and storage facilities to work site locations and organized for expected needs.\nPrepared and cleaned surfaces for rebuilding purposes by removing damaged tiles, bricks and mortar.\nEfficiently prepared job sites by removing debris and setting up materials and tools.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "Seacoast School of Technology",
      degree: "Associate of Applied Science: Building Construction Technology",
      fieldOfStudy: "Construction Technology",
      startDate: "2007",
      endDate: "2009",
      gpa: "3.7",
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "Site Safety Initiative",
      description:
        "Developed and implemented a site safety program that reduced injuries by 80% over two years.",
      url: "https://danielburke.com/projects/safety",
    },
  ],
  skills: [
    {
      id: "sk1",
      name: "Team-oriented and dependable",
      category: "General",
      level: 5,
    },
    {
      id: "sk2",
      name: "Preventive and reparative maintenance",
      category: "General",
      level: 4,
    },
    { id: "sk3", name: "Safety and compliance", category: "General", level: 5 },
    {
      id: "sk4",
      name: "Hazardous chemical handling",
      category: "General",
      level: 3,
    },
    {
      id: "sk5",
      name: "Measurement and calculation accuracy",
      category: "General",
      level: 4,
    },
    { id: "sk6", name: "Debris removal", category: "General", level: 4 },
    {
      id: "sk7",
      name: "Hand and power tool operation",
      category: "General",
      level: 5,
    },
    {
      id: "sk8",
      name: "Blueprints and schematics",
      category: "General",
      level: 4,
    },
  ],
  extracurriculars: [
    {
      id: "extra1",
      organization: "Habitat for Humanity",
      role: "Volunteer Team Lead",
      title: "Volunteer Team Lead",
      startDate: "2015",
      endDate: "2018",
      description:
        "Led volunteer teams in building affordable housing for local families.",
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "OSHA 30-Hour Construction Safety",
      description: "Completed OSHA 30-hour safety training for construction.",
      url: "https://osha.gov/cert/12345",
    },
    {
      id: "cert2",
      name: "First Aid/CPR",
      description: "Certified in First Aid and CPR.",
      url: "",
    },
  ],
  languages: [
    { id: "lang1", name: "English", level: "Native" },
    { id: "lang2", name: "Spanish", level: "Professional" },
  ],
};

export const blueBannerConstructionTemplateData: ResumeData = {
  personalInfo: {
    name: "ETHAN HANSON",
    email: "example@example.com",
    phone: "(555) 555-5555",
    address: "Chesterfield, MO",
    linkedin: "https://linkedin.com/in/ethanhanson",
    github: "https://github.com/ethanhanson",
    website: "https://ethanhanson.com",
    photo: "/Profile.png",
  },
  professionalSummary:
    "Hardworking Construction Foreman bringing over 20 years of progressive experience in the field. Quality-focused and diligent with excellent communication, multitasking and time management skills. Looking for a challenging new position with room for advancement.",
  experience: [
    {
      id: "exp1",
      role: "Construction Foreman",
      company: "Aegion Corp.",
      location: "Chesterfield, MO",
      startDate: "03/2011",
      endDate: "Current",
      description:
        "Analyzed blueprints and specifications for over 200 projects to identify exact number of construction workers needed to complete job.\nInitiated onsite safety program and properly trained all team members, decreasing injuries by 80%.\nLed weekly production and operations contractor meetings, facilitating stronger communication and helping to resolve critical issues.",
    },
    {
      id: "exp2",
      role: "Construction Site Manager",
      company: "E&K Companies Inc.",
      location: "Elmhurst, IL",
      startDate: "08/2005",
      endDate: "12/2010",
      description:
        "Improved process efficiency and workflow by implementing productivity initiatives and proactively identifying and resolving problems.\nMonitored, coached and supervised over 100 employees in 5 years.\nReported to vice president of production on conformance with contract schedule and budgetary constraints.",
    },
    {
      id: "exp3",
      role: "Journeyman",
      company: "CCSI Inc.",
      location: "Lansing, IL",
      startDate: "09/1999",
      endDate: "07/2005",
      description:
        "Constructed over 1500 custom built designs according to specifications.\nProactively managed projects to obtain 100% customer satisfaction for all custom work.\nPlanned projects by identifying necessary equipment, tools, and required assistance.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "Southwestern Illinois College",
      degree: "Associate of Applied Science: Construction Carpentry",
      fieldOfStudy: "Construction Carpentry",
      startDate: "1997",
      endDate: "1999",
      gpa: "3.8",
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "Lean Construction Project",
      description:
        "Implemented lean construction principles to reduce waste and improve efficiency on major projects.",
      url: "https://ethanhanson.com/projects/lean",
    },
  ],
  skills: [
    { id: "sk1", name: "Site monitoring", category: "General", level: 5 },
    { id: "sk2", name: "Quality controls", category: "General", level: 4 },
    { id: "sk3", name: "Workload planning", category: "General", level: 5 },
    { id: "sk4", name: "Reviewing timesheets", category: "General", level: 4 },
    { id: "sk5", name: "OSHA trained", category: "General", level: 5 },
    { id: "sk6", name: "Valid MO & IL license", category: "General", level: 5 },
    {
      id: "sk7",
      name: "Project estimation and bidding",
      category: "General",
      level: 4,
    },
    {
      id: "sk8",
      name: "Blueprints and schematics",
      category: "General",
      level: 5,
    },
  ],
  extracurriculars: [
    {
      id: "extra1",
      organization: "Local Builders Association",
      role: "Member",
      title: "Member",
      startDate: "2010",
      endDate: "2015",
      description:
        "Participated in annual construction safety workshops and community outreach.",
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "Certified Construction Manager (CCM)",
      description: "Credential for construction management professionals.",
      url: "https://cmaanet.org/ccm",
    },
    {
      id: "cert2",
      name: "OSHA 30-Hour Construction Safety",
      description: "Completed OSHA 30-hour safety training for construction.",
      url: "https://osha.gov/cert/67890",
    },
  ],
  languages: [
    { id: "lang1", name: "English", level: "Native" },
    { id: "lang2", name: "French", level: "Intermediate" },
  ],
};

export const templates = {
  classic: classicTemplateData,
  modern: modernTemplateData,
  creative: creativeTemplateData,
  photo: photoTemplateData,
  elegant: elegantTemplateData,
  modernIconic: modernIconicTemplateData,
  redlineChrono: redlineChronoTemplateData,
  blueBannerConstruction: blueBannerConstructionTemplateData,
};

export type TemplateId = keyof typeof templates;
