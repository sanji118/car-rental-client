import { format } from 'date-fns'
import React from 'react'

const BookingInformation = ({car}) => {
  return (
    <div className="card  border border-gray-200">
        <div className="card-body">
            <h2 className="card-title">Booking Information</h2>
            <div className="space-y-2">
            <p><strong>Daily Price:</strong> ${car.dailyRentalPrice}</p>
            <p><strong>Bookings:</strong> {car.bookingCount} times</p>
            <p><strong>Location:</strong> {car.location}</p>
            <p><strong>Listed Since:</strong> {format(car.date, 'dd/MM/yyyy')}</p>
            <p><strong>Status:</strong>
                <span className={`ml-2 badge ${car.availability ? 'badge-success' : 'badge-error'}`}>
                {car.availability ? 'Available' : 'Unavailable'}
                </span>
            </p>
            </div>
        </div>
    </div>
  )
}

export default BookingInformation