const mongoose = require('mongoose');
require('dotenv').config();
const Phase = require('./models/Phase');
const Subject = require('./models/Subject');
const Question = require('./models/Question');

const sampleQuestions = [
  {
    text: 'What is the capital city of Pakistan?',
    options: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'],
    correct: 2,
  },
  {
    text: 'How many provinces does Pakistan have?',
    options: ['Three', 'Four', 'Five', 'Six'],
    correct: 1,
  },
  {
    text: 'Which is the national language of Pakistan?',
    options: ['Urdu', 'English', 'Punjabi', 'Sindhi'],
    correct: 0,
  },
  {
    text: 'What is the national flower of Pakistan?',
    options: ['Rose', 'Jasmine', 'Sunflower', 'Tulip'],
    correct: 1,
  },
  {
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correct: 1,
  },
  {
    text: 'How many days are there in a leap year?',
    options: ['364', '365', '366', '367'],
    correct: 2,
  },
  {
    text: 'What is the largest ocean in the world?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correct: 3,
  },
  {
    text: 'Which is the longest river in Pakistan?',
    options: ['Ravi', 'Sutlej', 'Indus', 'Chenab'],
    correct: 2,
  },
  {
    text: 'Who is the founder of Pakistan?',
    options: ['Allama Iqbal', 'Quaid-e-Azam Muhammad Ali Jinnah', 'Liaquat Ali Khan', 'Sir Syed Ahmed Khan'],
    correct: 1,
  },
  {
    text: 'What is the national animal of Pakistan?',
    options: ['Lion', 'Markhor', 'Deer', 'Horse'],
    correct: 1,
  },
  {
    text: 'Which is the highest mountain peak in Pakistan?',
    options: ['Nanga Parbat', 'Rakaposhi', 'K2', 'Broad Peak'],
    correct: 2,
  },
  {
    text: 'What is the chemical symbol for water?',
    options: ['H2O', 'CO2', 'O2', 'NaCl'],
    correct: 0,
  },
  {
    text: 'Which is the national bird of Pakistan?',
    options: ['Parrot', 'Chukar Partridge', 'Eagle', 'Falcon'],
    correct: 1,
  },
  {
    text: 'How many continents are there in the world?',
    options: ['Five', 'Six', 'Seven', 'Eight'],
    correct: 2,
  },
  {
    text: 'What is the largest desert in the world?',
    options: ['Thar', 'Gobi', 'Sahara', 'Kalahari'],
    correct: 2,
  },
  {
    text: 'Which is the smallest country in the world?',
    options: ['Malta', 'Monaco', 'Vatican City', 'San Marino'],
    correct: 2,
  },
  {
    text: 'What is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Horse', 'Gazelle'],
    correct: 1,
  },
  {
    text: 'Which vitamin is produced by sunlight?',
    options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
    correct: 3,
  },
  {
    text: 'What is the national sport of Pakistan?',
    options: ['Cricket', 'Hockey', 'Football', 'Squash'],
    correct: 1,
  },
  {
    text: 'Which is the largest city of Pakistan by population?',
    options: ['Islamabad', 'Lahore', 'Karachi', 'Faisalabad'],
    correct: 2,
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
  console.log('Connected');

  let subject = await Subject.findOne({ name: { $regex: '^General Knowledge$', $options: 'i' } });
  if (!subject) {
    subject = await Subject.create({ name: 'General Knowledge', slug: 'general-knowledge', isActive: true });
    console.log('Created subject', subject.name);
  }

  const phases = await Phase.find({ isActive: true });

  for (const phase of phases) {
    const count = await Question.countDocuments({ phaseId: phase._id, isActive: true });
    console.log(`${phase.name}: ${count} active questions`);
    if (count >= 10) continue;

    const needed = 20;
    const toCreate = [];
    for (let i = 0; i < needed; i++) {
      const sq = sampleQuestions[i % sampleQuestions.length];
      toCreate.push({
        phaseId: phase._id,
        subjectId: subject._id,
        questionText: sq.text,
        options: sq.options.map((text, oi) => ({ label: String.fromCharCode(65 + oi), text, isCorrect: oi === sq.correct })),
        difficulty: 'medium',
        marks: 1,
        timeLimit: 25,
        isActive: true,
      });
    }
    const inserted = await Question.insertMany(toCreate);
    console.log(`  + inserted ${inserted.length} questions for ${phase.name}`);
  }

  await mongoose.disconnect();
  console.log('Done');
}

run().catch((e) => { console.error(e); process.exit(1); });
