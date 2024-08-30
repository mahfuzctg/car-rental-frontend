import React from "react";
import { FaFacebookF, FaInstagram, FaStar, FaTwitter } from "react-icons/fa";
import "../Customs/style.css";

const testimonials = [
  {
    name: "Mahfuz",
    rating: 5,
    comment: "Fantastic service!",
    image: "https://i.postimg.cc/QMwV5fTN/My-profile-pic.jpg",
    position: "Manager",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment: "Great selection.",
    image:
      "https://i.postimg.cc/SscQ9k4V/canva-modern-instagram-profile-picture-gb-A5fw-Cy-Fvw.jpg",
    position: "Customer",
  },
  {
    name: "Miss Lee",
    rating: 5,
    comment: "Exceptional support!",
    image:
      "https://i.postimg.cc/c4kWrrY0/com-vicman-newprofilepic-icon-2022-06-07-21-33-07.png",
    position: "Sales Executive",
  },
  {
    name: "Mr. David",
    rating: 5,
    comment: "Exceptional customer!",
    image:
      "https://i.postimg.cc/j56K5c6F/c-HJpdm-F0-ZS9sci9pb-WFn-ZXMvd2-Vic2l0-ZS8y-MDIy-LTA4-L2pv-Yj-Ew-Mz-Qt-ZWxlb-WVud-C0w-Ny00-MDMuc-G5n.jpg",
    position: "Sales Executive",
  },
  // Add more testimonials as needed
];

const OurTeam: React.FC = () => {
  return (
    <section className="w-full my-10 py-10 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          Meet our team
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Hear from our satisfied customers who have experienced exceptional
          service and quality from us.
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-4 animate-scroll">
            {[...testimonials, ...testimonials, ...testimonials].map(
              (testimonial, index) => (
                <div
                  key={index}
                  className="relative min-w-[330px] p-8 rounded-2xl shadow-lg m-5  flex flex-col bg-white group overflow-hidden"
                >
                  {/* Profile Picture */}
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-gray-300"
                  />
                  <div className="ml-20 mt-4">
                    {/* Text Content */}
                    <h3 className="text-xl font-bold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {testimonial.position}
                    </p>
                    <div className="flex items-center mt-2">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <FaStar key={i} className="text-yellow-500 w-5 h-5" />
                        )
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-4">
                      {testimonial.comment}
                    </p>
                  </div>

                  {/* Social media icons on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-red-600 text-white text-center py-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4 mb-2">
                      <a href="#" className="text-white hover:text-gray-300">
                        <FaFacebookF className="w-8 h-8" />
                      </a>
                      <a href="#" className="text-white hover:text-gray-300">
                        <FaTwitter className="w-8 h-8" />
                      </a>
                      <a href="#" className="text-white hover:text-gray-300">
                        <FaInstagram className="w-8 h-8" />
                      </a>
                    </div>
                    <p className="text-sm">Connect with us</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
