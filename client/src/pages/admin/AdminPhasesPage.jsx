import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Layers, Loader2, X, CheckCircle, Award, Users } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { getPhases, createPhase, updatePhase, deletePhase } from '../../services/api';

const emptyForm = {
  name: '', slug: '', gradeMin: '', gradeMax: '', fee: '', description: '',
  laptopPosition: '1', chromebookPositions: '2,3,4,5', shieldPositions: '6,7,8,9,10', certificateTop: '20',
};

export default function AdminPhasesPage() {
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchPhases(); }, []);

  const fetchPhases = async () => {
    setLoading(true);
    try {
      const res = await getPhases();
      setPhases(res.data?.data || []);
    } catch {
      setPhases([]);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name || '', slug: p.slug || '',
      gradeMin: p.gradeRange?.min ?? '', gradeMax: p.gradeRange?.max ?? '',
      fee: p.fee ?? '', description: p.description || '',
      laptopPosition: p.awardStructure?.laptop?.position ?? 1,
      chromebookPositions: (p.awardStructure?.chromebook?.positions || [2, 3, 4, 5]).join(','),
      shieldPositions: (p.awardStructure?.shields?.positions || [6, 7, 8, 9, 10]).join(','),
      certificateTop: p.awardStructure?.certificates?.topPositions ?? 20,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim()) { alert('Name and slug are required'); return; }
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim().toLowerCase().replace(/\s+/g, '-'),
      gradeRange: { min: Number(form.gradeMin) || 0, max: Number(form.gradeMax) || 0 },
      fee: Number(form.fee) || 0,
      description: form.description,
      awardStructure: {
        laptop: { position: Number(form.laptopPosition) || 1, quantity: 1 },
        chromebook: { positions: form.chromebookPositions.split(',').map(Number).filter((n) => !isNaN(n)), quantity: 4 },
        shields: { positions: form.shieldPositions.split(',').map(Number).filter((n) => !isNaN(n)), quantity: 5 },
        certificates: { topPositions: Number(form.certificateTop) || 20, quantity: Number(form.certificateTop) || 20 },
      },
    };
    setSaving(true);
    try {
      if (editingId) {
        await updatePhase(editingId, payload);
      } else {
        await createPhase(payload);
      }
      setShowModal(false);
      fetchPhases();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save phase');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    if (!confirm(`Delete ${p.name}?`)) return;
    try {
      await deletePhase(p._id);
      fetchPhases();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]';

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Phase Management</h1>
              <p className="text-gray-500 text-sm mt-1">Create and manage scholarship phases</p>
            </div>
            <button onClick={openAdd}
              className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0]">
              <Plus size={16} /> Add Phase
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-primary" /></div>
          ) : phases.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              No phases created yet. Click "Add Phase" to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {phases.map((p) => (
                <div key={p._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-1.5 bg-gradient-to-r from-[#1A73E8] to-[#2ECC71]" />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                          <Layers size={22} className="text-[#1A73E8]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{p.name}</h3>
                          <p className="text-xs text-gray-400 font-mono">{p.slug}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Pencil size={15} /></button>
                        <button onClick={() => handleDelete(p)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"><Trash2 size={15} /></button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        Grades {p.gradeRange?.min} - {p.gradeRange?.max}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        Fee: Rs {p.fee?.toLocaleString?.() || p.fee}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.isActive === false ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                        {p.isActive === false ? 'Inactive' : 'Active'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">{p.description || 'No description provided.'}</p>

                    <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users size={14} className="text-[#1A73E8]" />
                        <span>{p.syllabus?.length || 0} subjects</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award size={14} className="text-[#F1C40F]" />
                        <span>Laptop: Rank {p.awardStructure?.laptop?.position ?? 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{editingId ? 'Edit Phase' : 'Add Phase'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phase Name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Phase 5" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
                  <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g. phase-5" className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Grade</label>
                  <input type="number" value={form.gradeMin} onChange={(e) => setForm({ ...form, gradeMin: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Grade</label>
                  <input type="number" value={form.gradeMax} onChange={(e) => setForm({ ...form, gradeMax: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee (Rs)</label>
                  <input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description of the phase" className={`${inputCls} resize-none`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2"><Award size={16} className="text-[#F1C40F]" /> Award Structure</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Laptop Position</label>
                    <input type="number" value={form.laptopPosition} onChange={(e) => setForm({ ...form, laptopPosition: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chromebook Positions (comma separated)</label>
                    <input type="text" value={form.chromebookPositions} onChange={(e) => setForm({ ...form, chromebookPositions: e.target.value })}
                      placeholder="2,3,4,5" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shield Positions (comma separated)</label>
                    <input type="text" value={form.shieldPositions} onChange={(e) => setForm({ ...form, shieldPositions: e.target.value })}
                      placeholder="6,7,8,9,10" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Top Positions</label>
                    <input type="number" value={form.certificateTop} onChange={(e) => setForm({ ...form, certificateTop: e.target.value })} className={inputCls} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] disabled:opacity-50">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><CheckCircle size={16} /> {editingId ? 'Update Phase' : 'Save Phase'}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
