import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full py-8 md:h-[700px] bg-cover bg-center flex flex-col justify-start">
      <div className="relative z-10 flex flex-col items-center justify-start h-full text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl w-full font-bold text-[#000000] py-2 md:py-4 px-2 md:px-4 uppercase">
          Find Your Perfect Ride
        </h1>
        <p className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-gray-800">
          Book your next car rental with ease
        </p>
        <a
          href="/book"
          className="px-3 sm:px-5 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Book Now
        </a>
        <div className="mt-6 sm:mt-10 w-full px-2 sm:px-4 max-w-md md:max-w-2xl">
          <form className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Enter Location"
              className="w-full md:w-1/3 p-2 md:p-3 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="date"
              className="w-full md:w-1/3 p-2 md:p-3 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="date"
              className="w-full md:w-1/3 p-2 md:p-3 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div
        className="absolute bottom-0 w-full h-[300px] md:h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/tTRGp2FQ/sale-car-rental-concept-vector-600nw-1387577387.webp')",
        }}
      ></div>
    </section>
  );
};

export default HeroSection;
