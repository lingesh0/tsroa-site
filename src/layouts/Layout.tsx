import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SiteNotice from '../components/SiteNotice';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Do not interfere with hash navigation (e.g., #section links)
    if (!location.hash) {
      // Instantly scroll to the top on route change
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <SiteNotice />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
