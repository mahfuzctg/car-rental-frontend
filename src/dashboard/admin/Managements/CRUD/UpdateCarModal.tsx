import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  useGetSingleCarQuery,
  useUpdateCarMutation,
} from "../../../../redux/features/car/carApi";
import { TFormData } from "./CreateCar";

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

const apiKey = import.meta.env.VITE_IMAGEBB_API_KEY;
const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const UpdateCar = () => {
  const { id } = useParams();
  const { data: car } = useGetSingleCarQuery(id);
  const [loading, setLoading] = useState(false);
  const [updateCar, { isLoading }] = useUpdateCarMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<TFormData>();

  const onSubmit: SubmitHandler<TFormData> = async (data) => {
    let imageUrl = car?.data?.image;

    if (data.image && data.image[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const imgData = await response.json();
      setLoading(false);
      imageUrl = imgData.data.url;
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
      const res = await updateCar(updatedData);

      if (res.data?.success) {
        toast.success(res?.data?.message, { id: toastId });
        navigate("/admin/manage-cars");
      }
    } catch (err) {
      toast.error(err?.data?.message, { id: toastId });
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center px-3 py-8">
      <div className="shadow-custom-light p-8 rounded-xl">
        <div className="max-w-8 mx-auto flex items-center justify-center mb-6">
          {/* <Logo /> */}
        </div>

        <h3 className="text-2xl font-semibold text-gray-100 text-center mb-8">
          Update car information!
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Name */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
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
                <Label htmlFor="model">Model:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
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
                <Label htmlFor="year">Year:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
                  type="text"
                  id="year"
                  placeholder="Enter year of manufacture"
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
                <Label htmlFor="features">Features:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
                  type="text"
                  id="features"
                  placeholder="Enter car features"
                  {...register("features", { required: true })}
                />
              </div>
              {errors?.features && (
                <p className="text-red-500 text-sm">Features is required</p>
              )}
            </div>
            {/* Price per hour */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="pricePerHour">Price per hour:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
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
            {/* Image */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="image">Image:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
                  type="file"
                  id="image"
                  placeholder="Choose an image (optional)"
                  {...register("image")}
                />
              </div>
              {errors?.image && (
                <p className="text-red-500 text-sm">Image is optional</p>
              )}
            </div>
            {/* Description */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="description">Description:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
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
                <Label htmlFor="isElectric">Is Electric:</Label>
                <Controller
                  name="isElectric"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="md:w-80 focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={"false"}>No</SelectItem>
                          <SelectItem value={"true"}>Yes</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors?.isElectric && (
                <p className="text-red-500 text-sm">Is Electric is required</p>
              )}
            </div>
            {/* Car Type */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="carType">Car Type:</Label>
                <Controller
                  name="carType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="md:w-80 focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select car type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={"SUV"}>SUV</SelectItem>
                          <SelectItem value={"Sedan"}>Sedan</SelectItem>
                          <SelectItem value={"Truck"}>Truck</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors?.carType && (
                <p className="text-red-500 text-sm">Car Type is required</p>
              )}
            </div>
            {/* Location */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="location">Location:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
                  type="text"
                  id="location"
                  placeholder="Enter car location"
                  {...register("location", { required: true })}
                />
              </div>
              {errors?.location && (
                <p className="text-red-500 text-sm">Location is required</p>
              )}
            </div>
            {/* Date */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="date">Date:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
                  type="date"
                  id="date"
                  placeholder="Select a date"
                  {...register("date", { required: true })}
                />
              </div>
              {errors?.date && (
                <p className="text-red-500 text-sm">Date is required</p>
              )}
            </div>
            {/* Color */}
            <div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="color">Color:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
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
                <Label htmlFor="seatCapacity">Seat Capacity:</Label>
                <Input
                  className="md:w-80 focus-visible:ring-offset-0"
                  type="number"
                  id="seatCapacity"
                  placeholder="Enter seat capacity"
                  {...register("seatCapacity", { required: true })}
                />
              </div>
              {errors?.seatCapacity && (
                <p className="text-red-500 text-sm">
                  Seat Capacity is required
                </p>
              )}
            </div>
          </div>
          <div className="text-center mt-6">
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Car"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateCar;
