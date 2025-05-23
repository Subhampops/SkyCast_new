import React from 'react';
import { 
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Sun,
  Wind,
  Tornado
} from 'lucide-react';
import { DailyForecast } from '../types/weather';
import { formatTemperature } from '../utils/weatherUtils';

interface ForecastCardProps {
  forecast: DailyForecast;
  unit: 'C' | 'F';
  isToday?: boolean;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit, isToday = false }) => {
  // Choose weather icon based on weather condition
  const getWeatherIcon = () => {
    const condition = forecast.weather.main;
    const iconSize = 40;
    
    switch (condition) {
      case 'Clear':
        return <Sun size={iconSize} className="text-yellow-400" />;
      case 'Clouds':
        return <Cloud size={iconSize} className="text-slate-400" />;
      case 'Rain':
        return <CloudRain size={iconSize} className="text-slate-400" />;
      case 'Drizzle':
        return <CloudDrizzle size={iconSize} className="text-slate-400" />;
      case 'Thunderstorm':
        return <CloudLightning size={iconSize} className="text-slate-500" />;
      case 'Snow':
        return <CloudSnow size={iconSize} className="text-slate-300" />;
      case 'Mist':
      case 'Fog':
      case 'Haze':
        return <CloudFog size={iconSize} className="text-slate-400" />;
      case 'Tornado':
        return <Tornado size={iconSize} className="text-slate-500" />;
      case 'Squall':
      case 'Dust':
      case 'Sand':
      case 'Ash':
        return <Wind size={iconSize} className="text-slate-400" />;
      default:
        return <Cloud size={iconSize} className="text-slate-400" />;
    }
  };
  
  return (
    <div 
      className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
        isToday ? 'border-2 border-blue-400' : 'border border-gray-100'
      }`}
    >
      <div className="p-4">
        <div className="text-center mb-2">
          <h3 className="font-semibold text-gray-800">
            {isToday ? 'Today' : forecast.day}
          </h3>
          <p className="text-sm text-gray-500">{forecast.date}</p>
        </div>
        
        <div className="flex justify-center my-3">
          {getWeatherIcon()}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-1">{forecast.weather.description}</p>
          <div className="flex justify-center items-center gap-3">
            <span className="text-xl font-bold text-gray-800">
              {formatTemperature(forecast.tempMax, unit)}
            </span>
            <span className="text-lg text-gray-500">
              {formatTemperature(forecast.tempMin, unit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;