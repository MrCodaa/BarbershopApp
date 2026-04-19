import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { User, Scissors, Clock, Calendar, CheckCircle, ChevronLeft, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { bs } from 'date-fns/locale'
import { getFrizeri, getUsluge, getSlobodniTermini, zakaziTermin } from '../api/api'
import { useAuth } from '../context/AuthContext'
import CalendarPicker from '../components/Calendar'

const STEPS = ['Frizer', 'Usluga', 'Datum & Vrijeme', 'Potvrda']

export default function Rezervacija() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [step, setStep] = useState(0)
  const [frizeri, setFrizeri] = useState([])
  const [usluge, setUsluge] = useState([])
  const [termini, setTermini] = useState([])
  const [loading, setLoading] = useState(false)

  const [selectedFrizer, setSelectedFrizer] = useState(null)
  const [selectedUsluga, setSelectedUsluga] = useState(null)
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [selectedTermin, setSelectedTermin] = useState(null)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    getFrizeri().then((res) => {
      setFrizeri(res.data)
      const preselected = searchParams.get('frizerId')
      if (preselected && user) {
        const found = res.data.find((f) => String(f.id) === preselected)
        if (found) { setSelectedFrizer(found); setStep(1) }
      }
    })
  }, [])

  useEffect(() => {
    if (selectedFrizer) {
      setLoading(true)
      getUsluge(selectedFrizer.id)
        .then((res) => setUsluge(res.data))
        .catch(() => toast.error('Greška pri učitavanju usluga.'))
        .finally(() => setLoading(false))
    }
  }, [selectedFrizer])

  useEffect(() => {
    if (selectedFrizer && selectedDate && step === 2) {
      setLoading(true)
      setTermini([])
      setSelectedTermin(null)
      getSlobodniTermini(selectedFrizer.id, selectedDate)
        .then((res) => setTermini(res.data))
        .catch(() => toast.error('Greška pri učitavanju termina.'))
        .finally(() => setLoading(false))
    }
  }, [selectedFrizer, selectedDate, step])

  const handleBook = async () => {
    setLoading(true)
    try {
      const datumPocetak = `${selectedDate}T${selectedTermin.pocetak}`
      await zakaziTermin({
        korisnikId: user.id,
        frizerId: selectedFrizer.id,
        zvanjeUslugaCijenaId: selectedUsluga.id,
        datumPocetak,
      })
      setBooked(true)
    } catch (err) {
      const msg = err.response?.data
      toast.error(typeof msg === 'string' ? msg : 'Greška pri rezervaciji.')
    } finally {
      setLoading(false)
    }
  }

  // Nije prijavljen — prikaži pozivni ekran
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-9 h-9 text-amber-500" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-white mb-3">
            Prijava je obavezna
          </h2>
          <p className="text-stone-400 mb-8">
            Da biste rezervisali termin, morate biti prijavljeni na vaš nalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login" className="btn-gold px-8 py-3 flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" />
              Prijavi se
            </Link>
            <Link to="/register" className="btn-outline px-8 py-3 text-center">
              Registruj se
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (booked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-3">Rezervacija potvrđena!</h2>
          <p className="text-stone-400 mb-1">
            Termin kod <span className="text-white font-medium">{selectedFrizer?.ime} {selectedFrizer?.prezime}</span>
          </p>
          <p className="text-stone-400 mb-1">
            Usluga: <span className="text-white font-medium">{selectedUsluga?.usluga?.naziv}</span>
          </p>
          <p className="text-stone-400 mb-8">
            {format(new Date(selectedDate), 'dd. MMMM yyyy.', { locale: bs })} u {selectedTermin?.pocetak}
          </p>
          <button
            onClick={() => { setBooked(false); setStep(0); setSelectedFrizer(null); setSelectedUsluga(null); setSelectedTermin(null) }}
            className="btn-gold"
          >
            Nova Rezervacija
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-bold text-white mb-3">Rezerviši Termin</h1>
          <p className="text-stone-400">Slijedite korake za brzu rezervaciju</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  i < step ? 'bg-amber-500 text-stone-900' :
                  i === step ? 'bg-amber-500 text-stone-900 ring-4 ring-amber-500/20' :
                  'bg-stone-800 text-stone-500'
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs mt-1.5 hidden sm:block ${i === step ? 'text-amber-500' : 'text-stone-500'}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-12 sm:w-20 mx-2 mb-4 transition-colors ${i < step ? 'bg-amber-500' : 'bg-stone-800'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Frizer */}
        {step === 0 && (
          <div>
            <h2 className="text-xl font-heading font-semibold text-white mb-4">Odaberi frizera</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {frizeri.map((frizer) => (
                <button
                  key={frizer.id}
                  onClick={() => { setSelectedFrizer(frizer); setStep(1) }}
                  className="card text-left hover:border-amber-500/50 transition-all group flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-stone-700 group-hover:border-amber-500/50 shrink-0 transition-colors">
                    <BarberAvatar frizer={frizer} size="lg" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{frizer.ime} {frizer.prezime}</div>
                    {frizer.zvanje && (
                      <div className="text-xs text-amber-400 mt-0.5">{frizer.zvanje?.naziv}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Usluga */}
        {step === 1 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-semibold text-white">Odaberi uslugu</h2>
              <button onClick={() => setStep(0)} className="text-sm text-stone-400 hover:text-white flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Nazad
              </button>
            </div>
            {loading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="card h-16 animate-pulse bg-stone-800" />)}</div>
            ) : usluge.length === 0 ? (
              <div className="text-center py-12 text-stone-500">Nema dostupnih usluga za ovog frizera.</div>
            ) : (
              <div className="space-y-3">
                {usluge.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => { setSelectedUsluga(u); setStep(2) }}
                    className="card w-full text-left hover:border-amber-500/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-medium text-white">{u.usluga?.naziv}</div>
                      <div className="text-sm text-stone-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        {u.usluga?.trajanje} min
                      </div>
                    </div>
                    <div className="text-amber-500 font-semibold text-lg">{u.cijena} €</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Datum & Vrijeme */}
        {step === 2 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-semibold text-white">Odaberi datum i vrijeme</h2>
              <button onClick={() => setStep(1)} className="text-sm text-stone-400 hover:text-white flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Nazad
              </button>
            </div>

            <CalendarPicker
              selectedDate={selectedDate}
              onChange={(d) => { setSelectedDate(d); setSelectedTermin(null) }}
            />

            <div className="mt-6">
              <h3 className="text-sm font-medium text-stone-400 mb-3">
                Slobodni termini za {format(new Date(selectedDate), 'dd. MMMM', { locale: bs })}
              </h3>
              {loading ? (
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(8)].map((_, i) => <div key={i} className="h-10 bg-stone-800 rounded-lg animate-pulse" />)}
                </div>
              ) : termini.length === 0 ? (
                <div className="text-center py-10 text-stone-500">
                  <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  Nema slobodnih termina za odabrani datum.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {termini.map((t) => (
                    <button
                      key={t.pocetak}
                      onClick={() => { setSelectedTermin(t); setStep(3) }}
                      className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        selectedTermin?.pocetak === t.pocetak
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                          : 'border-stone-700 text-stone-300 hover:border-stone-500'
                      }`}
                    >
                      {t.pocetak}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Potvrda */}
        {step === 3 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-semibold text-white">Potvrdi rezervaciju</h2>
              <button onClick={() => setStep(2)} className="text-sm text-stone-400 hover:text-white flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Nazad
              </button>
            </div>
            <div className="card space-y-4 mb-6">
              <Row icon={<User className="w-4 h-4" />} label="Frizer" value={`${selectedFrizer?.ime} ${selectedFrizer?.prezime}`} />
              <Row icon={<Scissors className="w-4 h-4" />} label="Usluga" value={selectedUsluga?.usluga?.naziv} />
              <Row icon={<Clock className="w-4 h-4" />} label="Trajanje" value={`${selectedUsluga?.usluga?.trajanje} min`} />
              <Row icon={<Calendar className="w-4 h-4" />} label="Datum" value={format(new Date(selectedDate), 'dd. MMMM yyyy.', { locale: bs })} />
              <Row icon={<Clock className="w-4 h-4" />} label="Vrijeme" value={selectedTermin?.pocetak} />
              <div className="border-t border-stone-800 pt-4 flex justify-between">
                <span className="text-stone-400">Ukupno</span>
                <span className="text-amber-500 font-bold text-xl">{selectedUsluga?.cijena} €</span>
              </div>
            </div>
            <button
              onClick={handleBook}
              disabled={loading}
              className="btn-gold w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <span className="inline-block w-4 h-4 border-2 border-stone-900/30 border-t-stone-900 rounded-full animate-spin" />}
              {loading ? 'Rezervišem...' : 'Potvrdi Rezervaciju'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-stone-400 text-sm">
        <span className="text-amber-500">{icon}</span>
        {label}
      </div>
      <span className="text-white font-medium text-sm">{value}</span>
    </div>
  )
}

function BarberAvatar({ frizer, size = 'md' }) {
  const sizeClass = size === 'lg' ? 'w-full h-full' : 'w-full h-full'
  if (frizer.slikaUrl) {
    return <img src={frizer.slikaUrl} alt={frizer.ime} className={`${sizeClass} object-cover`} />
  }
  const initials = `${frizer.ime?.[0] || ''}${frizer.prezime?.[0] || ''}`
  return (
    <div className="w-full h-full bg-amber-500/10 flex items-center justify-center">
      <span className="text-amber-400 font-bold text-lg">{initials}</span>
    </div>
  )
}
