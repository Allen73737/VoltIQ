import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bolt } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/app')
    } catch {
      setError('Unable to sign in. Check your email, password, and backend connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#02040a] px-5 py-24 text-white">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-[32px] p-8">
        <motion.div initial={{ scale: 0.8, opacity: 0, rotate: -15 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: 'spring', damping: 15 }} className="mx-auto grid size-16 place-items-center rounded-[20px] bg-sky-300 text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.4)]">
          <Bolt fill="currentColor" />
        </motion.div>
        <h1 className="mt-7 text-center text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-center text-slate-400">Enter your real energy workspace.</p>
        <label className="mt-8 block text-sm text-slate-300">Email</label>
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none focus:border-sky-300" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="mt-4 block text-sm text-slate-300">Password</label>
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none focus:border-sky-300" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-400/10 p-3 text-sm text-rose-100">{error}</p>}
        <motion.button whileTap={{ scale: 0.96 }} className="mt-7 w-full rounded-2xl bg-sky-300 py-3 font-bold text-slate-950 hover:bg-sky-200 shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all" disabled={loading}>{loading ? 'Launching...' : 'Login'}</motion.button>
        <p className="mt-5 text-center text-sm font-medium text-slate-400">New to VoltIQ? <Link className="text-sky-300 hover:text-sky-200 transition-colors" to="/register">Create workspace</Link></p>
        <p className="mt-3 text-center text-sm font-medium text-slate-500">Want the sample campus? <Link className="text-sky-300 hover:text-sky-200 transition-colors" to="/demo">View demo</Link></p>
      </form>
    </main>
  )
}
