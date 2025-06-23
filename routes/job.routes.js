const express = require('express');
const { getJobs, getJobStats } = require('../controllers/job.controller.js');

const router = express.Router();

router.get('/', getJobs);
router.get('/stats', getJobStats);

module.exports = router;