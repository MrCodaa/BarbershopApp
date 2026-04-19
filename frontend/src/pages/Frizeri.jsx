import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Scissors } from 'lucide-react'
import { getFrizeri } from '../api/api'

const ZVANJE_LABELS = {
  MAJSTOR: 'Majstor',
  SENIOR: 'Senior Frizer',
  JUNIOR: 'Junior Frizer',
}

// Fallback barber images by index when no slikaUrl is set
const BARBER_PHOTOS = [
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1541533848490-bc8115cd6522?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=400&h=400&fit=crop&crop=face',
]

export default function Frizeri() {
  const [frizeri, setFrizeri] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFrizeri()
      .then((res) => setFrizeri(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Naši Majstori
          </h1>
          <p className="text-stone-400 max-w-xl mx-auto">
            Upoznajte naš tim stručnih frizera. Svaki od njih donosi jedinstveni stil i iskustvo.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="w-32 h-32 bg-stone-800 rounded-full mx-auto mb-4" />
                <div className="h-4 bg-stone-800 rounded w-32 mx-auto mb-2" />
                <div className="h-3 bg-stone-800 rounded w-20 mx-auto" />
              </div>
            ))}
          </div>
        ) : frizeri.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <Scissors className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Trenutno nema dostupnih frizera.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {frizeri.map((frizer, idx) => {
              const photo = frizer.slikaUrl || BARBER_PHOTOS[idx % BARBER_PHOTOS.length]
              return (
                <div key={frizer.id} className="card hover:border-amber-500/30 transition-all group overflow-hidden p-0">
                  {/* Photo */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={photo}
                      alt={`${frizer.ime} ${frizer.prezime}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />
                    {frizer.zvanje && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-amber-500 text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full">
                          {ZVANJE_LABELS[frizer.zvanje?.naziv] || frizer.zvanje?.naziv}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-xl text-white mb-3">
                      {frizer.ime} {frizer.prezime}
                    </h3>
                    <Link
                      to={`/rezervacija?frizerId=${frizer.id}`}
                      className="btn-gold w-full text-center text-sm flex items-center justify-center gap-1.5"
                    >
                      Zakaži termin
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
