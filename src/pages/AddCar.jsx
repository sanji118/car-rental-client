import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Car } from 'lucide-react';

const AddCar = () => {
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
          <Car className='w-10 h-10'></Car>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold pt-5">Add New Car</h1>
          <p className="text-gray-500 mb-6">Add a car to your rental inventory</p>
        </div>
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow">
        {/* Car Model */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Car Model *</label>
          <input type="text" placeholder="e.g., Toyota Camry 2023" className="border p-2 rounded" />
        </div>
        {/* Daily Rental Price */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Daily Rental Price ($) *</label>
          <input type="number" placeholder="e.g., 45.00" className="border p-2 rounded" />
        </div>
        {/* Availability */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Availability *</label>
          <select className="border p-2 rounded">
            <option>Available</option>
            <option>Unavailable</option>
          </select>
        </div>
        {/* Vehicle Registration Number */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Vehicle Registration Number *</label>
          <input type="text" placeholder="e.g., ABC-1234" className="border p-2 rounded" />
        </div>
        {/* Location */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Location *</label>
          <input type="text" placeholder="e.g., New York, NY" className="border p-2 rounded" />
        </div>
        {/* Image URL */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Image URL *</label>
          <input type="url" placeholder="https://example.com/car-image.jpg" className="border p-2 rounded" />
        </div>
        {/* Features */}
        <div className="md:col-span-2 flex flex-col">
          <label className="font-medium mb-1">Features</label>
          <input type="text" placeholder="e.g., GPS, AC, Bluetooth, Backup Camera" className="border p-2 rounded" />
          <span className="text-sm text-gray-500 mt-1">Separate multiple features with commas</span>
        </div>
        {/* Description */}
        <div className="md:col-span-2 flex flex-col">
          <label className="font-medium mb-1">Description</label>
          <textarea rows="4" placeholder="Describe the car's condition, special features, or any additional information..." className="border p-2 rounded" />
        </div>
        {/* Add Car Button */}
        <div className="md:col-span-2 flex justify-end">
          <button  className="btn btn-secondary shadow-none">
            + Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
