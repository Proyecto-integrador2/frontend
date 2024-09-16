// Menu.jsx
import React, { useEffect, useState, useContext } from 'react';
import DrinkItem from '../../components/DrinkItem';
import { getProductos } from '../../utils/api';
import { toast } from 'react-toastify';
import SearchBar from '../../components/SearchBar';
import { OrderContext } from '../../context/OrderContext';
import './Menu.css';
import Order from './Order'
import Navbar from '../../components/Navbar';

const Menu = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { order, updateOrder } = useContext(OrderContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        console.log(data.results)
        setProductos(data.results);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    fetchProductos();
  }, []);

  const handleAddToOrder = (drink) => {
    const existingItemIndex = order.items.findIndex(item => item.idProduct === drink.idProduct);

    if (existingItemIndex !== -1) {
      // Si el producto ya está en la orden, actualiza la cantidad
      const updatedItems = [...order.items];
      updatedItems[existingItemIndex].quantity += 1;

      const updatedOrder = { items: updatedItems };
      updateOrder(updatedOrder);
      toast.success(`Increased quantity of ${drink.name}!`, { autoClose: 3000 });
    } else {
      // Si no está en la orden, añade el producto con cantidad 1
      const newItem = { ...drink, id: drink.idProduct, quantity: 1 };
      const updatedOrder = { items: [...order.items, newItem] };

      updateOrder(updatedOrder);
      toast.success(`Added ${drink.name} to order!`, { autoClose: 3000 });
    }
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
        <Order order={order} setOrder={updateOrder} />
      </div>
      <Navbar />
    </div>
  );
};

export default Menu;