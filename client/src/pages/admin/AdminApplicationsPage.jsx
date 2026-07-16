import { useState } from 'react';
import {
  FileText, Eye, X, Users, UserPlus, Clock, CheckCircle,
  XCircle, Download, Search, ChevronDown, MapPin, Phone,
  Mail, GraduationCap, Calendar, CreditCard, School, User
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const statsData = [
  { icon: FileText, label: 'Total Applications', value: '8,421', color: 'text-[#1A73E8]', bg: 'bg-[#1A73E8]/10' },
  { icon: UserPlus, label: 'New Today', value: '47', color: 'text-[#2ECC71]', bg: 'bg-[#2ECC71]/10' },
  { icon: Clock, label: 'Pending Review', value: '312', color: 'text-[#F1C40F]', bg: 'bg-[#F1C40F]/10' },
  { icon: CheckCircle, label: 'Approved', value: '5,892', color: 'text-[#2ECC71]', bg: 'bg-[#2ECC71]/10' },
  { icon: XCircle, label: 'Rejected', value: '184', color: 'text-red-500', bg: 'bg-red-50' },
];

const statusBadgeColors = {
  registered: 'bg-gray-100 text-gray-700',
  verification_pending: 'bg-yellow-50 text-yellow-700',
  approved: 'bg-[#2ECC71]/10 text-[#25A35A]',
  rejected: 'bg-red-50 text-red-600',
};

const statusLabels = {
  registered: 'Registered',
  verification_pending: 'Verification Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

const applicationsData = [
  { id: 1, name: 'Ahmed Khan', cnic: '42201-1234567-1', phase: 'Phase 1', province: 'Sindh', date: '2026-07-10', status: 'approved', father: 'Muhammad Khan', dob: '2008-04-15', gender: 'Male', phone: '0300-1234567', email: 'ahmed.khan@email.com', address: 'House #23, Street 5, Gulshan-e-Iqbal, Karachi', institution: 'Beaconhouse School System', grade: '9th', challanNo: 'CH-2304', challanAmount: '1,500', photo: null },
  { id: 2, name: 'Fatima Ali', cnic: '35201-2345678-2', phase: 'Phase 1', province: 'Punjab', date: '2026-07-10', status: 'verification_pending', father: 'Ali Raza', dob: '2009-01-22', gender: 'Female', phone: '0301-2345678', email: 'fatima.ali@email.com', address: 'House #45, Model Town, Lahore', institution: 'Lahore Grammar School', grade: '8th', challanNo: 'CH-2305', challanAmount: '1,500', photo: null },
  { id: 3, name: 'Usman Raza', cnic: '42201-3456789-3', phase: 'Phase 2', province: 'Sindh', date: '2026-07-09', status: 'approved', father: 'Raza Ahmed', dob: '2008-09-10', gender: 'Male', phone: '0302-3456789', email: 'usman.raza@email.com', address: 'Flat #12, Block B, North Nazimabad, Karachi', institution: 'Happy Home School', grade: '9th', challanNo: 'CH-2306', challanAmount: '2,000', photo: null },
  { id: 4, name: 'Zainab Ahmed', cnic: '13101-4567890-4', phase: 'Phase 2', province: 'KPK', date: '2026-07-09', status: 'registered', father: 'Ahmed Gul', dob: '2009-06-05', gender: 'Female', phone: '0303-4567890', email: 'zainab.ahmed@email.com', address: 'Street #3, University Town, Peshawar', institution: 'Frontier Model School', grade: '8th', challanNo: '—', challanAmount: '—', photo: null },
  { id: 5, name: 'Hassan Shah', cnic: '42201-5678901-5', phase: 'Phase 3', province: 'Sindh', date: '2026-07-08', status: 'approved', father: 'Shah Nawaz', dob: '2008-03-18', gender: 'Male', phone: '0304-5678901', email: 'hassan.shah@email.com', address: 'B-15, Shah Faisal Colony, Karachi', institution: 'Bahria Foundation College', grade: '10th', challanNo: 'CH-2307', challanAmount: '2,500', photo: null },
  { id: 6, name: 'Ayesha Khan', cnic: '35201-6789012-6', phase: 'Phase 3', province: 'Punjab', date: '2026-07-08', status: 'verification_pending', father: 'Khan Bahadur', dob: '2009-11-30', gender: 'Female', phone: '0305-6789012', email: 'ayesha.khan@email.com', address: 'Sector F, DHA Phase 2, Islamabad', institution: 'Roots Millennium School', grade: '8th', challanNo: 'CH-2308', challanAmount: '2,500', photo: null },
  { id: 7, name: 'Bilal Ahmed', cnic: '05101-7890123-7', phase: 'Phase 4', province: 'Balochistan', date: '2026-07-07', status: 'rejected', father: 'Ahmed Baloch', dob: '2008-07-12', gender: 'Male', phone: '0306-7890123', email: 'bilal.ahmed@email.com', address: 'Jinnah Road, Quetta Cantt', institution: 'St. Francis Grammar School', grade: '9th', challanNo: 'CH-2309', challanAmount: '3,000', photo: null },
  { id: 8, name: 'Sana Tariq', cnic: '42201-8901234-8', phase: 'Phase 4', province: 'Sindh', date: '2026-07-07', status: 'approved', father: 'Tariq Mehmood', dob: '2009-04-20', gender: 'Female', phone: '0307-8901234', email: 'sana.tariq@email.com', address: 'C-42, Block 6, F.B. Area, Karachi', institution: 'Dawood Public School', grade: '8th', challanNo: 'CH-2310', challanAmount: '3,000', photo: null },
];

const recentActivity = [
  { id: 1, name: 'Ahmed Khan', action: 'Application Approved', time: '2 min ago', status: 'approved' },
  { id: 2, name: 'Fatima Ali', action: 'New Registration', time: '15 min ago', status: 'verification_pending' },
  { id: 3, name: 'Usman Raza', action: 'Payment Verified', time: '1 hour ago', status: 'approved' },
  { id: 4, name: 'Zainab Ahmed', action: 'Document Submitted', time: '2 hours ago', status: 'registered' },
  { id: 5, name: 'Bilal Ahmed', action: 'Application Rejected', time: '3 hours ago', status: 'rejected' },
];

const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] bg-white transition-colors";

const detailLabelClass = "text-xs font-medium text-gray-500 uppercase tracking-wider";
const detailValueClass = "text-sm text-gray-900 font-medium";

export default function AdminApplicationsPage() {
  const [phaseFilter, setPhaseFilter] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState([]);
  const [viewApp, setViewApp] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = applicationsData.filter((a) => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.cnic.includes(search);
    const matchPhase = !phaseFilter || a.phase === phaseFilter;
    const matchProvince = !provinceFilter || a.province === provinceFilter;
    const matchStatus = !statusFilter || a.status === statusFilter;
    return matchSearch && matchPhase && matchProvince && matchStatus;
  });

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-[#1A73E8]/10 rounded-lg">
              <FileText size={24} className="text-[#1A73E8]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Review and manage student applications</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {statsData.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-2`}>
                  <stat.icon size={18} className={stat.color} />
                </div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or CNIC..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className={inputClass + " pl-9"}
                    />
                  </div>
                  <select value={phaseFilter} onChange={(e) => setPhaseFilter(e.target.value)} className={inputClass + " min-w-[140px]"}>
                    <option value="">All Phases</option>
                    <option>Phase 1</option>
                    <option>Phase 2</option>
                    <option>Phase 3</option>
                    <option>Phase 4</option>
                  </select>
                  <select value={provinceFilter} onChange={(e) => setProvinceFilter(e.target.value)} className={inputClass + " min-w-[140px]"}>
                    <option value="">All Provinces</option>
                    <option>Punjab</option>
                    <option>Sindh</option>
                    <option>KPK</option>
                    <option>Balochistan</option>
                  </select>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputClass + " min-w-[160px]"}>
                    <option value="">All Status</option>
                    {Object.entries(statusLabels).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="date" className={inputClass + " pl-10"} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="text-left px-4 py-3 font-medium">#</th>
                        <th className="text-left px-4 py-3 font-medium">Student Name</th>
                        <th className="text-left px-4 py-3 font-medium">CNIC</th>
                        <th className="text-left px-4 py-3 font-medium">Phase</th>
                        <th className="text-left px-4 py-3 font-medium">Province</th>
                        <th className="text-left px-4 py-3 font-medium">App. Date</th>
                        <th className="text-left px-4 py-3 font-medium">Status</th>
                        <th className="text-left px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((app, i) => (
                        <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selected.includes(app.id)}
                              onChange={() => toggleSelect(app.id)}
                              className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                            />
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900">{app.name}</td>
                          <td className="px-4 py-3 text-gray-600 font-mono text-xs">{app.cnic}</td>
                          <td className="px-4 py-3 text-gray-600">{app.phase}</td>
                          <td className="px-4 py-3 text-gray-600">{app.province}</td>
                          <td className="px-4 py-3 text-gray-600">{app.date}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadgeColors[app.status]}`}>
                              {statusLabels[app.status]}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => setViewApp(app)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#1A73E8] bg-[#1A73E8]/5 hover:bg-[#1A73E8]/10 text-xs font-medium transition-colors"
                            >
                              <Eye size={14} /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={8} className="text-center py-10 text-gray-400">No applications found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {selected.length > 0 && (
                <div className="flex items-center gap-3 mt-4 p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-sm text-gray-500">{selected.length} selected</span>
                  <button className="flex items-center gap-2 bg-[#2ECC71] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#25A35A] transition-colors">
                    <CheckCircle size={16} /> Approve Selected
                  </button>
                  <button className="flex items-center gap-2 border border-[#1A73E8] text-[#1A73E8] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1A73E8]/5 transition-colors">
                    <Download size={16} /> Export Selected
                  </button>
                </div>
              )}
            </div>

            <div className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <Clock size={16} className="text-[#1A73E8]" />
                    Recent Activity
                  </h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {recentActivity.map((act) => (
                    <div key={act.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{act.name}</p>
                          <p className="text-xs text-gray-500">{act.action}</p>
                        </div>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${
                          act.status === 'approved' ? 'bg-[#2ECC71]/10 text-[#25A35A]' :
                          act.status === 'rejected' ? 'bg-red-50 text-red-600' :
                          act.status === 'verification_pending' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {statusLabels[act.status]}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">{act.time}</p>
                    </div>
                  ))}
                </div>
              </div>
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
                      <h3 className="text-lg font-semibold text-gray-900">{viewApp.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadgeColors[viewApp.status]}`}>
                        {statusLabels[viewApp.status]}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setViewApp(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <User size={16} className="text-[#1A73E8]" /> Personal Information
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                      <div><span className={detailLabelClass}>Full Name</span><p className={detailValueClass}>{viewApp.name}</p></div>
                      <div><span className={detailLabelClass}>Father's Name</span><p className={detailValueClass}>{viewApp.father}</p></div>
                      <div><span className={detailLabelClass}>CNIC</span><p className={detailValueClass + " font-mono"}>{viewApp.cnic}</p></div>
                      <div><span className={detailLabelClass}>Date of Birth</span><p className={detailValueClass}>{viewApp.dob}</p></div>
                      <div><span className={detailLabelClass}>Gender</span><p className={detailValueClass}>{viewApp.gender}</p></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <School size={16} className="text-[#1A73E8]" /> Academic Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div><span className={detailLabelClass}>Institution</span><p className={detailValueClass}>{viewApp.institution}</p></div>
                      <div><span className={detailLabelClass}>Grade / Class</span><p className={detailValueClass}>{viewApp.grade}</p></div>
                      <div><span className={detailLabelClass}>Phase</span><p className={detailValueClass}>{viewApp.phase}</p></div>
                      <div><span className={detailLabelClass}>Province</span><p className={detailValueClass}>{viewApp.province}</p></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Mail size={16} className="text-[#1A73E8]" /> Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /><span className="text-sm text-gray-900">{viewApp.phone}</span></div>
                      <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /><span className="text-sm text-gray-900">{viewApp.email}</span></div>
                      <div className="md:col-span-2 flex items-start gap-2"><MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" /><span className="text-sm text-gray-900">{viewApp.address}</span></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CreditCard size={16} className="text-[#F1C40F]" /> Challan Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div><span className={detailLabelClass}>Challan #</span><p className={detailValueClass + " font-mono"}>{viewApp.challanNo}</p></div>
                      <div><span className={detailLabelClass}>Amount</span><p className={detailValueClass}>Rs. {viewApp.challanAmount}</p></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <User size={16} className="text-[#1A73E8]" /> Photo
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="w-28 h-28 rounded-lg bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <User size={36} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
                  <button className="px-4 py-2.5 rounded-lg text-sm font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                    Reject Application
                  </button>
                  <button className="bg-[#2ECC71] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#25A35A] transition-colors">
                    Approve Application
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
