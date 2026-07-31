import { useState, useEffect } from 'react';
import { FileText, Download, Search, Calendar, ChevronLeft, ChevronRight, Users, Banknote, ClipboardList, Trophy, Loader2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api from '../../services/api';

export default function LogsReportsPage() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { fetchActivity(); }, []);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admindashboard/recent-activity');
      setActivity(res.data || []);
    } catch {
      setActivity([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = activity.filter((log) =>
    (log.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
    (log.registrationNumber || '').toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const reportCards = [
    { label: 'Registration Report', icon: Users, color: 'text-[#1A73E8] bg-blue-50', desc: 'Student registrations data' },
    { label: 'Payment Report', icon: Banknote, color: 'text-[#F1C40F] bg-yellow-50', desc: 'Payment collection status' },
    { label: 'Test Report', icon: ClipboardList, color: 'text-[#2ECC71] bg-green-50', desc: 'Test completion summary' },
    { label: 'Award Report', icon: Trophy, color: 'text-purple-600 bg-purple-50', desc: 'Award distribution tracking' },
  ];

  const statusLabel = (s) => ({
    registered: 'Registered', challan_issued: 'Challan Issued',
    payment_pending: 'Payment Pending', payment_verified: 'Verified',
    slip_issued: 'Slip Issued', test_completed: 'Test Completed',
    result_published: 'Published'
  })[s] || s;

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Logs & Reports</h1>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <FileText size={16} className="text-[#1A73E8]" /> Recent Activity
                  </h3>
                </div>
                <div className="p-4 border-b border-gray-100">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search..." value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#1A73E8]" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="text-left px-4 py-3 font-medium">Date</th>
                        <th className="text-left px-4 py-3 font-medium">Student</th>
                        <th className="text-left px-4 py-3 font-medium">Registration</th>
                        <th className="text-left px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr><td colSpan={4} className="text-center py-10"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></td></tr>
                      ) : paginated.length === 0 ? (
                        <tr><td colSpan={4} className="text-center py-10 text-gray-400">No activity found.</td></tr>
                      ) : paginated.map((log, i) => (
                        <tr key={log._id || i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-600 text-xs">{log.updatedAt ? new Date(log.updatedAt).toLocaleString() : '-'}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 text-xs">{log.fullName}</td>
                          <td className="px-4 py-3 font-mono text-xs text-gray-400">{log.registrationNumber}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{statusLabel(log.status)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Reports</h3>
              {reportCards.map((report, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${report.color.split(' ').slice(1).join(' ')}`}>
                      <report.icon size={20} className={report.color.split(' ')[0]} />
                    </div>
                    <Download size={16} className="text-gray-400" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-900">{report.label}</h4>
                  <p className="text-xs text-gray-500 mt-1">{report.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
