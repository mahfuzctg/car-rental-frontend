import React from "react";
import { FaStar } from "react-icons/fa";
import "../Customs/style.css";

const testimonials = [
  {
    name: "John Doe",
    rating: 5,
    comment: "Fantastic service!",
    image:
      "https://i.postimg.cc/wTrGW4wH/pngtree-user-profile-avatar-png-image-10211467.png",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment: "Great selection of cars.",
    image:
      "https://i.postimg.cc/wTrGW4wH/pngtree-user-profile-avatar-png-image-10211467.png",
  },
  {
    name: "David Lee",
    rating: 5,
    comment: "Exceptional customer support!",
    image:
      "https://i.postimg.cc/wTrGW4wH/pngtree-user-profile-avatar-png-image-10211467.png",
  },
  // Add more testimonials as needed
];

const CustomerTestimonials: React.FC = () => {
  return (
    <section className="w-full my-10 py-10 bg-white overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Customer Testimonials
        </h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex space-x-4 animate-scroll">
            {[...testimonials, ...testimonials, ...testimonials].map(
              (testimonial, index) => (
                <div
                  key={index}
                  className="min-w-[300px] bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold mb-2 text-center">
                    {testimonial.name}
                  </h3>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-center">
                    {testimonial.comment}
                  </p>
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
