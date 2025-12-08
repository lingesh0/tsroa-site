import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white p-1 rounded-full">
                <img
                  src="/tsroa-logo.png"
                  alt="TSROA Logo"
                  className="h-12 w-12 object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">தமிழ் மாநில வருவாய்த் துறை</h3>
                <p className="text-sm text-gray-400">அலுவலர் சங்கம் - நாமக்கல்</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              பதிவுஎண்: 5/2016<br />
              வருவாய்த்துறை அலுவலர்கள் மனமகிழ் மன்றம்,<br />
              வட்டாட்சியர் அலுவலகம், நாமக்கல் – 637001
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">விரைவு இணைப்புகள்</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  எங்களை பற்றி
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                  நிகழ்வுகள்
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-gray-300 hover:text-white transition-colors">
                  அறிவிப்புகள்
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-gray-300 hover:text-white transition-colors">
                  உறுப்பினர் சேர
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  தொடர்பு
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  நிர்வாக பக்கம்
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">தொடர்பு தகவல்</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>வட்டாட்சியர் அலுவலகம், நாமக்கல் – 637001</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>தொடர்புக்கு: பக்கத்தைப் பார்க்கவும்</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} தமிழ் மாநில வருவாய்த் துறை அலுவலர் சங்கம், நாமக்கல் மாவட்டம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
          </p>
          <p className="mt-2">
            Developed by <span className="text-primary font-semibold">Xeve Tech</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
