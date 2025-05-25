import React from 'react';
import { FaCalendarAlt, FaTrash } from 'react-icons/fa';

const BookingTable = ({ bookings, setEditingBooking, setShowCancelModal, handleRemoveBooking }) => {
  return (
    <div>
      <table className="min-w-full table-auto border-collapse shadow">
        <thead>
          <tr className="bg-gray-200 text-left font-bold">
            <th className="p-2">Car Image</th>
            <th className="p-2">Car Model</th>
            <th className="p-2">Booking Date</th>
            <th className="p-2">Start Date</th>
            <th className="p-2">End Date</th>
            <th className="p-2">Total Price</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr
              key={booking._id}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:shadow transition-shadow`}
            >
              <td className="p-2 align-middle">
                <img src={booking.imageUrl} alt={booking.carModel} className="w-20 rounded" />
              </td>
              <td className="p-2 align-middle">{booking.carModel}</td>
              <td className="p-2 align-middle">
                {new Date(booking.bookingDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </td>
              <td className="p-2 align-middle">
                {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : '-'}
              </td>
              <td className="p-2 align-middle">
                {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : '-'}
              </td>
              <td className="p-2 align-middle">${booking.price}</td>
              <td className="p-2 align-middle">
                <span
                  className={`inline-block px-2 py-1 text-sm font-semibold rounded ${
                    booking.status === 'confirmed'
                      ? 'bg-green-500 text-white'
                      : booking.status === 'cancelled'
                      ? 'bg-red-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}
                >
                  {booking.status || 'Confirmed'}
                </span>
              </td>
              <td className="p-2 align-middle">
                <div className="flex gap-2">
                  {booking.status !== 'cancelled' && (
                    <>
                      <button
                        onClick={() => setEditingBooking(booking)}
                        className="flex items-center gap-1 border border-blue-600 text-blue-600 hover:bg-blue-50 px-3 py-1 rounded"
                      >
                        <FaCalendarAlt /> Modify Date
                      </button>
                      <button
                        onClick={() => setShowCancelModal(booking)}
                        className="flex items-center gap-1 border border-red-600 text-red-600 hover:bg-red-50 px-3 py-1 rounded"
                      >
                        <FaTrash /> Cancel
                      </button>
                    </>
                  )}
                  {booking.status === 'cancelled' && (
                    <button
                      onClick={() => handleRemoveBooking(booking._id)}
                      className="flex items-center gap-1 border border-red-800 text-red-800 hover:bg-red-100 px-3 py-1 rounded"
                    >
                      <FaTrash /> Remove
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
