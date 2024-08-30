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
  features: string;
  pricePerHour: number;
  description: string;
  isElectric: string;
  carType: string;
  location: string;
  color: string;
  seatCapacity: string;
  date: string;
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
      name: data.name,
      model: data.model,
      year: data.year,
      features: [data.features],
      pricePerHour: Number(data.pricePerHour),
      description: data.description,
      isElectric: Boolean(data.isElectric),
      carType: data.carType,
      location: data.location,
      color: data.color,
      seatCapacity: Number(data.seatCapacity),
      date: data.date,
      image: imageUrl,
      ownerEmail: user?.email,
      ownerName: user?.name,
    };

    try {
      const res = await createCar(carData);
      if (res.data?.success) {
        toast.success(res.data?.message || "Car created successfully!", {
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
          create new car!
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div>
              <div className="grid w-full items-center gap-1.5">
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
              </div>
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
              <div className="grid w-full items-center gap-1.5">
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
              </div>
              {errors?.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>
            {/* Model */}
            <div>
              <div className="grid w-full items-center gap-1.5">
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
              </div>
              {errors?.model && (
                <p className="text-red-500 text-sm">Model is required</p>
              )}
            </div>
            {/* Year */}
            <div>
              <div className="grid w-full items-center gap-1.5">
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
              </div>
              {errors?.year && (
                <p className="text-red-500 text-sm">Year is required</p>
              )}
            </div>
            {/* Features */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="features" className="font-medium">
                  Features:
                </Label>
                <Input
                  className="md:w-80"
                  type="text"
                  id="features"
                  placeholder="Enter car features"
                  {...register("features", { required: true })}
                />
              </div>
              {errors?.features && (
                <p className="text-red-500 text-sm">Features are required</p>
              )}
            </div>
            {/* Price per hour */}
            <div>
              <div className="grid w-full items-center gap-1.5">
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
              </div>
              {errors?.pricePerHour && (
                <p className="text-red-500 text-sm">
                  Price per hour is required
                </p>
              )}
            </div>
            {/* Description */}
            <div>
              <div className="grid w-full items-center gap-1.5">
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
              </div>
              {errors?.description && (
                <p className="text-red-500 text-sm">Description is required</p>
              )}
            </div>
            {/* Is Electric */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="isElectric" className="font-medium">
                  Is Electric:
                </Label>
                <Controller
                  name="isElectric"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="md:w-80">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue=""
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
                    </div>
                  )}
                />
              </div>
              {errors?.isElectric && (
                <p className="text-red-500 text-sm">
                  Electric status is required
                </p>
              )}
            </div>
            {/* Car Type */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="carType" className="font-medium">
                  Car Type:
                </Label>
                <Controller
                  name="carType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="md:w-80">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue=""
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select car type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                            <SelectItem value="coupe">Coupe</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </div>
              {errors?.carType && (
                <p className="text-red-500 text-sm">Car type is required</p>
              )}
            </div>
            {/* Location */}
            <div>
              <div className="grid w-full items-center gap-1.5">
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
              </div>
              {errors?.location && (
                <p className="text-red-500 text-sm">Location is required</p>
              )}
            </div>
            {/* Color */}
            <div>
              <div className="grid w-full items-center gap-1.5">
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
              </div>
              {errors?.color && (
                <p className="text-red-500 text-sm">Color is required</p>
              )}
            </div>
            {/* Seat Capacity */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="seatCapacity" className="font-medium">
                  Seat Capacity:
                </Label>
                <Input
                  className="md:w-80"
                  type="text"
                  id="seatCapacity"
                  placeholder="Enter seat capacity"
                  {...register("seatCapacity", { required: true })}
                />
              </div>
              {errors?.seatCapacity && (
                <p className="text-red-500 text-sm">
                  Seat capacity is required
                </p>
              )}
            </div>
            {/* Date */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="date" className="font-medium">
                  Date:
                </Label>
                <Input
                  className="md:w-80"
                  type="date"
                  id="date"
                  {...register("date", { required: true })}
                />
              </div>
              {errors?.date && (
                <p className="text-red-500 text-sm">Date is required</p>
              )}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700"
              disabled={isLoading || loading}
            >
              {isLoading || loading ? "Creating..." : "Create Car"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateCar;
