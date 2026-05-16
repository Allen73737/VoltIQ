import { motion } from 'framer-motion'
import { Bolt } from 'lucide-react'

export default function BootLoader({ done }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#02040a] text-white"
      style={{ pointerEvents: done ? 'none' : 'auto' }}
    >
      <div className="absolute inset-0 luxury-boot-grid" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: 'blur(18px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative grid place-items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
          className="absolute size-44 rounded-full border border-sky-200/10 border-t-sky-200/80 border-r-cyan-200/50"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'linear' }}
          className="absolute size-60 rounded-full border border-white/5 border-b-blue-300/40"
        />
        <motion.div
          animate={{ boxShadow: ['0 0 44px rgba(56,189,248,.35)', '0 0 92px rgba(125,211,252,.72)', '0 0 44px rgba(56,189,248,.35)'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="grid size-28 place-items-center rounded-[34px] border border-white/15 bg-sky-300 text-slate-950"
        >
          <Bolt size={54} fill="currentColor" />
        </motion.div>
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.7 }}
          className="mt-44 text-center"
        >
          <p className="text-4xl font-semibold tracking-tight">VoltIQ</p>
          <p className="mt-2 text-sm uppercase tracking-[0.45em] text-sky-100/70">Energy Intelligence</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
