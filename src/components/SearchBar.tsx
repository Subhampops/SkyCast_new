import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchLocation } from '../services/weatherApi';
import { LocationData } from '../types/weather';

interface SearchBarProps {
  onLocationSelect: (location: LocationData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Handle outside click to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle search query change with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }
    
    const debounceTimer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await searchLocation(query);
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching locations:', error);
      } finally {
        setIsSearching(false);
      }
    }, 500);
    
    return () => clearTimeout(debounceTimer);
  }, [query]);
  
  const handleLocationClick = (location: LocationData) => {
    onLocationSelect(location);
    setQuery(`${location.name}${location.state ? `, ${location.state}` : ''}, ${location.country}`);
    setShowResults(false);
  };
  
  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto mb-6 z-10">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a city..."
          className="w-full px-4 py-3 pl-10 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowResults(true)}
        />
        <div className="absolute left-3 top-3.5 text-gray-500">
          <Search size={20} />
        </div>
        {isSearching && (
          <div className="absolute right-3 top-3.5">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>
      
      {showResults && results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg max-h-60 overflow-y-auto z-20 border border-gray-100">
          {results.map((location, index) => (
            <div
              key={`${location.lat}-${location.lon}-${index}`}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 border-gray-100 transition-colors duration-150"
              onClick={() => handleLocationClick(location)}
            >
              <div className="font-medium">{location.name}</div>
              <div className="text-sm text-gray-500">
                {location.state && `${location.state}, `}{location.country}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;