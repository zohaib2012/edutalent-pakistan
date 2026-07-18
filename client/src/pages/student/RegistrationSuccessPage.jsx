import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  CheckCircle, Download, ShieldCheck,
  Banknote, LayoutDashboard, Loader2
} from 'lucide-react';

const RegistrationSuccessPage = () => {
  const location = useLocation();
  const registrationNumber = location.state?.registrationNumber || 'N/A';
  const [downloadingApp, setDownloadingApp] = useState(false);
  const [downloadingChallan, setDownloadingChallan] = useState(false);

  const handleDownloadApplication = async () => {
    setDownloadingApp(true);
    try {
      const printContent = document.createElement('div');
      printContent.innerHTML = `
        <html>
          <head>
            <title>Application Form - ${registrationNumber}</title>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; padding: 40px; color: #333; }
              h1 { text-align: center; color: #1A73E8; font-size: 24px; margin-bottom: 5px; }
              h2 { text-align: center; color: #666; font-size: 16px; font-weight: normal; margin-bottom: 30px; }
              .reg-number { text-align: center; font-size: 20px; font-weight: bold; color: #1A73E8; margin-bottom: 30px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              td { padding: 10px 12px; border: 1px solid #ddd; font-size: 14px; }
              td.label { font-weight: 600; background: #f8f9fa; width: 40%; }
              .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
            </style>
          </head>
          <body>
            <h1>EduTalent Pakistan</h1>
            <h2>Scholarship Application Form</h2>
            <div class="reg-number">Registration No: ${registrationNumber}</div>
            <table>
              <tr><td class="label">Full Name</td><td>________________________</td></tr>
              <tr><td class="label">Father's Name</td><td>________________________</td></tr>
              <tr><td class="label">CNIC / B-Form</td><td>________________________</td></tr>
              <tr><td class="label">Date of Birth</td><td>________________________</td></tr>
              <tr><td class="label">Gender</td><td>________________________</td></tr>
              <tr><td class="label">Province</td><td>________________________</td></tr>
              <tr><td class="label">District</td><td>________________________</td></tr>
              <tr><td class="label">City</td><td>________________________</td></tr>
              <tr><td class="label">Mobile Number</td><td>________________________</td></tr>
              <tr><td class="label">Email Address</td><td>________________________</td></tr>
            </table>
            <div class="footer">This is a system-generated form. For verification, visit https://edutalentpakistan.com</div>
          </body>
        </html>
      `;
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(printContent.innerHTML);
        win.document.close();
        win.focus();
        win.print();
      }
    } catch {
      window.print();
    } finally {
      setDownloadingApp(false);
    }
  };

  const handleDownloadChallan = async () => {
    setDownloadingChallan(true);
    try {
      const challanContent = document.createElement('div');
      challanContent.innerHTML = `
        <html>
          <head>
            <title>Fee Challan - ${registrationNumber}</title>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; padding: 40px; color: #333; }
              .challan { max-width: 600px; margin: 0 auto; border: 2px solid #1A73E8; padding: 30px; border-radius: 8px; }
              h1 { text-align: center; color: #1A73E8; font-size: 20px; margin-bottom: 5px; }
              .bank-detail { text-align: center; font-size: 12px; color: #666; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              td { padding: 8px 12px; border: 1px solid #ddd; font-size: 13px; }
              td.label { font-weight: 600; background: #f8f9fa; width: 40%; }
              .amount { text-align: center; font-size: 24px; font-weight: bold; color: #1A73E8; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; font-size: 11px; color: #999; }
            </style>
          </head>
          <body>
            <div class="challan">
              <h1>EduTalent Pakistan</h1>
              <div class="bank-detail">HBL / UBL / Allied Bank</div>
              <div class="amount">PKR 500/-</div>
              <table>
                <tr><td class="label">Registration No</td><td>${registrationNumber}</td></tr>
                <tr><td class="label">Account Title</td><td>EduTalent Pakistan</td></tr>
                <tr><td class="label">Account Number</td><td>1234-5678-9012-3456</td></tr>
                <tr><td class="label">Due Date</td><td>Within 7 days</td></tr>
              </table>
              <div class="footer">Pay at any HBL, UBL, or Allied Bank branch | www.edutalentpakistan.com</div>
            </div>
          </body>
        </html>
      `;
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(challanContent.innerHTML);
        win.document.close();
        win.focus();
        win.print();
      }
    } catch {
      // fallback
    } finally {
      setDownloadingChallan(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Application Submitted</h1>
          <p className="text-white/80">Your scholarship application has been received</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
              <div className="relative w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={52} className="text-success" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-3">
              Application Submitted Successfully!
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Thank you for applying to EduTalent Pakistan Scholarship Program.
            </p>

            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 mb-6 border border-primary-100">
              <p className="text-sm text-gray-500 mb-1">Your Registration Number</p>
              <p className="text-2xl md:text-3xl font-heading font-bold text-primary tracking-wider">
                {registrationNumber}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-amber-700 mb-1">
                <Banknote size={16} className="inline mr-1" />
                Payment Required
              </p>
              <p className="text-xs text-amber-600">
                Please download the challan and pay PKR 500 within 7 days to complete your registration.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDownloadApplication}
                disabled={downloadingApp}
                className="btn-primary w-full justify-center"
              >
                {downloadingApp ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Download size={18} />
                )}
                {downloadingApp ? 'Preparing...' : 'Download Application Form'}
              </button>

              <button
                onClick={handleDownloadChallan}
                disabled={downloadingChallan}
                className="btn-gold w-full justify-center"
              >
                {downloadingChallan ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Banknote size={18} />
                )}
                {downloadingChallan ? 'Preparing...' : 'Download Challan'}
              </button>

              <Link to="/profile" className="btn-outline w-full justify-center">
                <LayoutDashboard size={18} /> Go to Dashboard
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={14} /> Keep your registration number safe for future reference.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationSuccessPage;
