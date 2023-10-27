import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import  { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { logincontext } from "./Logincontext";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const drawerWidth = 240;
const LoggedOutNav = [{name:'Login',link:'/login'},{name:'Register',link:'/register'}];
const LoggedInNav = [{name:'Products',link:'/products'},{name:'Cart',link:'/cart'},{name:'Wishlist',link:'/wishlist'}];
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const{logged,logout}=useContext(logincontext)
  const navigate=useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login"); 
  };
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' ,textDecoration:'none'}}>
     <Link to='/'> <Button variant="h6" sx={{ my: 2 }}>
        happycart </Button></Link>
      <Divider />
      <List>
        {logged?LoggedInNav.map((item) => (
          <Link to={item.link} underline='none'>
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText sx={{textDecoration:'none'}}  primary={item.name} />
            </ListItemButton>
          </ListItem>
          </Link>
        )):LoggedOutNav.map((item) => (
          <Link to={item.link} underline='none'>
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText  primary={item.name} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;




  return<>

  {
  logged?   <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link  to='/'>
               <Button   sx={{ color: '#fff' }}>
                Happycart
              </Button>
             </Link>
          <Box sx={{ display: { xs: 'none', sm: 'block' ,md:'flex'}, alignItems:{md:'center'}, marginLeft:'auto' }}>
            {LoggedInNav.map((item) => (
             <Link  to={item.link}>
               <Button key={item}  sx={{ color: '#fff' }}>
                {item.name}
              </Button>
             </Link>
             
            ))
            
            
            }
                <Link
          
          style={{ textDecoration: "none" }}
        >
          <Button
            onClick={()=>{handleLogout()}}
            sx={{ color: '#fff' }}
          >
            logout
          </Button>
        </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
      </Box>
    </Box>:  <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Button
          href='/'
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            happycart
          </Button>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {LoggedOutNav.map((item) => (
             <Link to={item.link}>
             <Button key={item}  sx={{ color: '#fff',textDecoration:'none' }}>
              {item.name}
            </Button>
           </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
      </Box>
    </Box>}
  
  </>
}

DrawerAppBar.propTypes = {
 
  window: PropTypes.func,
};

export default DrawerAppBar;