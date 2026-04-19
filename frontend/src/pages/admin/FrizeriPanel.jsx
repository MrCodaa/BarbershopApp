import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { adminGetFrizeri, adminAddFrizer, adminUpdateFrizer, adminDeleteFrizer } from '../../api/api'

const ZVANJA = ['MAJSTOR', 'SENIOR', 'JUNIOR']
const empty = { ime: '', prezime: '', slikaUrl: '', zvanje: { naziv: 'MAJSTOR' } }

export default function FrizeriPanel() {
  const [frizeri, setFrizeri] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => {
    setLoading(true)
    adminGetFrizeri()
      .then((r) => setFrizeri(r.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(empty); setEditId(null); setShowForm(true) }
  const openEdit = (f) => {
    setForm({ ime: f.ime, prezime: f.prezime, slikaUrl: f.slikaUrl || '', zvanje: f.zvanje || { naziv: 'MAJSTOR' } })
    setEditId(f.id)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await adminUpdateFrizer(editId, form)
        toast.success('Frizer ažuriran.')
      } else {
        await adminAddFrizer(form)
        toast.success('Frizer dodan.')
      }
      setShowForm(false)
      load()
    } catch {
      toast.error('Greška pri čuvanju.')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Obrisati frizera?')) return
    try {
      await adminDeleteFrizer(id)
      toast.success('Frizer obrisan.')
      load()
    } catch {
      toast.error('Greška pri brisanju.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-white">Frizeri</h2>
        <button onClick={openAdd} className="btn-gold py-2 px-4 text-sm flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Dodaj Frizera
        </button>
      </div>

      {showForm && (
        <div className="card mb-6 border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">{editId ? 'Uredi Frizera' : 'Novi Frizer'}</h3>
            <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Ime</label>
              <input className="input" value={form.ime} onChange={(e) => setForm({ ...form, ime: e.target.value })} required />
            </div>
            <div>
              <label className="label">Prezime</label>
              <input className="input" value={form.prezime} onChange={(e) => setForm({ ...form, prezime: e.target.value })} required />
            </div>
            <div>
              <label className="label">Slika URL</label>
              <input className="input" placeholder="https://..." value={form.slikaUrl} onChange={(e) => setForm({ ...form, slikaUrl: e.target.value })} />
            </div>
            <div>
              <label className="label">Zvanje</label>
              <select
                className="input"
                value={form.zvanje?.naziv}
                onChange={(e) => setForm({ ...form, zvanje: { naziv: e.target.value } })}
              >
                {ZVANJA.map((z) => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline py-2 px-4 text-sm">Odustani</button>
              <button type="submit" className="btn-gold py-2 px-4 text-sm flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Sačuvaj
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-zinc-800 rounded-lg animate-pulse" />)}</div>
      ) : frizeri.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">Nema frizera. Dodajte prvog!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-zinc-500">
                <th className="pb-3 pr-4">Ime</th>
                <th className="pb-3 pr-4">Prezime</th>
                <th className="pb-3 pr-4">Zvanje</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {frizeri.map((f) => (
                <tr key={f.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 pr-4 text-white font-medium">{f.ime}</td>
                  <td className="py-3 pr-4 text-zinc-300">{f.prezime}</td>
                  <td className="py-3 pr-4">
                    <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-1 rounded-full border border-amber-500/20">
                      {f.zvanje?.naziv}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(f)} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(f.id)} className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
