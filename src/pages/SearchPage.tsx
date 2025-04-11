
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabsManager from '@/components/TabsManager';
import NavigationBar from '@/components/NavigationBar';
import SearchResults from '@/components/SearchResults';
import Footer from '@/components/Footer';
import { searchWeb, SearchResult } from '@/services/searchService';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) return;
      
      setIsLoading(true);
      try {
        const searchResults = await searchWeb(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TabsManager />
      <NavigationBar 
        onSearch={handleSearch} 
        currentUrl={`/search?q=${encodeURIComponent(query)}`}
      />
      
      <main className="flex-grow container mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All</TabsTrigger>
              <TabsTrigger value="images" onClick={() => setActiveTab('images')}>Images</TabsTrigger>
              <TabsTrigger value="videos" onClick={() => setActiveTab('videos')}>Videos</TabsTrigger>
              <TabsTrigger value="news" onClick={() => setActiveTab('news')}>News</TabsTrigger>
              <TabsTrigger value="maps" onClick={() => setActiveTab('maps')}>Maps</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {query && (
                <div className="mb-4 text-sm text-gray-500">
                  Showing results for: <span className="font-medium">{query}</span>
                </div>
              )}
              <SearchResults 
                results={results} 
                isLoading={isLoading} 
                query={query} 
              />
            </TabsContent>
            
            <TabsContent value="images">
              <div className="p-4 text-center text-gray-500">
                Image search coming soon!
              </div>
            </TabsContent>
            
            <TabsContent value="videos">
              <div className="p-4 text-center text-gray-500">
                Video search coming soon!
              </div>
            </TabsContent>
            
            <TabsContent value="news">
              <div className="p-4 text-center text-gray-500">
                News search coming soon!
              </div>
            </TabsContent>
            
            <TabsContent value="maps">
              <div className="p-4 text-center text-gray-500">
                Maps coming soon!
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
