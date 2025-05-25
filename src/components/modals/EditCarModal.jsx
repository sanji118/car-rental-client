import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const EditCarModal = ({ newDate, editingBooking, setEditingBooking,  setNewDate }) => {
  const [newPrice, setNewPrice] = useState(editingBooking?.price || 0);
  const [newStatus, setNewStatus] = useState(editingBooking?.status || 'confirmed');

  const handleModifyBooking = async (id, newDate, newPrice, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/my-booking/${id}`, {
        bookingDate: newDate,
        price: newPrice,
        status: newStatus,
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, bookingDate: newDate, price: newPrice, status: newStatus } : b
        )
      );
      setEditingBooking(null);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };


  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Modify Booking</h3>

        <label>Date:</label>
        <DatePicker
          selected={newDate}
          onChange={(date) => setNewDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border px-2 py-1 w-full mb-4"
        />

        <label>Total Price:</label>
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(Number(e.target.value))}
          className="border px-2 py-1 w-full mb-4"
        />

        <label>Status:</label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border px-2 py-1 w-full mb-4"
        >
          <option value="confirmed">Confirmed</option>
          <option value="canceled">Canceled</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditingBooking(null)}
            className="px-4 py-1 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => handleModifyBooking(editingBooking._id, newDate, newPrice, newStatus)}
            className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCarModal;
