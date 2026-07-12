import { useEffect, useState } from 'react'
import portrait from './assets/my img.png'
import './App.css'

const Arrow = () => <span aria-hidden="true">↗</span>

const skills = [
  ['⌕', 'Research', 'research'],
  ['▯', 'Wireframing', 'wireframing'],
  ['⚙', 'Prototyping', 'prototyping'],
  ['●', 'Figma', 'figma'],
  ['Xd', 'Adobe XD', 'xd'],
  ['Ps', 'Photoshop', 'photoshop'],
  ['B', 'Bootstrap', 'bootstrap'],
  ['5', 'HTML5', 'html'],
  ['3', 'CSS3', 'css'],
  ['JS', 'JavaScript', 'javascript'],
  ['TS', 'TypeScript', 'typescript'],
  ['⚛', 'React', 'react'],
  ['A', 'Angular', 'angular'],
  ['N', 'Node.js', 'node'],
  ['L', 'Laravel', 'laravel'],
  ['SQL', 'MySQL', 'mysql'],
  ['PG', 'PostgreSQL', 'postgresql'],
  ['✓', 'Playwright', 'playwright'],
]

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
            <a className="primary-button" href="mailto:hello@example.com"><span>♧</span>Let's Talk <Arrow /></a>
            <a className="primary-button" href="#resume"><span>⇩</span>Download Resume <Arrow /></a>
          </div>
          <div className="social-links" aria-label="Social links">
            <a href="https://www.linkedin.com" aria-label="LinkedIn">in</a>
            <a href="https://wa.me/" aria-label="WhatsApp">◔</a>
            <a href="tel:+910000000000" aria-label="Phone">◕</a>
          </div>
        </div>

        <div className="portrait-area">
          <div className="portrait-card">
            <img src={portrait} alt="Ranjith in a formal suit" />
          </div>
          {/* <div className="skill-tag projects"><span>✦</span>50+ Projects</div>
          <div className="skill-tag ux"><span>⌁</span>UI/UX Expert</div>
          <div className="skill-tag developer"><span>●</span>Frontend Developer (AI)</div> */}
        </div>
      </section>


      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="experience-heading">
         
          <h2 id="experience-title"> Personal Experience</h2>
        </div>
        <article className="experience-card">
          <div className="experience-date">OCT 2024 —<br /><span>PRESENT</span></div>
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

      <section className="skills-section" id="skills" aria-labelledby="skills-title">
        <div className="skills-heading">
          <p className="section-kicker">— MY TOOLKIT</p>
          <h2 id="skills-title">Skills &amp; <span>Technologies</span></h2>
          <p>Tools and technologies I use to bring ideas to life — from wireframe to pixel-perfect product.</p>
        </div>
        <div className="skills-marquee" aria-label="Skills and technologies">
          <div className="skills-track">
            {[...skills, ...skills].map(([icon, name, type], index) => (
              <div className={`skill-pill ${type}`} key={`${name}-${index}`}>
                <span className="skill-icon">{icon}</span>{name}
              </div>
            ))}
          </div>
        </div>
        <div className="skill-summary">
          <span><b>Frontend:</b> Angular, React.js, JavaScript, TypeScript, HTML, CSS, Bootstrap</span>
          <span><b>Backend:</b> Laravel, Node.js, Express.js</span>
          <span><b>Database:</b> MySQL, PostgreSQL</span>
          <span><b>Testing:</b> Angular Jasmine/Karma, Playwright</span>
        </div>
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
            <ul className="project-points"><li>LLM-powered chatbot with FAQ automation, lifting engagement by ~35%.</li><li>Drag-and-drop conditional builder for survey and workflow logic.</li><li>WhatsApp API, email notifications, webhooks, and real-time CRM sync.</li><li>Secure multi-tenant roles, data masking, response controls, and AI voice support.</li></ul>
            <div className="project-footer"><span>Angular + Laravel</span><span>View case study ↗</span></div>
          </article>
          <article className="project-card">
            <div className="project-number">02</div><div className="project-icon crm-icon">⌘</div>
            <p className="project-type">BUSINESS PLATFORM</p>
            <h3>CRM<br />Management System</h3>
            <p className="project-tech">React · Node.js · Express.js · MySQL</p>
            <p className="project-summary">A custom CRM that gives teams one place to manage leads, customers, and daily business workflows.</p>
            <ul className="project-points"><li>Lead capture, assignment, activity tracking, audit logs, and monitoring.</li><li>Automated workflows and follow-ups, reducing manual effort by ~30%.</li><li>Email and WhatsApp modules for customer engagement and follow-ups.</li><li>Role-based access, validation, data masking, and secure permissions.</li></ul>
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
