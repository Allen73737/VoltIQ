import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', password: '' })
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      await register(form)
      navigate('/app')
    } catch {
      setError('Could not create the workspace. Use a new email and make sure every field is complete.')
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#02040a] px-5 py-24 text-white">
      <form onSubmit={submit} className="glass w-full max-w-lg rounded-[32px] p-8">
        <h1 className="text-3xl font-semibold">Create your energy workspace</h1>
        <p className="mt-2 text-slate-400">Start with a clean tenant and add your real appliances.</p>
        {[
          ['name', 'Full name'],
          ['organization', 'Organization'],
          ['email', 'Email'],
          ['password', 'Password'],
        ].map(([key, label]) => (
          <label key={key} className="mt-5 block text-sm text-slate-300">
            {label}
            <input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 outline-none focus:border-sky-300" type={key === 'password' ? 'password' : 'text'} value={form[key]} onChange={(e) => update(key, e.target.value)} />
          </label>
        ))}
        {error && <p className="mt-5 rounded-2xl border border-rose-300/20 bg-rose-400/10 p-3 text-sm text-rose-100">{error}</p>}
        <motion.button whileTap={{ scale: 0.96 }} className="mt-7 w-full rounded-2xl bg-sky-300 py-3 font-bold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all hover:bg-sky-200">Create workspace</motion.button>
        <p className="mt-5 text-center text-sm font-medium text-slate-400">Already registered? <Link className="text-sky-300 hover:text-sky-200 transition-colors" to="/login">Login</Link></p>
        <p className="mt-3 text-center text-sm font-medium text-slate-500">Exploring first? <Link className="text-sky-300 hover:text-sky-200 transition-colors" to="/demo">View demo</Link></p>
      </form>
    </main>
  )
}
