import { Camera, Mic, MessageSquare, UserX, Monitor, CameraOff, AlertTriangle, Clock, MonitorSmartphone, ShieldCheck, Laptop, Wifi } from 'lucide-react';

const rules = [
  { icon: Camera, title: 'Camera & Mic Must Stay ON', desc: 'Your camera and microphone must remain active throughout the entire test duration. Any interruption may result in disqualification.' },
  { icon: Mic, title: 'No Talking During Test', desc: 'You must remain silent during the test. No speaking, reading aloud, or communicating with anyone.' },
  { icon: UserX, title: 'No Other Person Allowed', desc: 'The test room must contain only the candidate. No parents, siblings, or friends are permitted in the room.' },
  { icon: Monitor, title: 'No Switching Apps or Tabs', desc: 'You cannot switch to any other application, browser tab, or window during the test. The system tracks all activity.' },
  { icon: CameraOff, title: 'No Screenshots or Recordings', desc: 'Taking screenshots, screen recordings, or photographs of the test screen is strictly prohibited.' },
  { icon: AlertTriangle, title: 'Auto Disqualification for Cheating', desc: 'Any detected cheating behavior will result in immediate auto-disqualification with no refund.' },
  { icon: Clock, title: 'Only One Attempt Allowed', desc: 'Each student is allowed only one attempt per scholarship cycle. Make it count.' },
  { icon: MonitorSmartphone, title: 'Complete in Assigned Time', desc: 'The test must be completed within the allotted time. The system will auto-submit when time expires.' },
];

const systemRequirements = [
  { icon: Monitor, label: 'Device', desc: 'Laptop or desktop with webcam' },
  { icon: Camera, label: 'Webcam', desc: 'HD quality (720p minimum)' },
  { icon: Mic, label: 'Microphone', desc: 'Built-in or external working mic' },
  { icon: Wifi, label: 'Internet', desc: 'Stable connection (min 5 Mbps)' },
  { icon: Laptop, label: 'Browser', desc: 'Latest Chrome or Firefox' },
];

const TestRulesPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Test Rules & Regulations</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Please read and follow all rules carefully. Violations lead to automatic disqualification.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8">Important Rules</h2>
          <div className="space-y-4 mb-16">
            {rules.map((rule, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <rule.icon size={22} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    <h3 className="font-heading font-bold text-base">{rule.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-8">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">System Requirements</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {systemRequirements.map((req, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-3">
                  <req.icon size={20} className="text-primary" />
                </div>
                <h4 className="font-heading font-bold text-sm">{req.label}</h4>
                <p className="text-xs text-gray-500">{req.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex gap-3">
              <AlertTriangle size={24} className="text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-red-700 mb-2">Anti-Cheating Notice</h3>
                <p className="text-sm text-red-600 leading-relaxed">
                  EduTalent Pakistan uses advanced AI-based proctoring technology. Face tracking, eye movement analysis, audio monitoring, tab-switch detection, screen recording, and fullscreen lock are all active during the test. 3 violations of any rule will result in automatic disqualification with no appeal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestRulesPage;
