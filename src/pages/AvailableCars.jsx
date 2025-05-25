import React, { useEffect, useState } from 'react';
import CarCard from '../components/car/CarCard';
import { useLoaderData } from 'react-router-dom';
import { FaList, FaTh } from 'react-icons/fa';
import CarCardMenu from '../components/car/CarCardMenu';

const AvailableCars = () => {
  const loadedCars = useLoaderData();
  const [searchText, setSearchText] = useState('');
  const [viewType, setViewType] = useState('grid');
  const [sortType, setSortType] = useState('date-newest');
  const [sortedCars, setSortedCars] = useState([]);

  useEffect(() => {
    // Filter only available cars
    const filteredAvailable = loadedCars.filter(car => car.availability === true);

    // Filter based on search input
    const filtered = filteredAvailable.filter(car =>
      car.carModel?.toLowerCase().includes(searchText.toLowerCase()) ||
      car.category?.toLowerCase().includes(searchText.toLowerCase())
    );

    // Sort the filtered cars
    let sorted = [...filtered];
    if (sortType === 'date-newest') {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === 'date-oldest') {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === 'low-high') {
      sorted.sort((a, b) => a.rent - b.rent);
    } else if (sortType === 'high-low') {
      sorted.sort((a, b) => b.rent - a.rent);
    }

    // Update displayed cars
    setSortedCars(sorted);
  }, [loadedCars, searchText, sortType]);

  return (
    <div className="bg-gray-50 px-4 md:px-8 py-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>
        <p className="text-gray-600 mt-1">Find the perfect vehicle for your next journey</p>

        <div className="mt-6 bg-white p-4 rounded-xl shadow-lg flex flex-col justify-center items-center gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by model, category..."
            className="input input-bordered w-full md:max-w-sm"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />

          {/* Sorting and View Buttons */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              className="select select-bordered"
              onChange={e => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="date-newest">Newest First</option>
              <option value="date-oldest">Oldest First</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>

            {/* View Toggle Buttons */}
            <div className="flex border rounded-sm">
              <button
                className={`px-3 py-2 ${viewType === 'grid' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setViewType('grid')}
              >
                <FaTh />
              </button>
              <button
                className={`px-3 py-2 ${viewType === 'list' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setViewType('list')}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Car Display */}
      {viewType === 'grid' ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedCars.map((car, index) => (
            <CarCard key={car._id} index={index} car={car} />
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {sortedCars.map((car, index) => (
            <CarCardMenu key={car._id} index={index} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
