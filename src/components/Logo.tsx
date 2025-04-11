
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface LogoProps {
  large?: boolean;
}

const Logo = ({ large = false }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center gap-2 no-underline">
      <div className={`flex items-center justify-center rounded-full bg-search-primary ${large ? 'w-12 h-12' : 'w-8 h-8'}`}>
        <Search className={`text-white ${large ? 'w-6 h-6' : 'w-4 h-4'}`} />
      </div>
      <span className={`font-bold text-search-dark ${large ? 'text-4xl' : 'text-xl'}`}>
        <span className="text-search-primary">G</span>
        <span className="text-search-accent">l</span>
        <span className="text-search-secondary">i</span>
        <span className="text-search-primary">m</span>
        <span className="text-search-accent">p</span>
        <span className="text-search-secondary">s</span>
        <span className="text-search-primary">e</span>
      </span>
    </Link>
  );
};

export default Logo;
