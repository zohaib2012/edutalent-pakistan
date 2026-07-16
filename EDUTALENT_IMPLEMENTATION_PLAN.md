# 🏆 EDUTALENT PAKISTAN — COMPLETE IMPLEMENTATION PLAN

> **Pakistan’s Largest Online Scholarship Testing System**
> Tech Stack: React.js + Node.js + Express + MongoDB Atlas + Cloudinary

---

## 📌 PROJECT OVERVIEW

| Field | Value |
|-------|-------|
| Website Name | EduTalent Pakistan |
| Taglines | "Unlocking Brilliance, Rewarding Talent" / "Pakistan's National Digital Scholarship Platform" |
| Mission | Recognize, encourage, and reward hidden talent of Pakistan's students through fair, transparent, nation-wide scholarship testing |
| Vision | Build a future where every Pakistani student, regardless of background, feels valued and capable of achieving greatness |
| Colors | Primary: `#1A73E8` (Royal Blue), Success: `#2ECC71` (Emerald Green), Gold: `#F1C40F`, BG: `#FFFFFF` |
| Logo Concept | Open book turning into rising star with Pakistan crescent inside star, "EduTalent Pakistan" in bold blue, gold outline |
| Coverage | All Pakistan: Sindh, Punjab, KPK, Balochistan, AJK, GB, Islamabad |
| Target | Grade 1 to 5, Grade 6 to 8, Grade 9 to 10, Grade 11 to 12, University Students |

---

## ⚠️ CRITICAL GAPS FIXED (v1.1)

