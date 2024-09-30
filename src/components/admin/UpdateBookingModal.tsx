import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useBookingApprovalMutation,
  useCancelBookingMutation,
  useGetSingleBookingQuery,
} from "../../redux/features/booking/bookingApi";
import { useReturnCarMutation } from "../../redux/features/car/carApi";

type UpdateBookingModalProps = {
  bookingId: string;
  onClose: () => void;
};

export type UpdateBookingInfoProps = {
  endTime: string;
};

const UpdateBookingModal = ({
  bookingId,
  onClose,
}: UpdateBookingModalProps) => {
  const { register, handleSubmit, reset, setValue } =
    useForm<UpdateBookingInfoProps>();
  const { data: bookingData, isFetching } = useGetSingleBookingQuery(
    bookingId,
    { skip: !bookingId }
  );
  const [returnCar] = useReturnCarMutation();
  const [approveBooking] = useBookingApprovalMutation();
  const [cancelBooking] = useCancelBookingMutation();

  useEffect(() => {
    if (bookingData?.data?.startTime) {
      // Set default end time based on booking start time
      setValue("endTime", bookingData.data.startTime);
    }
  }, [bookingData, setValue]);

  const filterTimes = () => {
    const currentHour = new Date().getHours();
    const availableTimes = [];

    for (let i = currentHour + 1; i <= 24; i++) {
      availableTimes.push(`${i}:00`);
    }

    return availableTimes;
  };

  const onSubmit = async (data: UpdateBookingInfoProps) => {
    const { endTime } = data;

    try {
      await returnCar({
        bookingId: bookingData?.data?._id,
        endTime: endTime,
      }).unwrap();
      reset();
      toast.success("Successfully returned the car!");
      onClose(); // Close modal after success
    } catch (error) {
      console.error(error);
      toast.error("Car return failed");
    }
  };

  const handleApprove = async () => {
    try {
      await approveBooking(bookingId).unwrap();
      toast.success("Booking approved successfully!");
      onClose(); // Close modal after success
    } catch (error) {
      console.error(error);
      toast.error("Booking approval failed");
    }
  };

  const handleCancel = async () => {
    try {
      await cancelBooking(bookingId).unwrap();
      toast.success("Booking canceled successfully!");
      onClose(); // Close modal after success
    } catch (error) {
      console.error(error);
      toast.error("Booking cancellation failed");
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-11/12 max-w-lg">
        <h3 className="font-bold text-lg mb-4">Booking Details</h3>
        {isFetching ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : bookingData ? (
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Name:</strong> {bookingData.data.user.name}
            </li>
            <li>
              <strong>Date:</strong>{" "}
              {new Date(bookingData.data.date).toLocaleDateString()}
            </li>
            <li>
              <strong>Start Time:</strong> {bookingData.data.startTime}
            </li>
            <li>
              <strong>Car:</strong> {bookingData.data.car.name}
            </li>
            <li>
              <img
                src={bookingData.data.car.image[0] || ""}
                alt="Booking Image"
                className="w-full max-h-60 object-cover rounded-lg shadow-md"
              />
            </li>
          </ul>
        ) : (
          <p>No data available</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="py-3">
          <label htmlFor="endTime" className="text-base font-semibold">
            Pick return time:{" "}
            <span className="text-xs text-red-500">
              (If you accept this booking, please give the return time of car)
            </span>
          </label>
          <select
            id="endTime"
            {...register("endTime", { required: true })}
            className="p-2 border rounded-md shadow-md w-full mt-3"
          >
            {filterTimes().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <div className="mt-4 flex justify-between items-center">
            <button
              type="button"
              className="btn btn-outline btn-secondary"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              type="button"
              className="btn btn-outline btn-red"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-outline btn-accent"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default UpdateBookingModal;
