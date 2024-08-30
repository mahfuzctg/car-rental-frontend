import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
  FaCcVisa,
} from "react-icons/fa";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/UI/button";
import { Input } from "../components/ui/UI/input";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 w-full md:w-[80%] md:ml-[20%]">
      <div className="mt-20 w-full px-4 md:px-8 lg:px-16">
        <div className="h-full pt-8">
          <div className="w-full border-t border-red-500 pt-6 lg:pt-8">
            {/* Footer Top */}
            <div className="border-b border-red-500 py-5 lg:grid lg:grid-cols-2 lg:gap-10">
              {/* Column 1: Subscribe */}
              <div className="space-y-4 mb-6 lg:mb-0 text-center">
                <h2 className="text-2xl text-gray-700 md:text-2xl font-bold  mb-6 uppercase">
                  Reach Out and Connect
                  <div className="w-24 h-1 bg-red-600 mt-2 mx-auto "></div>
                </h2>
                <div className="items-center md:space-x-1 space-y-4 md:space-y-0 text-center">
                  <div className="my-10">
                    <Input
                      className="my-8 rounded-2xl bg-white w-full text-center"
                      type="email"
                      placeholder="Enter your email address..."
                    />
                  </div>
                  <div>
                    <Button
                      className="rounded-2xl bg-red-500 text-white w-full mb-0"
                      type="submit"
                    >
                      SEND
                    </Button>
                  </div>
                </div>
              </div>

              {/* Column 2: PAYMENT METHODS and QUICK LINKS */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-10 text-center md:text-start">
                {/* Column 2.1: PAYMENT METHODS */}
                <div className="space-y-4">
                  <h2 className="text-2xl text-gray-700 md:text-2xl font-bold  mb-6 uppercase">
                    PAYMENT
                    <div className="w-24 h-1 bg-red-600 mt-2 mx-auto md:ml-0"></div>
                  </h2>

                  <ul className="space-y-2">
                    <li className="flex items-center justify-center md:justify-start">
                      <FaCcMastercard className="text-blue-600 h-6 w-6 md:h-8 md:w-8 hover:text-blue-800 transition-colors" />
                      <span className="ml-2">Mastercard</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start">
                      <FaCcPaypal className="text-purple-600 h-6 w-6 md:h-8 md:w-8 hover:text-purple-800 transition-colors" />
                      <span className="ml-2">PayPal</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start">
                      <FaCcVisa className="text-red-600 h-6 w-6 md:h-8 md:w-8 hover:text-red-800 transition-colors" />
                      <span className="ml-2">Visa</span>
                    </li>
                    <li className="flex items-center justify-center md:justify-start">
                      <FaCcStripe className="text-blue-400 h-6 w-6 md:h-8 md:w-8 hover:text-blue-600 transition-colors" />
                      <span className="ml-2">Stripe</span>
                    </li>
                  </ul>
                </div>

                {/* Column 2.2: QUICK LINKS */}
                <div className="space-y-4 mt-6 lg:mt-0 text-center md:text-start">
                  <h2 className="text-2xl text-gray-700 md:text-2xl font-bold  mb-6 uppercase">
                    quick links
                    <div className="w-24 h-1 bg-red-600 mt-2 mx-auto md:ml-0"></div>
                  </h2>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/"
                        className="text-gray-600 hover:text-gray-900 text-lg"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className="text-gray-600 hover:text-gray-900 text-lg"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cars"
                        className="text-gray-600 hover:text-gray-900 text-lg"
                      >
                        Cars
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/booking"
                        className="text-gray-600 hover:text-gray-900 text-lg"
                      >
                        Booking
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="text-gray-600 hover:text-gray-900 text-lg"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row items-center justify-between py-6 border-t border-red-500">
              <p className="text-gray-600 text-center md:text-left">
                &copy; {new Date().getFullYear()} Car Rental. All rights
                reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 md:mt-0">
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/contact-us"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  to="/support"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll to Top and Bottom Buttons */}
        <div className="fixed bottom-4 right-4 space-y-2">
          <button
            onClick={scrollToTop}
            className="bg-red-500 text-gray-100 rounded-full p-3 shadow-lg hover:bg-red-600 transition-all"
          >
            <FaArrowUp className="h-2 w-2" />
          </button>
          <br />
          <button
            onClick={scrollToBottom}
            className="bg-red-500 text-gray-100 rounded-full p-3 shadow-lg hover:bg-red-600 transition-all"
          >
            <FaArrowDown className="h-2 w-2" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
