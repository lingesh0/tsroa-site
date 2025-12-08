import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Application {
  id: string;
  fullName: string;
  employeeId: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  district: string;
  officeAddress: string;
  homeAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

const Admin = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'membershipApplications'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appsData: Application[] = [];
      snapshot.forEach((doc) => {
        appsData.push({ id: doc.id, ...doc.data() } as Application);
      });
      setApplications(appsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateApplicationStatus = async (appId: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'membershipApplications', appId), {
        status
      });
      setSelectedApp(null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteApplication = async (appId: string) => {
    try {
      const confirmed = window.confirm('இந்த விண்ணப்பத்தை நீக்க வேண்டுமா? இந்த செயல் மாற்ற முடியாது।');
      if (confirmed) {
        await deleteDoc(doc(db, 'membershipApplications', appId));
        setSelectedApp(null);
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'ஏற்கப்பட்டது';
      case 'rejected':
        return 'நிராகரிக்கப்பட்டது';
      default:
        return 'நிலுவையில்';
    }
  };

  const filteredApplications = applications.filter(app => 
    filter === 'all' ? true : app.status === filter
  );

  const downloadCSV = () => {
    const headers = ['பெயர்', 'ஊழியர் எண்', 'மின்னஞ்சல்', 'தொலைபேசி', 'துறை', 'பதவி', 'மாவட்டம்', 'அலுவலக முகவரி', 'வீட்டு முகவரி', 'நிலை'];
    const rows = filteredApplications.map(app => [
      app.fullName,
      app.employeeId,
      app.email,
      app.phone,
      app.department,
      app.designation,
      app.district,
      app.officeAddress,
      app.homeAddress,
      getStatusLabel(app.status)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tsroa_applications_${new Date().toLocaleDateString('ta-IN')}.csv`;
    link.click();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('TSROA Membership Applications', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 14, 22);

    const tableData = filteredApplications.map(app => [
      app.fullName,
      app.employeeId,
      app.email,
      app.phone,
      app.department,
      app.designation,
      app.district,
      getStatusLabel(app.status)
    ]);

    autoTable(doc, {
      head: [['Name', 'Emp ID', 'Email', 'Phone', 'Dept', 'Desig', 'District', 'Status']],
      body: tableData,
      startY: 28,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [30, 64, 175], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { top: 28 }
    });

    doc.save(`tsroa_applications_${new Date().toLocaleDateString('en-IN')}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2 font-tamil">
                நிர்வாக பேனல்
              </h1>
              <p className="text-gray-600 font-tamil">
                உறுப்பினர் விண்ணப்பங்களை நிர்வகிக்கவும்
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 md:mt-0 bg-red-500 text-white px-6 py-2 rounded-lg font-tamil font-semibold hover:bg-red-600 transition-colors"
            >
              வெளியேறு
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                { value: 'all', label: 'அனைத்தும்', count: applications.length },
                { value: 'pending', label: 'நிலுவையில்', count: applications.filter(a => a.status === 'pending').length },
                { value: 'approved', label: 'ஏற்கப்பட்டது', count: applications.filter(a => a.status === 'approved').length },
                { value: 'rejected', label: 'நிராகரிக்கப்பட்டது', count: applications.filter(a => a.status === 'rejected').length }
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value as any)}
                  className={`px-3 sm:px-6 py-2 rounded-lg font-tamil font-semibold text-sm transition-all ${
                    filter === tab.value
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={downloadCSV}
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 bg-green-600 text-white rounded-lg font-tamil font-semibold text-sm sm:text-base hover:bg-green-700 transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>CSV</span>
              </button>
              <button
                onClick={downloadPDF}
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 bg-red-600 text-white rounded-lg font-tamil font-semibold text-sm sm:text-base hover:bg-red-700 transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider font-tamil">பெயர்</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider font-tamil">ஊழியர் எண்</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider font-tamil">மின்னஞ்சல்</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider font-tamil">தொலைபேசி</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider font-tamil">துறை</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider font-tamil">பதவி</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider font-tamil">மாவட்டம்</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider font-tamil">நிலை</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider font-tamil">செயல்கள்</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500 font-tamil">
                      விண்ணப்பங்கள் இல்லை
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app, index) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-tamil font-semibold text-gray-900">{app.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-tamil text-gray-700">{app.employeeId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-tamil text-gray-700">{app.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-tamil text-gray-700">{app.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-tamil text-gray-700">{app.designation}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-tamil text-gray-700">{app.district}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full font-tamil ${getStatusColor(app.status)}`}>
                          {getStatusLabel(app.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="text-primary hover:text-blue-900 font-semibold font-tamil"
                        >
                          பார்க்க
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedApp && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary font-tamil">
                    விண்ணப்ப விவரங்கள்
                  </h2>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-tamil">
                      தனிப்பட்ட தகவல்கள்
                    </h3>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 font-tamil">பெயர்</p>
                        <p className="font-semibold font-tamil">{selectedApp.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-tamil">ஊழியர் ஐடி</p>
                        <p className="font-semibold">{selectedApp.employeeId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-tamil">மின்னஞ்சல்</p>
                        <p className="font-semibold">{selectedApp.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-tamil">மொபைல்</p>
                        <p className="font-semibold">{selectedApp.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Work Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-tamil">
                      பணியிடத் தகவல்கள்
                    </h3>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600 font-tamil">துறை</p>
                        <p className="font-semibold font-tamil">{selectedApp.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-tamil">பதவி</p>
                        <p className="font-semibold font-tamil">{selectedApp.designation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-tamil">மாவட்டம்</p>
                        <p className="font-semibold font-tamil">{selectedApp.district}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600 font-tamil">அலுவலக முகவரி</p>
                        <p className="font-semibold font-tamil">{selectedApp.officeAddress}</p>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-tamil">
                      வீட்டு முகவரி
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold font-tamil">{selectedApp.homeAddress}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-tamil">
                      நிலை
                    </h3>
                    <span className={`inline-block px-4 py-2 rounded-lg text-lg font-semibold font-tamil ${getStatusColor(selectedApp.status)}`}>
                      {getStatusLabel(selectedApp.status)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {selectedApp.status === 'pending' && (
                    <div className="flex space-x-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => updateApplicationStatus(selectedApp.id, 'approved')}
                        className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-tamil font-bold hover:bg-green-600 transition-colors"
                      >
                        ஏற்கவும்
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApp.id, 'rejected')}
                        className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-tamil font-bold hover:bg-red-600 transition-colors"
                      >
                        நிராகரிக்கவும்
                      </button>
                    </div>
                  )}

                  {/* Delete Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => deleteApplication(selectedApp.id)}
                      className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-tamil font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      விண்ணப்பத்தை நீக்கு
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;
