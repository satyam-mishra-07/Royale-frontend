import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function Checkout() {
  const { userData, menu, menuItems, clearCart, userAuthentication, loading } = useAuth();
  const [paymentType, setPaymentType] = useState('Cash On Delivery');
  const navigate = useNavigate();

  useEffect(() => {
    userAuthentication();
    menuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !userData || !userData.cart) {
    return (
      <div className="flex justify-center items-center h-screen bg-bgColor">
        <ClipLoader size={50} color={"#EF5A6F"} loading={loading} />
      </div>
    );
  }

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

  const cartItems = Object.entries(userData.cart)
    .map(([foodId, quantity]) => ({ ...getItemDetails(foodId), quantity }))
    .filter(Boolean);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const gst = totalPrice * 0.18;
  const deliveryCharge = 60;
  const grandTotal = totalPrice + gst + deliveryCharge;

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch('https://royale-backend.onrender.com/api/order/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData._id,
          cart: userData.cart,
          paymentType,
          payment: paymentType === 'Cash On Delivery' ? false : true,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        if (paymentType !== 'Cash On Delivery') {
          navigate(`/payment/${data.orderID}`);
        } else {
          navigate(`/order-confirmation/${data.orderID}`);
        }
        clearCart(userData._id);
      } else {
        console.error('Error placing order:', data);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="min-h-screen mt-36 bg-bgColor">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between bg-white shadow-lg rounded-lg p-4 sm:p-8">
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-cardColor rounded-lg mb-6 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-Italianno text-primaryColor mb-4">Delivery Details</h2>
          <p className="text-base sm:text-lg mb-2"><strong>Name:</strong> {userData.name}</p>
          <p className="text-base sm:text-lg mb-2"><strong>Email:</strong> {userData.email}</p>
          <p className="text-base sm:text-lg mb-2"><strong>Phone:</strong> {userData.phone}</p>
          <p className="text-base sm:text-lg mb-2"><strong>Address:</strong> {userData.address}</p>
        </div>
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-cardColor rounded-lg">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-Italianno text-primaryColor mb-4">Your Cart</h2>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.food_id} className="flex justify-between items-center text-base sm:text-lg text-tertiaryColor2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-Island text-tertiaryColor2 mb-4">Price Details</h2>
            <p className="text-base sm:text-lg"><strong>Total:</strong> ₹{totalPrice}</p>
            <p className="text-base sm:text-lg"><strong>GST (18%):</strong> ₹{gst.toFixed(2)}</p>
            <p className="text-base sm:text-lg"><strong>Delivery Charge:</strong> ₹{deliveryCharge}</p>
            <p className="text-base sm:text-lg font-bold"><strong>Grand Total:</strong> ₹{grandTotal.toFixed(2)}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-Island text-tertiaryColor2 mb-4">Payment Method</h2>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="block w-full p-2 sm:p-3 border border-tertiaryColor2 rounded-lg mb-4"
            >
              <option value="Cash On Delivery">Pay On Delivery</option>
              <option value="UPI/Online Payment">UPI/Online Payment</option>
            </select>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="bg-primaryColor hover:bg-tertiaryColor text-white px-6 py-3 rounded-lg text-base sm:text-lg w-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
