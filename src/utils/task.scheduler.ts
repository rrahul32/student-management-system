import cron from 'node-cron';
import { updateOverdueTasks } from '../services/task.service';

export const startTaskScheduler = () => {
  console.log('Task scheduler started');

  // Update overdue tasks every minute
  cron.schedule('* * * * *', updateOverdueTasks);
};
