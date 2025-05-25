import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash, FaCalendarAlt } from 'react-icons/fa';
import ConfirmModal from '../components/modals/ConfirmModal';
import EditCarModal from '../components/modals/EditCarModal';
import axios from 'axios';
import BookingTable from '../components/booking/BookingTable';
import useAuth from '../hooks/useAuth';
import CarNotFoundPage from '../components/car/CarNotFoundPage';



const MyBookings = () => {
  const {token} = useAuth();
  console.log(token)
  const [refresh, setRefresh] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [newDate, setNewDate] = useState(new Date());
  const [showCancelModal, setShowCancelModal] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/my-booking', {
      withCredentials: true
    })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Error fetching bookings:', err));
  }, [refresh]);

  const handleCancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/my-booking/${id}`,{
        withCredentials: true
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: 'Canceled' } : b
        )
      );
      setShowCancelModal(null);
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  const handleModifyDate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/my-booking/${id}`, {
        bookingDate: newDate,
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, bookingDate: newDate } : b
        )
      );
      setEditingBooking(null);
    } catch (error) {
      console.error('Error updating booking date:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      {
        bookings.length === 0? (
          <CarNotFoundPage></CarNotFoundPage>
        ):(
          <div className="overflow-x-auto">
            <BookingTable bookings={bookings} setEditingBooking={setEditingBooking} setShowCancelModal={setShowCancelModal} ></BookingTable>
          </div>
        )
      }

      {/* Modify Date Modal */}
      {editingBooking && (
        <EditCarModal 
        handleModifyDate={handleModifyDate} setEditingBooking={setEditingBooking} 
        newDate={newDate} 
        editingBooking={editingBooking}
        setNewDate={setNewDate} 
        ></EditCarModal>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <ConfirmModal handleCancelBooking={handleCancelBooking} setShowCancelModal={setShowCancelModal} showCancelModal={showCancelModal} ></ConfirmModal>
      )}
    </div>
  );
};

export default MyBookings;
