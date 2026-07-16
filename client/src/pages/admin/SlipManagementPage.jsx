import { useState } from 'react';
import {
  Download, Search, ChevronLeft, ChevronRight, Ticket, CheckCircle, Clock
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const slipsData = [
  { id: 1, name: 'Ahmed Khan', rollNo: 'ST-1001', phase: 'Phase 1', testDate: '2026-08-15', status: 'Generated' },
  { id: 2, name: 'Fatima Ali', rollNo: 'ST-1002', phase: 'Phase 1', testDate: '2026-08-15', status: 'Pending' },
  { id: 3, name: 'Usman Raza', rollNo: 'ST-1003', phase: 'Phase 1', testDate: '2026-08-15', status: 'Generated' },
  { id: 4, name: 'Zainab Ahmed', rollNo: 'ST-1004', phase: 'Phase 2', testDate: '2026-08-22', status: 'Pending' },
  { id: 5, name: 'Hassan Shah', rollNo: 'ST-1005', phase: 'Phase 2', testDate: '2026-08-22', status: 'Generated' },
  { id: 6, name: 'Ayesha Khan', rollNo: 'ST-1006', phase: 'Phase 2', testDate: '2026-08-22', status: 'Pending' },
  { id: 7, name: 'Bilal Ahmed', rollNo: 'ST-1007', phase: 'Phase 3', testDate: '2026-08-29', status: 'Pending' },
  { id: 8, name: 'Sana Tariq', rollNo: 'ST-1008', phase: 'Phase 3', testDate: '2026-08-29', status: 'Generated' },
];

export default function SlipManagementPage() {
  const [phase, setPhase] = useState('Phase 1');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = slipsData.filter(
    (s) => s.phase === phase && s.name.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Slip Management</h1>
            <button className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors">
              <Ticket size={18} />
              Generate All Slips for {phase}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
              <select
                value={phase}
                onChange={(e) => { setPhase(e.target.value); setCurrentPage(1); }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
              >
                <option>Phase 1</option>
                <option>Phase 2</option>
                <option>Phase 3</option>
                <option>Phase 4</option>
              </select>
            </div>
            <div className="relative flex-1 max-w-sm mt-5">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">#</th>
                    <th className="text-left px-5 py-3 font-medium">Student Name</th>
                    <th className="text-left px-5 py-3 font-medium">Roll Number</th>
                    <th className="text-left px-5 py-3 font-medium">Phase</th>
                    <th className="text-left px-5 py-3 font-medium">Test Date</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((slip, i) => (
                    <tr key={slip.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3 text-gray-500">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{slip.name}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-600">{slip.rollNo}</td>
                      <td className="px-5 py-3 text-gray-600">{slip.phase}</td>
                      <td className="px-5 py-3 text-gray-600">{slip.testDate}</td>
                      <td className="px-5 py-3">
                        {slip.status === 'Generated' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <CheckCircle size={12} />
                            Generated
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                            <Clock size={12} />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        {slip.status === 'Generated' ? (
                          <button className="flex items-center gap-1 text-[#1A73E8] hover:underline text-xs">
                            <Download size={14} />
                            Download
                          </button>
                        ) : (
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#1A73E8] text-white rounded-lg text-xs font-medium hover:bg-[#1557B0] transition-colors">
                            <Ticket size={14} />
                            Generate Slip
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Page {currentPage} of {totalPages || 1}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"
              ><ChevronLeft size={16} /></button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"
              ><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
