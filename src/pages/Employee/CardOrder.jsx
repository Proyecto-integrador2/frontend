import React from 'react';
import './styles.css'; // Usaremos CSS modules o styled-components si es necesario

const CardOrder = ({ order, onChangeStatus }) => {
  // Formatear la fecha y la hora
  const date = new Date(order.fecha_hora);
  const dateFormated = date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  const hourFormated = date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  // Función para cambiar el estado del pedido
  const handleStatusChange = () => {
    let newStatus = '';
    if (order.estado === 'pendiente') {
      newStatus = 'en_preparacion';
    } else if (order.estado === 'en_preparacion') {
      newStatus = 'entregado';
    }
    onChangeStatus(order.id_pedido, newStatus);
  };

  // Función para asignar el color basado en el estado del pedido
  const getStatusStyle = (status) => {
    switch (status) {
      case 'pendiente':
        return { backgroundColor: '#ff6961', color: '#fff' }; // Rojo para pendiente
      case 'en_preparacion':
        return { backgroundColor: '#1e90ff', color: '#fff' }; // Azul para en preparación
      case 'entregado':
        return { backgroundColor: '#28a745', color: '#fff' }; // Verde para entregado
      default:
        return { backgroundColor: '#6c757d', color: '#fff' }; // Gris para desconocido
    }
  };

  return (
    <div className="pedido-card">
      <div className="pedido-header">
        <h2 className="mesa-numero">Mesa {order.mesa_numero} <p className='pedido-fecha'>{order.mesa_ubicacion}</p></h2>
        <span className="estado-label" style={getStatusStyle(order.estado)}>
          {order.estado}
        </span>
      </div>
      <div className="pedido-content">
        {order.detalles.map((detail) => (
          <div key={detail.id_detalle_pedido} className="detalle-item">
            <img
              src={detail.producto_imagen}
              alt={detail.producto_nombre}
              className="producto-imagen"
            />
            <div className="detalle-info">
              <h4>{detail.producto_nombre}</h4>
              <p>Cantidad: {detail.cantidad}</p>
              {detail.comentarios && <p>Comentarios: {detail.comentarios}</p>}
            </div>
          </div>
        ))}
        <p className="pedido-fecha">
          <span className="hora">{hourFormated}</span>  {dateFormated}
        </p>
        <p className="pedido-fecha">
          <span className="hora">Total:</span>  {order.precio_pedido}
        </p>
      </div>
      <div className="pedido-footer">
        <button className="estado-btn" onClick={handleStatusChange}>
          {order.estado === 'pendiente'
            ? 'Marcar como En Preparación'
            : order.estado === 'en_preparacion'
            ? 'Marcar como Entregado'
            : 'Pedido Entregado'}
        </button>
      </div>
    </div>
  );
};

export default CardOrder;
