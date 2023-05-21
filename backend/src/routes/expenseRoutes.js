const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Get expenses by date
router.get('/by-date-range', expenseController.getExpensesByDateRange);

// Get all expenses
router.get('/', expenseController.getAllExpenses);

// Get one expense
router.get('/:id', expenseController.getExpenseById);

// Create an expense
router.post('/', expenseController.createExpense);

// Update an expense
router.patch('/:id', expenseController.updateExpenseById);

// Delete an expense
router.delete('/:id', expenseController.deleteExpenseById);

// Generate expense report
router.get('/report/pdf', expenseController.downloadExpenseReport);

module.exports = router;