
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabsManager from '@/components/TabsManager';
import NavigationBar from '@/components/NavigationBar';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    if (query.startsWith('url:')) {
      // Handle external URL navigation
      // For demo purposes, we'll just search for it
      const url = query.substring(4);
      navigate(`/search?q=${encodeURIComponent(url)}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TabsManager />
      <NavigationBar onSearch={handleSearch} currentUrl="/" />
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-8">
          <Logo large />
        </div>
        
        <div className="w-full max-w-xl">
          {/* We don't need SearchBox here anymore as NavigationBar handles search */}
          <div className="relative">
            <input
              type="text"
              className="w-full h-12 px-5 pr-16 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-search-primary focus:border-transparent text-base"
              placeholder="Search Glimpse or type a URL..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e.currentTarget.value);
                }
              }}
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-search-primary text-white hover:bg-blue-600 transition-colors"
              aria-label="Search"
              onClick={() => {
                const input = document.querySelector('input') as HTMLInputElement;
                handleSearch(input.value);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <p className="mt-6 text-gray-600 text-sm">
          Search without being tracked. Simple, fast, and private.
        </p>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
