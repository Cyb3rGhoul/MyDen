import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

const WeatherAndNews = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        // Use a default location if geolocation fails
        setLocation({ latitude: 40.730610, longitude: -73.935242 }); // New York City
      }
    );
  }, []);

  useEffect(() => {

    const weathAPI = import.meta.env.REACT_APP_OPENWEATHER_API_KEY;
    if (location) {
      // Fetch weather data
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=a5cfbf4141bf5cf46bf97e9ac811ca52&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather({
            temperature: data.main.temp,
            condition: data.weather[0].description,
            forecast: 'Clear skies throughout the day',
          });
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });

      // Fetch news data
      fetch(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=8067c76a47dd45139c24d7c99a160fb5`
      )
        .then((response) => response.json())
        .then((data) => {
          setNews(data.articles[0].title);
        })
        .catch((error) => {
          console.error('Error fetching news data:', error);
        });

      setLoading(false);
    }
  }, [location]);

  return (
    <div className="weather-section card">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          <h2>Weather &amp; News</h2>
          <div className="weather-info text-center">
            <div className="temperature">{weather?.temperature.toFixed(0)}°C</div>
            <div className="condition">{weather?.condition}</div>
            <div className="forecast">{weather?.forecast}</div>
          </div>
          <div className="news-ticker bg-[rgba(29,23,83,0.4)] p-4 rounded-md">
            <p>Latest: {news}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherAndNews;