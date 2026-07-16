import { useState } from 'react';
import { Download, Upload, FileText, Banknote, Calendar, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  verified: { label: 'Verified', icon: CheckCircle, color: 'text-success', bg: 'bg-green-50 border-green-200' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
};

const ChallanDownloadPage = () => {
  const [currentStatus, setCurrentStatus] = useState('pending');
  const [paidChallan, setPaidChallan] = useState(null);
  const [uploading, setUploading] = useState(false);

  const status = statusConfig[currentStatus];
  const StatusIcon = status.icon;

  const challanData = {
    studentName: 'Muhammad Ahmed',
    fatherName: 'Muhammad Ali',
    challanNumber: 'CH-2026-000124',
    feeAmount: 'Rs. 5,000/-',
    dueDate: '2026-07-18',
    bankName: 'HBL / UBL / Allied Bank',
    accountTitle: 'EduTalent Pakistan',
    accountNumber: '1234-5678-9012-3456',
  };

  const handlePaidChallanUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB');
      return;
    }
    setPaidChallan(file);
  };

  const handleSubmitPaidChallan = () => {
    if (!paidChallan) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setCurrentStatus('verified');
      setPaidChallan(null);
    }, 1500);
  };

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
            <div className={`flex items-center gap-3 p-4 rounded-xl border ${status.bg}`}>
              <StatusIcon size={24} className={status.color} />
              <div>
                <p className="text-sm font-semibold">Payment Status: <span className={status.color}>{status.label}</span></p>
                {currentStatus === 'pending' && <p className="text-xs text-gray-500 mt-0.5">Your challan payment is awaiting verification</p>}
                {currentStatus === 'verified' && <p className="text-xs text-green-600 mt-0.5">Your payment has been verified successfully</p>}
                {currentStatus === 'rejected' && <p className="text-xs text-red-600 mt-0.5">Payment rejected. Please re-upload a clear paid challan image</p>}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-lg font-heading font-bold text-gray-800 mb-5 flex items-center gap-2">
                <FileText size={20} className="text-primary" /> Challan Details
              </h2>
              <div className="space-y-3">
                {[
                  ['Student Name', challanData.studentName],
                  ['Father Name', challanData.fatherName],
                  ['Challan Number', challanData.challanNumber],
                  ['Fee Amount', challanData.feeAmount],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="text-sm font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-red-50 rounded-lg p-3 flex items-start gap-2 border border-red-100">
                <Calendar size={16} className="text-red-500 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-red-700">Due Date: {challanData.dueDate}</p>
                  <p className="text-xs text-red-500">Pay before the due date to avoid late fee penalties</p>
                </div>
              </div>

              <div className="mt-4 bg-primary-50 rounded-lg p-3 flex items-start gap-2 border border-primary-100">
                <Banknote size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-primary-700">Bank: {challanData.bankName}</p>
                  <p className="text-xs text-gray-500">Account Title: {challanData.accountTitle} | A/C: {challanData.accountNumber}</p>
                </div>
              </div>
            </div>

            <button className="btn-primary w-full justify-center">
              <Download size={18} /> Download Challan PDF
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-lg font-heading font-bold text-gray-800 mb-2">Upload Paid Challan</h2>
              <p className="text-sm text-gray-500 mb-5">
                Pay at any HBL/UBL/Allied Bank branch and upload the paid challan here
              </p>

              {currentStatus === 'pending' ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => document.getElementById('challan-upload').click()}>
                    <Upload size={28} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {paidChallan ? paidChallan.name : 'Click to upload paid challan image'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PDF or Image, max 5MB</p>
                    <input id="challan-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handlePaidChallanUpload} />
                  </div>
                  <button onClick={handleSubmitPaidChallan} disabled={!paidChallan || uploading}
                    className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                    {uploading ? 'Uploading...' : 'Submit Paid Challan'}
                  </button>
                </div>
              ) : currentStatus === 'verified' ? (
                <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
                  <CheckCircle size={32} className="text-success mx-auto mb-2" />
                  <p className="text-sm font-semibold text-green-700">Challan Verified Successfully</p>
                </div>
              ) : (
                <div className="bg-red-50 rounded-xl p-6 text-center border border-red-200">
                  <AlertCircle size={32} className="text-red-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-red-700">Challan Rejected. Please upload a clear image.</p>
                  <button onClick={() => setCurrentStatus('pending')} className="btn-primary mt-4">Try Again</button>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-yellow-800 mb-1">Instructions</h3>
              <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                <li>Download the challan and pay at any HBL, UBL, or Allied Bank branch</li>
                <li>After payment, upload the paid/stamped challan here</li>
                <li>Your payment will be verified within 24-48 hours</li>
                <li>Once verified, you will be eligible for the test</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChallanDownloadPage;
