require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../src/models/Admin');
const Phase = require('../src/models/Phase');

const ADMIN_EMAIL = 'admin@edutalent.edu.pk';
const ADMIN_PASSWORD = 'admin123';

const phases = [
  {
    name: 'Phase 1 — Primary Level',
    slug: 'phase-1-primary',
    gradeRange: { min: 1, max: 5 },
    description: 'Scholarship test for primary level students (Grade 1-5).',
    fee: 1200,
  },
  {
    name: 'Phase 2 — Middle Level',
    slug: 'phase-2-middle',
    gradeRange: { min: 6, max: 8 },
    description: 'Scholarship test for middle level students (Grade 6-8).',
    fee: 1200,
  },
  {
    name: 'Phase 3 — Matric Level',
    slug: 'phase-3-matric',
    gradeRange: { min: 9, max: 10 },
    description: 'Scholarship test for matric level students (Grade 9-10).',
    fee: 1200,
  },
  {
    name: 'Phase 4 — Senior Level',
    slug: 'phase-4-senior',
    gradeRange: { min: 11, max: 16 },
    description: 'Scholarship test for senior level students (Grade 11-12 & University).',
    fee: 1200,
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to:', mongoose.connection.db.databaseName);

    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
    } else {
      const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await Admin.create({
        fullName: 'Super Admin',
        email: ADMIN_EMAIL,
        password: hashed,
        role: 'super_admin',
        isActive: true,
      });
      console.log('Admin created:', ADMIN_EMAIL);
    }

    for (const p of phases) {
      const existing = await Phase.findOne({ slug: p.slug });
      if (existing) {
        console.log('Phase exists:', p.slug);
      } else {
        await Phase.create(p);
        console.log('Phase created:', p.slug);
      }
    }

    const counts = {
      admins: await Admin.countDocuments(),
      phases: await Phase.countDocuments(),
    };
    console.log('Seed summary:', counts);
  } catch (e) {
    console.error('SEED ERROR:', e.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
