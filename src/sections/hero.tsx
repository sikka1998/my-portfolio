import { useMemo, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP, motionOk, prefersReducedMotion } from '../lib/gsap'
import { Link } from '../lib/navigation'
import { fullCircle, hero, name, photos, type HeroNote } from '../lib/content'

/** The viewfinder opening plays once per page load, not on every return to the home page. */
let introPlayed = false

function headerTone(clear: boolean) {
  if (clear) document.documentElement.dataset.headerTone = 'clear'
  else delete document.documentElement.dataset.headerTone
}

/** Deterministic long-exposure star trails: arcs around a pole above the frame. */
function useTrails() {
  return useMemo(() => {
    const cx = 700, cy = 290
    let seed = 7
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
    return Array.from({ length: 140 }, () => {
      const r = 60 + rnd() * 1100
      const start = rnd() * 360, len = 25 + rnd() * 160
      const a0 = (start * Math.PI) / 180, a1 = ((start + len) * Math.PI) / 180
      const d = `M${(cx + r * Math.cos(a0)).toFixed(1)} ${(cy + r * Math.sin(a0)).toFixed(1)} A${r.toFixed(1)} ${r.toFixed(1)} 0 ${len > 180 ? 1 : 0} 1 ${(cx + r * Math.cos(a1)).toFixed(1)} ${(cy + r * Math.sin(a1)).toFixed(1)}`
      return { d, opacity: 0.06 + rnd() * 0.22, width: 0.6 + rnd() * 1.4 }
    })
  }, [])
}

