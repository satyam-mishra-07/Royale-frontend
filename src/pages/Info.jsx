import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Info() {
  const navigate = useNavigate();
  const { orderID } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/order-confirmation/${orderID}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, orderID]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primaryColor text-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-tertiaryColor2">
        Important Information
      </h1>
      <p className="text-xl mb-4 text-tertiaryColor">
        This website is a self-learning project created by a college student and
        is not a real business.
      </p>
      <p className="text-xl mb-4 text-tertiaryColor">
        Therefore, we cannot accept any online payments, nor will we actually
        deliver any food.
      </p>
      <p className="text-xl text-secondaryColor">
        You will be redirected to your order confirmation in a few seconds...
      </p>
    </div>
  );
}
