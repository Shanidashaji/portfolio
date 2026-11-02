// Skill clusters from the résumé. "usedIn" links each tool to the projects
// where the résumé lists it — evidence instead of percentages.

export type SkillCluster = {
  id: string;
  code: string;
  label: string;
  blurb: string;
  items: { name: string; usedIn?: string[] }[];
};

export const skills: SkillCluster[] = [
  {
    id: 'frontend',
    code: 'FE',
    label: 'Frontend',
    blurb: 'Responsive, mobile-first interfaces, dashboards and login flows for live products.',
    items: [
      { name: 'React.js', usedIn: ['GIO Kerala', 'GIO Conference', 'Qspot', 'MERN To-Do'] },
      { name: 'Next.js', usedIn: ['GIO Kerala', 'Malarvadi'] },
      { name: 'JavaScript', usedIn: ['Testimonial Wall', 'Healthy Baby'] },
      { name: 'Tailwind CSS', usedIn: ['GIO Kerala', 'GIO Conference', 'Malarvadi'] },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'Bootstrap', usedIn: ['Testimonial Wall'] },
      { name: 'Responsive Design', usedIn: ['JIH Women’s Wing', 'QSC'] },
    ],
  },
  {
    id: 'backend',
    code: 'BE',
    label: 'Backend & APIs',
    blurb: 'Server code and REST APIs in Node and Python — including debugging APIs in production apps.',
    items: [
      { name: 'Node.js', usedIn: ['GIO Conference', 'Qspot', 'MERN To-Do'] },
      { name: 'Express.js', usedIn: ['GIO Conference', 'Qspot', 'Malarvadi'] },
      { name: 'REST APIs', usedIn: ['GIO Conference', 'Qspot'] },
      { name: 'Python', usedIn: ['Fire Detection', 'Electro Medicon'] },
      { name: 'Django', usedIn: ['Testimonial Wall'] },
      { name: 'Flask', usedIn: ['Electro Medicon'] },
    ],
  },
  {
    id: 'data',
    code: 'DB',
    label: 'Databases',
    blurb: 'Document and relational storage behind the apps above.',
    items: [
      { name: 'MongoDB', usedIn: ['GIO Conference', 'Qspot', 'Malarvadi', 'MERN To-Do'] },
      { name: 'SQL' },
      { name: 'SQLite', usedIn: ['Testimonial Wall'] },
    ],
  },
  {
    id: 'mobile',
    code: 'MB',
    label: 'Mobile',
    blurb: 'Cross-platform and Android apps from academic work.',
    items: [
      { name: 'Flutter', usedIn: ['Electro Medicon'] },
      { name: 'Android', usedIn: ['Electro Medicon'] },
    ],
  },
  {
    id: 'ai',
    code: 'ML',
    label: 'AI / ML',
    blurb: 'Machine learning and computer vision from academic projects and a published paper.',
    items: [
      { name: 'Machine Learning', usedIn: ['Fire Detection'] },
      { name: 'Computer Vision', usedIn: ['Fire Detection'] },
    ],
  },
  {
    id: 'practice',
    code: 'OP',
    label: 'Practice',
    blurb: 'How the work gets shipped and kept working.',
    items: [
      { name: 'Debugging' },
      { name: 'Software Testing' },
      { name: 'AI-Assisted Development' },
    ],
  },
];
