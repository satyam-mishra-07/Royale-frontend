import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const URL = "http://localhost:3000/api/auth/login";
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const {storeTokenInLS} = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res_data = await response.json();
      console.log(res_data);
      if (response.ok) {
        storeTokenInLS(res_data.token); //If we dont do default export then we have to use { storeTokenInLS }
        toast.success("Login Successful");
        setFormData({
          email: "",
          password: "",
        });

        navigate("/");
      } else {
        toast.error("Invalid Credentials");
      }
      console.log(response);
    } catch (error) {
      toast.error(`Server Error: ${error}`);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-bgColor font-Round">
      <div className="bg-cardColor p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="email">Email</label>
            <input className="w-full p-2 border rounded" type="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="password">Password</label>
            <input className="w-full p-2 border rounded" type="password" id="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button className="w-full p-2 bg-tertiaryColor text-white rounded hover:bg-tertiaryColor2" type="submit">Login</button>
        </form>
        <div className="text-center mt-4">
          <Link to="/register" className="text-btnColor1 hover:text-btnColor2">New User? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
