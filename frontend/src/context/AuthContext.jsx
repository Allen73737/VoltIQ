import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { api } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('voltiq_token'))
  const [isDemo, setIsDemo] = useState(localStorage.getItem('voltiq_demo') === 'true')
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('voltiq_user')
    return saved ? JSON.parse(saved) : null
  })

  const persist = useCallback((payload, demo = false) => {
    localStorage.setItem('voltiq_token', payload.token)
    localStorage.setItem('voltiq_user', JSON.stringify(payload.user))
    localStorage.setItem('voltiq_demo', demo ? 'true' : 'false')
    setToken(payload.token)
    setUser(payload.user)
    setIsDemo(demo)
  }, [])

  const login = useCallback(async (email, password, options = {}) => {
    const { data } = await api.post('/auth/login', { email, password })
    persist(data, Boolean(options.demo))
  }, [persist])

  const register = useCallback(async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    persist(data, false)
  }, [persist])

  const startDemo = useCallback(() => {
    persist({
      token: 'voltiq-demo-preview',
      user: { name: 'Aarav Mehta', email: 'admin@voltiq.io', role: 'ADMIN', organization: 'VoltIQ Demo Campus' },
    }, true)
  }, [persist])

  const logout = useCallback(() => {
    localStorage.removeItem('voltiq_token')
    localStorage.removeItem('voltiq_user')
    localStorage.removeItem('voltiq_demo')
    setToken(null)
    setUser(null)
    setIsDemo(false)
  }, [])

  const value = useMemo(() => ({ token, user, isDemo, login, register, startDemo, logout }), [token, user, isDemo, login, register, startDemo, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
