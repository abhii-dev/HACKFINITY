import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white w-full dark:bg-[#1c1a2b] text-black dark:text-white bottom-0 absolute py-10 px-6 mt-16 shadow-inner"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand/Logo */}
        <div>
          <h1 className="text-2xl font-bold text-purple-500">SPORTIFY</h1>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            Your ultimate sports inventory solution. Seamless borrowing and returning for clubs & players.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-purple-500">Contact Us</h2>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-purple-500" /> support@sportify.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-purple-500" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-purple-500" /> Mumbai, India
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-purple-500">Follow Us</h2>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl hover:text-purple-500 transition duration-300" />
            </a>
            {/* Add more icons here if needed (Twitter, LinkedIn, etc.) */}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10 border-t pt-4 border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} SPORTIFY. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
