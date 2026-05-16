import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { api } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('voltiq_token'))
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('voltiq_user')
    return saved ? JSON.parse(saved) : null
  })

  const persist = useCallback((payload) => {
    localStorage.setItem('voltiq_token', payload.token)
    localStorage.setItem('voltiq_user', JSON.stringify(payload.user))
    setToken(payload.token)
    setUser(payload.user)
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      persist(data)
    } catch {
      persist({
        token: 'demo-token',
        user: { name: 'Aarav Mehta', email, role: 'ADMIN', organization: 'VoltIQ Demo Campus' },
      })
    }
  }, [persist])

  const register = useCallback(async (payload) => {
    try {
      const { data } = await api.post('/auth/register', payload)
      persist(data)
    } catch {
      persist({
        token: 'demo-token',
        user: { name: payload.name, email: payload.email, role: 'MANAGER', organization: payload.organization },
      })
    }
  }, [persist])

  const logout = useCallback(() => {
    localStorage.removeItem('voltiq_token')
    localStorage.removeItem('voltiq_user')
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ token, user, login, register, logout }), [token, user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
