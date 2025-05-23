import React, { useState, useEffect } from 'react';
import { 
  getCurrentWeather, 
  getForecast, 
  getLocationByCoords 
} from './services/weatherApi';
import { 
  WeatherData, 
  ForecastData, 
  LocationData, 
  DailyForecast 
} from './types/weather';
import { processForecastData, getWeatherBackground } from './utils/weatherUtils';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import LocationButton from './components/LocationButton';
import TemperatureToggle from './components/TemperatureToggle';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import WeatherAlerts from './components/WeatherAlerts';
import Footer from './components/Footer';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [gettingLocation, setGettingLocation] = useState<boolean>(false);
  
  // Fetch weather data for a specific location
  const fetchWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather and forecast in parallel
      const [weather, forecast] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon)
      ]);
      
      setWeatherData(weather);
      setForecastData(processForecastData(forecast));
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle location selection from search
  const handleLocationSelect = (location: LocationData) => {
    fetchWeatherData(location.lat, location.lon);
  };
  
  // Get current user location
  const getCurrentLocation = () => {
    setGettingLocation(true);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setGettingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get location name from coordinates
          const locationData = await getLocationByCoords(latitude, longitude);
          
          if (locationData && locationData.length > 0) {
            // Fetch weather data for current location
            await fetchWeatherData(latitude, longitude);
          } else {
            throw new Error('Could not determine your location.');
          }
        } catch (err) {
          console.error('Error getting current location:', err);
          setError('Failed to get your current location. Please try searching for a city instead.');
        } finally {
          setGettingLocation(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Location access denied. Please try searching for a city instead.');
        setGettingLocation(false);
      }
    );
  };
  
  // Toggle temperature unit
  const toggleUnit = () => {
    setUnit(prev => (prev === 'C' ? 'F' : 'C'));
  };
  
  // Get a default location on initial load
  useEffect(() => {
    // Default to New York if no location is provided
    fetchWeatherData(40.7128, -74.0060);
  }, []);
  
  // Determine background based on weather condition
  const backgroundClass = weatherData 
    ? getWeatherBackground(weatherData.weather[0].main as any)
    : 'bg-gradient-to-b from-blue-200 to-blue-100';
  
  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-700 flex flex-col`}>
      <div className="flex-1 pt-4 px-4 pb-8">
        <div className="container mx-auto">
          <Header />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <SearchBar onLocationSelect={handleLocationSelect} />
            
            <div className="flex items-center gap-3">
              <LocationButton 
                onClick={getCurrentLocation} 
                isLoading={gettingLocation} 
              />
              <TemperatureToggle unit={unit} onToggle={toggleUnit} />
            </div>
          </div>
          
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorDisplay 
              message={error} 
              onRetry={() => setError(null)} 
            />
          ) : (
            <>
              {/* Render weather alerts if there are any */}
              {weatherData?.alerts && (
                <WeatherAlerts alerts={weatherData.alerts} />
              )}
              
              {/* Current weather display */}
              {weatherData && (
                <CurrentWeather data={weatherData} unit={unit} />
              )}
              
              {/* Weather forecast */}
              {forecastData.length > 0 && (
                <div className="mt-8">
                  <Forecast forecasts={forecastData} unit={unit} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;