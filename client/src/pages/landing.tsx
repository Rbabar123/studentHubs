import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
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
              <p className="text-gray-600 text-center">
                Access your personalized dashboard with Google Maps, weather information, and music streaming.
              </p>
              
              <Button 
                onClick={handleLogin}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
