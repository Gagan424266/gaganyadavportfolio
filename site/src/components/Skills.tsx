import { useReveal } from '../hooks/useReveal'
import { resume } from '../data/resume'
import { Marquee } from './Marquee'

export function Skills() {
  const ref = useReveal<HTMLElement>({ selector: '.skill-card', y: 30, stagger: 0.08 })

  return (
    <section ref={ref} id="skills">
      <div className="shell">
        <span className="eyebrow">Skills</span>
        <h2 className="section-title">
          The <em>toolbox</em>.
        </h2>
        <p className="section-lead">
          Stack used across the past three years — across React frontends, Node and Django
          backends, and trading-side data work.
        </p>
        <div className="skills-grid">
          {Object.entries(resume.skills).map(([group, items]) => (
            <div key={group} className="skill-card">
              <h4>{group}</h4>
              <div className="pills">
                {items.map((it) => (
                  <span key={it}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Marquee />
      <div className="shell">
        <span className="eyebrow">Education</span>
        <h2 className="section-title">
          {resume.education[0].degree}
          <em> · {resume.education[0].school.split(',')[0]}</em>
        </h2>
        <p className="section-lead">
          {resume.education[0].school} — {resume.education[0].period}. {resume.education[0].detail}.
        </p>
      </div>
    </section>
  )
}
