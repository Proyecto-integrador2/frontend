import React from 'react';

const CardOrder = ({ order }) => {
  return (
    <div className="pedido-card">
      <h2>Mesa {order.mesa}</h2>
      <ul>
        {order.detalles.map((detail) => (
          <li key={order.id_detalle_pedido}>
            {detail.producto.nombre} x{detail.cantidad} - {detail.comentarios ? `Comentarios: ${detail.comentarios}` : 'Sin comentarios'}
          </li>
        ))}
      </ul>
      <p>Estado: {order.estado}</p>
    </div>
  );
};

export default CardOrder;
