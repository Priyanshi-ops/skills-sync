import { useState, createContext, useContext, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Aboutus from './Aboutus'

// ---- Theme Context ----
export const ThemeCtx = createContext({ dark: true })
export const useTheme = () => useContext(ThemeCtx)

// ---- Keyframe Styles injected once ----
const STYLES = `
@keyframes floatA { 0%,100%{transform:translateY(0px) rotate(-2deg)} 50%{transform:translateY(-18px) rotate(2deg)} }
@keyframes floatB { 0%,100%{transform:translateY(0px) rotate(3deg)} 50%{transform:translateY(-12px) rotate(-3deg)} }
@keyframes floatC { 0%,100%{transform:translateY(0px) rotate(-1deg)} 50%{transform:translateY(-22px) rotate(1deg)} }
@keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.float-a{animation:floatA 5s ease-in-out infinite}
.float-b{animation:floatB 6.5s ease-in-out infinite}
.float-c{animation:floatC 4.2s ease-in-out infinite}
.grad-bg{background-size:200% 200%;animation:gradShift 8s ease infinite}
.fade-up{animation:fadeUp 0.6s ease both}
`

// ---------- JOB DATABASE ----------
const ALL_JOBS = [
  {
    id: 1,
    title: 'Backend Developer',
    badge: 'High Match',
    badgeColor: 'bg-green-500',
    dotColor: 'bg-green-500',
    skills: ['Java & Spring Boot', 'REST API Development', 'Database Management'],
    keywords: ['java', 'spring', 'spring boot', 'rest', 'rest api', 'mysql', 'sql', 'backend', 'api'],
    requiredSkills: ['Java', 'Spring Boot', 'REST API', 'MySQL', 'Git', 'Docker', 'Microservices'],
    missingSkills: [
      'Docker & Containerization',
      'Microservices Architecture',
      'Unit Testing (JUnit / Mockito)',
      'Git & Version Control',
      'CI/CD Pipeline basics',
    ],
    roadmap: [
      { step: 1, title: 'Master Core Java', desc: 'OOP, Collections, Exception Handling, Streams API' },
      { step: 2, title: 'Learn Spring Boot', desc: 'REST controllers, JPA, Security, Actuator' },
      { step: 3, title: 'Database Fundamentals', desc: 'MySQL queries, indexing, transactions, ORM with Hibernate' },
      { step: 4, title: 'API Design & Testing', desc: 'REST best practices, Postman, Swagger documentation' },
      { step: 5, title: 'Containerization', desc: 'Docker basics, docker-compose, deployment on cloud' },
      { step: 6, title: 'Microservices & CI/CD', desc: 'Service discovery, API gateway, Jenkins / GitHub Actions' },
    ],
  },
  {
    id: 2,
    title: 'Java Developer',
    badge: 'Good Match',
    badgeColor: 'bg-yellow-500',
    dotColor: 'bg-yellow-500',
    skills: ['Core Java Programming', 'OOP Principles', 'SQL Knowledge'],
    keywords: ['java', 'oop', 'sql', 'jdbc', 'maven', 'gradle', 'junit'],
    requiredSkills: ['Java', 'OOP', 'SQL', 'Maven', 'JUnit', 'Design Patterns'],
    missingSkills: [
      'Design Patterns (Singleton, Factory, Observer)',
      'Maven / Gradle build tools',
      'JUnit & Mockito testing',
      'Multithreading & Concurrency',
      'JDBC & Connection Pooling',
    ],
    roadmap: [
      { step: 1, title: 'Core Java Mastery', desc: 'Generics, Lambdas, Streams, Optional, Java 8+ features' },
      { step: 2, title: 'OOP & Design Patterns', desc: 'SOLID principles, GOF patterns, clean code practices' },
      { step: 3, title: 'Build Tools', desc: 'Maven lifecycle, dependency management, Gradle basics' },
      { step: 4, title: 'Testing', desc: 'JUnit 5    , Mockito, TDD approach' },
      { step: 5, title: 'Concurrency', desc: 'Threads, ExecutorService, synchronized, CompletableFuture' },
    ],
  },
  {
    id: 3,
    title: 'API Specialist',
    badge: 'Moderate Match',
    badgeColor: 'bg-indigo-500',
    dotColor: 'bg-blue-500',
    skills: ['RESTful APIs', 'Postman Testing', 'API Documentation'],
    keywords: ['rest', 'api', 'postman', 'swagger', 'graphql', 'http', 'json'],
    requiredSkills: ['REST', 'GraphQL', 'Postman', 'Swagger', 'OAuth', 'JSON', 'API Security'],
    missingSkills: [
      'GraphQL queries & mutations',
      'OAuth 2.0 & JWT authentication',
      'API rate limiting & throttling',
      'Swagger / OpenAPI documentation',
      'Webhook design patterns',
    ],
    roadmap: [
      { step: 1, title: 'REST Fundamentals', desc: 'HTTP methods, status codes, CRUD, statelessness' },
      { step: 2, title: 'API Documentation', desc: 'Swagger/OpenAPI 3.0, Postman collections, API versioning' },
      { step: 3, title: 'Authentication & Security', desc: 'OAuth 2.0, JWT, API keys, HTTPS, CORS' },
      { step: 4, title: 'GraphQL', desc: 'Schema, resolvers, queries, mutations, subscriptions' },
      { step: 5, title: 'Advanced Patterns', desc: 'Rate limiting, caching, webhooks, event-driven APIs' },
    ],
  },
  {
    id: 4,
    title: 'Frontend Developer',
    badge: 'Good Match',
    badgeColor: 'bg-yellow-500',
    dotColor: 'bg-yellow-500',
    skills: ['React.js / Vue.js', 'HTML & CSS', 'JavaScript'],
    keywords: ['react', 'vue', 'html', 'css', 'javascript', 'js', 'tailwind', 'frontend', 'typescript'],
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Redux', 'Testing'],
    missingSkills: [
      'TypeScript (strong typing)',
      'State management (Redux / Zustand)',
      'Unit testing with React Testing Library',
      'Performance optimization (lazy loading, memoization)',
      'Accessibility (WCAG) standards',
    ],
    roadmap: [
      { step: 1, title: 'JavaScript Mastery', desc: 'ES6+, Promises, async/await, closures, prototypes' },
      { step: 2, title: 'React Deep Dive', desc: 'Hooks, context, custom hooks, component patterns' },
      { step: 3, title: 'TypeScript', desc: 'Types, interfaces, generics, TS with React' },
      { step: 4, title: 'State Management', desc: 'Redux Toolkit, Zustand, React Query for server state' },
      { step: 5, title: 'Testing & Quality', desc: 'Jest, React Testing Library, Cypress for E2E' },
      { step: 6, title: 'Performance', desc: 'Code splitting, lazy loading, Web Vitals, bundle optimization' },
    ],
  },
  {
    id: 5,
    title: 'Full Stack Developer',
    badge: 'High Match',
    badgeColor: 'bg-green-500',
    dotColor: 'bg-green-500',
    skills: ['React + Node.js', 'REST APIs', 'Database Design'],
    keywords: ['react', 'node', 'nodejs', 'express', 'mongodb', 'sql', 'rest', 'javascript', 'fullstack', 'full stack'],
    requiredSkills: ['React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'REST', 'Docker'],
    missingSkills: [
      'Node.js & Express.js backend',
      'MongoDB schema design',
      'Authentication (JWT / Passport.js)',
      'Deployment (Heroku / AWS / Vercel)',
      'Docker for development environment',
    ],
    roadmap: [
      { step: 1, title: 'Frontend Foundation', desc: 'React, HTML/CSS, JavaScript ES6+' },
      { step: 2, title: 'Backend with Node.js', desc: 'Express, middleware, routing, error handling' },
      { step: 3, title: 'Databases', desc: 'MongoDB with Mongoose, SQL with Sequelize/Prisma' },
      { step: 4, title: 'Authentication', desc: 'JWT, sessions, OAuth integration, bcrypt' },
      { step: 5, title: 'Full Stack Integration', desc: 'MERN/PERN stack, REST API design, CORS' },
      { step: 6, title: 'Deployment', desc: 'Docker, CI/CD, cloud platform (AWS/Render/Vercel)' },
    ],
  },
  {
    id: 6,
    title: 'Data Analyst',
    badge: 'Moderate Match',
    badgeColor: 'bg-indigo-500',
    dotColor: 'bg-indigo-500',
    skills: ['Python / R', 'SQL Queries', 'Data Visualization'],
    keywords: ['python', 'r', 'sql', 'pandas', 'numpy', 'excel', 'tableau', 'power bi', 'data', 'analytics'],
    requiredSkills: ['Python', 'SQL', 'Excel', 'Tableau', 'Statistics', 'Pandas', 'Power BI'],
    missingSkills: [
      'SQL (Advanced queries, window functions, joins)',
      'Excel (Advanced formulas, Pivot tables)',
      'Data Visualization tools (Power BI / Tableau)',
      'Basic Statistics & Probability',
      'Business problem understanding',
    ],
    roadmap: [
      { step: 1, title: 'Python for Data Analysis', desc: 'Pandas & NumPy mastery, data cleaning techniques, working with CSV & Excel data' },
      { step: 2, title: 'Data Visualization', desc: 'Matplotlib / Seaborn visualization, writing efficient Python scripts' },
      { step: 3, title: 'SQL for Analytics', desc: 'Complex joins, subqueries, window functions, CTEs, query optimization' },
      { step: 4, title: 'BI Tools', desc: 'Power BI dashboards, Tableau charts, KPI tracking, storytelling with data' },
      { step: 5, title: 'Statistics', desc: 'Descriptive stats, hypothesis testing, regression basics, A/B testing' },
      { step: 6, title: 'Business Acumen', desc: 'Translating data insights to business decisions, stakeholder communication' },
    ],
  },
  {
    id: 7,
    title: 'Machine Learning Engineer',
    badge: 'High Match',
    badgeColor: 'bg-green-500',
    dotColor: 'bg-green-500',
    skills: ['Python & ML Libraries', 'Model Training', 'Data Preprocessing'],
    keywords: ['python', 'machine learning', 'ml', 'tensorflow', 'pytorch', 'sklearn', 'scikit', 'deep learning', 'ai', 'nlp'],
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Math/Statistics', 'MLOps'],
    missingSkills: [
      'Deep Learning with TensorFlow / PyTorch',
      'Feature engineering & model evaluation',
      'MLOps & model deployment (MLflow, FastAPI)',
      'Natural Language Processing (NLP) basics',
      'Mathematics: Linear Algebra & Calculus for ML',
    ],
    roadmap: [
      { step: 1, title: 'Python & Math Foundation', desc: 'NumPy, Pandas, Linear Algebra, Probability, Calculus basics' },
      { step: 2, title: 'Classical ML', desc: 'Scikit-learn, regression, classification, clustering, cross-validation' },
      { step: 3, title: 'Deep Learning', desc: 'Neural networks, CNNs, RNNs, TensorFlow / PyTorch frameworks' },
      { step: 4, title: 'Specialization', desc: 'NLP (transformers, BERT), Computer Vision, or Reinforcement Learning' },
      { step: 5, title: 'MLOps', desc: 'Model versioning, deployment with FastAPI, monitoring, Docker' },
    ],
  },
  {
    id: 8,
    title: 'DevOps Engineer',
    badge: 'Good Match',
    badgeColor: 'bg-yellow-500',
    dotColor: 'bg-yellow-500',
    skills: ['Docker & Kubernetes', 'CI/CD Pipelines', 'Cloud Platforms'],
    keywords: ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins', 'linux', 'devops', 'terraform'],
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform', 'CI/CD'],
    missingSkills: [
      'Kubernetes orchestration & Helm charts',
      'Infrastructure as Code (Terraform / Ansible)',
      'Cloud certifications (AWS / Azure)',
      'Monitoring & observability (Prometheus, Grafana)',
      'Shell scripting & Linux administration',
    ],
    roadmap: [
      { step: 1, title: 'Linux & Shell Scripting', desc: 'File system, processes, bash scripting, networking basics' },
      { step: 2, title: 'Docker', desc: 'Images, containers, volumes, docker-compose, networking' },
      { step: 3, title: 'CI/CD', desc: 'Jenkins, GitHub Actions, GitLab CI, pipeline design, testing stages' },
      { step: 4, title: 'Kubernetes', desc: 'Pods, deployments, services, Helm, cluster management' },
      { step: 5, title: 'Cloud & IaC', desc: 'AWS core services, Terraform, cost optimization, cloud security' },
      { step: 6, title: 'Observability', desc: 'Prometheus, Grafana, ELK stack, alert management' },
    ],
  },
  {
    id: 9,
    title: 'Android Developer',
    badge: 'Moderate Match',
    badgeColor: 'bg-indigo-500',
    dotColor: 'bg-indigo-500',
    skills: ['Kotlin / Java', 'Android SDK', 'Material Design'],
    keywords: ['android', 'kotlin', 'java', 'android sdk', 'firebase', 'jetpack', 'mobile'],
    requiredSkills: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Firebase', 'MVVM', 'REST APIs'],
    missingSkills: [
      'Jetpack Compose (modern UI toolkit)',
      'MVVM Architecture + ViewModel + LiveData',
      'Firebase (Auth, Firestore, FCM)',
      'Coroutines & Flow for async operations',
      'Play Store publishing process',
    ],
    roadmap: [
      { step: 1, title: 'Kotlin Fundamentals', desc: 'Null safety, data classes, extensions, coroutines' },
      { step: 2, title: 'Android SDK', desc: 'Activities, Fragments, intents, permissions, lifecycles' },
      { step: 3, title: 'Jetpack Libraries', desc: 'ViewModel, LiveData, Room, Navigation, WorkManager' },
      { step: 4, title: 'Jetpack Compose', desc: 'Composables, state, theming, animations, navigation' },
      { step: 5, title: 'Firebase & Networking', desc: 'Retrofit, Firestore, Auth, push notifications' },
    ],
  },
  {
    id: 10,
    title: 'Cloud Solutions Architect',
    badge: 'High Match',
    badgeColor: 'bg-green-500',
    dotColor: 'bg-green-500',
    skills: ['AWS / Azure / GCP', 'Microservices', 'System Design'],
    keywords: ['aws', 'azure', 'cloud', 'gcp', 'microservices', 'architecture', 'system design', 'serverless'],
    requiredSkills: ['AWS', 'System Design', 'Microservices', 'Kubernetes', 'Security', 'Cost Optimization'],
    missingSkills: [
      'Cloud certifications (AWS SAA / Azure AZ-104)',
      'Cost optimization & FinOps practices',
      'Disaster recovery & high availability design',
      'Zero-trust security architecture',
      'Multi-cloud strategy design',
    ],
    roadmap: [
      { step: 1, title: 'Cloud Fundamentals', desc: 'Core services: compute, storage, networking, IAM on AWS/Azure' },
      { step: 2, title: 'System Design', desc: 'Scalability, reliability, latency, CAP theorem, distributed systems' },
      { step: 3, title: 'Microservices', desc: 'Service mesh, API gateway, event-driven design, saga pattern' },
      { step: 4, title: 'Security & Compliance', desc: 'VPC, WAF, encryption, compliance frameworks (SOC2, GDPR)' },
      { step: 5, title: 'Certifications', desc: 'AWS Solutions Architect Associate or Azure Solutions Architect Expert' },
    ],
  },
  {
    id: 11,
    title: 'Database Administrator',
    badge: 'Good Match',
    badgeColor: 'bg-yellow-500',
    dotColor: 'bg-yellow-500',
    skills: ['SQL & NoSQL', 'Query Optimization', 'Backup & Recovery'],
    keywords: ['mysql', 'postgresql', 'mongodb', 'sql', 'nosql', 'oracle', 'redis', 'database', 'dba'],
    requiredSkills: ['SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Query Optimization', 'Replication'],
    missingSkills: [
      'Database replication & high availability',
      'Query optimization & execution plans',
      'NoSQL data modeling (MongoDB, Redis)',
      'Database security & auditing',
      'Automated backup & disaster recovery',
    ],
    roadmap: [
      { step: 1, title: 'SQL Mastery', desc: 'Advanced queries, stored procedures, triggers, functions' },
      { step: 2, title: 'Database Design', desc: 'Normalization, ER diagrams, indexing strategies, partitioning' },
      { step: 3, title: 'Performance Tuning', desc: 'EXPLAIN plans, slow query logs, index optimization, caching' },
      { step: 4, title: 'NoSQL Databases', desc: 'MongoDB CRUD, aggregation; Redis caching & pub/sub' },
      { step: 5, title: 'Administration', desc: 'Replication setup, backup strategies, monitoring, security hardening' },
    ],
  },
  {
    id: 12,
    title: 'Cybersecurity Analyst',
    badge: 'Moderate Match',
    badgeColor: 'bg-indigo-500',
    dotColor: 'bg-indigo-500',
    skills: ['Network Security', 'Penetration Testing', 'SIEM Tools'],
    keywords: ['security', 'cybersecurity', 'networking', 'ethical hacking', 'linux', 'firewall', 'siem', 'pentest'],
    requiredSkills: ['Networking', 'Linux', 'Ethical Hacking', 'SIEM', 'Firewalls', 'Incident Response'],
    missingSkills: [
      'Penetration testing tools (Kali Linux, Metasploit)',
      'SIEM tools (Splunk, IBM QRadar)',
      'Incident response & forensics',
      'CompTIA Security+ / CEH certification',
      'Cloud security fundamentals',
    ],
    roadmap: [
      { step: 1, title: 'Networking Fundamentals', desc: 'TCP/IP, DNS, HTTP, firewalls, VPNs, Wireshark' },
      { step: 2, title: 'Linux & Scripting', desc: 'Kali Linux, bash scripting, file permissions, log analysis' },
      { step: 3, title: 'Ethical Hacking', desc: 'Reconnaissance, exploitation, Metasploit, OWASP Top 10' },
      { step: 4, title: 'Blue Team & SIEM', desc: 'Log monitoring, threat detection, Splunk, incident response' },
      { step: 5, title: 'Certifications', desc: 'CompTIA Security+, CEH, OSCP for advanced pentesting' },
    ],
  },
]

function matchJobs(userSkills) {
  if (userSkills.length === 0) return []
  const lowerSkills = userSkills.map((s) => s.toLowerCase())
  return ALL_JOBS
    .map((job) => {
      const hits = job.keywords.filter((kw) =>
        lowerSkills.some((us) => us.includes(kw) || kw.includes(us))
      ).length
      return { ...job, hits }
    })
    .filter((j) => j.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 6)
}

// Compute which required skills the user already has
function getMatchedRequired(job, userSkills) {
  const lower = userSkills.map((s) => s.toLowerCase())
  return job.requiredSkills.filter((rs) =>
    lower.some((us) => us.includes(rs.toLowerCase()) || rs.toLowerCase().includes(us))
  )
}

// ---------- JOB DETAIL MODAL ----------
function JobDetailModal({ job, userSkills, onClose }) {
  const matchedRequired = getMatchedRequired(job, userSkills)

  return (
    /* backdrop */
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors ${dark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {/* Header */}
        <div className="bg-indigo-700 text-white px-6 py-5 rounded-t-2xl flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{job.title}</h2>
            <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded ${job.badgeColor}`}>
              {job.badge}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-2xl leading-none ml-4 mt-0.5"
          >
            ×
          </button>
        </div>

        <div className="p-6 flex flex-col gap-7">

          {/* ✅ Skills You Have */}
          <section>
            <h3 className={`font-bold text-base mb-3 flex items-center gap-2 ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
              <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
              Skills You Have
            </h3>
            {matchedRequired.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchedRequired.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    <span className="text-green-500">✓</span> {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">None of your skills directly match this role's requirements yet.</p>
            )}
          </section>

          {/*  Missing Skills */}
          <section>
            <h3 className={`font-bold text-base mb-3 flex items-center gap-2 ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold">!</span>
              Missing Skills to Learn
            </h3>
            <ul className="space-y-2">
              {job.missingSkills.map((s, i) => (
                <li key={i} className={`flex items-start gap-3 border rounded-xl px-4 py-2.5 ${dark ? 'bg-red-900/20 border-red-900/30' : 'bg-red-50 border-red-100'}`}>
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs flex-shrink-0">✕</span>
                  <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 🗺️ Improvement Roadmap */}
          <section>
            <h3 className={`font-bold text-base mb-4 flex items-center gap-2 ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
              <span className="text-indigo-600">🗺️</span> Improvement Roadmap
            </h3>
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-100" />
              <ul className="space-y-4 pl-12">
                {job.roadmap.map((item) => (
                  <li key={item.step} className="relative">
                    {/* circle step */}
                    <div className="absolute -left-8 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow">
                      {item.step}
                    </div>
                    <div className={`border rounded-xl px-4 py-3 ${dark ? 'bg-indigo-900/30 border-indigo-800/50' : 'bg-indigo-50 border-indigo-100'}`}>
                      <p className="font-semibold text-indigo-800 text-sm">{item.title}</p>
                      <p className={`text-sm mt-0.5 ${dark ? 'text-indigo-300/80' : 'text-gray-600'}`}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold py-2.5 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- COMPONENTS ----------

function Navbar({ onToggleTheme }) {
  const { dark } = useTheme()
  const [active, setActive] = useState('Home')
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Why This Exists', path: '/about' }
  ]

  const base = dark
    ? 'bg-gray-900 text-gray-100 border-b border-gray-700'
    : 'bg-indigo-700 text-white'

  return (
    <>
      <style>{STYLES}</style>
      <nav className={`${base} px-8 py-4 flex items-center justify-between shadow-lg sticky top-0 z-40 transition-colors duration-300`}>
        <div className="flex items-center gap-2 text-xl font-bold tracking-wide">
          <span className="text-2xl">⊞</span>
          <span className={dark ? 'text-indigo-400' : 'text-white'}>SkillSync</span>
        </div>

        <ul className="flex items-center gap-8 font-medium text-sm">
          {navLinks.map((link) => (
            <li
              key={link.name}
              onClick={() => setActive(link.name)}
              className={`cursor-pointer transition-all pb-1 ${active === link.name
                ? dark ? 'border-b-2 border-indigo-400 text-indigo-400 font-semibold' : 'border-b-2 border-white font-semibold'
                : dark ? 'hover:text-indigo-400' : 'hover:text-indigo-200'
                }`}
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            title={dark ? 'Switch to Light' : 'Switch to Dark'}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${dark ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <button className={`border rounded-full px-5 py-1.5 text-sm font-medium transition-all ${dark ? 'border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-gray-900' : 'border-white hover:bg-white hover:text-indigo-700'
            }`}>
            Analyze Skills
          </button>
        </div>
      </nav>
    </>
  )
}

function SkillTag({ skill, onRemove }) {
  const { dark } = useTheme()
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${dark ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
      }`}>
      {skill}
      {onRemove && (
        <button
          onClick={() => onRemove(skill)}
          className={`ml-1 font-bold leading-none ${dark ? 'text-indigo-500 hover:text-indigo-200' : 'text-indigo-400 hover:text-indigo-700'
            }`}
        >
          ×
        </button>
      )}
    </span>
  )
}

// Floating decorative skill pills shown in the hero background
const FLOAT_PILLS = [
  { label: 'Python 🐍', cls: 'float-a top-10 left-8 opacity-70' },
  { label: 'React ⚛️', cls: 'float-b top-24 right-12 opacity-60' },
  { label: 'AWS ☁️', cls: 'float-c bottom-16 left-16 opacity-50' },
  { label: 'Docker 🐳', cls: 'float-a bottom-8 right-20 opacity-65' },
  { label: 'SQL 🗄️', cls: 'float-b top-6 left-1/3 opacity-40' },
  { label: 'Node.js 🟢', cls: 'float-c top-20 right-1/3 opacity-55' },
]

function HeroSection({ skills, setSkills, onSearch }) {
  const { dark } = useTheme()
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)

  const addSkill = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const s = input.trim()
      if (!skills.includes(s)) setSkills([...skills, s])
      setInput('')
    }
  }

  const addSkillFromButton = () => {
    if (input.trim()) {
      const s = input.trim()
      if (!skills.includes(s)) setSkills([...skills, s])
      setInput('')
    }
  }

  const removeSkill = (s) => setSkills(skills.filter((sk) => sk !== s))

  const suggestions = ['Python', 'React', 'AWS', 'Docker', 'SQL', 'Node.js', 'TypeScript', 'Machine Learning']
  const unusedSuggestions = suggestions.filter(
    (s) => !skills.map((sk) => sk.toLowerCase()).includes(s.toLowerCase())
  )

  // Gradient backgrounds
  const lightGrad = 'linear-gradient(135deg,#6366f1,#818cf8,#a78bfa,#6366f1)'
  const darkGrad = 'linear-gradient(135deg,#0f0c29,#302b63,#1a1a2e,#0f0c29)'

  return (
    <div
      className="relative overflow-hidden py-20 px-4 text-center grad-bg"
      style={{ background: dark ? darkGrad : lightGrad }}
    >
      {/* Floating background pills */}
      {FLOAT_PILLS.map(({ label, cls }) => (
        <span
          key={label}
          className={`absolute hidden md:inline-block text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none select-none ${cls} ${dark
            ? 'bg-white/10 text-white/80 border border-white/20'
            : 'bg-white/20 text-white border border-white/30'
            }`}
        >
          {label}
        </span>
      ))}

      {/* Glowing circle accents */}
      <div className={`absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none ${dark ? 'bg-purple-700' : 'bg-white'
        }`} />
      <div className={`absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none ${dark ? 'bg-indigo-500' : 'bg-white'
        }`} />

      {/* Headline */}
      <div className="relative z-10 fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
          style={{ background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.22)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}
        >
          🚀 AI-powered skill matching
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
          Discover Your<br />
          <span style={{ background: 'linear-gradient(90deg,#fde68a,#fbcfe8,#a5f3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Perfect Job Match
          </span>
        </h1>
        <p className="text-white/75 mb-8 text-sm md:text-base max-w-md mx-auto">
          Type your skills, press <kbd className="bg-white/20 text-white px-1.5 py-0.5 rounded text-xs">Enter</kbd> to add, then hit <strong className="text-white">Show Job Matches</strong>
        </p>

        {/* Skill Input Box — glassmorphism */}
        <div
          className={`inline-flex flex-wrap items-center gap-2 px-4 py-3 max-w-2xl w-full mb-4 rounded-2xl transition-all duration-300 ${focused ? 'ring-2 ring-white/60' : ''
            }`}
          style={{
            background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(14px)',
            boxShadow: focused ? '0 0 0 3px rgba(255,255,255,0.25)' : '0 8px 32px rgba(0,0,0,0.18)',
          }}
        >
          <span className={`text-sm font-semibold whitespace-nowrap ${dark ? 'text-indigo-300' : 'text-indigo-700'}`}>
            Your Skills:
          </span>
          {skills.map((s) => (
            <SkillTag key={s} skill={s} onRemove={removeSkill} />
          ))}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={addSkill}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Type a skill and press Enter…"
            className={`outline-none text-sm min-w-[160px] flex-1 bg-transparent ${dark ? 'text-white placeholder-white/40' : 'text-gray-700 placeholder-gray-400'
              }`}
          />
          <button
            onClick={addSkillFromButton}
            className="bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all shadow"
          >
            + Add
          </button>
        </div>

        {/* Quick suggestions */}
        {unusedSuggestions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-2xl mx-auto">
            <span className="text-xs text-white/50 self-center">Quick add:</span>
            {unusedSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => setSkills([...skills, s])}
                className="text-xs px-3 py-1 rounded-full transition-all font-medium"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.28)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
              >
                + {s}
              </button>
            ))}
          </div>
        )}

        {/* CTA button */}
        <button
          onClick={onSearch}
          disabled={skills.length === 0}
          className="inline-flex items-center gap-2 font-bold px-10 py-3 rounded-2xl text-base transition-all duration-300 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: skills.length === 0 ? 'rgba(255,255,255,0.2)' : 'linear-gradient(90deg,#fde68a,#fb923c)',
            color: skills.length === 0 ? '#fff' : '#1e1b4b',
            boxShadow: skills.length > 0 ? '0 0 24px rgba(251,191,36,0.5)' : 'none',
          }}
        >
          🔍 Show Job Matches
        </button>

        {/* Stats row */}
        <div className="flex justify-center gap-8 mt-10 text-white/70 text-sm">
          {[['12+', 'Job Roles'], ['100+', 'Skills Tracked'], ['Free', 'Always']].map(([num, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="text-2xl font-extrabold text-white">{num}</div>
              <div className="text-xs mt-0.5 tracking-wide uppercase">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ label, percentage, color }) {
  const { dark } = useTheme()
  return (
    <div className="mb-4">
      <p className={`text-sm mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</p>
      <div className={`w-full rounded-full h-6 relative overflow-hidden ${dark ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div
          className={`h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-700 ${color}`}
          style={{ width: `${percentage}%` }}
        >
          <span className="text-white text-xs font-bold">{percentage}%</span>
        </div>
      </div>
    </div>
  )
}

// Colour palette for top-3 matched jobs in the sidebar
const PATH_COLORS = [
  { dot: 'bg-green-500', badge: 'bg-green-100 text-green-700 border-green-200', icon: '🥇' },
  { dot: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: '🥈' },
  { dot: 'bg-indigo-500', badge: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: '🥉' },
]

function SidePanel({ matchedJobs, totalSkills }) {
  const { dark } = useTheme()
  const topScore = matchedJobs.length > 0 ? matchedJobs[0].hits : 0
  const topMatch = Math.min(100, Math.round((topScore / Math.max(totalSkills, 1)) * 100))
  const avgScore =
    matchedJobs.length > 0
      ? Math.min(100, Math.round((matchedJobs.reduce((a, j) => a + j.hits, 0) / matchedJobs.length / Math.max(totalSkills, 1)) * 100))
      : 0

  // Build dynamic learning paths: first roadmap step of each top-3 job
  const learningPaths = matchedJobs.slice(0, 3).map((job, i) => ({
    jobTitle: job.title,
    step: job.roadmap[0],          // first roadmap step is the most foundational
    color: PATH_COLORS[i],
  }))

  return (
    <div className="flex flex-col gap-6">
      {/* Skill Match Summary */}
      <div className={`rounded-xl border p-5 shadow-sm transition-colors ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <h2 className={`font-bold mb-4 ${dark ? 'text-gray-100' : 'text-gray-800'}`}>Skill Match Summary</h2>
        <ProgressBar label="Top Job Match" percentage={topMatch} color="bg-green-500" />
        <ProgressBar label="Average Match" percentage={avgScore} color="bg-indigo-500" />
        <p className="text-xs text-gray-400 mt-2">
          {matchedJobs.length} job{matchedJobs.length !== 1 ? 's' : ''} found for your skills
        </p>
      </div>

      {/* Dynamic Suggested Learning Paths */}
      <div className={`rounded-xl border p-5 shadow-sm transition-colors ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <h2 className={`font-bold mb-1 ${dark ? 'text-gray-100' : 'text-gray-800'}`}>Suggested Learning Paths</h2>
        <p className={`text-xs mb-4 italic ${dark ? 'text-gray-400' : 'text-gray-400'}`}>Based on your top job matches</p>

        {learningPaths.length === 0 ? (
          <p className="text-sm text-gray-400 italic">Search for jobs to see personalised learning paths.</p>
        ) : (
          <ul className="space-y-3">
            {learningPaths.map(({ jobTitle, step, color }) => (
              <li key={jobTitle} className={`rounded-xl border px-4 py-3 transition-colors ${dark ? 'bg-indigo-900/20 border-indigo-900/30' : color.badge}`}>
                {/* Job label row */}
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm">{color.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide opacity-80">{jobTitle}</span>
                </div>
                {/* Step content */}
                <div className="flex items-start gap-2">
                  <span className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${color.dot}`}></span>
                  <div>
                    <p className={`text-sm font-semibold leading-tight ${dark ? 'text-indigo-300' : ''}`}>{step.title}</p>
                    <p className={`text-xs mt-0.5 leading-snug ${dark ? 'text-indigo-400/80' : 'opacity-75'}`}>{step.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function JobCard({ job, userSkills, onViewDetails }) {
  const { dark } = useTheme()
  return (
    <div className={`rounded-xl border p-5 shadow-sm flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div>
        <h3 className={`font-bold text-base mb-1 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{job.title}</h3>
        <span className={`text-white text-xs font-semibold px-2.5 py-0.5 rounded ${job.badgeColor}`}>
          {job.badge}
        </span>
      </div>
      <ul className="space-y-1.5 flex-1">
        {job.skills.map((s) => (
          <li key={s} className={`flex items-center gap-2 text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
            <span className={`w-2.5 h-2.5 rounded-full inline-block ${job.dotColor}`}></span>
            {s}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400">{job.hits} skill{job.hits !== 1 ? 's' : ''} matched</span>
        <button
          onClick={() => onViewDetails(job)}
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-sm font-semibold py-1.5 px-4 rounded-lg"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

function JobMatchesSection({ matchedJobs, userSkills, onViewDetails }) {
  const { dark } = useTheme()
  if (matchedJobs.length === 0) {
    return (
      <div className={`rounded-xl border p-10 shadow-sm text-center transition-colors ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="text-4xl mb-3">🔍</div>
        <h2 className={`font-bold text-lg mb-2 ${dark ? 'text-gray-100' : 'text-gray-700'}`}>No Matches Found</h2>
        <p className="text-sm text-gray-400">
          Try adding more skills like <em>Python, React, AWS, Java, Docker, SQL</em>…
        </p>
      </div>
    )
  }

  return (
    <div className={`rounded-xl border p-6 shadow-sm transition-colors ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h2 className={`font-bold text-lg mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
        Top Job Matches for You:
        <span className="ml-2 text-sm font-normal text-indigo-500">{matchedJobs.length} result{matchedJobs.length !== 1 ? 's' : ''}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matchedJobs.map((job) => (
          <JobCard key={job.id} job={job} userSkills={userSkills} onViewDetails={onViewDetails} />
        ))}
      </div>
    </div>
  )
}

const SKILL_GAPS = [
  { id: 1, icon: '⚠️', iconBg: 'bg-red-100', dot: 'bg-red-500', label: 'Learn Microservices' },
  { id: 2, icon: '🎯', iconBg: 'bg-yellow-100', dot: 'bg-yellow-500', label: 'Improve SQL Skills' },
  { id: 3, icon: '🖥️', iconBg: 'bg-purple-100', dot: 'bg-purple-500', label: 'Master Design Patterns' },
]

function SkillGapCard({ gap }) {
  const { dark } = useTheme()
  return (
    <div className={`rounded-xl border p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-all ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className={`w-14 h-14 rounded-full ${gap.iconBg} flex items-center justify-center text-2xl flex-shrink-0 ${dark ? 'opacity-80' : ''}`}>
        {gap.icon}
      </div>
      <div className={`flex items-center gap-2 text-sm font-medium ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
        <span className={`w-3 h-3 rounded-full ${gap.dot} inline-block`}></span>
        {gap.label}
      </div>
    </div>
  )
}

function SkillGapSection() {
  const { dark } = useTheme()
  return (
    <div className={`rounded-xl border p-6 shadow-sm transition-colors ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <h2 className={`font-bold text-lg mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>Skill Gap Analysis:</h2>
      <p className="text-sm text-gray-500 italic mb-5">Improve Your Skills To Reach Your Desired Role</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SKILL_GAPS.map((g) => (
          <SkillGapCard key={g.id} gap={g} />
        ))}
      </div>
    </div>
  )
}

// ---------- MAIN APP ----------
export default function App() {
  const [skills, setSkills] = useState([])
  const [matchedJobs, setMatchedJobs] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [dark, setDark] = useState(true)
  const resultsRef = useRef(null)

  const handleSetSkills = (newSkills) => {
    setSkills(newSkills)
    setMatchedJobs(null)
  }

  const handleSearch = () => setMatchedJobs(matchJobs(skills))

  useEffect(() => {
    if (matchedJobs && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [matchedJobs])

  return (
    <ThemeCtx.Provider value={{ dark }}>
      <BrowserRouter>
        <div className={`min-h-screen font-sans transition-colors duration-300 ${dark ? 'dark bg-gray-950 text-gray-100' : 'bg-slate-100 text-gray-900'
          }`}>
          <Navbar onToggleTheme={() => setDark((d) => !d)} />

          <Routes>
            <Route path="/" element={
              <>
                <HeroSection skills={skills} setSkills={handleSetSkills} onSearch={handleSearch} />

                {matchedJobs !== null && (
                  <main ref={resultsRef} className="max-w-6xl mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <aside className="w-full lg:w-72 flex-shrink-0">
                        <SidePanel matchedJobs={matchedJobs} totalSkills={skills.length} />
                      </aside>
                      <div className="flex-1 flex flex-col gap-6">
                        <JobMatchesSection
                          matchedJobs={matchedJobs}
                          userSkills={skills}
                          onViewDetails={(job) => setSelectedJob(job)}
                        />
                        <SkillGapSection />
                      </div>
                    </div>
                  </main>
                )}
              </>
            } />
            <Route path="/about" element={<Aboutus />} />
          </Routes>

          {selectedJob && (
            <JobDetailModal
              job={selectedJob}
              userSkills={skills}
              onClose={() => setSelectedJob(null)}
            />
          )}
        </div>
      </BrowserRouter>
    </ThemeCtx.Provider>
  )
}
