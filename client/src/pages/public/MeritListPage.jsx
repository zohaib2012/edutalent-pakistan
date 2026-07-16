import { useState } from 'react';
import { Medal, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const phases = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];

const generateMerit = (phase) => {
  const names = {
    'Phase 1': ['Ahmed Khan', 'Fatima Ali', 'Usman Raza', 'Ayesha Khan', 'Bilal Ahmed', 'Hira Batool', 'Zain Ali', 'Sara Khan', 'Ali Raza', 'Mahnoor Fatima', 'Hassan Ali', 'Iqra Shah', 'Omar Farooq', 'Zainab Malik', 'Tariq Mehmood'],
    'Phase 2': ['Hira Batool', 'Zain Ali', 'Sara Khan', 'Ali Raza', 'Mahnoor Fatima', 'Hassan Ali', 'Iqra Shah', 'Omar Farooq', 'Zainab Malik', 'Tariq Mehmood', 'Amina Tariq', 'Kamran Ali', 'Sadia Khan', 'Fahad Iqbal', 'Nadia Shah'],
    'Phase 3': ['Ali Raza', 'Mahnoor Fatima', 'Hassan Ali', 'Iqra Shah', 'Omar Farooq', 'Zainab Malik', 'Tariq Mehmood', 'Amina Tariq', 'Kamran Ali', 'Sadia Khan', 'Fahad Iqbal', 'Nadia Shah', 'Jawad Ahmed', 'Sana Mir', 'Usman Khalid'],
    'Phase 4': ['Omar Farooq', 'Zainab Malik', 'Tariq Mehmood', 'Amina Tariq', 'Kamran Ali', 'Sadia Khan', 'Fahad Iqbal', 'Nadia Shah', 'Jawad Ahmed', 'Sana Mir', 'Usman Khalid', 'Maryam Bibi', 'Imran Ali', 'Rabia Khan', 'Ahsan Raza'],
  };
  const n = names[phase] || names['Phase 1'];
  return n.slice(0, 15).map((name, i) => ({
    pos: i + 1,
    roll: `ET-2025-${String(100 + i).padStart(3, '0')}`,
    name,
    score: Math.max(50, 98 - i * 3 - Math.floor(Math.random() * 2)),
    percentage: `${Math.max(50, 98 - i * 3 - Math.floor(Math.random() * 2))}%`,
  }));
};

const MeritListPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const meritData = generateMerit(phases[activeTab]);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Merit List</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            View the top performers across all phases.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {phases.map((phase, i) => (
              <button
                key={phase}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === i
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-primary-50'
                }`}
              >
                {phase}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left px-6 py-4 text-sm font-semibold">Position</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Roll No</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Name</th>
                    <th className="text-center px-6 py-4 text-sm font-semibold">Score</th>
                    <th className="text-center px-6 py-4 text-sm font-semibold">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {meritData.map((r, i) => (
                    <tr
                      key={i}
                      className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${
                        i < 10 ? 'bg-gold/5' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {i === 0 && <span className="text-lg">🥇</span>}
                          {i === 1 && <span className="text-lg">🥈</span>}
                          {i === 2 && <span className="text-lg">🥉</span>}
                          {i >= 3 && i < 10 && <Medal size={16} className="text-gold" />}
                          <span className={`text-sm font-bold ${
                            i === 0 ? 'text-gold text-lg' :
                            i === 1 ? 'text-gray-400 text-lg' :
                            i === 2 ? 'text-amber-700 text-lg' :
                            'text-gray-900'
                          }`}>{r.pos}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{r.roll}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-semibold ${
                          i < 3 ? 'text-gray-900' : 'text-gray-900'
                        }`}>{r.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-center font-semibold text-primary">{r.score}/100</td>
                      <td className="px-6 py-4 text-sm text-center">
                        <span className={`inline-block font-semibold text-xs px-3 py-1 rounded-full ${
                          parseInt(r.percentage) >= 90 ? 'bg-green-50 text-success' :
                          parseInt(r.percentage) >= 80 ? 'bg-primary-50 text-primary' :
                          'bg-gold/10 text-gold'
                        }`}>{r.percentage}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/awards" className="btn-primary">View Awards <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeritListPage;
