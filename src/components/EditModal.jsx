import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSave } from 'react-icons/fi';

const EditModal = ({ isOpen, onClose, website, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (website) {
      setFormData(website);
    }
  }, [website, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-card border border-border rounded-xl shadow-2xl w-[90%] max-w-none max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div className="absolute inset-0 bg-mesh-pattern opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-center p-6 border-b border-border bg-background/80 backdrop-blur">
            <h3 className="text-xl font-serif font-bold text-textPrimary tracking-tight">
              Edit Inventory: <span className="text-primary font-mono font-normal">{website?.websiteId}</span>
            </h3>
            <button onClick={onClose} className="text-textSecondary hover:text-danger transition-colors">
              <FiX size={24} />
            </button>
          </div>
          
          <div className="relative z-10 p-6 overflow-y-auto flex-1 custom-scrollbar">
            <form id="edit-form" onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-widest capitalize font-bold text-white mb-1">Website Name</label>
                  <input name="websiteName" value={formData.websiteName || ''} onChange={handleChange} className="w-full px-3 py-2 bg-background border border-border rounded-md text-textPrimary focus:ring-1 focus:ring-primary focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-xs tracking-widest capitalize font-bold text-white mb-1">Category</label>
                  <input name="category" value={formData.category || ''} onChange={handleChange} className="w-full px-3 py-2 bg-background border border-border rounded-md text-textPrimary focus:ring-1 focus:ring-primary focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-xs tracking-widest capitalize font-bold text-white mb-1">Price</label>
                  <input name="price" value={formData.price || ''} onChange={handleChange} className="w-full px-3 py-2 bg-background border border-border rounded-md text-textPrimary focus:ring-1 focus:ring-primary focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-xs tracking-widest capitalize font-bold text-white mb-1">Advance Required</label>
                  <input name="advanceAmount" value={formData.advanceAmount || ''} onChange={handleChange} className="w-full px-3 py-2 bg-background border border-border rounded-md text-textPrimary focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs tracking-widest capitalize font-bold text-white mb-1">Image Upload</label>
                  <input type="file" accept=".webp, .webp" onChange={handleImageUpload} className="w-full px-3 py-1.5 bg-background border border-border rounded-md text-textSecondary focus:ring-1 focus:ring-primary focus:outline-none file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer" />
                </div>
                <div>
                  <label className="block text-xs tracking-widest capitalize font-bold text-white mb-1">Live Demo URL</label>
                  <input name="websiteUrl" value={formData.websiteUrl || ''} onChange={handleChange} className="w-full px-3 py-2 bg-background border border-border rounded-md text-textPrimary focus:ring-1 focus:ring-primary focus:outline-none" required />
                </div>
              </div>

              {/* Booking Details Section */}
              <div className="pt-4 border-t border-border mt-6">
                <h4 className="text-primary text-sm font-bold tracking-widest uppercase mb-4">Booking Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest capitalize font-bold text-white mb-1">Status</label>
                    <select name="status" value={formData.status || 'Available'} onChange={handleChange} className="w-full px-3 py-2 bg-background border border-border rounded-md text-textPrimary focus:ring-1 focus:ring-primary focus:outline-none">
                      <option value="Available">Available</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Booked">Booked</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                  </div>
                </div>
              </div>

            </form>
          </div>
          
          <div className="relative z-10 p-6 border-t border-border bg-background/80 backdrop-blur flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-6 py-2 text-xs tracking-widest uppercase font-bold text-textSecondary hover:text-primary transition-colors">
              Cancel
            </button>
            <button type="submit" form="edit-form" className="flex items-center px-6 py-2 text-xs tracking-widest uppercase font-bold text-background bg-primary rounded-md hover:bg-primary-dark transition-colors shadow-[0_0_15px_rgba(197,160,89,0.3)]">
              <FiSave className="mr-2" />
              Save Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditModal;
