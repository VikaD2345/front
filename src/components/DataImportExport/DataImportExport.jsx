import React, { useState } from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './DataImportExport.css';

function DataImportExport({ data, onImport }) {
  const [dragActive, setDragActive] = useState(false);
  const [importMessage, setImportMessage] = useState('');

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `technologies-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (file) => {
    if (!file) return;

    if (!file.type.includes('json')) {
      setImportMessage('❌ Пожалуйста, выберите JSON файл');
      setTimeout(() => setImportMessage(''), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        if (!Array.isArray(importedData)) {
          throw new Error('Данные должны быть массивом');
        }

        onImport(importedData);
        setImportMessage(`✓ Успешно импортировано ${importedData.length} технолог.`);
        setTimeout(() => setImportMessage(''), 3000);
      } catch (error) {
        setImportMessage(`❌ Ошибка при импорте: ${error.message}`);
        setTimeout(() => setImportMessage(''), 3000);
      }
    };

    reader.readAsText(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImportFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImportFile(e.target.files[0]);
    }
  };

  return (
    <div className="data-import-export">
      {importMessage && (
        <div className={`import-message ${importMessage.includes('✓') ? 'success' : 'error'}`}>
          {importMessage}
        </div>
      )}

      <div className="import-export-container">
        {/* Экспорт */}
        <div className="action-card export-card">
          <div className="action-icon">
            <CloudDownloadIcon sx={{ fontSize: 40 }} />
          </div>
          <h3>Экспорт данных</h3>
          <p>Скачай все свои технологии в JSON формате</p>
          <button className="action-button export-button" onClick={handleExport}>
            Скачать JSON
          </button>
        </div>

        {/* Импорт */}
        <div className="action-card import-card">
          <div className="action-icon">
            <CloudUploadIcon sx={{ fontSize: 40 }} />
          </div>
          <h3>Импорт данных</h3>
          <p>Загрузи JSON файл с технологиями</p>

          <div
            className={`drop-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <p>Перетащи JSON файл сюда или нажми кнопку ниже</p>
          </div>

          <input
            type="file"
            id="file-input"
            accept=".json"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
          <button
            className="action-button import-button"
            onClick={() => document.getElementById('file-input').click()}
          >
            Выбрать файл
          </button>
        </div>
      </div>

      {/* Информация */}
      <div className="info-box">
        <h3>ℹ️ Информация</h3>
        <ul>
          <li>Экспортируй свои данные для сохранения и переноса</li>
          <li>Импортируй данные из другого браузера или устройства</li>
          <li>Формат: JSON массив с объектами технологий</li>
          <li>Все данные хранятся локально в браузере</li>
        </ul>
      </div>
    </div>
  );
}

export default DataImportExport;