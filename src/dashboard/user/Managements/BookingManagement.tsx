/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { MdCancel, MdCheck, MdDelete, MdEdit } from "react-icons/md";

interface Booking {
  id: number;
  car: string;
  date: string;
  status: string; // "Pending", "Approved", "Cancelled"
}

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"modify" | "cancel" | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://assignment3-phi-fawn.vercel.app/api/bookings`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleOpenModal = (booking: Booking, type: "modify" | "cancel") => {
    setSelectedBooking(booking);
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setActionType(null);
  };

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleModifyBooking = async () => {
    if (selectedBooking && actionType === "modify") {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://assignment3-phi-fawn.vercel.app/bookings/${selectedBooking.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedBooking), // Ensure this matches your API payload
          }
        );

        if (!response.ok) {
          throw new Error("Failed to modify booking");
        }

        const updatedBooking = await response.json();
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === updatedBooking.id ? updatedBooking : booking
          )
        );
        alert("Booking modified successfully!");
      } catch (error) {
        console.error("Error modifying booking:", error);
        alert("Failed to modify booking.");
      } finally {
        setLoading(false);
        handleCloseModal();
      }
    }
  };

  const handleCancelBooking = async () => {
    if (selectedBooking && actionType === "cancel") {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://assignment3-phi-fawn.vercel.app/bookings/${selectedBooking.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to cancel booking");
        }

        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== selectedBooking.id)
        );
        alert("Booking cancelled successfully!");
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking.");
      } finally {
        setLoading(false);
        handleCloseConfirmModal();
      }
    }
  };

  const upcomingBookings = bookings.filter(
    (b) => new Date(b.date) > new Date()
  );
  const pastBookings = bookings.filter((b) => new Date(b.date) <= new Date());

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
        Booking Management
        <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
      </h2>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Upcoming Bookings Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upcoming Bookings
        </h2>
        {upcomingBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border border-gray-300 rounded-md">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="px-4 py-2 border-b text-left">ID</th>
                  <th className="px-4 py-2 border-b text-left">Car Model</th>
                  <th className="px-4 py-2 border-b text-left">Date</th>
                  <th className="px-4 py-2 border-b text-left">Status</th>
                  <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {upcomingBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{booking.id}</td>
                    <td className="px-4 py-2">{booking.car}</td>
                    <td className="px-4 py-2">{booking.date}</td>
                    <td className="px-4 py-2">{booking.status}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(booking, "modify")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center"
                      >
                        <MdEdit className="mr-2" /> Modify
                      </button>
                      <button
                        onClick={() => handleOpenModal(booking, "cancel")}
                        className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 flex items-center"
                      >
                        <MdDelete className="mr-2" /> Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No upcoming bookings found.</p>
        )}
      </div>

      {/* Past Bookings Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Past Bookings
        </h2>
        {pastBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border border-gray-300 rounded-md">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="px-4 py-2 border-b text-left">ID</th>
                  <th className="px-4 py-2 border-b text-left">Car Model</th>
                  <th className="px-4 py-2 border-b text-left">Date</th>
                  <th className="px-4 py-2 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {pastBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{booking.id}</td>
                    <td className="px-4 py-2">{booking.car}</td>
                    <td className="px-4 py-2">{booking.date}</td>
                    <td className="px-4 py-2">{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No past bookings found.</p>
        )}
      </div>

      {/* Modal for Modify/Cancel Booking */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleCloseModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75"
                aria-hidden="true"
              />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                >
                  {actionType === "modify" ? (
                    <>
                      <MdEdit className="mr-2" /> Modify Booking
                    </>
                  ) : (
                    <>
                      <MdDelete className="mr-2" /> Confirm Cancellation
                    </>
                  )}
                </Dialog.Title>
                <div className="mt-2">
                  {actionType === "modify" ? (
                    <>
                      <p className="text-sm text-gray-500">
                        Modify the booking details for the selected booking.
                      </p>
                      {/* Modify booking form */}
                      {/* Add your form fields here */}
                      <button
                        type="button"
                        onClick={handleModifyBooking}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {loading ? (
                          <MdCheck className="animate-spin mr-2" />
                        ) : (
                          <MdCheck className="mr-2" />
                        )}{" "}
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">
                        Are you sure you want to cancel this booking? This
                        action cannot be undone.
                      </p>
                      <div className="flex gap-4 mt-4">
                        <button
                          type="button"
                          onClick={handleCancelBooking}
                          className="inline-flex items-center px-4 py-2 bg-red-600 text-white border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                          {loading ? (
                            <MdCancel className="animate-spin mr-2" />
                          ) : (
                            <MdCancel className="mr-2" />
                          )}{" "}
                          Yes, Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="inline-flex items-center px-4 py-2 bg-gray-500 text-white border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          <MdCancel className="mr-2" /> Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Confirm Cancellation Modal */}
      <Transition appear show={isConfirmModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleCloseConfirmModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75"
                aria-hidden="true"
              />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                >
                  <MdDelete className="mr-2" /> Confirm Cancellation
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to cancel this booking? This action
                    cannot be undone.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      onClick={handleCancelBooking}
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      {loading ? (
                        <MdCancel className="animate-spin mr-2" />
                      ) : (
                        <MdCancel className="mr-2" />
                      )}{" "}
                      Yes, Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseConfirmModal}
                      className="inline-flex items-center px-4 py-2 bg-gray-500 text-white border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <MdCancel className="mr-2" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default BookingManagement;
