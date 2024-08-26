import React from "react";
import { FaCar, FaDollarSign, FaHeadset } from "react-icons/fa";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <FaDollarSign className="text-green-600 w-12 h-12" />,
      title: "Best Prices",
      description:
        "We offer competitive pricing and special discounts to ensure you get the best deal on your car rental.",
    },
    {
      icon: <FaCar className="text-green-600 w-12 h-12" />,
      title: "Wide Selection",
      description:
        "Choose from a wide variety of vehicles to suit your needs, from economy cars to luxury SUVs.",
    },
    {
      icon: <FaHeadset className="text-green-600 w-12 h-12" />,
      title: "24/7 Support",
      description:
        "Our customer support team is available around the clock to assist you with any inquiries or issues.",
    },
  ];

  return (
    <section className="w-full my-10 py-10 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
