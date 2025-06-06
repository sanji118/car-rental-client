import {  Shield } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import BookingModal from '../modals/BookingModal';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
const CarDetails = ({ car }) => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false); 
  
  const handleBooking = async () => {
    setLoadingBooking(true);
    const bookingData = {
      carId: car._id.toString(),
      carModel: car.carModel,
      imageUrl: car.imageUrl,
      price: car.dailyRentalPrice,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      email: user.email
    };
    try {
      const res = await axios.post('https://car-rental-server-eta.vercel.app/my-booking', bookingData, {
        withCredentials: true,
      })
      .then(res => console.log(res.data))
      if (res.data) {
        setIsBooking(true); 
      }
    } catch (error) {
      //console.log('Booking failed');
    } finally {
      setLoadingBooking(false);
      setOpenModal(true);
    }
  };

  const checkBooking = async () => {
      const res = await axios.get(`https://car-rental-server-eta.vercel.app/my-booking?email=${user.email}`, {
        withCredentials: true,
      });
      const data = res.data;
      //console.log(data);
      const exists = data.find(item => item.carId === car._id?.toString() && item.status !== 'Canceled');
      setIsBooking(!!exists);
  };

  useEffect(() => {
    if (user?.email) {
      checkBooking();
    }
  }, [car._id, user?.email]);

  

  return (
    <div>
      {/* ...Car details and features... */}
      <div className="card shadow-lg w-11/12 mx-auto my- border border-gray-100">
        <div className="p-5">
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            <p className="text-2xl md:text-3xl font-bold">Book This Car</p>
          </div>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">Daily Rate:</span>
              <span className="text-2xl font-bold text-pink-500">${car.dailyRentalPrice}</span>
            </div>
            <button
              onClick={handleBooking}
              disabled={car.availability !== true || isBooking || loadingBooking}
              className="btn w-full bg-pink-500 hover:bg-pink-700"
            >
              {isBooking ? 'Booked' : loadingBooking ? 'Booking...' : car.availability === true ? 'Book Now' : 'Currently Unavailable'}
            </button>
            <p className="text-xs text-gray-500 text-center">
              Free cancellation up to 24 hours before pickup
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        car={car}
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          checkBooking();  
        }}
      />
    </div>
  );
};

export default CarDetails;
