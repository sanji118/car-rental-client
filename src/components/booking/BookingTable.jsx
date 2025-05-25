
import React from 'react'
import { FaCalendarAlt, FaTrash } from 'react-icons/fa'

const BookingTable = ({bookings, setEditingBooking, setShowCancelModal}) => {
  return (
    <div>
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
  )
}

export default BookingTable