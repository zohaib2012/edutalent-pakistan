import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '../icons/SocialIcons';
import logo from '../../assets/images/logo.jpeg';

const SOCIAL_LINKS = [
  { label: 'Facebook', url: 'https://www.facebook.com/share/1JY7SmAuEC/', Icon: FacebookIcon },
  { label: 'Instagram', url: 'https://www.instagram.com/edutalentpakistan', Icon: InstagramIcon },
  { label: 'TikTok', url: 'https://www.tiktok.com/@edutalent4', Icon: TikTokIcon },
  { label: 'WhatsApp Channel', url: 'https://whatsapp.com/channel/0029VbD831dCsU9PMWH2yD40', Icon: WhatsAppIcon },
];

const WHATSAPP_NUMBER = '923468275954';
const SUPPORT_NUMBER = '+923202603464';
const OFFICIAL_EMAIL = 'edutalentpakistan@gmail.com';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img src={logo} alt="EduTalent Pakistan" className="h-10 w-auto mb-3" />
              <div>
                <span className="text-white font-heading font-bold text-xl">EduTalent</span>
                <span className="text-gray-400 font-heading text-xl"> Pakistan</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-md">
              Pakistan's Largest Online Scholarship Testing System. Unlocking Brilliance, 
              Rewarding Talent for students from Grade 1 to University.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, url, Icon }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" title={label}
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                ['Home', '/'],
                ['About Us', '/about'],
                ['Scholarships', '/scholarships'],
                ['Apply Now', '/apply'],
                ['Results', '/results'],
                ['Terms & Conditions', '/terms'],
                ['Privacy Policy', '/privacy'],
                ['Refund Policy', '/refund'],
                ['Anti-Cheating Policy', '/anti-cheating'],
              ].map(([name, path]) => (
                <li key={path}>
                  <Link to={path} className="text-gray-400 hover:text-white text-sm transition-colors">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                ['Syllabus', '/syllabus'],
                ['Test Rules', '/test-rules'],
                ['FAQs', '/faqs'],
                ['Date Sheet', '/datesheet'],
                ['Merit List', '/merit-list'],
                ['Award Winners', '/winners'],
                ['Find Challan', '/find-challan'],
                ['Find Certificate', '/find-certificate'],
              ].map(([name, path]) => (
                <li key={path}>
                  <Link to={path} className="text-gray-400 hover:text-white text-sm transition-colors">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail size={16} className="mt-0.5 text-primary" />
                <a href={`mailto:${OFFICIAL_EMAIL}`} className="hover:text-white transition-colors">{OFFICIAL_EMAIL}</a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MessageCircle size={16} className="mt-0.5 text-primary" />
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+92 346 8275954</a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone size={16} className="mt-0.5 text-primary" />
                <a href={`tel:${SUPPORT_NUMBER}`} className="hover:text-white transition-colors">0320 2603464</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} EduTalent Pakistan. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/refund" className="hover:text-white transition-colors">Refund</Link>
              <Link to="/anti-cheating" className="hover:text-white transition-colors">Anti-Cheating</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
