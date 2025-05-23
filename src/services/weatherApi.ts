import axios from 'axios';
import { WeatherData, ForecastData, LocationData } from '../types/weather';

const API_KEY = 'e3b9dc7edef541569bf141210252305';
const BASE_URL = 'https://api.weatherapi.com/v1';

// Get current weather data for a location
export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
      },
    });
    
    // Transform WeatherAPI.com response to match our interface
    const data = response.data;
    return {
      coord: {
        lon: data.location.lon,
        lat: data.location.lat,
      },
      weather: [{
        id: data.current.condition.code,
        main: data.current.condition.text,
        description: data.current.condition.text,
        icon: data.current.condition.icon,
      }],
      base: 'stations',
      main: {
        temp: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        temp_min: data.current.temp_c,
        temp_max: data.current.temp_c,
        pressure: data.current.pressure_mb,
        humidity: data.current.humidity,
      },
      visibility: data.current.vis_km * 1000,
      wind: {
        speed: data.current.wind_kph / 3.6, // Convert km/h to m/s
        deg: data.current.wind_degree,
        gust: data.current.gust_kph / 3.6,
      },
      clouds: {
        all: data.current.cloud,
      },
      dt: Math.floor(new Date(data.current.last_updated).getTime() / 1000),
      sys: {
        country: data.location.country,
        sunrise: Math.floor(new Date(data.location.localtime.split(' ')[0] + ' 06:00').getTime() / 1000),
        sunset: Math.floor(new Date(data.location.localtime.split(' ')[0] + ' 18:00').getTime() / 1000),
      },
      timezone: data.location.localtime_epoch - Math.floor(Date.now() / 1000),
      id: data.location.name.toLowerCase().replace(/\s+/g, ''),
      name: data.location.name,
      cod: 200,
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get forecast data for a location
export const getForecast = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
        days: 5,
      },
    });
    
    const data = response.data;
    // Transform WeatherAPI.com forecast to match our interface
    return {
      cod: '200',
      message: 0,
      cnt: data.forecast.forecastday.length,
      list: data.forecast.forecastday.flatMap(day => {
        // Create 8 evenly spaced forecasts per day
        return day.hour.filter((_, index) => index % 3 === 0).map(hour => ({
          dt: Math.floor(new Date(hour.time).getTime() / 1000),
          main: {
            temp: hour.temp_c,
            feels_like: hour.feelslike_c,
            temp_min: day.day.mintemp_c,
            temp_max: day.day.maxtemp_c,
            pressure: hour.pressure_mb,
            sea_level: hour.pressure_mb,
            grnd_level: hour.pressure_mb,
            humidity: hour.humidity,
            temp_kf: 0,
          },
          weather: [{
            id: hour.condition.code,
            main: hour.condition.text,
            description: hour.condition.text,
            icon: hour.condition.icon,
          }],
          clouds: {
            all: hour.cloud,
          },
          wind: {
            speed: hour.wind_kph / 3.6,
            deg: hour.wind_degree,
            gust: hour.gust_kph / 3.6,
          },
          visibility: hour.vis_km * 1000,
          pop: hour.chance_of_rain / 100,
          sys: {
            pod: hour.is_day ? 'd' : 'n',
          },
          dt_txt: hour.time,
        }));
      }),
      city: {
        id: data.location.name.toLowerCase().replace(/\s+/g, ''),
        name: data.location.name,
        coord: {
          lat: data.location.lat,
          lon: data.location.lon,
        },
        country: data.location.country,
        population: 0,
        timezone: data.location.localtime_epoch - Math.floor(Date.now() / 1000),
        sunrise: Math.floor(new Date(data.forecast.forecastday[0].date + ' 06:00').getTime() / 1000),
        sunset: Math.floor(new Date(data.forecast.forecastday[0].date + ' 18:00').getTime() / 1000),
      },
    };
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Search for locations by query
export const searchLocation = async (query: string): Promise<LocationData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query,
      },
    });
    
    return response.data.map((location: any) => ({
      name: location.name,
      lat: location.lat,
      lon: location.lon,
      country: location.country,
      state: location.region,
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};

// Get location by coordinates
export const getLocationByCoords = async (lat: number, lon: number): Promise<LocationData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
      },
    });
    
    return response.data.map((location: any) => ({
      name: location.name,
      lat: location.lat,
      lon: location.lon,
      country: location.country,
      state: location.region,
    }));
  } catch (error) {
    console.error('Error getting location by coords:', error);
    throw error;
  }
};
