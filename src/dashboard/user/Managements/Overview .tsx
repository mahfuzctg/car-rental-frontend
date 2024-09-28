import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user";
import { TErrorResponse } from "../../../types/errorTypes";

type TEditUserInitialValues = {
  name: string;
  phone: string;
  address: string;
};

// Define a type for the update user response without message
interface TUpdateUserResponse {
  // Remove message property
}

const UserOverview = () => {
  const currentUser = useSelector(selectCurrentUser);
  const userEmail = currentUser?.email;

  const { data, isLoading, error, refetch } = useGetUserByEmailQuery(userEmail, {
    skip: !userEmail,
  });

  const userInfo = data?.data;
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formValues, setFormValues] = useState<TEditUserInitialValues>({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormValues({
        name: userInfo.name || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
      });
    }
  }, [userInfo]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Updating user...");

    try {
      const response = await updateUser({
        userInfo: formValues,
        id: userInfo._id,
      }).unwrap() as TUpdateUserResponse;

      toast.success("User updated successfully!", { id: toastId, duration: 2000 });
      await refetch();
    } catch (error) {
      const err = error as TErrorResponse;

      const errorMessage =
        err.status === 401
          ? "Unauthorized access. Please log in."
          : err.data && Array.isArray(err.data.errorMessages) && err.data.errorMessages.length > 0
          ? err.data.errorMessages[0].message
          : "Error updating user.";
      toast.error(errorMessage, { id: toastId, duration: 2000 });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <Loader />
      </div>
    );
  }

  if (error) {
    console.log("Error fetching user data:", error);
    
    // Make sure to assert that error is of type TErrorResponse
    const err = error as TErrorResponse;

    const errorMessage =
      err.status === 401
        ? "Unauthorized access. Please log in."
        : err.data && typeof err.data.message === "string"
        ? err.data.message
        : "User not found.";

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <p>Error loading user info: {errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="user-overview w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-red-600">User Overview</h1>
        {userInfo && (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-red-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-red-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">Address:</label>
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-red-200"
                required
              />
            </div>
            <button
              type="submit"
              className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserOverview;
