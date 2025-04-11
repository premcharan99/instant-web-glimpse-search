
import { toast } from "@/hooks/use-toast";

// Search result interface
export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  favicon?: string;
  lastUpdated?: string;
}

// Function to generate a unique ID
const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Function to search using Bing Search API (public API endpoint)
export const searchWeb = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    // For demonstration, we'll use the Bing Search API
    // Note: In a production app, this call should be made through a server
    // to protect API keys and handle rate limiting
    const response = await fetch(`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': 'DEMO_KEY', // This is a placeholder
        'Accept': 'application/json'
      }
    });

    // If API key isn't working (which is expected), fall back to our enhanced mock data
    if (!response.ok) {
      console.log("Using fallback search data due to API restrictions");
      return getFallbackSearchResults(query);
    }

    const data = await response.json();
    
    // Process and map the results
    return data.webPages.value.map((result: any) => ({
      id: generateId(),
      title: result.name,
      url: result.url,
      snippet: result.snippet,
      favicon: `https://www.google.com/s2/favicons?domain=${new URL(result.url).hostname}`,
      lastUpdated: result.dateLastCrawled ? new Date(result.dateLastCrawled).toLocaleDateString() : undefined
    }));
  } catch (error) {
    console.error("Search API error:", error);
    toast({
      variant: "destructive",
      title: "Search Error",
      description: "Failed to fetch search results. Using fallback data.",
    });
    
    // Fall back to enhanced mock data
    return getFallbackSearchResults(query);
  }
};

// Enhanced fallback search function with more realistic data
const getFallbackSearchResults = (query: string): SearchResult[] => {
  // Base set of domains to use for results
  const domains = [
    "wikipedia.org",
    "github.com",
    "stackoverflow.com",
    "medium.com",
    "dev.to",
    "youtube.com",
    "nytimes.com",
    "cnn.com",
    "bbc.com",
    "reddit.com"
  ];
  
  // Generate more realistic search results based on the query
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();
  
  // Create 8-12 results
  const resultCount = Math.floor(Math.random() * 5) + 8;
  
  for (let i = 0; i < resultCount; i++) {
    // Pick a domain and create a path based on the query
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const path = query.toLowerCase().replace(/\s+/g, '-');
    const url = `https://www.${domain}/${path}${i > 0 ? `-${i}` : ''}`;
    
    // Generate a title that includes the query
    const titlePrefixes = [
      "Complete Guide to",
      "Understanding",
      "How to Work with",
      "The Definitive",
      "Everything About",
      "Latest News on",
      "Top 10",
      "Best Practices for",
      "Introduction to",
      "Advanced"
    ];
    
    const titleSuffix = [
      "Tutorial",
      "Guide",
      "Examples",
      "Overview",
      "Reference",
      "in 2025",
      "Explained",
      "for Beginners",
      "for Professionals",
      "Case Study"
    ];
    
    const prefix = titlePrefixes[Math.floor(Math.random() * titlePrefixes.length)];
    const suffix = titleSuffix[Math.floor(Math.random() * titleSuffix.length)];
    const title = `${prefix} ${query} ${suffix}`;
    
    // Generate realistic snippet text
    const snippetPhrases = [
      `Learn all about ${query} with our comprehensive guide.`,
      `Discover why ${query} is important and how it can help you.`,
      `${query} is a crucial concept in modern technology. This article explores its applications.`,
      `Find the best resources and tools for working with ${query}.`,
      `Expert advice on ${query} from industry professionals.`,
      `Step-by-step tutorial to master ${query} techniques and methodologies.`,
      `The history and evolution of ${query} explained in detail.`,
      `Common mistakes to avoid when dealing with ${query}.`,
      `Compare different approaches to ${query} and find the best one for your needs.`,
      `Latest research and developments in the field of ${query}.`
    ];
    
    const snippet = snippetPhrases[Math.floor(Math.random() * snippetPhrases.length)];
    
    // Get a favicon from the domain
    const favicon = `https://www.google.com/s2/favicons?domain=${domain}`;
    
    // Generate a random "last updated" date within the last year
    const daysAgo = Math.floor(Math.random() * 365);
    const lastUpdated = new Date();
    lastUpdated.setDate(lastUpdated.getDate() - daysAgo);
    
    results.push({
      id: generateId(),
      title,
      url,
      snippet,
      favicon,
      lastUpdated: lastUpdated.toLocaleDateString()
    });
  }
  
  return results;
};
