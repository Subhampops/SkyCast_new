import React from 'react';
import { Cloud } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Cloud size={48} className="text-blue-500 animate-pulse" />
          <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading weather data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;