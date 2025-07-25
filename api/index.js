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

    const apiKey = process.env.OPENWEATHER_API_KEY || process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: "Weather API key not configured" });
    }

    let apiUrl;
    if (type === 'forecast') {
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;
    } else {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;
    }

    const response = await fetch(apiUrl);

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
}