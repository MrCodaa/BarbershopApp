import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Scissors, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { login } from '../api/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signin } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', sifra: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await login(form)
      if (res.status === 200) {
        signin({ email: form.email, ime: form.email.split('@')[0] })
        toast.success('Uspješno ste se prijavili!')
        navigate('/')
      }
    } catch (err) {
      if (err.isNetworkError) {
        toast.error('Ne mogu se spojiti na server. Provjerite da li je backend pokrenut.')
      } else if (err.response?.status === 401) {
        toast.error('Pogrešni email ili lozinka.')
      } else {
        const msg = err.response?.data
        toast.error(typeof msg === 'string' ? msg : 'Greška pri prijavi.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-500 rounded-2xl mb-4">
            <Scissors className="w-7 h-7 text-stone-900" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-white">Dobrodošli nazad</h1>
          <p className="text-stone-400 mt-2">Prijavite se na vaš nalog</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email adresa</label>
              <input
                type="email"
                className="input"
                placeholder="ime@primjer.ba"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">Lozinka</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input pr-12"
                  placeholder="Vaša lozinka"
                  value={form.sifra}
                  onChange={(e) => setForm({ ...form, sifra: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading && <span className="inline-block w-4 h-4 border-2 border-stone-900/30 border-t-stone-900 rounded-full animate-spin" />}
              {loading ? 'Prijava...' : 'Prijavi se'}
            </button>
          </form>

          <p className="text-center text-sm text-stone-500 mt-6">
            Nemate nalog?{' '}
            <Link to="/register" className="text-amber-500 hover:text-amber-400 font-medium">
              Registrujte se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
