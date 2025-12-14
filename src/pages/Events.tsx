import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  createdAt: any;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData: Event[] = [];
      snapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() } as Event);
      });
      // Append static text-only news card for Villupuram CEC meeting (31/10/2020)
      eventsData.push({
        id: 'static-villupuram-2020',
        title: 'மத்திய செயற்குழு – விழுப்புரம்',
        date: '2020-10-31',
        description:
          'திரு.இரா. ரகுநாதன் மாநில துணைத் தலைவர் தலைமையில் 31/10/2020 அன்று விழுப்புரம் மாவட்டத்தில் மத்திய செயற்குழு (CEC) கூட்டம் நடைபெற்றது.'
      } as Event);
      eventsData.push({
        id: 'static-namakkal-protest-2021',
        title: '20 அம்ச கோரிக்கைகள் – கவன ஈர்ப்பு போராட்டம்',
        date: '2021-02-09',
        description:
          'திரு.இரா. ரகுநாதன் அவர்களின் தலைமையில் 20 அம்ச கோரிக்கைகள் நிறைவேற்ற கோரி மாவட்ட ஆட்சியர் அலுவலகம் முன்பு 09/02/2021 அன்று கவன ஈர்ப்பு போராட்டம் நடத்தப்பட்டது.'
      } as Event);
      eventsData.push({
        id: 'static-district-executive-2025',
        title: 'மாவட்ட செயற்குழு கூட்டம் – சிறப்பு அழைப்புனர்',
        date: '2025-09-20',
        description:
          '20/09/2025 அன்று திரு.ரா. சரவணகுமார் மாவட்டத்தலைவர் அவர்களின் தலைமையில் மாவட்ட செயற்குழு கூட்டத்தில் சிறப்பு அழைப்புனராக திரு. வி.சுந்தர்ராஜன் மாநில பொதுச்செயலாளர் அவர்கள் கலந்து கொண்டார்.'
      } as Event);
      setEvents(eventsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

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
            நிகழ்வுகள்
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 font-tamil text-lg">
            எங்கள் சங்கத்தின் வரவிருக்கும் மற்றும் கடந்த நிகழ்வுகள்
          </p>
        </motion.div>

        {/* Events Grid */}
        {events.length === 0 ? null : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {event.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-primary mb-3">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-semibold font-tamil">
                      {new Date(event.date).toLocaleDateString('ta-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 font-tamil">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 font-tamil line-clamp-3">
                    {event.description}
                  </p>
                  {event.location && (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-tamil">{event.location}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* News & Announcements Section */}
        <div className="mt-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-tamil">
              செய்திகள் & அறிவிப்புகள்
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          </motion.div>

          <div className="space-y-6">
            {/* News 0: Department Exam Books Available */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-xl p-6 border-l-4 border-green-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <span className="text-3xl">📚</span>
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold font-tamil animate-pulse">
                      புதியது
                    </span>
                    <span className="text-sm text-gray-500 font-tamil">
                      📅 {new Date().toLocaleDateString('ta-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 font-tamil mb-3">
                    துறை தேர்வு புத்தகங்கள் இப்போது கிடைக்கின்றன! 🎉
                  </h3>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <p className="text-gray-700 font-tamil mb-3 leading-relaxed">
                      TSROA நாமக்கல் மாவட்டம் அனைத்து வருவாய் துறை அலுவலர்களுக்காக துறை தேர்வுக்கான முக்கியமான புத்தகங்கள் மற்றும் வழிகாட்டிகளை இப்போது இணையதளத்தில் பதிவேற்றம் செய்துள்ளது.
                    </p>
                    <div className="space-y-2">
                      <p className="font-tamil font-bold text-green-800">📖 கிடைக்கும் புத்தகங்கள்:</p>
                      <ul className="space-y-1 text-gray-700 font-tamil text-sm ml-4">
                        <li className="flex items-start">
                          <span className="mr-2">✅</span>
                          <span>Manana VAO Guide - கிராம நிர்வாக அலுவலர் வழிகாட்டி</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">✅</span>
                          <span>VAO Notes by Ramki - ராம்கி குறிப்புகள்</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">✅</span>
                          <span>VAO Material - பாடத்திட்ட பொருட்கள்</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">✅</span>
                          <span>வருவாய் நிலையான ஆணைகள் 1-4 (தமிழில்)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
                    <p className="text-green-900 font-tamil font-bold mb-2">
                      🔔 எங்கிருந்து பதிவிறக்கம் செய்வது?
                    </p>
                    <p className="text-green-800 font-tamil text-sm mb-3">
                      அறிவிப்புகள் பக்கத்தில் "துறை தேர்வு புத்தகங்கள்" பிரிவில் அனைத்து புத்தகங்களும் இலவசமாக பதிவிறக்கம் செய்ய கிடைக்கின்றன.
                    </p>
                    <a
                      href="/announcements#department-books"
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-tamil text-sm"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      இப்போதே பதிவிறக்கம் செய்யவும்
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 font-tamil mt-4">
                    💡 குறிப்பு: தொடர்ந்து புதிய புத்தகங்கள் மற்றும் பொருட்கள் சேர்க்கப்படும். தளத்தை தொடர்ந்து பார்வையிடவும்!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* News 1: Government Gazette */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
                    <span className="text-red-600 font-bold">⚡</span>
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 font-tamil mb-3">
                    ஓய்வு பெறும் நாளில் அரசுப் பணியாளர்களை தற்காலிகப் பணிநீக்கத்தில் வைக்கும் நடைமுறையை தவிர்த்தல்
                  </h3>
                  <p className="text-gray-700 font-tamil mb-4 leading-relaxed">
                    தமிழ் நாடு அரசு தற்காலிகப் பணிநீக்க நடவடிக்கையை தவிர்க்க புதிய அரசாணை (எண்.47, HRD, நாள்: 29.08.2025) வெளியிட்டு தமிழ்நாடு அரசிதழில் சட்டமாக வெளியிட்டுள்ளது.
                  </p>
                  <p className="text-sm text-gray-600 font-tamil">
                    📅 தேதி: 29.08.2025 | ✊ FEDRA மாநில ஒருங்கிணைப்பாளர்கள் சந்திப்பு வெற்றிகரம்
                  </p>
                </div>
              </div>
            </motion.div>

            {/* News 2: FEDRA Meeting */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                    <span className="text-blue-600 font-bold">🤝</span>
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 font-tamil mb-3">
                    FEDRA மாநில மையம் - தலைமைச் செயலாளர் சந்திப்பு
                  </h3>
                  <div className="bg-blue-50 rounded p-4 mb-4">
                    <p className="text-gray-700 font-tamil mb-3 leading-relaxed">
                      வருவாய் துறை சங்கங்களின் கூட்டமைப்பு (FEDRA) ஒருங்கிணைப்பாளர்கள் தமிழ்நாடு அரசின் மதிப்பிற்குரிய தலைமைச் செயலாளர் அவர்களை சந்தித்து ஆறு வகையான கோரிக்கைகளை முன்வைத்தனர்:
                    </p>
                    <ul className="space-y-2 text-gray-700 font-tamil text-sm">
                      <li className="flex items-start">
                        <span className="mr-2">1️⃣</span>
                        <span>திட்ட முகாம்களின் எண்ணிக்கையை குறைக்க வேண்டும்</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">2️⃣</span>
                        <span>மனுக்களை முடிவெடுப்பதற்கு 45 நாட்கள் போதாது - குறைந்தபட்சம் 75 நாட்கள் வேண்டும்</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">3️⃣</span>
                        <span>கணினி முனையங்கள் 5-ல் இருந்து குறைந்தபட்சம் 10-க்கு உயர்த்த வேண்டும்</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">4️⃣</span>
                        <span>வருவாய் துறைக்கு முகாம் செலவினங்களுக்கு குறைந்தபட்சம் ₹10,000/- வழங்க வேண்டும்</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">5️⃣</span>
                        <span>உள்ளாட்சி அமைப்புகளிலிருந்து பணியாளர்களை ஈடுபடுத்த வேண்டும்</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">6️⃣</span>
                        <span>ஒவ்வொரு வட்டத்திற்கும் தற்காலிக துணை வட்டாட்சியர் பணியிடம் வழங்க வேண்டும்</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 font-tamil">
                    ✅ தலைமைச் செயலாளர் அவர்கள் அனைத்து கோரிக்கைகளையும் ஏற்றுக்கொண்டு நடவடிக்கை எடுக்குமாறு உறுதிளித்தார்கள்.
                  </p>
                  <p className="text-sm text-gray-600 font-tamil mt-2">
                    📅 தேதி: 30.09.2025 | 🎤 பத்திரிகையாளர் சந்திப்பு: 01.10.2025
                  </p>
                </div>
              </div>
            </motion.div>

            {/* News 3: Compassionate Appointment */}
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-accent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-amber-100">
                    <span className="text-amber-600 font-bold">💼</span>
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 font-tamil mb-3">
                    பணியின் போது உயிரிழக்கும் ஊழியர் குடும்பத்திற்கான புதிய கருணை நিயமன விதிகள்
                  </h3>
                  <div className="bg-amber-50 rounded p-4 mb-4">
                    <p className="text-gray-700 font-tamil mb-3 leading-relaxed font-bold">
                      "கருணை என்பது ஒரு கடமை, பிச்சை அல்ல" - சென்னை உயர் நீதிமன்றம்
                    </p>
                    <p className="text-gray-700 font-tamil mb-3 leading-relaxed">
                      தமிழ்நாடு அரசு பணியின்போது உயிரிழக்கும் அரசு ஊழியர்களின் குடும்பங்களுக்கு வழங்கப்படும் கருணை அடிப்படையிலான பணி நியமனம் (Compassionate Appointment) விதிகளில் மনிதாபிமான மாற்றங்களை கொண்டு வந்துள்ளது.
                    </p>
                    <div className="space-y-2 text-gray-700 font-tamil text-sm">
                      <p className="font-bold text-primary">🔑 முக்கிய மாற்றங்கள்:</p>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span><strong>திருமணமான மகளுக்கு வாய்ப்பு:</strong> கணவர் மற்றும் பிள்ளைகளுடன் பெற்றோரை சார்ந்து வாழ்ந்தவர் விண்ணப்பிக்கலாம்</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span><strong>மருமகனுக்கும் வாய்ப்பு:</strong> திருமணமான மகள் வேலைக்கு முடியாத நிலையில் மருமகன் விண்ணப்பிக்கலாம்</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span><strong>வறுமைக் கோட்டு வரையறை:</strong> ஆண்டு வருமானம் ₹3 லட்சத்திற்குக் குறைவாக இருந்தால் வறுமையாக கருதப்படும்</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span><strong>விண்ணப்ப கால அவகாசம்:</strong> ஊழியர் இறந்த நாளிலிருந்து 3 ஆண்டுகளுக்குள்</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span><strong>வயது வரம்பு:</strong> பெற்றோர்/கணவர்/மனைவி 50 வயது வரை; குழந்தைகள்/சகோதரர் 40 வயது வரை</span>
                      </li>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-tamil">
                    📅 அரசாணை: தமிழ்நாடு அரசுப் பணிகள் (கருணை அடிப்படையில் நியமனம்) விதிகள், 2023
                  </p>
                </div>
              </div>
            </motion.div>

            {/* FEDRA Participants */}
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-primary/5 rounded-lg shadow p-6 border-l-4 border-primary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-bold text-primary font-tamil mb-3">
                FEDRA சந்திப்பில் பங்கேற்ற ஒருங்கிணைப்பாளர்கள்:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-tamil text-gray-700">
                <p>🔹 தோழர். B.K.சிவக்குமார் (TSROA)</p>
                <p>🔹 தோழர் R.சையது அபுதாஹிர் (TNDRROA)</p>
                <p>🔹 தோழர் வி. சுந்தரராஜன் (TNTDTA)</p>
                <p>🔹 தோழர் கிருஷ்ணமூர்த்தி (TNCSA)</p>
                <p>🔹 தோழர் பிவி ஆனந்த் (TNBROA)</p>
                <p>🔹 தோழர்.மகேந்திர குமார் (TNSDOA)</p>
                <p>🔹 தோழர் முருகன் (TNGVAA)</p>
                <p>🔹 தோழர் தில்லை கோவிந்தன் (TNRVAA)</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
