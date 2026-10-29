import type { Project } from '../lib/content'

/* Stylised product screens built in CSS, standing in for real screenshots. */

function Frame({ children, dark = true, title }: { children: React.ReactNode; dark?: boolean; title: string }) {
  return (
    <div
      className={`mock relative w-full overflow-hidden rounded-[18px] border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ${dark ? 'border-white/10 bg-[#121417] text-[#e8e9eb]' : 'border-black/10 bg-[#f7f8fa] text-[#1a1d21]'}`}
      aria-label={`${title} screen`}
      role="img"
    >
      <div className={`flex items-center gap-2 border-b px-3 py-2 ${dark ? 'border-white/10' : 'border-black/10'}`}>
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] opacity-60">{title}</span>
      </div>
      {children}
    </div>
  )
}

function Chip({ children, tone = 'muted' }: { children: React.ReactNode; tone?: 'muted' | 'ok' | 'warn' | 'accent' }) {
  const tones = { muted: 'bg-current/10', ok: 'bg-[#22c55e]/20 text-[#86efac]', warn: 'bg-[#f59e0b]/20 text-[#fcd34d]', accent: 'bg-[#f0587a]/20 text-[#ffb3c6]' }
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tones[tone]}`}>{children}</span>
}

function Sidebar({ items, active }: { items: string[]; active: number }) {
  return (
    <aside className="hidden w-[108px] shrink-0 border-r border-white/10 p-3 sm:block">
      <div className="mb-3 text-[10px] font-bold tracking-wide opacity-70">CustomerLabs</div>
      <ul className="space-y-1.5">
        {items.map((item, index) => (
          <li key={item} className={`rounded-md px-2 py-1 text-[10px] ${index === active ? 'bg-white/10 font-semibold' : 'opacity-60'}`}>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}

function TikTokScreen() {
  const forms = [
    ['Summer Sale Lead Form', 'Syncing', 'ok'],
    ['Webinar Signup', 'Syncing', 'ok'],
    ['Demo Request', 'Paused', 'warn'],
  ] as const
  return (
    <Frame title="Sources / TikTok Lead Forms">
      <div className="flex">
        <Sidebar items={['Sources', 'Events', 'Audiences', 'Destinations', 'Settings']} active={0} />
        <div className="flex-1 p-4">
          <div className="mock-row mb-3">
            <div>
              <div className="text-[13px] font-bold">TikTok Lead Forms</div>
              <div className="opacity-60">Business account connected · ads_account_71…</div>
            </div>
            <Chip tone="ok">Live</Chip>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-2">
            {[['Leads today', '142'], ['Forms synced', '3'], ['Match rate', '96%']].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-white/5 p-2">
                <div className="opacity-60">{label}</div>
                <div className="text-[15px] font-bold tabular">{value}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-white/10">
            {forms.map(([form, status, tone]) => (
              <div key={form} className="mock-row border-b border-white/10 px-3 py-2 last:border-0">
                <span>{form}</span>
                <Chip tone={tone}>{status}</Chip>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] opacity-70">
            <span className="rounded bg-white/10 px-1.5 py-0.5">tiktok.lead</span>
            <span>→</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Pub/Sub</span>
            <span>→</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">Cloud Function</span>
            <span>→</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5">first-party event</span>
          </div>
        </div>
      </div>
    </Frame>
  )
}

function TrackerScreen() {
  const sites = [
    ['shop.aurora-skincare.com', 'v2', 'ok'],
    ['store.northwind-tea.in', 'v2', 'ok'],
    ['www.kinfolk-home.co', 'v2', 'ok'],
    ['app.bluebird-fitness.com', 'migrating', 'warn'],
  ] as const
  return (
    <Frame title="Tracker / Migration">
      <div className="flex">
        <Sidebar items={['Sources', 'Tracker', 'Events', 'Audiences', 'Destinations']} active={1} />
        <div className="flex-1 p-4">
          <div className="mock-row mb-3">
            <div>
              <div className="text-[13px] font-bold">cltracker v1 → v2</div>
              <div className="opacity-60">cdn.customerlabs.co/tracker/v2.js</div>
            </div>
            <Chip tone="ok">300+ sites</Chip>
          </div>
          <div className="mb-3">
            <div className="mock-row mb-1 opacity-70">
              <span>Migration progress</span>
              <span className="tabular">98%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[98%] rounded-full bg-[#c9d66a]" />
            </div>
          </div>
          <div className="rounded-lg border border-white/10">
            {sites.map(([site, version, tone]) => (
              <div key={site} className="mock-row border-b border-white/10 px-3 py-2 last:border-0">
                <span className="font-mono text-[10px]">{site}</span>
                <Chip tone={tone}>{version}</Chip>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-white/5 p-2">
              <div className="opacity-60">Events lost in cutover</div>
              <div className="text-[15px] font-bold tabular">0</div>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <div className="opacity-60">Vendor scripts on own CDN</div>
              <div className="text-[15px] font-bold tabular">100%</div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

function Spark({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * 100} ${30 - (p / max) * 26}`).join(' ')
  return (
    <svg viewBox="0 0 100 32" className="h-8 w-full" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function CoffeeScreen() {
  return (
    <Frame title="Morning Coffee">
      <div className="flex">
        <Sidebar items={['Morning Coffee', 'Sources', 'Audiences', 'Destinations', 'Settings']} active={0} />
        <div className="flex-1 p-4">
          <div className="mock-row mb-3">
            <div>
              <div className="text-[13px] font-bold">Good morning. Here is yesterday.</div>
              <div className="opacity-60">Google Ads · Meta Ads · Shopify · Last 24h</div>
            </div>
            <Chip tone="accent">3 accounts</Chip>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-2">
            {[
              ['Ad spend', '₹1.84L', '#f0587a', [4, 5, 6, 5, 7, 8, 7]],
              ['Revenue', '₹7.92L', '#c9d66a', [3, 4, 4, 6, 7, 9, 10]],
              ['ROAS', '4.3x', '#7aa2ff', [2, 3, 3, 4, 4, 5, 5]],
            ].map(([label, value, color, points]) => (
              <div key={label as string} className="rounded-lg bg-white/5 p-2">
                <div className="opacity-60">{label as string}</div>
                <div className="text-[15px] font-bold tabular">{value as string}</div>
                <Spark points={points as number[]} color={color as string} />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-white/10 p-3">
            <div className="mock-row mb-2 opacity-70">
              <span>Orders by channel</span>
              <span>Shopify</span>
            </div>
            {[['Meta Ads', 62, '#7aa2ff'], ['Google Ads', 48, '#c9d66a'], ['Organic', 30, '#f0587a']].map(([label, width, color]) => (
              <div key={label as string} className="mb-1.5 flex items-center gap-2">
                <span className="w-16 opacity-70">{label as string}</span>
                <div className="h-2 flex-1 rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${width}%`, background: color as string }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

function PhoneScreen({ title, lines }: { title: string; lines: [string, string][] }) {
  return (
    <div className="mx-auto w-[220px] rounded-[28px] border border-white/15 bg-[#0e1012] p-3 text-[#e8e9eb] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]" role="img" aria-label={`${title} screen`}>
      <div className="mx-auto mb-3 h-4 w-20 rounded-full bg-black" />
      <div className="mock space-y-2">
        <div className="text-[12px] font-bold">{title}</div>
        {lines.map(([label, value]) => (
          <div key={label} className="mock-row rounded-lg bg-white/5 px-2 py-1.5">
            <span className="opacity-70">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GenericScreen({ title, rows, dark = true }: { title: string; rows: [string, string][]; dark?: boolean }) {
  return (
    <Frame title={title} dark={dark}>
      <div className="p-4">
        <div className="mb-3 text-[13px] font-bold">{title}</div>
        <div className={`rounded-lg border ${dark ? 'border-white/10' : 'border-black/10'}`}>
          {rows.map(([label, value]) => (
            <div key={label} className={`mock-row border-b px-3 py-2 last:border-0 ${dark ? 'border-white/10' : 'border-black/10'}`}>
              <span>{label}</span>
              <span className="font-semibold tabular">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="mock-bar w-4/5" />
          <div className="mock-bar w-3/5" />
          <div className="mock-bar w-2/3" />
        </div>
      </div>
    </Frame>
  )
}

export function MockScreen({ screen }: { screen: Project['screen'] }) {
  switch (screen) {
    case 'tiktok':
      return <TikTokScreen />
    case 'tracker':
      return <TrackerScreen />
    case 'coffee':
      return <CoffeeScreen />
    case 'appbrew':
      return <PhoneScreen title="AppBrew · Aurora Skincare" lines={[['product_viewed', '1,208'], ['added_to_cart', '342'], ['checkout_started', '96'], ['order_completed', '41']]} />
    case 'audiences':
      return <GenericScreen title="Audiences v2" rows={[['High-AOV buyers', '12,480'], ['Abandoned cart, 7d', '3,115'], ['Repeat customers', '8,902'], ['New visitors, UTM tiktok', '21,004']]} />
    case 'website':
      return <GenericScreen title="customerlabs.com · Lighthouse" rows={[['Performance', '97'], ['Accessibility', '97'], ['Best practices', '78'], ['SEO', '100']]} dark={false} />
    case 'jeeva':
      return <GenericScreen title="Jeeva AI · Leads" rows={[['Rows rendered', '50,000'], ['Initial bundle', '-41%'], ['Performance', '+35%'], ['Unit tests', 'Jest']]} />
    case 'trustt':
      return <GenericScreen title="Loan servicing" rows={[['Foreclosure', 'Enabled'], ['Part-payment', 'Enabled'], ['Repayment schedule', 'Generated'], ['Status', 'Active']]} dark={false} />
  }
}
