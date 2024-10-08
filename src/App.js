import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './pages/Usuario/Menu';
import Order from './pages/Usuario/Order';
import Orders from './pages/Orders';
import DetailOrder from './pages/DetailOrder';
import PendingOrders from './pages/Employee/PendingOrders';
import Login from './pages/Login/Login';
import OrderHistory from './pages/Admin/OrderHistory';
import Reports from './pages/Admin/Reports';
import Dashboard from './pages/Admin/Dashboard';
import PrivateRoute from './utils/privateRoute';
import AuthProvider from './utils/auth';
import { OrderProvider } from './context/OrderContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <AuthProvider>
      <OrderProvider>
      <Router>
      <ToastContainer/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Menu drinks={[]} />} />
          <Route path="/menu" element={<Menu drinks={[]} />} />
          <Route path="/order" element={<Order order={{ items: [] }} />} />
          <Route path="/orders" element={<Orders orders={[]} />} />
          <Route path="/orders/:id" element={<DetailOrder order={{ items: [] }} />} />
          {/* Rutas anidadas dentro de /admin */}
          <Route path="/admin" element={<Dashboard />}>
              <Route path="history" element={<OrderHistory />} />
              <Route path="reportes" element={<Reports />} />
            </Route>
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
      </OrderProvider>
    </AuthProvider>
  );
};

export default App;
