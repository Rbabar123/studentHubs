import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { MapPin, CloudSun, Music, ArrowLeft } from "lucide-react";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [schoolType, setSchoolType] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const school = urlParams.get('school') || '';
    setSchoolType(school);

    // Request user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const navigateToMaps = () => {
    setLocation("/maps");
  };

  const navigateToWeather = () => {
    setLocation("/weather");
  };

  const navigateToSpotify = () => {
    setLocation("/spotify");
  };

  const backToLanding = () => {
    setLocation("/");
  };

  const isGistCogeo = schoolType === 'gist-cogeo';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={backToLanding}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Student Hub</h1>
              <span className="text-sm text-gray-500">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {isGistCogeo ? "GIST Cogeo Student" : "Student"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          {isGistCogeo ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, GIST Cogeo Student! 🎓</h2>
              <p className="text-gray-600">Kumusta ka? We're glad to have you here! Access all your tools below.</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-800 text-sm font-medium">
                  Special greetings to our GIST Cogeo family! 🌟
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Enjoy full access to all features - Maps, Weather, and Music!
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Student!</h2>
              <p className="text-gray-600">Access maps and weather information for your location.</p>
            </div>
          )}
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Maps Card */}
          <Card 
            className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
            onClick={navigateToMaps}
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">Google Maps</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {userLocation 
                  ? "Explore your current location and find places nearby."
                  : "Explore locations, get directions, and find places of interest."
                }
              </p>
              <div className="flex items-center text-primary font-medium">
                <span>Open Maps</span>
                <span className="ml-2">→</span>
              </div>
            </CardContent>
          </Card>

          {/* Weather Card */}
          <Card 
            className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
            onClick={navigateToWeather}
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CloudSun className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">Weather</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Check current weather conditions and forecasts for your area.
              </p>
              <div className="flex items-center text-primary font-medium">
                <span>Check Weather</span>
                <span className="ml-2">→</span>
              </div>
            </CardContent>
          </Card>

          {/* Spotify Card - Only for GIST Cogeo */}
          {isGistCogeo && (
            <Card 
              className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
              onClick={navigateToSpotify}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Music className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">Spotify</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Listen to your favorite music, discover new tracks, and stay focused while studying.
                </p>
                <div className="flex items-center text-primary font-medium">
                  <span>Open Music</span>
                  <span className="ml-2">→</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Location Info */}
        {userLocation && (
          <Card className="shadow-lg border border-gray-100 mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Location</h3>
              <p className="text-gray-600">
                📍 Latitude: {userLocation.lat.toFixed(6)}, Longitude: {userLocation.lng.toFixed(6)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Location access granted - maps will show your current area
              </p>
            </CardContent>
          </Card>
        )}

        {/* Stats Section - Only for GIST Cogeo */}
        {isGistCogeo && (
          <Card className="shadow-lg border border-gray-100">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">-</div>
                  <div className="text-sm text-gray-600">Maps Viewed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">-</div>
                  <div className="text-sm text-gray-600">Weather Checks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">-</div>
                  <div className="text-sm text-gray-600">Songs Played</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
