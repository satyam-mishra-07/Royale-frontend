import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import ClipLoader from "react-spinners/ClipLoader"; // Import spinner component

export default function Menu() {
  const navigate = useNavigate();
  const {
    menu,
    menuItems,
    cartIncrease,
    isLoggedIn,
    cartDecrease,
    userAuthentication,
    userData,
    loading,
  } = useAuth();

  useEffect(() => {
    userAuthentication();
    menuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { _id, ...menuData } = menu;

  // Function to check if foodId is in the cart object
  const isInCart = (foodId) => {
    return userData.cart && userData.cart[foodId];
  };

  const handleIncrease = (userId, foodId) => {
    if (isLoggedIn) {
      cartIncrease(userId, foodId);
      console.log(userData.cart);
    } else {
      navigate("/login");
    }
  };

  const handleDecrease = (userId, foodId) => {
    cartDecrease(userId, foodId);
    console.log(userData.cart);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <div className="relative text-gray-900">
          <h1 className="text-6xl font-bold font-Italianno text-center mt-36 mb-10">
            Our Menu
          </h1>
          {Object.keys(menuData).map((category) => (
            <div key={category} className="my-10 mx-10">
              <h2 className="font-bold font-Italianno text-6xl mb-5 border-b-4 border-secondaryColor inline-block">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menuData[category].map((item) => (
                  <div
                    key={item.food_id}
                    className="bg-white p-6 font-Italianno rounded-xl shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h1 className="text-xl font-bold mt-2">{item.name}</h1>
                    <p className="text-lg font-medium mt-2 mb-4">
                      ₹ {item.price}
                    </p>
                    <div className="flex justify-between items-center space-x-2">
                      {isInCart(item.food_id) ? (
                        <div className="flex justify-between mx-auto items-center mb-3 mt-4 space-x-2">
                        <button
                          onClick={() => handleDecrease(userData._id, item.food_id)}
                          className="bg-red-500 hover:bg-red-600 text-white w-9 px-4 py-2 rounded-lg text-xl font-semibold flex justify-center items-center h-9"
                        >
                          -
                        </button>
                        <span className="text-xl px-16 font-semibold">{userData.cart[item.food_id]}</span> {/* Display quantity */}
                        <button
                          onClick={() => handleIncrease(userData._id, item.food_id)}
                          className="bg-green-500 hover:bg-green-600 text-white w-9 px-4 py-2 rounded-lg text-xl font-semibold flex justify-center items-center h-9"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleIncrease(userData._id, item.food_id)}
                        className="bg-primaryColor hover:bg-tertiaryColor text-xl w-full transition-all duration-200 ease-in-out text-white  my-5 px-4 py-2 rounded-full"
                      >
                        Add to Cart
                      </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
