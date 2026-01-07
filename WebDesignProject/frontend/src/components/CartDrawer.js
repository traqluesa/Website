import React from 'react';
import { Drawer, Box, Typography, List, ListItem, Divider, IconButton, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { THEME } from '../theme';

const CartDrawer = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  //satın alma kısmı fiyat hesaplama 
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 350, p: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: '900', mb: 4 }}>MY CART</Typography>
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index} sx={{ px: 0, py: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img src={item.imageUrl} alt="" style={{ width: 40 }} />
                <Typography variant="caption" sx={{ fontWeight: '700', width: '150px' }}>{item.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                 <Typography variant="caption" sx={{ fontWeight: '800', mr: 1 }}>{item.price} TL</Typography>
                 <IconButton onClick={() => onRemoveItem(index)} size="small"><DeleteOutlineIcon fontSize="small" /></IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="body2">Total</Typography>
          <Typography variant="h6" sx={{ fontWeight: '900' }}>{cartTotal} TL</Typography> {/* toplam fiyat */}
        </Box>
        <Button variant="contained" fullWidth sx={{ bgcolor: THEME.textPrimary, color: '#fff', py: 1.5, fontWeight: '900', '&:hover': { bgcolor: THEME.accent } }}>CHECKOUT</Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;