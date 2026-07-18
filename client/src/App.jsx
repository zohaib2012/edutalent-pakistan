import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import MissionPage from './pages/public/MissionPage';
import VisionPage from './pages/public/VisionPage';
import ValuesPage from './pages/public/ValuesPage';
import AnnouncementsPage from './pages/public/AnnouncementsPage';
import ScholarshipsPage from './pages/public/ScholarshipsPage';
import ApplyNowPage from './pages/public/ApplyNowPage';
import StudentLoginPage from './pages/public/StudentLoginPage';
import SyllabusPage from './pages/public/SyllabusPage';
import TestRulesPage from './pages/public/TestRulesPage';
import DemoTestPage from './pages/public/DemoTestPage';
import DateSheetPage from './pages/public/DateSheetPage';
import ResultsPage from './pages/public/ResultsPage';
import MeritListPage from './pages/public/MeritListPage';
import AwardsPage from './pages/public/AwardsPage';
import CertificatesPage from './pages/public/CertificatesPage';
import FAQsPage from './pages/public/FAQsPage';
import ContactPage from './pages/public/ContactPage';
import PrivacyPage from './pages/public/PrivacyPage';
import TermsPage from './pages/public/TermsPage';
import RefundPage from './pages/public/RefundPage';
import AntiCheatingPolicyPage from './pages/public/AntiCheatingPolicyPage';
import FindChallanPage from './pages/public/FindChallanPage';
import TrackJourneyPage from './pages/public/TrackJourneyPage';
import FindCertificatePage from './pages/public/FindCertificatePage';
import FindSlipPage from './pages/public/FindSlipPage';
import WinnersPage from './pages/public/WinnersPage';
import AnnouncementDetailPage from './pages/public/AnnouncementDetailPage';

import RegisterPage from './pages/student/RegisterPage';
import RegistrationSuccessPage from './pages/student/RegistrationSuccessPage';
import ChallanDownloadPage from './pages/student/ChallanDownloadPage';
import RollNoSlipPage from './pages/student/RollNoSlipPage';
import TestPortalPage from './pages/student/TestPortalPage';
import MyResultsPage from './pages/student/MyResultsPage';
import MyCertificatesPage from './pages/student/MyCertificatesPage';
import ProfilePage from './pages/student/ProfilePage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import StudentsManagementPage from './pages/admin/StudentsManagementPage';
import FeeVerificationPage from './pages/admin/FeeVerificationPage';
import SlipManagementPage from './pages/admin/SlipManagementPage';
import TestManagementPage from './pages/admin/TestManagementPage';
import AdminResultsPage from './pages/admin/AdminResultsPage';
import AwardAssignmentPage from './pages/admin/AwardAssignmentPage';
import NotificationsPage from './pages/admin/NotificationsPage';
import LogsReportsPage from './pages/admin/LogsReportsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminCertificatesPage from './pages/admin/AdminCertificatesPage';
import AdminDocumentsPage from './pages/admin/AdminDocumentsPage';
import AdminAnnouncementsPage from './pages/admin/AdminAnnouncementsPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/mission" element={<Layout><MissionPage /></Layout>} />
        <Route path="/vision" element={<Layout><VisionPage /></Layout>} />
        <Route path="/values" element={<Layout><ValuesPage /></Layout>} />
        <Route path="/announcements" element={<Layout><AnnouncementsPage /></Layout>} />
        <Route path="/announcements/:slug" element={<Layout><AnnouncementDetailPage /></Layout>} />
        <Route path="/scholarships" element={<Layout><ScholarshipsPage /></Layout>} />
        <Route path="/apply" element={<Layout><ApplyNowPage /></Layout>} />
        <Route path="/login" element={<Layout><StudentLoginPage /></Layout>} />
        <Route path="/syllabus" element={<Layout><SyllabusPage /></Layout>} />
        <Route path="/test-rules" element={<Layout><TestRulesPage /></Layout>} />
        <Route path="/demo-test" element={<Layout><DemoTestPage /></Layout>} />
        <Route path="/datesheet" element={<Layout><DateSheetPage /></Layout>} />
        <Route path="/results" element={<Layout><ResultsPage /></Layout>} />
        <Route path="/merit-list" element={<Layout><MeritListPage /></Layout>} />
        <Route path="/awards" element={<Layout><AwardsPage /></Layout>} />
        <Route path="/certificates" element={<Layout><CertificatesPage /></Layout>} />
        <Route path="/faqs" element={<Layout><FAQsPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
        <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
        <Route path="/refund" element={<Layout><RefundPage /></Layout>} />
        <Route path="/anti-cheating" element={<Layout><AntiCheatingPolicyPage /></Layout>} />
        <Route path="/find-challan" element={<Layout><FindChallanPage /></Layout>} />
        <Route path="/track-journey" element={<Layout><TrackJourneyPage /></Layout>} />
        <Route path="/find-certificate" element={<Layout><FindCertificatePage /></Layout>} />
        <Route path="/find-slip" element={<Layout><FindSlipPage /></Layout>} />
        <Route path="/winners" element={<Layout><WinnersPage /></Layout>} />

        <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
        <Route path="/registration-success" element={<Layout><RegistrationSuccessPage /></Layout>} />
        <Route path="/challan" element={<Layout><ChallanDownloadPage /></Layout>} />
        <Route path="/slip" element={<Layout><RollNoSlipPage /></Layout>} />
        <Route path="/test" element={<Layout><TestPortalPage /></Layout>} />
        <Route path="/my-results" element={<Layout><MyResultsPage /></Layout>} />
        <Route path="/my-certificates" element={<Layout><MyCertificatesPage /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/students" element={<StudentsManagementPage />} />
        <Route path="/admin/fee-verification" element={<FeeVerificationPage />} />
        <Route path="/admin/slips" element={<SlipManagementPage />} />
        <Route path="/admin/tests" element={<TestManagementPage />} />
        <Route path="/admin/results" element={<AdminResultsPage />} />
        <Route path="/admin/awards" element={<AwardAssignmentPage />} />
        <Route path="/admin/notifications" element={<NotificationsPage />} />
        <Route path="/admin/logs" element={<LogsReportsPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
        <Route path="/admin/certificate-mgmt" element={<AdminCertificatesPage />} />
        <Route path="/admin/documents" element={<AdminDocumentsPage />} />
        <Route path="/admin/announcements-mgmt" element={<AdminAnnouncementsPage />} />
        <Route path="/admin/applications" element={<AdminApplicationsPage />} />

        <Route path="*" element={<Layout><div className="min-h-[60vh] flex items-center justify-center"><div className="text-center"><h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1><p className="text-gray-600 text-lg">Page not found</p></div></div></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
