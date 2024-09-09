import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './pages/Usuario/Menu';
import Order from './pages/Usuario/Order';
import Orders from './pages/Orders';
import DetailOrder from './pages/DetailOrder';
import PendingOrders from './pages/Employee/PendingOrders';
import Login from './pages/Login/Login';
import PrivateRoute from './utils/privateRoute';
import AuthProvider from './utils/auth';

const App = () => {

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Menu drinks={[]} />} />
        <Route path="/menu" element={<Menu drinks={[]} />} />
        <Route path="/order" element={<Order order={{ items: [] }} />} />
        <Route path="/orders" element={<Orders orders={[]} />} />
        <Route path="/orders/:id" element={<DetailOrder order={{ items: [] }} />} />
        
        {/* Rutas privadas */}
        <Route
            path="/employee/orders"
            element={
              <PrivateRoute>
                <PendingOrders />
              </PrivateRoute>
            }
          />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
