import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './lib/gsap'
import { NavigationContext, parseRoute, routeKey, type Route } from './lib/navigation'
import { ThemeContext, useThemeState } from './lib/theme'
import { name, projectById } from './lib/content'
import { SiteHeader } from './components/site-header'
import { SiteFooter } from './components/site-footer'
import { HomePage } from './pages/home'
import { WorkPage } from './pages/work'
import { ProjectPage } from './pages/project'
import { AboutPage } from './pages/about'
import { ResumePage } from './pages/resume'

function documentTitle(route: Route) {
  switch (route.page) {
    case 'work': return `Work | ${name}`
    case 'about': return `About | ${name}`
    case 'resume': return `Resume | ${name}`
    case 'project': return `${projectById(route.id)?.name ?? 'Project'} | ${name}`
    default: return `${name} | Full Stack Engineer`
  }
}

function Page({ route }: { route: Route }) {
  switch (route.page) {
    case 'work': return <WorkPage />
    case 'project': return <ProjectPage id={route.id} />
    case 'about': return <AboutPage />
    case 'resume': return <ResumePage />
    default: return <HomePage />
  }
}

export function App() {
  const theme = useThemeState()
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash))
  const lenis = useRef<Lenis | null>(null)
  const main = useRef<HTMLElement>(null)
  const pendingAnchor = useRef<string | undefined>(route.page === 'home' ? route.anchor : undefined)

  // Smooth wheel scrolling for fine pointers only; keyboard, touch and reduced motion keep native scrolling.
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const instance = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false })
    lenis.current = instance
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenis.current = null
    }
  }, [])

  const scrollTo = useCallback((target: number | HTMLElement, immediate: boolean) => {
    if (lenis.current) lenis.current.scrollTo(target, { immediate, force: true, duration: 1.15 })
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate ? 'instant' : 'smooth' })
    else target.scrollIntoView({ behavior: immediate ? 'instant' : 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const next = parseRoute(window.location.hash)
      if (next.page === 'home' && next.anchor) {
        pendingAnchor.current = next.anchor
        if (route.page === 'home') {
          const element = document.getElementById(next.anchor)
          if (element) scrollTo(element, false)
          pendingAnchor.current = undefined
          return
        }
      }
      if (routeKey(next) !== routeKey(route)) setRoute(next)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [route, scrollTo])

  // A new page starts at the top (or at its anchor), with ScrollTrigger measured against the new layout.
  useLayoutEffect(() => {
    document.title = documentTitle(route)
    const anchor = pendingAnchor.current
    pendingAnchor.current = undefined
    const element = anchor ? document.getElementById(anchor) : null
    scrollTo(element ?? 0, true)
    main.current?.focus({ preventScroll: true })
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (element) scrollTo(element, true)
    })
    return () => cancelAnimationFrame(id)
  }, [route, scrollTo])

  const go = useCallback((to: string) => {
    const hash = to.startsWith('#') ? to : `#${to}`
    if (window.location.hash === hash) {
      const next = parseRoute(hash)
      if (next.page === 'home') {
        const element = next.anchor ? document.getElementById(next.anchor) : null
        scrollTo(element ?? 0, false)
      }
      return
    }
    window.location.hash = hash
  }, [scrollTo])

  const navigation = useMemo(() => ({ route, go }), [route, go])

  return (
    <ThemeContext.Provider value={theme}>
      <NavigationContext.Provider value={navigation}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" ref={main} tabIndex={-1} className="outline-none">
          <Page key={routeKey(route)} route={route} />
        </main>
        <SiteFooter />
      </NavigationContext.Provider>
    </ThemeContext.Provider>
  )
}
