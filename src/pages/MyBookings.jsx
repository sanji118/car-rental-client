import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Calendar, Trash2, Edit } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modifyDates, setModifyDates] = useState({
    startDate: null,
    endDate: null
  });

  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/my-bookings?email=${user.email}`);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load bookings');
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  // Cancel booking function
  const handleCancelBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(`http://localhost:5000/bookings/${bookingId}`, {
          status: 'cancelled'
        });
        
        setBookings(bookings.map(booking => 
          booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
        ));
        
        toast.success('Booking cancelled successfully');
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  // Modify booking dates
  const handleModifyDates = async () => {
    if (!modifyDates.startDate || !modifyDates.endDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/bookings/${selectedBooking._id}`, {
        startDate: modifyDates.startDate,
        endDate: modifyDates.endDate
      });

      setBookings(bookings.map(booking => 
        booking._id === selectedBooking._id ? { 
          ...booking, 
          startDate: modifyDates.startDate,
          endDate: modifyDates.endDate
        } : booking
      ));

      setSelectedBooking(null);
      toast.success('Booking dates updated successfully');
    } catch (error) {
      toast.error('Failed to update booking dates');
    }
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
  };

  
  const calculateTotalPrice = (startDate, endDate, dailyPrice) => {
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    return (days * dailyPrice).toFixed(2);
  };

  if (loading) {
    return <div className="text-center py-20">Loading your bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20 border border-gray-200 w-5/6 mx-auto my-10 rounded-lg">
        <h2 className="text-3xl font-semibold">No Bookings Found</h2>
        <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
        <Link to="/cars">
          <button className='btn btn-secondary text-black'>Browse Cars</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-gray-500">View and manage your car bookings</p>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={booking.car.imageUrl} 
                    alt={booking.car.carModel} 
                    className="h-12 w-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{booking.car.carModel}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold">
                    ${calculateTotalPrice(booking.startDate, booking.endDate, booking.car.dailyRentalPrice)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setModifyDates({
                          startDate: new Date(booking.startDate),
                          endDate: new Date(booking.endDate)
                        });
                      }}
                      disabled={booking.status === 'cancelled'}
                      className={`inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white 
                        ${booking.status === 'cancelled' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Modify
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={booking.status === 'cancelled'}
                      className={`inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white 
                        ${booking.status === 'cancelled' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modify Dates Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Modify Booking Dates</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <DatePicker
                  selected={modifyDates.startDate}
                  onChange={(date) => setModifyDates({...modifyDates, startDate: date})}
                  selectsStart
                  startDate={modifyDates.startDate}
                  endDate={modifyDates.endDate}
                  minDate={new Date()}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <DatePicker
                  selected={modifyDates.endDate}
                  onChange={(date) => setModifyDates({...modifyDates, endDate: date})}
                  selectsEnd
                  startDate={modifyDates.startDate}
                  endDate={modifyDates.endDate}
                  minDate={modifyDates.startDate}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleModifyDates}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Confirm Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;