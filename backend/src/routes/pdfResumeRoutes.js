const express = require('express');
const router = express.Router();
const expenseResumeController = require('../controllers/expenseResumeController');

// Generate expense report
router.get('/pdf', expenseResumeController.downloadExpenseReport);

module.exports = router;