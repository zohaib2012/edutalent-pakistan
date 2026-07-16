import { useState } from 'react';
import {
  FileText, Download, Search, Filter, Calendar,
  ChevronLeft, ChevronRight, Users, Banknote, ClipboardList, Trophy
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const activityLogs = [
  { datetime: '2026-07-11 10:23 AM', admin: 'Admin User', activity: 'Verified payment for Ahmed Khan (CH-2301)', ip: '192.168.1.45' },
  { datetime: '2026-07-11 09:45 AM', admin: 'Admin User', activity: 'Generated slip for Fatima Ali (ST-1002)', ip: '192.168.1.45' },
  { datetime: '2026-07-10 04:12 PM', admin: 'Super Admin', activity: 'Published results for Phase 1', ip: '192.168.1.100' },
  { datetime: '2026-07-10 02:30 PM', admin: 'Admin User', activity: 'Added new question to Phase 2 test bank', ip: '192.168.1.45' },
  { datetime: '2026-07-10 11:00 AM', admin: 'Super Admin', activity: 'Assigned awards for Phase 1', ip: '192.168.1.100' },
  { datetime: '2026-07-09 03:15 PM', admin: 'Admin User', activity: 'Rejected challan for Ayesha Khan (CH-2306)', ip: '192.168.1.45' },
  { datetime: '2026-07-09 01:00 PM', admin: 'Admin User', activity: 'Bulk verified 5 payments', ip: '192.168.1.45' },
  { datetime: '2026-07-08 10:45 AM', admin: 'Super Admin', activity: 'Updated test settings for Phase 3', ip: '192.168.1.100' },
];

const activityTypes = ['All Activities', 'Payments', 'Results', 'Slips', 'Tests', 'Awards', 'Students'];

const reportCards = [
  { label: 'Registration Report', icon: Users, color: 'text-[#1A73E8] bg-blue-50', desc: 'All student registrations data with filters' },
  { label: 'Payment Report', icon: Banknote, color: 'text-[#F1C40F] bg-yellow-50', desc: 'Payment collection and verification status' },
  { label: 'Test Report', icon: ClipboardList, color: 'text-[#2ECC71] bg-green-50', desc: 'Test completion and scoring summary' },
  { label: 'Award Report', icon: Trophy, color: 'text-purple-600 bg-purple-50', desc: 'Award distribution and delivery tracking' },
];

export default function LogsReportsPage() {
  const [activityType, setActivityType] = useState('All Activities');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filtered = activityLogs.filter((log) => {
    const matchSearch = log.activity.toLowerCase().includes(search.toLowerCase()) || log.admin.toLowerCase().includes(search.toLowerCase());
    const matchType = activityType === 'All Activities' || log.activity.toLowerCase().includes(activityType.toLowerCase().slice(0, -1));
    return matchSearch && matchType;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Logs & Reports</h1>
            <button className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors">
              <Download size={16} />
              Export All Logs
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 mb-6">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <FileText size={16} className="text-[#1A73E8]" />
                    Activity Log
                  </h3>
                </div>
                <div className="p-4 border-b border-gray-100">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search logs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#1A73E8]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#1A73E8]"
                      />
                      <span className="text-gray-400 text-xs">to</span>
                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#1A73E8]"
                      />
                    </div>
                    <select
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#1A73E8]"
                    >
                      {activityTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="text-left px-4 py-3 font-medium">Date/Time</th>
                        <th className="text-left px-4 py-3 font-medium">Admin Name</th>
                        <th className="text-left px-4 py-3 font-medium">Activity Description</th>
                        <th className="text-left px-4 py-3 font-medium">IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((log, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{log.datetime}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 text-xs">{log.admin}</td>
                          <td className="px-4 py-3 text-gray-700 text-xs">{log.activity}</td>
                          <td className="px-4 py-3 font-mono text-xs text-gray-400">{log.ip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Download Reports</h3>
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
