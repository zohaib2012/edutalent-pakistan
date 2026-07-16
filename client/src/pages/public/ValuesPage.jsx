import { Link } from 'react-router-dom';
import { Star, Heart, Users, Shield, Lightbulb, Award, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Star,
    title: 'Merit-Based',
    desc: 'We reward true talent and academic excellence. Every student is evaluated purely on their performance, ensuring the most deserving candidates receive recognition.',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: Heart,
    title: 'Transparency',
    desc: 'Our processes are open and fair at every stage. From registration to result declaration, students and parents can trust the integrity of our system.',
    color: 'text-primary',
    bg: 'bg-primary-50',
  },
  {
    icon: Users,
    title: 'Equal Opportunity',
    desc: 'Every Pakistani student deserves a chance to shine. We welcome applicants from all provinces, backgrounds, and economic circumstances.',
    color: 'text-success',
    bg: 'bg-green-50',
  },
  {
    icon: Shield,
    title: 'Integrity',
    desc: 'Honest and ethical operations guide every decision we make. We maintain the highest standards of fairness in all our dealings.',
    color: 'text-primary',
    bg: 'bg-primary-50',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'We leverage modern technology to deliver a seamless testing experience. Our digital platform ensures efficiency, security, and accessibility.',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: Award,
    title: 'Student First',
    desc: 'Everything we do is designed with the student&apos;s success in mind. Their growth, confidence, and future opportunities are at the heart of our mission.',
    color: 'text-success',
    bg: 'bg-green-50',
  },
];

const ValuesPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Core Values</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            The principles that guide every decision at EduTalent Pakistan.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-subtitle">Our values shape our mission and drive our commitment to students across Pakistan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow group">
                <div className={`w-14 h-14 ${v.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <v.icon size={28} className={v.color} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/mission" className="btn-primary">
              Learn About Our Mission <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValuesPage;
