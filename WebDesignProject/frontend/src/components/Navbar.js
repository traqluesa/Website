import React from 'react';
import { AppBar, Toolbar, Typography, TextField, InputAdornment, Box, IconButton, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { THEME } from '../theme'; // Temayı içe aktar

const Navbar = ({ cartCount, onOpenCart, onOpenUser, onHomeClick }) => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: THEME.white, color: THEME.textPrimary, boxShadow: 'none', borderBottom: `1px solid ${THEME.border}`, zIndex: 1100 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { md: 10 } }}>
        <Typography variant="h5" sx={{ fontWeight: '900', cursor: 'pointer', letterSpacing: -1.5 }} onClick={onHomeClick}>
          PROTEIN<span style={{ color: THEME.accent }}>LAB</span>
        </Typography> {/* Logo yazısı */}

        <TextField  // Arama çubuğu 
          variant="outlined" size="small" placeholder="Search for supplements..." 
          sx={{ bgcolor: '#f5f5f5', borderRadius: '20px', width: '35%', '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } } }}
          InputProps={{ endAdornment: (<InputAdornment position="end"><SearchIcon sx={{ fontSize: 20 }} /></InputAdornment>) }}
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="inherit" onClick={onOpenUser}><PersonOutlineIcon /></IconButton>
          <IconButton color="inherit" onClick={onOpenCart}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;