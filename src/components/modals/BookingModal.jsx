import Swal from "sweetalert2";
import { X } from "lucide-react";

const BookingModal = ({ car, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
    Swal.fire({
      title: "Booking Confirmed!",
      text: `You've booked ${car.model} for $${car.price}/day.`,
      icon: "success",
      confirmButtonColor: "#ec4899",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-black" onClick={onClose}>
          <X />
        </button>
        <h3 className="text-2xl font-bold text-pink-500 mb-4">Confirm Booking</h3>

        <p className="text-gray-700 mb-2">
          <strong>Model:</strong> {car.model}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Price/Day:</strong> ${car.price}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Availability:</strong>{" "}
          {car.available ? "Available" : "Not Available"}
        </p>

        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn bg-pink-500 text-white hover:bg-pink-600" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