| # | Gap Found | Fix Applied |
|---|-----------|-------------|
| 1 | "Apply Now" page missing (client requires it as separate page #8) | ✅ Added ApplyNowPage |
| 2 | "Screen auto-lock" (fullscreen) not enforced during test | ✅ Added Fullscreen API enforcement |
| 3 | "No screen recording" detection missing in anti-cheat | ✅ Added screen recording detection |
| 4 | Public pages count wrong (17 vs actual 21) | ✅ Fixed to 21 |
| 5 | Student portal pages count wrong (7 vs actual 9) | ✅ Fixed to 9 |
| 6 | Student Login page placement ambiguous | ✅ Added as public page `/login` |
| 7 | Roll No Slip auto-generation gap | ✅ System auto-generates upon payment verification (not admin-triggered) |
| 8 | No fullscreen enforcement documented in TestPortal spec | ✅ Added Fullscreen API requirements |

---

## 🗂️ TECH STACK

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React.js (Vite) | Latest |
| Styling | Tailwind CSS | v3.x |
| Icons | Lucide React | Latest |
| State Management | React Context + useReducer | Built-in |
| Routing | React Router DOM | v6 |
| HTTP Client | Axios | Latest |
| Backend | Node.js + Express | v20.x LTS |
| Database | MongoDB + Mongoose | v7.x |
| Authentication | JWT (jsonwebtoken + bcryptjs) | Latest |
| File Uploads | Cloudinary (Multer + cloudinary SDK) | Latest |
| PDF Generation | Puppeteer or PDFKit | Latest |
| QR Code | qrcode npm package | Latest |
| Email | Nodemailer | Latest |
| Validation | Joi or express-validator | Latest |
| CORS | cors npm package | Latest |
| Environment | dotenv | Latest |

---

## 📁 PROJECT FOLDER STRUCTURE

```
edutalent-pakistan/
│
├── client/                              # React Frontend
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   ├── og-image.png
│   │   └── robots.txt
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   ├── hero-bg.jpg
│   │   │   │   ├── about-bg.jpg
│   │   │   │   ├── award-laptop.png
│   │   │   │   ├── award-chromebook.png
│   │   │   │   └── award-shield.png
│   │   │   └── icons/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── MobileMenu.jsx
│   │   │   │   └── ScrollToTop.jsx
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── SectionTitle.jsx
│   │   │   │   ├── PhaseCard.jsx
│   │   │   │   ├── AwardCard.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── FormInput.jsx
│   │   │   │   ├── FormSelect.jsx
│   │   │   │   ├── FileUpload.jsx
│   │   │   │   ├── ProgressSteps.jsx
│   │   │   │   ├── CountdownTimer.jsx
│   │   │   │   ├── QRCode.jsx
│   │   │   │   ├── Pagination.jsx
│   │   │   │   └── Breadcrumb.jsx
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── StatsSection.jsx
│   │   │   │   ├── PhasesSection.jsx
│   │   │   │   ├── AwardsSection.jsx
│   │   │   │   ├── HowItWorksSection.jsx
│   │   │   │   ├── TestimonialsSection.jsx
│   │   │   │   ├── AnnouncementsSection.jsx
│   │   │   │   ├── PartnersSection.jsx
│   │   │   │   └── CTASection.jsx
│   │   │   ├── registration/
│   │   │   │   ├── RegistrationForm.jsx
│   │   │   │   ├── PhotoUploadSection.jsx
│   │   │   │   └── ChallanPreview.jsx
│   │   │   ├── test/
│   │   │   │   ├── TestPortal.jsx
│   │   │   │   ├── MCQQuestion.jsx
│   │   │   │   ├── TimerBar.jsx
│   │   │   │   ├── ProgressTracker.jsx
│   │   │   │   ├── TestInstructions.jsx
│   │   │   │   ├── AntiCheatWarning.jsx
│   │   │   │   ├── FullscreenGuard.jsx
│   │   │   │   └── SystemCheck.jsx
│   │   │   └── certificates/
│   │   │       ├── CertificateCard.jsx
│   │   │       └── CertificateDownload.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── StudentContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useStudent.js
│   │   │   ├── useTest.js
│   │   │   ├── useForm.js
│   │   │   └── useTimer.js
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── AboutPage.jsx
│   │   │   │   ├── MissionPage.jsx
│   │   │   │   ├── VisionPage.jsx
│   │   │   │   ├── ValuesPage.jsx
│   │   │   │   ├── AnnouncementsPage.jsx
│   │   │   │   ├── ScholarshipsPage.jsx
│   │   │   │   ├── ApplyNowPage.jsx
│   │   │   │   ├── StudentLoginPage.jsx
│   │   │   │   ├── SyllabusPage.jsx
│   │   │   │   ├── TestRulesPage.jsx
│   │   │   │   ├── DateSheetPage.jsx
│   │   │   │   ├── ResultsPage.jsx
│   │   │   │   ├── MeritListPage.jsx
│   │   │   │   ├── AwardsPage.jsx
│   │   │   │   ├── CertificatesPage.jsx
│   │   │   │   ├── FAQsPage.jsx
│   │   │   │   ├── ContactPage.jsx
│   │   │   │   ├── PrivacyPage.jsx
│   │   │   │   ├── TermsPage.jsx
│   │   │   │   ├── RefundPage.jsx
│   │   │   │   └── AntiCheatingPolicyPage.jsx
│   │   │   ├── student/
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   ├── RegistrationSuccessPage.jsx
│   │   │   │   ├── ChallanDownloadPage.jsx
│   │   │   │   ├── RollNoSlipPage.jsx
│   │   │   │   ├── TestPortalPage.jsx
│   │   │   │   ├── MyResultsPage.jsx
│   │   │   │   ├── MyCertificatesPage.jsx
│   │   │   │   └── ProfilePage.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLoginPage.jsx
│   │   │       ├── AdminDashboardPage.jsx
│   │   │       ├── StudentsManagementPage.jsx
│   │   │       ├── FeeVerificationPage.jsx
│   │   │       ├── SlipManagementPage.jsx
│   │   │       ├── TestManagementPage.jsx
│   │   │       ├── ResultsPage.jsx
│   │   │       ├── AwardAssignmentPage.jsx
│   │   │       ├── NotificationsPage.jsx
│   │   │       └── LogsReportsPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── studentService.js
│   │   │   ├── registrationService.js
│   │   │   ├── testService.js
│   │   │   ├── resultService.js
│   │   │   ├── certificateService.js
│   │   │   └── adminService.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── validators.js
│   │   │   ├── helpers.js
│   │   │   └── formatDate.js
│   │   ├── config/
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                              # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   ├── cloudinary.js
│   │   │   └── email.js
│   │   ├── models/
│   │   │   ├── Student.js
│   │   │   ├── Registration.js
│   │   │   ├── Challan.js
│   │   │   ├── Payment.js
│   │   │   ├── RollNoSlip.js
│   │   │   ├── TestSession.js
│   │   │   ├── Question.js
│   │   │   ├── TestResult.js
│   │   │   ├── Award.js
│   │   │   ├── Certificate.js
│   │   │   ├── Admin.js
│   │   │   ├── Notification.js
│   │   │   ├── Announcement.js
│   │   │   ├── Syllabus.js
│   │   │   ├── Phase.js
│   │   │   ├── Subject.js
│   │   │   ├── FAQ.js
│   │   │   └── ContactMessage.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── authRoutes.js
│   │   │   ├── studentRoutes.js
│   │   │   ├── registrationRoutes.js
│   │   │   ├── challanRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   ├── rollNoSlipRoutes.js
│   │   │   ├── testRoutes.js
│   │   │   ├── questionRoutes.js
│   │   │   ├── resultRoutes.js
│   │   │   ├── awardRoutes.js
│   │   │   ├── certificateRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   ├── announcementRoutes.js
│   │   │   ├── syllabusRoutes.js
│   │   │   ├── faqRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   ├── notificationRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── studentController.js
│   │   │   ├── registrationController.js
│   │   │   ├── challanController.js
│   │   │   ├── paymentController.js
│   │   │   ├── rollNoSlipController.js
│   │   │   ├── testController.js
│   │   │   ├── questionController.js
│   │   │   ├── resultController.js
│   │   │   ├── awardController.js
│   │   │   ├── certificateController.js
│   │   │   ├── adminController.js
│   │   │   ├── announcementController.js
│   │   │   ├── syllabusController.js
│   │   │   ├── faqController.js
│   │   │   ├── contactController.js
│   │   │   ├── notificationController.js
│   │   │   └── dashboardController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── adminAuth.js
│   │   │   ├── upload.js
│   │   │   ├── validate.js
│   │   │   ├── antiCheat.js
│   │   │   ├── rateLimiter.js
│   │   │   └── errorHandler.js
│   │   ├── services/
│   │   │   ├── challanService.js
│   │   │   ├── slipService.js
│   │   │   ├── testEngine.js
│   │   │   ├── gradingService.js
│   │   │   ├── meritService.js
│   │   │   ├── certificateService.js
│   │   │   ├── emailService.js
│   │   │   └── notificationService.js
│   │   ├── utils/
│   │   │   ├── helpers.js
│   │   │   ├── validators.js
│   │   │   ├── constants.js
│   │   │   ├── generateChallan.js
│   │   │   ├── generateSlip.js
│   │   │   ├── generateCertificate.js
│   │   │   ├── generateQR.js
│   │   │   └── logger.js
│   │   ├── validators/
│   │   │   ├── studentValidator.js
│   │   │   ├── registrationValidator.js
│   │   │   └── testValidator.js
│   │   └── app.js
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

## 🗄️ MONGODB SCHEMAS (COMPLETE)

### 1. Phase Collection
```javascript
{
  _id: ObjectId,
  name: String,              // "Phase 1 — Primary Level"
  slug: String,              // "phase-1-primary"
  gradeRange: {
    min: Number,             // 1
    max: Number              // 5
  },
  description: String,
  awardStructure: {
    laptop: { position: Number, quantity: Number },    // { position: 1, quantity: 1 }
    chromebook: { positions: [Number], quantity: Number }, // { positions: [2,3,4,5], quantity: 4 }
    shields: { positions: [Number], quantity: Number },   // { positions: [6,7,8,9,10], quantity: 5 }
    certificates: { topPositions: Number, quantity: Number } // { topPositions: 20, quantity: 20 }
  },
  fee: Number,               // Registration fee
  syllabus: [{ type: ObjectId, ref: 'Subject' }],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Subject Collection
```javascript
{
  _id: ObjectId,
  name: String,              // "English", "Mathematics", etc.
  slug: String,
  icon: String,
  phases: [{ type: ObjectId, ref: 'Phase' }],
  topics: [String],
  totalMCQs: Number,         // 100 MCQs per subject
  timePerMCQ: Number,        // 20-30 seconds
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Student Collection
```javascript
{
  _id: ObjectId,
  // Personal Info
  fullName: String,
  fatherName: String,
  cnicOrBform: String,
  dateOfBirth: Date,
  grade: String,              // "5", "10", "University"
  phaseId: { type: ObjectId, ref: 'Phase' },
  schoolOrCollege: String,
  province: String,           // "Sindh", "Punjab", "KPK", "Balochistan", "AJK", "GB", "Islamabad"
  city: String,
  mobileNumber: String,
  email: String,
  address: String,
  photoUrl: String,           // Cloudinary URL
  photoPublicId: String,      // Cloudinary public_id
  
  // Registration Info
  registrationNumber: String, // Auto-generated unique number
  password: String,           // Hashed (for test portal login)
  registrationDate: Date,
  
  // Challan & Payment
  challan: {
    challanNumber: String,
    generatedAt: Date,
    dueDate: Date,
    amount: Number,
    pdfUrl: String,
    isPaid: Boolean,
    paidChallanImageUrl: String,
    paymentVerified: Boolean,
    paymentVerifiedAt: Date,
    paymentVerifiedBy: { type: ObjectId, ref: 'Admin' }
  },
  
  // Roll No Slip
  rollNoSlip: {
    rollNumber: String,
    testDate: Date,
    testTime: String,
    slipPdfUrl: String,
    username: String,
    passwordGiven: String,
    issuedAt: Date
  },
  
  // Test Info
  test: {
    attempted: Boolean,
    sessionId: { type: ObjectId, ref: 'TestSession' },
    resultId: { type: ObjectId, ref: 'TestResult' },
    score: Number,
    percentage: Number,
    position: Number,
    phaseWisePosition: Number
  },
  
  // Awards
  award: {
    type: String,             // "laptop", "chromebook", "shield", "certificate", "participation"
    title: String,
    issuedAt: Date,
    delivered: Boolean,
    deliveryAddress: String,
    trackingNumber: String
  },
  
  // Certificate
  certificate: {
    type: String,             // "1st_position", "top5", "shield", "top20", "appreciation", "participation"
    certificateNumber: String,
    issuedAt: Date,
    pdfUrl: String,
    qrCodeUrl: String
  },
  
  // Status
  status: String,             // "registered", "challan_issued", "payment_pending", "payment_verified", "slip_issued", "test_completed", "result_published"
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Question Collection
```javascript
{
  _id: ObjectId,
  phaseId: { type: ObjectId, ref: 'Phase' },
  subjectId: { type: ObjectId, ref: 'Subject' },
  questionText: String,
  questionImageUrl: String,   // Optional — for math diagrams etc.
  options: [
    { label: String, text: String, isCorrect: Boolean }
  ],
  difficulty: String,         // "easy", "medium", "hard"
  marks: Number,              // Default 1
  timeLimit: Number,          // Seconds (20-30)
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. TestSession Collection
```javascript
{
  _id: ObjectId,
  studentId: { type: ObjectId, ref: 'Student' },
  phaseId: { type: ObjectId, ref: 'Phase' },
  rollNumber: String,
  
  // Session Status
  status: String,             // "pending", "in_progress", "completed", "terminated", "disqualified"
  startedAt: Date,
  completedAt: Date,
  
  // Questions
  questions: [{ 
    questionId: { type: ObjectId, ref: 'Question' },
    selectedOption: String,
    isCorrect: Boolean,
    timeTaken: Number,        // Seconds
    answeredAt: Date 
  }],
  
  // Anti-Cheat Logs
  antiCheatLogs: [{
    type: String,             // "tab_switch", "face_not_found", "audio_detected", "suspicious_movement"
    timestamp: Date,
    details: String
  }],
  disqualificationReason: String,
  
  // Results
  totalQuestions: Number,
  attemptedQuestions: Number,
  correctAnswers: Number,
  wrongAnswers: Number,
  score: Number,
  percentage: Number,
  totalTimeTaken: Number,     // Seconds
  
  createdAt: Date,
  updatedAt: Date
}
```

### 6. TestResult Collection
```javascript
{
  _id: ObjectId,
  studentId: { type: ObjectId, ref: 'Student' },
  sessionId: { type: ObjectId, ref: 'TestSession' },
  phaseId: { type: ObjectId, ref: 'Phase' },
  rollNumber: String,
  
  // Scores
  totalMarks: Number,
  obtainedMarks: Number,
  percentage: Number,
  
  // Subject-wise Breakdown
  subjectWiseBreakdown: [{
    subjectId: { type: ObjectId, ref: 'Subject' },
    subjectName: String,
    totalQuestions: Number,
    correct: Number,
    wrong: Number,
    unattempted: Number
  }],
  
  // Ranking
  phaseRank: Number,
  overallRank: Number,
  
  // Merit
  isMeritQualified: Boolean,
  awardCategory: String,      // "laptop", "chromebook", "shield", "certificate", "participation"
  
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Admin Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  password: String,           // Strongly hashed
  role: String,               // "super_admin", "admin", "moderator"
  permissions: [String],      // ["manage_students", "verify_payments", "manage_tests", etc.]
  avatar: String,
  lastLogin: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Announcement Collection
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,
  content: String,
  summary: String,
  imageUrl: String,
  isFeatured: Boolean,
  publishDate: Date,
  expiryDate: Date,
  targetPhase: { type: ObjectId, ref: 'Phase' },  // null = all phases
  createdBy: { type: ObjectId, ref: 'Admin' },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 9. Syllabus Collection
```javascript
{
  _id: ObjectId,
  phaseId: { type: ObjectId, ref: 'Phase' },
  subjects: [{
    subjectId: { type: ObjectId, ref: 'Subject' },
    topics: [String],
    totalMCQs: Number,
    weightage: Number        // Percentage
  }],
  description: String,
  academicYear: String,       // "2025-2026"
  pdfUrl: String,             // Downloadable syllabus PDF
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 10. FAQ Collection
```javascript
{
  _id: ObjectId,
  question: String,
  answer: String,
  category: String,           // "registration", "test", "awards", "payment", "general"
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 11. ContactMessage Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  isRead: Boolean,
  repliedAt: Date,
  repliedBy: { type: ObjectId, ref: 'Admin' },
  replyMessage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 12. Notification Collection
```javascript
{
  _id: ObjectId,
  recipientId: { type: ObjectId, ref: 'Student' },  // null = broadcast
  recipientType: String,      // "student", "all", "phase_specific"
  phaseId: { type: ObjectId, ref: 'Phase' },
  title: String,
  message: String,
  type: String,               // "challan", "slip", "result", "award", "announcement", "reminder"
  isRead: Boolean,
  readAt: Date,
  sentVia: [String],          // ["email", "sms", "push"]
  createdAt: Date
}
```

---

## 🔌 API ENDPOINTS (COMPLETE)

### BASE URL: `/api/v1`

### Auth Routes (`/api/v1/auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/student/login` | Student login for test portal | No |
| POST | `/student/forgot-password` | Forgot password | No |
| POST | `/student/reset-password` | Reset password | No |
| POST | `/admin/login` | Admin login | No |
| POST | `/admin/forgot-password` | Admin forgot password | No |
| GET | `/me` | Get current user profile | JWT |

### Student Routes (`/api/v1/students`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all students (paginated) | Admin |
| GET | `/profile` | Get student's own profile | Student JWT |
| GET | `/:id` | Get student by ID | Admin |
| PUT | `/profile` | Update own profile | Student JWT |
| DELETE | `/:id` | Delete student | Admin |
| GET | `/search` | Search students | Admin |
| GET | `/phase/:phaseId` | Get students by phase | Admin |
| GET | `/status/:status` | Get students by status | Admin |
| PATCH | `/:id/status` | Update student status | Admin |

### Registration Routes (`/api/v1/registration`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Submit registration form | No |
| GET | `/:id` | Get registration details | JWT |
| PUT | `/:id` | Update registration | JWT |
| GET | `/check-cnic/:cnic` | Check if CNIC already registered | No |

### Challan Routes (`/api/v1/challan`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/generate` | Generate challan PDF | JWT |
| GET | `/:challanNumber` | Get challan details | JWT |
| GET | `/download/:challanNumber` | Download challan PDF | JWT |

### Payment Routes (`/api/v1/payments`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/upload` | Upload paid challan image | JWT |
| GET | `/pending` | Get all pending payments | Admin |
| PATCH | `/verify/:studentId` | Verify payment | Admin |
| PATCH | `/reject/:studentId` | Reject payment | Admin |
| GET | `/stats` | Payment statistics | Admin |

### Roll No Slip Routes (`/api/v1/slips`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/my-slip` | Get own roll number slip | Student JWT |
| GET | `/download` | Download slip PDF | Student JWT |
| POST | `/generate/:studentId` | Admin generate slip | Admin |
| POST | `/generate-bulk` | Bulk generate slips | Admin |
| GET | `/all` | Get all slips | Admin |

### Test Routes (`/api/v1/test`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/instructions` | Get test instructions | Student JWT |
| POST | `/start` | Start test session | Student JWT |
| GET | `/question/:questionIndex` | Get next question | Student JWT |
| POST | `/answer` | Submit answer for current question | Student JWT |
| POST | `/flag-cheat` | Log anti-cheat event | Student JWT |
| POST | `/submit` | Submit entire test | Student JWT |
| GET | `/session` | Get current session status | Student JWT |
| GET | `/time-remaining` | Get remaining time | Student JWT |

### Question Routes (`/api/v1/questions`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all questions (paginated) | Admin |
| POST | `/` | Create question | Admin |
| GET | `/:id` | Get single question | Admin |
| PUT | `/:id` | Update question | Admin |
| DELETE | `/:id` | Delete question | Admin |
| POST | `/bulk-import` | Bulk import questions (CSV) | Admin |
| GET | `/phase/:phaseId` | Get questions by phase | Admin |
| GET | `/subject/:subjectId` | Get questions by subject | Admin |
| GET | `/count` | Question count by phase/subject | Admin |

### Result Routes (`/api/v1/results`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/my-result` | Get own result | Student JWT |
| GET | `/` | Get all results | Admin |
| GET | `/phase/:phaseId` | Phase-wise results | Admin |
| GET | `/merit-list/:phaseId` | Phase merit list | Public |
| GET | `/overall-merit` | Overall merit list | Public |
| GET | `/:studentId` | Student result | Admin |
| POST | `/generate/:phaseId` | Generate/compute results | Admin |
| PUT | `/:id` | Update result | Admin |
| GET | `/analytics/:phaseId` | Result analytics | Admin |

### Award Routes (`/api/v1/awards`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all awards | Public |
| GET | `/phase/:phaseId` | Phase-wise awards | Public |
| GET | `/winners` | All winners gallery | Public |
| POST | `/assign` | Assign awards to students | Admin |
| PATCH | `/:id/deliver` | Mark award as delivered | Admin |
| GET | `/my-award` | Get own award | Student JWT |

### Certificate Routes (`/api/v1/certificates`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/my-certificate` | Get own certificate | Student JWT |
| GET | `/download` | Download certificate PDF | Student JWT |
| GET | `/verify/:certificateNumber` | Verify certificate by QR | Public |
| POST | `/generate/:studentId` | Admin generate certificate | Admin |
| POST | `/generate-bulk/:phaseId` | Bulk generate certificates | Admin |
| GET | `/types` | Get certificate types | Public |

### Announcement Routes (`/api/v1/announcements`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all announcements (public) | No |
| GET | `/featured` | Get featured announcements | No |
| GET | `/:slug` | Get single announcement | No |
| POST | `/` | Create announcement | Admin |
| PUT | `/:id` | Update announcement | Admin |
| DELETE | `/:id` | Delete announcement | Admin |

### Syllabus Routes (`/api/v1/syllabus`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all syllabi | No |
| GET | `/phase/:phaseId` | Get syllabus by phase | No |
| GET | `/download/:phaseId` | Download syllabus PDF | No |
| POST | `/` | Create syllabus | Admin |
| PUT | `/:id` | Update syllabus | Admin |
| DELETE | `/:id` | Delete syllabus | Admin |

### FAQ Routes (`/api/v1/faqs`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all FAQs | No |
| GET | `/category/:category` | FAQs by category | No |
| POST | `/` | Create FAQ | Admin |
| PUT | `/:id` | Update FAQ | Admin |
| DELETE | `/:id` | Delete FAQ | Admin |

### Contact Routes (`/api/v1/contact`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Submit contact form | No |
| GET | `/` | Get all messages | Admin |
| PUT | `/:id/reply` | Reply to message | Admin |
| PATCH | `/:id/read` | Mark as read | Admin |

### Dashboard Routes (`/api/v1/dashboard`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/stats` | Overall dashboard stats | Admin |
| GET | `/registration-stats` | Registration statistics | Admin |
| GET | `/payment-stats` | Payment statistics | Admin |
| GET | `/test-stats` | Test statistics | Admin |
| GET | `/phase-stats` | Per-phase statistics | Admin |
| GET | `/recent-activity` | Recent activity log | Admin |

### Notification Routes (`/api/v1/notifications`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/my-notifications` | Get own notifications | Student JWT |
| PATCH | `/read/:id` | Mark notification as read | Student JWT |
| PATCH | `/read-all` | Mark all as read | Student JWT |
| POST | `/send` | Send notification | Admin |
| POST | `/broadcast` | Send broadcast to all | Admin |

---

## 🖥️ FRONTEND PAGES — DETAILED SPEC

### 🏠 1. HomePage (`/`)
**Sections (in order):**
- **Navbar** — Logo (left), Nav links (center), CTA Button "Apply Now" (right), Mobile hamburger menu
- **HeroSection** — Full-width banner with blue gradient overlay, heading "Unlocking Brilliance, Rewarding Talent", subheading, 2 CTAs: "Apply for Scholarship" and "View Announcements", animated particles or floating elements
- **StatsSection** — 4 animated counter cards: Total Students Registered, Awards Given, Scholarship Tests Conducted, Provinces Covered
- **PhasesSection** — 4 cards in grid, each showing: Phase name, Grade range, Laptop/Chromebook/Shield icons, "Learn More →" link
- **AwardsSection** — Highlighting awards: Laptops (4), Chromebooks (16), Shields (20), Certificates — with images and gold accent borders
- **HowItWorksSection** — 5-step process: Register → Get Challan → Pay Fee → Download Roll No Slip → Take Test — each step with icon, number, and brief text
- **AnnouncementsSection** — Latest 3 announcements with date, title, excerpt, "Read More" link
- **TestimonialsSection** — Carousel of past winners with photo, name, grade, quote
- **CTASection** — Full-width blue section: "Ready to Prove Your Talent?" heading, "Apply Now" button with gold styling
- **Footer** — Logo, quick links (6 columns: Quick Links, Phases, Resources, Legal, Contact, Social), copyright, "Developed by" credit

### 📄 2. AboutPage (`/about`)
- Hero banner with blue overlay
- Organization introduction paragraph
- Mission & Vision summary cards (linking to full pages)
- Core team section (placeholder)
- Stats counters
- Timeline / Milestones section

### 🎯 3. MissionPage (`/mission`)
- Full mission statement displayed elegantly
- Icon cards representing each mission point
- CTA: "Join Our Mission"

### 🔭 4. VisionPage (`/vision`)
- Full vision statement displayed elegantly
- Future goals / roadmap section
- CTA to apply

### 💎 5. ValuesPage (`/values`)
- Core values with icons: Merit-Based, Transparency, Equal Opportunity, Integrity, Innovation, Student First
- Each value with description paragraph

### 📢 6. AnnouncementsPage (`/announcements`)
- List/grid of all announcements with pagination
- Sidebar: categories/filters by phase
- Each card: image, title, date, excerpt, "Read More"
- Individual announcement detail page: `/announcements/:slug`

### 🎓 7. ScholarshipsPage (`/scholarships`)
- Phase-wise scholarship details (4 phases as expandable sections)
- Each section: eligibility criteria, awards breakdown, fee structure, test pattern
- Current/upcoming test dates
- "Apply Now" CTA

### ✍️ 8. ApplyNowPage (`/apply`) — ⭐ NEW (v1.1)
- **Hero banner:** "Apply for EduTalent Scholarship" with blue overlay
- **Before You Apply checklist:**
  - Read eligibility criteria (linked)
  - Check awards and benefits (linked)
  - Review test dates (linked)
  - Prepare scanned passport-size photo
  - Keep CNIC/B-Form ready
  - Have challan fee amount ready
- **Phase selection cards:** 4 phase cards, each showing grade range, awards, fee, "Register Now →" CTA
- **Important Notes section:** Alert boxes about one-attempt-only, fee non-refundable, camera/mic required
- **Registration steps reminder:** Step 1 → Step 2 → Step 3 → Step 4 → Step 5 visual flow
- **Bottom CTA:** "Ready? Click Here to Register" button (links to `/register`)

### 🔑 9. StudentLoginPage (`/login`) — ⭐ NEW (v1.1)
- Centered login card with EduTalent logo
- Registration Number + Password fields
- "Forgot Password?" link
- "Don't have an account? Register Now" link
- After login → redirects to student dashboard (Challan/Slip/Test based on status)

### 📝 10. SyllabusPage (`/syllabus`)
- Tab switcher for each Phase (1-4)
- Each tab: table of subjects with topic lists
- Download syllabus PDF button per phase
- Subject-wise MCQ count and weightage

### ⚠️ 11. TestRulesPage (`/test-rules`)
- Numbered list of all test rules with icons
- Anti-cheating policy summary
- Consequences for rule violations
- System requirements checklist

### 📅 12. DateSheetPage (`/datesheet`)
- Phase-wise test schedule table
- Columns: Phase, Test Date, Test Time, Duration
- Countdown timer to next test

### 📊 13. ResultsPage (`/results`)
- Phase selector dropdown
- Search by roll number
- Merit list table (filterable by phase)
- Position, Roll No, Name, Score, Percentage columns

### 🏅 14. MeritListPage (`/merit-list`)
- 4 phase tabs with full merit tables
- Highlighted top 10 with gold/green styling
- Download merit list PDF option

### 🏆 15. AwardsPage (`/awards`)
- Awards overview section
- Per-phase winner gallery (grid of cards)
- Each winner card: photo, name, grade, position, award type, school
- Hall of fame section
- **Success stories section** — Featured winners with detailed stories and quotes

### 📜 16. CertificatesPage (`/certificates`)
- Certificate types explanation (6 types)
- Certificate verification form (enter certificate number)
- Sample certificate display

### ❓ 17. FAQsPage (`/faqs`)
- Accordion-style expandable questions
- Categories: Registration, Test, Awards, Payment, General
- Search filter for questions
- **Pre-seeded with all 7 client FAQs:**
  1. Who can apply? → Any Pakistani student Grade 1 to University
  2. Is fee refundable? → No, according to policy
  3. Is the test online? → Yes, completely online
  4. Is camera required? → Yes, compulsory
  5. How will awards be delivered? → To verified home/school address
  6. Will I get a certificate? → Yes, digital certificate downloadable
  7. Can university students apply? → Yes, under Phase 4

### 📞 18. ContactPage (`/contact`)
- Two columns: Contact form (Name, Email, Phone, Subject, Message) + Contact info
- Contact info: Official Email, WhatsApp Number, Phone Number, Head Office Address, Social Media icons (Facebook, Instagram, Twitter, YouTube)
- Embedded Google Map (placeholder)

### 🔒 19. PrivacyPage (`/privacy`)
- Full privacy policy text
- Sections: Data collection (student data encrypted), data usage, storage (secured payments), user rights, deletion request available, camera/audio access only during test

### 📋 20. TermsPage (`/terms`)
- Full terms and conditions
- Sections: Fake info = disqualification, fee non-refundable, all decisions final, awards to verified address only, no misbehavior/cheating/manipulation

### 💰 21. RefundPage (`/refund`)
- Refund policy details
- Clearly state: fee once paid is non-refundable per policy

### 🛡️ 22. AntiCheatingPolicyPage (`/anti-cheating`)
- Anti-cheating measures explained: face tracking, eye movement, audio monitoring, tab switch detection, screen recording detection
- Types of violations: tab switch, face not visible, audio anomaly, screen recording detected
- Consequences: 1 warning, 2 warnings, 3rd = auto disqualification
- AI monitoring details
- Appeal process (if applicable)

### ✍️ 23. RegisterPage (`/register`) — Student Portal
- Multi-step form with progress indicator (5 steps)
- Step 1: Personal Info (Full Name, Father Name, CNIC/B-Form, Date of Birth)
- Step 2: Academic Info (Grade → Phase auto-select, School/College/University, Province → City dropdown)
- Step 3: Contact Info (Mobile Number, Email, Full Address)
- Step 4: Photo Upload (passport-size photo with preview, crop, Cloudinary upload)
- Step 5: Review & Submit (all info displayed for final review)
- **After submit:** Success page with Registration Number, "Download Challan" button, auto-generate challan PDF

### 🧾 24. ChallanDownloadPage (`/challan`) — Student Portal
- Login required (check status = "challan_issued")
- Show challan details: Student Name, Challan #, Fee Amount, Due Date, Bank Details
- **Challan preview** inline (student name, challan number, fee amount, payment deadline, bank details clearly visible)
- "Download Challan PDF" button (bold, blue)
- **"Upload Paid Challan" section** — file uploader with preview (image), status indicator
- Payment status badge: Pending (gold) / Verified (green) / Rejected (red)

### 🎫 25. RollNoSlipPage (`/slip`) — Student Portal
- Login required (check status = "slip_issued" or "payment_verified")
- Show roll number slip with all details:
  - Student Name, Father Name
  - Roll Number (e.g., "ETP-2025-P1-0001")
  - Test Date & Time
  - Phase Info
  - Test Username & Password (for test portal login)
  - Test Instructions summary
- "Download Slip PDF" button

### 💻 26. TestPortalPage (`/test`) — Student Portal — ⭐ UPDATED (v1.1)
- **Pre-test system check:**
  - Camera permission check (webcam preview shown)
  - Microphone permission check (audio level meter shown)
  - **Fullscreen enforcement:** `document.documentElement.requestFullscreen()` — exiting fullscreen = violation
  - Browser compatibility check
  - Internet stability check
  - "I agree to Test Rules" checkbox
- **Pre-test instructions:** Read test rules, anti-cheating policy, timer info, 100 MCQs, single attempt
- **"Start Test" button** — enters fullscreen mode, activates camera + mic
- **During test:**
  - **Fullscreen lock active** — ESC key disabled, F11 disabled, exiting fullscreen = auto violation logged
  - Question number indicator (e.g., "Question 5 of 100")
  - Per-question countdown timer (20-30 seconds) with visual urgency when <5 seconds
  - Question text with 4 option buttons (large, tappable on mobile)
  - Auto-advance to next question on answer selection OR on timeout (unattempted)
  - Animated progress bar (answered in green, skipped in red, remaining in gray)
  - Anti-cheat status indicator (camera dot green/red, mic dot green/red)
  - Tagged/violation counter badge
  - NO back navigation — once answered or timed out, cannot return to previous question
- **Anti-cheat monitoring (real-time):**
  1. **Face tracking:** Face detection via webcam — if face not visible > 5s → violation logged
  2. **Eye movement monitoring:** Detects suspicious eye movement patterns
  3. **Tab change detection:** `document.visibilitychange` API — switching tabs/apps → violation logged
  4. **Screen recording detection:** MediaRecorder API detection / screen capture API detection → violation logged
  5. **Audio monitoring:** Microphone audio analysis for voices/sounds → violation logged
  6. **Fullscreen exit detection:** Exiting fullscreen mode → immediate violation logged
  7. **Right-click / keyboard shortcut blocking:** Ctrl+C, Ctrl+V, PrintScreen, Alt+Tab blocked
  8. **3 violations → AUTO DISQUALIFICATION** — test immediately terminates, result marked as "disqualified"
- **Post-test:** "Test Submitted Successfully" message with preview of score (correct/wrong/unattempted), "View Full Result Later" note

### 📊 27. MyResultsPage (`/my-results`) — Student Portal
- Score card: Total Marks, Obtained Marks, Percentage
- Position/Rank badge (Phase rank + Overall rank)
- Subject-wise breakdown table: Subject, Total, Correct, Wrong, Unattempted
- Award info (if applicable): Award Type, Delivery Status, Tracking Number
- "Download Certificate" button (if available)

### 📜 28. MyCertificatesPage (`/my-certificates`) — Student Portal
- List of earned certificates with cards
- Each card: Certificate Type (1st Position / Top 5 / Shield / Top 20 / Appreciation / Participation), Issue Date, QR Code, "Download PDF" button
- QR code verification display

### 👤 29. ProfilePage (`/profile`) — Student Portal
- View/edit personal information (Name, Father Name, CNIC, DOB, Grade, School, Province, City, Mobile, Email, Address)
- Photo update
- Change password
- Application history timeline
- Data deletion request button

---

## 🔐 ADMIN DASHBOARD PAGES

### 1. AdminLoginPage (`/admin/login`)
- Centered login card with EduTalent logo
- Email + Password fields
- "Forgot Password?" link
- Blue + Gold styling

### 2. AdminDashboardPage (`/admin/dashboard`)
- **Stats Cards Row:** Total Students, Pending Payments, Tests Completed, Results Published, Awards Assigned
- **Quick Actions:** Verify Payments, Generate Slips, Publish Results, Send Notifications
- **Charts:**
  - Registration by province (bar chart)
  - Registration by phase (pie chart)
  - Daily registration trend (line chart)
  - Payment verification status (doughnut chart)
- **Recent Activity Table:** latest registrations, payments, test completions
- **Phase-wise Stats Card**

### 3. StudentsManagementPage (`/admin/students`)
- Search/filter bar (by name, CNIC, roll number, phase, province, status)
- Data table with columns: Name, CNIC, Phase, Province, Status, Registration Date, Actions
- Bulk action: Export CSV
- Individual actions: View details modal, Edit, Delete
- Pagination

### 4. FeeVerificationPage (`/admin/fee-verification`)
- Three tabs: Pending Payments | Verified Payments | Rejected
- Each row: Student Name, Challan #, Amount, Uploaded Image (click to view modal), Upload Date, Action buttons (Verify ✅ / Reject ❌)
- Bulk verify option (select multiple → verify all)
- Filter by phase, date range
- Reason field when rejecting a payment

### 5. SlipManagementPage (`/admin/slips`)
- Phase-wise generate slips
- Bulk generate: "Generate All Slips for Phase X"
- Individual generate per student
- Slips table with status, download option

### 6. TestManagementPage (`/admin/tests`)
- **Questions Tab:**
  - Question bank table with filter (phase, subject, difficulty)
  - Add/Edit/Delete question modal
  - Bulk import CSV
- **Sessions Tab:**
  - Active test sessions monitor
  - View session details including anti-cheat logs
  - Terminate session option
- **Settings Tab:**
  - Test timings per phase
  - Per-question timer setting

### 7. ResultsPage — Admin (`/admin/results`)
- Phase selector
- "Generate Results" button per phase (runs auto-grading)
- Merit list table with sorting
- Publish/Unpublish results
- Export results as PDF/CSV

### 8. AwardAssignmentPage (`/admin/awards`)
- Phase-wise merit list with auto-assigned awards
- Manual award override option
- Mark as "Delivered" with tracking number
- Award distribution status tracker

### 9. NotificationsPage (`/admin/notifications`)
- Compose notification form (title, message, target: all/phase-specific/single student)
- History of sent notifications
- Email/SMS delivery status

### 10. LogsReportsPage (`/admin/logs`)
- Activity logs with filters
- Export logs as CSV
- Reports: Registration report, Payment report, Test report, Award report

---

## 🔄 CORE BUSINESS FLOWS

### FLOW 1: Student Registration & Challan
```
1. Student visits website → Reads Announcement
2. Clicks "Apply Now" → Registration Form opens
3. Fills 5-step form → Submits
4. System creates Student record (status: "registered")
5. System auto-generates:
   - Unique Registration Number
   - Challan PDF (with name, challan #, amount, bank details, due date)
   - Saves to Cloudinary
   - Status → "challan_issued"
6. Student downloads challan PDF
7. Student pays fee at bank
8. Student returns to portal → Uploads paid challan image
9. Status → "payment_pending"
10. Admin verifies challan → marks "payment_verified"
11. Status → "payment_verified"
```

### FLOW 2: Roll No Slip Generation (Auto after Payment)
```
1. Payment verified by admin → system trigger fires
   (OR: System can be configured for auto-generation upon payment verification)
2. System for each verified student automatically:
   - Generates unique Roll Number (e.g., "ETP-2025-P1-0001")
   - Creates test portal username & password
   - Assigns test date/time (from date sheet config)
   - Generates Slip PDF with all details
   - Saves to Cloudinary
   - Sends email notification to student: "Your Roll No Slip is Ready!"
3. Student status → "slip_issued"
4. Student logs in → views/downloads roll number slip from dashboard
5. Admin can also trigger bulk generation from SlipManagementPage if needed
```

### FLOW 3: Online Test Execution (with Fullscreen Lock)
```
1. Student logs into test portal (credentials from slip)
2. System runs pre-test checks: camera ✓, mic ✓, fullscreen ✓
3. Student reads test instructions page
4. Student clicks "Start Test" → enters FULLSCREEN MODE (requestFullscreen API)
5. System creates TestSession record (status: "in_progress")
6. System randomizes and presents 100 MCQs (phase-wise, one at a time)
7. Each MCQ:
   - Displays question with 4 options (large, tappable buttons)
   - Starts 20-30 second per-question countdown timer
   - Student selects answer → auto-saves & advances to next question
   - If time expires → auto-advances (marked as "unattempted")
   - NO back navigation (previous questions non-accessible)
8. Real-time anti-cheat monitoring (ALL active simultaneously):
   - Face detection via webcam (face must be visible at all times)
   - Eye movement monitoring (suspicious patterns detected)
   - Tab change detection (visibilitychange API)
   - Screen recording detection (MediaRecorder API / Screen Capture API)
   - Fullscreen exit detection (ESC key, F11 blocked — exit = immediate violation)
   - Microphone audio monitoring (voices/sounds detected)
   - Right-click, Ctrl+C, Ctrl+V, PrintScreen, Alt+Tab ALL blocked
   - Each violation → logged to antiCheatLogs with timestamp
   - 3 violations → AUTO DISQUALIFICATION (test terminates, status: "disqualified")
9. After last question (#100) → "Test Submitted Successfully" screen
   (OR after auto-advance from timeout on last question)
10. System calculates:
    - Correct / Wrong / Unattempted count
    - Score: (correct × 1 mark each) = out of 100
    - Percentage: (score / 100) × 100
    - Total time taken
    - Subject-wise breakdown
    - Saves TestResult document
    - Student status → "test_completed"
11. Fullscreen mode exits, camera/mic released
```

### FLOW 4: Merit List & Awards
```
1. Admin clicks "Generate Results" for a phase
2. System:
   - Fetches all TestResults for phase
   - Sorts by score (descending), then by time taken (ascending)
   - Assigns phase rank to each student
   - Marks merit qualified: top 10
   - Auto-assigns awards:
     • Rank 1 → "laptop"
     • Rank 2-5 → "chromebook"
     • Rank 6-10 → "shield"
     • Rank 11-20 → "appreciation_certificate"
     • Rest → "participation_certificate"
3. System generates certificates for all students
4. Admin reviews → clicks "Publish Results"
5. Email notifications sent to all students
6. Students can view results and download certificates
```

---

## 🎨 UI/UX GUIDELINES

### Color Usage
| Usage | Color | HEX |
|-------|-------|-----|
| Primary buttons, links, header/navbar | Royal Blue | `#1A73E8` |
| Success indicators, verified badges | Emerald Green | `#2ECC71` |
| Awards, 1st position badges, gold borders | Gold | `#F1C40F` |
| Background, cards | White | `#FFFFFF` |
| Text primary | Dark Gray | `#1F2937` |
| Text secondary | Gray | `#6B7280` |
| Borders, dividers | Light Gray | `#E5E7EB` |
| Error / danger | Red | `#EF4444` |
| Warning | Amber | `#F59E0B` |

### Typography
- Headings: Inter Bold / Poppins Bold
- Body: Inter Regular
- Font sizes responsive (Tailwind default scale)

### Branding Elements
- Logo in navbar (header) + footer
- Gold ribbons/gradients on award sections
- Pakistan crescent star element used subtly in page decorations
- Phase cards with colored borders matching phase identity

### Responsive Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl, 2xl)

### Accessibility
- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigable
- Sufficient color contrast
- Alt text on all images
- focus-visible outlines

---

## 🔧 IMPLEMENTATION PHASES (Build Order)

### PHASE 1: Project Setup (Day 1-2)
- [ ] Initialize React project with Vite
- [ ] Install & configure Tailwind CSS
- [ ] Set up React Router with all routes
- [ ] Create Layout component (Navbar + Footer)
- [ ] Initialize Node.js Express project
- [ ] Set up MongoDB connection (config/db.js)
- [ ] Set up Cloudinary configuration
- [ ] Create all MongoDB models (Mongoose schemas)
- [ ] Set up environment variables (.env)
- [ ] Create color constants and theme configuration
- [ ] Create logo (SVG/PNG)

### PHASE 2: Public Pages (Day 3-7)
- [ ] HomePage with all sections
- [ ] About Page
- [ ] Mission Page
- [ ] Vision Page
- [ ] Values Page
- [ ] Announcements Page + Detail
- [ ] Scholarships Page
- [ ] **Apply Now Page** ⭐ (eligibility intro, phase selector, pre-registration checklist)
- [ ] **Student Login Page** ⭐
- [ ] Syllabus Page
- [ ] Test Rules Page
- [ ] Date Sheet Page
- [ ] FAQs Page
- [ ] Contact Page
- [ ] Privacy Page
- [ ] Terms Page
- [ ] Refund Page
- [ ] Anti-Cheating Policy Page

### PHASE 3: Auth & Registration Backend (Day 8-10)
- [ ] JWT auth middleware for student
- [ ] JWT auth middleware for admin
- [ ] Student registration API
- [ ] Student login API
- [ ] Admin login API
- [ ] Forgot/Reset password APIs
- [ ] All student CRUD APIs
- [ ] CNIC duplicate check API

### PHASE 4: Registration Frontend (Day 11-12)
- [ ] Multi-step registration form (5 steps)
- [ ] Photo upload with Cloudinary integration
- [ ] Form validation (client-side)
- [ ] Registration success page
- [ ] Student login page
- [ ] Student profile page

### PHASE 5: Challan System (Day 13-15)
- [ ] Challan generation API (PDFKit)
- [ ] Challan model & controller
- [ ] Challan download endpoint
- [ ] Paid challan upload API (Cloudinary)
- [ ] Challan preview component
- [ ] Challan download page (frontend)
- [ ] Payment verification admin page

### PHASE 6: Roll No Slip System (Day 16-17)
- [ ] Roll number generation algorithm
- [ ] Slip PDF generation (PDFKit)
- [ ] Slip API endpoints
- [ ] Roll No Slip frontend page
- [ ] Admin slip management page

### PHASE 7: Question Bank Management (Day 18-20)
- [ ] Question CRUD APIs
- [ ] Bulk import CSV API
- [ ] Admin question management interface
- [ ] Seed data: 100 questions per phase (400 total)
- [ ] Subject-wise question distribution

### PHASE 8: Online Test System (Day 21-25)
- [ ] Test session creation API
- [ ] Question delivery API (one at a time, randomized)
- [ ] Answer submission API (per question)
- [ ] Timer synchronization (server-side validation of timestamps)
- [ ] Anti-cheat logging API (all 7 event types)
- [ ] Test submission & auto-grading API
- [ ] Test portal frontend:
  - Pre-test system check (camera + mic + fullscreen permissions)
  - **Fullscreen enforcement** (requestFullscreen API, ESC/F11 blocked, exit detection)
  - MCQ display with 4 large option buttons (touch-friendly)
  - Per-question countdown timer (visual urgency when < 5 seconds)
  - Progress tracker (answered/unanswered/remaining)
  - Anti-cheat status indicators (camera dot, mic dot, violation counter)
  - Post-test submission screen
- [ ] Camera access (navigator.mediaDevices.getUserMedia) with face detection
- [ ] Tab change detection (document.visibilitychange API)
- [ ] **Screen recording detection** (MediaRecorder API / Screen Capture API monitoring)
- [ ] **Fullscreen exit detection** (document.fullscreenchange event listener)
- [ ] Audio monitoring via Web Audio API (voice/sound detection)
- [ ] Keyboard shortcut blocking (Ctrl+C, Ctrl+V, Alt+Tab, PrintScreen, right-click)
- [ ] 3 violations = auto disqualification logic

### PHASE 9: Result & Merit System (Day 26-28)
- [ ] Result calculation engine
- [ ] Merit list generation (sorting + ranking)
- [ ] Auto award assignment
- [ ] Public results page
- [ ] Merit list page with phase tabs
- [ ] Student's "My Results" page

### PHASE 10: Certificates System (Day 29-30)
- [ ] Certificate PDF generation (PDFKit with QR)
- [ ] QR code generation
- [ ] Certificate types (6 types)
- [ ] Certificate download API
- [ ] Certificate verification API
- [ ] Certificates public page
- [ ] Student's "My Certificates" page

### PHASE 11: Awards & Winners (Day 31-32)
- [ ] Awards display page (public)
- [ ] Winners gallery
- [ ] Award assignment admin page
- [ ] Award delivery tracking

### PHASE 12: Admin Dashboard (Day 33-36)
- [ ] Admin login page
- [ ] Dashboard stats cards + charts
- [ ] Students management page
- [ ] Fee verification page
- [ ] Slip management page
- [ ] Test management (questions + sessions)
- [ ] Results management page
- [ ] Award assignment page
- [ ] Notifications page
- [ ] Logs & reports page

### PHASE 13: Polish & Deploy (Day 37-40)
- [ ] Loading states / skeletons
- [ ] Error boundaries
- [ ] 404 page
- [ ] SEO meta tags
- [ ] Sitemap
- [ ] robots.txt
- [ ] Performance optimization (lazy loading, image optimization)
- [ ] Final testing (all flows)
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render / Railway
- [ ] Connect custom domain

---

## 📝 ENVIRONMENT VARIABLES (.env)

```env
# SERVER
PORT=5000
NODE_ENV=development

# MONGODB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/edutalent-pakistan

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
JWT_ADMIN_SECRET=your_admin_jwt_secret_key_here
JWT_ADMIN_EXPIRE=30d

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# EMAIL (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# FRONTEND URL
CLIENT_URL=http://localhost:5173

# TEST CONFIG
MAX_QUESTIONS_PER_TEST=100
DEFAULT_TIME_PER_QUESTION=25
MAX_CHEAT_VIOLATIONS=3
```

---

## ❗ CRITICAL BUSINESS RULES

1. **One student = One registration** — CNIC/B-Form uniqueness enforced
2. **Phase auto-detection** — Based on grade input (Grade 1-5 → Phase 1, Grade 6-8 → Phase 2, Grade 9-10 → Phase 3, Grade 11-12 + Uni → Phase 4)
3. **Fee non-refundable** — Clearly stated in policy and on Apply Now page
4. **Payment verification required** before slip generation (auto-generated upon payment verification)
5. **Single test attempt only** — No retakes, no exceptions
6. **Anti-cheat violations ≥ 3** → Auto-disqualification with status "disqualified"
7. **Each MCQ timed individually** — 20-30 seconds per question, not cumulative
8. **No back navigation** during test — Once answered or timed out, cannot revisit
9. **Auto-submit on timeout** — If student doesn't answer within time limit, marked as unattempted, advances to next
10. **Fullscreen lock enforced** — Test runs in fullscreen mode, exiting = violation, ESC/F11/Alt+Tab blocked
11. **Screen recording detection** — Any screen recording attempt = violation logged
12. **Merit list auto-generation** — Based on score (highest first), tie-breaker on time taken (lesser first)
13. **Awards phase-specific** — Per phase: 1 Laptop, 4 Chromebooks, 5 Shields, 20 Certificates (top 20), rest get participation
14. **Certificate for ALL test-takers** — Even non-winners get participation certificates with QR verification
15. **Data deletion** — Students can request data deletion via profile page
16. **Admin roles** — Super admin can manage other admin accounts
17. **Contact form** — Saves to DB, requires admin reply from dashboard
18. **Challan auto-generation** — System creates challan PDF immediately after registration submission
19. **Roll number slip** — System auto-generates when payment is verified
20. **Apply Now is SEPARATE page** — `/apply` introduces scholarship, shows eligibility, then links to `/register` form

---

## 📱 RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Target |
|------------|-------|--------|
| sm | 640px | Mobile phones |
| md | 768px | Tablets portrait |
| lg | 1024px | Tablets landscape / Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large displays |

---

## ✅ COMPLETION CHECKLIST

### Public Pages (22)
- [ ] Home Page
- [ ] About Page
- [ ] Mission Page
- [ ] Vision Page
- [ ] Values Page
- [ ] Announcements Page
- [ ] Scholarships Page
- [ ] Apply Now Page ⭐ NEW
- [ ] Student Login Page ⭐ NEW
- [ ] Syllabus Page
- [ ] Test Rules Page
- [ ] Date Sheet Page
- [ ] Results Page
- [ ] Merit List Page
- [ ] Awards Page (with Winners Gallery + Success Stories)
- [ ] Certificates Page (with QR Verification)
- [ ] FAQs Page (all 7 client questions)
- [ ] Contact Page (with all details)
- [ ] Privacy Page
- [ ] Terms Page
- [ ] Refund Page
- [ ] Anti-Cheating Policy Page

### Student Portal Pages (9)
- [ ] Register Page (5-step form with live validation)
- [ ] Registration Success Page (with challan download)
- [ ] Challan Download Page
- [ ] Roll No Slip Page
- [ ] Test Portal Page (MCQ + Timer + Fullscreen + Anti-cheat)
- [ ] My Results Page
- [ ] My Certificates Page
- [ ] Student Login Page
- [ ] Student Profile Page

### Admin Dashboard Pages (10)
- [ ] Admin Login Page
- [ ] Dashboard (Stats + Charts)
- [ ] Students Management
- [ ] Fee Verification
- [ ] Slip Management
- [ ] Test Management (Questions + Sessions)
- [ ] Results Management
- [ ] Award Assignment
- [ ] Notifications
- [ ] Logs & Reports

### Backend APIs
- [ ] All routes, controllers, models implemented
- [ ] JWT auth working
- [ ] Cloudinary uploads working
- [ ] PDF generation working (challan, slip, certificate)
- [ ] QR code generation working
- [ ] Email notifications working
- [ ] Anti-cheat logging working
- [ ] Result calculation engine working
- [ ] Merit list generation working

### Core Flows Tested
- [ ] Full registration to result flow working end-to-end
- [ ] All 4 phases working correctly
- [ ] Mobile responsive on all pages

---

## 🚀 DEPLOYMENT PLAN

| Service | Platform | Plan | Cost |
|---------|----------|------|------|
| Frontend (React) | Vercel | Hobby | FREE |
| Backend (Node.js) | Render | Free Tier | FREE |
| Database (MongoDB) | MongoDB Atlas | M0 Free | FREE |
| File Storage | Cloudinary | Free Tier | FREE |
| Domain | Namecheap / GoDaddy | .com domain | ~$10/year |

**Total Monthly Cost: $0** (for development and early production)

---

## 📌 NOTES FOR AI AGENT EXECUTION

1. Build all pages in the order specified in IMPLEMENTATION PHASES
2. Start with project setup and MongoDB models
3. Create backend APIs BEFORE frontend pages that consume them
4. Use mock/seed data for frontend development where backend isn't ready yet
5. Follow the color scheme strictly: `#1A73E8`, `#2ECC71`, `#F1C40F`, `#FFFFFF`
6. Every page must be fully responsive (mobile-first)
7. Include loading skeletons and error states in every data-fetching component
8. All student-facing forms must have client-side AND server-side validation
9. Use `const` for variables, ES6+ syntax, async/await for promises
10. No placeholder/lorem ipsum text — use the exact text provided in this document
11. **Apply Now page (`/apply`)** MUST be a separate page, NOT just a redirect to registration
12. **Student Login page (`/login`)** MUST be accessible from public navbar (not hidden)
13. **Fullscreen enforcement** is MANDATORY during test — use `requestFullscreen()` API
14. **Screen recording detection** MUST be implemented — check MediaRecorder/Screen Capture APIs
15. **7 client FAQs** MUST be pre-seeded in the database (not placeholders)
16. **Contact page** MUST include all details: Email, WhatsApp, Phone, Address, Social links
17. **QR code** MUST be placed on every certificate for verification
18. **Roll number slip** SHOULD auto-generate upon payment verification
19. **All PDFs** (challan, slip, certificate) must be well-formatted and printable

---

## 🔗 QUICK REFERENCE LINKS

| Resource | URL |
|----------|-----|
| Tailwind CSS Docs | https://tailwindcss.com/docs |
| Mongoose Docs | https://mongoosejs.com/docs/ |
| Cloudinary Node SDK | https://cloudinary.com/documentation/node_integration |
| React Router v6 | https://reactrouter.com/en/main |
| Vite Docs | https://vitejs.dev/guide/ |
| PDFKit Docs | https://pdfkit.org/docs/ |
| Lucide Icons | https://lucide.dev/icons/ |

---

**📅 Last Updated:** July 11, 2026
**📌 Version:** 1.1 — FIXED: Missing ApplyNow page, StudentLogin page, Fullscreen enforcement, Screen recording detection, Page count bugs, Roll no slip auto-generation

---

## 📋 CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | July 11, 2026 | Initial complete blueprint |
| v1.1 | July 11, 2026 | Fixed 8 gaps: Added ApplyNow page, StudentLogin page, Fullscreen enforcement, Screen recording detection, fixed page counts (17→22, 7→9), roll no slip auto-generation, updated test flow with fullscreen lock, updated critical business rules (15→20 rules) |
