/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { MdCancel, MdRestore } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
import {
  useGetAllCarsQuery,
  useUpdateCarMutation,
} from "../../../redux/features/car/carApi";
import { TCar } from "./CRUD/Modal/CreateCarModal";
import UpdateModal from "./CRUD/Modal/UpdateModal";

export default function ManageReturnCars() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { data, isLoading } = useGetAllCarsQuery({ status: "unavailable" });
  const [updateProductId, setUpdateProductId] = useState("");
  const [updateCar] = useUpdateCarMutation();
  const [loadingReturn, setLoadingReturn] = useState<boolean>(false);
  const [returningCarId, setReturningCarId] = useState<string | null>(null);

  const cars: TCar[] = data?.data || [];

  // Handle the action of returning a car
  const handleReturnCar = async (carId: string) => {
    const confirmReturn = window.confirm(
      "Are you sure you want to return this car?"
    );
    if (!confirmReturn) return;

    setLoadingReturn(true);
    toast.info("Returning the car..."); // Notify loading state

    try {
      await updateCar({ id: carId, status: "available" });
      toast.success("Car returned successfully!"); // Notify success
      setReturningCarId(null); // Reset returningCarId after successful return
    } catch (error: any) {
      console.error("Error returning car:", error);
      const errorMessage =
        error?.data?.message || "Failed to return car. Please try again.";
      toast.error(errorMessage); // Notify failure with specific error message
    } finally {
      setLoadingReturn(false);
    }
  };

  const handleCancelReturn = () => {
    setReturningCarId(null); // Reset the returningCarId when canceled
    toast.info("Car return process canceled."); // Notify cancellation
  };

  return (
    <section className="max-w-full mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10 font-prompt">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center uppercase">
          Booked Cars
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Total Booked Cars: <span className="font-bold">{cars.length}</span>
        </p>
      </div>
      <div className="text-right mb-7">
        {openUpdateModal && (
          <UpdateModal
            carId={updateProductId}
            open={openUpdateModal}
            setOpen={setOpenUpdateModal}
          />
        )}
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
              <table className="min-w-full text-center text-sm inter-regular">
                <thead className="inter-regular bg-gray-100 border-b border-gray-200">
                  <tr className="text-gray-700 text-xs md:text-sm lg:text-base">
                    <th className="px-4 py-2 border-r border-gray-200">
                      Image
                    </th>
                    <th className="px-4 py-2 border-r border-gray-200">Name</th>
                    <th className="px-4 py-2 border-r border-gray-200">
                      Location
                    </th>
                    <th className="px-4 py-2 border-r border-gray-200">
                      Car Type
                    </th>
                    <th className="px-4 py-2 border-r border-gray-200">
                      Price(1H)
                    </th>
                    <th className="px-4 py-2 border-r border-gray-200">
                      Status
                    </th>
                    <th className="px-4 py-2 border-r border-gray-200">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={7} className="py-4">
                        <ClipLoader
                          color="#FBBF24"
                          loading={isLoading}
                          className="mx-auto"
                          size={60}
                          aria-label="Loading Spinner"
                          speedMultiplier={0.8}
                        />
                      </td>
                    </tr>
                  )}

                  {cars.map((car) => (
                    <tr
                      key={car._id}
                      className="bg-white border-b border-gray-200"
                    >
                      <td className="px-4 py-2 flex items-center justify-center border-r border-gray-200">
                        <img
                          src={car.image}
                          className="w-16 h-16 md:w-20 md:h-20 object-contain"
                          alt={car.name}
                        />
                      </td>
                      <td className="px-4 py-2 text-zinc-400 text-xs md:text-sm lg:text-base text-start border-r border-gray-200">
                        {car.name}
                      </td>
                      <td className="px-4 py-2 text-zinc-400 text-xs md:text-sm lg:text-base text-start border-r border-gray-200">
                        {car.location}
                      </td>
                      <td className="px-4 py-2 text-zinc-400 text-xs md:text-sm lg:text-base text-start border-r border-gray-200">
                        {car.carType}
                      </td>
                      <td className="px-4 py-2 text-red-500 text-xs md:text-sm lg:text-base border-r border-gray-200">
                        {car.pricePerHour}$
                      </td>
                      <td className="px-4 py-2 text-zinc-400 text-xs md:text-sm lg:text-base border-r border-gray-200">
                        {car.status}
                      </td>
                      <td className="px-4 py-2 text-xs md:text-sm lg:text-base flex justify-center gap-2">
                        {returningCarId === car._id ? (
                          <>
                            <button
                              className="bg-red-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-red-700"
                              onClick={() => handleReturnCar(car._id!)} // Provide option to return car
                              disabled={loadingReturn} // Disable button while loading
                            >
                              {loadingReturn ? (
                                <ClipLoader
                                  color="#FFFFFF"
                                  loading={loadingReturn}
                                  size={20}
                                />
                              ) : (
                                <MdRestore />
                              )}
                            </button>
                            <button
                              className="bg-gray-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-gray-700"
                              onClick={handleCancelReturn} // Cancel the return
                            >
                              <MdCancel />
                            </button>
                          </>
                        ) : (
                          <button
                            className="bg-green-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-green-700"
                            onClick={() => setReturningCarId(car._id!)} // Set car ID for return
                          >
                            Return
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!cars.length && (
                <p className="text-xl text-center mt-8 text-gray-500">
                  No Cars
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* ToastContainer to display notifications */}
    </section>
  );
}
