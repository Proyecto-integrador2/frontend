import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import './OrderItem.css'; // Importa el archivo CSS para estilos específicos

const OrderItem = ({ item, onRemove, onNotesChange }) => {
  const { order, updateOrder } = useContext(OrderContext);
  const notes = item.notes || '';

  const handleIncrease = () => {
    const newQuantity = item.quantity + 1;
    updateOrderQuantity(item.idProduct, newQuantity);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      updateOrderQuantity(item.idProduct, newQuantity);
    }
  };

  const updateOrderQuantity = (idProduct, newQuantity) => {
    const updatedItems = order.items.map((storedItem) =>
      storedItem.idProduct === idProduct
        ? { ...storedItem, quantity: newQuantity }
        : storedItem
    );
    updateOrder({ items: updatedItems });
  };

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    onNotesChange(item.id, newNotes);
  };

  return (
    <div className="order-item-container">
      <div className="order-item-header">
        <div className="order-item-details">
          <p className="order-item-name">{item.name}</p>
          <p className="order-item-ingredients">Ingredients: {item.ingredients.join(', ')}</p>
          <p className="order-item-price">Price: ${item.price}</p>
        </div>
        <div className="order-item-controls">
          <button className="control-button decrease" onClick={handleDecrease}>-</button>
          <input
            type="number"
            value={item.quantity}
            readOnly
            className="quantity-input"
          />
          <button className="control-button increase" onClick={handleIncrease}>+</button>
          <button
            className="remove-button"
            onClick={() => {
              if (window.confirm(`Are you sure you want to remove ${item.name}?`)) {
                onRemove(item.id);
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="purple">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
          </button>
        </div>
      </div>
      <textarea
        placeholder="Add notes for this item..."
        value={notes}
        onChange={handleNotesChange}
        className="notes-textarea"
      />
    </div>
  );
};

export default OrderItem;