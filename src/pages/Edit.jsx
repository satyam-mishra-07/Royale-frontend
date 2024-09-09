import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import ClipLoader from "react-spinners/ClipLoader"; // Make sure you have this import
import { toast } from "react-toastify";

export default function Edit() {
  const { userAuthentication, userData, loading, token } = useAuth();
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    userAuthentication(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (userData) {
      setFormData({
        _id: userData._id || "",
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || ""
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      _id: userData._id,
    }));
    console.log(formData);
  
    const response = await fetch("https://royale-backend.onrender.com/api/auth/update", {
      method: "PUT",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    if (response.ok) {
      const data = await response.json();
      toast.success("Data Updated");
      console.log("Response", data);
    } else {
      const errorText = await response.text();
      toast.error(`Data Not Updated: ${errorText}`);
      console.error("Error:", errorText);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-bgColor">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <div className="min-h-screen bg-bgColor mt-36 p-8">
          <div className="max-w-3xl mx-auto bg-cardColor p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-Italianno text-center mb-8 text-tertiaryColor">
              Edit Your Information
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xl font-semibold text-secondaryColor">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-btnColor1"
                />
              </div>
              <div>
                <label className="block text-xl font-semibold text-secondaryColor">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-btnColor1"
                />
              </div>
              <div>
                <label className="block text-xl font-semibold text-secondaryColor">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-btnColor1"
                />
              </div>
              <div>
                <label className="block text-xl font-semibold text-secondaryColor">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-btnColor1"
                  rows="4"
                />
              </div>
              <div className="flex justify-between items-center mt-8">
                <button
                  type="submit"
                  className="bg-btnColor1 hover:bg-btnColor2 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-200 ease-in-out"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-secondaryColor hover:bg-tertiaryColor text-white py-2 px-6 rounded-lg font-semibold transition-all duration-200 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
