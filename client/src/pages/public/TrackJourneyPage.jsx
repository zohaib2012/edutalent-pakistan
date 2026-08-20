import { useState } from 'react';
import { Search, CheckCircle, Clock, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { trackApplication } from '../../services/api';

const steps = [
  { id: 1, label: 'Registration', desc: 'Application submitted & verified' },
  { id: 2, label: 'Challan Issued', desc: 'Fee challan generated for payment' },
  { id: 3, label: 'Payment Verified', desc: 'Fee payment confirmed by system' },
  { id: 4, label: 'Roll No Slip Issued', desc: 'Admit card with test credentials' },
  { id: 5, label: 'Test Completed', desc: 'Online test successfully attempted' },
  { id: 6, label: 'Result Published', desc: 'Scores and merit position released' },
];

const statusProgressMap = {
  registered: 0,
  challan_issued: 1,
  payment_pending: 1,
  payment_verified: 2,
  slip_issued: 3,
  test_completed: 4,
  result_published: 5,
};

const TrackJourneyPage = () => {
  const [query, setQuery] = useState('');
  const [trackedData, setTrackedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTrackedData(null);
    try {
      const res = await trackApplication(query);
      const student = res.data;
      const progress = statusProgressMap[student.status] ?? 0;
      const completedSteps = Array.from({ length: progress + 1 }, (_, i) => i + 1);
      const currentStep = progress + 2 <= 6 ? progress + 2 : null;
      setTrackedData({
        name: student.fullName,
        registrationNumber: student.registrationNumber,
        phase: student.phase,
        currentStep,
        completedSteps,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'No application found for the provided details.');
    } finally {
      setLoading(false);
    }
  };

  const isCompleted = (stepId) => trackedData?.completedSteps.includes(stepId);
  const isCurrent = (stepId) => trackedData?.currentStep === stepId;

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-4">
            <MapPin size={16} className="text-gold" />
            <span>Application Tracking</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Track Your Application Journey</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">Enter your details to see the real-time status of your scholarship application.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleTrack} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address or CNIC / B-Form</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter email or CNIC number..."
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />} Track
              </button>
            </form>

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle size={20} className="text-red-500" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {trackedData && (
            <div className="mt-10">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Tracking application for</p>
                  <p className="font-heading font-bold text-xl text-gray-900">{trackedData.name}</p>
                  {trackedData.registrationNumber && (
                    <p className="text-xs text-gray-400 font-mono mt-1">{trackedData.registrationNumber}</p>
                  )}
                  <div className="mt-3 inline-flex items-center gap-2 bg-primary-50 text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
                    {trackedData.currentStep ? (
                      <>
                        <Clock size={14} /> Step {trackedData.currentStep} of {steps.length}
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} /> All Steps Completed
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="space-y-0">
                  {steps.map((step, i) => {
                    const completed = isCompleted(step.id);
                    const current = isCurrent(step.id);
                    return (
                      <div key={step.id} className="flex gap-4 relative">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                            completed
                              ? 'bg-success text-white shadow-lg shadow-success/30'
                              : current
                              ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/20 animate-pulse'
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            {completed ? <CheckCircle size={20} /> : current ? <Clock size={18} /> : <span className="text-xs font-bold">{step.id}</span>}
                          </div>
                          {i < steps.length - 1 && (
                            <div className={`w-0.5 h-10 transition-all duration-300 ${
                              completed ? 'bg-success' : current ? 'bg-primary' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                        <div className={`pb-8 flex-1 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
                          <h4 className={`font-heading font-semibold text-sm transition-all duration-300 ${
                            completed ? 'text-success' : current ? 'text-primary' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </h4>
                          <p className={`text-xs mt-0.5 transition-all duration-300 ${
                            completed || current ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {step.desc}
                          </p>
                          {completed && (
                            <span className="inline-block mt-1.5 text-[10px] font-semibold bg-green-50 text-success px-2 py-0.5 rounded-full">
                              Completed
                            </span>
                          )}
                          {current && !completed && (
                            <span className="inline-block mt-1.5 text-[10px] font-semibold bg-primary-50 text-primary px-2 py-0.5 rounded-full animate-pulse">
                              In Progress
                            </span>
                          )}
                          {!completed && !current && (
                            <span className="inline-block mt-1.5 text-[10px] font-semibold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TrackJourneyPage;
