import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function Dashboard({ technologies }) {
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length,
    avgProficiency: technologies.length > 0
      ? Math.round(technologies.reduce((sum, t) => sum + t.proficiency, 0) / technologies.length)
      : 0
  };

  const categoryStats = technologies.reduce((acc, tech) => {
    const existing = acc.find(item => item.category === tech.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ category: tech.category, count: 1 });
    }
    return acc;
  }, []);

  const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
    <Card sx={{ backgroundColor: bgColor, border: `2px solid ${color}` }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Box sx={{ mb: 1 }}>
          <Icon sx={{ fontSize: 32, color }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color }}>
          {value}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={SchoolIcon}
            title="Всего технологий"
            value={stats.total}
            color="#3B82F6"
            bgColor="rgba(59, 130, 246, 0.08)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={CheckCircleIcon}
            title="Завершено"
            value={stats.completed}
            color="#51CF66"
            bgColor="rgba(81, 207, 102, 0.08)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={PauseCircleIcon}
            title="В процессе"
            value={stats.inProgress}
            color="#FFA500"
            bgColor="rgba(255, 165, 0, 0.08)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={PlayCircleIcon}
            title="Не начато"
            value={stats.notStarted}
            color="#FF6B6B"
            bgColor="rgba(255, 107, 107, 0.08)"
          />
        </Grid>
      </Grid>

      {/* Прогресс общий */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Средний уровень владения
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress
                variant="determinate"
                value={stats.avgProficiency}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: stats.avgProficiency >= 80 ? '#51CF66' :
                                    stats.avgProficiency >= 50 ? '#FFA500' :
                                    '#FF6B6B',
                    borderRadius: 6
                  }
                }}
              />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, minWidth: '60px' }}>
              {stats.avgProficiency}%
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* По категориям */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Распределение по категориям
          </Typography>
          {categoryStats.length > 0 ? (
            <Grid container spacing={2}>
              {categoryStats.map(cat => (
                <Grid item xs={12} sm={6} key={cat.category}>
                  <Box sx={{
                    p: 1.5,
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    borderRadius: 1,
                    textAlign: 'center'
                  }}>
                    <Typography variant="body2" color="textSecondary">
                      {cat.category}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#3B82F6' }}>
                      {cat.count}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Нет данных для отображения
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Dashboard;