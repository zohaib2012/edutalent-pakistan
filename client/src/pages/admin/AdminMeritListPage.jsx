import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, CheckCircle, Upload, FileText, Image } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { getAdminMeritList, createMeritEntry, updateMeritEntry, deleteMeritEntry, getPhases, uploadMeritDocument, getAdminMeritDocuments, deleteMeritDocument, postFormData } from '../../services/api';

const emptyForm = { phaseId: '', position: '', registrationNumber: '', studentName: '', fatherName: '', city: '', score: '', totalMarks: '100', percentage: '' };

export default function AdminMeritListPage() {
  const [entries, setEntries] = useState([]);
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [filterPhase, setFilterPhase] = useState('');

  // Document upload
  const [documents, setDocuments] = useState([]);
  const [docPhase, setDocPhase] = useState('');
  const [docFileName, setDocFileName] = useState('');
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const docFileInputRef = useRef(null);

  useEffect(() => {
    fetchEntries();
    fetchPhases();
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await getAdminMeritDocuments();
      setDocuments(res.data?.data || []);
    } catch {
      setDocuments([]);
    }
  };

  const handleDocUpload = async () => {
    const input = docFileInputRef.current;
    const file = input?.files?.[0] || null;
    if (!docPhase) { alert('Select a phase'); return; }
    if (!file) { alert('Select a PDF or image file'); return; }
    setUploadingDoc(true);
    try {
      const fd = new FormData();
      fd.append('phaseId', docPhase);
      fd.append('file', file);
      await postFormData('/merit-documents', fd);
      setDocFileName('');
      setDocPhase('');
      if (input) input.value = '';
      fetchDocuments();
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleDocDelete = async (id) => {
    if (!confirm('Delete this merit list document?')) return;
    try {
      await deleteMeritDocument(id);
      fetchDocuments();
    } catch {
      alert('Delete failed');
    }
  };

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await getAdminMeritList();
      setEntries(res.data?.data || []);
    } catch {
      setEntries([]);
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
    setForm({ ...emptyForm, phaseId: filterPhase || '' });
    setShowModal(true);
  };

  const openEdit = (e) => {
    setEditingId(e._id);
    setForm({
      phaseId: e.phaseId?._id || e.phaseId || '',
      position: e.position ?? '',
      registrationNumber: e.registrationNumber || '',
      studentName: e.studentName || '',
      fatherName: e.fatherName || '',
      city: e.city || '',
      score: e.score ?? '',
      totalMarks: e.totalMarks ?? 100,
      percentage: e.percentage ?? '',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.phaseId || !form.studentName.trim()) { alert('Phase and student name are required'); return; }
    const payload = {
      phaseId: form.phaseId,
      position: Number(form.position) || 1,
      registrationNumber: form.registrationNumber,
      studentName: form.studentName.trim(),
      fatherName: form.fatherName,
      city: form.city,
      score: Number(form.score) || 0,
      totalMarks: Number(form.totalMarks) || 100,
      percentage: form.percentage !== '' ? Number(form.percentage) : undefined,
    };
    setSaving(true);
    try {
      if (editingId) {
        await updateMeritEntry(editingId, payload);
      } else {
        await createMeritEntry(payload);
      }
      setShowModal(false);
      fetchEntries();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save merit entry');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (e) => {
    if (!confirm(`Delete merit entry for ${e.studentName}?`)) return;
    try {
      await deleteMeritEntry(e._id);
      fetchEntries();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]';

  const filtered = filterPhase ? entries.filter((e) => (e.phaseId?._id || e.phaseId) === filterPhase) : entries;

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Merit List Management</h1>
              <p className="text-gray-500 text-sm mt-1">Create, edit and delete merit list entries</p>
            </div>
            <button onClick={openAdd}
              className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0]">
              <Plus size={16} /> Add Merit Entry
            </button>
          </div>

          <div className="mb-4">
            <select value={filterPhase} onChange={(e) => setFilterPhase(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
              <option value="">All Phases</option>
              {phases.map((p) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Upload size={16} className="text-[#1A73E8]" /> Upload Merit List Document (PDF / Image)
            </h3>
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Phase</label>
                <select value={docPhase} onChange={(e) => setDocPhase(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] min-w-[180px]">
                  <option value="">Select Phase</option>
                  {phases.map((p) => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">File</label>
                <input ref={docFileInputRef} id="merit-doc-input" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf" onChange={(e) => setDocFileName(e.target.files?.[0]?.name || '')}
                  className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#1A73E8]/10 file:text-[#1A73E8] hover:file:bg-[#1A73E8]/20" />
                {docFileName && <p className="text-xs text-green-600 mt-1 truncate max-w-[220px]">✓ {docFileName}</p>}
              </div>
              <button onClick={handleDocUpload} disabled={uploadingDoc}
                className="bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] disabled:opacity-50 flex items-center gap-2">
                {uploadingDoc ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Upload
              </button>
            </div>
            {documents.length > 0 && (
              <div className="mt-4 space-y-2">
                {documents.map((d) => {
                  const isPdf = (d.fileUrl || '').toLowerCase().includes('.pdf') || (d.fileUrl || '').split('?')[0].endsWith('.pdf');
                  return (
                    <div key={d._id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        {isPdf ? <FileText size={15} className="text-red-500" /> : <Image size={15} className="text-green-600" />}
                        <span className="font-medium">{d.title || 'Merit List'}</span>
                        <span className="text-xs text-gray-400">— {d.phaseId?.name || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={d.fileUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-[#1A73E8] hover:underline">View</a>
                        <button onClick={() => handleDocDelete(d._id)} className="p-1 rounded hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              No merit entries yet. Click "Add Merit Entry" to create one.
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-5 py-3 font-medium">#</th>
                      <th className="text-left px-5 py-3 font-medium">Phase</th>
                      <th className="text-left px-5 py-3 font-medium">Name</th>
                      <th className="text-left px-5 py-3 font-medium">Registration ID</th>
                      <th className="text-left px-5 py-3 font-medium">Score</th>
                      <th className="text-left px-5 py-3 font-medium">Percentage</th>
                      <th className="text-left px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((e) => (
                      <tr key={e._id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-3 font-bold text-gray-500">{e.position}</td>
                        <td className="px-5 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                            {e.phaseId?.name || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-medium text-gray-900">{e.studentName}</td>
                        <td className="px-5 py-3 font-mono text-xs text-gray-600">{e.registrationNumber || '-'}</td>
                        <td className="px-5 py-3 text-gray-800">{e.score}/{e.totalMarks || 100}</td>
                        <td className="px-5 py-3 text-gray-800">{e.percentage != null ? `${e.percentage}%` : '-'}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => openEdit(e)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600" title="Edit"><Pencil size={15} /></button>
                            <button onClick={() => handleDelete(e)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600" title="Delete"><Trash2 size={15} /></button>
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
              <h3 className="text-lg font-semibold text-gray-900">{editingId ? 'Edit Merit Entry' : 'Add Merit Entry'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phase <span className="text-red-500">*</span></label>
                  <select value={form.phaseId} onChange={(e) => setForm({ ...form, phaseId: e.target.value })} className={inputCls}>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                  <input type="text" value={form.fatherName} onChange={(e) => setForm({ ...form, fatherName: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration ID</label>
                  <input type="text" value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                  <input type="number" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                  <input type="number" value={form.totalMarks} onChange={(e) => setForm({ ...form, totalMarks: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                  <input type="number" value={form.percentage} onChange={(e) => setForm({ ...form, percentage: e.target.value })} className={inputCls} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] disabled:opacity-50">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><CheckCircle size={16} /> {editingId ? 'Update Entry' : 'Save Entry'}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
