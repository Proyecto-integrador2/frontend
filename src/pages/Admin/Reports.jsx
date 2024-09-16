import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const OrderReports = () => {
  const [chartData, setChartData] = useState({});

  const fetchReportData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/history/');
      const data = response.data;
      setChartData({
        labels: data.labels,
        datasets: data.datasets
      });
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Order Reports
      </Typography>
      {chartData.labels ? (
        <Line data={chartData} />
      ) : (
        <Typography variant="body1">No data available.</Typography>
      )}
    </Box>
  );
};

export default OrderReports;
