import { Laptop, Shield, Award, Star, Trophy, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const awardTypes = [
  { icon: Laptop, title: 'Laptops', count: '', desc: 'Scholarship Awards', color: 'text-primary', bg: 'bg-primary-50' },
  { icon: Laptop, title: 'Chromebooks', count: '', desc: 'Scholarship Awards', color: 'text-success', bg: 'bg-green-50' },
  { icon: Shield, title: 'Shields', count: '', desc: 'Scholarship Awards', color: 'text-gold', bg: 'bg-gold/10' },
  { icon: Award, title: 'Certificates & Trophies', count: '', desc: 'Appreciation + Participation with QR verification', color: 'text-primary', bg: 'bg-primary-50' },
];

const phases = [
  { phase: 'Phase 1', sub: 'Primary Level' },
  { phase: 'Phase 2', sub: 'Middle Level' },
  { phase: 'Phase 3', sub: 'Matric Level' },
  { phase: 'Phase 4', sub: 'Senior Level' },
];

const hallOfFame = [
  { name: 'Ahmed Khan', phase: 'Phase 1', year: '2025', achievement: 'Position Holder — Scholarship Award' },
  { name: 'Hira Batool', phase: 'Phase 2', year: '2025', achievement: 'Position Holder — Scholarship Award' },
  { name: 'Ali Raza', phase: 'Phase 3', year: '2025', achievement: 'Position Holder — Scholarship Award' },
  { name: 'Omar Farooq', phase: 'Phase 4', year: '2025', achievement: 'Position Holder — Scholarship Award' },
];

const successStories = [
  { name: 'Fatima Ali', grade: 'Phase 1 — Position Holder', quote: 'Winning the scholarship award was a dream come true. EduTalent gave me the confidence to aim higher.', award: 'Scholarship Winner' },
  { name: 'Usman Raza', grade: 'Phase 3 — Award Recipient', quote: 'The test was challenging but fair. I am proud to be recognized among Pakistan&apos;s brightest students.', award: 'Scholarship Winner' },
  { name: 'Mahnoor Fatima', grade: 'Phase 3 — Position Holder', quote: 'This scholarship changed my family&apos;s perspective on education. Thank you EduTalent!', award: 'Scholarship Winner' },
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
            Scholarship awards, laptops, Chromebooks, shields, certificates, and trophies for outstanding students across all 4 phases.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-center mb-10">Scholarship Awards 🏆</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {awardTypes.map((a, i) => (
              <div key={i} className="text-center p-6 rounded-xl border-2 border-gray-100 hover:border-gold/30 transition-all hover:shadow-lg">
                <div className={`w-16 h-16 ${a.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <a.icon size={32} className={a.color} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">{a.title}</h3>
                <p className="text-gray-500 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-heading font-bold text-center mb-8">Per-Phase Award Categories</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {phases.map((pw, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-heading font-bold text-primary mb-1">{pw.phase}</h3>
                <p className="text-sm text-gray-500 mb-4">{pw.sub}</p>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <Laptop size={20} className="text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Laptop</p>
                        <p className="text-xs text-gray-500">Top Position</p>
                      </div>
                    </div>
                    <span className="ml-auto bg-primary-50 text-primary text-xs font-semibold px-3 py-1 rounded-full">1 Award</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <Laptop size={20} className="text-success" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Chromebooks</p>
                        <p className="text-xs text-gray-500">Outstanding Achievers</p>
                      </div>
                    </div>
                    <span className="ml-auto bg-green-50 text-success text-xs font-semibold px-3 py-1 rounded-full">4 Awards</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-gold" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Shields</p>
                        <p className="text-xs text-gray-500">Top Contenders</p>
                      </div>
                    </div>
                    <span className="ml-auto bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full">5 Awards</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <Award size={20} className="text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Certificates</p>
                        <p className="text-xs text-gray-500">Top 20 + All Participants</p>
                      </div>
                    </div>
                    <span className="ml-auto bg-primary-50 text-primary text-xs font-semibold px-3 py-1 rounded-full">With QR Code</span>
                  </div>
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
