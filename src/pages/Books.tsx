import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PdfLibrary from '../components/PdfLibrary';

const Books = () => {
  return (
    <>
      <Helmet>
        <title>வெளியீட்டுக் குறிப்பு - TSROA</title>
        <meta name="description" content="வருவாய் துறை தேர்வுக்கான VAO அரசு அலுவலர் வழிகாட்டி, குறிப்பு, பாடமாக்கப் பொருட்கள்." />
        <meta name="keywords" content="VAO தேர்வு, வழிகாட்டி, குறிப்பு, தமிழ்நாடு" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-4">
              <span className="text-primary font-bold font-tamil text-sm">📚 வெளியீடுகள்</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-tamil">
              வருவாய் துறை தேர்வு விழிப்புணர்வு
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 font-tamil max-w-2xl mx-auto">
              VAO மற்றும் வருவாய் துறை தேர்வுக்கான இலவச பதிவிறக்க புத்தகங்கள் மற்றும் வழிகாட்டிகள்
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {[
              { icon: '⚡', title: 'வேகமாக', desc: 'கேஷ் செய்யப்பட்ட PDF' },
              { icon: '📱', title: 'மொபைல்', desc: 'எல்லா சாதனத்தில் வேலை செய்யும்' },
              { icon: '🔐', title: 'பாதுகாப்பு', desc: 'அரசு தன்மை'  }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-primary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 font-tamil mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 font-tamil">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* PDF Library */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PdfLibrary />
          </motion.div>

          {/* Info Section */}
          <motion.div
            className="mt-12 bg-white rounded-lg shadow-lg p-8 border-l-4 border-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-tamil">ℹ️ முக்கியமான தகவல்</h2>
            <div className="space-y-4 text-gray-700 font-tamil">
              <p>
                ✅ <strong>மொபைல் நெட்வர்க் இல்லாமல் படிக்கலாம்:</strong> PDFs உங்கள் சாதனத்தில் சேமிக்கப்படும்.
              </p>
              <p>
                ✅ <strong>தாமிழ்ற மொழியில்:</strong> அனைத்து வழிகாட்டிகளும் தமிழ்ப் பதிப்பாகவே உள்ளது.
              </p>
              <p>
                ✅ <strong>மணிநேரம் சேவை:</strong> முடிந்தவரை அனைய PDF வலைப்பூ நிலையம் மூலமாக கிடைக்கும்.
              </p>
              <p>
                ℹ️ <strong>புதிய பாடாபுட்டு:</strong> புத்தம் புத்தமான பாடப் பொருட்களைப் பயன்படுத்த ஒரு வாரம் பொறுமையாக இருக்கவும்.
              </p>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-600 font-tamil mb-4">
              வேறு கேள்வியோ அல்லது முறையீடோ உள்ளதா?
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-tamil font-semibold"
            >
              எங்களை தொடர்பு கொள்ளுங்கள்
            </a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Books;
