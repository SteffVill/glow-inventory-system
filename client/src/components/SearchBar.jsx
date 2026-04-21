import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ filterText, onFilterChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-600" />
      </div>
      
      <input
        type="text"
        className="input input-primary w-full pl-10 bg-white shadow-sm "
        placeholder="Buscar por nombre, SKU o categoría..."
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
      />
      
      {filterText && (
        <button 
          onClick={() => onFilterChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-error"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;