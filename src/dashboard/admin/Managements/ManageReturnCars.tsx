import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { useGetAllCarsQuery } from "../../../redux/features/car/carApi";
import { TCar } from "./CRUD/Modal/CreateCarModal";
import UpdateModal from "./CRUD/Modal/UpdateModal";

export default function ManageReturnCars() {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { data, isLoading } = useGetAllCarsQuery({ status: "unavailable" });
  const [updateProductId, setUpdateProductId] = useState("");

  const cars: TCar[] = data?.data || [];

  return (
    <section className="max-w-full mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10 font-prompt">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center uppercase">
          Booked Cars
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
      </div>

      <div className="text-right mb-7">
        {/* Update product modal */}
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
                    <th
                      scope="col"
                      className="px-4 py-2 border-r border-gray-200"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 border-r border-gray-200"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 border-r border-gray-200"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 border-r border-gray-200"
                    >
                      Car Type
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 border-r border-gray-200"
                    >
                      Price(1H)
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 border-r border-gray-200"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 border-r border-gray-200"
                    >
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
                      <td className="px-4 py-2 text-xs md:text-sm lg:text-base">
                        <button
                          className="bg-red-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-red-700"
                          onClick={() => {
                            setUpdateProductId(car._id!);
                            setOpenUpdateModal(true);
                          }}
                        >
                          <MdModeEdit />
                        </button>
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
    </section>
  );
}
