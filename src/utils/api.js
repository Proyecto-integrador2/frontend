import axios from 'axios';

export const getProductos = async () => {
  let allProducts = [];
  let url = 'http://127.0.0.1:8000/api/productos/';

  while (url) {
    try {
      const response = await axios.get(url);
      allProducts = [...allProducts, ...response.data.results];
      url = response.data.next; // URL de la siguiente página
    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error;
    }
  }

  return allProducts;
};

export const postOrder = async (orderData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/pedidos/', orderData);
    return response.data;
  } catch (error) {
    console.error("Error setting order: ", error);
    throw error;
  }
};

export const getMesaId = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/mesas/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching table: ", error);
    throw error;
  }
};

export const patchOrderStatus = async (id, newStatus) => {
  try {
    const response = await axios.patch(`http://127.0.0.1:8000/api/pedidos/${id}/`, {
      estado: newStatus,  // Send the new status
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating order status: ", error);
    throw error;
  }
}