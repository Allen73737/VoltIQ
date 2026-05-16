import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  BadgeIndianRupee,
  Bell,
  Bolt,
  Building2,
  Cpu,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { UsageAreaChart } from '../components/Charts.jsx'

const fade = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
}

function Particles() {
  return Array.from({ length: 18 }, (_, i) => (
    <motion.span
      key={i}
      className="absolute size-1 rounded-full bg-cyan-200/70 shadow-[0_0_18px_rgba(125,211,252,.9)]"
      style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 88}%` }}
      animate={{ y: [0, -24, 0], opacity: [0.18, 0.82, 0.18], scale: [1, 1.45, 1] }}
      transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.12 }}
    />
  ))
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 42, scale: 0.985, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.82, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function HeroPreview() {
  return (
    <motion.div variants={fade} custom={4} className="relative">
      <div className="absolute -inset-6 rounded-[42px] bg-[linear-gradient(135deg,rgba(56,189,248,.22),rgba(37,99,235,.08),rgba(45,212,191,.14))] blur-2xl" />
      <div className="glass relative rounded-[34px] p-4">
        <div className="rounded-[26px] border border-white/10 bg-slate-950/85 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Live grid load</p>
              <p className="text-3xl font-semibold">42.8 kWh</p>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-200">-18.4%</span>
          </div>
          <UsageAreaChart />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              [Gauge, '91', 'efficiency'],
              [BadgeIndianRupee, 'Rs 7.8k', 'forecast'],
              [Activity, '6-9 PM', 'peak'],
            ].map(([Icon, value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <Icon className="text-sky-300" size={18} />
                <p className="mt-3 text-xl font-semibold">{value}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="glass absolute -bottom-8 left-8 hidden rounded-3xl p-4 shadow-2xl md:block"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-emerald-300 text-slate-950"><Zap size={18} /></span>
          <div>
            <p className="text-sm font-medium">HVAC eco-cycle enabled</p>
            <p className="text-xs text-slate-400">Projected savings updated live</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const goRegister = () => navigate('/register')
  const goDemo = () => navigate('/demo')

  return (
    <main className="overflow-hidden bg-[#02040a] text-white">
      <nav className="fixed left-0 right-0 top-0 z-40 px-3 pt-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border border-white/10 bg-slate-950/72 px-5 py-3 shadow-[0_24px_80px_rgba(0,0,0,.34)] backdrop-blur-2xl">
          <Link to="/" className="flex items-center gap-3 text-lg font-semibold">
            <span className="grid size-11 place-items-center rounded-[18px] bg-sky-300 text-slate-950 shadow-[0_0_42px_rgba(56,189,248,.6)]"><Bolt fill="currentColor" /></span>
            <span>
              <span className="block leading-none">VoltIQ</span>
              <span className="text-[10px] uppercase tracking-[0.32em] text-sky-100/60">Grid Atelier</span>
            </span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features">Features</a>
            <a href="#analytics">Analytics</a>
            <a href="#trust">Customers</a>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={goDemo} className="hidden cursor-pointer rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm hover:bg-white/15 sm:block">View demo</button>
            <Link to="/login" className="luxury-sheen rounded-full bg-sky-300 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,.35)]">Launch app</Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen px-5 pb-24 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-glow" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_22%,rgba(125,211,252,.18),transparent_26rem),linear-gradient(115deg,transparent_0%,rgba(14,165,233,.12)_36%,transparent_62%),linear-gradient(28deg,rgba(45,212,191,.08),transparent_42%)]" />
        <div className="energy-ribbons"><span /><span /><span /><span /></div>
        <div className="pointer-events-none absolute inset-0">
          <Particles />
        </div>
        <motion.div className="relative z-10 mx-auto max-w-7xl" initial="hidden" animate="show">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_.95fr]">
            <div>
              <motion.p variants={fade} className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-100 shadow-[0_0_40px_rgba(56,189,248,.18)]">
                <Sparkles size={16} /> Private energy intelligence for modern spaces
              </motion.p>
              <motion.h1 variants={fade} custom={1} className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl">
                VoltIQ
              </motion.h1>
              <motion.p variants={fade} custom={2} className="mt-5 max-w-3xl text-2xl font-medium leading-10 text-slate-100 md:text-3xl">
                A luxury-grade command center for electricity, appliances, costs, and operational clarity.
              </motion.p>
              <motion.p variants={fade} custom={3} className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                Track appliance sessions, calculate real kWh, forecast bills, and turn building energy operations into a measurable workflow.
              </motion.p>
              <motion.div variants={fade} custom={4} className="mt-9 flex flex-wrap gap-4">
                <button type="button" onClick={goRegister} className="luxury-sheen group flex cursor-pointer items-center gap-2 rounded-full bg-sky-300 px-6 py-3 font-semibold text-slate-950 shadow-[0_0_48px_rgba(56,189,248,.42)] transition hover:-translate-y-0.5 hover:bg-cyan-200">
                  Create real workspace <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </button>
                <button type="button" onClick={goDemo} className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10">
                  <Play size={17} fill="currentColor" /> View demo campus
                </button>
              </motion.div>
              <motion.div variants={fade} custom={5} className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {[
                  ['Real', 'session-based kWh'],
                  ['Clean', 'tenant workspace'],
                  ['Secure', 'JWT access'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <p className="text-2xl font-semibold text-sky-100">{value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{label}</p>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fade} custom={6} className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-slate-500">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">PostgreSQL</span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">Spring Boot</span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">Vercel + Render</span>
              </motion.div>
            </div>

            <HeroPreview />
          </div>
        </motion.div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-24">
        <Reveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Platform modules</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Built like a real SaaS product.</h2>
          </div>
          <p className="max-w-md text-slate-400">New workspaces start clean. The demo campus shows sample analytics instantly; production accounts build insight from recorded appliance sessions.</p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
        {[
          [Cpu, 'Session intelligence', 'Start/stop appliance tracking with automatic duration and unit calculation.'],
          [Bell, 'Anomaly alerts', 'Peak demand, idle loads, and unusual draw surfaced before bills spike.'],
          [ShieldCheck, 'Enterprise-ready', 'JWT auth, roles, clean APIs, PostgreSQL schema, and Dockerized delivery.'],
        ].map(([Icon, title, copy], i) => (
          <motion.article key={title} variants={fade} initial="hidden" whileInView="show" custom={i} viewport={{ once: true }} whileHover={{ y: -12, rotateX: 3, rotateY: -3 }} className="premium-card glass rounded-[28px] p-6">
            <Icon className="text-sky-300" size={30} />
            <h2 className="mt-8 text-2xl font-semibold">{title}</h2>
            <p className="mt-3 leading-7 text-slate-400">{copy}</p>
          </motion.article>
        ))}
        </div>
      </section>

      <section id="analytics" className="relative overflow-hidden border-y border-white/10 bg-white/[0.03] px-5 py-24">
        <div className="energy-ribbons opacity-60"><span /><span /><span /><span /></div>
        <Reveal className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Operations cockpit</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">From raw kWh to confident action.</h2>
            <p className="mt-5 leading-8 text-slate-400">VoltIQ packages appliance sessions, demand alerts, recommendations, and forecast exports into one premium command surface.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [LayoutDashboard, 'Executive dashboard', 'Animated charts, heatmaps, usage mix, forecast panels.'],
              [LockKeyhole, 'Secure tenant access', 'JWT auth and role-aware protected routes.'],
              [Zap, 'Live appliance control', 'Session-based on/off tracking with backend unit calculation.'],
              [Building2, 'Multi-space ready', 'Designed for hostels, apartments, offices, and smart homes.'],
            ].map(([Icon, title, copy]) => (
              <motion.div key={title} whileHover={{ y: -8, scale: 1.02 }} className="premium-card rounded-[26px] border border-white/10 bg-slate-950/40 p-6">
                <Icon className="text-sky-300" />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-400">{copy}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-24 md:grid-cols-4">
        {[
          ['28%', 'average energy reduction'],
          ['4.9M', 'sessions analyzed'],
          ['99.9%', 'API availability target'],
          ['12 min', 'to deploy with Docker'],
        ].map(([value, label]) => (
          <motion.div key={label} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -8, scale: 1.025 }} className="premium-card rounded-[26px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-4xl font-semibold text-sky-200">{value}</p>
            <p className="mt-2 text-slate-400">{label}</p>
          </motion.div>
        ))}
      </section>

      <section id="trust" className="mx-auto max-w-7xl px-5 py-24">
        <Reveal className="mb-10 rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(56,189,248,.14),rgba(255,255,255,.04),rgba(45,212,191,.1))] p-6 shadow-[0_26px_90px_rgba(0,0,0,.28)]">
          <div className="grid gap-5 md:grid-cols-3">
            {['Board-ready reporting', 'Tenant-safe access', 'Appliance-level clarity'].map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-sky-100/60">VoltIQ standard</p>
                <p className="mt-3 text-xl font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {['The first dashboard our facilities team checks every morning.', 'VoltIQ made appliance-level accountability feel effortless.'].map((quote, i) => (
            <motion.blockquote key={quote} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-[28px] p-8">
              <Building2 className="text-sky-300" />
              <p className="mt-7 text-2xl leading-10">{quote}</p>
              <footer className="mt-6 text-slate-400">{i ? 'Nexus Workspaces' : 'Aria Smart Residences'}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/70 px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-[18px] bg-sky-300 text-slate-950 shadow-[0_0_36px_rgba(56,189,248,.45)]"><Bolt fill="currentColor" /></span>
              <div>
                <p className="text-lg font-semibold text-slate-100">VoltIQ</p>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Smart Energy Consumption Analytics Platform</p>
              </div>
            </div>
            <p className="mt-5 max-w-xl leading-7 text-slate-500">A polished command surface for real appliance sessions, consumption intelligence, billing visibility, and premium energy operations.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link to="/demo" className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-slate-300 hover:bg-white/10">View demo</Link>
            <Link to="/register" className="rounded-full bg-sky-300 px-5 py-3 font-semibold text-slate-950">Create workspace</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
