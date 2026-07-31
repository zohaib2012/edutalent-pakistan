import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Mail, Phone } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '../icons/SocialIcons';
import logo from '../../assets/images/logo.jpeg';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Scholarships', path: '/scholarships' },
  { name: 'Syllabus', path: '/syllabus' },
  { name: 'Apply Now', path: '/apply' },
  { name: 'Results', path: '/results' },
  { name: 'Contact', path: '/contact' },
];

const dropdownLinks = [
  { name: 'Find Challan', path: '/find-challan' },
  { name: 'Track Journey', path: '/track-journey' },
  { name: 'Find Certificate', path: '/find-certificate' },
  { name: 'Find Roll No Slip', path: '/find-slip' },
  { name: 'Demo Test', path: '/demo-test' },
  { name: 'Award Winners', path: '/winners' },
  { name: 'Merit List', path: '/merit-list' },
  { name: 'Test Rules', path: '/test-rules' },
];

const socialLinks = [
  { label: 'Facebook', url: 'https://www.facebook.com/share/1JY7SmAuEC/', Icon: FacebookIcon },
  { label: 'Instagram', url: 'https://www.instagram.com/edutalentpakistan', Icon: InstagramIcon },
  { label: 'TikTok', url: 'https://www.tiktok.com/@edutalent4', Icon: TikTokIcon },
  { label: 'WhatsApp', url: 'https://wa.me/923468275954', Icon: WhatsAppIcon },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkCls = (path) =>
    `relative px-3 lg:px-4 py-2 text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'text-primary after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:bg-primary after:rounded-full'
        : 'text-gray-700 hover:text-primary'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top utility bar */}
      <div className="bg-gray-900 text-white/80 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs">
          <div className="flex items-center gap-5">
            <a href="mailto:edutalentpakistan@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={13} /> edutalentpakistan@gmail.com
            </a>
            <a href="tel:+923202603464" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} /> 0320 2603464
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/50 hidden lg:inline">Follow us:</span>
            {socialLinks.map(({ label, url, Icon }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="text-white/70 hover:text-white transition-colors">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-lg shadow-gray-900/5' : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-[72px]">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src={logo} alt="EduTalent Pakistan" className="h-10 w-auto rounded-md" />
              <div className="leading-tight">
                <span className="block text-primary font-heading font-bold text-lg md:text-xl tracking-tight">EduTalent</span>
                <span className="block text-gray-500 font-heading text-sm md:text-base -mt-1">Pakistan</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={linkCls(link.path)}>
                  {link.name}
                </Link>
              ))}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`flex items-center gap-1 px-3 lg:px-4 py-2 text-sm font-medium transition-colors ${
                    moreOpen ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  More <ChevronDown size={15} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                </button>
                {moreOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    {dropdownLinks.map((item) => (
                      <Link key={item.path} to={item.path}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <Link to="/profile" className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-5">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/apply" className="hidden sm:inline-flex px-4 py-2.5 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary-50 transition-colors">
                    Apply Now
                  </Link>
                  <Link to="/login" className="btn-primary text-sm py-2.5 px-5">
                    Student Login
                  </Link>
                </>
              )}
              <button className="lg:hidden p-2 -mr-1" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl absolute top-[64px] md:top-[108px] left-0 right-0 max-h-[calc(100vh-70px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.path ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary-50'
                }`}>
                {link.name}
              </Link>
            ))}
            <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">More</p>
            {dropdownLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                  location.pathname === link.path ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary-50'
                }`}>
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <Link to="/profile" className="block btn-primary text-center text-sm mt-4">Dashboard</Link>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Link to="/apply" className="block text-center px-4 py-3 rounded-lg text-sm font-semibold text-primary border-2 border-primary">Apply Now</Link>
                <Link to="/login" className="block btn-primary text-center text-sm">Student Login</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
