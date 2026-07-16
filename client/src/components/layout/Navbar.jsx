import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

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
  { name: 'Award Winners', path: '/winners' },
  { name: 'Merit List', path: '/merit-list' },
  { name: 'Test Rules', path: '/test-rules' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">ET</span>
            </div>
            <div>
              <span className="text-primary font-heading font-bold text-xl">EduTalent</span>
              <span className="text-gray-600 font-heading text-xl"> Pakistan</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login" className="btn-primary ml-4 text-sm py-2 px-4">
              Student Login
            </Link>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl absolute top-16 left-0 right-0">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-primary-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login" className="block btn-primary text-center text-sm mt-4">
              Student Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
