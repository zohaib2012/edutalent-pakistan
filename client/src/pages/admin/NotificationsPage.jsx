import { useState, useEffect } from 'react';
import { Bell, Send, Mail, CheckCircle, XCircle, Clock, Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api from '../../services/api';

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('all');
  const [search, setSearch] = useState('');
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notifications/my-notifications');
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch {
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) return;
    setSending(true);
    try {
      if (target === 'all') {
        await api.post('/notifications/broadcast', { title, message, recipientType: 'all' });
      } else {
        await api.post('/notifications/send', { title, message, recipientId: null, recipientType: target });
      }
      setTitle('');
      setMessage('');
      fetchHistory();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send');
    } finally {
      setSending(false);
    }
  };

  const filtered = history.filter((h) =>
    (h.title || '').toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>

          <div className="grid grid-cols-5 gap-6 mb-8">
            <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Bell size={20} className="text-[#1A73E8]" /> Compose Notification
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="Notification title..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5}
                    placeholder="Write your notification message..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                  <select value={target} onChange={(e) => setTarget(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                    <option value="all">All Students</option>
                    <option value="student">Single Student</option>
                  </select>
                </div>
                <button onClick={handleSend} disabled={!title || !message || sending}
                  className="w-full bg-[#1A73E8] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] disabled:opacity-50 flex items-center justify-center gap-2">
                  {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  Send Notification
                </button>
              </div>
            </div>

            <div className="col-span-3 bg-white rounded-xl border border-gray-200">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Sent History</h3>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search..." value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#1A73E8] w-48" />
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {loading ? (
                  <div className="p-8 text-center"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></div>
                ) : paginated.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">No notifications sent yet.</div>
                ) : paginated.map((item, i) => (
                  <div key={item._id || i} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                            {item.type || 'General'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Target: {item.recipientType || 'all'}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.createdAt ? new Date(item.createdAt).toLocaleString() : '-'}</p>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                        <CheckCircle size={12} /> Sent
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-4 border-t border-gray-100 text-sm text-gray-500">
                <span>Page {currentPage} of {totalPages || 1}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40"><ChevronLeft size={14} /></button>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="p-1.5 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40"><ChevronRight size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
