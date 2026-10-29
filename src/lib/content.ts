import portrait from '../assets/portrait-cutout.webp'
import casual from '../assets/casual.webp'

export const photos = { portrait, casual }

export const name = 'Mohamed Sikkander'
export const shortName = 'ms'
export const email = 'sikkander1998@gmail.com'
export const phone = { label: '+91 70105 32010', href: 'tel:+917010532010' }
export const location = 'Chennai, India'
export const resumeFile = './Mohamed_Sikkander_Resume.pdf'
export const profiles = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-sikkander-iqbal' },
  { label: 'GitHub', href: 'https://github.com/sikka1998/' },
]

export const hero = {
  role: 'Full Stack Engineer at CustomerLabs',
  roleHref: 'https://www.customerlabs.com/',
  tagline: 'I build first-party data products in React, Python and GCP, from the tracker to the dashboard.',
  /** Photo coordinates are in the 1500 x 1706 space of the portrait cutout. */
  photo: { width: 1500, height: 1706 },
  notes: [
    { id: 'head', label: 'Head', text: 'I ship it end to end', side: 'right', top: 7, from: [1580, 150], curve: [[1400, 120], [1150, 110]], to: [965, 160] },
    { id: 'eyes', label: 'Eyes', text: 'I read the data first', side: 'left', top: 24, from: [-80, 480], curve: [[200, 445], [450, 436]], to: [672, 462] },
    { id: 'arm', label: 'Arm', text: 'I reach past the frontend', side: 'left', top: 52, from: [-70, 905], curve: [[80, 905], [220, 920]], to: [335, 954] },
    { id: 'heart', label: 'Heart', text: 'I chase performance', side: 'right', top: 54, from: [1560, 930], curve: [[1300, 955], [1050, 955]], to: [815, 936] },
    { id: 'hands', label: 'Hands', text: 'I fix the production fires', side: 'right', top: 72, from: [1560, 1205], curve: [[1500, 1245], [1420, 1285]], to: [1340, 1326] },
  ] as HeroNote[],
}

export type HeroNote = {
  id: string
  label: string
  text: string
  side: 'left' | 'right'
  top: number
  from: [number, number]
  curve: [[number, number], [number, number]]
  to: [number, number]
}

export const fullCircle = {
  left: 'I started in fintech frontends.',
  right: 'Now I build the data platform.',
  body: "My path ran through a loan platform for HDFC Bank's NBFC lending, then an AI-powered CRM. Today I build the first-party data platform at CustomerLabs, from the tracker on 300+ client sites to the dashboards clients open every morning.",
  link: { label: 'See CustomerLabs', href: 'https://www.customerlabs.com/' },
}

export const manifesto = 'Code is communication. I ship working features early, so product, backend and clients see the same thing.'

export const practice = [
  {
    title: 'Frontend',
    text: 'I build the screens clients live in: source configuration, audience builders and analytics dashboards. The Audiences v2 interface and the Morning Coffee dashboard are mine end to end on the frontend.',
    tools: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Astro', 'Component systems', 'Core Web Vitals'],
  },
  {
    title: 'Backend & cloud',
    text: "I don't stop at the API boundary. The TikTok source runs on FastAPI endpoints and a Cloud Functions and Pub/Sub ingestion workflow I wrote, and the AppBrew tracker's ingestion runs on GCP too.",
    tools: ['Python', 'FastAPI', 'Node.js', 'REST APIs', 'GCP Cloud Functions', 'Pub/Sub', 'Workflows', 'AWS S3 / EC2'],
  },
  {
    title: 'Tracking & data',
    text: 'I ship the script that sits on 300+ client sites and the pipelines behind it, and I keep it running when production breaks: 25+ tickets resolved across tracker, pipelines and UI.',
    tools: ['First-party tracking', 'CDN script delivery', 'Event pipelines', 'Audience segmentation', 'TikTok / Meta / Google Ads', 'Shopify'],
  },
]

export type Metric = { label: string; value: string; from?: string }

export type Project = {
  id: string
  name: string
  title: string
  summary: string
  role: string
  metrics: Metric[]
  /** Sheet colours for the home page and project page header. */
  sheet: { background: string; foreground: string; accent: string }
  screen: 'tiktok' | 'tracker' | 'coffee' | 'appbrew' | 'audiences' | 'website' | 'jeeva' | 'trustt'
  earlier?: boolean
  study: { heading: string; body: string }[]
}

