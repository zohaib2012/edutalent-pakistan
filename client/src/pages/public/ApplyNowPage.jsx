import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, AlertTriangle, BookOpen, FileCheck, Shield, Laptop, Award, ChevronRight } from 'lucide-react';

const phases = [
  { title: 'Phase 1 — Primary Level', grades: 'Grades 1-5', awards: 'Laptops, Chromebooks, Shields, Certificates', fee: 'PKR 1,200', color: 'from-blue-500 to-blue-600' },
  { title: 'Phase 2 — Middle Level', grades: 'Grades 6-8', awards: 'Laptops, Chromebooks, Shields, Certificates', fee: 'PKR 1,200', color: 'from-emerald-500 to-emerald-600' },
  { title: 'Phase 3 — Matric Level', grades: 'Grades 9-10', awards: 'Laptops, Chromebooks, Shields, Certificates', fee: 'PKR 1,200', color: 'from-purple-500 to-purple-600' },
  { title: 'Phase 4 — Senior Level', grades: 'Grade 11-12 & University', awards: 'Laptops, Chromebooks, Shields, Certificates', fee: 'PKR 1,200', color: 'from-amber-500 to-amber-600' },
];

const steps = [
  { icon: BookOpen, step: '1', title: 'Read Announcement' },
  { icon: FileCheck, step: '2', title: 'Register Online' },
  { icon: Shield, step: '3', title: 'Pay Fee' },
  { icon: Laptop, step: '4', title: 'Get Roll No Slip' },
  { icon: Award, step: '5', title: 'Take Online Test' },
];

const ApplyNowPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Apply for EduTalent Scholarship</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Join Pakistan&apos;s largest online scholarship testing system. 4 phases, 100+ awards, one opportunity.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title">Before You Apply</h2>
              <p className="text-gray-600 mb-6">Make sure you have everything ready before starting your application.</p>
              <div className="space-y-4">
                {['Read eligibility criteria', 'Check awards and benefits', 'Review test dates and schedule', 'Prepare scanned passport-size photo', 'Keep CNIC / B-Form ready', 'Have challan fee amount ready'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-success mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="font-heading font-bold text-lg mb-4">Registration Steps</h3>
              <div className="space-y-4">
                {steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">{s.step}</div>
                    <div>
                      <div className="font-semibold text-sm">{s.title}</div>
                    </div>
                    {i < steps.length - 1 && <ChevronRight size={16} className="text-gray-300 ml-auto shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Choose Your Phase</h2>
            <p className="section-subtitle">Select the phase that matches your academic level.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                <div className={`bg-gradient-to-r ${phase.color} p-4 text-white text-center`}>
                  <h3 className="font-heading font-bold text-base">{phase.title}</h3>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600"><span className="font-semibold">Grades:</span> {phase.grades}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><span className="font-semibold">Awards:</span> {phase.awards}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600"><span className="font-semibold">Fee:</span> {phase.fee}</div>
                  <Link to="/register" className="btn-primary w-full text-center text-sm py-3 mt-3">
                    Register Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-8">Important Notes</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <AlertTriangle size={24} className="text-amber-500 mb-3" />
              <h3 className="font-heading font-bold text-base mb-2">One Attempt Only</h3>
              <p className="text-sm text-gray-600">Each student is allowed only one test attempt. No retakes are permitted under any circumstances.</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <AlertTriangle size={24} className="text-red-500 mb-3" />
              <h3 className="font-heading font-bold text-base mb-2">Fee Non-Refundable</h3>
              <p className="text-sm text-gray-600">The registration fee is non-refundable once paid. Please read the refund policy before applying.</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <AlertTriangle size={24} className="text-blue-500 mb-3" />
              <h3 className="font-heading font-bold text-base mb-2">Camera & Mic Required</h3>
              <p className="text-sm text-gray-600">A working camera and microphone are mandatory for the online test to enable anti-cheating monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to Prove Your Talent?</h2>
          <p className="text-white/80 text-lg mb-8">Thousands of students have already applied. Don&apos;t miss your chance.</p>
          <Link to="/register" className="btn-gold text-lg px-10 py-4">
            Register Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ApplyNowPage;
