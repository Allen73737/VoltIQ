import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('voltiq_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function fetchDashboard() {
  const { data } = await api.get('/dashboard')
  return data
}

export async function fetchAppliances() {
  const { data } = await api.get('/appliances')
  return data
}

export async function createAppliance(payload) {
  const { data } = await api.post('/appliances', payload)
  return data
}

export async function toggleAppliance(id, action) {
  const { data } = await api.post(`/appliances/${id}/${action}`)
  return data
}
