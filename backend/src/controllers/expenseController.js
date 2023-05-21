const Expense = require('../models/expense');
const pdf = require('pdfkit');

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

exports.getExpensesByDateRange = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    endDate.setDate(endDate.getDate() + 1);
    const expenses = await Expense.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.downloadExpenseReport = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    if (isNaN(startDate)) {
      throw new Error('Invalid start date');
    }

    const endDate = new Date(req.query.endDate);
    if (isNaN(endDate)) {
      throw new Error('Invalid end date');
    }
    endDate.setDate(endDate.getDate() + 1);

    const expenses = await Expense.find({
      _id: { $type: 'objectId' }, // vérifie que _id est bien un ObjectId
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const doc = new pdf();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=expense-report.pdf'
    );
    doc.pipe(res);

    doc.fontSize(24).text('Expense Report', {
      align: 'center',
    });

    doc.moveDown();
    doc.fontSize(16).text(`Period: ${startDate.toDateString()} - ${endDate.toDateString()}`);

    doc.moveDown();
    doc.fontSize(16).text('Expenses:');

    expenses.forEach((expense) => {
      doc.moveDown();
      doc.text(`Name: ${expense.name}`);
      doc.text(`Amount: ${expense.amount}`);
      doc.text(`Category: ${expense.category}`);
      doc.text(`Date: ${expense.date.toDateString()}`);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};