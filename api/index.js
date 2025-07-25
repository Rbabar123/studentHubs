// Weather API serverless function for Vercel
export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { city, type = 'current' } = req.query;
    
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    const apiKey = process.env.WEATHER_API_KEY || '1c6b387f6d5542f5b2c41407252507';
    
    if (!apiKey) {
      return res.status(500).json({ message: "Weather API key not configured" });
    }

    let apiUrl;
    if (type === 'forecast') {
      apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`;
    } else {
      apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;
    }

    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 400) {
        return res.status(404).json({ message: "City not found" });
      }
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform weatherapi.com format to match frontend expectations
    if (type === 'forecast') {
      const transformedData = {
        list: data.forecast.forecastday.map((day) => ({
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
    } else {
      const transformedData = {
        main: {
          temp: data.current.temp_f,
          feels_like: data.current.feelslike_f,
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb
        },
        weather: [{
          main: data.current.condition.text.split(' ')[0],
          description: data.current.condition.text,
          icon: data.current.condition.icon
        }],
        wind: {
          speed: data.current.wind_mph
        },
        name: data.location.name
      };
      res.json(transformedData);
    }
  } catch (error) {
    console.error("Weather API error:", error);
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
}