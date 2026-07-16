import { Link } from 'react-router-dom';
import { Download, Award, Trophy, Medal, TrendingUp, CheckCircle, XCircle, MinusCircle } from 'lucide-react';

const MyResultsPage = () => {
  const resultData = {
    obtainedMarks: 82,
    totalMarks: 100,
    percentage: 82,
    phaseRank: 5,
    totalStudents: 250,
    subjectBreakdown: [
      { subject: 'English', total: 25, correct: 22, wrong: 2, unattempted: 1 },
      { subject: 'Mathematics', total: 25, correct: 20, wrong: 3, unattempted: 2 },
      { subject: 'Science', total: 25, correct: 21, wrong: 4, unattempted: 0 },
      { subject: 'General Knowledge', total: 25, correct: 19, wrong: 5, unattempted: 1 },
    ],
    award: { type: 'Shield', deliveryStatus: 'In Progress' },
    certificateAvailable: true,
  };

  const getCircumference = (radius) => 2 * Math.PI * radius;
  const radius = 60;
  const circumference = getCircumference(radius);
  const offset = circumference - (resultData.percentage / 100) * circumference;

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">My Results</h1>
          <p className="text-white/80">View your test performance and rankings</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative flex-shrink-0">
                  <svg width="150" height="150" className="transform -rotate-90">
                    <circle cx="75" cy="75" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10" />
                    <circle cx="75" cy="75" r={radius} fill="none" stroke="#1A73E8" strokeWidth="10"
                      strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
                      className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-heading font-bold text-primary">{resultData.percentage}%</p>
                      <p className="text-xs text-gray-500">Score</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Total Marks</span>
                    <span className="text-sm font-bold text-gray-800">{resultData.totalMarks}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Obtained Marks</span>
                    <span className="text-sm font-bold text-success">{resultData.obtainedMarks}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Percentage</span>
                    <span className="text-sm font-bold text-primary">{resultData.percentage}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Phase Rank</span>
                    <span className="flex items-center gap-1 text-sm font-bold text-gold">
                      <Trophy size={16} className="text-gold" /> #{resultData.phaseRank} of {resultData.totalStudents}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-lg font-heading font-bold text-gray-800 mb-5">Subject-wise Breakdown</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 font-semibold text-gray-600">Subject</th>
                      <th className="text-center py-3 font-semibold text-gray-600">Total</th>
                      <th className="text-center py-3 font-semibold text-gray-600">
                        <span className="flex items-center justify-center gap-1"><CheckCircle size={14} className="text-success" /> Correct</span>
                      </th>
                      <th className="text-center py-3 font-semibold text-gray-600">
                        <span className="flex items-center justify-center gap-1"><XCircle size={14} className="text-red-500" /> Wrong</span>
                      </th>
                      <th className="text-center py-3 font-semibold text-gray-600">
                        <span className="flex items-center justify-center gap-1"><MinusCircle size={14} className="text-gray-400" /> Unattempted</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.subjectBreakdown.map((row, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 font-medium text-gray-800">{row.subject}</td>
                        <td className="py-3 text-center text-gray-600">{row.total}</td>
                        <td className="py-3 text-center text-success font-semibold">{row.correct}</td>
                        <td className="py-3 text-center text-red-500 font-semibold">{row.wrong}</td>
                        <td className="py-3 text-center text-gray-400 font-semibold">{row.unattempted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {resultData.award && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-lg font-heading font-bold text-gray-800 mb-4">Award Information</h2>
                <div className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <Medal size={32} className="text-gold" />
                  <div>
                    <p className="font-semibold text-gray-800">Award Type: <span className="text-gold">{resultData.award.type}</span></p>
                    <p className="text-sm text-gray-500">Delivery Status: <span className="font-medium text-gray-700">{resultData.award.deliveryStatus}</span></p>
                  </div>
                </div>
              </div>
            )}

            {resultData.certificateAvailable && (
              <Link to="/my-certificates" className="btn-primary w-full justify-center">
                <Download size={18} /> Download Certificate
              </Link>
            )}

            <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <TrendingUp size={16} className="text-primary mt-0.5" />
                <p className="text-xs text-gray-600">
                  Well done on your performance! Keep striving for excellence. Your detailed result card and
                  position certificate will be available for download once published.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyResultsPage;
