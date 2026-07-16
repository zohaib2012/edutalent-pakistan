import { Download, Award, Medal, Shield, Star, Trophy, Clock, QrCode } from 'lucide-react';

const certificates = [
  { id: 1, type: '1st Position', issueDate: '15 Jan 2026', studentName: 'Muhammad Ahmed', color: 'gold', bg: 'bg-gold/10 text-gold border-gold/20' },
  { id: 2, type: '2nd Position', issueDate: '15 Jan 2026', studentName: 'Muhammad Ahmed', color: 'success', bg: 'bg-success/10 text-success border-success/20' },
  { id: 3, type: 'Shield', issueDate: '20 Feb 2026', studentName: 'Muhammad Ahmed', color: 'primary', bg: 'bg-primary/10 text-primary border-primary/20' },
  { id: 4, type: 'Top 20', issueDate: '20 Feb 2026', studentName: 'Muhammad Ahmed', color: 'purple', bg: 'bg-purple-50 text-purple-600 border-purple-200' },
  { id: 5, type: 'Appreciation', issueDate: '10 Mar 2026', studentName: 'Muhammad Ahmed', color: 'blue', bg: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 6, type: 'Participation', issueDate: '10 Mar 2026', studentName: 'Muhammad Ahmed', color: 'gray', bg: 'bg-gray-100 text-gray-600 border-gray-200' },
];

const badgeIconMap = {
  '1st Position': Trophy,
  '2nd Position': Medal,
  'Shield': Shield,
  'Top 20': Star,
  'Appreciation': Award,
  'Participation': Clock,
};

const MyCertificatesPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">My Certificates</h1>
          <p className="text-white/80">View and download your achievement certificates</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => {
              const Icon = badgeIconMap[cert.type] || Award;
              return (
                <div key={cert.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cert.bg}`}>
                      <Icon size={14} />
                      {cert.type}
                    </div>

                    <div className="mt-4 space-y-2">
                      <div>
                        <p className="text-xs text-gray-400">Student Name</p>
                        <p className="text-sm font-semibold text-gray-800">{cert.studentName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Issue Date</p>
                        <p className="text-sm font-medium text-gray-600">{cert.issueDate}</p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-0.5">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i} className={`w-2 h-2 ${i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-center text-xs text-gray-400 mt-1">QR Code</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button className="btn-primary w-full justify-center text-sm">
                      <Download size={16} /> Download PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {certificates.length === 0 && (
            <div className="text-center py-16">
              <Award size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-heading font-bold text-gray-500 mb-2">No Certificates Yet</h3>
              <p className="text-sm text-gray-400">Certificates will appear here once awarded.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyCertificatesPage;
