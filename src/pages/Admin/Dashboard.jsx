import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton, Divider } from '@mui/material';
import { History, Assessment, Menu } from '@mui/icons-material';
import { useNavigate, Outlet } from 'react-router-dom'; // Usa Outlet para renderizar rutas internas
import logo from '../../resources/image.png'; 

const drawerWidth = 240;

function Dashboard() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate(); // Usa useNavigate para manejar la navegación

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${open ? drawerWidth : 56}px)`, ml: `${open ? drawerWidth : 56}px` }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer} edge="start">
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer (Menú lateral) */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 56,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 56,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
          },
        }}
      >
        <Toolbar>
          {open ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <img src={logo} alt="logo" style={{ marginRight: '8px', height: '40px', width: '40px' }} />
              <Typography variant="h4" component="h1">
                Elixify
              </Typography>
            </Box>
          ) : (
            <div />
          )}
        </Toolbar>
        <Divider />

        {/* Lista de items del menú */}
        <List>
          {[
            { text: 'Historial', icon: <History fontSize="large" />, path: '/admin/history' },
            { text: 'Reportes', icon: <Assessment fontSize="large" />, path: '/admin/reportes' },
          ].map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontSize: '1.25rem' }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Contenedor principal donde se renderiza el contenido */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {/* Aquí se renderizarán las rutas internas */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;
