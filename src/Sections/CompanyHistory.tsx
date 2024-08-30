import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { FaBullseye, FaLightbulb } from "react-icons/fa";

const CompanyHistory = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // Define transform values based on scroll
  const yOffsetImage = useTransform(scrollY, [0, 300], [0, 30]);
  const yOffsetText = useTransform(scrollY, [0, 300], [0, 20]);
  const yOffsetCards = useTransform(scrollY, [0, 400], [0, 50]);

  const toggleReadMore = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <section className="py-16 my-20 px-8">
      {/* First Section */}
      <div className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto mb-16">
        {/* First Div: Large Image */}
        <motion.div className="w-full lg:w-1/2" style={{ y: yOffsetImage }}>
          <img
            src="https://i.postimg.cc/kMxTHS45/mission-vs-vision-statement.jpg" // Replace with your image URL
            alt="Company Vision"
            className="w-full h-auto rounded-lg"
          />
        </motion.div>

        {/* Second Div: Title, Mission, Vision with Icons */}
        <motion.div
          className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12 text-center lg:text-left"
          style={{ y: yOffsetText }}
        >
          <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
            our journey
            <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
          </h2>

          <div className="mb-8">
            <FaBullseye className="text-red-600 text-4xl mx-auto lg:mx-0 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Our Mission
            </h3>
            <p className="text-lg italic text-gray-600">
              "To innovate, inspire, and impact the world by delivering
              exceptional solutions that transform lives and empower progress."
            </p>
          </div>

          <div>
            <FaLightbulb className="text-red-600 text-4xl mx-auto lg:mx-0 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Our Vision
            </h3>
            <p className="text-lg italic text-gray-600">
              "A world where technology meets creativity, innovation knows no
              bounds, and excellence is our everyday standard."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Second Section: Company History */}
      <motion.div className="max-w-7xl mx-auto" style={{ y: yOffsetCards }}>
        <h3 className="text-2xl font-bold uppercase text-gray-700 mb-6 text-center">
          Our History
        </h3>

        {/* History Cards in Flex Layout */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <motion.div
            className="flex flex-col justify-between p-6 bg-white shadow-lg rounded-lg w-full md:w-1/3 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h4 className="text-xl font-bold text-red-600 mb-2">2012</h4>
              <p
                className={`text-gray-700 ${
                  expandedCard === "2012" ? "block" : "line-clamp-5"
                }`}
              >
                Launched our flagship product, laying the foundation for growth
                and success. Our innovative approach quickly garnered attention
                and set the stage for future advancements. We invested in
                cutting-edge technology and brought together a team of visionary
                thinkers to drive our mission forward. The product launch marked
                a pivotal moment in our journey, opening doors to new
                opportunities and markets. By focusing on quality and customer
                satisfaction, we established a strong foundation for long-term
                success and growth.
              </p>
            </div>
            <button
              onClick={() => toggleReadMore("2012")}
              className="text-red-600 hover:text-red-500 font-semibold mt-5"
            >
              {expandedCard === "2012" ? "Read Less" : "Read More"}
            </button>
          </motion.div>

          <motion.div
            className="flex flex-col justify-between p-6 bg-white shadow-lg rounded-lg w-full md:w-1/3 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h4 className="text-xl font-bold text-red-600 mb-2">2015</h4>
              <p
                className={`text-gray-700 ${
                  expandedCard === "2015" ? "block" : "line-clamp-5"
                }`}
              >
                Expanded internationally by opening our first global office,
                marking a significant step in our global outreach and
                establishing our presence in new markets. This expansion allowed
                us to tap into new regions, understand diverse market needs, and
                build strategic partnerships. We focused on adapting our
                solutions to meet regional demands and enhance our global
                footprint. This milestone demonstrated our commitment to growth
                and our ability to navigate complex international markets,
                reinforcing our position as a leading innovator.
              </p>
            </div>
            <button
              onClick={() => toggleReadMore("2015")}
              className="text-red-600 hover:text-red-500 font-semibold mt-5"
            >
              {expandedCard === "2015" ? "Read Less" : "Read More"}
            </button>
          </motion.div>

          <motion.div
            className="flex flex-col justify-between p-6 bg-white shadow-lg rounded-lg w-full md:w-1/3 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h4 className="text-xl font-bold text-red-600 mb-2">2020</h4>
              <p
                className={`text-gray-700 ${
                  expandedCard === "2020" ? "block" : "line-clamp-5"
                }`}
              >
                Celebrated a decade of excellence, reflecting on our
                achievements and reaffirming our commitment to innovation and
                quality in everything we do. The milestone was a testament to
                our resilience and ability to adapt to changing industry trends.
                We leveraged our experience and continued to drive progress
                through innovation and customer-centric solutions. This decade
                of success reinforced our position as an industry leader and
                paved the way for future growth and continued excellence.
              </p>
            </div>
            <button
              onClick={() => toggleReadMore("2020")}
              className="text-red-600 hover:text-red-500 font-semibold mt-5"
            >
              {expandedCard === "2020" ? "Read Less" : "Read More"}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CompanyHistory;
