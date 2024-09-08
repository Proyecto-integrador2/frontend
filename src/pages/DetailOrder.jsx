import React from 'react';

const DetailOrder = ({ order }) => {
  return (
    <div className="p-4">
      <h2 className="text-[#1c110d] text-lg font-bold">Order Details</h2>
      <div className="border-b border-[#e8d5ce] py-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <p className="text-[#1c110d]">{item.name}</p>
            <p className="text-[#9c5e49]">{item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailOrder;
