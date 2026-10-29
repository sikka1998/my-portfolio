import { useRef } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP, motionOk } from '../lib/gsap'
import { Link } from '../lib/navigation'
import { projectById, projects } from '../lib/content'
import { MockScreen } from '../components/mock-screens'

export function ProjectPage({ id }: { id: string }) {
  const root = useRef<HTMLDivElement>(null)
  const project = projectById(id)

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    const mm = gsap.matchMedia()
    mm.add(motionOk, () => {
      gsap.from(q('.project-head > *'), { y: 40, opacity: 0, duration: 1, stagger: 0.08 })
      q('.study').forEach((block) => {
        gsap.from(block, { y: 40, opacity: 0, duration: 1, scrollTrigger: { trigger: block, start: 'top 88%', toggleActions: 'play none none reverse' } })
      })
    })
  }, { scope: root, dependencies: [id] })

  if (!project) {
    return (
      <section className="px-5 pt-[calc(var(--header-height)+clamp(3rem,12vh,8rem))] md:px-10">
        <h1 className="display text-[clamp(2.5rem,6vw,5rem)]">That project is not here.</h1>
        <Link to="#work" className="mt-8 inline-flex items-center gap-2 font-semibold underline underline-offset-[6px]">
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to work
        </Link>
      </section>
    )
  }

  const index = projects.findIndex((item) => item.id === project.id)
  const next = projects[(index + 1) % projects.length]
  const { background, foreground, accent } = project.sheet

  return (
    <div ref={root}>
      <section className="px-5 pb-20 pt-[calc(var(--header-height)+clamp(3rem,10vh,6rem))] md:px-10" style={{ background, color: foreground }}>
        <div className="project-head mx-auto grid max-w-[1400px] items-center gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link to="#work" className="inline-flex items-center gap-2 text-[14px] font-semibold opacity-80 hover:opacity-100">
              <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2} /> All work
            </Link>
            <h1 className="display mt-6 text-[clamp(2.75rem,5.6vw,6rem)]">{project.name}</h1>
            <p className="mt-5 text-[clamp(1.25rem,1.8vw,1.6rem)] font-bold leading-tight" style={{ color: accent }}>{project.title}</p>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed opacity-90">{project.summary}</p>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dd className="display text-[clamp(1.6rem,2.4vw,2.4rem)] tabular">{metric.value}</dd>
                  <dt className="mt-1 text-[14px] opacity-80">{metric.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-[14px] opacity-80">{project.role}</p>
          </div>
          <div className="md:col-span-7">
            <MockScreen screen={project.screen} />
          </div>
        </div>
      </section>

      <section className="px-5 py-[clamp(4rem,12vh,8rem)] md:px-10">
        <div className="mx-auto max-w-[1400px]">
          {project.study.map((block) => (
            <div key={block.heading} className="study grid gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-10">
              <h2 className="display text-[clamp(1.6rem,2.6vw,2.6rem)] md:col-span-4">{block.heading}</h2>
              <p className="text-[clamp(1.05rem,1.25vw,1.25rem)] leading-relaxed md:col-span-7 md:col-start-6">{block.body}</p>
            </div>
          ))}
          <div className="border-t border-border pt-10">
            <p className="text-[14px] text-muted-foreground">Next</p>
            <Link to={`#project/${next.id}`} className="group mt-2 inline-flex items-center gap-3 display text-[clamp(2rem,4vw,4rem)]">
              {next.name}
              <ArrowUpRight aria-hidden="true" className="size-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
