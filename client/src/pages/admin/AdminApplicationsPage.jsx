import { useState, useEffect } from 'react';
import { FileText, Eye, X, Users, UserPlus, Clock, CheckCircle, XCircle, Download, Search, MapPin, Phone, Mail, GraduationCap, Calendar, CreditCard, School, User, Loader2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api from '../../services/api';

const statusLabels = {
  registered: 'Registered', challan_issued: 'Challan Issued', payment_pending: 'Payment Pending',
  payment_verified: 'Payment Verified', slip_issued: 'Slip Issued', test_completed: 'Test Completed', result_published: 'Result Published',
};
const statusBadgeColors = {
  registered: 'bg-gray-100 text-gray-700', challan_issued: 'bg-blue-50 text-blue-700',
  payment_pending: 'bg-yellow-50 text-yellow-700', payment_verified: 'bg-green-50 text-green-700',
  slip_issued: 'bg-purple-50 text-purple-700', test_completed: 'bg-teal-50 text-teal-700', result_published: 'bg-emerald-50 text-emerald-700',
};

const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white transition-colors";
const detailLabelClass = "text-xs font-medium text-gray-500 uppercase tracking-wider";
const detailValueClass = "text-sm text-gray-900 font-medium";

export default function AdminApplicationsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewApp, setViewApp] = useState(null);

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = { limit: 50 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await api.get('/students', { params });
      setStudents(res.data?.students || []);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = students;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-[#1A73E8]/10 rounded-lg"><FileText size={24} className="text-[#1A73E8]" /></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Review and manage student applications</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search by name or CNIC..." value={search}
                  onChange={(e) => setSearch(e.target.value)} className={inputClass + " pl-9"} />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputClass + " min-w-[160px]"}>
                <option value="">All Status</option>
                {Object.entries(statusLabels).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
              </select>
              <button onClick={fetchStudents} className="bg-[#1A73E8] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0]">Search</button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Student</th>
                    <th className="text-left px-4 py-3 font-medium">Registration #</th>
                    <th className="text-left px-4 py-3 font-medium">Phase</th>
                    <th className="text-left px-4 py-3 font-medium">Province</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} className="text-center py-10"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-10 text-gray-400">No applications found.</td></tr>
                  ) : filtered.map((s) => (
                    <tr key={s._id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{s.fullName}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{s.registrationNumber}</td>
                      <td className="px-4 py-3 text-gray-600">{s.phaseId?.name || '-'}</td>
                      <td className="px-4 py-3 text-gray-600">{s.province || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadgeColors[s.status] || 'bg-gray-100 text-gray-700'}`}>
                          {statusLabels[s.status] || s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setViewApp(s)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#1A73E8] bg-[#1A73E8]/5 hover:bg-[#1A73E8]/10 text-xs font-medium">
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {viewApp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#1A73E8]/10 flex items-center justify-center">
                      <User size={22} className="text-[#1A73E8]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{viewApp.fullName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadgeColors[viewApp.status] || ''}`}>
                        {statusLabels[viewApp.status] || viewApp.status}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setViewApp(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={20} /></button>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <User size={16} className="text-[#1A73E8]" /> Personal Information
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                      <div><span className={detailLabelClass}>Full Name</span><p className={detailValueClass}>{viewApp.fullName}</p></div>
                      <div><span className={detailLabelClass}>Father's Name</span><p className={detailValueClass}>{viewApp.fatherName}</p></div>
                      <div><span className={detailLabelClass}>CNIC</span><p className={detailValueClass + " font-mono"}>{viewApp.cnicOrBform}</p></div>
                      <div><span className={detailLabelClass}>DOB</span><p className={detailValueClass}>{viewApp.dateOfBirth ? new Date(viewApp.dateOfBirth).toLocaleDateString() : '-'}</p></div>
                      <div><span className={detailLabelClass}>Gender</span><p className={detailValueClass}>{viewApp.gender || '-'}</p></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <School size={16} className="text-[#1A73E8]" /> Academic Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div><span className={detailLabelClass}>Institution</span><p className={detailValueClass}>{viewApp.schoolOrCollege || '-'}</p></div>
                      <div><span className={detailLabelClass}>Grade</span><p className={detailValueClass}>{viewApp.grade || '-'}</p></div>
                      <div><span className={detailLabelClass}>Phase</span><p className={detailValueClass}>{viewApp.phaseId?.name || '-'}</p></div>
                      <div><span className={detailLabelClass}>Province</span><p className={detailValueClass}>{viewApp.province || '-'}</p></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Mail size={16} className="text-[#1A73E8]" /> Contact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /><span className="text-sm">{viewApp.mobileNumber || '-'}</span></div>
                      <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /><span className="text-sm">{viewApp.email || '-'}</span></div>
                      <div className="md:col-span-2 flex items-start gap-2"><MapPin size={14} className="text-gray-400 mt-0.5" /><span className="text-sm">{viewApp.address || '-'}</span></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CreditCard size={16} className="text-[#F1C40F]" /> Challan
                    </h4>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div><span className={detailLabelClass}>Challan #</span><p className={detailValueClass + " font-mono"}>{viewApp.challan?.challanNumber || '-'}</p></div>
                      <div><span className={detailLabelClass}>Amount</span><p className={detailValueClass}>Rs. {viewApp.challan?.amount || '-'}</p></div>
                      <div><span className={detailLabelClass}>Paid</span><p className={detailValueClass}>{viewApp.challan?.paymentVerified ? 'Yes' : 'No'}</p></div>
                      <div><span className={detailLabelClass}>Status</span><p className={detailValueClass}>{statusLabels[viewApp.status] || viewApp.status}</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
