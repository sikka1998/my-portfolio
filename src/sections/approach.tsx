import { useRef } from 'react'
import { gsap, useGSAP, motionOk } from '../lib/gsap'
import { practice } from '../lib/content'

export function Approach() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    const mm = gsap.matchMedia()
    mm.add(motionOk, () => {
      gsap.from(q('.practice'), {
        y: 48,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      })
    })
  }, { scope: root })

  return (
    <section ref={root} id="approach" aria-label="What I do" className="px-5 pb-[clamp(5rem,14vh,10rem)] md:px-10">
      <div className="grid gap-12 md:grid-cols-3 md:gap-10">
        {practice.map((item) => (
          <div key={item.title} className="practice">
            <h2 className="text-[clamp(1.5rem,2vw,1.9rem)] font-bold tracking-[-0.02em] [font-stretch:108%]">{item.title}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{item.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {item.tools.map((tool) => (
                <li key={tool} className="rounded-full border border-border px-3 py-1.5 text-[13px] font-medium">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
