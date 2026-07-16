import { Link } from 'react-router-dom';
import { Target, Search, ShieldCheck, Gift, TrendingUp, ArrowRight } from 'lucide-react';

const missionPoints = [
  { icon: Search, title: 'Recognize Hidden Talent', desc: 'Identify and nurture undiscovered academic potential across every province of Pakistan.' },
  { icon: ShieldCheck, title: 'Fair & Transparent Testing', desc: 'Provide a completely transparent, merit-based online testing system with no bias or favoritism.' },
  { icon: Gift, title: 'Reward with Excellence', desc: 'Award laptops, Chromebooks, shields, and certificates to top-performing students in every phase.' },
  { icon: TrendingUp, title: 'Build Confidence & Opportunities', desc: 'Create life-changing opportunities that build confidence and pave the way for future success.' },
];

const MissionPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Target size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Mission</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            What drives us every single day.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-lg border border-primary-100 p-8 md:p-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">Full Mission Statement</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission at EduTalent Pakistan is to recognize hidden talent across Pakistan by providing fair and transparent scholarship testing. We are dedicated to rewarding meritorious students with laptops, Chromebooks, shields, and certificates — building their confidence and creating opportunities for a brighter academic and professional future.
            </p>
          </div>

          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center">Key Mission Pillars</h3>
          <div className="space-y-6">
            {missionPoints.map((point, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow bg-white">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <point.icon size={28} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg mb-1">{point.title}</h4>
                  <p className="text-gray-600">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/apply" className="btn-gold text-lg px-10 py-4">
              Join Our Mission <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionPage;
