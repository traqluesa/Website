import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <Grid container spacing={4} justifyContent="center"> {/* Ürün kartlarını ortalar */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </Grid> 
  );
};

export default ProductList;