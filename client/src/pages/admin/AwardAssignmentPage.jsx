import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Award, Loader2, X, CheckCircle, Search } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { getAdminAwardWinners, createAwardWinner, updateAwardWinner, deleteAwardWinner, getPhases } from '../../services/api';

const emptyForm = {
  fullName: '', fatherName: '', city: '', province: '', school: '', grade: '',
  position: '', phaseId: '', phaseName: '', awardType: 'certificate', awardTitle: '', photoUrl: '',
};

const awardTypeLabel = {
  laptop: 'Laptop', chromebook: 'Chromebook', shield: 'Shield', certificate: 'Certificate', participation: 'Participation',
};

export default function AwardAssignmentPage() {
  const [winners, setWinners] = useState([]);
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchWinners();
    getPhases().then((res) => setPhases(res.data?.data || [])).catch(() => setPhases([]));
  }, []);

  const fetchWinners = async () => {
    setLoading(true);
    try {
      const res = await getAdminAwardWinners();
      setWinners(res.data?.data || []);
    } catch {
      setWinners([]);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (w) => {
    setEditingId(w._id);
    setForm({
      fullName: w.fullName || '', fatherName: w.fatherName || '', city: w.city || '',
      province: w.province || '', school: w.school || '', grade: w.grade || '',
      position: w.position ?? '', phaseId: w.phaseId?._id || w.phaseId || '',
      phaseName: w.phaseName || '', awardType: w.awardType || 'certificate',
      awardTitle: w.awardTitle || '', photoUrl: w.photoUrl || '',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.fullName.trim()) { alert('Winner name is required'); return; }
    setSaving(true);
    const payload = {
      fullName: form.fullName.trim(),
      fatherName: form.fatherName,
      city: form.city,
      province: form.province,
      school: form.school,
      grade: form.grade,
      position: Number(form.position) || 0,
      phaseId: form.phaseId || null,
      phaseName: form.phaseName || phases.find((p) => p._id === form.phaseId)?.name || '',
      awardType: form.awardType,
      awardTitle: form.awardTitle || awardTypeLabel[form.awardType] || '',
      photoUrl: form.photoUrl,
    };
    try {
      if (editingId) {
        await updateAwardWinner(editingId, payload);
      } else {
        await createAwardWinner(payload);
      }
      setShowModal(false);
      fetchWinners();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save winner');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (w) => {
    if (!confirm(`Delete winner ${w.fullName}?`)) return;
    try {
      await deleteAwardWinner(w._id);
      fetchWinners();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]';

  const filtered = winners.filter((w) =>
    (w.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
    (w.phaseName || w.phaseId?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Awards & Winners Management</h1>
              <p className="text-gray-500 text-sm mt-1">Create, edit and delete award winners shown on the public winners page</p>
            </div>
            <button onClick={openAdd}
              className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0]">
              <Plus size={16} /> Add Winner
            </button>
          </div>

          <div className="relative max-w-sm mb-6">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search winners..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] outline-none" />
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              No winners added yet. Click "Add Winner" to create one.
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-5 py-3 font-medium">#</th>
                      <th className="text-left px-5 py-3 font-medium">Name</th>
                      <th className="text-left px-5 py-3 font-medium">Phase</th>
                      <th className="text-left px-5 py-3 font-medium">Award</th>
                      <th className="text-left px-5 py-3 font-medium">City</th>
                      <th className="text-left px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((w, i) => (
                      <tr key={w._id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-3 font-bold text-gray-500">{w.position || i + 1}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            {w.photoUrl && <img src={w.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />}
                            <div>
                              <p className="font-medium text-gray-900">{w.fullName}</p>
                              <p className="text-xs text-gray-400">{w.grade || '-'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                            {w.phaseName || w.phaseId?.name || 'Other'}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                            <Award size={11} className="inline mr-1" />
                            {w.awardTitle || awardTypeLabel[w.awardType] || w.awardType}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-600">{w.city || '-'}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => openEdit(w)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600" title="Edit"><Pencil size={15} /></button>
                            <button onClick={() => handleDelete(w)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600" title="Delete"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{editingId ? 'Edit Winner' : 'Add Winner'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                  <input type="text" value={form.fatherName} onChange={(e) => setForm({ ...form, fatherName: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                  <select value={form.phaseId} onChange={(e) => {
                    const p = phases.find((x) => x._id === e.target.value);
                    setForm({ ...form, phaseId: e.target.value, phaseName: p?.name || '' });
                  }} className={inputCls}>
                    <option value="">Select Phase</option>
                    {phases.map((p) => (
                      <option key={p._id} value={p._id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input type="number" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <input type="text" value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <input type="text" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                  <input type="text" value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Award Type</label>
                  <select value={form.awardType} onChange={(e) => setForm({ ...form, awardType: e.target.value })} className={inputCls}>
                    <option value="laptop">Laptop</option>
                    <option value="chromebook">Chromebook</option>
                    <option value="shield">Shield</option>
                    <option value="certificate">Certificate</option>
                    <option value="participation">Participation</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Award Title (optional)</label>
                <input type="text" value={form.awardTitle} onChange={(e) => setForm({ ...form, awardTitle: e.target.value })} placeholder="e.g. 1st Position — Laptop" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (optional)</label>
                <input type="text" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} placeholder="https://..." className={inputCls} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] disabled:opacity-50">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><CheckCircle size={16} /> {editingId ? 'Update Winner' : 'Save Winner'}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
