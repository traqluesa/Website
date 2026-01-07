import React from 'react';
import { Grid, Box, Typography, Rating, Button } from '@mui/material';
import { THEME } from '../theme';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box sx={{ 
        textAlign: 'center', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-5px)' } // Ürün kartına hover efekti
      }}>
        <Box sx={{ // etrafındaki beyaz kutu
          bgcolor: '#fff', 
          borderRadius: '12px', 
          p: 4, 
          mb: 2, 
          border: `1px solid ${THEME.border}`, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          width: '100%',
          aspectRatio: '1/1',
          maxWidth: '280px'
        }}>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
        </Box>
        
        <Typography variant="body1" sx={{ fontWeight: '700', mb: 0.5, color: THEME.textPrimary, height: '48px', display: 'flex', alignItems: 'center', px: 2 }}>
          {product.name}
        </Typography> {/* ürün ismi için */} 

        <Rating value={5} readOnly size="small" sx={{ mb: 1 }} /> {/* 5 yıldız */}  
        
        <Typography variant="h6" sx={{ fontWeight: '900', mb: 2, color: THEME.textPrimary }}>
          {product.price.toLocaleString()} TL {/* ürün fiyatı */}
        </Typography>
        
        <Box sx={{ mt: 'auto' }}>
          <Button 
            onClick={() => onAddToCart(product)}
            sx={{ 
              color: THEME.textPrimary, 
              fontWeight: '800', 
              fontSize: '0.75rem', 
              borderBottom: `2px solid ${THEME.textPrimary}`, 
              borderRadius: 0, 
              px: 2, 
              '&:hover': { bgcolor: 'transparent', color: THEME.accent, borderColor: THEME.accent } 
            }}
          >
            + ADD TO CART {/* sepete ekle butonu */}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductCard;