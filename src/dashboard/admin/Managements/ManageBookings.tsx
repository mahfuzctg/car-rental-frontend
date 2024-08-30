import { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { RiEditCircleLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import {
  useCancelBookingMutation,
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "../../../redux/features/booking/bookingApi";
import { useReturnCarMutation } from "../../../redux/features/car/carApi";
import { TBooking } from "../../../types/bookingTypes";
import UpdateBookingModal from "./CRUD/Modal/UpdateBooking";

export default function ManageBooking() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { data, isLoading: bookingsLoading } = useGetBookingsQuery(undefined);
  const [updateBooking, { isLoading: updateLoading }] =
    useUpdateBookingMutation();
  const [cancelBooking] = useCancelBookingMutation();
  const [returnCar] = useReturnCarMutation();
  const [updateBookingId, setUpdateBookingId] = useState<string>("");

  const bookings: TBooking[] = data?.data || [];

  // approve booking
  const approveBooking = async (bookingId: string) => {
    const res = await updateBooking({
      bookingId,
      payload: { status: "approved" },
    });

    if (res?.data?.success) {
      toast.success("Booking Approved!");
    } else {
      toast.error("Something went wrong");
    }
  };

  // cancel booking
  const cancelBookingIntoDB = async (bookingId: string, carId: string) => {
    const res = await cancelBooking({ bookingId, carId });

    if (res?.data?.success) {
      toast.success("Booking Cancelled!");
    } else {
      toast.error("Something went wrong");
    }
  };

  // return the car
  const confirmReturnBooking = async (bookingId: string) => {
    const res = await returnCar({ bookingId });

    if (res?.data?.success) {
      toast.success("The car has been Returned");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10 font-prompt">
      <div className="flex justify-center items-center mb-3">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          booking managements
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
      </div>

      <h6 className="text-sm md:text-base  text-zinc-400 ">
        ◽ The gray background of row indicates that user requested to return
        the car.
      </h6>
      <h6 className="text-sm md:text-base  text-zinc-400 ">
        ◽ To approve a booking click on the approve icon.
      </h6>

      <div className="text-right mb-7">
        {/* update booking modal  */}
        {openUpdateModal && (
          <UpdateBookingModal
            bookingId={updateBookingId}
            open={openUpdateModal}
            setOpen={setOpenUpdateModal}
          />
        )}
      </div>

      <div className="flex flex-col ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {bookingsLoading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader
                    color="#FBBF24"
                    loading={bookingsLoading}
                    size={60}
                    aria-label="Loading Spinner"
                    speedMultiplier={0.8}
                  />
                </div>
              ) : bookings.length === 0 ? (
                <div className="flex justify-center items-center py-4 text-gray-500">
                  <p>No bookings available.</p>
                </div>
              ) : (
                <table className="min-w-full text-center text-sm inter-regular dark:border-neutral-500">
                  <thead className="inter-regular ">
                    <tr className="bg-white h-8 text-gray-700 text-[12px] md:text-base ">
                      <th
                        scope="col"
                        className="px-6 py-0 md:py-2 lg:py-4 rounded-l-2xl"
                      >
                        Image
                      </th>
                      <th scope="col" className="px-6 py-0 md:py-2 lg:py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-0 md:py-2 lg:py-4">
                        User
                      </th>
                      <th scope="col" className="px-6 py-0 md:py-2 lg:py-4">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-0 md:py-2 lg:py-4">
                        Price(1H)
                      </th>
                      <th scope="col" className="px-6 py-0 md:py-2 lg:py-4">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-0 md:py-2 lg:py-4">
                        Approve Booking
                      </th>
                      <th scope="col" className="px-6 py-0 md:py-2 lg:py-4">
                        Cancel
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-0 md:py-2 lg:py-4 rounded-r-2xl"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="relative">
                    {updateLoading && (
                      <ClipLoader
                        color="#FBBF24"
                        loading={updateLoading}
                        className="absolute top-14 left-2/4 backdrop-blur-lg"
                        size={60}
                        aria-label="Loading Spinner"
                        speedMultiplier={0.8}
                      />
                    )}

                    {bookings?.map((booking) => (
                      <tr
                        key={booking._id}
                        className={`${
                          booking.isReturnProcess
                            ? "bg-amber-400/10 relative hover:bg-transparent"
                            : ""
                        }`}
                      >
                        {/* for confirming the return request  */}
                        {booking.isReturnProcess && (
                          <div className="absolute transition bg-black/50 w-full h-full flex items-center">
                            <button
                              className={`bg-lime-600 hover:bg-lime-700 text-white rounded font-semibold transition-all px-3 py-1 ml-56`}
                              onClick={() => confirmReturnBooking(booking._id!)}
                            >
                              Approve Return
                            </button>
                          </div>
                        )}

                        <td className="whitespace-nowrap px-6 py-4 font-medium flex items-center justify-center">
                          <img
                            src={booking?.car?.images[0]}
                            className="w-[52px] h-[52px] md:w-16 md:h-16 object-contain rounded-full"
                          />
                        </td>
                        <td className="font-medium text-sm text-zinc-400 text-start md:text-center px-6 py-4">
                          {booking.car.name}
                        </td>
                        <td className="font-medium text-sm text-zinc-400 text-start md:text-center px-6 py-4">
                          {booking.user.email}
                        </td>
                        <td className="font-medium text-sm text-zinc-400 text-start md:text-center px-6 py-4">
                          {booking.date}
                        </td>

                        <td className="whitespace-nowrap font-medium text-lime-500 text-sm md:text-lg px-6 py-4">
                          ${booking.car.pricePerHour}
                        </td>
                        <td className="whitespace-nowrap font-medium text-zinc-400 text-sm px-6 py-4">
                          {booking.status}
                        </td>

                        {booking.status === "cancelled" ||
                        booking.status === "completed" ? (
                          <></>
                        ) : (
                          <>
                            <td className="whitespace-nowrap font-medium text-sm md:text-lg px-6 py-4">
                              <button
                                className={`text-white rounded font-semibold transition-all text-3xl`}
                                onClick={() => approveBooking(booking._id!)}
                              >
                                <IoShieldCheckmarkSharp />
                              </button>
                            </td>

                            <td className="whitespace-nowrap font-medium text-sm md:text-lg px-6 py-4">
                              <button
                                className={`text-white rounded font-semibold transition-all md:text-2xl`}
                                onClick={() =>
                                  cancelBookingIntoDB(
                                    booking._id!,
                                    booking.car._id!
                                  )
                                }
                              >
                                <FcCancel />
                              </button>
                            </td>
                          </>
                        )}

                        <td className="whitespace-nowrap font-medium text-sm md:text-lg px-6 py-4">
                          <button
                            className={`text-white rounded font-semibold transition-all md:text-2xl`}
                            onClick={() => {
                              setUpdateBookingId(booking._id!);
                              setOpenUpdateModal(true);
                            }}
                          >
                            <RiEditCircleLine />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
