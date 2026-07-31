import { useState, useEffect } from 'react';
import { Download, Upload, CheckCircle, XCircle, Clock, AlertCircle, Smartphone, Landmark, Calendar, Loader2 } from 'lucide-react';
import { getStudentProfile, uploadChallan } from '../../services/api';

const statusConfig = {
  challan_issued: { label: 'Challan Issued', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  payment_pending: { label: 'Payment Pending', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  payment_verified: { label: 'Payment Verified', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50 border-green-200' },
  slip_issued: { label: 'Slip Issued', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50 border-green-200' },
  test_completed: { label: 'Test Completed', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50 border-green-200' },
  result_published: { label: 'Result Published', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50 border-green-200' },
};

const ChallanDownloadPage = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paidChallan, setPaidChallan] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const handlePaidChallanUpload = async () => {
    if (!paidChallan) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('challanImage', paidChallan);
      await uploadChallan(fd);
      await fetchStudentData();
      setPaidChallan(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    } finally { setUploading(false); }
  };

  const handleDownloadChallanPDF = () => {
    if (!studentData) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>Fee Challan - ${challan.challanNumber || ''}</title>
      <style>
        @page { margin: 15mm; size: A4 portrait; }
        body { font-family: 'Arial', sans-serif; padding: 30px; color: #222; }
        .header { text-align: center; border-bottom: 3px solid #1A73E8; padding-bottom: 15px; margin-bottom: 20px; }
        .header h1 { color: #1A73E8; font-size: 22px; margin: 0; letter-spacing: 1px; }
        .header p { color: #666; font-size: 11px; margin: 3px 0 0; }
        .challan-title { text-align: center; font-size: 15px; font-weight: bold; color: #1A73E8; margin: 15px 0; display: inline-block; padding: 5px 25px; border: 1px solid #1A73E8; background: #f0f6ff; }
        table { width: 100%; border-collapse: collapse; margin: 12px 0; }
        td, th { border: 1px solid #ccc; padding: 7px 10px; font-size: 12px; text-align: left; }
        td.label { font-weight: bold; background: #f5f5f5; width: 35%; font-size: 11px; text-transform: uppercase; color: #555; }
        td.value { font-weight: 600; }
        .amount-box { text-align: center; border: 2px solid #1A73E8; border-radius: 8px; padding: 15px; margin: 15px 0; background: #f8fbff; }
        .amount-box .amount { font-size: 32px; font-weight: bold; color: #1A73E8; }
        .footer { margin-top: 25px; padding-top: 12px; border-top: 2px solid #ddd; text-align: center; font-size: 10px; color: #999; }
        .payment-methods { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
        .payment-method { border: 1px solid #ddd; padding: 6px 12px; font-size: 11px; border-radius: 4px; background: #f9f9f9; }
        .tear-line { border-top: 2px dashed #ccc; margin: 20px 0; position: relative; text-align: center; }
        .tear-line span { background: #fff; padding: 0 10px; position: relative; top: -9px; font-size: 11px; color: #999; }
        .bank-copy { border: 2px dashed #1A73E8; padding: 15px; margin-top: 20px; background: #fafcff; }
      </style></head><body>
      <div class="header"><h1>EDUTALENT PAKISTAN</h1><p>Scholarship Testing Program - Fee Challan</p></div>
      <div style="text-align:center;"><span class="challan-title">CHALLAN ${challan.challanNumber || ''}</span></div>
      <table><tr><td class="label">Student Name</td><td class="value">${studentData.fullName || ''}</td></tr>
      <tr><td class="label">Father's Name</td><td class="value">${studentData.fatherName || ''}</td></tr>
      <tr><td class="label">Registration No</td><td class="value">${studentData.registrationNumber || ''}</td></tr>
      <tr><td class="label">CNIC / B-Form</td><td class="value">${studentData.cnicOrBform || ''}</td></tr>
      <tr><td class="label">Challan No</td><td class="value">${challan.challanNumber || ''}</td></tr>
      <tr><td class="label">Due Date</td><td class="value" style="color:#d32f2f;">${challan.dueDate ? new Date(challan.dueDate).toLocaleDateString() : ''}</td></tr></table>
      <div class="amount-box"><div style="font-size:11px;color:#666;margin-bottom:5px;">TOTAL FEE</div><div class="amount">PKR ${challan.amount || 1200}/-</div></div>
      <table><tr><td class="label">Bank</td><td class="value">${challan.bankDetails?.bankName || 'HBL (Habib Bank Limited)'}</td></tr>
      <tr><td class="label">Account Title</td><td class="value">${challan.bankDetails?.accountTitle || 'EduTalent Pakistan'}</td></tr>
      <tr><td class="label">Account Number</td><td class="value">${challan.bankDetails?.accountNumber || '1234-5678-9012-3456'}</td></tr></table>
      <div class="tear-line"><span>TEAR HERE - BANK COPY</span></div>
      <div class="bank-copy"><h3 style="margin:0 0 10px;font-size:13px;color:#1A73E8;">BANK USE ONLY</h3>
      <table><tr><td class="label">Challan No</td><td class="value">${challan.challanNumber || ''}</td></tr>
      <tr><td class="label">Amount</td><td class="value">PKR ${challan.amount || 1200}/-</td></tr></table>
      <div style="margin-top:10px;font-size:11px;color:#888;"><div>Deposit Date: _______________</div><div>Bank Officer Sign: _______________</div><div>Bank Stamp: _______________</div></div></div>
      <div class="footer">EduTalent Pakistan | www.edutalentpakistan.com | This is a system-generated challan.</div>
      </body></html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>;
  if (!studentData) return <div className="min-h-screen flex items-center justify-center text-gray-500">Please login to view challan.</div>;

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
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

            <div className="bg-white rounded-2xl shadow-sm border-2 border-primary/20 p-0 overflow-hidden">
              <div className="bg-primary text-white text-center py-4 px-6">
                <h2 className="text-lg font-heading font-bold">EDUTALENT PAKISTAN</h2>
                <p className="text-xs text-white/80 mt-1">Scholarship Fee Challan</p>
              </div>
              <div className="p-6 md:p-8 border-b-2 border-dashed border-gray-200">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Student Name</p><p className="text-base font-bold text-gray-800">{studentData.fullName}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Father's Name</p><p className="text-base font-bold text-gray-800">{studentData.fatherName}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Registration No</p><p className="text-sm font-semibold text-gray-800">{studentData.registrationNumber}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">CNIC / B-Form</p><p className="text-sm font-semibold text-gray-800">{studentData.cnicOrBform}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Challan No</p><p className="text-sm font-semibold text-gray-800">{challan.challanNumber || 'N/A'}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Due Date</p><p className="text-sm font-semibold text-red-600">{challan.dueDate ? new Date(challan.dueDate).toLocaleDateString() : 'N/A'}</p></div>
                </div>
                <div className="bg-primary-50 rounded-xl p-5 text-center border border-primary-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Fee</p>
                  <p className="text-3xl md:text-4xl font-heading font-bold text-primary">PKR {challan.amount || 1200}/-</p>
                </div>
              </div>
            </div>

            {(status === 'challan_issued' || status === 'payment_pending') && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-lg font-heading font-bold text-gray-800 mb-2">Upload Paid Challan</h2>
                <p className="text-sm text-gray-500 mb-5">Pay at any HBL/UBL/Allied Bank branch and upload the paid challan here</p>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors"
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
            )}

            {status === 'payment_verified' && (
              <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
                <CheckCircle size={40} className="text-success mx-auto mb-2" />
                <p className="text-sm font-semibold text-green-700">Payment Verified Successfully</p>
                <p className="text-xs text-green-600 mt-1">You are now eligible for the test. Check your roll number slip.</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={handleDownloadChallanPDF} className="btn-primary w-full justify-center py-3">
                <Download size={18} /> Download Challan PDF
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChallanDownloadPage;