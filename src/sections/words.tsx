import { useRef } from 'react'
import { gsap, useGSAP, motionOk } from '../lib/gsap'
import { manifesto } from '../lib/content'

/** One sentence that reveals word by word as it scrolls into the middle of the screen. */
export function Words() {
  const root = useRef<HTMLElement>(null)
  const words = manifesto.split(' ')

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    const mm = gsap.matchMedia()
    mm.add(motionOk, () => {
      gsap.fromTo(q('.word'), { opacity: 0.15 }, {
        opacity: 1,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 55%', scrub: 0.4 },
      })
    })
  }, { scope: root })

  return (
    <section ref={root} aria-label="How I work" className="px-5 py-[clamp(6rem,18vh,14rem)] md:px-10">
      <p className="display max-w-[14ch] text-[clamp(2.4rem,6.2vw,6.4rem)] font-[720]">
        {words.map((word, index) => (
          <span key={index} className="word inline-block">
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>
    </section>
  )
}
