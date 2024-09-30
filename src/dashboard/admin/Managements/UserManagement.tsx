/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { Button } from "../../../components/ui/UI/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/UI/table";
import {
  useGetAllUserQuery,
  useUpdateRoleMutation,
  useUpdateUserStatusMutation,
} from "../../../redux/features/user";
import { TUser } from "../../../types/userTypes";

const UserManagement = () => {
  const { data: userData } = useGetAllUserQuery(undefined);
  const [updateRole] = useUpdateRoleMutation();
  const [toggleUserStatus] = useUpdateUserStatusMutation(); // Mutation for toggling user status

  const handleRole = async (id: string, role: string) => {
    const newRole = role === "admin" ? "user" : "admin";
    const userInfo = { id, role: newRole };

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to change role to ${newRole}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change the role!",
    });

    if (result.isConfirmed) {
      try {
        const res = await updateRole(userInfo).unwrap();
        if (res?.success) {
          Swal.fire({
            title: "Changed!",
            text: res?.message,
            icon: "success",
          });
        } else {
          throw new Error(res?.message || "Failed to change role");
        }
      } catch (err: any) {
        Swal.fire({
          title: "Oops...",
          text: err?.data?.message || "Failed to change role",
          icon: "error",
        });
      }
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    const actionText = isActive ? "block" : "activate";
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${actionText} this user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionText} user!`,
    });

    if (result.isConfirmed) {
      try {
        const res = await toggleUserStatus({
          id,
          isActive: !isActive,
        }).unwrap();
        if (res?.success) {
          Swal.fire({
            title: "Success!",
            text: res?.message,
            icon: "success",
          });
        } else {
          throw new Error(res?.message || `Failed to ${actionText} user`);
        }
      } catch (err: any) {
        Swal.fire({
          title: "Oops...",
          text: err?.data?.message || `Failed to ${actionText} user`,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="lg:p-8 text-gray-900 dark:text-white max-w-screen-xl mx-auto my-8 px-3">
      {/* Display total users count */}
      <div className="mb-4 text-lg font-semibold">
        Total Users: {userData?.data?.length || 0}
      </div>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead> {/* Added Status Column */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData?.data?.map((user: TUser) => (
            <TableRow key={user?._id} className="text-center md:text-left">
              <TableCell className="text-sm min-w-[150px]">
                {user?.name}
              </TableCell>
              <TableCell className="text-sm min-w-[150px]">
                {user?.email}
              </TableCell>
              <TableCell className="text-sm min-w-[150px]">
                {user?.phone}
              </TableCell>
              <TableCell className="text-sm min-w-[150px]">
                {user?.role}
              </TableCell>
              <TableCell className="text-sm min-w-[150px]">
                {user?.isActive ? "Active" : "Blocked"}{" "}
                {/* Displaying user status */}
              </TableCell>
              <TableCell className="text-right flex flex-col sm:flex-row items-center justify-end gap-2">
                <Button
                  onClick={() => handleRole(user?._id, user?.role)}
                  variant="outline"
                  className="text-gray-500 hover:text-gray-600"
                >
                  Change to {user?.role === "admin" ? "user" : "admin"}
                </Button>
                <Button
                  onClick={() => handleToggleStatus(user?._id, user?.isActive)}
                  variant={user?.isActive ? "destructive" : "outline"} // Conditional styling
                  className="hover:bg-red-500"
                >
                  {user?.isActive ? "Block" : "Activate"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
