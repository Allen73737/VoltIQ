import { Moon, ShieldCheck, Sun } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'

export default function Settings() {
  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Workspace</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Settings</h1>
      </div>
      <section className="glass rounded-[30px] p-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold"><ShieldCheck className="text-sky-300" /> Enterprise controls</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <button className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 p-5 text-left"><span><b>Dark mode</b><br /><small className="text-slate-400">Premium command center theme</small></span><Moon className="text-sky-300" /></button>
          <button className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 p-5 text-left"><span><b>Light mode</b><br /><small className="text-slate-400">Clean executive reporting theme</small></span><Sun className="text-amber-200" /></button>
        </div>
      </section>
    </PageTransition>
  )
}
