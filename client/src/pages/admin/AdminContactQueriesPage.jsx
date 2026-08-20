import { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Search, Loader2, MailOpen, Inbox } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { getContactMessages, markContactRead } from '../../services/api';

export default function AdminContactQueriesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await getContactMessages();
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const openMessage = async (m) => {
    setSelected(m);
    if (!m.isRead) {
      try {
        await markContactRead(m._id);
        fetchMessages();
      } catch { /* ignore */ }
    }
  };

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    return (
      (m.name || '').toLowerCase().includes(q) ||
      (m.email || '').toLowerCase().includes(q) ||
      (m.subject || '').toLowerCase().includes(q) ||
      (m.message || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Queries</h1>
              <p className="text-gray-500 text-sm mt-1">Messages received from the contact form</p>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search queries..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] outline-none" />
            </div>
            <span className="text-sm text-gray-500">{filtered.length} queries</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              <Inbox size={40} className="mx-auto mb-3 text-gray-300" />
              No contact queries received yet.
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-5 py-3 font-medium">Name</th>
                      <th className="text-left px-5 py-3 font-medium">Email</th>
                      <th className="text-left px-5 py-3 font-medium">Subject</th>
                      <th className="text-left px-5 py-3 font-medium">Date</th>
                      <th className="text-left px-5 py-3 font-medium">Status</th>
                      <th className="text-left px-5 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((m) => (
                      <tr key={m._id} className={`border-b border-gray-50 hover:bg-gray-50 ${!m.isRead ? 'bg-blue-50/40' : ''}`}>
                        <td className="px-5 py-3 font-medium text-gray-900">
                          {!m.isRead && <span className="inline-block w-2 h-2 bg-[#1A73E8] rounded-full mr-2" />}
                          {m.name}
                        </td>
                        <td className="px-5 py-3 text-gray-600">{m.email}</td>
                        <td className="px-5 py-3 text-gray-600">{m.subject || '-'}</td>
                        <td className="px-5 py-3 text-gray-500">{m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '-'}</td>
                        <td className="px-5 py-3">
                          {m.replyMessage ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">Replied</span>
                          ) : m.isRead ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Read</span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">New</span>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          <button onClick={() => openMessage(m)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#1A73E8] text-white rounded-lg text-xs font-medium hover:bg-[#1557B0]">
                            <MailOpen size={14} /> View
                          </button>
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

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Query from {selected.name}</h3>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">✕</button>
            </div>
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600"><Mail size={15} className="text-[#1A73E8]" /> {selected.email}</div>
                <div className="flex items-center gap-2 text-gray-600"><Phone size={15} className="text-[#1A73E8]" /> {selected.phone || '-'}</div>
              </div>
              <div className="text-sm text-gray-500">Subject: <span className="font-medium text-gray-800">{selected.subject || '-'}</span></div>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                <p className="flex items-center gap-2 mb-1 text-xs text-gray-400"><MessageSquare size={13} /> Message</p>
                {selected.message}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button onClick={() => setSelected(null)} className="px-4 py-2.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
