import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-100 rounded-lg px-4 py-2.5 shadow-md hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {isLoading ? (
        <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
      ) : (
        <>
          <MapPin size={18} className="mr-2 text-blue-500" />
          <span>Current Location</span>
        </>
      )}
    </button>
  );
};

export default LocationButton;