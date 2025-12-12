import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// No Firebase download URLs; serve static PDFs from public folders

interface PDF {
  id: string;
  fileNameTamil: string;
  fileNameStatic: string;
  fileNameFirebase?: string;
  color: string;
  icon: string;
  description: string;
}

const PdfLibrary = () => {
  const [pdfUrls, setPdfUrls] = useState<Record<string, { static?: string }>>({});
  const [loading, setLoading] = useState(true);

  const pdfs: PDF[] = [
    {
      id: 'vao-guide',
      fileNameTamil: 'மனன VAO Guide',
      fileNameStatic: 'Manana VAO guide.pdf',
      color: 'from-green-50 to-emerald-50 border-green-200',
      icon: '📘',
      description: 'கிராம நிர்வாக அலுவலர் வழிகாட்டி'
    },
    {
      id: 'vao-notes',
      fileNameTamil: 'VAO Notes by Ramki',
      fileNameStatic: 'Vao Notes By Ramki.pdf',
      color: 'from-blue-50 to-indigo-50 border-blue-200',
      icon: '📝',
      description: 'VAO தேர்வுக்கான விரிவான குறிப்புகள்'
    },
    {
      id: 'vao-material',
      fileNameTamil: 'VAO Material',
      fileNameStatic: 'VAO Material.pdf',
      color: 'from-purple-50 to-pink-50 border-purple-200',
      icon: '📚',
      description: 'கிராம நிர்வாக அலுவலர் பாடம்'
    }
  ];

  useEffect(() => {
    const fetchPdfUrls = async () => {
      const urls: Record<string, { static?: string }> = {};

      for (const pdf of pdfs) {
        urls[pdf.id] = {};

        // Static file paths under public folders
        // Prefer documents/DepartmentEXAM-books/, fallback to documents/, new/, or images/ if needed
        const candidates = [
          `/documents/DepartmentEXAM-books/${encodeURIComponent(pdf.fileNameStatic)}`,
          `/documents/${encodeURIComponent(pdf.fileNameStatic)}`,
          `/new/${encodeURIComponent(pdf.fileNameStatic)}`,
          `/images/${encodeURIComponent(pdf.fileNameStatic)}`
        ];
        // Choose the first candidate (runtime existence not verifiable here)
        urls[pdf.id].static = candidates[0];
      }

      setPdfUrls(urls);
      setLoading(false);
    };

    fetchPdfUrls();
  }, []);

  const handleDownloadTrack = async (pdfId: string, pdfName: string) => {
    // Optional: Track download in Firestore
    try {
      const response = await fetch('/api/track-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfId, pdfName })
      });
      if (!response.ok) console.warn('Download tracking failed');
    } catch (error) {
      console.warn('Download tracking error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        {pdfs.map((pdf, index) => {
          const urls = pdfUrls[pdf.id] || {};
          const availableUrl = urls.static;
          const hasFile = !!availableUrl;

          return (
            <motion.div
              key={pdf.id}
              className={`bg-gradient-to-br ${pdf.color} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start flex-1">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-3xl shadow-md">
                      {pdf.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 font-tamil group-hover:text-primary transition-colors">
                      {pdf.fileNameTamil}
                    </h3>
                    <p className="text-sm text-gray-600 font-tamil">
                      {pdf.description}
                    </p>
                    {!hasFile && (
                      <p className="text-xs text-red-600 font-tamil mt-2">
                        ⚠️ ஆவணம் இப்போது கிடைக்கவில்லை
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  {/* View Button */}
                  <motion.a
                    href={availableUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 sm:flex-none px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-tamil font-semibold text-sm whitespace-nowrap ${
                      hasFile
                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 cursor-pointer shadow-md'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                    }`}
                    onClick={(e) => {
                      if (hasFile) {
                        handleDownloadTrack(pdf.id, pdf.fileNameTamil);
                      } else {
                        e.preventDefault();
                      }
                    }}
                    whileHover={hasFile ? { scale: 1.05 } : {}}
                    whileTap={hasFile ? { scale: 0.95 } : {}}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    பார்க்க
                  </motion.a>

                  {/* Download Button */}
                  <motion.a
                    href={availableUrl || '#'}
                    download={pdf.fileNameStatic}
                    className={`flex-1 sm:flex-none px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-tamil font-semibold text-sm whitespace-nowrap ${
                      hasFile
                        ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 cursor-pointer shadow-md'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                    }`}
                    onClick={(e) => {
                      if (hasFile) {
                        handleDownloadTrack(pdf.id, pdf.fileNameTamil);
                      } else {
                        e.preventDefault();
                      }
                    }}
                    whileHover={hasFile ? { scale: 1.05 } : {}}
                    whileTap={hasFile ? { scale: 0.95 } : {}}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    பதிவிறக்க
                  </motion.a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Offline Notice */}
      <motion.div
        className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-blue-800 font-tamil">
          💾 இந்த PDFs உங்கள் ப்ரௌசர் கேஷ்ல சேமிக்கப்பட்டுள்ளன. ஆனலைன் வசதி இல்லாமல் பார்க்கலாம்.
        </p>
      </motion.div>
    </div>
  );
};

export default PdfLibrary;
