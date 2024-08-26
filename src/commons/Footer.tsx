import { Link } from "react-router-dom";
import footerImage from "../assets/Banner/banner-1.jpg";

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
      <div
        style={{
          backgroundImage: `url(${footerImage})`,
        }}
        className="bg-top bg-cover bg-no-repeat mt-28"
      >
        <div className="bg-black/85 h-full pt-8 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Footer Top */}
            <div className="border-b py-5 border-gray-400 space-y-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
              {/* Subscribe */}
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-gray-200 text-lg md:text-xl lg:text-2xl">
                  SUBSCRIBE TO OUR NEWSLETTER
                </h3>
                <div className="flex flex-col md:flex-row w-full max-w-xl items-center space-y-2 md:space-y-0 md:space-x-2">
                  <Input
                    className="focus-visible:ring-offset-0 text-orange-500 rounded-2xl bg-white w-full md:w-96"
                    type="email"
                    placeholder="Enter your email address..."
                  />
                  <Button
                    className="bg-orange-500 rounded-2xl text-white hover:bg-white hover:text-orange-500 w-full md:w-36"
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
                  <h3 className="font-semibold text-gray-200 text-lg md:text-xl lg:text-2xl">
                    JOIN US ON:
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link to="https://web.facebook.com/">
                      <svg
                        className="text-gray-200 h-6 w-6 md:h-8 md:w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                      >
                        <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                      </svg>
                    </Link>
                    <Link to="https://www.instagram.com/">
                      <svg
                        className="text-gray-200 h-6 w-6 md:h-8 md:w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                    </Link>
                    <Link to="https://www.youtube.com/">
                      <svg
                        className="text-gray-200 h-6 w-6 md:h-8 md:w-8"
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
                        className="text-gray-200 h-6 w-6 md:h-8 md:w-8"
                        viewBox="0 0 512 512"
                      >
                        <path d="M459.4 151.7c.3 4.4.3 8.8.3 13.2 0 135.5-103.6 291.4-291.4 291.4-57.9 0-112.4-16.9-158.8-45.7 8.2 1 16.4 1.5 24.8 1.5 49.7 0 95.5-16.9 131.7-45.2-46.4-.8-85.7-31.5-99.2-73.6 6.5 1.3 13.3 2 20.2 2 9.8 0 19.6-1.3 28.9-3.7-48.5-9.7-85-52.2-85-103.6v-1.3c14.3 8 30.6 12.7 48.1 13.3-28.6-19.1-47.6-51.5-47.6-88.2 0-19.5 5.3-37.8 14.7-53.6 53.6 65.8 133.4 109.4 223.6 114.4-1.9-7.8-2.8-15.9-2.8-24.2 0-58.8 47.9-106.7 106.7-106.7 30.7 0 58.3 12.9 78.1 33.7 24.4-4.8 47.3-13.7 67.9-25.9-8 25-25 46-47.2 59.2 21.7-2.5 42.2-8.4 61.4-16.8-14.5 21.6-32.8 40.7-53.8 55.9z" />
                      </svg>
                    </Link>
                  </div>
                </div>
                {/* Border */}
                <div className="hidden lg:block h-16 w-[1px] border-r border-gray-400"></div>
                {/* Payment Methods */}
                <div className="flex flex-col space-y-2">
                  <h3 className="font-semibold text-gray-200 text-lg md:text-xl lg:text-2xl">
                    WE ACCEPT:
                  </h3>
                  <div className="flex gap-4">
                    <img
                      src={mastercard}
                      alt="MasterCard"
                      className="h-8 md:h-12"
                    />
                    <img src={paypal} alt="PayPal" className="h-8 md:h-12" />
                    <img src={shopPay} alt="ShopPay" className="h-8 md:h-12" />
                    <img src={visa} alt="Visa" className="h-8 md:h-12" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="py-8 text-center text-gray-200 text-sm">
              <p>
                &copy; {new Date().getFullYear()} Your Company Name. All rights
                reserved.
              </p>
              <p className="text-gray-400">
                Designed and Developed by Your Name
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
