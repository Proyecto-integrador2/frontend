import React, { useEffect, useContext, useState } from 'react';
import OrderList from '../../components/OrderList';
import Navbar from '../../components/Navbar';
import { postOrder, getMesaId } from '../../utils/api';
import { toast } from 'react-toastify';
import { OrderContext } from '../../context/OrderContext';

const Order = () => {
  const { order, updateOrder } = useContext(OrderContext);
  const [total, setTotal] = useState(0);
  const [tableId, setTableId] = useState(null);
  const tableWithId = 7;

  useEffect(() => {
    calculateTotal(order.items);

    const fetchTable = async () => {
      const table = await getMesaId(tableWithId);
      setTableId(table.id_mesa);
    };
    fetchTable();

    const handleStorageChange = () => {
      const updatedOrder = JSON.parse(localStorage.getItem('order')) || { items: [] };
      updateOrder(updatedOrder);
      calculateTotal(updatedOrder.items);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [order, updateOrder]);

  const calculateTotal = (items) => {
    const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = order.items.filter((item) => item.id !== id);
    const updatedOrder = { ...order, items: updatedItems };
    updateOrder(updatedOrder);
    calculateTotal(updatedItems);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = order.items.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    const updatedOrder = { ...order, items: updatedItems };
    updateOrder(updatedOrder);
    calculateTotal(updatedItems);
  };

  const handleNotesChange = (id, newNotes) => {
    const updatedItems = order.items.map((item) =>
      item.id === id ? { ...item, notes: newNotes } : item
    );
    const updatedOrder = { ...order, items: updatedItems };
    updateOrder(updatedOrder);
  };

  const handleSendOrder = async () => {
    if (order.items.length === 0) {
      alert("No se puede realizar un pedido vacío.");
      return;
    }

    let orderDetails = order.items.map(item => ({
      "pedido": null,
      "producto": item.idProduct,
      "cantidad": item.quantity,
      "comentarios": item.notes || ''
    }));

    let orderData = {
      "mesa": tableWithId,
      "estado": "pendiente",
      "detalles": orderDetails,
      "precio_pedido": total
    };

    try {
      await postOrder(orderData);
      toast.success("Your order has been successfully sent!");
      localStorage.removeItem('order');
      updateOrder({ ...order, items: [] });
      calculateTotal([]);
    } catch (error) {
      console.error("Ocurrió el siguiente error: ", error.response.data)
      toast.error("Your order couldn't be sent, please try again!");
    }
    
    // window.location.reload();
  };

  return (
    <div className="p-4 pb-24">
      <Navbar />
      <OrderList
        items={order.items}
        onRemove={handleRemoveItem}
        onQuantityChange={handleQuantityChange}
        onNotesChange={handleNotesChange}
      />
      <div className="mt-4 font-bold text-2xl">
        Total: $ {total.toFixed(2)}
      </div>
      <button
        className="bg-purple-500 text-white text-2xl font-bold px-5 h-12 rounded-full w-full mt-4"
        onClick={handleSendOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default Order;