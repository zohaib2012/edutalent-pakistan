import { useState } from 'react';
import {
  Building2, Settings, Mail, DollarSign, Send,
  Globe, Clock, Hash, Shield, CheckCircle
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const initialGeneral = {
  websiteName: 'EduTalent Pakistan',
  tagline: 'Empowering Young Minds',
  contactEmail: 'info@edutalent.pk',
  contactPhone: '+92 300 1234567',
  headOffice: 'Office #12, 3rd Floor, ABC Plaza, Blue Area, Islamabad, Pakistan',
};

const initialTest = {
  timePerQuestion: 60,
  maxQuestions: 100,
  maxCheatViolations: 5,
};

const initialEmail = {
  smtpHost: 'smtp.hostinger.com',
  smtpPort: '587',
  smtpUser: 'noreply@edutalent.pk',
  smtpPass: '',
};

const initialPhases = [
  { phase: 'Phase 1', fee: 1500 },
  { phase: 'Phase 2', fee: 2000 },
  { phase: 'Phase 3', fee: 2500 },
  { phase: 'Phase 4', fee: 3000 },
];

export default function AdminSettingsPage() {
  const [general, setGeneral] = useState(initialGeneral);
  const [test, setTest] = useState(initialTest);
  const [email, setEmail] = useState(initialEmail);
  const [phases, setPhases] = useState(initialPhases);
  const [savedGeneral, setSavedGeneral] = useState(false);
  const [savedTest, setSavedTest] = useState(false);
  const [savedEmail, setSavedEmail] = useState(false);
  const [savedFees, setSavedFees] = useState(false);

  const handleSave = (section, setter) => {
    setter(true);
    setTimeout(() => setter(false), 2500);
  };

  const updatePhaseFee = (index, fee) => {
    const updated = [...phases];
    updated[index].fee = Number(fee) || 0;
    setPhases(updated);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] bg-white transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-[#1A73E8]/10 rounded-lg">
              <Settings size={24} className="text-[#1A73E8]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage website configuration and preferences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 p-5 border-b border-gray-100">
                <Globe size={18} className="text-[#1A73E8]" />
                <h2 className="font-semibold text-gray-900">General Settings</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className={labelClass}>Website Name</label>
                  <input
                    type="text"
                    value={general.websiteName}
                    onChange={(e) => setGeneral({ ...general, websiteName: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Tagline</label>
                  <input
                    type="text"
                    value={general.tagline}
                    onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Contact Email</label>
                  <input
                    type="email"
                    value={general.contactEmail}
                    onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Contact Phone</label>
                  <input
                    type="text"
                    value={general.contactPhone}
                    onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Head Office Address</label>
                  <textarea
                    rows={3}
                    value={general.headOffice}
                    onChange={(e) => setGeneral({ ...general, headOffice: e.target.value })}
                    className={inputClass + " resize-none"}
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  {savedGeneral && (
                    <span className="flex items-center gap-1.5 text-sm text-[#2ECC71]">
                      <CheckCircle size={16} /> Saved
                    </span>
                  )}
                  <button
                    onClick={() => handleSave('general', setSavedGeneral)}
                    className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 p-5 border-b border-gray-100">
                <Clock size={18} className="text-[#1A73E8]" />
                <h2 className="font-semibold text-gray-900">Test Settings</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className={labelClass}>Default Time Per Question (seconds)</label>
                  <input
                    type="number"
                    value={test.timePerQuestion}
                    onChange={(e) => setTest({ ...test, timePerQuestion: Number(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Max Questions Per Test</label>
                  <input
                    type="number"
                    value={test.maxQuestions}
                    onChange={(e) => setTest({ ...test, maxQuestions: Number(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Max Cheat Violations</label>
                  <input
                    type="number"
                    value={test.maxCheatViolations}
                    onChange={(e) => setTest({ ...test, maxCheatViolations: Number(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  {savedTest && (
                    <span className="flex items-center gap-1.5 text-sm text-[#2ECC71]">
                      <CheckCircle size={16} /> Saved
                    </span>
                  )}
                  <button
                    onClick={() => handleSave('test', setSavedTest)}
                    className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 p-5 border-b border-gray-100">
                <Mail size={18} className="text-[#1A73E8]" />
                <h2 className="font-semibold text-gray-900">Email Settings</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className={labelClass}>SMTP Host</label>
                  <input
                    type="text"
                    value={email.smtpHost}
                    onChange={(e) => setEmail({ ...email, smtpHost: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>SMTP Port</label>
                  <input
                    type="text"
                    value={email.smtpPort}
                    onChange={(e) => setEmail({ ...email, smtpPort: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>SMTP User</label>
                  <input
                    type="text"
                    value={email.smtpUser}
                    onChange={(e) => setEmail({ ...email, smtpUser: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>SMTP Password</label>
                  <input
                    type="password"
                    value={email.smtpPass}
                    onChange={(e) => setEmail({ ...email, smtpPass: e.target.value })}
                    className={inputClass}
                    placeholder="•••••••••••"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    className="flex items-center gap-2 border border-[#1A73E8] text-[#1A73E8] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1A73E8]/5 transition-colors"
                  >
                    <Send size={16} />
                    Test Email
                  </button>
                  {savedEmail && (
                    <span className="flex items-center gap-1.5 text-sm text-[#2ECC71]">
                      <CheckCircle size={16} /> Saved
                    </span>
                  )}
                  <button
                    onClick={() => handleSave('email', setSavedEmail)}
                    className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 p-5 border-b border-gray-100">
                <DollarSign size={18} className="text-[#F1C40F]" />
                <h2 className="font-semibold text-gray-900">Phase Fees</h2>
              </div>
              <div className="p-5 space-y-4">
                {phases.map((p, i) => (
                  <div key={p.phase} className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-20">{p.phase}</label>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Rs.</span>
                      <input
                        type="number"
                        value={p.fee}
                        onChange={(e) => updatePhaseFee(i, e.target.value)}
                        className={inputClass + " pl-11"}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-end gap-3 pt-2">
                  {savedFees && (
                    <span className="flex items-center gap-1.5 text-sm text-[#2ECC71]">
                      <CheckCircle size={16} /> Fees Updated
                    </span>
                  )}
                  <button
                    onClick={() => handleSave('fees', setSavedFees)}
                    className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors"
                  >
                    Update All Fees
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
