import { useState, useEffect } from 'react';
import { BarChart3, Download, FileText, TrendingUp, Award, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api from '../../services/api';

export default function AdminResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState('');

  useEffect(() => { fetchResults(); }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await api.get('/results');
      setResults(res.data || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const generateResults = async () => {
    if (!phase) { alert('Select a phase first'); return; }
    try {
      const res = await api.post(`/results/generate/${phase}`);
      alert(res.data?.message || 'Results generated');
      fetchResults();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to generate results');
    }
  };

  const avgScore = results.length > 0
    ? (results.reduce((s, r) => s + (r.obtainedMarks || 0), 0) / results.length).toFixed(1)
    : '0';
  const topScore = results.length > 0
    ? Math.max(...results.map((r) => r.obtainedMarks || 0))
    : 0;
  const totalMarks = results[0]?.totalMarks || 100;

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Results Management</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"><Download size={16} /> Export CSV</button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
              <select value={phase} onChange={(e) => setPhase(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                <option value="">Select Phase</option>
              </select>
            </div>
            <button onClick={generateResults} className="mt-5 bg-[#1A73E8] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] flex items-center gap-2">
              <BarChart3 size={16} /> Generate Results
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="p-2 bg-blue-50 rounded-lg w-fit mb-2"><BarChart3 size={20} className="text-[#1A73E8]" /></div>
              <p className="text-2xl font-bold text-gray-900">{avgScore}/{totalMarks}</p>
              <p className="text-sm text-gray-500">Average Score</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="p-2 bg-green-50 rounded-lg w-fit mb-2"><TrendingUp size={20} className="text-[#2ECC71]" /></div>
              <p className="text-2xl font-bold text-gray-900">{results.length > 0 ? Math.round((results.filter(r => (r.percentage || 0) >= 50).length / results.length) * 100) : 0}%</p>
              <p className="text-sm text-gray-500">Pass Rate</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="p-2 bg-amber-50 rounded-lg w-fit mb-2"><Award size={20} className="text-[#F1C40F]" /></div>
              <p className="text-2xl font-bold text-gray-900">{topScore}/{totalMarks}</p>
              <p className="text-sm text-gray-500">Top Score</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">Student</th>
                    <th className="text-left px-5 py-3 font-medium">Roll No</th>
                    <th className="text-left px-5 py-3 font-medium">Score</th>
                    <th className="text-left px-5 py-3 font-medium">Percentage</th>
                    <th className="text-left px-5 py-3 font-medium">Award</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="text-center py-10"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></td></tr>
                  ) : results.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-10 text-gray-400">No results published yet.</td></tr>
                  ) : results.map((r, i) => (
                    <tr key={r._id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-900">{r.studentId?.fullName || '-'}</td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-600">{r.rollNumber || '-'}</td>
                      <td className="px-5 py-3 text-gray-800">{r.obtainedMarks || 0}/{r.totalMarks || 100}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-100 rounded-full h-2">
                            <div className="h-2 rounded-full bg-[#1A73E8]" style={{ width: `${r.percentage || 0}%` }} />
                          </div>
                          <span className="text-xs text-gray-600">{r.percentage || 0}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          {r.awardCategory || '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
