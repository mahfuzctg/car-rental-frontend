import React, { useEffect, useState } from "react";
import "../Customs/btn-custom.css";
import FeaturedCars from "./FeaturedCars";
import CustomerTestimonials from "./Testimonial";
import TextAnimation from "./TextAnimation";
import WhyChooseUs from "./WhyChooseUs";

const images = [
  "https://i.postimg.cc/VknqPxXX/car-buying-process-ec.png",
  "https://i.postimg.cc/ZKy36G7X/car-dealership-family-1600x675-e1674463578724.jpg",
  "https://i.postimg.cc/5NvgfQVH/3-L7-ND2-CKLWKPO7-PWEHZT2-YUNMY.jpg",
];

const HeroSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section className="relative  w-full h-[700px] flex flex-col justify-between">
        {/* Top Section: Search Bar */}
        <div className="z-20 flex px-4 mt-3 md:mt-2 items-center justify-center w-full bg-white bg-opacity-90 py-2">
          <div className="w-full ">
            <form className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Enter Location"
                className="w-full md:w-1/3 p-1.5 md:p-2 text-gray-600 border-b-4 border-red-600 focus:outline-none focus:border-green-500"
              />
              <input
                type="date"
                className="w-full md:w-1/3 p-1.5 md:p-2 text-gray-500 border-b-4 border-red-600 focus:outline-none focus:border-green-500"
              />
              <input
                type="date"
                className="w-full md:w-1/3 p-1.5 md:p-2 text-gray-500 border-b-4 border-red-600 focus:outline-none focus:border-green-500"
              />
              <button type="submit" className="btn-custom w-full md:w-32  ">
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Background Image with Title and Button */}
        <div className="relative flex-1 flex flex-col items-center justify-center text-center">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                currentImage === index ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          ))}
          <div className="relative z-10 text-white px-4 py-8 bg-black bg-opacity-60 rounded-lg">
            <TextAnimation text="Find Your Perfect CAR" />
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold mt-4">
              Book your next car rental with ease
            </p>
            <a href="/bookings" className="btn-custom">
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Others Section */}
      <FeaturedCars />
      <WhyChooseUs />
      <CustomerTestimonials />
    </div>
  );
};

export default HeroSection;
