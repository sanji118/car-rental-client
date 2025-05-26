import { useState } from 'react';
import { ArrowLeft, Car, XCircle } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router';

const UpdateModal = ({ car, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...car });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`https://car-rental-server-eta.vercel.app/cars/${car._id}`, formData);
      onSave(response.data);
    } catch (error) {
      //console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <dialog open className='modal modal-open'><div className="modal-box max-w-2xl mx-auto p-4">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-800">
          <XCircle size={22} />
        </button>
      {/* Header */}
      <div className="flex items-center mb-4">
        <Link to="/" className="flex items-center text-pink-500 hover:text-pink-700">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </Link>
      </div>
      <div className='w-5/6 flex gap-3 items-center'>
        <div className='bg-pink-500 p-3 rounded-full'>
          <Car className='w-10 h-10' />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold pt-5">Update Your Information</h1>
          <p className="text-gray-500 mb-6">Add a car to your rental inventory</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow">
        {/* Car Model */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Car Model *</label>
          <input type="text" name="carModel" value={formData.carModel} onChange={handleChange} placeholder="e.g., Toyota Camry 2023" className="border p-2 rounded" />
        </div>
        {/* Daily Rental Price */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Daily Rental Price ($) *</label>
          <input type="number" name="dailyRentalPrice" value={formData.dailyRentalPrice} onChange={handleChange} placeholder="e.g., 45.00" className="border p-2 rounded" />
        </div>
        {/* Availability */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Availability *</label>
          <select name="availability" value={formData.availability} onChange={handleChange} className="border p-2 rounded" required>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
        {/* Vehicle Registration Number */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Vehicle Registration Number *</label>
          <input type="text" name="vehicleRegistrationNumber" value={formData.vehicleRegistrationNumber} onChange={handleChange} placeholder="e.g., ABC-1234" className="border p-2 rounded" />
        </div>
        {/* Location */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Location *</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., New York, NY" className="border p-2 rounded" />
        </div>
        {/* Image URL */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Image URL *</label>
          <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/car-image.jpg" className="border p-2 rounded" />
        </div>
        {/* Features */}
        <div className="md:col-span-2 flex flex-col">
          <label className="font-medium mb-1">Features</label>
          <input type="text" name="features" value={formData.features} onChange={handleChange} placeholder="e.g., GPS, AC, Bluetooth, Backup Camera" className="border p-2 rounded" />
          <span className="text-sm text-gray-500 mt-1">Separate multiple features with commas</span>
        </div>
        {/* Description */}
        <div className="md:col-span-2 flex flex-col">
          <label className="font-medium mb-1">Description</label>
          <textarea rows="4" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the car's condition, special features, or any additional information..." className="border p-2 rounded" />
        </div>
        <div className="modal-action col-span-1 md:col-span-2 justify-end">
            <button type="submit" className="btn btn-secondary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={onClose} className="btn">
                Cancel
            </button>
        </div>
      </form>
    </div></dialog>
  );

};

export default UpdateModal;
