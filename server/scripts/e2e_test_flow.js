const BASE = 'http://localhost:5000/api/v1';

async function req(method, path, token, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  return { status: res.status, json };
}

(async () => {
  console.log('=== STUDENT LOGIN ===');
  let r = await req('POST', '/auth/student/login', null, {
    registrationNumber: 'ETP-2026-P4-0007-MXIO',
    password: 'Test@123',
  });
  console.log(r.status, JSON.stringify(r.json));
  if (r.status !== 200) { console.log('LOGIN FAILED'); process.exit(1); }
  const studentToken = r.json.token;

  console.log('\n=== START TEST ===');
  r = await req('POST', '/test/start', studentToken);
  console.log(r.status, JSON.stringify({ totalQuestions: r.json.totalQuestions, status: r.json.session?.status }));
  const total = r.json.totalQuestions || 0;
  if (total === 0) { console.log('NO QUESTIONS'); process.exit(1); }

  let correct = 0;
  for (let i = 0; i < total; i++) {
    r = await req('GET', `/test/question/${i}`, studentToken);
    if (r.status !== 200) { console.log(`question ${i} failed:`, r.status, JSON.stringify(r.json)); break; }
    const q = r.json.question;
    const labels = q.options.map((o) => o.label);
    const chosen = labels[Math.floor(Math.random() * labels.length)];
    r = await req('POST', '/test/answer', studentToken, {
      questionId: q.id,
      selectedOption: chosen,
      timeTaken: Math.floor(Math.random() * 20) + 5,
    });
    if (r.json.correct) correct++;
    if (i % 5 === 0) console.log(`answered ${i + 1}/${total}`);
  }
  console.log(`\nAnswered all ${total}, correct guesses: ${correct}`);

  console.log('\n=== SUBMIT TEST ===');
  r = await req('POST', '/test/submit', studentToken);
  console.log(r.status, JSON.stringify(r.json));
  if (r.status !== 200) { console.log('SUBMIT FAILED'); process.exit(1); }

  console.log('\n=== GET SESSION (should be null/empty) ===');
  r = await req('GET', '/test/session', studentToken);
  console.log(r.status, JSON.stringify(r.json));

  console.log('\n=== STUDENT PROFILE STATUS ===');
  r = await req('GET', '/students/profile', studentToken);
  console.log(r.status, 'status:', r.json.student?.status || r.json.status);

  console.log('\n=== STUDENT MY RESULT ===');
  r = await req('GET', '/results/my-result', studentToken);
  console.log(r.status, JSON.stringify(r.json));

  console.log('\n=== ADMIN LOGIN ===');
  r = await req('POST', '/auth/admin/login', null, { email: 'admin@edutalent.edu.pk', password: 'admin123' });
  console.log(r.status, JSON.stringify({ role: r.json.admin?.role }));
  if (r.status !== 200) { console.log('ADMIN LOGIN FAILED'); process.exit(1); }
  const adminToken = r.json.token;

  console.log('\n=== ADMIN GET ALL RESULTS ===');
  r = await req('GET', '/results', adminToken);
  console.log(r.status, Array.isArray(r.json) ? `count=${r.json.length}` : JSON.stringify(r.json).slice(0, 200));
  if (Array.isArray(r.json)) {
    r.json.forEach((res) => console.log(' -', res.studentId?.fullName, res.rollNumber, res.obtainedMarks + '/' + res.totalMarks, res.percentage + '%', res.awardCategory || '-'));
  }

  console.log('\n=== ADMIN SETTINGS (phases) ===');
  r = await req('GET', '/settings', adminToken);
  console.log(r.status, 'phases:', (r.json.data?.phases || []).map((p) => p.name).join(', '));

  console.log('\n=== ADMIN GENERATE RESULTS (phase 4) ===');
  const phaseId = (r.json.data?.phases || []).find((p) => /phase 4/i.test(p.name))?._id;
  if (phaseId) {
    r = await req('POST', `/results/generate/${phaseId}`, adminToken);
    console.log(r.status, JSON.stringify(r.json));
  } else {
    console.log('phase 4 not found');
  }

  console.log('\n=== DONE ===');
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
