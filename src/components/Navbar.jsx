import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Navbar() {
  const { userData, userAuthentication, isLoggedIn, isMenuOpen, setIsMenuOpen } = useAuth();

  useEffect(() => {
    userAuthentication();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-navBg py-4 px-8 flex justify-between items-center text-white absolute top-0 left-0 z-20 w-full">
        {/* Logo with added margin and padding */}
        <div className="logo mr-8 py-2">
          <NavLink
            to="/"
            className="text-5xl font-Italianno text-white transition-all duration-300"
          >
            Royale
          </NavLink>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="lg:hidden">
          <IconContext.Provider value={{ size: "2em" }}>
            <button onClick={toggleMenu} className="focus:outline-none text-white">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </IconContext.Provider>
        </div>

        {/* Menu for Mobile */}
        <div
          className={`${
            isMenuOpen ? "flex flex-col items-start pt-10 space-y-6" : "hidden"
          } lg:flex lg:flex-row lg:items-center lg:w-auto w-full absolute lg:static top-0 left-0 mt-20 lg:mt-0 bg-navBg lg:bg-transparent lg:h-auto z-20 p-4 lg:p-0`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-10 list-none lg:items-center">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
              <li className="text-xl hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Home
              </li>
            </NavLink>
            <NavLink to="/menu" onClick={() => setIsMenuOpen(false)}>
              <li className="text-xl hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Menu
              </li>
            </NavLink>
            <NavLink to="/dine-in" onClick={() => setIsMenuOpen(false)}>
              <li className="text-xl hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Dine In
              </li>
            </NavLink>
            <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
              <li className="text-xl hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                About Us
              </li>
            </NavLink>

            {/* Profile and Cart in Mobile Menu */}
            {isLoggedIn ? (
              <div className="flex flex-row lg:hidden gap-6 mt-6">
                <NavLink
                  to="/cart"
                  className="text-xl hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                </NavLink>
                <NavLink
                  to={`/profile/${userData._id}`}
                  className="text-xl hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-row lg:hidden gap-6 mt-6">
                <NavLink
                  to="/register"
                  className="text-xl hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-xl hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              </div>
            )}
          </ul>
        </div>

        {/* Icons Section for Desktop */}
        <div className="hidden lg:flex flex-row gap-8 items-center">
          {isLoggedIn ? (
            <>
              <NavLink
                to="/cart"
                className="text-xl hover:cursor-pointer px-3 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Cart
              </NavLink>
              <NavLink
                to={`/profile/${userData._id}`}
                className="text-xl hover:cursor-pointer px-3 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                My Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className="text-xl hover:cursor-pointer px-3 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="text-xl hover:cursor-pointer px-3 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}
