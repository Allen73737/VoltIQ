import { Download, FileText } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'

export default function Reports() {
  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Reports</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Exports and Audits</h1>
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        {['Weekly optimization report', 'Monthly billing forecast', 'Appliance audit trail'].map((title) => (
          <article key={title} className="glass rounded-[30px] p-6">
            <FileText className="text-sky-300" />
            <h2 className="mt-8 text-2xl font-semibold">{title}</h2>
            <p className="mt-3 text-slate-400">Ready for PDF and CSV export through backend reporting APIs.</p>
            <button className="mt-7 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm hover:bg-white/15"><Download size={17} /> Export</button>
          </article>
        ))}
      </section>
    </PageTransition>
  )
}
