import { useState } from 'react';
import { Search, Award, Shield, FileCheck, Star, ThumbsUp, Users, CheckCircle, XCircle, QrCode } from 'lucide-react';

const certificateTypes = [
  { icon: Award, title: '1st Position', desc: 'Top performer in the phase — Gold-tier certificate with highest distinction.', color: 'from-gold to-yellow-500', bg: 'bg-gold/10', text: 'text-gold' },
  { icon: Star, title: 'Top 5', desc: 'Among the top 5 performers — Silver-tier certificate of excellence.', color: 'from-gray-300 to-gray-400', bg: 'bg-gray-100', text: 'text-gray-500' },
  { icon: Shield, title: 'Shield', desc: 'Awarded to positions 6 to 10 — Bronze-tier merit certificate.', color: 'from-amber-600 to-amber-700', bg: 'bg-amber-50', text: 'text-amber-600' },
  { icon: ThumbsUp, title: 'Top 20', desc: 'Recognized among top 20 — Certificate of achievement.', color: 'from-primary to-primary-600', bg: 'bg-primary-50', text: 'text-primary' },
  { icon: FileCheck, title: 'Appreciation', desc: 'For notable performance — Certificate of appreciation.', color: 'from-success to-emerald-500', bg: 'bg-green-50', text: 'text-success' },
  { icon: Users, title: 'Participation', desc: 'Issued to every test participant — Certificate of participation.', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', text: 'text-purple-500' },
];

const FindCertificatePage = () => {
  const [certNumber, setCertNumber] = useState('');
  const [certData, setCertData] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setSearched(true);
    setCertData({
      studentName: 'Fatima Ali',
      certificateType: 'Top 5',
      issueDate: 'September 15, 2025',
      valid: true,
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-4">
            <Award size={16} className="text-gold" />
            <span>Verification Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Find & Verify Your Certificate</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Enter your certificate number to verify its authenticity and view details.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Certificate Number</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={certNumber}
                    onChange={(e) => setCertNumber(e.target.value)}
                    placeholder="e.g. CERT-2025-0001"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                <Search size={18} /> Verify
              </button>
            </form>

            {searched && !certData && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <XCircle size={20} className="text-red-500" />
                <p className="text-sm text-red-700">Invalid certificate number. No matching certificate found in our records.</p>
              </div>
            )}

            {certData && (
              <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="font-heading font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Award size={20} className="text-gold" /> Certificate Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Student Name</div>
                      <div className="text-sm font-semibold text-gray-900">{certData.studentName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Certificate Type</div>
                      <div className="text-sm font-semibold text-gray-900">{certData.certificateType}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileCheck size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500">Issue Date</div>
                      <div className="text-sm font-semibold text-gray-900">{certData.issueDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {certData.valid ? (
                      <CheckCircle size={16} className="text-success shrink-0" />
                    ) : (
                      <XCircle size={16} className="text-red-500 shrink-0" />
                    )}
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        certData.valid ? 'bg-green-50 text-success' : 'bg-red-50 text-red-600'
                      }`}>
                        {certData.valid ? 'Valid' : 'Invalid'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center gap-3">
                  <QrCode size={20} className="text-gray-400" />
                  <span className="text-xs text-gray-500">QR Code — Scan to verify authenticity</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Certificate Types</h2>
            <p className="section-subtitle">EduTalent offers six tiers of certificates based on merit and performance.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certificateTypes.map((cert, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow group">
                <div className={`w-11 h-11 ${cert.bg} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <cert.icon size={22} className={cert.text} />
                </div>
                <h3 className="font-heading font-bold text-base text-gray-900 mb-1">{cert.title}</h3>
                <p className="text-sm text-gray-500">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindCertificatePage;
