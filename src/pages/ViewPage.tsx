
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TabsManager from '@/components/TabsManager';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { AlertTriangle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const ViewPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encodedUrl = searchParams.get('url') || '';
  const url = decodeURIComponent(encodedUrl);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSecurityError, setIsSecurityError] = useState(false);

  useEffect(() => {
    // Reset state when URL changes
    setIsLoading(true);
    setError(null);
    setIsSecurityError(false);
  }, [url]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    toast({
      title: "Page loaded successfully",
      description: url,
      duration: 2000,
    });
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIsSecurityError(true);
    setError("This site cannot be displayed in an iframe due to security restrictions.");
    toast({
      variant: "destructive",
      title: "Error loading page",
      description: "This site cannot be displayed due to security restrictions.",
      duration: 5000,
    });
  };

  const handleNavigate = (newUrl: string) => {
    // This function will be passed to NavigationBar
    window.location.href = `/view?url=${encodeURIComponent(newUrl)}`;
  };

  // Function to handle direct navigation
  const handleDirectNavigation = () => {
    window.open(url, '_blank');
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
            <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full text-center">
              <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-red-600 mb-2">Error Loading Page</h2>
              <p className="text-gray-700 mb-4">{error}</p>
              
              {isSecurityError && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Many websites have security policies that prevent them from being displayed in frames.
                    You can try opening the site directly in a new tab instead.
                  </p>
                  <button 
                    onClick={handleDirectNavigation}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Open in New Tab
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full">
            <iframe 
              src={url} 
              className="w-full h-[calc(100vh-120px)]" 
              title="Webpage View"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
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
