const Student = require('../models/Student');
const TestSession = require('../models/TestSession');
const TestResult = require('../models/TestResult');

exports.getStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const pendingPayments = await Student.countDocuments({ 'challan.paymentVerified': false, 'challan.isPaid': true }).catch(() => 0);
    const testsCompleted = await TestSession.countDocuments({ status: 'completed' }).catch(() => 0);
    const resultsPublished = await TestResult.countDocuments().catch(() => 0);
    const awardsAssigned = await Student.countDocuments({ 'award.type': { $ne: null } }).catch(() => 0);

    res.json({
      totalStudents, pendingPayments, testsCompleted, resultsPublished, awardsAssigned,
      registrationByProvince: [], registrationByPhase: [], dailyTrend: [], paymentStatus: { verified: 0, pending: 0, rejected: 0 }
    });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getRegistrationStats = async (req, res) => {
  try {
    const stats = await Student.aggregate([
      { $group: { _id: '$province', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const phaseStats = await Student.aggregate([
      { $group: { _id: '$phaseId', count: { $sum: 1 } } }
    ]);
    res.json({ byProvince: stats, byPhase: phaseStats });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getPaymentStats = async (req, res) => {
  try {
    const total = await Student.countDocuments({ 'challan.challanNumber': { $ne: null } });
    const paid = await Student.countDocuments({ 'challan.isPaid': true });
    const verified = await Student.countDocuments({ 'challan.paymentVerified': true });
    res.json({ totalChallans: total, paid, verified, pending: paid - verified });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getTestStats = async (req, res) => {
  try {
    const total = await TestSession.countDocuments();
    const completed = await TestSession.countDocuments({ status: 'completed' });
    const inProgress = await TestSession.countDocuments({ status: 'in_progress' });
    const disqualified = await TestSession.countDocuments({ status: 'disqualified' });
    res.json({ total, completed, inProgress, disqualified });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getPhaseStats = async (req, res) => {
  try {
    const stats = await Student.aggregate([
      { $group: { _id: '$phaseId', count: { $sum: 1 }, paid: { $sum: { $cond: ['$challan.paymentVerified', 1, 0] } }, tested: { $sum: { $cond: ['$test.attempted', 1, 0] } } } }
    ]);
    res.json(stats);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const recent = await Student.find().sort({ updatedAt: -1 }).limit(10).select('fullName registrationNumber status updatedAt phaseId');
    res.json(recent);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
