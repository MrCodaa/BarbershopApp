import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  adminGetZvanjeUslugeCijena, adminAddZvanjeUslugaCijena,
  adminUpdateZvanjeUslugaCijena, adminDeleteZvanjeUslugaCijena,
  adminGetUsluge
} from '../../api/api'

const ZVANJA = ['MAJSTOR', 'SENIOR', 'JUNIOR']
const empty = { cijena: '', zvanje: { naziv: 'MAJSTOR' }, usluga: { id: '' } }

export default function CijenePanel() {
  const [items, setItems] = useState([])
  const [usluge, setUsluge] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => {
    setLoading(true)
    Promise.all([adminGetZvanjeUslugeCijena(), adminGetUsluge()])
      .then(([c, u]) => { setItems(c.data); setUsluge(u.data) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openAdd = () => {
    setForm({ ...empty, usluga: { id: usluge[0]?.id || '' } })
    setEditId(null); setShowForm(true)
  }
  const openEdit = (item) => {
    setForm({ cijena: item.cijena, zvanje: { naziv: item.zvanje?.naziv }, usluga: { id: item.usluga?.id } })
    setEditId(item.id); setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = { ...form, cijena: Number(form.cijena), usluga: { id: Number(form.usluga.id) } }
      if (editId) { await adminUpdateZvanjeUslugaCijena(editId, data); toast.success('Ažurirano.') }
      else { await adminAddZvanjeUslugaCijena(data); toast.success('Dodano.') }
      setShowForm(false); load()
    } catch { toast.error('Greška (kombinacija već postoji?).') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Obrisati cijenu?')) return
    try { await adminDeleteZvanjeUslugaCijena(id); toast.success('Obrisano.'); load() }
    catch { toast.error('Greška.') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-white">Cijene po Zvanju</h2>
        <button onClick={openAdd} className="btn-gold py-2 px-4 text-sm flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Dodaj Cijenu
        </button>
      </div>

      {showForm && (
        <div className="card mb-6 border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">{editId ? 'Uredi Cijenu' : 'Nova Cijena'}</h3>
            <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Zvanje</label>
              <select className="input" value={form.zvanje?.naziv} onChange={(e) => setForm({ ...form, zvanje: { naziv: e.target.value } })}>
                {ZVANJA.map((z) => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Usluga</label>
              <select className="input" value={form.usluga?.id} onChange={(e) => setForm({ ...form, usluga: { id: e.target.value } })}>
                {usluge.map((u) => <option key={u.id} value={u.id}>{u.naziv}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Cijena (KM)</label>
              <input type="number" step="0.50" min="0" className="input" value={form.cijena} onChange={(e) => setForm({ ...form, cijena: e.target.value })} required />
            </div>
            <div className="sm:col-span-3 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline py-2 px-4 text-sm">Odustani</button>
              <button type="submit" className="btn-gold py-2 px-4 text-sm flex items-center gap-1.5"><Check className="w-4 h-4" /> Sačuvaj</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-zinc-800 rounded-lg animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">Nema definisanih cijena.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-zinc-500">
                <th className="pb-3 pr-4">Zvanje</th>
                <th className="pb-3 pr-4">Usluga</th>
                <th className="pb-3 pr-4">Cijena</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-1 rounded-full border border-amber-500/20">{item.zvanje?.naziv}</span>
                  </td>
                  <td className="py-3 pr-4 text-white font-medium">{item.usluga?.naziv}</td>
                  <td className="py-3 pr-4 text-amber-400 font-semibold">{item.cijena} KM</td>
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
