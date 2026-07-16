import { useState } from 'react';
import { Trophy, Laptop, Shield, Quote, Star, Award, Medal, Sparkles } from 'lucide-react';

const phases = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];

const topWinners = {
  'Phase 1': {
    top3: [
      { pos: 1, name: 'Ahmed Khan', grade: 'Grade 5', award: 'Laptop', avatar: 'AK' },
      { pos: 2, name: 'Fatima Ali', grade: 'Grade 4', award: 'Chromebook', avatar: 'FA' },
      { pos: 3, name: 'Usman Raza', grade: 'Grade 3', award: 'Chromebook', avatar: 'UR' },
      { pos: 4, name: 'Ayesha Noor', grade: 'Grade 5', award: 'Chromebook', avatar: 'AN' },
      { pos: 5, name: 'Bilal Ahmed', grade: 'Grade 2', award: 'Chromebook', avatar: 'BA' },
      { pos: 6, name: 'Hira Batool', grade: 'Grade 1', award: 'Shield', avatar: 'HB' },
      { pos: 7, name: 'Zain Ul Abideen', grade: 'Grade 3', award: 'Shield', avatar: 'ZA' },
      { pos: 8, name: 'Sara Khan', grade: 'Grade 4', award: 'Shield', avatar: 'SK' },
      { pos: 9, name: 'Hamza Tariq', grade: 'Grade 5', award: 'Shield', avatar: 'HT' },
      { pos: 10, name: 'Laiba Imran', grade: 'Grade 2', award: 'Shield', avatar: 'LI' },
    ],
  },
  'Phase 2': {
    top3: [
      { pos: 1, name: 'Mahnoor Fatima', grade: 'Grade 7', award: 'Laptop', avatar: 'MF' },
      { pos: 2, name: 'Ali Hassan', grade: 'Grade 8', award: 'Chromebook', avatar: 'AH' },
      { pos: 3, name: 'Laiba Noor', grade: 'Grade 6', award: 'Chromebook', avatar: 'LN' },
      { pos: 4, name: 'Owais Qadri', grade: 'Grade 8', award: 'Chromebook', avatar: 'OQ' },
      { pos: 5, name: 'Nimra Saeed', grade: 'Grade 7', award: 'Chromebook', avatar: 'NS' },
      { pos: 6, name: 'Talha Mehmood', grade: 'Grade 6', award: 'Shield', avatar: 'TM' },
      { pos: 7, name: 'Iqra Jabeen', grade: 'Grade 8', award: 'Shield', avatar: 'IJ' },
      { pos: 8, name: 'Saad Ur Rehman', grade: 'Grade 7', award: 'Shield', avatar: 'SR' },
      { pos: 9, name: 'Kiran Shahzad', grade: 'Grade 6', award: 'Shield', avatar: 'KS' },
      { pos: 10, name: 'Haris Aziz', grade: 'Grade 8', award: 'Shield', avatar: 'HA' },
    ],
  },
  'Phase 3': {
    top3: [
      { pos: 1, name: 'Abdullah Riaz', grade: 'Grade 10', award: 'Laptop', avatar: 'AR' },
      { pos: 2, name: 'Sana Tariq', grade: 'Grade 9', award: 'Chromebook', avatar: 'ST' },
      { pos: 3, name: 'Daniyal Haider', grade: 'Grade 10', award: 'Chromebook', avatar: 'DH' },
      { pos: 4, name: 'Areeba Fatima', grade: 'Grade 9', award: 'Chromebook', avatar: 'AF' },
      { pos: 5, name: 'Naveed Akram', grade: 'Grade 10', award: 'Chromebook', avatar: 'NA' },
      { pos: 6, name: 'Sadia Iqbal', grade: 'Grade 9', award: 'Shield', avatar: 'SI' },
      { pos: 7, name: 'Zohaib Hassan', grade: 'Grade 10', award: 'Shield', avatar: 'ZH' },
      { pos: 8, name: 'Fajar Aslam', grade: 'Grade 9', award: 'Shield', avatar: 'FA2' },
      { pos: 9, name: 'Waleed Iqbal', grade: 'Grade 10', award: 'Shield', avatar: 'WI' },
      { pos: 10, name: 'Hafsa Tabassum', grade: 'Grade 9', award: 'Shield', avatar: 'HT2' },
    ],
  },
  'Phase 4': {
    top3: [
      { pos: 1, name: 'Amina Sheikh', grade: 'University', award: 'Laptop', avatar: 'AS' },
      { pos: 2, name: 'Hassan Raza', grade: 'Grade 12', award: 'Chromebook', avatar: 'HR' },
      { pos: 3, name: 'Marium Khalid', grade: 'Grade 11', award: 'Chromebook', avatar: 'MK' },
      { pos: 4, name: 'Ibrahim Khan', grade: 'University', award: 'Chromebook', avatar: 'IK' },
      { pos: 5, name: 'Javeria Sohail', grade: 'Grade 12', award: 'Chromebook', avatar: 'JS' },
      { pos: 6, name: 'Raheel Anwar', grade: 'Grade 11', award: 'Shield', avatar: 'RA' },
      { pos: 7, name: 'Samina Yousuf', grade: 'University', award: 'Shield', avatar: 'SY' },
      { pos: 8, name: 'Faraz Ahmed', grade: 'Grade 12', award: 'Shield', avatar: 'FA3' },
      { pos: 9, name: 'Madiha Noor', grade: 'Grade 11', award: 'Shield', avatar: 'MN' },
      { pos: 10, name: 'Saif Ur Rehman', grade: 'University', award: 'Shield', avatar: 'SU' },
    ],
  },
};

