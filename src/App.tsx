import { Routes } from "react-router-dom";

import Navbar from "./commons/Header";

import StripeIntegration from "./StripeIntegration"; // Import the StripeIntegration component
import Footer from "./commons/Footer";

const App = () => {
  return (
    <>
      <StripeIntegration />
      <Navbar />
      <Routes>{/* Public Routes */}</Routes>
      <Footer />
    </>
  );
};

export default App;
