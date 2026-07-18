const Student = require('../models/Student');

exports.generate = async (req, res) => {
  try {
    const studentId = req.studentId || req.body.studentId;
    const student = await Student.findById(studentId).populate('phaseId');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (student.challan && student.challan.challanNumber) {
      return res.status(400).json({ message: 'Challan already generated for this student', challan: student.challan });
    }

    const challanNumber = `ETP-CH-${Date.now()}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);

    const bankDetails = {
      bankName: 'HBL (Habib Bank Limited)',
      accountTitle: 'EduTalent Pakistan',
      accountNumber: '1234-5678-9012-3456',
      branchCode: 'HBL-1234',
      alternativeBanks: [
        { name: 'UBL (United Bank Limited)', accountNumber: '5678-1234-5678-1234' },
        { name: 'Allied Bank Limited', accountNumber: '9012-3456-7890-1234' }
      ]
    };

    const paymentMethods = ['OneBill', 'Bank Deposit (HBL/UBL/Allied)', 'JazzCash', 'Easypaisa'];

    student.challan = {
      challanNumber,
      generatedAt: new Date(),
      dueDate,
      amount: 1200,
      isPaid: false,
      paymentVerified: false,
      bankDetails,
      paymentMethods
    };
    student.status = 'challan_issued';
    await student.save();

    res.status(201).json({
      message: 'Challan generated successfully',
      challan: {
        challanNumber: student.challan.challanNumber,
        amount: student.challan.amount,
        dueDate: student.challan.dueDate,
        generatedAt: student.challan.generatedAt,
        student: {
          fullName: student.fullName,
          fatherName: student.fatherName,
          registrationNumber: student.registrationNumber,
          phase: student.phaseId ? student.phaseId.name : null,
          cnicOrBform: student.cnicOrBform
        },
        bankDetails: student.challan.bankDetails,
        paymentMethods: student.challan.paymentMethods
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByNumber = async (req, res) => {
  try {
    const { challanNumber } = req.params;
    const student = await Student.findOne({ 'challan.challanNumber': challanNumber }).populate('phaseId');
    if (!student) return res.status(404).json({ message: 'Challan not found' });

    res.json({
      challan: {
        challanNumber: student.challan.challanNumber,
        amount: student.challan.amount,
        dueDate: student.challan.dueDate,
        generatedAt: student.challan.generatedAt,
        isPaid: student.challan.isPaid,
        paymentVerified: student.challan.paymentVerified,
        paymentVerifiedAt: student.challan.paymentVerifiedAt,
        paidChallanImageUrl: student.challan.paidChallanImageUrl,
        bankDetails: student.challan.bankDetails,
        paymentMethods: student.challan.paymentMethods
      },
      student: {
        fullName: student.fullName,
        fatherName: student.fatherName,
        registrationNumber: student.registrationNumber,
        cnicOrBform: student.cnicOrBform,
        phase: student.phaseId ? student.phaseId.name : null,
        grade: student.grade
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.download = async (req, res) => {
  try {
    const { challanNumber } = req.params;
    const student = await Student.findOne({ 'challan.challanNumber': challanNumber }).populate('phaseId');
    if (!student) return res.status(404).json({ message: 'Challan not found' });

    const challanData = {
      challan: {
        challanNumber: student.challan.challanNumber,
        generatedAt: student.challan.generatedAt,
        dueDate: student.challan.dueDate,
        amount: student.challan.amount,
        amountInWords: 'One Thousand Two Hundred Rupees Only'
      },
      student: {
        fullName: student.fullName,
        fatherName: student.fatherName,
        registrationNumber: student.registrationNumber,
        cnicOrBform: student.cnicOrBform,
        phase: student.phaseId ? student.phaseId.name : null,
        grade: student.grade,
        address: student.address,
        mobileNumber: student.mobileNumber,
        email: student.email
      },
      paymentInfo: {
        bankDetails: student.challan.bankDetails,
        paymentMethods: student.challan.paymentMethods
      },
      organization: {
        name: 'EduTalent Pakistan',
        address: 'Government College University, Lahore',
        helpLine: '0800-EDUTALENT'
      }
    };

    res.json(challanData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
