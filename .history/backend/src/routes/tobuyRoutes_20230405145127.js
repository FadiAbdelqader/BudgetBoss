const express = require('express');
const router = express.Router();
const tobuyController = require('../controllers/tobuyController');


// Get all tobuys
router.get('/', tobuyController.getAllTobuys);

// Get one tobuy
router.get('/:id', tobuyController.getTobuyById);

// Create tobuy
router.post('/', tobuyController.createTobuy);

// Delete tobuy
router.delete('/:id', tobuyController.deleteTobuyByID);

/*
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
*/

module.exports = router;