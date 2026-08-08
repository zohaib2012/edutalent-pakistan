import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Download, User, Hash, Calendar, Clock, Shield, AlertTriangle, MapPin, Monitor, Eye, Mic, BadgeCheck } from 'lucide-react';
import logo from '../../assets/images/logo.jpeg';

const FindSlipPage = () => {
  const [regNumber, setRegNumber] = useState('');
  const [cnic, setCnic] = useState('');
  const [slipData, setSlipData] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleFind = (e) => {
    e.preventDefault();
    setSearched(true);
    setSlipData({
      studentName: 'Ahmed Khan',
      fatherName: 'Muhammad Ali',
      rollNumber: 'ETP-2025-0042',
      testDate: 'August 25, 2025',
      testTime: '10:00 AM (PST)',
      phase: 'Phase 2 — Middle Level',
      username: 'ETP-2025-0042',
      password: 'Ahmed@2025',
    });
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
              <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                <Search size={18} /> Find Slip
              </button>
            </form>

            {searched && !slipData && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-500" />
                <p className="text-sm text-red-700">No roll number slip found. Please verify your registration number and CNIC/B-Form.</p>
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
                          <div className="text-sm font-semibold text-gray-900">{slipData.studentName}</div>
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

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Calendar size={15} className="text-primary shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-500 uppercase">Test Date</div>
                          <div className="text-sm font-semibold text-gray-900">{slipData.testDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Clock size={15} className="text-primary shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-500 uppercase">Test Time</div>
                          <div className="text-sm font-semibold text-gray-900">{slipData.testTime}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mt-3">
                      <Shield size={15} className="text-primary shrink-0" />
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase">Phase</div>
                        <div className="text-sm font-semibold text-gray-900">{slipData.phase}</div>
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
                      <span className="text-white font-mono font-semibold">{slipData.password}</span>
                    </div>
                  </div>
                </div>

                <button className="btn-primary w-full justify-center mt-5 text-sm py-3 shadow-lg shadow-primary/20">
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
