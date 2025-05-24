import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Car } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-automotive-blue via-automotive-blue-dark to-purple-900">
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-white opacity-20 animate-pulse">404</h1>
            <div className="absolute inset-0 flex items-center justify-end">
              <img 
                src="./notFound.avif" 
                alt="Lost car" 
                className="w-32 h-20 object-cover rounded-lg shadow-lg animate-bounce"
              />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">
          Oops! You've taken a wrong turn
        </h2>
        
        <p className="text-xl text-gray-200 mb-8 animate-fade-in delay-300">
          The page you're looking for seems to have driven away. 
          Let's get you back on the right road!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
          <Link to="/">
            <button 
              size="lg" 
              className="btn btn-secondary text-black font-semibold px-8 py-4"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </button>
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="btn hover:text-pink-500 px-8 py-4"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Fun message */}
        <div className="mt-12 p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm animate-fade-in delay-700 ">
          <div className="text-pink-600 flex text-sm">
          <p><Car className="mx-auto"></Car>Don't worry, even the best drivers sometimes miss their exit. 
            Our car rental service has GPS to make sure this doesn't happen on your next trip!
          </p></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;