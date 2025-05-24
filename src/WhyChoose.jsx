import { Car, DollarSign, Clock, Headphones, Shield, Award } from 'lucide-react';

const WhyChoose = () => {
  const features = [
    {
      icon: Car,
      title: "Wide Variety of Cars",
      description: "From budget-friendly options to luxury vehicles, we have the perfect car for every occasion and budget."
    },
    {
      icon: DollarSign,
      title: "Affordable Prices",
      description: "Competitive daily rates you can count on. No hidden fees, transparent pricing for all our services."
    },
    {
      icon: Clock,
      title: "Easy Booking Process",
      description: "Seamlessly book your ride in just a few clicks. Quick, simple, and hassle-free reservations."
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance for all your queries. We're here whenever you need us."
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "All our vehicles are fully insured for your peace of mind during your rental period."
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "Well-maintained, clean vehicles that meet our high standards for safety and comfort."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose DriveRental?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing you with the best car rental experience. 
            Here's what makes us stand out from the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-automotive-blue bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8 text-automotive-blue" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;