import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError('தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்');
      } else if (err.code === 'auth/too-many-requests') {
        setError('பல முயற்சிகள். சிறிது நேரம் கழித்து முயற்சிக்கவும்');
      } else {
        setError('உள்நுழைவில் பிழை. மீண்டும் முயற்சிக்கவும்');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-2 rounded-full shadow-xl border-2 border-primary">
              <img
                src="/tsroa-logo.png"
                alt="TSROA Logo"
                className="h-20 w-20 object-cover rounded-full"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2 font-tamil">
            நிர்வாக உள்நுழைவு
          </h1>
          <p className="text-gray-600 font-tamil">
            நிர்வாக பேனலுக்கு அணுகல்
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 rounded"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-red-800 font-tamil font-semibold">{error}</p>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 font-tamil">
              மின்னஞ்சல்
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 font-tamil">
              கடவுச்சொல்
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-tamil font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>உள்நுழைகிறது...</span>
              </span>
            ) : (
              'உள்நுழைக'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-tamil">
            நிர்வாகிகள் மட்டும் அணுகல்
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
