import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash, FaCalendarAlt } from 'react-icons/fa';
import ConfirmModal from '../components/modals/ConfirmModal';
import EditCarModal from '../components/modals/EditCarModal';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [newDate, setNewDate] = useState(new Date());
  const [showCancelModal, setShowCancelModal] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/my-booking')
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Error fetching bookings:', err));
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/my-booking/${id}`);
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
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse shadow">
          <thead>
            <tr className="bg-gray-200 text-left font-bold">
              <th className="p-2">Car Image</th>
              <th className="p-2">Car Model</th>
              <th className="p-2">Booking Date</th>
              <th className="p-2">Total Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:shadow transition-shadow`}
              >
                <td className="p-2">
                  <img
                    src={booking.imageUrl}
                    alt={booking.carModel}
                    className="w-20 rounded"
                  />
                </td>
                <td className="p-2">{booking.carModel}</td>
                <td className="p-2">
                  {new Date(booking.bookingDate).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="p-2">${booking.price}</td>
                <td className="p-2">{booking.status || 'Confirmed'}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => setEditingBooking(booking)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    <FaCalendarAlt /> Modify Date
                  </button>
                  <button
                    onClick={() => setShowCancelModal(booking)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    <FaTrash /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modify Date Modal */}
      {editingBooking && (
        <EditCarModal handleModifyDate={handleModifyDate} setEditingBooking={setEditingBooking} newDate={newDate} editingBooking={editingBooking} ></EditCarModal>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <ConfirmModal handleCancelBooking={handleCancelBooking} setShowCancelModal={setShowCancelModal}></ConfirmModal>
      )}
    </div>
  );
};

export default MyBookings;
