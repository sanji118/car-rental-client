import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Car } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const AddCar = () => {
  const {user} = useAuth()
  const [formData, setFormData] = useState({
    carModel: '',
    dailyRentalPrice: '',
    availability: true,
    vehicleRegistrationNumber: '',
    location: '',
    imageUrl: '',
    features: '',
    description: '',
    userEmail: user.email,
    date: new Date()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'availability') {
      newValue = value === 'true';
    }
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleAddCar = async(e) => {
    e.preventDefault();
    const { carModel, dailyRentalPrice, vehicleRegistrationNumber, location, imageUrl } = formData;
    if (!carModel || !dailyRentalPrice || !vehicleRegistrationNumber || !location || !imageUrl) {
      toast.warn('Please fill in all required fields marked with *.');
      return;
    }




    const response = await axios.post('http://localhost:5000/cars',{
      ...formData,
      features: formData.features.split(",").map(f=> f.trim())
    });
    if(response.status === 201 || response.status === 200){
      toast.success("Car added successfully")
      setFormData({
        carModel: '',
        dailyRentalPrice: '',
        availability: true,
        vehicleRegistrationNumber: '',
        location: '',
        imageUrl: '',
        features: '',
        description: ''
      })
    }else{
      toast.error("Failed to add car. Please try again.")
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
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
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold pt-5">Add New Car</h1>
          <p className="text-gray-500 mb-6">Add a car to your rental inventory</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow">
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
        {/* Add Car Button */}
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="btn btn-secondary shadow-none">
            + Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
