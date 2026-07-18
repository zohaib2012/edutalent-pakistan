import { useState } from 'react';
import { Trophy, Laptop, Shield, Quote, Star, Award, Medal, Sparkles, MapPin, School, User, Building2 } from 'lucide-react';

const phases = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];

const topWinners = {
  'Phase 1': {
    top3: [
      { pos: 1, name: 'Ahmed Khan', fatherName: 'Muhammad Khan', school: 'The City School', city: 'Karachi', province: 'Sindh', award: 'Laptop', grade: 'Grade 5', avatar: 'AK' },
      { pos: 2, name: 'Fatima Ali', fatherName: 'Ali Ahmed', school: 'Beaconhouse School', city: 'Lahore', province: 'Punjab', award: 'Chromebook', grade: 'Grade 4', avatar: 'FA' },
      { pos: 3, name: 'Usman Raza', fatherName: 'Raza Haider', school: 'Army Public School', city: 'Rawalpindi', province: 'Punjab', award: 'Chromebook', grade: 'Grade 3', avatar: 'UR' },
      { pos: 4, name: 'Ayesha Noor', fatherName: 'Khalid Mehmood', school: 'Lahore Grammar School', city: 'Lahore', province: 'Punjab', award: 'Chromebook', grade: 'Grade 5', avatar: 'AN' },
      { pos: 5, name: 'Bilal Ahmed', fatherName: 'Ahmed Ali', school: 'The Educators', city: 'Islamabad', province: 'Islamabad', award: 'Chromebook', grade: 'Grade 2', avatar: 'BA' },
      { pos: 6, name: 'Hira Batool', fatherName: 'Syed Hussain', school: 'Allied School', city: 'Multan', province: 'Punjab', award: 'Shield', grade: 'Grade 1', avatar: 'HB' },
      { pos: 7, name: 'Zain Ul Abideen', fatherName: 'Abideen Ali', school: 'Dar-e-Arqam School', city: 'Faisalabad', province: 'Punjab', award: 'Shield', grade: 'Grade 3', avatar: 'ZA' },
      { pos: 8, name: 'Sara Khan', fatherName: 'Khan Zada', school: 'Happy Palace School', city: 'Karachi', province: 'Sindh', award: 'Shield', grade: 'Grade 4', avatar: 'SK' },
      { pos: 9, name: 'Hamza Tariq', fatherName: 'Tariq Javed', school: 'Roots School', city: 'Islamabad', province: 'Islamabad', award: 'Shield', grade: 'Grade 5', avatar: 'HT' },
      { pos: 10, name: 'Laiba Imran', fatherName: 'Imran Khan', school: 'Pak Turk School', city: 'Peshawar', province: 'KPK', award: 'Shield', grade: 'Grade 2', avatar: 'LI' },
    ],
  },
  'Phase 2': {
    top3: [
      { pos: 1, name: 'Mahnoor Fatima', fatherName: 'Fatih Ullah', school: 'Fazaia Inter College', city: 'Karachi', province: 'Sindh', award: 'Laptop', grade: 'Grade 7', avatar: 'MF' },
      { pos: 2, name: 'Ali Hassan', fatherName: 'Hassan Raza', school: 'Crescent Model School', city: 'Lahore', province: 'Punjab', award: 'Chromebook', grade: 'Grade 8', avatar: 'AH' },
      { pos: 3, name: 'Laiba Noor', fatherName: 'Noor Ahmed', school: 'Peshawar Model School', city: 'Peshawar', province: 'KPK', award: 'Chromebook', grade: 'Grade 6', avatar: 'LN' },
      { pos: 4, name: 'Owais Qadri', fatherName: 'Qadri Hussain', school: 'Whales College', city: 'Multan', province: 'Punjab', award: 'Chromebook', grade: 'Grade 8', avatar: 'OQ' },
      { pos: 5, name: 'Nimra Saeed', fatherName: 'Saeed Ahmed', school: 'City Grammar School', city: 'Quetta', province: 'Balochistan', award: 'Chromebook', grade: 'Grade 7', avatar: 'NS' },
      { pos: 6, name: 'Talha Mehmood', fatherName: 'Mehmood Ghaznavi', school: 'The Smart School', city: 'Karachi', province: 'Sindh', award: 'Shield', grade: 'Grade 6', avatar: 'TM' },
      { pos: 7, name: 'Iqra Jabeen', fatherName: 'Jabeen Ali', school: 'Al-Huda School', city: 'Lahore', province: 'Punjab', award: 'Shield', grade: 'Grade 8', avatar: 'IJ' },
      { pos: 8, name: 'Saad Ur Rehman', fatherName: 'Rehman Malik', school: 'Abbottabad Public School', city: 'Abbottabad', province: 'KPK', award: 'Shield', grade: 'Grade 7', avatar: 'SR' },
      { pos: 9, name: 'Kiran Shahzad', fatherName: 'Shahzad Ali', school: 'Sadiq Public School', city: 'Bahawalpur', province: 'Punjab', award: 'Shield', grade: 'Grade 6', avatar: 'KS' },
      { pos: 10, name: 'Haris Aziz', fatherName: 'Aziz Khan', school: 'St. Joseph School', city: 'Karachi', province: 'Sindh', award: 'Shield', grade: 'Grade 8', avatar: 'HA' },
    ],
  },
  'Phase 3': {
    top3: [
      { pos: 1, name: 'Abdullah Riaz', fatherName: 'Riaz Ahmed', school: 'Govt College Lahore', city: 'Lahore', province: 'Punjab', award: 'Laptop', grade: 'Grade 10', avatar: 'AR' },
      { pos: 2, name: 'Sana Tariq', fatherName: 'Tariq Jameel', school: 'Islamia College', city: 'Peshawar', province: 'KPK', award: 'Chromebook', grade: 'Grade 9', avatar: 'ST' },
      { pos: 3, name: 'Daniyal Haider', fatherName: 'Haider Ali', school: 'DJ Science College', city: 'Karachi', province: 'Sindh', award: 'Chromebook', grade: 'Grade 10', avatar: 'DH' },
      { pos: 4, name: 'Areeba Fatima', fatherName: 'Fatima Ali', school: 'Kinnaird College', city: 'Lahore', province: 'Punjab', award: 'Chromebook', grade: 'Grade 9', avatar: 'AF' },
      { pos: 5, name: 'Naveed Akram', fatherName: 'Akram Sohail', school: 'Govt Degree College', city: 'Quetta', province: 'Balochistan', award: 'Chromebook', grade: 'Grade 10', avatar: 'NA' },
      { pos: 6, name: 'Sadia Iqbal', fatherName: 'Iqbal Hussain', school: 'Punjab College', city: 'Faisalabad', province: 'Punjab', award: 'Shield', grade: 'Grade 9', avatar: 'SI' },
      { pos: 7, name: 'Zohaib Hassan', fatherName: 'Hassan Ali', school: 'Govt High School', city: 'Sialkot', province: 'Punjab', award: 'Shield', grade: 'Grade 10', avatar: 'ZH' },
      { pos: 8, name: 'Fajar Aslam', fatherName: 'Aslam Pervez', school: 'Unique College', city: 'Gujranwala', province: 'Punjab', award: 'Shield', grade: 'Grade 9', avatar: 'FA2' },
      { pos: 9, name: 'Waleed Iqbal', fatherName: 'Iqbal Ahmed', school: 'Cadet College Hasan Abdal', city: 'Hasan Abdal', province: 'Punjab', award: 'Shield', grade: 'Grade 10', avatar: 'WI' },
      { pos: 10, name: 'Hafsa Tabassum', fatherName: 'Tabassum Ali', school: 'Lahore College for Women', city: 'Lahore', province: 'Punjab', award: 'Shield', grade: 'Grade 9', avatar: 'HT2' },
    ],
  },
  'Phase 4': {
    top3: [
      { pos: 1, name: 'Amina Sheikh', fatherName: 'Sheikh Rashid', school: 'University of Punjab', city: 'Lahore', province: 'Punjab', award: 'Laptop', grade: 'University', avatar: 'AS' },
      { pos: 2, name: 'Hassan Raza', fatherName: 'Raza Ali', school: 'NUST', city: 'Islamabad', province: 'Islamabad', award: 'Chromebook', grade: 'Grade 12', avatar: 'HR' },
      { pos: 3, name: 'Marium Khalid', fatherName: 'Khalid Waleed', school: 'LUMS', city: 'Lahore', province: 'Punjab', award: 'Chromebook', grade: 'Grade 11', avatar: 'MK' },
      { pos: 4, name: 'Ibrahim Khan', fatherName: 'Khan Muhammad', school: 'University of Karachi', city: 'Karachi', province: 'Sindh', award: 'Chromebook', grade: 'University', avatar: 'IK' },
      { pos: 5, name: 'Javeria Sohail', fatherName: 'Sohail Ahmed', school: 'COMSATS University', city: 'Islamabad', province: 'Islamabad', award: 'Chromebook', grade: 'Grade 12', avatar: 'JS' },
      { pos: 6, name: 'Raheel Anwar', fatherName: 'Anwar Ali', school: 'University of Engineering', city: 'Lahore', province: 'Punjab', award: 'Shield', grade: 'Grade 11', avatar: 'RA' },
      { pos: 7, name: 'Samina Yousuf', fatherName: 'Yousuf Khan', school: 'University of Peshawar', city: 'Peshawar', province: 'KPK', award: 'Shield', grade: 'University', avatar: 'SY' },
      { pos: 8, name: 'Faraz Ahmed', fatherName: 'Ahmed Hussain', school: 'IBA Karachi', city: 'Karachi', province: 'Sindh', award: 'Shield', grade: 'Grade 12', avatar: 'FA3' },
      { pos: 9, name: 'Madiha Noor', fatherName: 'Noor Hassan', school: 'Fatima Jinnah University', city: 'Rawalpindi', province: 'Punjab', award: 'Shield', grade: 'Grade 11', avatar: 'MN' },
      { pos: 10, name: 'Saif Ur Rehman', fatherName: 'Rehman Khan', school: 'Balochistan University', city: 'Quetta', province: 'Balochistan', award: 'Shield', grade: 'University', avatar: 'SU' },
    ],
  },
};

