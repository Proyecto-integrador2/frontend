import React from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ items, onRemove, onQuantityChange }) => {
  if (!Array.isArray(items)) {
    console.error('Expected items to be an array, but got:', items);
    return <p>There was an error loading the order items.</p>;
  }

  return (
    <div className="p-4">
      {items.length > 0 ? (
        items.map((item) => (
          <OrderItem key={item.id} item={item} onRemove={onRemove} onQuantityChange={onQuantityChange} />
        ))
      ) : (
        <p>Your order is empty.</p>
      )}
    </div>
  );
};

export default OrderList;
