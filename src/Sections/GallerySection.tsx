import { motion } from "framer-motion";

const GallerySection = () => {
  const images = [
    {
      src: "https://i.postimg.cc/VkDHzZJ6/rolls-royce-ghost-082.webp",
      colSpan: 2,
      rowSpan: 2,
      model: "Model 1",
      price: "$1000",
    },
    {
      src: "https://i.postimg.cc/hjMk64VC/360-F-568990442-6-SP92-Uhc-La-Obd-FJAr-CPZfcg2j-RUEk-RDX.jpg",
      colSpan: 1,
      rowSpan: 1,
      model: "Model 2",
      price: "$1200",
    },
    {
      src: "https://i.postimg.cc/C5QWMvPk/Hyundai-i20-2-1200x675.webp",
      colSpan: 1,
      rowSpan: 1,
      model: "Model 3",
      price: "$1100",
    },
    {
      src: "https://i.postimg.cc/vZ9pMtWx/modern-automobile-classic-technology-wheel-traffic-665346-119.avif",
      colSpan: 2,
      rowSpan: 2,
      model: "Model 4",
      price: "$1300",
    },
    {
      src: "https://i.postimg.cc/XJNhfMt9/car-windscreen-alleyway-dodge-challenger.jpg",
      colSpan: 1,
      rowSpan: 1,
      model: "Model 5",
      price: "$900",
    },
    {
      src: "https://i.postimg.cc/1tWdMCZ2/dodge-challenger-rt-black-and-red-sports-car-wallpaper-preview.jpg",
      colSpan: 1,
      rowSpan: 1,
      model: "Model 6",
      price: "$1400",
    },
    {
      src: "https://i.postimg.cc/QCwyZFCq/d26d2aab2ff63cb48b3a91b0e8e0aa55.jpg",
      colSpan: 2,
      rowSpan: 2,
      model: "Model 7",
      price: "$1500",
    },
    {
      src: "https://i.postimg.cc/5NQrqSKK/yellow-car-with-number-70-side-1340-23401.avif",
      colSpan: 1,
      rowSpan: 1,
      model: "Model 8",
      price: "$1600",
    },
    {
      src: "https://i.postimg.cc/LXsCqtZT/HME-AC3-NLine-360-EXT-5-Y3-K7700-11.avif",
      colSpan: 1,
      rowSpan: 1,
      model: "Model 9",
      price: "$1700",
    },
    {
      src: "https://i.postimg.cc/Jz5CZQGV/9322d9cb887344f19ca32b19b76037f7.jpg",
      colSpan: 1,
      rowSpan: 1,
      model: "Model 10",
      price: "$1000",
    },
    {
      src: "https://i.postimg.cc/pLTp6y8S/Car-Rental-2.webp",
      colSpan: 1,
      rowSpan: 1,
      model: "Model 11",
      price: "$1000",
    },
  ];

  return (
    <section className="container w-[95%] h-auto mx-auto my-8 px-3 lg:px-0">
      {/* Title and Description */}
      <div className="text-center mb-8">
        <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
          Our Gallery
          <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
        </h2>

        <p className="text-lg text-gray-600">
          Explore our exclusive collection of premium cars available for rent.
          Each model is selected to ensure comfort, style, and performance.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-4 auto-rows-[minmax(150px,_1fr)]">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
            style={{
              gridColumn: `span ${image.colSpan}`,
              gridRow: `span ${image.rowSpan}`,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={image.src}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <motion.div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-white text-xl font-semibold mb-2">
                {image.model}
              </h2>
              <p className="text-white text-lg mb-4">{image.price}</p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                Details
              </button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
