import type { ResumeData } from './types';

export const classicTemplateData: ResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    linkedin: 'https://linkedin.com/in/janedoe',
    github: 'https://github.com/janedoe',
    website: 'https://janedoe.com',
    photo: '',
  },
  professionalSummary:
    'A highly motivated and detail-oriented software engineer with experience in building and maintaining web applications. Proficient in React, Node.js, and modern web technologies. Seeking to leverage my skills to contribute to a challenging and dynamic team.',
  experience: [
    {
      id: '1',
      role: 'Software Engineer',
      company: 'Tech Corp',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description:
        'Developed and maintained web applications using React and Node.js.\nCollaborated with cross-functional teams to deliver high-quality software solutions.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: 'Sep 2016',
      endDate: 'Dec 2019',
      gpa: '3.8/4.0',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Personal Portfolio',
      description:
        'A responsive personal portfolio website to showcase my projects and skills.',
      url: 'https://janedoe.com',
    },
  ],
  skills: [
    { id: '1', name: 'JavaScript', category: 'Languages' },
    { id: '7', name: 'Python', category: 'Languages' },
    { id: '2', name: 'React', category: 'Technologies/Frameworks' },
    { id: '3', name: 'Node.js', category: 'Technologies/Frameworks' },
    { id: '4', name: 'Tailwind CSS', category: 'Technologies/Frameworks' },
    { id: '5', name: 'VS Code', category: 'Developer Tools' },
    { id: '6', name: 'Git', category: 'Developer Tools' },
  ],
  extracurriculars: [
    {
      id: '1',
      organization: 'Tech Club',
      role: 'President',
      startDate: 'Sep 2018',
      endDate: 'May 2019',
      description: 'Organized weekly coding workshops and hackathons for students.',
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'Certified React Developer',
      description: 'An advanced certification for React professionals.',
      url: 'https://example.com/cert',
    },
  ],
  languages: [
    { id: 'lang1', name: 'English', level: 'Native' },
    { id: 'lang2', name: 'Spanish', level: 'Intermediate' },
  ],
};

export const modernTemplateData: ResumeData = {
    personalInfo: {
      name: 'Alex Ray',
      email: 'alex.ray@email.com',
      phone: '555-010-2030',
      address: '456 Modern Ave, Metropolis, USA',
      linkedin: 'https://linkedin.com/in/alexray',
      github: 'https://github.com/alexray',
      website: '',
      photo: '',
    },
    professionalSummary:
      'Innovative UX/UI Designer with a passion for creating intuitive and beautiful user experiences. 4+ years of experience in mobile and web design, wireframing, and prototyping. A collaborative team player dedicated to user-centered design principles.',
    experience: [
      {
        id: 'exp1',
        role: 'Senior UX/UI Designer',
        company: 'Innovate Digital',
        startDate: 'June 2021',
        endDate: 'Present',
        description:
          'Lead design on major client projects, resulting in a 25% increase in user engagement.\nMentored junior designers and established a new design system for the company.',
      },
      {
        id: 'exp2',
        role: 'UX Designer',
        company: 'Creative Solutions',
        startDate: 'May 2019',
        endDate: 'June 2021',
        description:
          'Designed wireframes, mockups, and prototypes for various web and mobile applications.\nConducted user research and usability testing to inform design decisions.',
      },
    ],
    education: [
      {
        id: 'edu1',
        institution: 'Design Institute of America',
        degree: 'B.F.A. in Graphic Design',
        startDate: '2015',
        endDate: '2019',
        gpa: '3.9',
      },
    ],
    projects: [
      {
        id: 'proj1',
        name: 'Mobile Banking App Redesign',
        description:
          'A personal project focused on improving the user flow and visual design of a popular banking application.',
        url: 'https://github.com/alexray/banking-redesign',
      },
    ],
    skills: [
      { id: 'sk1', name: 'Figma', category: 'Developer Tools' },
      { id: 'sk2', name: 'Adobe XD', category: 'Developer Tools' },
      { id: 'sk3', name: 'User Research', category: 'Other' },
      { id: 'sk4', name: 'Prototyping', category: 'Other' },
      { id: 'sk5', name: 'HTML/CSS', category: 'Languages' },
    ],
    extracurriculars: [],
    certifications: [
      {
        id: 'cert1',
        name: 'Certified UX Professional (CUXP)',
        description: 'Covers user research, design thinking, and interaction design principles.',
        url: 'https://example.com/cert',
      },
    ],
    languages: [],
  };
  
  export const creativeTemplateData: ResumeData = {
    personalInfo: {
      name: 'Samira Khan',
      email: 'samira.khan@creative.dev',
      phone: '111-222-3333',
      address: '789 Creative Lane, Artsburg, USA',
      linkedin: 'https://linkedin.com/in/samirakhan',
      github: '',
      website: 'https://samirakhan.art',
      photo: '',
    },
    professionalSummary:
      'Dynamic and creative content creator and social media strategist with a proven track record of growing online communities and building brand identity. Expertise in video production, copywriting, and analytics.',
    experience: [
      {
        id: 'exp1',
        role: 'Content Strategist',
        company: 'Vivid Media',
        startDate: 'Jan 2022',
        endDate: 'Present',
        description:
          'Developed and executed content strategies across multiple platforms, increasing follower count by 150%.\nProduced and edited viral video content, amassing over 10 million views.',
      },
    ],
    education: [
      {
        id: 'edu1',
        institution: 'State University',
        degree: 'B.A. in Communications',
        startDate: '2017',
        endDate: '2021',
        gpa: '3.7',
      },
    ],
    projects: [
        {
          id: 'proj1',
          name: '"City Lights" Short Film',
          description:
            'Wrote, directed, and edited a short film that was accepted into three local film festivals.',
          url: 'https://vimeo.com/samirakhan/citylights',
        },
    ],
    skills: [
        { id: 'sk1', name: 'Adobe Premiere Pro', category: 'Developer Tools' },
        { id: 'sk2', name: 'Copywriting', category: 'Other' },
        { id: 'sk3', name: 'Social Media Marketing', category: 'Other' },
        { id: 'sk4', name: 'SEO', category: 'Other' },
        { id: 'sk5', name: 'Canva', category: 'Developer Tools' },
    ],
    extracurriculars: [
        {
          id: 'extra1',
          organization: 'University Film Club',
          role: 'Vice President',
          startDate: '2019',
          endDate: '2021',
          description: 'Organized film screenings and workshops for students.',
        },
    ],
    certifications: [],
    languages: [],
  };

