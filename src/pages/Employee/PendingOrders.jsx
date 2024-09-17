import React, { useState, useEffect } from 'react';
import CardOrder from './CardOrder';
import './styles.css'; 

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const socketRef = React.useRef(null); 

  // Función para obtener los pedidos pendientes desde el backend
  const fetchPendingOrders = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/pedidos/');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  useEffect(() => {
    fetchPendingOrders();

    if (!socketRef.current) {
      socketRef.current = new WebSocket('ws://localhost:8000/ws/notificaciones/');

      socketRef.current.onmessage = function(e) {
        const data = JSON.parse(e.data);
        setNotifications(prevNotifications => [...prevNotifications, data.message]);
      };

      // Limpiar la conexión WebSocket
      return () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.close();
        }
      };
    }
  }, []);

// Función para cerrar una notificación
const handleCloseNotification = (index) => {
  setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
};

  return (
    <div className="pending-orders-container">
      <h1 className="title">Control de Pedidos</h1>
      <div className="notifications-container">
        {notifications.length > 0 && (
          <div className="notifications">
            {notifications.map((notification, index) => (
              <div key={index} className="notification">
                <span>{notification}</span>
                <button onClick={() => handleCloseNotification(index)} className="close-button">X</button>
              </div>
            ))}
          </div>
        )}
      </div>
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
