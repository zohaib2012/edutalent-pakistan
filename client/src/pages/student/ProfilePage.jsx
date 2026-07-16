import { useState } from 'react';
import { User, Camera, Lock, History, Trash2, CheckCircle, XCircle, AlertTriangle, Clock, Eye, EyeOff } from 'lucide-react';

const timelineData = [
  { status: 'Registration Submitted', date: '05 Jul 2026', completed: true },
  { status: 'Challan Verified', date: '07 Jul 2026', completed: true },
  { status: 'Roll No. Slip Generated', date: '10 Jul 2026', completed: true },
  { status: 'Test Completed', date: '12 Jul 2026', completed: false },
  { status: 'Result Published', date: 'Pending', completed: false },
];

const ProfilePage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const profile = {
    fullName: 'Muhammad Ahmed',
    fatherName: 'Muhammad Ali',
    cnic: '42101-1234567-1',
    dob: '15 Aug 2005',
    grade: 'Grade 10',
    phase: 'Secondary',
    school: 'Karachi Grammar School',
    province: 'Sindh',
    city: 'Karachi',
    mobile: '0300-1234567',
    email: 'ahmed@example.com',
    address: 'House #12, Block 6, Gulshan-e-Iqbal, Karachi',
    photo: null,
  };

  const handlePhotoChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file && file.size <= 2 * 1024 * 1024) {
      }
    };
    input.click();
  };

  const handlePasswordChange = () => {
    setPasswordError('');
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordChanged(true);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordChanged(false), 3000);
  };

  const togglePassword = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const renderField = (label, value) => (
    <div>
      <label className="block text-xs text-gray-400 mb-0.5">{label}</label>
      <p className="text-sm font-medium text-gray-800">{value || '-'}</p>
    </div>
  );

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">My Profile</h1>
          <p className="text-white/80">Manage your account information and settings</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-6 mb-6 pb-4 border-b border-gray-100">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center border-4 border-white shadow">
                    <User size={36} className="text-primary" />
                  </div>
                  <button onClick={handlePhotoChange}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-primary-600 transition-colors">
                    <Camera size={14} />
                  </button>
                </div>
                <div>
                  <h2 className="text-lg font-heading font-bold text-gray-800">{profile.fullName}</h2>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
              </div>

              <h3 className="text-base font-heading font-bold text-gray-800 mb-4">Personal Information</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {renderField('Full Name', profile.fullName)}
                {renderField('Father Name', profile.fatherName)}
                {renderField('CNIC / B-Form', profile.cnic)}
                {renderField('Date of Birth', profile.dob)}
                {renderField('Grade', profile.grade)}
                {renderField('Phase', profile.phase)}
                {renderField('School / College', profile.school)}
                {renderField('Province', profile.province)}
                {renderField('City', profile.city)}
                {renderField('Mobile Number', profile.mobile)}
                {renderField('Email Address', profile.email)}
                {renderField('Address', profile.address)}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Lock size={20} className="text-primary" />
                </div>
                <h3 className="text-base font-heading font-bold text-gray-800">Change Password</h3>
              </div>

              {passwordChanged && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <CheckCircle size={16} className="text-success" />
                  <p className="text-sm text-green-700">Password changed successfully!</p>
                </div>
              )}

              {passwordError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <AlertTriangle size={16} className="text-red-500" />
                  <p className="text-sm text-red-600">{passwordError}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Current Password</label>
                  <div className="relative">
                    <input type={showPassword.current ? 'text' : 'password'} value={passwordForm.currentPassword}
                      onChange={e => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary pr-10"
                      placeholder="Enter current password" />
                    <button onClick={() => togglePassword('current')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                      <input type={showPassword.new ? 'text' : 'password'} value={passwordForm.newPassword}
                        onChange={e => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary pr-10"
                        placeholder="Enter new password" />
                      <button onClick={() => togglePassword('new')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <input type={showPassword.confirm ? 'text' : 'password'} value={passwordForm.confirmPassword}
                        onChange={e => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary pr-10"
                        placeholder="Confirm new password" />
                      <button onClick={() => togglePassword('confirm')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={handlePasswordChange} className="btn-primary">
                  <Lock size={16} /> Update Password
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center">
                  <History size={20} className="text-gold" />
                </div>
                <h3 className="text-base font-heading font-bold text-gray-800">Application History</h3>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {timelineData.map((item, i) => (
                    <div key={i} className="relative flex items-start gap-4">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.completed ? 'bg-success text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {item.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className={`text-sm font-semibold ${item.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                          {item.status}
                        </p>
                        <p className={`text-xs ${item.completed ? 'text-gray-500' : 'text-gray-400'}`}>{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                  <Trash2 size={20} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-bold text-gray-800">Delete Account</h3>
                  <p className="text-xs text-gray-500">Permanently delete your account and all associated data</p>
                </div>
              </div>
              <button onClick={() => setShowDeleteModal(true)}
                className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center gap-2 w-full justify-center">
                <Trash2 size={16} /> Request Data Deletion
              </button>
            </div>
          </div>
        </div>
      </section>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-red-500" />
            </div>
            <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">Confirm Data Deletion</h3>
            <p className="text-sm text-gray-600 mb-6">
              This action will permanently delete all your data including personal information, test results,
              certificates, and account history. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)}
                className="btn-outline flex-1 justify-center">Cancel</button>
              <button onClick={() => { setShowDeleteModal(false); }}
                className="flex-1 justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center gap-2">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
