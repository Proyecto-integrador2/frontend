import React from 'react';

const OrderItem = ({ item }) => {
  return (
    <div className="flex items-stretch justify-between gap-4 rounded-xl p-4">
      <div className="flex flex-col gap-1">
        <p className="text-[#1c110d] text-base font-bold">{item.name}</p>
        <p className="text-[#9c5e49] text-sm font-normal">{item.description}</p>
      </div>
      <button className="bg-[#f4eae7] text-[#1c110d] text-sm px-4 h-8 rounded-full">Remove</button>
    </div>
  );
};

export default OrderItem;
