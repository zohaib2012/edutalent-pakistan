import { useState } from 'react';
import { BookOpen, Download, FileText } from 'lucide-react';

const phases = [
  {
    id: 1,
    name: 'Phase 1',
    sub: 'Primary Level (Grades 1–5)',
    subjects: [
      { subject: 'Basic English Grammar', topics: 'Alphabets, Words, Sentences, Tenses Basics, Comprehension', mcqs: 20, weightage: '20%' },
      { subject: 'Basic Mathematics', topics: 'Numbers, Addition, Subtraction, Multiplication, Division, Shapes', mcqs: 20, weightage: '20%' },
      { subject: 'General Science', topics: 'Living Things, Plants, Animals, Earth, Basic Physics Concepts', mcqs: 20, weightage: '20%' },
      { subject: 'Social Studies', topics: 'Pakistan, Provinces, Culture, Geography Basics', mcqs: 15, weightage: '15%' },
      { subject: 'Islamic & Pakistan Studies', topics: 'Basic Islamic Knowledge, Pakistan Movement Basics', mcqs: 15, weightage: '15%' },
      { subject: 'Simple IQ Reasoning', topics: 'Patterns, Analogies, Odd One Out, Simple Puzzles', mcqs: 10, weightage: '10%' },
    ],
  },
  {
    id: 2,
    name: 'Phase 2',
    sub: 'Middle Level (Grades 6–8)',
    subjects: [
      { subject: 'English', topics: 'Grammar, Comprehension, Vocabulary, Tenses, Sentence Structure', mcqs: 20, weightage: '20%' },
      { subject: 'Mathematics', topics: 'Algebra Basics, Geometry, Fractions, Decimals, Ratios', mcqs: 20, weightage: '20%' },
      { subject: 'General Science', topics: 'Biology Basics, Chemistry Basics, Physics, Environment', mcqs: 20, weightage: '20%' },
      { subject: 'Pakistan Studies', topics: 'History, Geography, Culture, Government Structure', mcqs: 15, weightage: '15%' },
      { subject: 'Islamic Studies', topics: 'Quran, Hadith, Islamic History, Fiqh Basics', mcqs: 15, weightage: '15%' },
      { subject: 'IQ Tests', topics: 'Verbal Reasoning, Non-Verbal Reasoning, Number Series', mcqs: 10, weightage: '10%' },
    ],
  },
  {
    id: 3,
    name: 'Phase 3',
    sub: 'Matric Level (Grades 9–10)',
    subjects: [
      { subject: 'English Grammar & Comprehension', topics: 'Advanced Grammar, Essays, Precis, Vocabulary, Reading Comprehension', mcqs: 20, weightage: '20%' },
      { subject: 'Mathematics', topics: 'Algebra, Trigonometry, Geometry, Statistics, Probability', mcqs: 15, weightage: '15%' },
      { subject: 'Physics', topics: 'Mechanics, Electricity, Waves, Optics, Energy', mcqs: 15, weightage: '15%' },
      { subject: 'Biology', topics: 'Cell Biology, Genetics, Ecology, Human Body Systems', mcqs: 15, weightage: '15%' },
      { subject: 'Chemistry', topics: 'Atomic Structure, Chemical Bonding, Reactions, Periodic Table', mcqs: 15, weightage: '15%' },
      { subject: 'Pakistan & Islamic Studies', topics: 'Pakistan History, Islamic Teachings, Current Affairs', mcqs: 10, weightage: '10%' },
      { subject: 'IQ Reasoning', topics: 'Analytical Reasoning, Critical Thinking, Problem Solving', mcqs: 10, weightage: '10%' },
    ],
  },
  {
    id: 4,
    name: 'Phase 4',
    sub: 'Senior Level (Grade 11–12 & University)',
    subjects: [
      { subject: 'Advanced English', topics: 'Advanced Grammar, Essay Writing, Critical Reading, Vocabulary', mcqs: 20, weightage: '20%' },
      { subject: 'Science (Bio/Phy/Chem)', topics: 'Advanced concepts across Biology, Physics, and Chemistry', mcqs: 20, weightage: '20%' },
      { subject: 'General Knowledge', topics: 'Current Affairs, World Geography, Science & Technology', mcqs: 15, weightage: '15%' },
      { subject: 'Pakistan Affairs', topics: 'Pakistan History, Economy, Foreign Policy, Constitutional Development', mcqs: 15, weightage: '15%' },
      { subject: 'Islamic Studies', topics: 'Advanced Islamic Knowledge, Fiqh, Islamic Civilization', mcqs: 10, weightage: '10%' },
      { subject: 'IQ & Analytical Reasoning', topics: 'Advanced Reasoning, Data Interpretation, Logical Puzzles', mcqs: 10, weightage: '10%' },
      { subject: 'Mathematics', topics: 'Advanced Algebra, Calculus Basics, Statistics, Probability', mcqs: 10, weightage: '10%' },
    ],
  },
];

const SyllabusPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Syllabus</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Comprehensive syllabus breakdown for all four phases.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {phases.map((phase, i) => (
              <button
                key={phase.id}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === i
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-primary-50'
                }`}
              >
                {phase.name}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading font-bold text-xl">{phases[activeTab].name}</h2>
                <p className="text-sm text-gray-500">{phases[activeTab].sub}</p>
              </div>
              <button className="btn-outline text-sm">
                <Download size={16} /> Download Syllabus
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">#</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Subject</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Topics</th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase">MCQs</th>
                    <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Weightage</th>
                  </tr>
                </thead>
                <tbody>
                  {phases[activeTab].subjects.map((s, i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-500">{String(i + 1).padStart(2, '0')}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{s.subject}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md">{s.topics}</td>
                      <td className="px-6 py-4 text-sm text-center font-semibold text-primary">{s.mcqs}</td>
                      <td className="px-6 py-4 text-sm text-center">
                        <span className="inline-block bg-primary-50 text-primary font-semibold text-xs px-3 py-1 rounded-full">{s.weightage}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t border-gray-200">
                    <td colSpan="3" className="px-6 py-4 text-sm font-bold text-gray-700 text-right">Total</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary text-center">
                      {phases[activeTab].subjects.reduce((sum, s) => sum + s.mcqs, 0)}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span className="font-bold text-primary">100%</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SyllabusPage;
