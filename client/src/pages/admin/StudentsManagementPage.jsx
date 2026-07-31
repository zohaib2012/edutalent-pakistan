import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, UserPlus, Loader2, Trash2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api from '../../services/api';

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

export default function StudentsManagementPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = { page: currentPage, limit: itemsPerPage };
      if (search) params.search = search;
      if (phaseFilter) params.phase = phaseFilter;
      if (statusFilter) params.status = statusFilter;
      const res = await api.get('/students', { params });
      setStudents(res.data.students || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, phaseFilter, statusFilter]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this student?')) return;
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch {
      alert('Failed to delete');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
            <button className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors">
              <UserPlus size={18} /> Add Student
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[280px]">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search by name or CNIC..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] outline-none" />
            </div>
            <select value={phaseFilter} onChange={(e) => setPhaseFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
              <option value="">All Phases</option>
            </select>
            <select value={provinceFilter} onChange={(e) => setProvinceFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
              <option value="">All Provinces</option>
              <option>Sindh</option><option>Punjab</option><option>KPK</option><option>Balochistan</option><option>AJK</option><option>GB</option><option>Islamabad</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
              <option value="">All Status</option>
              {Object.entries(statusLabels).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
            </select>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">#</th>
                    <th className="text-left px-5 py-3 font-medium">Name</th>
                    <th className="text-left px-5 py-3 font-medium">Registration #</th>
                    <th className="text-left px-5 py-3 font-medium">Phase</th>
                    <th className="text-left px-5 py-3 font-medium">Province</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Reg. Date</th>
                    <th className="text-left px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={8} className="text-center py-10"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></td></tr>
                  ) : students.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-10 text-gray-400">No students found.</td></tr>
                  ) : students.map((s, i) => (
                    <tr key={s._id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3 text-gray-500">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{s.fullName}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-600">{s.registrationNumber}</td>
                      <td className="px-5 py-3 text-gray-600">{s.phaseId?.name || '-'}</td>
                      <td className="px-5 py-3 text-gray-600">{s.province || '-'}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[s.status] || 'bg-gray-100 text-gray-700'}`}>
                          {statusLabels[s.status] || s.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '-'}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
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
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
