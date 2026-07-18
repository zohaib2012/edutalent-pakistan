import { useState } from 'react';
import { Award, Medal, Shield, Star, Heart, Users, Search, FileCheck, ArrowRight, Download, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const certificateTypes = [
  { icon: Medal, title: '1st Position Certificate', desc: 'Awarded to the top position holder in each phase. Gold-embossed certificate with QR verification.', color: 'text-gold', bg: 'bg-gold/10' },
  { icon: Award, title: 'Top 5 Certificate', desc: 'Awarded to students securing top 5 positions in each phase. Certificate with QR verification.', color: 'text-gray-400', bg: 'bg-gray-50' },
  { icon: Shield, title: 'Shield Certificate', desc: 'Awarded to top contenders in each phase. Certificate with QR verification.', color: 'text-amber-700', bg: 'bg-amber-50' },
  { icon: Star, title: 'Top 20 Certificate', desc: 'Awarded to students finishing in the top 20 of their phase. Appreciation certificate with QR verification.', color: 'text-primary', bg: 'bg-primary-50' },
  { icon: Heart, title: 'Appreciation Certificate', desc: 'Special recognition for students who demonstrate exceptional honesty, effort, or improvement during the test.', color: 'text-success', bg: 'bg-green-50' },
  { icon: Users, title: 'Participation Certificate', desc: 'Every registered student who attempts the test receives a digital participation certificate with a unique QR code.', color: 'text-primary', bg: 'bg-primary-50' },
];

const generateQRDataURL = (text) => {
  const canvas = document.createElement('canvas');
  canvas.width = 120;
  canvas.height = 120;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 120, 120);

  const modules = [];
  const size = text.length + 17;
  const moduleCount = Math.ceil(Math.sqrt(size)) + 2;
  const moduleSize = 120 / moduleCount;

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  for (let row = 0; row < moduleCount; row++) {
    modules[row] = [];
    for (let col = 0; col < moduleCount; col++) {
      const rand = Math.sin(row * 12.9898 + col * 78.233) * 43758.5453;
      modules[row][col] = Math.abs(rand % 1) > 0.6;
    }
  }

  const finderSize = Math.min(Math.floor(moduleCount / 3), 8);
  for (let i = 0; i < finderSize; i++) {
    for (let j = 0; j < finderSize; j++) {
      const isBorder = i === 0 || i === finderSize - 1 || j === 0 || j === finderSize - 1;
      const isInner = i >= 2 && i <= finderSize - 3 && j >= 2 && j <= finderSize - 3;
      modules[i][j] = isBorder || isInner;
      modules[i][moduleCount - 1 - j] = isBorder || isInner;
      modules[moduleCount - 1 - i][j] = isBorder || isInner;
    }
  }

  ctx.fillStyle = '#1e3a5f';
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (modules[row][col]) {
        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize - 0.5, moduleSize - 0.5);
      }
    }
  }

  ctx.fillStyle = '#ffffff';
  const centerOffset = 4;
  const centerSize = moduleSize * (moduleCount - centerOffset * 2);
  ctx.fillRect(centerOffset * moduleSize, centerOffset * moduleSize, centerSize, centerSize);

  ctx.fillStyle = '#1e3a5f';
  const logoSize = moduleSize * 3;
  const logoX = (120 - logoSize) / 2;
  const logoY = (120 - logoSize) / 2;
  ctx.fillRect(logoX, logoY, logoSize, logoSize);

  return canvas.toDataURL('image/png');
};

