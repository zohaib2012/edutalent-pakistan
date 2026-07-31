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
    const bank = challan.bankDetails || {};
    const amount = challan.amount || 1200;
    const dueDate = challan.dueDate ? new Date(challan.dueDate).toLocaleDateString() : 'N/A';
    const phase = studentData.phase || 'N/A';

    const copies = [
      { key: 'bank', label: 'BANK COPY', cls: 'label-bank' },
      { key: 'candidate', label: 'CANDIDATE COPY', cls: 'label-candidate' },
      { key: 'office', label: 'OFFICE COPY', cls: 'label-office' },
    ];

    const copyHTML = copies.map((c) => `
      <td class="copy-cell">
        <div class="logo-row">
          <div class="org-name">EDUTALENT PAKISTAN</div>
          <div class="org-tagline">Unlocking Brilliance, Rewarding Talent</div>
        </div>
        <div class="title-bar">Scholarship Application Fee Challan</div>
        <div class="accent-line"></div>
        <div class="challan-no">${challan.challanNumber || 'N/A'}</div>
        <div style="clear:both;">
          <div class="info-row"><div class="info-label">Reg No:</div><div class="info-value">${studentData.registrationNumber || 'N/A'}</div></div>
          <div class="info-row"><div class="info-label">Program:</div><div class="info-value">Scholarship Testing Program 2026</div></div>
          <div class="info-row"><div class="info-label">Phase:</div><div class="info-value">${phase}${studentData.grade ? ' - Grade ' + studentData.grade : ''}</div></div>
          <div class="info-row"><div class="info-label">Due Date:</div><div class="info-value" style="color:#dc2626;">${dueDate}</div></div>
        </div>
        <div class="section-header"><span class="bullet">•</span> Candidate Information</div>
        <div class="info-row"><div class="info-label">Name:</div><div class="info-value">${studentData.fullName || ''}</div></div>
        <div class="info-row"><div class="info-label">Father's Name:</div><div class="info-value">${studentData.fatherName || ''}</div></div>
        <div class="info-row"><div class="info-label">CNIC / B-Form:</div><div class="info-value">${studentData.cnicOrBform || 'N/A'}</div></div>
        <div class="info-row"><div class="info-label">Mobile:</div><div class="info-value">${studentData.mobileNumber || 'N/A'}</div></div>
        <div class="info-row"><div class="info-label">Email:</div><div class="info-value">${studentData.email || 'N/A'}</div></div>
        <div class="section-header"><span class="bullet">•</span> Fee Details</div>
        <div class="fee-table">
          <div class="fee-row"><div class="fee-label">Application Fee</div><div class="fee-value">Rs. ${amount}/-</div></div>
          <div class="fee-row"><div class="fee-label">Bank Charges</div><div class="fee-value">Rs. 0/-</div></div>
          <div class="fee-row fee-total"><div class="fee-label">Total Amount</div><div class="fee-value">Rs. ${amount}/-</div></div>
        </div>
        <div class="section-header"><span class="bullet">•</span> Bank Details</div>
        <div class="info-row"><div class="info-label">Bank:</div><div class="info-value">${bank.bankName || 'HBL (Habib Bank Limited)'}</div></div>
        <div class="info-row"><div class="info-label">Account Title:</div><div class="info-value">${bank.accountTitle || 'EduTalent Pakistan'}</div></div>
        <div class="info-row"><div class="info-label">Account No:</div><div class="info-value">${bank.accountNumber || 'N/A'}</div></div>
        <div class="info-row"><div class="info-label">Branch:</div><div class="info-value">${bank.branchCode || 'N/A'}</div></div>
        <div class="section-header"><span class="bullet">•</span> Payment Details</div>
        <div class="field-label">Deposit Date:</div>
        <div class="field-line"></div>
        <div class="field-label">Transaction ID / Slip No:</div>
        <div class="field-line"></div>
        <div class="field-label">Bank Stamp & Signature:</div>
        <div class="field-line"></div>
        <div class="section-header"><span class="bullet">•</span> Instructions</div>
        <ol class="instruction-list">
          <li>Bring original receipt at test center.</li>
          <li>Incomplete applications will not be accepted.</li>
          <li>After fee submission, upload paid challan online.</li>
          <li>Fee is non-refundable.</li>
        </ol>
        <div class="section-header"><span class="bullet">•</span> Terms &amp; Conditions</div>
        <ol class="instruction-list">
          <li>This challan is valid for 15 days from the date of issue.</li>
          <li>Challan is non-transferable and non-refundable.</li>
          <li>Candidates must bring original challan receipt on test day.</li>
          <li>Duplicate challans are not issued.</li>
        </ol>
        <div class="copy-label ${c.cls}">${c.label}</div>
      </td>
    `).join('');

    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>Fee Challan - ${challan.challanNumber || ''}</title>
      <style>
        @page { size: A4 landscape; margin: 6mm; }
        * { margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; font-size: 7.5pt; background: #fff; }
        .main-table { width: 100%; border-collapse: collapse; }
        .copy-cell { width: 33.33%; vertical-align: top; border: 1.5pt solid #1a2d4a; padding: 5pt; }
        .copy-cell + .copy-cell { border-left: 1pt dashed #94a3b8; }
        .logo-row { text-align: center; border-bottom: 2pt solid #1a2d4a; padding-bottom: 5pt; margin-bottom: 5pt; }
        .org-name { font-size: 10pt; font-weight: bold; color: #1a2d4a; letter-spacing: .3pt; }
        .org-tagline { font-size: 6.5pt; color: #64748b; letter-spacing: .5pt; margin-top: 1pt; }
        .title-bar { background-color: #1a2d4a; color: #fff; text-align: center; font-weight: bold; font-size: 8pt; padding: 3.5pt; margin-bottom: 5pt; letter-spacing: .3pt; }
        .accent-line { height: 1.5pt; background-color: #f6b13a; margin: 0 35% 4pt; }
        .challan-no { text-align: right; font-size: 7pt; font-weight: bold; margin-bottom: 4pt; color: #1a2d4a; }
        .info-row { display: table; width: 100%; border-bottom: .5pt solid #e2e8f0; margin-bottom: 1pt; }
        .info-label { display: table-cell; width: 38%; font-size: 7pt; color: #64748b; padding: 2pt 0; font-weight: 500; }
        .info-value { display: table-cell; font-size: 7pt; font-weight: bold; padding: 2pt 0; color: #1e293b; }
        .section-header { background-color: #1a2d4a; color: #fff; font-weight: bold; font-size: 7pt; padding: 2.5pt 5pt; margin: 5pt 0 3pt; letter-spacing: .3pt; }
        .bullet { color: #f6b13a; font-size: 7pt; margin-right: 3pt; }
        .fee-table { width: 100%; }
        .fee-row { display: table; width: 100%; border-bottom: .5pt solid #e2e8f0; padding: 2pt 0; }
        .fee-label { display: table-cell; font-size: 7pt; color: #475569; }
        .fee-value { display: table-cell; font-size: 7pt; font-weight: bold; text-align: right; color: #1e293b; }
        .fee-total { background-color: rgba(26,45,74,.06); }
        .fee-total .fee-label,
        .fee-total .fee-value { font-size: 8pt; font-weight: bold; color: #1a2d4a; }
        .field-line { border-bottom: .5pt solid #94a3b8; height: 11pt; margin-bottom: 2pt; }
        .field-label { font-size: 6.5pt; color: #64748b; }
        .instruction-list { padding-left: 10pt; margin-top: 1pt; }
        .instruction-list li { font-size: 6.5pt; color: #475569; margin-bottom: 1.2pt; }
        .copy-label { text-align: center; font-size: 7pt; font-weight: bold; letter-spacing: 1pt; padding: 2.5pt; margin-top: 4pt; }
        .label-bank { background-color: #1a2d4a; color: #fff; }
        .label-candidate { background-color: #16a34a; color: #fff; }
        .label-office { background-color: #f59e0b; color: #1a2d4a; }
      </style></head><body>
      <table class="main-table"><tr>
      ${copyHTML}
      </tr></table>
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