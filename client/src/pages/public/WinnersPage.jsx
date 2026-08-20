import { useState, useEffect } from 'react';
import { Trophy, Shield, Quote, Award, Medal, Sparkles, MapPin, School, User, Loader2 } from 'lucide-react';
import { getPublicAwardWinners } from '../../services/api';

const awardDisplay = (award) => {
  if (!award) return 'Scholarship Winner';
  if (award.awardTitle) return award.awardTitle;
  const map = { laptop: 'Laptop', chromebook: 'Chromebook', shield: 'Shield', certificate: 'Certificate', participation: 'Participation' };
  return map[award.awardType] || 'Scholarship Winner';
};

const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() || '?';
};

const getPosBadge = (pos) => {
  if (pos === 1) return { bg: 'from-gold to-yellow-500', icon: Trophy, label: '1st' };
  if (pos <= 5) return { bg: 'from-gray-300 to-gray-400', icon: Medal, label: `${pos}th` };
  return { bg: 'from-amber-600 to-amber-700', icon: Shield, label: `${pos}th` };
};

const WinnersPage = () => {
  const [loading, setLoading] = useState(true);
  const [winnersByPhase, setWinnersByPhase] = useState({});
  const [phaseNames, setPhaseNames] = useState([]);
  const [activePhase, setActivePhase] = useState('');
  const [allWinners, setAllWinners] = useState([]);

  useEffect(() => {
    getPublicAwardWinners()
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        const groups = {};
        list.forEach((w) => {
          const name = w.phaseName || w.phaseId?.name || 'Other';
          if (!groups[name]) groups[name] = [];
          groups[name].push(w);
        });
        Object.keys(groups).forEach((k) => {
          const order = { laptop: 0, chromebook: 1, shield: 2, certificate: 3, participation: 4 };
          groups[k].sort((a, b) => (order[a.awardType] ?? 9) - (order[b.awardType] ?? 9));
        });
        const names = Object.keys(groups).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        setWinnersByPhase(groups);
        setPhaseNames(names);
        setActivePhase(names[0] || '');
        setAllWinners(list);
      })
      .catch(() => {
        setWinnersByPhase({});
        setPhaseNames([]);
        setAllWinners([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const phaseData = winnersByPhase[activePhase] || [];
  const top3 = phaseData.slice(0, 3);
  const first = top3[0];
  const second = top3[1];
  const third = top3[2];
  const rest = phaseData.slice(3);

  const successStories = allWinners.slice(0, 3).map((w) => ({
    name: w.fullName,
    grade: `${w.phaseId?.name || 'Phase'} — Winner`,
    quote: `Congratulations ${w.fullName}! Recognized by EduTalent Pakistan for outstanding performance and awarded ${awardDisplay(w)}.`,
    award: awardDisplay(w),
  }));

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-4">
            <Trophy size={16} className="text-gold" />
            <span>Hall of Fame</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Award Winners</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Celebrating the outstanding achievements of our top-performing students across all phases.</p>
        </div>
      </section>

      {loading ? (
        <section className="py-24 bg-gray-50 min-h-[60vh] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-primary" />
        </section>
      ) : phaseNames.length === 0 ? (
        <section className="py-24 bg-gray-50 min-h-[60vh]">
          <div className="max-w-md mx-auto text-center">
            <Award size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Winners have not been announced yet. Please check back soon.</p>
          </div>
        </section>
      ) : (
        <>
          <section className="py-12 bg-white border-b border-gray-100 sticky top-16 md:top-20 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-3">
                {phaseNames.map((phase) => (
                  <button
                    key={phase}
                    onClick={() => setActivePhase(phase)}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      activePhase === phase
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {phase}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="section-title">Top Performers — {activePhase}</h2>
                <p className="section-subtitle">Recognizing excellence with scholarship awards.</p>
              </div>

              {top3.length === 0 ? (
                <div className="text-center text-gray-400 py-10">No winners announced for this phase yet.</div>
              ) : (
                <>
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[second, first, third].filter(Boolean).map((winner, i) => {
                      const order = i === 0 ? '2nd' : i === 1 ? '1st' : '3rd';
                      const isFirst = order === '1st';
                      const cardBg = isFirst
                        ? 'bg-gradient-to-br from-gold via-yellow-400 to-amber-500 text-gray-900 ring-4 ring-gold/40 transform md:-mt-4'
                        : order === '2nd'
                        ? 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-900 ring-2 ring-gray-300'
                        : 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white ring-2 ring-amber-400';

                      return (
                        <div key={winner._id || winner.fullName} className={`rounded-2xl shadow-2xl p-6 text-center relative overflow-hidden ${cardBg} ${isFirst ? 'md:scale-105 z-10' : ''}`}>
                          <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            isFirst ? 'bg-yellow-600 text-white' : 'bg-white/20 text-white'
                          }`}>
                            {order}
                          </div>
                          {isFirst && (
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                              <Sparkles size={20} className="text-yellow-600" />
                            </div>
                          )}
                          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-heading font-bold ${
                            isFirst ? 'bg-yellow-600 text-white' : 'bg-white/20'
                          }`}>
                            {getInitials(winner.fullName)}
                          </div>
                          <h3 className="font-heading font-bold text-lg">{winner.fullName}</h3>
                          <div className="flex items-center justify-center gap-1 text-sm opacity-75 mb-1">
                            <User size={12} /> {'Winner'}
                          </div>
                          <div className="flex items-center justify-center gap-1 text-xs opacity-60 mb-3">
                            <MapPin size={10} /> {winner.city || 'Pakistan'}, {winner.province || ''}
                          </div>
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                            isFirst ? 'bg-yellow-600 text-white' : 'bg-white/20'
                          }`}>
                            <Trophy size={12} /> {awardDisplay(winner)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {rest.map((winner, idx) => {
                      const posBadge = getPosBadge(idx + 4);
                      return (
                        <div key={winner._id || winner.fullName} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow group">
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-sm font-heading font-bold text-primary group-hover:scale-110 transition-transform">
                              {getInitials(winner.fullName)}
                            </div>
                            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                              (idx + 4) <= 5 ? 'bg-gray-100 text-gray-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              <posBadge.icon size={10} /> Position {posBadge.label}
                            </div>
                          </div>
                          <h4 className="font-heading font-semibold text-sm mb-1">{winner.fullName}</h4>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                            <Award size={10} /> {awardDisplay(winner)}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                            <School size={10} /> {winner.phaseId?.name || 'EduTalent Pakistan'}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin size={10} /> {winner.city || 'Pakistan'}, {winner.province || ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </section>

          {successStories.length > 0 && (
            <section className="py-16 md:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="section-title">Success Stories</h2>
                  <p className="section-subtitle">Hear from our winners and how EduTalent transformed their academic journey.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {successStories.map((story, i) => (
                    <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                          <Quote size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-sm">{story.name}</h4>
                          <p className="text-xs text-gray-500">{story.grade}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 italic mb-4">&ldquo;{story.quote}&rdquo;</p>
                      <span className="inline-block bg-gold/20 text-gold-800 text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                        {story.award}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="py-16 bg-gradient-to-r from-primary to-primary-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Award size={48} className="mx-auto mb-4 text-gold" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Could You Be the Next Winner?</h2>
          <p className="text-white/80 text-lg mb-8">Thousands of students have already registered. Your talent deserves to be recognized.</p>
        </div>
      </section>
    </div>
  );
};

export default WinnersPage;
