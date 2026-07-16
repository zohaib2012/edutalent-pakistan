import { Shield, Database, Lock, Camera, Trash2, Mail } from 'lucide-react';

const sections = [
  {
    icon: Database,
    title: 'Data Collection',
    content: 'EduTalent Pakistan collects personal information including name, father name, date of birth, CNIC/B-Form number, address, contact number, email address, academic details, and passport-size photograph. This information is collected solely for the purpose of scholarship registration, verification, test administration, and award delivery.',
  },
  {
    icon: Shield,
    title: 'Data Usage',
    content: 'Your data is used exclusively for: processing your scholarship application, verifying your identity and academic details, conducting online tests with AI proctoring, generating roll number slips and certificates, delivering awards to your verified address, and communicating important updates regarding the scholarship program.',
  },
  {
    icon: Lock,
    title: 'Storage & Security',
    content: 'All personal data is stored on secure servers with encryption. We implement industry-standard security measures including SSL encryption, firewalls, and access controls to protect your information from unauthorized access, alteration, disclosure, or destruction.',
  },
  {
    icon: Camera,
    title: 'Camera & Audio Access',
    content: 'During the online test, EduTalent Pakistan requires access to your camera and microphone for AI-based proctoring. Video and audio recordings are captured in real-time to monitor test integrity. These recordings are stored securely and are only used for detecting cheating or policy violations. Recordings are deleted after the scholarship cycle concludes.',
  },
  {
    icon: Trash2,
    title: 'Data Deletion Request',
    content: 'You may request deletion of your personal data by contacting our support team. Upon receiving a verified deletion request, we will remove your personal information from our active databases within 30 days. Certain data may be retained for legal or regulatory compliance purposes.',
  },
  {
    icon: Mail,
    title: 'Contact',
    content: 'If you have any questions, concerns, or requests regarding your privacy or data handling, please contact us at info@edutalentpakistan.com. We are committed to addressing your concerns promptly and transparently.',
  },
];

const PrivacyPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 mb-10 leading-relaxed">
            At EduTalent Pakistan, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our scholarship platform.
          </p>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <s.icon size={28} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl mb-3">{s.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{s.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500">
              Last updated: July 2025. EduTalent Pakistan reserves the right to update this privacy policy at any time. Students and parents will be notified of any material changes via email or through the platform.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
