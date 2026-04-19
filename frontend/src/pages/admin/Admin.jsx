import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Scissors, Users, Clock, DollarSign, Calendar, LayoutDashboard, ShieldAlert } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import FrizeriPanel from './FrizeriPanel'
import UslugePanel from './UslugePanel'
import RadnoVrijemePanel from './RadnoVrijemePanel'
import CijenePanel from './CijenePanel'
import TerminiPanel from './TerminiPanel'

const TABS = [
  { id: 'frizeri', label: 'Frizeri', icon: Users },
  { id: 'usluge', label: 'Usluge', icon: Scissors },
  { id: 'radno', label: 'Radno Vrijeme', icon: Clock },
  { id: 'cijene', label: 'Cijene', icon: DollarSign },
  { id: 'termini', label: 'Termini', icon: Calendar },
]

export default function Admin() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('frizeri')

  // Admin zaštita — dodati provjeru uloge kada se implementira admin login
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-9 h-9 text-red-500" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white mb-3">Pristup odbijen</h2>
          <p className="text-stone-400 mb-8">
            Morate biti prijavljeni da biste pristupili admin panelu.
          </p>
          <Link to="/login" className="btn-gold px-8 py-3 inline-block">
            Prijavi se
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Admin Panel</h1>
            <p className="text-stone-500 text-sm">Prijavljeni kao: <span className="text-amber-400">{user.ime} {user.prezime}</span></p>
          </div>
        </div>

        <div className="flex gap-1 p-1 bg-stone-900 border border-stone-800 rounded-xl mb-6 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-1 justify-center ${
                activeTab === id ? 'bg-amber-500 text-stone-900' : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'frizeri' && <FrizeriPanel />}
        {activeTab === 'usluge' && <UslugePanel />}
        {activeTab === 'radno' && <RadnoVrijemePanel />}
        {activeTab === 'cijene' && <CijenePanel />}
        {activeTab === 'termini' && <TerminiPanel />}
      </div>
    </div>
  )
}
