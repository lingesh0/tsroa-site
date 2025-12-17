import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  url: string;
  name: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Load images from public/images/gallery folder
    const imageFiles = [
      // New: 12/12/2023 District President election (FIRST)
      'district-president-saravanakumar-2023-12-12.jpg',
      'WhatsApp Image 2025-12-14 at 07.22.17_7025e63f.jpg',
      'WhatsApp Image 2025-12-14 at 07.22.20_1c32bc8e.jpg',
      'WhatsApp Image 2025-12-14 at 07.46.07_a2210506.jpg',
      // New: 27/07/2025 District Collector oath greeting
      'collector-namakkal-2025-07-27.jpg'
    ];

    const galleryImages = imageFiles.map((fileName) => ({
      url: `/images/gallery/${fileName}`,
      name:
        fileName === 'district-president-saravanakumar-2023-12-12.jpg'
          ? 'முன்னாள் மாநில துணைத்தலைவர் திரு.இரா. ரகுநாதன் அவர்களால் மாவட்டத்தலைவராக ரா. சரவணகுமார் அவர்கள் 12/12/23 அன்று தேர்த்தெடுக்கப்பட்டார்'
          : fileName === 'WhatsApp Image 2025-12-14 at 07.22.17_7025e63f.jpg'
          ? '31/10/2020 அன்று நடைபெற்ற மத்திய செயற்குழு கூட்டம் விழப்புரம் மாவட்டத்தில் கலந்து கொண்ட போது'
          : fileName === 'WhatsApp Image 2025-12-14 at 07.22.20_1c32bc8e.jpg'
          ? 'திரு.இரா. ரகுநாதன் அவர்களின் தலைமையில் 20அம்ச கோரிக்கைகள் நிறைவேற்ற கோரி கவன ஈர்ப்பு போராட்டம் மாவட்ட ஆட்சியர் அலுவலகம் முன்பு 09/02/2021 அன்று நடைபெற்ற போது'
          : fileName === 'WhatsApp Image 2025-12-14 at 07.46.07_a2210506.jpg'
          ? 'மாவட்ட செயற்குழு கூட்டம் – 20/09/2025 (சிறப்பு அழைப்புனர்: திரு. வி.சுந்தர்ராஜன்; தலைமையில்: திரு.ரா. சரவணகுமார்)'
              : fileName === 'collector-namakkal-2025-07-27.jpg'
              ? '27/07/2025 நாமக்கல் மாவட்ட ஆட்சியராக திருமதி. துர்காமூர்த்தி அவர்கள் பதவியேற்பின் போது – TSROA சங்கம் சார்பாக நேரில் வாழ்த்துக்கள்'
          : fileName
    }));

    setImages(galleryImages);
    setLoading(false);
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
            படத்தொகுப்பு
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 font-tamil text-lg">
            எங்கள் சங்கத்தின் நிகழ்வுகள் மற்றும் செயல்பாடுகள்
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xl text-gray-600 font-tamil">
              தற்போது எந்த படங்களும் இல்லை
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.name}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedImage(image.url)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Caption */}
                <div className="p-3 bg-white">
                  <p className="text-sm text-gray-700 font-tamil break-words">
                    {image.name}
                  </p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <motion.img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
