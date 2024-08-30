/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/UI/button";
import { Input } from "../components/ui/UI/input";
import { Label } from "../components/ui/UI/label";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks/hook";
import { verifyToken } from "../utils/token";

type Inputs = {
  email: string;
  password: string;
};

type ApiError = {
  message: string;
};

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastId = toast.loading("Signing in...");
    setIsLoading(true);

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const { __v, updatedAt, createdAt, ...userData } = res.data;

      const user = verifyToken(res.token) as TUser;

      if (user) {
        dispatch(setUser({ user: userData, token: res.token }));
        toast.success("Logged in successfully", {
          id: toastId,
          duration: 2000,
        });

        // Navigate based on user role
        switch (user?.role) {
          case "admin":
            navigate("/admin/dashboard", { replace: true });
            break;
          case "user":
            navigate("/user/dashboard", { replace: true });
            break;
          default:
            navigate("/", { replace: true }); // Redirect to default or home if role is unknown
            break;
        }
      } else {
        toast.error("Invalid credentials", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      const error = err as { data?: ApiError };
      toast.error(error?.data?.message || "An unknown error occurred", {
        action: (
          <Button
            onClick={() => navigate("/password-recovery")}
            className="text-orange-500"
          >
            Recover the password
          </Button>
        ),
        id: toastId,
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center py-12">
      <div className="rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl text-gray-700 md:text-2xl font-bold text-center mb-6 uppercase">
          Sign In Now!
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="email" className="block text-gray-700">
              Email:
            </Label>
            <Input
              className="mt-1 p-3 border border-gray-300 rounded-md w-full"
              type="email"
              id="email"
              placeholder="Enter your email address"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email && (
              <p className="text-red-600 text-sm mt-1">
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
                className="mt-1 p-3 border border-gray-300 rounded-md w-full"
                type={isShowPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              <span
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {isShowPassword ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
            {errors?.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Link to="/forget-password" className="text-red-500 hover:underline">
            Forgot Password?
          </Link>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-red-600 font-semibold">
                Sign Up Free!
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              Read our{" "}
              <Link to="/privacy-policy" className="text-red-600">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms-and-condition" className="text-red-600">
                Terms of Service
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
