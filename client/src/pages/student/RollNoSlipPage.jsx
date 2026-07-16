import { useState } from 'react';
import { Download, Copy, Check, FileText, User, Calendar, Clock, MapPin, Shield, Key, Eye, EyeOff } from 'lucide-react';

const RollNoSlipPage = () => {
  const [copiedField, setCopiedField] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const slipData = {
    studentName: 'Muhammad Ahmed',
    fatherName: 'Muhammad Ali',
    rollNumber: 'ETP-2026-001234',
    testDate: '20 July 2026',
    testTime: '10:00 AM - 12:00 PM',
    testCenter: 'EduTalent Test Center, Karachi',
    phase: 'Secondary (Grade 9-10)',
    portalUsername: 'ETP-2026-001234',
    portalPassword: 'Ahmed@2026#Test',
    testInstructions: [
      'Arrive at least 30 minutes before the test time',
      'Bring a printed copy of this slip',
      'Bring original CNIC/B-Form for verification',
      'Mobile phones and smartwatches are strictly prohibited',
      'Use of unfair means will result in disqualification',
    ],
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Roll No. Slip</h1>
          <p className="text-white/80">Download your test entry slip</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <FileText size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-heading font-bold text-gray-800">Test Entry Slip</h2>
                  <p className="text-xs text-gray-500">Print this slip and bring it to the test center</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={16} className="text-primary mt-0.5" />
                  <div className="flex-1 flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Student Name</p>
                      <p className="text-sm font-semibold text-gray-800">{slipData.studentName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Father Name</p>
                      <p className="text-sm font-semibold text-gray-800">{slipData.fatherName}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-primary-50 rounded-lg border border-primary-100">
                    <p className="text-xs text-gray-500">Roll Number</p>
                    <p className="text-sm font-heading font-bold text-primary">{slipData.rollNumber}</p>
                  </div>
                  <div className="p-3 bg-primary-50 rounded-lg border border-primary-100">
                    <p className="text-xs text-gray-500">Phase</p>
                    <p className="text-sm font-semibold text-gray-800">{slipData.phase}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Calendar size={16} className="text-primary" />
                    <div>
                      <p className="text-xs text-gray-500">Test Date</p>
                      <p className="text-sm font-semibold">{slipData.testDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Clock size={16} className="text-primary" />
                    <div>
                      <p className="text-xs text-gray-500">Test Time</p>
                      <p className="text-sm font-semibold">{slipData.testTime}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin size={16} className="text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">Test Center</p>
                    <p className="text-sm font-semibold">{slipData.testCenter}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-4 bg-gray-900 rounded-xl border border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                  <Key size={16} className="text-gold" />
                  <p className="text-xs font-semibold text-gold tracking-wider uppercase">Test Portal Credentials</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                    <div>
                      <p className="text-xs text-gray-400">Username</p>
                      <p className="text-sm font-mono font-bold text-white">{slipData.portalUsername}</p>
                    </div>
                    <button onClick={() => handleCopy(slipData.portalUsername, 'username')}
                      className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      {copiedField === 'username' ? <Check size={16} className="text-success" /> : <Copy size={16} className="text-gray-300" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                    <div>
                      <p className="text-xs text-gray-400">Password</p>
                      <p className="text-sm font-mono font-bold text-white">{showPassword ? slipData.portalPassword : '••••••••••••'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setShowPassword(p => !p)}
                        className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                        {showPassword ? <EyeOff size={16} className="text-gray-300" /> : <Eye size={16} className="text-gray-300" />}
                      </button>
                      <button onClick={() => handleCopy(slipData.portalPassword, 'password')}
                        className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                        {copiedField === 'password' ? <Check size={16} className="text-success" /> : <Copy size={16} className="text-gray-300" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} className="text-primary" />
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Test Instructions</p>
                </div>
                <ul className="space-y-2">
                  {slipData.testInstructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      {inst}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className="btn-primary w-full justify-center">
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
