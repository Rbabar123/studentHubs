import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

export default function Landing() {
  const [school, setSchool] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = () => {
    if (school.trim()) {
      const schoolLower = school.toLowerCase().trim();
      const isGistCogeo = schoolLower.includes("gist") || 
                          schoolLower.includes("golden") ||
                          schoolLower === "gist cogeo" ||
                          schoolLower === "gistcogeo" ||
                          schoolLower.includes("golden international school");
      
      if (isGistCogeo) {
        setLocation("/dashboard?school=gist-cogeo");
      } else {
        setLocation("/dashboard?school=other");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Hub</h1>
          <p className="text-gray-600">Your personal dashboard for productivity</p>
        </div>
        
        <Card className="shadow-lg">
          <CardContent className="pt-6 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Welcome</h2>
            
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm font-medium">
                    "Let's enjoy these weekend habang wala pang pasok! 🌟"
                  </p>
                  <p className="text-blue-700 text-sm mt-1">
                    "Dahil umuulan ngayon, wag kakalimutang mag-ingat! Stay safe and productive! ☔"
                  </p>
                </div>
                <p className="text-gray-600 mt-4">
                  Please tell us which school you're from to get started:
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Examples: "GIST", "GIST Cogeo", "Golden International School", or any other school name
                </p>
              </div>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your school name..."
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full"
                />
                <Button 
                  onClick={handleSubmit}
                  disabled={!school.trim()}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
