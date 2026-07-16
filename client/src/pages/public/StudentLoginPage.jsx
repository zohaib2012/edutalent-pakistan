import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { studentLogin } from '../../services/api';

const StudentLoginPage = () => {
  const [regNumber, setRegNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!regNumber || !password) {
      setError('Please enter both registration number and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await studentLogin({ registrationNumber: regNumber, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('student', JSON.stringify(res.data.student));
      navigate('/challan');
    } catch (err) {
      if (regNumber === 'ETP-2025-P1-0001' && password === 'student123') {
        navigate('/challan');
        return;
      }
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-heading font-bold text-2xl">ET</span>
            </div>
            <h1 className="text-2xl font-heading font-bold text-gray-900">Student Login</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your credentials to access your dashboard</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
              <input
                type="text"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="e.g. ETP-2025-P1-0001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
              />
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-3">
              <LogIn size={18} />
              Login
            </button>
          </form>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-medium mb-1">Demo Credentials:</p>
            <p className="text-xs text-gray-400">Reg #: ETP-2025-P1-0001</p>
            <p className="text-xs text-gray-400">Password: student123</p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link to="/apply" className="text-primary font-semibold hover:underline">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;
