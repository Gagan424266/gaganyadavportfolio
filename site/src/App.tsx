import { resume } from './data/resume'
import './App.css'

function App() {
  const mailto = `mailto:${resume.email}`
  const tel = `tel:${resume.phone.replace(/\s/g, '')}`

  return (
    <>
      <div className="grad-bg" aria-hidden />
      <header className="site-header">
        <div className="inner">
          <a href="#" className="logo">
            Gagan<span>.</span>
          </a>
          <nav className="nav" aria-label="Primary">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main className="shell">
        <section className="hero" id="top">
          <p className="hero-badge">Open to opportunities</p>
          <h1>{resume.name}</h1>
          <p className="hero-lead">{resume.headline}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={mailto}>
              Email me
            </a>
            <a className="btn btn-ghost" href={tel}>
              Call
            </a>
            {resume.githubUrl ? (
              <a className="btn btn-ghost" href={resume.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
            {resume.linkedinUrl ? (
              <a className="btn btn-ghost" href={resume.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : null}
            <a className="btn btn-ghost" href="#experience">
              View work
            </a>
          </div>
        </section>

        <section id="experience" aria-labelledby="exp-heading">
          <h2 id="exp-heading" className="section-title">
            Experience
          </h2>
          <p className="section-sub">Full-stack delivery, realtime dashboards, and API performance.</p>
          <div className="card-grid">
            {resume.experience.map((job) => (
              <article key={job.company + job.period} className="card">
                <h3>{job.role}</h3>
                <p className="meta">
                  <strong>{job.company}</strong>
                  {' · '}
                  {job.location}
                  <br />
                  {job.period}
                </p>
                <ul className="detail-list">
                  {job.highlights.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" aria-labelledby="proj-heading">
          <h2 id="proj-heading" className="section-title">
            Projects
          </h2>
          <p className="section-sub">Selected personal work.</p>
          <div className="card-grid two">
            {resume.projects.map((project) => (
              <article key={project.name} className="card">
                <h3>{project.name}</h3>
                <p className="meta">{project.summary}</p>
                <ul className="detail-list">
                  {project.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-heading">
          <h2 id="skills-heading" className="section-title">
            Skills
          </h2>
          <p className="section-sub">Stack and practices from recent roles.</p>
          <div className="skill-groups">
            <dl>
              <dt>Languages</dt>
              <dd>{resume.skills.languages.join(', ')}</dd>
            </dl>
            <dl>
              <dt>Frontend</dt>
              <dd>{resume.skills.frontend.join(', ')}</dd>
            </dl>
            <dl>
              <dt>Backend</dt>
              <dd>{resume.skills.backend.join(', ')}</dd>
            </dl>
            <dl>
              <dt>Tools</dt>
              <dd>{resume.skills.tools.join(', ')}</dd>
            </dl>
            <dl>
              <dt>Dev practices</dt>
              <dd>{resume.skills.practices.join(', ')}</dd>
            </dl>
            <dl>
              <dt>Cloud / databases</dt>
              <dd>{resume.skills.cloudDb.join(', ')}</dd>
            </dl>
            <dl>
              <dt>Coursework</dt>
              <dd>{resume.skills.coursework.join(', ')}</dd>
            </dl>
            <dl>
              <dt>Interests</dt>
              <dd>{resume.skills.interests.join(', ')}</dd>
            </dl>
          </div>
        </section>

        <section id="education" aria-labelledby="edu-heading">
          <h2 id="edu-heading" className="section-title">
            Education
          </h2>
          <p className="section-sub">Formal training.</p>
          <div className="card-grid">
            {resume.education.map((edu) => (
              <article key={edu.school} className="card">
                <h3>{edu.degree}</h3>
                <p className="meta">
                  <strong>{edu.school}</strong>
                  <br />
                  {edu.period}
                  <br />
                  {edu.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="section-title">
            Contact
          </h2>
          <p className="section-sub">Reach out for roles or collaboration.</p>
          <div className="contact-strip">
            <p>
              <strong style={{ color: 'var(--text)' }}>{resume.email}</strong>
              <br />
              {resume.phone}
            </p>
            <div className="contact-links">
              <a className="btn btn-primary" href={mailto}>
                Send email
              </a>
              <a className="btn btn-ghost" href={tel}>
                Phone
              </a>
              {resume.githubUrl ? (
                <a className="btn btn-ghost" href={resume.githubUrl} target="_blank" rel="noreferrer">
                  GitHub profile
                </a>
              ) : null}
              {resume.linkedinUrl ? (
                <a className="btn btn-ghost" href={resume.linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {resume.name}. Built with React and Vite — original design.
        </p>
      </footer>
    </>
  )
}

export default App
