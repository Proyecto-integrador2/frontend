import React, { useState, useEffect } from 'react';
import CardOrder from './CardOrder'; // El componente que representa cada pedido
import './styles.css'; // Estilos opcionales

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);

  // Función para obtener los pedidos pendientes desde el backend
  const fetchPendingOrders = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/pedidos/');
      const data = await response.json();
      // Filtrar solo los pedidos con estado 'pendiente'
      const pendingOrders = data.filter(order => order.estado === 'pendiente');
      setOrders(pendingOrders);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  useEffect(() => {
    fetchPendingOrders();

    // Consultar cada 5 seg
    const intervalId = setInterval(fetchPendingOrders, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="pedidos-container">
      <h1>Pedidos Pendientes</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <CardOrder key={order.id_pedido} order={order} />
        ))
      ) : (
        <p>No hay pedidos pendientes</p>
      )}
    </div>
  );
};

export default PendingOrders;
