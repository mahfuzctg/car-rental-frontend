import React from "react";
import {
  FaBullseye,
  FaCalendarAlt,
  FaCar,
  FaEnvelope,
  FaEye,
  FaHandsHelping,
  FaLeaf,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaSitemap,
  FaStar,
} from "react-icons/fa";
import "../Customs/style.css"; // Make sure this path is correct

// Define your team members here
const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    image:
      "https://i.postimg.cc/D0zQ5PtR/pngtree-user-profile-avatar-png-image-13369989.png",
    ranking: "Top Leader",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image:
      "https://i.postimg.cc/D0zQ5PtR/pngtree-user-profile-avatar-png-image-13369989.png",
    ranking: "Tech Innovator",
  },
  {
    name: "Emily Johnson",
    role: "CFO",
    image:
      "https://i.postimg.cc/D0zQ5PtR/pngtree-user-profile-avatar-png-image-13369989.png",
    ranking: "Financial Expert",
  },
  {
    name: "Emily Johnson",
    role: "CFO",
    image:
      "https://i.postimg.cc/D0zQ5PtR/pngtree-user-profile-avatar-png-image-13369989.png",
    ranking: "Financial Expert",
  },
  {
    name: "Emily Johnson",
    role: "CFO",
    image:
      "https://i.postimg.cc/D0zQ5PtR/pngtree-user-profile-avatar-png-image-13369989.png",
    ranking: "Financial Expert",
  },
];
// ===== Our Fleet data ========

const fleetData = [
  {
    type: "Economy",
    description:
      "Affordable and fuel-efficient cars, perfect for city driving and budget-conscious travelers.",
    icon: <FaCar className="text-blue-600 text-3xl" />,
  },
  {
    type: "Luxury",
    description:
      "Experience the ultimate in comfort and style with our range of luxury vehicles.",
    icon: <FaStar className="text-yellow-500 text-3xl" />,
  },
  {
    type: "SUVs",
    description:
      "Spacious and versatile SUVs, ideal for family trips or off-road adventures.",
    icon: <FaSitemap className="text-green-600 text-3xl" />,
  },
];
//===== valuesData ======
const valuesData = [
  {
    title: "Customer Service",
    description:
      "Our commitment to delivering exceptional customer service is at the heart of everything we do. We strive to exceed expectations with every interaction.",
    icon: <FaHandsHelping className="text-blue-600 text-3xl" />,
  },
  {
    title: "Sustainability",
    description:
      "We are dedicated to sustainability, constantly seeking ways to reduce our environmental impact and promote eco-friendly practices in our operations.",
    icon: <FaLeaf className="text-green-600 text-3xl" />,
  },
  {
    title: "Integrity",
    description:
      "Integrity is our foundation. We conduct our business with honesty, transparency, and respect, ensuring trust and reliability in all our relationships.",
    icon: <FaShieldAlt className="text-yellow-600 text-3xl" />,
  },
];

const AboutUsSection: React.FC = () => {
  return (
    <div>
      {/* Full Width Banner */}
      <section className="grid sm:grid-cols-1 md:grid-cols-2 w-full mt-8">
        <div className="justify-center items-center my-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">ABOUT US</h1>
          <p className=" mb-4 ">
            We are dedicated to providing exceptional services and delivering
            outstanding customer experiences. Our mission is to innovate and
            lead in our industry while staying committed to excellence.
          </p>
          <p className=" mb-4 ">
            Founded in [Year], our company has grown to become a leader in our
            field, known for our dedication, integrity, and superior customer
            service.
          </p>
        </div>
        <div
          className=" h-[400px] bg-cover bg-center relative"
          style={{
            backgroundImage:
              'url("https://i.postimg.cc/50zKXvzv/network-gb56a1c2b6-1920-1024x427.jpg")',
          }}
        ></div>
      </section>

      {/* Company History Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Company History
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-blue-600 text-3xl mr-4" />
                <h3 className="text-2xl font-semibold">Founding Year</h3>
              </div>
              <p className="text-gray-700">
                Founded in [Year], our company began with a vision to innovate
                and excel in the industry. We started as a small team with a big
                dream.
              </p>
            </div>
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <FaBullseye className="text-green-600 text-3xl mr-4" />
                <h3 className="text-2xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-gray-700">
                Our mission is to deliver exceptional value to our customers
                through innovation, integrity, and a commitment to excellence.
              </p>
            </div>
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <FaEye className="text-orange-600 text-3xl mr-4" />
                <h3 className="text-2xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-gray-700">
                We envision a future where our company is recognized as a leader
                in our field, known for our innovative solutions and exceptional
                service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 bg-white overflow-hidden relative">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
          <div className="relative overflow-hidden">
            <div className="flex gap-8 animate-scroll">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white p-6 rounded-lg shadow-lg w-60 text-center flex-none"
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-1">{member.role}</p>
                  <p className="text-gray-500">{member.ranking}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Our Fleet Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Fleet</h2>
          <div className="flex flex-col md:flex-row md:space-x-8">
            {fleetData.map((fleet) => (
              <div
                key={fleet.type}
                className="flex-1 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0"
              >
                <div className="flex items-center mb-4">
                  {fleet.icon}
                  <h3 className="text-2xl font-semibold ml-4">{fleet.type}</h3>
                </div>
                <p className="text-gray-700">{fleet.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* valuesData */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Values & Commitment
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-8">
            {valuesData.map((value) => (
              <div
                key={value.title}
                className="flex-1 bg-gray-100 p-6 rounded-lg shadow-lg mb-6 md:mb-0"
              >
                <div className="flex items-center mb-4">
                  {value.icon}
                  <h3 className="text-2xl font-semibold ml-4">{value.title}</h3>
                </div>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact US Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-8">
            Contact Information
          </h2>

          {/* Contact Details and Image */}
          <div className="flex flex-col md:flex-row mb-8">
            {/* Contact Details Section */}
            <div className="md:w-1/2 w-full flex flex-col justify-center">
              <div className="mb-4">
                <FaPhoneAlt className="text-green-600 text-3xl inline-block mr-4" />
                <span className="text-xl">+123-456-7890</span>{" "}
                {/* Replace with your phone number */}
              </div>
              <div className="mb-4">
                <FaEnvelope className="text-blue-600 text-3xl inline-block mr-4" />
                <span className="text-xl">info@example.com</span>{" "}
                {/* Replace with your email */}
              </div>
              <div className="mb-6">
                <FaMapMarkerAlt className="text-red-600 text-3xl inline-block mr-4" />
                <span className="text-xl">1234 Main St, Anytown, USA</span>{" "}
                {/* Replace with your address */}
              </div>
            </div>
            {/* Image Section */}
            <div className="md:w-1/2 w-full mb-8 md:mb-0">
              <img
                src="https://i.postimg.cc/QMRTLVXt/kv-contact-us-xs.jpg"
                alt="Contact Us"
                className="w-full h-auto rounded-lg "
              />
            </div>
          </div>

          {/* Contact Form and Google Map Section */}
          <div className="flex  flex-col md:flex-row ">
            {/* Send Message Form */}
            <div className="md:w-1/2 w-full px-4 mb-8 md:mb-0">
              <form className="bg-white p-4 rounded-lg shadow-lg">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-lg font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="2"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Google Map Section */}
            <div className="md:w-1/2 w-full h-64 md:h-[486px]">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.607926211386!2d91.18349201537028!3d22.33544738522345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1959fcdfe77%3A0x23fdc00b5ea7b73!2sChittagong%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1694515306972!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsSection;
