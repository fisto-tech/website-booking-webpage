import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiLogOut, FiSettings, FiHome, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../assets/logo.webp';

const Navbar = () => {
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-border shadow-sm flex flex-col"
    >
      <div className="w-full w-[95%] md:w-[85%] max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center cursor-pointer group"
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
          >
            <div className="px-2 py-1.5 md:px-3 md:py-2 rounded-xl">
              <img src={logoImg} alt="Fist-O Web Logo" className="h-14 md:h-16 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
          </motion.div>

          <div className="hidden lg:flex flex-1 justify-center">
            <motion.div 
              whileHover={{ y: -2 }}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#111111] animated-gold-border cursor-default"
            >
              <span className="text-primary text-sm font-bold tracking-[0.15em] uppercase">
                Premium Web Experiences for Growing Brands.
              </span>
            </motion.div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Home Button for Everyone (when not on home page) */}
            {location.pathname !== '/' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate('/');
                  window.scrollTo(0, 0);
                }}
                className="flex items-center px-3 md:px-4 py-2 text-xs md:text-sm tracking-widest uppercase font-bold text-textSecondary hover:text-primary transition-colors border border-transparent hover:border-primary/30 rounded-full"
              >
                <FiHome className="mr-1 md:mr-2" />
                <span className="inline">Home</span>
              </motion.button>
            )}

            {isAdmin ? (
              <>
                {location.pathname !== '/admin' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate('/admin');
                      window.scrollTo(0, 0);
                    }}
                    className="flex items-center px-2 py-2 md:px-4 text-[10px] md:text-sm tracking-widest uppercase font-bold text-textSecondary hover:text-primary transition-colors"
                  >
                    <FiSettings className="mr-1 md:mr-2" />
                    <span className="inline">Dashboard</span>
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center px-3 py-1.5 md:px-5 md:py-2 text-[10px] md:text-xs tracking-widest uppercase font-bold text-background bg-primary hover:bg-primary-dark rounded-full transition-colors shadow-sm shadow-primary/30"
                >
                  <FiLogOut className="mr-1 md:mr-2" />
                  Logout
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-4 py-2 md:px-6 md:py-2.5 text-[10px] md:text-xs tracking-widest uppercase font-bold text-primary border border-primary/30 hover:border-primary hover:bg-primary/5 rounded-full transition-colors"
              >
                Admin Login
              </motion.button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile/Tablet Pill Badge row */}
      <div className="lg:hidden w-full bg-[#111111] border-t border-border py-2 px-2 flex justify-center">
        <span className="text-primary text-[10px] sm:text-xs font-bold tracking-widest uppercase text-center w-full truncate px-2">
          Premium Web Experiences for Growing Brands.
        </span>
      </div>
    </motion.nav>
  );
};

export default Navbar;
