import React, { useState, useEffect } from "react";
import OrderList from "../../components/OrderList";
import Navbar from "../../components/Navbar";
import { postOrder, getMesaId } from "../../utils/api";
import { toast } from "react-toastify";

const Order = ({ order, setOrder }) => {
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState(0);
  const [tableId, setTableId] = useState();

  const tableWithId = 7;

  useEffect(() => {
    calculateTotal(order.items);

    const fetchTable = async () => {
      const table = await getMesaId(tableWithId);
      setTableId(table.id_mesa);
    };
    fetchTable();
  }, [order]);

  const calculateTotal = (items) => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = order.items.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    const updatedOrder = { ...order, items: updatedItems };
    setOrder(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
    calculateTotal(updatedItems);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = order.items.filter((item) => item.id !== id);
    const updatedOrder = { ...order, items: updatedItems };
    setOrder(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
    calculateTotal(updatedItems);
  };

  const handleNotesChange = (id, newNotes) => {
    const updatedItems = order.items.map((item) =>
      item.id === id ? { ...item, notes: newNotes } : item
    );
    const updatedOrder = { ...order, items: updatedItems };
    setOrder(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
  };

  const handleSendOrder = async (e) => {
    let orderDetails = [];

    order.items.forEach((item) => {
      let detail = {
        pedido: null,
        producto: item.idProduct,
        cantidad: item.quantity,
        comentarios: item.notes || "",
      };
      orderDetails.push(detail);
    });

    let orderData = {
      mesa: tableId,
      estado: "pendiente",
      detalles: orderDetails,
    };

    try {
      await postOrder(orderData);
      toast.success("Your order has been successfully sent!");
      localStorage.removeItem("order");
    } catch (error) {
      toast.error("Your order couldn't be sent, please try again!");
    }
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
      <div className="mt-4 font-bold text-lg">Total: $ {total.toFixed(2)}</div>
      <button
        className="bg-purple-500 text-white text-base font-bold px-5 h-12 rounded-full w-full mt-4"
        onClick={(e) => {
          handleSendOrder(e);
          localStorage.removeItem("order");
        }}
      >
        Place Order
      </button>
    </div>
  );
};

export default Order;
