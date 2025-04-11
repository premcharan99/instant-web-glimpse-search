
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  defaultValue?: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
}

const SearchBox = ({ defaultValue = '', fullWidth = false, autoFocus = false }: SearchBoxProps) => {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${fullWidth ? 'w-full' : 'max-w-xl mx-auto'}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 px-5 pr-16 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-search-primary focus:border-transparent text-base"
          placeholder="Search the web..."
          autoFocus={autoFocus}
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-search-primary text-white hover:bg-blue-600 transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
