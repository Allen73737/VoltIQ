import { Download, FileText, LockKeyhole } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const demoReports = [
  ['Weekly optimization report', 'Peak-hour load movement, appliance-level savings, and operating recommendations.'],
  ['Monthly billing forecast', 'Projected cost, tariff exposure, and expected kWh trend for the current cycle.'],
  ['Appliance audit trail', 'Session history for HVAC, laundry, lighting, kitchen, and workstation loads.'],
]

export default function Reports() {
  const { isDemo } = useAuth()

  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">{isDemo ? 'Demo reports' : 'Reports'}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Exports and Audits</h1>
      </div>

      {isDemo ? (
        <section className="grid gap-4 md:grid-cols-3">
          {demoReports.map(([title, copy]) => (
            <article key={title} className="glass rounded-[30px] p-6">
              <FileText className="text-sky-300" />
              <h2 className="mt-8 text-2xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-slate-400">{copy}</p>
              <button className="mt-7 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm hover:bg-white/15"><Download size={17} /> Preview export</button>
            </article>
          ))}
        </section>
      ) : (
        <section className="glass rounded-[30px] p-8">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <LockKeyhole className="text-sky-300" size={34} />
              <h2 className="mt-6 text-3xl font-semibold tracking-tight">Reports unlock after real sessions are recorded.</h2>
              <p className="mt-4 leading-8 text-slate-400">
                VoltIQ does not generate audit files from imaginary readings. Add appliances, run sessions, and the report center will use actual usage logs for billing forecasts, appliance audits, and optimization exports.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Usage logs', 'Cost history', 'Appliance audit'].map((item) => (
                <div key={item} className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
                  <FileText className="text-slate-500" />
                  <p className="mt-5 font-semibold text-slate-200">{item}</p>
                  <p className="mt-2 text-sm text-slate-500">Waiting for recorded data</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  )
}
