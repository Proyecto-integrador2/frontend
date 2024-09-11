// src/pages/Usuario/Menu.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import DrinkItem from '../../components/DrinkItem';
import { getProductos } from '../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './Order';
import SearchBar from '../../components/SearchBar';
import './Menu.css';

const Menu = () => {
  const [productos, setProductos] = useState([]);
  const [order, setOrder] = useState({ items: [] });
  const [searchTerm, setSearchTerm] = useState('');

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
    const storedOrder = JSON.parse(localStorage.getItem('order')) || { items: [] };
    setOrder(storedOrder);
  }, []);

  const handleAddToOrder = (drink) => {
    console.log(drink)
    const newItem = { ...drink, id: drink.idProduct, quantity: 1};
    const updatedOrder = { items: [...order.items, newItem] };

    setOrder(updatedOrder);
    localStorage.setItem('order', JSON.stringify(updatedOrder));
    toast.success(`${drink.name} added to order!`);
  };

  const filteredProductos = productos.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="menu-container">
      <div className="left-side">
        <div className="search-bar-container">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm} 
          />
        </div>
        <div className="product-list">
          {filteredProductos.length > 0 ? (
            filteredProductos.map(product => (
              <DrinkItem
                key={product.id_producto}
                idProduct={product.id_producto}
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
      </div>
      <div className="right-side">
        <Order order={order} setOrder={setOrder} />
      </div>
      <Navbar />
      <ToastContainer />
    </div>
  );
};

export default Menu;
