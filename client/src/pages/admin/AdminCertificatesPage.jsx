import { useState, useEffect } from 'react';
import { Award, Search, CheckCircle, Loader2, Upload, X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { uploadCertificate } from '../../services/api';
import api from '../../services/api';

const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white transition-colors";

export default function AdminCertificatesPage() {
  const [certNumber, setCertNumber] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [certificates, setCertificates] = useState([]);

  // Upload state
  const [regNo, setRegNo] = useState('');
  const [cnic, setCnic] = useState('');
  const [certType, setCertType] = useState('participation');
  const [certFile, setCertFile] = useState(null);
  const [certFilePreview, setCertFilePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

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

  const handleUpload = async () => {
    if (!regNo && !cnic) { alert('Provide student registration number or CNIC/B-Form'); return; }
    if (!certFile) { alert('Please select a certificate file/image'); return; }
    setUploading(true);
    setUploadResult(null);
    try {
      const fd = new FormData();
      fd.append('registrationNumber', regNo);
      fd.append('cnic', cnic);
      fd.append('certificateType', certType);
      fd.append('certificateFile', certFile);
      const res = await uploadCertificate(fd);
      setUploadResult({ success: true, data: res.data });
    } catch (err) {
      setUploadResult({ success: false, message: err.response?.data?.message || 'Upload failed' });
    } finally {
      setUploading(false);
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
              <p className="text-sm text-gray-500 mt-0.5">Upload, verify and manage student certificates</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Upload size={18} className="text-[#1A73E8]" /> Upload Certificate
            </h3>
            <p className="text-xs text-gray-500 mb-4">Upload a certificate image/file against a student's Registration Number or CNIC/B-Form.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Registration Number</label>
                <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} placeholder="e.g. ETP-2026-P4-0007-JG6L" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">CNIC / B-Form</label>
                <input type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} placeholder="e.g. 12121-1212121-1" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Certificate Type</label>
                <select value={certType} onChange={(e) => setCertType(e.target.value)} className={inputClass}>
                  <option value="1st_position">1st Position</option>
                  <option value="top5">Top 5</option>
                  <option value="shield">Shield</option>
                  <option value="top20">Top 20</option>
                  <option value="appreciation">Appreciation</option>
                  <option value="participation">Participation</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Certificate File/Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-[#1A73E8] hover:bg-blue-50/30 transition-colors"
                  onClick={() => document.getElementById('cert-file-input').click()}>
                  {certFilePreview ? (
                    <div className="relative">
                      <img src={certFilePreview} alt="Certificate" className="h-20 w-auto object-contain mx-auto" />
                      <button onClick={(e) => { e.stopPropagation(); setCertFile(null); setCertFilePreview(''); }}
                        className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600"><X size={14} /></button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">{certFile ? certFile.name : 'Click to upload certificate image/PDF'}</p>
                  )}
                  <input id="cert-file-input" type="file" accept="image/*,.pdf" className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setCertFile(file);
                        if (file.type.startsWith('image/')) setCertFilePreview(URL.createObjectURL(file));
                        else setCertFilePreview('');
                      }
                    }} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={handleUpload} disabled={uploading}
                className="flex items-center gap-2 bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] disabled:opacity-50">
                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Upload Certificate
              </button>
              {uploadResult && (
                <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${uploadResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {uploadResult.success ? `Uploaded to ${uploadResult.data?.student?.name || 'student'}` : uploadResult.message}
                </span>
              )}
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
