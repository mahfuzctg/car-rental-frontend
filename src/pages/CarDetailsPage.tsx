import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Car {
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [additionalFeatures, setAdditionalFeatures] = useState({
    insurance: false,
    gps: false,
    childSeat: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cars/${id}`)
      .then((response) => {
        setCar(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load car details.");
        setLoading(false);
      });
  }, [id]);

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAdditionalFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: checked,
    }));
  };

  const handleBookNow = () => {
    navigate(`/booking/${car?._id}`, { state: { additionalFeatures } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="car-details-page max-w-5xl mx-auto p-6">
      {car && (
        <>
          <div className="car-images mb-6">
            <img
              src={`https://source.unsplash.com/random/800x400?car=${car.name}`}
              alt={car.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div className="car-info">
            <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{car.description}</p>

            <div className="car-features mb-4">
              <h2 className="text-2xl font-semibold mb-2">Features</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="car-pricing mb-4">
              <p className="text-xl font-semibold">
                Price per hour:{" "}
                <span className="text-green-500">${car.pricePerHour}</span>
              </p>
              <p
                className={`text-lg font-semibold ${
                  car.status === "available" ? "text-green-600" : "text-red-600"
                }`}
              >
                Status: {car.status}
              </p>
            </div>

            <div className="additional-features mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Additional Features
              </h2>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="insurance"
                    checked={additionalFeatures.insurance}
                    onChange={handleFeatureChange}
                    className="form-checkbox"
                  />
                  <span>Insurance</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="gps"
                    checked={additionalFeatures.gps}
                    onChange={handleFeatureChange}
                    className="form-checkbox"
                  />
                  <span>GPS</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="childSeat"
                    checked={additionalFeatures.childSeat}
                    onChange={handleFeatureChange}
                    className="form-checkbox"
                  />
                  <span>Child Seat</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarDetails;
