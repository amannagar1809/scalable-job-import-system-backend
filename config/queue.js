const { Queue } = require('bullmq');
const env = require('./env.js');
const IORedis = require('ioredis');

const connection = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

const jobQueue = new Queue('job-queue', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});

module.exports = { jobQueue, connection };