import { resume } from '../data/resume'

export function Nav() {
  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="shell row">
        <a href="#top" className="brand">
          {resume.firstName}
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
        </div>
        <a className="nav-cta" href="#contact">
          Contact
        </a>
      </div>
    </nav>
  )
}
