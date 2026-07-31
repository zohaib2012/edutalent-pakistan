import { useState, useEffect } from 'react';
import { Megaphone, Plus, X, Edit, Trash2, Calendar, Star, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api from '../../services/api';

const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white transition-colors";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showInactive, setShowInactive] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const [form, setForm] = useState({
    title: '', content: '', summary: '', featured: false, phaseTarget: 'All', publishDate: '',
  });

  useEffect(() => { fetchAnnouncements(); }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await api.get('/announcements');
      setAnnouncements(res.data || []);
    } catch {
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ title: '', content: '', summary: '', featured: false, phaseTarget: 'All', publishDate: '' });
    setShowModal(true);
  };

  const openEdit = (a) => {
    setEditingId(a._id);
    setForm({
      title: a.title, content: a.content, summary: a.summary || '',
      featured: a.featured, phaseTarget: a.phaseTarget || 'All', publishDate: a.publishDate?.split('T')[0] || '',
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) return;
    try {
      if (editingId) {
        await api.put(`/announcements/${editingId}`, form);
      } else {
        await api.post('/announcements', form);
      }
      setShowModal(false);
      fetchAnnouncements();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this announcement?')) return;
    try {
      await api.delete(`/announcements/${id}`);
      fetchAnnouncements();
    } catch {
      alert('Failed to delete');
    }
  };

  const toggleStatus = async (id) => {
    const ann = announcements.find(a => a._id === id);
    if (!ann) return;
    try {
      await api.put(`/announcements/${id}`, { isActive: !ann.isActive });
      fetchAnnouncements();
    } catch {
      alert('Failed to update status');
    }
  };

  const filtered = announcements.filter((a) => showInactive ? true : a.isActive !== false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#1A73E8]/10 rounded-lg">
                <Megaphone size={24} className="text-[#1A73E8]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Announcements Management</h1>
                <p className="text-sm text-gray-500 mt-0.5">Create and manage system announcements</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)}
                  className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]" />
                Show Inactive
              </label>
              <button onClick={openCreate}
                className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors">
                <Plus size={18} /> Create Announcement
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">#</th>
                    <th className="text-left px-5 py-3 font-medium">Title</th>
                    <th className="text-left px-5 py-3 font-medium">Date</th>
                    <th className="text-left px-5 py-3 font-medium">Target</th>
                    <th className="text-left px-5 py-3 font-medium">Featured</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} className="text-center py-10"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={7} className="text-center py-10 text-gray-400">No announcements.</td></tr>
                  ) : filtered.map((a, i) => (
                    <tr key={a._id} className="border-b border-gray-50 hover:bg-gray-50 relative">
                      <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                      <td className="px-5 py-3">
                        <div onMouseEnter={() => setHoveredId(a._id)} onMouseLeave={() => setHoveredId(null)} className="relative">
                          <span className="font-medium text-gray-900 cursor-pointer hover:text-[#1A73E8]">
                            {a.title}
                          </span>
                          {hoveredId === a._id && (
                            <div className="absolute left-0 top-full mt-2 z-20 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                              <p className="text-white/80 mb-1 font-medium">{a.title}</p>
                              <p className="text-white/60 leading-relaxed">{a.summary || a.content?.slice(0, 100)}</p>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '-'}</td>
                      <td className="px-5 py-3 text-gray-600">{a.phaseTarget || 'All'}</td>
                      <td className="px-5 py-3">
                        {a.featured ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#F1C40F]/10 text-[#C9A300]">
                            <Star size={12} /> Featured
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          a.isActive !== false ? 'bg-[#2ECC71]/10 text-[#25A35A]' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {a.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => toggleStatus(a._id)}
                            className={`p-1.5 rounded-lg transition-colors ${a.isActive !== false ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-green-50 text-[#2ECC71]'}`}
                            title={a.isActive !== false ? 'Deactivate' : 'Activate'}>
                            {a.isActive !== false ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                          </button>
                          <button onClick={() => openEdit(a)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(a._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">{editingId ? 'Edit' : 'Create'} Announcement</h3>
                  <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={20} /></button>
                </div>
                <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Enter announcement title" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Summary</label>
                    <input type="text" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="Brief summary" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Content *</label>
                    <textarea rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Full announcement content..." className={inputClass + " resize-none"} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Phase</label>
                      <select value={form.phaseTarget} onChange={(e) => setForm({ ...form, phaseTarget: e.target.value })} className={inputClass}>
                        <option value="All">All Phases</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Publish Date</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="date" value={form.publishDate} onChange={(e) => setForm({ ...form, publishDate: e.target.value })} className={inputClass + " pl-10"} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]" />
                    <label htmlFor="featured" className="text-sm text-gray-700 flex items-center gap-1.5 cursor-pointer">
                      <Star size={14} className="text-[#F1C40F]" /> Mark as Featured
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button onClick={handleSave} className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0]">
                    {editingId ? 'Update' : 'Publish'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
