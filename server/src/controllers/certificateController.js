const Student = require('../models/Student');

exports.getMyCertificate = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    if (!student || !student.certificate?.type) return res.status(404).json({ message: 'No certificate found' });
    res.json(student.certificate);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getMyCertificates = async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    if (!student || !student.certificate?.type) {
      return res.status(404).json({ message: 'No certificate found' });
    }
    const cert = student.certificate;
    res.json([{
      _id: student._id,
      type: cert.type,
      certificateNumber: cert.certificateNumber,
      issuedAt: cert.issuedAt,
      fileUrl: cert.fileUrl || cert.pdfUrl || null,
      studentName: student.fullName,
      registrationNumber: student.registrationNumber,
      cnicOrBform: student.cnicOrBform,
    }]);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.download = async (req, res) => { res.json({ message: 'Certificate PDF download' }); };

exports.upload = async (req, res) => {
  try {
    const { registrationNumber, cnic, certificateType, certificateNumber } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Certificate file is required' });
    if (!registrationNumber && !cnic) {
      return res.status(400).json({ message: 'Provide student registration number or CNIC/B-Form' });
    }
    const filter = {};
    if (registrationNumber) filter.registrationNumber = registrationNumber.trim();
    if (cnic) filter.cnicOrBform = cnic.trim();
    const student = await Student.findOne(filter);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.certificate = {
      type: certificateType || student.certificate?.type || 'participation',
      certificateNumber: certificateNumber || student.certificate?.certificateNumber || `ETP-CERT-${Date.now()}`,
      issuedAt: new Date(),
      fileUrl: req.file.path,
      fileType: req.file.mimetype || 'image',
      pdfUrl: req.file.path,
    };
    await student.save();
    res.json({ message: 'Certificate uploaded successfully', student: { id: student._id, name: student.fullName, registrationNumber: student.registrationNumber }, certificate: student.certificate });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.search = async (req, res) => {
  try {
    const { registrationNumber, cnic, certificateNumber } = req.query;
    const filter = {};
    if (certificateNumber) filter['certificate.certificateNumber'] = certificateNumber.trim();
    else if (registrationNumber) filter.registrationNumber = registrationNumber.trim();
    else if (cnic) filter.cnicOrBform = cnic.trim();
    else return res.status(400).json({ message: 'Provide certificate number, registration number or CNIC/B-Form' });

    const student = await Student.findOne(filter);
    if (!student || !student.certificate?.fileUrl) {
      return res.status(404).json({ message: 'No certificate found for the provided details.' });
    }
    res.json({
      valid: true,
      studentName: student.fullName,
      fatherName: student.fatherName,
      registrationNumber: student.registrationNumber,
      certificateType: student.certificate.type,
      certificateNumber: student.certificate.certificateNumber,
      issuedAt: student.certificate.issuedAt,
      fileUrl: student.certificate.fileUrl || student.certificate.pdfUrl,
    });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

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
