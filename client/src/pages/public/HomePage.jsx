import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, FileCheck, Globe, BookOpen, Laptop, Shield, ChevronRight, Clock, CheckCircle } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Students Registered' },
  { icon: Award, value: '500+', label: 'Awards Given' },
  { icon: FileCheck, value: '12+', label: 'Tests Conducted' },
  { icon: Globe, value: '7', label: 'Provinces Covered' },
];

const phases = [
  { title: 'Phase 1', sub: 'Primary Level', grades: 'Grades 1–5', awards: 'Laptop, Chromebook, Shield', color: 'from-blue-500 to-blue-600' },
  { title: 'Phase 2', sub: 'Middle Level', grades: 'Grades 6–8', awards: 'Laptop, Chromebook, Shield', color: 'from-emerald-500 to-emerald-600' },
  { title: 'Phase 3', sub: 'Matric Level', grades: 'Grades 9–10', awards: 'Laptop, Chromebook, Shield', color: 'from-purple-500 to-purple-600' },
  { title: 'Phase 4', sub: 'Senior Level', grades: 'Grade 11–12 & Uni', awards: 'Laptop, Chromebook, Shield', color: 'from-gold to-yellow-600' },
];

const awards = [
  { icon: Laptop, title: 'Laptops', count: '4 Winners', desc: '1 Laptop per Phase — Top Position', color: 'text-primary' },
  { icon: Laptop, title: 'Chromebooks', count: '16 Winners', desc: '4 Chromebooks per Phase — 2nd to 5th', color: 'text-success' },
  { icon: Shield, title: 'Shields', count: '20 Winners', desc: '5 Shields per Phase — 6th to 10th', color: 'text-gold' },
  { icon: Award, title: 'Certificates', count: 'Top 20 + All', desc: 'Appreciation + Participation with QR', color: 'text-primary' },
];

const steps = [
  { icon: BookOpen, step: '01', title: 'Read Announcement', desc: 'Check eligibility, awards, dates & syllabus' },
  { icon: FileCheck, step: '02', title: 'Register Online', desc: 'Fill form with your personal & academic details' },
  { icon: Shield, step: '03', title: 'Pay Fee', desc: 'Download challan, pay at bank, upload receipt' },
  { icon: CheckCircle, step: '04', title: 'Get Roll No Slip', desc: 'Receive roll number, test date & login credentials' },
  { icon: Laptop, step: '05', title: 'Take Online Test', desc: '100 MCQs, camera & mic ON, anti-cheat active' },
];

const testimonials = [
  { name: 'Ahmed Khan', grade: 'Phase 2 — 1st Position', quote: 'EduTalent gave me the confidence to compete at a national level. Winning a laptop changed my life!', award: 'Laptop Winner' },
  { name: 'Fatima Ali', grade: 'Phase 1 — 2nd Position', quote: 'My first Chromebook! Thank you EduTalent for recognizing my hard work and talent.', award: 'Chromebook Winner' },
  { name: 'Usman Raza', grade: 'Phase 3 — Shield Holder', quote: 'The test was fair and transparent. I felt proud to be among the top 10 in my phase.', award: 'Shield Winner' },
];

const HomePage = () => {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
                <Award size={16} className="text-gold" />
                <span>Pakistan&apos;s National Digital Scholarship Platform</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                Unlocking Brilliance,{' '}
                <span className="text-gold">Rewarding Talent</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                From Grade 1 to University — earn laptops, Chromebooks, shields, and certificates through Pakistan&apos;s most transparent online scholarship testing system.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/apply" className="btn-gold text-base px-8 py-4">
                  Apply for Scholarship <ArrowRight size={20} />
                </Link>
                <Link to="/announcements" className="border-2 border-white/30 text-white hover:bg-white/10 rounded-lg px-8 py-4 font-semibold transition-all inline-flex items-center gap-2">
                  View Announcements
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/5 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                      <span className="text-white font-heading font-bold text-3xl">ET</span>
                    </div>
                    <p className="text-gold font-heading font-bold text-lg">EduTalent Pakistan</p>
                    <p className="text-white/60 text-sm">Est. 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={24} className="text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-heading font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Scholarship Phases</h2>
            <p className="section-subtitle">Every phase has its own syllabus, difficulty level, and award structure designed for each academic level.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group">
                <div className={`bg-gradient-to-r ${phase.color} p-4 text-white`}>
                  <h3 className="font-heading font-bold text-lg">{phase.title}</h3>
                  <p className="text-white/80 text-sm">{phase.sub}</p>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Users size={14} /><span>{phase.grades}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Award size={14} /><span>{phase.awards}</span>
                  </div>
                  <Link to="/syllabus" className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Syllabus <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Awards & Recognition</h2>
            <p className="section-subtitle">Outstanding prizes for outstanding students across all 4 phases.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {awards.map((item, i) => (
              <div key={i} className="text-center p-6 rounded-xl border-2 border-gray-100 hover:border-gold/30 transition-all hover:shadow-lg">
                <div className={`w-16 h-16 ${item.color} bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon size={32} className={item.color} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gold font-heading font-bold text-xl mb-2">{item.count}</p>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">5 simple steps to earn your scholarship award.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
                  <step.icon size={28} className="text-white" />
                </div>
                <div className="absolute top-8 left-[60%] w-full h-0.5 bg-primary-200 hidden md:block" style={{ display: i < 4 ? 'block' : 'none' }} />
                <div className="text-gold font-heading font-bold text-sm mb-1">{step.step}</div>
                <h3 className="font-heading font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-gray-500 text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/apply" className="btn-primary text-base px-8 py-4">
              Start Your Journey <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Latest Announcements</h2>
            <p className="section-subtitle">Stay updated with the latest scholarship programs and test schedules.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-primary to-primary-600 h-40 flex items-center justify-center">
                  <Clock size={48} className="text-white/30" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Clock size={12} /> July 2025
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Scholarship Test 2025 Announced</h3>
                  <p className="text-gray-600 text-sm mb-4">Applications are now open for all phases. Last date to apply is August 15, 2025.</p>
                  <Link to="/announcements" className="text-primary text-sm font-semibold flex items-center gap-1">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/announcements" className="btn-outline">View All Announcements</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">Hear from our past winners and how EduTalent changed their lives.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-heading font-bold text-xl">{t.name[0]}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">"{t.quote}"</p>
                <div>
                  <div className="font-heading font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.grade}</div>
                  <div className="inline-block bg-gold/20 text-gold-800 text-xs font-semibold px-3 py-1 rounded-full mt-2">{t.award}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to Prove Your Talent?</h2>
          <p className="text-white/80 text-lg mb-8">Thousands of students have already registered. Don&apos;t miss your chance to win laptops, Chromebooks, and more.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/apply" className="btn-gold text-base px-10 py-4 text-lg">
              Apply Now <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="border-2 border-white/30 text-white hover:bg-white/10 rounded-lg px-8 py-4 font-semibold transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
