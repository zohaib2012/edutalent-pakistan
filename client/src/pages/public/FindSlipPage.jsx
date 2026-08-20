import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Download, User, Hash, Shield, AlertTriangle, MapPin, Monitor, Eye, Mic, BadgeCheck, Loader2, Phone } from 'lucide-react';
import { searchPublicSlip } from '../../services/api';
import logo from '../../assets/images/logo.jpeg';

const FindSlipPage = () => {
  const [regNumber, setRegNumber] = useState('');
  const [cnic, setCnic] = useState('');
  const [slipData, setSlipData] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFind = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearched(true);
    setSlipData(null);
    try {
      const res = await searchPublicSlip({ registrationNumber: regNumber, cnic });
      setSlipData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'No roll number slip found.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!slipData) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>Roll No Slip - ${slipData.registrationNumber || ''}</title>
      <style>
        @page { margin: 12mm; size: A4 portrait; }
        body { font-family: Arial, sans-serif; padding: 30px; color: #222; }
        .header { text-align: center; background: linear-gradient(135deg, #1A73E8, #0D47A1); color: #fff; border-radius: 12px; padding: 22px 16px; margin-bottom: 20px; }
        .header img { height: 46px; margin-bottom: 6px; background: #fff; border-radius: 8px; padding: 4px; }
        .header h1 { color: #fff; font-size: 22px; margin: 4px 0 0; }
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
      </style></head><body>
      <div class="header">
        <img src="${logo}" alt="EduTalent Pakistan" />
        <h1>EDUTALENT PAKISTAN</h1>
        <p>Scholarship Testing Program — Roll No Slip</p>
      </div>
      <div style="text-align:center;"><span class="badge">ROLL NO: ${slipData.rollNumber || ''}</span></div>
      <table>
        <tr><td class="label">Student Name</td><td>${slipData.fullName || ''}</td></tr>
        <tr><td class="label">Father's Name</td><td>${slipData.fatherName || ''}</td></tr>
        <tr><td class="label">Registration No</td><td>${slipData.registrationNumber || ''}</td></tr>
        <tr><td class="label">CNIC / B-Form</td><td>${slipData.cnicOrBform || ''}</td></tr>
        <tr><td class="label">Phase</td><td>${slipData.phase || ''}</td></tr>
        <tr><td class="label">Grade/Class</td><td>${slipData.grade || ''}</td></tr>
      </table>
      <div class="credentials">
        <h3>Test Portal Credentials</h3>
        <table>
          <tr><td class="label">Username</td><td><strong>${slipData.username || ''}</strong></td></tr>
          <tr><td class="label">Password</td><td><strong>${slipData.passwordGiven || ''}</strong></td></tr>
        </table>
      </div>
      <div class="instructions">
        <strong>Test Date &amp; Timing:</strong>
        <p style="font-size:12px;margin:6px 0 0;color:#666;">
          Test date and timing will be shared via SMS/WhatsApp. Contact or message
          <strong style="color:#92400e;"> 03468275954</strong> to confirm your test date and time.
        </p>
      </div>
      <div class="footer">EduTalent Pakistan | www.edutalentpakistan.com | This is a system-generated slip.</div>
      </body></html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-4">
            <FileText size={16} className="text-gold" />
            <span>Admit Card</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Find Your Roll Number Slip</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Retrieve your roll number slip with test date, login credentials, and instructions.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleFind} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Registration Number</label>
                <div className="relative">
                  <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="e.g. REG-2025-00142"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">CNIC / B-Form</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="e.g. 42201-1234567-1"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />} Find Slip
              </button>
            </form>

            {searched && error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-500" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {slipData && (
              <div className="mt-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary via-primary-600 to-primary-700 px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center">
                        <BadgeCheck size={22} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">Roll Number Slip</h3>
                        <p className="text-xs text-white/70">Verified &amp; System Generated</p>
                      </div>
                    </div>
                    <img src={logo} alt="EduTalent" className="h-10 w-10 rounded-lg object-cover bg-white p-0.5" />
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <User size={15} className="text-gray-400 shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-500 uppercase">Student Name</div>
                          <div className="text-sm font-semibold text-gray-900">{slipData.fullName}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={15} className="text-gray-400 shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-500 uppercase">Father Name</div>
                          <div className="text-sm font-semibold text-gray-900">{slipData.fatherName}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-primary-700 text-white rounded-xl p-5 text-center my-4 relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 text-white/10"><BadgeCheck size={72} /></div>
                      <div className="text-xs text-white/70 mb-1 uppercase tracking-widest">Roll Number</div>
                      <div className="text-2xl md:text-3xl font-heading font-bold tracking-wider">{slipData.rollNumber}</div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mt-3">
                      <Shield size={15} className="text-primary shrink-0" />
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase">Phase</div>
                        <div className="text-sm font-semibold text-gray-900">{slipData.phase}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mt-3">
                      <Phone size={15} className="text-amber-700 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-[10px] font-semibold text-amber-800 uppercase">Test Date &amp; Timing</div>
                        <div className="text-xs text-amber-700 mt-0.5">
                          Test date and timing will be shared via SMS/WhatsApp. Contact or message
                          <span className="font-bold"> 03468275954</span> to confirm.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-br from-gray-900 via-primary-900 to-primary-800 rounded-xl p-5 border border-primary-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Monitor size={16} className="text-gold" />
                    <span className="text-xs text-gold uppercase font-semibold tracking-wider">Test Portal Credentials</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Username</span>
                      <span className="text-white font-mono font-semibold">{slipData.username}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Password</span>
                      <span className="text-white font-mono font-semibold">{slipData.passwordGiven}</span>
                    </div>
                  </div>
                </div>

                <button onClick={handleDownload} className="btn-primary w-full justify-center mt-5 text-sm py-3 shadow-lg shadow-primary/20">
                  <Download size={16} /> Download Slip PDF
                </button>

                <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="text-sm font-heading font-bold text-amber-800 mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} /> Test Instructions
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-700">
                    <li className="flex items-start gap-2">
                      <MapPin size={12} className="mt-0.5 shrink-0" /> Join the test portal 15 minutes before the scheduled time.
                    </li>
                    <li className="flex items-start gap-2">
                      <Eye size={12} className="mt-0.5 shrink-0" /> Keep your camera and microphone ON throughout the test.
                    </li>
                    <li className="flex items-start gap-2">
                      <Mic size={12} className="mt-0.5 shrink-0" /> Ensure a quiet, well-lit environment with stable internet.
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield size={12} className="mt-0.5 shrink-0" /> Any attempt to cheat will result in immediate disqualification.
                    </li>
                  </ul>
                </div>

                <div className="mt-3 text-center">
                  <Link to="/test-rules" className="text-primary text-xs font-semibold hover:underline">
                    View Complete Test Rules &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindSlipPage;
