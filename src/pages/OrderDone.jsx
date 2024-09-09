import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const OrderConfirmed = () => {
  const { orderID } = useParams();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-bgColor">
      <div className="bg-cardColor p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-Italianno text-tertiaryColor mb-4">
          Thank You!
        </h1>
        <p className="text-xl text-tertiaryColor2 mb-6">
          Your order has been placed successfully.
        </p>
        <p className="text-lg text-tertiaryColor2 mb-8">
          Order ID: <strong>{orderID}</strong>
        </p>
        <Link
          to="/"
          className="bg-btnColor1 hover:bg-btnColor2 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-200 ease-in-out"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmed;
