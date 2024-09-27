/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/UI/button";
import { Input } from "../../../../components/ui/UI/input";
import { Label } from "../../../../components/ui/UI/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/UI/select";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";
import { useCreateCarMutation } from "../../../../redux/features/car/carApi";
import { useAppSelector } from "../../../../redux/hooks/hook";

export type TFormData = {
  image: FileList;
  name: string;
  model: string;
  year: string;
  features: string; // Keep this as string and split later
  pricePerHour: number;
  description: string;
  isElectric: boolean; // Ensure this is a boolean
  carType: string;
  location: string;
  color: string;
  seatCapacity: number;
  date: string; // Added date field
};

const CreateCar = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const user = useAppSelector(selectCurrentUser);
  const [createCar, { isLoading }] = useCreateCarMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormData>();

  const onSubmit: SubmitHandler<TFormData> = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Creating...");

    const carData = {
      ...data,
      image: imageUrl || "", // Use imageUrl directly
      ownerEmail: user?.email,
      ownerName: user?.name,
      features: data.features.split(",").map((feature) => feature.trim()),
      pricePerHour: Number(data.pricePerHour),
      seatCapacity: Number(data.seatCapacity),
      isElectric: data.isElectric, // Use the boolean directly
    };

    try {
      const res = await createCar(carData);
      if (res.data?.success) {
        toast.success(res.data.message || "Car created successfully!", {
          id: toastId,
        });
        navigate("/admin/manage-cars");
      }
    } catch (err) {
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        "An error occurred. Please try again.";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=744cf569a978865f3474c3e180ffe096",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        setImageUrl(result.data.url);
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      toast.error("An error occurred while uploading the image.");
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center px-4 py-8 bg-gray-100">
      <div className="shadow-lg p-8 rounded-xl bg-white border border-gray-200">
        <h2 className="text-xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          Create New Car!
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Image Upload */}
            <div>
              <Label htmlFor="image" className="font-medium">
                Upload Image:
              </Label>
              <Input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="md:w-80"
              />
              {imageUrl && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border border-gray-300 shadow-sm"
                  />
                </div>
              )}
            </div>
            {/* Name */}
            <div>
              <Label htmlFor="name" className="font-medium">
                Car Name:
              </Label>
              <Input
                className="md:w-80"
                type="text"
                id="name"
                placeholder="Enter car name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>
            {/* Model */}
            <div>
              <Label htmlFor="model" className="font-medium">
                Model:
              </Label>
              <Input
                className="md:w-80"
                type="text"
                id="model"
                placeholder="Enter car model"
                {...register("model", { required: true })}
              />
              {errors.model && (
                <p className="text-red-500 text-sm">Model is required</p>
              )}
            </div>
            {/* Year */}
            <div>
              <Label htmlFor="year" className="font-medium">
                Year:
              </Label>
              <Input
                className="md:w-80"
                type="text"
                id="year"
                placeholder="Enter car year"
                {...register("year", { required: true })}
              />
              {errors.year && (
                <p className="text-red-500 text-sm">Year is required</p>
              )}
            </div>
            {/* Features */}
            <div>
              <Label htmlFor="features" className="font-medium">
                Features:
              </Label>
              <Input
                className="md:w-80"
                type="text"
                id="features"
                placeholder="Enter car features (comma separated)"
                {...register("features", { required: true })}
              />
              {errors.features && (
                <p className="text-red-500 text-sm">Features are required</p>
              )}
            </div>
            {/* Price per Hour */}
            <div>
              <Label htmlFor="pricePerHour" className="font-medium">
                Price per Hour:
              </Label>
              <Input
                className="md:w-80"
                type="number"
                id="pricePerHour"
                placeholder="Enter price per hour"
                {...register("pricePerHour", { required: true })}
              />
              {errors.pricePerHour && (
                <p className="text-red-500 text-sm">
                  Price per hour is required
                </p>
              )}
            </div>
            {/* Description */}
            <div>
              <Label htmlFor="description" className="font-medium">
                Description:
              </Label>
              <Input
                className="md:w-80"
                type="text"
                id="description"
                placeholder="Enter car description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">Description is required</p>
              )}
            </div>
            {/* Is Electric */}
            <div>
              <Label htmlFor="isElectric" className="font-medium">
                Is Electric:
              </Label>
              <Controller
                name="isElectric"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value ? "true" : "false"} // Ensure correct string representation
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.isElectric && (
                <p className="text-red-500 text-sm">Is Electric is required</p>
              )}
            </div>
            {/* Car Type */}
            <div>
              <Label htmlFor="carType" className="font-medium">
                Car Type:
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a car type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Location */}
            <div>
              <Label htmlFor="location" className="font-medium">
                Location:
              </Label>
              <Input
                className="md:w-80"
                type="text"
                id="location"
                placeholder="Enter location"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">Location is required</p>
              )}
            </div>
            {/* Color */}
            <div>
              <Label htmlFor="color" className="font-medium">
                Color:
              </Label>
              <Input
                className="md:w-80"
                type="text"
                id="color"
                placeholder="Enter car color"
                {...register("color", { required: true })}
              />
              {errors.color && (
                <p className="text-red-500 text-sm">Color is required</p>
              )}
            </div>
            {/* Seat Capacity */}
            <div>
              <Label htmlFor="seatCapacity" className="font-medium">
                Seat Capacity:
              </Label>
              <Input
                className="md:w-80"
                type="number"
                id="seatCapacity"
                placeholder="Enter seat capacity"
                {...register("seatCapacity", { required: true })}
              />
              {errors.seatCapacity && (
                <p className="text-red-500 text-sm">
                  Seat capacity is required
                </p>
              )}
            </div>
            {/* Date */}
            <div>
              <Label htmlFor="date" className="font-medium">
                Date:
              </Label>
              <Input
                className="md:w-80"
                type="date"
                id="date"
                {...register("date", { required: true })}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">Date is required</p>
              )}
            </div>
          </div>
          <div className="flex justify-center  mt-8">
            <Button
              type="submit"
              disabled={loading || isLoading}
              className={`w-full bg-red-600 text-white hover:bg-red-700 ${
                loading || isLoading ? "opacity-50" : ""
              }`}
            >
              {loading || isLoading ? "Creating..." : "Create Car"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateCar;
