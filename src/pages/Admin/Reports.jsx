import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar los componentes necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrderReports = () => {
  const [chartDataByDate, setChartDataByDate] = useState({});
  const [chartDataByCategory, setChartDataByCategory] = useState({});
  const [chartDataByProductName, setChartDataByProductName] = useState({});

  const fetchReportDataByDate = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/reports/');
      const data = response.data;
      setChartDataByDate({
        labels: data.labels,
        datasets: data.datasets
      });
    } catch (error) {
      console.error('Error fetching date report data:', error);
    }
  };

  const fetchReportDataByCategory = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/reports/category/');
      const data = response.data;
      setChartDataByCategory({
        labels: data.labels,
        datasets: data.datasets
      });
    } catch (error) {
      console.error('Error fetching category report data:', error);
    }
  };

  const fetchReportDataByProductName = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/reports/product/');
      const data = response.data;
      setChartDataByProductName({
        labels: data.labels,
        datasets: data.datasets
      });
    } catch (error) {
      console.error('Error fetching product name report data:', error);
    }
  };

  useEffect(() => {
    fetchReportDataByDate();
    fetchReportDataByCategory();
    fetchReportDataByProductName();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Order Reports
      </Typography>
      <Typography variant="h6" gutterBottom>
        Orders by Date
      </Typography>
      {chartDataByDate.labels ? (
        <Line data={chartDataByDate} />
      ) : (
        <Typography variant="body1">No data available for date report.</Typography>
      )}

      <Typography variant="h6" gutterBottom mt={4}>
        Orders by Product Category
      </Typography>
      {chartDataByCategory.labels ? (
        <Bar data={chartDataByCategory} options={{ responsive: true }} />
      ) : (
        <Typography variant="body1">No data available for category report.</Typography>
      )}

      <Typography variant="h6" gutterBottom mt={4}>
        Orders by Product Name
      </Typography>
      {chartDataByProductName.labels ? (
        <Bar data={chartDataByProductName} options={{ responsive: true }} />
      ) : (
        <Typography variant="body1">No data available for category report.</Typography>
      )}
    </Box>
  );
};

export default OrderReports;
