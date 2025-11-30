import { useState } from 'react'
import BookCard from '../components/BookCard.jsx'
import { booksData } from '../data/books-data.js'
import '../styles/pages.css'

export default function BooksPage({ favorites, onToggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredBooks = booksData.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterType === 'favorites') {
      return matchesSearch && favorites.includes(book.id)
    }
    return matchesSearch
  })

  return (
    <main className="page books-page">
      <h1>Каталог книг</h1>

      <div className="books-controls">
        <input
          type="text"
          placeholder="Поиск по названию или автору..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">Все книги</option>
          <option value="favorites">❤️ Избранное</option>
        </select>
      </div>

      <p className="results-count">Найдено книг: {filteredBooks.length}</p>

      <div className="books-grid">
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={favorites.includes(book.id)}
            onToggleFavorite={() => onToggleFavorite(book.id)}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="no-results">
          <p>😞 Книги не найдены. Попробуйте изменить параметры поиска.</p>
        </div>
      )}
    </main>
  )
}