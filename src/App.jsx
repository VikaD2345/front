import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import ContactsPage from './pages/ContactsPage';
import TechnologiesPage from './pages/TechnologiesPage';
import './styles/pages.css';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleToggleFavorite = (bookId) => {
    setFavorites(prev =>
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const handleAddToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
  };

  const handleUpdateQuantity = (bookId, quantity) => {
    setCart(prev =>
      prev.map(item =>
        item.id === bookId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <Router>
      <Header cartCount={cart.length} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/books"
            element={<BooksPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />}
          />
          <Route
            path="/books/:id"
            element={
              <BookDetailPage
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            }
          />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;