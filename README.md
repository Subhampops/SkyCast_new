# SkyView Weather App

A beautiful and fully-featured weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information and forecasts for any location worldwide.

![SkyView Weather App](https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🌍 Search for any location worldwide
- 📍 Get weather for current location
- 🌡️ Toggle between Celsius and Fahrenheit
- 🎨 Dynamic backgrounds based on weather conditions
- 📊 Detailed current weather information
- 📅 5-day weather forecast
- ⚡ Weather alerts and warnings
- 📱 Fully responsive design
- 🌓 Day/night mode detection

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- WeatherAPI.com
- Axios
- date-fns
- Lucide React icons

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/skyview-weather-app.git
cd skyview-weather-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your WeatherAPI.com API key:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── components/         # React components
├── services/          # API services
├── types/             # TypeScript interfaces
├── utils/             # Utility functions
└── App.tsx            # Main application component
```

## Key Components

- `CurrentWeather`: Displays current weather conditions
- `Forecast`: Shows 5-day weather forecast
- `SearchBar`: Location search with autocomplete
- `WeatherAlerts`: Displays weather warnings
- `TemperatureToggle`: Switch between °C and °F

## Environment Variables

- `VITE_WEATHER_API_KEY`: Your WeatherAPI.com API key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Subham Bhattacharya

## Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons by [Lucide](https://lucide.dev/)