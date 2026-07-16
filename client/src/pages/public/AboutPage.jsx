import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Shield, Users, Lightbulb, Star, ChevronRight } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Students Registered' },
  { icon: Star, value: '500+', label: 'Awards Given' },
  { icon: Shield, value: '12+', label: 'Tests Conducted' },
  { icon: Users, value: '7', label: 'Provinces Covered' },
];

const coreValues = [
  { icon: Star, title: 'Merit-Based', desc: 'Rewarding true talent and academic excellence without bias.' },
  { icon: Heart, title: 'Transparency', desc: 'Open and fair processes in every step of the scholarship journey.' },
  { icon: Users, title: 'Equal Opportunity', desc: 'Every Pakistani student deserves a chance to shine regardless of background.' },
  { icon: Shield, title: 'Integrity', desc: 'Honest and ethical operations guiding all our decisions.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Modern digital testing platform for a seamless experience.' },
  { icon: Heart, title: 'Student First', desc: 'Everything we do is designed with the student&apos;s success in mind.' },
];

const AboutPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About EduTalent Pakistan</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Unlocking Brilliance, Rewarding Talent — Pakistan&apos;s Largest Online Scholarship Testing System.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Who We Are</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                EduTalent Pakistan is a national scholarship platform dedicated to identifying and rewarding academic talent across Pakistan. From Grade 1 to University, we provide students with the opportunity to earn laptops, Chromebooks, shields, and certificates through a transparent online testing system.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our mission is to ensure that no talented student goes unrecognized. With cutting-edge anti-cheating technology and a merit-based evaluation system, we create equal opportunities for students from every province and background.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/mission" className="btn-primary">Our Mission <ChevronRight size={18} /></Link>
                <Link to="/vision" className="btn-outline">Our Vision</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 4).map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon size={24} className="text-primary" />
                  </div>
                  <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                <Target size={28} className="text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To recognize hidden talent across Pakistan by providing fair and transparent scholarship testing. We reward meritorious students with laptops, Chromebooks, shields, and certificates, building confidence and creating opportunities for a brighter future.
              </p>
              <Link to="/mission" className="text-primary font-semibold text-sm flex items-center gap-1 mt-4 hover:gap-2 transition-all">
                Read Full Mission <ChevronRight size={14} />
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                <Eye size={28} className="text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To see every Pakistani student valued and inspired. We envision a Pakistan where academic talent is the key that unlocks doors to success, and where every child, regardless of their background, has the opportunity to shine.
              </p>
              <Link to="/vision" className="text-primary font-semibold text-sm flex items-center gap-1 mt-4 hover:gap-2 transition-all">
                Read Full Vision <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do at EduTalent Pakistan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((v, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <v.icon size={24} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/values" className="btn-outline">View All Values</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Join Us in Rewarding Talent</h2>
          <p className="text-white/80 text-lg mb-8">Be part of Pakistan&apos;s largest scholarship movement.</p>
          <Link to="/apply" className="btn-gold text-base px-10 py-4 text-lg">
            Apply Now <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
