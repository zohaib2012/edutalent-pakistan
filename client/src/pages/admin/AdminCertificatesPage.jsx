import { useState, useEffect } from 'react';
import { Award, Search, CheckCircle, FileCheck, Loader2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api from '../../services/api';

const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white transition-colors";

export default function AdminCertificatesPage() {
  const [certNumber, setCertNumber] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/certificates/types');
      setCertificates(res.data || []);
    } catch {
      setCertificates([]);
    }
  };

  const handleVerify = async () => {
    if (!certNumber.trim()) return;
    try {
      const res = await api.get(`/certificates/verify/${certNumber.trim()}`);
      setVerifyResult(res.data?.valid ? 'valid' : 'invalid');
    } catch {
      setVerifyResult('invalid');
    }
  };

  const generateAll = async () => {
    if (!selectedPhase) { alert('Select a phase'); return; }
    try {
      const res = await api.post(`/certificates/generate-bulk/${selectedPhase}`);
      alert(res.data?.message || 'Certificates generated');
    } catch (err) {
      alert(err.response?.data?.message || 'Generation failed');
    }
  };

  const certificateTypes = Array.isArray(certificates) ? certificates : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-[#1A73E8]/10 rounded-lg"><Award size={24} className="text-[#1A73E8]" /></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Certificate Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Generate, verify and manage student certificates</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle size={18} className="text-[#2ECC71]" /> Verify Certificate
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-xl">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Enter certificate number..." value={certNumber}
                  onChange={(e) => { setCertNumber(e.target.value); setVerifyResult(null); }}
                  className={inputClass + " pl-9"} />
              </div>
              <button onClick={handleVerify} className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0]">Verify</button>
              {verifyResult && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${verifyResult === 'valid' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {verifyResult === 'valid' ? 'Valid Certificate' : 'Not Found'}
                </span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileCheck size={18} className="text-[#1A73E8]" /> Generate Certificates
            </h3>
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Phase</label>
                <select value={selectedPhase} onChange={(e) => setSelectedPhase(e.target.value)} className={inputClass + " min-w-[180px]"}>
                  <option value="">Select Phase</option>
                </select>
              </div>
              <button onClick={generateAll} className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0]">Generate All</button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Certificate Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {certificateTypes.length === 0 ? (
                <p className="text-sm text-gray-400 col-span-3">No certificate types configured.</p>
              ) : certificateTypes.map((ct, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900">{ct.label || ct.type}</p>
                  <p className="text-xs text-gray-500 mt-1">{ct.description || '-'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
