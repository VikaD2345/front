import React, { useState } from 'react';

function WorkingAccessibleForm() {
  const [formData, setFormData] = useState({
    name: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      console.log('Submitted:', formData);
      setFormData({ name: '', notes: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '20px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: '8px',
        maxWidth: '500px',
        margin: '0 auto'
      }}
    >
      <h2 id="form-title">Альтернативная форма</h2>

      {submitted && (
        <div
          role="alert"
          style={{
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '4px'
          }}
        >
          ✓ Форма успешно отправлена!
        </div>
      )}

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
          Имя *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-labelledby="form-title"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="notes" style={{ display: 'block', marginBottom: '5px' }}>
          Примечания
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            minHeight: '100px',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Отправить
      </button>
    </form>
  );
}

export default WorkingAccessibleForm;