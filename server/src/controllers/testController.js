const TestSession = require('../models/TestSession');
const Question = require('../models/Question');
const Student = require('../models/Student');

exports.getInstructions = async (req, res) => {
  res.json({ instructions: 'Read all instructions carefully. You have 100 MCQs with 25 seconds each. Camera and mic must be ON.' });
};

exports.issueTest = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    student.test.issued = true;
    student.test.issuedAt = new Date();
    if (student.status === 'slip_issued') {
      student.status = 'test_issued';
    }
    await student.save();
    res.json({ message: `Test issued to ${student.fullName}`, student: { id: student._id, name: student.fullName, status: student.status, testIssued: true } });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.revokeTest = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    student.test.issued = false;
    student.test.issuedAt = null;
    await student.save();
    res.json({ message: `Test access revoked for ${student.fullName}` });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.startTest = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    if (!student || !student.rollNoSlip.rollNumber) return res.status(400).json({ message: 'No roll number slip found' });
    if (!student.test.issued) return res.status(403).json({ message: 'Test has not been issued to you yet. Please contact the administration.' });
    const existingSession = await TestSession.findOne({ studentId: req.studentId, status: { $in: ['completed', 'disqualified', 'in_progress'] } });
    if (existingSession && existingSession.status === 'in_progress') {
      return res.json({ session: existingSession, message: 'Resuming test' });
    }
    if (existingSession && (existingSession.status === 'completed' || existingSession.status === 'disqualified')) {
      const attempted = existingSession.attemptedQuestions || 0;
      const total = existingSession.totalQuestions || 0;
      if (attempted >= total && total > 0) {
        return res.status(400).json({ message: 'Test already attempted' });
      }
      await TestSession.findByIdAndDelete(existingSession._id);
      const TestResult = require('../models/TestResult');
      await TestResult.deleteMany({ studentId: req.studentId });
      student.test = { attempted: false };
      student.status = 'slip_issued';
      await student.save();
    }
    const questions = await Question.find({ phaseId: student.phaseId, isActive: true }).limit(100);
    const session = await TestSession.create({
      studentId: req.studentId, phaseId: student.phaseId, rollNumber: student.rollNoSlip.rollNumber,
      status: 'in_progress', startedAt: new Date(), totalQuestions: questions.length
    });
    res.json({ session, totalQuestions: questions.length });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getQuestion = async (req, res) => {
  try {
    const session = await TestSession.findOne({ studentId: req.studentId, status: 'in_progress' });
    if (!session) return res.status(404).json({ message: 'No active session' });
    const student = await Student.findById(req.studentId);
    const questions = await Question.find({ phaseId: student.phaseId, isActive: true }).limit(100);
    const index = parseInt(req.params.questionIndex);
    if (index < 0 || index >= questions.length) return res.status(400).json({ message: 'Invalid question index' });
    const q = questions[index];
    res.json({ questionIndex: index, totalQuestions: questions.length, question: { id: q._id, text: q.questionText, questionImageUrl: q.questionImageUrl || null, options: q.options.map(o => ({ label: o.label, text: o.text })), timeLimit: q.timeLimit } });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { questionId, selectedOption, timeTaken } = req.body;
    const session = await TestSession.findOne({ studentId: req.studentId, status: 'in_progress' });
    if (!session) return res.status(404).json({ message: 'No active session' });
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    const correctOption = question.options.find(o => o.isCorrect);
    const isCorrect = selectedOption === correctOption?.label;
    session.questions.push({ questionId, selectedOption, isCorrect, timeTaken: timeTaken || 0, answeredAt: new Date() });
    session.attemptedQuestions = session.questions.length;
    session.correctAnswers = session.questions.filter(q => q.isCorrect).length;
    session.score = session.correctAnswers;
    await session.save();
    res.json({ saved: true });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.flagCheat = async (req, res) => {
  try {
    const { type, details } = req.body;
    const session = await TestSession.findOne({ studentId: req.studentId, status: 'in_progress' });
    if (!session) return res.json({ violations: 0, disqualified: false });
    session.antiCheatLogs.push({ type: type || 'violation', details: details || '', timestamp: new Date() });
    if (session.antiCheatLogs.length >= 3) {
      session.status = 'disqualified';
      session.disqualificationReason = 'Too many violations';
    }
    await session.save();
    res.json({ violations: session.antiCheatLogs.length, disqualified: session.status === 'disqualified' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.submitTest = async (req, res) => {
  try {
    const session = await TestSession.findOne({ studentId: req.studentId, status: 'in_progress' });
    if (!session) return res.status(404).json({ message: 'No active session' });
    session.status = 'completed';
    session.completedAt = new Date();
    session.wrongAnswers = session.attemptedQuestions - session.correctAnswers;
    session.percentage = session.totalQuestions > 0 ? Math.round((session.score / session.totalQuestions) * 100) : 0;
    session.totalTimeTaken = session.questions.reduce((sum, q) => sum + (q.timeTaken || 0), 0);
    await session.save();

    const student = await Student.findById(req.studentId);
    student.test = { attempted: true, sessionId: session._id, score: session.score, percentage: session.percentage };
    student.status = 'test_completed';
    await student.save();

    const TestResult = require('../models/TestResult');
    await TestResult.create({
      studentId: req.studentId, sessionId: session._id, phaseId: session.phaseId, rollNumber: session.rollNumber,
      totalMarks: session.totalQuestions, obtainedMarks: session.score, percentage: session.percentage,
      totalTimeTaken: session.totalTimeTaken
    });

    res.json({ message: 'Test submitted', score: session.score, percentage: session.percentage, correct: session.correctAnswers, wrong: session.wrongAnswers, unattempted: session.totalQuestions - session.attemptedQuestions });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getSession = async (req, res) => {
  try {
    const session = await TestSession.findOne({ studentId: req.studentId, status: 'in_progress' });
    res.json(session || null);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getTimeRemaining = async (req, res) => {
  res.json({ timeRemaining: 1500 });
};
