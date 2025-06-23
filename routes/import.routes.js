const express = require('express');
const {
  getImportHistory,
  triggerManualImport,
} = require('../controllers/import.controller.js');

const router = express.Router();

router.get('/', getImportHistory);
router.post('/trigger', triggerManualImport);

module.exports = router;