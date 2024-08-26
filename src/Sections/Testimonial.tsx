import React, { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    rating: 5,
    comment:
      "Fantastic service! The car was in excellent condition, and the booking process was smooth and hassle-free.",
    image: "https://i.postimg.cc/1zG56ykP/john-doe.jpg",
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment:
      "Great selection of cars and very competitive prices. I would definitely recommend this service to others.",
    image: "https://i.postimg.cc/DZzYfgyM/jane-smith.jpg",
  },
  {
    name: "David Lee",
    rating: 5,
    comment:
      "Exceptional customer support! They were available 24/7 to help me with my queries. Highly satisfied!",
    image: "https://i.postimg.cc/B6Vh2GJk/david-lee.jpg",
  },
  // Add more testimonials as needed
];

const CustomerTestimonials: React.FC = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = testimonialsRef.current;

    if (!scrollContainer) return;

    const totalScrollWidth = scrollContainer.scrollWidth;
    const scrollStep = scrollContainer.offsetWidth;

    const scrollTestimonials = () => {
      if (
        scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
        totalScrollWidth
      ) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    };

    const scrollInterval = setInterval(scrollTestimonials, 3000); // Scroll every 3 seconds

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="w-full my-10 py-10 bg-white overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Customer Testimonials
        </h2>
        <div
          ref={testimonialsRef}
          className="flex space-x-4 overflow-x-auto scrolling-touch scrollbar-hide"
        >
          {/* Loop Testimonials Twice for Infinite Scrolling */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
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
              <p className="text-gray-600 text-center">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
