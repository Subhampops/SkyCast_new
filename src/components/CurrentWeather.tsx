import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset, 
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Sun,
  Moon
} from 'lucide-react';
import { WeatherData } from '../types/weather';
import { formatTemperature, formatWindSpeed, isDaytime } from '../utils/weatherUtils';
import { format } from 'date-fns';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
  const daytime = isDaytime(
    data.dt,
    data.sys.sunrise,
    data.sys.sunset
  );
  
  // Choose weather icon based on weather condition
  const getWeatherIcon = () => {
    const condition = data.weather[0].main;
    const iconSize = 60;
    
    switch (condition) {
      case 'Clear':
        return daytime ? <Sun size={iconSize} className="text-yellow-400" /> : <Moon size={iconSize} className="text-slate-200" />;
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
      default:
        return <Cloud size={iconSize} className="text-slate-400" />;
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
            <h2 className="text-2xl font-semibold text-gray-800">{data.name}, {data.sys.country}</h2>
            <p className="text-gray-600">{format(new Date(data.dt * 1000), 'EEEE, d MMMM yyyy, h:mm a')}</p>
          </div>
          <div className="flex items-center justify-center">
            {getWeatherIcon()}
            <div className="ml-4">
              <div className="text-5xl font-bold text-gray-800">{formatTemperature(data.main.temp, unit)}</div>
              <div className="text-gray-600">{data.weather[0].description}</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 bg-blue-50/70 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Thermometer size={20} className="text-blue-500 mr-2" />
              <h3 className="font-medium text-gray-700">Feels Like</h3>
            </div>
            <p className="text-xl font-semibold text-gray-800">
              {formatTemperature(data.main.feels_like, unit)}
            </p>
          </div>
          
          <div className="flex-1 bg-blue-50/70 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Droplets size={20} className="text-blue-500 mr-2" />
              <h3 className="font-medium text-gray-700">Humidity</h3>
            </div>
            <p className="text-xl font-semibold text-gray-800">{data.main.humidity}%</p>
          </div>
          
          <div className="flex-1 bg-blue-50/70 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Wind size={20} className="text-blue-500 mr-2" />
              <h3 className="font-medium text-gray-700">Wind</h3>
            </div>
            <p className="text-xl font-semibold text-gray-800">
              {formatWindSpeed(data.wind.speed)}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-50/70 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Eye size={18} className="text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-700">Visibility</h3>
            </div>
            <p className="text-lg font-semibold text-gray-800">{(data.visibility / 1000).toFixed(1)} km</p>
          </div>
          
          <div className="bg-gray-50/70 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Gauge size={18} className="text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-700">Pressure</h3>
            </div>
            <p className="text-lg font-semibold text-gray-800">{data.main.pressure} hPa</p>
          </div>
          
          <div className="bg-gray-50/70 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Sunrise size={18} className="text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-700">Sunrise</h3>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {format(new Date(data.sys.sunrise * 1000), 'h:mm a')}
            </p>
          </div>
          
          <div className="bg-gray-50/70 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Sunset size={18} className="text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-700">Sunset</h3>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {format(new Date(data.sys.sunset * 1000), 'h:mm a')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;