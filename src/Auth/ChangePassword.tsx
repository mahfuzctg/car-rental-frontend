/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/UI/button";
import { Input } from "../components/ui/UI/input";
import { Label } from "../components/ui/UI/label";
import { useResetPasswordMutation } from "../redux/features/auth/authApi";

type TResetFormType = {
  email: string;
  newPassword: string;
};

const ChangePassword = () => {
  const [searchParams] = useSearchParams();

  // Extract specific query parameters
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const [isLinkSent, setIsLinkSent] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetFormType>();

  const onSubmit: SubmitHandler<TResetFormType> = async (data) => {
    if (token) {
      const res = await resetPassword({
        email: data.email,
        id,
        token,
        newPassword: data.newPassword,
      });
      console.log(res);
      if (res?.data?.success) {
        setIsLinkSent(true);
        navigate("/sign-in");
      }
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto px-3 lg:px-0 min-h-screen flex items-center justify-center py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* email */}
        <div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Type Your Email Here:</Label>
            <Input
              className="md:w-80 focus-visible:ring-offset-0"
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
          </div>
          {errors?.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>
        {/* new Password */}
        <div>
          <div className="grid w-full items-center gap-1.5 mt-4">
            <Label htmlFor="newPassword">Type Your New Password Here:</Label>
            <Input
              className="md:w-80 focus-visible:ring-offset-0"
              type="text"
              id="newPassword"
              {...register("newPassword", { required: true })}
            />
          </div>
          {errors?.newPassword && (
            <p className="text-red-500 text-sm">New Password is required</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 mt-6"
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </section>
  );
};

export default ChangePassword;
