import { useRef } from 'react'
import { gsap, useGSAP, motionOk } from '../lib/gsap'
import { experience, experienceIntro, toolkit } from '../lib/content'

export function Experience() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    const mm = gsap.matchMedia()
    mm.add(motionOk, () => {
      gsap.from(q('.job'), {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: { trigger: q('.jobs')[0], start: 'top 80%', toggleActions: 'play none none reverse' },
      })
    })
  }, { scope: root })

  const track = [...toolkit, ...toolkit]

  return (
    <section ref={root} id="experience" aria-labelledby="experience-title" className="relative overflow-hidden bg-background py-[clamp(5rem,14vh,10rem)]">
      <div className="grid gap-10 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <h2 id="experience-title" className="display text-[clamp(2.75rem,5.4vw,5.75rem)]">Experience</h2>
          <p className="mt-6 max-w-[30ch] text-[17px] leading-relaxed text-muted-foreground">{experienceIntro}</p>
        </div>
        <dl className="jobs md:col-span-8">
          {experience.map((job) => (
            <div key={job.company} className="job grid gap-2 border-t border-border py-7 sm:grid-cols-[1.2fr_1fr_auto] sm:items-baseline sm:gap-6">
              <dt className="display text-[clamp(1.6rem,2.4vw,2.2rem)]">{job.company}</dt>
              <dd className="text-[16px]">{job.role}</dd>
              <dd className="text-[14px] text-muted-foreground tabular sm:text-right">{job.dates}</dd>
            </div>
          ))}
          <div className="border-t border-border" />
        </dl>
      </div>
      <div className="mt-[clamp(4rem,10vh,7rem)] overflow-hidden" aria-label="Tools I use">
        <div className="marquee-track display text-[clamp(2.5rem,7vw,7rem)]">
          {track.map((tool, index) => (
            <span key={index} className="flex items-center whitespace-nowrap px-4" aria-hidden={index >= toolkit.length}>
              <span className="mr-8 text-primary">/</span>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
