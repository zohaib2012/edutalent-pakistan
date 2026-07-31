import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Megaphone, Loader2 } from 'lucide-react';
import { getAnnouncementBySlug } from '../../services/api';

const AnnouncementDetailPage = () => {
  const { slug } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getAnnouncementBySlug(slug)
      .then((res) => setAnnouncement(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !announcement) {
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

  const publishDate = new Date(announcement.publishDate || announcement.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  const contentParagraphs = (announcement.content || '')
    .split('\n')
    .map(p => p.trim())
    .filter(Boolean)
    .flatMap(p => p.split('. ').filter(part => part.trim()))
    .map(p => (p.endsWith('.') ? p : `${p}.`));

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/announcements" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Announcements
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-4">
            <Calendar size={14} className="text-gold" />
            <span>{publishDate}</span>
          </div>
          {announcement.isFeatured && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#F1C40F]/15 text-gold mb-4">
              Featured
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">{announcement.title}</h1>
          {announcement.summary && (
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">{announcement.summary}</p>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
            <div className="prose prose-gray max-w-none">
              {contentParagraphs.map((para, i) => (
                <p key={i} className="text-gray-700 text-base leading-relaxed mb-4">{para}</p>
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
