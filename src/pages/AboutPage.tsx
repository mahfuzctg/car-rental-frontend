import React from "react";
import {
  FaBullseye,
  FaCalendarAlt,
  FaCar,
  FaCheck,
  FaCog,
  FaHandsHelping,
  FaLeaf,
  FaShieldAlt,
  FaSitemap,
  FaSmile,
  FaStar,
  FaThumbsUp,
} from "react-icons/fa";
import "../Customs/style.css"; // Ensure this path is correct

// Define your team members here
const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    image:
      "https://i.postimg.cc/D0zQ5PtR/pngtree-user-profile-avatar-png-image-13369989.png",
    ranking: "Top Leader",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image:
      "https://i.postimg.cc/D0zQ5PtR/pngtree-user-profile-avatar-png-image-13369989.png",
    ranking: "Tech Innovator",
  },
  {
    name: "Emily Johnson",
    role: "CFO",
    image:
      "https://i.postimg.cc/D0zQ5PtR/pngtree-user-profile-avatar-png-image-13369989.png",
    ranking: "Financial Expert",
  },
  // Removed duplicates for brevity
];

// ===== Our Fleet data ========
const fleetData = [
  {
    type: "Economy",
    description:
      "Affordable and fuel-efficient cars, perfect for city driving and budget-conscious travelers.",
    icon: <FaCar className="text-blue-600 text-3xl" />,
  },
  {
    type: "Luxury",
    description:
      "Experience the ultimate in comfort and style with our range of luxury vehicles.",
    icon: <FaStar className="text-yellow-500 text-3xl" />,
  },
  {
    type: "SUVs",
    description:
      "Spacious and versatile SUVs, ideal for family trips or off-road adventures.",
    icon: <FaSitemap className="text-green-600 text-3xl" />,
  },
];

//===== valuesData ======
const valuesData = [
  {
    title: "Customer Service",
    description:
      "Our commitment to delivering exceptional customer service is at the heart of everything we do. We strive to exceed expectations with every interaction.",
    icon: (
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full text-red-600 text-3xl">
        <FaHandsHelping />
      </div>
    ),
  },
  {
    title: "Sustainability",
    description:
      "We are dedicated to sustainability, constantly seeking ways to reduce our environmental impact and promote eco-friendly practices in our operations.",
    icon: (
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full text-red-600 text-3xl">
        <FaLeaf />
      </div>
    ),
  },
  {
    title: "Integrity",
    description:
      "Integrity is our foundation. We conduct our business with honesty, transparency, and respect, ensuring trust and reliability in all our relationships.",
    icon: (
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full text-red-600 text-3xl">
        <FaShieldAlt />
      </div>
    ),
  },
];

const AboutUsSection: React.FC = () => {
  return (
    <div>
      {/* Full Width Banner */}
      <section className="w-full bg-[#ffffff]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* First Section */}
          <div className="bg-[#ffffff]  p-6 flex flex-col justify-between order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4 uppercase text-center md:text-left">
              About <span className="text-red-600">Company</span>
            </h2>
            <p className="mb-4">
              There are many variations of passages of Lorem Ipsum typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <p className="mb-4">
              There are many variations of passages of Lorem Ipsum typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the with the release of Letraset sheets containing
              Lorem Ipsum.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-6">
              <div className="flex items-start space-x-3">
                <div className="text-red-600 w-16 h-16 rounded-full flex items-center justify-center text-4xl mr-4">
                  <FaCog />
                </div>
                <div>
                  <h3 className="font-bold">WE'RE EXPERTS</h3>
                  <p>There are many variations of passages of Lorem Ipsum</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-red-600 w-16 h-16 rounded-full flex items-center justify-center text-4xl mr-4">
                  <FaSmile />
                </div>
                <div>
                  <h3 className="font-bold">WE'RE FRIENDLY</h3>
                  <p>There are many variations of passages of Lorem Ipsum</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-red-600 w-16 h-16 rounded-full flex items-center justify-center text-4xl mr-4">
                  <FaCheck />
                </div>
                <div>
                  <h3 className="font-bold">WE'RE ACCURATE</h3>
                  <p>There are many variations of passages of Lorem Ipsum</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-red-600 w-16 h-16 rounded-full flex items-center justify-center text-4xl mr-4">
                  <FaThumbsUp />
                </div>
                <div>
                  <h3 className="font-bold">WE'RE TRUSTED</h3>
                  <p>There are many variations of passages of Lorem Ipsum</p>
                </div>
              </div>
            </div>
          </div>
          {/* Second Section */}
          <div
            className="bg-cover bg-center order-1 md:order-2"
            style={{
              backgroundImage:
                'url("https://i.postimg.cc/6Q5y5rwc/Tips-for-Saving-Money-on-Your-Next-Cash-Car-Rental.webp")',
              minHeight: "300px", // Ensure a minimum height for small devices
            }}
          />
        </div>
      </section>

      {/* Company History Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Company History
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-blue-600 text-3xl mr-4" />
                <h3 className="text-2xl font-semibold">Founding Year</h3>
              </div>
              <p className="text-gray-700">
                Founded in [Year], our company began with a vision to innovate
                and excel in the industry. We started as a small team with a big
                dream.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <FaBullseye className="text-green-600 text-3xl mr-4" />
                <h3 className="text-2xl font-semibold">Milestones</h3>
              </div>
              <p className="text-gray-700">
                Over the years, we have achieved significant milestones,
                including expansion into new markets and the launch of
                groundbreaking products.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsSection;
