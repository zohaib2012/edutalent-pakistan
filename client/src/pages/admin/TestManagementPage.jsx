import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, X, Loader2 } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import api, { getPhases, getPhaseSubjects } from '../../services/api';

export default function TestManagementPage() {
  const [activeTab, setActiveTab] = useState('Questions');
  const [questions, setQuestions] = useState([]);
  const [phases, setPhases] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPhase, setFilterPhase] = useState('');

  const [form, setForm] = useState({
    question: '', optionA: '', optionB: '', optionC: '', optionD: '',
    correctAnswer: '', subject: '', phase: '', difficulty: 'Medium', timeLimit: '25',
  });

  const tabs = ['Questions', 'Settings'];

  useEffect(() => { fetchQuestions(); loadPhases(); }, []);

  const loadPhases = async () => {
    try {
      const res = await getPhases();
      setPhases(res.data?.data || []);
    } catch {
      setPhases([]);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/questions');
      setQuestions(res.data?.questions || []);
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePhaseChange = async (phaseId) => {
    setForm((prev) => ({ ...prev, phase: phaseId, subject: '' }));
    setSubjects([]);
    if (!phaseId) return;
    try {
      const res = await getPhaseSubjects(phaseId);
      setSubjects(res.data?.data || []);
    } catch {
      setSubjects([]);
    }
  };

  const handleSaveQ = async () => {
    if (!form.question.trim() || !form.correctAnswer) {
      alert('Please fill the question and select the correct answer');
      return;
    }
    if (!form.phase) { alert('Please select a phase'); return; }
    if (!form.subject) { alert('Please select a subject'); return; }
    const optionLabels = ['A', 'B', 'C', 'D'];
    if (optionLabels.some((l) => !form[`option${l}`].trim())) {
      alert('Please fill all four options');
      return;
    }
    try {
      await api.post('/questions', {
        phaseId: form.phase,
        subjectId: form.subject,
        questionText: form.question,
        options: optionLabels.map((label) => ({
          label, text: form[`option${label}`], isCorrect: form.correctAnswer === label,
        })),
        difficulty: form.difficulty.toLowerCase(),
        marks: 1,
        timeLimit: Number(form.timeLimit) || 25,
      });
      setShowAddModal(false);
      setForm({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '', subject: '', phase: '', difficulty: 'Medium', timeLimit: '25' });
      fetchQuestions();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save question');
    }
  };

  const handleDeleteQ = async (id) => {
    if (!confirm('Delete this question?')) return;
    try {
      await api.delete(`/questions/${id}`);
      fetchQuestions();
    } catch {
      alert('Delete failed');
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = (q.questionText || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhase = !filterPhase || (q.phaseId?._id || q.phaseId) === filterPhase;
    return matchesSearch && matchesPhase;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Test Management</h1>

          <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Questions' && (
            <>
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search questions..." value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]" />
                </div>
                <select value={filterPhase} onChange={(e) => setFilterPhase(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]">
                  <option value="">All Phases</option>
                  {phases.map((p) => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
                <button onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 bg-[#1A73E8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1557B0]">
                  <Plus size={16} /> Add Question
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="text-left px-5 py-3 font-medium">#</th>
                        <th className="text-left px-5 py-3 font-medium">Question</th>
                        <th className="text-left px-5 py-3 font-medium">Phase</th>
                        <th className="text-left px-5 py-3 font-medium">Subject</th>
                        <th className="text-left px-5 py-3 font-medium">Difficulty</th>
                        <th className="text-left px-5 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr><td colSpan={6} className="text-center py-10"><Loader2 size={24} className="animate-spin text-primary mx-auto" /></td></tr>
                      ) : filteredQuestions.length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-10 text-gray-400">No questions found.</td></tr>
                      ) : filteredQuestions.map((q, i) => (
                        <tr key={q._id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                          <td className="px-5 py-3 text-gray-900 max-w-md truncate">{q.questionText}</td>
                          <td className="px-5 py-3">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                              {q.phaseId?.name || 'Unknown'}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-gray-600">{q.subjectId?.name || q.subject || '-'}</td>
                          <td className="px-5 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              q.difficulty === 'easy' ? 'bg-green-50 text-green-700' :
                              q.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                            }`}>{(q.difficulty || 'medium')[0].toUpperCase() + (q.difficulty || 'medium').slice(1)}</span>
                          </td>
                          <td className="px-5 py-3">
                            <button onClick={() => handleDeleteQ(q._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'Settings' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500">Test settings can be managed through system configuration.</p>
            </div>
          )}

          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Add Question</h3>
                  <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={20} /></button>
                </div>
                <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phase <span className="text-red-500">*</span></label>
                      <select value={form.phase} onChange={(e) => handlePhaseChange(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white">
                        <option value="">Select Phase</option>
                        {phases.map((p) => (
                          <option key={p._id} value={p._id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        disabled={!form.phase}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white disabled:bg-gray-100 disabled:text-gray-400">
                        <option value="">{form.phase ? 'Select Subject' : 'Select Phase first'}</option>
                        {subjects.map((s) => (
                          <option key={s._id} value={s._id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question <span className="text-red-500">*</span></label>
                    <textarea rows={3} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })}
                      placeholder="Enter the question..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['A', 'B', 'C', 'D'].map((opt) => (
                      <div key={opt}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Option {opt} <span className="text-red-500">*</span></label>
                        <input type="text" value={form[`option${opt}`]} onChange={(e) => setForm({ ...form, [`option${opt}`]: e.target.value })}
                          placeholder={`Option ${opt}`} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer <span className="text-red-500">*</span></label>
                      <select value={form.correctAnswer} onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white">
                        <option value="">Select</option>
                        <option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                      <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white">
                        <option>Easy</option><option>Medium</option><option>Hard</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (sec)</label>
                      <input type="number" value={form.timeLimit} onChange={(e) => setForm({ ...form, timeLimit: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A73E8]" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
                  <button onClick={() => setShowAddModal(false)} className="px-4 py-2.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button onClick={handleSaveQ} className="bg-[#1A73E8] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1557B0]">Save Question</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
