import { useState, useEffect } from 'react';
import { Trophy, Award, MapPin, Truck, CheckCircle, Search, ChevronLeft, ChevronRight, PieChart, Loader2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api from '../../services/api';

export default function AwardAssignmentPage() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { fetchAwards(); }, []);

  const fetchAwards = async () => {
    setLoading(true);
    try {
      const res = await api.get('/awards');
      setAwards(res.data || []);
    } catch {
      setAwards([]);
    } finally {
      setLoading(false);
    }
  };

  const markDelivered = async (studentId) => {
    try {
      await api.patch(`/awards/${studentId}/deliver`);
      fetchAwards();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to mark delivered');
    }
  };

  const filtered = awards.filter((a) =>
    (a.fullName || '').toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const deliveredCount = awards.filter((a) => a.award?.delivered).length;
  const pendingCount = awards.length - deliveredCount;
  const deliveredPct = awards.length > 0 ? ((deliveredCount / awards.length) * 100).toFixed(0) : 0;

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Award Assignment</h1>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-xs">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search student..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Awarded Students</h3>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-4 py-3 font-medium">Student</th>
                      <th className="text-left px-4 py-3 font-medium">Registration #</th>
                      <th className="text-left px-4 py-3 font-medium">Award Type</th>
                      <th className="text-left px-4 py-3 font-medium">Delivery</th>
                      <th className="text-left px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={5} className="text-center py-10"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></td></tr>
                    ) : paginated.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-10 text-gray-400">No awards assigned yet.</td></tr>
                    ) : paginated.map((a, i) => (
                      <tr key={a._id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{a.fullName}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600">{a.registrationNumber}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-gray-800">
                            <Award size={14} className="text-[#F1C40F]" />
                            {a.award?.title || a.award?.type || '-'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {a.award?.delivered ? (
                            <span className="inline-flex items-center gap-1 text-xs text-green-700 font-medium">
                              <CheckCircle size={12} /> Delivered
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-yellow-700 font-medium">
                              <Truck size={12} /> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {!a.award?.delivered && (
                            <button onClick={() => markDelivered(a._id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-[#2ECC71] text-white rounded-lg text-xs font-medium hover:bg-[#27AE60]">
                              <CheckCircle size={14} /> Mark Delivered
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span>Page {currentPage} of {totalPages || 1}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"><ChevronLeft size={16} /></button>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart size={16} className="text-[#1A73E8]" /> Award Distribution
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-36 h-36">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2ECC71" strokeWidth="3" strokeDasharray={`${deliveredPct} ${100 - deliveredPct}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{deliveredPct}%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" /> Delivered</span>
                  <span className="font-medium">{deliveredCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-gray-200" /> Pending</span>
                  <span className="font-medium">{pendingCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Truck size={16} className="text-[#1A73E8]" /> Delivery Tracking
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Student</th>
                    <th className="text-left px-4 py-3 font-medium">Award</th>
                    <th className="text-left px-4 py-3 font-medium">Address</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-10 text-gray-400">No delivery data.</td></tr>
                  ) : filtered.map((a) => (
                    <tr key={a._id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{a.fullName}</td>
                      <td className="px-4 py-3 text-gray-600">{a.award?.title || a.award?.type || '-'}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-[180px] truncate">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {a.address || a.city || '-'}</span>
                      </td>
                      <td className="px-4 py-3">
                        {a.award?.delivered ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-700 font-medium"><CheckCircle size={12} /> Delivered</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-yellow-700 font-medium"><Truck size={12} /> Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
