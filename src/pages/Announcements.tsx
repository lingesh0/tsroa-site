import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
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

// Map specific large PDFs to Google Drive direct download links to avoid Git/GitHub size limits
const driveLinks: Record<string, string> = {
  'Manana VAO guide.pdf': '11iwiijrg_qetPVgXFuNFdtPVhP1tQ9oo',
  'REVENUE STANDING ORDER-1 TAMIL.pdf': '1fUudbSolIBsyPGjRPO_kAURol3t2UlFr',
  'REVENUE STANDING ORDER-2 TAMIL.pdf': '186JYDO5YkU4eFnubualP31FFUdKzc6GS',
  'REVENUE STANDING ORDER-3 TAMIL.pdf': '1prnJrHQwMoB1tDHNplfJbA0dKfLLXKyI',
  'REVENUE STANDING ORDER-4 TAMIL.pdf': '1SJhGZTOcg2v5uoUGgUuwawgkT9EjTEmR',
  'vao matirial .pdf': '18X-H_PuhwMtUY4EZxc5lISyHpfsDj1Mx',
  'Vao Notes By Ramki.pdf': '1ddIruH-OBiWo_fyFOCjSCmFp7xtWNELg',
  'Establishment rules Anna Institute of Management.pdf': '1R0c5OOSTUulLxJWslU6x1Wep5nC-HRPh',
  'அரசுப்_பணியாளர்களுக்கான_வரைவுகள்_கையேடு_2019.pdf': '1US5ygqJv4khDyKNhRujy-AcimksE2Jo1',
  '531-04122024223214.pdf': '1BSRrOP11c3x-hb0fWjNjH6U9SZmKvtR1',
  'ACE Scanner_2025_01_03.pdf': '1ix9NIiTf0mc2tlp6qhFADi4KrRCQq-7B',
  'agri_t_ms_232_h1_2021.pdf': '1B8qL8NgC2TpeOArBxBUKCSy5WeqKCacZ',
  'DOC-20250329-WA0005.pdf': '1o_MojUHIjH2ifEsfdQ3pIpzgAoLyHiWy',
  'DocScanner 10 Sept 2025 5-43 pm.pdf': '17xk5wf_NPiXDTQ3Bc-IAGjJB2b5oGwMI',
  'Document 319.pdf': '1Y3tOIk9g0aFzCHlQ_y0hARcG8VsiZqhd',
  'G.O.MS.390_19.06.2025_US_1.pdf': '1TRgHX72gHLPArybrRgOzGZ1MaFuPFbPY',
  'GUEST HOUSE RENT GO 2012.pdf': '1ftCnicYoDfI6feKc6ATKrK97Ppw8p4LQ',
  'IT on encashment of UEL on private affairs clarification.pdf': '1d5eebZeG5KES9ZaYG1o6G1h843rlmh85',
  'kalvettu 2.pdf': '1ZoP3kQaOkdWbH6zk497zCLouf0bD_BDW',
  'LA - Arbitration post.pdf': '1ZoP3kQaOkdWbH6zk497zCLouf0bD_BDW',
  'Vigilance Awareness Week Pledge_251026_213258.pdf': '1ZxWh5cRUHDjv2_PY3djAGQ02S0WAIq5o',
  'New Book.pdf': '1rGM_T4Fnmx3GB3-7PMqiEv6_e9LLlu6l',
  'GEO Document.pdf': '1VpsELaltbky2R6Muy2H79LoY2wcnF_iA'
};

const buildDownloadLink = (fileName: string) => {
  const driveId = driveLinks[fileName];
  if (driveId) {
    return `https://drive.google.com/uc?export=download&id=${driveId}`;
  }

  const trimmed = fileName.trim();

  // Serve all non-Drive files from public/documents (supports nested paths like new/abc.pdf)
  return encodeURI(`/documents/${trimmed}`);
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'books' | 'circulars' | 'others'>('books');
  // Static PDFs served from public/pdfs in production

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
    { name: 'ஆவண ஸ்கேனர் 08 செப் 2025 - 14:29', fileName: 'new/DocScanner 08-Sept-2025 14-29.pdf', date: '2025-09-08', category: 'ஆவணம்' },
    { name: 'GEO ஆவணம்', fileName: 'GEO Document.pdf', date: '2025-01-07', category: 'GO' }
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

  // No Firebase Storage: PDFs are in public/pdfs, downloaded as raw files

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12 px-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3 md:mb-4 font-tamil">
            அறிவிப்புகள்
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 font-tamil text-sm md:text-lg">
            எங்கள் சங்கத்தின் சமீபத்திய அறிவிப்புகள் மற்றும் புதுப்பிப்புகள்
          </p>
        </motion.div>

        {/* Selector + Sections */}
        {/* Special Announcement - Department Exam Books */}
        <motion.div
          className="mb-8 md:mb-12 max-w-3xl md:max-w-4xl mx-auto px-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-2xl p-4 md:p-8 border-2 border-green-500 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-300 rounded-full -mr-16 -mt-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-300 rounded-full -ml-12 -mb-12 opacity-20"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-600 shadow-lg animate-pulse">
                  <span className="text-3xl">📚</span>
                </span>
              </div>
              
              <div className="text-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-4xl font-bold text-green-900 mb-2 md:mb-3 font-tamil">
                  🎉 புதிய அறிவிப்பு: துறை தேர்வு புத்தகங்கள் 🎉
                </h2>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-full text-xs sm:text-sm font-bold font-tamil animate-bounce">
                    புதியது
                  </span>
                  <span className="text-sm text-green-700 font-tamil font-semibold">
                    📅 {new Date().toLocaleDateString('ta-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 mb-4 md:mb-6 shadow-lg">
                <p className="text-sm md:text-xl text-gray-800 font-tamil leading-relaxed text-center mb-2 md:mb-4">
                  வருவாய்த்துறை அலுவலர்களின் துறை தேர்வுக்கான முக்கியமான புத்தகங்கள் மற்றும் வழிகாட்டிகள் இப்போது பதிவிறக்கம் செய்ய கிடைக்கின்றன!
                </p>
                <div className="space-y-3 text-gray-700 font-tamil">
                  <div className="flex items-start">
                    <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">📖</span>
                    <p className="flex-1">VAO (கிராம நிர்வாக அலுவலர்) வழிகாட்டிகள் மற்றும் குறிப்புகள்</p>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">📋</span>
                    <p className="flex-1">வருவாய் நிலையான ஆணைகள் (Revenue Standing Orders) 1-4 தமிழில்</p>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">✅</span>
                    <p className="flex-1">துறை தேர்வுக்கு தேவையான அனைத்து ஆவணங்களும் ஒரே இடத்தில்</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="#department-books"
                  className="inline-flex items-center w-full sm:w-auto px-5 md:px-8 py-2.5 md:py-4 bg-green-600 text-white rounded-full font-bold text-sm md:text-lg font-tamil hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
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

        {/* Two-section layout: sidebar selector and content */}
        <div className="mt-6 md:mt-8 px-2">
          {/* Centered Toggle Selector */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-1 md:p-2">
              <button
                onClick={() => setActiveSection('books')}
                className={`px-3 md:px-6 py-2.5 md:py-4 rounded-xl font-bold font-tamil text-sm md:text-lg transition-all duration-300 ${
                  activeSection === 'books'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                📚 புத்தகங்கள்
              </button>
              <button
                onClick={() => setActiveSection('circulars')}
                className={`ml-2 px-3 md:px-6 py-2.5 md:py-4 rounded-xl font-bold font-tamil text-sm md:text-lg transition-all duration-300 ${
                  activeSection === 'circulars'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                📰 அரசாணைகள்
              </button>
              <button
                onClick={() => setActiveSection('others')}
                className={`ml-2 px-3 md:px-6 py-2.5 md:py-4 rounded-xl font-bold font-tamil text-sm md:text-lg transition-all duration-300 ${
                  activeSection === 'others'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                📄 பிற ஆவணங்கள்
              </button>
            </div>
          </div>
          {/* Content Section with Conditional Rendering */}
          <div className="max-w-6xl mx-auto">
        {/* Department Exam Books Section */}
        {activeSection === 'books' && (
        <motion.div
          id="books"
          className="mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-2 mb-4">
              <span className="text-blue-700 font-bold font-tamil text-sm">📚 துறை தேர்வுக்கான புத்தகங்கள்</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent mb-4 font-tamil">
              வருவாய்த்துறை தேர்வு புத்தகங்கள் & வழிகாட்டிகள்
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 mb-4"></div>
            <p className="text-gray-600 font-tamil text-lg">
              VAO மற்றும் வருவாய்த்துறை தேர்வுக்கான இலவச பதிவிறக்க புத்தகங்கள்
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
                  href={buildDownloadLink('Manana VAO guide.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-shrink-0 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  பதிவிறக்கம்
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
                  href={buildDownloadLink('Vao Notes By Ramki.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-shrink-0 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  பதிவிறக்கம்
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
                  href={buildDownloadLink('vao matirial .pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-shrink-0 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  பதிவிறக்கம்
                </a>
              </div>
            </motion.div>

            {/* Establishment Rules - Anna Institute */}
            <motion.div
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-teal-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start flex-1">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📖</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-tamil group-hover:text-teal-700 transition-colors">
                      Establishment Rules - Anna Institute of Management
                    </h3>
                    <p className="text-sm text-gray-600 font-tamil mb-2">
                      நிறுவன விதிமுறைகள் - அண்ணா நிர்வாகக் கழகம்
                    </p>
                  </div>
                </div>
                <a
                  href={buildDownloadLink('Establishment rules Anna Institute of Management.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-shrink-0 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  பதிவிறக்கம்
                </a>
              </div>
            </motion.div>

            {/* Government Employees Drafts Manual 2019 */}
            <motion.div
              className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-rose-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start flex-1">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📋</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-tamil group-hover:text-rose-700 transition-colors">
                      அரசுப் பணியாளர்களுக்கான வரைவுகள் கையேடு 2019
                    </h3>
                    <p className="text-sm text-gray-600 font-tamil mb-2">
                      அரசு ஊழியர்கள் வரைவு மற்றும் கடிதங்களுக்கான முழுமையான வழிகாட்டி
                    </p>
                  </div>
                </div>
                <a
                  href={buildDownloadLink('அரசுப்_பணியாளர்களுக்கான_வரைவுகள்_கையேடு_2019.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-shrink-0 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  பதிவிறக்கம்
                </a>
              </div>
            </motion.div>

            {/* New Book */}
            <motion.div
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-yellow-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start flex-1">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📘</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-tamil group-hover:text-yellow-700 transition-colors">
                      புதிய புத்தகம்
                    </h3>
                    <p className="text-sm text-gray-600 font-tamil mb-2">
                      வருவாய்த்துறை தேர்வுக்கான புதிய வழிகாட்டி
                    </p>
                  </div>
                </div>
                <a
                  href={buildDownloadLink('New Book.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-shrink-0 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil bg-yellow-600 text-white hover:bg-yellow-700 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  பதிவிறக்கம்
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
                    href={buildDownloadLink(`REVENUE STANDING ORDER-${num} TAMIL.pdf`)}
                    target="_blank"
                    rel="noopener noreferrer"
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
        )}

        {/* Documents/Circulars Section */}
        {activeSection === 'circulars' && (
        <motion.div
          id="circulars"
          className="mt-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-2 mb-4">
              <span className="text-green-700 font-bold font-tamil text-sm">📰 அரசாணைகள்</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4 font-tamil">
              முக்கியமான அரசாணைகள் மற்றும் சுற்றறிக்கைகள்
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-emerald-500 mb-4"></div>
            <p className="text-gray-600 font-tamil text-lg">
              வருவாய்த்துறை தொடர்பான அரசாணைகள் மற்றும் முக்கிய ஆவணங்கள்
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 gap-4 md:gap-6">
            {documents.filter(d => (d.category?.toLowerCase?.() || '').includes('go') || (d.category?.toLowerCase?.() || '').includes('circular')).map((doc, index) => (
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
                    href={buildDownloadLink(doc.fileName)}
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
        )}

        {/* Other Documents Section */}
        {activeSection === 'others' && (
        <motion.div
          id="others"
          className="mt-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-2 mb-4">
              <span className="text-purple-700 font-bold font-tamil text-sm">📄 பிற ஆவணங்கள்</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4 font-tamil">
              பிற முக்கிய ஆவணங்கள்
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mb-4"></div>
            <p className="text-gray-600 font-tamil text-lg">
              வருவாய்த்துறை தொடர்பான பிற முக்கிய ஆவணங்கள் மற்றும் கடிதங்கள்
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 gap-4 md:gap-6">
            {documents.filter(d => {
              const cat = (d.category?.toLowerCase?.() || '');
              return !cat.includes('go') && !cat.includes('circular');
            }).map((doc, index) => (
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
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <span className="inline-block px-2 md:px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full font-tamil">
                          {doc.category}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2 font-tamil group-hover:text-purple-600 transition-colors line-clamp-2">
                        {doc.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 font-tamil">
                        தேதி: {new Date(doc.date).toLocaleDateString('ta-IN')}
                      </p>
                    </div>
                  </div>
                  <a
                    href={buildDownloadLink(doc.fileName)}
                    download
                    className="flex-shrink-0 bg-purple-600 text-white px-4 py-2 md:p-3 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 font-tamil text-sm md:text-base w-full sm:w-auto justify-center"
                    title="பதிவிறக்கம்"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="sm:hidden">பதிவிறக்கம்</span>
                  </a>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-100 px-4 md:px-6 py-2 md:py-3 border-t border-purple-200">
                  <p className="text-xs text-gray-600 font-tamil truncate">
                    {doc.fileName}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
