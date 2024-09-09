import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import DrinkItem from '../../components/DrinkItem';
import { getProductos } from '../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './Order'; 

const Menu = () => {
  const [productos, setProductos] = useState([]);
  const [order, setOrder] = useState({ items: [] });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    // Recupera la orden almacenada en el localStorage al inicializar
    const storedOrder = JSON.parse(localStorage.getItem('order')) || { items: [] };
    setOrder(storedOrder);
  }, []);

  const handleAddToOrder = (drink) => {
    const newItem = { ...drink, id: Date.now(), quantity: 1 };
    const updatedOrder = { items: [...order.items, newItem] };
  
    setOrder(updatedOrder);
    localStorage.setItem('order', JSON.stringify(updatedOrder));
    toast.success(`${drink.name} added to order!`);
  };  

  return (
    <div className="relative flex flex-col min-h-screen bg-[#fcf9f8] justify-between overflow-x-hidden" style={{ fontFamily: "Epilogue, Noto Sans, sans-serif" }}>
      <Navbar />
      <div className="p-4 bg-[#fcf9f8]">
        {productos.length > 0 ? (
          productos.map(product => (
            <DrinkItem
              key={product.id_producto}
              name={product.nombre}
              ingredients={product.ingredientes}
              price={product.precio}
              imgUrl={product.imagen_url}
              onAddToOrder={handleAddToOrder}
            />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
      <Order order={order} />
      <ToastContainer />
    </div>
  );
};

export default Menu;
