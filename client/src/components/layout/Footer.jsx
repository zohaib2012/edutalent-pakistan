import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">ET</span>
              </div>
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
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"><ExternalLink size={16} /></a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"><ExternalLink size={16} /></a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"><ExternalLink size={16} /></a>
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
                info@edutalentpakistan.com
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone size={16} className="mt-0.5 text-primary" />
                +92-XXX-XXXXXXX
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="mt-0.5 text-primary" />
                Head Office, Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} EduTalent Pakistan. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
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
