import { useState, useEffect } from 'react';
import { Download, Award, Medal, Shield, Star, Trophy, Clock, Search, FileCheck, Plus, Loader, CheckCircle } from 'lucide-react';
import { getMyCertificates, generateCertificate } from '../../services/api';

const certificateMeta = {
  '1st Position': { icon: Trophy, color: 'text-gold', bg: 'bg-gold/10 text-gold border-gold/20' },
  'Top 5': { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-50 text-gray-600 border-gray-200' },
  'Shield': { icon: Shield, color: 'text-amber-700', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  'Top 20': { icon: Star, color: 'text-primary', bg: 'bg-primary-50 text-primary border-primary-200' },
  'Appreciation': { icon: Award, color: 'text-success', bg: 'bg-green-50 text-success border-green-200' },
  'Participation': { icon: Clock, color: 'text-gray-500', bg: 'bg-gray-100 text-gray-600 border-gray-200' },
};

const typeLabelMap = {
  '1st_position': '1st Position', top5: 'Top 5', shield: 'Shield', top20: 'Top 20',
  appreciation: 'Appreciation', participation: 'Participation',
};

const downloadCertificatePDF = (cert) => {
  const certNumber = cert?.serialNumber || `ETP-CERT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
  const studentName = cert?.studentName || 'Student Name';
  const certType = cert?.type || 'Achievement';
  const issueDate = cert?.issueDate ? new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const awardDescription = cert?.description || `secured ${certType}`;
  const verifyUrl = `https://edutalent-pakistan.vercel.app/certificates/verify/${certNumber}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyUrl)}`;

  const isTop = certType === '1st Position';
  const borderColor = isTop ? '#c9a84c' : '#1e3a5f';
  const accentColor = isTop ? '#c9a84c' : '#1e3a5f';

  const certHTML = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>EduTalent Pakistan - ${certType} Certificate</title>
        <style>
          @page { size: A4 landscape; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', 'Georgia', serif;
            background: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .certificate {
            width: 950px;
            height: 670px;
            background: linear-gradient(135deg, #f8f4e8 0%, #fff 30%, #f8f4e8 70%, #e8e0d0 100%);
            border: 12px solid ${borderColor};
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          }
          .certificate::before {
            content: '';
            position: absolute;
            top: 15px; left: 15px; right: 15px; bottom: 15px;
            border: 2px solid ${accentColor};
            pointer-events: none;
          }
          .certificate::after {
            content: '';
            position: absolute;
            top: 20px; left: 20px; right: 20px; bottom: 20px;
            border: 1px solid ${accentColor}99;
            pointer-events: none;
          }
          .corner-decor {
            position: absolute;
            width: 60px; height: 60px;
            border-color: ${accentColor};
            border-style: solid;
          }
          .corner-tl { top: 25px; left: 25px; border-width: 3px 0 0 3px; }
          .corner-tr { top: 25px; right: 25px; border-width: 3px 3px 0 0; }
          .corner-bl { bottom: 25px; left: 25px; border-width: 0 0 3px 3px; }
          .corner-br { bottom: 25px; right: 25px; border-width: 0 3px 3px 0; }
          .header { text-align: center; padding-top: 40px; position: relative; }
          .header .logo-text {
            font-size: 13px;
            color: ${accentColor};
            letter-spacing: 4px;
            text-transform: uppercase;
            font-weight: 600;
          }
          .header h1 {
            color: #1e3a5f;
            font-size: 34px;
            font-family: 'Georgia', serif;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin: 2px 0;
          }
          .header .subtitle {
            color: ${accentColor};
            font-size: 13px;
            letter-spacing: 5px;
            text-transform: uppercase;
            margin-top: 2px;
          }
          .ribbon {
            width: 220px;
            height: 3px;
            background: linear-gradient(to right, transparent, ${accentColor}, transparent);
            margin: 8px auto;
          }
          .content { text-align: center; padding: 10px 60px; }
          .content .label {
            color: #888;
            font-size: 13px;
            letter-spacing: 3px;
            text-transform: uppercase;
          }
          .content .student-name {
            font-size: 44px;
            font-family: 'Georgia', serif;
            color: #1e3a5f;
            margin: 6px 0;
            font-weight: bold;
            letter-spacing: 2px;
          }
          .content .award-text {
            font-size: 15px;
            color: #555;
            margin: 4px 0;
            line-height: 1.7;
          }
          .content .award-text strong {
            color: ${accentColor};
            font-size: 17px;
          }
          .content .award-text .highlight {
            color: #1e3a5f;
            font-weight: bold;
          }
          .seal {
            position: absolute;
            bottom: 55px;
            right: 55px;
            width: 95px;
            height: 95px;
            border: 3px solid ${accentColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #1e3a5f;
            text-align: center;
            font-weight: bold;
            line-height: 1.3;
            transform: rotate(-15deg);
            background: ${accentColor}10;
          }
          .footer {
            position: absolute;
            bottom: 30px;
            left: 50px;
            right: 50px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .footer .serial {
            font-size: 10px;
            color: #999;
          }
          .footer .qr img {
            width: 65px;
            height: 65px;
          }
          .signature-row {
            display: flex;
            justify-content: space-between;
            padding: 0 80px;
            margin-top: 10px;
          }
          .signature-item { text-align: center; font-size: 10px; color: #888; }
          .signature-line { width: 180px; border-top: 1px solid #555; margin-top: 4px; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="corner-decor corner-tl"></div>
          <div class="corner-decor corner-tr"></div>
          <div class="corner-decor corner-bl"></div>
          <div class="corner-decor corner-br"></div>
          <div class="header">
            <div class="logo-text">EduTalent Pakistan</div>
            <h1>${isTop ? 'Certificate of Excellence' : 'Certificate of Achievement'}</h1>
            <div class="subtitle">National Digital Scholarship Platform</div>
            <div class="ribbon"></div>
          </div>
          <div class="content">
            <div class="label">This is to certify that</div>
            <div class="ribbon" style="width: 100px;"></div>
            <div class="student-name">${studentName}</div>
            <p class="award-text">
              has successfully completed the EduTalent Pakistan Scholarship Test<br>
              and <strong>${awardDescription}</strong>.
            </p>
            <p class="award-text" style="font-size: 13px; color: #999;">
              Awarded this day, ${issueDate}
            </p>
          </div>
          <div class="signature-row">
            <div class="signature-item">
              <div class="signature-line"></div>
              <div style="margin-top: 4px;">Program Director</div>
            </div>
            <div class="signature-item">
              <div class="signature-line"></div>
              <div style="margin-top: 4px;">Chairperson</div>
            </div>
          </div>
          <div class="seal">EduTalent<br>Pakistan<br>Seal</div>
          <div class="footer">
            <div class="serial">Certificate #: ${certNumber}</div>
            <div class="qr">
              <img src="${qrUrl}" alt="QR Code" />
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=1024,height=768');
  if (printWindow) {
    printWindow.document.write(certHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 600);
  }
};

const MyCertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatedSerial, setGeneratedSerial] = useState(null);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await getMyCertificates();
        setCertificates(res.data?.certificates || res.data || []);
      } catch {
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await generateCertificate();
      const cert = res.data?.certificate || res.data;
      if (cert) {
        setCertificates(prev => [cert, ...prev]);
        setGeneratedSerial(cert.serialNumber || cert.serial);
      }
    } catch {
      const fallback = {
        _id: Date.now(),
        type: 'Participation',
        serialNumber: `ETP-CERT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
        issueDate: new Date().toISOString(),
        studentName: 'Student',
      };
      setCertificates(prev => [fallback, ...prev]);
      setGeneratedSerial(fallback.serialNumber);
    } finally {
      setGenerating(false);
    }
  };

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
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-heading font-bold text-gray-800">Your Certificates</h2>
                  <p className="text-sm text-gray-500">{certificates.length} certificate{certificates.length !== 1 ? 's' : ''} earned</p>
                </div>
                <button onClick={handleGenerate} disabled={generating}
                  className="btn-primary text-sm">
                  {generating ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
                  {generating ? 'Generating...' : 'Generate Certificate'}
                </button>
              </div>
              {generatedSerial && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                  <CheckCircle size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-800">
                    Certificate generated! Serial: <span className="font-mono font-bold">{generatedSerial}</span>
                  </p>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <Loader size={32} className="animate-spin text-primary" />
              </div>
            ) : certificates.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <Award size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-gray-500 mb-2">No Certificates Yet</h3>
                <p className="text-sm text-gray-400">Complete your test and secure a position to earn certificates.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => {
                  const label = typeLabelMap[cert.type] || cert.type || 'Participation';
                  const meta = certificateMeta[label] || certificateMeta['Participation'];
                  const Icon = meta.icon;
                  const serialNumber = cert.serialNumber || cert.certificateNumber || cert.serial || `ETP-CERT-${new Date().getFullYear()}-XXXX`;
                  const issueDate = cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';

                  return (
                    <div key={cert._id || cert.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${meta.bg}`}>
                          <Icon size={14} />
                          {label}
                        </div>

                        <div className="mt-4 space-y-2">
                          {cert.studentName && (
                            <div>
                              <p className="text-xs text-gray-400">Student Name</p>
                              <p className="text-sm font-semibold text-gray-800">{cert.studentName}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-gray-400">Serial Number</p>
                            <p className="text-sm font-medium text-gray-600 font-mono">{serialNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Issue Date</p>
                            <p className="text-sm font-medium text-gray-600">{issueDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 pb-6">
                        {cert.fileUrl ? (
                          <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-sm">
                            <Download size={16} /> Download Certificate
                          </a>
                        ) : (
                          <button onClick={() => downloadCertificatePDF(cert)} className="btn-primary w-full justify-center text-sm">
                            <Download size={16} /> Download Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6" id="verify-note">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Search size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-heading font-bold text-gray-800">Certificate Issuance</h2>
                  <p className="text-xs text-gray-500">Certificates are issued by the EduTalent administration after results are published.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyCertificatesPage;
