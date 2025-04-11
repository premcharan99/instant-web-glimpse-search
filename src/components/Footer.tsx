
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-500 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
          <span>© {currentYear} Search Engine</span>
          <a href="#" className="hover:text-gray-700 hover:underline">About</a>
          <a href="#" className="hover:text-gray-700 hover:underline">Privacy</a>
          <a href="#" className="hover:text-gray-700 hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
