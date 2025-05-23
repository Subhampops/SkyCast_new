import React from 'react';

interface TemperatureToggleProps {
  unit: 'C' | 'F';
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-100 p-1 flex items-center">
      <button
        className={`px-3 py-1.5 rounded-full transition-colors duration-300 ${
          unit === 'C' 
            ? 'bg-blue-500 text-white font-medium' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={unit === 'F' ? onToggle : undefined}
      >
        °C
      </button>
      <button
        className={`px-3 py-1.5 rounded-full transition-colors duration-300 ${
          unit === 'F' 
            ? 'bg-blue-500 text-white font-medium' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={unit === 'C' ? onToggle : undefined}
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle;