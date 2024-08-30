import React from "react";
import { Link } from "react-router-dom";
import ListCard from "../components/Card/ListCard";
import { useGetAllCarsQuery } from "../redux/features/car/carApi";
import { TCar } from "../types/carTypes";

const FeaturedSection: React.FC = () => {
  const { data: carData, isLoading } = useGetAllCarsQuery(undefined);

  return (
    <section className="pt-16 pb-24 md:py-24 container">
      {/* title and description */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <h2 className="text-2xl md:text-3xl  font-bold text-center mb-6 uppercase">
          Premier Car
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>

        <p data-aos="fade-up" className="text-gray-700">
          Discover our top deals on the most sought-after cars. These exclusive
          selections offer exceptional features, great value, and are ready to
          drive away whenever you are.
        </p>
      </div>
      {/* items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          carData?.data?.slice(0, 6).map((car: TCar) => (
            <div key={car._id}>
              <ListCard cardType="carListing" car={car} />
            </div>
          ))
        )}
      </div>
      {/* View More Button */}
      <div className="text-center mt-8">
        <Link
          to="/cars"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 transition duration-300"
        >
          View All Cars
        </Link>
      </div>
    </section>
  );
};

export default FeaturedSection;
