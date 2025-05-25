import { useFetcher, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import BookingModal from "../components/modals/BookingModal";
import CarNotFoundPage from "../components/car/CarNotFoundPage";
import { ArrowLeft, Clock, MapPin, Shield } from "lucide-react";

const CarDetailsPage = () => {
  const car = useLoaderData();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false)
  

  const handleBooking = async () => {
    setIsBooking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Booking Successful!",
      description: `You have successfully booked the ${car.model}. Check your email for confirmation.`,
    });
    
    setIsBooking(false);
  };
  
  if (!car) return <CarNotFoundPage />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div>
        <div><button onClick={()=> navigate('/cars')} className="btn"><ArrowLeft></ArrowLeft> Back to Cars</button></div>
        <div>
          <div>
            <img src={car.imageUrl} alt={car.carModel} />
            <div className="flex justify-between items-center">
              <div className={car.availability === true? 'badge badge-success' : 'badge badge-neutral'}>
                {
                  car.availability === true? 'Available' : 'Booked'
                }
              </div>
              <div className="btn rounded-full btn-secondary">
                {car.dailyRentalPrice}/day
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">{car.carModel}</h1>
          <p>{car.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-600 my-4 gap-10">
            <div className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md flex">
              <MapPin className="h-4 w-4 mr-1" />
              {car.location}
            </div>
            <div className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md flex">
              <Clock className="h-4 w-4 mr-1"></Clock> {car.bookingCount} bookings
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Features</h1>
          <div className="flex flex-wrap gap-1 mb-4">
            {car.features.slice(0, 3).map((feature, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                +{car.features.length - 3} more
              </span>
            )}
          </div>

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
                    disabled={car.availability !== true || isBooking}
                    className=" btn w-full bg-pink-500 hover:bg-pink-700"
                  >
                    {isBooking ? 'Booking...' : car.availability === true ? 'Book Now' : 'Currently Unavailable'}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Free cancellation up to 24 hours before pickup
                  </p>
                </div>
              </div>
            </div>

        </div>
      </div>
      

      {/* Booking Modal */}
      <BookingModal car={car} isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default CarDetailsPage;
