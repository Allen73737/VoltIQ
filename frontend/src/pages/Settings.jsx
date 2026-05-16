import { Check, Moon, ShieldCheck, Sun } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const options = [
  { id: 'dark', title: 'Dark mode', copy: 'Premium command center theme for daily operations.', icon: Moon },
  { id: 'light', title: 'Light mode', copy: 'Clean executive reporting theme for reviews.', icon: Sun },
]

export default function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Workspace</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Settings</h1>
      </div>
      <section className="glass rounded-[30px] p-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold"><ShieldCheck className="text-sky-300" /> Enterprise controls</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {options.map(({ id, title, copy, icon: Icon }) => {
            const active = theme === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTheme(id)}
                className={`flex items-center justify-between rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 ${
                  active ? 'border-sky-300/60 bg-sky-300/15 shadow-[0_0_44px_rgba(56,189,248,.18)]' : 'border-white/10 bg-white/6 hover:bg-white/10'
                }`}
              >
                <span>
                  <b>{title}</b><br />
                  <small className="text-slate-400">{copy}</small>
                </span>
                <span className="flex items-center gap-3">
                  {active && <Check className="text-emerald-300" size={18} />}
                  <Icon className={id === 'dark' ? 'text-sky-300' : 'text-amber-200'} />
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </PageTransition>
  )
}
