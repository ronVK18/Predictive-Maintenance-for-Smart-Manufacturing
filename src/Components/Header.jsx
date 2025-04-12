import React, { useState, useEffect } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiBarChart, 
  FiSettings, 
  FiUser, 
  FiLogIn, 
  FiArrowRight, 
  FiGlobe 
} from 'react-icons/fi';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <FiBarChart className="text-white" size={24} />
                  </div>
                  <span className="text-white font-bold text-xl">Smart Sense</span>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Right side items */}
              <div className="hidden md:flex items-center gap-2">
                <a href="#login" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                  <FiLogIn size={16} />
                  <span>Log In</span>
                </a>
                <a 
                  href="#get-started" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all duration-200 transform hover:scale-105"
                >
                  <span>Get Started</span>
                  <FiArrowRight size={16} />
                </a>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <FiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/90 backdrop-blur-lg shadow-lg border-t border-gray-800">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-800">
              <div className="flex items-center px-3 gap-2">
                <a 
                  href="#login" 
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </a>
                <a 
                  href="#get-started" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Get Started</span>
                  <FiArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-20"></div>
      
      {/* Floating Elements for Visual Interest */}
      <div className="fixed top-32 left-8 opacity-10 animate-pulse">
        <FiSettings size={24} className="text-blue-400" />
      </div>
      <div className="fixed top-16 right-16 opacity-10 animate-pulse">
        <FiGlobe size={24} className="text-purple-400" />
      </div>
    </>
  );
}