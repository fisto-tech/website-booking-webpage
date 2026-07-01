import React, { useContext, useState, useMemo } from 'react';
import { WebsiteContext } from '../context/WebsiteContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiCheckCircle, FiClock, FiDollarSign, FiFileText, FiDownload, FiArrowLeft } from 'react-icons/fi';
import WebsiteCard from '../components/WebsiteCard';
import EditModal from '../components/EditModal';

const AdminDashboard = () => {
  const { websites, editWebsite } = useContext(WebsiteContext);
  const { isAdmin } = useContext(AuthContext);
  const [editingWebsite, setEditingWebsite] = useState(null);
  const [currentView, setCurrentView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!isAdmin) {
    return <div className="p-8 text-center text-danger font-bold text-xl">Access Denied. Admins only.</div>;
  }

  const handleEditClick = (website) => {
    setEditingWebsite(website);
  };

  const handleSaveEdit = (updatedWebsite) => {
    editWebsite(updatedWebsite);
  };

  const handleExportCSV = () => {
    const headers = ['S.No', 'Website ID', 'Website Name', 'Category', 'Price', 'Advance Amount', 'Status', 'Customer Name', 'Company Name', 'Email', 'Phone', 'Booking Date', 'Location', 'Remarks'];
    
    const rows = websites.map((w, index) => [
      index + 1,
      w.websiteId || '',
      `"${w.websiteName || ''}"`,
      w.category || '',
      `"${w.price || ''}"`,
      `"${w.advanceAmount || '\u20B91,500'}"`,
      w.status || '',
      `"${w.customerName || ''}"`,
      `"${w.companyName || ''}"`,
      w.customerEmail || '',
      `"${w.customerPhone || ''}"`,
      w.bookingDate || '',
      `"${w.location || ''}"`,
      `"${w.remarks || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'booking_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(websites.length / itemsPerPage);
  
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return websites.slice(start, start + itemsPerPage);
  }, [websites, currentPage]);

  const stats = useMemo(() => {
    const total = websites.length;
    const available = websites.filter(w => w.status === 'Available').length;
    const reserved = websites.filter(w => w.status === 'Reserved').length;
    const booked = websites.filter(w => w.status === 'Booked').length;
    const soldOut = websites.filter(w => w.status === 'Sold Out').length;
    return { total, available, reserved, booked, soldOut };
  }, [websites]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background relative"
    >
      <div className="absolute top-0 left-0 w-full h-96 bg-mesh-pattern opacity-10 pointer-events-none z-0"></div>
      
      <div className={`bg-card border-b border-border shadow-lg ${currentView === 'report' ? 'py-6' : 'py-12'} px-4 sm:px-6 lg:px-8 relative z-10`}>
        <div className="w-[95%] md:w-[85%] max-w-none mx-auto flex justify-between items-center flex-col sm:flex-row">
          <div>
            <h1 className="text-4xl font-serif font-bold text-textPrimary">Admin Dashboard</h1>
            <p className="mt-2 text-textSecondary font-light">Manage your premium marketplace inventory and view analytics.</p>
          </div>
          {currentView === 'grid' ? (
            <button onClick={() => setCurrentView('report')} className="mt-6 sm:mt-0 flex items-center px-6 py-3 bg-primary text-background text-sm tracking-widest uppercase font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-[0_0_15px_rgba(197,160,89,0.3)]">
              <FiFileText className="mr-2" size={18} /> View Report
            </button>
          ) : (
            <button onClick={() => setCurrentView('grid')} className="mt-6 sm:mt-0 flex items-center px-6 py-3 bg-card border border-border text-textPrimary text-sm tracking-widest uppercase font-bold rounded-lg hover:border-primary/50 transition-colors">
              <FiArrowLeft className="mr-2" size={18} /> Back to Dashboard
            </button>
          )}
        </div>
      </div>

      <div className={`${currentView === 'report' ? 'w-[98%] sm:w-[95%]' : 'w-[95%] md:w-[85%]'} max-w-none mx-auto px-2 sm:px-6 lg:px-8 ${currentView === 'report' ? 'py-4' : 'py-6'} relative z-10`}>
        {currentView === 'grid' ? (
          <>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
              <div className="bg-card overflow-hidden shadow-lg border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary/10 rounded-md p-3 border border-primary/20">
                      <FiTrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-textSecondary truncate">Total Websites</dt>
                        <dd className="text-3xl font-bold text-textPrimary">{stats.total}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card overflow-hidden shadow-lg border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-success/10 rounded-md p-3 border border-success/20">
                      <FiCheckCircle className="h-6 w-6 text-success" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-textSecondary truncate">Available</dt>
                        <dd className="text-3xl font-bold text-textPrimary">{stats.available}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card overflow-hidden shadow-lg border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500/10 rounded-md p-3 border border-blue-500/20">
                      <FiClock className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-textSecondary truncate">Booked / Reserved</dt>
                        <dd className="text-3xl font-bold text-textPrimary">{stats.booked + stats.reserved}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card overflow-hidden shadow-lg border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-danger/10 rounded-md p-3 border border-danger/20">
                      <FiDollarSign className="h-6 w-6 text-danger" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-textSecondary truncate">Sold Out</dt>
                        <dd className="text-3xl font-bold text-textPrimary">{stats.soldOut}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory List */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-textPrimary">Current Inventory</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {websites.map(website => (
                <WebsiteCard 
                  key={website.websiteId} 
                  website={website} 
                  onEditClick={handleEditClick}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden flex flex-col w-full">
            <div className="p-3 sm:p-4 border-b border-border flex justify-between items-center bg-[#111] flex-col sm:flex-row gap-4 shrink-0">
              <h2 className="text-xl font-serif font-bold text-textPrimary">Detailed Booking Report</h2>
              <button onClick={handleExportCSV} className="flex items-center px-4 py-2 bg-background border border-border text-textSecondary text-xs tracking-widest uppercase font-bold rounded hover:text-primary transition-colors">
                <FiDownload className="mr-2" /> Export CSV
              </button>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-[#0a0a0a] shadow-sm">
                  <tr className="border-b border-border">
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">S.No</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">Website Name</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">Price</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">Advance</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">Customer Name</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">Company</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">Email</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">Phone</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">Date</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary whitespace-nowrap">Location</th>
                    <th className="py-4 px-6 text-xs tracking-widest uppercase font-bold text-textSecondary min-w-[200px]">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((w, i) => (
                    <tr key={w.websiteId} className="border-b border-border/50 hover:bg-[#111] transition-colors">
                      <td className="py-4 px-6 text-sm text-textSecondary">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                      <td className="py-4 px-6 text-sm font-bold text-white whitespace-nowrap">{w.websiteName} <br/><span className="text-[10px] text-primary font-mono font-normal">{w.websiteId}</span></td>
                      <td className="py-4 px-6 text-sm text-white whitespace-nowrap">{w.price}</td>
                      <td className="py-4 px-6 text-sm text-white whitespace-nowrap">{w.advanceAmount || '\u20B91,500'}</td>
                      <td className="py-4 px-6 text-sm whitespace-nowrap">
                        <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded border ${w.status === 'Available' ? 'text-success border-success/30' : w.status === 'Sold Out' ? 'text-danger border-danger/30' : 'text-blue-400 border-blue-400/30'}`}>{w.status}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-textSecondary whitespace-nowrap">{w.customerName || '-'}</td>
                      <td className="py-4 px-6 text-sm text-textSecondary whitespace-nowrap">{w.companyName || '-'}</td>
                      <td className="py-4 px-6 text-sm text-textSecondary whitespace-nowrap">{w.customerEmail || '-'}</td>
                      <td className="py-4 px-6 text-sm text-textSecondary whitespace-nowrap">{w.customerPhone || '-'}</td>
                      <td className="py-4 px-6 text-sm text-textSecondary whitespace-nowrap">{w.bookingDate || '-'}</td>
                      <td className="py-4 px-6 text-sm text-textSecondary whitespace-nowrap">{w.location || '-'}</td>
                      <td className="py-4 px-6 text-sm text-textSecondary">{w.remarks || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border bg-[#111] flex justify-between items-center text-sm text-textSecondary">
              <div>
                Showing {websites.length === 0 ? 0 : ((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, websites.length)} of {websites.length} entries
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-[#1a1a1a] border border-border rounded hover:text-white disabled:opacity-50 transition-colors"
                >
                  Prev
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1 bg-[#1a1a1a] border border-border rounded hover:text-white disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <EditModal 
        isOpen={!!editingWebsite} 
        onClose={() => setEditingWebsite(null)}
        website={editingWebsite}
        onSave={handleSaveEdit}
      />
    </motion.div>
  );
};

export default AdminDashboard;
