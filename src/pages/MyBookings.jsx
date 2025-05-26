import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingTable from '../components/booking/BookingTable';
import EditCarModal from '../components/modals/EditCarModal'
import useAuth from '../hooks/useAuth';
import CarNotFoundPage from '../components/car/CarNotFoundPage';
import ConfirmModal from '../components/modals/ConfirmModal';
import BookingChart from '../components/booking/BookingChart';

const MyBookings = () => {
  const { token } = useAuth();
  //console.log(token)
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    axios
      .get('https://car-rental-server-eta.vercel.app/my-booking', { withCredentials: true })
      .then((res) => setBookings(res.data))
  }, [refresh]);

  const handleModifyDate = async (id) => {
    await axios.patch(`https://car-rental-server-eta.vercel.app/my-booking/${id}`, { startDate, endDate }, { withCredentials: true });
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, startDate, endDate } : b))
    );
    setEditingBooking(null);
  };

  const handleCancelBooking = async (id) => {
    const response = await axios.patch(`https://car-rental-server-eta.vercel.app/my-booking/${id}/cancel`);
    if(response.status === 200 || response.status === 204) {
        setBookings((prev) => 
            prev.map((booking) => 
                booking._id === id ? { ...booking, status: "cancelled" } : booking
            )
        );
        setShowCancelModal(null);
    }  
  };


  const handleRemoveBooking = async (id) => {
    await axios.delete(`https://car-rental-server-eta.vercel.app/my-booking/${id}`, { withCredentials: true });
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="p-6">
      <div>
        {
          bookings.length !== 0 && <div className='my-10'><BookingChart></BookingChart></div>
        }
      </div>
      <h2 className="text-2xl font-semibold mb-4">
        My Bookings <span className="ml-2 text-green-600">({confirmedCount} confirmed)</span>
      </h2>

      {bookings.length === 0 ? (
        <CarNotFoundPage />
      ) : (
        <div className="overflow-x-auto">
          <BookingTable
            bookings={bookings}
            setEditingBooking={(booking) => {
              setEditingBooking(booking);
              setStartDate(new Date(booking.startDate || booking.bookingDate));
              setEndDate(new Date(booking.endDate || booking.bookingDate));
            }}
            setShowCancelModal={setShowCancelModal}
            handleRemoveBooking={handleRemoveBooking} 
          />
        </div>
      )}

      {editingBooking && (
        <EditCarModal
          editingBooking={editingBooking}
          setEditingBooking={setEditingBooking}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleModifyDate={handleModifyDate}
        />
      )}

      {showCancelModal && (
        <ConfirmModal
          handleCancelBooking={handleCancelBooking}
          setShowCancelModal={setShowCancelModal}
          showCancelModal={showCancelModal}
        />
      )}
    </div>
  );
};

export default MyBookings;
