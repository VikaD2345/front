import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import TechnologyForm from '../components/TechnologyForm/TechnologyForm';
import SimpleTechCard from '../components/SimpleTechCard/SimpleTechCard';
import DataImportExport from '../components/DataImportExport/DataImportExport';
import '../styles/technologies-page.css';

function TechnologiesPage() {
  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem('technologies');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'React',
        category: 'Frontend',
        status: 'completed',
        resources: 'React docs, tutorials',
        proficiency: 85,
        date: '2024-01-15'
      },
      {
        id: 2,
        name: 'JavaScript ES6+',
        category: 'Frontend',
        status: 'in-progress',
        resources: 'MDN, practice projects',
        proficiency: 90,
        date: '2024-01-10'
      },
      {
        id: 3,
        name: 'Node.js',
        category: 'Backend',
        status: 'in-progress',
        resources: 'Express.js docs',
        proficiency: 70,
        date: '2024-01-20'
      }
    ];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('technologies', JSON.stringify(technologies));
  }, [technologies]);

  const handleAddTechnology = (newTech) => {
    const tech = {
      ...newTech,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setTechnologies(prev => [...prev, tech]);
  };

  const handleDeleteTechnology = (id) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== id));
  };

  const handleUpdateStatus = (id, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const handleUpdateProficiency = (id, newProficiency) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === id ? { ...tech, proficiency: newProficiency } : tech
      )
    );
  };

  const handleImport = (importedData) => {
    setTechnologies(prev => [...prev, ...importedData]);
  };

  const filteredTechs = filter === 'all'
    ? technologies
    : technologies.filter(tech => tech.category === filter);

  return (
    <div className="technologies-page">
      <div className="tech-header">
        <h1>📚 Технологии</h1>
        <p className="tech-subtitle">Управляй своими навыками и отслеживай прогресс обучения</p>
      </div>

      <div className="tech-container">
        {/* Dashboard */}
        <section className="tech-dashboard-section">
          <Dashboard technologies={technologies} />
        </section>

        {/* Форма добавления */}
        <section className="tech-form-section">
          <h2>Добавить новую технологию</h2>
          <TechnologyForm onAdd={handleAddTechnology} />
        </section>

        {/* Фильтр и список */}
        <section className="tech-list-section">
          <div className="tech-controls">
            <h2>Мои технологии ({filteredTechs.length})</h2>
            <select
              className="tech-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Все категории</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Tools">Tools</option>
            </select>
          </div>

          {filteredTechs.length > 0 ? (
            <div className="tech-cards-grid">
              {filteredTechs.map(tech => (
                <SimpleTechCard
                  key={tech.id}
                  tech={tech}
                  onDelete={handleDeleteTechnology}
                  onStatusChange={handleUpdateStatus}
                  onProficiencyChange={handleUpdateProficiency}
                />
              ))}
            </div>
          ) : (
            <div className="tech-empty">
              <p>Нет технологий в этой категории</p>
              <p className="tech-empty-hint">Добавь первую технологию выше 👆</p>
            </div>
          )}
        </section>

        {/* Импорт/Экспорт */}
        <section className="tech-import-section">
          <h2>Данные</h2>
          <DataImportExport
            data={technologies}
            onImport={handleImport}
          />
        </section>
      </div>
    </div>
  );
}

export default TechnologiesPage;