import cron from 'node-cron';
import { processJobFeed } from '../services/api-fetcher.service.js';
import env from '../config/env.js';

const jobSources = [
  'https://jobicy.com/?feed=job_feed',
  // Add other job sources here
];

export const scheduleJobFetching = () => {
  cron.schedule(env.JOB_FETCH_INTERVAL, async () => {
    console.log('Running scheduled job import...');
    try {
      for (const source of jobSources) {
        await processJobFeed(source);
      }
      console.log('Scheduled job import completed');
    } catch (error) {
      console.error('Error in scheduled job import:', error);
    }
  });
};