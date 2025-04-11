
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RefreshCw, Home, Search } from 'lucide-react';

interface NavigationBarProps {
  onSearch: (query: string) => void;
  currentUrl?: string;
}

const NavigationBar = ({ onSearch, currentUrl = '' }: NavigationBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [urlInput, setUrlInput] = useState(currentUrl);

  // Update input when URL changes
  useEffect(() => {
    setUrlInput(currentUrl);
  }, [currentUrl]);

  const goBack = () => {
    window.history.back();
  };

  const goForward = () => {
    window.history.forward();
  };

  const refresh = () => {
    window.location.reload();
  };

  const goHome = () => {
    navigate('/');
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if it's a search query or URL
    const trimmedInput = urlInput.trim();
    
    if (!trimmedInput) return;
    
    if (trimmedInput.includes(' ') || 
        (!trimmedInput.includes('.') && !trimmedInput.startsWith('http'))) {
      // Treat as search query
      onSearch(trimmedInput);
    } else {
      // Treat as URL
      let url = trimmedInput;
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }
      
      // For internal browser view, navigate to the view page with the URL
      navigate(`/view?url=${encodeURIComponent(url)}`);
      
      // Update active tab with new URL (dispatch custom event)
      window.dispatchEvent(new CustomEvent('tab-navigation', { 
        detail: { url, title: url }
      }));
    }
  };

  return (
    <div className="flex items-center h-12 bg-gray-100 px-2 border-b border-gray-300">
      <div className="flex space-x-1 mr-2">
        <button 
          className="p-1 rounded hover:bg-gray-200" 
          onClick={goBack}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button 
          className="p-1 rounded hover:bg-gray-200" 
          onClick={goForward}
          aria-label="Go forward"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <button 
          className="p-1 rounded hover:bg-gray-200" 
          onClick={refresh}
          aria-label="Refresh"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
        <button 
          className="p-1 rounded hover:bg-gray-200" 
          onClick={goHome}
          aria-label="Home"
        >
          <Home className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleUrlSubmit} className="flex-1 flex">
        <div className="relative flex-1 flex items-center">
          <div className="absolute left-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full h-9 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search or enter website URL"
          />
        </div>
      </form>
    </div>
  );
};

export default NavigationBar;
