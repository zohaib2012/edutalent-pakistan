require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

(async () => {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const newPassword = 'Test@123';
  const hash = await bcrypt.hash(newPassword, 10);
  const res = await db.collection('students').updateOne(
    { registrationNumber: 'ETP-2026-P4-0007-MXIO' },
    { $set: { password: hash } }
  );
  console.log('Matched:', res.matchedCount, 'Modified:', res.modifiedCount);
  console.log('Password reset to:', newPassword);
  await mongoose.disconnect();
})().catch((e) => { console.error(e.message); process.exit(1); });
