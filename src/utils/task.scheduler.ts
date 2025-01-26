import cron from 'node-cron';
import { updateOverdueTasks } from '../services/task.service';

export const startTaskScheduler = () => {
  console.log('Task scheduler started');

  cron.schedule('0 0 * * *', updateOverdueTasks);
};
