import { useReveal } from '../hooks/useReveal'
import { resume } from '../data/resume'

export function Experience() {
  const ref = useReveal<HTMLElement>({ selector: '.timeline .row', y: 40, stagger: 0.12 })

  return (
    <section ref={ref} id="work">
      <div className="shell">
        <span className="eyebrow">Experience</span>
        <h2 className="section-title">
          Where I&apos;ve <em>shipped</em>.
        </h2>
        <p className="section-lead">
          Two roles, both production-scale: a high-frequency trading desk and a regulated
          fin-tech platform. Same throughline — make legacy code feel new and make new code feel
          fast.
        </p>
        <div className="timeline">
          {resume.experience.map((job) => (
            <article key={job.company} className="row">
              <div className="when">{job.period}</div>
              <div>
                <h3 className="role">{job.role}</h3>
                <p className="company">
                  {job.company}
                  <span className="sep">/</span>
                  {job.location}
                </p>
                <span className="tag">{job.tag}</span>
                <ul>
                  {job.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
