import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  CheckCircle, Download, ShieldCheck,
  Banknote, LayoutDashboard, Loader2, KeyRound, User
} from 'lucide-react';

const RegistrationSuccessPage = () => {
  const location = useLocation();
  const registrationNumber = location.state?.registrationNumber || 'N/A';
  const studentPassword = location.state?.password || '';
  const formData = location.state?.formData || {};
  const [downloadingApp, setDownloadingApp] = useState(false);
  const [downloadingChallan, setDownloadingChallan] = useState(false);
  const autoTriggered = useRef(false);

  useEffect(() => {
    if (autoTriggered.current || !registrationNumber || registrationNumber === 'N/A') return;
    autoTriggered.current = true;
    const timer = setTimeout(() => {
      handleDownloadApplication();
    }, 1000);
    return () => clearTimeout(timer);
  }, [registrationNumber]);

  const handleDownloadApplication = () => {
    setDownloadingApp(true);
    try {
      const win = window.open('', '_blank');
      if (!win) { setDownloadingApp(false); return; }
      win.document.write(buildApplicationFormHTML());
      win.document.close();
      win.focus();
      win.print();
    } catch {
      // fallback
    } finally {
      setDownloadingApp(false);
      setTimeout(() => {
        handleDownloadChallan();
      }, 500);
    }
  };

  const buildApplicationFormHTML = () => {
    const f = formData;
    return `
      <html>
        <head>
          <title>Application Form - ${registrationNumber}</title>
          <style>
            @page { margin: 15mm; }
            body { font-family: 'Arial', sans-serif; padding: 30px; color: #222; }
            .header { text-align: center; border-bottom: 3px solid #1A73E8; padding-bottom: 12px; margin-bottom: 20px; }
            .header h1 { color: #1A73E8; font-size: 22px; margin: 0; }
            .header p { color: #666; font-size: 12px; margin: 3px 0 0; }
            .reg-number { text-align: center; font-size: 16px; font-weight: bold; color: #1A73E8; margin-bottom: 20px; }
            .section-title { font-size: 14px; font-weight: bold; color: #1A73E8; margin: 15px 0 8px; border-bottom: 2px solid #1A73E8; padding-bottom: 3px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
            td { padding: 7px 10px; border: 1px solid #ccc; font-size: 12px; }
            td.label { font-weight: bold; background: #f5f5f5; width: 35%; color: #555; }
            td.value { font-weight: 600; }
            .footer { text-align: center; margin-top: 30px; font-size: 10px; color: #999; border-top: 1px solid #ddd; padding-top: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>EduTalent Pakistan</h1>
            <p>Scholarship Application Form</p>
          </div>
          <div class="reg-number">Registration No: ${registrationNumber}</div>

          <div class="section-title">Personal Information</div>
          <table>
            <tr><td class="label">Full Name</td><td class="value">${f.fullName || '________________________'}</td></tr>
            <tr><td class="label">Father's Name</td><td class="value">${f.fatherName || '________________________'}</td></tr>
            <tr><td class="label">CNIC / B-Form</td><td class="value">${f.cnicOrBform || '________________________'}</td></tr>
            <tr><td class="label">Date of Birth</td><td class="value">${f.dateOfBirth || '________________________'}</td></tr>
            <tr><td class="label">Gender</td><td class="value">${f.gender || '________________________'}</td></tr>
            <tr><td class="label">Province</td><td class="value">${f.province || '________________________'}</td></tr>
            <tr><td class="label">District</td><td class="value">${f.district || '________________________'}</td></tr>
            <tr><td class="label">City</td><td class="value">${f.city || '________________________'}</td></tr>
            <tr><td class="label">Residential Address</td><td class="value">${f.residentialAddress || '________________________'}</td></tr>
            <tr><td class="label">Mobile Number</td><td class="value">${f.mobileNumber || '________________________'}</td></tr>
            <tr><td class="label">Email Address</td><td class="value">${f.email || '________________________'}</td></tr>
            <tr><td class="label">Current Class</td><td class="value">${f.currentClass || '________________________'}</td></tr>
          </table>

          <div class="section-title">Academic Information</div>
          <table>
            <tr><td class="label">School/College/University</td><td class="value">${f.schoolName || '________________________'}</td></tr>
            <tr><td class="label">Current Qualification</td><td class="value">${f.currentQualification || '________________________'}</td></tr>
            <tr><td class="label">Total Marks</td><td class="value">${f.totalMarks || '________________________'}</td></tr>
            <tr><td class="label">Obtained Marks</td><td class="value">${f.obtainedMarks || '________________________'}</td></tr>
            <tr><td class="label">Last Qualification</td><td class="value">${f.lastQualification || '________________________'}</td></tr>
          </table>

          <div class="section-title">Contact Information</div>
          <table>
            <tr><td class="label">Student Mobile</td><td class="value">${f.studentMobile || '________________________'}</td></tr>
            <tr><td class="label">Father's Mobile</td><td class="value">${f.fatherMobile || '________________________'}</td></tr>
            <tr><td class="label">WhatsApp Number</td><td class="value">${f.whatsappNumber || '________________________'}</td></tr>
            <tr><td class="label">Email Address</td><td class="value">${f.studentEmail || '________________________'}</td></tr>
          </table>

          <div class="footer">
            <p>This is a system-generated application form. Registration No: ${registrationNumber}</p>
            <p>EduTalent Pakistan — www.edutalentpakistan.com</p>
          </div>
        </body>
      </html>
    `;
  };

  const handleDownloadChallan = () => {
    setDownloadingChallan(true);
    try {
      const win = window.open('', '_blank');
      if (!win) { setDownloadingChallan(false); return; }
      const today = new Date();
      const dueDate = new Date(today);
      dueDate.setDate(dueDate.getDate() + 15);
      const dueDateStr = dueDate.toISOString().split('T')[0];
      win.document.write(`
        <html>
          <head>
            <title>Fee Challan - ${registrationNumber}</title>
            <style>
              @page { margin: 15mm; size: A4 portrait; }
              body { font-family: 'Arial', sans-serif; padding: 30px; color: #222; }
              .header { text-align: center; border-bottom: 3px solid #1A73E8; padding-bottom: 15px; margin-bottom: 20px; }
              .header h1 { color: #1A73E8; font-size: 22px; margin: 0; letter-spacing: 1px; }
              .header p { color: #666; font-size: 11px; margin: 3px 0 0; }
              .challan-title { text-align: center; font-size: 15px; font-weight: bold; color: #1A73E8; margin: 15px 0; display: inline-block; padding: 5px 25px; border: 1px solid #1A73E8; background: #f0f6ff; }
              table { width: 100%; border-collapse: collapse; margin: 12px 0; }
              td, th { border: 1px solid #ccc; padding: 7px 10px; font-size: 12px; text-align: left; }
              td.label { font-weight: bold; background: #f5f5f5; width: 35%; font-size: 11px; color: #555; text-transform: uppercase; }
              td.value { font-weight: 600; color: #222; }
              .amount-box { text-align: center; border: 2px solid #1A73E8; border-radius: 8px; padding: 15px; margin: 15px 0; background: #f8fbff; }
              .amount-box .amount { font-size: 32px; font-weight: bold; color: #1A73E8; }
              .amount-box .words { font-size: 11px; color: #666; margin-top: 5px; }
              .section-title { font-size: 13px; font-weight: bold; color: #1A73E8; margin: 15px 0 8px; border-bottom: 2px solid #1A73E8; padding-bottom: 4px; }
              .footer { margin-top: 25px; padding-top: 12px; border-top: 2px solid #ddd; text-align: center; font-size: 10px; color: #999; }
              .payment-methods { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
              .payment-method { border: 1px solid #ddd; padding: 6px 12px; font-size: 11px; border-radius: 4px; background: #f9f9f9; }
            </style>
          </head>
          <body>
            <div style="text-align: center;"><span class="challan-title">CHALLAN</span></div>
            <div class="header">
              <h1>EDUTALENT PAKISTAN</h1>
              <p>Scholarship Testing Program — Fee Challan</p>
            </div>
            <div class="section-title">STUDENT DETAILS</div>
            <table>
              <tr><td class="label">Registration No</td><td class="value">${registrationNumber}</td></tr>
              <tr><td class="label">Student Name</td><td class="value">${formData.fullName || '________________'}</td></tr>
              <tr><td class="label">Father's Name</td><td class="value">${formData.fatherName || '________________'}</td></tr>
              <tr><td class="label">CNIC / B-Form</td><td class="value">${formData.cnicOrBform || '________________'}</td></tr>
              <tr><td class="label">Due Date</td><td class="value" style="color:#d32f2f;">${dueDateStr}</td></tr>
            </table>
            <div class="amount-box">
              <div style="font-size: 11px; color: #666; margin-bottom: 5px;">REGISTRATION FEE</div>
              <div class="amount">PKR 1,200/-</div>
              <div class="words">One Thousand Two Hundred Rupees Only</div>
            </div>
            <div class="section-title">BANK DETAILS</div>
            <table>
              <tr><td class="label">Bank</td><td class="value">HBL (Habib Bank Limited)</td></tr>
              <tr><td class="label">Account Title</td><td class="value">EduTalent Pakistan</td></tr>
              <tr><td class="label">Account Number</td><td class="value">1234-5678-9012-3456</td></tr>
              <tr><td class="label">Branch Code</td><td class="value">HBL-1234</td></tr>
            </table>
            <div style="margin: 10px 0; font-size: 11px; color: #555;">
              <strong>Alternative Banks:</strong><br>
              &bull; UBL (United Bank Limited) — A/C: 5678-1234-5678-1234<br>
              &bull; Allied Bank Limited — A/C: 9012-3456-7890-1234
            </div>
            <div class="section-title">PAYMENT METHODS</div>
            <div class="payment-methods">
              <span class="payment-method">OneBill</span>
              <span class="payment-method">Bank Deposit (HBL/UBL/Allied)</span>
              <span class="payment-method">JazzCash</span>
              <span class="payment-method">Easypaisa</span>
            </div>
            <div class="footer">
              <p>EduTalent Pakistan — Helpline: 0800-EDUTALENT | www.edutalentpakistan.com</p>
              <p>Fee once paid is non-refundable. This is a system-generated challan.</p>
            </div>
          </body>
        </html>
      `);
      win.document.close();
      win.focus();
      win.print();
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

            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 mb-4 border border-primary-100">
              <p className="text-sm text-gray-500 mb-1">Your Registration Number</p>
              <p className="text-2xl md:text-3xl font-heading font-bold text-primary tracking-wider">
                {registrationNumber}
              </p>
            </div>

            {studentPassword && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-green-700 mb-1 flex items-center gap-1">
                  <KeyRound size={16} /> Your Password
                </p>
                <p className="text-lg font-bold text-green-800 tracking-wider font-mono">
                  {studentPassword}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Use this password along with your Registration ID to login.
                </p>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-amber-700 mb-1">
                <Banknote size={16} className="inline mr-1" />
                Payment Required
              </p>
              <p className="text-xs text-amber-600">
                Please download the challan and pay PKR 1,200 within 15 days to complete your registration.
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
