import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  adminGetRadnoVrijeme, adminAddRadnoVrijeme,
  adminUpdateRadnoVrijeme, adminDeleteRadnoVrijeme, adminGetFrizeri
} from '../../api/api'

const DANI = ['PONEDJELJAK', 'UTORAK', 'SRIJEDA', 'CETVRTAK', 'PETAK', 'SUBOTA', 'NEDJELJA']
const DAN_LABELS = { PONEDJELJAK: 'Ponedjeljak', UTORAK: 'Utorak', SRIJEDA: 'Srijeda', CETVRTAK: 'Četvrtak', PETAK: 'Petak', SUBOTA: 'Subota', NEDJELJA: 'Nedjelja' }
const empty = { pocetak: '08:00', kraj: '17:00', dan: 'PONEDJELJAK', frizer: { id: '' } }

export default function RadnoVrijemePanel() {
  const [items, setItems] = useState([])
  const [frizeri, setFrizeri] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => {
    setLoading(true)
    Promise.all([adminGetRadnoVrijeme(), adminGetFrizeri()])
      .then(([rv, fr]) => { setItems(rv.data); setFrizeri(fr.data) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openAdd = () => {
    setForm({ ...empty, frizer: { id: frizeri[0]?.id || '' } })
    setEditId(null); setShowForm(true)
  }
  const openEdit = (item) => {
    setForm({ pocetak: item.pocetak, kraj: item.kraj, dan: item.dan, frizer: { id: item.frizer?.id } })
    setEditId(item.id); setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) { await adminUpdateRadnoVrijeme(editId, form); toast.success('Ažurirano.') }
      else { await adminAddRadnoVrijeme(form); toast.success('Dodano.') }
      setShowForm(false); load()
    } catch { toast.error('Greška.') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Obrisati?')) return
    try { await adminDeleteRadnoVrijeme(id); toast.success('Obrisano.'); load() }
    catch { toast.error('Greška.') }
  }

  const frizerName = (id) => {
    const f = frizeri.find((x) => x.id === id)
    return f ? `${f.ime} ${f.prezime}` : id
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-white">Radno Vrijeme</h2>
        <button onClick={openAdd} className="btn-gold py-2 px-4 text-sm flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Dodaj
        </button>
      </div>

      {showForm && (
        <div className="card mb-6 border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">{editId ? 'Uredi' : 'Novo Radno Vrijeme'}</h3>
            <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Frizer</label>
              <select className="input" value={form.frizer?.id} onChange={(e) => setForm({ ...form, frizer: { id: Number(e.target.value) } })}>
                {frizeri.map((f) => <option key={f.id} value={f.id}>{f.ime} {f.prezime}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Dan</label>
              <select className="input" value={form.dan} onChange={(e) => setForm({ ...form, dan: e.target.value })}>
                {DANI.map((d) => <option key={d} value={d}>{DAN_LABELS[d]}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Početak</label>
              <input type="time" className="input" value={form.pocetak} onChange={(e) => setForm({ ...form, pocetak: e.target.value })} required />
            </div>
            <div>
              <label className="label">Kraj</label>
              <input type="time" className="input" value={form.kraj} onChange={(e) => setForm({ ...form, kraj: e.target.value })} required />
            </div>
            <div className="sm:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline py-2 px-4 text-sm">Odustani</button>
              <button type="submit" className="btn-gold py-2 px-4 text-sm flex items-center gap-1.5"><Check className="w-4 h-4" /> Sačuvaj</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-zinc-800 rounded-lg animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">Nema unesenog radnog vremena.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-zinc-500">
                <th className="pb-3 pr-4">Frizer</th>
                <th className="pb-3 pr-4">Dan</th>
                <th className="pb-3 pr-4">Početak</th>
                <th className="pb-3 pr-4">Kraj</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 pr-4 text-white font-medium">{frizerName(item.frizer?.id)}</td>
                  <td className="py-3 pr-4 text-zinc-300">{DAN_LABELS[item.dan] || item.dan}</td>
                  <td className="py-3 pr-4 text-zinc-300">{item.pocetak}</td>
                  <td className="py-3 pr-4 text-zinc-300">{item.kraj}</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(item)} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
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
