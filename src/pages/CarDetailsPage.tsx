import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ReactImageZoom from "react-image-zoom";
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
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load car details.</p>;
  }

  if (!car) {
    return <p>No car found.</p>;
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
    <div className="car-details p-4">
      <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Image Zoom */}
        <div className="flex-1">
          <ReactImageZoom {...zoomProps} />
        </div>

        {/* Car Details */}
        <div className="flex-1">
          <p className="text-lg mb-4">{car.description}</p>
          <p className="text-xl font-bold mb-4">
            Price: ${car.pricePerHour} per hour
          </p>

          {/* Additional Features */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Additional Features</h2>
            <div className="space-y-2">
              <label className="block">
                <input
                  type="checkbox"
                  checked={additionalFeatures.insurance}
                  onChange={() => handleFeatureChange("insurance")}
                />
                <span className="ml-2">Insurance</span>
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={additionalFeatures.gps}
                  onChange={() => handleFeatureChange("gps")}
                />
                <span className="ml-2">GPS</span>
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={additionalFeatures.childSeat}
                  onChange={() => handleFeatureChange("childSeat")}
                />
                <span className="ml-2">Child Seat</span>
              </label>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>
            <p>No reviews yet. Be the first to review this car!</p>
          </div>

          {/* Book Now Button */}
          <a
            href={`/book/${car._id}`}
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
