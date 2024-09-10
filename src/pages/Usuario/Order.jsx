// src/pages/Usuario/Order.jsx
import React, { useState, useEffect } from 'react';
import OrderList from '../../components/OrderList';
import Navbar from '../../components/Navbar';

const Order = ({ order, setOrder }) => {
  const [notes, setNotes] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [order.items]);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = order.items.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    const updatedOrder = { ...order, items: updatedItems };
    setOrder(updatedOrder);
    localStorage.setItem('order', JSON.stringify(updatedOrder));
  };

  const handleRemoveItem = (id) => {
    const updatedItems = order.items.filter((item) => item.id !== id);
    const updatedOrder = { ...order, items: updatedItems };
    setOrder(updatedOrder);
    localStorage.setItem('order', JSON.stringify(updatedOrder));
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="p-4 pb-24">
      <Navbar />
      <OrderList 
        items={order.items} 
        onRemove={handleRemoveItem} 
        onQuantityChange={handleQuantityChange} 
      />
      <div className="mt-4">
        <textarea
          placeholder="Add notes to your order..."
          value={notes}
          onChange={handleNotesChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-4 font-bold text-lg">
        Total: ${total.toFixed(2)}
      </div>
      <button
        className="bg-purple-500 text-white text-base font-bold px-5 h-12 rounded-full w-full mt-4"
        onClick={() => {
          console.log('Order placed with notes:', notes);
          localStorage.removeItem('order');
        }}
      >
        Place Order
      </button>
    </div>
  );
};

export default Order;
