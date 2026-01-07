import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CssBaseline, Container, Typography, Drawer, List, ListItem } from '@mui/material';

// Bileşenleri İçe Aktar
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import { THEME } from './theme';

function App() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [category, setCategory] = useState('HOME');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const categories = ['HOME', 'PROTEIN', 'AMINO ACIDS', 'PERFORMANCE', 'VITAMINS'];

  useEffect(() => {
    // Backend'den veri çekme
    axios.get('http://localhost:8080/api/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data); 
      })
      .catch(err => console.error(err));
  }, []);
// Carta ürün ekleme
  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };
  // Carttan ürün çıkarma
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const upperCat = cat.toUpperCase();
    
    if (upperCat === 'HOME') {
      setFilteredProducts(products);
    } 
    else if (upperCat === 'PROTEIN') {
      setFilteredProducts(products.filter(p => {
        const name = (p.name?.toUpperCase() || "");
        return name.includes('WHEY') || name.includes('ISOLATE');
      }));
    } 
    else if (upperCat === 'AMINO ACIDS') {
      setFilteredProducts(products.filter(p => {
        const name = (p.name?.toUpperCase() || "");
        return name.includes('BCAA') || name.includes('CREATINE');
      }));
    } 
    else if (upperCat === 'PERFORMANCE') {
      setFilteredProducts(products.filter(p => {
        const name = (p.name?.toUpperCase() || "");
        return name.includes('PRE-WORKOUT') || name.includes('EXPLOSIVE');
      }));
    } 
    else if (upperCat === 'VITAMINS') {
      setFilteredProducts(products.filter(p => {
        const name = (p.name?.toUpperCase() || "");
        return name.includes('VITAMIN') || 
               name.includes('OMEGA') || 
               name.includes('PROBIOTICS') || 
               name.includes('GLUCOSAMINE');
      }));
    }
  };

  return (
    <Box sx={{ bgcolor: THEME.bg, minHeight: '100vh' }}> {/* arka plan rengi */}
      <CssBaseline />
      
      <Navbar 
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenUser={() => setIsUserOpen(true)}
        onHomeClick={() => handleCategoryChange('HOME')}
      />

      <Box sx={{ bgcolor: THEME.white, py: 2, mt: '64px', display: 'flex', justifyContent: 'center', gap: 6, position: 'sticky', top: '64px', zIndex: 1000, borderBottom: `1px solid ${THEME.border}` }}>
        {categories.map((cat) => (
          <Typography 
            key={cat} onClick={() => handleCategoryChange(cat)} 
            sx={{ cursor: 'pointer', fontSize: '0.75rem', fontWeight: '800', color: category === cat ? THEME.accent : THEME.textSecondary, letterSpacing: 1, '&:hover': { color: THEME.accent }, transition: '0.2s' }}
          > {/*navbar kategori isimleri*/}
            {cat}
          </Typography>
        ))}
      </Box> 

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: '900', mb: 8, color: THEME.textPrimary }}>{category}</Typography>
        {/* Sayfanın ortasındaki Ürün isimleri*/}
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      </Container>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onRemoveItem={removeFromCart} 
      />
      
      {/* Profil sekmesi */}
      <Drawer anchor="left" open={isUserOpen} onClose={() => setIsUserOpen(false)}>
        <Box sx={{ width: 300, p: 5, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: '900', mb: 4 }}>ACCOUNT</Typography>
          <List>
            {['Orders', 'Settings', 'Logout'].map((text) => (
              <ListItem key={text} sx={{ py: 2, justifyContent: 'center', cursor: 'pointer', '&:hover': { color: THEME.accent } }}>
                <Typography sx={{ fontWeight: '700' }}>{text}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default App;