import { useState } from 'react';
import { Award, Medal, Shield, Star, Heart, Users, Search, FileCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const certificateTypes = [
  { icon: Medal, title: '1st Position Certificate', desc: 'Awarded to the top position holder in each phase. Gold-embossed certificate with QR verification.', color: 'text-gold', bg: 'bg-gold/10' },
  { icon: Award, title: '2nd-5th Position Certificate', desc: 'Awarded to students securing 2nd to 5th positions in each phase. Silver-embossed certificate with QR verification.', color: 'text-gray-400', bg: 'bg-gray-50' },
  { icon: Shield, title: 'Shield Certificate', desc: 'Awarded to students securing 6th to 10th positions. Bronze-embossed certificate with QR verification.', color: 'text-amber-700', bg: 'bg-amber-50' },
  { icon: Star, title: 'Top 20 Certificate', desc: 'Awarded to students finishing in the top 20 of their phase. Appreciation certificate with QR verification.', color: 'text-primary', bg: 'bg-primary-50' },
  { icon: Heart, title: 'Appreciation Certificate', desc: 'Special recognition for students who demonstrate exceptional honesty, effort, or improvement during the test.', color: 'text-success', bg: 'bg-green-50' },
  { icon: Users, title: 'Participation Certificate', desc: 'Every registered student who attempts the test receives a digital participation certificate with a unique QR code.', color: 'text-primary', bg: 'bg-primary-50' },
];

const CertificatesPage = () => {
  const [certNumber, setCertNumber] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (certNumber) setVerified(true);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileCheck size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Certificates</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Every achievement at EduTalent is recognized with a verified digital certificate.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-center mb-10">Certificate Types</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {certificateTypes.map((c, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow group">
                <div className={`w-14 h-14 ${c.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <c.icon size={28} className={c.color} />
                </div>
                <h3 className="font-heading font-bold text-base mb-2">{c.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16">
            <h2 className="text-2xl font-heading font-bold text-center mb-6">Verify Your Certificate</h2>
            <form onSubmit={handleVerify} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={certNumber}
                    onChange={(e) => setCertNumber(e.target.value)}
                    placeholder="Enter Certificate Number..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <button type="submit" className="btn-primary">Verify</button>
              </div>
            </form>
            {verified && (
              <div className="max-w-md mx-auto mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <FileCheck size={24} className="text-success mx-auto mb-2" />
                <p className="text-sm font-semibold text-success">Certificate Verified Successfully!</p>
                <p className="text-xs text-gray-500 mt-1">Certificate #{certNumber} is valid and issued by EduTalent Pakistan.</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <h3 className="text-xl font-heading font-bold mb-4">Sample Certificate</h3>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gold/30 p-8 max-w-lg mx-auto">
              <div className="border-2 border-gold rounded-xl p-6 text-center">
                <Award size={48} className="text-gold mx-auto mb-3" />
                <h4 className="font-heading font-bold text-xl text-primary">EduTalent Pakistan</h4>
                <p className="text-sm text-gray-500 mb-4">Certificate of Achievement</p>
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-heading font-bold text-2xl">ET</span>
                </div>
                <p className="text-gray-600 text-sm mb-1">This is to certify that</p>
                <p className="font-heading font-bold text-lg text-gray-900 mb-1">Student Name</p>
                <p className="text-sm text-gray-500 mb-3">has secured <span className="font-bold text-primary">1st Position</span> in Phase 1</p>
                <div className="w-24 h-0.5 bg-gold mx-auto mb-3" />
                <p className="text-xs text-gray-400">Verifiable QR Code | Certificate ID: ET-2025-XXXX</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificatesPage;
