import { motion } from 'framer-motion'
import { Activity, BadgeIndianRupee, BatteryCharging, Clock3, Lightbulb, Zap } from 'lucide-react'
import MetricCard from '../components/MetricCard.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { ApplianceDonut, PeakBarChart, UsageAreaChart } from '../components/Charts.jsx'
import { heatmap, recommendations, timeline } from '../data/mockData.js'

export default function Dashboard() {
  return (
    <PageTransition className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Smart grid overview</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Energy Command</h1>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
          <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,.9)]" />
          Live telemetry simulation active
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Zap} label="Total consumption" value="842.6 kWh" delta="-12.4%" />
        <MetricCard icon={BadgeIndianRupee} label="Predicted bill" value="₹7,890" delta="-8.1%" />
        <MetricCard icon={BatteryCharging} label="Efficiency score" value="91/100" delta="+6.3%" />
        <MetricCard icon={Clock3} label="Peak window" value="6-9 PM" delta="3 alerts" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_.9fr]">
        <article className="glass rounded-[30px] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Consumption and AI prediction</h2>
              <p className="text-sm text-slate-400">Actual kWh with projected evening demand.</p>
            </div>
            <Activity className="text-sky-300" />
          </div>
          <UsageAreaChart />
        </article>

        <article className="glass rounded-[30px] p-5">
          <h2 className="text-xl font-semibold">Appliance mix</h2>
          <ApplianceDonut />
          <div className="grid grid-cols-2 gap-3 text-sm">
            {['HVAC 34%', 'Kitchen 22%', 'Lighting 16%', 'Workstations 16%'].map((item) => (
              <span key={item} className="rounded-2xl bg-white/6 px-3 py-2 text-slate-300">{item}</span>
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
                  <motion.span
                    key={`${cell.day}-${cell.hour}`}
                    whileHover={{ scale: 1.18 }}
                    className="h-8 rounded-lg"
                    style={{ background: `rgba(56,189,248,${0.12 + cell.value / 125})` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </article>
        <article className="glass rounded-[30px] p-5">
          <h2 className="text-xl font-semibold">Peak demand</h2>
          <PeakBarChart />
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="glass rounded-[30px] p-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold"><Lightbulb className="text-sky-300" /> Smart recommendations</h2>
          <div className="mt-5 space-y-3">
            {recommendations.map((item) => <p key={item} className="rounded-2xl border border-sky-300/10 bg-sky-300/[0.08] p-4 text-slate-300">{item}</p>)}
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
    </PageTransition>
  )
}
