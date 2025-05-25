import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarCard from './components/car/CarCard';

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/recently-added')
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
            <CarCard key={index} index={index} car={car}></CarCard>
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