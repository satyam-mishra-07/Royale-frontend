import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./store/auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
      {/* ToastContainer with custom styling */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        progressClassName="toastProgress"
        bodyClassName="toastBody"
        className="custom-toast-container" // Custom class for additional styling
      />
    </React.StrictMode>
  </AuthProvider>
);
