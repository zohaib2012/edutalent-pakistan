import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

const categories = ['All', 'Registration', 'Test', 'Awards', 'Payment', 'General'];

const faqs = [
  { q: 'Who can apply?', a: 'Any Pakistani student from Grade 1 to University can apply for the EduTalent Pakistan scholarship. There are four phases covering all academic levels.', category: 'Registration' },
  { q: 'Is fee refundable?', a: 'No, according to policy the registration fee is non-refundable once paid. Please ensure you meet the eligibility criteria before applying.', category: 'Payment' },
  { q: 'Is the test online?', a: 'Yes, the test is completely online and can be taken from your home using a laptop or desktop computer with a webcam and microphone.', category: 'Test' },
  { q: 'Is camera required?', a: 'Yes, a camera is compulsory. The test uses AI-based proctoring with face tracking and eye movement monitoring to ensure fairness.', category: 'Test' },
  { q: 'How will awards be delivered?', a: 'Awards are delivered to your verified home or school address after the results are announced and your details are confirmed.', category: 'Awards' },
  { q: 'Will I get a certificate?', a: 'Yes, digital certificates are available for all participants. Top performers receive special certificates with QR verification.', category: 'Awards' },
  { q: 'Can university students apply?', a: 'Yes — university students can apply under Phase 4 (Senior Level), which covers Grade 11–12 and university students.', category: 'Registration' },
  { q: 'How do I register?', a: 'Visit the Apply Now page, select your phase, fill out the registration form, pay the fee, and upload the receipt. Your roll number slip will be generated after verification.', category: 'Registration' },
  { q: 'What is the test duration?', a: 'Phase 1 & 2: 60 minutes | Phase 3: 75 minutes | Phase 4: 90 minutes. All tests consist of 100 MCQs.', category: 'Test' },
  { q: 'What happens if I cheat?', a: 'Cheating is strictly monitored through AI proctoring. 3 violations of any rule result in automatic disqualification with no refund.', category: 'Test' },
  { q: 'How are winners selected?', a: 'Winners are selected purely on merit based on test scores. Top positions in each phase receive laptops, Chromebooks, shields, and certificates.', category: 'Awards' },
  { q: 'Can I change my phase after registration?', a: 'No, phase changes are not allowed after registration. Please select the correct phase based on your current academic level.', category: 'Registration' },
  { q: 'What payment methods are accepted?', a: 'Fee payment is made through bank challan. You can download the challan from your account and pay at any branch of the designated bank.', category: 'Payment' },
  { q: 'Is there any age limit?', a: 'There is no specific age limit. Students are categorized by their current academic grade level.', category: 'General' },
  { q: 'How can I contact support?', a: 'You can reach us via email at edutalentpakistan@gmail.com, on WhatsApp at +92 346 8275954, or call our support line at 0320 2603464. Visit the Contact page for details.', category: 'General' },
];

const FAQsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Everything you need to know about EduTalent Pakistan.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-primary-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">?</span>
                    <span className="font-heading font-semibold text-gray-900">{faq.q}</span>
                  </div>
                  {openIndex === i ? <ChevronUp size={18} className="text-primary flex-shrink-0" /> : <ChevronDown size={18} className="text-primary flex-shrink-0" />}
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed pl-11">{faq.a}</p>
                    <span className="ml-11 mt-2 inline-block text-xs bg-primary-50 text-primary font-semibold px-3 py-1 rounded-full">{faq.category}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQsPage;
