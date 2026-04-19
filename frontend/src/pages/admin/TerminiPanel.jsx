import { useEffect, useState } from 'react'
import { XCircle, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { bs } from 'date-fns/locale'
import { adminGetTermini, adminCancelTermin } from '../../api/api'

const STATUS_LABELS = { ZAKAZAN: 'Zakazan', OTKAZAN: 'Otkazan', ZAVRSEN: 'Završen' }
const STATUS_COLORS = {
  ZAKAZAN: 'bg-green-500/10 text-green-400 border-green-500/20',
  OTKAZAN: 'bg-red-500/10 text-red-400 border-red-500/20',
  ZAVRSEN: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
}

export default function TerminiPanel() {
  const [termini, setTermini] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('sve')

  const load = () => {
    setLoading(true)
    adminGetTermini().then((r) => setTermini(r.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleCancel = async (id) => {
    if (!confirm('Otkazati termin?')) return
    try { await adminCancelTermin(id); toast.success('Termin otkazan.'); load() }
    catch { toast.error('Greška.') }
  }

  const filtered = filter === 'sve' ? termini : termini.filter((t) => t.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-lg font-heading font-semibold text-white">Termini</h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-zinc-800 p-1 rounded-lg">
            {['sve', 'ZAKAZAN', 'OTKAZAN'].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filter === s ? 'bg-amber-500 text-zinc-900' : 'text-zinc-400 hover:text-white'}`}>
                {s === 'sve' ? 'Sve' : STATUS_LABELS[s]}
              </button>
            ))}
          </div>
          <button onClick={load} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-zinc-800 rounded-lg animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">Nema termina.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-zinc-500">
                <th className="pb-3 pr-4">Datum & Vrijeme</th>
                <th className="pb-3 pr-4">Korisnik</th>
                <th className="pb-3 pr-4">Frizer</th>
                <th className="pb-3 pr-4">Usluga</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 pr-4 text-white font-medium whitespace-nowrap">
                    {t.datumPocetak ? format(new Date(t.datumPocetak), 'dd.MM.yyyy HH:mm') : '—'}
                  </td>
                  <td className="py-3 pr-4 text-zinc-300">
                    {t.korisnik ? `${t.korisnik.ime} ${t.korisnik.prezime}` : '—'}
                  </td>
                  <td className="py-3 pr-4 text-zinc-300">
                    {t.frizer ? `${t.frizer.ime} ${t.frizer.prezime}` : '—'}
                  </td>
                  <td className="py-3 pr-4 text-zinc-300">
                    {t.zvanjeUslugaCijena?.usluga?.naziv || '—'}
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_COLORS[t.status] || STATUS_COLORS.ZAVRSEN}`}>
                      {STATUS_LABELS[t.status] || t.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {t.status === 'ZAKAZAN' && (
                      <button onClick={() => handleCancel(t.id)} className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Otkaži">
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
