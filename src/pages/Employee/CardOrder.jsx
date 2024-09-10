import React from 'react';

const CardOrder = ({ order }) => {
  return (
    <div className="pedido-card">
      <h2>Mesa {order.mesa_numero}</h2>
      <ul className="pedido-detalles">
        {order.detalles.map((detail) => (
          <li key={detail.id_detalle_pedido} className="pedido-detalle-item">
            <img
              src={detail.producto_imagen}
              alt={detail.producto_nombre}
              className="producto-imagen"
            />
            <div className="detalle-info">
              <p><strong>{detail.producto_nombre}</strong></p>
              <p>Cantidad: {detail.cantidad}</p>
              {detail.comentarios && <p>Comentarios: {detail.comentarios}</p>}
            </div>
          </li>
        ))}
      </ul>
      <p><strong>Estado:</strong> {order.estado}</p>
    </div>
  );
};

export default CardOrder;
