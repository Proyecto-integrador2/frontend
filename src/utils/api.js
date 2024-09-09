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
