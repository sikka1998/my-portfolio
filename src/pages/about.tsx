import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP, motionOk } from '../lib/gsap'
import { Link } from '../lib/navigation'
import { about, experience, interests, name, photos } from '../lib/content'
import { PageTitle } from '../components/page-title'

export function AboutPage() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    const mm = gsap.matchMedia()
    mm.add(motionOk, () => {
      q('.about-block').forEach((block) => {
        gsap.from(block, { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: block, start: 'top 88%', toggleActions: 'play none none reverse' } })
      })
    })
  }, { scope: root })

  return (
    <div ref={root}>
      <section className="px-5 pt-[calc(var(--header-height)+clamp(3rem,12vh,8rem))] md:px-10">
        <PageTitle className="max-w-[9ch] text-[clamp(3rem,9vw,9rem)]">{about.title}</PageTitle>
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
          <figure className="overflow-hidden rounded-[20px] md:col-span-5">
            <img src={photos.casual} alt={`${name} at home, arms folded, looking at the camera`} width={1200} height={1472} decoding="async" className="aspect-[4/5] w-full object-cover object-[50%_30%]" />
          </figure>
          <p className="text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug md:col-span-6 md:col-start-7">{about.intro}</p>
        </div>
      </section>

      <section aria-label="Story" className="px-5 py-[clamp(4rem,12vh,8rem)] md:px-10">
        {about.story.map((block) => (
          <div key={block.heading} className="about-block grid gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-10">
            <h2 className="display text-[clamp(1.6rem,2.6vw,2.6rem)] md:col-span-4">{block.heading}</h2>
            <p className="text-[clamp(1.05rem,1.25vw,1.25rem)] leading-relaxed md:col-span-7 md:col-start-6">{block.body}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="career-title" className="px-5 pb-[clamp(4rem,12vh,8rem)] md:px-10">
        <h2 id="career-title" className="about-block display text-[clamp(2.5rem,5vw,5rem)]">Where I have worked</h2>
        <dl className="mt-8">
          {experience.map((job) => (
            <div key={job.company} className="about-block grid gap-2 border-t border-border py-7 md:grid-cols-12 md:gap-8">
              <dt className="display text-[clamp(1.5rem,2.2vw,2rem)] md:col-span-3">{job.company}</dt>
              <dd className="text-[16px] md:col-span-3">{job.role}<br /><span className="text-muted-foreground tabular">{job.dates}</span></dd>
              <dd className="text-[16px] leading-relaxed text-muted-foreground md:col-span-6">{job.summary}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="about-interests" className="px-5 pb-[clamp(5rem,14vh,10rem)] md:px-10">
        <h2 id="about-interests" className="about-block display text-[clamp(2.5rem,5vw,5rem)]">Off the clock</h2>
        <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((interest) => (
            <div key={interest.title} className="about-block border-t border-foreground/80 pt-4">
              <dt className="text-xl font-bold tracking-[-0.02em] [font-stretch:108%]">{interest.title}</dt>
              <dd className="mt-1.5 text-[17px] leading-relaxed text-muted-foreground">{interest.text}</dd>
            </div>
          ))}
        </dl>
        <Link to="#resume" className="about-block mt-12 inline-flex items-center gap-1.5 text-[17px] font-semibold underline decoration-1 underline-offset-[6px] hover:decoration-2">
          See the resume <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
        </Link>
      </section>
    </div>
  )
}
