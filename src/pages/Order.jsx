import React from 'react';
import OrderList from '../components/OrderList';
import Navbar from '../components/Navbar';

const Order = ({ order }) => {
  return (
    <div className="p-4">
      < Navbar />
      <OrderList items={order.items} />
      <button className="bg-[#f2460d] text-[#fcf9f8] text-base font-bold px-5 h-12 rounded-full w-full mt-4">
        Place Order
      </button>
    </div>
  );
};

export default Order;
