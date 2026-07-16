import { AlertTriangle, DollarSign, Scale, MapPin, ThumbsDown, FileText } from 'lucide-react';

const terms = [
  {
    icon: AlertTriangle,
    title: 'Fake Information Leads to Disqualification',
    desc: 'Providing false, inaccurate, or misleading information during registration or at any stage of the scholarship process will result in immediate disqualification. EduTalent Pakistan reserves the right to verify all submitted information through independent means.',
  },
  {
    icon: DollarSign,
    title: 'Fee Once Paid is Non-Refundable',
    desc: 'The registration fee is non-refundable under any circumstances. By submitting your application and paying the fee, you acknowledge that you have read and understood the eligibility criteria and terms of the scholarship program.',
  },
  {
    icon: Scale,
    title: 'All Decisions are Final',
    desc: 'All decisions made by EduTalent Pakistan regarding eligibility, test results, merit positions, and award distribution are final and binding. No correspondence or appeals regarding these decisions will be entertained.',
  },
  {
    icon: MapPin,
    title: 'Awards Delivered to Verified Address Only',
    desc: 'Awards will only be delivered to the address verified by EduTalent Pakistan. Students must provide accurate address details during registration. Any change of address must be communicated in writing at least 15 days before the award distribution date.',
  },
  {
    icon: ThumbsDown,
    title: 'Misbehavior, Cheating, or Manipulation Not Allowed',
    desc: 'Any form of misbehavior, cheating, system manipulation, or unauthorized assistance during the test is strictly prohibited. AI-based proctoring systems monitor all test sessions. Violations will lead to automatic disqualification and a permanent ban from future EduTalent programs.',
  },
];

const TermsPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Terms & Conditions</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Please read these terms carefully before applying.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {terms.map((t, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="flex gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    i === 0 ? 'bg-red-50' :
                    i === 1 ? 'bg-gold/10' :
                    i === 2 ? 'bg-primary-50' :
                    i === 3 ? 'bg-green-50' :
                    'bg-red-50'
                  }`}>
                    <t.icon size={28} className={
                      i === 0 ? 'text-red-500' :
                      i === 1 ? 'text-gold' :
                      i === 2 ? 'text-primary' :
                      i === 3 ? 'text-success' :
                      'text-red-500'
                    } />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                      <h3 className="font-heading font-bold text-lg">{t.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed ml-10">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h3 className="font-heading font-bold text-lg mb-3">Acceptance of Terms</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              By registering for the EduTalent Pakistan scholarship program, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not proceed with the registration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
