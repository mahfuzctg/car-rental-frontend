import React, { useEffect, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import { useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../redux/api/carApi";
import { Car } from "../types/carTypes";

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetCarByIdQuery(id!);
  const [car, setCar] = useState<Car | null>(null);
  const [additionalFeatures, setAdditionalFeatures] = useState({
    insurance: false,
    gps: false,
    childSeat: false,
  });

  useEffect(() => {
    if (data) {
      setCar(data);
    }
  }, [data]);

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600">Failed to load car details.</p>
    );
  }

  if (!car) {
    return <p className="text-center text-red-600">No car found.</p>;
  }

  const zoomProps = {
    img: car.imageUrl || "https://via.placeholder.com/800",
    zoomWidth: 400,
    height: 300,
    zoomPosition: "original",
  };

  const handleFeatureChange = (feature: string) => {
    setAdditionalFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <div className="car-details p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{car.name}</h1>
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        {/* Image Zoom */}
        <div className="flex-1">
          <ReactImageZoom {...zoomProps} />
        </div>

        {/* Car Details */}
        <div className="flex-1">
          <p className="text-lg mb-4 text-gray-700">{car.description}</p>
          <p className="text-xl font-bold mb-4 text-gray-800">
            Price: ${car.pricePerHour} per hour
          </p>

          {/* Additional Features */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Additional Features
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={additionalFeatures.insurance}
                  onChange={() => handleFeatureChange("insurance")}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="text-gray-700">Insurance</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={additionalFeatures.gps}
                  onChange={() => handleFeatureChange("gps")}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="text-gray-700">GPS</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={additionalFeatures.childSeat}
                  onChange={() => handleFeatureChange("childSeat")}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="text-gray-700">Child Seat</span>
              </label>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Customer Reviews
            </h2>
            <p className="text-gray-700">
              No reviews yet. Be the first to review this car!
            </p>
          </div>

          {/* Book Now Button */}
          <a
            href={`/book/${car._id}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
