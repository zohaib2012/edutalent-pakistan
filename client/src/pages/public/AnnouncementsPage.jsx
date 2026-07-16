import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Megaphone } from 'lucide-react';

const announcements = [
  { date: 'July 15, 2025', title: 'Scholarship Test 2025 Announced', excerpt: 'Applications are now open for all phases. Last date to apply is August 15, 2025. Register now to secure your spot.', gradient: 'from-primary to-primary-600' },
  { date: 'July 10, 2025', title: 'Phase 3 & 4 Syllabus Updated', excerpt: 'The syllabus for Phase 3 (Matric) and Phase 4 (Senior) has been revised. Check the syllabus page for details.', gradient: 'from-emerald-500 to-emerald-600' },
  { date: 'July 5, 2025', title: 'New Award Categories Introduced', excerpt: 'We are excited to announce additional Chromebook awards for top performers in each phase.', gradient: 'from-purple-500 to-purple-600' },
  { date: 'June 28, 2025', title: 'Test Centers & Online Guidelines', excerpt: 'Detailed guidelines for online test proctoring have been released. Read the test rules carefully.', gradient: 'from-gold to-yellow-600' },
  { date: 'June 20, 2025', title: 'Registration Portal Now Open', excerpt: 'The registration portal for the 2025 scholarship cycle is now live. Early bird registrations are encouraged.', gradient: 'from-blue-500 to-blue-600' },
  { date: 'June 15, 2025', title: 'Date Sheet for 2025 Released', excerpt: 'The complete test date schedule for all four phases has been published on the Date Sheet page.', gradient: 'from-rose-500 to-rose-600' },
];

const ITEMS_PER_PAGE = 4;

const AnnouncementsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);
  const paginated = announcements.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Megaphone size={36} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Announcements</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Stay updated with the latest scholarship programs and test schedules.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {paginated.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col md:flex-row">
                <div className={`bg-gradient-to-r ${item.gradient} md:w-48 flex items-center justify-center p-6 text-white`}>
                  <div className="text-center">
                    <Calendar size={32} className="mx-auto mb-2 opacity-80" />
                    <p className="text-sm font-semibold">{item.date}</p>
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
                  <Link to="/announcements" className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                      currentPage === p
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-primary-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AnnouncementsPage;