function arrowPath(note: HeroNote) {
  const [[c1x, c1y], [c2x, c2y]] = note.curve
  const [fx, fy] = note.from, [tx, ty] = note.to
  const angle = Math.atan2(ty - c2y, tx - c2x)
  const head = (delta: number) => `${(tx - 26 * Math.cos(angle + delta)).toFixed(1)} ${(ty - 26 * Math.sin(angle + delta)).toFixed(1)}`
  return {
    line: `M${fx} ${fy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tx} ${ty}`,
    head: `M${head(0.5)} L${tx} ${ty} L${head(-0.5)}`,
  }
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const trails = useTrails()
  const { width, height } = hero.photo

  useGSAP(() => {
    const q = gsap.utils.selector(root)
    const scene = q('.cover-scene')[0]
    const text = q('.cover-text')[0]
    const zoom = q('.cover-zoom')[0]
    const textInner = q('.cover-text-inner')[0]
    const finder = q('.cover-finder')[0]
    const trailPaths = q<SVGPathElement>('.cover-trails path')
    const arrowPaths = q<SVGPathElement>('.note-arrows path')
    const clock = q('.finder-clock')[0]
    const focus = q('.focus-box')[0]

    headerTone(true)

    const finish = () => {
      gsap.set(zoom, { scale: 1 })
      gsap.set(textInner, { opacity: 1 })
      gsap.set(finder, { autoAlpha: 0 })
      gsap.set(q('.cover-subject'), { opacity: 1 })
      gsap.set([...trailPaths, ...arrowPaths], { strokeDasharray: 'none', strokeDashoffset: 0 })
      q('.cover-trails')[0]?.classList.add('is-turning')
    }

    if (prefersReducedMotion() || introPlayed) {
      finish()
    } else {
      const hide = (paths: SVGPathElement[]) => paths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })
      hide(trailPaths)
      hide(arrowPaths)
      const exposure = { t: 0 }
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          introPlayed = true
        },
      })
      tl.set(zoom, { scale: 0.86, transformOrigin: '50% 50%' })
        .set(textInner, { opacity: 0 })
        .set(q('.cover-subject'), { opacity: 0.35 })
        .set(finder, { autoAlpha: 1 })
        // The focus point hunts, then locks on the eyes.
        .fromTo(focus, { x: -14, y: 10, scale: 1.25 }, { x: 8, y: -6, scale: 1.1, duration: 0.35, repeat: 2, yoyo: true }, 0.2)
        .to(focus, { x: 0, y: 0, scale: 1, duration: 0.25, onComplete: () => focus.classList.add('is-locked') }, 1.3)
        // The photograph exposes: trails grow, the subject brightens, the counter runs.
        .to(trailPaths, { strokeDashoffset: 0, duration: 2.2, ease: 'power1.inOut', stagger: { each: 0.006, from: 'random' } }, 1.0)
        .to(q('.cover-subject'), { opacity: 1, duration: 2.2, ease: 'power1.inOut' }, 1.0)
        .to(exposure, {
          t: 69 * 60,
          duration: 2.2,
          ease: 'power1.inOut',
          onUpdate: () => {
            const s = Math.round(exposure.t)
            const hh = String(Math.floor(s / 3600)).padStart(2, '0'), mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0'), ss = String(s % 60).padStart(2, '0')
            clock.textContent = `${hh}:${mm}:${ss}`
          },
        }, 1.0)
        // The shutter closes with a blink, then the view zooms into the cover.
        .to(q('.cover-shutter'), { opacity: 1, duration: 0.08, ease: 'none' }, 3.35)
        .to(q('.cover-shutter'), { opacity: 0, duration: 0.35, ease: 'power2.out' }, 3.45)
        .to(finder, { autoAlpha: 0, duration: 0.3 }, 3.4)
        .to(zoom, { scale: 1, duration: 1.3, ease: 'expo.inOut', onStart: () => q('.cover-trails')[0]?.classList.add('is-turning') }, 3.45)
        .to(textInner, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 4.1)
        .to(arrowPaths, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12 }, 4.3)
    }

    const mm = gsap.matchMedia()
    mm.add({ ok: motionOk, desktop: '(min-width: 768px)' }, (context) => {
      const { ok, desktop } = context.conditions as { ok: boolean; desktop: boolean }
      if (!desktop) {
        ScrollTrigger.create({ trigger: q('.cover-block')[0], start: 'top top', end: 'bottom 40%', onToggle: (self) => headerTone(self.isActive) })
        return
      }
      // The portrait contracts into a single window while the full-circle statement arrives on either side.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q('.hero-pin')[0],
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: ok ? 0.6 : true,
          onUpdate: (self) => headerTone(self.progress < 0.3),
          onLeaveBack: () => headerTone(true),
        },
      })
      tl.to(text, { opacity: 0, duration: 0.25, ease: 'none' }, 0)
        .to(q('.cover-frame'), { clipPath: 'inset(12vh 33vw 12vh 33vw round 24px)', duration: 1, ease: 'power2.inOut' }, 0.05)
        .to(scene, { scale: 0.62, transformOrigin: '50% 62%', duration: 1, ease: 'power2.inOut' }, 0.05)
        .to(q('.hero-circle'), { opacity: 1, duration: 0.4, ease: 'none' }, 0.5)
        .from(q('.circle-left'), { x: -40, duration: 0.5, ease: 'power2.out' }, 0.5)
        .from(q('.circle-right'), { x: 40, duration: 0.5, ease: 'power2.out' }, 0.5)
    })

    return () => headerTone(false)
  }, { scope: root })

  return (
    <section ref={root} id="top" aria-label="Introduction" className="relative">
      <div className="hero-pin relative bg-background text-[#f4f4f1] md:h-[100svh] md:min-h-[640px] md:overflow-hidden">
        <div className="cover-block relative h-[100svh] min-h-[640px] overflow-hidden md:absolute md:inset-0">
        <div className="cover-zoom absolute inset-0">
        <div className="cover-frame absolute inset-0" style={{ clipPath: 'inset(0 0 0 0 round 0px)' }}>
          <div className="cover absolute inset-0">
            <div className="cover-scene absolute inset-0">
              <svg className="cover-trails absolute -inset-[30%_20%] h-[160%] w-[140%]" viewBox="0 0 1400 1600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                {trails.map((trail, index) => (
                  <path key={index} d={trail.d} fill="none" stroke={`rgba(240,244,236,${trail.opacity.toFixed(2)})`} strokeWidth={trail.width.toFixed(1)} />
                ))}
              </svg>
              <div className="cover-veil absolute inset-0" />
              <div className="cover-stage absolute bottom-[-2vh] left-1/2 h-[87svh] -translate-x-1/2 max-md:h-auto max-md:w-[min(100vw,62svh)]" style={{ aspectRatio: `${width} / ${height}` }}>
                <img src={photos.portrait} alt={`${name}, seated at a table at night, looking to the side`} width={width} height={height} decoding="async" className="cover-subject block h-full w-full" />
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="cover-text absolute inset-0">
        <div className="cover-text-inner absolute inset-0">
          <h1 className="cover-name absolute inset-x-0 top-[9vh] text-center max-md:top-[calc(var(--header-height)+1rem)] max-md:px-4">{name.toUpperCase()}</h1>
          {/* Notes and arrows share the photo's coordinate space so they stay pinned to it at any size. */}
          <div className="cover-stage absolute bottom-[-2vh] left-1/2 h-[87svh] -translate-x-1/2 max-md:hidden" style={{ aspectRatio: `${width} / ${height}` }}>
            <svg className="note-arrows absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
              {hero.notes.map((note) => {
                const { line, head } = arrowPath(note)
                return (
                  <g key={note.id} className={`arrow-${note.id}`}>
                    <path d={line} />
                    <path d={head} />
                  </g>
                )
              })}
            </svg>
            <dl className="absolute inset-0">
              {hero.notes.map((note) => (
                <div key={note.id} className={`note note-${note.id} hand absolute ${note.side === 'left' ? 'right-[105%] text-right' : 'left-[105%]'}`} style={{ top: `${note.top}%` }}>
                  <dt><small>{note.label}</small></dt>
                  <dd><span>{note.text}</span></dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="absolute bottom-[7vh] left-5 max-w-[34rem] md:left-10">
            <p className="flex items-center gap-2 text-[clamp(0.95rem,1.3vw,1.1rem)] font-semibold">
              <a href={hero.roleHref} target="_blank" rel="noreferrer" className="hover:underline">{hero.role}</a>
              <span aria-hidden="true" className="inline-block size-3.5 rounded-[3px] bg-[#ff5f3b]" />
            </p>
            <p className="mt-2 max-w-[26ch] text-[clamp(1.15rem,1.9vw,1.6rem)] leading-tight text-[#e8e8e4]">{hero.tagline}</p>
            <ul className="hand mt-4 space-y-1 text-[#fff1d6] md:hidden">
              {hero.notes.map((note) => (
                <li key={note.id} className="text-xl leading-tight">
                  <span className="text-sm text-[#ffd79a]">{note.label} </span>
                  {note.text}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="#selected-work" className="inline-flex h-12 items-center gap-2 rounded-full border border-[#f4f4f1]/40 bg-black/25 px-6 text-[15px] font-semibold backdrop-blur-sm transition-transform active:scale-[0.97]">
                View work <ArrowDown aria-hidden="true" className="size-4" strokeWidth={2} />
              </Link>
              <Link to="#resume" className="inline-flex h-12 items-center gap-2 rounded-full border border-[#f4f4f1]/40 bg-black/25 px-6 text-[15px] font-semibold backdrop-blur-sm transition-transform active:scale-[0.97]">
                Resume <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
        </div>

        {/* Camera viewfinder for the opening exposure. */}
        <div className="cover-finder pointer-events-none absolute inset-0 opacity-0" aria-hidden="true">
          <div className="absolute inset-[7%]">
            <span className="finder-mark tl" />
            <span className="finder-mark tr" />
            <span className="finder-mark bl" />
            <span className="finder-mark br" />
            <span className="focus-box absolute left-[46.5%] top-[27%]" />
          </div>
          <div className="finder-text absolute bottom-[3.2%] left-[7%] flex gap-6">
            <span>Bulb</span>
            <span>f/2.8</span>
            <span>ISO 800</span>
          </div>
          <div className="finder-text absolute bottom-[3.2%] right-[7%] flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#ff4d4d]" />
            <span className="finder-clock tabular">00:00:00</span>
          </div>
        </div>
        <div className="cover-shutter pointer-events-none absolute inset-0 bg-black opacity-0" aria-hidden="true" />
        </div>

        {/* Full circle: appears beside the window on large screens, below the cover on small ones. */}
        <div className="hero-circle text-foreground max-md:relative max-md:bg-background max-md:px-5 max-md:py-16 md:pointer-events-none md:absolute md:inset-0 md:opacity-0">
          <div className="circle-left md:absolute md:left-[5vw] md:top-1/2 md:w-[24vw] md:-translate-y-1/2 md:text-right">
            <p className="display text-[clamp(2.2rem,3.6vw,4rem)]">{fullCircle.left}</p>
          </div>
          <div className="circle-right mt-6 md:absolute md:right-[5vw] md:top-1/2 md:mt-0 md:w-[24vw] md:-translate-y-1/2">
            <p className="display text-[clamp(2.2rem,3.6vw,4rem)] text-primary">{fullCircle.right}</p>
            <p className="mt-6 max-w-[34ch] text-[clamp(1rem,1.15vw,1.15rem)] leading-relaxed text-muted-foreground">{fullCircle.body}</p>
            <a href={fullCircle.link.href} target="_blank" rel="noreferrer" className="pointer-events-auto mt-6 inline-flex items-center gap-1.5 text-[16px] font-semibold underline decoration-1 underline-offset-[6px] hover:decoration-2">
              {fullCircle.link.label} <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
