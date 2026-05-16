import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, BadgeIndianRupee, BatteryCharging, Clock3, Lightbulb, PlugZap, Zap } from 'lucide-react'
import MetricCard from '../components/MetricCard.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { ApplianceDonut, PeakBarChart, UsageAreaChart } from '../components/Charts.jsx'
import { fetchAppliances, fetchDashboard } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { applianceBreakdown, heatmap, recommendations as demoRecommendations, timeline } from '../data/mockData.js'

const metricIcons = [Zap, BadgeIndianRupee, BatteryCharging, Clock3]
const demoMetrics = [
  { label: 'Total consumption', value: '842.6 kWh', delta: '-12.4%' },
  { label: 'Predicted bill', value: 'Rs 7,890', delta: '-8.1%' },
  { label: 'Efficiency score', value: '91/100', delta: '+6.3%' },
  { label: 'Peak window', value: '6-9 PM', delta: '3 alerts' },
]

function EmptyWorkspace() {
  return (
    <section className="glass overflow-hidden rounded-[30px] p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Workspace setup</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Connect your first appliance to unlock analytics.</h2>
          <p className="mt-5 max-w-xl leading-8 text-slate-400">
            VoltIQ keeps real accounts empty until actual appliances and sessions exist. Add a device, start a session, stop it after use, and the dashboard will calculate consumption, cost, and operating patterns from your data.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/app/appliances" className="inline-flex items-center gap-2 rounded-2xl bg-sky-300 px-5 py-3 font-semibold text-slate-950">
              <PlugZap size={18} /> Add appliance
            </Link>
            <Link to="/demo" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-3 text-slate-200">
              View demo data
            </Link>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['1', 'Add appliance', 'Name the load and enter its real kW rating.'],
            ['2', 'Start session', 'Track usage only when the appliance is actually running.'],
            ['3', 'Stop session', 'VoltIQ calculates kWh and estimated cost.'],
            ['4', 'Review insight', 'Reports and recommendations appear from recorded usage.'],
          ].map(([step, title, copy]) => (
            <div key={step} className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
              <span className="grid size-9 place-items-center rounded-2xl bg-sky-300 text-sm font-bold text-slate-950">{step}</span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Dashboard() {
  const { isDemo } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [appliances, setAppliances] = useState([])
  const [loading, setLoading] = useState(!isDemo)

  useEffect(() => {
    if (isDemo) {
      setLoading(false)
      return
    }

    Promise.all([fetchDashboard(), fetchAppliances()])
      .then(([dashboardData, applianceData]) => {
        setDashboard(dashboardData)
        setAppliances(applianceData)
      })
      .finally(() => setLoading(false))
  }, [isDemo])

  const metrics = isDemo ? demoMetrics : dashboard?.metrics || []
  const usageData = useMemo(() => {
    if (isDemo) return undefined
    return (dashboard?.hourlyUsage || []).map((point) => ({
      time: point.label,
      kwh: Number(point.actual),
      predicted: Number(point.predicted),
    }))
  }, [dashboard, isDemo])
  const hasUsage = isDemo || metrics.some((metric) => !String(metric.value).startsWith('0.00'))
  const donutData = isDemo
    ? applianceBreakdown
    : appliances.slice(0, 5).map((item, index) => ({
        name: item.name,
        value: Math.max(Number(item.estimatedUnits), 1),
        color: ['#38bdf8', '#22d3ee', '#818cf8', '#2dd4bf', '#60a5fa'][index % 5],
      }))

  return (
    <PageTransition className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">{isDemo ? 'Demo campus' : 'Live workspace'}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Energy Command</h1>
        </div>
        <div className={`flex items-center gap-3 rounded-full border px-4 py-2 text-sm ${isDemo ? 'border-amber-300/20 bg-amber-400/10 text-amber-100' : 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100'}`}>
          <span className={`size-2 rounded-full ${isDemo ? 'bg-amber-300' : 'bg-emerald-300'}`} />
          {isDemo ? 'Demo mode with sample operating data' : 'Production mode: waiting for real sessions'}
        </div>
      </div>

      {loading ? (
        <div className="glass rounded-[30px] p-8 text-slate-300">Loading workspace telemetry...</div>
      ) : !hasUsage ? (
        <EmptyWorkspace />
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric, index) => (
              <MetricCard key={metric.label} icon={metricIcons[index] || Zap} label={metric.label} value={metric.value} delta={metric.delta} />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.45fr_.9fr]">
            <article className="glass rounded-[30px] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Consumption and forecast</h2>
                  <p className="text-sm text-slate-400">{isDemo ? 'Sample kWh with projected evening demand.' : 'Calculated from recorded appliance sessions.'}</p>
                </div>
                <Activity className="text-sky-300" />
              </div>
              <UsageAreaChart data={usageData} />
            </article>

            <article className="glass rounded-[30px] p-5">
              <h2 className="text-xl font-semibold">Appliance mix</h2>
              <ApplianceDonut data={donutData} />
              <div className="grid grid-cols-2 gap-3 text-sm">
                {donutData.map((item) => (
                  <span key={item.name} className="rounded-2xl bg-white/6 px-3 py-2 text-slate-300">{item.name}</span>
                ))}
              </div>
            </article>
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <article className="glass rounded-[30px] p-5 xl:col-span-2">
              <h2 className="text-xl font-semibold">Consumption heatmap</h2>
              <div className="mt-5 grid gap-2">
                {heatmap.map((row, day) => (
                  <div key={day} className="grid grid-cols-12 gap-2">
                    {row.map((cell) => (
                      <motion.span key={`${cell.day}-${cell.hour}`} whileHover={{ scale: 1.18 }} className="h-8 rounded-lg" style={{ background: `rgba(56,189,248,${0.12 + cell.value / 125})` }} />
                    ))}
                  </div>
                ))}
              </div>
            </article>
            <article className="glass rounded-[30px] p-5">
              <h2 className="text-xl font-semibold">Peak demand</h2>
              <PeakBarChart data={usageData} />
            </article>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="glass rounded-[30px] p-5">
              <h2 className="flex items-center gap-2 text-xl font-semibold"><Lightbulb className="text-sky-300" /> Smart recommendations</h2>
              <div className="mt-5 space-y-3">
                {(isDemo ? demoRecommendations : dashboard?.recommendations?.map((item) => `${item.title}: ${item.message} ${item.impact}`) || []).map((item) => (
                  <p key={item} className="rounded-2xl border border-sky-300/10 bg-sky-300/[0.08] p-4 text-slate-300">{item}</p>
                ))}
              </div>
            </article>
            <article className="glass rounded-[30px] p-5">
              <h2 className="text-xl font-semibold">Activity timeline</h2>
              <div className="mt-5 space-y-4">
                {timeline.map(([title, copy, time]) => (
                  <div key={title} className="flex gap-4">
                    <span className="mt-2 size-2 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(56,189,248,.9)]" />
                    <div className="flex-1 border-b border-white/10 pb-4">
                      <div className="flex justify-between gap-3"><p className="font-medium">{title}</p><span className="text-xs text-slate-500">{time}</span></div>
                      <p className="mt-1 text-sm text-slate-400">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </>
      )}
    </PageTransition>
  )
}
