import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Full Visibility */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/office-building.png)' }}
        ></div>
        
        {/* Thin Blue Tint Overlay */}
        <div className="absolute inset-0 bg-blue-900/20"></div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-16 md:py-20"
        >
          {/* Logo with Strong Background */}
          <motion.div 
            className="flex justify-center mb-6 sm:mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/95 p-2 sm:p-3 rounded-full shadow-2xl">
              <img
                src="/tsroa-logo.png"
                alt="TSROA Logo"
                className="h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36 object-cover rounded-full"
              />
            </div>
          </motion.div>

          {/* Title with Strong Background */}
          <motion.h1 
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight font-tamil"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="inline-block bg-blue-900/90 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-2xl shadow-2xl backdrop-blur-sm mb-2 sm:mb-3 text-lg sm:text-2xl md:text-4xl">
              தமிழ் மாநில வருவாய்த் துறை
            </span>
            <br />
            <span className="inline-block bg-blue-900/90 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-2xl shadow-2xl backdrop-blur-sm text-lg sm:text-2xl md:text-4xl">
              அலுவலர் சங்கம்
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg sm:text-2xl md:text-3xl mb-4 font-tamil font-bold inline-block bg-yellow-500/95 text-blue-900 px-4 sm:px-8 py-2 sm:py-3 rounded-full shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            நாமக்கல் மாவட்டம்
          </motion.p>

          <motion.div
            className="inline-block bg-white/95 backdrop-blur-sm border-2 border-blue-600 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8 shadow-xl mt-3 sm:mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <p className="text-sm sm:text-lg md:text-xl text-blue-900 font-tamil font-semibold">
              பதிவுஎண்: 5/2016
            </p>
          </motion.div>

          {/* CTA Buttons with Enhanced Design */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link 
              to="/membership" 
              className="group relative px-8 py-4 bg-white text-primary rounded-full font-tamil font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">உறுப்பினராக சேர</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-tamil font-bold text-lg z-20">
                உறுப்பினராக சேர
              </span>
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-tamil font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
            >
              மேலும் அறிய
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              வரவேற்கிறோம்
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              தமிழ்நாடு வருவாய்த் துறை அலுவலர்களின் நலன் மற்றும் உரிமைகளை பாதுகாக்கும் நோக்கில் 
              செயல்படும் நாமக்கல் மாவட்ட சங்கத்திற்கு உங்களை அன்புடன் வரவேற்கிறோம்.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="card text-center">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">உறுப்பினர்கள்</h3>
              <p className="text-gray-600">
                அனைத்து வருவாய்த் துறை அலுவலர்களுக்கும் திறந்த உறுப்பினர் வாய்ப்பு
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="card text-center">
              <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">நிகழ்வுகள்</h3>
              <p className="text-gray-600">
                சங்க கூட்டங்கள், பயிற்சி வகுப்புகள் மற்றும் சமூக நலன் நிகழ்ச்சிகள்
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="card text-center">
              <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">உரிமைகள் பாதுகாப்பு</h3>
              <p className="text-gray-600">
                அலுவலர்களின் நலன் மற்றும் உரிமைகளுக்கான குரல்
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-100">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              விரைவு இணைப்புகள்
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={itemVariants}>
              <Link to="/events" className="card hover:scale-105 transition-transform duration-300 block">
                <h3 className="text-lg font-bold text-primary mb-2">நிகழ்வுகள்</h3>
                <p className="text-gray-600 text-sm">வரவிருக்கும் மற்றும் முடிந்த நிகழ்வுகள்</p>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/announcements" className="card hover:scale-105 transition-transform duration-300 block">
                <h3 className="text-lg font-bold text-primary mb-2">அறிவிப்புகள்</h3>
                <p className="text-gray-600 text-sm">சமீபத்திய அறிவிப்புகள் மற்றும் செய்திகள்</p>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/gallery" className="card hover:scale-105 transition-transform duration-300 block">
                <h3 className="text-lg font-bold text-primary mb-2">படத்தொகுப்பு</h3>
                <p className="text-gray-600 text-sm">நிகழ்வு புகைப்படங்கள் மற்றும் நினைவுகள்</p>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/contact" className="card hover:scale-105 transition-transform duration-300 block">
                <h3 className="text-lg font-bold text-primary mb-2">தொடர்பு</h3>
                <p className="text-gray-600 text-sm">எங்களை தொடர்பு கொள்ளுங்கள்</p>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
