
import React from 'react';
import SearchResult from './SearchResult';

interface SearchResultItem {
  id: string;
  title: string;
  url: string;
  snippet: string;
}

interface SearchResultsProps {
  results: SearchResultItem[];
  isLoading: boolean;
  query: string;
}

const SearchResults = ({ results, isLoading, query }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="py-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="mb-6 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-xl font-medium mb-2">No results found for "{query}"</h3>
        <p className="text-gray-600">
          Try different keywords or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {results.map((result) => (
        <SearchResult
          key={result.id}
          title={result.title}
          url={result.url}
          snippet={result.snippet}
        />
      ))}
    </div>
  );
};

export default SearchResults;
