import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Scissors, Star, Clock, Shield, ChevronRight, Calendar } from 'lucide-react'
import { adminGetUsluge } from '../api/api'

const features = [
  { icon: Scissors, title: 'Iskusni Majstori', desc: 'Tim stručnih frizera s godinama iskustva.' },
  { icon: Clock, title: 'Fleksibilno Radno Vrijeme', desc: 'Radimo svaki dan prema vašem rasporedu.' },
  { icon: Calendar, title: 'Online Rezervacija', desc: 'Zakažite termin u sekundi, bez čekanja.' },
  { icon: Shield, title: 'Garantovani Kvalitet', desc: 'Vaše zadovoljstvo je naš prioritet.' },
]

export default function Home() {
  const [usluge, setUsluge] = useState([])

  useEffect(() => {
    adminGetUsluge()
      .then((res) => setUsluge(res.data))
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-400 text-sm font-medium mb-8">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            Premium Barbershop
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-6">
            Izgled koji
            <span className="text-amber-500"> govori</span>
            <br />za sebe.
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Doživite transformaciju uz naše iskusne majstore. Zakažite termin
            online i dođite na vaš savršeni izgled.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rezervacija" className="btn-gold text-base px-8 py-4 flex items-center justify-center gap-2">
              Zakaži Termin <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/frizeri" className="btn-outline text-base px-8 py-4">
              Upoznaj Majstore
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { val: '500+', label: 'Zadovoljnih klijenata' },
              { val: '10+', label: 'Godina iskustva' },
              { val: '5★', label: 'Prosječna ocjena' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-500">{val}</div>
                <div className="text-xs text-stone-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-stone-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Zašto odabrati nas?
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto">
              Pružamo vrhunsku uslugu s fokusom na detalje koji čine razliku.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card hover:border-amber-500/30 transition-colors group">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="font-heading font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services iz baze */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/88" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Naše Usluge
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto">
              Od klasičnog šišanja do modernih stilova — nudimo sve što vam treba.
            </p>
          </div>

          {usluge.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card h-16 animate-pulse bg-stone-800/60" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {usluge.map((u) => (
                <div key={u.id} className="card flex items-center justify-between hover:border-amber-500/30 transition-colors bg-stone-900/80 backdrop-blur-sm">
                  <div>
                    <div className="font-medium text-white">{u.naziv}</div>
                    <div className="text-sm text-stone-500 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {u.trajanje} min
                    </div>
                  </div>
                  <Scissors className="w-5 h-5 text-amber-500/50" />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/rezervacija" className="btn-gold inline-flex items-center gap-2">
              Zakaži Odmah <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Barbers section */}
      <section className="py-24 px-4 bg-stone-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Tradicija susreće moderan stil
              </h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-6">
                Naši majstori kombinuju klasične tehnike brijanja s modernim trendovima,
                kako bi svaki klijent dobio savršen rezultat prilagođen upravo njemu.
              </p>
              <Link to="/frizeri" className="btn-outline inline-flex items-center gap-2">
                Upoznaj tim <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80"
                alt="Barber at work"
                className="rounded-2xl w-full h-80 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-amber-500 text-stone-900 p-4 rounded-xl shadow-xl">
                <div className="text-2xl font-bold font-heading">10+</div>
                <div className="text-sm font-medium">Godina iskustva</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-stone-900">
        <div className="max-w-3xl mx-auto text-center">
          <Scissors className="w-12 h-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Spreman za novi izgled?
          </h2>
          <p className="text-stone-400 mb-8 text-lg">
            Rezervišite vaš termin danas i iskusite razliku premium usluge.
          </p>
          <Link to="/rezervacija" className="btn-gold text-base px-8 py-4 inline-flex items-center gap-2">
            Zakaži Termin <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
              <Scissors className="w-3.5 h-3.5 text-stone-900" />
            </div>
            <span className="font-heading font-semibold text-white">BarberShop</span>
          </div>
          <p className="text-stone-500 text-sm">© 2025 BarberShop. Sva prava zadržana.</p>
        </div>
      </footer>
    </div>
  )
}
