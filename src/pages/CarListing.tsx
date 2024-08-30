import { motion } from "framer-motion";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import ListCard from "../components/Card/ListCard";
import { useGetAllCarsQuery } from "../redux/features/car/carApi";
import { TCar } from "../types/carTypes";

const bounceTransition = {
  duration: 0.6,
  type: "spring",
  stiffness: 300,
  damping: 10,
};

const fadeTransition = {
  duration: 0.5,
};

const CarListing: React.FC = () => {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: 0,
    maxPrice: 10000,
    search: "",
  });
  const [visibleCount, setVisibleCount] = useState(10);
  const [showLess, setShowLess] = useState(false);

  const { data, isLoading, isError } = useGetAllCarsQuery({
    searchValue: filters.search,
    carType: filters.type,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });

  const cars: TCar[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-600">Failed to load cars.</p>;
  }

  const minPrice = Number(filters.minPrice);
  const maxPrice = Number(filters.maxPrice);

  const filteredCars = cars.filter(
    (car) =>
      car.pricePerHour >= minPrice &&
      car.pricePerHour <= maxPrice &&
      (filters.type ? car.model === filters.type : true) &&
      (filters.search
        ? car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          (Array.isArray(car.features)
            ? car.features
                .join(" ")
                .toLowerCase()
                .includes(filters.search.toLowerCase())
            : car.features.toLowerCase().includes(filters.search.toLowerCase()))
        : true)
  );

  const carsToDisplay = filteredCars.slice(0, visibleCount);

  const toggleVisibility = () => {
    setShowLess(!showLess);
    setVisibleCount((prev) => (showLess ? Math.max(prev - 10, 10) : prev + 10));
  };

  return (
    <div className="p-4">
      {/* Filter Controls */}
      <motion.div
        className="filters mb-4 p-4 rounded-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={fadeTransition}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search Field */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...fadeTransition, delay: 0.2 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">
              Search for cars:
              <input
                type="text"
                placeholder="Search by name or features"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </label>
          </motion.div>

          {/* Type Filter */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...fadeTransition, delay: 0.4 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">
              Car Type:
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                <option value="">All Types</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </label>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...fadeTransition, delay: 0.6 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">
              Price Range:
              <div className="flex gap-2 mt-1">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            </label>
          </motion.div>
        </div>
      </motion.div>

      {/* Featured Cars Section */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fadeTransition}
      >
        <h2 className="text-2xl md:text-3xl text-gray-700 font-bold text-center mb-6 uppercase">
          All Cars
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars.slice(0, 6).map((car) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...fadeTransition, delay: 0.2 }}
            >
              <ListCard car={car} cardType="booking" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Car Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fadeTransition}
      >
        {carsToDisplay.length > 0 ? (
          carsToDisplay.map((car) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...fadeTransition, delay: 0.4 }}
            >
              <ListCard car={car} cardType="booking" />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No cars available for the selected filters.
          </p>
        )}
      </motion.div>

      {/* Show More/Less Button */}
      <motion.div
        className="text-center mt-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...bounceTransition, delay: 0.6 }}
      >
        <button
          onClick={toggleVisibility}
          className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 transition-colors"
        >
          {showLess ? "Show Less" : "Show More"}
        </button>
      </motion.div>
    </div>
  );
};

export default CarListing;
