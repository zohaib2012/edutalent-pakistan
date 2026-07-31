import { useState, useEffect } from 'react';
import { Download, Search, ChevronLeft, ChevronRight, Ticket, CheckCircle, Clock, Loader2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api from '../../services/api';

export default function SlipManagementPage() {
  const [slips, setSlips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { fetchSlips(); }, []);

  const fetchSlips = async () => {
    setLoading(true);
    try {
      const res = await api.get('/slips/all');
      setSlips(res.data || []);
    } catch {
      setSlips([]);
    } finally {
      setLoading(false);
    }
  };

  const generateSlip = async (studentId) => {
    try {
      const res = await api.post(`/slips/generate/${studentId}`);
      alert(res.data?.message || 'Slip generated');
      fetchSlips();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to generate slip');
    }
  };

  const generateBulk = async () => {
    try {
      const res = await api.post('/slips/generate-bulk', {});
      alert(res.data?.message || 'Bulk generation done');
      fetchSlips();
    } catch (err) {
      alert(err.response?.data?.message || 'Bulk generation failed');
    }
  };

  const filtered = slips.filter((s) =>
    (s.fullName || '').toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Slip Management</h1>
            <button onClick={generateBulk} className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors">
              <Ticket size={18} /> Generate All Slips
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search student..." value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] outline-none" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">#</th>
                    <th className="text-left px-5 py-3 font-medium">Student</th>
                    <th className="text-left px-5 py-3 font-medium">Roll Number</th>
                    <th className="text-left px-5 py-3 font-medium">Phase</th>
                    <th className="text-left px-5 py-3 font-medium">Test Date</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} className="text-center py-10"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></td></tr>
                  ) : paginated.length === 0 ? (
                    <tr><td colSpan={7} className="text-center py-10 text-gray-400">No slips found.</td></tr>
                  ) : paginated.map((s, i) => {
                    const hasSlip = s.rollNoSlip?.rollNumber;
                    return (
                      <tr key={s._id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-3 text-gray-500">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                        <td className="px-5 py-3 font-medium text-gray-900">{s.fullName}</td>
                        <td className="px-5 py-3 font-mono text-xs text-gray-600">{hasSlip || '-'}</td>
                        <td className="px-5 py-3 text-gray-600">{s.phaseId?.name || '-'}</td>
                        <td className="px-5 py-3 text-gray-600">{hasSlip ? new Date(s.rollNoSlip.testDate).toLocaleDateString() : '-'}</td>
                        <td className="px-5 py-3">
                          {hasSlip ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                              <CheckCircle size={12} /> Generated
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                              <Clock size={12} /> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          {hasSlip ? (
                            <span className="text-xs text-green-600">Issued</span>
                          ) : (
                            <button onClick={() => generateSlip(s._id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-[#1A73E8] text-white rounded-lg text-xs font-medium hover:bg-[#1557B0] transition-colors">
                              <Ticket size={14} /> Generate
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Page {currentPage} of {totalPages || 1}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"><ChevronLeft size={16} /></button>
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
