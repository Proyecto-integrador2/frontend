// OrderContext.js
import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order')) || { items: [] });

  const updateOrder = (newOrder) => {
    setOrder(newOrder);
    localStorage.setItem('order', JSON.stringify(newOrder));
  };

  return (
    <OrderContext.Provider value={{ order, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};