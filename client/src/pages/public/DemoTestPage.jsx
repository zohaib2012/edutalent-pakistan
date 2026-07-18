import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, RefreshCw, ArrowLeft, Monitor } from 'lucide-react';

const demoQuestions = [
  { id: 1, question: "What is the capital of Pakistan?", options: ["Karachi", "Lahore", "Islamabad", "Peshawar"], correct: 2 },
  { id: 2, question: "What is 5 + 3?", options: ["5", "8", "10", "15"], correct: 1 },
  { id: 3, question: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], correct: 2 },
  { id: 4, question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], correct: 0 },
  { id: 5, question: "Who wrote the national anthem of Pakistan?", options: ["Allama Iqbal", "Hafeez Jallandhari", "Ahmed Ghazali", "Faiz Ahmed Faiz"], correct: 1 },
];

const DemoTestPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = demoQuestions[currentQ];
  const totalQuestions = demoQuestions.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelect = (optIdx) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    setAnswers(prev => ({ ...prev, [currentQ]: optIdx }));
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers({});
    setSelectedOption(null);
    setShowResult(false);
    setFinished(false);
  };

  const correctCount = Object.entries(answers).filter(([idx, ans]) => demoQuestions[Number(idx)].correct === ans).length;
  const wrongCount = answeredCount - correctCount;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-primary" />
          </div>
          <h2 className="section-title text-center mb-2">Demo Test Complete</h2>
          <p className="section-subtitle mb-6">Here's how you performed</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-2xl font-heading font-bold text-success">{correctCount}</p>
              <p className="text-xs text-gray-500">Correct</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-2xl font-heading font-bold text-red-500">{wrongCount}</p>
              <p className="text-xs text-gray-500">Wrong</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
              <p className="text-2xl font-heading font-bold text-gray-500">{totalQuestions - answeredCount}</p>
              <p className="text-xs text-gray-500">Skipped</p>
            </div>
          </div>

          <div className="bg-primary-50 rounded-xl p-5 mb-6 border border-primary-100">
            <p className="text-sm text-gray-500 mb-1">Your Score</p>
            <p className="text-3xl font-heading font-bold text-primary">{correctCount} / {totalQuestions}</p>
            <div className="w-full bg-white rounded-full h-2.5 mt-3">
              <div className="bg-primary rounded-full h-2.5 transition-all duration-500" style={{ width: `${percentage}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">{percentage}% Accuracy</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-800 font-medium">This is a demo test. The real test has 100 MCQs with 20-30 seconds per question.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleRestart} className="btn-outline flex-1 justify-center">
              <RefreshCw size={16} /> Try Again
            </button>
            <Link to="/test-rules" className="btn-primary flex-1 justify-center">
              <ArrowLeft size={16} /> Back to Rules
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="EduTalent" className="h-8 w-auto" onError={(e) => { e.target.style.display = 'none'; }} />
            <span className="font-heading font-bold text-primary text-lg hidden sm:block">Demo Test</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Question {currentQ + 1} of {totalQuestions}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <Monitor size={14} className="text-primary" />
          <span>Demo Test — supports all devices (mobile, tablet, laptop, desktop)</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Question #{q.id}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const letters = ['A', 'B', 'C', 'D'];
              const isSelected = selectedOption === idx;
              const isCorrect = showResult && q.correct === idx;
              const isWrong = showResult && isSelected && q.correct !== idx;
              return (
                <button key={idx} onClick={() => handleSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                    isCorrect
                      ? 'border-success bg-green-50 text-success'
                      : isWrong
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : isSelected
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-gray-200 bg-white hover:border-primary hover:bg-primary-5 text-gray-800'
                  } disabled:cursor-default`}>
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    isCorrect ? 'bg-success text-white' : isWrong ? 'bg-red-500 text-white' : isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                  }`}>{letters[idx]}</span>
                  <span className="text-base md:text-lg font-medium flex-1">{opt}</span>
                  {isCorrect && <CheckCircle size={20} className="text-success flex-shrink-0" />}
                  {isWrong && <XCircle size={20} className="text-red-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                {selectedOption === q.correct ? (
                  <p className="text-sm font-semibold text-success flex items-center gap-2"><CheckCircle size={16} /> Correct!</p>
                ) : (
                  <p className="text-sm font-semibold text-red-500 flex items-center gap-2"><XCircle size={16} /> Incorrect. The correct answer is: <span className="font-bold text-gray-800">{q.options[q.correct]}</span></p>
                )}
              </div>
              <button onClick={handleNext} className="btn-primary text-sm py-2.5 px-6 w-full sm:w-auto justify-center">
                {currentQ < totalQuestions - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-700 text-center">This is a demo test. The real test has 100 MCQs with 20-30 seconds per question.</p>
        </div>

        <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              <span className="text-success font-bold">{answeredCount}</span> Answered of {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-primary rounded-full h-2 transition-all duration-300" style={{ width: `${((currentQ + (showResult ? 1 : 0)) / totalQuestions) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoTestPage;
