import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Define the type for form values
interface SignInFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle Form Submission
  const handleSubmit = (values: SignInFormValues) => {
    // Handle form submission (e.g., call an API to authenticate the user)
    console.log(values);
    // Redirect to dashboard after successful login
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full lg:w-7/12 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full border-none rounded-md shadow-sm focus:ring-green-500 focus:ring-2 sm:text-sm p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full border-none rounded-md shadow-sm focus:ring-green-500 focus:ring-2 sm:text-sm p-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Forgot Password Link */}
        <div className="mt-4">
          <Link
            to="/forgot-password"
            className="text-green-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign Up Instead Link */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            New user?{" "}
            <Link to="/sign-up" className="text-green-600 hover:underline">
              Sign Up instead
            </Link>
          </p>
        </div>

        {/* Footer Links */}
        <footer className="mt-8">
          <hr className="border-gray-300 my-4" />
          <div className="flex justify-between text-gray-600 text-sm mt-4">
            <Link to="/privacy-policy" className="hover:text-green-600">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-green-600">
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SignIn;
