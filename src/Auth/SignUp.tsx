/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-binary-expression */
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/UI/button";
import { Input } from "../components/ui/UI/input";
import { Label } from "../components/ui/UI/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/UI/select";
import { useSignUpMutation } from "../redux/features/auth/authApi";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  role: string;
  terms?: boolean;
};

type ErrorResponseData = {
  message: string;
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
      address: data.address,
      role: data.role,
    };

    try {
      const res = await signUp(userData);
      if (res?.data?.success) {
        toast.success("Registered Successfully!");
        navigate("/sign-in");
      } else if (res?.error) {
        if (res.error && "data" in res.error) {
          const errorData = res.error.data as ErrorResponseData;
          toast.error(errorData.message || "An error occurred");
        } else {
          toast.error("An error occurred");
        }
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    }
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center py-4">
      <div className="rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl uppercase text-gray-700 font-bold text-center mb-4">
          Sign Up now!
          <div className="w-16 h-1 bg-red-600 mt-1 mx-auto"></div>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-gray-700">
              Name:
            </Label>
            <Input
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              type="text"
              id="name"
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required" })}
            />
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="block text-gray-700">
              Email:
            </Label>
            <Input
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              type="email"
              id="email"
              placeholder="Enter your email address"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="block text-gray-700">
              Password:
            </Label>
            <div className="relative">
              <Input
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                type={isShowPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
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
              <span
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {isShowPassword ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password:
            </Label>
            <div className="relative">
              <Input
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                type={isConfirmShowPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
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
              <span
                onClick={() => setIsConfirmShowPassword(!isConfirmShowPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {isConfirmShowPassword ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
            {errors?.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="phone" className="block text-gray-700">
              Phone:
            </Label>
            <Input
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors?.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="address" className="block text-gray-700">
              Address:
            </Label>
            <Input
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              type="text"
              id="address"
              placeholder="Enter your address"
              {...register("address", { required: "Address is required" })}
            />
            {errors?.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="role" className="block text-gray-700">
              Role:
            </Label>
            <Controller
              control={control}
              name="role"
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <div className="mt-1 border border-gray-300 rounded-md w-full">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            {errors?.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          {/* Conditional Terms Checkbox */}
          {true && ( // Replace with actual condition if applicable
            <div>
              <div className="flex items-center mt-4">
                <input
                  id="terms"
                  type="checkbox"
                  {...register("terms", {
                    required: "You must accept the terms and conditions",
                  })}
                  className="mr-2"
                />
                <Label htmlFor="terms" className="text-gray-700">
                  I agree to the
                  <Link to="/terms" className="text-red-600 ml-1">
                    Terms and Conditions
                  </Link>
                </Label>
              </div>
              {errors?.terms && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.terms.message}
                </p>
              )}
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-red-600 text-white hover:bg-red-700 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-gray-700 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-red-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
