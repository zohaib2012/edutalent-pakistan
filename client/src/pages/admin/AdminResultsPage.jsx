import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Award, Loader2, Search, UserPlus, CheckCircle } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api, { getSettings } from '../../services/api';

export default function AdminResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phases, setPhases] = useState([]);
  const [phase, setPhase] = useState('');
  const [generating, setGenerating] = useState(false);

  // Single student result
  const [studentQuery, setStudentQuery] = useState('');
  const [studentResults, setStudentResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [generatingSingle, setGeneratingSingle] = useState(false);

  useEffect(() => {
    fetchResults();
    loadPhases();
  }, []);

  const loadPhases = async () => {
    try {
      const { data } = await getSettings();
      if (data.success) {
        setPhases(data.data.phases.filter((p) => p.isActive));
      }
    } catch {
      setPhases([]);
    }
  };

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
    setGenerating(true);
    try {
      const res = await api.post(`/results/generate/${phase}`);
      alert(res.data?.message || 'Results generated');
      fetchResults();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to generate results');
    } finally {
      setGenerating(false);
    }
  };

  const searchStudents = async (q) => {
    setStudentQuery(q);
    if (!q.trim()) { setStudentResults([]); return; }
    try {
      const res = await api.get('/students', { params: { search: q, limit: 20 } });
      setStudentResults(res.data?.students || []);
    } catch {
      setStudentResults([]);
    }
  };

  const generateSingleResult = async () => {
    if (!selectedStudent) { alert('Select a student first'); return; }
    setGeneratingSingle(true);
    try {
      const res = await api.post(`/results/generate-single/${selectedStudent}`);
      alert(res.data?.message || 'Result generated');
      setSelectedStudent('');
      setStudentQuery('');
      setStudentResults([]);
      fetchResults();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to generate result');
    } finally {
      setGeneratingSingle(false);
    }
  };

  const filteredResults = phase ? results.filter((r) => (r.phaseId?._id || r.phaseId) === phase) : results;

  const avgScore = filteredResults.length > 0
    ? (filteredResults.reduce((s, r) => s + (r.obtainedMarks || 0), 0) / filteredResults.length).toFixed(1)
    : '0';
  const topScore = filteredResults.length > 0
    ? Math.max(...filteredResults.map((r) => r.obtainedMarks || 0))
    : 0;
  const totalMarks = filteredResults[0]?.totalMarks || 100;

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Results Management</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 size={16} className="text-[#1A73E8]" /> Generate Results — Phase-wise
              </h3>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                  <select value={phase} onChange={(e) => setPhase(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                    <option value="">Select Phase</option>
                    {phases.map((p) => (
                      <option key={p._id} value={p._id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <button onClick={generateResults} disabled={generating}
                  className="bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] disabled:opacity-50 flex items-center gap-2">
                  {generating ? <Loader2 size={16} className="animate-spin" /> : <BarChart3 size={16} />} Generate
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <UserPlus size={16} className="text-[#2ECC71]" /> Generate Result — Single Student
              </h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search student by name / registration / CNIC..."
                  value={studentQuery}
                  onChange={(e) => searchStudents(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#2ECC71]" />
                {studentQuery && studentResults.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {studentResults.map((s) => (
                      <button key={s._id} onClick={() => { setSelectedStudent(s._id); setStudentQuery(`${s.fullName} — ${s.registrationNumber}`); setStudentResults([]); }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 transition-colors">
                        <span className="font-medium">{s.fullName}</span>
                        <span className="text-xs text-gray-500 ml-2 font-mono">{s.registrationNumber}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={generateSingleResult} disabled={!selectedStudent || generatingSingle}
                className="mt-3 w-full bg-[#2ECC71] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#27AE60] disabled:opacity-50 flex items-center justify-center gap-2">
                {generatingSingle ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />} Generate Result for Selected Student
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="p-2 bg-blue-50 rounded-lg w-fit mb-2"><BarChart3 size={20} className="text-[#1A73E8]" /></div>
              <p className="text-2xl font-bold text-gray-900">{avgScore}/{totalMarks}</p>
              <p className="text-sm text-gray-500">Average Score</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="p-2 bg-green-50 rounded-lg w-fit mb-2"><TrendingUp size={20} className="text-[#2ECC71]" /></div>
              <p className="text-2xl font-bold text-gray-900">{filteredResults.length > 0 ? Math.round((filteredResults.filter(r => (r.percentage || 0) >= 50).length / filteredResults.length) * 100) : 0}%</p>
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
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="text-center py-10"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></td></tr>
                  ) : filteredResults.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-10 text-gray-400">No results published yet.</td></tr>
                  ) : filteredResults.map((r, i) => (
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
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          Published
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
