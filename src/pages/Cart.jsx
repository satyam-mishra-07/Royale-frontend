import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import ClipLoader from "react-spinners/ClipLoader"; // Assuming you are using this spinner

export default function Cart() {
  const {
    menu,
    menuItems,
    cartIncrease,
    cartDecrease,
    userAuthentication,
    userData,
    loading,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    userAuthentication();
    menuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { _id, ...menuData } = menu;

  const getItemDetails = (foodId) => {
    for (let category in menuData) {
      if (Array.isArray(menuData[category])) {
        const item = menuData[category].find((item) => item.food_id === foodId);
        if (item) return item;
      }
    }
    return null;
  };

  const handleIncrease = (userId, foodId) => {
    cartIncrease(userId, foodId);
  };

  const handleDecrease = (userId, foodId) => {
    cartDecrease(userId, foodId);
  };

  const handleCheckout = () => {
    navigate("/checkout"); // Assuming you have a checkout route set up
  };

  if (loading || !userData || !userData.cart) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  // Convert the cart object to an array of items
  const cartItems = Object.entries(userData.cart)
    .map(([foodId, quantity]) => ({ ...getItemDetails(foodId), quantity }))
    .filter(Boolean);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <div className="container mx-auto mt-32 font-Italianno p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-Italianno text-center mb-10">
            Your Cart
          </h1>
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-lg sm:text-xl mb-4">Your cart is empty</p>
              <NavLink
                to="/menu"
                className="bg-tertiaryColor hover:bg-tertiaryColor2 text-white px-4 py-2 rounded-lg"
              >
                Continue Shopping
              </NavLink>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-4 sm:px-8 lg:px-32">
                {cartItems.map((item) => (
                  <div
                    key={item.food_id}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-lg"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-32 sm:h-40 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-lg sm:text-xl font-bold">
                      {item.name}
                    </h2>
                    <p className="text-base sm:text-lg font-medium mb-4">
                      ₹ {item.price}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() =>
                          handleDecrease(userData._id, item.food_id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg"
                      >
                        -
                      </button>
                      <span className="text-lg sm:text-xl font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrease(userData._id, item.food_id)
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                    <NavLink
                      to={`/order/${item.food_id}`}
                      className="mt-4 text-base sm:text-xl inline-block bg-tertiaryColor hover:bg-tertiaryColor2 text-white px-4 py-2 rounded-lg text-center w-full"
                    >
                      Order Now
                    </NavLink>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <NavLink
                    to="/menu"
                    className="bg-tertiaryColor hover:bg-tertiaryColor2 text-base sm:text-xl text-white px-4 py-2 rounded-lg"
                  >
                    Continue Shopping
                  </NavLink>
                  <button
                    onClick={handleCheckout}
                    className="bg-green-500 hover:bg-green-600 text-base sm:text-xl text-white px-4 py-2 rounded-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
