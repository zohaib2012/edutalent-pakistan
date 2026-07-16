import { DollarSign, AlertTriangle, FileText, Mail } from 'lucide-react';

const RefundPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <DollarSign size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Refund Policy</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Understand our fee and refund policies.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 mb-10">
            <div className="flex gap-4">
              <AlertTriangle size={32} className="text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-heading font-bold text-xl text-red-700 mb-3">Fee is Non-Refundable</h2>
                <p className="text-red-600 leading-relaxed">
                  The registration fee paid for the EduTalent Pakistan scholarship program is strictly non-refundable under any circumstances. By submitting your application and completing the payment, you agree to this policy.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-heading font-bold text-lg mb-3">No Refund Scenarios</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>If you decide not to appear for the test after registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>If you are disqualified due to cheating or policy violation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>If you provide incorrect information leading to disqualification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>If you miss the test due to technical issues on your end</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>If you change your mind after submitting the application</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-heading font-bold text-lg mb-3">Important Notes</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Please ensure you meet the eligibility criteria for your chosen phase before paying the fee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Review the syllabus, test rules, and date sheet thoroughly before registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Once the fee is paid, it cannot be transferred to another student or another phase</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex gap-3">
                <Mail size={20} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm">Questions?</h4>
                  <p className="text-sm text-gray-600">
                    If you have any questions regarding this refund policy, please contact us at <span className="text-primary font-semibold">info@edutalentpakistan.com</span> before completing your registration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPage;
