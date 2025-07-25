import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Weather API route
  app.get('/api/weather/:city', async (req, res) => {
    try {
      const { city } = req.params;
      const apiKey = process.env.WEATHER_API_KEY || '1c6b387f6d5542f5b2c41407252507';
      
      if (!apiKey) {
        return res.status(500).json({ message: "Weather API key not configured" });
      }

      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`
      );

      if (!response.ok) {
        if (response.status === 400) {
          return res.status(404).json({ message: "City not found" });
        }
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform weatherapi.com format to match our frontend expectations
      const transformedData = {
        main: {
          temp: data.current.temp_f,
          feels_like: data.current.feelslike_f,
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb
        },
        weather: [{
          main: data.current.condition.text.split(' ')[0], // Extract main condition
          description: data.current.condition.text,
          icon: data.current.condition.icon
        }],
        wind: {
          speed: data.current.wind_mph
        },
        name: data.location.name
      };
      
      res.json(transformedData);
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  // Weather forecast API route
  app.get('/api/weather/:city/forecast', async (req, res) => {
    try {
      const { city } = req.params;
      const apiKey = process.env.WEATHER_API_KEY || '1c6b387f6d5542f5b2c41407252507';
      
      if (!apiKey) {
        return res.status(500).json({ message: "Weather API key not configured" });
      }

      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`
      );

      if (!response.ok) {
        if (response.status === 400) {
          return res.status(404).json({ message: "City not found" });
        }
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform weatherapi.com format to match our frontend expectations
      const transformedData = {
        list: data.forecast.forecastday.map((day: any) => ({
          dt: new Date(day.date).getTime() / 1000,
          main: {
            temp_max: day.day.maxtemp_f,
            temp_min: day.day.mintemp_f
          },
          weather: [{
            main: day.day.condition.text.split(' ')[0],
            description: day.day.condition.text
          }]
        }))
      };
      
      res.json(transformedData);
    } catch (error) {
      console.error("Weather forecast API error:", error);
      res.status(500).json({ message: "Failed to fetch weather forecast" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
