import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SiteNotice = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300); // small delay after load
    const autoClose = setTimeout(() => setShow(false), 3000); // auto hide in 3s
    return () => {
      clearTimeout(timer);
      clearTimeout(autoClose);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 w-[calc(100%-2rem)] sm:w-auto"
          role="status"
          aria-live="polite"
        >
          <div className="sm:mx-0 mx-auto max-w-md rounded-2xl shadow-2xl border border-green-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
            <div className="flex items-start p-4 sm:p-5">
              <div className="flex-shrink-0 mr-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">📚</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-tamil font-semibold text-green-800">
                  துறை தேர்வு புத்தகங்கள் சேர்க்கப்பட்டது! இப்போது பதிவிறக்கம் செய்யலாம்.
                </p>
                <a
                  href="/announcements#department-books"
                  className="mt-2 inline-flex text-xs sm:text-sm font-tamil font-bold text-green-700 underline decoration-2 underline-offset-2 hover:text-green-800"
                >
                  அறிவிப்புகள் பக்கத்தில் பார்க்க →
                </a>
              </div>
              <button
                aria-label="Close notification"
                className="ml-3 rounded-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={() => setShow(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteNotice;
