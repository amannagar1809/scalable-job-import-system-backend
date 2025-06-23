const Job = require('../models/job.model.js');
const ImportLog = require('../models/import-log.model.js');

 const processJobBatch = async (batch, source) => {
  const logEntry = {
    fileName: source,
    importDateTime: new Date(),
    total: batch.length,
    new: 0,
    updated: 0,
    failed: 0,
    failures: [],
  };

  for (const jobData of batch) {
    try {
      const jobId = generateJobId(jobData, source);
      const normalizedJob = normalizeJobData(jobData, source);
      
      const existingJob = await Job.findOne({ jobId });
      
      if (existingJob) {
        await Job.updateOne({ jobId }, normalizedJob);
        logEntry.updated++;
      } else {
        await Job.create({ ...normalizedJob, jobId });
        logEntry.new++;
      }
    } catch (error) {
      logEntry.failed++;
      logEntry.failures.push({
        jobId: jobData.guid?.['_'] || jobData.id || 'unknown',
        error: error.message,
      });
      console.error('Error processing job:', error);
    }
  }

  await ImportLog.create(logEntry);
  return logEntry;
};

const generateJobId = (jobData, source) => {
  if (source.includes('jobicy.com')) {
    return `jobicy_${jobData.guid?.['_'] || jobData.id}`;
  } else if (source.includes('higheredjobs.com')) {
    return `highered_${jobData.id}`;
  }
  return `${source}_${jobData.guid?.['_'] || jobData.id}`;
};

const normalizeJobData = (jobData, source) => {
  if (source.includes('jobicy.com')) {
    return {
      title: jobData.title,
      company: jobData.company || 'Unknown',
      location: jobData.location,
      description: jobData.description,
      url: jobData.link,
      salary: jobData.salary,
      type: jobData.jobType,
      category: jobData.category,
      publishedDate: new Date(jobData.pubDate),
      source: source,
      rawData: jobData,
    };
  } else if (source.includes('higheredjobs.com')) {
    return {
      title: jobData.title,
      company: jobData.institution,
      location: jobData.city ? `${jobData.city}, ${jobData.state}` : '',
      description: jobData.summary,
      url: jobData.link,
      publishedDate: new Date(jobData.published),
      source: source,
      rawData: jobData,
    };
  }
  
  return {
    title: jobData.title || 'Unknown',
    company: jobData.company || 'Unknown',
    location: jobData.location,
    description: jobData.description,
    url: jobData.link || jobData.url,
    publishedDate: jobData.pubDate ? new Date(jobData.pubDate) : new Date(),
    source: source,
    rawData: jobData,
  };
};

module.exports = {processJobBatch}