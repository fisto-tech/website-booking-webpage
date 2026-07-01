import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiExternalLink } from 'react-icons/fi';
import logoImg from '../assets/logo.webp';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer className="bg-[#c0c4b6] text-black pt-16 pb-8 mt-0 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="w-[95%] md:w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start border-b border-black/10 pb-12 mb-8">
          
          {/* Logo Column */}
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start items-center lg:items-start h-full pt-1 lg:col-span-1">
            <a href="https://fisto.com" target="_blank" rel="noopener noreferrer" className="inline-block cursor-pointer hover:scale-105 transition-transform duration-300">
              <img 
                src={logoImg} 
                alt="Fist-O Web Logo" 
                className="h-12 md:h-16 w-auto object-contain" 
                style={{ filter: 'brightness(0)' }} 
              />
            </a>
          </motion.div>

          {/* Email Support */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-3 lg:col-span-1">
            <FiMail className="text-xl md:mt-0.5 shrink-0" />
            <div>
              <h4 className="text-[13px] font-extrabold tracking-wide uppercase mb-2 md:mb-3 running-text">
                EMAIL SUPPORT
              </h4>
              <div className="text-sm md:text-[15px] space-y-1 font-semibold text-[#222]">
                <a href="mailto:info@fist-o.com" className="block cursor-pointer hover:text-black hover:underline transition-all">info@fist-o.com</a>
                <a href="mailto:support@fist-o.com" className="block cursor-pointer hover:text-black hover:underline transition-all">support@fist-o.com</a>
              </div>
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-3 lg:col-span-1">
            <FiPhone className="text-xl md:mt-0.5 shrink-0" />
            <div>
              <h4 className="text-[13px] font-extrabold tracking-wide uppercase mb-2 md:mb-3 running-text">
                CONTACT SUPPORT
              </h4>
              <div className="text-sm md:text-[15px] space-y-1 font-semibold text-[#222]">
                <a href="tel:+919994425147" className="block cursor-pointer hover:text-black hover:underline transition-all">+91 9994425147</a>
                <a href="tel:+917530025147" className="block cursor-pointer hover:text-black hover:underline transition-all">+91 7530025147</a>
              </div>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-3 lg:col-span-1">
            <FiMapPin className="text-xl md:mt-0.5 shrink-0" />
            <div className="flex-1 flex flex-col items-center md:items-start w-full">
              <h4 className="text-[13px] font-extrabold tracking-wide uppercase mb-2 md:mb-3 running-text">
                ADDRESS
              </h4>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=10/11,+Trichy+Rd,+Sundaram+Brothers+Layout,+Olympus,+Ramanathapuram,+Coimbatore,+Tamil+Nadu+-+641045" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm md:text-[15px] font-semibold text-[#222] leading-relaxed cursor-pointer hover:text-black hover:underline transition-all"
              >
                10/11, Trichy Rd, Sundaram Brothers<br/>
                Layout, Olympus, Ramanathapuram,<br/>
                Coimbatore , Tamil Nadu - 641045
              </a>
            </div>
          </motion.div>

        </div>

        {/* Copyright */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-sm font-medium text-[#444] gap-2">
          <p>www.fisto.com &copy; copyrights 2026</p>
          <p>All Rights Reserved</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
