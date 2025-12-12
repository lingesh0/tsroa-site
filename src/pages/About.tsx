import { motion } from 'framer-motion';

interface OfficeBearerCard {
  name: string;
  position: string;
  phone?: string;
}

const About = () => {
  const fadeInVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    initial: "initial",
    animate: "animate",
    transition: { duration: 0.6 }
  } as const;

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const districtPresidents = [
    { name: 'ப.மகேஸ்வரி', phone: '80729 48403' },
    { name: 'க.கிருஷ்ணமூர்த்தி', phone: '97894 81234' },
    { name: 'அ.அம்ஜத்', phone: '97905 90070' },
    { name: 'ப.விஜயகுமார்', phone: '95437 99509' },
    { name: 'செ.கார்த்திகேயன்', phone: '99766 05255' },
    { name: 'செ.சிவக்குமார்', phone: '86100 68388' },
    { name: 'சோ.கவுசிகா', phone: '86385 26989' }
  ];

  const districtVicePresidentsRural = [
    { name: 'ம.தங்கம்', phone: '92451 59566' },
    { name: 'ரா.வடிவேலு', phone: '88870 20796' },
    { name: 'மா.தணிகாசலம்', phone: '94428 02160' },
    { name: 'மா.முருகப்பெருமாள்', phone: '99408 11626' },
    { name: 'ச.அருண்குமார்', phone: '98656 29363' },
    { name: 'க.பன்னீர்செல்வம்', phone: '98426 80089' },
    { name: 'மு.இராஜேந்திரன்', phone: '99435 59299' }
  ];

  const districtJointSecretaries = [
    { name: 'ச.ரஞ்சித்', phone: '89952 51811' },
    { name: 'க.நந்தினி', phone: '88778 57463' },
    { name: 'சி.காமேஷ்', phone: '86950 76057' },
    { name: 'சு.நடராஜன்', phone: '89942 07056' },
    { name: 'ஜெ.அமுல்ராஜ்', phone: '63749 90823' },
    { name: 'மு.பழனிவேலன்', phone: '90803 23131' },
    { name: 'வே.சித்ரா', phone: '96591 43554' },
    { name: 'சா.மணிமேகலை', phone: '95972 82451' },
    { name: 'க.கமல்', phone: '97154 50161' }
  ];

  interface OfficeBearerWithPhone extends OfficeBearerCard {
    phone?: string;
  }

  const keyOfficeBearers: OfficeBearerWithPhone[] = [
    { name: 'ரா.சரவணகுமார்', position: 'மாவட்ட தலைவர்', phone: '91596 56661' },
    { name: 'க.சதீஸ்குமார்', position: 'மாவட்ட செயலாளர்', phone: '97892 33462' },
    { name: 'ச.மனோஜ்', position: 'மாவட்ட பொருளாளர்', phone: '96774 40469' },
    { name: 'ந.வெங்கடேசன்', position: 'மாவட்ட அமைப்புச் செயலாளர்', phone: '94891 66344' },
    { name: 'ப.நவீன்குமார்', position: 'மாவட்ட பிரச்சார செயலாளர்', phone: '74022 16253' },
    { name: 'ம.சந்திரமதி', position: 'மாவட்ட மகளிர் பிரிவு செயலாளர்', phone: '96295 62476' },
    { name: 'து.சத்தியா', position: 'மாவட்ட மகளிர் பிரிவு இணை செயலாளர்', phone: '96294 25910' },
    { name: 'த.கஸ்தூரி', position: 'மாவட்ட மகளிரணி இணைச் செயலாளர்', phone: '79045 14523' },
    { name: 'வெ.ராஜேஷ்', position: 'மாநில செயற்குழு உறுப்பினர்', phone: '99523 41265' },
    { name: 'க.பாலசுப்ரமணியம்', position: 'மாநில செயலாளர்', phone: '94423 34677' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-tamil">
            எங்களைப் பற்றி
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
        </motion.div>

        {/* Association Info */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12"
          variants={fadeInVariants}
          {...fadeIn}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="bg-white p-2 rounded-full shadow-xl">
              <img
                src="/tsroa-logo.png"
                alt="TSROA Logo"
                className="h-32 w-32 object-cover rounded-full"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-3 font-tamil">
                தமிழ் மாநில வருவாய்த் துறை அலுவலர் சங்கம்
              </h2>
              <p className="text-xl text-primary font-semibold font-tamil">
                நாமக்கல் மாவட்டம்
              </p>
            </div>
          </div>

          <div className="space-y-4 text-gray-700 font-tamil text-lg leading-relaxed">
            <p>
              <span className="font-semibold text-primary">பதிவு எண்:</span> 5/2016
            </p>
            <p>
              <span className="font-semibold text-primary">முகவரி:</span><br />
              வருவாய்த்துறை அலுவலர்கள் மனமகிழ் மன்றம்,<br />
              வட்டாட்சியர் அலுவலகம், நாமக்கல் – 637001
            </p>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <p className="text-gray-700 font-tamil text-lg leading-relaxed">
              நாமக்கல் மாவட்ட வருவாய்த் துறை அலுவலர்களின் நலன் மற்றும் உரிமைகளைப் பாதுகாக்கவும், 
              தொழில்சார் வளர்ச்சியை ஊக்குவிக்கவும், உறுப்பினர்களிடையே ஒற்றுமை மற்றும் ஒத்துழைப்பை 
              வளர்ப்பதற்காக இந்த சங்கம் அர்ப்பணிப்புடன் செயல்படுகிறது.
            </p>
          </div>
        </motion.div>

        {/* Key Office Bearers */}
        <motion.div className="mb-12" variants={fadeInVariants} {...fadeIn}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-tamil">
            முக்கிய பதவியாளர்கள்
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {keyOfficeBearers.map((bearer, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-primary"
                variants={fadeInVariants}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary bg-opacity-10 rounded-full p-3">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 font-tamil">
                      {bearer.name}
                    </h3>
                    <p className="text-primary font-semibold font-tamil">
                      {bearer.position}
                    </p>
                    {bearer.phone && (
                      <p className="text-sm text-gray-600 font-semibold mt-1">☎ {bearer.phone}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* District Vice Presidents (Urban) */}
        <motion.div className="mb-12" variants={fadeInVariants} {...fadeIn}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-tamil">
            மாவட்ட துணைத் தலைவர்கள் (நகர்ப்புறம்)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {districtPresidents.map((person, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg font-semibold text-gray-800 font-tamil">
                  {person.name}
                </p>
                {person.phone && (
                  <p className="text-sm text-primary font-semibold mt-2">☎ {person.phone}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* District Vice Presidents (Rural) */}
        <motion.div className="mb-12" variants={fadeInVariants} {...fadeIn}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-tamil">
            மாவட்ட துணைத் தலைவர்கள் (கிராமப்புறம்)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {districtVicePresidentsRural.map((person, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg font-semibold text-gray-800 font-tamil">
                  {person.name}
                </p>
                {person.phone && (
                  <p className="text-sm text-primary font-semibold mt-2">☎ {person.phone}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* District Joint Secretaries */}
        <motion.div className="mb-12" variants={fadeInVariants} {...fadeIn}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-tamil">
            மாவட்ட இணை செயலாளர்கள்
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {districtJointSecretaries.map((person, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg font-semibold text-gray-800 font-tamil">
                  {person.name}
                </p>
                {person.phone && (
                  <p className="text-sm text-primary font-semibold mt-2">☎ {person.phone}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
