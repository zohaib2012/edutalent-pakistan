import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, BookOpen, Loader2, X, CheckCircle } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { getAdminSyllabus, createSyllabus, updateSyllabus, deleteSyllabus, getPhases } from '../../services/api';

const emptySubject = { name: '', topics: '', totalMCQs: '', weightage: '' };

export default function AdminSyllabusPage() {
  const [syllabi, setSyllabi] = useState([]);
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ phaseId: '', description: '', academicYear: '', subjects: [emptySubject] });

  useEffect(() => {
    fetchSyllabi();
    fetchPhases();
  }, []);

  const fetchSyllabi = async () => {
    setLoading(true);
    try {
      const res = await getAdminSyllabus();
      setSyllabi(res.data?.data || []);
    } catch {
      setSyllabi([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhases = async () => {
    try {
      const res = await getPhases();
      setPhases(res.data?.data || []);
    } catch {
      setPhases([]);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ phaseId: '', description: '', academicYear: new Date().getFullYear().toString(), subjects: [{ ...emptySubject }] });
    setShowModal(true);
  };

  const openEdit = (s) => {
    setEditingId(s._id);
    setForm({
      phaseId: s.phaseId?._id || s.phaseId || '',
      description: s.description || '',
      academicYear: s.academicYear || '',
      subjects: (s.subjects?.length ? s.subjects : [{ ...emptySubject }]).map((sub) => ({
        name: sub.name || '',
        topics: sub.topics || '',
        totalMCQs: sub.totalMCQs ?? '',
        weightage: sub.weightage ?? '',
      })),
    });
    setShowModal(true);
  };

  const updateSubject = (i, key, value) => {
    setForm((prev) => {
      const subjects = prev.subjects.map((s, idx) => (idx === i ? { ...s, [key]: value } : s));
      return { ...prev, subjects };
    });
  };

  const addSubjectRow = () => {
    setForm((prev) => ({ ...prev, subjects: [...prev.subjects, { ...emptySubject }] }));
  };

  const removeSubjectRow = (i) => {
    setForm((prev) => ({ ...prev, subjects: prev.subjects.filter((_, idx) => idx !== i) }));
  };

  const handleSave = async () => {
    if (!form.phaseId) { alert('Please select a phase'); return; }
    const subjects = form.subjects.filter((s) => s.name?.trim());
    if (subjects.length === 0) { alert('Add at least one subject'); return; }
    const payload = {
      phaseId: form.phaseId,
      description: form.description,
      academicYear: form.academicYear,
      subjects: subjects.map((s) => ({
        name: s.name.trim(),
        topics: s.topics,
        totalMCQs: Number(s.totalMCQs) || 0,
        weightage: Number(s.weightage) || 0,
      })),
    };
    setSaving(true);
    try {
      if (editingId) {
        await updateSyllabus(editingId, payload);
      } else {
        await createSyllabus(payload);
      }
      setShowModal(false);
      fetchSyllabi();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save syllabus');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (s) => {
    if (!confirm(`Delete syllabus for ${s.phaseId?.name || 'this phase'}?`)) return;
    try {
      await deleteSyllabus(s._id);
      fetchSyllabi();
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
              <h1 className="text-2xl font-bold text-gray-900">Syllabus Management</h1>
              <p className="text-gray-500 text-sm mt-1">Create, edit and delete syllabus for each phase</p>
            </div>
            <button onClick={openAdd}
              className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0]">
              <Plus size={16} /> Add Syllabus
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-primary" /></div>
          ) : syllabi.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              No syllabus created yet. Click "Add Syllabus" to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {syllabi.map((s) => (
                <div key={s._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-1.5 bg-gradient-to-r from-[#1A73E8] to-[#2ECC71]" />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                          <BookOpen size={22} className="text-[#1A73E8]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{s.phaseId?.name || 'Unknown Phase'}</h3>
                          <p className="text-xs text-gray-400">{s.phaseId?.description || s.academicYear}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Pencil size={15} /></button>
                        <button onClick={() => handleDelete(s)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"><Trash2 size={15} /></button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        {s.subjects?.length || 0} subjects
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {s.academicYear || 'N/A'}
                      </span>
                    </div>

                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {s.subjects?.slice(0, 20).map((sub, i) => (
                        <div key={i} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-1.5">
                          <span className="font-medium text-gray-700 truncate">{sub.name}</span>
                          <span className="text-xs text-gray-400 shrink-0 ml-2">{sub.totalMCQs} MCQs</span>
                        </div>
                      ))}
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
          <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{editingId ? 'Edit Syllabus' : 'Add Syllabus'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phase <span className="text-red-500">*</span></label>
                  <select value={form.phaseId} onChange={(e) => setForm({ ...form, phaseId: e.target.value })} className={inputCls} disabled={!!editingId}>
                    <option value="">Select Phase</option>
                    {phases.map((p) => (
                      <option key={p._id} value={p._id}>{p.name} — {p.description}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                  <input type="text" value={form.academicYear} onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
                    placeholder="e.g. 2026-2027" className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description" className={inputCls} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">Subjects</p>
                  <button onClick={addSubjectRow} className="flex items-center gap-1 text-sm text-[#1A73E8] font-medium hover:underline">
                    <Plus size={14} /> Add Subject
                  </button>
                </div>
                <div className="space-y-3">
                  {form.subjects.map((sub, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3 bg-gray-50/50">
                      <div className="grid grid-cols-2 sm:grid-cols-12 gap-2">
                        <div className="col-span-2 sm:col-span-3">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Subject Name</label>
                          <input type="text" value={sub.name} onChange={(e) => updateSubject(i, 'name', e.target.value)} placeholder="e.g. English" className={inputCls} />
                        </div>
                        <div className="col-span-2 sm:col-span-5">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Topics</label>
                          <input type="text" value={sub.topics} onChange={(e) => updateSubject(i, 'topics', e.target.value)} placeholder="Comma separated topics" className={inputCls} />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-gray-500 mb-1">MCQs</label>
                          <input type="number" value={sub.totalMCQs} onChange={(e) => updateSubject(i, 'totalMCQs', e.target.value)} className={inputCls} />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Weight %</label>
                          <input type="number" value={sub.weightage} onChange={(e) => updateSubject(i, 'weightage', e.target.value)} className={inputCls} />
                        </div>
                      </div>
                      <div className="flex justify-end mt-2">
                        <button onClick={() => removeSubjectRow(i)} className="flex items-center gap-1 text-xs text-red-600 hover:bg-red-50 px-2 py-1 rounded">
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] disabled:opacity-50">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><CheckCircle size={16} /> {editingId ? 'Update Syllabus' : 'Save Syllabus'}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
