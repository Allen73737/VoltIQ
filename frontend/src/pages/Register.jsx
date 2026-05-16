import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const [form, setForm] = useState({ name: 'Aarav Mehta', email: 'admin@voltiq.io', organization: 'VoltIQ Demo Campus', password: 'password123' })
  const { register } = useAuth()
  const navigate = useNavigate()
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event) => {
    event.preventDefault()
    await register(form)
    navigate('/app')
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#02040a] px-5 text-white">
      <form onSubmit={submit} className="glass w-full max-w-lg rounded-[32px] p-8">
        <h1 className="text-3xl font-semibold">Create your energy workspace</h1>
        <p className="mt-2 text-slate-400">Provision a secure analytics tenant with demo-ready data.</p>
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
        <button className="mt-7 w-full rounded-2xl bg-sky-300 py-3 font-semibold text-slate-950">Create workspace</button>
        <p className="mt-5 text-center text-sm text-slate-400">Already registered? <Link className="text-sky-200" to="/login">Login</Link></p>
      </form>
    </main>
  )
}
