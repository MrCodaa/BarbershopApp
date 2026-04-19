import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Scissors, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { register } from '../api/api'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ ime: '', prezime: '', email: '', sifra: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(form)
      toast.success('Registracija uspješna! Sada se prijavite.')
      navigate('/login')
    } catch (err) {
      if (err.isNetworkError) {
        toast.error('Ne mogu se spojiti na server.')
      } else {
        const msg = err.response?.data
        toast.error(typeof msg === 'string' ? msg : 'Greška pri registraciji.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-500 rounded-2xl mb-4">
            <Scissors className="w-7 h-7 text-stone-900" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-white">Kreirajte nalog</h1>
          <p className="text-stone-400 mt-2">Registrujte se i zakažite vaš prvi termin</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Ime</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ime"
                  value={form.ime}
                  onChange={(e) => setForm({ ...form, ime: e.target.value })}
                  required
                  minLength={3}
                />
              </div>
              <div>
                <label className="label">Prezime</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Prezime"
                  value={form.prezime}
                  onChange={(e) => setForm({ ...form, prezime: e.target.value })}
                  required
                  minLength={3}
                />
              </div>
            </div>

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
                  placeholder="Minimalno 5 karaktera"
                  value={form.sifra}
                  onChange={(e) => setForm({ ...form, sifra: e.target.value })}
                  required
                  minLength={5}
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
              className="btn-gold w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading && <span className="inline-block w-4 h-4 border-2 border-stone-900/30 border-t-stone-900 rounded-full animate-spin" />}
              {loading ? 'Kreiranje...' : 'Kreiraj nalog'}
            </button>
          </form>

          <p className="text-center text-sm text-stone-500 mt-6">
            Već imate nalog?{' '}
            <Link to="/login" className="text-amber-500 hover:text-amber-400 font-medium">
              Prijavite se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
