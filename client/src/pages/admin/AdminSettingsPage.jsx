import { useState, useEffect } from 'react';
import {
  Building2, Settings, Mail, DollarSign, Send,
  Globe, Clock, Hash, Shield, CheckCircle, Loader2, AlertCircle
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { getSettings, updateSettings, updatePhaseFees } from '../../services/api';

export default function AdminSettingsPage() {
  const [general, setGeneral] = useState({});
  const [test, setTest] = useState({});
  const [email, setEmail] = useState({});
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await getSettings();
      if (data.success) {
        setGeneral(data.data.general);
        setTest(data.data.test);
        setEmail(data.data.email);
        setPhases(data.data.phases);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (category, setter) => {
    try {
      setSaving(category);
      setSaved(null);

      let payload;
      if (category === 'general') payload = general;
      else if (category === 'test') payload = test;
      else if (category === 'email') payload = email;

      await updateSettings(category, payload);
      setSaved(category);
      setTimeout(() => setSaved(null), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(null);
    }
  };

  const handleSavePhases = async () => {
    try {
      setSaving('phases');
      setSaved(null);
      await updatePhaseFees(phases);
      setSaved('phases');
      setTimeout(() => setSaved(null), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update phase fees');
    } finally {
      setSaving(null);
    }
  };

  const updatePhaseFee = (index, fee) => {
    const updated = [...phases];
    updated[index] = { ...updated[index], fee: Number(fee) || 0 };
    setPhases(updated);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] bg-white transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
            <Loader2 size={32} className="animate-spin text-[#1A73E8]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
            <div className="text-center">
              <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
              <p className="text-red-600 mb-4">{error}</p>
              <button onClick={loadSettings} className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors">
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                    value={general.websiteName || ''}
                    onChange={(e) => setGeneral({ ...general, websiteName: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Tagline</label>
                  <input
                    type="text"
                    value={general.tagline || ''}
                    onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Contact Email</label>
                  <input
                    type="email"
                    value={general.contactEmail || ''}
                    onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Contact Phone</label>
                  <input
                    type="text"
                    value={general.contactPhone || ''}
                    onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Head Office Address</label>
                  <textarea
                    rows={3}
                    value={general.headOffice || ''}
                    onChange={(e) => setGeneral({ ...general, headOffice: e.target.value })}
                    className={inputClass + " resize-none"}
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  {saved === 'general' && (
                    <span className="flex items-center gap-1.5 text-sm text-[#2ECC71]">
                      <CheckCircle size={16} /> Saved
                    </span>
                  )}
                  <button
                    onClick={() => handleSave('general')}
                    disabled={saving === 'general'}
                    className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving === 'general' ? <Loader2 size={16} className="animate-spin" /> : null}
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
                    value={test.timePerQuestion || ''}
                    onChange={(e) => setTest({ ...test, timePerQuestion: Number(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Max Questions Per Test</label>
                  <input
                    type="number"
                    value={test.maxQuestions || ''}
                    onChange={(e) => setTest({ ...test, maxQuestions: Number(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Max Cheat Violations</label>
                  <input
                    type="number"
                    value={test.maxCheatViolations || ''}
                    onChange={(e) => setTest({ ...test, maxCheatViolations: Number(e.target.value) || 0 })}
                    className={inputClass}
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  {saved === 'test' && (
                    <span className="flex items-center gap-1.5 text-sm text-[#2ECC71]">
                      <CheckCircle size={16} /> Saved
                    </span>
                  )}
                  <button
                    onClick={() => handleSave('test')}
                    disabled={saving === 'test'}
                    className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving === 'test' ? <Loader2 size={16} className="animate-spin" /> : null}
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
                    value={email.smtpHost || ''}
                    onChange={(e) => setEmail({ ...email, smtpHost: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>SMTP Port</label>
                  <input
                    type="text"
                    value={email.smtpPort || ''}
                    onChange={(e) => setEmail({ ...email, smtpPort: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>SMTP User</label>
                  <input
                    type="text"
                    value={email.smtpUser || ''}
                    onChange={(e) => setEmail({ ...email, smtpUser: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>SMTP Password</label>
                  <input
                    type="password"
                    value={email.smtpPass || ''}
                    onChange={(e) => setEmail({ ...email, smtpPass: e.target.value })}
                    className={inputClass}
                    placeholder="•••••••••••"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  {saved === 'email' && (
                    <span className="flex items-center gap-1.5 text-sm text-[#2ECC71]">
                      <CheckCircle size={16} /> Saved
                    </span>
                  )}
                  <button
                    onClick={() => handleSave('email')}
                    disabled={saving === 'email'}
                    className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving === 'email' ? <Loader2 size={16} className="animate-spin" /> : null}
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
                  <div key={p._id || p.slug} className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-28 capitalize">{p.name || p.slug}</label>
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
                {phases.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">No phases found. Create phases first.</p>
                )}
                <div className="flex items-center justify-end gap-3 pt-2">
                  {saved === 'phases' && (
                    <span className="flex items-center gap-1.5 text-sm text-[#2ECC71]">
                      <CheckCircle size={16} /> Fees Updated
                    </span>
                  )}
                  <button
                    onClick={handleSavePhases}
                    disabled={saving === 'phases' || phases.length === 0}
                    className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving === 'phases' ? <Loader2 size={16} className="animate-spin" /> : null}
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
