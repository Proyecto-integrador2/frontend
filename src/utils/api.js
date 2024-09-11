import axios from 'axios';

export const getProductos = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/productos/');
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
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