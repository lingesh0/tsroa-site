import { motion } from 'framer-motion';

const Contact = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const contactPersons = [
    {
      name: 'ரா.சரவணகுமார்',
      position: 'மாவட்ட தலைவர்',
      phone: '+91 91596 56661',
      email: 'president@tsroa-namakkal.org'
    },
    {
      name: 'க.சதீஸ்குமார்',
      position: 'மாவட்ட செயலாளர்',
      phone: '+91 97892 33462',
      email: 'secretary@tsroa-namakkal.org'
    },
    {
      name: 'ச.மனோஜ்',
      position: 'மாவட்ட பொருளாளர்',
      phone: '+91 96774 40469',
      email: 'treasurer@tsroa-namakkal.org'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3 sm:mb-4 font-tamil">
            தொடர்பு
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 font-tamil text-base sm:text-lg">
            எங்களை தொடர்பு கொள்ளுங்கள்
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <motion.div className="space-y-6" {...fadeIn}>
            {/* Office Address */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="bg-primary bg-opacity-10 rounded-full p-2 sm:p-3">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 font-tamil">
                    அலுவலக முகவரி
                  </h3>
                  <p className="text-gray-700 font-tamil leading-relaxed text-sm sm:text-base">
                    வருவாய்த்துறை அலுவலர்கள் மனமகிழ் மன்றம்,<br />
                    வட்டாட்சியர் அலுவலகம்,<br />
                    நாமக்கல் – 637001<br />
                    தமிழ்நாடு, இந்தியா
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-primary bg-opacity-10 rounded-full p-2 sm:p-3">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 font-tamil">
                    பதிவு விவரங்கள்
                  </h3>
                  <p className="text-gray-700 font-tamil text-sm sm:text-base">
                    <span className="font-semibold">பதிவு எண்:</span> 5/2016<br />
                    <span className="font-semibold">அமைப்பு:</span> தமிழ் மாநில வருவாய்ததுறை அலுவலர் சங்கம்
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Persons */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 font-tamil">
                தொடர்பு நபர்கள்
              </h3>
              <div className="space-y-6">
                {contactPersons.map((person, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h4 className="text-base sm:text-lg font-bold text-gray-800 font-tamil">
                      {person.name}
                    </h4>
                    <p className="text-primary font-semibold font-tamil mb-1 sm:mb-2 text-sm sm:text-base">
                      {person.position}
                    </p>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="text-xs sm:text-sm">{person.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span className="text-xs sm:text-sm">{person.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 font-tamil">
              இருப்பிடம்
            </h3>
            <div className="aspect-[16/10] sm:aspect-video rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.0!2d78.1667!3d11.2167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDEzJzAwLjEiTiA3OMKwMTAnMDAuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
            <p className="mt-3 sm:mt-4 text-gray-600 font-tamil text-xs sm:text-sm">
              வட்டாட்சியர் அலுவலகம், நாமக்கல்
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
