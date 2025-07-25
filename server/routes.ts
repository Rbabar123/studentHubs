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
  app.get('/api/weather/:city', isAuthenticated, async (req, res) => {
    try {
      const { city } = req.params;
      const apiKey = process.env.OPENWEATHER_API_KEY || process.env.WEATHER_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ message: "Weather API key not configured" });
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`
      );

      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({ message: "City not found" });
        }
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  // Weather forecast API route
  app.get('/api/weather/:city/forecast', isAuthenticated, async (req, res) => {
    try {
      const { city } = req.params;
      const apiKey = process.env.OPENWEATHER_API_KEY || process.env.WEATHER_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ message: "Weather API key not configured" });
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`
      );

      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({ message: "City not found" });
        }
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Weather forecast API error:", error);
      res.status(500).json({ message: "Failed to fetch weather forecast" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
