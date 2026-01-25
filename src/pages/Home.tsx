import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

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

  // Inject Organization JSON-LD schema for Google branding
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "தமிழ் மாநில வருவாய்த்துறை அலுவலர் சங்கம் - நாமக்கல்",
      "alternateName": "TSROA Namakkal",
      "url": "https://www.tsroa.site/",
      "logo": "https://www.tsroa.site/logo-square.png"
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <SEO 
        title="தமிழ் மாநில வருவாய்த்துறை அலுவலர் சங்கம் | நாமக்கல் மாவட்டம்"
        description="தமிழ் மாநில வருவாய்த்துறை அலுவலர் சங்கம் நாமக்கல் மாவட்டம் – அரசு ஊழியர்கள் நலன், அறிவிப்புகள், உறுப்பினர் பதிவு மற்றும் நிகழ்வுகள். TSROA Union Namakkal - Official union for government officers in Tamil Nadu revenue department."
        keywords="தமிழ் மாநில வருவாய்த்துறை, TSROA, TSROA Namakkal, நாமக்கல் அலுவலர் சங்கம், வருவாய் அலுவலர், அரசு ஊழியர்கள், Tamil Nadu Revenue Officers Union, Government Officers Association Namakkal"
        url="https://www.tsroa.site/"
      />
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Full Visibility */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/office-building.png)' }}
          aria-label="TSROA Office Building - Tamil Nadu Revenue Department"
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
                loading="lazy"
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
              தமிழ் மாநில வருவாய்த்துறை
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
              தமிழ்நாடு வருவாய்த்துறை அலுவலர்களின் நலன் மற்றும் உரிமைகளை பாதுகாக்கும் நோக்கில் 
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
                அனைத்து வருவாய்ததுறை அலுவலர்களுக்கும் திறந்த உறுப்பினர் வாய்ப்பு
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

      {/* Namakkal Special Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-tamil">
              நாமக்கல் தமிழகத்தின் சிறந்த மாவட்டம்
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-tamil">
              நாமக்கல் என்பது தமிழ்நாட்டின் மத்தியப் பகுதியில் அமைந்துள்ள இயற்கை, தொழில், வரலாறு, கல்வி, வேளாண்மை என அனைத்திலும் சிறப்பு பெற்ற ஒரு மாவட்டமாகும். 
              இங்கு கலாச்சார வளம், இயற்கை அழகு மற்றும் தொழில் முன்னேற்றம் ஒன்றிணைந்து, மாவட்டத்தை ஒரு தனித்துவமான அடையாளம் கொண்டதாக ஆக்குகிறது.
            </p>
          </motion.div>

          {/* History & Culture */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12 border-2 border-orange-200 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center font-tamil flex items-center justify-center gap-3">
                <span></span> வரலாறு & பண்பாடு
              </h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 font-tamil flex items-center gap-2">
                    <span></span> நாமக்கல் பாறை
                  </h4>
                  <ul className="space-y-2 text-gray-700 font-tamil">
                    <li className="flex items-start gap-2"><span className="text-orange-500">•</span> 65 மீட்டர் உயரம் கொண்ட இயற்கை பாறை</li>
                    <li className="flex items-start gap-2"><span className="text-orange-500">•</span> கி.பி. 7–8ஆம் நூற்றாண்டில் ஏற்பட்ட வரலாற்றுப் பின்னணி</li>
                    <li className="flex items-start gap-2"><span className="text-orange-500">•</span> பாண்டியர்கள் மற்றும் நாயக்கர் காலத்தின் சான்று</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 font-tamil flex items-center gap-2">
                    <span></span> நரசிம்மர் & ஆஞ்சநேயர் — ஆன்மீகப் பெருமைகள்
                  </h4>
                  <ul className="space-y-2 text-gray-700 font-tamil">
                    <li className="flex items-start gap-2"><span className="text-orange-500">•</span> நரசிம்மர் கோவில் பாறைக்குள் செதுக்கப்பட்டுள்ள சிறப்பு</li>
                    <li className="flex items-start gap-2"><span className="text-orange-500">•</span> 18 அடி உயர ஆஞ்சநேயர் சிலை — இந்தியாவின் உயரமானவை ஒன்றாகும்</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tourist Places with Placeholder Images */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-tamil">
              புகழ்பெற்ற சுற்றுலா தளங்கள்
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img 
                  src="https://imgs.search.brave.com/CahzjzW8D9uabOyyGrQJ9Dcz1TxDn_HOc5l0fMuVVrA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaGluZHVzdGFu/dGltZXMuY29tL3Rh/bWlsL2ltZy8yMDIz/LzA3LzA2LzU1MHgz/MDkvQW5qYW5leWFy/XzE2ODg2NzQ1NjMx/ODlfMTY4ODY3NDU3/NjIxMC5qcGc" 
                  alt="நாமக்கல் ஆஞ்சநேயர் கோயில்"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-tamil">நாமக்கல் ஆஞ்சநேயர் கோயில்</h4>
                  <p className="text-gray-600 font-tamil">18 அடி உயர பிரமாண்டமான ஆஞ்சநேயர் சிலை - இந்தியாவின் உயரமான சிலைகளில் ஒன்று.</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img 
                  src="https://imgs.search.brave.com/-Vzo09twS_Bj_wzJdX25znWdgJdZ_M_we9wfUQck77s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/czN3YWFzLmdvdi5p/bi9zM2I5MjI4ZTA5/NjJhNzhiODRmM2Q1/ZDkyZjRmYWEwMDBi/L3VwbG9hZHMvYmZp/X3RodW1iLzIwMTgw/NTAzNjgtb2x3Ynlu/YmRxcDBxcTl3dGVt/ZnE1c24yc2d4dThm/MDJkaXh1aHE4NnB1/LmpwZw
" 
                  alt="நாமக்கல் கோட்டை"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-tamil">நாமக்கல் கோட்டை</h4>
                  <p className="text-gray-600 font-tamil">65 மீட்டர் பாறையின் மேல் அமைந்த வரலாற்று சிறப்பு மிக்க கோட்டை.</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img 
                  src="https://imgs.search.brave.com/NXQtTN8f3L_Wv_LW17CY6UZGNBMBVb1RxMJCTfLMIHc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZ29vZHJldHVy/bnMuaW4vdGEvaW1n/LzIwMjQvMDcva29s/bGkxLTE3MjE0NTM4/MTUuanBn" 
                  alt="கொல்லி மலை"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-tamil">கொல்லிமலைகள்</h4>
                  <p className="text-gray-600 font-tamil">70 மலை முடுக்குகளைக் கொண்ட சாலை, ஆகாய கங்கை நீர்வீழ்ச்சி மற்றும் இயற்கை அழகு.</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img 
                  src="https://images.news18.com/tamil/uploads/2022/07/namakkal-5.jpg?impolicy=website&width=827&height=620" 
                  alt="நாமக்கல் நரசிம்மர் கோயில்"
                  className="w-full aspect-[16/9] object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-tamil">நாமக்கல் நரசிம்மர் கோயில்</h4>
                  <p className="text-gray-600 font-tamil">பாறைக்குள் செதுக்கப்பட்ட பழமையான கோயில் - 7ஆம் நூற்றாண்டு வரலாறு.</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img 
                  src="https://imgs.search.brave.com/aMLO__Slh4va-qdh7_W2NFU_1Z5UZbrMcp3335c0zVQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5tYWFsYWltYWxh/ci5jb20vaC11cGxv/YWQvMjAyMi8wNy8z/MC8xNzM4MjMxLTAz/LWtvbGxpLWhpbHMu/anBn" 
                  alt="ஆகாய கங்கை நீர்வீழ்ச்சி"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-tamil">ஆகாய கங்கை நீர்வீழ்ச்சி</h4>
                  <p className="text-gray-600 font-tamil">கொல்லிமலையின் முக்கிய நீர்வீழ்ச்சி - இயற்கை மற்றும் ஆன்மிக தலம்.</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img 
                  src="https://imgs.search.brave.com/Ji-cYRNmji9p2AAvGsAg82ru4A1x84qRyXeISW1RmMI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/Lnplbml0aGhvbGlk/YXlzLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8wOS9p/bWFnZS03Ny5wbmc" 
                  alt="பேரியசாமி கோயில்"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://imgs.search.brave.com/Ji-cYRNmji9p2AAvGsAg82ru4A1x84qRyXeISW1RmMI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/Lnplbml0aGhvbGlk/YXlzLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8wOS9p/bWFnZS03Ny5wbmc';
                  }}
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 font-tamil">பெரியசாமி கோயில் கொல்லிமலை</h4>
                  <p className="text-gray-600 font-tamil">கொல்லிமலையின் முக்கிய ஆன்மீக மையம் மற்றும் பக்தர்களின் கூட்டம்.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Industry & Economy */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-tamil flex items-center justify-center gap-3">
              <span></span> தொழில் & பொருளாதாரம்
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-orange-200"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🥚</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 font-tamil">முட்டை உற்பத்தி</h4>
                  <p className="text-gray-600 font-tamil text-sm">இந்தியாவின் மிக அதிக முட்டை உற்பத்தி செய்யும் மாவட்டம் - "Egg City"</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-blue-200"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🚚</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 font-tamil">லாரி தொழில்</h4>
                  <p className="text-gray-600 font-tamil text-sm">150+ லாரி உடற்கட்டுமான பணிமனைகள் - இந்தியாவின் பெரிய மையம்</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-green-200"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🛣️</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 font-tamil">போக்குவரத்து</h4>
                  <p className="text-gray-600 font-tamil text-sm">"Transport Hub of South India" - 4 தேசிய நெடுஞ்சாலைகள்</p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-purple-200"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 font-tamil">கல்வி மையம்</h4>
                  <p className="text-gray-600 font-tamil text-sm">"Coaching Hub" - IAS/IPS/NEET/JEE பயிற்சி மையங்கள்</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Agriculture */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-8 md:p-12 border-2 border-green-200 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center font-tamil flex items-center justify-center gap-3">
                <span>🌾</span> வேளாண்மை முன்னேற்றம்
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 font-tamil">முக்கிய பயிர்கள்</h4>
                  <ul className="space-y-1 text-gray-700 font-tamil text-sm">
                    <li>• சோளம், மக்காச்சோளம்</li>
                    <li>• நிலக்கடலை, கம்பு</li>
                    <li>• பாசி மற்றும் எலுமிச்சை</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 font-tamil">தோட்டக்கலை</h4>
                  <ul className="space-y-1 text-gray-700 font-tamil text-sm">
                    <li>• வாழை, மாம்பழம்</li>
                    <li>• முந்திரி</li>
                    <li>• மசாலா பயிர்கள்</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 font-tamil">கோழி & பால்</h4>
                  <ul className="space-y-1 text-gray-700 font-tamil text-sm">
                    <li>🥛 பால் குளிரூட்டும் மையங்கள்</li>
                    <li>🐔 கோழி வளர்ப்பு தொழில்</li>
                    <li>🥚 முட்டை உற்பத்தி</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why Namakkal is Special */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center font-tamil">
              நாமக்கல் ஏன் சிறப்பு? 
            </h3>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-tamil">இந்தியாவின் முன்னணி முட்டை உற்பத்தி மாவட்டம்</p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-tamil">லாரி தொழில் மையம்</p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-tamil">கொல்லி மலை இயற்கை அழகு</p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-tamil">வரலாற்று பாரம்பரியம்</p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-tamil">சிறந்த கல்வி மையம்</p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-tamil">போக்குவரத்து நெடுஞ்சாலை சந்திப்பு</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Website Development History Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-primary mb-4 font-tamil"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              TSROA – நாமக்கல் மாவட்ட இணையதள தொடக்க வரலாறு
            </motion.h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8 font-tamil">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                தமிழ்மாநில வருவாய்த் துறை அலுவலர்கள் சங்கம் (TSROA) – நாமக்கல் மாவட்டம்,
                வருவாய்த் துறை அலுவலர்களின் நலன், சங்கத்தின் செயல்பாடுகள், அறிவிப்புகள்,
                உறுப்பினர் தகவல்கள் மற்றும் பொதுமக்களுக்கு தேவையான தகவல்களை
                ஒரே தளத்தில் எளிதாக கொண்டு சேர்க்கும் நோக்கில்,
                ஒரு அதிகாரபூர்வ இணையதளத்தை உருவாக்கும் முயற்சியை தொடங்கியது.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                இந்த இணையதள உருவாக்கத் திட்டம்,
                <span className="font-semibold text-primary"> மாவட்டத் தலைவர் திரு. ரா. சரவணகுமார் </span>
                அவர்களின் முன்னோக்கிய சிந்தனை, தொலைநோக்கு பார்வை மற்றும் வழிகாட்டுதலின் அடிப்படையில்
                துவக்கப்பட்ட ஒரு முக்கிய முயற்சியாகும்.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                நவீன காலத்திற்கேற்ப, சங்கத்தின் செயல்பாடுகள் அனைத்தையும் டிஜிட்டல் வடிவில் பதிவு செய்து,
                உறுப்பினர்கள், அலுவலர்கள் மற்றும் பொதுமக்கள் அனைவரும் எளிதாக அணுகும் வகையில் ஒரு
                நம்பகமான, பாதுகாப்பான மற்றும் தொழில்நுட்ப ரீதியாக வலுவான இணையதளத்தை
                உருவாக்க வேண்டும் என்ற நோக்கத்துடன் இந்த திட்டம் முன்னெடுக்கப்பட்டது.
              </p>
            </motion.div>

            {/* Technical Development Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 space-y-4"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 flex items-center">
                <span className="text-3xl mr-3">💻</span>
                இணையதள வடிவமைப்பு & தொழில்நுட்ப உருவாக்கம்
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                இந்த முக்கியமான இணையதள உருவாக்கப் பணியை,
                <span className="font-semibold text-secondary"> Xeve Tech Solutions </span>
                என்ற மென்பொருள் நிறுவனம், அதன்
                <span className="font-semibold"> Founder & CEO திரு. லிங்கேஷ் T, B.E. </span>
                அவர்களின் தலைமையில், முழுமையான அர்ப்பணிப்பு, நேர்த்தி மற்றும் தொழில்நுட்ப நிபுணத்துவத்துடன்
                சிறப்பாக நிறைவேற்றியது.
              </p>

              <div className="mt-6">
                <p className="text-lg font-semibold text-gray-800 mb-4">இணையதளத்தில்:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">சங்கத்தின் வரலாறு மற்றும் நோக்கம்</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">அறிவிப்புகள் மற்றும் நிகழ்வுகள்</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">உறுப்பினர் பதிவு வசதி</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">புகைப்படக் காட்சியகம்</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">தொடர்பு விவரங்கள்</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">நிர்வாகப் பக்கம் (Admin Panel)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">பாதுகாப்பான தரவுத்தள அமைப்பு</span>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mt-6">
                  என அனைத்து முக்கிய அம்சங்களும் நவீன தொழில்நுட்பத்தில், பயனர் நட்பு வடிவமைப்புடன் உருவாக்கப்பட்டுள்ளன.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  மேலும், இணையதளம் மொபைல், டேப்லெட் மற்றும் கணினி ஆகிய அனைத்திலும்
                  எளிதாக செயல்படும் வகையில் முழுமையாக <span className="font-semibold text-primary">Responsive</span> வடிவமைப்பில் உருவாக்கப்பட்டுள்ளது.
                </p>
              </div>
            </motion.div>

            {/* Future Vision Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 flex items-center">
                <span className="text-3xl mr-3">🌟</span>
                நோக்கும் எதிர்கால பாதையும்
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                இந்த இணையதளம், TSROA – நாமக்கல் மாவட்டத்தின் செயல்பாடுகளை
                வெளிப்படைத்தன்மை, நேர்த்தி மற்றும் வேகத்துடன் மக்களிடம் கொண்டு சேர்க்கும் ஒரு முக்கிய கருவியாக விளங்குகிறது.
              </p>
              <div className="bg-white border-l-4 border-primary p-6 rounded-r-xl">
                <p className="text-lg font-semibold text-gray-800 mb-4">எதிர்காலத்தில்:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">▸</span>
                    <span>மேலும் புதிய வசதிகள்</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">▸</span>
                    <span>உறுப்பினர் சேவைகள்</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">▸</span>
                    <span>ஆன்லைன் அறிவிப்புகள்</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">▸</span>
                    <span>டிஜிட்டல் ஆவணங்கள்</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">▸</span>
                    <span>தகவல் பரிமாற்ற வசதிகள்</span>
                  </li>
                </ul>
                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  என பல மேம்பாடுகள் செய்து, இந்த இணையதளத்தை ஒரு முழுமையான அதிகாரபூர்வ டிஜிட்டல் தளமாக
                  வளர்த்தெடுக்க சங்கம் திட்டமிட்டுள்ளது.
                </p>
              </div>
            </motion.div>

            {/* Acknowledgement Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 md:p-8 space-y-4 border-2 border-amber-200"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 flex items-center">
                <span className="text-3xl mr-3">🙏</span>
                நன்றி தெரிவிப்பு
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    இந்த இணையதள உருவாக்க முயற்சி வெற்றிகரமாக நிறைவேறுவதற்கு
                    முழுமையான ஆதரவு, வழிகாட்டுதல் மற்றும் நம்பிக்கை வழங்கிய
                  </p>
                  <div className="text-center py-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                    <p className="text-xl font-bold text-primary">மாவட்டத் தலைவர்</p>
                    <p className="text-2xl font-bold text-secondary mt-2">திரு. ரா. சரவணகுமார்</p>
                    <p className="text-lg text-gray-700 mt-1">TSROA – நாமக்கல் மாவட்டம்</p>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4 text-center">
                    அவர்களுக்கு சங்கத்தின் சார்பில் மனமார்ந்த நன்றிகள்.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    மேலும், இந்த இணையதளத்தை சிறப்பாக வடிவமைத்து உருவாக்கிய
                  </p>
                  <div className="text-center py-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                    <p className="text-xl font-bold text-secondary">Xeve Tech Solutions</p>
                    <p className="text-lg text-gray-700 mt-2">Founder & CEO</p>
                    <p className="text-2xl font-bold text-primary mt-2">திரு. லிங்கேஷ் T, B.E.</p>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4 text-center">
                    அவர்களுக்கும் TSROA – நாமக்கல் மாவட்டத்தின் சார்பில்
                    மனமார்ந்த பாராட்டுகளும் நன்றிகளும் தெரிவித்துக் கொள்ளப்படுகின்றன.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
