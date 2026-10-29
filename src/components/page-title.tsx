import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

export function PageTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cn('display-wide text-[clamp(3.5rem,13vw,14rem)]', className)}>{children}</h1>
}
