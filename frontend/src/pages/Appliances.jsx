import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Power, Snowflake, Tv, WashingMachine, Wifi } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'

const icons = [Snowflake, WashingMachine, Tv, Wifi]
const initial = [
  { id: 1, name: 'Conference HVAC', zone: 'Tower A', rating: 2.4, active: true, units: 18.2 },
  { id: 2, name: 'Laundry Bay 02', zone: 'Hostel East', rating: 1.8, active: false, units: 7.9 },
  { id: 3, name: 'Studio Lighting', zone: 'Creative Lab', rating: 0.9, active: true, units: 5.6 },
]

export default function Appliances() {
  const [appliances, setAppliances] = useState(initial)
  const [name, setName] = useState('')
  const [rating, setRating] = useState('')

  const add = (event) => {
    event.preventDefault()
    if (!name || !rating) return
    setAppliances((items) => [...items, { id: Date.now(), name, zone: 'New zone', rating: Number(rating), active: false, units: 0 }])
    setName('')
    setRating('')
  }

  const toggle = (id) => setAppliances((items) => items.map((item) => item.id === id ? { ...item, active: !item.active } : item))

  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Appliance control</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Session Tracking</h1>
      </div>

      <form onSubmit={add} className="glass grid gap-4 rounded-[30px] p-5 md:grid-cols-[1fr_180px_auto]">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Appliance name" className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none focus:border-sky-300" />
        <input value={rating} onChange={(e) => setRating(e.target.value)} placeholder="kW rating" type="number" step="0.1" className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none focus:border-sky-300" />
        <button className="flex items-center justify-center gap-2 rounded-2xl bg-sky-300 px-5 py-3 font-semibold text-slate-950"><Plus size={18} /> Add</button>
      </form>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {appliances.map((item, index) => {
          const Icon = icons[index % icons.length]
          return (
            <motion.article key={item.id} layout whileHover={{ y: -8 }} className="glass rounded-[30px] p-5">
              <div className="flex items-start justify-between">
                <div className="grid size-12 place-items-center rounded-2xl bg-sky-300/12 text-sky-200"><Icon /></div>
                <button onClick={() => toggle(item.id)} className={`grid size-11 place-items-center rounded-2xl ${item.active ? 'bg-emerald-300 text-slate-950' : 'bg-white/10 text-slate-400'}`}>
                  <Power size={19} />
                </button>
              </div>
              <h2 className="mt-6 text-2xl font-semibold">{item.name}</h2>
              <p className="mt-1 text-slate-400">{item.zone}</p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/6 p-4"><p className="text-xs text-slate-500">Rating</p><p className="text-xl font-semibold">{item.rating} kW</p></div>
                <div className="rounded-2xl bg-white/6 p-4"><p className="text-xs text-slate-500">Units</p><p className="text-xl font-semibold">{item.units} kWh</p></div>
              </div>
              <p className={`mt-5 rounded-full px-3 py-2 text-center text-sm ${item.active ? 'bg-emerald-300/10 text-emerald-200' : 'bg-slate-400/10 text-slate-400'}`}>
                {item.active ? 'Active session recording' : 'Idle'}
              </p>
            </motion.article>
          )
        })}
      </section>
    </PageTransition>
  )
}
