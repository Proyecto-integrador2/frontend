import React from 'react';

const DrinkItem = ({ name, ingredients, price, imgUrl, onAddToOrder }) => (
  <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-xl mb-4 shadow-lg bg-white">
    <div className="w-full md:w-1/3 rounded-xl overflow-hidden">
      <div className="aspect-square w-full h-full">
        <img
          src={imgUrl}
          alt={name}
          className="object-cover w-full h-full"
          style={{ minWidth: "150px", maxWidth: "100%" }}
        />
      </div>
    </div>
    <div className="flex-grow flex flex-col gap-2 p-4 md:w-2/3 justify-between">
      <div>
        <p className="text-[#1c110d] text-lg font-bold">{name}</p>
        <p className="text-purple-500 text-sm">Ingredients: {ingredients.join(', ')}</p>
        <p className="text-[#9c5e49] text-sm font-bold">Price: ${price}</p>
      </div>
      <button
        className="bg-purple-500 text-white rounded-full h-10 px-6 text-sm font-medium mt-2 self-start md:self-end"
        onClick={() => {
          if (typeof onAddToOrder === 'function') {
            onAddToOrder({ name, ingredients, price, imgUrl });
          } else {
            console.error('onAddToOrder is not a function');
          }
        }}
      >
        Add to order
      </button>
    </div>
  </div>
);

export default DrinkItem;
