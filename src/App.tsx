import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./commons/Header"; // Ensure this is the correct path for Navbar
import store from "./redux/store";
import AppRoutes from "./routes/route"; // Ensure this is the correct path for AppRoutes

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar /> {/* Include the Navbar component at the top */}
        {/* Main Content Area */}
        <div className="pt-16">
          <AppRoutes /> {/* Render routes */}
        </div>
      </Router>
    </Provider>
  );
};

export default App;
