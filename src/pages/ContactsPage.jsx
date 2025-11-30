import { useState, useEffect } from 'react'
import '../styles/contacts-new.css'

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Ошибка чтения из localStorage ключа "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

export default function ContactsPage() {
  const [formData, setFormData] = useLocalStorage('bookstoreContactForm', {
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [formStep, setFormStep] = useState(1) // Многошаговая форма

  useEffect(() => {
    validateForm()
  }, [formData])

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа'
    }

    if (!formData.email) {
      newErrors.email = 'Email обязателен'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Некорректный email адрес'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Выберите тему'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Напишите сообщение'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно быть более 10 символов'
    }

    setErrors(newErrors)
    setIsValid(Object.keys(newErrors).length === 0)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isValid) return

    try {
      console.log('Отправка данных:', formData)
      setSuccessMessage('✅ Спасибо! Ваше сообщение успешно отправлено. Мы ответим вам в течение 24 часов!')
      
      // Очищаем форму
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      window.localStorage.removeItem('bookstoreContactForm')
      setFormStep(1)
      
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (error) {
      setSuccessMessage('❌ Ошибка при отправке: ' + error.message)
    }
  }

  const handleClearDraft = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    window.localStorage.removeItem('bookstoreContactForm')
    setSuccessMessage('🗑️ Черновик очищен')
    setFormStep(1)
    setTimeout(() => {
      setSuccessMessage('')
    }, 2000)
  }

  return (
    <main className="page contacts-page-new">
      <div className="contacts-header">
        <h1>📬 Контакты</h1>
        <p className="subtitle">Мы всегда готовы помочь вам. Напишите нам!</p>
      </div>

      <div className="contacts-wrapper">
        {/* Левая колонна - Инфо */}
        <div className="contact-info-new">
          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Телефон</h3>
            <p className="info-text">+7 (999) 123-45-67</p>
            <p className="info-meta">Пн-Пт: 9:00-18:00 (МСК)</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p className="info-text">info@bookstore.ru</p>
            <p className="info-meta">Ответим за 24 часа</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Адрес</h3>
            <p className="info-text">Москва, ул. Театральная, д. 5</p>
            <p className="info-meta">Метро: Театральная (5 мин)</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🕒</div>
            <h3>Время работы</h3>
            <p className="info-text">Пн-Пт: 9:00-18:00</p>
            <p className="info-meta">Сб-Вс: Выходной</p>
          </div>

          <div className="social-links">
            <p className="social-title">Следите за нами:</p>
            <div className="social-buttons">
              <a href="#" className="social-btn" title="VK">VK</a>
              <a href="#" className="social-btn" title="Telegram">TG</a>
              <a href="#" className="social-btn" title="Instagram">IG</a>
            </div>
          </div>
        </div>

        {/* Правая колонна - Форма */}
        <div className="contact-form-new">
          {successMessage && (
            <div className="alert alert-success">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-multi-step">
            {/* Шаг 1: Имя и Email */}
            {formStep === 1 && (
              <div className="form-step active">
                <div className="step-indicator">
                  <span className="step-number">1</span>
                  <span className="step-title">Ваши данные</span>
                </div>

                <div className="form-group">
                  <label htmlFor="name">Как вас зовут? *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Введите ваше имя"
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Ваш email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@mail.com"
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="btn-next"
                    disabled={errors.name || errors.email}
                  >
                    Далее →
                  </button>
                </div>
              </div>
            )}

            {/* Шаг 2: Тема и сообщение */}
            {formStep === 2 && (
              <div className="form-step active">
                <div className="step-indicator">
                  <span className="step-number">2</span>
                  <span className="step-title">Ваше сообщение</span>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Выберите тему *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`form-select ${errors.subject ? 'input-error' : ''}`}
                  >
                    <option value="">-- Выберите тему --</option>
                    <option value="order">📦 Вопрос о заказе</option>
                    <option value="delivery">🚚 Доставка</option>
                    <option value="return">↩️ Возврат/Обмен</option>
                    <option value="suggestion">💡 Предложение</option>
                    <option value="complaint">⚠️ Жалоба</option>
                    <option value="other">❓ Другое</option>
                  </select>
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Ваше сообщение *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Расскажите подробнее о вашей проблеме или предложении..."
                    rows="6"
                    className={errors.message ? 'input-error' : ''}
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="btn-back"
                  >
                    ← Назад
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormStep(3)}
                    className="btn-next"
                  >
                    Проверить →
                  </button>
                </div>
              </div>
            )}

            {/* Шаг 3: Подтверждение */}
            {formStep === 3 && (
              <div className="form-step active">
                <div className="step-indicator">
                  <span className="step-number">3</span>
                  <span className="step-title">Подтверждение</span>
                </div>

                <div className="confirmation-box">
                  <h3>Проверьте ваши данные:</h3>
                  
                  <div className="confirmation-item">
                    <span className="label">Имя:</span>
                    <span className="value">{formData.name}</span>
                  </div>

                  <div className="confirmation-item">
                    <span className="label">Email:</span>
                    <span className="value">{formData.email}</span>
                  </div>

                  <div className="confirmation-item">
                    <span className="label">Тема:</span>
                    <span className="value">{formData.subject}</span>
                  </div>

                  <div className="confirmation-item">
                    <span className="label">Сообщение:</span>
                    <span className="value">{formData.message}</span>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="btn-back"
                  >
                    ← Изменить
                  </button>
                  <button
                    type="submit"
                    className="btn-submit"
                  >
                    ✅ Отправить
                  </button>
                </div>
              </div>
            )}

            <div className="form-footer">
              <button
                type="button"
                onClick={handleClearDraft}
                className="btn-clear"
              >
                🗑️ Очистить форму
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}