import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'முகப்பு' },
    { path: '/about', label: 'எங்களை பற்றி' },
    { path: '/events', label: 'நிகழ்வுகள்' },
    { path: '/announcements', label: 'அறிவிப்புகள்' },
    { path: '/gallery', label: 'படத்தொகுப்பு' },
    { path: '/contact', label: 'தொடர்பு' },
    { path: '/membership', label: 'புதிய உறுப்பினர்' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 pt-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-18 sm:h-20 md:h-22">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/tsroa-logo.png"
              alt="TSROA Logo"
              className="h-14 w-14 object-cover rounded-full bg-white p-1"
            />
            <div className="hidden md:flex flex-col justify-center leading-snug">
              <h1 className="text-lg font-bold text-primary leading-snug">
                தமிழ் மாநில வருவாய்த்துறை
              </h1>
              <p className="text-sm text-gray-600 leading-snug">அலுவலர் சங்கம் - நாமக்கல்</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 md:px-5 md:py-3 rounded-lg font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-7 h-7 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white border-t border-gray-200"
        >
          <div className="px-3 sm:px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
