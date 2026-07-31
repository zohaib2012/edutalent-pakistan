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

  console.log('\n=== SETTINGS (phases) ===');
  r = await req('GET', '/settings', adminToken);
  const phases = r.json.data?.phases || [];
  const phase4 = phases.find((p) => /phase 4/i.test(p.name));
  console.log(r.status, 'phase4:', phase4?._id, phase4?.name);

  console.log('\n=== GENERATE RESULTS for Phase 4 ===');
  r = await req('POST', `/results/generate/${phase4._id}`, adminToken);
  console.log(r.status, JSON.stringify(r.json).slice(0, 500));

  console.log('\n=== STUDENT PROFILE STATUS (roman) ===');
  const login = await req('POST', '/auth/student/login', null, { registrationNumber: 'ETP-2026-P4-0007-MXIO', password: 'Test@123' });
  const studentToken = login.json.token;
  r = await req('GET', '/students/profile', studentToken);
  const s = r.json.student || r.json;
  console.log(r.status, 'status:', s.status, '| award:', JSON.stringify(s.award), '| test:', JSON.stringify(s.test));

  console.log('\n=== ADMIN GET ALL RESULTS ===');
  r = await req('GET', '/results', adminToken);
  r.json.forEach((res) => console.log(' -', res.studentId?.fullName, res.rollNumber, res.obtainedMarks + '/' + res.totalMarks, res.percentage + '%', '| rank:', res.phaseRank, '| award:', res.awardCategory, '| merit:', res.isMeritQualified));

  console.log('\n=== STUDENT MY RESULT ===');
  r = await req('GET', '/results/my-result', studentToken);
  console.log(r.status, JSON.stringify({ percentage: r.json.percentage, phaseRank: r.json.phaseRank, overallRank: r.json.overallRank, awardCategory: r.json.awardCategory, isMeritQualified: r.json.isMeritQualified }));

  console.log('\n=== MERIT LIST Phase 4 ===');
  r = await req('GET', `/results/merit-list/${phase4._id}`);
  console.log(r.status, JSON.stringify(r.json).slice(0, 400));

  console.log('\n=== DONE ===');
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
