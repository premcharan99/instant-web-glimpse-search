
// Mock search results data
export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'What is a Search Engine? - Definition & How Search Engines Work',
    url: 'https://www.example.com/what-is-search-engine',
    snippet: 'A search engine is a software system designed to carry out web searches. They search the World Wide Web in a systematic way for particular information specified in a query.'
  },
  {
    id: '2',
    title: 'How Search Engines Work: Crawling, Indexing, and Ranking',
    url: 'https://www.example.com/how-search-engines-work',
    snippet: 'Search engines work by crawling the web, indexing content, and ranking it based on relevance to search queries. Learn the basics of search engine technology.'
  },
  {
    id: '3',
    title: 'Web Crawling Technology - The Backbone of Search Engines',
    url: 'https://www.example.com/web-crawling',
    snippet: 'Web crawlers are internet bots that systematically browse the World Wide Web for indexing purposes. Search engines use them to update their web content.'
  },
  {
    id: '4',
    title: 'Search Engine Algorithms: How They Rank Content',
    url: 'https://www.example.com/search-algorithms',
    snippet: 'Modern search engines use complex algorithms to determine which pages are most relevant to a query. Key factors include keywords, site authority, and user experience.'
  },
  {
    id: '5',
    title: 'The History of Search Engines: From Archie to Google',
    url: 'https://www.example.com/search-engine-history',
    snippet: 'The first search engine was Archie, created in 1990. Since then, search technology has evolved dramatically with major players like Google revolutionizing how we find information.'
  },
  {
    id: '6',
    title: 'Building Your Own Search Engine: A Technical Guide',
    url: 'https://www.example.com/build-search-engine',
    snippet: 'Learn the technical aspects of building a basic search engine, including web crawling, indexing, and implementing a simple ranking algorithm.'
  },
  {
    id: '7',
    title: 'Search Engine Architecture: Backend Systems Explained',
    url: 'https://www.example.com/search-engine-architecture',
    snippet: 'Modern search engines are complex distributed systems with multiple components working together to deliver fast, relevant results at scale.'
  },
  {
    id: '8',
    title: 'Elasticsearch: Powerful Open Source Search and Analytics',
    url: 'https://www.example.com/elasticsearch',
    snippet: 'Elasticsearch is a distributed, RESTful search engine optimized for speed and relevance. It powers search functionality for many popular websites and applications.'
  }
];

// Function to simulate search with a delay
export const searchWeb = async (query: string): Promise<SearchResult[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!query.trim()) {
    return [];
  }
  
  // Filter results based on query
  const lowercaseQuery = query.toLowerCase();
  const results = mockResults.filter(
    result => 
      result.title.toLowerCase().includes(lowercaseQuery) || 
      result.snippet.toLowerCase().includes(lowercaseQuery)
  );
  
  return results;
};
