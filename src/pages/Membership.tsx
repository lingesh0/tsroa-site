import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

interface FormData {
  fullName: string;
  employeeId: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  district: string;
  officeAddress: string;
  homeAddress: string;
  consent: boolean;
}

const Membership = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    employeeId: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    district: '',
    officeAddress: '',
    homeAddress: '',
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'முழுப் பெயரை உள்ளிடவும்';
    if (!formData.employeeId.trim()) return 'ஊழியர் ஐடியை உள்ளிடவும்';
    if (!formData.email.trim()) return 'மின்னஞ்சலை உள்ளிடவும்';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'சரியான மின்னஞ்சலை உள்ளிடவும்';
    if (!formData.phone.trim()) return 'மொபைல் எண்ணை உள்ளிடவும்';
    if (!/^[0-9]{10}$/.test(formData.phone)) return 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்';
    if (!formData.department.trim()) return 'துறையை உள்ளிடவும்';
    if (!formData.designation.trim()) return 'பதவியை உள்ளிடவும்';
    if (!formData.district.trim()) return 'மாவட்டத்தை உள்ளிடவும்';
    if (!formData.officeAddress.trim()) return 'அலுவலக முகவரியை உள்ளிடவும்';
    if (!formData.homeAddress.trim()) return 'வீட்டு முகவரியை உள்ளிடவும்';
    if (!formData.consent) return 'விதிமுறைகள் மற்றும் நிபந்தனைகளை ஏற்கவும்';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'membershipApplications'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setSuccess(true);
      setFormData({
        fullName: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        district: '',
        officeAddress: '',
        homeAddress: '',
        consent: false
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('விண்ணப்பம் சமர்ப்பிக்கும்போது பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.');
    } finally {
      setLoading(false);
    }
  };

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
            உறுப்பினர் விண்ணப்பம்
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 font-tamil text-lg">
            தமிழ் மாநில வருவாய்ததுறை அலுவலர் சங்கத்தில் சேர விண்ணப்பிக்கவும்
          </p>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            className="max-w-3xl mx-auto mb-8 bg-green-100 border-l-4 border-green-500 p-6 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 font-tamil font-semibold">
                உங்கள் விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! விரைவில் நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className="max-w-3xl mx-auto mb-8 bg-red-100 border-l-4 border-red-500 p-6 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-800 font-tamil font-semibold">{error}</p>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-tamil border-b-2 border-primary pb-2">
                தனிப்பட்ட தகவல்கள்
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-tamil">
                    முழுப் பெயர் <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors font-tamil"
                    placeholder="உங்கள் முழுப் பெயரை உள்ளிடவும்"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-tamil">
                    ஊழியர் ஐடி <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors font-tamil"
                    placeholder="ஊழியர் ஐடியை உள்ளிடவும்"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-tamil">
                    மின்னஞ்சல் <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-tamil">
                    மொபைல் எண் <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    placeholder="10 இலக்க எண்"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-tamil border-b-2 border-primary pb-2">
                பணியிடத் தகவல்கள்
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-tamil">
                    துறை <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors font-tamil"
                    placeholder="உங்கள் துறையை உள்ளிடவும்"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-tamil">
                    பதவி <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors font-tamil"
                    placeholder="உங்கள் பதவியை உள்ளிடவும்"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-tamil">
                    மாவட்டம் <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors font-tamil"
                    placeholder="மாவட்டத்தை உள்ளிடவும்"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2 font-tamil">
                    அலுவலக முகவரி <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="officeAddress"
                    value={formData.officeAddress}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors font-tamil"
                    placeholder="முழு அலுவலக முகவரியை உள்ளிடவும்"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 font-tamil border-b-2 border-primary pb-2">
                இருப்பிடத் தகவல்கள்
              </h2>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 font-tamil">
                  வீட்டு முகவரி <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors font-tamil"
                  placeholder="முழு வீட்டு முகவரியை உள்ளிடவும்"
                ></textarea>
              </div>
            </div>

            {/* Consent */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-primary border-2 border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-gray-700 font-tamil text-sm leading-relaxed">
                  நான் தமிழ்நாடு அரசு ஊழியர்கள் சங்கத்தின் விதிமுறைகள் மற்றும் நிபந்தனைகள் மற்றும் 
                  தனியுரிமைக் கொள்கை ஆகியவற்றை படித்தும், ஒப்புக்கொள்கிறேன். கொடுத்த தகவல்கள் அனைத்தும் 
                  உண்மையானவை என்பதை உறுதிப்படுத்துகிறேன். <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-12 py-4 rounded-full font-tamil font-bold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>சமர்ப்பிக்கப்படுகிறது...</span>
                  </span>
                ) : (
                  'விண்ணப்பத்தை சமர்ப்பிக்கவும்'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Membership;
