import React, { useState, useEffect, useContext } from 'react';
import CardOrder from './CardOrder'; // El componente que representa cada pedido
import './styles.css'; // Estilos opcionales
import { AuthContext } from '../../utils/auth';
import { useNavigate } from 'react-router-dom'; // Para redirigir al login

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const { authToken, logout } = useContext(AuthContext); // Añadimos logout para limpiar el token
  const navigate = useNavigate(); // Para redirigir al login

  // Función para obtener los pedidos pendientes desde el backend
  const fetchPendingOrders = async () => {
    if (!authToken) {
      // Si no hay token, redirigir al login
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/pedidos/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` 
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Filtrar solo los pedidos con estado 'pendiente'
        const pendingOrders = data.filter(order => order.estado === 'pendiente');
        setOrders(pendingOrders);
      } else if (response.status === 401) {
        // Si la respuesta es 401 (Unauthorized), el token es inválido o ha caducado
        console.error('Token inválido o caducado, cerrando sesión');
        logout(); // Limpiar el authToken
        navigate('/login'); // Redirigir al login
      } else {
        console.error('Error al obtener pedidos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchPendingOrders(); // Llama a la función inicialmente para cargar los datos

      const intervalId = setInterval(fetchPendingOrders, 5000); // Intervalo para actualizar

      return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    } else {
      // Si no hay authToken, redirigir al login
      navigate('/login');
    }
  }, [authToken, navigate]); // authToken como dependencia para reaccionar a cambios

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