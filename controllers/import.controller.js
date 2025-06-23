const ImportLog = require('../models/import-log.model.js');
const { fetchJobsFromAPI, processJobFeed } = require('../services/api-fetcher.service.js');

const getImportHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { importDateTime: -1 },
    };

    const history = await ImportLog.paginate({}, options);
    res.json(history);
  } catch (error) {
    console.error('Error fetching import history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const triggerManualImport = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    const result = await processJobFeed(url);
    
    res.json({
      message: 'Import started successfully',
      totalJobs: result.total,
      batches: result.batchCount,
    });
  } catch (error) {
    console.error('Error triggering manual import:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
    getImportHistory,
    triggerManualImport
  };