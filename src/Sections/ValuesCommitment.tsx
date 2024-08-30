import React from "react";
import { FaDollarSign, FaHandsHelping, FaHeart, FaLeaf } from "react-icons/fa";

const values = [
  {
    title: "Customer Service Excellence",
    description:
      "We are committed to providing exceptional service to ensure every customer feels valued and heard.",
    icon: <FaHandsHelping className="text-red-600 w-12 h-12" />,
  },
  {
    title: "Sustainability",
    description:
      "Our operations are designed to minimize environmental impact and promote sustainable practices.",
    icon: <FaLeaf className="text-red-600 w-12 h-12" />,
  },
  {
    title: "Integrity & Transparency",
    description:
      "We operate with honesty and openness in all our business dealings, ensuring trust and reliability.",
    icon: <FaDollarSign className="text-red-600 w-12 h-12" />,
  },
  {
    title: "Community Engagement",
    description:
      "We actively participate in and contribute to the communities we serve, supporting local initiatives and causes.",
    icon: <FaHeart className="text-red-600 w-12 h-12" />,
  },
];

const ValuesCommitment: React.FC = () => {
  return (
    <div>
      {/* Section 1: Image and Text */}
      <section className="w-full py-12">
        <div className="container mx-auto">
          <h2 className="text-xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
            Our Values & Commitment
            <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            {/* Image */}
            <div className=" p-4">
              <img
                src="https://i.postimg.cc/VLjnmy09/istockphoto-1473771646-612x612.jpg"
                alt="Company Commitment"
                className="w-full  object-cover"
              />
            </div>
            {/* Text Content */}
            <div className="md:w-1/2 p-4">
              <p className="text-center md:text-left text-gray-600">
                At our company, our dedication to excellence is reflected in our
                core values, which guide everything we do. We prioritize
                exceptional customer service, ensuring every client receives the
                attention and care they deserve. Our commitment to environmental
                responsibility drives us to adopt sustainable practices that
                minimize our ecological footprint. We uphold the highest
                standards of integrity, fostering a culture of transparency and
                trust in all our interactions. Our focus on community support
                means actively engaging with and contributing to the local
                communities we serve. We strive to create a positive impact by
                supporting local initiatives and charitable causes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Grid of Cards */}
      <section className="w-full py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl shadow-lg bg-white flex flex-col items-center text-center group hover:bg-red-50 transition-colors duration-300"
              >
                <div className="rounded-full mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValuesCommitment;
