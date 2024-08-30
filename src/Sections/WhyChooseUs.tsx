import React from "react";
import { FaCar, FaDollarSign, FaHeadset } from "react-icons/fa";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <FaDollarSign className="text-red-600 text-5xl" />,
      title: "Best Prices",
      description:
        "We offer competitive pricing and special discounts to ensure you get the best deal on your car rental.",
    },
    {
      icon: <FaCar className="text-red-600 text-5xl" />,
      title: "Wide Selection",
      description:
        "Choose from a wide variety of vehicles to suit your needs, from economy cars to luxury SUVs.",
    },
    {
      icon: <FaHeadset className="text-red-600 text-5xl" />,
      title: "24/7 Support",
      description:
        "Our customer support team is available around the clock to assist you with any inquiries or issues.",
    },
  ];

  return (
    <section className="w-full my-10 py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          WHY CHOOSE US?
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <p className="text-center text-gray-600 mb-6">
          We are one of the leading auto repair shops serving customers in
          <br className="hidden md:block" />
          Tucson. All mechanic services are performed by highly qualified
          <br className="hidden md:block" />
          mechanics. We guarantee the highest quality of work and customer
          <br className="hidden md:block" />
          satisfaction.
        </p>

        <div className="flex flex-col md:flex-row justify-around gap-6 mb-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-lg hover:shadow-xl transition duration-300 bg-white"
            >
              <div className="mb-4 flex justify-center items-center">
                {feature.icon}
              </div>
              <p className="text-red-600 mb-2 text-sm">EVERY JOB IS PERSONAL</p>
              <div className="w-24 h-1 bg-red-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