const successStories = [
  {
    name: 'Ahmed Khan',
    grade: 'Phase 1 — 1st Position',
    quote: 'Winning the EduTalent scholarship was a turning point in my academic journey. The laptop I received helped me access online learning resources I never had before.',
    award: 'Laptop Winner',
  },
  {
    name: 'Mahnoor Fatima',
    grade: 'Phase 2 — 1st Position',
    quote: 'I never imagined I could compete at a national level. EduTalent gave me the platform and the confidence to believe in myself. Thank you for recognizing my hard work!',
    award: 'Laptop Winner',
  },
  {
    name: 'Abdullah Riaz',
    grade: 'Phase 3 — 1st Position',
    quote: 'The transparent testing process and fair evaluation made me trust EduTalent completely. I am proud to be among the toppers and grateful for the recognition.',
    award: 'Laptop Winner',
  },
];

const getPosBadge = (pos) => {
  if (pos === 1) return { bg: 'from-gold to-yellow-500', icon: Trophy, label: '1st', badge: 'Laptop' };
  if (pos <= 5) return { bg: 'from-gray-300 to-gray-400', icon: Laptop, label: `${pos}th`, badge: 'Chromebook' };
  return { bg: 'from-amber-600 to-amber-700', icon: Shield, label: `${pos}th`, badge: 'Shield' };
};

const WinnersPage = () => {
  const [activePhase, setActivePhase] = useState('Phase 1');
  const phaseData = topWinners[activePhase];
  const first = phaseData.top3[0];
  const second = phaseData.top3[1];
  const third = phaseData.top3[2];
  const rest = phaseData.top3.slice(3);

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

      <section className="py-12 bg-white border-b border-gray-100 sticky top-16 md:top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {phases.map((phase) => (
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
            <p className="section-subtitle">Recognizing excellence with laptops, Chromebooks, and shields.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[second, first, third].map((winner, i) => {
              const order = i === 0 ? '2nd' : i === 1 ? '1st' : '3rd';
              const isFirst = order === '1st';
              const cardBg = isFirst
                ? 'bg-gradient-to-br from-gold via-yellow-400 to-amber-500 text-gray-900 ring-4 ring-gold/40 transform md:-mt-4'
                : order === '2nd'
                ? 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-900 ring-2 ring-gray-300'
                : 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white ring-2 ring-amber-400';
              const posBadge = getPosBadge(winner.pos);

              return (
                <div key={winner.name} className={`rounded-2xl shadow-2xl p-6 text-center relative overflow-hidden ${cardBg} ${isFirst ? 'md:scale-105 z-10' : ''}`}>
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
                    {winner.avatar}
                  </div>
                  <h3 className="font-heading font-bold text-lg">{winner.name}</h3>
                  <p className="text-sm opacity-75 mb-3">{winner.grade}</p>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    isFirst ? 'bg-yellow-600 text-white' : 'bg-white/20'
                  }`}>
                    <Trophy size={12} /> {winner.award}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rest.map((winner) => {
              const posBadge = getPosBadge(winner.pos);
              return (
                <div key={winner.name} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-sm font-heading font-bold text-primary group-hover:scale-110 transition-transform">
                      {winner.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-sm truncate">{winner.name}</h4>
                      <p className="text-xs text-gray-500">{winner.grade}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      winner.pos <= 5 ? 'bg-gray-100 text-gray-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      <posBadge.icon size={10} /> {posBadge.badge}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
