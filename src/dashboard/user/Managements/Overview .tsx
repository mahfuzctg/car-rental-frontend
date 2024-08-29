import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";
import {
  useGetUserInfoQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user";
import { TErrorResponse } from "../../../types";

type TEditUserInitialValues = {
  name: string;
  phone: string;
  address: string;
};

const Profile = () => {
  const { data, isLoading, error } = useGetUserInfoQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  // modal
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<TEditUserInitialValues>({
    name: data?.data?.name || "",
    phone: data?.data?.phone || "",
    address: data?.data?.address || "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditUserModalOpen(false);
    const toastId = toast.loading("User updating");
    try {
      const response = await updateUser({
        userData: formValues,
        id: data?.data._id,
      }).unwrap();
      toast.success(response.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log(error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.errorMessages[0].message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-gray-600">Overview and manage your information</p>
        <div className="flex justify-center w-full">
          <div className="mt-6 relative grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-[50%] lg:p-10 p-5 bg-gray-100 rounded-md w-full">
            <button
              onClick={() => setEditUserModalOpen(true)}
              className="absolute top-1 right-2 flex items-center gap-x-2"
            >
              <FaEdit /> Edit profile
            </button>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Name</h2>
              <p className="text-gray-500">{data?.data?.name}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Email</h2>
              <p className="text-gray-500">{data?.data?.email}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Phone</h2>
              <p className="text-gray-500">{data?.data?.phone}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Role</h2>
              <p
                className={`text-gray-500 ${
                  data?.data?.role === "admin"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {data?.data?.role.charAt(0).toUpperCase() +
                  data?.data?.role.slice(1)}
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Address</h2>
              <p className="text-gray-500">{data?.data?.address}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Member Since
              </h2>
              <p className="text-gray-500">
                {new Date(data?.data?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Last Updated
              </h2>
              <p className="text-gray-500">
                {new Date(data?.data?.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {isEditUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <button
              onClick={() => setEditUserModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={formValues.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="form-input mt-1 block w-full"
                  value={formValues.address}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
