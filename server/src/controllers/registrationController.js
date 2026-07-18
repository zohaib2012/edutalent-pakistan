const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const Phase = require('../models/Phase');

exports.create = async (req, res) => {
  try {
    const { fullName, fatherName, cnicOrBform, dateOfBirth, grade, schoolOrCollege, province, city, mobileNumber, email, address, photoUrl } = req.body;

    const existingStudent = await Student.findOne({ cnicOrBform });
    if (existingStudent) return res.status(400).json({ message: 'Student with this CNIC/B-Form already registered' });

    let gradeNum = parseInt(grade);
    if (isNaN(gradeNum)) gradeNum = 13;

    let phaseGrade = { min: 1, max: 5 };
    if (gradeNum >= 6 && gradeNum <= 8) phaseGrade = { min: 6, max: 8 };
    else if (gradeNum >= 9 && gradeNum <= 10) phaseGrade = { min: 9, max: 10 };
    else if (gradeNum >= 11) phaseGrade = { min: 11, max: 16 };

    const phase = await Phase.findOne({ 'gradeRange.min': phaseGrade.min, 'gradeRange.max': phaseGrade.max });
    if (!phase) return res.status(400).json({ message: 'Invalid grade - no matching phase found' });

    const count = await Student.countDocuments({ phaseId: phase._id });
    const registrationNumber = `ETP-${new Date().getFullYear()}-P${phase.slug?.split('-')[1] || 'X'}-${String(count + 1).padStart(4, '0')}`;

    const tempPassword = Math.random().toString(36).slice(-8) + '!A1';
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const challanNumber = `ETP-CH-${Date.now().toString().slice(-8)}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);

    const student = await Student.create({
      fullName, fatherName, cnicOrBform, dateOfBirth, grade: String(grade),
      phaseId: phase._id, schoolOrCollege, province, city, mobileNumber, email, address,
      photoUrl: photoUrl || '', registrationNumber, password: hashedPassword,
      status: 'challan_issued', registrationDate: new Date(),
      challan: {
        challanNumber, generatedAt: new Date(), dueDate, amount: phase.fee || 500,
        isPaid: false, paymentVerified: false
      }
    });

    res.status(201).json({
      message: 'Registration successful',
      student: {
        registrationNumber: student.registrationNumber,
        challanNumber: student.challan.challanNumber,
        amount: student.challan.amount,
        dueDate: student.challan.dueDate,
        tempPassword,
        phase: phase.name
      }
    });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Duplicate entry' });
    res.status(500).json({ message: error.message });
  }
};

exports.createAccount = async (req, res) => {
  try {
    const { fullName, fatherName, cnicOrBform, dateOfBirth, mobileNumber, email } = req.body;

    if (!fullName || !fatherName || !cnicOrBform || !dateOfBirth || !mobileNumber || !email) {
      return res.status(400).json({ message: 'Full name, father name, CNIC/B-Form, date of birth, mobile number, and email are required' });
    }

    const existingStudent = await Student.findOne({ cnicOrBform });
    if (existingStudent) return res.status(400).json({ message: 'Student with this CNIC/B-Form already registered' });

    let gradeNum = 13;
    const phaseGrade = { min: 11, max: 16 };
    const phase = await Phase.findOne({ 'gradeRange.min': phaseGrade.min, 'gradeRange.max': phaseGrade.max });
    if (!phase) return res.status(400).json({ message: 'No matching phase found' });

    const count = await Student.countDocuments({ phaseId: phase._id });
    const registrationNumber = `ETP-${new Date().getFullYear()}-P${phase.slug?.split('-')[1] || 'X'}-${String(count + 1).padStart(4, '0')}`;

    const tempPassword = Math.random().toString(36).slice(-8) + '!A1';
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const student = await Student.create({
      fullName, fatherName, cnicOrBform, dateOfBirth,
      grade: String(gradeNum), phaseId: phase._id,
      schoolOrCollege: '', province: 'Islamabad', city: '', mobileNumber,
      email, address: '',
      registrationNumber, password: hashedPassword,
      status: 'registered', registrationDate: new Date()
    });

    res.status(201).json({
      message: 'Account created successfully',
      student: {
        id: student._id,
        registrationNumber: student.registrationNumber,
        tempPassword,
        fullName: student.fullName
      }
    });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Duplicate entry' });
    res.status(500).json({ message: error.message });
  }
};

exports.submitApplication = async (req, res) => {
  try {
    const studentId = req.studentId || req.params.id;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const {
      grade, gender, district, schoolOrCollege, institutionName,
      province, city, address, whatsappNumber, fatherMobile,
      facebook, instagram, tiktok,
      lastQualification, totalMarks, obtainedMarks, currentQualification,
      documents
    } = req.body;

    if (!grade || !province || !city || !address) {
      return res.status(400).json({ message: 'Grade, province, city, and address are required' });
    }

    let gradeNum = parseInt(grade);
    if (isNaN(gradeNum)) gradeNum = 13;

    let phaseGrade = { min: 1, max: 5 };
    if (gradeNum >= 6 && gradeNum <= 8) phaseGrade = { min: 6, max: 8 };
    else if (gradeNum >= 9 && gradeNum <= 10) phaseGrade = { min: 9, max: 10 };
    else if (gradeNum >= 11) phaseGrade = { min: 11, max: 16 };

    const phase = await Phase.findOne({ 'gradeRange.min': phaseGrade.min, 'gradeRange.max': phaseGrade.max });
    if (!phase) return res.status(400).json({ message: 'Invalid grade - no matching phase found' });

    student.grade = String(gradeNum);
    student.phaseId = phase._id;
    student.gender = gender || student.gender;
    student.district = district || student.district;
    student.schoolOrCollege = schoolOrCollege || student.schoolOrCollege;
    student.institutionName = institutionName || student.institutionName;
    student.province = province;
    student.city = city;
    student.address = address;
    student.whatsappNumber = whatsappNumber || student.whatsappNumber;
    student.fatherMobile = fatherMobile || student.fatherMobile;
    student.facebook = facebook || student.facebook;
    student.instagram = instagram || student.instagram;
    student.tiktok = tiktok || student.tiktok;
    student.lastQualification = lastQualification || student.lastQualification;
    student.totalMarks = totalMarks !== undefined ? totalMarks : student.totalMarks;
    student.obtainedMarks = obtainedMarks !== undefined ? obtainedMarks : student.obtainedMarks;
    student.currentQualification = currentQualification || student.currentQualification;
    if (documents) student.documents = { ...student.documents, ...documents };

    const challanNumber = `ETP-CH-${Date.now()}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);

    student.status = 'challan_issued';
    student.challan = {
      challanNumber,
      generatedAt: new Date(),
      dueDate,
      amount: 1200,
      isPaid: false,
      paymentVerified: false
    };

    await student.save();

    res.status(200).json({
      message: 'Application submitted successfully',
      challan: {
        challanNumber: student.challan.challanNumber,
        amount: student.challan.amount,
        dueDate: student.challan.dueDate,
        phase: phase.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationForm = async (req, res) => {
  try {
    const studentId = req.studentId || req.params.id;
    const student = await Student.findById(studentId).populate('phaseId');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const formData = {
      id: student._id,
      registrationNumber: student.registrationNumber,
      fullName: student.fullName,
      fatherName: student.fatherName,
      cnicOrBform: student.cnicOrBform,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      grade: student.grade,
      phase: student.phaseId ? { id: student.phaseId._id, name: student.phaseId.name, slug: student.phaseId.slug } : null,
      schoolOrCollege: student.schoolOrCollege,
      institutionName: student.institutionName,
      province: student.province,
      district: student.district,
      city: student.city,
      mobileNumber: student.mobileNumber,
      whatsappNumber: student.whatsappNumber,
      fatherMobile: student.fatherMobile,
      email: student.email,
      address: student.address,
      facebook: student.facebook,
      instagram: student.instagram,
      tiktok: student.tiktok,
      lastQualification: student.lastQualification,
      totalMarks: student.totalMarks,
      obtainedMarks: student.obtainedMarks,
      currentQualification: student.currentQualification,
      documents: student.documents,
      photoUrl: student.photoUrl,
      status: student.status,
      challan: student.challan,
      registrationDate: student.registrationDate
    };

    res.json(formData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkCNIC = async (req, res) => {
  try {
    const student = await Student.findOne({ cnicOrBform: req.params.cnic });
    res.json({ exists: !!student });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('phaseId');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.update = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
