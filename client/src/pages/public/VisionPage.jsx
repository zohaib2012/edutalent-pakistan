import { Link } from 'react-router-dom';
import { Eye, Globe, Users, BookOpen, Heart, ArrowRight } from 'lucide-react';

const visionPillars = [
  { icon: Globe, title: 'National Recognition', desc: 'Every talented student in Pakistan, from urban cities to remote villages, deserves to be recognized and celebrated.' },
  { icon: Users, title: 'Equal Opportunity', desc: 'A Pakistan where academic success is determined by merit alone — not by geography, income, or background.' },
  { icon: BookOpen, title: 'Lifelong Learning', desc: 'Inspiring a generation of students who value knowledge and strive for excellence throughout their lives.' },
  { icon: Heart, title: 'National Pride', desc: 'Building a culture of academic achievement that makes Pakistan proud on the global stage.' },
];

const VisionPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Eye size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Vision</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            The future we are working to create.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gold/10 to-white rounded-2xl shadow-lg border border-gold/20 p-8 md:p-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gold-800 mb-6">Full Vision Statement</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We envision a Pakistan where every student is valued and inspired. A nation where academic talent is the key that unlocks doors to success, and where every child — regardless of their background, province, or economic status — has the opportunity to shine, achieve, and build a brighter future.
            </p>
          </div>

          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center">Vision Pillars</h3>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {visionPillars.map((pillar, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <pillar.icon size={24} className="text-gold" />
                </div>
                <h4 className="font-heading font-bold text-lg mb-2">{pillar.title}</h4>
                <p className="text-gray-600 text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/apply" className="btn-primary text-lg px-10 py-4">
              Be Part of the Vision <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionPage;
