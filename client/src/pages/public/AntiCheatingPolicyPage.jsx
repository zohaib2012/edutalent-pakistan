import { Camera, Eye, Mic, Monitor, MonitorSmartphone, Lock, AlertTriangle, Shield, RotateCcw, Mail } from 'lucide-react';

const antiCheatMeasures = [
  { icon: Camera, title: 'Face Tracking', desc: 'AI continuously verifies that the registered candidate is present throughout the test.' },
  { icon: Eye, title: 'Eye Movement Analysis', desc: 'Suspicious eye movements, such as looking away from the screen repeatedly, are flagged.' },
  { icon: Mic, title: 'Audio Monitoring', desc: 'Background audio is monitored to detect conversations or unauthorized assistance.' },
  { icon: Monitor, title: 'Tab Switch Detection', desc: 'Any attempt to switch browser tabs or windows is immediately recorded.' },
  { icon: MonitorSmartphone, title: 'Screen Recording', desc: 'The entire test session is recorded for post-test review if needed.' },
  { icon: Lock, title: 'Fullscreen Lock', desc: 'The test interface locks into fullscreen mode and detects exit attempts.' },
];

const violationConsequences = [
  { violation: 'Tab/App switching during test', penalty: 'Warning (1st), Disqualification (3rd)' },
  { violation: 'Talking or external audio detected', penalty: 'Warning (1st), Disqualification (3rd)' },
  { violation: 'Face not visible to camera', penalty: 'Warning (1st), Disqualification (3rd)' },
  { violation: 'Multiple faces detected in frame', penalty: 'Immediate Disqualification' },
  { violation: 'Attempted screen capture or recording', penalty: 'Immediate Disqualification' },
  { violation: 'Using unauthorized devices or materials', penalty: 'Immediate Disqualification' },
];

const AntiCheatingPolicyPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Anti-Cheating Policy</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Maintaining integrity and fairness in every test.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8">Anti-Cheating Measures</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {antiCheatMeasures.map((m, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-3">
                  <m.icon size={20} className="text-primary" />
                </div>
                <h4 className="font-heading font-bold text-sm mb-1">{m.title}</h4>
                <p className="text-xs text-gray-600">{m.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Violation Types & Consequences</h2>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-16">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-red-50">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-red-700">Violation</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-red-700">Consequence</th>
                  </tr>
                </thead>
                <tbody>
                  {violationConsequences.map((v, i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{v.violation}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                          v.penalty.includes('Immediate') ? 'bg-red-50 text-red-600' : 'bg-gold/10 text-gold'
                        }`}>{v.penalty}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex gap-3">
              <AlertTriangle size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-yellow-700 mb-2">3 Violations = Auto Disqualification</h3>
                <p className="text-sm text-yellow-600 leading-relaxed">
                  Our AI-based proctoring system tracks all suspicious activities in real-time. Accumulating 3 violations of any type during the test will result in automatic disqualification with no refund. The decision is final.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex gap-3">
              <RotateCcw size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-primary mb-2">Appeal Process</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  If you believe you have been wrongly disqualified due to a technical error, you may submit an appeal within 3 days of disqualification. Email your appeal with supporting evidence to <span className="font-semibold text-primary">info@edutalentpakistan.com</span>. Appeals are reviewed within 7 working days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AntiCheatingPolicyPage;