export const projects: Project[] = [
  {
    id: 'tiktok-source',
    name: 'TikTok Lead Forms Source',
    title: 'Leads, straight into the CDP.',
    summary: 'I built the TikTok Lead Forms source end to end: the React configuration UI, the FastAPI APIs, and the Cloud Functions and Pub/Sub workflow that turns TikTok leads into first-party events.',
    role: 'Full stack engineer at CustomerLabs',
    metrics: [
      { label: 'Clients adopted it', value: '10+' },
      { label: 'Layers I owned', value: 'UI to Pub/Sub' },
    ],
    sheet: { background: '#8c1d3b', foreground: '#fff5f7', accent: '#ffb3c6' },
    screen: 'tiktok',
    study: [
      { heading: 'The problem', body: 'Clients running TikTok lead-generation campaigns had no way to get those leads into CustomerLabs. Leads sat in TikTok, out of reach of audiences, destinations and the rest of the first-party data the platform already held.' },
      { heading: 'What I did', body: 'I designed and built the source as one piece of work across the stack. In React I built the configuration flow where a client connects a TikTok Business account and picks the lead forms to sync. In FastAPI I built the APIs the UI calls and the endpoints that receive lead data. On GCP I wrote the Cloud Functions and the Pub/Sub ingestion workflow that normalises each lead into a first-party event, so it behaves like any other event in the CDP.' },
      { heading: 'The result', body: 'The source shipped to production and 10+ clients adopted it. TikTok leads now land as first-party events, so they can be segmented into audiences and synced to any destination without extra setup.' },
    ],
  },
  {
    id: 'tracker-v2',
    name: 'Tracker v2 Migration',
    title: 'Three hundred sites, nothing lost.',
    summary: 'I drove the migration of the first-party website tracker from v1 to v2 across every live client site, kept existing event schemas intact, and moved vendor script loading onto our own CDN.',
    role: 'Full stack engineer at CustomerLabs',
    metrics: [
      { label: 'Live client sites migrated', value: '300+' },
      { label: 'Data lost during cutover', value: '0' },
    ],
    sheet: { background: '#c9d66a', foreground: '#141414', accent: '#3a3f1a' },
    screen: 'tracker',
    study: [
      { heading: 'The problem', body: 'The tracker is the script every CustomerLabs client puts on their site. Version 1 had grown hard to extend, and vendor scripts it loaded came from third-party domains, which made load behaviour depend on hosts we did not control.' },
      { heading: 'What I did', body: 'I drove the migration from cltracker v1 to v2 across 300+ live client sites. The new tracker preserved every existing event schema so no client integration had to change, and the cutover was staged so events kept flowing throughout. I moved vendor script loading onto the CustomerLabs CDN host, which removed the dependence on third-party domains and improved caching, load reliability and resilience to tracking restrictions.' },
      { heading: 'The result', body: 'All 300+ sites moved to v2 with zero data loss during cutover. Scripts now load from a host we own, and later tracker work such as the AppBrew mobile integration built on the v2 foundation.' },
    ],
  },
  {
    id: 'morning-coffee',
    name: 'Morning Coffee Analytics',
    title: 'One dashboard before the first coffee.',
    summary: 'I built the full frontend of Morning Coffee, an in-app analytics dashboard that unifies metrics from connected Google Ads, Meta Ads and Shopify accounts into one daily performance snapshot.',
    role: 'Frontend owner at CustomerLabs',
    metrics: [
      { label: 'Ad and store accounts in one view', value: '3' },
      { label: 'Chart and metric components', value: '1 system' },
    ],
    sheet: { background: '#3b5bdb', foreground: '#f4f6ff', accent: '#c7d2ff' },
    screen: 'coffee',
    study: [
      { heading: 'The problem', body: 'Clients checked ad spend in Google Ads, results in Meta Ads and revenue in Shopify, then stitched the picture together themselves. The platform already connected all three accounts but had no single place to read them.' },
      { heading: 'What I did', body: 'I built the Morning Coffee frontend end to end in React: the account connection states, the daily snapshot layout, and a reusable set of chart and metric-card components with filters that every panel shares. Data from the connected Google Ads, Meta Ads and Shopify accounts renders through the same component system, so new metrics drop in without new UI work.' },
      { heading: 'The result', body: 'Clients get one daily performance snapshot inside the app instead of three tabs. The chart and metric components are now the base for other reporting surfaces in the product.' },
    ],
  },
  {
    id: 'appbrew-tracking',
    name: 'AppBrew Mobile Tracking',
    title: 'The tracker, inside a mobile app.',
    summary: 'I owned the AppBrew tracker from design to release: the event schema, ingestion endpoints and GCP processing that let Shopify brands using AppBrew mobile apps capture in-app events next to their web data.',
    role: 'Full stack engineer at CustomerLabs',
    metrics: [
      { label: 'Brands live at launch', value: '2' },
      { label: 'From design to release', value: 'Owned' },
    ],
    sheet: { background: '#1f6f5f', foreground: '#f1fbf7', accent: '#9fe3cf' },
    screen: 'appbrew',
    earlier: true,
    study: [
      { heading: 'The problem', body: 'Brands that run their store through an AppBrew mobile app had no tracking inside the app, so in-app behaviour never reached the CDP.' },
      { heading: 'What I did', body: 'I owned the integration from the first design through release: defined the event schema, built the ingestion endpoints, and wrote the GCP processing that turns in-app events into first-party events alongside web data.' },
      { heading: 'The result', body: 'The tracker launched with the first two brands, and the schema is ready for the rest of the AppBrew client base.' },
    ],
  },
  {
    id: 'audiences-v2',
    name: 'Audiences v2',
    title: 'A new audience builder, no interruptions.',
    summary: 'I rebuilt the Audiences UI for v2 in React, moving segment creation, editing and sync views onto the new module without disrupting client workflows.',
    role: 'Frontend engineer at CustomerLabs',
    metrics: [
      { label: 'Views migrated', value: 'Create, edit, sync' },
      { label: 'Client workflows disrupted', value: '0' },
    ],
    sheet: { background: '#5b2a86', foreground: '#f7f1ff', accent: '#d9c3ff' },
    screen: 'audiences',
    earlier: true,
    study: [
      { heading: 'The problem', body: 'The Audiences module was moving to a new v2 engine, and the UI had to move with it while clients kept building and syncing segments every day.' },
      { heading: 'What I did', body: 'I rebuilt the segment creation, editing and sync views in React against the v2 module, keeping the flows clients already knew.' },
      { heading: 'The result', body: 'Audiences moved to v2 without a pause in client work, and the new UI is the base for later segmentation features.' },
    ],
  },
  {
    id: 'customerlabs-website',
    name: 'CustomerLabs Website',
    title: 'A marketing site that scores like a product.',
    summary: 'I developed the CustomerLabs landing website on Astro and built its webinar pages, with a 97 Lighthouse performance score and 100 SEO on desktop and Core Web Vitals passing in real-user data.',
    role: 'Frontend engineer at CustomerLabs',
    metrics: [
      { label: 'Lighthouse performance, desktop', value: '97' },
      { label: 'Lighthouse SEO', value: '100' },
    ],
    sheet: { background: '#1d4ed8', foreground: '#eef3ff', accent: '#bcd0ff' },
    screen: 'website',
    earlier: true,
    study: [
      { heading: 'The problem', body: 'The marketing site had to load fast for cold visitors and let the team publish webinar pages quickly.' },
      { heading: 'What I did', body: 'I built the site on Astro with static output, developed the webinar page templates, and tuned images, scripts and layout for Core Web Vitals.' },
      { heading: 'The result', body: 'Desktop Lighthouse scores of 97 for performance and 100 for SEO, with real-user Core Web Vitals passing.' },
    ],
  },
  {
    id: 'jeeva-ai',
    name: 'Jeeva AI',
    title: 'A CRM that got 35% faster.',
    summary: 'At Jeeva AI I led frontend features on an AI-powered CRM and lead generation platform, improving application performance by 35% with code splitting, lazy loading and memoization.',
    role: 'Senior frontend developer at Jeeva AI',
    metrics: [
      { label: 'Application performance', value: '+35%' },
      { label: 'Large lists rendered with', value: 'react-window' },
    ],
    sheet: { background: '#0f766e', foreground: '#effdf9', accent: '#a7f3d0' },
    screen: 'jeeva',
    earlier: true,
    study: [
      { heading: 'The problem', body: 'The CRM rendered large datasets and third-party data provider views, and the frontend had become slow to load and work in.' },
      { heading: 'What I did', body: 'I led end-to-end development of critical features, introduced code splitting, lazy loading and memoization, virtualised large lists with react-window, integrated third-party data platforms through secure iframe communication, and added Jest unit tests.' },
      { heading: 'The result', body: 'Application performance improved by 35%, and production regressions dropped with the new test coverage.' },
    ],
  },
  {
    id: 'trustt-lms',
    name: 'Trustt Loan Management',
    title: "Loan servicing for HDFC Bank's NBFC platform.",
    summary: 'At Trustt (formerly Novopay) I built and scaled the frontend of a loan management system with foreclosure, part-payment and repayment flows, using React, Redux Toolkit and TypeScript.',
    role: 'Frontend developer at Trustt',
    metrics: [
      { label: 'Years on the platform', value: '3' },
      { label: 'Reusable component architecture', value: 'Designed' },
    ],
    sheet: { background: '#1e293b', foreground: '#f1f5f9', accent: '#cbd5e1' },
    screen: 'trustt',
    earlier: true,
    study: [
      { heading: 'The problem', body: "HDFC Bank's NBFC lending platform needed a frontend that could handle end-to-end loan servicing at bank scale." },
      { heading: 'What I did', body: 'I built high-traffic fintech screens with React, Redux Toolkit and TypeScript, designed the reusable component architecture the team built on, optimised load times with browser caching and rendering strategies, and mentored junior developers.' },
      { heading: 'The result', body: 'Faster development across teams and better load times on the customer-facing flows, over three years on the platform.' },
    ],
  },
]

