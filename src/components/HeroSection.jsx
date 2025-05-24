
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

const HeroSection = () => {


    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
            staggerChildren: 0.4,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 10 }
        },
    };


  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-gray-500 to-black overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url("./bg.avif")'
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-100 opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in mt-10">
            Drive Your Dreams
            <motion.span
                className="block mt-2"
                initial={{opacity: 0}}
                animate={{ 
                    opacity: 1,
                    color: ["#ff69b4", "#000000", "#ff69b4"] 
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "loop" , ease: "easeInOut"}}
            >
                Today!
            </motion.span>
         </h1>
        
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fade-in delay-300">
          Experience the freedom of the road with our premium car rental service. 
          From economy to luxury, find your perfect ride.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
          <Link to="/cars">
            <button  
              className="btn bg-pink-500 border-none text-lg shadow-none transition-all duration-300 transform hover:scale-110"
            >
              View Available Cars
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          
          <Link to="/register">
            <button 
              className="btn  hover:bg-gray-200 px-8 py-4 text-lg transition-all duration-300 transform hover:scale-110"
            >
              Get Started
            </button>
          </Link>
        </div>

        {/* Stats Section */}
        <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            >
            {[
                { value: "500+", label: "Cars Available" },
                { value: "50k+", label: "Happy Customers" },
                { value: "25+", label: "Locations" },
                { value: "24/7", label: "Support" },
            ].map(({ value, label }, i) => (
                <motion.div
                key={i}
                className="text-center"
                variants={itemVariants}
                >
                <div className="text-3xl font-bold text-pink-600">{value}</div>
                <div className="text-gray-300 text-sm">{label}</div>
                </motion.div>
            ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
