/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignUp = () => {
  const navigate = useNavigate();

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

  const handleSubmit = (values: any) => {
    // Handle form submission
    console.log(values);
    // Redirect to login page after successful registration
    navigate("/sign-in");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div className="flex items-center">
              <Field
                type="checkbox"
                id="terms"
                name="terms"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
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
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
              >
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-green-600 hover:underline">
            Sign In instead
          </Link>
        </p>
      </div>

      <footer className="mt-8">
        <div className="flex justify-between text-gray-600 text-sm">
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
