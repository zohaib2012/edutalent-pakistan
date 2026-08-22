import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const postFormData = async (url, formData) => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  let data = {};
  try { data = await res.json(); } catch { /* ignore */ }
  if (!res.ok) {
    const err = new Error(data.message || 'Upload failed');
    err.response = { data: data || { message: 'Upload failed' } };
    throw err;
  }
  return { data };
};

// Request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();

  const isStudentProfile = url.includes('/students/profile');
  const isAdminPath = !isStudentProfile && (
    url.includes('/admin') ||
    url.includes('/admindashboard') ||
    url.includes('/slips/generate') ||
    url.includes('/slips/all') ||
    url.includes('/payments/verify') ||
    url.includes('/payments/reject') ||
    url.includes('/payments/pending') ||
    url.includes('/payments/all') ||
    url.includes('/payments/stats') ||
    url.includes('/questions') ||
    url.includes('/test/issue') ||
    url.includes('/test/revoke') ||
    url.includes('/results/generate') ||
    (url.includes('/results') && !url.includes('/my-result') && !url.includes('/merit-list') && !url.includes('/overall-merit')) ||
    (url.includes('/awards') && !url.includes('/winners') && !url.includes('/my-award')) ||
    url.includes('/certificates/generate') ||
    url.includes('/certificates/upload') ||
    url.includes('/certificates/types') ||
    url.includes('/notifications/send') ||
    url.includes('/notifications/broadcast') ||
    url.includes('/settings') ||
    url.includes('/phases') ||
    url.includes('/students') ||
    url.includes('/announcements/admin') ||
    (url.includes('/announcements') && method !== 'get') ||
    (url.includes('/syllabus') && method !== 'get') ||
    (url.includes('/merit-list') && method !== 'get') ||
    (url.includes('/merit-documents') && method !== 'get') ||
    (url.includes('/award-winners') && method !== 'get') ||
    (url.includes('/contact') && method !== 'post' && !url.includes('/contact/my-replies'))
  );

  if (isAdminPath && adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- AUTH ----
export const studentLogin = (data) => api.post('/auth/student/login', data);
export const adminLogin = (data) => api.post('/auth/admin/login', data);
export const getMe = () => api.get('/auth/me');

// ---- REGISTRATION ----
export const registerStudent = (data) => api.post('/registration', data);
export const checkCNIC = (cnic) => api.get(`/registration/check-cnic/${cnic}`);
export const createAccount = (data) => api.post('/registration/create-account', data);
export const submitApplication = (formData) => api.post('/registration/submit-application', formData);
export const getApplicationForm = () => api.get('/registration/application-form');

// ---- STUDENTS ----
export const getStudents = (params) => api.get('/students', { params });
export const getStudentProfile = () => api.get('/students/profile');
export const updateStudentProfile = (data) => api.put('/students/profile', data);
export const updateStudentStatus = (id, status) => api.patch(`/students/${id}/status`, { status });
export const deleteStudent = (id) => api.delete(`/students/${id}`);
export const searchStudents = (q) => api.get('/students/search', { params: { q } });

// ---- PAYMENTS ----
export const uploadChallan = (formData) => api.post('/payments/upload', formData);
export const verifyPayment = (studentId) => api.patch(`/payments/verify/${studentId}`);
export const rejectPayment = (studentId, reason) => api.patch(`/payments/reject/${studentId}`, { reason });
export const getPendingPayments = () => api.get('/payments/pending');
export const getPaymentStats = () => api.get('/payments/stats');

// ---- SLIPS ----
export const getMySlip = () => api.get('/slips/my-slip');
export const generateSlip = (studentId) => api.post(`/slips/generate/${studentId}`);
export const generateBulkSlips = (data) => api.post('/slips/generate-bulk', data);
export const getAllSlips = () => api.get('/slips/all');
export const searchPublicSlip = (params) => api.get('/slips/search', { params });

// ---- PUBLIC SEARCH ----
export const searchPublicChallan = (params) => api.get('/challan/search', { params });
export const trackApplication = (query) => api.get('/students/track', { params: { query } });

// ---- TEST ----
export const startTest = () => api.post('/test/start');
export const getQuestion = (index) => api.get(`/test/question/${index}`);
export const submitAnswer = (data) => api.post('/test/answer', data);
export const submitTest = () => api.post('/test/submit');
export const flagCheat = (data) => api.post('/test/flag-cheat', data);
export const getTestSession = () => api.get('/test/session');
export const getTestInstructions = () => api.get('/test/instructions');

// ---- RESULTS ----
export const getMyResult = () => api.get('/results/my-result');
export const getMeritList = (phaseId) => api.get(`/results/merit-list/${phaseId}`);
export const getOverallMerit = () => api.get('/results/overall-merit');

// ---- MERIT LIST (CRUD) ----
export const getPublicMeritList = () => api.get('/merit-list');
export const getAdminMeritList = () => api.get('/merit-list/admin/all');
export const createMeritEntry = (data) => api.post('/merit-list', data);
export const updateMeritEntry = (id, data) => api.put(`/merit-list/${id}`, data);
export const deleteMeritEntry = (id) => api.delete(`/merit-list/${id}`);
export const getPublicMeritDocuments = () => api.get('/merit-documents');
export const getAdminMeritDocuments = () => api.get('/merit-documents/admin/all');
export const uploadMeritDocument = (formData) => api.post('/merit-documents', formData);
export const deleteMeritDocument = (id) => api.delete(`/merit-documents/${id}`);

// ---- AWARDS ----
export const getWinners = () => api.get('/awards/winners');
export const getMyAward = () => api.get('/awards/my-award');
export const getAllAwardWinners = () => api.get('/awards');
export const getPublicAwardWinners = () => api.get('/award-winners');
export const getAdminAwardWinners = () => api.get('/award-winners/admin/all');
export const createAwardWinner = (data) => api.post('/award-winners', data);
export const updateAwardWinner = (id, data) => api.put(`/award-winners/${id}`, data);
export const deleteAwardWinner = (id) => api.delete(`/award-winners/${id}`);

// ---- CERTIFICATES ----
export const getMyCertificate = () => api.get('/certificates/my-certificate');
export const getMyCertificates = () => api.get('/certificates/my-certificates');
export const verifyCertificate = (certNumber) => api.get(`/certificates/verify/${certNumber}`);
export const getCertificateTypes = () => api.get('/certificates/types');
export const generateCertificate = (studentId) => api.post(studentId ? `/certificates/generate/${studentId}` : '/certificates/generate');
export const uploadCertificate = (formData) => api.post('/certificates/upload', formData);
export const searchCertificate = (params) => api.get('/certificates/search', { params });

// ---- ANNOUNCEMENTS ----
export const getAnnouncements = () => api.get('/announcements');
export const getAnnouncementBySlug = (slug) => api.get(`/announcements/${slug}`);
export const getFeaturedAnnouncements = () => api.get('/announcements/featured');
export const getAdminAnnouncements = () => api.get('/announcements/admin/all');
export const createAnnouncement = (data) => api.post('/announcements', data);
export const updateAnnouncement = (id, data) => api.put(`/announcements/${id}`, data);
export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}`);

// ---- FAQs ----
export const getFAQs = () => api.get('/faqs');

// ---- SYLLABUS ----
export const getSyllabus = () => api.get('/syllabus');
export const getSyllabusByPhase = (phaseId) => api.get(`/syllabus/phase/${phaseId}`);
export const getAdminSyllabus = () => api.get('/syllabus/admin/all');
export const createSyllabus = (data) => api.post('/syllabus', data);
export const updateSyllabus = (id, data) => api.put(`/syllabus/${id}`, data);
export const deleteSyllabus = (id) => api.delete(`/syllabus/${id}`);

// ---- CONTACT ----
export const submitContact = (data) => api.post('/contact', data);
export const getContactMessages = () => api.get('/contact');
export const replyContactMessage = (id, data) => api.put(`/contact/${id}/reply`, data);
export const markContactRead = (id) => api.patch(`/contact/${id}/read`);
export const getMyContactReplies = () => api.get('/contact/my-replies');

// ---- DASHBOARD ----
export const getDashboardStats = () => api.get('/admindashboard/stats');
export const getRecentActivity = () => api.get('/admindashboard/recent-activity');

// ---- NOTIFICATIONS ----
export const getMyNotifications = () => api.get('/notifications/my-notifications');
export const sendNotification = (data) => api.post('/notifications/send', data);

// ---- SETTINGS ----
export const getSettings = () => api.get('/settings');
export const updateSettings = (category, settings) => api.put('/settings', { category, settings });
export const updatePhaseFees = (phases) => api.put('/settings/phases', { phases });

// ---- PHASES ----
export const getPhases = () => api.get('/phases');
export const getPhase = (id) => api.get(`/phases/${id}`);
export const createPhase = (data) => api.post('/phases', data);
export const updatePhase = (id, data) => api.put(`/phases/${id}`, data);
export const deletePhase = (id) => api.delete(`/phases/${id}`);
export const getPhaseSubjects = (phaseId) => api.get(`/phases/${phaseId}/subjects`);

export default api;
