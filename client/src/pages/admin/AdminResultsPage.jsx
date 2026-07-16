import { useState } from 'react';
import {
  BarChart3, Download, FileText, TrendingUp, Award, CheckCircle, XCircle
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const resultsData = [
  { rank: 1, rollNo: 'ST-1001', name: 'Ahmed Khan', score: 48, total: 50, percentage: 96, award: 'Gold' },
  { rank: 2, rollNo: 'ST-1005', name: 'Hassan Shah', score: 45, total: 50, percentage: 90, award: 'Silver' },
  { rank: 3, rollNo: 'ST-1003', name: 'Usman Raza', score: 43, total: 50, percentage: 86, award: 'Bronze' },
  { rank: 4, rollNo: 'ST-1002', name: 'Fatima Ali', score: 40, total: 50, percentage: 80, award: 'Merit' },
  { rank: 5, rollNo: 'ST-1008', name: 'Sana Tariq', score: 38, total: 50, percentage: 76, award: 'None' },
];

const awardColors = {
  Gold: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Silver: 'bg-gray-50 text-gray-600 border-gray-200',
  Bronze: 'bg-amber-50 text-amber-700 border-amber-200',
  Merit: 'bg-blue-50 text-blue-700 border-blue-200',
  None: 'bg-gray-100 text-gray-400 border-gray-100',
};

export default function AdminResultsPage() {
  const [phase, setPhase] = useState('Phase 1');
  const [published, setPublished] = useState(false);

  const avgScore = (resultsData.reduce((s, r) => s + r.score, 0) / resultsData.length).toFixed(1);
  const passRate = ((resultsData.filter((r) => r.percentage >= 50).length / resultsData.length) * 100).toFixed(0);
  const topScore = Math.max(...resultsData.map((r) => r.score));

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Results Management</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <FileText size={16} />
                Export as PDF
              </button>
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <Download size={16} />
                Export as CSV
              </button>
              <button
                onClick={() => setPublished(!published)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  published
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                }`}
              >
                {published ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {published ? 'Published' : 'Publish Results'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
              >
                <option>Phase 1</option>
                <option>Phase 2</option>
                <option>Phase 3</option>
                <option>Phase 4</option>
              </select>
            </div>
            <button className="mt-5 bg-[#1A73E8] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors flex items-center gap-2">
              <BarChart3 size={16} />
              Generate Results
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg"><BarChart3 size={20} className="text-[#1A73E8]" /></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{avgScore}/{resultsData[0]?.total || 0}</p>
              <p className="text-sm text-gray-500">Average Score</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-50 rounded-lg"><TrendingUp size={20} className="text-[#2ECC71]" /></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{passRate}%</p>
              <p className="text-sm text-gray-500">Pass Rate</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-50 rounded-lg"><Award size={20} className="text-[#F1C40F]" /></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{topScore}/{resultsData[0]?.total || 0}</p>
              <p className="text-sm text-gray-500">Top Score</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">Rank</th>
                    <th className="text-left px-5 py-3 font-medium">Roll No</th>
                    <th className="text-left px-5 py-3 font-medium">Student Name</th>
                    <th className="text-left px-5 py-3 font-medium">Score</th>
                    <th className="text-left px-5 py-3 font-medium">Percentage</th>
                    <th className="text-left px-5 py-3 font-medium">Award Category</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsData.map((r) => (
                    <tr key={r.rank} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                          r.rank === 1 ? 'bg-yellow-50 text-yellow-700' :
                          r.rank === 2 ? 'bg-gray-100 text-gray-600' :
                          r.rank === 3 ? 'bg-amber-50 text-amber-700' :
                          'bg-gray-50 text-gray-500'
                        }`}>
                          {r.rank}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-gray-600">{r.rollNo}</td>
                      <td className="px-5 py-3 font-medium text-gray-900">{r.name}</td>
                      <td className="px-5 py-3 text-gray-800">{r.score}/{r.total}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-100 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-[#1A73E8]"
                              style={{ width: `${r.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{r.percentage}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${awardColors[r.award] || awardColors.None}`}>
                          {r.award}
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
