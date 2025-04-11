
import React from 'react';
import Logo from './Logo';
import SearchBox from './SearchBox';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const isSearchPage = location.pathname === '/search';

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />
          {isSearchPage && (
            <div className="w-full max-w-2xl ml-6">
              <SearchBox defaultValue={query} fullWidth />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
