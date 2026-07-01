import React, { useContext, useState, useMemo } from 'react';
import { WebsiteContext } from '../context/WebsiteContext';
import Hero from '../components/Hero';
import SearchFilter from '../components/SearchFilter';
import WebsiteGrid from '../components/WebsiteGrid';
import { motion } from 'framer-motion';

const Home = () => {
  const { websites } = useContext(WebsiteContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  const categories = useMemo(() => {
    const cats = new Set(websites.map(w => w.category));
    return Array.from(cats).sort();
  }, [websites]);

  const filteredWebsites = useMemo(() => {
    let result = [...websites];

    if (searchTerm) {
      result = result.filter(w => w.websiteName.toLowerCase().includes(searchTerm.toLowerCase()) || w.websiteId.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (category) {
      result = result.filter(w => w.category === category);
    }
    if (status) {
      result = result.filter(w => w.status === status);
    }

    if (sortBy === 'asc') {
      result.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
    } else if (sortBy === 'desc') {
      result.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));
    }

    return result;
  }, [websites, searchTerm, category, status, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      <Hero />
      
      <main id="marketplace-grid" className="flex-1 w-[95%] md:w-[85%] max-w-none w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-3xl font-bold text-textPrimary tracking-tight">Websites</h2>
          
          <div className="w-full md:flex-1 md:max-w-md lg:max-w-lg z-10">
            <SearchFilter
              searchTerm={searchTerm} setSearchTerm={setSearchTerm}
              category={category} setCategory={setCategory}
              status={status} setStatus={setStatus}
              sortBy={sortBy} setSortBy={setSortBy}
              categories={categories}
            />
          </div>
        </div>
        
        <WebsiteGrid websites={filteredWebsites} />
      </main>
    </motion.div>
  );
};

export default Home;
