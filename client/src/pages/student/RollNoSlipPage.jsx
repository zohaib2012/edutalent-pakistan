import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Copy, Check, FileText, User, Calendar, Clock, MapPin, Shield, Key, Eye, EyeOff, Loader2, AlertCircle, BadgeCheck } from 'lucide-react';
import { getMySlip, getStudentProfile } from '../../services/api';
import logo from '../../assets/images/logo.jpeg';

const RollNoSlipPage = () => {
  const navigate = useNavigate();
  const [slipData, setSlipData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedField, setCopiedField] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [slipRes, profileRes] = await Promise.all([
        getMySlip(),
        getStudentProfile()
      ]);
      setSlipData(slipRes.data);
      setStudentData(profileRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      setError(err.response?.data?.message || 'Failed to load slip');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleDownloadPDF = () => {
    if (!slipData || !studentData) return;
    const win = window.open('', '_blank');
    if (!win) return;
    const testDate = slipData.testDate ? new Date(slipData.testDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    win.document.write(`
      <html><head><title>Roll No Slip - ${studentData.registrationNumber || ''}</title>
      <style>
        @page { margin: 12mm; size: A4 portrait; }
        body { font-family: 'Arial', sans-serif; padding: 30px; color: #222; }
        .header { position: relative; text-align: center; background: linear-gradient(135deg, #1A73E8, #0D47A1); color: #fff; border-radius: 12px; padding: 22px 16px; margin-bottom: 20px; overflow: hidden; }
        .header::after { content: ""; position: absolute; top: -40px; right: -40px; width: 140px; height: 140px; border-radius: 50%; background: rgba(241,196,15,.18); }
        .header img { height: 46px; margin-bottom: 6px; background: #fff; border-radius: 8px; padding: 4px; }
        .header h1 { color: #fff; font-size: 22px; margin: 4px 0 0; letter-spacing: 1px; }
        .header p { color: rgba(255,255,255,.85); font-size: 12px; margin: 3px 0 0; }
        .badge { display: inline-block; border: 2px dashed #1A73E8; background: #E8F0FE; padding: 10px 22px; font-size: 15px; font-weight: bold; color: #1A73E8; margin: 10px 0; border-radius: 10px; letter-spacing: 1px; }
        table { width: 100%; border-collapse: collapse; margin: 12px 0; }
        td, th { border: 1px solid #e2e8f0; padding: 9px 12px; font-size: 13px; text-align: left; }
        td.label { font-weight: bold; background: #f8fafc; width: 30%; font-size: 11px; text-transform: uppercase; color: #64748b; }
        .credentials { background: linear-gradient(135deg, #0a2e52, #0D47A1); color: #fff; border-radius: 10px; padding: 16px; margin: 15px 0; }
        .credentials h3 { margin: 0 0 10px; color: #F1C40F; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
        .credentials td.label { background: transparent; color: #94a3b8; border-color: rgba(255,255,255,.15); }
        .credentials td { border-color: rgba(255,255,255,.15); color: #fff; }
        .footer { margin-top: 25px; padding-top: 12px; border-top: 2px solid #ddd; text-align: center; font-size: 10px; color: #999; }
        .instructions { margin: 15px 0; padding: 15px; background: #fffbeb; border-left: 4px solid #F1C40F; border-radius: 6px; }
        .instructions strong { color: #92400e; }
        .photo-box { width: 100px; height: 100px; border: 2px solid #cbd5e1; float: right; text-align: center; line-height: 100px; color: #94a3b8; font-size: 11px; background: #f8fafc; border-radius: 8px; }
        .clearfix::after { content: ""; clear: both; display: table; }
      </style></head><body>
      <div class="header">
        <img src="${logo}" alt="EduTalent Pakistan" />
        <h1>EDUTALENT PAKISTAN</h1>
        <p>Scholarship Testing Program — Roll No Slip</p>
      </div>
      <div class="header clearfix">
        <div class="photo-box">PHOTO</div>
      </div>
      <div style="text-align:center;"><span class="badge">ROLL NO: ${slipData.rollNumber || ''}</span></div>
      <table>
        <tr><td class="label">Student Name</td><td>${studentData.fullName || ''}</td></tr>
        <tr><td class="label">Father's Name</td><td>${studentData.fatherName || ''}</td></tr>
        <tr><td class="label">Registration No</td><td>${studentData.registrationNumber || ''}</td></tr>
        <tr><td class="label">CNIC / B-Form</td><td>${studentData.cnicOrBform || ''}</td></tr>
        <tr><td class="label">Phase</td><td>${studentData.phaseId?.name || studentData.phaseId || ''}</td></tr>
        <tr><td class="label">Grade/Class</td><td>${studentData.grade || ''}</td></tr>
        <tr><td class="label">Test Date</td><td><strong>${testDate}</strong></td></tr>
        <tr><td class="label">Test Time</td><td><strong>${slipData.testTime || '10:00 AM - 12:00 PM'}</strong></td></tr>
        <tr><td class="label">Test Center</td><td>${slipData.testCenter || 'Online / Designated Center'}</td></tr>
      </table>
      <div class="credentials">
        <h3>🔐 Test Portal Credentials</h3>
        <table>
          <tr><td class="label">Username</td><td><strong>${slipData.username || studentData.registrationNumber || ''}</strong></td></tr>
          <tr><td class="label">Password</td><td><strong>${slipData.passwordGiven || ''}</strong></td></tr>
        </table>
      </div>
      <div class="instructions">
        <strong>Important Instructions:</strong>
        <ul style="font-size:12px;margin:8px 0 0;padding-left:20px;color:#666;">
          <li>Arrive at least 30 minutes before the test time</li>
          <li>Bring a printed copy of this slip</li>
          <li>Bring original CNIC/B-Form for verification</li>
          <li>Mobile phones and smartwatches are strictly prohibited</li>
          <li>Use of unfair means will result in disqualification</li>
        </ul>
      </div>
      <div class="footer">EduTalent Pakistan | www.edutalentpakistan.com | This is a system-generated slip.</div>
      </body></html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle size={48} className="text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">Slip Not Available</p>
          <p className="text-gray-400 text-sm">{error}</p>
          {error.includes('not found') && (
            <p className="text-xs text-gray-400 mt-2">Your roll no slip will be issued after payment verification.</p>
          )}
        </div>
      </div>
    );
  }

  if (!slipData) return null;

  const testDate = slipData.testDate ? new Date(slipData.testDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-4">
            <BadgeCheck size={16} className="text-gold" />
            <span>Admit Card</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Roll No. Slip</h1>
          <p className="text-white/80">Download your test entry slip</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary via-primary-600 to-primary-700 px-6 md:px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <FileText size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-heading font-bold text-white">Test Entry Slip</h2>
                    <p className="text-xs text-white/75">Print this slip and bring it to the test center</p>
                  </div>
                </div>
                <img src={logo} alt="EduTalent" className="h-10 w-10 rounded-lg object-cover bg-white p-0.5 hidden sm:block" />
              </div>

              <div className="p-6 md:p-8 relative">
                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-primary-50/60 pointer-events-none" />
                <div className="relative">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <User size={16} className="text-primary mt-0.5" />
                      <div className="flex-1 flex justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Student Name</p>
                          <p className="text-sm font-semibold text-gray-800">{studentData?.fullName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Father Name</p>
                          <p className="text-sm font-semibold text-gray-800">{studentData?.fatherName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-100 relative overflow-hidden">
                        <div className="absolute -right-3 -bottom-3 text-primary/10"><BadgeCheck size={40} /></div>
                        <p className="text-xs text-gray-500">Roll Number</p>
                        <p className="text-sm font-heading font-bold text-primary">{slipData.rollNumber}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-gold-50 to-gold-100 rounded-lg border border-gold-100 relative overflow-hidden">
                        <p className="text-xs text-gray-500">Phase</p>
                        <p className="text-sm font-semibold text-gray-800">{studentData?.phaseId?.name || ''}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Calendar size={16} className="text-primary" />
                        <div>
                          <p className="text-xs text-gray-500">Test Date</p>
                          <p className="text-sm font-semibold">{testDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Clock size={16} className="text-primary" />
                        <div>
                          <p className="text-xs text-gray-500">Test Time</p>
                          <p className="text-sm font-semibold">{slipData.testTime || '10:00 AM - 12:00 PM'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <MapPin size={16} className="text-primary" />
                      <div>
                        <p className="text-xs text-gray-500">Test Center</p>
                        <p className="text-sm font-semibold">{slipData.testCenter || 'Online / Designated Center'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 p-4 bg-gradient-to-br from-gray-900 via-primary-900 to-primary-800 rounded-xl border border-primary-700 shadow-inner">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-gold/15 flex items-center justify-center">
                        <Key size={14} className="text-gold" />
                      </div>
                      <p className="text-xs font-semibold text-gold tracking-wider uppercase">Test Portal Credentials</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/5">
                        <div>
                          <p className="text-xs text-gray-400">Username</p>
                          <p className="text-sm font-mono font-bold text-white">{slipData.username || studentData?.registrationNumber}</p>
                        </div>
                        <button onClick={() => handleCopy(slipData.username || studentData?.registrationNumber, 'username')}
                          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                          {copiedField === 'username' ? <Check size={16} className="text-success" /> : <Copy size={16} className="text-gray-300" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/5">
                        <div>
                          <p className="text-xs text-gray-400">Password</p>
                          <p className="text-sm font-mono font-bold text-white">{showPassword ? slipData.passwordGiven : '••••••••••••'}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setShowPassword(p => !p)}
                            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            {showPassword ? <EyeOff size={16} className="text-gray-300" /> : <Eye size={16} className="text-gray-300" />}
                          </button>
                          <button onClick={() => handleCopy(slipData.passwordGiven, 'password')}
                            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            {copiedField === 'password' ? <Check size={16} className="text-success" /> : <Copy size={16} className="text-gray-300" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                        <Shield size={14} className="text-primary" />
                      </div>
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Test Instructions</p>
                    </div>
                    <ul className="space-y-2">
                      {[
                        'Arrive at least 30 minutes before the test time',
                        'Bring a printed copy of this slip',
                        'Bring original CNIC/B-Form for verification',
                        'Mobile phones and smartwatches are strictly prohibited',
                        'Use of unfair means will result in disqualification',
                      ].map((inst, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="w-5 h-5 rounded-full bg-primary-50 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5 flex-shrink-0">{i + 1}</span>
                          {inst}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleDownloadPDF} className="btn-primary w-full justify-center shadow-lg shadow-primary/20">
              <Download size={18} /> Download Slip PDF
            </button>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Calendar size={16} className="text-yellow-700 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-800">Important Note</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Keep your login credentials confidential. Do not share your username and password with anyone.
                    You will need these credentials to access the test portal.
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

export default RollNoSlipPage;
