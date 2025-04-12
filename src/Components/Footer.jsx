import React, { useState, useEffect } from 'react';
import {
  FiBarChart,
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiArrowUp,
  FiCpu
} from 'react-icons/fi';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`bg-gradient-to-b from-gray-900 to-gray-950 pt-16 pb-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="mb-12">
          <div className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-5"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-5"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {/* Company Info */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <FiBarChart className="text-white" size={20} />
                  </div>
                  <span className="text-white font-bold text-xl">Smart Sense</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Advanced predictive maintenance solutions for smart manufacturing. Reduce downtime and optimize operations with AI-powered analytics.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <FiTwitter size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <FiLinkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <FiGithub size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <FiInstagram size={20} />
                  </a>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Features</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Solutions</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Pricing</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Case Studies</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Documentation</a>
                  </li>
                </ul>
              </div>
              
              {/* Company */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">About Us</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Careers</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Blog</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Partners</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Contact Us</a>
                  </li>
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FiMapPin className="text-blue-400 mt-1 mr-3" size={18} />
                    <span className="text-gray-400">123 Manufacturing Blvd, Smart City, SC 12345</span>
                  </li>
                  <li className="flex items-center">
                    <FiPhone className="text-blue-400 mr-3" size={18} />
                    <span className="text-gray-400">+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center">
                    <FiMail className="text-blue-400 mr-3" size={18} />
                    <span className="text-gray-400">info@predictivepro.ai</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-400 text-sm transition-colors duration-200">
                    Schedule a Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="mb-12">
          <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/30 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-8">
                <h3 className="text-white font-semibold text-lg mb-2">Subscribe to our newsletter</h3>
                <p className="text-gray-400">Stay updated with the latest in predictive maintenance technology</p>
              </div>
              <div className="w-full md:w-auto flex-1 max-w-md">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-r-lg text-white font-medium transition-all duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright and Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} PredictivePro. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        className={`fixed right-6 bottom-6 p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        onClick={scrollToTop}
      >
        <FiArrowUp size={20} className="text-white" />
      </button>
      
      {/* Floating elements */}
      <div className="fixed bottom-40 left-12 opacity-10 animate-pulse">
        <FiCpu size={24} className="text-purple-400" />
      </div>
    </footer>
  );
}