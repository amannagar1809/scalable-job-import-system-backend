const axios = require('axios');
const xml2js = require('xml2js');
const { jobQueue } = require('../config/queue.js');
const ImportLog = require('../models/import-log.model.js');

const parser = new xml2js.Parser({ explicitArray: false });

 const fetchJobsFromAPI = async (url) => {
  try {
    console.log(`Fetching jobs from: ${url}`);
    const response = await axios.get(url);
    
    if (response.headers['content-type'].includes('xml')) {
      const result = await parser.parseStringPromise(response.data);
      return result;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching jobs from ${url}:`, error.message);
    throw error;
  }
};

 const processJobFeed = async (url) => {
  try {
    const data = await fetchJobsFromAPI(url);
    const jobs = extractJobsFromResponse(data);
    
    // Add jobs to queue in batches
    const batchSize = parseInt(process.env.BATCH_SIZE) || 10;
    for (let i = 0; i < jobs.length; i += batchSize) {
      const batch = jobs.slice(i, i + batchSize);
      await jobQueue.add('process-job-batch', {
        jobs: batch,
        source: url,
      });
    }
    
    return {
      total: jobs.length,
      batchCount: Math.ceil(jobs.length / batchSize),
    };
  } catch (error) {
    console.error('Error processing job feed:', error);
    throw error;
  }
};

const extractJobsFromResponse = (data) => {
  // Handle different API response formats
  if (data.rss && data.rss.channel && data.rss.channel.item) {
    // Jobicy RSS format
    return Array.isArray(data.rss.channel.item) 
      ? data.rss.channel.item 
      : [data.rss.channel.item];
  } else if (data.jobs) {
    // HigherEdJobs format
    return data.jobs;
  }
  
  return [];
};

module.exports = {
    processJobFeed
}