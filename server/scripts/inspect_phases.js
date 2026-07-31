require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;

  const phases = await db.collection('phases').find({}).project({ name: 1, slug: 1, fee: 1, gradeRange: 1, syllabus: 1 }).toArray();
  for (const p of phases) {
    const subs = await db.collection('subjects').find({ _id: { $in: p.syllabus || [] } }).project({ name: 1 }).toArray();
    console.log(p.name, '| fee:', p.fee, '| grades:', p.gradeRange?.min, '-', p.gradeRange?.max, '| subjects:', subs.map((s) => s.name).join(', '));
  }

  const totalSubs = await db.collection('subjects').countDocuments();
  console.log('Total subjects:', totalSubs);
  await mongoose.disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
