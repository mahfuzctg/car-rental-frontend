import React from "react";
import { FaHome } from "react-icons/fa";

const NotFoundPage: React.FC = () => {
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/xTgmGq3b/162-1622413-4chan-404-pages-hd-png-download.png')",
      }}
    >
      <div className="text-center p-4 rounded-lg ">
        <a
          href="/"
          className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300 text-sm sm:text-base"
        >
          <FaHome className="mr-2" />
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
