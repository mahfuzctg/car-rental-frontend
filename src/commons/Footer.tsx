import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
  FaCcVisa,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/UI/button";
import { Input } from "../components/ui/UI/input";

const Footer = () => {
  return (
    <section>
      <div className="mt-20 w-full md:w-[80%] md:ml-[20%]">
        <div className="h-full pt-8 px-4 md:px-8 lg:px-16">
          <div className="w-full">
            {/* Footer Top */}
            <div className="border-b py-5 border-gray-400 lg:flex lg:justify-between lg:gap-10">
              {/* Column 1: Subscribe */}
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-gray-700 text-center md:text-start text-lg md:text-xl lg:text-2xl">
                  SUBSCRIBE TO CAR RENTAL
                </h3>
                <div className=" items-center space-y-2 md:space-y-0 md:py-5 md:space-x-2">
                  <Input
                    className="focus-visible:ring-offset-0 my-4  text-red-500 rounded-2xl  bg-white w-full md:w-96"
                    type="email"
                    placeholder="Enter your email address..."
                  />
                  <Button
                    className=" rounded-2xl btn-red  w-full md:w-36"
                    type="submit"
                  >
                    SEND
                  </Button>
                </div>
              </div>

              {/* Column 2: Social Media */}
              <div className="space-y-2 flex-1 text-center md:text-start">
                <h3 className="font-semibold text-gray-700 text-lg md:text-xl lg:text-2xl">
                  JOIN US ON:
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                  <Link to="https://web.facebook.com/">
                    <svg
                      className="text-blue-600 h-6 w-6 md:h-8 md:w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                    </svg>
                  </Link>
                  <Link to="https://www.instagram.com/">
                    <svg
                      className="text-purple-600 h-6 w-6 md:h-8 md:w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </Link>
                  <Link to="https://www.youtube.com/">
                    <svg
                      className="text-red-600 h-6 w-6 md:h-8 md:w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 576 512"
                    >
                      <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                    </svg>
                  </Link>
                  <Link to="https://www.twitter.com">
                    <svg
                      className="text-blue-400 h-6 w-6 md:h-8 md:w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M459.4 151.7c.3 4.4.3 8.8.3 13.2 0 135.8-103.7 292.4-292.4 292.4-58.2 0-112.6-17-158.8-46.1 8.1.9 16.4 1.4 24.7 1.4 48.5 0 93-16.5 128.1-44.2-45.3-.8-83.5-30.7-96.8-71.9 6.4 1.2 12.8 1.9 19.6 1.9 9.6 0 18.8-3.3 26-8.8-47.5-1-87.7-32-101.7-74.9 6.7 1.3 13.8 2.1 21.1 2.1 10.3 0 20.4-3.5 28.3-9.4-49.6-10-87.1-53.5-87.1-105.5v-1.3c14.6 8.1 31.4 12.9 49.1 13.5-29.1-19.5-48.3-52.6-48.3-90.1 0-19.8 5.3-38.4 14.6-54.4 53.3 65.4 133.2 108.3 223.1 112.2-1.8-7.9-2.7-16.2-2.7-24.6 0-59.5 48.4-108.7 108.7-108.7 31.2 0 59.4 12.5 80.8 32.9 25.1-4.8 48.7-14.1 69.9-26.7-8.2 25.5-25.5 46.9-48.2 60.5 22.2-2.6 43.2-8.6 62.5-17.3-14.8 21.8-33.5 41.1-54.8 56.4z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="w-full mt-8 border-t pt-8 border-gray-400">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex-1 flex items-center justify-center md:justify-start gap-4">
                  <FaCcMastercard className="text-red-600 h-8 w-8" />
                  <FaCcPaypal className="text-gray-600 h-8 w-8" />
                  <FaCcStripe className="text-red-600 h-8 w-8" />
                  <FaCcVisa className="text-gray-600 h-8 w-8" />
                </div>
                <div className="flex-1 flex items-center justify-center md:justify-end">
                  <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Car Rental. All Rights
                    Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
