import { resume } from '../data/resume'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell row">
        <span>
          © {new Date().getFullYear()} {resume.name}
        </span>
        <span>Built with React · Three.js · GSAP</span>
        <span>v1.0</span>
      </div>
    </footer>
  )
}
