import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Megaphone, Clock } from 'lucide-react';

const announcements = [
  { slug: 'scholarship-test-2025-announced', date: 'July 15, 2025', title: 'Scholarship Test 2025 Announced', excerpt: 'Applications are now open for all phases. Last date to apply is August 15, 2025. Register now to secure your spot.', gradient: 'from-primary to-primary-600', content: 'We are thrilled to announce the opening of applications for the EduTalent Pakistan Scholarship Test 2025. This year, we have expanded our reach to all four phases covering students from Grade 1 to University level. The test will be conducted online with state-of-the-art proctoring technology to ensure fairness and transparency. All eligible students across Pakistan are encouraged to apply before the deadline. Detailed guidelines, syllabus, and test schedules are available on our website. Don\'t miss this opportunity to win laptops, Chromebooks, shields, and certificates!' },
  { slug: 'phase-3-4-syllabus-updated', date: 'July 10, 2025', title: 'Phase 3 & 4 Syllabus Updated', excerpt: 'The syllabus for Phase 3 (Matric) and Phase 4 (Senior) has been revised. Check the syllabus page for details.', gradient: 'from-emerald-500 to-emerald-600', content: 'The syllabus for Phase 3 (Matric Level — Grades 9-10) and Phase 4 (Senior Level — Grade 11-12 & University) has been revised to better align with national curriculum standards. Key changes include updated topic distributions, increased focus on analytical reasoning, and revised weightage for certain subjects. Students are advised to review the updated syllabus thoroughly before preparing for the test. Visit the Syllabus page for a detailed breakdown of each subject, topic list, MCQs count, and weightage percentages.' },
  { slug: 'new-award-categories-introduced', date: 'July 5, 2025', title: 'New Award Categories Introduced', excerpt: 'We are excited to announce additional Chromebook awards for top performers in each phase.', gradient: 'from-purple-500 to-purple-600', content: 'EduTalent Pakistan is proud to introduce enhanced award categories for the 2025 scholarship cycle. In addition to our existing laptop, Chromebook, shield, and certificate awards, we have expanded the number of Chromebook awards for outstanding performers in each phase. This expansion reflects our commitment to recognizing and rewarding academic excellence at all levels. Winners will be announced after the successful completion of the test and evaluation process.' },
  { slug: 'test-centers-online-guidelines', date: 'June 28, 2025', title: 'Test Centers & Online Guidelines', excerpt: 'Detailed guidelines for online test proctoring have been released. Read the test rules carefully.', gradient: 'from-gold to-yellow-600', content: 'Detailed guidelines for the online scholarship test have been released. All students must ensure they have a stable internet connection, a working webcam, and a microphone. The test will be monitored through live proctoring with AI-based anti-cheating measures. Students are required to follow all guidelines strictly. Any violation of the test rules may result in disqualification. Please read the complete Test Rules page and Anti-Cheating Policy before appearing for the exam.' },
  { slug: 'registration-portal-now-open', date: 'June 20, 2025', title: 'Registration Portal Now Open', excerpt: 'The registration portal for the 2025 scholarship cycle is now live. Early bird registrations are encouraged.', gradient: 'from-blue-500 to-blue-600', content: 'The registration portal for EduTalent Pakistan Scholarship 2025 is now open! Students across Pakistan can register online through our website. Early bird registrations are encouraged to secure your preferred test slot. The registration process is simple: fill in your personal and academic details, upload required documents, pay the fee through bank challan, and upload the receipt. Once verified, you will receive your roll number slip with login credentials for the online test.' },
  { slug: 'date-sheet-2025-released', date: 'June 15, 2025', title: 'Date Sheet for 2025 Released', excerpt: 'The complete test date schedule for all four phases has been published on the Date Sheet page.', gradient: 'from-rose-500 to-rose-600', content: 'The complete date sheet for EduTalent Pakistan Scholarship Test 2025 has been released. Phase 1 and Phase 2 tests will be held on August 24, 2025, while Phase 3 and Phase 4 tests will be conducted on August 25, 2025. Detailed timing for each phase is available on the Date Sheet page. Students are advised to mark their calendars and prepare accordingly. Any changes to the schedule will be communicated through official announcements on this page.' },
];

const AnnouncementDetailPage = () => {
  const { slug } = useParams();
  const announcement = announcements.find(a => a.slug === slug);

  if (!announcement) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Megaphone size={48} className="text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-gray-700 mb-2">Announcement Not Found</h1>
          <p className="text-gray-500 mb-6">The announcement you are looking for does not exist or has been removed.</p>
          <Link to="/announcements" className="btn-primary">Back to Announcements</Link>
        </div>
      </div>
    );
  }

  const contentParagraphs = announcement.content.split('. ').filter(p => p.trim());

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/announcements" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Announcements
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-4">
            <Calendar size={14} className="text-gold" />
            <span>{announcement.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">{announcement.title}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl">{announcement.excerpt}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
            <div className="prose prose-gray max-w-none">
              {contentParagraphs.map((para, i) => (
                <p key={i} className="text-gray-700 text-base leading-relaxed mb-4">{para}.</p>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
              <Link to="/announcements" className="btn-outline text-sm">
                <ArrowLeft size={16} /> All Announcements
              </Link>
              <Link to="/apply" className="btn-primary text-sm">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnnouncementDetailPage;
