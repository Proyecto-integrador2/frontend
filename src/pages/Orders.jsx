import React from 'react';
import OrderItem from '../components/OrderItem';

const Orders = ({ orders }) => {
  return (
    <div className="p-4">
      {orders.map((order) => (
        <div key={order.id} className="flex flex-col gap-4 border-b border-[#e8d5ce] py-4">
          <OrderItem item={order} />
          <button className="bg-[#f2460d] text-[#fcf9f8] text-base font-bold px-5 h-10 rounded-full w-full mt-4">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default Orders;
