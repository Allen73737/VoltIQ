import { motion } from 'framer-motion'
import { Bolt } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function DemoRedirect() {
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    login('admin@voltiq.io', 'password123').then(() => {
      if (mounted) navigate('/app', { replace: true })
    })
    return () => {
      mounted = false
    }
  }, [login, navigate])

  return (
    <main className="grid min-h-screen place-items-center bg-[#02040a] px-5 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-sm rounded-[32px] p-8 text-center"
      >
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-sky-300 text-slate-950 shadow-[0_0_40px_rgba(56,189,248,.45)]">
          <Bolt fill="currentColor" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold">Preparing demo workspace</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Loading VoltIQ Demo Campus with live analytics panels.</p>
      </motion.div>
    </main>
  )
}
