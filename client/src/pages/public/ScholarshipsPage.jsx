import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Award, Users, BookOpen, Clock, DollarSign, FileText, ArrowRight, Calendar } from 'lucide-react';

const phases = [
  {
    id: 1,
    name: 'Phase 1',
    sub: 'Primary Level',
    grades: 'Grades 1 – 5',
    eligibility: 'Students currently enrolled in Grade 1 to Grade 5 in any recognized school in Pakistan.',
    awards: 'Scholarship Awards: Laptops, Chromebooks, Shields, Certificates 🏆',
    fee: 'PKR 1,500',
    testPattern: '100 MCQs | 60 Minutes | Subjects: English, Math, Science, Social Studies, Islamiat, IQ',
  },
  {
    id: 2,
    name: 'Phase 2',
    sub: 'Middle Level',
    grades: 'Grades 6 – 8',
    eligibility: 'Students currently enrolled in Grade 6 to Grade 8 in any recognized school in Pakistan.',
    awards: 'Scholarship Awards: Laptops, Chromebooks, Shields, Certificates 🏆',
    fee: 'PKR 1,500',
    testPattern: '100 MCQs | 60 Minutes | Subjects: English, Math, Science, Pakistan Studies, Islamiat, IQ',
  },
  {
    id: 3,
    name: 'Phase 3',
    sub: 'Matric Level',
    grades: 'Grades 9 – 10',
    eligibility: 'Students currently enrolled in Grade 9 or Grade 10 in any recognized school in Pakistan.',
    awards: 'Scholarship Awards: Laptops, Chromebooks, Shields, Certificates 🏆',
    fee: 'PKR 1,500',
    testPattern: '100 MCQs | 75 Minutes | Subjects: English, Math, Physics, Biology, Chemistry, Pakistan Studies, Islamiat, IQ',
  },
  {
    id: 4,
    name: 'Phase 4',
    sub: 'Senior Level',
    grades: 'Grade 11 – 12 & University',
    eligibility: 'Students currently enrolled in Grade 11, Grade 12, or any university degree program in Pakistan.',
    awards: 'Scholarship Awards: Laptops, Chromebooks, Shields, Certificates 🏆',
    fee: 'PKR 1,500',
    testPattern: '100 MCQs | 90 Minutes | Subjects: Advanced English, Science, General Knowledge, Pakistan Affairs, Islamiat, IQ & Analytical Reasoning, Math',
  },
];

const testDates = [
  { phase: 'Phase 1', date: 'August 24, 2025', time: '10:00 AM – 11:00 AM' },
  { phase: 'Phase 2', date: 'August 24, 2025', time: '2:00 PM – 3:00 PM' },
  { phase: 'Phase 3', date: 'August 25, 2025', time: '10:00 AM – 11:15 AM' },
  { phase: 'Phase 4', date: 'August 25, 2025', time: '2:00 PM – 3:30 PM' },
];

const ScholarshipsPage = () => {
  const [openPhase, setOpenPhase] = useState(null);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Scholarship Programs</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Four phases designed for every academic level — from Grade 1 to University.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {phases.map((phase) => (
              <div key={phase.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenPhase(openPhase === phase.id ? null : phase.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      phase.id === 1 ? 'bg-blue-100 text-blue-600' :
                      phase.id === 2 ? 'bg-emerald-100 text-emerald-600' :
                      phase.id === 3 ? 'bg-purple-100 text-purple-600' :
                      'bg-gold/10 text-gold'
                    }`}>
                      <Award size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg">{phase.name} — {phase.sub}</h3>
                      <p className="text-sm text-gray-500">{phase.grades}</p>
                    </div>
                  </div>
                  {openPhase === phase.id ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-primary" />}
                </button>
                {openPhase === phase.id && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Users size={18} className="text-primary mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">Eligibility</p>
                          <p className="text-sm text-gray-700">{phase.eligibility}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Award size={18} className="text-gold mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">Awards Breakdown</p>
                          <p className="text-sm text-gray-700">{phase.awards}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <DollarSign size={18} className="text-success mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">Fee</p>
                          <p className="text-sm text-gray-700">{phase.fee}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <BookOpen size={18} className="text-primary mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">Test Pattern</p>
                          <p className="text-sm text-gray-700">{phase.testPattern}</p>
                        </div>
                      </div>
                    </div>
                    <Link to="/register" className="btn-primary text-sm inline-flex">
                      Apply Now <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Test Dates</h2>
            <p className="section-subtitle">Mark your calendars for the upcoming scholarship test.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testDates.map((d, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 text-center border border-gray-100 hover:shadow-md transition-shadow">
                <Calendar size={24} className="text-primary mx-auto mb-2" />
                <h4 className="font-heading font-bold text-primary">{d.phase}</h4>
                <p className="text-sm text-gray-700 font-semibold mt-1">{d.date}</p>
                <p className="text-xs text-gray-500 mt-1">{d.time}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/datesheet" className="btn-outline">View Full Date Sheet</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipsPage;
