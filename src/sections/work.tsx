import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP, motionOk } from '../lib/gsap'
import { Link } from '../lib/navigation'
import { featuredProjects, type Project } from '../lib/content'
import { MockScreen } from '../components/mock-screens'

export function ProjectSheet({ project, index }: { project: Project; index: number }) {
  const { background, foreground, accent } = project.sheet
  return (
    <article
      className="sheet relative flex min-h-[100svh] items-center overflow-hidden px-5 py-24 md:px-10"
      style={{ background, color: foreground }}
      aria-labelledby={`sheet-${project.id}`}
      data-index={index}
    >
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <h3 id={`sheet-${project.id}`} className="sheet-title display text-[clamp(2.75rem,5.6vw,6rem)]">{project.name}</h3>
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
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to={`#project/${project.id}`} className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-transform active:scale-[0.97]" style={{ background: foreground, color: background }}>
              Read case study <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </Link>
            <span className="text-[14px] opacity-80">{project.role}</span>
          </div>
        </div>
        <div className="sheet-art md:col-span-7">
          <MockScreen screen={project.screen} />
        </div>
      </div>
      <div aria-hidden="true" className="sheet-shade pointer-events-none absolute inset-0 bg-black opacity-0" />
    </article>
  )
}

const cinematicQuery = '(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)'
const stackQuery = '(min-width: 768px) and (min-height: 640px)'

function offsetWithin(element: HTMLElement, ancestor: HTMLElement) {
  let x = 0, y = 0
  let node: HTMLElement | null = element
  while (node && node !== ancestor) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

export function SelectedWork() {
  const root = useRef<HTMLElement>(null)
  const first = featuredProjects[0]

  useGSAP(() => {
    const section = root.current
    if (!section) return
    const q = gsap.utils.selector(section)
    const mm = gsap.matchMedia()

    mm.add({ cinematic: cinematicQuery, stack: stackQuery, motion: motionOk }, (context) => {
      const { cinematic, stack, motion } = context.conditions as Record<string, boolean>
      const sheets = q<HTMLElement>('.sheet')
      const markers = q<HTMLElement>('.sheet-marker')

      if (cinematic) {
        // The period in "Selected work." opens like an aperture onto the first sheet.
        section.dataset.cinematic = 'true'
        const veil = q<HTMLElement>('.work-veil')[0]
        const dot = q<HTMLElement>('.work-dot')[0]
        let radius = 0
        const measure = () => {
          const { x, y } = offsetWithin(dot, veil)
          const cx = x + dot.offsetWidth / 2, cy = y + dot.offsetHeight / 2
          radius = Math.hypot(Math.max(cx, veil.offsetWidth - cx), Math.max(cy, veil.offsetHeight - cy)) + 4
          veil.style.setProperty('--iris-x', `${cx}px`)
          veil.style.setProperty('--iris-y', `${cy}px`)
        }
        measure()
        gsap.timeline({
          scrollTrigger: { trigger: q('.work-stack')[0], start: 'top top', end: () => `+=${window.innerHeight}`, scrub: 0.6, invalidateOnRefresh: true, onRefreshInit: measure },
        })
          .fromTo(veil, { '--iris-r': '0px' }, { '--iris-r': () => `${radius}px`, ease: 'power2.in', duration: 1 }, 0)
          .to(q('.work-veil-content'), { scale: 1.16, ease: 'power1.in', duration: 1 }, 0)
          .set(veil, { autoAlpha: 0 }, 1)
      } else {
        gsap.from(q('.work-title'), { y: 80, opacity: 0, duration: 1.2, scrollTrigger: { trigger: q('.work-title')[0], start: 'top 85%', toggleActions: 'play none none reverse' } })
      }

      if (stack) {
        // Each sheet settles back and dims as the next one slides over it.
        sheets.slice(0, -1).forEach((sheet, index) => {
          gsap.timeline({ scrollTrigger: { trigger: markers[index + 1], start: 'top bottom', end: 'top top', scrub: true } })
            .to(sheet, { scale: 0.9, borderRadius: 28, ease: 'none' }, 0)
            .to(sheet.querySelector('.sheet-shade'), { opacity: 0.45, ease: 'none' }, 0)
        })
      }

      if (motion) {
        sheets.forEach((sheet, index) => {
          if (cinematic && index === 0) return
          const art = sheet.querySelector('.sheet-art')
          if (stack && art) {
            gsap.fromTo(art, { yPercent: 14, rotate: -3 }, { yPercent: 0, rotate: 0, ease: 'none', scrollTrigger: { trigger: markers[index], start: 'top bottom', end: 'top top', scrub: true } })
          }
          gsap.from(sheet.querySelector('.sheet-title'), { yPercent: 60, opacity: 0, duration: 1, scrollTrigger: { trigger: markers[index], start: 'top 55%', toggleActions: 'play none none reverse' } })
        })
      }

      return () => {
        delete section.dataset.cinematic
      }
    })
  }, { scope: root })

  return (
    <section ref={root} id="selected-work" aria-labelledby="work-title" className="work-sequence relative">
      <div className="work-stack relative flow-root">
        <div className="work-veil bg-background">
          <div className="work-veil-content flex min-h-[80svh] flex-col items-center justify-center px-5 py-24 text-center md:min-h-[100svh] md:px-10">
            <h2 id="work-title" className="work-title display-wide text-[clamp(4rem,15vw,15rem)]">
              Selected
              <br />
              work<span aria-hidden="true" className="work-dot ml-[0.04em] inline-block size-[0.16em] rounded-full align-baseline" style={{ backgroundColor: first.sheet.background }} />
              <span className="sr-only">.</span>
            </h2>
            <p className="mt-8 max-w-[38ch] text-[clamp(1.1rem,1.5vw,1.4rem)] leading-snug text-muted-foreground">
              Three pieces of the CustomerLabs data platform, from a new source to the dashboard it feeds.
            </p>
          </div>
        </div>
        {featuredProjects.map((project, index) => (
          <div key={project.id} className="contents">
            <span id={`project-${project.id}`} className="sheet-marker block h-0" aria-hidden="true" />
            <ProjectSheet project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}
