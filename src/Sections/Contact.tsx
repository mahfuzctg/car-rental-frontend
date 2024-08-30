import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ContactInformation: React.FC = () => {
  return (
    <div>
      {/* Section 1: Contact Details */}
      <section className="w-full mt-20 ">
        <div className="container mx-auto">
          <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
            Get in Touch
            <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
          </h2>
          <div className="flex md:w-9/12 mx-auto flex-col md:flex-row items-center md:space-x-8">
            {/* Image */}
            <div className=" ">
              <img
                src="https://i.postimg.cc/BQqHSYTd/pngtree-male-customer-service-consultant-on-white-background-contact-us-white-background-help-photo.jpg"
                alt="Contact Us"
                className="w-full h-80 object-cover rounded-lg "
              />
            </div>
            {/* Contact Information */}
            <div className="md:w-1/2 bg-white p-6 rounded-lg ">
              <div className="flex items-center mb-4">
                <FaPhoneAlt className="text-red-600 w-6 h-6 mr-3" />
                <div>
                  <h4 className="font-bold text-gray-800">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-red-600 w-6 h-6 mr-3" />
                <div>
                  <h4 className="font-bold text-gray-800">Email</h4>
                  <p className="text-gray-600">info@company.com</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-red-600 w-6 h-6 mr-3" />
                <div>
                  <h4 className="font-bold text-gray-800">Address</h4>
                  <p className="text-gray-600">
                    123 Business Road, Suite 456
                    <br />
                    City, State, 78910
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Google Map */}
      <section className="w-full py-12">
        <div className="container mx-auto">
          <div className="w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8420802114166!2d-122.41941838468155!3d37.77492977975975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085816b3b6fc99b%3A0x23e2f087f038b6f6!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1637686547892!5m2!1sen!2sus"
              className="w-full h-80 border-0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactInformation;
