import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { Link } from '../lib/navigation'
import { email, name, phone, profiles } from '../lib/content'

const ringText = `${name.toUpperCase()}  /  FULL STACK ENGINEER  /  `

const rings = [
  { r: 220, duration: 150, reverse: false, size: 15 },
  { r: 330, duration: 190, reverse: true, size: 16 },
  { r: 440, duration: 230, reverse: false, size: 17 },
  { r: 550, duration: 280, reverse: true, size: 18 },
  { r: 660, duration: 330, reverse: false, size: 19 },
]

function Rings() {
  return (
    <svg aria-hidden="true" viewBox="-700 -700 1400 1400" className="absolute left-1/2 top-1/2 h-[200vmax] w-[200vmax] max-h-[1800px] max-w-[1800px] -translate-x-1/2 -translate-y-1/2 opacity-[0.26]">
      <defs>
        {rings.map((ring, index) => (
          <path key={index} id={`ring-${index}`} d={`M ${-ring.r},0 a ${ring.r},${ring.r} 0 1,1 ${ring.r * 2},0 a ${ring.r},${ring.r} 0 1,1 ${-ring.r * 2},0`} />
        ))}
      </defs>
      {rings.map((ring, index) => {
        const repeat = Math.ceil((2 * Math.PI * ring.r) / (ringText.length * ring.size * 0.62))
        return (
          <text key={index} className={`ring ${ring.reverse ? 'reverse' : ''}`} style={{ '--ring-duration': `${ring.duration}s` } as React.CSSProperties} fill="currentColor" fontSize={ring.size} fontWeight={600} letterSpacing="0.18em">
            <textPath href={`#ring-${index}`}>{ringText.repeat(repeat)}</textPath>
          </text>
        )
      })}
    </svg>
  )
}

export function SiteFooter() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <section aria-labelledby="footer-title" className="relative isolate flex min-h-[92svh] flex-col items-center justify-center px-5 py-24 text-center md:px-10">
        <Rings />
        <h2 id="footer-title" className="display relative text-[clamp(3rem,9vw,8.5rem)]">
          Bring me a
          <br />
          hard problem.
        </h2>
        <a
          href={`mailto:${email}`}
          className="relative mt-12 grid size-[clamp(9rem,18vw,13rem)] place-items-center rounded-full bg-primary text-[clamp(1rem,1.5vw,1.2rem)] font-semibold text-primary-foreground transition-transform hover:scale-[1.04] active:scale-[0.98]"
        >
          Get in touch
        </a>
        <a href={`mailto:${email}`} className="relative mt-10 text-[clamp(1.1rem,1.8vw,1.5rem)] font-medium underline decoration-1 underline-offset-[8px] hover:decoration-2">
          {email}
        </a>
        <ul className="relative mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] font-medium">
          <li>
            <a href={phone.href} className="underline decoration-1 underline-offset-[6px] hover:decoration-2">
              {phone.label}
            </a>
          </li>
          {profiles.map((profile) => (
            <li key={profile.label}>
              <a href={profile.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-1 underline-offset-[6px] hover:decoration-2">
                {profile.label}
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-5 text-[14px] text-muted-foreground md:px-10">
        <p>© {new Date().getFullYear()} {name}</p>
        <nav aria-label="Footer" className="flex items-center gap-6">
          <Link to="#work" className="hover:text-foreground">Work</Link>
          <Link to="#about" className="hover:text-foreground">About</Link>
          <Link to="#resume" className="hover:text-foreground">Resume</Link>
          <button type="button" onClick={toTop} className="inline-flex items-center gap-1 hover:text-foreground">
            Back to top <ArrowUp aria-hidden="true" className="size-4" strokeWidth={2} />
          </button>
        </nav>
      </div>
    </footer>
  )
}
