import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { ArrowLeft, Search, Sun, Cloud, CloudRain, CloudSnow } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp_max: number;
      temp_min: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
  }>;
}

export default function Weather() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [city, setCity] = useState("New York");
  const [searchCity, setSearchCity] = useState("");

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useQuery({
    queryKey: ["/api/weather", city],
    enabled: !!city && isAuthenticated,
  });

  const { data: forecastData } = useQuery({
    queryKey: ["/api/weather", city, "forecast"],
    enabled: !!city && isAuthenticated,
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const backToDashboard = () => {
    setLocation("/");
  };

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity.trim());
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="h-16 w-16 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="h-16 w-16 text-gray-500" />;
      case 'rain':
        return <CloudRain className="h-16 w-16 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="h-16 w-16 text-blue-300" />;
      default:
        return <Sun className="h-16 w-16 text-yellow-500" />;
    }
  };

  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const processForecast = (forecast: ForecastData) => {
    const dailyData = new Map();
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData.has(date)) {
        dailyData.set(date, {
          dt: item.dt,
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
          weather: item.weather[0]
        });
      }
    });

    return Array.from(dailyData.values()).slice(0, 5);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={backToDashboard}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Weather</h1>
            </div>
            <Button 
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Location Search */}
        <Card className="shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Weather Information</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Enter city name..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch}
              className="bg-primary text-white hover:bg-blue-600"
            >
              <Search className="h-4 w-4 mr-2" />
              Get Weather
            </Button>
          </div>
        </Card>

        {weatherError && (
          <Card className="shadow-lg p-6 mb-6">
            <div className="text-center text-red-600">
              {weatherError.message.includes('404') 
                ? 'City not found. Please try a different city name.' 
                : 'Failed to fetch weather data. Please try again.'}
            </div>
          </Card>
        )}

        {weatherLoading && (
          <Card className="shadow-lg p-6 mb-6">
            <div className="text-center text-gray-600">Loading weather data...</div>
          </Card>
        )}

        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Conditions */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Conditions</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center">
                    {getWeatherIcon(weatherData.weather[0].main)}
                    <div className="text-4xl font-bold text-gray-900 mt-4">
                      {Math.round(weatherData.main.temp)}°F
                    </div>
                    <div className="text-gray-600 capitalize">
                      {weatherData.weather[0].description}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {weatherData.name}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Feels like</span>
                    <span className="font-medium">{Math.round(weatherData.main.feels_like)}°F</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Humidity</span>
                    <span className="font-medium">{weatherData.main.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wind Speed</span>
                    <span className="font-medium">{Math.round(weatherData.wind.speed)} mph</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pressure</span>
                    <span className="font-medium">{(weatherData.main.pressure * 0.02953).toFixed(2)} in</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5-Day Forecast */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">5-Day Forecast</h3>
                <div className="space-y-4">
                  {forecastData && processForecast(forecastData).map((day: any, index: number) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        {getWeatherIcon(day.weather.main)}
                        <div>
                          <div className="font-medium">{getDayName(day.dt)}</div>
                          <div className="text-sm text-gray-500 capitalize">{day.weather.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {Math.round(day.temp_max)}°/{Math.round(day.temp_min)}°
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {!forecastData && (
                    <div className="text-center text-gray-500 py-4">
                      Loading forecast data...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
