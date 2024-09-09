import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function Footer() {
  
  const { userData, userAuthentication } = useAuth();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    userAuthentication();
  }, []);

  const [user, setUser] = useState(true);

  if (user && userData) {
    
    setContact({
      name: userData.name,
      email: userData.email,
      message: "",
    });
    setUser(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", contact);
    const url = `http://localhost:3000/api/form/contact`
    try {
      const response = await fetch(url,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact)
      });
      console.log(response);
      const res_data = await response.json();
      if (response.ok) {
        toast.success(res_data.message);
        setContact({
          username: userData.name,
          email: userData.email,
          message: "",
        });
      }else{
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <footer className="bg-gray-900 p-10 text-white mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={contact.name}
                placeholder="Your Name"
                onChange={handleChange}
                className="p-2 text-lg font-serif rounded-lg border border-gray-700 bg-gray-800 text-white"
              />
              <input
                type="email"
                name="email"
                value={contact.email}
                placeholder="Your Email"
                onChange={handleChange}
                className="p-2 text-lg font-serif rounded-lg border border-gray-700 bg-gray-800 text-white"
              />
              <textarea
                name="message"
                value={contact.message}
                placeholder="Your Message"
                onChange={handleChange}
                className="p-2 text-lg font-serif rounded-lg border border-gray-700 bg-gray-800 text-white"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="bg-primaryColor hover:bg-tertiaryColor text-xl transition-all duration-200 ease-in-out text-white hover:text-black my-5 px-4 py-2 rounded-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Site Map */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Site Map</h2>
            <ul className="space-y-2">
              <NavLink to="/" className="hover:underline">
                <li className="text-xl font-medium hover:underline transform hover:-translate-y-1 hover:scale-100 transition-all duration-300 ease-in-out">
                  Home
                </li>
              </NavLink>
              <NavLink to="/menu" className="hover:underline">
                <li className="text-xl font-medium hover:underline transform hover:-translate-y-1 hover:scale-100 transition-all duration-300 ease-in-out">
                  Menu
                </li>
              </NavLink>
              <NavLink to="/dine-in" className="hover:underline">
                <li className="text-xl font-medium hover:underline transform hover:-translate-y-1 hover:scale-100 transition-all duration-300 ease-in-out">
                  Dine In
                </li>
              </NavLink>
              <NavLink to="/about" className="hover:underline">
                <li className="text-xl font-medium hover:underline transform hover:-translate-y-1 hover:scale-100 transition-all duration-300 ease-in-out">
                  About Us
                </li>
              </NavLink>
            </ul>
          </div>

          {/* Social Media and Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Follow Us</h2>
            <ul className="space-y-2">
              <a
                href="https://linktr.ee/satyam.mishra"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className="text-xl font-medium hover:underline transform hover:-translate-y-1 hover:scale-100 transition-all duration-300 ease-in-out">
                  Linktree
                </li>
              </a>
              <a
                href="https://www.instagram.com/satyam_mishra_88/"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className="text-xl font-medium hover:underline transform hover:-translate-y-1 hover:scale-100 transition-all duration-300 ease-in-out">
                  Instagram
                </li>
              </a>

              <a
                href="https://github.com/satyam-mishra-88"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className="text-xl font-medium hover:underline transform hover:-translate-y-1 hover:scale-100 transition-all duration-300 ease-in-out">
                  GitHub
                </li>
              </a>
            </ul>
            <h2 className="text-3xl font-bold mt-3 mb-4">Contact Info</h2>
            <a target="_blank" href="mailto:satyammishrakumar39@gmail.com">
              <p className="text-xl font-medium hover:underline transform hover:-translate-y-1 hover:scale-100 transition-all duration-300 ease-in-out">
                Email Us
              </p>
            </a>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d913.854532950555!2d87.11548316953268!3d23.62519222737483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7113bc06cf405%3A0xfa3cdcffb64cd569!2sAlpina%20Apartment%2010%2FA%20East%20NSB%20Road%2C%20beside%20Mihir%20Bag%20Gym%2C%20Raniganj%2C%20West%20Bengal%20713358!5e0!3m2!1sen!2sin!4v1719171627797!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="text-center mt-10 text-sm">
        &copy; 2024 Royale. All rights reserved.
      </div>
    </footer>
  );
}