const { Worker } = require('bullmq');
const { connection } =  require('../config/queue.js');
const { processJobBatch } =  require('./job-processor.service.js');
const env =  require('../config/env.js');

 const startWorker = () => {
  const worker = new Worker('job-queue', async (job) => {
    const { jobs, source } = job.data;
    return await processJobBatch(jobs, source);
  }, {
    connection,
    concurrency: env.CONCURRENCY,
  });

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err);
  });

  return worker;
};

module.exports = {startWorker};