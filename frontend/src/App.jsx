import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Appliances from './pages/Appliances.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import DemoRedirect from './pages/DemoRedirect.jsx'
import AppShell from './components/AppShell.jsx'
import BootLoader from './components/BootLoader.jsx'
import QuickNav from './components/QuickNav.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

const Protected = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  const location = useLocation()
  const [booting, setBooting] = useState(true)
  const showQuickNav = location.pathname !== '/'

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const move = (event) => {
      document.querySelectorAll('.premium-card').forEach((card) => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
        card.style.setProperty('--my', `${event.clientY - rect.top}px`)
      })
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <>
      <BootLoader done={!booting} />
      <ScrollProgress />
      {showQuickNav && <QuickNav />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/demo" element={<DemoRedirect />} />
          <Route
            path="/app"
            element={
              <Protected>
                <AppShell />
              </Protected>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="appliances" element={<Appliances />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}
