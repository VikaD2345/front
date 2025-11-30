import { Link } from 'react-router-dom'
import '../styles/book-card.css'

export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <div className="book-card">
      <div className="book-card-image">
        <img src={book.image} alt={book.title} />
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={onToggleFavorite}
          aria-label="Добавить в избранное"
        >
          ❤️
        </button>
      </div>
      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">✍️ {book.author}</p>
        <p className="book-card-price">{book.price} ₽</p>
        <p className="book-card-rating">⭐ {book.rating}</p>
        <Link to={`/book/${book.id}`} className="book-link-button">
          Подробнее →
        </Link>
      </div>
    </div>
  )
}