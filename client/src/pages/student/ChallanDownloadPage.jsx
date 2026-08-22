import { useState, useEffect } from 'react';
import { Download, Upload, CheckCircle, Clock, AlertCircle, Landmark, Loader2, Banknote, ImagePlus } from 'lucide-react';
import { getStudentProfile, postFormData } from '../../services/api';
import { downloadChallanPDF } from '../../utils/challanPDF';
import logo from '../../assets/images/logo.jpeg';

const statusConfig = {
  challan_issued: { label: 'Challan Issued', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  payment_pending: { label: 'Payment Pending', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  payment_verified: { label: 'Payment Verified', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50 border-green-200' },
  slip_issued: { label: 'Slip Issued', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50 border-green-200' },
  test_issued: { label: 'Test Issued', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50 border-green-200' },
  test_completed: { label: 'Test Completed', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50 border-green-200' },
  result_published: { label: 'Result Published', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50 border-green-200' },
};

const paymentSteps = [
  { title: 'Download Challan', desc: 'Download your fee challan' },
  { title: 'Pay at Bank', desc: 'HBL / UBL / Allied Bank' },
  { title: 'Upload Receipt', desc: 'Submit paid challan online' },
  { title: 'Get Verified', desc: 'We verify within 24h' },
];

const ChallanDownloadPage = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paidChallan, setPaidChallan] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => { fetchStudentData(); }, []);

  const fetchStudentData = async () => {
    try {
      const res = await getStudentProfile();
      setStudentData(res.data);
    } catch { setStudentData(null); }
    finally { setLoading(false); }
  };

  const challan = studentData?.challan || {};
  const status = studentData?.status || 'challan_issued';
  const cfg = statusConfig[status] || statusConfig.challan_issued;
  const StatusIcon = cfg.icon;
  const isChallanPaid = !!challan.isPaid;

  const handlePaidChallanUpload = async () => {
    if (!paidChallan) return;
    setUploading(true);
    setUploadSuccess(false);
    try {
      const fd = new FormData();
      fd.append('challanImage', paidChallan);
      await postFormData('/payments/upload', fd);
      await fetchStudentData();
      setPaidChallan(null);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 6000);
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    } finally { setUploading(false); }
  };

  const handleDownloadChallanPDF = () => {
    if (!studentData) return;
    const bank = challan.bankDetails || {};
    const phaseName = typeof studentData.phaseId === 'object' && studentData.phaseId?.name
      ? studentData.phaseId.name
      : studentData.phase || 'N/A';
    downloadChallanPDF({
      challanNumber: challan.challanNumber,
      registrationNumber: studentData.registrationNumber,
      fullName: studentData.fullName,
      fatherName: studentData.fatherName,
      cnicOrBform: studentData.cnicOrBform,
      mobileNumber: studentData.mobileNumber,
      email: studentData.email,
      phase: phaseName,
      grade: studentData.grade,
      dueDate: challan.dueDate,
      amount: challan.amount || 1200,
      bank,
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>;
  if (!studentData) return <div className="min-h-screen flex items-center justify-center text-gray-500">Please login to view challan.</div>;

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-4">
            <Landmark size={16} className="text-gold" />
            <span>Fee Payment</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Fee Challan</h1>
          <p className="text-white/80">Download and pay your fee challan</p>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className={`flex items-center gap-3 p-4 rounded-xl border ${cfg.bg}`}>
              <StatusIcon size={24} className={cfg.color} />
              <div>
                <p className="text-sm font-semibold">Status: <span className={cfg.color}>{cfg.label}</span></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="relative bg-gradient-to-r from-primary via-primary-600 to-primary-700 px-6 md:px-8 py-5 overflow-hidden">
                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Banknote size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-heading font-bold text-white">EDUTALENT PAKISTAN</h2>
                      <p className="text-xs text-white/75">Scholarship Fee Challan</p>
                    </div>
                  </div>
                  <img src={logo} alt="EduTalent" className="h-10 w-10 rounded-lg object-cover bg-white p-0.5 hidden sm:block" />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-4 mb-5">
                  <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Student Name</p><p className="text-sm font-bold text-gray-800">{studentData.fullName}</p></div>
                  <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Father's Name</p><p className="text-sm font-bold text-gray-800">{studentData.fatherName}</p></div>
                  <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Registration No</p><p className="text-sm font-semibold text-gray-800">{studentData.registrationNumber}</p></div>
                  <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">CNIC / B-Form</p><p className="text-sm font-semibold text-gray-800">{studentData.cnicOrBform}</p></div>
                  <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Challan No</p><p className="text-sm font-semibold text-gray-800">{challan.challanNumber || 'N/A'}</p></div>
                  <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Due Date</p><p className="text-sm font-semibold text-red-600">{challan.dueDate ? new Date(challan.dueDate).toLocaleDateString() : 'N/A'}</p></div>
                </div>
                <div className="bg-gradient-to-r from-primary-50 to-gold-50 rounded-xl p-5 text-center border border-primary-100 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-primary/10"><Banknote size={80} /></div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Fee</p>
                  <p className="text-3xl md:text-4xl font-heading font-bold text-primary">PKR {challan.amount || 1200}/-</p>
                  <p className="text-[11px] text-gray-400 mt-1">Pay at any HBL / UBL / Allied Bank branch</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-heading font-bold text-gray-800 mb-4">How to Pay</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentSteps.map((step, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center mx-auto mb-2">{i + 1}</div>
                    <p className="text-xs font-semibold text-gray-800">{step.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {uploadSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle size={20} className="text-success shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-700">Challan Uploaded Successfully</p>
                  <p className="text-xs text-green-600 mt-0.5">Your paid challan has been submitted. Status will be verified by the administration shortly.</p>
                </div>
              </div>
            )}

            {isChallanPaid ? (
              <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
                <CheckCircle size={40} className="text-success mx-auto mb-2" />
                <p className="text-sm font-semibold text-green-700">Challan Uploaded</p>
                <p className="text-xs text-green-600 mt-1">Your paid challan has been received and is awaiting verification.</p>
              </div>
            ) : (
              (status === 'challan_issued' || status === 'payment_pending') && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <ImagePlus size={18} className="text-primary" />
                    <h2 className="text-lg font-heading font-bold text-gray-800">Upload Paid Challan</h2>
                  </div>
                  <p className="text-sm text-gray-500 mb-5">After paying at the bank, upload the paid challan image here for verification</p>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-primary-50/40 transition-colors"
                      onClick={() => document.getElementById('challan-upload').click()}>
                      <Upload size={28} className="text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">{paidChallan ? paidChallan.name : 'Click to upload paid challan image'}</p>
                      <p className="text-xs text-gray-400 mt-1">PDF or Image, max 5MB</p>
                      <input id="challan-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                        onChange={e => setPaidChallan(e.target.files[0] || null)} />
                    </div>
                    <button onClick={handlePaidChallanUpload} disabled={!paidChallan || uploading}
                      className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                      {uploading ? <><Loader2 size={18} className="animate-spin" /> Uploading...</> : 'Submit Paid Challan'}
                    </button>
                  </div>
                </div>
              )
            )}

            {status === 'payment_verified' && (
              <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
                <CheckCircle size={40} className="text-success mx-auto mb-2" />
                <p className="text-sm font-semibold text-green-700">Payment Verified Successfully</p>
                <p className="text-xs text-green-600 mt-1">You are now eligible for the test. Check your roll number slip.</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={handleDownloadChallanPDF} className="btn-primary w-full justify-center py-3 shadow-lg shadow-primary/20">
                <Download size={18} /> Download Challan PDF
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-yellow-700 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-800">Keep your challan safe</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    This challan is valid for 15 days from issue. The fee is non-refundable. You must bring the original
                    bank receipt on test day for verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChallanDownloadPage;