const successStories = [
  {
    name: 'Ahmed Khan',
    grade: 'Phase 1 — Top Performer',
    quote: 'Winning the EduTalent scholarship was a turning point in my academic journey. The laptop I received helped me access online learning resources I never had before.',
    award: 'Scholarship Winner',
  },
  {
    name: 'Mahnoor Fatima',
    grade: 'Phase 2 — Top Performer',
    quote: 'I never imagined I could compete at a national level. EduTalent gave me the platform and the confidence to believe in myself. Thank you for recognizing my hard work!',
    award: 'Scholarship Winner',
  },
  {
    name: 'Abdullah Riaz',
    grade: 'Phase 3 — Top Performer',
    quote: 'The transparent testing process and fair evaluation made me trust EduTalent completely. I am proud to be among the toppers and grateful for the recognition.',
    award: 'Scholarship Winner',
  },
];

const getPosBadge = (pos) => {
  if (pos === 1) return { bg: 'from-gold to-yellow-500', icon: Trophy, label: '1st' };
  if (pos <= 5) return { bg: 'from-gray-300 to-gray-400', icon: Medal, label: `${pos}th` };
  return { bg: 'from-amber-600 to-amber-700', icon: Shield, label: `${pos}th` };
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
            <p className="section-subtitle">Recognizing excellence with scholarship awards.</p>
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
                  <div className="flex items-center justify-center gap-1 text-sm opacity-75 mb-1">
                    <User size={12} /> {winner.fatherName}
                  </div>
                  <p className="text-sm opacity-75 mb-1">{winner.school}</p>
                  <div className="flex items-center justify-center gap-1 text-xs opacity-60 mb-3">
                    <MapPin size={10} /> {winner.city}, {winner.province}
                  </div>
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
                <div key={winner.name} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-sm font-heading font-bold text-primary group-hover:scale-110 transition-transform">
                      {winner.avatar}
                    </div>
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      winner.pos <= 5 ? 'bg-gray-100 text-gray-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      <posBadge.icon size={10} /> Position {posBadge.label}
                    </div>
                  </div>
                  <h4 className="font-heading font-semibold text-sm mb-1">{winner.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                    <User size={10} /> {winner.fatherName}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                    <School size={10} /> {winner.school}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={10} /> {winner.city}, {winner.province}
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
