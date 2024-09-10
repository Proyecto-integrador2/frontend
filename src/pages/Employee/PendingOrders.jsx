import React, { useState, useEffect } from 'react';
import CardOrder from './CardOrder';
import './styles.css'; 

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);

  // Función para obtener los pedidos pendientes desde el backend
  const fetchPendingOrders = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/pedidos/');
      const data = await response.json();
      // Filtrar solo los pedidos con estado 'pendiente'
      //const pendingOrders = data.filter(order => order.estado === 'pendiente');
      setOrders(data);
      console.log(data)
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  useEffect(() => {
    fetchPendingOrders();

    // Consultar cada 60 seg
    const intervalId = setInterval(fetchPendingOrders, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="pending-orders-container">
      <h1 className="title">Control de Pedidos</h1>
      <div className="orders-grid">
        {orders.length > 0 ? (
          orders.map((order) => (
            <CardOrder key={order.id_pedido} order={order} />
          ))
        ) : (
          <h1 className="title">No hay pedidos pendientes</h1>
        )}
      </div>
    </div>
  );
};

export default PendingOrders;
