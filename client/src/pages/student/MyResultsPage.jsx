import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Award, Trophy, Medal, TrendingUp, CheckCircle, XCircle, MinusCircle, Loader2, AlertCircle } from 'lucide-react';
import { getMyResult } from '../../services/api';

const MyResultsPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      setLoading(true);
      const res = await getMyResult();
      setResult(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      setError(err.response?.data?.message || 'Result not available yet');
    } finally {
      setLoading(false);
    }
  };

  const getCircumference = (radius) => 2 * Math.PI * radius;
  const radius = 60;
  const circumference = getCircumference(radius);
  const percentage = result?.percentage || 0;
  const offset = circumference - (percentage / 100) * circumference;

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>;

  if (error) {
    return (
      <div>
        <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">My Results</h1>
            <p className="text-white/80">Your test results and performance</p>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="container-custom text-center">
            <AlertCircle size={48} className="text-yellow-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">Result Not Available</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </section>
      </div>
    );
  }

  if (!result) return null;

  const obtained = result.obtainedMarks || 0;
  const total = result.totalMarks || 100;
  const subjectBreakdown = result.subjectWiseBreakdown || [];
  const phaseRank = result.phaseRank || result.rank;

  const gradeColor = percentage >= 80 ? 'text-success' : percentage >= 60 ? 'text-gold' : percentage >= 40 ? 'text-orange-500' : 'text-red-500';
  const gradeLabel = percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Average' : 'Needs Improvement';

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-14 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">My Results</h1>
          <p className="text-white/80">Your test results and performance</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative flex-shrink-0">
                  <svg width="140" height="140" className="transform -rotate-90">
                    <circle cx="70" cy="70" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10" />
                    <circle cx="70" cy="70" r={radius} fill="none" stroke={percentage >= 80 ? '#2ECC71' : percentage >= 60 ? '#F1C40F' : '#E74C3C'} strokeWidth="10"
                      strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className={`text-3xl font-heading font-bold ${gradeColor}`}>{percentage}%</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-heading font-bold text-gray-800 mb-1">{gradeLabel}</h2>
                  <p className="text-gray-500 text-sm">You scored {obtained} out of {total} marks</p>
                  <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                      <CheckCircle size={16} className="text-success" />
                      <span className="text-sm font-medium text-green-700">{result.correctAnswers || result.sessionId?.correctAnswers || 0} Correct</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg">
                      <XCircle size={16} className="text-red-500" />
                      <span className="text-sm font-medium text-red-700">{result.wrongAnswers || result.sessionId?.wrongAnswers || 0} Wrong</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                      <MinusCircle size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">{result.unattempted || 0} Unattempted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {subjectBreakdown.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 px-6 md:px-8 py-4 border-b border-primary-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-primary" />
                    <h2 className="text-lg font-heading font-bold text-gray-800">Subject-wise Breakdown</h2>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="space-y-4">
                    {subjectBreakdown.map((subject, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-semibold text-gray-700">{subject.subjectName || subject.subject}</span>
                          <span className="text-xs text-gray-500">{subject.correct}/{subject.totalQuestions || subject.total}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${((subject.correct / (subject.totalQuestions || subject.total)) || 0) * 100}%` }} />
                        </div>
                        <div className="flex gap-4 mt-1 text-xs text-gray-400">
                          <span className="text-green-600">{subject.correct} correct</span>
                          <span className="text-red-500">{subject.wrong || 0} wrong</span>
                          <span className="text-gray-400">{subject.unattempted || 0} unattempted</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {phaseRank && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                    <Trophy size={24} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Phase Rank</p>
                    <p className="text-xl font-heading font-bold text-gray-800">#{phaseRank}</p>
                  </div>
                </div>
              )}
              {result.awardCategory && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Award size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Award</p>
                    <p className="text-xl font-heading font-bold text-gray-800">{result.awardCategory}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyResultsPage;
