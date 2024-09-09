import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import Navbar from '../components/Navbar';

const Order = () => {
  const [order, setOrder] = useState({ items: [] });
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Recupera la orden almacenada en el localStorage al inicializar
    const storedOrder = JSON.parse(localStorage.getItem('order')) || { items: [] };
    setOrder(storedOrder);
  }, []);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="p-4">
      <Navbar />
      <OrderList items={order.items} />
      <div className="mt-4">
        <textarea
          placeholder="Add notes to your order..."
          value={notes}
          onChange={handleNotesChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        className="bg-purple-500 text-white text-base font-bold px-5 h-12 rounded-full w-full mt-4"
        onClick={() => {
          console.log('Order placed with notes:', notes);
          // Opcionalmente puedes limpiar la orden aquí
          localStorage.removeItem('order');
        }}
      >
        Place Order
      </button>
    </div>
  );
};

export default Order;
