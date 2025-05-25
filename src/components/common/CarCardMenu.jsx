import { FaGasPump, FaUsers } from 'react-icons/fa';
import { MdLocationOn, MdElectricCar } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CarCardMenu = ({ car }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col md:flex-row items-start md:items-center gap-4">
      <img src={car.imageUrl} alt={car.carModel} className="w-full md:w-48 rounded-lg" />
      <div className="flex-1 space-y-2">
        <h2 className="text-xl font-bold">{car.carModel}</h2>
        <div className="flex gap-4 text-gray-600 text-sm flex-wrap">
          <span className="flex items-center gap-1"><MdLocationOn /> {car.location}</span>
          {car.availability && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Available</span>
          )}
        </div>
        <p className="text-gray-700">{car.description}</p>
        <div className="flex gap-2 flex-wrap">
          {car.features?.map((feature, i) => (
            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{feature}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end gap-3 self-stretch justify-between">
        <span className="text-xl font-bold text-white bg-pink-500 px-4 py-2 rounded-full">${car.dailyRentalPrice}/day</span>
        <Link to={`/cars/${car._id}`} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCardMenu;
