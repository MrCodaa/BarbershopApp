import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { adminGetUsluge, adminAddUsluga, adminUpdateUsluga, adminDeleteUsluga } from '../../api/api'

const empty = { naziv: '', trajanje: '' }

export default function UslugePanel() {
  const [usluge, setUsluge] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => {
    setLoading(true)
    adminGetUsluge().then((r) => setUsluge(r.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(empty); setEditId(null); setShowForm(true) }
  const openEdit = (u) => { setForm({ naziv: u.naziv, trajanje: u.trajanje }); setEditId(u.id); setShowForm(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = { ...form, trajanje: Number(form.trajanje) }
      if (editId) { await adminUpdateUsluga(editId, data); toast.success('Usluga ažurirana.') }
      else { await adminAddUsluga(data); toast.success('Usluga dodana.') }
      setShowForm(false); load()
    } catch { toast.error('Greška pri čuvanju.') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Obrisati uslugu?')) return
    try { await adminDeleteUsluga(id); toast.success('Usluga obrisana.'); load() }
    catch { toast.error('Greška pri brisanju.') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-white">Usluge</h2>
        <button onClick={openAdd} className="btn-gold py-2 px-4 text-sm flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Dodaj Uslugu
        </button>
      </div>

      {showForm && (
        <div className="card mb-6 border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">{editId ? 'Uredi Uslugu' : 'Nova Usluga'}</h3>
            <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Naziv usluge</label>
              <input className="input" value={form.naziv} onChange={(e) => setForm({ ...form, naziv: e.target.value })} required />
            </div>
            <div>
              <label className="label">Trajanje (min)</label>
              <input type="number" className="input" min="5" value={form.trajanje} onChange={(e) => setForm({ ...form, trajanje: e.target.value })} required />
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
      ) : usluge.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">Nema usluga.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-zinc-500">
                <th className="pb-3 pr-4">Naziv</th>
                <th className="pb-3 pr-4">Trajanje</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {usluge.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 pr-4 text-white font-medium">{u.naziv}</td>
                  <td className="py-3 pr-4 text-zinc-300">{u.trajanje} min</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(u)} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(u.id)} className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
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
