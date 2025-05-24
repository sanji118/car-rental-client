
import { Percent, Calendar, Crown, Clock } from 'lucide-react';

const SpecialOffers = () => {
  const offers = [
    {
      icon: Percent,
      title: "Weekend Special",
      description: "Get 15% off for weekend rentals!",
      discount: "15% OFF",
      validity: "Valid till end of month",
      buttonText: "Book Now",
      bgGradient: "from-green-400 to-emerald-600"
    },
    {
      icon: Crown,
      title: "Luxury Deal",
      description: "Luxury cars at $99/day this holiday season!",
      discount: "FROM $99",
      validity: "Holiday special offer",
      buttonText: "Explore Luxury",
      bgGradient: "from-purple-400 to-indigo-600"
    },
    {
      icon: Calendar,
      title: "Long Term Rental",
      description: "Save more with our monthly rental packages",
      discount: "30% OFF",
      validity: "Monthly packages",
      buttonText: "Learn More",
      bgGradient: "from-blue-400 to-cyan-600"
    },
    {
      icon: Clock,
      title: "Last Minute Deals",
      description: "Book within 24 hours and save big!",
      discount: "20% OFF",
      validity: "Same day bookings",
      buttonText: "Quick Book",
      bgGradient: "from-orange-400 to-red-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Special Offers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss out on these amazing deals! Save more on your next car rental with our exclusive offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <div 
                key={offer.title}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-in-left"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`bg-gradient-to-br ${offer.bgGradient} p-6 text-white relative`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-20 h-20 transform rotate-45 translate-x-10 -translate-y-10 bg-white rounded-lg"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 transform rotate-45 -translate-x-8 translate-y-8 bg-white rounded-lg"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-8 w-8" />
                      <span className="text-2xl font-bold">{offer.discount}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">
                      {offer.title}
                    </h3>

                    <p className="text-white text-opacity-90 mb-4 text-sm">
                      {offer.description}
                    </p>

                    <p className="text-white text-opacity-75 text-xs mb-4">
                      {offer.validity}
                    </p>

                    <button
                      className="btn w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white border-opacity-30"
                    >
                      {offer.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with Our Latest Offers
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and never miss a deal!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-automotive-blue"
            />
            <button className="btn btn-secondary bg-automotive-blue hover:bg-automotive-blue-dark px-6">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;