const express = require('express');
const jobRoutes = require('./job.routes.js');
const importRoutes = require('./import.routes.js');

const router = express.Router();

router.use('/jobs', jobRoutes);
router.use('/imports', importRoutes);

module.exports = router;