import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { WebsiteContext } from '../context/WebsiteContext';
import { FiEdit, FiArrowRight, FiMoreHorizontal } from 'react-icons/fi';
import EditModal from './EditModal';

const StatusRibbon = ({ status }) => {
  const colors = {
    'Available': 'bg-success',
    'Reserved': 'bg-yellow-500',
    'Booked': 'bg-blue-500',
    'Sold Out': 'bg-danger'
  };

  if (status === 'Available') return null;

  return (
    <div className="absolute top-5 right-5 z-50">
      <div className={`${colors[status] || 'bg-gray-500'} text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm shadow-md`}>
        {status}
      </div>
    </div>
  );
};

const getCategoryColor = (category) => {
  const normalized = category?.toLowerCase() || '';
  if (normalized.includes('coffee')) return 'bg-orange-600';
  if (normalized.includes('dairy')) return 'bg-blue-400 text-gray-900';
  if (normalized.includes('restrarunt') || normalized.includes('restaurant')) return 'bg-red-500';
  if (normalized.includes('container')) return 'bg-teal-500';
  if (normalized.includes('water')) return 'bg-cyan-500 text-gray-900';
  if (normalized.includes('baker')) return 'bg-yellow-600';
  if (normalized.includes('drink')) return 'bg-pink-500';
  if (normalized.includes('fruit') || normalized.includes('veg')) return 'bg-green-500';
  if (normalized.includes('bag') || normalized.includes('pack')) return 'bg-indigo-500';
  if (normalized.includes('ingredient')) return 'bg-purple-500';
  return 'bg-blue-600'; // Default
};

const WebsiteCard = ({ website, onEditClick }) => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const { editWebsite } = useContext(WebsiteContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isNotAvailable = website.status !== 'Available';

  const handleSaveEdit = (updatedWebsite) => {
    editWebsite(updatedWebsite);
    setIsEditModalOpen(false);
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`bg-[#1e1e1e] p-3 rounded-[1rem] shadow-lg transition-all duration-300 flex flex-col group border border-transparent hover:border-[#333] h-full relative`}
    >
      {/* Transparent Layer & Corner Ribbon for Unavailable Status */}
      {isNotAvailable && (
        <div className="absolute inset-0 z-30 pointer-events-none rounded-[1rem] overflow-hidden">
          {/* Dark Transparent Overlay */}
          <div className="absolute inset-0 bg-[#0a0a0a]/40"></div>
          
          {/* Diagonal Corner Ribbon (Top Left) */}
          <div className={`absolute top-[28px] -left-[60px] w-[220px] -rotate-45 text-center py-1.5 shadow-2xl drop-shadow-lg flex items-center justify-center border-y border-white/20
            ${website.status === 'Sold Out' ? 'bg-gradient-to-r from-red-800 via-red-600 to-red-800' : 
              website.status === 'Reserved' ? 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600' : 
              'bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800'}
          `}>
            <span className={`text-[12px] md:text-[14px] font-black uppercase tracking-[0.2em] drop-shadow-md ${website.status === 'Reserved' ? 'text-black' : 'text-white'}`}>
              {website.status}
            </span>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-4 bg-black">
        <img 
          src={website.imageUrl} 
          alt={website.websiteName}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Animated Hover Layer */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex items-center justify-center cursor-pointer" 
          onClick={(e) => {
            e.stopPropagation();
            if (website.websiteUrl) {
              window.open(website.websiteUrl, '_blank');
            }
          }}
        >
          <span className="text-white text-xs font-bold tracking-wider px-6 py-2.5 border border-white/30 rounded-full backdrop-blur-md bg-black/40 hover:bg-white hover:text-black transition-all duration-300 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            VIEW
          </span>
        </div>
      </div>

      {/* Info Row (ID & Category Badge) */}
      <div className="flex justify-between items-center mb-3 px-1 mt-2">
        <div className="flex items-center text-gray-400 text-[11px] font-medium">
          <span className="truncate max-w-[120px]">{website.websiteId}</span>
        </div>
        <div className={`px-2 py-0.5 rounded text-[10px] font-semibold text-white shadow-sm  ${getCategoryColor(website.category)}`}>
          {website.category}
        </div>
      </div>

      {/* Title */}
      <div className="px-1 mb-5 flex-1">
        <h3 className="text-sm md:text-[15px] font-medium text-gray-200 leading-snug line-clamp-2">
          {website.websiteName}
        </h3>
      </div>

      {/* Footer row */}
      <div className="flex gap-2 px-1 mt-auto relative z-20">
        {isAdmin && (
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              if(onEditClick) onEditClick(website); 
              else setIsEditModalOpen(true); 
            }}
            className="w-8 h-8 shrink-0 bg-gray-500 hover:bg-gray-400 rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-sm"
            title="Edit Website"
          >
            <FiEdit size={12} />
          </button>
        )}
        <button 
          onClick={() => navigate(`/details/${website.websiteId}`)}
          className="flex-1 h-8 bg-gray-500 hover:bg-gray-400 rounded-full flex items-center justify-center text-white transition-colors duration-300 text-[12px] font-medium tracking-widest uppercase shadow-sm"
        >
          Explore
        </button>
      </div>
    </motion.div>
    
    {/* Local Edit Modal for Home Page & Details */}
    <EditModal 
      isOpen={isEditModalOpen} 
      onClose={() => setIsEditModalOpen(false)}
      website={website}
      onSave={handleSaveEdit}
    />
    </>
  );
};

export default WebsiteCard;
