import React, { useState } from 'react';

const OrderItem = ({ item, onRemove, onQuantityChange, onNotesChange }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [notes, setNotes] = useState('');

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    onNotesChange(item.id, e.target.value); 
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl">
      <div className="flex items-stretch justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[#1c110d] text-base font-bold">{item.name}</p>
          <p className="text-[#9c5e49] text-sm font-normal">Ingredients: {item.ingredients.join(', ')}</p>
          <p className="text-[#9c5e49] text-sm font-bold">Price: ${item.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-[#f4eae7] text-[#1c110d] px-2 h-8 rounded-full" onClick={handleDecrease}>
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="w-12 text-center p-1 border border-gray-300 rounded-md"
          />
          <button className="bg-[#f4eae7] text-[#1c110d] px-2 h-8 rounded-full" onClick={handleIncrease}>
            +
          </button>
          <button
            className="bg-[#f4eae7] text-[#1c110d] text-sm px-4 h-8 rounded-full"
            onClick={() => onRemove(item.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="purple">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
          </button>
        </div>
      </div>
      <textarea
        placeholder="Add notes for this item..."
        value={notes}
        onChange={(e) => handleNotesChange(e)}
        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default OrderItem;