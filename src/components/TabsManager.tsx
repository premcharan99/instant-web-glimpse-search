import React, { useState, useEffect } from 'react';
import { X, Plus, ExternalLink, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export interface Tab {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
}

const TabsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabs, setTabs] = useState<Tab[]>([]);

  // Initialize with a home tab if none exist
  useEffect(() => {
    if (tabs.length === 0) {
      const homeTab = {
        id: 'home-' + Date.now(),
        title: 'Home',
        url: '/',
        isActive: true
      };
      setTabs([homeTab]);
    }
  }, []);

  // Listen for tab navigation events from SearchResult clicks
  useEffect(() => {
    const handleTabNavigation = (event: CustomEvent) => {
      const { url, title } = event.detail;
      
      // Update active tab URL and title
      const updatedTabs = tabs.map(tab => 
        tab.isActive 
          ? { ...tab, url: `/view?url=${encodeURIComponent(url)}`, title: title || 'Loading...' } 
          : tab
      );
      setTabs(updatedTabs);
    };

    window.addEventListener('tab-navigation', handleTabNavigation as EventListener);
    return () => {
      window.removeEventListener('tab-navigation', handleTabNavigation as EventListener);
    };
  }, [tabs]);

  // Keep track of route changes to update the active tab URL
  useEffect(() => {
    if (tabs.length > 0) {
      const currentPath = location.pathname + location.search;
      const activeTabIndex = tabs.findIndex(tab => tab.isActive);
      
      if (activeTabIndex !== -1 && tabs[activeTabIndex].url !== currentPath) {
        const updatedTabs = [...tabs];
        updatedTabs[activeTabIndex].url = currentPath;
        
        // Update title based on the route
        if (currentPath === '/') {
          updatedTabs[activeTabIndex].title = 'Home';
        } else if (currentPath.startsWith('/search')) {
          const searchParams = new URLSearchParams(location.search);
          const query = searchParams.get('q') || '';
          updatedTabs[activeTabIndex].title = `Search: ${query}`;
        }
        
        setTabs(updatedTabs);
      }
    }
  }, [location, tabs]);

  const addNewTab = () => {
    // Set all existing tabs to inactive
    const updatedTabs = tabs.map(tab => ({ ...tab, isActive: false }));
    
    // Create new active tab
    const newTab = {
      id: 'tab-' + Date.now(),
      title: 'New Tab',
      url: '/',
      isActive: true
    };
    
    setTabs([...updatedTabs, newTab]);
    navigate('/');
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Don't close if it's the last tab
    if (tabs.length <= 1) return;
    
    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    const isActiveTab = tabs[tabIndex].isActive;
    
    // Remove the tab
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    
    // If we closed the active tab, activate another one
    if (isActiveTab && newTabs.length > 0) {
      // Activate the tab to the left, or the first one if it was the first tab
      const newActiveIndex = Math.max(0, tabIndex - 1);
      newTabs[newActiveIndex].isActive = true;
      
      // Navigate to the new active tab's URL
      navigate(newTabs[newActiveIndex].url);
    }
    
    setTabs(newTabs);
  };

  const activateTab = (tabId: string) => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    }));
    
    setTabs(updatedTabs);
    
    // Navigate to the tab's URL
    const activeTab = updatedTabs.find(tab => tab.id === tabId);
    if (activeTab) {
      navigate(activeTab.url);
    }
  };

  const updateActiveTabUrl = (url: string) => {
    const updatedTabs = tabs.map(tab => 
      tab.isActive 
        ? { ...tab, url, title: 'Loading...' } 
        : tab
    );
    setTabs(updatedTabs);
  };

  const updateActiveTab = (title: string, url: string) => {
    const updatedTabs = tabs.map(tab => 
      tab.isActive 
        ? { ...tab, url, title } 
        : tab
    );
    setTabs(updatedTabs);
  };

  return (
    <div className="flex bg-gray-200 border-b border-gray-300 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center min-w-[180px] max-w-[240px] h-10 px-3 py-1 border-r border-gray-300 cursor-pointer ${
            tab.isActive ? 'bg-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => activateTab(tab.id)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 truncate">
              {tab.url === '/' ? (
                <Home className="h-4 w-4 text-gray-500" />
              ) : (
                <ExternalLink className="h-4 w-4 text-gray-500" />
              )}
              <span className="truncate text-sm">{tab.title}</span>
            </div>
            <button
              className="ml-1 p-1 rounded-full hover:bg-gray-300"
              onClick={(e) => closeTab(tab.id, e)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      ))}
      <button
        className="flex items-center justify-center h-10 w-10 min-w-[40px] bg-gray-100 hover:bg-gray-200 border-r border-gray-300"
        onClick={addNewTab}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TabsManager;
