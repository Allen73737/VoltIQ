import { useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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
import AnimatedCounter from '../components/AnimatedCounter.jsx'

const fade = {
  hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
  show: (i = 0) => ({ 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }),
}

function Particles() {
  return Array.from({ length: 24 }, (_, i) => (
    <motion.span
      key={i}
      className="absolute size-1 rounded-full bg-cyan-200/70 shadow-[0_0_24px_rgba(125,211,252,1)]"
      style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 88}%` }}
      animate={{ y: [0, -32, 0], opacity: [0.1, 0.9, 0.1], scale: [1, 1.8, 1] }}
      transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
    />
  ))
}

function Reveal({ children, className = '', delay = 0, y = 50 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: 0.97, filter: 'blur(16px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function HeroPreview() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [-80, 80])
  const rotateXParallax = useTransform(scrollYProgress, [0, 1], [4, -4])

  return (
    <motion.div ref={containerRef} style={{ y: yParallax, rotateX: rotateXParallax }} variants={fade} custom={4} className="relative perspective-[1200px]">
      <div className="absolute -inset-8 rounded-[48px] bg-[linear-gradient(135deg,rgba(56,189,248,.35),rgba(37,99,235,.15),rgba(45,212,191,.25))] blur-3xl opacity-80" />
      <div className="glass relative rounded-[38px] p-5 shadow-[0_0_80px_rgba(56,189,248,0.2)] border border-sky-400/20">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-inner">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-widest">Live grid load</p>
              <p className="text-4xl font-semibold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                <AnimatedCounter value={42.8} formatter={(v) => v.toFixed(1)} /> kWh
              </p>
            </div>
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="rounded-full bg-emerald-400/15 border border-emerald-400/30 px-4 py-1.5 text-sm font-medium text-emerald-300"
            >
              -18.4%
            </motion.span>
          </div>
          <UsageAreaChart />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              [Gauge, 91, 'efficiency', ''],
              [BadgeIndianRupee, 7.8, 'forecast', 'k'],
              [Activity, 100, 'peak', ''],
            ].map(([Icon, value, label, suffix], i) => (
              <motion.div 
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + (i * 0.1), duration: 0.8 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08] transition-colors"
              >
                <Icon className="text-sky-300" size={20} />
                <p className="mt-4 text-2xl font-semibold">
                  {label === 'peak' ? '6-9 PM' : <><AnimatedCounter value={value} formatter={(v) => v.toFixed(label === 'forecast' ? 1 : 0)} />{suffix}</>}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute -bottom-10 -left-6 hidden rounded-[28px] p-5 shadow-2xl md:block border border-emerald-400/20 bg-slate-950/80 backdrop-blur-xl"
      >
        <div className="flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-2xl bg-emerald-300 text-slate-950 shadow-[0_0_30px_rgba(110,231,183,0.5)]"><Zap size={20} /></span>
          <div>
            <p className="text-sm font-medium text-emerald-50">HVAC eco-cycle active</p>
            <p className="text-xs text-emerald-200/70 mt-0.5">Yielding maximum savings</p>
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
  
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0])
  const heroY = useTransform(heroScroll, [0, 1], [0, 150])

  return (
    <main className="overflow-hidden bg-[#02040a] text-white selection:bg-sky-500/30">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[32px] border border-white/10 bg-slate-950/60 px-6 py-4 shadow-[0_32px_80px_rgba(0,0,0,.5)] backdrop-blur-3xl">
          <Link to="/" className="flex items-center gap-3 text-xl font-bold group">
            <motion.span 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="grid size-12 place-items-center rounded-[20px] bg-sky-300 text-slate-950 shadow-[0_0_48px_rgba(56,189,248,.6)] transition-all group-hover:shadow-[0_0_64px_rgba(56,189,248,.8)]"
            >
              <Bolt fill="currentColor" size={24} />
            </motion.span>
            <span>
              <span className="block leading-none tracking-tight">VoltIQ</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-sky-200/60 mt-1 block">Grid Atelier</span>
            </span>
          </Link>
          <div className="hidden items-center gap-10 text-sm font-medium text-slate-300 md:flex">
            {['Features', 'Analytics', 'Customers'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-sky-300 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <motion.button 
              whileTap={{ scale: 0.94 }}
              type="button" 
              onClick={goDemo} 
              className="hidden cursor-pointer rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium hover:bg-white/10 hover:border-white/25 transition-all sm:block"
            >
              View demo
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.94 }}
              onClick={() => navigate('/login')}
              className="luxury-sheen rounded-full bg-sky-300 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_40px_rgba(56,189,248,.4)] hover:shadow-[0_0_60px_rgba(56,189,248,.6)] transition-all"
            >
              Launch app
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <section ref={heroRef} className="relative min-h-[110vh] px-5 pb-32 pt-48 flex items-center">
        <div className="pointer-events-none absolute inset-0 grid-glow opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_22%,rgba(125,211,252,.22),transparent_28rem),linear-gradient(115deg,transparent_0%,rgba(14,165,233,.15)_36%,transparent_62%),linear-gradient(28deg,rgba(45,212,191,.1),transparent_42%)]" />
        <div className="energy-ribbons"><span /><span /><span /><span /></div>
        <div className="pointer-events-none absolute inset-0">
          <Particles />
        </div>
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 mx-auto max-w-7xl w-full" initial="hidden" animate="show">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <motion.div variants={fade} className="inline-flex items-center gap-2.5 rounded-full border border-sky-300/30 bg-sky-300/10 px-5 py-2.5 text-sm font-medium text-sky-100 shadow-[0_0_50px_rgba(56,189,248,.2)] backdrop-blur-md">
                <Sparkles size={18} className="text-sky-300" /> Private energy intelligence for modern spaces
              </motion.div>
              <motion.h1 variants={fade} custom={1} className="mt-8 max-w-4xl text-6xl font-bold tracking-tighter text-white md:text-8xl lg:text-[7.5rem] leading-[0.95]">
                VoltIQ
              </motion.h1>
              <motion.p variants={fade} custom={2} className="mt-8 max-w-3xl text-2xl font-medium leading-[1.6] text-slate-200 md:text-3xl bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
                A luxury-grade command center for electricity, appliances, costs, and operational clarity.
              </motion.p>
              <motion.p variants={fade} custom={3} className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                Track appliance sessions, calculate real kWh, forecast bills, and turn building energy operations into a measurable workflow.
              </motion.p>
              <motion.div variants={fade} custom={4} className="mt-12 flex flex-wrap gap-5">
                <motion.button 
                  whileTap={{ scale: 0.94 }}
                  type="button" 
                  onClick={goRegister} 
                  className="luxury-sheen group flex cursor-pointer items-center gap-3 rounded-full bg-sky-300 px-8 py-4 text-lg font-bold text-slate-950 shadow-[0_0_60px_rgba(56,189,248,.5)] transition-all hover:bg-cyan-200 hover:shadow-[0_0_80px_rgba(56,189,248,.7)]"
                >
                  Create real workspace <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.94 }}
                  type="button" 
                  onClick={goDemo} 
                  className="flex cursor-pointer items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-medium text-slate-200 transition-all hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
                >
                  <Play size={20} fill="currentColor" className="text-sky-300" /> View demo campus
                </motion.button>
              </motion.div>
              <motion.div variants={fade} custom={5} className="mt-14 grid max-w-2xl grid-cols-3 gap-4">
                {[
                  ['Real', 'session-based kWh'],
                  ['Clean', 'tenant workspace'],
                  ['Secure', 'JWT access'],
                ].map(([value, label]) => (
                  <motion.div 
                    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    key={label} 
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-colors backdrop-blur-sm"
                  >
                    <p className="text-2xl font-bold text-sky-100">{value}</p>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-slate-400">{label}</p>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fade} custom={6} className="mt-10 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 backdrop-blur-md">PostgreSQL</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 backdrop-blur-md">Spring Boot</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 backdrop-blur-md">Vercel + Render</span>
              </motion.div>
            </div>

            <HeroPreview />
          </div>
        </motion.div>
      </section>

      <section id="features" className="relative mx-auto max-w-7xl px-5 py-32 z-20">
        <Reveal y={80} className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-sky-300/80">Platform modules</p>
            <h2 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Built like a real SaaS product.</h2>
          </div>
          <p className="max-w-lg text-lg text-slate-400 leading-relaxed font-medium">New workspaces start clean. The demo campus shows sample analytics instantly; production accounts build insight from recorded appliance sessions.</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
        {[
          [Cpu, 'Session intelligence', 'Start/stop appliance tracking with automatic duration and unit calculation.'],
          [Bell, 'Anomaly alerts', 'Peak demand, idle loads, and unusual draw surfaced before bills spike.'],
          [ShieldCheck, 'Enterprise-ready', 'JWT auth, roles, clean APIs, PostgreSQL schema, and Dockerized delivery.'],
        ].map(([Icon, title, copy], i) => (
          <Reveal key={title} delay={i * 0.15} y={60}>
            <motion.article 
              whileHover={{ y: -16, scale: 1.02, rotateX: 4, rotateY: -4 }} 
              className="premium-card glass rounded-[36px] p-8 h-full border border-white/10 hover:border-sky-400/30 transition-all duration-500"
            >
              <div className="size-16 rounded-2xl bg-sky-400/10 grid place-items-center mb-8 border border-sky-400/20 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
                <Icon className="text-sky-300" size={32} />
              </div>
              <h2 className="text-3xl font-bold">{title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">{copy}</p>
            </motion.article>
          </Reveal>
        ))}
        </div>
      </section>

      <section id="analytics" className="relative overflow-hidden border-y border-white/10 bg-slate-900/40 px-5 py-32">
        <div className="energy-ribbons opacity-80"><span /><span /><span /><span /></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_70%)]" />
        <Reveal y={80} className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-sky-300/80">Operations cockpit</p>
            <h2 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">From raw kWh to confident action.</h2>
            <p className="mt-6 text-xl leading-relaxed text-slate-400 font-medium">VoltIQ packages appliance sessions, demand alerts, recommendations, and forecast exports into one premium command surface.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              [LayoutDashboard, 'Executive dashboard', 'Animated charts, heatmaps, usage mix, forecast panels.'],
              [LockKeyhole, 'Secure tenant access', 'JWT auth and role-aware protected routes.'],
              [Zap, 'Live appliance control', 'Session-based on/off tracking with backend unit calculation.'],
              [Building2, 'Multi-space ready', 'Designed for hostels, apartments, offices, and smart homes.'],
            ].map(([Icon, title, copy], i) => (
              <motion.div 
                key={title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10, scale: 1.03, backgroundColor: 'rgba(2,6,23,0.8)' }} 
                className="premium-card rounded-[32px] border border-white/10 bg-slate-950/60 p-7 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/30"
              >
                <Icon className="text-sky-300" size={28} />
                <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{copy}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-32 z-20">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            [28, '%', 'average energy reduction', 0],
            [4.9, 'M', 'sessions analyzed', 1],
            [99.9, '%', 'API availability target', 1],
            [12, ' min', 'to deploy with Docker', 0],
          ].map(([value, suffix, label, decimals], i) => (
            <Reveal key={label} delay={i * 0.15} y={60}>
              <motion.div 
                whileHover={{ y: -12, scale: 1.03 }} 
                className="premium-card rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-lg"
              >
                <p className="text-5xl font-bold text-sky-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                  <AnimatedCounter value={value} formatter={(v) => v.toFixed(decimals)} />{suffix}
                </p>
                <p className="mt-4 text-sm font-medium uppercase tracking-widest text-slate-400">{label}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="trust" className="relative mx-auto max-w-7xl px-5 py-24 z-20">
        <Reveal y={80} className="mb-12 rounded-[42px] border border-white/10 bg-[linear-gradient(135deg,rgba(56,189,248,.18),rgba(255,255,255,.05),rgba(45,212,191,.15))] p-8 shadow-[0_30px_100px_rgba(0,0,0,.4)] backdrop-blur-2xl">
          <div className="grid gap-6 md:grid-cols-3">
            {['Board-ready reporting', 'Tenant-safe access', 'Appliance-level clarity'].map((item, i) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + (i * 0.15) }}
                className="rounded-[30px] border border-white/10 bg-slate-950/60 p-6 shadow-inner"
              >
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-200/70">VoltIQ standard</p>
                <p className="mt-4 text-2xl font-bold">{item}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {['The first dashboard our facilities team checks every morning.', 'VoltIQ made appliance-level accountability feel effortless.'].map((quote, i) => (
            <Reveal key={quote} delay={i * 0.2} y={50}>
              <motion.blockquote 
                whileHover={{ y: -8, scale: 1.01 }}
                className="glass rounded-[36px] p-10 border border-white/10 hover:border-sky-400/20 transition-all duration-300"
              >
                <Building2 className="text-sky-300/80 mb-6" size={32} />
                <p className="text-3xl font-medium leading-[1.4] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">"{quote}"</p>
                <footer className="mt-8 flex items-center gap-4">
                  <div className="size-10 rounded-full bg-slate-800 border border-white/10 grid place-items-center">
                    <span className="text-sm font-bold text-slate-300">{i ? 'AR' : 'NW'}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">{i ? 'Aria Smart Residences' : 'Nexus Workspaces'}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">Facilities Director</p>
                  </div>
                </footer>
              </motion.blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="relative border-t border-white/10 bg-slate-950 px-5 py-16 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(56,189,248,0.05),transparent_50%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-[20px] bg-sky-300 text-slate-950 shadow-[0_0_50px_rgba(56,189,248,.4)]"><Bolt fill="currentColor" size={28} /></span>
              <div>
                <p className="text-2xl font-bold text-slate-100">VoltIQ</p>
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500 mt-1">Grid Atelier</p>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 font-medium">A polished command surface for real appliance sessions, consumption intelligence, billing visibility, and premium energy operations.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-bold">
            <motion.button 
              whileTap={{ scale: 0.94 }}
              onClick={goDemo} 
              className="rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-slate-200 hover:bg-white/10 transition-all backdrop-blur-md"
            >
              View demo
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.94 }}
              onClick={goRegister} 
              className="luxury-sheen rounded-full bg-sky-300 px-8 py-4 text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:shadow-[0_0_60px_rgba(56,189,248,0.6)] transition-all"
            >
              Create workspace
            </motion.button>
          </div>
        </div>
      </footer>
    </main>
  )
}
