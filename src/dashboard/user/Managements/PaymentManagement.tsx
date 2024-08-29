/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { MdCheck, MdClose, MdPayment } from "react-icons/md";

interface ReturnedBooking {
  id: number;
  car: string;
  returnDate: string;
  amountDue: number;
}

const PaymentManagement: React.FC = () => {
  const [returnedBookings, setReturnedBookings] = useState<ReturnedBooking[]>(
    []
  );
  const [selectedBooking, setSelectedBooking] =
    useState<ReturnedBooking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReturnedBookings = async () => {
      try {
        const response = await fetch(
          "https://assignment3-phi-fawn.vercel.app/returned-bookings"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch returned bookings");
        }
        const data = await response.json();
        setReturnedBookings(data);
      } catch (error) {
        console.error("Error fetching returned bookings:", error);
        setError("Failed to load returned bookings.");
      }
    };

    fetchReturnedBookings();
  }, []);

  const handleOpenModal = (booking: ReturnedBooking) => {
    setSelectedBooking(booking);
    setPaymentAmount(booking.amountDue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setPaymentAmount("");
    setSuccessMessage(null);
    setError(null);
  };

  const handlePayment = async () => {
    if (selectedBooking && typeof paymentAmount === "number") {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        const response = await fetch(
          `https://assignment3-phi-fawn.vercel.app/payments/${selectedBooking.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: paymentAmount }),
          }
        );

        if (!response.ok) {
          throw new Error("Payment failed");
        }

        const result = await response.json();
        setSuccessMessage("Payment successful!");
        setReturnedBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== selectedBooking.id)
        );
      } catch (error) {
        console.error("Error processing payment:", error);
        setError("Payment failed.");
      } finally {
        setLoading(false);
        handleCloseModal();
      }
    }
  };

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
        Payment Management
        <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
      </h2>
      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Returned Bookings
        </h2>
        {returnedBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border border-gray-300 rounded-md">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="px-4 py-2 border-b text-left">ID</th>
                  <th className="px-4 py-2 border-b text-left">Car Model</th>
                  <th className="px-4 py-2 border-b text-left">Return Date</th>
                  <th className="px-4 py-2 border-b text-left">Amount Due</th>
                  <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {returnedBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{booking.id}</td>
                    <td className="px-4 py-2">{booking.car}</td>
                    <td className="px-4 py-2">{booking.returnDate}</td>
                    <td className="px-4 py-2">
                      ${booking.amountDue.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleOpenModal(booking)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 flex items-center"
                      >
                        <MdPayment className="mr-2" /> Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">
            No returned bookings available for payment.
          </p>
        )}
      </div>

      {/* Payment Modal */}
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
                  <MdPayment className="mr-2" /> Payment
                </Dialog.Title>
                <div className="mt-2">
                  {selectedBooking && (
                    <>
                      <p className="text-sm text-gray-500">
                        You are about to pay for the booking with ID{" "}
                        {selectedBooking.id}.
                      </p>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Amount Due
                        </label>
                        <input
                          type="text"
                          value={`$${
                            typeof paymentAmount === "number"
                              ? paymentAmount.toFixed(2)
                              : "0.00"
                          }`}
                          readOnly
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-900"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Payment Amount
                        </label>
                        <input
                          type="number"
                          value={
                            typeof paymentAmount === "number"
                              ? paymentAmount
                              : ""
                          }
                          onChange={(e) =>
                            setPaymentAmount(Number(e.target.value))
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                      </div>
                      <div className="flex gap-4 mt-6">
                        <button
                          type="button"
                          onClick={handlePayment}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          {loading ? (
                            <MdCheck className="animate-spin mr-2" />
                          ) : (
                            <MdCheck className="mr-2" />
                          )}{" "}
                          Submit Payment
                        </button>
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="inline-flex items-center px-4 py-2 bg-gray-500 text-white border border-transparent rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          <MdClose className="mr-2" /> Close
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
    </div>
  );
};

export default PaymentManagement;
