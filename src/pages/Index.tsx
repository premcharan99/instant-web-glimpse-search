
import React from 'react';
import SearchBox from '@/components/SearchBox';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-8">
          <Logo large />
        </div>
        
        <div className="w-full max-w-xl">
          <SearchBox autoFocus />
        </div>
        
        <p className="mt-6 text-gray-600 text-sm">
          Search the web without being tracked. Simple, fast, and private.
        </p>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
