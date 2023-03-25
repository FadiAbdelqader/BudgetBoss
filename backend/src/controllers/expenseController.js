const Expense = require('../models/expense');

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (expense == null) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createExpense = async (req, res) => {
  const expense = new Expense({
    name: req.body.name,
    amount: req.body.amount,
    category: req.body.category
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateExpenseById = async (req, res) => {
  let expense;
  try {
    expense = await Expense.findById(req.params.id);
    if (expense == null) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (req.body.name != null) {
      expense.name = req.body.name;
    }

    if (req.body.amount != null) {
      expense.amount = req.body.amount;
    }

    if (req.body.category != null) {
      expense.category = req.body.category;
    }

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteExpenseById = async (req, res) => {
  let expense;
  try {
    expense = await Expense.findById(req.params.id);
    if (expense == null) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.deleteOne();
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};