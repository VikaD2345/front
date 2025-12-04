import React, { useState } from 'react';
import './TechnologyForm.css';

function TechnologyForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    status: 'not-started',
    resources: '',
    proficiency: 50
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'DevOps'];
  const statuses = [
    { value: 'not-started', label: 'Не начато' },
    { value: 'in-progress', label: 'В процессе' },
    { value: 'completed', label: 'Завершено' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Название технологии обязательно';
    }

    if (!formData.category) {
      newErrors.category = 'Выберите категорию';
    }

    if (!formData.resources.trim()) {
      newErrors.resources = 'Укажите ресурсы/материалы';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'proficiency' ? parseInt(value) : value
    }));

    // Очищаем ошибку при редактировании поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onAdd(formData);

      // Очищаем форму
      setFormData({
        name: '',
        category: 'Frontend',
        status: 'not-started',
        resources: '',
        proficiency: 50
      });

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      category: 'Frontend',
      status: 'not-started',
      resources: '',
      proficiency: 50
    });
    setErrors({});
  };

  return (
    <form className="technology-form" onSubmit={handleSubmit}>
      {submitted && (
        <div className="form-success-message">
          ✓ Технология успешно добавлена!
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Название технологии *</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="например, React, Node.js, PostgreSQL"
          className={errors.name ? 'input-error' : ''}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className="error-message">{errors.name}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Категория *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'input-error' : ''}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <span className="error-message">{errors.category}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status">Статус *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {statuses.map(stat => (
              <option key={stat.value} value={stat.value}>{stat.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="resources">Ресурсы и материалы *</label>
        <textarea
          id="resources"
          name="resources"
          value={formData.resources}
          onChange={handleChange}
          placeholder="Ссылки, книги, курсы, материалы для изучения"
          className={errors.resources ? 'input-error' : ''}
          aria-describedby={errors.resources ? 'resources-error' : undefined}
        />
        {errors.resources && (
          <span id="resources-error" className="error-message">{errors.resources}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="proficiency">
          Уровень владения: <strong>{formData.proficiency}%</strong>
        </label>
        <input
          id="proficiency"
          type="range"
          name="proficiency"
          min="0"
          max="100"
          step="5"
          value={formData.proficiency}
          onChange={handleChange}
          className="proficiency-slider"
        />
        <div className="proficiency-labels">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          Добавить технологию
        </button>
        <button type="button" className="btn-clear" onClick={handleClear}>
          Очистить форму
        </button>
      </div>
    </form>
  );
}

export default TechnologyForm;