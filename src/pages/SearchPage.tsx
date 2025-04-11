
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import SearchResults from '@/components/SearchResults';
import Footer from '@/components/Footer';
import { searchWeb, SearchResult } from '@/services/searchService';

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
