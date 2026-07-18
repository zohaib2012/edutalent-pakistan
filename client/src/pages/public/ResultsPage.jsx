import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Medal, ArrowRight } from 'lucide-react';

const placeholderResults = [
  { pos: 1, roll: 'ETP-2025-001', name: 'Ahmed Khan', phase: 'Phase 1', score: 96, percentage: '96%' },
  { pos: 2, roll: 'ETP-2025-002', name: 'Fatima Ali', phase: 'Phase 1', score: 94, percentage: '94%' },
  { pos: 3, roll: 'ETP-2025-003', name: 'Usman Raza', phase: 'Phase 1', score: 92, percentage: '92%' },
  { pos: 4, roll: 'ETP-2025-004', name: 'Ayesha Khan', phase: 'Phase 1', score: 90, percentage: '90%' },
  { pos: 5, roll: 'ETP-2025-005', name: 'Bilal Ahmed', phase: 'Phase 1', score: 88, percentage: '88%' },
  { pos: 6, roll: 'ETP-2025-006', name: 'Hira Batool', phase: 'Phase 2', score: 91, percentage: '91%' },
  { pos: 7, roll: 'ETP-2025-007', name: 'Zain Ali', phase: 'Phase 2', score: 89, percentage: '89%' },
  { pos: 8, roll: 'ETP-2025-008', name: 'Sara Khan', phase: 'Phase 2', score: 87, percentage: '87%' },
];

const ResultsPage = () => {
  const [selectedPhase, setSelectedPhase] = useState('All');
  const [searchRoll, setSearchRoll] = useState('');

  const filtered = placeholderResults.filter(r => {
    const matchPhase = selectedPhase === 'All' || r.phase === selectedPhase;
    const matchRoll = !searchRoll || r.roll.toLowerCase().includes(searchRoll.toLowerCase());
    return matchPhase && matchRoll;
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Results</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            View scholarship test results and merit positions.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Filter by Phase</label>
                <div className="relative">
                  <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedPhase}
                    onChange={(e) => setSelectedPhase(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  >
                    <option value="All">All Phases</option>
                    <option value="Phase 1">Phase 1</option>
                    <option value="Phase 2">Phase 2</option>
                    <option value="Phase 3">Phase 3</option>
                    <option value="Phase 4">Phase 4</option>
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Search by Roll No</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchRoll}
                    onChange={(e) => setSearchRoll(e.target.value)}
                    placeholder="Enter Roll Number..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left px-6 py-4 text-sm font-semibold">Position</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Roll No</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Name</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Phase</th>
                    <th className="text-center px-6 py-4 text-sm font-semibold">Score</th>
                    <th className="text-center px-6 py-4 text-sm font-semibold">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">No results found.</td>
                    </tr>
                  ) : (
                    filtered.map((r, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {r.pos <= 3 ? <Medal size={16} className={r.pos === 1 ? 'text-gold' : r.pos === 2 ? 'text-gray-400' : 'text-amber-700'} /> : null}
                            <span className="text-sm font-semibold text-gray-900">{r.pos}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{r.roll}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{r.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{r.phase}</td>
                        <td className="px-6 py-4 text-sm text-center font-semibold text-primary">{r.score}/100</td>
                        <td className="px-6 py-4 text-sm text-center">
                          <span className={`inline-block font-semibold text-xs px-3 py-1 rounded-full ${
                            parseInt(r.percentage) >= 90 ? 'bg-green-50 text-success' :
                            parseInt(r.percentage) >= 80 ? 'bg-primary-50 text-primary' :
                            'bg-gold/10 text-gold'
                          }`}>{r.percentage}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/merit-list" className="btn-primary">View Full Merit List <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultsPage;
