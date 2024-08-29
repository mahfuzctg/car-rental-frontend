import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks/hook";
import { TErrorResponse } from "../types";
import { verifyToken } from "../utils/token";

type TInitialValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [values, setValues] = useState<TInitialValues>({
    email: "",
    password: "",
  });
  const [userInfo] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in");
    try {
      const response = await userInfo(values).unwrap();
      const user = verifyToken(response.token) as TUser;
      user.name = response.data.name;
      dispatch(setUser({ user: user, token: response.token }));

      toast.success("Logged in", { id: toastId, duration: 2000 });

      // Redirect based on user role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("error:", error);
      const err = error as TErrorResponse;
      toast.error(err.data.errorMessages[0].message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-gray-200 to-red-500">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl uppercase text-gray-700 font-bold text-center mb-4">
          Sign-in now!
          <div className="w-16 h-1 bg-red-600 mt-1 mx-auto"></div>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Sign In
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-red-600 font-semibold hover:underline"
            >
              Sign Up!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
