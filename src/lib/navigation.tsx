import { createContext, useContext, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'

export type Route =
  | { page: 'home'; anchor?: string }
  | { page: 'work' }
  | { page: 'about' }
  | { page: 'resume' }
  | { page: 'project'; id: string }

export const pages = ['work', 'about', 'resume'] as const

/** Hash routes: "#work", "#about", "#resume", "#project/<id>". Anything else is the home page, with the hash as an anchor. */
export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#\/?/, '')
  if (path === 'work' || path === 'about' || path === 'resume') return { page: path }
  const project = path.match(/^project\/([\w-]+)$/)
  if (project) return { page: 'project', id: project[1] }
  if (path && path !== 'top') return { page: 'home', anchor: path }
  return { page: 'home' }
}

export function routeKey(route: Route) {
  return route.page === 'project' ? `project/${route.id}` : route.page
}

export type Navigation = {
  route: Route
  go: (to: string) => void
}

export const NavigationContext = createContext<Navigation>({ route: { page: 'home' }, go: () => {} })

export function useNavigation() {
  return useContext(NavigationContext)
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; children: ReactNode }

/** In-app link. `to` is a hash such as "#work" or "#project/tiktok-source". */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const { go } = useNavigation()
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    go(to)
  }
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
