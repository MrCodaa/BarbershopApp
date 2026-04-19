import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      err.isNetworkError = true
    }
    return Promise.reject(err)
  }
)

// Auth
export const register = (data) => api.post('/register', data)
export const login = (data) => api.post('/login', data)

// Public
export const getFrizeri = () => api.get('/frizeri')
export const getUsluge = (frizerId) => api.get(`/frizeri/${frizerId}/usluge`)
export const getSlobodniTermini = (frizerId, datum) =>
  api.get(`/frizeri/${frizerId}/slobodniTermini`, { params: { datum } })
export const zakaziTermin = (data) => api.post('/slobodniTermini/zakaziTermin', data)

// Admin - Frizeri
export const adminGetFrizeri = () => api.get('/admin/frizeri')
export const adminAddFrizer = (data) => api.post('/admin/frizeri', data)
export const adminUpdateFrizer = (id, data) => api.put(`/admin/frizeri/${id}`, data)
export const adminDeleteFrizer = (id) => api.delete(`/admin/frizeri/${id}`)

// Admin - Usluge
export const adminGetUsluge = () => api.get('/admin/usluge')
export const adminAddUsluga = (data) => api.post('/admin/usluge', data)
export const adminUpdateUsluga = (id, data) => api.put(`/admin/usluge/${id}`, data)
export const adminDeleteUsluga = (id) => api.delete(`/admin/usluge/${id}`)

// Admin - Radno Vrijeme
export const adminGetRadnoVrijeme = () => api.get('/admin/radno_vrijeme')
export const adminAddRadnoVrijeme = (data) => api.post('/admin/radno_vrijeme', data)
export const adminUpdateRadnoVrijeme = (id, data) => api.put(`/admin/radno_vrijeme/${id}`, data)
export const adminDeleteRadnoVrijeme = (id) => api.delete(`/admin/radno_vrijeme/${id}`)

// Admin - Zvanje Usluga Cijena
export const adminGetZvanjeUslugeCijena = () => api.get('/admin/zvanjeUslugeCijena')
export const adminAddZvanjeUslugaCijena = (data) => api.post('/admin/zvanjeUslugeCijena', data)
export const adminUpdateZvanjeUslugaCijena = (id, data) => api.put(`/admin/zvanjeUslugeCijena/${id}`, data)
export const adminDeleteZvanjeUslugaCijena = (id) => api.delete(`/admin/zvanjeUslugeCijena/${id}`)

// Admin - Termini
export const adminGetTermini = () => api.get('/admin/termini')
export const adminCancelTermin = (id) => api.put(`/admin/termini/${id}`)

export default api