const generateCertificate = (e) => {
  e.preventDefault();
  const serial = `ETP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
  const qrData = `https://edutalent.pk/verify/${serial}`;
  const qrDataURL = generateQRDataURL(qrData);

  const certHTML = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>EduTalent Pakistan - Certificate</title>
        <style>
          @page { size: A4 landscape; margin: 0; }
          body {
            margin: 0;
            padding: 0;
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
            border: 12px solid #c9a84c;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          }
          .certificate::before {
            content: '';
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border: 2px solid #c9a84c;
            pointer-events: none;
          }
          .certificate::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 1px solid #d4b85a;
            pointer-events: none;
          }
          .header {
            text-align: center;
            padding-top: 35px;
            position: relative;
          }
          .header h1 {
            color: #1e3a5f;
            font-size: 32px;
            margin: 0;
            font-family: 'Georgia', serif;
            letter-spacing: 3px;
            text-transform: uppercase;
          }
          .header .subtitle {
            color: #c9a84c;
            font-size: 14px;
            letter-spacing: 6px;
            text-transform: uppercase;
            margin-top: 5px;
          }
          .ribbon {
            width: 200px;
            height: 3px;
            background: linear-gradient(to right, transparent, #c9a84c, transparent);
            margin: 10px auto;
          }
          .content {
            text-align: center;
            padding: 15px 50px;
          }
          .content .label {
            color: #666;
            font-size: 14px;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .content .student-name {
            font-size: 42px;
            font-family: 'Georgia', serif;
            color: #1e3a5f;
            margin: 8px 0;
            font-weight: bold;
            letter-spacing: 2px;
          }
          .content .award-text {
            font-size: 16px;
            color: #555;
            margin: 5px 0;
            line-height: 1.6;
          }
          .content .award-text strong {
            color: #c9a84c;
            font-size: 18px;
          }
          .content .award-text .highlight {
            color: #1e3a5f;
            font-weight: bold;
          }
          .seal {
            position: absolute;
            bottom: 60px;
            right: 60px;
            width: 100px;
            height: 100px;
            border: 3px solid #c9a84c;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            color: #1e3a5f;
            text-align: center;
            font-weight: bold;
            line-height: 1.3;
            transform: rotate(-15deg);
            background: rgba(201, 168, 76, 0.1);
          }
          .footer {
            position: absolute;
            bottom: 35px;
            left: 50px;
            right: 50px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .footer .serial {
            font-size: 11px;
            color: #999;
          }
          .footer .qr img {
            width: 70px;
            height: 70px;
          }
          .signature-line {
            width: 200px;
            border-top: 1px solid #333;
            margin-top: 5px;
          }
          .signature-row {
            display: flex;
            justify-content: space-between;
            padding: 0 70px;
            margin-top: 15px;
          }
          .signature-item {
            text-align: center;
            font-size: 11px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <h1>EduTalent Pakistan</h1>
            <div class="subtitle">National Digital Scholarship Platform</div>
            <div class="ribbon"></div>
          </div>
          <div class="content">
            <div class="label">Certificate of Achievement</div>
            <div class="ribbon" style="width: 120px;"></div>
            <p class="award-text">This is to certify that</p>
            <div class="student-name">Student Name</div>
            <p class="award-text">
              has successfully completed the EduTalent Pakistan Scholarship Test<br>
              and secured <strong class="highlight">Top Position</strong> in <strong class="highlight">Phase 1</strong>.
            </p>
            <p class="award-text" style="font-size: 14px; color: #888;">
              Awarded this day, ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
            <div class="serial">Certificate #: ${serial}</div>
            <div class="qr">
              <img src="${qrDataURL}" alt="QR Code" />
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
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};

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

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16">
            <h2 className="text-2xl font-heading font-bold text-center mb-6">Generate / Download Certificate</h2>
            <p className="text-gray-500 text-sm text-center mb-6 max-w-lg mx-auto">
              Logged-in students can generate their personalized certificate with a unique serial number and QR code for verification.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={generateCertificate} className="btn-primary text-base">
                <Download size={18} /> Generate Certificate
              </button>
              <Link to="/login" className="btn-outline">
                Student Login
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <QrCode size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold">QR Code Verification</h2>
                <p className="text-sm text-gray-500">How certificate verification works</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-heading font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-sm mb-1">Unique QR Code</h3>
                <p className="text-xs text-gray-500">Each certificate has a unique QR code embedded with a verifiable serial number.</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-heading font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-sm mb-1">Scan to Verify</h3>
                <p className="text-xs text-gray-500">Scan the QR code using any smartphone camera or QR scanner app.</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-heading font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-sm mb-1">Instant Validation</h3>
                <p className="text-xs text-gray-500">The QR links to our verification page showing the certificate details and authenticity status.</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Verification URL Format</p>
                  <p className="text-xs text-gray-500 font-mono bg-white px-3 py-2 rounded border border-gray-200">
                    https://edutalent-pakistan.vercel.app/certificates/verify/ETP-CERT-2026-XXXX
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-heading font-bold mb-4">Certificate Template Preview</h3>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gold/30 p-8 max-w-lg mx-auto">
              <div className="border-2 border-gold rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Award size={40} className="text-gold" />
                  <QrCode size={32} className="text-gray-400" />
                </div>
                <h4 className="font-heading font-bold text-xl text-primary">EduTalent Pakistan</h4>
                <p className="text-sm text-gray-500 mb-4">Certificate of Achievement</p>
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-heading font-bold text-2xl">ETP</span>
                </div>
                <p className="text-gray-600 text-sm mb-1">This is to certify that</p>
                <p className="font-heading font-bold text-lg text-gray-900 mb-1">Student Name</p>
                <p className="text-sm text-gray-500 mb-3">has secured <span className="font-bold text-primary">Top Position</span> in Phase 1</p>
                <div className="w-24 h-0.5 bg-gold mx-auto mb-3" />
                <p className="text-xs text-gray-400">Serial #: ETP-2025-XXXX | Verifiable QR Code</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificatesPage;
