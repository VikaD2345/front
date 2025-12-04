import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  LinearProgress,
  Box,
  Chip,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './SimpleTechCard.css';

function SimpleTechCard({ tech, onDelete, onStatusChange, onProficiencyChange }) {
  const statusColors = {
    'not-started': '#FF6B6B',
    'in-progress': '#FFA500',
    'completed': '#51CF66'
  };

  const statusLabels = {
    'not-started': 'Не начато',
    'in-progress': 'В процессе',
    'completed': 'Завершено'
  };

  const categoryColors = {
    'Frontend': '#3B82F6',
    'Backend': '#8B5CF6',
    'Database': '#06B6D4',
    'Tools': '#F59E0B',
    'DevOps': '#EC4899'
  };

  const nextStatus = {
    'not-started': 'in-progress',
    'in-progress': 'completed',
    'completed': 'not-started'
  };

  return (
    <Card className="tech-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {tech.name}
          </Typography>
          <Chip
            label={tech.category}
            size="small"
            sx={{
              backgroundColor: categoryColors[tech.category] || '#666',
              color: 'white',
              fontWeight: 500
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={statusLabels[tech.status]}
            size="small"
            sx={{
              backgroundColor: statusColors[tech.status],
              color: 'white',
              fontWeight: 500,
              marginBottom: 1
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
            Уровень владения: <strong>{tech.proficiency}%</strong>
          </Typography>
          <LinearProgress
            variant="determinate"
            value={tech.proficiency}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: tech.proficiency >= 80 ? '#51CF66' : 
                                tech.proficiency >= 50 ? '#FFA500' : 
                                '#FF6B6B'
              }
            }}
          />
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          <strong>Ресурсы:</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: '80px',
            overflow: 'hidden'
          }}
        >
          {tech.resources}
        </Typography>

        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
          Добавлено: {new Date(tech.date).toLocaleDateString('ru-RU')}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => onStatusChange(tech.id, nextStatus[tech.status])}
          sx={{
            backgroundColor: '#3B82F6',
            color: 'white',
            textTransform: 'none',
            fontSize: '0.875rem',
            '&:hover': {
              backgroundColor: '#2563EB'
            }
          }}
        >
          Далее
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(tech.id)}
          sx={{
            color: '#EF4444',
            borderColor: '#EF4444',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.05)',
              borderColor: '#DC2626'
            }
          }}
        >
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}

export default SimpleTechCard;