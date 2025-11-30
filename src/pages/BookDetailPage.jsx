import { useParams, useNavigate } from 'react-router-dom'
import { booksData } from '../data/books-data.js'
import '../styles/pages.css'

export default function BookDetailPage({ favorites, onToggleFavorite, onAddToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const book = booksData.find(b => b.id === parseInt(id))

  if (!book) {
    return (
      <main className="page">
        <h1>⚠️ Книга не найдена</h1>
        <p>Книга с ID {id} не существует в нашем каталоге.</p>
        <button onClick={() => navigate('/books')} className="back-button">
          ← Вернуться к каталогу
        </button>
      </main>
    )
  }

  return (
    <main className="page book-detail-page">
      <button onClick={() => navigate('/books')} className="back-button">
        ← Вернуться к каталогу
      </button>

      <div className="book-detail-container">
        <img src={book.image} alt={book.title} className="book-detail-image" />

        <div className="book-detail-content">
          <h1>{book.title}</h1>
          <p className="book-author">✍️ Автор: {book.author}</p>
          
          <div className="book-meta">
            <span className="book-year">📅 {book.year} год</span>
            <span className="book-pages">📖 {book.pages} страниц</span>
            <span className="book-rating">⭐ Рейтинг: {book.rating}/5</span>
          </div>

          <p className="book-description">{book.fullDescription}</p>

          <div className="book-price-section">
            <span className="book-detail-price">{book.price} ₽</span>
          </div>

          <div className="book-actions">
            <button
              className="action-button primary"
              onClick={() => {
                onAddToCart(book)
                alert('✅ Книга добавлена в корзину!')
              }}
            >
              🛒 Добавить в корзину
            </button>
            <button
              className={`action-button secondary ${favorites.includes(book.id) ? 'active' : ''}`}
              onClick={() => onToggleFavorite(book.id)}
            >
              {favorites.includes(book.id) ? '❤️ В избранном' : '🤍 Добавить в избранное'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}