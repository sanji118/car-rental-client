import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Fuel } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/cars')
    .then(res => res.json())
    .then(data => setCars(data));
  },[])

  


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
              key={car._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <img 
                  src={car.imageUrl} 
                  alt={car.carModel}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    car.availability === true 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {car.availability === true ? 'Available': 'Booked'}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-automotive-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${car.dailyRentalPrice}/day
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {car.carModel}
                </h3>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {car.location}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Added {car.date}
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
                    className="w-full bg-pink-500 btn hover:bg-pink-300"
                    disabled={car.availability !== true}
                  >
                    {car.availability === true ? 'View Details' : 'Currently Booked'}
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