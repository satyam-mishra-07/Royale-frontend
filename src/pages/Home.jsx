import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const navigate = useNavigate();
  const { menu, menuItems, cartIncrease, cartDecrease, userAuthentication, userData, loading, isLoggedIn } = useAuth();

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
    if(isLoggedIn) {
    cartIncrease(userId, foodId);
    }else{
      navigate('/login');
    }
  };

  const handleDecrease = (userId, foodId) => {
    cartDecrease(userId, foodId);
  };

  const specialityItems = Object.values(menuData)
  .flat()
  .filter((item) => item.speciality);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
          {/* Hero Sections */}
          <div className="heroSection bg-[url('/Images/bg.png')] bg-cover bg-center bg-opacity-75 bg-gray-900 w-full h-screen">
            <div className="flex relative top-80 mx-10 flex-col justify-center items-start">
              <h1 className="lg:text-6xl text-4xl w-full top-0 lg:-mt-9 text-white lg:w-3/6 font-Italianno mt-14">
                Where Indian Elegance Meets Culinary Excellence
              </h1>
              <h4 className="lg:text-xl text-base mt-5 text-white">
                Indulge in Exquisite Flavors
              </h4>
              <NavLink
                to="/menu"
                className="bg-tertiaryColor hover:bg-primaryColor text-xl transition-all duration-200 ease-in-out text-white hover:text-black my-5 px-4 py-2 rounded-full"
              >
                View Menu
              </NavLink>
            </div>
          </div>

          {/* Section 1 */}

          <div className="my-5">
            <h1 className="text-5xl font-Italianno font-bold text-center mt-5">
              Our Specialties
            </h1>

            <div className="my-10 mx-10">
              {/* Grid to display items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {specialityItems.map((item) => (
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
                    <p className="text-lg font-medium mt-2 mb-4">₹ {item.price}</p>
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

            <div className="flex justify-center mt-10">
              <NavLink
                to="/menu"
                className="bg-tertiaryColor hover:bg-primaryColor text-lg transition-all duration-200 ease-in-out text-white hover:text-black my-5 px-4 py-2 rounded-full"
              >
                View More
              </NavLink>
            </div>
          </div>

          {/* Section 2 */}

          <div className="my-5">
            <h1 className="text-5xl font-Italianno font-bold text-center mt-5">
              Why Choose Us
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-10 mt-10">
              <div className="bg-cardColor p-4 font-Italianno rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out">
                <img
                  src="/Images/service1.jpg"
                  alt="Quality Food"
                  className="w-full h-60 object-cover rounded-lg"
                />
                <h1 className="text-3xl font-Island font-bold mt-2">Quality Food</h1>
                <p className="text-xl font-medium mt-2 mb-4">
                  We serve the best quality food
                </p>
              </div>

              <div className="bg-cardColor p-4 font-Italianno rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out">
                <img
                  src="/Images/service2.jpg"
                  alt="Fast Home Delivery"
                  className="w-full h-60 object-cover rounded-lg"
                />
                <h1 className="text-3xl font-Island font-bold mt-2">
                  Fast Home Delivery
                </h1>
                <p className="text-xl font-medium mt-2 mb-4">
                  We also deliver food at your doorstep
                </p>
              </div>

              <div className="bg-cardColor p-4 font-Italianno rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out">
                <img
                  src="/Images/service3.jpg"
                  alt="Fresh Ingredients"
                  className="w-full h-60 object-cover rounded-lg"
                />
                <h1 className="text-3xl font-Island font-bold mt-2">
                  Fresh Ingredients
                </h1>
                <p className="text-xl font-medium mt-2 mb-4">
                  Only the freshest ingredients for our dishes!
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}

          <div className="my-5">
            <h1 className="text-5xl font-Italianno font-bold text-center mt-5">
              Our Happy Customers
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-10 mt-10">
              <div className="bg-cardColor p-4 font-Italianno rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out">
                <img
                  src="/Images/customer1.jpg"
                  alt="Customer 1"
                  className="w-full h-60 object-cover rounded-lg"
                />
                <h1 className="text-3xl font-Island font-bold mt-2">John Doe</h1>
                <p className="text-xl font-medium mt-2 mb-4">
                  The food was delicious and the service was great!
                </p>
              </div>

              <div className="bg-cardColor p-4 font-Italianno rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out">
                <img
                  src="/Images/customer2.jpg"
                  alt="Customer 2"
                  className="w-full h-60 object-cover rounded-lg"
                />
                <h1 className="text-3xl font-Island font-bold mt-2">Jane Doe</h1>
                <p className="text-xl font-medium mt-2 mb-4">
                  The food was delicious and the service was great!
                </p>
              </div>

              <div className="bg-cardColor p-4 font-Italianno rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out">
                <img
                  src="/Images/customer3.jpg"
                  alt="Customer 3"
                  className="w-full h-60 object-cover rounded-lg"
                />
                <h1 className="text-3xl font-Island font-bold mt-2">Alice Doe</h1>
                <p className="text-xl font-medium mt-2 mb-4">
                  The food was delicious and the service was great!
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
