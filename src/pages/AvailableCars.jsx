import React, { useEffect, useState } from 'react'
import CarCard from '../components/car/CarCard'
import { useLoaderData } from 'react-router'
import { FaList, FaTh } from 'react-icons/fa';

const AvailableCars = () => {
  const loadedCars = useLoaderData();
  const[availableCars, setAvailableCars] = useState([])
  useEffect(() => {
    const filtered = loadedCars.filter(car => car.availability === true);
    setAvailableCars(filtered);
  }, [loadedCars]);
  return (
    <div>
      <div className="px-4 md:px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>
        <p className="text-gray-600 mt-1">Find the perfect vehicle for your next journey</p>

        <div className="mt-6 bg-white p-4 rounded-xl shadow-sm flex flex-col md:items-center md:justify-between gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by model, brand, category..."
            className="input input-bordered w-full md:max-w-sm"
          />

          {/* Sorting and View Buttons */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select className="select select-bordered">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

            {/* View Toggle Buttons */}
            <div className="flex border rounded-md overflow-hidden">
              <button className="px-3 py-2 bg-pink-500 text-white">
                <FaTh />
              </button>
              <button className="px-3 py-2 bg-white text-gray-700 hover:bg-gray-100">
                <FaList />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {
          availableCars?.map((car, index)=>(
            <CarCard key={car._id} index={index} car={car}></CarCard>
          ))
        }
      </div>
    </div>
  )
}

export default AvailableCars