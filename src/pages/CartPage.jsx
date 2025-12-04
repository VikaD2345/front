import { Link } from 'react-router-dom';
import '../styles/pages.css'

export default function CartPage({ cart, onUpdateQuantity, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <main className="page">
        <div className="empty-cart">
          <h1>🛒 Корзина пуста</h1>
          <p>Добавьте книги в корзину, чтобы оформить заказ</p>
          <Link to="/books" className="hero-button">
            Перейти в каталог →
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page cart-page">
      <h1>🛒 Корзина</h1>

      <div className="cart-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Книга</th>
              <th>Автор</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Сумма</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.price} ₽</td>
                <td>
                  <div className="quantity-controls">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{item.price * item.quantity} ₽</td>
                <td>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="remove-button"
                  >
                    🗑️ Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-summary">
          <h2>Итого:</h2>
          <p className="cart-total">{total} ₽</p>
          <button className="checkout-button">
            ✅ Оформить заказ
          </button>
        </div>
      </div>
    </main>
  )
}