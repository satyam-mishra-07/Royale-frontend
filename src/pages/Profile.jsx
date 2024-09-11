import React, { useEffect } from "react";
import { useAuth } from "../store/auth";
import { ClipLoader } from "react-spinners";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const { userAuthentication, userData, loading, LogoutUser } = useAuth();

  useEffect(() => {
    userAuthentication(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#EF5A6F"} loading={loading} />
        </div>
      ) : (
        <div className="container mx-auto mt-36 p-8 font-Island rounded-lg bg-bgColor">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-32 h-32">
              <div className="w-full h-full bg-secondaryColor text-4xl rounded-full flex items-center justify-center text-primaryColor font-bold">
                {userData.name ? userData.name.charAt(0) : "U"}
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-tertiaryColor mb-4">
                {userData.name || "User"}
              </h1>
              <p className="text-xl text-tertiaryColor3 mb-2">
                <strong>Email:</strong> {userData.email || "No Email Provided"}
              </p>
              <p className="text-xl text-tertiaryColor3 mb-2">
                <strong>Phone:</strong> {userData.phone || "No Phone Provided"}
              </p>
              <p className="text-xl text-tertiaryColor3">
                <strong>Address:</strong> {userData.address || "No Address Provided"}
              </p>
            </div>
          </div>

          <div className="flex justify-center flex-wrap space-x-4 mt-8">
            <NavLink
              to={`/profile/${userData._id}/edit`}
              className="flex items-center justify-center mx-2 my-2 bg-primaryColor hover:bg-tertiaryColor text-white font-medium text-lg py-2 px-6 rounded-full shadow-md transition duration-300"
            >
              Edit Profile
            </NavLink>
            <NavLink
              to="/order-history"
              className="flex items-center justify-center mx-2 my-2 bg-primaryColor hover:bg-tertiaryColor text-white font-medium text-lg py-2 px-6 rounded-full shadow-md transition duration-300"
            >
              Order History
            </NavLink>
            <NavLink
              to="/cart"
              className="flex items-center justify-center mx-2 my-2 bg-primaryColor hover:bg-tertiaryColor text-white font-medium text-lg py-2 px-6 rounded-full shadow-md transition duration-300"
            >
              View Cart
            </NavLink>
            <NavLink
              to="/logout"
              onClick={LogoutUser}
              className="flex items-center justify-center mx-2 my-2 bg-primaryColor hover:bg-tertiaryColor text-white font-medium text-lg py-2 px-6 rounded-full shadow-md transition duration-300"
            >
              Logout
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
