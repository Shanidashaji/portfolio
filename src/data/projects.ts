// Project content. "contribution" comes from the résumé and from the work
// recorded in each project's own development history. "product" / "features"
// describe the product itself, taken from each project's documentation —
// they describe the team's product, not individual ownership.
// Screenshots were captured from local development builds of each project.

export type PreviewKind = 'giokerala' | 'gio' | 'jih' | 'qsc' | 'qspot' | 'malarvadi' | 'election';

export type Shot = { src: string; srcSet?: string; alt: string; w: number; h: number; device: 'desktop' | 'mobile' };

/** Desktop + mobile screenshot pair stored as public/work/<key>-desktop-*.webp and <key>-mobile-375.webp */
const pair = (key: string, label: string): Shot[] => [
  {
    src: `/work/${key}-desktop-1440.webp`,
    srcSet: `/work/${key}-desktop-800.webp 800w, /work/${key}-desktop-1440.webp 1440w`,
    alt: `${label} on desktop`,
    w: 1440,
    h: 1000,
    device: 'desktop',
  },
  { src: `/work/${key}-mobile-375.webp`, alt: `${label} on a mobile screen`, w: 375, h: 780, device: 'mobile' },
];

export type Project = {
  slug: string;
  index: string;
  name: string;
  short: string;
  kind: string;
  context: string;
  period: string;
  role: string;
  tagline: string;
  product: string;
  contribution: string[];
  features: string[];
  stack: string[];
  notes?: string[];
  shots?: Shot[];
  galleryNote?: string;
  preview: PreviewKind;
  accent: string;
  live?: string;
  source?: string;
  linkNote: string;
};