export function projectById(id: string) {
  return projects.find((project) => project.id === id)
}

export const featuredProjects = projects.filter((project) => !project.earlier)

export type Job = { company: string; role: string; dates: string; location?: string; summary: string; highlights: string[] }

export const experience: Job[] = [
  {
    company: 'CustomerLabs',
    role: 'Associate Software Engineer, full stack',
    dates: 'Jun 2026 - Now',
    location: 'Chennai',
    summary: 'First-party data platform (CDP) built with React, Python/FastAPI and GCP.',
    highlights: [
      'Built and released the TikTok Lead Forms data source end to end, covering the React configuration UI, FastAPI APIs and the Cloud Functions/Pub/Sub ingestion workflow; adopted by 10+ clients.',
      'Drove the migration of the first-party website tracker (cltracker) from v1 to v2 across 300+ live client sites, preserving existing event schemas and ensuring zero data loss during cutover.',
      "Moved vendor script loading onto CustomerLabs' own CDN host, removing dependence on third-party domains and improving load reliability, caching and resilience to tracking restrictions.",
      'Owned the AppBrew (Shopify mobile-app builder) tracker from design to release, including event schema, ingestion endpoints and GCP processing, launching in-app event capture with the first 2 brands.',
      'Rebuilt the Audiences UI for v2 in React, migrating segment creation, editing and sync views onto the new module without disrupting existing client workflows.',
      'Built the full frontend of Morning Coffee, an in-app analytics dashboard that unifies metrics from connected Google Ads, Meta Ads and Shopify accounts into a daily performance snapshot.',
      'Diagnosed and resolved 25+ production tickets across the tracker, ingestion pipelines and app UI.',
      'Developed the CustomerLabs landing website on Astro and built webinar pages, achieving a 97 Lighthouse performance score and 100 SEO on desktop.',
    ],
  },
  {
    company: 'Jeeva AI',
    role: 'Senior Frontend Developer',
    dates: 'Sep 2025 - Feb 2026',
    summary: 'AI-powered CRM and lead generation platform.',
    highlights: [
      'Led end-to-end development of critical frontend features, improving application performance by 35% through code splitting, lazy loading and memoization.',
      'Engineered scalable UI for large datasets using virtualization (react-window), and integrated third-party data platforms via secure iframe communication.',
      'Collaborated with backend and DevOps teams on AWS S3 and EC2 for asset management and deployments, and strengthened reliability with Jest unit tests.',
    ],
  },
  {
    company: 'Trustt',
    role: 'Frontend Developer',
    dates: 'Jun 2022 - Jul 2025',
    summary: "Loan management system for HDFC Bank's NBFC lending platform, formerly Novopay.",
    highlights: [
      'Built and scaled high-traffic fintech frontend applications using React, Redux Toolkit and TypeScript.',
      'Designed reusable component architecture, improving development speed and consistency across teams.',
      'Optimized frontend performance using browser-level techniques (caching, storage, rendering strategies), improving application load times.',
      'Partnered with product and backend teams to deliver customer-facing features at scale; active in code reviews and Agile ceremonies, and mentored junior developers.',
    ],
  },
]

