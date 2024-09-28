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
import { useState } from "react";

const UserManagement = () => {
  const { data: userData, refetch } = useGetAllUserQuery(undefined);
  const [updateRole] = useUpdateRoleMutation();
  const [toggleUserStatus] = useUpdateUserStatusMutation();

  // State to hold updated user list
  const [users, setUsers] = useState(userData?.data || []);

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
          // Update users state immediately
          setUsers((prevUsers: any[]) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, role: newRole } : user
            )
          );
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
          // Update users state immediately
          setUsers((prevUsers: any[]) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, isActive: !isActive } : user
            )
          );
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

  const userRole = "admin"; // Replace with actual role retrieval logic

  return (
    <div className="lg:p-8 text-gray-900 dark:text-white max-w-screen-xl mx-auto my-8 px-3">
      <div className="mb-4 text-lg font-semibold">
        Total Users: {users.length || 0}
      </div>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: TUser) => (
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
                {user?.isActive ? "Active" : "Blocked"}
              </TableCell>
              <TableCell className="text-right flex flex-col sm:flex-row items-center justify-end gap-2">
                {userRole === "admin" && (
                  <>
                    <Button
                      onClick={() => handleRole(user?._id, user?.role)}
                      variant="outline"
                      className="text-gray-500 hover:text-gray-600 w-full sm:w-auto"
                    >
                      Make {user?.role === "admin" ? "User" : "Admin"}
                    </Button>
                    <Button
                      onClick={() => handleToggleStatus(user?._id, user?.isActive)}
                      variant={user?.isActive ? "destructive" : "outline"}
                      className="hover:bg-red-500 w-full sm:w-auto"
                    >
                      {user?.isActive ? "Block" : "Activate"}
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
