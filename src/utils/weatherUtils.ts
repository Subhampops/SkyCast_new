import { format, parseISO } from 'date-fns';
import { ForecastData, DailyForecast, WeatherCondition } from '../types/weather';

// Convert temperature from Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

// Format temperature with the correct unit
export const formatTemperature = (temp: number, unit: 'C' | 'F' = 'C'): string => {
  const temperature = unit === 'C' ? temp : celsiusToFahrenheit(temp);
  return `${Math.round(temperature)}°${unit}`;
};

// Convert wind speed from m/s to km/h
export const msToKmh = (ms: number): number => {
  return ms * 3.6;
};

// Format wind speed with the correct unit
export const formatWindSpeed = (speed: number, unit: 'ms' | 'kmh' = 'kmh'): string => {
  const windSpeed = unit === 'ms' ? speed : msToKmh(speed);
  return `${Math.round(windSpeed)} ${unit === 'ms' ? 'm/s' : 'km/h'}`;
};

// Get the appropriate weather icon based on weather condition
export const getWeatherIcon = (condition: WeatherCondition, daytime: boolean = true): string => {
  const timePrefix = daytime ? 'day' : 'night';
  
  const iconMap: Record<WeatherCondition, string> = {
    Clear: `${timePrefix}-sunny`,
    Clouds: 'cloud',
    Rain: 'cloud-rain',
    Drizzle: 'cloud-drizzle',
    Thunderstorm: 'cloud-lightning',
    Snow: 'cloud-snow',
    Mist: 'cloud-fog',
    Smoke: 'cloud-fog',
    Haze: 'cloud-fog',
    Dust: 'wind',
    Fog: 'cloud-fog',
    Sand: 'wind',
    Ash: 'wind',
    Squall: 'wind',
    Tornado: 'tornado',
  };
  
  return iconMap[condition] || 'cloud-question';
};

// Get background color based on weather condition
export const getWeatherBackground = (condition: WeatherCondition, daytime: boolean = true): string => {
  if (!daytime) {
    return 'bg-gradient-to-b from-slate-900 to-slate-800';
  }
  
  const bgMap: Record<WeatherCondition, string> = {
    Clear: 'bg-gradient-to-b from-blue-400 to-blue-300',
    Clouds: 'bg-gradient-to-b from-slate-300 to-slate-200',
    Rain: 'bg-gradient-to-b from-slate-500 to-slate-400',
    Drizzle: 'bg-gradient-to-b from-slate-400 to-slate-300',
    Thunderstorm: 'bg-gradient-to-b from-slate-700 to-slate-600',
    Snow: 'bg-gradient-to-b from-slate-100 to-slate-50',
    Mist: 'bg-gradient-to-b from-slate-300 to-slate-200',
    Smoke: 'bg-gradient-to-b from-slate-500 to-slate-400',
    Haze: 'bg-gradient-to-b from-slate-400 to-slate-300',
    Dust: 'bg-gradient-to-b from-amber-200 to-amber-100',
    Fog: 'bg-gradient-to-b from-slate-300 to-slate-200',
    Sand: 'bg-gradient-to-b from-amber-300 to-amber-200',
    Ash: 'bg-gradient-to-b from-slate-500 to-slate-400',
    Squall: 'bg-gradient-to-b from-slate-500 to-slate-400',
    Tornado: 'bg-gradient-to-b from-slate-700 to-slate-600',
  };
  
  return bgMap[condition] || 'bg-gradient-to-b from-blue-200 to-blue-100';
};

// Determine if it's daytime based on sunrise and sunset
export const isDaytime = (currentTime: number, sunrise: number, sunset: number): boolean => {
  return currentTime >= sunrise && currentTime <= sunset;
};

// Process forecast data to get daily forecasts
export const processForecastData = (forecastData: ForecastData): DailyForecast[] => {
  const dailyData: Record<string, DailyForecast> = {};
  
  forecastData.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    const itemDate = parseISO(item.dt_txt);
    
    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        day: format(itemDate, 'EEE'),
        tempMax: item.main.temp_max,
        tempMin: item.main.temp_min,
        weather: item.weather[0],
      };
    } else {
      // Update max and min temperatures if necessary
      if (item.main.temp_max > dailyData[date].tempMax) {
        dailyData[date].tempMax = item.main.temp_max;
      }
      if (item.main.temp_min < dailyData[date].tempMin) {
        dailyData[date].tempMin = item.main.temp_min;
      }
    }
  });
  
  return Object.values(dailyData).slice(0, 5); // Return the next 5 days
};