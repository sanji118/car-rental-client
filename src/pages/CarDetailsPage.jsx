import {  useLoaderData, useNavigate } from "react-router-dom";
import {  useState } from "react";
import BookingModal from "../components/modals/BookingModal";
import CarNotFoundPage from "../components/car/CarNotFoundPage";
import { ArrowLeft } from "lucide-react";
import CarDetails from "../components/car/CarDetails";
import VehicleSpecific from "../components/car/VehicleSpecific";
import BookingInformation from "../components/car/BookingInformation";

const CarDetailsPage = () => {
  const car = useLoaderData();
  const navigate = useNavigate();
  
  
  
  if (!car) return <CarNotFoundPage />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div>
        <div><button onClick={()=> navigate('/cars')} className="btn btn-secondary text-black"><ArrowLeft></ArrowLeft> Back to Cars</button></div>
        <div>
          <div>
            <div className="flex justify-between items-center relative top-20 w-11/12 mx-auto px-10">
              <div className={car.availability === true? 'badge badge-success' : 'badge badge-neutral'}>
                {
                  car.availability === true? 'Available' : 'Booked'
                }
              </div>
              <div className="btn rounded-full btn-secondary">
                {car.dailyRentalPrice}/day
              </div>
            </div>
            <img src={car.imageUrl} alt={car.carModel} className="rounded-xl w-11/12 mx-auto md:h-96"/>
          </div>
        </div>
        <CarDetails key={car._id} car={car}></CarDetails>
      </div>
      <div className="grid md:grid-cols-2 gap-6 p-6 rounded-xl ">
        <VehicleSpecific  car={car}></VehicleSpecific>
        <BookingInformation key={car.carModel} car={car}></BookingInformation>
      </div>
    </div>
  );
};

export default CarDetailsPage;