export const experienceIntro = "In 4+ years I've gone from fintech frontends at Trustt to full stack product work at CustomerLabs, where I own features from the React UI to the GCP pipeline."

export const toolkit = ['React', 'TypeScript', 'Python', 'FastAPI', 'GCP', 'Pub/Sub', 'Cloud Functions', 'Astro', 'Tailwind CSS', 'Redux Toolkit', 'Jest', 'Vite', 'Git', 'Lighthouse', 'Claude Code']

export const interests = [
  { title: 'Gaming', text: 'Good games teach their systems without a manual. I pay attention to how.' },
  { title: 'Technology', text: 'I try new tools early to see what they change about how I build.' },
  { title: 'Fitness', text: 'Training keeps my head clear for the next production fire.' },
  { title: 'Football', text: 'Ninety minutes of reading the game and moving before the ball arrives.' },
]

export const education = [{ degree: 'B.E. Electronics and Communication Engineering', school: 'Karpagam College of Engineering, Coimbatore', dates: 'Aug 2016 - Sep 2020', note: 'CGPA 7.6' }]

export const certifications = ['Fellowship in Software Development, Full Stack (2025)', 'Programming with JavaScript, Meta (2024)', 'Web Development Bootcamp, Udemy (2023)']

export const skillGroups = [
  { group: 'Frontend', items: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'Redux Toolkit', 'React Hooks', 'Astro', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive design', 'Browser APIs'] },
  { group: 'Backend & cloud', items: ['Python', 'FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'GCP (Cloud Functions, Pub/Sub, Workflows)', 'AWS (S3, EC2)'] },
  { group: 'Tracking & data', items: ['First-party tracking scripts', 'CDN script delivery', 'Event ingestion pipelines', 'Audience segmentation', 'TikTok, Meta, Google Ads and Shopify integrations'] },
  { group: 'Architecture & performance', items: ['SPA architecture', 'Component design', 'State management', 'Code splitting', 'Lazy loading', 'Memoization', 'Virtualization', 'Core Web Vitals'] },
  { group: 'Testing & tools', items: ['Jest', 'Unit testing', 'Code reviews', 'Git', 'Webpack', 'Vite', 'ESLint', 'Chrome DevTools', 'Lighthouse', 'CI/CD'] },
]

export const resumeSummary = 'Full Stack Engineer with 4+ years of experience building scalable, high-performance web products using React, TypeScript, Python/FastAPI and GCP. At CustomerLabs I shipped a new data source end to end, migrated a tracker running on 300+ client sites, and launched mobile event tracking from design to release.'

export const about = {
  title: 'Curiosity brought me here.',
  intro: 'I am a full stack engineer in Chennai. I started on the frontend of a bank lending platform, moved to an AI CRM, and now build the first-party data platform at CustomerLabs across React, FastAPI and GCP.',
  story: [
    { heading: 'Fintech first', body: "Three years at Trustt taught me what production means at bank scale: a loan management frontend for HDFC Bank's NBFC lending platform, where a slow screen or a bad state is a customer waiting on a repayment. I learned to design component systems other teams could build on, and to measure performance before claiming it." },
    { heading: 'Then speed', body: 'At Jeeva AI the brief was speed. I led frontend features on an AI-powered CRM, cut load time by 35% with code splitting and memoization, and made large lists feel instant with virtualization. I also learned how much a frontend depends on the shape of the data behind it.' },
    { heading: 'Now the whole stack', body: 'At CustomerLabs I own features from the React UI to the GCP pipeline. I built the TikTok Lead Forms source end to end, migrated the tracker on 300+ client sites to v2, launched mobile tracking for AppBrew, and built the Morning Coffee analytics frontend. When production breaks, I am often the one who finds out why.' },
    { heading: 'How I work', body: 'I ship working features early so product, backend and clients see the same thing. I write for the person who reads the code next, and I keep one proof point per claim.' },
  ],
}