export const photoTemplateData: ResumeData = {
  personalInfo: {
    name: 'Emily Carter',
    email: 'emily.carter@photo.com',
    phone: '555-123-4567',
    address: '123 Pixel Perfect Rd, San Francisco, CA',
    linkedin: 'https://linkedin.com/in/emilycarter',
    github: 'https://github.com/emilycarter',
    website: 'https://emilycarter.dev',
    photo: 'https://placehold.co/150x150.png',
  },
  professionalSummary:
    'Creative and detail-oriented Front-End Developer with 5 years of experience building responsive and user-friendly web applications. Passionate about creating seamless user experiences and beautiful interfaces. Seeking to bring my technical and creative skills to a forward-thinking company.',
  experience: [
    {
      id: '1',
      role: 'Front-End Developer',
      company: 'Web Solutions Inc.',
      startDate: 'Mar 2020',
      endDate: 'Present',
      description:
        'Led the development of a new e-commerce platform using React and Redux, increasing sales by 20%.\nImplemented a component library to ensure brand consistency across all web properties.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'B.A. in Cognitive Science',
      startDate: 'Sep 2011',
      endDate: 'May 2015',
      gpa: '3.7/4.0',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Interactive Data Visualization Tool',
      description:
        'Developed a tool using D3.js to visualize complex datasets for a non-profit organization.',
      url: 'https://github.com/emilycarter/data-viz',
    },
  ],
  skills: [
    { id: '1', name: 'HTML5 & CSS3', category: 'Languages' },
    { id: '2', name: 'JavaScript (ES6+)', category: 'Languages' },
    { id: '3', name: 'React', category: 'Technologies/Frameworks' },
    { id: '4', name: 'Vue.js', category: 'Technologies/Frameworks' },
    { id: '5', name: 'Webpack', category: 'Developer Tools' },
    { id: '6', name: 'Figma', category: 'Developer Tools' },
  ],
  extracurriculars: [],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Cloud Practitioner',
      description: 'Validates foundational knowledge of AWS cloud services and concepts.',
      url: 'https://example.com/cert-aws',
    },
  ],
  languages: [],
};


export const templates = {
    'classic': classicTemplateData,
    'modern': modernTemplateData,
    'creative': creativeTemplateData,
    'photo': photoTemplateData,
};

export type TemplateId = keyof typeof templates;
