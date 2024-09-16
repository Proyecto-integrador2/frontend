import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Typography, Button, Grid, TablePagination } from '@mui/material';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    mesa__ubicacion: '',
    fecha_hora: '', // Puede seguir siendo el formato completo de fecha (YYYY-MM-DD)
    fecha_hora_year: '',
    fecha_hora_month: '',
    fecha_hora_day: '',
    estado: ''
  });

  // Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, [filters, page, rowsPerPage]);

  const fetchOrders = async () => {
    try {
      const params = {
        ...filters,
        page: page + 1, // La API puede requerir la página en 1-based index
        page_size: rowsPerPage // Si la API soporta `page_size`
      };
  
      // Si los campos de año, mes o día están definidos, agrégales los parámetros correspondientes
      if (filters.fecha_hora_year || filters.fecha_hora_month || filters.fecha_hora_day) {
        if (filters.fecha_hora_year) params.fecha_hora_year = filters.fecha_hora_year;
        if (filters.fecha_hora_month) params.fecha_hora_month = filters.fecha_hora_month;
        if (filters.fecha_hora_day) params.fecha_hora_day = filters.fecha_hora_day;
      }
  
      const response = await axios.get('http://127.0.0.1:8000/api/history/', { params });
  
      // Asegúrate de manejar correctamente la estructura de la respuesta
      setOrders(response.data.results || []); // response.data.results debería ser una lista de órdenes
      setTotalCount(response.data.count || 0); // response.data.count debería ser el número total de órdenes
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'fecha_hora') {
      // Extraer año, mes y día de la fecha seleccionada
      const [year, month, day] = value.split('-');
      setFilters(prevFilters => ({
        ...prevFilters,
        fecha_hora_year: year,
        fecha_hora_month: month,
        fecha_hora_day: day,
        [name]: value
      }));
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value
      }));
    }
  };
  

  const resetFilters = () => {
    setFilters({
      mesa__ubicacion: '',
      fecha_hora: '',
      estado: ''
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Resetear la página a 0 al cambiar el número de filas por página
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>

      {/* Filtros */}
      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
          <TextField
            label="Date"
            type="date"
            name="fecha_hora"
            value={filters.fecha_hora}
            onChange={handleFilterChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="outlined"
            sx={{ '& input': { fontSize: '1rem' } }}
          />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Mesa"
              type="text"
              name="mesa__ubicacion"
              value={filters.mesa__ubicacion}
              onChange={handleFilterChange}
              fullWidth
              variant="outlined"
              sx={{ '& input': { fontSize: '1rem' } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Status"
              select
              name="estado"
              value={filters.estado}
              onChange={handleFilterChange}
              fullWidth
              variant="outlined"
              sx={{ '& input': { fontSize: '1rem' } }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pendiente">Pendiente</MenuItem>
              <MenuItem value="en_preparacion">En preparacion</MenuItem>
              <MenuItem value="entregado">Entregado</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button variant="contained" color="secondary" onClick={resetFilters} sx={{ fontSize: '1rem' }}>
            Reset Filters
          </Button>
        </Box>
      </Box>

      {/* Tabla de órdenes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Order #</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Fecha</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Mesa</TableCell>
              <TableCell align="center" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map(order => (
                <TableRow key={order.id_pedido}>
                  <TableCell align="center" sx={{ fontSize: '1.1rem' }}>{order.id_pedido}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '1.1rem' }}>{new Date(order.fecha_hora).toLocaleDateString()}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '1.1rem' }}>{order.mesa_ubicacion}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '1.1rem', color: getStatusColor(order.estado) }}>
                    {capitalize(order.estado)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ fontSize: '1.1rem' }}>
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount} // Usa el total de elementos del backend
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

// Función para estilizar el estado según su valor
const getStatusColor = (status) => {
  switch (status) {
    case 'pendiente':
      return 'red';
    case 'en_preparacion':
      return 'blue';
    case 'entregado':
      return 'green';
    default:
      return 'black';
  }
};

// Función para capitalizar el estado
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default OrderHistory;
