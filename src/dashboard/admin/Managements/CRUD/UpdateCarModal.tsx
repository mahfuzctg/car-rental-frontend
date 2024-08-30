/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  useGetSingleCarQuery,
  useUpdateCarMutation,
} from "../../../../redux/features/car/carApi";
import { TFormData } from "./CreateCar";

import { Button } from "../../../../components/ui/UI/button";

// Define the ImageBB API URL and API Key
const apiKey = "744cf569a978865f3474c3e180ffe096";
const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const UpdateCar = () => {
  const { id } = useParams<{ id: string }>();
  const { data: car } = useGetSingleCarQuery(id || "");
  const [loading, setLoading] = useState(false);
  const [updateCar, { isLoading }] = useUpdateCarMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFormData>({
    defaultValues: {
      name: car?.data?.name || "",
      model: car?.data?.model || "",
      year: car?.data?.year || "",
      features: car?.data?.features[0] || "",
      pricePerHour: car?.data?.pricePerHour || "",
      image: undefined,
      description: car?.data?.description || "",
      isElectric: car?.data?.isElectric || false,
      carType: car?.data?.carType || "",
      location: car?.data?.location || "",
      date: car?.data?.date || "",
      color: car?.data?.color || "",
      seatCapacity: car?.data?.seatCapacity || "",
    },
  });

  const onSubmit: SubmitHandler<TFormData> = async (data) => {
    let imageUrl = car?.data?.image;

    if (data.image && data.image[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Image upload failed.");
        }

        const imgData = await response.json();

        if (imgData.success && imgData.data?.url) {
          imageUrl = imgData.data.url;
        } else {
          throw new Error("Image upload failed.");
        }
      } catch (uploadError) {
        toast.error("Image upload failed.");
        setLoading(false);
        return;
      }
      setLoading(false);
    }

    const toastId = toast.loading("Updating...");

    const carData = {
      name: data.name,
      model: data.model,
      year: data.year,
      features: [data.features],
      pricePerHour: Number(data.pricePerHour),
      image: imageUrl,
      description: data.description,
      isElectric: Boolean(data.isElectric),
      carType: data.carType,
      location: data.location,
      date: data.date,
      color: data.color,
      seatCapacity: Number(data.seatCapacity),
    };

    const updatedData = {
      id: car?.data?._id,
      data: carData,
    };

    try {
      await updateCar(updatedData).unwrap();
      toast.success("Car updated successfully!", { id: toastId });
      navigate("/admin/manage-cars");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "An unknown error occurred", {
          id: toastId,
        });
      } else {
        toast.error("An unknown error occurred", { id: toastId });
      }
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
        update car!
        <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Car Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Car Name
            </label>
            <input
              {...register("name", { required: "Car name is required" })}
              type="text"
              placeholder="Enter car name"
              defaultValue={car?.data?.name}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Car Model */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Car Model
            </label>
            <input
              {...register("model", { required: "Car model is required" })}
              type="text"
              placeholder="Enter car model"
              defaultValue={car?.data?.model}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model.message}</p>
            )}
          </div>

          {/* Year */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              {...register("year", { required: "Year is required" })}
              type="number"
              placeholder="Enter year of manufacture"
              defaultValue={car?.data?.year}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.year && (
              <p className="text-red-500 text-sm">{errors.year.message}</p>
            )}
          </div>

          {/* Features */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            <input
              {...register("features", { required: "Features are required" })}
              type="text"
              placeholder="Enter car features"
              defaultValue={car?.data?.features[0]}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.features && (
              <p className="text-red-500 text-sm">{errors.features.message}</p>
            )}
          </div>

          {/* Price Per Hour */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price Per Hour
            </label>
            <input
              {...register("pricePerHour", {
                required: "Price per hour is required",
              })}
              type="number"
              step="0.01"
              placeholder="Enter price per hour"
              defaultValue={car?.data?.pricePerHour}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.pricePerHour && (
              <p className="text-red-500 text-sm">
                {errors.pricePerHour.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Enter car description"
              rows={4}
              defaultValue={car?.data?.description}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
            {car?.data?.image && (
              <div className="mt-2">
                <img
                  src={car.data.image}
                  alt="Car"
                  className="w-32 h-32 object-cover rounded-md shadow-sm border border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Is Electric */}
          <div className="mb-4 flex items-center">
            <input
              {...register("isElectric")}
              type="checkbox"
              className="mr-2"
              defaultChecked={car?.data?.isElectric}
            />
            <label className="text-sm font-medium text-gray-700">
              Electric Car
            </label>
          </div>

          {/* Car Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Car Type
            </label>
            <input
              {...register("carType", { required: "Car type is required" })}
              type="text"
              placeholder="Enter car type"
              defaultValue={car?.data?.carType}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.carType && (
              <p className="text-red-500 text-sm">{errors.carType.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              placeholder="Enter car location"
              defaultValue={car?.data?.location}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              {...register("date", { required: "Date is required" })}
              type="date"
              placeholder="Select date"
              defaultValue={car?.data?.date}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          {/* Color */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              {...register("color", { required: "Color is required" })}
              type="text"
              placeholder="Enter car color"
              defaultValue={car?.data?.color}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.color && (
              <p className="text-red-500 text-sm">{errors.color.message}</p>
            )}
          </div>

          {/* Seat Capacity */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Seat Capacity
            </label>
            <input
              {...register("seatCapacity", {
                required: "Seat capacity is required",
              })}
              type="number"
              placeholder="Enter seat capacity"
              defaultValue={car?.data?.seatCapacity}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.seatCapacity && (
              <p className="text-red-500 text-sm">
                {errors.seatCapacity.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex  justify-center mt-8">
          <Button
            type="submit"
            loading={loading || isLoading}
            className="w-full max-w-sm bg-red-600 text-white hover:bg-red-700"
          >
            Update Car
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UpdateCar;
