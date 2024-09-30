import { Loader } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user";

type TEditUserInitialValues = {
  name: string;
  phone: string;
  address: string;
};

const UserOverview = () => {
  const currentUser = useSelector(selectCurrentUser);
  const userEmail = currentUser?.email; // Get the user's email

  const { data, isLoading, error } = useGetAllUserQuery(userEmail); // Fetch user info by email
  const userInfo = data?.data;
  const [updateUser] = useUpdateUserMutation();

  // Modal state for editing user
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);

  // Initial form values for the user
  const userProfileInitialValues: TEditUserInitialValues = {
    name: userInfo?.name || "",
    phone: userInfo?.phone || "",
    address: userInfo?.address || "",
  };

  // Form values state
  const [formValues, setFormValues] = useState(userProfileInitialValues);

  // Form submission handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setEditUserModalOpen(false); // Close modal
    const toastId = toast.loading("User updating");
    if (userInfo) {
      try {
        const response = await updateUser({
          userData: formValues,
          id: userInfo._id,
        }).unwrap();
        toast.success(response.message, { id: toastId, duration: 2000 });
      } catch (error) {
        const err = error as TErrorResponse;
        toast.error(err?.data?.errorMessages[0].message, {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error || !userInfo) {
    return <p>Error loading user info or user not found.</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">User Overview</h2>
      <div className="flex justify-center w-full">
        <div className="mt-6 relative grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-[50%] lg:p-10 p-5 bg-primary-foreground/5 rounded-md w-full">
          {/* Edit button */}
          <button
            onClick={() => setEditUserModalOpen(true)}
            className="absolute top-1 right-2 flex items-center gap-x-2"
          >
            Edit profile
          </button>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">Name</h2>
            <p className="text-gray-500">{userInfo?.name}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">Email</h2>
            <p className="text-gray-500">{userInfo?.email}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">Phone</h2>
            <p className="text-gray-500">{userInfo?.phone}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">Address</h2>
            <p className="text-gray-500">{userInfo?.address}</p>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {isEditUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Edit User Information
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="form-submit-btn">
                  Submit
                </button>
                <button
                  type="button"
                  className="ml-2 text-gray-500"
                  onClick={() => setEditUserModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOverview;
