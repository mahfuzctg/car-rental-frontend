import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/ui/UI/button";
import { Input } from "../components/ui/UI/input";
import { Label } from "../components/ui/UI/label";
import { useForgetPasswordMutation } from "../redux/features/auth/authApi";

const ForgetPassword = () => {
  const [isLinkSent, setIsLinkSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const [forgetPassword, { isLoading, isError, error }] =
    useForgetPasswordMutation();

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    try {
      const res = await forgetPassword(data);

      if (res?.data?.success) {
        setIsLinkSent(true);
      } else {
        // Handle non-successful responses here
        console.error("Error:", res?.data?.message);
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto px-3 lg:px-0 min-h-screen flex items-center justify-center py-8">
      {isLinkSent ? (
        <h1 className="text-xl text-gray-100">
          Check your email for the password reset link.
        </h1>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* email */}
          <div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Type Your Email Here:</Label>
              <Input
                placeholder="Email"
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
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 mt-6"
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
          {isError && (
            <p className="text-red-500 text-sm">
              {error?.message || "An error occurred. Please try again."}
            </p>
          )}
        </form>
      )}
    </section>
  );
};

export default ForgetPassword;
