import React from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ items }) => {
  return (
    <div className="p-4">
      {items.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default OrderList;
