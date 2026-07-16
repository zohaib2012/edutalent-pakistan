import { useState } from 'react';
import {
  Plus, Upload, Edit, Trash2, Search, Filter, Eye, X, ShieldAlert, Clock
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const questionsData = [
  { id: 1, text: 'What is the capital of Pakistan?', subject: 'General Knowledge', difficulty: 'Easy', phase: 'Phase 1' },
  { id: 2, text: 'Solve: 2x + 5 = 15. Find the value of x.', subject: 'Mathematics', difficulty: 'Medium', phase: 'Phase 1' },
  { id: 3, text: 'What is the chemical formula of water?', subject: 'Science', difficulty: 'Easy', phase: 'Phase 2' },
  { id: 4, text: 'Who wrote the national anthem of Pakistan?', subject: 'General Knowledge', difficulty: 'Medium', phase: 'Phase 2' },
  { id: 5, text: 'Explain the concept of supply and demand in economics.', subject: 'Economics', difficulty: 'Hard', phase: 'Phase 3' },
];

const sessionsData = [
  { id: 1, name: 'Ahmed Khan', rollNo: 'ST-1001', phase: 'Phase 1', startedAt: '2026-07-11 09:00 AM', duration: '45:00' },
  { id: 2, name: 'Fatima Ali', rollNo: 'ST-1002', phase: 'Phase 1', startedAt: '2026-07-11 09:05 AM', duration: '32:15' },
  { id: 3, name: 'Usman Raza', rollNo: 'ST-1003', phase: 'Phase 2', startedAt: '2026-07-11 10:00 AM', duration: '12:30' },
];

const antiCheatLogs = [
  { time: '09:12:04', event: 'Tab switch detected', severity: 'Warning' },
  { time: '09:15:22', event: 'Right-click detected', severity: 'Warning' },
  { time: '09:18:47', event: 'Multiple tab switch', severity: 'Critical' },
];

const tabs = ['Questions', 'Sessions', 'Settings'];

export default function TestManagementPage() {
  const [activeTab, setActiveTab] = useState('Questions');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [form, setForm] = useState({
    question: '',
    optionA: '', optionB: '', optionC: '', optionD: '',
    correctAnswer: '',
    subject: '', phase: 'Phase 1', difficulty: 'Medium', timeLimit: '60',
  });

  const [settings, setSettings] = useState({
    phase1Time: '60', phase2Time: '60', phase3Time: '60', phase4Time: '60',
    maxQuestions: '50',
    defaultTimePerQuestion: '60',
    maxCheatViolations: '3',
  });

  const filteredQuestions = questionsData.filter(
    (q) =>
      q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddQuestion = () => {
    setShowAddModal(false);
    setForm({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '', subject: '', phase: 'Phase 1', difficulty: 'Medium', timeLimit: '60' });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Test Management</h1>
            {activeTab === 'Questions' && (
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  <Upload size={16} />
                  Bulk Import CSV
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors"
                >
                  <Plus size={18} />
                  Add Question
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Questions' && (
            <>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-xs">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1A73E8] outline-none"
                  />
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                  <option>All Phases</option>
                  <option>Phase 1</option>
                  <option>Phase 2</option>
                  <option>Phase 3</option>
                  <option>Phase 4</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                  <option>All Subjects</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>General Knowledge</option>
                  <option>Economics</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                  <option>All Difficulties</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-5 py-3 font-medium">#</th>
                      <th className="text-left px-5 py-3 font-medium">Question</th>
                      <th className="text-left px-5 py-3 font-medium">Subject</th>
                      <th className="text-left px-5 py-3 font-medium">Difficulty</th>
                      <th className="text-left px-5 py-3 font-medium">Phase</th>
                      <th className="text-left px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions.map((q, i) => (
                      <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                        <td className="px-5 py-3 text-gray-800 max-w-xs truncate">{q.text}</td>
                        <td className="px-5 py-3 text-gray-600">{q.subject}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            q.difficulty === 'Easy' ? 'bg-green-50 text-green-700' :
                            q.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-red-50 text-red-700'
                          }`}>
                            {q.difficulty}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-600">{q.phase}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors"><Edit size={15} /></button>
                            <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'Sessions' && (
            <>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="text-left px-5 py-3 font-medium">Student Name</th>
                      <th className="text-left px-5 py-3 font-medium">Roll No</th>
                      <th className="text-left px-5 py-3 font-medium">Phase</th>
                      <th className="text-left px-5 py-3 font-medium">Started At</th>
                      <th className="text-left px-5 py-3 font-medium">Duration</th>
                      <th className="text-left px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessionsData.map((s) => (
                      <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-3 font-medium text-gray-900">{s.name}</td>
                        <td className="px-5 py-3 font-mono text-xs text-gray-600">{s.rollNo}</td>
                        <td className="px-5 py-3 text-gray-600">{s.phase}</td>
                        <td className="px-5 py-3 text-gray-600">{s.startedAt}</td>
                        <td className="px-5 py-3 text-gray-600">{s.duration}</td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => setShowSessionModal(s)}
                            className="flex items-center gap-1 text-[#1A73E8] hover:underline text-xs"
                          >
                            <Eye size={14} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'Settings' && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Timings Per Phase</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'].map((p) => (
                    <div key={p}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{p} (minutes)</label>
                      <input
                        type="number"
                        value={settings[`phase${p.split(' ')[1]}Time`]}
                        onChange={(e) => setSettings({ ...settings, [`phase${p.split(' ')[1]}Time`]: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
                      />
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Questions Per Test</label>
                    <input
                      type="number"
                      value={settings.maxQuestions}
                      onChange={(e) => setSettings({ ...settings, maxQuestions: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Time Per Question (seconds)</label>
                    <input
                      type="number"
                      value={settings.defaultTimePerQuestion}
                      onChange={(e) => setSettings({ ...settings, defaultTimePerQuestion: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Cheat Violations Before Disqualification</label>
                    <input
                      type="number"
                      value={settings.maxCheatViolations}
                      onChange={(e) => setSettings({ ...settings, maxCheatViolations: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
                    />
                  </div>
                </div>

                <button className="mt-6 bg-[#1A73E8] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0] transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {showAddModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Add Question</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                    <textarea
                      value={form.question}
                      onChange={(e) => setForm({ ...form, question: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
                      placeholder="Enter the question..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['A', 'B', 'C', 'D'].map((opt) => (
                      <div key={opt}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Option {opt}</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={form[`option${opt}`]}
                            onChange={(e) => setForm({ ...form, [`option${opt}`]: e.target.value })}
                            placeholder={`Option ${opt}`}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
                          />
                          <input
                            type="radio"
                            name="correct"
                            value={opt}
                            checked={form.correctAnswer === opt}
                            onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
                            className="text-[#1A73E8] focus:ring-[#1A73E8]"
                            title="Mark as correct"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                        <option value="">Select Subject</option>
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>General Knowledge</option>
                        <option>Economics</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                      <select value={form.phase} onChange={(e) => setForm({ ...form, phase: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                        <option>Phase 1</option>
                        <option>Phase 2</option>
                        <option>Phase 3</option>
                        <option>Phase 4</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                      <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (seconds)</label>
                      <input
                        type="number"
                        value={form.timeLimit}
                        onChange={(e) => setForm({ ...form, timeLimit: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
                  <button onClick={handleAddQuestion} className="px-6 py-2 bg-[#1A73E8] text-white text-sm rounded-lg hover:bg-[#1557B0] transition-colors">Add Question</button>
                </div>
              </div>
            </div>
          )}

          {showSessionModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Session: {showSessionModal.name}</h3>
                  <button onClick={() => setShowSessionModal(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Roll No: <span className="font-medium text-gray-900">{showSessionModal.rollNo}</span></p>
                  <p className="text-sm text-gray-600">Phase: <span className="font-medium text-gray-900">{showSessionModal.phase}</span></p>
                  <p className="text-sm text-gray-600">Started: <span className="font-medium text-gray-900">{showSessionModal.startedAt}</span></p>
                  <p className="text-sm text-gray-600">Duration: <span className="font-medium text-gray-900">{showSessionModal.duration}</span></p>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Current Question Preview</h4>
                  <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                    What is the capital of Pakistan?
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <ShieldAlert size={16} className="text-red-500" />
                    Anti-Cheat Logs
                  </h4>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-red-50 text-gray-500 uppercase tracking-wider">
                        <th className="text-left px-3 py-2 font-medium">Time</th>
                        <th className="text-left px-3 py-2 font-medium">Event</th>
                        <th className="text-left px-3 py-2 font-medium">Severity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {antiCheatLogs.map((log, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="px-3 py-2 font-mono">{log.time}</td>
                          <td className="px-3 py-2">{log.event}</td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              log.severity === 'Critical' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                            }`}>
                              {log.severity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                  <X size={16} />
                  Terminate Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
