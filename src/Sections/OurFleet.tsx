import React from "react";
import { FaStar } from "react-icons/fa";

const fleetCategories = [
  {
    name: "Economy Cars",
    description:
      "Affordable and fuel-efficient options for budget-conscious travelers.",
    image: "https://i.postimg.cc/nhg7pHcL/TD-2022-08-30-T135325-612.webp",
    features: ["Fuel Efficient", "Affordable", "Compact"],
  },
  {
    name: "Luxury Cars",
    description:
      "Experience comfort and style with our premium luxury vehicles.",
    image: "https://i.postimg.cc/c1Rch81B/3354732.jpg",
    features: ["High-end Features", "Elegant Design", "Comfortable"],
  },
  {
    name: "SUVs",
    description:
      "Spacious and powerful SUVs for family trips and off-road adventures.",
    image:
      "https://i.postimg.cc/LsGVCtZN/interested-buying-car-no-papers-istock-620x372.jpg",
    features: ["Spacious", "Powerful", "Versatile"],
  },
  {
    name: "Sports Cars",
    description: "Unleash the thrill with our high-performance sports cars.",
    image:
      "https://i.postimg.cc/YqxbrLJC/young-happy-man-receiving-new-car-keys-in-a-royalty-free-image-1589303628.avif",
    features: ["High Speed", "Sleek Design", "Dynamic Handling"],
  },
  {
    name: "Sports Cars",
    description: "Unleash the thrill with our high-performance sports cars.",
    image: "https://i.postimg.cc/VNXSwnV7/istockphoto-496352632-612x612.jpg",
    features: ["High Speed", "Sleek Design", "Dynamic Handling"],
  },
  {
    name: "Sports Cars",
    description: "Unleash the thrill with our high-performance sports cars.",
    image: "https://i.postimg.cc/8czsL3P3/qualey-0212.webp",
    features: ["High Speed", "Sleek Design", "Dynamic Handling"],
  },
  {
    name: "Sports Cars",
    description: "Unleash the thrill with our high-performance sports cars.",
    image: "https://i.postimg.cc/3RS3QwYS/images.jpg",
    features: ["High Speed", "Sleek Design", "Dynamic Handling"],
  },
  {
    name: "Sports Cars",
    description: "Unleash the thrill with our high-performance sports cars.",
    image: "https://i.postimg.cc/7hSDGnSc/test-driving-car-972x577.png",
    features: ["High Speed", "Sleek Design", "Dynamic Handling"],
  },
];

const OurFleet: React.FC = () => {
  return (
    <section className="w-full py-10 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          our fleet
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Explore our diverse range of vehicles tailored to meet your travel
          needs and preferences.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {fleetCategories.map((category, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl  bg-white group transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center text-gray-600 text-sm"
                    >
                      <FaStar className="text-yellow-500 mr-1" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Explore More</h3>
                  <p className="mb-4">
                    Click to view more details about this category.
                  </p>
                  <button className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFleet;
