import { useEffect, useState } from 'react'
import portrait from './assets/gemini.png'
import './App.css'

const Arrow = () => <span aria-hidden="true">↗</span>

const skills = [
  
  ['●', 'Figma', 'figma'],
  ['5', 'HTML5', 'html'],
  ['3', 'CSS3', 'css'],
  ['B', 'Bootstrap', 'bootstrap'],
  ['JS', 'JavaScript', 'javascript'],
  ['TS', 'TypeScript', 'typescript'],
  ['⚛', 'React', 'react'],
  ['A', 'Angular', 'angular'],
  ['N', 'Node.js', 'node'],
  ['L', 'Laravel', 'laravel'],
  ['SQL', 'MySQL', 'mysql'],
  ['PG', 'PostgreSQL', 'postgresql'],
  ['✓', 'Playwright', 'playwright'],
  ['P', 'Postman', 'postman'],
  ['TC', 'Thunder Client', 'thunderclient'],
]

const skillIcons: Record<string, string> = {
  figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/figma/figma-original.svg',
  html: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/html5/html5-original.svg',
  css: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/css3/css3-original.svg',
  bootstrap: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/bootstrap/bootstrap-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/javascript/javascript-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/typescript/typescript-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/react/react-original.svg',
  angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/angular/angular-original.svg',
  node: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/nodejs/nodejs-original.svg',
  laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/laravel/laravel-original.svg',
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/mysql/mysql-original.svg',
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/postgresql/postgresql-original.svg',
  playwright: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/playwright/playwright-original.svg',
  postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/postman/postman-original.svg',
  thunderclient: '/thunder-client.svg',
}

