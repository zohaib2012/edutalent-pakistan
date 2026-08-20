import { useState, useEffect } from 'react';
import { BookOpen, Download, Loader2 } from 'lucide-react';
import { getSyllabus } from '../../services/api';

const SyllabusPage = () => {
  const [phases, setPhases] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSyllabus()
      .then((res) => {
        const data = res.data?.data || res.data || [];
        const sorted = [...data].sort((a, b) => {
          const na = a.phaseId?.name || '';
          const nb = b.phaseId?.name || '';
          return na.localeCompare(nb, undefined, { numeric: true });
        });
        setPhases(sorted);
        setActiveTab(0);
      })
      .catch(() => setPhases([]))
      .finally(() => setLoading(false));
  }, []);

  const activePhase = phases[activeTab];

  const downloadPDF = () => {
    const phase = activePhase;
    if (!phase) return;
    const subjects = phase.subjects || [];
    const totalMCQs = subjects.reduce((sum, s) => sum + (Number(s.totalMCQs) || 0), 0);

    const tableRows = subjects.map((s, i) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-size: 13px;">${i + 1}</td>
        <td style="padding: 8px; border: 1px solid #ddd; font-size: 13px; font-weight: 600;">${s.name || ''}</td>
        <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px; color: #555;">${s.topics || ''}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-size: 13px; font-weight: 600; color: #1e40af;">${s.totalMCQs ?? 0}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-size: 12px;"><span style="background: #e0e7ff; color: #1e40af; padding: 2px 8px; border-radius: 12px; font-weight: 600;">${s.weightage ?? 0}%</span></td>
      </tr>
    `).join('');

    const totalRow = `
      <tr>
        <td colspan="3" style="padding: 8px; border: 1px solid #ddd; text-align: right; font-size: 13px; font-weight: 700;">Total</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-size: 13px; font-weight: 700; color: #1e40af;">${totalMCQs}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center; font-size: 13px;"><span style="font-weight: 700; color: #1e40af;">100%</span></td>
      </tr>
    `;

    const html = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>EduTalent Pakistan - ${phase.phaseId?.name || ''} Syllabus</title>
          <style>
            @page { margin: 20mm; }
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1A73E8; padding-bottom: 15px; }
            .header h1 { color: #1A73E8; font-size: 24px; margin-bottom: 4px; }
            .header h2 { color: #333; font-size: 18px; margin-bottom: 4px; }
            .header p { color: #666; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #1A73E8; color: white; padding: 10px 8px; text-align: left; font-size: 12px; text-transform: uppercase; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 15px; }
            @media print { body { margin: 0; padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>EduTalent Pakistan</h1>
            <h2>${phase.phaseId?.name || ''} - ${phase.phaseId?.description || ''}</h2>
            <p>Complete Syllabus Breakdown</p>
          </div>
          <table>
            <thead>
              <tr>
                <th style="text-align: center;">#</th>
                <th>Subject</th>
                <th>Topics</th>
                <th style="text-align: center;">MCQs</th>
                <th style="text-align: center;">Weightage</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
              ${totalRow}
            </tbody>
          </table>
          <div class="footer">
            <p>EduTalent Pakistan | National Digital Scholarship Platform | www.edutalentpakistan.com</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;

    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      win.print();
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Syllabus</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Comprehensive syllabus breakdown for all four phases.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-primary" /></div>
          ) : phases.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center text-gray-500">
              Syllabus has not been published yet. Please check back soon.
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-8">
                {phases.map((phase, i) => (
                  <button
                    key={phase._id}
                    onClick={() => setActiveTab(i)}
                    className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                      activeTab === i
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-primary-50'
                    }`}
                  >
                    {phase.phaseId?.name || `Phase ${i + 1}`}
                  </button>
                ))}
              </div>

              {activePhase && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-heading font-bold text-xl">{activePhase.phaseId?.name || 'Syllabus'}</h2>
                      <p className="text-sm text-gray-500">{activePhase.phaseId?.description || activePhase.description || ''}</p>
                    </div>
                    <button onClick={downloadPDF} className="btn-primary text-sm">
                      <Download size={16} /> Download Syllabus PDF
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">#</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Subject</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Topics</th>
                          <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase">MCQs</th>
                          <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Weightage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(activePhase.subjects || []).map((s, i) => (
                          <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-500">{String(i + 1).padStart(2, '0')}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">{s.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-md">{s.topics}</td>
                            <td className="px-6 py-4 text-sm text-center font-semibold text-primary">{s.totalMCQs ?? 0}</td>
                            <td className="px-6 py-4 text-sm text-center">
                              <span className="inline-block bg-primary-50 text-primary font-semibold text-xs px-3 py-1 rounded-full">{s.weightage ?? 0}%</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50 border-t border-gray-200">
                          <td colSpan="3" className="px-6 py-4 text-sm font-bold text-gray-700 text-right">Total</td>
                          <td className="px-6 py-4 text-sm font-bold text-primary text-center">
                            {(activePhase.subjects || []).reduce((sum, s) => sum + (Number(s.totalMCQs) || 0), 0)}
                          </td>
                          <td className="px-6 py-4 text-sm text-center">
                            <span className="font-bold text-primary">100%</span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SyllabusPage;
