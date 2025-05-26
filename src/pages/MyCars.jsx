import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import axios from 'axios';
import UpdateModal from '../components/modals/UpdateModal';
import { format } from 'date-fns';

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sortBy, setSortBy] = useState('date-newest');


  useEffect(() => {
    axios
      .get('https://car-rental-server-eta.vercel.app/my-cars', { withCredentials: true })
      .then(res => setCars(res.data))
      .catch(() => toast.error('Failed to load your cars'));
  }, []);

  const sortCars = (criteria) => {
    const sorted = [...cars];
    if (criteria === 'date-newest') sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (criteria === 'date-oldest') sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (criteria === 'price-lowest') sorted.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    if (criteria === 'price-highest') sorted.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    setCars(sorted);
    setSortBy(criteria);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this car?',
      text: 'You will not be able to recover it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d33'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://car-rental-server-eta.vercel.app/cars/${id}`);
        setCars(prev => prev.filter(car => car._id !== id));
        toast.success('Car deleted successfully');
      } catch {
        toast.error('Error deleting car');
      }
    }
  };

  if (!cars.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-semibold">No Cars Added</h2>
        <p className="text-gray-500 mb-4">Add your first car to get started.</p>
        <Link to="/addCars" className="btn btn-secondary">
          <PlusCircle className="w-4 h-4 mr-2" /> Add Car
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">My Cars</h2>
          <p className="text-sm text-gray-500">Manage your car inventory</p>
        </div>
        <Link to="/addCars" className="btn btn-secondary">
          <PlusCircle className="w-4 h-4 mr-2" /> Add New Car
        </Link>
      </div>

      <div className="mb-4 flex gap-4">
        <select className="select select-bordered" value={sortBy} onChange={(e) => sortCars(e.target.value)}>
          <option value="date-newest">Sort by Date (Newest)</option>
          <option value="date-oldest">Sort by Date (Oldest)</option>
          <option value="price-lowest">Sort by Price (Lowest)</option>
          <option value="price-highest">Sort by Price (Highest)</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow rounded-xl bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>Car Image</th>
              <th>Car Model</th>
              <th>Daily Price</th>
              <th>Booking Count</th>
              <th>Availability</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car._id}>
                <td>
                  <img src={car.imageUrl} alt="car" className="w-16 h-12 object-cover rounded" />
                </td>
                <td>{car.carModel}</td>
                <td>${car.dailyRentalPrice}/day</td>
                <td>{car.bookingCount || 0}</td>
                <td>
                  <span className={`badge ${car.availability ? 'badge-success' : 'badge-error'}`}>
                    {car.availability ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td>{format(new Date(car.date), 'dd/MM/yyyy')}</td>
                <td className="flex gap-2">
                  <button onClick={() => setSelectedCar(car)} className="btn btn-sm btn-secondary">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(car._id)} className="btn btn-sm btn-secondary">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCar && (
        <UpdateModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onSave={(updatedCar) => {
            setCars(prev => prev.map(c => c._id === updatedCar._id ? updatedCar : c));
            toast.success('Car updated successfully');
            setSelectedCar(null);
          }}
        />
      )}
    </div>
  );
};

export default MyCars;
