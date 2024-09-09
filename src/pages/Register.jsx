import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

const Register = () => {

  const navigate = useNavigate();

  const URL = "http://localhost:3000/api/auth/register";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const { storeTokenInLS } = useAuth();

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
        toast.success("Registered Successfully");
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          password: ''
        });

        console.log(formData)

        navigate("/");
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error(`Register Error: ${error}`);
    }
  };

  const [type, setType] = useState("password");

  return (
    <div className="mt-32 min-h-screen flex items-center justify-center bg-bgColor font-Round">
      <div className="bg-cardColor p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="name">Name</label>
            <input className="w-full p-2 border rounded" type="text" id="name" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="email">Email</label>
            <input className="w-full p-2 border rounded" type="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="phone">Phone</label>
            <input className="w-full p-2 border rounded" type="text" id="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="address">Address</label>
            <input className="w-full p-2 border rounded" type="text" id="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="password">Password</label>
            <input className="w-full p-2 border rounded" type={type} id="password" value={formData.password} onChange={handleChange} required />
            <input className="mt-5" type="checkbox" id='box' onClick={() => setType(type === "password" ? "text" : "password")} />
            <label className="text-sm font-Round mx-5" htmlFor='box'>Show Password</label>
          </div>
          <button className="w-full p-2 bg-tertiaryColor text-white rounded hover:bg-tertiaryColor2" type="submit">Register</button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-btnColor1 hover:text-btnColor2">Existing Customer? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
