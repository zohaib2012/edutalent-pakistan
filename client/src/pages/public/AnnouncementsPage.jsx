import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Megaphone, Loader2 } from 'lucide-react';
import { getAnnouncements } from '../../services/api';

const ITEMS_PER_PAGE = 4;

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAnnouncements()
      .then((res) => setAnnouncements(res.data || []))
      .catch(() => setAnnouncements([]))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(Math.ceil(announcements.length / ITEMS_PER_PAGE), 1);
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
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>
          ) : announcements.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
              <Megaphone size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-gray-700 mb-2">No Announcements Yet</h3>
              <p className="text-gray-500">Please check back soon for the latest updates.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {paginated.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col md:flex-row">
                  <div className="bg-gradient-to-r from-primary to-primary-600 md:w-48 flex items-center justify-center p-6 text-white">
                    <div className="text-center">
                      <Calendar size={32} className="mx-auto mb-2 opacity-80" />
                      <p className="text-sm font-semibold">
                        {new Date(item.publishDate || item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {item.isFeatured && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F1C40F]/15 text-[#C9A300]">Featured</span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.summary || item.content}</p>
                    <Link to={`/announcements/${item.slug}`} className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && totalPages > 1 && (
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
