import { Link } from 'react-router-dom'
import '../styles/header.css'

export default function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/books" className="brand-link">
            <h1>📚 Book Store</h1>
          </Link>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/books" className="nav-link">
                Каталог
              </Link>
            </li>
            <li>
              <Link to="/cart" className="nav-link">
                🛒 Корзина ({cartCount})
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="nav-link">
                Контакты
              </Link>
            </li>
            <li>
              < Link to="/technologies">
                Технологии
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}