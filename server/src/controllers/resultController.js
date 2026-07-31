const TestResult = require('../models/TestResult');
const Student = require('../models/Student');
const Phase = require('../models/Phase');

exports.getMyResult = async (req, res) => {
  try {
    const result = await TestResult.findOne({ studentId: req.studentId }).populate('sessionId');
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json(result);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getMeritList = async (req, res) => {
  try {
    const results = await TestResult.find({ phaseId: req.params.phaseId }).sort({ obtainedMarks: -1, totalTimeTaken: 1 }).populate('studentId', 'fullName city province').limit(50);
    const meritList = results.map((r, i) => ({ rank: i + 1, studentName: r.studentId?.fullName, rollNumber: r.rollNumber, score: r.obtainedMarks, percentage: r.percentage, awardCategory: r.awardCategory }));
    res.json(meritList);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getOverallMerit = async (req, res) => {
  try { const results = await TestResult.find().sort({ obtainedMarks: -1 }).populate('studentId', 'fullName').limit(20); res.json(results); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getAnalytics = async (req, res) => {
  try {
    const results = await TestResult.find({ phaseId: req.params.phaseId });
    const avg = results.length ? results.reduce((s, r) => s + r.percentage, 0) / results.length : 0;
    const max = results.length ? Math.max(...results.map(r => r.percentage)) : 0;
    res.json({ averageScore: Math.round(avg), highestScore: max, totalResults: results.length });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.generateResults = async (req, res) => {
  try {
    const phaseId = req.params.phaseId;
    const phase = await Phase.findById(phaseId);
    if (!phase) return res.status(404).json({ message: 'Phase not found' });

    const results = await TestResult.find({ phaseId }).sort({ obtainedMarks: -1, createdAt: 1 });
    if (results.length === 0) return res.status(400).json({ message: 'No results found for this phase' });

    const structure = phase.awardStructure || {};
    const certTop = structure.certificates?.topPositions || 20;
    const laptopPos = structure.laptop?.position ?? 1;
    const chromebookPos = structure.chromebook?.positions || [];
    const shieldPos = structure.shields?.positions || [];

    const allResults = await TestResult.find().sort({ obtainedMarks: -1, createdAt: 1 });
    const published = [];

    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      const rank = i + 1;
      const overallRank = allResults.findIndex((a) => a._id.equals(r._id)) + 1;

      let awardCategory = 'participation';
      if (rank === laptopPos) awardCategory = 'laptop';
      else if (chromebookPos.includes(rank)) awardCategory = 'chromebook';
      else if (shieldPos.includes(rank)) awardCategory = 'shield';
      else if (rank <= certTop) awardCategory = 'certificate';

      r.phaseRank = rank;
      r.overallRank = overallRank;
      r.isMeritQualified = rank <= certTop;
      r.awardCategory = awardCategory;
      r.publishedAt = new Date();
      await r.save();

      const student = await Student.findById(r.studentId);
      if (student) {
        student.status = 'result_published';
        student.test = {
          ...(student.test || {}),
          resultId: r._id,
          position: rank,
          phaseWisePosition: rank,
        };
        student.award = {
          type: awardCategory,
          title: awardCategory,
          issuedAt: new Date(),
          delivered: false,
        };
        await student.save();
      }

      published.push({ studentId: r.studentId, rollNumber: r.rollNumber, rank, overallRank, percentage: r.percentage, awardCategory });
    }

    res.json({ message: `Results published for ${published.length} students`, published });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAll = async (req, res) => {
  try { const results = await TestResult.find().populate('studentId', 'fullName').sort({ createdAt: -1 }); res.json(results); } catch (error) { res.status(500).json({ message: error.message }); }
};
exports.update = async (req, res) => {
  try { const result = await TestResult.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(result); } catch (error) { res.status(500).json({ message: error.message }); }
};
exports.getByStudentId = async (req, res) => {
  try { const result = await TestResult.findOne({ studentId: req.params.studentId }); res.json(result); } catch (error) { res.status(500).json({ message: error.message }); }
};
