import { Link } from "react-router-dom";
import {
  default as mastercard,
  default as paypal,
  default as shopPay,
  default as visa,
} from "../assets/Logo/logo-1.jpg";
import { Button } from "../components/ui/UI/button";
import { Input } from "../components/ui/UI/input";

const Footer = () => {
  return (
    <section>
      <div className="bg-[#F3F4F6] mt-20 w-full md:w-[80%] md:ml-[20%]">
        <div className=" h-full pt-8 px-4 md:px-8 lg:px-16">
          <div className="w-full">
            {/* Footer Top */}
            <div className="border-b py-5 border-gray-400 space-y-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
              {/* Subscribe */}
              <div className="space-y-2 flex-1  w-5">
                <h3 className="font-semibold text-gray-700 text-center md:text-start  text-lg md:text-xl lg:text-2xl">
                  SUBSCRIBE TO CAR RENTAL
                </h3>
                <div className="flex flex-col md:flex-row w-full max-w-xl items-center space-y-2 md:space-y-0 md:py-5 md:space-x-2">
                  <Input
                    className="focus-visible:ring-offset-0 text-orange-500 rounded-2xl bg-white w-full md:w-96"
                    type="email"
                    placeholder="Enter your email address..."
                  />
                  <Button
                    className="bg-[#1F5C89] rounded-2xl text-white hover:bg-white hover:text-[#1F5C89] w-full md:w-36"
                    type="submit"
                  >
                    SUBSCRIBE
                  </Button>
                </div>
              </div>
              {/* Border */}
              <div className="hidden lg:block h-16 w-[1px] border-r border-gray-400"></div>

              <div className="flex-1 flex flex-col md:flex-row justify-between gap-8 md:gap-10">
                {/* Social */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700 text-lg md:text-xl lg:text-2xl">
                    JOIN US ON:
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link to="https://web.facebook.com/">
                      <svg
                        className="text-gray-700 h-6 w-6 md:h-8 md:w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                      >
                        <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                      </svg>
                    </Link>
                    <Link to="https://www.instagram.com/">
                      <svg
                        className="text-gray-700 h-6 w-6 md:h-8 md:w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                    </Link>
                    <Link to="https://www.youtube.com/">
                      <svg
                        className="text-gray-700 h-6 w-6 md:h-8 md:w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 576 512"
                      >
                        <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                      </svg>
                    </Link>
                    <Link to="https://www.twitter.com">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="text-gray-700 h-6 w-6 md:h-8 md:w-8"
                        viewBox="0 0 512 512"
                      >
                        <path d="M459.4 151.7c.4 5.6.4 11.2.4 16.8 0 171.6-130.8 369.7-369.7 369.7-73.6 0-142.6-21.6-200.1-58.6 10.4 1.2 20.8 1.6 31.2 1.6 61.2 0 117.3-20.8 162.3-55.7-57.2-1.2-105.8-38.7-122.3-90.8 8.1 1.6 16.3 2.4 24.8 2.4 12.2 0 23.9-4.1 33.3-11.2-59.8-12.1-104.5-64.4-104.5-127.7v-1.6c17.5 9.7 37.7 15.6 59.3 16.2-35.2-23.5-58.5-63.6-58.5-108.7 0-24 6.4-46.5 17.6-66.2 64.5 79.2 161.6 131.2 270.1 136.7-2.4-9.7-3.7-19.8-3.7-30.1 0-73 59.6-132.6 132.6-132.6 38.3 0 73.2 16.3 97.4 42.5 30.5-6 59.3-17.1 85.4-32.2-10.1 31.4-31.3 57.6-59.1 74.4 27.3-3.1 53.1-10.5 77.1-21.2-18.1 27.2-40.8 50.7-66.8 69.8z" />
                      </svg>
                    </Link>
                  </div>
                </div>
                {/* Payment */}
                <div className="space-y-2  text-center">
                  <h3 className="font-semibold text-gray-700 text-lg md:text-xl ">
                    PAYMENT OPTIONS
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <img
                      className="h-8 md:h-10"
                      src={mastercard}
                      alt="Mastercard"
                    />
                    <img className="h-8 md:h-10" src={paypal} alt="Paypal" />
                    <img className="h-8 md:h-10" src={shopPay} alt="Shop Pay" />
                    <img className="h-8 md:h-10" src={visa} alt="Visa" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="pt-8 pb-5 text-gray-700 border-t border-gray-400 text-sm">
              <div className="flex flex-wrap justify-between items-center max-w-7xl mx-auto">
                <div className="space-x-6">
                  <Link to="/privacy-policy" className="hover:text-[#1F5C89]">
                    Privacy Policy
                  </Link>
                  <Link to="/terms-conditions" className="hover:text-[#1F5C89]">
                    Terms & Conditions
                  </Link>
                </div>
                <div>
                  © {new Date().getFullYear()} Your Company. All Rights
                  Reserved.
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
