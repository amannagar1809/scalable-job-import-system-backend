const Job =  require('../models/job.model.js');

 const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category, type } = req.query;
    const query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (type) {
      query.type = type;
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
    };

    const jobs = await Job.paginate(query, options);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

 const getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 },
          lastUpdated: { $max: '$updatedAt' },
        },
      },
      { $sort: { count: -1 } },
    ]);
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching job stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    getJobs, getJobStats
}