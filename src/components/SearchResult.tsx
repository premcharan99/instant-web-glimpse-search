
import React from 'react';
import { ExternalLink, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

interface SearchResultProps {
  title: string;
  url: string;
  snippet: string;
  favicon?: string;
  lastUpdated?: string;
}

const SearchResult = ({ title, url, snippet, favicon, lastUpdated }: SearchResultProps) => {
  const displayUrl = url.length > 60 ? url.substring(0, 60) + '...' : url;
  
  return (
    <div className="mb-6 hover:bg-gray-50 p-3 rounded-lg transition-colors">
      <div className="flex items-center text-sm text-gray-600 mb-1">
        {favicon && (
          <img src={favicon} alt="" className="w-4 h-4 mr-2" />
        )}
        <span className="truncate">{displayUrl}</span>
        {lastUpdated && (
          <span className="ml-2 text-xs text-gray-500">• {lastUpdated}</span>
        )}
      </div>
      
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group text-lg font-medium text-blue-700 hover:underline mb-1 flex items-center"
      >
        {title}
        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
      
      <p className="text-sm text-gray-700 line-clamp-2 mb-2">{snippet}</p>
      
      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <button className="flex items-center hover:text-gray-700 transition-colors">
          <ThumbsUp className="h-3 w-3 mr-1" />
          <span>Helpful</span>
        </button>
        <button className="flex items-center hover:text-gray-700 transition-colors">
          <ThumbsDown className="h-3 w-3 mr-1" />
          <span>Not helpful</span>
        </button>
        <button className="flex items-center hover:text-gray-700 transition-colors">
          <Share2 className="h-3 w-3 mr-1" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
