import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Scissors, Menu, X, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, signout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const handleSignout = () => {
    signout()
    navigate('/')
    setOpen(false)
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/', label: 'Naslovna' },
    { to: '/frizeri', label: 'Frizeri' },
    { to: '/rezervacija', label: 'Rezerviši' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center group-hover:bg-amber-400 transition-colors">
              <Scissors className="w-4 h-4 text-stone-900" />
            </div>
            <span className="font-heading font-semibold text-lg text-white">BarberShop</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'text-amber-500 bg-amber-500/10'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-stone-400">
                  <span className="text-stone-200 font-medium">{user.ime}</span>
                </span>
                <Link
                  to="/admin"
                  className="p-2 text-stone-400 hover:text-amber-500 hover:bg-stone-800 rounded-lg transition-colors"
                  title="Admin panel"
                >
                  <Settings className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleSignout}
                  className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-stone-800"
                >
                  <LogOut className="w-4 h-4" />
                  Odjava
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-outline py-2 px-4 text-sm">Prijava</Link>
                <Link to="/register" className="btn-gold py-2 px-4 text-sm">Registracija</Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-stone-800 py-3 space-y-1 pb-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to) ? 'text-amber-500 bg-amber-500/10' : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-stone-800 mt-2">
              {user ? (
                <div className="space-y-1">
                  <div className="px-4 py-2 text-sm text-stone-400">
                    Prijavljeni kao <span className="text-white font-medium">{user.ime}</span>
                  </div>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-stone-400 hover:text-amber-500 hover:bg-stone-800 rounded-lg"
                  >
                    Admin Panel
                  </Link>
                  <button
                    onClick={handleSignout}
                    className="block w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-stone-800 rounded-lg"
                  >
                    Odjava
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-4">
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-outline text-center py-2.5 text-sm">Prijava</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-gold text-center py-2.5 text-sm">Registracija</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
