import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import BootLoader from './components/BootLoader.jsx'
import QuickNav from './components/QuickNav.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

const Landing = lazy(() => import('./pages/Landing.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Appliances = lazy(() => import('./pages/Appliances.jsx'))
const Reports = lazy(() => import('./pages/Reports.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))
const DemoRedirect = lazy(() => import('./pages/DemoRedirect.jsx'))
const AppShell = lazy(() => import('./components/AppShell.jsx'))

const Protected = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" replace />
}

const RouteLoader = () => (
  <div className="grid min-h-screen place-items-center bg-[#02040a] px-5 text-white">
    <div className="glass rounded-[24px] px-6 py-4 text-sm tracking-[0.24em] text-sky-100/80">LOADING</div>
  </div>
)

export default function App() {
  const location = useLocation()
  const [booting, setBooting] = useState(true)
  const showQuickNav = location.pathname !== '/'

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    let raf = 0
    const move = (event) => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        document.querySelectorAll('.premium-card').forEach((card) => {
          const rect = card.getBoundingClientRect()
          card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
          card.style.setProperty('--my', `${event.clientY - rect.top}px`)
        })
        raf = 0
      })
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <BootLoader done={!booting} />
      <ScrollProgress />
      {showQuickNav && <QuickNav />}
      <Suspense fallback={<RouteLoader />}>
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
      </Suspense>
    </>
  )
}
