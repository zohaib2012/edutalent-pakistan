const BASE = 'http://localhost:5000/api/v1';

async function req(method, path, token, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  return { status: res.status, json };
}

(async () => {
  console.log('=== ADMIN LOGIN ===');
  let r = await req('POST', '/auth/admin/login', null, { email: 'admin@edutalent.edu.pk', password: 'admin123' });
  const adminToken = r.json.token;
  console.log(r.status);

  console.log('\n=== GET /phases ===');
  r = await req('GET', '/phases', adminToken);
  console.log(r.status, 'success:', r.json.success, 'count:', r.json.data?.length);

  console.log('\n=== GET phase subjects (phase 4) ===');
  const phase4 = r.json.data?.find((p) => /phase 4/i.test(p.name));
  r = await req('GET', `/phases/${phase4._id}/subjects`, adminToken);
  console.log(r.status, 'subjects:', r.json.data?.map((s) => s.name).join(', '));

  console.log('\n=== CREATE TEST PHASE ===');
  r = await req('POST', '/phases', adminToken, {
    name: 'Test Phase X', slug: 'test-phase-x', gradeRange: { min: 99, max: 100 },
    description: 'Temporary phase for testing', fee: 1000,
    awardStructure: { laptop: { position: 1, quantity: 1 }, chromebook: { positions: [2, 3, 4, 5], quantity: 4 }, shields: { positions: [6, 7, 8, 9, 10], quantity: 5 }, certificates: { topPositions: 20, quantity: 20 } },
  });
  console.log(r.status, JSON.stringify({ success: r.json.success, id: r.json.data?._id, name: r.json.data?.name }));

  console.log('\n=== DELETE TEST PHASE ===');
  if (r.json.data?._id) {
    const del = await req('DELETE', `/phases/${r.json.data._id}`, adminToken);
    console.log(del.status, JSON.stringify(del.json));
  }

  console.log('\n=== CREATE QUESTION (phase 4, first subject) ===');
  const subj = (await req('GET', `/phases/${phase4._id}/subjects`, adminToken)).json.data[0];
  r = await req('POST', '/questions', adminToken, {
    phaseId: phase4._id, subjectId: subj._id, questionText: 'E2E test question - capital of Pakistan?',
    options: [
      { label: 'A', text: 'Lahore', isCorrect: false },
      { label: 'B', text: 'Islamabad', isCorrect: true },
      { label: 'C', text: 'Karachi', isCorrect: false },
      { label: 'D', text: 'Peshawar', isCorrect: false },
    ],
    difficulty: 'easy', marks: 1, timeLimit: 25,
  });
  console.log(r.status, JSON.stringify({ success: r.status === 201, id: r.json._id, text: r.json.questionText }));
  const newQId = r.json._id;

  console.log('\n=== DELETE TEST QUESTION ===');
  if (newQId) {
    r = await req('DELETE', `/questions/${newQId}`, adminToken);
    console.log(r.status, JSON.stringify(r.json));
  }

  console.log('\n=== GET /admindashboard/stats ===');
  r = await req('GET', '/admindashboard/stats', adminToken);
  console.log(r.status, JSON.stringify({
    totalStudents: r.json.totalStudents,
    byProvince: r.json.registrationByProvince,
    byPhase: r.json.registrationByPhase,
    dailyTrend: r.json.dailyTrend,
    paymentStatus: r.json.paymentStatus,
  }, null, 2));

  console.log('\n=== DONE ===');
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
