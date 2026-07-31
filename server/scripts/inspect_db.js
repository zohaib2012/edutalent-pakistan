require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

(async () => {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const roman = await db.collection('students').find({ $or: [{ fullName: /roman/i }, { registrationNumber: /MXIO/ }] }).toArray();
  console.log('ROMAN:', JSON.stringify(roman, null, 2).slice(0, 3000));

  const withAcct = await db.collection('students').find({ $or: [{ password: { $exists: true } }, { hasAccount: true }] })
    .project({ fullName: 1, email: 1, registrationNumber: 1, status: 1, password: 1, hasAccount: 1 }).toArray();
  console.log('WITH ACCOUNT:', JSON.stringify(withAcct, null, 2).slice(0, 3000));

  await mongoose.disconnect();
})().catch((e) => { console.error(e.message); process.exit(1); });
