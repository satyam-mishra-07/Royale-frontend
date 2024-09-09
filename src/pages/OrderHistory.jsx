import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const {
    menu,
    menuItems,
    userAuthentication,
    userData,
    loading,
    token 
  } = useAuth();
  
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      await userAuthentication();
      setIsAuthenticated(true);
    };
    
    authenticateUser();
    menuItems();
  }, []);

  useEffect(() => {
    if (isAuthenticated && userData && userData._id) {
      fetchOrderHistory();
    }
  }, [isAuthenticated, userData]);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch(
        `https://royale-backend.onrender.com/api/order/orderHistory?userID=${userData._id}`, // Correct URL with userID
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setOrders(data.reverse());
      } else {
        console.error('Error fetching order history:', data);
        toast.error('Failed to fetch order history.');
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
      toast.error('Failed to fetch order history.');
    }
  };

  if (loading || !userData || !orders.length) {
    return (
      <div className="flex justify-center items-center h-screen bg-bgColor">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
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
  
  
  
  return (
    <div className="min-h-screen mt-36 bg-bgColor px-4 sm:px-8">
      <h2 className="text-5xl font-Italianno text-center text-tertiaryColor mb-8">Order History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div key={order.orderId} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-tertiaryColor2 mb-4">Order ID: {order.orderId}</h3>
            <ul className="space-y-2">
              {Object.entries(order.cart).map(([foodId, quantity]) => {
                const item = getItemDetails(foodId);
                if (!item) return null;
                return (
                  <li key={foodId} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <span className="text-lg font-medium">{item.name} x {quantity}</span>
                    </div>
                    <span className="text-lg">₹{item.price * quantity}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4">
              <p className="text-lg"><strong>Payment Type:</strong> {order.paymentType}</p>
              <p className="text-lg"><strong>Payment Status:</strong> {order.payment ? 'Paid' : 'Pending'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
