import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import DrinkItem from '../../components/DrinkItem';
import { getProductos } from '../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './Order';
import SearchBar from '../../components/SearchBar'; // Importa el componente SearchBar

const Menu = () => {
  const [productos, setProductos] = useState([]);
  const [order, setOrder] = useState({ items: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
        setFilteredProductos(data);
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

  useEffect(() => {
    // Filtra los productos en función del término de búsqueda
    if (searchTerm === '') {
      setFilteredProductos(productos);
    } else {
      setFilteredProductos(
        productos.filter(product =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, productos]);

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

      {/* Fija el buscador en la parte superior y aplica fondo blanco */}
      <div className="fixed top-0 left-0 right-0 bg-white p-4 border-b border-[#e8d5ce] z-10">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <div className="pt-20 p-4 bg-[#fcf9f8]">
        {filteredProductos.length > 0 ? (
          filteredProductos.map(product => (
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
          <p>No products found.</p>
        )}
      </div>

      <Order order={order} />
      <ToastContainer />
    </div>
  );
};

export default Menu;
