import React, { useState } from 'react';

const OrderItem = ({ item, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-stretch justify-between gap-4 rounded-xl p-4">
      <div className="flex flex-col gap-1">
        <p className="text-[#1c110d] text-base font-bold">{item.name}</p>
        <p className="text-[#9c5e49] text-sm font-normal">{item.description}</p>
        <p className="text-[#9c5e49] text-sm font-bold">Price: ${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 p-1 border border-gray-300 rounded-md"
        />
        <button
          className="bg-[#f4eae7] text-[#1c110d] text-sm px-4 h-8 rounded-full"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