export const projects: Project[] = [
  {
    slug: 'gio-kerala',
    index: '01',
    name: 'GIO Kerala',
    short: 'WordPress to Next.js rebuild',
    kind: 'Organisation Website Rebuild',
    context: 'D4DX Innovations',
    period: '2026 — ongoing',
    role: 'Full-stack developer',
    tagline: 'Moving a statewide organisation’s WordPress site to Next.js on Cloudflare — without breaking a single old link.',
    product:
      'A rebuild of giokerala.org, the website of Girls Islamic Organization Kerala, from WordPress to a Next.js site that runs on Cloudflare Workers with its content in a D1 database. It carries over the Malayalam news and events, leader pages from 1984 to today, gallery, documents and contact, and adds an admin dashboard so the organisation can edit everything itself.',
    contribution: [
      'Audited the WordPress site and migrated its content from a frozen snapshot: 34 posts, 11 pages, 123 leaders in 32 groups and 359 media files, with an importer that never creates duplicates.',
      'Kept old WordPress addresses working: verified legacy URLs (including Malayalam slugs) stay at the same path, old post links redirect, and old thumbnail sizes are served by resizing the original.',
      'Built the admin dashboard — posts with draft and publish, leaders, events, media library, settings, a contact inbox and a client-review queue — with env-only login, rate limiting and TOTP two-factor sign-in.',
      'Polished the public site: full-width hero carousel, highlights poster marquee with a zoom lightbox, YouTube video cards, a welcome splash, a redesigned contact page, a more compact layout and scroll-reveal animations.',
    ],
    features: [
      'Malayalam-first news, events and pages',
      'State, district and former leaders timeline (1984 to today)',
      'Gallery, documents and site-wide search',
      'Legacy WordPress URL and image compatibility',
      'Admin dashboard with review queue, media library and contact inbox',
      'Feed, sitemap and robots.txt',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Workers', 'Cloudflare D1', 'Drizzle ORM', 'Better Auth'],
    notes: [
      'Runs on Cloudflare Workers through OpenNext, with a custom Worker entry that handles legacy WordPress URLs and media before the Next.js app.',
      'The live giokerala.org WordPress site was left untouched while the rebuild was developed and tested locally.',
    ],
    shots: [
      {
        src: '/work/giokerala-en-desktop-1440.webp',
        srcSet: '/work/giokerala-en-desktop-800.webp 800w, /work/giokerala-en-desktop-1440.webp 1440w',
        alt: 'Rebuilt GIO Kerala homepage with the hero carousel and Call for Papers banner',
        w: 1440,
        h: 1000,
        device: 'desktop',
      },
      { src: '/work/giokerala-en-mobile-375.webp', alt: 'GIO Kerala Former Leaders timeline on a mobile screen', w: 375, h: 780, device: 'mobile' },
      {
        src: '/work/giokerala-leaders-desktop-1440.webp',
        srcSet: '/work/giokerala-leaders-desktop-800.webp 800w, /work/giokerala-leaders-desktop-1440.webp 1440w',
        alt: 'GIO Kerala Former Leaders page with the leaders timeline',
        w: 1440,
        h: 1000,
        device: 'desktop',
      },
      {
        src: '/work/giokerala-gallery-desktop-1440.webp',
        srcSet: '/work/giokerala-gallery-desktop-800.webp 800w, /work/giokerala-gallery-desktop-1440.webp 1440w',
        alt: 'GIO Kerala gallery page',
        w: 1440,
        h: 1000,
        device: 'desktop',
      },
      {
        src: '/work/giokerala-admin-desktop-1440.webp',
        srcSet: '/work/giokerala-admin-desktop-800.webp 800w, /work/giokerala-admin-desktop-1440.webp 1440w',
        alt: 'GIO Kerala admin dashboard sign-in page',
        w: 1440,
        h: 1000,
        device: 'desktop',
      },
    ],
    galleryNote: 'Former Leaders timeline, gallery and the admin sign-in.',
    preview: 'giokerala',
    accent: '#3d8bd9',
    linkNote: 'Client project in progress — not live yet; source is private.',
  },
  {
    slug: 'gio-conference',
    index: '02',
    name: 'GIO Conference',
    short: 'Conference website + registrations',
    kind: 'Conference Website & Registration System',
    context: 'D4DX Innovations',
    period: '2026',
    role: 'Full-stack developer',
    tagline: 'A conference website where registering ends with a QR entry pass on WhatsApp.',
    product:
      'The website and registration system for the GIO Keralam International Conference on Women (15 November 2026, Ernakulam). Visitors read about the conference and register through a public form; an admin confirms each registration with one action, which issues an entry pass with a signed QR code and sends it on WhatsApp. Organisers manage the website content and the registrations from one admin console.',
    contribution: [
      'Built the registration management system: public form, admin review and one-step confirmation, and entry passes with signed QR codes sent on WhatsApp through the DXing API.',
      'Turned the registration link into a full conference landing page with a Register Now flow, in the selected minimal design.',
      'Made the website content admin-managed — programme, speakers, announcements, FAQs, gallery and image uploads, with draft, publish and preview.',
      'Redesigned the registration form and the admin dashboard to match the website theme, mobile-first, with summary cards, search and filters.',
    ],
    features: [
      'Conference landing page with theme, programme, registration and venue',
      'Public registration form with district-wise details',
      'Admin dashboard with search, sort, filters and status badges',
      'QR entry passes sent on WhatsApp, with message log and retry',
      'Role-based admin and staff accounts, pass verification',
      'Admin-editable website content with image uploads and draft preview',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    notes: [
      'One Node process serves both the API and the built React client, so the browser only talks to one origin.',
    ],
    shots: pair('gio', 'GIO Keralam International Conference on Women landing page'),
    preview: 'gio',
    accent: '#e8707e',
    linkNote: 'Client project — live URL and source are not public.',
  },
  {
    slug: 'qspot',
    index: '03',
    name: 'Qspot',
    short: 'Quiz & examination management',
    kind: 'Quiz and Examination Management System',
    context: 'D4DX Innovations',
    period: '2026 — ongoing',
    role: 'Full-stack contributor',
    tagline: 'Quizzes, exams and results for a learning programme — managed from one admin panel.',
    product:
      'Qspot is a content and quiz companion for a learning programme. Learners use a mobile app; the team running the programme manages courses, quizzes, questions and results through a React admin panel backed by an Express and MongoDB REST API.',
    contribution: [
      'Contributed to the development and maintenance of the full-stack examination management application.',
      'Worked on examination, results and report-generation functionality.',
    ],
    features: [
      'Admin panel for courses, subjects, quizzes and question banks',
      'Quiz attempts, gradebook and work marking',
      'Assignments, schedules and certificates',
      'Learning analytics and user-activity views',
      'Flutter mobile app for learners',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    notes: [
      'Ships as three codebases in one repository: a Flutter mobile app, a React + Vite admin panel and an Express + MongoDB API.',
    ],
    shots: pair('qspot', 'Qspot admin panel sign-in page'),
    preview: 'qspot',
    accent: '#ff9fbd',
    linkNote: 'Client project — live URL and source are not public.',
  },
  {
    slug: 'jih-womens-wing',
    index: '04',
    name: 'JIH Women’s Wing',
    short: 'Bilingual organisation website',
    kind: 'Organisation Website',
    context: 'D4DX Innovations',
    period: '2026',
    role: 'Frontend / UI',
    tagline: 'A bilingual Malayalam–English home for a statewide women’s organisation.',
    product:
      'The website for Jamaat-e-Islami Hind Women’s Wing Kerala — presenting its departments, programmes, events, media and news in Malayalam and English. The same project also includes a web application for the Women Entrepreneurs Summit (WES), covering event promotion and registration.',
    contribution: [
      'Improved mobile-first responsive layouts across the site.',
      'Refined typography and page consistency across devices.',
    ],
    features: [
      'Malayalam / English language switch',
      'Departments, programmes, events, media and news sections',
      'President’s message and organisation overview',
      'Newsletter sign-up and contact details',
      'Companion Women Entrepreneurs Summit event site',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Responsive Design'],
    notes: [
      'The same layouts carry both Malayalam and English content, from 375 px phones up to wide desktop screens.',
    ],
    shots: [
      {
        src: '/work/jih-en-desktop-1440.webp',
        srcSet: '/work/jih-en-desktop-800.webp 800w, /work/jih-en-desktop-1440.webp 1440w',
        alt: 'JIH Women’s Wing website home page in English on desktop, with the hero carousel and programme highlights',
        w: 1440,
        h: 1000,
        device: 'desktop',
      },
      {
        src: '/work/jih-en-mobile-375.webp',
        alt: 'JIH Women’s Wing English website on a 375 px mobile screen, with the President’s message',
        w: 375,
        h: 780,
        device: 'mobile',
      },
      {
        src: '/work/wes-desktop-1440.webp',
        srcSet: '/work/wes-desktop-800.webp 800w, /work/wes-desktop-1440.webp 1440w',
        alt: 'Women Entrepreneurs Summit event site hero on desktop',
        w: 1440,
        h: 1000,
        device: 'desktop',
      },
      {
        src: '/work/wes-mobile-375.webp',
        alt: 'Women Entrepreneurs Summit event site on a mobile screen',
        w: 375,
        h: 780,
        device: 'mobile',
      },
    ],
    galleryNote: 'Women Entrepreneurs Summit event site — part of the same project.',
    preview: 'jih',
    accent: '#e0418f',
    linkNote: 'Client project — source is private.',
  },
  {
    slug: 'malarvadi',
    index: '05',
    name: 'Malarvadi',
    short: 'Organisational website + admin',
    kind: 'Organisational Website',
    context: 'D4DX Innovations',
    period: '2026',
    role: 'Full-stack contributor',
    tagline: 'History, programmes and events of a children’s organisation, told in two languages.',
    product:
      'An organisational website for Malarvadi, a children’s organisation — presenting its history, objectives, activities, events and announcements, with an admin panel for keeping that content up to date.',
    contribution: [
      'Contributed to the organisational website presenting the organisation’s history, objectives, activities, events and announcements.',
      'Restructured the menu into an About Us dropdown with About Us, Objectives and Our Global Presence — in both English and Malayalam.',
      'Polished the UI with consistent type sizes, child-friendly illustrations and visible, purposeful animations.',
      'Made the whole site mobile-friendly and reworked the footer.',
    ],
    features: [
      'Bilingual pages in English and Malayalam',
      'History timeline, objectives and leaders',
      'Programmes and events with detail pages',
      'News, photo gallery albums and a validated contact form',
      'Admin panel with bilingual content editors',
    ],
    stack: ['Next.js', 'Tailwind CSS', 'Express.js', 'MongoDB'],
    notes: [
      'Organised as a monorepo: a Next.js frontend, an Express REST API and shared validation schemas.',
    ],
    shots: pair('malarvadi', 'Malarvadi website home page, “Small Steps, Big Change!”'),
    preview: 'malarvadi',
    accent: '#ffc29a',
    linkNote: 'Client project — live URL and source are not public.',
  },
  {
    slug: 'qsc',
    index: '06',
    name: 'QSC',
    short: 'Quran Study Centre Kerala portal',
    kind: 'Exam & Results Portal',
    context: 'D4DX Innovations',
    period: '2026',
    role: 'Frontend / UI',
    tagline: 'The public portal and results system for Quran Study Centre Kerala — bilingual, statewide.',
    product:
      'The web portal for Quran Study Centre Kerala (QSC): a Malayalam-first public site for registration checks, syllabus and study material, with logins and dashboards for the administrators who run exams and publish results across districts, areas and study centres.',
    contribution: [
      'Improved frontend interfaces, including the login page and responsive layouts.',
      'Built district-wise and state-level bulk result downloads (ZIP) on the existing results system.',
      'Reworked the homepage hero section, the video section, layout spacing and animations.',
    ],
    features: [
      'Malayalam-first public homepage',
      'Registration verification and hall tickets',
      'Syllabus, study material and downloads',
      'Role-based logins and admin dashboards',
      'Exam results with bulk downloads by state, district and area',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Express.js', 'MongoDB'],
    shots: pair('qsc-en', 'QSC Kerala admin workspace sign-in page'),
    preview: 'qsc',
    accent: '#8fb8ff',
    linkNote: 'Client project — live URL and source are not public.',
  },
  {
    slug: 'election-portal',
    index: '07',
    name: 'Election Portal',
    short: 'Election management system',
    kind: 'Election Management System',
    context: 'D4DX Innovations',
    period: '2026',
    role: 'Frontend / UI',
    tagline: 'Running an election end to end — voters, nominees, ballots and results.',
    product:
      'A web-based election management portal: administrators set up elections, voter groups and nominees, voters cast ballots, and results are published — designed mobile-first as an installable web app.',
    contribution: ['Contributed to the development of the web-based election management portal.'],
    features: [
      'Election creation and workspace',
      'Voters, voter groups and nominees',
      'Voting portal and ballot',
      'Results and analytics',
      'Audit logs and admin management',
    ],
    stack: ['Frontend', 'UI', 'React', 'TypeScript'],
    notes: ['Built as a mobile-first progressive web app, branded Vote+.'],
    shots: pair('election', 'Vote+ election portal sign-in page'),
    preview: 'election',
    accent: '#b8a2f0',
    linkNote: 'Client project — live URL and source are not public.',
  },
];

export type ArchiveProject = {
  shot?: { src: string; srcSet: string; alt: string };
  name: string;
  kind: string;
  stack: string[];
  summary: string;
  source?: string;
  tag: string;
};

export const archive: ArchiveProject[] = [
  {
    name: 'AI-Powered Fire Detection',
    kind: 'Disaster response monitoring',
    stack: ['Python', 'Machine Learning', 'Computer Vision'],
    summary: 'A system that uses machine learning and computer vision to detect fire and support disaster response monitoring.',
    shot: {
      src: '/work/firenet-desktop-1440.webp',
      srcSet: '/work/firenet-desktop-800.webp 800w, /work/firenet-desktop-1440.webp 1440w',
      alt: 'FireNet fire-detection portal homepage with citizen reporting, police and medical response sections',
    },
    tag: 'Academic',
  },
  {
    name: 'MERN To-Do Manager',
    kind: 'Task management',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    summary: 'A task management web application built on the MERN stack.',
    source: 'https://github.com/Shanidashaji/todo-managment-system',
    tag: 'Personal',
  },
  {
    name: 'Electro Medicon',
    kind: 'Automated meter reading',
    stack: ['Flask', 'Python', 'Flutter', 'Android'],
    summary: 'An automated meter reading system with a Flask backend and an Android application.',
    tag: 'Academic',
  },
  {
    name: 'Testimonial Wall',
    kind: 'Rural community platform',
    stack: ['Django', 'HTML', 'CSS', 'JavaScript', 'SQLite', 'Bootstrap'],
    summary: 'A Django web platform for a rural community, with a testimonial wall and SQLite storage.',
    tag: 'Academic',
  },
  {
    name: 'Healthy Baby',
    kind: 'E-commerce platform',
    stack: ['Python', 'JavaScript'],
    summary: 'An e-commerce web platform built with Python and JavaScript.',
    tag: 'Academic',
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
