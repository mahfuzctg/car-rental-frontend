/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegSave, FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

import {
  useGetSingleCarQuery,
  useUpdateCarMutation,
} from "../../../../../redux/features/car/carApi";
import { TCar } from "./CreateCarModal";

type TModalProps = {
  carId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateModal({ open, setOpen, carId }: TModalProps) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [updateCar, { isLoading: updateLoading }] = useUpdateCarMutation();
  const {
    data,
    isLoading: dataLoading,
    isSuccess,
  } = useGetSingleCarQuery(carId);
  const car: TCar | undefined = data?.data;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview

  useEffect(() => {
    if (isSuccess && car) {
      reset({
        name: car.name || "",
        carType: car.carType || "",
        isElectric: car.isElectric ? "yes" : "no",
        color: car.color || "",
        location: car.location || "",
        status: car.status || "",
        pricePerHour: car.pricePerHour || "",
        description: car.description || "",
        features: car.features?.join(",") || "",
        image1: car.images?.[0] || "",
      });
      setImagePreview(car.images?.[0] || null); // Set initial image preview
    }
  }, [reset, car, isSuccess]);

  // Preview image file
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    const imageFileUrl = imagePreview; // Use the preview URL directly

    const carData: TCar = {
      name: data.name,
      carType: data.carType,
      isElectric: data.isElectric === "yes",
      color: data.color,
      location: data.location,
      status: data.status,
      pricePerHour: parseInt(data.pricePerHour) || 0,
      description: data.description,
      features: data.features.toUpperCase().split(",") || [],
      images: imageFileUrl ? [imageFileUrl] : [], // Use the image URL
    };

    try {
      const response = await updateCar({
        carId: car?._id!,
        payload: carData,
      }).unwrap();

      if (response?.success) {
        setOpen(false);
        toast.success("Car has been updated successfully");
      } else {
        toast.error("Failed to update car");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Update error:", error);
    }
  };

  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center overflow-y-auto p-4">
      <form
        className="w-full max-w-md p-6 bg-white mt-96 rounded-lg shadow-lg relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(dataLoading || updateLoading) && (
          <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-white/80 rounded-lg flex justify-center items-center">
            <ClipLoader
              color="#000"
              size={60}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
            />
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name")}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Car Type</label>
            <select
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("carType")}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="compact">Compact</option>
              <option value="suv">SUVs</option>
              <option value="luxury">Luxury</option>
              <option value="pickup/truck">Pickups / Trucks</option>
              <option value="electric">Electric</option>
              <option value="convertibles">Convertibles</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Electric</label>
            <select
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("isElectric")}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Status</label>
            <select
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("isElectric")}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="yes">Available</option>
              <option value="no">Unavailable</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Color</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("color")}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("location")}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">
              Price Per Hour
            </label>
            <input
              type="number"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("pricePerHour")}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">
              Features{" "}
              <span className="text-sm text-red-600">
                (Separate each feature with a comma)
              </span>
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("features")}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              {...register("description")}
            />
          </div>

          {isSuccess && (
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Image</label>
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("image1")}
                placeholder="Image URL"
              />
              <input
                type="file"
                className="mt-2"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="mt-2 h-32 w-full object-cover rounded-md"
                />
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="submit"
              className="flex items-center px-4 py-2 font-semibold text-white rounded-md transition bg-red-600 hover:bg-red-700"
            >
              {updateLoading ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                <FaRegSave className="mr-1" />
              )}
              Save Changes
            </button>

            <button
              type="button"
              className="flex items-center px-4 py-2 font-semibold text-red-600 border border-red-600 rounded-md transition hover:bg-red-600 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <FaTimes className="mr-1" />
              Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
