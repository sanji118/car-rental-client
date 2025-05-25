import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { format } from 'date-fns';


const CarCard = ({car, index}) => {
  const formattedDate = format(car.date, 'd MMMM, yyyy')
  return (
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
            Added {formattedDate}
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
  )
}

export default CarCard