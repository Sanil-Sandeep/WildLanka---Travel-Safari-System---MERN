import React, { useState, useEffect } from 'react';
import { getCart, saveCart } from "../Cart/utils/cart";
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemoveItem = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    saveCart(newCart);
  };

  const handleBuyNow = () => {
    // Pass cart items to CreatePayments page
    navigate('/payments/create', { state: { cartItems } });
  };

  const goToHome = () => {
    navigate('/products/card'); // This navigates to the home page
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  if (cartItems.length === 0) {
    return <div className="text-center p-8">Your cart is empty</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.productName}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{formatCurrency(item.price)}</td>
              <td className="border px-4 py-2">{formatCurrency(item.quantity * item.price)}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
       <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={goToHome}
       >
         Home
       </button>

       <button
         className="bg-green-500 text-white px-4 py-2 rounded-lg"
         onClick={handleBuyNow}
       >
         Buy Now
       </button>
      </div>
    </div>
  );
};

export default CartPage;
