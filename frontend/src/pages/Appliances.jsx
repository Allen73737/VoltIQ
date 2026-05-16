import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Power, Snowflake, Tv, WashingMachine, Wifi } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'
import { createAppliance, fetchAppliances, toggleAppliance } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

const icons = [Snowflake, WashingMachine, Tv, Wifi]
const demoAppliances = [
  { id: 1, name: 'Conference HVAC', zone: 'Tower A', powerRatingKw: 2.4, active: true, estimatedUnits: 18.2 },
  { id: 2, name: 'Laundry Bay 02', zone: 'Hostel East', powerRatingKw: 1.8, active: false, estimatedUnits: 7.9 },
  { id: 3, name: 'Studio Lighting', zone: 'Creative Lab', powerRatingKw: 0.9, active: true, estimatedUnits: 5.6 },
]

export default function Appliances() {
  const { isDemo } = useAuth()
  const [appliances, setAppliances] = useState(isDemo ? demoAppliances : [])
  const [form, setForm] = useState({ name: '', zone: '', powerRatingKw: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(!isDemo)

  useEffect(() => {
    if (isDemo) return
    fetchAppliances()
      .then(setAppliances)
      .catch(() => setError('Could not load appliances from the backend.'))
      .finally(() => setLoading(false))
  }, [isDemo])

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const add = async (event) => {
    event.preventDefault()
    if (!form.name || !form.zone || !form.powerRatingKw) return
    setError('')
    if (isDemo) {
      setAppliances((items) => [...items, { id: Date.now(), ...form, powerRatingKw: Number(form.powerRatingKw), active: false, estimatedUnits: 0 }])
      setForm({ name: '', zone: '', powerRatingKw: '' })
      return
    }
    try {
      const created = await createAppliance({ ...form, powerRatingKw: Number(form.powerRatingKw) })
      setAppliances((items) => [created, ...items])
      setForm({ name: '', zone: '', powerRatingKw: '' })
    } catch {
      setError('Could not add appliance. Check the name, zone, and kW rating.')
    }
  }

  const toggle = async (item) => {
    setError('')
    if (isDemo) {
      setAppliances((items) => items.map((current) => current.id === item.id ? { ...current, active: !current.active } : current))
      return
    }
    try {
      const updated = await toggleAppliance(item.id, item.active ? 'stop' : 'start')
      setAppliances((items) => items.map((current) => current.id === item.id ? updated : current))
    } catch {
      setError('Could not update this appliance session.')
    }
  }

  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">{isDemo ? 'Demo controls' : 'Real appliance control'}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Session Tracking</h1>
      </div>

      <form onSubmit={add} className="glass grid gap-4 rounded-[30px] p-5 md:grid-cols-[1fr_180px_160px_auto]">
        <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Appliance name" className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none focus:border-sky-300" />
        <input value={form.zone} onChange={(e) => update('zone', e.target.value)} placeholder="Zone" className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none focus:border-sky-300" />
        <input value={form.powerRatingKw} onChange={(e) => update('powerRatingKw', e.target.value)} placeholder="kW rating" type="number" step="0.1" className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none focus:border-sky-300" />
        <button className="flex items-center justify-center gap-2 rounded-2xl bg-sky-300 px-5 py-3 font-semibold text-slate-950"><Plus size={18} /> Add</button>
      </form>

      {error && <p className="rounded-2xl border border-rose-300/20 bg-rose-400/10 p-4 text-sm text-rose-100">{error}</p>}

      {loading ? (
        <div className="glass rounded-[30px] p-8 text-slate-300">Loading appliances...</div>
      ) : appliances.length === 0 ? (
        <section className="glass rounded-[30px] p-8">
          <h2 className="text-2xl font-semibold">No appliances connected yet</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">Add real equipment with its kW rating. Once you start and stop sessions, VoltIQ will calculate units consumed and feed the dashboard with actual data.</p>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {appliances.map((item, index) => {
            const Icon = icons[index % icons.length]
            return (
              <motion.article key={item.id} layout whileHover={{ y: -8 }} className="glass rounded-[30px] p-5">
                <div className="flex items-start justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl bg-sky-300/12 text-sky-200"><Icon /></div>
                  <button onClick={() => toggle(item)} className={`grid size-11 place-items-center rounded-2xl ${item.active ? 'bg-emerald-300 text-slate-950' : 'bg-white/10 text-slate-400'}`} aria-label={item.active ? 'Stop appliance session' : 'Start appliance session'}>
                    <Power size={19} />
                  </button>
                </div>
                <h2 className="mt-6 text-2xl font-semibold">{item.name}</h2>
                <p className="mt-1 text-slate-400">{item.zone}</p>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/6 p-4"><p className="text-xs text-slate-500">Rating</p><p className="text-xl font-semibold">{item.powerRatingKw} kW</p></div>
                  <div className="rounded-2xl bg-white/6 p-4"><p className="text-xs text-slate-500">Units</p><p className="text-xl font-semibold">{Number(item.estimatedUnits).toFixed(2)} kWh</p></div>
                </div>
                <p className={`mt-5 rounded-full px-3 py-2 text-center text-sm ${item.active ? 'bg-emerald-300/10 text-emerald-200' : 'bg-slate-400/10 text-slate-400'}`}>
                  {item.active ? 'Active session recording' : 'Idle'}
                </p>
              </motion.article>
            )
          })}
        </section>
      )}
    </PageTransition>
  )
}
