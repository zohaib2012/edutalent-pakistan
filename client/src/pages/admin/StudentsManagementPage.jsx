import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, Eye, Edit, Trash2, Download,
  ChevronLeft, ChevronRight, UserPlus
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const statusColors = {
  registered: 'bg-gray-100 text-gray-700',
  challan_issued: 'bg-blue-50 text-blue-700',
  payment_pending: 'bg-yellow-50 text-yellow-700',
  payment_verified: 'bg-green-50 text-green-700',
  slip_issued: 'bg-purple-50 text-purple-700',
  test_completed: 'bg-teal-50 text-teal-700',
  result_published: 'bg-emerald-50 text-emerald-700',
};

const statusLabels = {
  registered: 'Registered',
  challan_issued: 'Challan Issued',
  payment_pending: 'Payment Pending',
  payment_verified: 'Payment Verified',
  slip_issued: 'Slip Issued',
  test_completed: 'Test Completed',
  result_published: 'Result Published',
};

const studentsData = [
  { id: 1, name: 'Ahmed Khan', cnic: '42201-1234567-1', phase: 'Phase 1', province: 'Sindh', status: 'payment_verified', date: '2026-03-15' },
  { id: 2, name: 'Fatima Ali', cnic: '35201-2345678-2', phase: 'Phase 1', province: 'Punjab', status: 'test_completed', date: '2026-03-18' },
  { id: 3, name: 'Usman Raza', cnic: '42201-3456789-3', phase: 'Phase 2', province: 'Sindh', status: 'slip_issued', date: '2026-04-02' },
  { id: 4, name: 'Zainab Ahmed', cnic: '13101-4567890-4', phase: 'Phase 2', province: 'KPK', status: 'payment_pending', date: '2026-04-10' },
  { id: 5, name: 'Hassan Shah', cnic: '42201-5678901-5', phase: 'Phase 3', province: 'Sindh', status: 'result_published', date: '2026-05-05' },
  { id: 6, name: 'Ayesha Khan', cnic: '35201-6789012-6', phase: 'Phase 3', province: 'Punjab', status: 'registered', date: '2026-05-12' },
  { id: 7, name: 'Bilal Ahmed', cnic: '05101-7890123-7', phase: 'Phase 4', province: 'Balochistan', status: 'challan_issued', date: '2026-06-01' },
  { id: 8, name: 'Sana Tariq', cnic: '42201-8901234-8', phase: 'Phase 4', province: 'Sindh', status: 'payment_verified', date: '2026-06-10' },
  { id: 9, name: 'Omar Farooq', cnic: '35201-9012345-9', phase: 'Phase 1', province: 'Punjab', status: 'test_completed', date: '2026-03-22' },
  { id: 10, name: 'Hira Batool', cnic: '42201-0123456-0', phase: 'Phase 2', province: 'Sindh', status: 'payment_pending', date: '2026-04-15' },
];

export default function StudentsManagementPage() {
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = studentsData.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.cnic.includes(search);
    const matchPhase = !phaseFilter || s.phase === phaseFilter;
    const matchProvince = !provinceFilter || s.province === provinceFilter;
    const matchStatus = !statusFilter || s.status === statusFilter;
    return matchSearch && matchPhase && matchProvince && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
            <button className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors">
              <UserPlus size={18} />
              Add Student
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[280px]">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or CNIC..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] outline-none"
              />
            </div>
            <select value={phaseFilter} onChange={(e) => setPhaseFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
              <option value="">All Phases</option>
              <option>Phase 1</option>
              <option>Phase 2</option>
              <option>Phase 3</option>
              <option>Phase 4</option>
            </select>
            <select value={provinceFilter} onChange={(e) => setProvinceFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
              <option value="">All Provinces</option>
              <option>Punjab</option>
              <option>Sindh</option>
              <option>KPK</option>
              <option>Balochistan</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
              <option value="">All Status</option>
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <Download size={16} />
              Export CSV
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">#</th>
                    <th className="text-left px-5 py-3 font-medium">Name</th>
                    <th className="text-left px-5 py-3 font-medium">CNIC</th>
                    <th className="text-left px-5 py-3 font-medium">Phase</th>
                    <th className="text-left px-5 py-3 font-medium">Province</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Reg. Date</th>
                    <th className="text-left px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((student, i) => (
                    <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3 text-gray-500">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{student.name}</td>
                      <td className="px-5 py-3 text-gray-600 font-mono text-xs">{student.cnic}</td>
                      <td className="px-5 py-3 text-gray-600">{student.phase}</td>
                      <td className="px-5 py-3 text-gray-600">{student.province}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[student.status]}`}>
                          {statusLabels[student.status]}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{student.date}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="View">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-10 text-gray-400">No students found.</td>
                    </tr>
                  )}
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
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
