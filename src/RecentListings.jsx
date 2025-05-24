import { useState } from 'react';
import { Calendar, MapPin, Users, Fuel } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentListings = () => {
  // Mock data for recent car listings
  const [cars] = useState([
    {
      id: 1,
      model: "Toyota Camry 2024",
      price: 45,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      availability: "Available",
      bookingCount: 23,
      datePosted: "2 days ago",
      location: "Downtown",
      features: ["GPS", "AC", "Bluetooth"],
      capacity: 5,
      fuelType: "Hybrid"
    },
    {
      id: 2,
      model: "BMW X5 2024",
      price: 120,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      availability: "Available",
      bookingCount: 45,
      datePosted: "1 day ago",
      location: "Airport",
      features: ["GPS", "AC", "Sunroof", "Leather"],
      capacity: 7,
      fuelType: "Gasoline"
    },
    {
      id: 3,
      model: "Tesla Model 3 2024",
      price: 95,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      availability: "Available",
      bookingCount: 67,
      datePosted: "3 days ago",
      location: "City Center",
      features: ["Autopilot", "AC", "Premium Audio"],
      capacity: 5,
      fuelType: "Electric"
    },
    {
      id: 4,
      model: "Honda Civic 2024",
      price: 35,
      image: "https://images.unsplash.com/photo-1619362280288-fde1d8b43014?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      availability: "Available",
      bookingCount: 12,
      datePosted: "1 day ago",
      location: "Suburban",
      features: ["GPS", "AC", "Backup Camera"],
      capacity: 5,
      fuelType: "Gasoline"
    },
    {
      id: 5,
      model: "Mercedes-Benz GLC 2024",
      price: 110,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      availability: "Booked",
      bookingCount: 89,
      datePosted: "4 days ago",
      location: "Business District",
      features: ["GPS", "AC", "Massage Seats", "Premium Sound"],
      capacity: 5,
      fuelType: "Gasoline"
    },
    {
      id: 6,
      model: "Ford Mustang 2024",
      price: 85,
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      availability: "Available",
      bookingCount: 34,
      datePosted: "2 days ago",
      location: "Marina",
      features: ["GPS", "AC", "Sport Mode", "Premium Audio"],
      capacity: 4,
      fuelType: "Gasoline"
    }
  ]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Recent Listings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our latest addition of premium vehicles. 
            From economy cars to luxury rides, find your perfect match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <div 
              key={car.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <img 
                  src={car.image} 
                  alt={car.model}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    car.availability === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {car.availability}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-automotive-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${car.price}/day
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {car.model}
                </h3>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {car.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {car.capacity}
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 mr-1" />
                    {car.fuelType}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Added {car.datePosted}
                  </div>
                  <div>
                    {car.bookingCount} bookings
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {car.features.slice(0, 3).map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                  {car.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                      +{car.features.length - 3} more
                    </span>
                  )}
                </div>

                <Link to={`/cars/${car.id}`}>
                  <button 
                    className="w-full bg-automotive-blue hover:bg-automotive-blue-dark"
                    disabled={car.availability === 'Booked'}
                  >
                    {car.availability === 'Available' ? 'View Details' : 'Currently Booked'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/cars">
            <button 
              className="btn btn-secondary border-automotive-blue text-automotive-blue hover:bg-automotive-blue hover:text-white"
            >
              View All Cars
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentListings;