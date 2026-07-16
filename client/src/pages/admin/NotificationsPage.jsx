import { useState } from 'react';
import {
  Bell, Send, Mail, CheckCircle, XCircle, Clock, Search, ChevronLeft, ChevronRight
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const historyData = [
  { date: '2026-07-11 09:30 AM', title: 'Test Schedule Released', target: 'All Students', type: 'General', status: 'Sent' },
  { date: '2026-07-10 02:15 PM', title: 'Phase 2 Result Published', target: 'Phase 2', type: 'Result', status: 'Sent' },
  { date: '2026-07-09 11:00 AM', title: 'Payment Reminder', target: 'Phase 3', type: 'Reminder', status: 'Sent' },
  { date: '2026-07-08 04:45 PM', title: 'Award Ceremony Invitation', target: 'All Students', type: 'Event', status: 'Pending' },
  { date: '2026-07-07 10:30 AM', title: 'Slip Generation Notice', target: 'Single Student', type: 'General', status: 'Failed' },
];

const typeColors = {
  General: 'bg-blue-50 text-blue-700',
  Result: 'bg-green-50 text-green-700',
  Reminder: 'bg-yellow-50 text-yellow-700',
  Event: 'bg-purple-50 text-purple-700',
};

const statusIcons = {
  Sent: CheckCircle,
  Pending: Clock,
  Failed: XCircle,
};

const statusColors = {
  Sent: 'text-green-600',
  Pending: 'text-yellow-600',
  Failed: 'text-red-600',
};

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('All Students');
  const [phase, setPhase] = useState('Phase 1');
  const [sendEmail, setSendEmail] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = historyData.filter((h) =>
    h.title.toLowerCase().includes(search.toLowerCase()) ||
    h.target.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSend = () => {
    // Placeholder for send logic
    setTitle('');
    setMessage('');
  };

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
                <Bell size={20} className="text-[#1A73E8]" />
                Compose Notification
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Notification title..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Write your notification message..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                  <select
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
                  >
                    <option>All Students</option>
                    <option>Phase Specific</option>
                    <option>Single Student</option>
                  </select>
                </div>
                {target === 'Phase Specific' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                    <select
                      value={phase}
                      onChange={(e) => setPhase(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
                    >
                      <option>Phase 1</option>
                      <option>Phase 2</option>
                      <option>Phase 3</option>
                      <option>Phase 4</option>
                    </select>
                  </div>
                )}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                    className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                  />
                  <span className="text-sm text-gray-700 flex items-center gap-1">
                    <Mail size={14} />
                    Send Email as well
                  </span>
                </label>
                <button
                  onClick={handleSend}
                  disabled={!title || !message}
                  className="w-full bg-[#1A73E8] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Send Notification
                </button>
              </div>
            </div>

            <div className="col-span-3 bg-white rounded-xl border border-gray-200">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Notification History</h3>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search history..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#1A73E8] w-48"
                  />
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {paginated.map((item, i) => {
                  const StatusIcon = statusIcons[item.status];
                  return (
                    <div key={i} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[item.type] || 'bg-gray-50 text-gray-600'}`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">Target: {item.target}</p>
                          <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8] w-3 h-3" />
                            <Mail size={12} />
                          </label>
                          <span className={`flex items-center gap-1 text-xs font-medium ${statusColors[item.status]}`}>
                            <StatusIcon size={12} />
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between p-4 border-t border-gray-100 text-sm text-gray-500">
                <span>Page {currentPage} of {totalPages || 1}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40"><ChevronLeft size={14} /></button>
                  <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="p-1.5 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40"><ChevronRight size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
