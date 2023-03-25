const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

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

module.exports = router;