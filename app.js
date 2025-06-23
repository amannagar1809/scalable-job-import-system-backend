const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cron = require('node-cron'); 
const app = express();
// const express = require('express');
// const express = require('express');
// const express = require('express');
// const express = require('express');
// const express = require('express');
const routes = require('./routes/index.js');
const { connectDB } = require( './models/index.js');
const { startWorker } = require( './services/queue.service.js');
const { initializeSocket } = require( './services/socket.service.js');
const env  = require( './config/env.js');
const { processJobFeed } = require( './services/api-fetcher.service.js');
const cors = require('cors');
// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start queue worker
startWorker();

// Schedule job fetching
const jobSources = [
  'https://jobicy.com/?feed=job_feed',
  'https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time',
  'https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france',
  'https://jobicy.com/?feed=job_feed&job_categories=design-multimedia',
  'https://jobicy.com/?feed=job_feed&job_categories=data-science',
  'https://jobicy.com/?feed=job_feed&job_categories=copywriting',
  'https://jobicy.com/?feed=job_feed&job_categories=business',
  'https://jobicy.com/?feed=job_feed&job_categories=management',
  'https://www.higheredjobs.com/rss/articleFeed.cfm',
];

if (env.NODE_ENV !== 'test') {
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
}

module.exports = app;