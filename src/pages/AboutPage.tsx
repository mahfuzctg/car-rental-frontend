import React from "react";
import { FaBullseye, FaCalendarAlt, FaEye } from "react-icons/fa";
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

const AboutUsSection: React.FC = () => {
  return (
    <div>
      {/* Full Width Banner */}
      <section
        className="w-full h-[500px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://i.postimg.cc/pXNBbKMb/avis-camry-png.avif")',
        }}
      >
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-4">
            We are dedicated to providing exceptional services and delivering
            outstanding customer experiences. Our mission is to innovate and
            lead in our industry while staying committed to excellence.
          </p>
          <p className="text-lg">
            Founded in [Year], our company has grown to become a leader in our
            field, known for our dedication, integrity, and superior customer
            service.
          </p>
        </div>
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
    </div>
  );
};

export default AboutUsSection;
