import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Orders from './pages/Orders';
import DetailOrder from './pages/DetailOrder';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu drinks={[]} />} />
        <Route path="/menu" element={<Menu drinks={[]} />} />
        <Route path="/order" element={<Order order={{ items: [] }} />} />
        <Route path="/orders" element={<Orders orders={[]} />} />
        <Route path="/orders/:id" element={<DetailOrder order={{ items: [] }} />} />
      </Routes>
    </Router>
  );
};

export default App;
