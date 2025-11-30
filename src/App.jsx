import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import BooksPage from './pages/BooksPage.jsx'
import BookDetailPage from './pages/BookDetailPage.jsx'
import CartPage from './pages/CartPage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import { useState, useEffect } from 'react'

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = window.localStorage.getItem('bookstoreCart')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = window.localStorage.getItem('bookstoreFavorites')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('bookstoreCart', JSON.stringify(cart))
    } catch (e) {
      console.error('Ошибка сохранения корзины:', e)
    }
  }, [cart])

  useEffect(() => {
    try {
      window.localStorage.setItem('bookstoreFavorites', JSON.stringify(favorites))
    } catch (e) {
      console.error('Ошибка сохранения избранного:', e)
    }
  }, [favorites])

  const addToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id)
      if (existing) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...book, quantity: 1 }]
    })
  }

  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.id !== bookId))
  }

  const updateCartQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === bookId ? { ...item, quantity } : item
        )
      )
    }
  }

  const toggleFavorite = (bookId) => {
    setFavorites(prev =>
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    )
  }

  return (
    <Router basename="/book-store/">
      <Header cartCount={cart.length} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/books"
            element={<BooksPage favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/book/:id"
            element={
              <BookDetailPage
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onUpdateQuantity={updateCartQuantity}
                onRemove={removeFromCart}
              />
            }
          />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App