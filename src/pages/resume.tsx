import { useRef } from 'react'
import { Download } from 'lucide-react'
import { gsap, useGSAP, motionOk } from '../lib/gsap'
import { certifications, education, experience, resumeFile, resumeSummary, skillGroups } from '../lib/content'
import { PageTitle } from '../components/page-title'

export function ResumePage() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    const mm = gsap.matchMedia()
    mm.add(motionOk, () => {
      q('.resume-block').forEach((block) => {
        gsap.from(block, { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: block, start: 'top 88%', toggleActions: 'play none none reverse' } })
      })
    })
  }, { scope: root })

  return (
    <div ref={root}>
      <section className="px-5 pt-[calc(var(--header-height)+clamp(3rem,12vh,8rem))] md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <PageTitle className="leading-[0.8]">Resume</PageTitle>
          <a href={resumeFile} download className="inline-flex h-14 items-center gap-2.5 rounded-full bg-primary px-7 text-[16px] font-semibold text-primary-foreground transition-transform active:scale-[0.97]">
            <Download aria-hidden="true" className="size-5" strokeWidth={2} />
            Download PDF
          </a>
        </div>
        <p className="mt-10 max-w-[48ch] text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug">{resumeSummary}</p>
      </section>

      <section aria-labelledby="resume-experience" className="px-5 pt-[clamp(5rem,14vh,9rem)] md:px-10">
        <h2 id="resume-experience" className="resume-block display text-[clamp(2.75rem,5.4vw,5.75rem)]">Experience</h2>
        <div className="mt-8">
          {experience.map((job) => (
            <article key={job.company} className="resume-block grid gap-6 border-t border-border py-10 md:grid-cols-12 md:gap-10">
              <header className="md:col-span-4">
                <h3 className="display text-[clamp(1.6rem,2.4vw,2.2rem)]">{job.company}</h3>
                <p className="mt-2 text-[16px] font-semibold">{job.role}</p>
                <p className="mt-1 text-[14px] text-muted-foreground tabular">
                  {job.dates}
                  {job.location ? ` · ${job.location}` : ''}
                </p>
                <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-muted-foreground">{job.summary}</p>
              </header>
              <ul className="space-y-3 md:col-span-7 md:col-start-6">
                {job.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-[16px] leading-relaxed">
                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="resume-skills" className="px-5 pt-[clamp(4rem,10vh,7rem)] md:px-10">
        <h2 id="resume-skills" className="resume-block display text-[clamp(2.75rem,5.4vw,5.75rem)]">Skills</h2>
        <dl className="mt-8">
          {skillGroups.map((group) => (
            <div key={group.group} className="resume-block grid gap-3 border-t border-border py-6 md:grid-cols-12 md:gap-10">
              <dt className="text-[17px] font-bold md:col-span-4">{group.group}</dt>
              <dd className="flex flex-wrap gap-2 md:col-span-8">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-border px-3 py-1.5 text-[13px] font-medium">{item}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="resume-education" className="grid gap-10 px-5 py-[clamp(4rem,10vh,7rem)] md:grid-cols-2 md:px-10">
        <div className="resume-block">
          <h2 id="resume-education" className="display text-[clamp(2rem,3.6vw,3.6rem)]">Education</h2>
          {education.map((item) => (
            <div key={item.degree} className="mt-6 border-t border-border pt-6">
              <p className="text-[17px] font-bold">{item.degree}</p>
              <p className="mt-1 text-[16px]">{item.school}</p>
              <p className="mt-1 text-[14px] text-muted-foreground tabular">{item.dates} · {item.note}</p>
            </div>
          ))}
        </div>
        <div className="resume-block">
          <h2 className="display text-[clamp(2rem,3.6vw,3.6rem)]">Certifications</h2>
          <ul className="mt-6 border-t border-border pt-6">
            {certifications.map((item) => (
              <li key={item} className="flex gap-3 py-1.5 text-[16px]">
                <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
