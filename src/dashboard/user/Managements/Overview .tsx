import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user";
import { TErrorResponse } from "../../../types";

type TEditUserInitialValues = {
  name: string;
  phone: string;
  address: string;
};

const Profile = () => {
  const { data, isLoading, error } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  // modal state
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [formValues, setFormValues] = useState<TEditUserInitialValues>({
    name: data?.data?.name || "",
    phone: data?.data?.phone || "",
    address: data?.data?.address || "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditUserModalOpen(false);
    const toastId = toast.loading("Updating profile...");
    try {
      const response = await updateUser({
        userData: formValues,
        id: data?.data?._id,
      }).unwrap();
      toast.success(response.message, {
        id: toastId,
        duration: 2000,
        icon: "✅",
      });
    } catch (error) {
      const err = error as TErrorResponse;
      toast.error(err?.data?.errorMessages[0]?.message, {
        id: toastId,
        duration: 2000,
        icon: "❌",
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

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          Meet our team
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <p className="text-gray-500 mb-8">
          No user data found. Please try again later.
        </p>
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Name", value: "N/A" },
              { label: "Email", value: "N/A" },
              { label: "Phone", value: "N/A" },
              { label: "Role", value: "N/A" },
              { label: "Address", value: "N/A" },
              { label: "Member Since", value: "N/A" },
              { label: "Last Updated", value: "N/A" },
            ].map(({ label, value }) => (
              <div key={label}>
                <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
                <p className="text-gray-500">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          Meet our team
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <p className="text-gray-500 mb-8">
          Overview and manage your information
        </p>
        <div className="bg-white shadow-md rounded-md p-6 relative">
          <button
            onClick={() => setEditUserModalOpen(true)}
            className="absolute top-4 right-4 flex items-center gap-2 text-red-600 hover:text-red-700 transition duration-150"
          >
            <FaEdit /> Edit Profile
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Name", value: data?.data?.name },
              { label: "Email", value: data?.data?.email },
              { label: "Phone", value: data?.data?.phone },
              { label: "Role", value: data?.data?.role },
              { label: "Address", value: data?.data?.address },
              {
                label: "Member Since",
                value: new Date(data?.data?.createdAt).toLocaleDateString(),
              },
              {
                label: "Last Updated",
                value: new Date(data?.data?.updatedAt).toLocaleDateString(),
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
                <p className="text-gray-500">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative transform transition-all duration-300 scale-100">
            <button
              onClick={() => setEditUserModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-150"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
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
                  className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-red-600 focus:ring-red-700"
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
                  className="form-input mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                  value={formValues.address}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="bg-reed-600 text-white px-4 py-2 rounded-md w-full bg-red-600 hover:bg-red-700 transition duration-150"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
