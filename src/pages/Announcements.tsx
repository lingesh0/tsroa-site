import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { motion } from 'framer-motion';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: any;
}

interface Document {
  name: string;
  fileName: string;
  date: string;
  category: string;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookUrls, setBookUrls] = useState<Record<string, string>>({});

  // Documents list from public/documents folder
  const documents: Document[] = [
    { name: 'TSROA நாமக்கல் மாவட்டம்', fileName: 'TSROA DT KKM.pdf', date: '2025-09-05', category: 'Association' },
    { name: 'TSROA கள்ளக்குறிச்சி உறுப்பினர்கள்', fileName: 'TSROA Kallakurichi Members.pdf', date: '2025-09-05', category: 'Association' },
    { name: 'விழிப்புணர்வு வாரம் உறுதிமொழி', fileName: 'Vigilance Awareness Week Pledge_251026_213258.pdf', date: '2025-10-26', category: 'Circular' },
    { name: 'அமைச்சர் சொ.த.ர. செயலாளர் நெறிமுறைகள்', fileName: 'US_SOP_20.06.2025.pdf', date: '2025-06-20', category: 'GO/Circular' },
    { name: 'ஓய்வூதிய குழு - கடிதம் எண்.900', fileName: 'Letter No.900 Pension Committee.pdf', date: '2025-09-18', category: 'Letter' },
    { name: 'துறை தேர்வு அனுமதி', fileName: 'Permission for Dept. Exam (1).pdf', date: '2025', category: 'Circular' },
    { name: 'பனை மர வெட்டு அரசு உத்தரவு', fileName: 'Panai Tree GO & Committee_0001.pdf', date: '2025', category: 'GO' },
    { name: 'பனை மர வெட்டு', fileName: 'palm tree cutting.pdf', date: '2025', category: 'Document' },
    { name: '30 ஆண்டு போனஸ் சம்பள உயர்வு விளக்கம்', fileName: 'O.A. - 30 yrs bonus increment- clarification (1).pdf', date: '2025', category: 'Circular' },
    { name: 'நில கையகப்படுத்தல் - நடுவர் பதவி', fileName: 'LA - Arbitration post.pdf', date: '2025', category: 'Document' },
    { name: 'கல்வெட்டு 2', fileName: 'kalvettu 2.pdf', date: '2025', category: 'Document' },
    { name: 'தனிப்பட்ட விஷயங்களுக்கு UEL பணமாக்கம் - IT விளக்கம்', fileName: 'IT on encashment of UEL on private affairs clarification.pdf', date: '2025', category: 'Circular' },
    { name: 'விருந்தினர் இல்ல வாடகை அரசாணை 2012', fileName: 'GUEST HOUSE RENT GO 2012.pdf', date: '2012', category: 'GO' },
    { name: 'அரசு ஆணை எண்.390 - 19.06.2025', fileName: 'G.O.MS.390_19.06.2025_US_1.pdf', date: '2025-06-19', category: 'GO' },
    { name: 'ஆவணம் 319', fileName: 'Document 319.pdf', date: '2025', category: 'Document' },
    { name: 'ஆவண ஸ்கேனர் 10 செப் 2025', fileName: 'DocScanner 10 Sept 2025 5-43 pm.pdf', date: '2025-09-10', category: 'Document' },
    { name: 'ஆவணம் - 29.03.2025', fileName: 'DOC-20250329-WA0005.pdf', date: '2025-03-29', category: 'Document' },
    { name: 'வேளாண் தலைமை செயலாளர் MS 232 - 2021', fileName: 'agri_t_ms_232_h1_2021.pdf', date: '2021', category: 'GO' },
    { name: 'ACE ஸ்கேனர் - 03.01.2025', fileName: 'ACE Scanner_2025_01_03.pdf', date: '2025-01-03', category: 'Document' },
    { name: 'அரசு ஆணை - 04.12.2024', fileName: '531-04122024223214.pdf', date: '2024-12-04', category: 'GO' },
    { name: 'முக்கியமான மற்றும் முக்கியமற்ற பதவிகள் - CRA சுற்றறிக்கை', fileName: 'Sensitive non Sensitive post CRA Cercular.pdf', date: '2025', category: 'Circular' },
    { name: 'ஓய்வு காலத்தில் இடைநீக்கம் தவிர்ப்பு - TN Gazette No.543', fileName: 'TN Gazette No.543 - Avoiding Suspension on Retirement Dt.pdf', date: '2025', category: 'Gazette' },
    { name: 'கடிதம் (Ms) எண்.636 - 18.09.2025', fileName: 'Letter (Ms) No.636_Ser.8(1)_2025, dated 18.09.2025.pdf', date: '2025-09-18', category: 'Letter' },
    { name: 'அறியப்படாத மனு', fileName: 'unknow name pettition.pdf', date: '2025', category: 'Petition' },
    { name: 'ஆவண ஸ்கேனர் 08 செப் 2025 - 14:20', fileName: 'new/DocScanner 08-Sept-2025 14-20.pdf', date: '2025-09-08', category: 'ஆவணம்' },
    { name: 'ஆவண ஸ்கேனர் 08 செப் 2025 - 14:22', fileName: 'new/DocScanner 08-Sept-2025 14-22.pdf', date: '2025-09-08', category: 'ஆவணம்' },
    { name: 'ஆவண ஸ்கேனர் 08 செப் 2025 - 14:27', fileName: 'new/DocScanner 08-Sept-2025 14-27.pdf', date: '2025-09-08', category: 'ஆவணம்' },
    { name: 'ஆவண ஸ்கேனர் 08 செப் 2025 - 14:29', fileName: 'new/DocScanner 08-Sept-2025 14-29.pdf', date: '2025-09-08', category: 'ஆவணம்' }
  ];

  useEffect(() => {
    const q = query(collection(db, 'announcements'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const announcementsData: Announcement[] = [];
      snapshot.forEach((doc) => {
        announcementsData.push({ id: doc.id, ...doc.data() } as Announcement);
      });
      setAnnouncements(announcementsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch PDF URLs from Firebase Storage
  useEffect(() => {
    const fetchBookUrls = async () => {
      const urls: Record<string, string> = {};
      
      const bookFiles = [
        'Manana VAO guide.pdf',
        'Vao Notes By Ramki.pdf',
        'VAO Material.pdf'
      ];

      for (const file of bookFiles) {
        try {
          const fileRef = ref(storage, `books/${file}`);
          const url = await getDownloadURL(fileRef);
          urls[file] = url;
        } catch (error) {
          console.warn(`Failed to fetch URL for ${file}:`, error);
        }
      }

      setBookUrls(urls);
    };

    fetchBookUrls();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'முக்கியம்';
      case 'medium':
        return 'நடுத்தரம்';
      default:
        return 'சாதாரணம்';
    }
  };

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
            அறிவிப்புகள்
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 font-tamil text-lg">
            எங்கள் சங்கத்தின் சமீபத்திய அறிவிப்புகள் மற்றும் புதுப்பிப்புகள்
          </p>
        </motion.div>

        {/* Special Announcement - Department Exam Books */}
        <motion.div
          className="mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-green-500 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-300 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-300 rounded-full -ml-12 -mb-12 opacity-20"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-600 shadow-lg animate-pulse">
                  <span className="text-3xl">📚</span>
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-3 font-tamil">
                  🎉 புதிய அறிவிப்பு: துறை தேர்வு புத்தகங்கள் 🎉
                </h2>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-bold font-tamil animate-bounce">
                    புதியது
                  </span>
                  <span className="text-sm text-green-700 font-tamil font-semibold">
                    📅 {new Date().toLocaleDateString('ta-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-lg">
                <p className="text-lg md:text-xl text-gray-800 font-tamil leading-relaxed text-center mb-4">
                  வருவாய் துறை அலுவலர்களின் துறை தேர்வுக்கான முக்கியமான புத்தகங்கள் மற்றும் வழிகாட்டிகள் இப்போது பதிவிறக்கம் செய்ய கிடைக்கின்றன!
                </p>
                <div className="space-y-3 text-gray-700 font-tamil">
                  <div className="flex items-start">
                    <span className="mr-3 text-2xl">📖</span>
                    <p className="flex-1">VAO (கிராம நிர்வாக அலுவலர்) வழிகாட்டிகள் மற்றும் குறிப்புகள்</p>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 text-2xl">📋</span>
                    <p className="flex-1">வருவாய் நிலையான ஆணைகள் (Revenue Standing Orders) 1-4 தமிழில்</p>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 text-2xl">✅</span>
                    <p className="flex-1">துறை தேர்வுக்கு தேவையான அனைத்து ஆவணங்களும் ஒரே இடத்தில்</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="#department-books"
                  className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full font-bold text-lg font-tamil hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  புத்தகங்களை பதிவிறக்கம் செய்ய கீழே செல்லவும்
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Announcements List */}
        {announcements.length === 0 ? null : (
          <div className="max-w-4xl mx-auto space-y-6">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${getPriorityColor(
                  announcement.priority
                )} hover:shadow-xl transition-all duration-300`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold font-tamil ${
                          announcement.priority === 'high'
                            ? 'bg-red-200 text-red-800'
                            : announcement.priority === 'medium'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-blue-200 text-blue-800'
                        }`}
                      >
                        {getPriorityBadge(announcement.priority)}
                      </span>
                      <span className="text-sm text-gray-500 font-tamil">
                        {new Date(announcement.date).toLocaleDateString('ta-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 font-tamil">
                      {announcement.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 font-tamil text-lg leading-relaxed whitespace-pre-line">
                  {announcement.content}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Department Exam Books Section */}
        <motion.div
          id="department-books"
          className="mt-16 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <div className="inline-block bg-green-100 rounded-full px-6 py-2 mb-4">
              <span className="text-green-700 font-bold font-tamil text-sm">📚 துறை தேர்வுக்கான புத்தகங்கள்</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4 font-tamil">
              வருவாய் துறை தேர்வு புத்தகங்கள் & வழிகாட்டிகள்
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600 font-tamil text-lg">
              VAO மற்றும் வருவாய் துறை தேர்வுக்கான இலவச பதிவிறக்க புத்தகங்கள்
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
            {/* VAO Guide Book */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-green-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start flex-1">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📘</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-tamil group-hover:text-green-700 transition-colors">
                      Manana VAO Guide - கிராம நிர்வாக அலுவலர் வழிகாட்டி
                    </h3>
                    <p className="text-sm text-gray-600 font-tamil mb-2">
                      VAO தேர்வுக்கான முழுமையான வழிகாட்டி புத்தகம்
                    </p>
                  </div>
                </div>
                <a
                  href={bookUrls['Manana VAO guide.pdf'] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-shrink-0 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil ${
                    bookUrls['Manana VAO guide.pdf']
                      ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                  onClick={(e) => {
                    if (!bookUrls['Manana VAO guide.pdf']) {
                      e.preventDefault();
                    }
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {bookUrls['Manana VAO guide.pdf'] ? 'பார்க்க / பதிவிறக்க' : 'வெற்றே'}
                </a>
              </div>
            </motion.div>

            {/* VAO Notes by Ramki */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-blue-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start flex-1">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📝</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-tamil group-hover:text-blue-700 transition-colors">
                      VAO Notes by Ramki - ராம்கி குறிப்புகள்
                    </h3>
                    <p className="text-sm text-gray-600 font-tamil mb-2">
                      VAO தேர்வுக்கான விரிவான குறிப்புகள் மற்றும் டிப்ஸ்
                    </p>
                  </div>
                </div>
                <a
                  href={bookUrls['Vao Notes By Ramki.pdf'] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-shrink-0 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil ${
                    bookUrls['Vao Notes By Ramki.pdf']
                      ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                  onClick={(e) => {
                    if (!bookUrls['Vao Notes By Ramki.pdf']) {
                      e.preventDefault();
                    }
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {bookUrls['Vao Notes By Ramki.pdf'] ? 'பார்க்க / பதிவிறக்க' : 'வெற்றே'}
                </a>
              </div>
            </motion.div>

            {/* VAO Material */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-purple-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start flex-1">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-tamil group-hover:text-purple-700 transition-colors">
                      VAO Material - கிராம நிர்வாக அலுவலர் பாடம்
                    </h3>
                    <p className="text-sm text-gray-600 font-tamil mb-2">
                      தேர்வுக்கான முழுமையான பாடத்திட்ட பொருட்கள்
                    </p>
                  </div>
                </div>
                <a
                  href={bookUrls['VAO Material.pdf'] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-shrink-0 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil ${
                    bookUrls['VAO Material.pdf']
                      ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                  onClick={(e) => {
                    if (!bookUrls['VAO Material.pdf']) {
                      e.preventDefault();
                    }
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {bookUrls['VAO Material.pdf'] ? 'பார்க்க / பதிவிறக்க' : 'வெற்றே'}
                </a>
              </div>
            </motion.div>

            {/* Revenue Standing Orders */}
            {[1, 2, 3, 4].map((num) => (
              <motion.div
                key={num}
                className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-orange-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + (num * 0.05) }}
              >
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start flex-1">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{num}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 font-tamil group-hover:text-orange-700 transition-colors">
                        வருவாய் நிலையான ஆணை - {num} (தமிழில்)
                      </h3>
                      <p className="text-sm text-gray-600 font-tamil mb-2">
                        Revenue Standing Order Part-{num} in Tamil
                      </p>
                    </div>
                  </div>
                  <a
                    href={`/documents/DepartmentEXAM-books/REVENUE STANDING ORDER-${num} TAMIL.pdf`}
                    download
                    className="flex-shrink-0 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    பதிவிறக்கம்
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Box */}
          <motion.div
            className="mt-8 max-w-3xl mx-auto bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-bold text-blue-900 font-tamil mb-2">📌 குறிப்பு:</h4>
                <p className="text-blue-800 font-tamil text-sm leading-relaxed">
                  இந்த புத்தகங்கள் வருவாய் துறை தேர்வுக்கு தயாராகும் அனைத்து அலுவலர்களுக்கும் இலவசமாக வழங்கப்படுகிறது. மேலும் விவரங்களுக்கு சங்க அலுவலகத்தை தொடர்பு கொள்ளவும்.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Documents Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-tamil">
              ஆவணங்கள்
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
            <p className="text-gray-600 font-tamil">
              முக்கியமான ஆவணங்கள் மற்றும் அரசாணைகள்
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 gap-4 md:gap-6">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.fileName}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start flex-1 w-full sm:w-auto">
                    <div className="flex-shrink-0 mr-3">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <span className="inline-block px-2 md:px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full font-tamil">
                          {doc.category}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2 font-tamil group-hover:text-primary transition-colors line-clamp-2">
                        {doc.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 font-tamil">
                        தேதி: {new Date(doc.date).toLocaleDateString('ta-IN')}
                      </p>
                    </div>
                  </div>
                  <a
                    href={encodeURI(`/documents/${doc.fileName}`)}
                    download
                    className="flex-shrink-0 bg-primary text-white px-4 py-2 md:p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil text-sm md:text-base w-full sm:w-auto justify-center"
                    title="பதிவிறக்கம்"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="sm:hidden">பதிவிறக்கம்</span>
                  </a>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 md:px-6 py-2 md:py-3 border-t border-blue-200">
                  <p className="text-xs text-gray-600 font-tamil truncate">
                    {doc.fileName}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Announcements;
