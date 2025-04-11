
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TabsManager from '@/components/TabsManager';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

const ViewPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encodedUrl = searchParams.get('url') || '';
  const url = decodeURIComponent(encodedUrl);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when URL changes
    setIsLoading(true);
    setError(null);
  }, [url]);

  const handleNavigate = (newUrl: string) => {
    // This function will be passed to NavigationBar
    window.location.href = `/view?url=${encodeURIComponent(newUrl)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TabsManager />
      <NavigationBar 
        onSearch={handleNavigate} 
        currentUrl={url}
      />
      
      <main className="flex-grow">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-xl font-medium text-red-600 mb-2">Error Loading Page</h2>
            <p className="text-gray-700">{error}</p>
          </div>
        ) : (
          <div className="w-full h-full">
            <iframe 
              src={url} 
              className="w-full h-[calc(100vh-120px)]" 
              title="Webpage View"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setError("Failed to load the page. This might be due to security restrictions.");
              }}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-700">Loading {url}...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewPage;
