const pdf = require('pdfkit');
const Expense = require('../models/expense');

exports.downloadExpenseReport = async (req, res) => {
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

    const doc = new pdf();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=expense-report.pdf`
    );
    
    doc.pipe(res);

    doc.fontSize(24).text(`Expense Report`, {
      align: 'center',
    });

    doc.moveDown();
    doc.fontSize(16).text(`Period: ${startDate.toDateString()} - ${endDate.toDateString()}`);

    doc.moveDown();
    doc.fontSize(16).text(`Expenses:`);

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