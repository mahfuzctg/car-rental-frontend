/* eslint-disable @typescript-eslint/no-unused-vars */

import { Link } from "react-router-dom";
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
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateRoleMutation,
} from "../../../redux/features/user/userApi";
import { TUser } from "../../../types/userTypes";

const UserManagement = () => {
  const { data: userData } = useGetAllUserQuery(undefined);

  const [updateRole] = useUpdateRoleMutation();

  const [deleteUser] = useDeleteUserMutation();

  const handleRole = (id: string, role: string) => {
    let newRole;

    if (role === "admin") {
      newRole = "user";
    } else {
      newRole = "admin";
    }

    const userInfo = {
      id,
      role: newRole,
    };

    console.log(role);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change the role!",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const res = await updateRole(userInfo).unwrap();
          console.log(res);
          if (res?.success) {
            Swal.fire({
              title: "Changed!",
              text: res?.message,
              icon: "success",
            });
          }
        } catch (err) {
          Swal.fire({
            text: "Failed to change role",
            icon: "error",
            title: "Oops...",
          });
        }
      }
    });
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteUser(id).unwrap();
          if (res?.success) {
            Swal.fire({
              title: "Deleted!",
              text: res?.message,
              icon: "success",
            });
          }
        } catch (err) {
          Swal.fire({
            text: err?.message,
            icon: "error",
            title: "Oops...",
          });
        }
      }
    });
  };

  return (
    <div className="lg:p-8 text-white max-w-screen-xl mx-auto my-8 px-3">
      <Link to="/sign-up">
        <Button className="bg-orange-500 hover:bg-orange-600">
          Add A New User
        </Button>
      </Link>
      <Table className="p-12 min-w-[700px] md:w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData?.data?.map((user: TUser) => (
            <TableRow key={user?._id}>
              <TableCell className="text-sm min-w-[200px]">
                {user?.name}
              </TableCell>
              <TableCell className="text-sm">{user?.email}</TableCell>
              <TableCell className="text-sm">{user?.phone}</TableCell>

              <TableCell className="text-right  flex items-center gap-2 ">
                <Button
                  onClick={() => handleRole(user?._id, user?.role)}
                  variant="outline"
                  className="text-orange-500 hover:text-orange-600"
                >
                  Change to {user?.role === "admin" ? "user" : "admin"}
                </Button>
                <Button
                  onClick={() => handleDelete(user?._id)}
                  variant={"destructive"}
                  className="hover:bg-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
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
