import { motion } from 'framer-motion';

interface OfficeBearerCard {
  name: string;
  position: string;
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
    'ப.மகேஸ்வரி',
    'க.கிருஷ்ணமூர்த்தி',
    'அ.அம்ஜத்',
    'ப.விஜயகுமார்',
    'செ.கார்த்திகேயன்',
    'செ.சிவக்குமார்',
    'சோ.கெளசிகா'
  ];

  const districtVicePresidentsRural = [
    'ம.தங்கம்',
    'ரா.வடிவேலு',
    'மா.தணிகாசலம்',
    'க.பன்னீர்செல்வம்',
    'மா.முருகப்பெருமாள்',
    'ச.அருண்குமார்',
    'மு.இராஜேந்திரன்'
  ];

  const districtJointSecretaries = [
    'ச.ரஞ்சித்',
    'க.நந்தினி',
    'சி.காமேஷ்',
    'நடராஜ்',
    'ஜெ.அமுல்ராஜ்',
    'பழனிவேல்'
  ];

  const keyOfficeBearers: OfficeBearerCard[] = [
    { name: 'ரா.சரவணகுமார்', position: 'மாவட்ட தலைவர்' },
    { name: 'க.சதீஸ்குமார்', position: 'மாவட்ட செயலாளர்' },
    { name: 'ச.மனோஜ்', position: 'மாவட்ட பொருளாளர்' },
    { name: 'ந.வெங்கடேசன்', position: 'மாவட்ட ஒருங்கிணைப்பாளர்' },
    { name: 'ப.நவீன்குமார்', position: 'மாவட்ட விளம்பர செயலாளர்' },
    { name: 'சந்திரமதி', position: 'மாவட்ட மகளிர் பிரிவு செயலாளர்' },
    { name: 'து.சத்தியா கஸ்துரி', position: 'மாவட்ட மகளிர் பிரிவு இணை செயலாளர்' },
    { name: 'வெ.ராஜேஷ்', position: 'மாநில நிர்வாகக் குழு உறுப்பினர்' },
    { name: 'க.பாலசுப்ரமணியம்', position: 'மாநில செயலாளர்' }
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
            {districtPresidents.map((name, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg font-semibold text-gray-800 font-tamil">
                  {name}
                </p>
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
            {districtVicePresidentsRural.map((name, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg font-semibold text-gray-800 font-tamil">
                  {name}
                </p>
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
            {districtJointSecretaries.map((name, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg font-semibold text-gray-800 font-tamil">
                  {name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
