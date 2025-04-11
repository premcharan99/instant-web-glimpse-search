
import React from 'react';

interface SearchResultProps {
  title: string;
  url: string;
  snippet: string;
}

const SearchResult = ({ title, url, snippet }: SearchResultProps) => {
  const displayUrl = url.length > 60 ? url.substring(0, 60) + '...' : url;
  
  return (
    <div className="mb-6">
      <div className="text-sm text-gray-600 mb-1">{displayUrl}</div>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-lg font-medium text-blue-700 hover:underline mb-1 block"
      >
        {title}
      </a>
      <p className="text-sm text-gray-700 line-clamp-2">{snippet}</p>
    </div>
  );
};

export default SearchResult;
