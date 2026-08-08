import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Camera, Mic, Maximize2, CheckCircle, XCircle, AlertTriangle,
  SkipForward, Flag, Timer, Shield, Smartphone, Monitor,
  ChevronRight, LogOut, Loader2
} from 'lucide-react';
import { startTest, getQuestion, submitAnswer, submitTest, flagCheat } from '../../services/api';

const TOTAL_QUESTIONS = 100;
const PER_QUESTION_TIME = 25;
const MAX_VIOLATIONS = 3;

const TestPortalPage = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('pre-test');
  const [checks, setChecks] = useState({ camera: 'pending', mic: 'pending', fullscreen: 'pending' });
  const [agreed, setAgreed] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(PER_QUESTION_TIME);
  const [violations, setViolations] = useState(0);
  const [showViolationModal, setShowViolationModal] = useState(false);
  const [testTerminated, setTestTerminated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [flashing, setFlashing] = useState(false);
  const [result, setResult] = useState(null);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const fullscreenCheckRef = useRef(null);

  const answeredCount = Object.keys(answers).length;
  const skippedCount = currentQ + 1 - answeredCount;
  const remainingCount = (questions.length || TOTAL_QUESTIONS) - currentQ - 1;
  const progressPercent = ((currentQ + 1) / (questions.length || TOTAL_QUESTIONS)) * 100;

  const checkCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setChecks(prev => ({ ...prev, camera: 'success' }));
    } catch {
      setChecks(prev => ({ ...prev, camera: 'fail' }));
    }
  };

  const checkMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioRef.current) audioRef.current.srcObject = stream;
      streamRef.current = stream;
      setChecks(prev => ({ ...prev, mic: 'success' }));
    } catch {
      setChecks(prev => ({ ...prev, mic: 'fail' }));
    }
  };

  const checkFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setChecks(prev => ({ ...prev, fullscreen: 'success' }));
    } catch {
      setChecks(prev => ({ ...prev, fullscreen: 'fail' }));
    }
  };

  const handleViolation = useCallback(() => {
    setViolations(prev => {
      const v = prev + 1;
      flagCheat({ type: 'violation', details: 'Tab switch or screen leave detected' }).catch(() => {});
      if (v >= MAX_VIOLATIONS) {
        setTestTerminated(true);
        setPhase('terminated');
      } else {
        setShowViolationModal(true);
      }
      return v;
    });
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (phase === 'test' && !document.fullscreenElement) {
        handleViolation();
      }
    };
    const handleVisibility = () => {
      if (phase === 'test' && document.hidden) {
        handleViolation();
      }
    };
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'x')) {
        e.preventDefault();
        handleViolation();
      }
      if (e.key === 'Escape' && phase === 'test') {
        e.preventDefault();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase, handleViolation]);

  useEffect(() => {
    if (streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'test' || testTerminated || loadingQuestion) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setFlashing(true);
          setTimeout(() => setFlashing(false), 800);
          handleAutoAdvance();
          return PER_QUESTION_TIME;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, currentQ, testTerminated, loadingQuestion]);

  const startTestSession = async () => {
    try {
      setLoadingQuestion(true);
      const res = await startTest();
      const total = res.data?.totalQuestions || 0;
      await loadQuestion(0, total);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to start test');
      navigate('/profile');
    } finally {
      setLoadingQuestion(false);
    }
  };

  const loadQuestion = async (index, total) => {
    try {
      const res = await getQuestion(index);
      setQuestions(prev => {
        const arr = [...prev];
        arr[index] = {
          id: res.data.question.id,
          text: res.data.question.text,
          options: res.data.question.options.map(o => o.text),
          total: res.data.totalQuestions || total,
        };
        return arr;
      });
    } catch (err) {
      if (err.response?.status === 404) {
        finishTest();
      } else {
        alert(err.response?.data?.message || 'Failed to load question');
      }
    }
  };

  const handleAutoAdvance = () => {
    const total = questions.length || TOTAL_QUESTIONS;
    if (currentQ < total - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(PER_QUESTION_TIME);
    } else {
      finishTest();
    }
  };

  const handleSelectAnswer = (optIdx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optIdx);
    setAnswers(prev => ({ ...prev, [currentQ]: optIdx }));
    const q = questions[currentQ];
    if (q?.id) {
      const optionLabel = ['A', 'B', 'C', 'D'][optIdx];
      submitAnswer({ questionId: q.id, selectedOption: optionLabel, timeTaken: PER_QUESTION_TIME - timeLeft }).catch(() => {});
    }
    setTimeout(() => {
      const total = questions.length || TOTAL_QUESTIONS;
      if (currentQ < total - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(PER_QUESTION_TIME);
      } else {
        finishTest();
      }
    }, 400);
  };

  const handleSkip = () => {
    clearInterval(timerRef.current);
    handleAutoAdvance();
  };

  const finishTest = async () => {
    clearInterval(timerRef.current);
    setSubmitted(true);
    setPhase('post-test');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    try {
      const res = await submitTest();
      setResult(res.data || {});
    } catch {
      setResult(null);
    }
  };

  const handleSubmitEarly = () => {
    setSubmitting(true);
    setTimeout(() => finishTest(), 500);
  };

  const getCheckIcon = (status) => {
    if (status === 'success') return <CheckCircle size={20} className="text-success" />;
    if (status === 'fail') return <XCircle size={20} className="text-red-500" />;
    return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
  };

  const q = questions[currentQ];
  const correctCount = result?.correct ?? 0;
  const wrongCount = result?.wrong ?? 0;
  const unattemptedCount = result?.unattempted ?? 0;
  const totalQuestions = questions.length || TOTAL_QUESTIONS;

  if (testTerminated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Test Terminated</h1>
          <p className="text-sm text-gray-600 mb-6">
            Your test has been terminated due to multiple policy violations. Please contact support for further assistance.
          </p>
          <Link to="/profile" className="btn-primary">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  if (phase === 'pre-test') {
    const allPassed = checks.camera === 'success' && checks.mic === 'success' && checks.fullscreen === 'success';
    return (
      <div className="min-h-screen bg-gray-50 py-12 md:py-20">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Smartphone size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-primary-800">This test supports all devices including mobile phones and tablets. Ensure you have a stable internet connection.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            <div className="text-center mb-8">
              <Monitor size={40} className="text-primary mx-auto mb-3" />
              <h2 className="section-title text-center">System Check</h2>
              <p className="section-subtitle">Please complete all checks before starting the test</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <Camera size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Camera Access</p>
                    <p className="text-xs text-gray-500">Required for proctoring</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getCheckIcon(checks.camera)}
                  {checks.camera === 'pending' && (
                    <button onClick={checkCamera} className="btn-primary text-xs py-2 px-4">Check Camera</button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <Mic size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Microphone Access</p>
                    <p className="text-xs text-gray-500">Required for audio monitoring</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getCheckIcon(checks.mic)}
                  {checks.mic === 'pending' && (
                    <button onClick={checkMic} className="btn-primary text-xs py-2 px-4">Check Mic</button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <Maximize2 size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Fullscreen Mode</p>
                    <p className="text-xs text-gray-500">Must be enabled throughout the test</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getCheckIcon(checks.fullscreen)}
                  {checks.fullscreen === 'pending' && (
                    <button onClick={checkFullscreen} className="btn-primary text-xs py-2 px-4">Enter Fullscreen</button>
                  )}
                </div>
              </div>
            </div>

            {(checks.camera === 'success' || checks.mic === 'success') && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {checks.camera === 'success' && (
                  <video ref={videoRef} autoPlay muted playsInline className="w-full rounded-lg border border-green-200" />
                )}
                {checks.mic === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg flex items-center justify-center p-4">
                    <Mic size={24} className="text-success" />
                    <span className="text-sm text-success ml-2">Mic Active</span>
                  </div>
                )}
              </div>
            )}

            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer mb-6">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-5 h-5 accent-primary" />
              <span className="text-sm text-gray-700">I agree to Test Rules and Anti-Cheating Policy</span>
            </label>

            <button disabled={!allPassed || !agreed || loadingQuestion}
              onClick={async () => { setPhase('test'); setTimeLeft(PER_QUESTION_TIME); await startTestSession(); }}
              className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed">
              {loadingQuestion ? <><Loader2 size={18} className="animate-spin" /> Starting...</> : <>Start Test <ChevronRight size={18} /></>}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'post-test') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-success" />
          </div>
          <h2 className="section-title text-center">Test Submitted Successfully</h2>
          <p className="section-subtitle mb-8">Thank you for completing the test.</p>

          {result ? (
            <>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <p className="text-2xl font-heading font-bold text-success">{result.correct ?? 0}</p>
                  <p className="text-xs text-gray-500">Correct</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <p className="text-2xl font-heading font-bold text-red-500">{result.wrong ?? 0}</p>
                  <p className="text-xs text-gray-500">Wrong</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                  <p className="text-2xl font-heading font-bold text-gray-500">{result.unattempted ?? 0}</p>
                  <p className="text-xs text-gray-500">Unattempted</p>
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-4 mb-8 border border-primary-100">
                <p className="text-sm text-gray-500">Your Score</p>
                <p className="text-2xl font-heading font-bold text-primary">{result.score ?? 0} / {result.percentage !== undefined ? (result.percentage / 100 * (questions.length || 100)).toFixed(0) : (questions.length || 100)}</p>
                <p className="text-xs text-gray-500 mt-1">Percentage: {result.percentage ?? 0}%</p>
              </div>

              <p className="text-sm text-gray-500 mb-6">Your full result will be published soon</p>
            </>
          ) : (
            <p className="text-sm text-gray-500 mb-6">Your test has been submitted. Results will be published soon.</p>
          )}

          <Link to="/my-results" className="btn-primary w-full justify-center">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!q) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${flashing ? 'bg-red-50' : ''}`}>
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="EduTalent" className="h-8 w-auto" onError={(e) => { e.target.style.display = 'none'; }} />
            <span className="font-heading font-bold text-primary text-lg hidden sm:block">EduTalent Pakistan</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Question {currentQ + 1} of {totalQuestions}</span>

            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
              timeLeft <= 5 ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-primary'
            }`}>
              <Timer size={16} />
              {timeLeft}s
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-bold">
              <AlertTriangle size={16} />
              {violations}/{MAX_VIOLATIONS}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Question #{currentQ + 1}
            </span>
            <button onClick={handleSkip} className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
              <SkipForward size={16} /> Skip
            </button>
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">{q.text}</h3>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const letters = ['A', 'B', 'C', 'D'];
              const isSelected = selectedAnswer === idx;
              return (
                <button key={idx} onClick={() => handleSelectAnswer(idx)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                    isSelected
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-gray-200 bg-white hover:border-primary hover:bg-primary-5 text-gray-800'
                  } disabled:cursor-default`}>
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                  }`}>{letters[idx]}</span>
                  <span className="text-base md:text-lg font-medium">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">
                <span className="text-success font-bold">{answeredCount}</span> Answered
              </span>
              <span className="text-xs text-gray-500">
                <span className="text-yellow-500 font-bold">{skippedCount}</span> Skipped
              </span>
              <span className="text-xs text-gray-500">
                <span className="text-gray-400 font-bold">{remainingCount}</span> Remaining
              </span>
            </div>
            <button onClick={handleSubmitEarly} disabled={submitting}
              className="text-xs btn-primary py-2 px-4 disabled:opacity-40">
              {submitting ? 'Submitting...' : 'Submit Test'}
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary rounded-full h-2 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Camera size={14} className={checks.camera === 'success' ? 'text-success' : 'text-red-500'} />
            <span>{checks.camera === 'success' ? 'Camera OK' : 'Camera Off'}</span>
            <span className={`w-2 h-2 rounded-full ${checks.camera === 'success' ? 'bg-success' : 'bg-red-500'}`} />
          </div>
          <div className="flex items-center gap-1.5">
            <Mic size={14} className={checks.mic === 'success' ? 'text-success' : 'text-red-500'} />
            <span>{checks.mic === 'success' ? 'Mic OK' : 'Mic Off'}</span>
            <span className={`w-2 h-2 rounded-full ${checks.mic === 'success' ? 'bg-success' : 'bg-red-500'}`} />
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 size={14} className={checks.fullscreen === 'success' ? 'text-success' : 'text-red-500'} />
            <span>{checks.fullscreen === 'success' ? 'Fullscreen' : 'Not Fullscreen'}</span>
            <span className={`w-2 h-2 rounded-full ${checks.fullscreen === 'success' ? 'bg-success' : 'bg-red-500'}`} />
          </div>
        </div>
      </div>

      {checks.camera === 'success' && (
        <div className="fixed bottom-4 right-4 z-40 w-40 md:w-52 rounded-xl overflow-hidden shadow-2xl border-2 border-green-400 bg-black group">
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-black/60 rounded-full px-2 py-0.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-[10px] font-bold tracking-wider">REC</span>
          </div>
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-28 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-[10px] text-center">Camera is ON for proctoring</p>
          </div>
        </div>
      )}

      {showViolationModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-yellow-600" />
            </div>
            <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">Policy Violation Warning</h3>
            <p className="text-sm text-gray-600 mb-2">
              You have attempted to leave the test screen or use prohibited actions.
            </p>
            <p className="text-sm font-semibold text-red-500 mb-6">
              Warning {violations} of {MAX_VIOLATIONS}. Your test will be terminated after {MAX_VIOLATIONS} violations.
            </p>
            <button onClick={() => setShowViolationModal(false)}
              className="btn-primary w-full justify-center">
              I Understand, Continue Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPortalPage;
