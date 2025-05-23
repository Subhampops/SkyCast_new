import React from 'react';
import ForecastCard from './ForecastCard';
import { DailyForecast } from '../types/weather';

interface ForecastProps {
  forecasts: DailyForecast[];
  unit: 'C' | 'F';
}

const Forecast: React.FC<ForecastProps> = ({ forecasts, unit }) => {
  if (!forecasts.length) {
    return null;
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecasts.map((forecast, index) => (
          <ForecastCard 
            key={forecast.date} 
            forecast={forecast} 
            unit={unit} 
            isToday={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;