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

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

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

        {/* Announcements List */}
        {announcements.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
            <p className="text-xl text-gray-600 font-tamil">
              தற்போது எந்த அறிவிப்புகளும் இல்லை
            </p>
          </motion.div>
        ) : (
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
                    href={`/documents/${doc.fileName}`}
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
