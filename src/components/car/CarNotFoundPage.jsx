import { useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

const CarNotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      {/* Animated Pink Circle */}
      <div className="relative w-40 h-40 mb-8">
        <div className="absolute inset-0 rounded-full bg-pink-600 animate-pulse opacity-70 blur-xl"></div>
        <div className="absolute inset-4 rounded-full bg-pink-500 animate-ping"></div>
        <FiAlertCircle className="relative text-9xl text-pink-400 drop-shadow-lg" />
      </div>

      <h1 className="text-5xl font-extrabold text-pink-500 mb-4 tracking-wide">
        Oops! Car Not Found
      </h1>
      <p className="text-pink-300 max-w-md mb-8">
        Sorry, the car you are looking for doesn’t exist or may have been removed.
        Please check back or try searching again.
      </p>

      <button
        onClick={() => navigate("/cars")}
        className="btn bg-pink-600 hover:bg-pink-700 text-black font-bold px-8 py-3 rounded-full shadow-lg transition duration-300"
      >
        Browse Cars
      </button>
    </div>
  );
};

export default CarNotFoundPage;
