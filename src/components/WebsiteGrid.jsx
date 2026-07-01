import React from 'react';
import { motion } from 'framer-motion';
import WebsiteCard from './WebsiteCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const WebsiteGrid = ({ websites, onEditClick }) => {
  if (websites.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-border shadow-sm">
        <h3 className="text-xl font-medium text-textSecondary">No websites found matching your criteria.</h3>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {websites.map(website => (
        <motion.div key={website.websiteId} variants={item}>
          <WebsiteCard website={website} onEditClick={onEditClick} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WebsiteGrid;
