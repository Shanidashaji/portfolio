// Single source of truth for personal content. Everything here comes from
// the résumé (SHANIDA Software Developer.pdf) — edit here, not in components.

export const profile = {
  name: 'Shanida Shaji',
  firstName: 'Shanida',
  lastName: 'Shaji',
  role: 'Software Developer',
  title: 'Full-Stack Developer',
  location: 'Kerala, India',
  timezone: 'Asia/Kolkata',
  email: 'shanida.26shaji@gmail.com',
  phone: '+91 97443 52147',
  phoneHref: 'tel:+919744352147',
  resume: '/Shanida-Shaji-Resume.pdf',
  links: [
    { label: 'LinkedIn', handle: 'in/shanidashaji', href: 'https://www.linkedin.com/in/shanidashaji' },
    { label: 'GitHub', handle: 'Shanidashaji', href: 'https://github.com/Shanidashaji' },
  ],
  languages: ['English', 'Hindi', 'Malayalam'],
  intro:
    'Full-stack developer at D4DX Innovations, building responsive interfaces, admin dashboards and API fixes across seven web products — with React, Next.js, Node.js, Express, MongoDB, Python and Django.',
} as const;

export type TimelineEntry = {
  kind: 'work' | 'study';
  period: string;
  title: string;
  org: string;
  points: string[];
};

export const timeline: TimelineEntry[] = [
  {
    kind: 'work',
    period: 'Apr 2026 — Present',
    title: 'Full Stack Developer',
    org: 'D4DX Innovations',
    points: [
      'Full-stack work on seven projects: GIO Kerala, GIO Conference, JIH Women’s Wing, QSC, Qspot, Malarvadi and Election Portal.',
      'Frontend — responsive, mobile-first interfaces, administrative dashboards, login pages and page layouts for mobile and desktop.',
      'Backend / API — debugging APIs and working on examination, results and report-generation functionality in existing applications.',
      'Testing applications, troubleshooting issues and maintaining existing components as part of the development team.',
    ],
  },
  {
    kind: 'work',
    period: 'Mar 2026 — May 2026',
    title: 'Full Stack Developer Intern',
    org: 'Riss Technologies',
    points: [
      'Python-focused full-stack development on real-world tasks, including backend functionality and database integration.',
      'Debugging and software testing as part of the application development process.',
    ],
  },
  {
    kind: 'study',
    period: 'Aug 2024 — Mar 2026',
    title: 'MCA, Computer Application',
    org: 'Nehru College of Engineering & Research Center',
    points: [],
  },
  {
    kind: 'study',
    period: 'Apr 2023 — Jun 2024',
    title: 'Python Full Stack Development',
    org: 'Network Academy',
    points: [],
  },
  {
    kind: 'study',
    period: 'Aug 2020 — Mar 2023',
    title: 'BCA, Computer Application',
    org: 'MES Kalladi College',
    points: [],
  },
];

export const certifications = [
  { title: 'MERN Stack Workshop Participation', org: 'Zoople Technologies Pvt Ltd' },
  { title: 'Full Stack with Python and Django', org: '' },
  { title: 'Completion of Python 3 Training', org: '' },
];

export const publication = {
  title: 'Exploring Deep Learning and Machine Learning Approaches for Brain Haemorrhage Detection',
  venue: 'IJNRD',
  date: 'March 2026',
};

export const principles = [
  {
    k: 'Mobile first, not mobile later',
    v: 'Layouts start at the smallest screen and grow. Typography, spacing and touch targets are decided there first.',
  },
  {
    k: 'Debug before decorating',
    v: 'A lot of my work is tracing API responses and fixing what users actually hit — results, reports, logins — before polishing anything.',
  },
  {
    k: 'Built for the people running it',
    v: 'Admin dashboards get the same care as public pages. The people managing exams, events and elections use them every day.',
  },
  {
    k: 'AI as a tool, not an author',
    v: 'I use AI-assisted tools to speed up routine work, and still test, read and own every change.',
  },
];
