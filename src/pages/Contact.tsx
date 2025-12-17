import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [showPdfModal, setShowPdfModal] = useState(false);

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

        {/* Department Contact Numbers */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 font-tamil text-center">
              நாமக்கல் மாவட்டம் – துறைவாரியான தொடர்பு எண்கள்
            </h2>
            <p className="text-center text-gray-600 font-tamil mb-8">
              Information Department - Year 2024
            </p>

            <div className="overflow-x-auto max-h-[600px] overflow-y-auto rounded-lg border border-gray-200">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gradient-to-r from-primary to-blue-600 text-white">
                    <th className="py-2 px-3 text-left font-tamil border border-blue-700 text-xs sm:text-sm">துறை</th>
                    <th className="py-2 px-3 text-left font-tamil border border-blue-700 text-xs sm:text-sm">தொலைபேசி எண்</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-xs sm:text-sm">
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Collector</td><td className="py-2 px-3 border border-gray-200 font-mono">9444163000, 04286-281101</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Superintendent of Police</td><td className="py-2 px-3 border border-gray-200 font-mono">94981-25126, 04286-281000</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Forest Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">9486800789</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Revenue Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">9445000910, 04286-281103</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Project Director, DRDA</td><td className="py-2 px-3 border border-gray-200 font-mono">7373704208, 9486346685, 04286-280666</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">DRO / MD, Mohanur Sugar mill</td><td className="py-2 px-3 border border-gray-200 font-mono">9489900205, 8778909086</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">RDO, Namakkal</td><td className="py-2 px-3 border border-gray-200 font-mono">9445000431, 04286-232101</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">RDO, Tiruchengode</td><td className="py-2 px-3 border border-gray-200 font-mono">9445000432, 04288-256000</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Project Director, Magalir Thittam</td><td className="py-2 px-3 border border-gray-200 font-mono">94440 94318</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Cooperative Joint Registrar</td><td className="py-2 px-3 border border-gray-200 font-mono">04286-280031, 73387 21300</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Chief Educational Officer, Namakkal</td><td className="py-2 px-3 border border-gray-200 font-mono">9489900300, 7373002791, 04286-232094</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Information & Public Relations Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">9498042436, 04286-281011</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">PA to Collector (General)</td><td className="py-2 px-3 border border-gray-200 font-mono">9445008144, 04286-281106</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Additional PA (Land) to Collector</td><td className="py-2 px-3 border border-gray-200 font-mono">9566350267, 04286-281112</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">PA (Dev) to Collector</td><td className="py-2 px-3 border border-gray-200 font-mono">7402606852, 9944549260, 04286-280634</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">PA(Agri) To Collector</td><td className="py-2 px-3 border border-gray-200 font-mono">9443393026</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">PA Noon Meals</td><td className="py-2 px-3 border border-gray-200 font-mono">7402606853, 04286-281015</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">PA (Accounts) to Collector</td><td className="py-2 px-3 border border-gray-200 font-mono">7397430609, 04286-280193</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">RDMA (Salem Region)</td><td className="py-2 px-3 border border-gray-200 font-mono">7397396273, 04286-2350536</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">TNSTC, Managing Director (FAC)</td><td className="py-2 px-3 border border-gray-200 font-mono">9487997001, 9487997300, 0427-2314391</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD (Panchayat)</td><td className="py-2 px-3 border border-gray-200 font-mono">7402606854, 9443944157, 04286-280152</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD (Town Panchayat)</td><td className="py-2 px-3 border border-gray-200 font-mono">8925809216</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Special Deputy Collector (SSS)</td><td className="py-2 px-3 border border-gray-200 font-mono">9445461743, 9791456668, 04286-280104</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Assistant Commissioner (Namakkal)</td><td className="py-2 px-3 border border-gray-200 font-mono">9942310448</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AC HR & CE (Anjaneyar Temple)</td><td className="py-2 px-3 border border-gray-200 font-mono">8838197351, 04286-290781</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AC HR & CE (Arthanareeswarar Temple)</td><td className="py-2 px-3 border border-gray-200 font-mono">6374371854</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Supply Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">9445000232, 04286-281116</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Assistant Commissioner (Excise)</td><td className="py-2 px-3 border border-gray-200 font-mono">9445074587, 04286-281108</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">DM, Tasmac</td><td className="py-2 px-3 border border-gray-200 font-mono">9445029718</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District BC Welfare Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">9445477850, 04286-280193</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Adi Dravidar Welfare Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">7338801265, 04286-280101</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Social Welfare Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">9865623237, 04286-280230</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AC Labour (Enforcement)</td><td className="py-2 px-3 border border-gray-200 font-mono">9245828711</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">DCPO</td><td className="py-2 px-3 border border-gray-200 font-mono">9791407362, 04286-281080</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Employment Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">8220777776, 04286-222260</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Sports & Youth Welfare Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">7401703492, 7305353532, 04286-280882</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">GM (DIC)</td><td className="py-2 px-3 border border-gray-200 font-mono">04286-281151, 9443161401, 8925533972</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Differently Abled Welfare</td><td className="py-2 px-3 border border-gray-200 font-mono">9842470586, 04286-280019</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD Exservice Man Welfare</td><td className="py-2 px-3 border border-gray-200 font-mono">9444532531, 04286-233079</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Designated Officer (Food Safety)</td><td className="py-2 px-3 border border-gray-200 font-mono">9894301986, 04286-299429</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Manager, TAHDCO</td><td className="py-2 px-3 border border-gray-200 font-mono">9445029508, 04286-291178</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">PO, Tribal Welfare</td><td className="py-2 px-3 border border-gray-200 font-mono">9443836370</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD, Mines</td><td className="py-2 px-3 border border-gray-200 font-mono">37845234596, 04286-28099</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">GM, AAVIN</td><td className="py-2 px-3 border border-gray-200 font-mono">9942396532</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Dean, Govt Medical College</td><td className="py-2 px-3 border border-gray-200 font-mono">7358151470</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">JD Medical</td><td className="py-2 px-3 border border-gray-200 font-mono">9444982673, 7358121898, 04286-222230</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">DD Health</td><td className="py-2 px-3 border border-gray-200 font-mono">7358122520, 04286-281424</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD Tamil Development</td><td className="py-2 px-3 border border-gray-200 font-mono">9487776832</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Divisional Fire Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">9445086370, 04286-231423</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">SE, TANGEDCO</td><td className="py-2 px-3 border border-gray-200 font-mono">9445852400, 04286-281305</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Divisional Engineer, Highways</td><td className="py-2 px-3 border border-gray-200 font-mono">9442190915, 04286-230351</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Executive Engineer, PWD (C&M)</td><td className="py-2 px-3 border border-gray-200 font-mono">9842522525, 04286-230966</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Executive Engineer, WRO</td><td className="py-2 px-3 border border-gray-200 font-mono">9443480409, 04287-223633</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Executive Engineer, RWS</td><td className="py-2 px-3 border border-gray-200 font-mono">9698210457, 04286-280860</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">JD Agri</td><td className="py-2 px-3 border border-gray-200 font-mono">9994554849, 04286-280465</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">DD Agri Marketing</td><td className="py-2 px-3 border border-gray-200 font-mono">9443363660, 04286-280281</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">DD Horticulture</td><td className="py-2 px-3 border border-gray-200 font-mono">9443546409, 04286-280827</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">JD Animal Husbandry</td><td className="py-2 px-3 border border-gray-200 font-mono">9842772072, 04286-290670</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD, Sericulture</td><td className="py-2 px-3 border border-gray-200 font-mono">9585641557, 04286-290749</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Environmental Engineer, Namakkal</td><td className="py-2 px-3 border border-gray-200 font-mono">8056042231, 04286-280722</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Environmental Engineer, Kumarapalayam</td><td className="py-2 px-3 border border-gray-200 font-mono">8056042210</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD, Art & Culture</td><td className="py-2 px-3 border border-gray-200 font-mono">9444668932</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD, HandLoom</td><td className="py-2 px-3 border border-gray-200 font-mono">9488477700</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">RTO South Namakkal</td><td className="py-2 px-3 border border-gray-200 font-mono">9443508019</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">RTO North, Namakkal</td><td className="py-2 px-3 border border-gray-200 font-mono">9442233553, 04286-280885</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Regional Manager, TNCSC</td><td className="py-2 px-3 border border-gray-200 font-mono">9443237737, 04286-280280</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD Fisheries, Mettur Dam</td><td className="py-2 px-3 border border-gray-200 font-mono">7904697121, 9384824262, 04298-244045</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">DD Statistics</td><td className="py-2 px-3 border border-gray-200 font-mono">9445458072, 04286-280204</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Deputy Commissioner, Commercial Tax</td><td className="py-2 px-3 border border-gray-200 font-mono">9445195224, 9380753965, 04286-220502</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD, Survey</td><td className="py-2 px-3 border border-gray-200 font-mono">7904778385</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">AD, Skill Development</td><td className="py-2 px-3 border border-gray-200 font-mono">9499055842</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Library Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">9944471292</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Tourism Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">7397715684</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Treasury Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">9080521438</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">NIC Officer</td><td className="py-2 px-3 border border-gray-200 font-mono">9080521438</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">E-District Manager</td><td className="py-2 px-3 border border-gray-200 font-mono">9600214024</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">LDM, Namakkal</td><td className="py-2 px-3 border border-gray-200 font-mono">9443941389</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Special Tahsildar (Elections)</td><td className="py-2 px-3 border border-gray-200 font-mono">9443943699, 04286-281180</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Tahsildar (TACTV)</td><td className="py-2 px-3 border border-gray-200 font-mono">9498002580</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">Tahsildar (Disaster Management)</td><td className="py-2 px-3 border border-gray-200 font-mono">9659356193, 04286-281377</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">District Registrar (Admin)</td><td className="py-2 px-3 border border-gray-200 font-mono">9994702545, 04286-281080</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">RJD Collegiate Education</td><td className="py-2 px-3 border border-gray-200 font-mono">94449-58266, 04342-233177</td></tr>
                  <tr className="hover:bg-blue-50 transition-colors"><td className="py-2 px-3 border border-gray-200">DD Textiles, Tirupur</td><td className="py-2 px-3 border border-gray-200 font-mono">9443570745</td></tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowPdfModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-tamil">முழு தொலைபேசி அடைவை பார்க்க (PDF)</span>
              </button>
              <p className="text-xs text-gray-500 mt-4 font-tamil">
                மேலும் விவரங்களுக்கு (தாசில்தார், BDO மற்றும் பிற அதிகாரிகள்) PDF ஐ பார்க்கவும்
              </p>
            </div>
          </div>
        </motion.div>

        {/* PDF Modal */}
        {showPdfModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <motion.div
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary to-blue-600 text-white rounded-t-xl">
                <h3 className="text-lg sm:text-xl font-bold font-tamil">
                  நாமக்கல் மாவட்டம் தொலைபேசி அடைவு - 2024
                </h3>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 overflow-hidden">
                <iframe
                  src="/documents/contacts/Namakkal Dist Telphone Directory  - 2024..pdf"
                  className="w-full h-full"
                  title="Namakkal District Telephone Directory 2024"
                />
              </div>

              {/* Download Button */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <a
                  href="/documents/contacts/Namakkal Dist Telphone Directory  - 2024..pdf"
                  download
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-tamil">PDF பதிவிறக்கம்</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
