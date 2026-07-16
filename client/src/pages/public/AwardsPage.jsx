import { Laptop, Shield, Award, Star, Trophy, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const awardTypes = [
  { icon: Laptop, title: 'Laptops', count: '4 Winners', desc: '1 Laptop per Phase — 1st Position', color: 'text-primary', bg: 'bg-primary-50' },
  { icon: Laptop, title: 'Chromebooks', count: '16 Winners', desc: '4 Chromebooks per Phase — 2nd to 5th', color: 'text-success', bg: 'bg-green-50' },
  { icon: Shield, title: 'Shields', count: '20 Winners', desc: '5 Shields per Phase — 6th to 10th', color: 'text-gold', bg: 'bg-gold/10' },
  { icon: Award, title: 'Certificates', count: 'Top 20 + All', desc: 'Appreciation + Participation with QR', color: 'text-primary', bg: 'bg-primary-50' },
];

const phaseWinners = [
  { phase: 'Phase 1', sub: 'Primary Level', winners: [
    { name: 'Ahmed Khan', award: 'Laptop', pos: '1st' },
    { name: 'Fatima Ali', award: 'Chromebook', pos: '2nd' },
    { name: 'Usman Raza', award: 'Chromebook', pos: '3rd' },
    { name: 'Ayesha Khan', award: 'Shield', pos: 'Top 10' },
  ]},
  { phase: 'Phase 2', sub: 'Middle Level', winners: [
    { name: 'Hira Batool', award: 'Laptop', pos: '1st' },
    { name: 'Zain Ali', award: 'Chromebook', pos: '2nd' },
    { name: 'Sara Khan', award: 'Chromebook', pos: '3rd' },
    { name: 'Ali Raza', award: 'Shield', pos: 'Top 10' },
  ]},
  { phase: 'Phase 3', sub: 'Matric Level', winners: [
    { name: 'Ali Raza', award: 'Laptop', pos: '1st' },
    { name: 'Mahnoor Fatima', award: 'Chromebook', pos: '2nd' },
    { name: 'Hassan Ali', award: 'Chromebook', pos: '3rd' },
    { name: 'Iqra Shah', award: 'Shield', pos: 'Top 10' },
  ]},
  { phase: 'Phase 4', sub: 'Senior Level', winners: [
    { name: 'Omar Farooq', award: 'Laptop', pos: '1st' },
    { name: 'Zainab Malik', award: 'Chromebook', pos: '2nd' },
    { name: 'Tariq Mehmood', award: 'Chromebook', pos: '3rd' },
    { name: 'Amina Tariq', award: 'Shield', pos: 'Top 10' },
  ]},
];

const hallOfFame = [
  { name: 'Ahmed Khan', phase: 'Phase 1', year: '2025', achievement: '1st Position — Laptop Winner' },
  { name: 'Hira Batool', phase: 'Phase 2', year: '2025', achievement: '1st Position — Laptop Winner' },
  { name: 'Ali Raza', phase: 'Phase 3', year: '2025', achievement: '1st Position — Laptop Winner' },
  { name: 'Omar Farooq', phase: 'Phase 4', year: '2025', achievement: '1st Position — Laptop Winner' },
];

const successStories = [
  { name: 'Fatima Ali', grade: 'Phase 1 — 2nd Position', quote: 'Winning the Chromebook was a dream come true. EduTalent gave me the confidence to aim higher.', award: 'Chromebook Winner' },
  { name: 'Usman Raza', grade: 'Phase 3 — Shield Holder', quote: 'The test was challenging but fair. I am proud to be recognized among Pakistan&apos;s brightest students.', award: 'Shield Winner' },
  { name: 'Mahnoor Fatima', grade: 'Phase 3 — 2nd Position', quote: 'This scholarship changed my family&apos;s perspective on education. Thank you EduTalent!', award: 'Chromebook Winner' },
];

const AwardsPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trophy size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Awards</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Outstanding prizes for outstanding students across all 4 phases.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-center mb-10">Award Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {awardTypes.map((a, i) => (
              <div key={i} className="text-center p-6 rounded-xl border-2 border-gray-100 hover:border-gold/30 transition-all hover:shadow-lg">
                <div className={`w-16 h-16 ${a.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <a.icon size={32} className={a.color} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">{a.title}</h3>
                <p className="text-gold font-heading font-bold text-xl mb-2">{a.count}</p>
                <p className="text-gray-500 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-heading font-bold text-center mb-8">Per-Phase Winner Gallery</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {phaseWinners.map((pw, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-heading font-bold text-primary mb-1">{pw.phase}</h3>
                <p className="text-sm text-gray-500 mb-4">{pw.sub}</p>
                <div className="grid gap-3">
                  {pw.winners.map((w, j) => (
                    <div key={j} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary font-bold text-xs">{w.name[0]}</div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{w.name}</p>
                          <p className="text-xs text-gray-500">{w.pos}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        w.award === 'Laptop' ? 'bg-primary-50 text-primary' :
                        w.award === 'Chromebook' ? 'bg-green-50 text-success' :
                        'bg-gold/10 text-gold'
                      }`}>{w.award}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-heading font-bold text-center mb-8">Hall of Fame</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {hallOfFame.map((h, i) => (
              <div key={i} className="bg-gradient-to-br from-gold/10 to-white rounded-xl p-6 text-center border border-gold/20 hover:shadow-lg transition-shadow">
                <Trophy size={32} className="text-gold mx-auto mb-3" />
                <h4 className="font-heading font-bold text-gray-900">{h.name}</h4>
                <p className="text-xs text-gray-500">{h.phase} — {h.year}</p>
                <p className="text-xs font-semibold text-gold mt-2">{h.achievement}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-heading font-bold text-center mb-8">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((s, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <Quote size={24} className="text-primary-200 mb-3" />
                <p className="text-gray-600 text-sm mb-4 italic">{s.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                    <span className="text-primary font-heading font-bold text-sm">{s.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.grade}</div>
                  </div>
                  <span className="ml-auto bg-gold/20 text-gold-800 text-xs font-semibold px-3 py-1 rounded-full">{s.award}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwardsPage;
