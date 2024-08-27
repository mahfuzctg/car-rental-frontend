import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Define the type for form values
interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  terms: boolean;
}

const SignUp = () => {
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
    phoneNumber: Yup.string().optional(),
    terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
  });

  // Handle Form Submission
  const handleSubmit = (values: SignUpFormValues) => {
    // Handle form submission (e.g., call an API to create a new user)
    console.log(values);
    // Redirect to login page after successful registration
    navigate("/sign-in");
  };

  return (
    <div className="container w-full md:w-7/12 mx-auto px-4 py-8 shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          terms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="mt-1 py-2 block w-full border-none rounded-md shadow-sm px-2  sm:text-sm"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

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
                className="mt-1 py-2 block w-full border-none rounded-md shadow-sm px-2 sm:text-sm"
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
                className="mt-1 py-2 px-2 block w-full border-none rounded-md shadow-sm  sm:text-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm mt-1 "
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="mt-1 py-2 px-2 block w-full border-none rounded-md shadow-sm  sm:text-sm"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number (optional)
              </label>
              <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                className="mt-1 py-2 px-2 block w-full border-none rounded-md shadow-sm  sm:text-sm"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center mt-2">
              <Field
                type="checkbox"
                id="terms"
                name="terms"
                className="h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the{" "}
                <Link to="/terms" className="text-green-600 hover:underline">
                  Terms & Conditions
                </Link>
              </label>
              <ErrorMessage
                name="terms"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Sign Up Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Sign In Instead Link */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-green-600 hover:underline">
            Sign In instead
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
  );
};

export default SignUp;
