/* eslint-disable @typescript-eslint/no-unused-vars */
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/UI/button";
import { Input } from "../components/ui/UI/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/UI/select";
import { useSignUpMutation } from "./AuthApi";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
  terms: boolean;
};

const SignUp = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isConfirmShowPassword, setIsConfirmShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Password and Confirm Password do not match");
    }

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
    };

    try {
      const res = await signUp(userData);

      // Type assertions and guards
      if ("data" in res) {
        // Handle successful response
        if (res.data.success) {
          toast.success("Registered Successfully!");
          navigate("/login");
        } else {
          toast.error(res.data.message || "An unexpected error occurred");
        }
      } else if ("error" in res) {
        // Handle error response
        if (res.error && "data" in res.error) {
          const errorMessage =
            (res.error as { data: { message?: string } }).data?.message ||
            "An unexpected error occurred";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <section className="bg-[#ffffff] shadow-md w-full md:w-7/12 mx-auto text-gray-700 min-h-screen flex items-center justify-center my-14">
      <div className="rounded-xl shadow-custom-light shadow-gray-600 p-6 md:py-8">
        <div className="max-w-8 mx-auto flex items-center justify-center mb-6"></div>
        <h2 className="text-gray-700 text-2xl font-semibold text-center mb-8">
          Create a new account!
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-[370px]"
        >
          <div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name:</Label>
              <Input
                className="md:w-80 focus-visible:ring-offset-0"
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
            </div>
            {errors?.name && (
              <p className="text-red-600 text-sm">Name is required</p>
            )}
          </div>
          <div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email:</Label>
              <Input
                className="md:w-80 focus-visible:ring-offset-0"
                type="email"
                id="email"
                {...register("email", { required: true })}
              />
            </div>
            {errors?.email && (
              <p className="text-red-600 text-sm">Email is required</p>
            )}
          </div>

          <div>
            <div className="grid w-full items-center gap-1.5 relative">
              <Label htmlFor="password">Password:</Label>
              <Input
                className="md:w-80 focus-visible:ring-offset-0"
                type={`${isShowPassword ? "text" : "password"}`}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be more than 6 characters",
                  },
                  maxLength: {
                    value: 16,
                    message: "Password must be less than 16 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).{6,16}$/,
                    message:
                      "Password must contain at least one uppercase letter and one number",
                  },
                })}
              />
              <p
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-2 top-[67%] -translate-y-1/2 text-gray-100 cursor-pointer p-1 "
              >
                {isShowPassword ? <IoEye /> : <IoEyeOff />}
              </p>
            </div>
            {errors?.password && (
              <p className="text-red-600 text-sm max-w-[300px]">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <div className="grid w-full items-center gap-1.5 relative">
              <Label htmlFor="confirmPassword">Confirm Password:</Label>
              <Input
                className="md:w-80 focus-visible:ring-offset-0"
                type={`${isConfirmShowPassword ? "text" : "password"}`}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be more than 6 characters",
                  },
                  maxLength: {
                    value: 16,
                    message: "Password must be less than 16 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).{6,16}$/,
                    message:
                      "Password must contain at least one uppercase letter and one number",
                  },
                })}
              />
              <p
                onClick={() => setIsConfirmShowPassword(!isConfirmShowPassword)}
                className="absolute right-2 top-[67%] -translate-y-1/2 text-gray-100 cursor-pointer p-1 "
              >
                {isConfirmShowPassword ? <IoEye /> : <IoEyeOff />}
              </p>
            </div>
            {errors?.confirmPassword && (
              <p className="text-red-600 text-sm max-w-[300px]">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">Phone:</Label>
              <Input
                className="md:w-80 focus-visible:ring-offset-0"
                type="phone"
                id="phone"
                {...register("phone", { required: true })}
              />
            </div>
            {errors?.phone && (
              <p className="text-red-600 text-sm">Phone is required</p>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="role">Role:</Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="md:w-80 focus-visible:ring-offset-0">
                    <SelectValue placeholder="Select a Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <input
                id="terms"
                className="w-4 h-4 rounded focus:ring-0"
                type="checkbox"
                required
                {...register("terms", { required: true })}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept{" "}
                <Link
                  to="/terms-and-condition"
                  className="text-orange-600 font-semibold"
                >
                  Terms & Conditions
                </Link>
              </label>
            </div>
            {errors?.terms && (
              <p className="text-red-600 text-sm">You must accept the terms</p>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full mt-4 py-4"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
