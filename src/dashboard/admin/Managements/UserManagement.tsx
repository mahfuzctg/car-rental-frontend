/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Edit, Users, XCircle } from "react-feather";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user";

const userRoleOptions = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

const userStatusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

const UserManagement = () => {
  const {
    data: userResponse = {},
    isLoading,
    isError,
    error,
  } = useGetAllUsersQuery({});
  const users: User[] = Array.isArray(userResponse.data)
    ? userResponse.data
    : [];
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [isUserUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo) {
      setRole(userInfo.role);
      setStatus(userInfo.status);
    }
  }, [userInfo]);

  const handleUserUpdate = async () => {
    setUpdateError(null);
    setUpdateSuccess(null);

    if (!role || !status) {
      setUpdateError("Please select both role and status.");
      return;
    }

    if (userInfo) {
      try {
        await updateUser({ id: userInfo._id, data: { role, status } }).unwrap();
        setUserUpdateModalOpen(false);
        setUpdateSuccess("User updated successfully.");
        toast.success("User updated successfully."); // Show success toast
      } catch (error: any) {
        const status = error?.status || 500;
        if (status === 404) {
          setUpdateError("User not found. Please check the user ID.");
        } else if (status === 400) {
          setUpdateError("Bad request. Please check the data you are sending.");
        } else {
          setUpdateError("Failed to update user. Please try again later.");
        }
        toast.error(updateError); // Show error toast
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
      </div>
    );
  }

  if (isError) {
    console.error("Error loading users:", error);
    return (
      <div className="text-center p-8">
        <p className="text-red-600">
          Error loading users. Please try again later.
        </p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No users available or unexpected data format.
      </p>
    );
  }

  return (
    <>
      <div className="p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-gray-700 md:text-3xl font-bold uppercase">
            User Management
          </h2>
          <div className="flex items-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-full">
            <Users className="w-5 h-5" />
            <span className="font-semibold">{users.length} Users</span>
          </div>
        </div>
        <p className="text-gray-600 mb-8 text-center">
          Manage customer and admin accounts. You can edit user roles and
          statuses.
        </p>

        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="text-gray-700">
              <tr>
                {["Name", "Email", "Phone", "Role", "Status", "Actions"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left border-b-2 border-gray-300"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {user.status}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button
                      onClick={() => {
                        setUserInfo(user);
                        setUserUpdateModalOpen(true);
                      }}
                      className="text-red-600 hover:text-red-700 focus:outline-none"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isUserUpdateModalOpen && userInfo && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Update User
              </h2>
              <button
                onClick={() => setUserUpdateModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            {updateError && (
              <div className="mb-4 text-red-600">{updateError}</div>
            )}
            {updateSuccess && (
              <div className="mb-4 text-green-600">{updateSuccess}</div>
            )}
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              >
                {userRoleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              >
                {userStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleUserUpdate}
              className="w-full py-2 bg-red-600 text-white rounded"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <ClipLoader size={20} color={"#ffffff"} loading={isUpdating} />
              ) : (
                "Update User"
              )}
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default UserManagement;
