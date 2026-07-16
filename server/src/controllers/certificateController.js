const Student = require('../models/Student');

exports.getMyCertificate = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    if (!student || !student.certificate.type) return res.status(404).json({ message: 'No certificate found' });
    res.json(student.certificate);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.download = async (req, res) => { res.json({ message: 'Certificate PDF download' }); };

exports.verify = async (req, res) => {
  try {
    const student = await Student.findOne({ 'certificate.certificateNumber': req.params.certificateNumber });
    if (!student) return res.status(404).json({ message: 'Invalid certificate number' });
    res.json({ valid: true, studentName: student.fullName, certificateType: student.certificate.type, issuedAt: student.certificate.issuedAt });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.generate = async (req, res) => {
  try { res.json({ message: `Certificate generated for student ${req.params.studentId}` }); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.generateBulk = async (req, res) => {
  try { res.json({ message: `Bulk certificates for phase ${req.params.phaseId}` }); } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getTypes = async (req, res) => {
  res.json([
    { type: '1st_position', label: '1st Position Certificate', description: 'Awarded to the top rank student in each phase' },
    { type: 'top5', label: '2nd-5th Position Certificate', description: 'Awarded to position holders 2 through 5' },
    { type: 'shield', label: 'Shield Certificate', description: 'Awarded to position holders 6 through 10' },
    { type: 'top20', label: 'Top 20 Certificate', description: 'Awarded to top 20 performers' },
    { type: 'appreciation', label: 'Appreciation Certificate', description: 'For outstanding performance' },
    { type: 'participation', label: 'Participation Certificate', description: 'Awarded to all test participants' }
  ]);
};
