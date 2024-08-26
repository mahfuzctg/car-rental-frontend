import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative w-full h-[500px] bg-cover bg-center"
      style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
    >
      {/* Overlay to darken the background image */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        {/* Hero Text */}
        <h1 className="text-4xl md:text-6xl font-bold">
          Find Your Perfect Ride
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Book your next car rental with ease
        </p>

        {/* "Book Now" Button */}
        <a
          href="/book"
          className="mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
        >
          Book Now
        </a>

        {/* Search Bar */}
        <div className="mt-12 w-full max-w-2xl">
          <form className="flex flex-col md:flex-row items-center justify-center">
            {/* Location Input */}
            <input
              type="text"
              placeholder="Enter Location"
              className="w-full md:w-1/3 p-3 mb-4 md:mb-0 md:mr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* Date Inputs */}
            <input
              type="date"
              className="w-full md:w-1/3 p-3 mb-4 md:mb-0 md:mr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="date"
              className="w-full md:w-1/3 p-3 mb-4 md:mb-0 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto mt-4 md:mt-0 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
