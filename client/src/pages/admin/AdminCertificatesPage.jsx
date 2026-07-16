import { useState } from 'react';
import {
  Award, Trophy, Shield, Users, Star, FileBadge,
  Download, Search, CheckCircle, XCircle, FileCheck, Eye
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const statsData = [
  { icon: Award, label: 'Total Issued', value: '3,452', color: 'text-[#1A73E8]', bg: 'bg-[#1A73E8]/10' },
  { icon: Trophy, label: '1st Position', value: '128', color: 'text-[#F1C40F]', bg: 'bg-[#F1C40F]/10' },
  { icon: Star, label: 'Top 5', value: '640', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: Shield, label: 'Shield', value: '890', color: 'text-[#2ECC71]', bg: 'bg-[#2ECC71]/10' },
  { icon: Users, label: 'Top 20', value: '1,420', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: FileBadge, label: 'Participation', value: '374', color: 'text-sky-600', bg: 'bg-sky-50' },
];

const certificateData = [
  { id: 1, name: 'Ahmed Khan', certNo: 'EDT-2026-001234', type: '1st Position', issueDate: '2026-06-15', status: 'issued' },
  { id: 2, name: 'Fatima Ali', certNo: 'EDT-2026-001235', type: 'Top 5', issueDate: '2026-06-15', status: 'issued' },
  { id: 3, name: 'Usman Raza', certNo: 'EDT-2026-001236', type: 'Shield', issueDate: '2026-07-01', status: 'issued' },
  { id: 4, name: 'Zainab Ahmed', certNo: 'EDT-2026-001237', type: 'Top 20', issueDate: '2026-07-02', status: 'issued' },
  { id: 5, name: 'Hassan Shah', certNo: 'EDT-2026-001238', type: '1st Position', issueDate: '2026-07-05', status: 'pending' },
  { id: 6, name: 'Ayesha Khan', certNo: 'EDT-2026-001239', type: 'Participation', issueDate: '2026-07-06', status: 'issued' },
  { id: 7, name: 'Bilal Ahmed', certNo: 'EDT-2026-001240', type: 'Top 5', issueDate: '2026-07-08', status: 'pending' },
  { id: 8, name: 'Sana Tariq', certNo: 'EDT-2026-001241', type: 'Shield', issueDate: '2026-07-09', status: 'issued' },
  { id: 9, name: 'Omar Farooq', certNo: 'EDT-2026-001242', type: 'Top 20', issueDate: '2026-07-10', status: 'issued' },
  { id: 10, name: 'Hira Batool', certNo: 'EDT-2026-001243', type: 'Participation', issueDate: '2026-07-10', status: 'pending' },
];

const typeBadgeColors = {
  '1st Position': 'bg-[#F1C40F]/10 text-[#E6B800] border-[#F1C40F]/30',
  'Top 5': 'bg-purple-50 text-purple-700 border-purple-200',
  Shield: 'bg-[#2ECC71]/10 text-[#25A35A] border-[#2ECC71]/30',
  'Top 20': 'bg-amber-50 text-amber-700 border-amber-200',
  Participation: 'bg-sky-50 text-sky-700 border-sky-200',
};

const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] bg-white transition-colors";

export default function AdminCertificatesPage() {
  const [certNumber, setCertNumber] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');
  const [selectedAll, setSelectedAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [verifyResult, setVerifyResult] = useState(null);

  const handleVerify = () => {
    if (!certNumber.trim()) return setVerifyResult(null);
    const found = certificateData.find(c => c.certNo.toLowerCase() === certNumber.trim().toLowerCase());
    setVerifyResult(found ? 'valid' : 'invalid');
  };

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedAll) { setSelected([]); setSelectedAll(false); }
    else { setSelected(filtered.map(c => c.id)); setSelectedAll(true); }
  };

  const filtered = certificateData.filter((c) => {
    const matchPhase = !phaseFilter || true;
    const matchType = !typeFilter || c.type === typeFilter;
    return matchPhase && matchType;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-[#1A73E8]/10 rounded-lg">
              <Award size={24} className="text-[#1A73E8]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Certificate Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Generate, verify and manage student certificates</p>
            </div>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
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

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle size={18} className="text-[#2ECC71]" />
                Verify Certificate
              </h3>
              {verifyResult && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  verifyResult === 'valid' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {verifyResult === 'valid' ? 'Valid Certificate' : 'Certificate Not Found'}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-xl">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter certificate number (e.g. EDT-2026-001234)..."
                  value={certNumber}
                  onChange={(e) => { setCertNumber(e.target.value); setVerifyResult(null); }}
                  className={inputClass + " pl-9"}
                />
              </div>
              <button
                onClick={handleVerify}
                className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors whitespace-nowrap"
              >
                Verify
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileCheck size={18} className="text-[#1A73E8]" />
              Generate Certificates
            </h3>
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Phase</label>
                <select
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value)}
                  className={inputClass + " min-w-[180px]"}
                >
                  <option value="">Select Phase</option>
                  <option>Phase 1</option>
                  <option>Phase 2</option>
                  <option>Phase 3</option>
                  <option>Phase 4</option>
                </select>
              </div>
              <button className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors whitespace-nowrap">
                Generate All Certificates
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value)}
                className={inputClass + " min-w-[160px]"}
              >
                <option value="">All Phases</option>
                <option>Phase 1</option>
                <option>Phase 2</option>
                <option>Phase 3</option>
                <option>Phase 4</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={inputClass + " min-w-[180px]"}
              >
                <option value="">All Certificate Types</option>
                <option>1st Position</option>
                <option>Top 5</option>
                <option>Shield</option>
                <option>Top 20</option>
                <option>Participation</option>
              </select>
              <div className="flex items-center gap-3 ml-auto">
                <button className="flex items-center gap-2 border border-[#1A73E8] text-[#1A73E8] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1A73E8]/5 transition-colors">
                  Bulk Generate
                </button>
                <button className="flex items-center gap-2 bg-[#2ECC71] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#25A35A] transition-colors">
                  <Download size={16} />
                  Bulk Download
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">
                      <input
                        type="checkbox"
                        checked={selectedAll}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                      />
                    </th>
                    <th className="text-left px-4 py-3 font-medium">#</th>
                    <th className="text-left px-4 py-3 font-medium">Student Name</th>
                    <th className="text-left px-4 py-3 font-medium">Certificate #</th>
                    <th className="text-left px-4 py-3 font-medium">Type</th>
                    <th className="text-left px-4 py-3 font-medium">Issue Date</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((cert, i) => (
                    <tr key={cert.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.includes(cert.id)}
                          onChange={() => toggleSelect(cert.id)}
                          className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                        />
                      </td>
                      <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{cert.name}</td>
                      <td className="px-4 py-3 text-gray-600 font-mono text-xs">{cert.certNo}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${typeBadgeColors[cert.type]}`}>
                          {cert.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{cert.issueDate}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cert.status === 'issued'
                            ? 'bg-[#2ECC71]/10 text-[#25A35A]'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}>
                          {cert.status === 'issued' ? 'Issued' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-[#1A73E8] transition-colors" title="View">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-green-50 text-[#2ECC71] transition-colors" title="Download">
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-10 text-gray-400">No certificates found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
