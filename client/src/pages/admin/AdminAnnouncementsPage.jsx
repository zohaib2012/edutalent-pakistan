import { useState } from 'react';
import {
  Megaphone, Plus, X, Edit, Trash2, Eye,
  Calendar, Star, ChevronDown, ChevronUp
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const initialAnnouncements = [
  { id: 1, title: 'Phase 2 Registration Now Open', date: '2026-07-10', phaseTarget: 'Phase 2', featured: true, status: 'active', summary: 'Registrations for Phase 2 are now open for all provinces.', content: 'We are pleased to announce that registrations for Phase 2 of EduTalent Pakistan 2026 are now open. Students from all provinces can apply through the online portal.' },
  { id: 2, title: 'Phase 1 Results Published', date: '2026-07-05', phaseTarget: 'Phase 1', featured: true, status: 'active', summary: 'Phase 1 results have been published on the portal.', content: 'The results for Phase 1 examinations have been published. Students can check their results by logging into their accounts. Congratulations to all successful candidates.' },
  { id: 3, title: 'Test Date Rescheduled - Phase 3', date: '2026-06-28', phaseTarget: 'Phase 3', featured: false, status: 'active', summary: 'Phase 3 test date has been rescheduled to July 20.', content: 'Due to administrative reasons, the Phase 3 test originally scheduled for July 15 has been rescheduled to July 20, 2026. Roll number slips will be updated accordingly.' },
  { id: 4, title: 'Scholarship Applications Open', date: '2026-06-20', phaseTarget: 'All', featured: true, status: 'active', summary: 'Need-based scholarship applications are now open.', content: 'EduTalent Pakistan is offering need-based scholarships for deserving students. Applications must be submitted before July 25, 2026 with supporting documents.' },
  { id: 5, title: 'Phase 4 Registration Closed', date: '2026-05-15', phaseTarget: 'Phase 4', featured: false, status: 'inactive', summary: 'Phase 4 registrations have been closed.', content: 'The registration period for Phase 4 of EduTalent Pakistan 2026 has concluded. Thank you to all applicants. Test dates will be announced shortly.' },
  { id: 6, title: 'New Exam Centers Added', date: '2026-06-12', phaseTarget: 'All', featured: false, status: 'active', summary: 'Additional exam centers added in remote areas.', content: 'We have added 15 new exam centers across Balochistan and KPK to ensure better accessibility for students in remote areas.' },
];

const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] bg-white transition-colors";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showInactive, setShowInactive] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [previewId, setPreviewId] = useState(null);

  const [form, setForm] = useState({
    title: '', content: '', summary: '', featured: false,
    phaseTarget: 'All', publishDate: '',
  });

  const openCreate = () => {
    setEditingId(null);
    setForm({ title: '', content: '', summary: '', featured: false, phaseTarget: 'All', publishDate: '' });
    setShowModal(true);
  };

  const openEdit = (a) => {
    setEditingId(a.id);
    setForm({
      title: a.title, content: a.content, summary: a.summary,
      featured: a.featured, phaseTarget: a.phaseTarget, publishDate: a.date,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    if (editingId) {
      setAnnouncements((prev) =>
        prev.map((a) => a.id === editingId
          ? { ...a, title: form.title, content: form.content, summary: form.summary, featured: form.featured, phaseTarget: form.phaseTarget, date: form.publishDate || a.date }
          : a
        )
      );
    } else {
      const newAnn = {
        id: Date.now(),
        title: form.title,
        content: form.content,
        summary: form.summary,
        featured: form.featured,
        phaseTarget: form.phaseTarget,
        date: form.publishDate || new Date().toISOString().split('T')[0],
        status: 'active',
      };
      setAnnouncements([newAnn, ...announcements]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleStatus = (id) => {
    setAnnouncements((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a)
    );
  };

  const filtered = announcements.filter((a) => showInactive ? true : a.status !== 'inactive');

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
                <input
                  type="checkbox"
                  checked={showInactive}
                  onChange={(e) => setShowInactive(e.target.checked)}
                  className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                />
                Show Expired
              </label>
              <button
                onClick={openCreate}
                className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors"
              >
                <Plus size={18} />
                Create Announcement
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
                    <th className="text-left px-5 py-3 font-medium">Phase Target</th>
                    <th className="text-left px-5 py-3 font-medium">Featured</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 relative">
                      <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                      <td className="px-5 py-3">
                        <div
                          className="relative"
                          onMouseEnter={() => setHoveredId(a.id)}
                          onMouseLeave={() => setHoveredId(null)}
                        >
                          <span className="font-medium text-gray-900 cursor-pointer hover:text-[#1A73E8] transition-colors">
                            {a.title}
                          </span>
                          {hoveredId === a.id && (
                            <div className="absolute left-0 top-full mt-2 z-20 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                              <p className="text-white/80 mb-1 font-medium">{a.title}</p>
                              <p className="text-white/60 leading-relaxed">{a.summary}</p>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{a.date}</td>
                      <td className="px-5 py-3 text-gray-600">{a.phaseTarget}</td>
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
                          a.status === 'active'
                            ? 'bg-[#2ECC71]/10 text-[#25A35A]'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {a.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleStatus(a.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              a.status === 'active'
                                ? 'hover:bg-gray-100 text-gray-500'
                                : 'hover:bg-green-50 text-[#2ECC71]'
                            }`}
                            title={a.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {a.status === 'active' ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                          </button>
                          <button onClick={() => openEdit(a)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-gray-400">No announcements found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingId ? 'Edit Announcement' : 'Create Announcement'}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Enter announcement title"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Summary</label>
                    <input
                      type="text"
                      value={form.summary}
                      onChange={(e) => setForm({ ...form, summary: e.target.value })}
                      placeholder="Brief summary for preview card"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Content *</label>
                    <textarea
                      rows={5}
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="Full announcement content..."
                      className={inputClass + " resize-none"}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Phase</label>
                      <select
                        value={form.phaseTarget}
                        onChange={(e) => setForm({ ...form, phaseTarget: e.target.value })}
                        className={inputClass}
                      >
                        <option value="All">All Phases</option>
                        <option>Phase 1</option>
                        <option>Phase 2</option>
                        <option>Phase 3</option>
                        <option>Phase 4</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Publish Date</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          value={form.publishDate}
                          onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                          className={inputClass + " pl-10"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                    />
                    <label htmlFor="featured" className="text-sm text-gray-700 flex items-center gap-1.5 cursor-pointer">
                      <Star size={14} className="text-[#F1C40F]" />
                      Mark as Featured
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors"
                  >
                    {editingId ? 'Update Announcement' : 'Publish Announcement'}
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
