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
    comment: "Great selection of cars.",
    image:
      "https://i.postimg.cc/SscQ9k4V/canva-modern-instagram-profile-picture-gb-A5fw-Cy-Fvw.jpg",
    position: "Customer",
  },
  {
    name: "Miss Lee",
    rating: 5,
    comment: "Exceptional customer support!",
    image:
      "https://i.postimg.cc/c4kWrrY0/com-vicman-newprofilepic-icon-2022-06-07-21-33-07.png",
    position: "Sales Executive",
  },
  {
    name: "Mr. David",
    rating: 5,
    comment: "Exceptional customer support!",
    image:
      "https://i.postimg.cc/j56K5c6F/c-HJpdm-F0-ZS9sci9pb-WFn-ZXMvd2-Vic2l0-ZS8y-MDIy-LTA4-L2pv-Yj-Ew-Mz-Qt-ZWxlb-WVud-C0w-Ny00-MDMuc-G5n.jpg",
    position: "Sales Executive",
  },
  // Add more testimonials as needed
];

const CustomerTestimonials: React.FC = () => {
  return (
    <section className="w-full my-10 py-10 bg-white overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          Customer Testimonials
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Hear from our satisfied customers who have experienced exceptional
          service and quality from us.
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="flex space-x-4 animate-scroll">
            {[...testimonials, ...testimonials, ...testimonials].map(
              (testimonial, index) => (
                <div
                  key={index}
                  className="min-w-[300px] p-6 rounded-xl shadow-lg flex flex-col items-center relative group"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full p-1 bg-red-600 mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-2 text-center">
                    {testimonial.name}
                  </h3>
                  <div className="flex items-center mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-center text-sm">
                    {testimonial.comment}
                  </p>
                  <div className="relative w-full">
                    {/* Position text */}
                    <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-center py-2 rounded-b-xl group-hover:hidden">
                      {testimonial.position}
                    </div>
                    {/* Social media icons on hover */}
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-red-600 text-white text-center py-2 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-4 mb-2">
                        <FaFacebookF className="w-4 h-4" />
                        <FaTwitter className="w-4 h-4" />
                        <FaInstagram className="w-4 h-4" />
                      </div>
                      <p className="text-sm">Connect with us</p>
                    </div>
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

export default CustomerTestimonials;
