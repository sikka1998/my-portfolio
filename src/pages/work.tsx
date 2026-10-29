import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP, motionOk } from '../lib/gsap'
import { Link } from '../lib/navigation'
import { projects } from '../lib/content'
import { PageTitle } from '../components/page-title'
import { MockScreen } from '../components/mock-screens'

export function WorkPage() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    const mm = gsap.matchMedia()
    mm.add(motionOk, () => {
      q('.work-card').forEach((card) => {
        gsap.from(card, { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' } })
      })
    })
  }, { scope: root })

  return (
    <div ref={root}>
      <section className="px-5 pt-[calc(var(--header-height)+clamp(3rem,12vh,8rem))] md:px-10">
        <PageTitle>Work</PageTitle>
        <p className="mt-10 max-w-[48ch] text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug">
          Everything I have shipped that I can talk about, from the CustomerLabs data platform back to a bank's lending frontend. Each one says what I owned and what changed.
        </p>
      </section>
      <section aria-label="Projects" className="grid gap-8 px-5 py-[clamp(4rem,12vh,8rem)] md:grid-cols-2 md:gap-10 md:px-10">
        {projects.map((project) => (
          <Link key={project.id} to={`#project/${project.id}`} className="work-card group block overflow-hidden rounded-[var(--radius)] border border-border bg-card transition-transform hover:-translate-y-1">
            <div className="p-6 md:p-8" style={{ background: project.sheet.background, color: project.sheet.foreground }}>
              <div className="pointer-events-none scale-[0.92] origin-top transition-transform duration-700 group-hover:scale-[0.96]">
                <MockScreen screen={project.screen} />
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <h2 className="display text-[clamp(1.8rem,2.6vw,2.6rem)]">{project.name}</h2>
                <ArrowUpRight aria-hidden="true" className="mt-2 size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </div>
              <p className="mt-2 text-[17px] font-semibold">{project.title}</p>
              <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{project.summary}</p>
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dd className="text-[22px] font-bold tabular">{metric.value}</dd>
                    <dt className="text-[13px] text-muted-foreground">{metric.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[14px] text-muted-foreground">{project.role}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
