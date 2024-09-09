import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { CgProfile } from "react-icons/cg";
import { FaOpencart } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Navbar() {
  const { userData, userAuthentication, isLoggedIn, isMenuOpen, setIsMenuOpen } = useAuth();
  

  useEffect(() => {
    userAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-navBg py-7 px-5 flex justify-between items-center text-white absolute top-0 left-0 z-20 w-full">
        <div className="logo">
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
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-white"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </IconContext.Provider>
        </div>

        {/* Menu for Mobile */}
        <div
          className={`${
            isMenuOpen ? "flex flex-col items-start space-y-6 pt-10" : "hidden"
          } lg:flex flex-col lg:flex-row lg:items-center lg:w-auto w-full absolute lg:static top-0 left-0 mt-28 lg:mt-0 bg-navBg lg:bg-transparent lg:h-auto z-20 p-8`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-6 list-none">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
              <li className="text-3xl font-Italianno hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Home
              </li>
            </NavLink>
            <NavLink to="/menu" onClick={() => setIsMenuOpen(false)}>
              <li className="text-3xl font-Italianno hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Menu
              </li>
            </NavLink>
            <NavLink to="/dine-in" onClick={() => setIsMenuOpen(false)}>
              <li className="text-3xl font-Italianno hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Dine In
              </li>
            </NavLink>
            <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
              <li className="text-3xl font-Italianno hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                About Us
              </li>
            </NavLink>
            {isLoggedIn && userData.isAdmin && (
              <NavLink to="/admin" onClick={() => setIsMenuOpen(false)}>
                <li className="text-3xl font-Italianno hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                  Admin
                </li>
              </NavLink>
            )}
          </ul>
        </div>

        {/* Icons Section */}
        <div className="hidden lg:flex flex-row gap-6 items-center">
          {isLoggedIn ? (
            <IconContext.Provider
              value={{ size: "1.7em", className: "global-class-name" }}
            >
              <div className="flex flex-row gap-6">
                <NavLink
                  to="/cart"
                  className="hover:cursor-pointer rounded-2xl px-3 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                  <FaOpencart />
                </NavLink>
                <NavLink
                  to={`/profile/${userData._id}`}
                  className="hover:cursor-pointer rounded-2xl px-3 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                  <CgProfile />
                </NavLink>
              </div>
            </IconContext.Provider>
          ) : (
            <>
              <NavLink
                to="/register"
                className="text-3xl font-Italianno hover:cursor-pointer px-3 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Sign up
              </NavLink>
              <NavLink
                to="/login"
                className="text-3xl font-Italianno hover:cursor-pointer px-3 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Log In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}
