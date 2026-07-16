require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Phase = require('./models/Phase');
const Subject = require('./models/Subject');
const Admin = require('./models/Admin');
const FAQ = require('./models/FAQ');
const Announcement = require('./models/Announcement');
const Syllabus = require('./models/Syllabus');
const Student = require('./models/Student');

const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/edutalent-pakistan';
    await mongoose.connect(uri);
    console.log('MongoDB connected for seeding');

    await Promise.all([
      Phase.deleteMany({}),
      Subject.deleteMany({}),
      Admin.deleteMany({}),
      FAQ.deleteMany({}),
      Announcement.deleteMany({}),
      Syllabus.deleteMany({}),
      Student.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // ── Subjects ──────────────────────────────────────────────────────
    const subjectData = [
      { name: 'English', slug: 'english' },
      { name: 'Mathematics', slug: 'mathematics' },
      { name: 'Science', slug: 'science' },
      { name: 'Social Studies', slug: 'social-studies' },
      { name: 'Islamic Studies', slug: 'islamic-studies' },
      { name: 'Pakistan Studies', slug: 'pakistan-studies' },
      { name: 'IQ & General Knowledge', slug: 'iq-general-knowledge' },
      { name: 'Physics', slug: 'physics' },
      { name: 'Chemistry', slug: 'chemistry' },
      { name: 'Biology', slug: 'biology' },
    ];

    const subjects = await Subject.insertMany(subjectData);
    const subjectMap = {};
    subjects.forEach((s) => {
      subjectMap[s.slug] = s._id;
    });
    console.log(`Created ${subjects.length} subjects`);

    // ── Phases ────────────────────────────────────────────────────────
    const phaseData = [
      {
        name: 'Phase 1',
        slug: 'phase-1',
        gradeRange: { min: 1, max: 5 },
        description: 'Junior Level — Grades 1 to 5',
        awardStructure: {
          laptop: { position: 1, quantity: 1 },
          chromebook: { positions: [2, 3, 4, 5], quantity: 4 },
          shields: { positions: [6, 7, 8, 9, 10], quantity: 5 },
          certificates: { topPositions: 20, quantity: 20 },
        },
        fee: 500,
      },
      {
        name: 'Phase 2',
        slug: 'phase-2',
        gradeRange: { min: 6, max: 8 },
        description: 'Middle Level — Grades 6 to 8',
        awardStructure: {
          laptop: { position: 1, quantity: 1 },
          chromebook: { positions: [2, 3, 4, 5], quantity: 4 },
          shields: { positions: [6, 7, 8, 9, 10], quantity: 5 },
          certificates: { topPositions: 20, quantity: 20 },
        },
        fee: 500,
      },
      {
        name: 'Phase 3',
        slug: 'phase-3',
        gradeRange: { min: 9, max: 10 },
        description: 'Secondary Level — Grades 9 to 10',
        awardStructure: {
          laptop: { position: 1, quantity: 1 },
          chromebook: { positions: [2, 3, 4, 5], quantity: 4 },
          shields: { positions: [6, 7, 8, 9, 10], quantity: 5 },
          certificates: { topPositions: 20, quantity: 20 },
        },
        fee: 500,
      },
      {
        name: 'Phase 4',
        slug: 'phase-4',
        gradeRange: { min: 11, max: 16 },
        description: 'Senior Level — Grades 11 to 12 & University',
        awardStructure: {
          laptop: { position: 1, quantity: 1 },
          chromebook: { positions: [2, 3, 4, 5], quantity: 4 },
          shields: { positions: [6, 7, 8, 9, 10], quantity: 5 },
          certificates: { topPositions: 20, quantity: 20 },
        },
        fee: 500,
      },
    ];

    const phases = await Phase.insertMany(phaseData);
    const phaseMap = {};
    phases.forEach((p) => {
      phaseMap[p.slug] = p._id;
    });
    console.log(`Created ${phases.length} phases`);

    // ── Link subjects to phases ───────────────────────────────────────
    const phase1Subjects = ['english', 'mathematics', 'science', 'social-studies', 'islamic-studies', 'pakistan-studies', 'iq-general-knowledge'];
    const phase2Subjects = ['english', 'mathematics', 'science', 'social-studies', 'islamic-studies', 'pakistan-studies', 'iq-general-knowledge'];
    const phase3Subjects = ['english', 'mathematics', 'physics', 'chemistry', 'biology', 'social-studies', 'islamic-studies', 'pakistan-studies', 'iq-general-knowledge'];
    const phase4Subjects = ['english', 'mathematics', 'physics', 'chemistry', 'biology', 'social-studies', 'islamic-studies', 'pakistan-studies', 'iq-general-knowledge'];

    const phaseSubjectMap = {
      'phase-1': phase1Subjects,
      'phase-2': phase2Subjects,
      'phase-3': phase3Subjects,
      'phase-4': phase4Subjects,
    };

    for (const [phaseSlug, subjectSlugs] of Object.entries(phaseSubjectMap)) {
      const phaseId = phaseMap[phaseSlug];
      const subjectIds = subjectSlugs.map((s) => subjectMap[s]);
      await Phase.findByIdAndUpdate(phaseId, { syllabus: subjectIds });
      await Subject.updateMany(
        { _id: { $in: subjectIds } },
        { $addToSet: { phases: phaseId } }
      );
    }
    console.log('Linked subjects to phases');

    // ── Admin ─────────────────────────────────────────────────────────
    const adminPassword = await bcrypt.hash('admin123', 12);
    await Admin.create({
      fullName: 'Super Admin',
      email: 'admin@edutalent.edu.pk',
      password: adminPassword,
      role: 'super_admin',
      permissions: ['*'],
    });
    console.log('Created admin user');

    // ── FAQs ──────────────────────────────────────────────────────────
    const faqData = [
      {
        question: 'Who can apply?',
        answer: 'Any Pakistani student from Grade 1 to University can apply for the EduTalent Pakistan scholarship. There are four phases covering all academic levels.',
        category: 'registration',
        order: 1,
      },
      {
        question: 'Is fee refundable?',
        answer: 'No, according to policy the registration fee is non-refundable once paid. Please ensure you meet the eligibility criteria before applying.',
        category: 'payment',
        order: 2,
      },
      {
        question: 'Is the test online?',
        answer: 'Yes, the test is completely online and can be taken from your home using a laptop or desktop computer with a webcam and microphone.',
        category: 'test',
        order: 3,
      },
      {
        question: 'Is camera required?',
        answer: 'Yes, a camera is compulsory. The test uses AI-based proctoring with face tracking and eye movement monitoring to ensure fairness.',
        category: 'test',
        order: 4,
      },
      {
        question: 'How will awards be delivered?',
        answer: 'Awards are delivered to your verified home or school address after the results are announced and your details are confirmed.',
        category: 'awards',
        order: 5,
      },
      {
        question: 'Will I get a certificate?',
        answer: 'Yes, digital certificates are available for all participants. Top performers receive special certificates with QR verification.',
        category: 'awards',
        order: 6,
      },
      {
        question: 'Can university students apply?',
        answer: 'Yes — university students can apply under Phase 4 (Senior Level), which covers Grade 11–12 and university students.',
        category: 'registration',
        order: 7,
      },
    ];

    await FAQ.insertMany(faqData);
    console.log(`Created ${faqData.length} FAQs`);

    // ── Announcements ─────────────────────────────────────────────────
    const adminUser = await Admin.findOne({ email: 'admin@edutalent.edu.pk' });

    const announcementData = [
      {
        title: 'Scholarship Applications Now Open!',
        slug: 'scholarship-applications-now-open',
        content: 'EduTalent Pakistan is now accepting applications for the 2025 scholarship program. Students from Grade 1 to University are eligible. Register before the deadline to secure your spot!',
        summary: '2025 scholarship applications are now open for all phases.',
        isFeatured: true,
        publishDate: new Date(),
        createdBy: adminUser._id,
      },
      {
        title: 'Phase 2 Test Date Announced',
        slug: 'phase-2-test-date-announced',
        content: 'The Phase 2 scholarship test will be held on 15th August 2025. All registered students of Phase 2 should download their roll number slips from their accounts. Ensure your devices meet the technical requirements.',
        summary: 'Phase 2 test scheduled for 15th August 2025.',
        isFeatured: false,
        publishDate: new Date(),
        targetPhase: phaseMap['phase-2'],
        createdBy: adminUser._id,
      },
      {
        title: 'Important: Technical Requirements for Online Test',
        slug: 'technical-requirements-online-test',
        content: 'Please ensure you have a working laptop or desktop with a webcam, microphone, and stable internet connection. Mobile phones and tablets are not supported. Test your setup at least 24 hours before the exam.',
        summary: 'Review the technical requirements before your test day.',
        isFeatured: true,
        publishDate: new Date(),
        createdBy: adminUser._id,
      },
    ];

    await Announcement.insertMany(announcementData);
    console.log(`Created ${announcementData.length} announcements`);

    // ── Syllabus ──────────────────────────────────────────────────────
    const syllabusTopicTemplates = {
      english: ['Grammar & Vocabulary', 'Reading Comprehension', 'Sentence Structure', 'Synonyms & Antonyms', 'Paragraph Writing'],
      mathematics: ['Arithmetic', 'Algebra', 'Geometry', 'Data Handling', 'Word Problems'],
      science: ['Living Things', 'Earth & Space', 'Materials & Matter', 'Energy & Forces', 'Human Body'],
      'physics': ['Mechanics', 'Waves & Optics', 'Electricity & Magnetism', 'Thermal Physics', 'Modern Physics'],
      'chemistry': ['Atomic Structure', 'Chemical Bonding', 'States of Matter', 'Acids & Bases', 'Organic Chemistry'],
      'biology': ['Cell Biology', 'Genetics', 'Human Physiology', 'Plant Biology', 'Ecology'],
      'social-studies': ['Geography', 'History', 'Civics', 'Economics', 'Culture & Heritage'],
      'islamic-studies': ['Quran', 'Hadith', 'Seerat', 'Fiqh', 'Islamic History'],
      'pakistan-studies': ['Ideology of Pakistan', 'Independence Movement', 'Constitution', 'Geography of Pakistan', 'National Heritage'],
      'iq-general-knowledge': ['Logical Reasoning', 'Pattern Recognition', 'Current Affairs', 'Pakistan General Knowledge', 'World GK'],
    };

    const syllabusEntries = [
      { phaseSlug: 'phase-1', subjectSlugs: phase1Subjects, totalMCQs: 100, weightagePerSubject: Math.floor(100 / phase1Subjects.length) },
      { phaseSlug: 'phase-2', subjectSlugs: phase2Subjects, totalMCQs: 100, weightagePerSubject: Math.floor(100 / phase2Subjects.length) },
      { phaseSlug: 'phase-3', subjectSlugs: phase3Subjects, totalMCQs: 100, weightagePerSubject: Math.floor(100 / phase3Subjects.length) },
      { phaseSlug: 'phase-4', subjectSlugs: phase4Subjects, totalMCQs: 100, weightagePerSubject: Math.floor(100 / phase4Subjects.length) },
    ];

    for (const entry of syllabusEntries) {
      const phaseId = phaseMap[entry.phaseSlug];
      const subjectEntries = entry.subjectSlugs.map((slug) => ({
        subjectId: subjectMap[slug],
        topics: syllabusTopicTemplates[slug] || ['General Topics'],
        totalMCQs: entry.weightagePerSubject,
        weightage: entry.weightagePerSubject,
      }));

      await Syllabus.create({
        phaseId,
        subjects: subjectEntries,
        description: `Syllabus for ${entry.phaseSlug.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}`,
        academicYear: '2025-2026',
      });
    }
    console.log(`Created ${syllabusEntries.length} syllabus entries`);

    // ── Students ──────────────────────────────────────────────────────
    const studentPassword = await bcrypt.hash('student123', 12);

    const sampleStudent = {
      fullName: 'Ahmed Khan',
      fatherName: 'Muhammad Khan',
      cnicOrBform: '12345-1234567-1',
      dateOfBirth: new Date('2005-05-15'),
      grade: '8',
      phaseId: phaseMap['phase-2'],
      schoolOrCollege: 'Government High School Lahore',
      province: 'Punjab',
      city: 'Lahore',
      mobileNumber: '0300-1234567',
      email: 'ahmed.khan@email.com',
      address: 'House 123, Street 45, Lahore',
      registrationNumber: 'ETP-2025-P1-0001',
      password: studentPassword,
      status: 'payment_verified',
      challan: {
        challanNumber: 'ETP-CH-12345678',
        generatedAt: new Date(),
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        amount: 500,
        isPaid: true,
        paymentVerified: true,
        paymentVerifiedAt: new Date(),
      },
      rollNoSlip: {
        rollNumber: 'ETP-2025-P1-0001',
        testDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        testTime: '10:00 AM - 12:00 PM',
        username: 'ETP-2025-P1-0001',
        passwordGiven: 'test123',
        issuedAt: new Date(),
      },
    };

    const extraStudents = [
      {
        fullName: 'Fatima Ali',
        fatherName: 'Ali Hassan',
        cnicOrBform: '23456-2345678-2',
        dateOfBirth: new Date('2010-03-20'),
        grade: '4',
        phaseId: phaseMap['phase-1'],
        schoolOrCollege: 'Beaconhouse School System Islamabad',
        province: 'Islamabad',
        city: 'Islamabad',
        mobileNumber: '0311-2345678',
        email: 'fatima.ali@email.com',
        address: 'Sector F-8, Islamabad',
        registrationNumber: 'ETP-2025-P1-0002',
        password: studentPassword,
        status: 'registered',
        challan: {
          challanNumber: 'ETP-CH-23456781',
          generatedAt: new Date(),
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          amount: 500,
          isPaid: false,
          paymentVerified: false,
        },
      },
      {
        fullName: 'Hassan Raza',
        fatherName: 'Raza Ahmed',
        cnicOrBform: '34567-3456789-3',
        dateOfBirth: new Date('2008-07-10'),
        grade: '7',
        phaseId: phaseMap['phase-2'],
        schoolOrCollege: 'The City School Karachi',
        province: 'Sindh',
        city: 'Karachi',
        mobileNumber: '0321-3456789',
        email: 'hassan.raza@email.com',
        address: 'Clifton Block 5, Karachi',
        registrationNumber: 'ETP-2025-P1-0003',
        password: studentPassword,
        status: 'challan_issued',
        challan: {
          challanNumber: 'ETP-CH-34567892',
          generatedAt: new Date(),
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          amount: 500,
          isPaid: false,
          paymentVerified: false,
        },
      },
      {
        fullName: 'Ayesha Mahmood',
        fatherName: 'Mahmood Iqbal',
        cnicOrBform: '45678-4567890-4',
        dateOfBirth: new Date('2006-11-25'),
        grade: '9',
        phaseId: phaseMap['phase-3'],
        schoolOrCollege: 'Lahore Grammar School',
        province: 'Punjab',
        city: 'Lahore',
        mobileNumber: '0333-4567890',
        email: 'ayesha.mahmood@email.com',
        address: 'DHA Phase 5, Lahore',
        registrationNumber: 'ETP-2025-P1-0004',
        password: studentPassword,
        status: 'slip_issued',
        challan: {
          challanNumber: 'ETP-CH-45678903',
          generatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
          amount: 500,
          isPaid: true,
          paymentVerified: true,
          paymentVerifiedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        rollNoSlip: {
          rollNumber: 'ETP-2025-P1-0004',
          testDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          testTime: '02:00 PM - 03:15 PM',
          username: 'ETP-2025-P1-0004',
          passwordGiven: 'test456',
          issuedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
      },
      {
        fullName: 'Bilal Masood',
        fatherName: 'Masood Ahmed',
        cnicOrBform: '56789-5678901-5',
        dateOfBirth: new Date('2004-02-14'),
        grade: '12',
        phaseId: phaseMap['phase-4'],
        schoolOrCollege: 'Cadet College Hasan Abdal',
        province: 'Punjab',
        city: 'Hasan Abdal',
        mobileNumber: '0345-5678901',
        email: 'bilal.masood@email.com',
        address: 'Cadet College, Hasan Abdal',
        registrationNumber: 'ETP-2025-P1-0005',
        password: studentPassword,
        status: 'test_completed',
        challan: {
          challanNumber: 'ETP-CH-56789014',
          generatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          amount: 500,
          isPaid: true,
          paymentVerified: true,
          paymentVerifiedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        },
        rollNoSlip: {
          rollNumber: 'ETP-2025-P1-0005',
          testDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          testTime: '10:00 AM - 11:30 AM',
          username: 'ETP-2025-P1-0005',
          passwordGiven: 'test789',
          issuedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        test: {
          attempted: true,
          score: 85,
          percentage: 85.0,
          position: 3,
          phaseWisePosition: 1,
        },
      },
      {
        fullName: 'Zainab Noor',
        fatherName: 'Noor Muhammad',
        cnicOrBform: '67890-6789012-6',
        dateOfBirth: new Date('2007-09-05'),
        grade: '10',
        phaseId: phaseMap['phase-3'],
        schoolOrCollege: 'Roots Millennium School Peshawar',
        province: 'KPK',
        city: 'Peshawar',
        mobileNumber: '0300-6789012',
        email: 'zainab.noor@email.com',
        address: 'University Town, Peshawar',
        registrationNumber: 'ETP-2025-P1-0006',
        password: studentPassword,
        status: 'result_published',
        challan: {
          challanNumber: 'ETP-CH-67890125',
          generatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          amount: 500,
          isPaid: true,
          paymentVerified: true,
          paymentVerifiedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
        },
        rollNoSlip: {
          rollNumber: 'ETP-2025-P1-0006',
          testDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          testTime: '10:00 AM - 11:15 AM',
          username: 'ETP-2025-P1-0006',
          passwordGiven: 'test101',
          issuedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        },
        test: {
          attempted: true,
          score: 92,
          percentage: 92.0,
          position: 1,
          phaseWisePosition: 1,
        },
        award: {
          type: 'laptop',
          title: '1st Position — Laptop',
          issuedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          delivered: true,
          deliveryAddress: 'University Town, Peshawar',
          trackingNumber: 'TCS-99887766',
        },
        certificate: {
          type: '1st_position',
          certificateNumber: 'ETP-CERT-2025-0001',
          issuedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
      },
    ];

    await Student.create(sampleStudent);
    const createdStudents = await Student.insertMany(extraStudents);
    const totalStudents = 1 + createdStudents.length;
    console.log(`Created ${totalStudents} students`);

    // ── Summary ───────────────────────────────────────────────────────
    const totalSubjects = subjects.length;
    const totalFAQs = faqData.length;

    console.log('\n══════════════════════════════════════');
    console.log('  Seed complete!');
    console.log(`  ${phases.length} phases`);
    console.log(`  ${totalSubjects} subjects`);
    console.log('  1 admin');
    console.log(`  ${totalFAQs} FAQs`);
    console.log(`  ${announcementData.length} announcements`);
    console.log(`  ${syllabusEntries.length} syllabus entries`);
    console.log(`  ${totalStudents} students`);
    console.log('══════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
