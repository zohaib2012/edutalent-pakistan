import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { adminLogin } from '../../services/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await adminLogin({ email, password });
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminUser', JSON.stringify(res.data.admin));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1A73E8]/10 rounded-full mb-4">
              <LogIn className="text-[#1A73E8]" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EduTalent Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to the admin panel</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@edutalent.edu.pk"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="/admin/forgot-password" className="text-[#1A73E8] hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A73E8] hover:bg-[#1557B0] disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              {loading ? 'Logging in...' : 'Login to Admin Panel'}
            </button>
          </form>

          <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium mb-1">Demo Credentials:</p>
            <p className="text-xs text-gray-400">Email: admin@edutalent.edu.pk</p>
            <p className="text-xs text-gray-400">Password: admin123</p>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            &copy; {new Date().getFullYear()} EduTalent Pakistan. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
