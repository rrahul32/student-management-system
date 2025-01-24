import express from 'express';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());

/**
 * Routes
 */
app.use('/api/auth', authRoutes);
/**
 * Routes
 */

app.get('/', (req, res) => {
  res.send('Student Management System API!');
});

export default app;
