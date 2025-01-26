import express from 'express';
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import taskRoutes from './routes/task.routes';
import { startTaskScheduler } from './utils';

const app = express();

app.use(express.json());

/**
 * Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/task', taskRoutes);
/**
 * Routes
 */

/**
 * Cron jobs
 */
startTaskScheduler();
/**
 * Cron jobs
 */

app.get('/', (req, res) => {
  res.send('Student Management System API!');
});

export default app;
