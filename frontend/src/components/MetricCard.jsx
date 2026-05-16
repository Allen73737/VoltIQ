import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function MetricCard({ icon: Icon, label, value, delta }) {
  return (
    <motion.article whileHover={{ y: -6, scale: 1.01 }} className="glass rounded-[26px] p-5">
      <div className="flex items-start justify-between">
        <div className="grid size-12 place-items-center rounded-2xl bg-sky-400/15 text-sky-200">
          <Icon size={22} />
        </div>
        <span className="flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-200">
          <ArrowUpRight size={14} /> {delta}
        </span>
      </div>
      <p className="mt-6 text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">{value}</p>
    </motion.article>
  )
}
