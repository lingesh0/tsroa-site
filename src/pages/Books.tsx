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

          {/* Google Drive Geography Materials */}
          <motion.div
            className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 border border-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl">🌍</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 font-tamil">புவியியல் பாடப் பொருட்கள்</h2>
                <p className="text-gray-700 font-tamil mb-4">
                  Google Drive இல் இருந்து புவியியல் குறிப்புகள் மற்றும் பாடப் பொருட்களை இலவசமாக பதிவிறக்கம் செய்யுங்கள்
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.01 2.011a3.2 3.2 0 0 1 .91.13 3.2 3.2 0 0 1 2.46 2.46 3.2 3.2 0 0 1-.77 2.79l-2.03 2.03 4.82 4.82 2.03-2.03a3.2 3.2 0 0 1 2.79-.77 3.2 3.2 0 0 1 2.46 2.46 3.2 3.2 0 0 1-.13.91l-8.59 8.59a1.5 1.5 0 0 1-2.12 0l-8.59-8.59a3.2 3.2 0 0 1-.13-.91 3.2 3.2 0 0 1 2.46-2.46 3.2 3.2 0 0 1 2.79.77l2.03 2.03 4.82-4.82-2.03-2.03a3.2 3.2 0 0 1-.77-2.79 3.2 3.2 0 0 1 2.46-2.46 3.2 3.2 0 0 1 .91-.13m0-2a5.2 5.2 0 0 0-1.51.22 5.2 5.2 0 0 0-3.99 3.99 5.2 5.2 0 0 0 1.24 4.53l.83.83-3.52 3.52-.83-.83a5.2 5.2 0 0 0-4.53-1.24 5.2 5.2 0 0 0-3.99 3.99 5.2 5.2 0 0 0 .22 1.51l8.59 8.59a3.5 3.5 0 0 0 4.95 0l8.59-8.59a5.2 5.2 0 0 0 .22-1.51 5.2 5.2 0 0 0-3.99-3.99 5.2 5.2 0 0 0-4.53 1.24l-.83.83-3.52-3.52.83-.83a5.2 5.2 0 0 0 1.24-4.53 5.2 5.2 0 0 0-3.99-3.99 5.2 5.2 0 0 0-1.51-.22z"/>
                  </svg>
                  <div>
                    <p className="font-bold text-gray-800 font-tamil">Google Drive கோப்புகள்</p>
                    <p className="text-sm text-gray-600 font-tamil">பல புவியியல் குறிப்புகள் கிடைக்கின்றன</p>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/drive/folders/0B9VDVZZ2NnrnNEszWlJNQ012Q2M?resourcekey=0-cmFlgWfloGvJtGGXJpl4Ig&usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-tamil">Drive இல் பார்க்கவும்</span>
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 font-tamil flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>இலவசமாக அனைத்து கோப்புகளையும் பதிவிறக்கம் செய்யலாம்</span>
                </p>
              </div>
            </div>
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