function App() {
  const introText = '— Hey, I am Ragulan'
  const roleText = 'Full Stack Developer'
  const [typedIntro, setTypedIntro] = useState('')
  const [typedRole, setTypedRole] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    let introIndex = 0
    let roleIndex = 0
    let timer: number

    const typeRole = () => {
      if (roleIndex <= roleText.length) {
        setTypedRole(roleText.slice(0, roleIndex++))
        timer = window.setTimeout(typeRole, 45)
      } else {
        setTypingDone(true)
      }
    }
    const typeIntro = () => {
      if (introIndex <= introText.length) {
        setTypedIntro(introText.slice(0, introIndex++))
        timer = window.setTimeout(typeIntro, 45)
      } else {
        typeRole()
      }
    }

    typeIntro()
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const groups = document.querySelectorAll<HTMLElement>('.experience-card, .project-grid, .education-list, .contact-grid')
    const getItems = (group: HTMLElement) => group.classList.contains('experience-card')
      ? group.querySelectorAll<HTMLElement>(':scope > .experience-date, :scope > .experience-content h3, :scope > .experience-content .company, :scope > .experience-content li')
      : group.querySelectorAll<HTMLElement>(':scope > .project-card, :scope > .education-card, :scope > .contact-card')

    groups.forEach((group) => getItems(group).forEach((item) => item.classList.add('scroll-reveal')))
    if (reduceMotion) {
      document.querySelectorAll('.scroll-reveal').forEach((item) => item.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        getItems(entry.target as HTMLElement).forEach((item, index) => {
          window.setTimeout(() => item.classList.add('is-revealed'), index * 120)
        })
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08 })

    groups.forEach((group) => observer.observe(group))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Ranjith home">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <defs><linearGradient id="brand-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3779ff" /><stop offset="1" stopColor="#ba3df1" /></linearGradient></defs>
            <path fill="url(#brand-gradient)" d="M7 5h19.2C35.4 5 41 10.4 41 18.4c0 5.5-2.7 10-7.3 12.3L42 43H29.6L20 32.4H17v-8.7h8.7c3.5 0 5.6-1.8 5.6-5.2 0-3.2-2.1-5-5.6-5H17v29.3H7V5Z" />
            <path fill="#7d35e7" d="M7 28.5 18.5 17v10.7L7 39.2V28.5Z" />
          </svg>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Project</a>
        </nav>
        <a className="contact-link" href="mailto:hello@example.com">Contact Me</a>
      </header>

      <section className="hero-section" id="home">
        <div className="intro" id="about">
          <p className={`eyebrow typing-line ${typingDone ? 'is-complete' : ''}`}>{typedIntro}</p>
          <h1 className={`typing-role ${typingDone ? 'is-complete' : ''}`}>{typedRole}</h1>
          <p className="description">
            Full Stack Developer with 2+ years of experience building scalable web applications. Skilled in Angular, React.js, Node.js, and database management. Experienced in developing chatbot platforms with FAQ automation and LLM-based AI features, CRM integrations, and real-time analytics. Strong expertise in API development, multi-tenant architecture, and intelligent automation systems.
          </p>
          <div className="actions">
           
            <a className="primary-button" href="#resume"><span>⇩</span>Download Resume <Arrow /></a>
          </div>
          <div className="social-links" aria-label="Social links">
            <a className="linkedin-icon" href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5V19H3.45V8.5h3.49ZM5.2 3A2.03 2.03 0 1 1 5.2 7.06 2.03 2.03 0 0 1 5.2 3ZM20.55 12.98V19h-3.48v-5.62c0-1.42-.03-3.24-1.98-3.24-1.98 0-2.28 1.55-2.28 3.14V19H9.32V8.5h3.35v1.44h.05c.46-.88 1.61-1.8 3.31-1.8 3.53 0 4.18 2.33 4.18 5.35Z" /></svg>
            </a>
            <a className="whatsapp-icon" href="https://wa.me/919080301069" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12.05 0C5.48 0 .13 5.35.13 11.93c0 2.1.55 4.14 1.6 5.94L.03 24l6.3-1.65a11.95 11.95 0 0 0 5.71 1.45h.01c6.57 0 11.92-5.35 11.92-11.93 0-3.18-1.24-6.17-3.45-8.39ZM12.05 21.8a9.92 9.92 0 0 1-5.05-1.38l-.36-.22-3.74.98 1-3.65-.24-.38a9.9 9.9 0 0 1-1.53-5.28c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.9a9.85 9.85 0 0 1 2.91 7.02c0 5.47-4.45 9.93-9.93 9.93Zm5.44-7.43c-.3-.15-1.76-.87-2.04-.97-.27-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-1.77-.88-2.93-1.57-4.1-3.57-.31-.54.31-.5.89-1.67.1-.2.05-.38-.02-.53-.07-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.15 4.56 1.91.83 2.66.9 3.62.76.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z" /></svg>
            </a>
            <a className="email-icon" href="mailto:ragul5595@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.51l9 5.4 9-5.4V7H3Zm18 10V9.84l-8.49 5.1a1 1 0 0 1-1.02 0L3 9.84V17h18Z" /></svg>
            </a>
          </div>
        </div>

        <div className="portrait-area">
          <div className="portrait-card">
            <img src={portrait} alt="Ranjith in a formal suit" />
          </div>
        </div>
      </section>

      <section className="skills-section" id="skills" aria-labelledby="skills-title">
        <div className="skills-heading">
         
          <h2 id="skills-title">Skills &amp; <span>Technologies</span></h2>
          <p>Tools and technologies I use to bring ideas to life -perfect product.</p>
        </div>
        <div className="skills-marquee" aria-label="Skills and technologies">
          <div className="skills-track">
            {[...skills, ...skills].map(([, name, type], index) => (
              <div className={`skill-pill ${type}`} key={`${name}-${index}`}>
                <span className="skill-icon"><img src={skillIcons[type]} alt="" /></span>{name}
              </div>
            ))}
          </div>
        </div>
        <div className="skill-summary">
          <span><b>Frontend:</b> Angular, React.js, JavaScript, TypeScript, HTML, CSS, Bootstrap</span>
          <span><b>Backend:</b> Laravel, Node.js, Express.js</span>
          <span><b>Database:</b> MySQL, PostgreSQL</span>
          <span><b>Testing:</b> Angular-Jasmine/Karma, Playwright</span>
            <span><b>Tools & Technologies: </b> REST APIs, Webhooks,  Cron Jobs,Post man, Thunder client</span>
            <span><b>Server & Deployment:</b> WHM (Web Host Manager), Plesk Panel, Git, GitHub, CI/CD, Live Deployment, Domain Setup</span>

        </div>
      </section>


      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="experience-heading">

          <h2 id="experience-title"> Personal Experience</h2>
        </div>
        <article className="experience-card">
          <div className="experience-date">
            <span className="experience-period">OCT 2024 —<br /><span>PRESENT</span></span>
            <img className="experience-img" src="/Rsoft_logo.png" alt="Rsoft Technologies logo" />
          </div>
          <div className="experience-content">
            <h3>Senior Software Developer</h3>
            <p className="company">Rsoft Technologies Pvt Ltd <span>·</span> Chennai</p>
            <ul>
              <li>Engineered scalable web apps with Angular + Laravel, improving performance ~30%.</li>
              <li>Built full-stack features: REST APIs, authentication, backend data flow.</li>
              <li>Administered server environments ensuring 99.9% uptime on production.</li>
              <li>Streamlined Git + CI/CD pipelines, reducing deployment on Plesk.</li>
              <li>Maintained server environments, handled domain setups, and managed live deployment configurations. </li>
            </ul>
          </div>
        </article>
      </section>



      <section className="projects-section" id="projects" aria-labelledby="projects-title">
        <div className="projects-heading">
          <p className="section-kicker">— SELECTED WORK</p>
          <h2 id="projects-title">Projects that <span>Deliver Results</span></h2>
          <p>Full-stack products designed for real business workflows, automation, and scale.</p>
        </div>
        <div className="project-grid">
          <article className="project-card">
            <div className="project-number">01</div><div className="project-icon">✦</div>
            <p className="project-type">AI AUTOMATION PLATFORM</p>
            <h3>Chatbot &amp; Survey<br />Automation Platform</h3>
            <p className="project-tech">Angular · Node.js · Laravel · MySQL</p>
            <p className="project-summary">A multi-product platform unifying chatbots, surveys, WhatsApp bots, and AI voice agents for multiple client use cases.</p>
            <ul className="project-points">
              <li>Developed a multi-product SaaS platform including Chatbot, Survey Builder, WhatsApp Bot, and AI Voice Agent.</li>
              <li>Built an AI-powered chatbot system combining FAQ automation and LLM-based dynamic responses.</li>
              <li>Reduced manual customer support effort by 40% using automated FAQ handling.</li>
              <li>Designed a hybrid chatbot architecture (rule-based + AI-driven).</li>
              <li>Created a drag-and-drop survey &amp; chatbot builder with conditional logic (skip logic, routing).</li>
              <li>Integrated WhatsApp API, Email Notifications, and Webhooks for real-time communication.</li>
              <li>Developed a multi-tenant system with role-based access (Super Admin, Admin, User).</li>
              <li>Implemented data masking, subscription controls, and response limits for security and scalability.</li>
              <li>Built an AI Voice Agent with real-time interaction and multilingual support.</li>
              <li>Improved backend reliability using cron jobs and retry mechanisms.</li>
            </ul>
            <div className="project-footer">
              <span>Angular + Laravel</span>
              <span className="project-credentials"><small>Email: ragulan@gmail.com</small><small>Password: Ragul@2411</small></span>
              <a href="https://rbot.co.in/" target="_blank" rel="noreferrer">Demo access available ↗</a>
            </div>
          </article>
          <article className="project-card">
            <div className="project-number">02</div><div className="project-icon crm-icon">⌘</div>
            <p className="project-type">BUSINESS PLATFORM</p>
            <h3>CRM<br />Management System</h3>
            <p className="project-tech">React · Node.js · Express.js · MySQL</p>
            <p className="project-summary">A custom CRM that gives teams one place to manage leads, customers, and daily business workflows.</p>
            <ul className="project-points">
              <li>Developed a custom CRM system to manage leads, customers, and workflows.</li>
              <li>Designed a Lead Management Module to capture, assign, and track leads efficiently.</li>
              <li>Automated workflows for lead assignment, follow-ups, and notifications (Email &amp; WhatsApp).</li>
              <li>Built activity tracking and audit logs for system monitoring and user actions.</li>
              <li>Integrated communication systems for customer engagement and retention.</li>
              <li>Developed role-based user management system (Admin, Employee).</li>
              <li>Ensured data security and validation using RBAC and masking techniques.</li>
            </ul>
            <div className="project-footer"><span>React + Node.js</span><span>View case study ↗</span></div>
          </article>
        </div>
      </section>

      <section className="education-section" aria-labelledby="education-title">
        <div className="education-heading">
          <p className="section-kicker">— EDUCATION</p>
          <h2 id="education-title">Academic <span>Journey</span></h2>
        </div>
        <div className="education-list">
          <article className="education-card degree-card">
            <p className="education-year">2017 — 2020</p>
            <div className="education-mark">BSc</div>
            <div>
              <p className="education-level">UNDERGRADUATE DEGREE</p>
              <h3>Bachelor of Science in Chemistry</h3>
              <p>AVC College, Mannampandal, Mayiladuthurai</p>
            </div>
            <strong>81.23%<small>Score</small></strong>
          </article>
          <article className="education-card">
            <p className="education-year">2017</p>
            <div className="education-mark">12</div>
            <div>
              <p className="education-level">HIGHER SECONDARY</p>
              <h3>12th Board</h3>
              <p>Brindhavan HR Sec School <span>·</span> State Board</p>
            </div>
            <strong>84.41%<small>Score</small></strong>
          </article>
          <article className="education-card">
            <p className="education-year">2015</p>
            <div className="education-mark">10</div>
            <div>
              <p className="education-level">SECONDARY SCHOOL</p>
              <h3>10th Board</h3>
              <p>Brindhavan HR Sec School <span>·</span> State Board</p>
            </div>
            <strong>91.2%<small>Score</small></strong>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-heading">
          <p className="section-kicker">— GET IN TOUCH</p>
          <h2 id="contact-title">Let&apos;s work <span>Together</span></h2>
        </div>
        <div className="contact-grid">
          <a className="contact-card" href="mailto:Ragul5595@email.com">
            <span className="contact-icon">✉</span><span><small>EMAIL</small><strong>Ragul5595@email.com</strong></span><b>↗</b>
          </a>
          <a className="contact-card" href="tel:+919080301069">
            <span className="contact-icon">☎</span><span><small>PHONE</small><strong>+91 9080301069</strong></span><b>↗</b>
          </a>
          <div className="contact-card">
            <span className="contact-icon">⌖</span><span><small>LOCATION</small><strong>Thiruvarur, Tamil Nadu</strong></span>
          </div>
          <a className="contact-card" href="https://github.com/ragulan" target="_blank" rel="noreferrer">
            <span className="contact-icon">⌘</span><span><small>GITHUB</small><strong>@ragulan</strong></span><b>↗</b>
          </a>
        </div>
      </section>


    </main>
  )
}

export default App
