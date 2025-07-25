import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Play, SkipBack, SkipForward } from "lucide-react";

export default function Spotify() {
  const [, setLocation] = useLocation();
  const [schoolType, setSchoolType] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const school = urlParams.get('school') || '';
    setSchoolType(school);
    
    // If not GIST Cogeo, redirect back to dashboard
    if (school !== 'gist-cogeo') {
      setLocation("/dashboard");
    }
  }, [setLocation]);

  const backToDashboard = () => {
    setLocation("/dashboard");
  };

  const connectSpotify = () => {
    window.open('https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd', '_blank');
  };

  // Only GIST Cogeo students can access this page
  if (schoolType !== 'gist-cogeo') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-4">This feature is only available for GIST Cogeo students.</p>
          <Button onClick={backToDashboard}>Back to Dashboard</Button>
        </div>
      </div>
    );
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
              <h1 className="text-2xl font-bold text-gray-900">Music Player</h1>
            </div>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Music Player Section */}
        <Card className="shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Spotify Player</h2>
          
          {/* Embedded Spotify Player */}
          <div className="space-y-6">
            {/* Study Playlist */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Study & Focus Playlist</h3>
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allowTransparency={true} 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Study & Focus Playlist"
                />
              </div>
            </div>

            {/* Chill Hip-Hop Playlist */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Chill Hip-Hop Beats</h3>
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allowTransparency={true} 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Chill Hip-Hop Beats"
                />
              </div>
            </div>

            {/* Acoustic Study Playlist */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Acoustic Study Session</h3>
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe 
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ" 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowTransparency={true} 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Acoustic Study Session"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Music Controls & Playlists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Now Playing */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Music Controls</h3>
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                  alt="Album cover" 
                  className="w-16 h-16 rounded-lg object-cover shadow-md" 
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Connect Spotify for playback controls</div>
                  <div className="text-sm text-gray-600">Use the embedded player above</div>
                  <div className="text-xs text-gray-500">Study & Focus Playlists</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>--:--</span>
                  <span>--:--</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-0"></div>
                </div>
              </div>
              
              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button size="icon" className="bg-green-500 text-white hover:bg-green-600 rounded-full">
                  <Play className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Playlists */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Playlists</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80" 
                    alt="Focus Deep Work playlist cover" 
                    className="w-12 h-12 rounded-lg object-cover" 
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Focus Deep Work</div>
                    <div className="text-sm text-gray-600">Instrumental & Ambient</div>
                  </div>
                  <Play className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <img 
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80" 
                    alt="Chill Study Vibes playlist cover" 
                    className="w-12 h-12 rounded-lg object-cover" 
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Chill Study Vibes</div>
                    <div className="text-sm text-gray-600">Lo-fi & Relaxed Beats</div>
                  </div>
                  <Play className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80" 
                    alt="Upbeat Study Energy playlist cover" 
                    className="w-12 h-12 rounded-lg object-cover" 
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Upbeat Study Energy</div>
                    <div className="text-sm text-gray-600">Energetic & Motivating</div>
                  </div>
                  <Play className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <img 
                    src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80" 
                    alt="Classical Focus playlist cover" 
                    className="w-12 h-12 rounded-lg object-cover" 
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Classical Focus</div>
                    <div className="text-sm text-gray-600">Classical & Orchestral</div>
                  </div>
                  <Play className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
