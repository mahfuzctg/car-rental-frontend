import { useState } from "react";

import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks/hook";
import UpdateBookingModal from "./UpdateBookingModal";

export type TBookingTableProps = {
  _id?: string;
  name?: string;
  startTime: string;
  endTime: string;
  totalCost: number;
  image: string[];
  date?: Date | undefined;
  status?: string;
};

const BookingTable = ({
  _id,
  name,
  startTime,
  endTime,
  totalCost,
  image,
  date,
  status,
}: TBookingTableProps) => {
  const user = useAppSelector(selectCurrentUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "No Date Provided";
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString()
      : "Invalid Date";
  };

  const openModal = (id: string) => {
    setCurrentBookingId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentBookingId(null);
  };

  return (
    <>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                {Array.isArray(image) && image.length > 0 ? (
                  image.map((img, index) =>
                    img !== "No Image" ? (
                      <img
                        key={index}
                        src={img}
                        alt={`Avatar ${index}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        key={index}
                        className="w-full h-full bg-gray-200 flex items-center justify-center"
                      >
                        No Image
                      </div>
                    )
                  )
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
            </div>
          </div>
        </td>
        <td>
          {startTime}
          <br />
          <span className="badge badge-ghost badge-sm">{formatDate(date)}</span>
        </td>
        <td>{endTime}</td>
        <td>{totalCost}</td>
        <th className="flex justify-between items-center space-x-2">
          {user?.userRole === "admin" ? (
            <button
              className="badge badge-secondary badge-outline"
              onClick={() => openModal(_id || "")}
            >
              {status}
            </button>
          ) : (
            <Link
              to={`/${user?.userRole}-dashboard/checkout/${_id}`}
              className="badge badge-secondary badge-outline"
            >
              {status}
            </Link>
          )}

          {/* {status === "approved" ? (
            user?.userRole === "admin" ? (
              <button
                disabled
                className="badge badge-neutral badge-outline text-white"
              >
                processing
              </button>
            ) : (
              <Link
                to={`/user-dashboard/checkout/${_id}`}
                className="btn btn-sm text-white bg-purple-500 hover:bg-purple-800"
              >
                Checkout
              </Link>
            )
          ) : (
            <>
               {status === "pending" ? (
                user?.userRole === "user" ? (
                  <>
                    <button className="badge badge-secondary badge-outline">
                      {status || "approved"}
                    </button>
                    <button className="badge badge-error gap-2 text-white">
                      cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="badge badge-secondary badge-outline"
                    onClick={() => openModal(_id || "")}
                  >
                    {status || "approved"}
                  </button>
                )
              ) : (
                <p>Please booked your car</p>
              )} 
              <button
                className="badge badge-secondary badge-outline"
                onClick={() => openModal(_id || "")}
              >
                {status || "approved"}
              </button>
              <button className="badge badge-error gap-2 text-white">
                cancel
              </button>
            </>
          )} */}
        </th>
      </tr>

      {/* Conditionally render the modal */}
      {modalOpen && currentBookingId && (
        <UpdateBookingModal bookingId={currentBookingId} onClose={closeModal} />
      )}
    </>
  );
};

export default BookingTable;
