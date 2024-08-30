import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/ui/UI/button";
import { Input } from "../../components/ui/UI/input";
import { Label } from "../../components/ui/UI/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/UI/select";
import { setBooking } from "../../redux/features/booking/bookingSlice";

type TBookingForm = {
  passport?: FileList;
  drivingLicense: string;
  creditCard: string;
  GPS: string;
  childSeat: string;
  date: string;
};

const apiKey = import.meta.env.VITE_IMAGEBB_API_KEY;
const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const BookingForm = () => {
  const { id: carId } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TBookingForm>();

  const onSubmit: SubmitHandler<TBookingForm> = async (data) => {
    const formData = new FormData();
    if (data.passport && data.passport[0]) {
      formData.append("image", data.passport[0]);
    }

    setLoading(true);

    try {
      let passportUrl = "";
      if (data.passport && data.passport[0]) {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        const imgData = await response.json();

        if (!response.ok) {
          throw new Error(imgData.error.message || "Something went wrong");
        }

        passportUrl = imgData.data?.url || "";
      }

      const bookingData = {
        passport: passportUrl,
        drivingLicense: data.drivingLicense,
        creditCard: data.creditCard,
        GPS: data.GPS === "true",
        childSeat: data.childSeat === "true",
        car: carId,
        date: data.date,
      };

      dispatch(setBooking(bookingData));
      navigate(`/booking-confirmation/${carId}`);
      toast.success("Booking successful!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(`Booking failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center px-3 py-8">
      <div className="bg-white shadow-lg p-8 rounded-xl border border-gray-200">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          Book Your Car!
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Passport */}
            <div className="flex flex-col">
              <Label htmlFor="passport">NID/Passport (optional):</Label>
              <Input
                className="border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600 md:w-80"
                type="file"
                id="passport"
                placeholder="Upload your NID or Passport"
                {...register("passport")}
              />
              {errors.passport && (
                <p className="text-red-500 text-sm mt-1">
                  NID/Passport is required if provided
                </p>
              )}
            </div>
            {/* Driving License */}
            <div className="flex flex-col">
              <Label htmlFor="drivingLicense">Driving License:</Label>
              <Input
                className="border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600 md:w-80"
                type="text"
                id="drivingLicense"
                placeholder="Enter your Driving License number"
                {...register("drivingLicense", { required: true })}
              />
              {errors.drivingLicense && (
                <p className="text-red-500 text-sm mt-1">
                  Driving License is required
                </p>
              )}
            </div>
            {/* Date */}
            <div className="flex flex-col">
              <Label htmlFor="date">Date:</Label>
              <Input
                className="border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600 md:w-80"
                type="date"
                id="date"
                {...register("date", { required: true })}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">Date is required</p>
              )}
            </div>
            {/* Credit Card */}
            <div className="flex flex-col">
              <Label htmlFor="creditCard">Credit Card:</Label>
              <Input
                className="border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600 md:w-80"
                type="text"
                id="creditCard"
                placeholder="Enter your Credit Card number"
                {...register("creditCard", { required: true })}
              />
              {errors.creditCard && (
                <p className="text-red-500 text-sm mt-1">
                  Credit Card is required
                </p>
              )}
            </div>

            {/* GPS */}
            <div className="flex flex-col">
              <Label htmlFor="GPS">GPS:</Label>
              <div className="border-gray-300 shadow-sm focus-within:border-red-600 focus-within:ring-red-600 md:w-80">
                <Controller
                  name="GPS"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select GPS Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="false">No</SelectItem>
                          <SelectItem value="true">Yes</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.GPS && (
                <p className="text-red-500 text-sm mt-1">GPS is required</p>
              )}
            </div>
            {/* Child Seat */}
            <div className="flex flex-col">
              <Label htmlFor="childSeat">Child Seat:</Label>
              <div className="border-gray-300 shadow-sm focus-within:border-red-600 focus-within:ring-red-600 md:w-80">
                <Controller
                  name="childSeat"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Child Seat Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="false">No</SelectItem>
                          <SelectItem value="true">Yes</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.childSeat && (
                <p className="text-red-500 text-sm mt-1">
                  Child Seat is required
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full md:w-1/2 bg-red-600 text-white hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Now"}
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default BookingForm;
