import { motion } from 'framer-motion'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { BarChart3, Bolt, FileText, Home, LogOut, Menu, PlugZap, Settings, SunMoon } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const nav = [
  { to: '/app', label: 'Command', icon: Home, end: true },
  { to: '/app/appliances', label: 'Appliances', icon: PlugZap },
  { to: '/app/reports', label: 'Reports', icon: FileText },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, isDemo, logout } = useAuth()
  const navigate = useNavigate()

  const signOut = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#02040a] text-slate-100">
      <div className="pointer-events-none fixed inset-0 grid-glow opacity-60" />
      <motion.aside
        animate={{ width: collapsed ? 88 : 284 }}
        className="fixed bottom-4 left-4 top-4 z-30 hidden flex-col rounded-[28px] glass md:flex"
      >
        <div className="flex items-center gap-3 p-5">
          <div className="grid size-11 place-items-center rounded-2xl bg-sky-400 text-slate-950 shadow-[0_0_34px_rgba(56,189,248,.55)]">
            <Bolt size={22} fill="currentColor" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-lg font-semibold tracking-tight">VoltIQ</p>
              <p className="text-xs text-slate-400">{isDemo ? 'Demo campus' : 'Energy intelligence'}</p>
            </div>
          )}
          <button className="ml-auto rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white" onClick={() => setCollapsed(!collapsed)}>
            <Menu size={18} />
          </button>
        </div>

        <nav className="space-y-2 px-4">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  isActive ? 'bg-sky-400/14 text-sky-100 glow-ring' : 'text-slate-400 hover:bg-white/[0.08] hover:text-white'
                }`
              }
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-300 to-blue-600 font-bold text-slate-950">
                {user?.name?.[0] || 'V'}
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{user?.name || 'VoltIQ User'}</p>
                  <p className="truncate text-xs text-slate-400">{user?.organization || 'Smart campus'}</p>
                </div>
              )}
            </div>
            {!collapsed && isDemo && <p className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-100">Demo data is for product preview only.</p>}
            {!collapsed && (
              <button onClick={signOut} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.08] py-2 text-sm text-slate-300 hover:bg-white/12">
                <LogOut size={16} /> Sign out
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#02040a]/80 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold"><Bolt className="text-sky-300" /> VoltIQ</div>
          <button className="rounded-xl bg-white/10 p-2"><SunMoon size={18} /></button>
        </div>
      </header>

      <section className={`relative z-10 min-h-screen p-4 transition-all md:p-6 ${collapsed ? 'md:pl-32' : 'md:pl-[19rem]'}`}>
        <Outlet />
      </section>
    </div>
  )
}
