import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("JSON Web Token"));
  const [userData, setUserData] = useState("");
  const [orders, setOrders] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const storeTokenInLS = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("JSON Web Token", jwtToken);
  };

  const [menu, setMenu] = useState([]);

  const menuItems = async () => {
    
    try {
      setLoading(true);
      const url = "http://localhost:3000/api/data/menu";
      const response = await fetch(url, {
        method: "GET"
      });
      if (response.ok) {
        const data = await response.json();
        setMenu(data.message[0]);
      } else {
        console.error("Failed to fetch menu items");
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const LogoutUser = () => {
    setToken("");
    // console.log(isLoggedIn);
    return localStorage.removeItem("JSON Web Token");
  };

  const clearCart = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/cart/clear-cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });
      if (response.ok) {
        console.log('Cart cleared');
      } else {
        console.error('Failed to clear cart');
      }
      const data = await response.json();
      setUserData((prevData) => ({
        ...prevData,
        cart: data.cart,
      }));
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };


  const userAuthentication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const user_data = await response.json();
        setUserData(user_data.userData);
      } else {
        console.error("Failed to authenticate user");
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  const cartIncrease = async (userId, foodId) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/cart/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, foodId })
      });
      if (response.ok) {
        console.log('Item added to cart');
      }
      const data = await response.json();
      setUserData((prevData) => ({
        ...prevData,
        cart: data.cart,
      }));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const cartDecrease = async (userId, foodId) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/cart/remove-from-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, foodId })
      });
      if (response.ok) {
        console.log('Item removed from cart');
      }
      const data = await response.json();
      setUserData((prevData) => ({
        ...prevData,
        cart: data.cart,
      }));
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false)
    }
  };

  let isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        storeTokenInLS,
        isLoggedIn,
        userData,
        menu,
        menuItems,
        LogoutUser,
        userAuthentication,
        cartIncrease,
        cartDecrease,
        clearCart,
        orders,
        setOrders,
        isMenuOpen, 
        setIsMenuOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of AuthProvider");
  }
  return authContextValue;
};
